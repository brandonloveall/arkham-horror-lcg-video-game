import { GamePlayer } from "shared/objects/player";
import { react } from "./react";
import { Actions, Timing } from "./action_types";

interface Params {
	initiator: GamePlayer;
	amount: number;
}

export function gainResource(params: Params) {
	// if (cantDo()) {
	// 	return;
	// }

	// payActionCost();

	react(Timing.WHEN, Actions.GAIN_RESOURCE);

	// if (cantDo()) {
	// 	return;
	// }

	params.initiator.resources += params.amount;

	react(Timing.AFTER, Actions.GAIN_RESOURCE);
}
