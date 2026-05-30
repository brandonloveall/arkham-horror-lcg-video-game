import { Damageable } from "server/abstracts/damageable";
import { HostileCard } from "../hostile_card";
import { GamePlayer } from "server/player";

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