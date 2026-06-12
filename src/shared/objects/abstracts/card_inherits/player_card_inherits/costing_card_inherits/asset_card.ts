import { GamePlayer } from "shared/objects/player";
import { CostingCard } from "../costing_card";

export abstract class AssetCard extends CostingCard {
    abstract slot: string

    usable = false;

    ability(plr: GamePlayer) {  }
}