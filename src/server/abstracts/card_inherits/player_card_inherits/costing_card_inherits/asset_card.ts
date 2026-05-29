import { WholePossibleCard } from "server/abstracts/whole_possible_card";
import { CostingCard } from "../costing_card";

export abstract class AssetCard extends CostingCard {
    slot: string

    constructor(card: WholePossibleCard) {
        super(card)

        this.slot = card.slot
    }
}