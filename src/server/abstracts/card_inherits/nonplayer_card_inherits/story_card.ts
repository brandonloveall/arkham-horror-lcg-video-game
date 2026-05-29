import { DoubleSided } from "server/abstracts/double_sided";
import { NonplayerCard } from "../nonplayer_card";
import { WholePossibleCard } from "server/abstracts/whole_possible_card";

export abstract class StoryCard extends NonplayerCard implements DoubleSided {
    stage: number
    back_name: string
    back_text: string
    back_flavor: string

    constructor(card: WholePossibleCard) {
        super(card)

        this.stage = card.stage
        this.back_name = card.back_name
        this.back_text = card.back_text
        this.back_flavor = card.back_flavor
    }

}