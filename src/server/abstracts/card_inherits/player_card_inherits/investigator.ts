import { Damageable } from "server/abstracts/damageable";
import { PlayerCard } from "../player_card";
import { DeckOption, DeckRequirements } from "server/abstracts/deck_req_and_opt";
import { WholePossibleCard } from "server/abstracts/whole_possible_card";

export abstract class Investigator extends PlayerCard implements Damageable {
    health: number;
    sanity: number;

    deck_requirements: DeckRequirements
    deck_options: DeckOption[]

    constructor(card: WholePossibleCard) {
        super(card)

        this.health = card.health
        this.sanity = card.sanity
        this.deck_requirements = card.deck_requirements
        this.deck_options = card.deck_options
    }
}