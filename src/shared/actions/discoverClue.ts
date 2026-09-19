import { LocationCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card";
import { GamePlayer } from "shared/objects/player";
import { react } from "./react";
import { Actions, Timing } from "./action_types";
import { PlaySound_Pub } from "shared/remotes/PlaySound/Interface";

interface Params {
	discoverer: GamePlayer;
	location: LocationCard;
	amount: number;
}

export function discoverClue(params: Params) {
	// if (cantDo()) {
	// 	return;
	// }

	// payActionCost();

	react(Timing.WHEN, Actions.DISCOVER_CLUE);

	// if (cantDo()) {
	// 	return;
	// }

	if (params.location.clues > 0) {
		if (params.location.clues >= params.amount) {
			params.location.clues -= params.amount;
			params.discoverer.clues += params.amount;
		} else {
			params.discoverer.clues += params.location.clues;
			params.location.clues = 0;
		}
		PlaySound_Pub("CluesFound");
	}

	react(Timing.AFTER, Actions.DISCOVER_CLUE);
}
