import { LocationCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card";
import { GamePlayer } from "shared/objects/player";
import { Actions, Timing } from "./action_types";
import { react } from "./react";
import { giveChoice } from "shared/giveChoice";
import { PlaySound_Pub } from "shared/remotes/PlaySound/Interface";
import { canPayCost, Cost, payCost } from "./payCost";
import { canDo } from "./canDo";

export interface Params {
	initiator: GamePlayer;
	locations: LocationCard[];

	cost: Cost;
}

export function move(params: Params) {
	if (params.locations.size() === 0) {
		return;
	}

	if (!canDo(params.initiator) || !canPayCost(params.initiator, params.cost)) {
		return;
	}

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

	payCost(params.initiator, params.cost);

	react(Timing.WHEN, Actions.FIGHT);

	if (!canDo(params.initiator)) {
		return;
	}
	params.initiator.investigator.move(location);
	params.initiator.location = location;
	if (!params.initiator.location.revealed) {
		params.initiator.location.reveal();
	}
	params.initiator.location.reveal();
	PlaySound_Pub("Move");

	react(Timing.AFTER, Actions.MOVE);
}
