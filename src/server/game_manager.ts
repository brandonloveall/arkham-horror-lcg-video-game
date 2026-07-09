import { Players, ReplicatedStorage } from "@rbxts/services";
import { GamePlayer } from "../shared/objects/player";
import { Deck } from "../shared/objects/deck";

import { _01501 } from "../shared/objects/tangible_cards/01501";
import { _01506 } from "../shared/objects/tangible_cards/01506";
import { _01507 } from "../shared/objects/tangible_cards/01507";
import { _01516 } from "../shared/objects/tangible_cards/01516";
import { _01517 } from "../shared/objects/tangible_cards/01517";
import { _01518 } from "../shared/objects/tangible_cards/01518";
import { _01519 } from "../shared/objects/tangible_cards/01519";
import { _01520 } from "../shared/objects/tangible_cards/01520";
import { _01521 } from "../shared/objects/tangible_cards/01521";
import { _01522 } from "../shared/objects/tangible_cards/01522";
import { _01523 } from "../shared/objects/tangible_cards/01523";
import { _01524 } from "../shared/objects/tangible_cards/01524";
import { _01525 } from "../shared/objects/tangible_cards/01525";
import { _01530 } from "../shared/objects/tangible_cards/01530";
import { _01531 } from "../shared/objects/tangible_cards/01531";
import { _01532 } from "../shared/objects/tangible_cards/01532";
import { _01533 } from "../shared/objects/tangible_cards/01533";
import { _01534 } from "../shared/objects/tangible_cards/01534";
import { _01535 } from "../shared/objects/tangible_cards/01535";
import { _01536 } from "../shared/objects/tangible_cards/01536";
import { _01537 } from "../shared/objects/tangible_cards/01537";
import { _01538 } from "../shared/objects/tangible_cards/01538";
import { _01539 } from "../shared/objects/tangible_cards/01539";
import { _01586 } from "../shared/objects/tangible_cards/01586";
import { _01587 } from "../shared/objects/tangible_cards/01587";
import { _01588 } from "../shared/objects/tangible_cards/01588";
import { _01589 } from "../shared/objects/tangible_cards/01589";
import { _01592 } from "../shared/objects/tangible_cards/01592";
import { _01602 } from "../shared/objects/tangible_cards/01602";
import { _01105 } from "../shared/objects/tangible_cards/01105";
import { _01108 } from "../shared/objects/tangible_cards/01108";
import { NonplayerCard } from "../shared/objects/abstracts/card_inherits/nonplayer_card";
import { _01159 } from "../shared/objects/tangible_cards/01159";
import { _01160 } from "../shared/objects/tangible_cards/01160";
import { _01161 } from "../shared/objects/tangible_cards/01161";
import { _01162 } from "../shared/objects/tangible_cards/01162";
import { _01163 } from "../shared/objects/tangible_cards/01163";
import { _01164 } from "../shared/objects/tangible_cards/01164";
import { _01165 } from "../shared/objects/tangible_cards/01165";
import { _01166 } from "../shared/objects/tangible_cards/01166";
import { _01167 } from "../shared/objects/tangible_cards/01167";
import { _01168 } from "../shared/objects/tangible_cards/01168";
import { _01111 } from "../shared/objects/tangible_cards/01111";
import { GameContext, WhatHappened } from "shared/game_context";
import { CardRegistry } from "shared/card_registry";
import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { TreacheryCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/treachery_card";
import { discard } from "shared/discard";
import { PlayerCard } from "shared/objects/abstracts/card_inherits/player_card";
import { performReactions } from "shared/performReactions";
import { _01104 } from "shared/objects/tangible_cards/01104";
import { EndTurn_Sub } from "shared/remotes/Actions/Interface";
import { ScenarioCard } from "shared/objects/abstracts/card_inherits/scenario_card";
import { ChaosBag, IconToken } from "shared/objects/chaos_bag";

let endedTurn = false;
EndTurn_Sub((plr) => { if(plr !== GameContext.player_with_turn!.owner) { return; }  endedTurn = true; })


// TODO: take in an input to start a campaign. currently this is hard coded to be Night of the Zealot
export function start(startingScenario: new () => ScenarioCard, chaosTokens: (number | IconToken)[]) {
    GameContext.scenario_card = new startingScenario()
    GameContext.chaos_bag = new ChaosBag(chaosTokens)
    GameContext.players = [
        new GamePlayer(
            Players.GetPlayers()[0],
            new Deck([
                _01506,
                _01516,
                _01517,
                _01518,
                _01519,
                _01520,
                _01521,
                _01530,
                _01531,
                _01532,
                _01533,
                _01534,
                _01535,
                _01586,
                _01586,
                _01587,
                _01587,
                _01522,
                _01523,
                _01524,
                _01536,
                _01537,
                _01538,
                _01588,
                _01588,
                _01525,
                _01539,
                _01589,
                _01589,
                _01592,
                _01592,
                _01507,
                _01602,
            ]),
            new _01501())
    ];

    GameContext.encounter_deck!.shuffle();

    for (const player of GameContext.players) {
        player.deck.shuffle();
        player.resources = 5;
        for (let i = 0; i < 5; i++) {
            let card = player.deck.pull()!
            if (card instanceof NonplayerCard) {
                player.deck.addCard(card);
                i--;
            } else {
                player.hand.push(card as PlayerCard);
            }
        }
        player.deck.shuffle();
    }

    for (const plr of GameContext.players) {
        plr.location = (new _01111()).place([5, 5])
        plr.investigator.place(GameContext.game_map[5][5]!)
    }
    task.spawn(investigatorPhase)
}

function investigatorPhase() {
    for (const plr of GameContext.players) {
        performReactions(WhatHappened.PLAYER_TURN_BEGAN, plr)
        endedTurn = false
        GameContext.player_with_turn = plr;
        plr.actions = 3
        plr.update()
        do { task.wait() } while (!endedTurn)
        performReactions(WhatHappened.PLAYER_TURN_ENDED, plr)
    }
    task.spawn(enemyPhase)
}

function enemyPhase() {
    // TODO: if enemy is a hunter and not engaged, it moves towards closest investigator; randomly if multiple equidistant. if it has prey, only go after prey

    for (const card of CardRegistry.getAll()) {
        if (card instanceof EnemyCard && card.engagedWith !== undefined && card.is_ready) {
            card.attack(card.engagedWith)
            card.is_ready = false
        }
    }
    task.spawn(upkeepPhase)
}

function upkeepPhase() {
    for (const plr of GameContext.players) {
        plr.resources++;
        if (plr.deck.size() === 0) { plr.deck, plr.discardDeck = plr.discardDeck, plr.deck; plr.deck.shuffle() }
        const card = plr.deck.pull()

        if (card instanceof EnemyCard) {
            card.place(plr.location)
            card.engagedWith = plr
            card.is_ready = true
            plr.threat_area.push(card)
        }
        else if (card instanceof TreacheryCard) {
            card.resolve(plr)
        } else {
            plr.hand.push(card as PlayerCard);
            if (plr.hand.size() > 8) { discard(plr, plr.hand, plr.hand.size() - 8) }
        }
    }

    for (const card of CardRegistry.getAll()) {
        if ("is_ready" in card) {
            card.is_ready = true;
            if (card instanceof EnemyCard && card.engagedWith === undefined) {
                for (const plr of GameContext.players) {
                    // TODO: if its a hunter with prey, only go to that one
                    if (plr.location === card.location) { card.engagedWith = plr; plr.threat_area.push(card); break }
                }
            }
        }
    }

    task.spawn(mythosPhase)
}

function mythosPhase() {
    for (const plr of GameContext.players) {
        if (GameContext.encounter_deck!.isEmpty()) {
            GameContext.encounter_deck, GameContext.encounter_discard = GameContext.encounter_discard, GameContext.encounter_deck
            GameContext.encounter_deck!.shuffle()
        }

        let drawnCard = GameContext.encounter_deck!.pull()!
        drawnCard.inPlay = true;
        // TODO: if enemy has specific spawn location, spawn it there
        if (drawnCard instanceof EnemyCard) {
            drawnCard.place(plr.location)
            drawnCard.engagedWith = plr
            drawnCard.is_ready = true
            plr.threat_area.push(drawnCard)
        }
        else if (drawnCard instanceof TreacheryCard) {
            drawnCard.resolve(plr)
        }
    }
    task.spawn(investigatorPhase)
}