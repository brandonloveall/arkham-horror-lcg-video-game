import { Card } from "../card";

export abstract class PlayerCard extends Card {
    abstract skill_agility: number
    abstract skill_combat: number
    abstract skill_intellect: number
    abstract skill_willpower: number
    abstract skill_wildcard: number
    abstract xp: number
    abstract deck_limit: number


}