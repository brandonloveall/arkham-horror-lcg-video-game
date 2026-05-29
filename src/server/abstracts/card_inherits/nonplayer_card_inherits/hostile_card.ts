import { WholePossibleCard } from "server/abstracts/whole_possible_card";
import { NonplayerCard } from "../nonplayer_card";

export abstract class HostileCard extends NonplayerCard {
    constructor(card: WholePossibleCard) {
        super(card)
    }
}