import { LocationCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card";
import { GamePlayer } from "shared/objects/player";
import { Actions, Timing } from "./action_types";
import { react } from "./react";
import { giveChoice } from "shared/giveChoice";
import { PlaySound_Pub } from "shared/remotes/PlaySound/Interface";

interface Params {
	initiator: GamePlayer;
	locations: LocationCard[];
}

export function move(params: Params) {
	// if (cantDo()) {
	// 	return;
	// }

	// payActionCost();
	let location!: LocationCard;
	giveChoice(
		params.initiator,
		"Move to: ",
		params.locations.map((e) => {
			return {
				text: `${e.name}`,
				outcome: () => {
					location = e;
				},
			};
		}),
	);

	react(Timing.WHEN, Actions.FIGHT);

	// if (cantDo()) {
	// 	return;
	// }
	params.initiator.investigator.move(location);
	params.initiator.location = location;
	PlaySound_Pub("Move");

	react(Timing.AFTER, Actions.MOVE);
}
