import { WholePossibleCard } from "server/abstracts/whole_possible_card";
import { StoryCard } from "../story_card";

export abstract class ActCard extends StoryCard {
    clues: number

    constructor(card: WholePossibleCard) {
        super(card)

        this.clues = card.clues
    }
}