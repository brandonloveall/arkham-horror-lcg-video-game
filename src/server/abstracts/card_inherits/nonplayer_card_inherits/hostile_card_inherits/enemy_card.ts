import { Damageable } from "server/abstracts/damageable";
import { HostileCard } from "../hostile_card";
import { WholePossibleCard } from "server/abstracts/whole_possible_card";

export abstract class EnemyCard extends HostileCard implements Damageable {
    health: number
    sanity = undefined
    enemy_damage: number
    enemy_horror: number
    enemy_fight: number
    enemy_evade: number
    victory: number

    constructor(card: WholePossibleCard) {
        super(card)

        this.health = card.health
        this.enemy_damage = card.enemy_damage
        this.enemy_horror = card.enemy_horror
        this.enemy_fight = card.enemy_fight
        this.enemy_evade = card.enemy_evade
        this.victory = card.victory
    }
}