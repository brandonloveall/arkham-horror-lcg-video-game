import { GamePlayer } from "shared/objects/player";
import { react } from "./react";
import { Actions, Timing } from "./action_types";
import { canPayCost, Cost, payCost } from "./payCost";
import { canDo } from "./canDo";

export interface Params {
	initiator: GamePlayer;
	amount: number;

	cost: Cost;
}

export function gainResource(params: Params) {
	if (!canDo(params.initiator) || !canPayCost(params.initiator, params.cost)) {
		return;
	}
	payCost(params.initiator, params.cost);

	react(Timing.WHEN, Actions.GAIN_RESOURCE);

	if (!canDo(params.initiator)) {
		return;
	}

	params.initiator.resources += params.amount;

	react(Timing.AFTER, Actions.GAIN_RESOURCE);
}
