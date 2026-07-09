import { GamePlayer } from "shared/objects/player";
import { PlayerCard } from "../player_card";

export abstract class CostingCard extends PlayerCard {
	abstract cost: number;
	fast = false;

	canPlayFast(plr: GamePlayer) {
		return true;
	}
}
