import { GamePlayer } from "shared/objects/player";
import { CostingCard } from "../costing_card";
import { CardType } from "shared/card_database_types";

export abstract class AssetCard extends CostingCard {
	abstract slot: string;

	usable = false;
	type_name = CardType.Asset;

	ability(plr: GamePlayer): void {
		return;
	}
}
