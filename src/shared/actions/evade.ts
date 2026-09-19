import { Skill } from "shared/card_database_types";
import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { GamePlayer } from "shared/objects/player";
import { react } from "./react";
import { skillTest } from "./skilltest";
import { Actions, Timing } from "./action_types";
import { giveChoice } from "shared/giveChoice";

interface Params {
	initiator: GamePlayer;
	targets: EnemyCard[];
	using: Skill;
	bonusSkill?: number;
	free: boolean;
}

/**
 * check if possible
 * pay cost
 * react to WHEN
 * check if possible
 * do the evade
 * react to AFTER
 * end
 */
export function evade(params: Params) {
	// if (cantDo()) {
	// 	return;
	// }

	// payActionCost();
	let target!: EnemyCard;
	giveChoice(
		params.initiator,
		"Choose a target to evade",
		params.targets.map((e) => {
			return {
				text: `${e.name}`,
				outcome: () => {
					target = e;
				},
			};
		}),
	);

	react(Timing.WHEN, Actions.EVADE);

	// if (cantDo()) {
	// 	return;
	// }

	const [success] = skillTest({
		initiator: params.initiator,
		using: params.using,
		against: target.evade,
		bonusSkill: params.bonusSkill,
	});

	if (success) {
		target.engagedWith = undefined;
		params.initiator.threat_area.remove(params.initiator.threat_area.indexOf(target));
	}

	react(Timing.AFTER, Actions.EVADE);
}
