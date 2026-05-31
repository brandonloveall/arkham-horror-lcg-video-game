import { Players } from "@rbxts/services";
import { Deck } from "./deck"
import { _01525 } from "./tangible_cards/01525";
import { GamePlayer } from "./player";
import { _01501 } from "./tangible_cards/01501";
import { PlayerCard } from "./abstracts/card_inherits/player_card";

let testPlr = new GamePlayer(Players.GetPlayers()[0], new Deck([new _01525()]), new _01501())

testPlr.resources = 3
testPlr.hand.push(testPlr.deck.pull() as PlayerCard)
testPlr.hand.push(testPlr.deck.pull() as PlayerCard)
testPlr.hand.push(testPlr.deck.pull() as PlayerCard)