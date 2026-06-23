import { GamePlayer } from "shared/objects/player";
import { CostingCard } from "../costing_card";

export abstract class AssetCard extends CostingCard {
    abstract slot: string

    usable = false;

    /**
     * @returns true if free, false if cost action
     */
    ability(plr: GamePlayer): boolean { return false; }
}