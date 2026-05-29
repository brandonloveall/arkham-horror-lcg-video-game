import { Card } from "../card";
import { WholePossibleCard } from "../whole_possible_card";

export abstract class PlayerCard extends Card {
    skill_agility: number
    skill_combat: number
    skill_intellect: number
    skill_willpower: number
    skill_wildcard: number
    xp: number
    deck_limit: number

    constructor(card: WholePossibleCard) {
        super(card)

        this.skill_agility = card.skill_agility,
            this.skill_combat = card.skill_combat,
            this.skill_intellect = card.skill_intellect,
            this.skill_willpower = card.skill_willpower,
            this.skill_wildcard = card.skill_wildcard,
            this.xp = card.xp
        this.deck_limit = card.deck_limit
    }
}