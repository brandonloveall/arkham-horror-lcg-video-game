import { WholePossibleCard } from "server/abstracts/whole_possible_card";
import { StoryCard } from "../story_card";

export abstract class LocationCard extends StoryCard {
    shroud: number
    clues: number

    constructor(card: WholePossibleCard) {
        super(card)

        this.shroud = card.shroud
        this.clues = card.clues
    }
}