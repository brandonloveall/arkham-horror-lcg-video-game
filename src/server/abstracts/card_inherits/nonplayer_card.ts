import { Card } from "../card";
import { WholePossibleCard } from "../whole_possible_card";

export abstract class NonplayerCard extends Card {
    encounter_code: string
    encounter_name: string
    encounter_position: number

    constructor(card: WholePossibleCard) {
        super(card)

        this.encounter_code = card.encounter_code
        this.encounter_name = card.encounter_name
        this.encounter_position = card.encounter_position
    }
}