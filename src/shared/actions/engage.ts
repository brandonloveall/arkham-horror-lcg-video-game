import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { GamePlayer } from "shared/objects/player";
import { Actions, Timing } from "./action_types";
import { react } from "./react";
import { giveChoice } from "shared/giveChoice";
import { canPayCost, Cost, payCost } from "./payCost";
import { canDo } from "./canDo";

export interface Params {
	initiator: GamePlayer;
	targets: EnemyCard[];

	cost: Cost;
}

export function engage(params: Params) {
	if (!canDo(params.initiator) || !canPayCost(params.initiator, params.cost)) {
		return;
	}
	payCost(params.initiator, params.cost);

	let target!: EnemyCard;
	giveChoice(
		params.initiator,
		"Choose a target to engage",
		params.targets.map((e) => {
			return {
				text: `${e.name}`,
				outcome: () => {
					target = e;
				},
			};
		}),
	);

	react(Timing.WHEN, Actions.ENGAGE);

	if (!canDo(params.initiator)) {
		return;
	}

	target.engagedWith = params.initiator;

	react(Timing.AFTER, Actions.ENGAGE);
}
