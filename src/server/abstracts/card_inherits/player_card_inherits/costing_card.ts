import { WholePossibleCard } from "server/abstracts/whole_possible_card";
import { PlayerCard } from "../player_card";

export abstract class CostingCard extends PlayerCard {
    cost: number

    constructor(card: WholePossibleCard) {
        super(card)
        this.cost = card.cost
    }
}