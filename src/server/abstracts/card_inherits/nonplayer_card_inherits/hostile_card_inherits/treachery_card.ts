import { WholePossibleCard } from "server/abstracts/whole_possible_card";
import { HostileCard } from "../hostile_card";

export abstract class TreacheryCard extends HostileCard {
    constructor(card: WholePossibleCard) {
        super(card)
    }
}