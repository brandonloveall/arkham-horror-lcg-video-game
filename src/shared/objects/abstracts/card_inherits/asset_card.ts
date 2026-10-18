import { GamePlayer } from "shared/objects/player";
import { Card } from "../card";
import { CardType, Skill, Slot } from "shared/card_database_types";

export abstract class AssetCard extends Card {
	abstract skills: Record<Skill, number>;
	abstract xp: number;
	abstract cost: number;
	fast = false;

	canPlayFast(plr: GamePlayer) {
		return true;
	}

	abstract slot: Slot;

	type_name = CardType.Asset;

	ability(plr: GamePlayer): void {
		return;
	}
}
