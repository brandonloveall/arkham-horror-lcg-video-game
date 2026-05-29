import { WholePossibleCard } from "server/abstracts/whole_possible_card";
import { CostingCard } from "../costing_card";

export abstract class Event extends CostingCard {
    constructor(card: WholePossibleCard) {
        super(card)
    }
}