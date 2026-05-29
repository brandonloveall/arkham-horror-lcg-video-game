import { StoryCard } from "../story_card";
import { WholePossibleCard } from "server/abstracts/whole_possible_card";

export abstract class AgendaCard extends StoryCard {
    doom: number

    constructor(card: WholePossibleCard) {
        super(card)

        this.doom = card.doom
    }
}