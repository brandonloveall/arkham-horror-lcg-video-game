import { Damageable } from "shared/objects/abstracts/damageable";
import { HostileCard } from "../hostile_card";
import { GamePlayer } from "shared/objects/player";
import { LocationCard } from "../story_card_inherits/location_card";
import { ReplicatedStorage, Workspace } from "@rbxts/services";

export abstract class EnemyCard extends HostileCard implements Damageable {
    abstract health: number
    sanity = undefined
    abstract enemy_damage: number
    abstract enemy_horror: number
    abstract enemy_fight: number
    abstract enemy_evade: number
    abstract victory: number

    abstract engagedWith: GamePlayer | undefined
}

export function Place(enemy: EnemyCard, location: LocationCard) {
        location.model = ReplicatedStorage.WaitForChild("Models").WaitForChild(enemy.code) as Model;
        location.model.AddTag("ENEMY")
        location.model.MoveTo(location.model.WorldPivot.Position)
        location.model.Parent = Workspace
        location.model.Name = location.id
        return location;
}