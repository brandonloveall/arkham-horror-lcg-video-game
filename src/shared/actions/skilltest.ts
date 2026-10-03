import { Skill } from "shared/card_database_types";
import { GamePlayer } from "shared/objects/player";
import { react } from "./react";
import { Actions, Timing } from "./action_types";
import { GameContext } from "shared/game_context";
import { chooseCards } from "shared/choose_cards";
import { PlayerCard } from "shared/objects/abstracts/card_inherits/player_card";
import { discard } from "./discard";
import { DisplaySkillTestResult_Pub, RevealToken_Pub } from "shared/remotes/SkillCheckAnimation/Interface";
import { IconToken } from "shared/objects/chaos_bag";

interface Params {
	initiator: GamePlayer;
	using: Skill;
	bonusSkill?: number;
	against: number;
}

export function skillTest(params: Params): [success: boolean, byHowMuch: number] {
	react(Timing.WHEN, Actions.SKILLTEST);

	const committedCards = chooseCards(
		GameContext.players
			.filter((e) => {
				return e === params.initiator || e.location === params.initiator.location;
			})
			.map((e) => {
				return {
					player: e,
					chooseCap: e === params.initiator ? 999 : 1,
					allowedCards: e.hand,
				};
			}),
		`Skill check initiated by ${params.initiator.owner.Name}`,
	);

	// ShowCommittedCards_Pub(committedCards);
	// task.wait(1.5);

	const token = GameContext.chaos_bag!.pull();

	RevealToken_Pub(GameContext.chaos_bag!.getWhatsInside(), token);
	task.wait(4.5);

	let bonus = 0;
	for (const card of committedCards) {
		bonus += (card as PlayerCard).skills[params.using];
		bonus += (card as PlayerCard).skills[Skill.Wildcard];
	}

	const total =
		token === IconToken.auto_fail
			? 0
			: params.initiator.investigator.skills[params.using] +
				GameContext.scenario_card!.resolve(token, params.initiator) +
				bonus;
	const successful = token === IconToken.auto_fail ? false : total >= params.against;

	DisplaySkillTestResult_Pub(
		params.using,
		params.initiator.investigator.skills[params.using],
		bonus,
		token,
		successful,
	);
	task.wait(1.5);

	for (const card of committedCards) {
		discard(card);
	}

	return [successful, total];
}
