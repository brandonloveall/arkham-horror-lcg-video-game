import { GamePlayer } from "shared/objects/player";
import { CostingCard } from "../costing_card";
import { CardType, Slot } from "shared/card_database_types";

export abstract class AssetCard extends CostingCard {
	abstract slot: Slot;

	type_name = CardType.Asset;

	ability(plr: GamePlayer): void {
		return;
	}
}
