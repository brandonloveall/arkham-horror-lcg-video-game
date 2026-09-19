import { Skill } from "shared/card_database_types";
import { LocationCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card";
import { GamePlayer } from "shared/objects/player";
import { react } from "./react";
import { Actions, Timing } from "./action_types";
import { skillTest } from "./skilltest";
import { discoverClue } from "./discoverClue";

interface Params {
	initiator: GamePlayer;
	location: LocationCard;
	using: Skill;
	bonusSkill?: number;
}

export function investigate(params: Params) {
	// if (cantDo()) {
	// 	return;
	// }

	// payActionCost();

	react(Timing.WHEN, Actions.INVESTIGATE);

	// if (cantDo()) {
	// 	return;
	// }

	const [success] = skillTest({
		initiator: params.initiator,
		using: params.using,
		against: params.location.shroud,
		bonusSkill: params.bonusSkill,
	});

	if (success) {
		discoverClue({ discoverer: params.initiator, location: params.location, amount: 1 });
	}

	react(Timing.AFTER, Actions.INVESTIGATE);
}
