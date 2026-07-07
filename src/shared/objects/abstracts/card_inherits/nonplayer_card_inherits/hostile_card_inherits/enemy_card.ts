import { Damageable } from "shared/objects/abstracts/damageable";
import { HostileCard } from "../hostile_card";
import { GamePlayer } from "shared/objects/player";
import { LocationCard } from "../story_card_inherits/location_card";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { Readies } from "shared/objects/abstracts/readies";
import { GameContext, WhatHappened } from "shared/game_context";
// eslint-disable-next-line
import { PlaySound_Pub } from "shared/remotes/PlaySound/Interface";

export abstract class EnemyCard extends HostileCard implements Damageable, Readies {
    abstract health: number
    sanity = undefined
    abstract enemy_damage: number
    abstract enemy_horror: number
    abstract enemy_fight: number
    abstract enemy_evade: number
    abstract victory: number

    abstract engagedWith: GamePlayer | undefined

    is_ready = false
    location!: LocationCard
    model!: Model
    type_name = "Enemy"

    reactions = {
        [WhatHappened.PLAYER_MOVED]: {
            reaction: (plr: GamePlayer, oldLocation: LocationCard, newLocation: LocationCard) => {
                this.attackOfOpportunity(plr)
                if(this.inPlay) {
                    this.move(newLocation)
                }
            },
            optional: false
        },
        [WhatHappened.PLAYER_DREW_CARD]: {
            reaction: (plr: GamePlayer) => { this.attackOfOpportunity(plr) },
            optional: false
        },
        [WhatHappened.PLAYER_TOOK_RESOURCE]: {
            reaction: (plr: GamePlayer) => { this.attackOfOpportunity(plr) },
            optional: false
        },
        [WhatHappened.PLAYER_INVESTIGATED]: {
            reaction: (plr: GamePlayer, location: LocationCard) => { this.attackOfOpportunity(plr) },
            optional: false
        },
        [WhatHappened.PLAYER_PLAYED_CARD]: {
            reaction: (plr: GamePlayer) => { this.attackOfOpportunity(plr) },
            optional: false
        }
    }

    place(location: LocationCard) {
        this.inPlay = true
        this.model = ReplicatedStorage.WaitForChild("Models").WaitForChild(this.code).Clone() as Model;
        this.model.Parent = Workspace
        this.model.AddTag("ENEMY")
        this.model.PivotTo(new CFrame(location.model.WorldPivot.Position.add(new Vector3(0, 16, 0))))
        this.model.Name = this.id
        this.location = location

        return this;
    }

    attackOfOpportunity(who: GamePlayer) {
        if (this.engagedWith === who && this.is_ready && this.inPlay) { this.attack(who) }
    }

    attack(plr: GamePlayer) {
        plr.takeDamage(this.enemy_damage, this.enemy_horror)
        PlaySound_Pub("Enemy_Attack")
    }

    takeDamage(damage: number) {
        this.health -= damage
        if (this.health <= 0) {
            this.model.Destroy()
            if (this.engagedWith !== undefined) { this.engagedWith.threat_area.remove(this.engagedWith.threat_area.indexOf(this)); this.engagedWith = undefined }
            GameContext.encounter_discard.addCard(this)
            this.inPlay = false
            PlaySound_Pub("Enemy_Defeated")
        } else {
            PlaySound_Pub("Enemy_Hurt")
        }
    }

    move(location: LocationCard) {
        this.model.PivotTo(new CFrame(location.model.WorldPivot.Position.add(new Vector3(0, 16, 0))))
        this.location = location
    }
}