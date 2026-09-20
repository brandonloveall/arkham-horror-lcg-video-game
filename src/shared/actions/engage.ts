import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { GamePlayer } from "shared/objects/player";
import { Actions, Timing } from "./action_types";
import { react } from "./react";
import { giveChoice } from "shared/giveChoice";

interface Params {
	initiator: GamePlayer;
	targets: EnemyCard[];
}

export function engage(params: Params) {
	// if (cantDo()) {
	// 	return;
	// }

	// payActionCost();
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

	// if (cantDo()) {
	// 	return;
	// }

	target.engagedWith = params.initiator;

	react(Timing.AFTER, Actions.ENGAGE);
}
