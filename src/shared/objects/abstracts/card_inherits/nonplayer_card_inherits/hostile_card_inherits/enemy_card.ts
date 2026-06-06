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
}

export function PlaceEnemy(enemy: EnemyCard, location: LocationCard) {
        enemy.model = ReplicatedStorage.WaitForChild("Models").WaitForChild(enemy.code) as Model;
        enemy.model.AddTag("ENEMY")
        enemy.model.MoveTo(location.model.WorldPivot.Position)
        enemy.model.Parent = Workspace
        enemy.model.Name = enemy.id
        return enemy;
}