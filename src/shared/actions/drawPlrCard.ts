import { GamePlayer } from "shared/objects/player";
import { Actions, Timing } from "./action_types";
import { react } from "./react";
import { EnemyCard } from "shared/objects/abstracts/card_inherits/enemy_card";
import { TreacheryCard } from "shared/objects/abstracts/card_inherits/treachery_card";
import { canPayCost, Cost, payCost } from "./payCost";
import { canDo } from "./canDo";
import { PlayerCard } from "shared/card_database_types";

export interface Params {
	drawer: GamePlayer;
	amount: number;

	cost: Cost;
}

export function drawPlrCard(params: Params) {
	if (!canDo(params.drawer) || !canPayCost(params.drawer, params.cost)) {
		return;
	}
	payCost(params.drawer, params.cost);

	react(Timing.WHEN, Actions.DRAW);

	if (!canDo(params.drawer)) {
		return;
	}

	const card = params.drawer.deck.pull();
	for (let i = 0; i < params.amount; i++) {
		if (card instanceof EnemyCard) {
			card.place(params.drawer.location);
			card.engagedWith = params.drawer;
		} else if (card instanceof TreacheryCard) {
			card.resolve(params.drawer);
		} else {
			// player card
			params.drawer.hand.push(card as PlayerCard);
		}
	}

	react(Timing.AFTER, Actions.DRAW);
}
