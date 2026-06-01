import { CostingCard } from "../costing_card";

export abstract class AssetCard extends CostingCard {
    abstract slot: string
}