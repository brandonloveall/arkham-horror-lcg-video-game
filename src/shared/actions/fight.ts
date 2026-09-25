import { Skill } from "shared/card_database_types";
import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { GamePlayer } from "shared/objects/player";
import { Actions, Timing } from "./action_types";
import { skillTest } from "./skilltest";
import { react } from "./react";
import { giveChoice } from "shared/giveChoice";
import { dealDamageToEnemy } from "./dealDamageToEnemy";
import { canPayCost, Cost, payCost } from "./payCost";
import { canDo } from "./canDo";

export interface Params {
	targets: EnemyCard[];
	initiator: GamePlayer;
	using: Skill;
	free: boolean;
	bonusSkill?: number;
	bonusDamage?: number;

	cost: Cost;
}
/**
 * check if possible
 * pay cost
 * react to WHEN
 * check if possible
 * do the fight
 * react to AFTER
 * end
 */
export function fight(params: Params) {
	if (!canDo(params.initiator) || !canPayCost(params.initiator, params.cost)) {
		return;
	}
	payCost(params.initiator, params.cost);

	let target!: EnemyCard;
	giveChoice(
		params.initiator,
		"Choose a target",
		params.targets.map((e) => {
			return {
				text: `${e.name}`,
				outcome: () => {
					target = e;
				},
			};
		}),
	);

	react(Timing.WHEN, Actions.FIGHT);

	if (!canDo(params.initiator)) {
		return;
	}

	const [success] = skillTest({
		initiator: params.initiator,
		using: params.using,
		against: target.fight,
		bonusSkill: params.bonusSkill,
	});
	const totalDmg = 1 + (params.bonusDamage === undefined ? 0 : params.bonusDamage);

	if (success) {
		dealDamageToEnemy({ to: target, damage: totalDmg });
	}

	react(Timing.AFTER, Actions.FIGHT);
}
