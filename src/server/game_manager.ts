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
import { ChaosBag, IconToken } from "../shared/objects/chaos_bag";
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

let endedTurn = false;
(ReplicatedStorage.WaitForChild("TS").WaitForChild("remotes").WaitForChild("Actions").WaitForChild("EndTurn") as RemoteEvent).OnServerEvent.Connect(() => { if(GameContext.lock){ return; } endedTurn = true })


// TODO: take in an input to start a campaign. currently this is hard coded to be Night of the Zealot
export function start() {
    GameContext.players = [
        new GamePlayer(
            Players.GetPlayers()[0],
            new Deck([
                new _01506(),
                new _01516(),
                new _01517(),
                new _01518(),
                new _01519(),
                new _01520(),
                new _01521(),
                new _01530(),
                new _01531(),
                new _01532(),
                new _01533(),
                new _01534(),
                new _01535(),
                new _01586(),
                new _01586(),
                new _01587(),
                new _01587(),
                new _01522(),
                new _01523(),
                new _01524(),
                new _01536(),
                new _01537(),
                new _01538(),
                new _01588(),
                new _01588(),
                new _01525(),
                new _01539(),
                new _01589(),
                new _01589(),
                new _01592(),
                new _01592(),
                new _01507(),
                new _01602(),
            ]),
            new _01501())
    ];
    GameContext.agenda = new _01105()
    GameContext.act = new _01108();
    GameContext.chaos_bag = new ChaosBag([1, 0, 0, -1, -1, -1, -2, -2, -3, -4, IconToken.skull, IconToken.skull, IconToken.cultist, IconToken.tablet, IconToken.auto_fail, IconToken.elder_sign]);
    GameContext.encounter_deck = new Deck([
        new _01159(),
        new _01159(),
        new _01159(),
        new _01160(),
        new _01160(),
        new _01160(),
        new _01161(),
        new _01162(),
        new _01162(),
        new _01162(),
        new _01163(),
        new _01163(),
        new _01163(),
        new _01164(),
        new _01164(),
        new _01165(),
        new _01165(),
        new _01166(),
        new _01166(),
        new _01166(),
        new _01167(),
        new _01167(),
        new _01168(),
        new _01168()
    ]);
    GameContext.scenario_card = new _01104();

    GameContext.encounter_deck.shuffle();

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

    for(const plr of GameContext.players) {
        plr.location = (new _01111()).place([5, 5])
        plr.investigator.place(GameContext.game_map[5][5]!)
    }
    task.spawn(investigatorPhase)
}

function investigatorPhase() {
    for(const plr of GameContext.players) {
        performReactions(WhatHappened.PLAYER_TURN_BEGAN, plr)
        endedTurn = false
        GameContext.player_with_turn = plr;
        plr.actions = 3
        plr.update()
        do { task.wait() } while(!endedTurn)
        performReactions(WhatHappened.PLAYER_TURN_BEGAN, plr)
    }
    task.spawn(enemyPhase)
}

function enemyPhase() {
    // TODO: if enemy is a hunter and not engaged, it moves towards closest investigator; randomly if multiple equidistant. if it has prey, only go after prey

    for(const card of CardRegistry.getAll()) {
        if(card instanceof EnemyCard && card.engagedWith !== undefined && card.is_ready) {
            card.attack(card.engagedWith)
            card.is_ready = false
        }
    }
    task.spawn(upkeepPhase)
}

function upkeepPhase() {
    for(const plr of GameContext.players) {
        plr.resources++;
        plr.draw(true);
        if(plr.hand.size() > 8) { discard(plr, plr.hand, plr.hand.size() - 8) }
    }

    for(const card of CardRegistry.getAll()) {
        if("is_ready" in card) {
            card.is_ready = true;
            if(card instanceof EnemyCard && card.engagedWith === undefined) {
                for(const plr of GameContext.players) {
                    // TODO: if its a hunter with prey, only go to that one
                    if(plr.location === card.location) { card.engagedWith = plr; plr.threat_area.push(card); break }
                }
            }
        }
    }

    task.spawn(mythosPhase)
}

function mythosPhase() {
    for(const plr of GameContext.players) {
        if(GameContext.encounter_deck!.isEmpty()) {
            GameContext.encounter_deck, GameContext.encounter_discard = GameContext.encounter_discard, GameContext.encounter_deck
            GameContext.encounter_deck!.shuffle()
        }

        let drawnCard = GameContext.encounter_deck!.pull()!
        drawnCard.inPlay = true;
        // TODO: if enemy has specific spawn location, spawn it there
        if(drawnCard instanceof EnemyCard) {
            drawnCard.place(plr.location)
            drawnCard.engagedWith = plr
            drawnCard.is_ready = true
            plr.threat_area.push(drawnCard)
        }
        else if(drawnCard instanceof TreacheryCard) {
            drawnCard.resolve(plr)
        }
    }
    task.spawn(investigatorPhase)
}