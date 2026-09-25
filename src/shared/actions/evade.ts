import { Skill } from "shared/card_database_types";
import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { GamePlayer } from "shared/objects/player";
import { react } from "./react";
import { skillTest } from "./skilltest";
import { Actions, Timing } from "./action_types";
import { giveChoice } from "shared/giveChoice";
import { canPayCost, Cost, payCost } from "./payCost";
import { canDo } from "./canDo";

export interface Params {
	initiator: GamePlayer;
	targets: EnemyCard[];
	using: Skill;
	bonusSkill?: number;
	free: boolean;

	cost: Cost;
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
	if (!canDo(params.initiator) || !canPayCost(params.initiator, params.cost)) {
		return;
	}
	payCost(params.initiator, params.cost);

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

	if (!canDo(params.initiator)) {
		return;
	}

	const [success] = skillTest({
		initiator: params.initiator,
		using: params.using,
		against: target.evade,
		bonusSkill: params.bonusSkill,
	});

	if (success) {
		target.engagedWith = undefined;
		target.is_ready = false;
	}

	react(Timing.AFTER, Actions.EVADE);
}
