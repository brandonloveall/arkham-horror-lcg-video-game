import { PlayerWithTurn, WhatHappened } from "shared/game_context";
import { Card } from "../card";

interface PlayRestriction {
    whatHappened?: WhatHappened
    playerWithTurn?: PlayerWithTurn
}

export abstract class PlayerCard extends Card {
    abstract skill_agility: number
    abstract skill_combat: number
    abstract skill_intellect: number
    abstract skill_willpower: number
    abstract skill_wildcard: number
    abstract xp: number
    abstract deck_limit: number

    restriction?: PlayRestriction // if its absent, its the standard "play while your turn is in progress"

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
        }
    }
}