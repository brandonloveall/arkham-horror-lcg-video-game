import { Damageable } from "server/abstracts/damageable";
import { HostileCard } from "../hostile_card";

export abstract class EnemyCard extends HostileCard implements Damageable {
    health!: number
    sanity = undefined
    enemy_damage!: number
    enemy_horror!: number
    enemy_fight!: number
    enemy_evade!: number
    victory!: number

}