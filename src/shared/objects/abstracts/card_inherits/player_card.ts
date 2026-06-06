import { GameState, PlayerWithTurn, WhatHappened } from "shared/game_context";
import { Card } from "../card";

interface PlayRestriction {
    when?: GameState,
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
}