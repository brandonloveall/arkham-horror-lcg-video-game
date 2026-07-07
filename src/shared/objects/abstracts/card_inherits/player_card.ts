import { Card } from "../card";

export abstract class PlayerCard extends Card {
    abstract skill_agility: number
    abstract skill_combat: number
    abstract skill_intellect: number
    abstract skill_willpower: number
    abstract skill_wildcard: number
    abstract xp: number
    abstract deck_limit: number

    public getSkill(skill: string) {
        switch(skill) {
            case "skill_agility":
                return this.skill_agility
            case "skill_combat":
                return this.skill_combat
            case "skill_intellect":
                return this.skill_intellect
            case "skill_willpower":
                return this.skill_willpower
            case "skill_wildcard":
                return this.skill_wildcard
            default:
                return 0;
        }
    }
}