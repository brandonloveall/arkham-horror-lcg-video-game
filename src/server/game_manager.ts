import { DataStoreService, Players } from "@rbxts/services";
import { GamePlayer } from "./player";
import { Deck } from "./deck";
import { _01501 } from "./tangible_cards/01501";
import { _01506 } from "./tangible_cards/01506";
import { _01507 } from "./tangible_cards/01507";
import { _01516 } from "./tangible_cards/01516";
import { _01517 } from "./tangible_cards/01517";
import { _01518 } from "./tangible_cards/01518";
import { _01519 } from "./tangible_cards/01519";
import { _01520 } from "./tangible_cards/01520";
import { _01521 } from "./tangible_cards/01521";
import { _01522 } from "./tangible_cards/01522";
import { _01523 } from "./tangible_cards/01523";
import { _01524 } from "./tangible_cards/01524";
import { _01525 } from "./tangible_cards/01525";
import { _01530 } from "./tangible_cards/01530";
import { _01531 } from "./tangible_cards/01531";
import { _01532 } from "./tangible_cards/01532";
import { _01533 } from "./tangible_cards/01533";
import { _01534 } from "./tangible_cards/01534";
import { _01535 } from "./tangible_cards/01535";
import { _01536 } from "./tangible_cards/01536";
import { _01537 } from "./tangible_cards/01537";
import { _01538 } from "./tangible_cards/01538";
import { _01539 } from "./tangible_cards/01539";
import { _01586 } from "./tangible_cards/01586";
import { _01587 } from "./tangible_cards/01587";
import { _01588 } from "./tangible_cards/01588";
import { _01589 } from "./tangible_cards/01589";
import { _01592 } from "./tangible_cards/01592";
import { _01602 } from "./tangible_cards/01602";
import { ActCard } from "./abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/act_card";
import { AgendaCard } from "./abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/agenda_card";
import { _01105 } from "./tangible_cards/01105";
import { _01108 } from "./tangible_cards/01108";
import { ChaosBag, IconToken } from "./chaos_bag";
import { NonplayerCard } from "./abstracts/card_inherits/nonplayer_card";

let players: GamePlayer[] = []

let currentAct!: ActCard
let currentAgenda!: AgendaCard
let chaosBag!: ChaosBag

export function start() {
    players = [
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
    ]

    currentAgenda = new _01105();
    currentAct = new _01108();
    chaosBag = new ChaosBag([1, 0, 0, -1, -1, -1, -2, -2, -3, -4, IconToken.skull, IconToken.skull, IconToken.cultist, IconToken.tablet, IconToken.auto_fail, IconToken.elder_sign]);

    for(const player of players) {
        player.deck.shuffle();
        player.resources = 5;
        for(let i = 0; i < 5; i++) {
            let card = player.deck.pull()!
            if(card instanceof NonplayerCard) {
                player.deck.addCard(card);
            } else {
                player.hand.push(card);
            }
        }
        player.deck.shuffle();
    }

    return players[0];
}