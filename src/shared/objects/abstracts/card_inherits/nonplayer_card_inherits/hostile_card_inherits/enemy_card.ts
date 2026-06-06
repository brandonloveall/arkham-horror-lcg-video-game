import { Damageable } from "shared/objects/abstracts/damageable";
import { HostileCard } from "../hostile_card";
import { GamePlayer } from "shared/objects/player";
import { LocationCard } from "../story_card_inherits/location_card";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { Readies } from "shared/objects/abstracts/readies";

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

    place(location: LocationCard) {
        this.model = ReplicatedStorage.WaitForChild("Models").WaitForChild(enemy.code).Clone() as Model;
        this.model.Parent = Workspace
        this.model.AddTag("ENEMY")
        this.model.PivotTo(new CFrame(location.model.WorldPivot.Position.add(new Vector3(0, 16, 0))))
        this.model.Name = this.id
        return this;
    }
}