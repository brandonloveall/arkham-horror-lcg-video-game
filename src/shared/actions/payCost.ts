import { GamePlayer } from "shared/objects/player";

export interface Cost {
	actions?: number;
}

export function payCost(plr: GamePlayer, cost: Cost) {
	if (cost.actions !== undefined) {
		plr.actions -= cost.actions;
	}
}

export function canPayCost(plr: GamePlayer, cost: Cost) {
	if (cost.actions !== undefined) {
		if (plr.actions < cost.actions) {
			return false;
		}
	}
	return true;
}
