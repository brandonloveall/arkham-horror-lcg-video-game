import { Skill } from "shared/card_database_types";
import { GamePlayer } from "shared/objects/player";
import { react } from "./react";
import { Actions, Timing } from "./actions";
import { GameContext } from "shared/game_context";
import { chooseCards } from "shared/choose_cards";
import { PlayerCard } from "shared/objects/abstracts/card_inherits/player_card";
import { discard } from "./discard";

interface Params {
	initiator: GamePlayer;
	using: Skill;
	bonusSkill?: number;
	against: number;
}

export function skillTest(params: Params): [success: boolean, byHowMuch: number] {
	react(Timing.WHEN, Actions.SKILLTEST);
	// if (cantDo()) {
	// 	return;
	// }

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

	let bonus = 0;
	for (const card of committedCards) {
		bonus += (card as PlayerCard).skills[params.using];
		bonus += (card as PlayerCard).skills[Skill.Wildcard];
	}

	const token = GameContext.chaos_bag!.pull();
	const result = GameContext.scenario_card!.resolve(token, params.initiator);
	const total = params.initiator.investigator.skills[params.using] + result + bonus;
	const successful = total >= params.against;

	for (const card of committedCards) {
		discard(card);
	}

	return [successful, total];
}
