import { Card } from "./objects/abstracts/card";
import { PlayerCard } from "./objects/abstracts/card_inherits/player_card";
import { GamePlayer } from "./objects/player";
import { Server_ChooseCards_Pub, Server_ChooseCards_Sub } from "./remotes/ChooseCards/Interface";

let chosenCards: PlayerCard[] = []
let finished = false;

Server_ChooseCards_Sub((plr: Player, cards: Card[]) => { finished = true; chosenCards = cards as PlayerCard[] })

export function discard(who: GamePlayer, whats: PlayerCard[], amount?: number) {
    finished = false
    Server_ChooseCards_Pub(who, whats, amount)
    do { task.wait() } while (!finished)

    for(const card of chosenCards) {
        who.discard(card.id)
    }
}