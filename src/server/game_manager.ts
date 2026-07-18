import { Players } from "@rbxts/services";
import { GamePlayer } from "../shared/objects/player";
import { Deck } from "../shared/objects/deck";

import { NonplayerCard } from "../shared/objects/abstracts/card_inherits/nonplayer_card";
import { GameContext, WhatHappened } from "shared/game_context";
import { CardRegistry } from "shared/card_registry";
import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { TreacheryCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/treachery_card";
import { discard } from "shared/discard";
import { PlayerCard } from "shared/objects/abstracts/card_inherits/player_card";
import { performReactions } from "shared/performReactions";
import { EndTurn_Sub } from "shared/remotes/Actions/Interface";
import { ScenarioCard } from "shared/objects/abstracts/card_inherits/scenario_card";
import { ChaosBag, IconToken } from "shared/objects/chaos_bag";
import { getPlrsSelectedDeck } from "./deck_handler";

let endedTurn = false;
EndTurn_Sub((plr) => {
	if (plr !== GameContext.player_with_turn!.owner) {
		return;
	}
	endedTurn = true;
});

export function start(startingScenario: new () => ScenarioCard, chaosTokens: (number | IconToken)[]) {
	GameContext.scenario_card = new startingScenario();
	GameContext.players = [];

	GameContext.chaos_bag = new ChaosBag(chaosTokens);

	for (const plr of Players.GetPlayers()) {
		const [deck, investigator] = getPlrsSelectedDeck(Players.GetPlayers()[0])!;
		GameContext.players.push(new GamePlayer(plr, new Deck(deck), new investigator()));
	}

	GameContext.scenario_card.setup();
	GameContext.encounter_deck!.shuffle();

	for (const player of GameContext.players) {
		player.deck.shuffle();
		player.resources = 5;
		for (let i = 0; i < 5; i++) {
			const card = player.deck.pull()!;
			if (card instanceof NonplayerCard) {
				player.deck.addCard(card);
				i--;
			} else {
				player.hand.push(card as PlayerCard);
			}
		}
		player.deck.shuffle();
	}

	task.spawn(investigatorPhase);
}

function investigatorPhase() {
	for (const plr of GameContext.players) {
		performReactions(WhatHappened.PLAYER_TURN_BEGAN, plr);
		endedTurn = false;
		GameContext.player_with_turn = plr;
		plr.actions = 3;
		plr.update();
		do {
			task.wait();
		} while (!endedTurn);
		performReactions(WhatHappened.PLAYER_TURN_ENDED, plr);
	}
	task.spawn(enemyPhase);
}

function enemyPhase() {
	// TODO: if enemy is a hunter and not engaged, it moves towards closest investigator; randomly if multiple equidistant. if it has prey, only go after prey

	for (const card of CardRegistry.getAll()) {
		if (card instanceof EnemyCard && card.engagedWith !== undefined && card.is_ready) {
			card.attack(card.engagedWith);
			card.is_ready = false;
		}
	}
	task.spawn(upkeepPhase);
}

function upkeepPhase() {
	for (const plr of GameContext.players) {
		plr.resources++;
		if (plr.deck.size() === 0) {
			const temp = plr.deck;
			plr.deck = plr.discardDeck;
			plr.discardDeck = temp;
			plr.deck.shuffle();
		}
		const card = plr.deck.pull();

		if (card instanceof EnemyCard) {
			card.place(plr.location);
			card.engagedWith = plr;
			card.is_ready = true;
			plr.threat_area.push(card);
		} else if (card instanceof TreacheryCard) {
			card.resolve(plr);
		} else {
			plr.hand.push(card as PlayerCard);
			if (plr.hand.size() > 8) {
				discard(plr, plr.hand, plr.hand.size() - 8);
			}
		}
	}

	for (const card of CardRegistry.getAll()) {
		if ("is_ready" in card) {
			card.is_ready = true;
			if (card instanceof EnemyCard && card.engagedWith === undefined) {
				for (const plr of GameContext.players) {
					// TODO: if its a hunter with prey, only go to that one
					if (plr.location === card.location) {
						card.engagedWith = plr;
						plr.threat_area.push(card);
						break;
					}
				}
			}
		}
	}

	task.spawn(mythosPhase);
}

function mythosPhase() {
	for (const plr of GameContext.players) {
		if (GameContext.encounter_deck!.isEmpty()) {
			const temp = GameContext.encounter_deck;
			GameContext.encounter_deck = GameContext.encounter_discard;
			GameContext.encounter_discard = temp!;
			GameContext.encounter_deck!.shuffle();
		}

		const drawnCard = GameContext.encounter_deck!.pull()!;
		drawnCard.inPlay = true;
		// TODO: if enemy has specific spawn location, spawn it there
		if (drawnCard instanceof EnemyCard) {
			drawnCard.place(plr.location);
			drawnCard.engagedWith = plr;
			drawnCard.is_ready = true;
			plr.threat_area.push(drawnCard);
		} else if (drawnCard instanceof TreacheryCard) {
			drawnCard.resolve(plr);
		}
	}
	task.spawn(investigatorPhase);
}
