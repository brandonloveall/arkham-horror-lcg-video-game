import { GameContext } from "./game_context";
import { Card } from "./objects/abstracts/card";
import { GamePlayer } from "./objects/player";
import { Server_ChooseCards_Pub, Server_ChooseCards_Sub } from "./remotes/ChooseCards/Interface";

let cards: Record<string, Card[]> = {}
let submittedCount = 0;

Server_ChooseCards_Sub((plr, selectedCards) => {
    cards[plr.Name] = selectedCards;
    submittedCount++;
})

export function chooseCards(who: GamePlayer, what: Card[], message: string, amount?: number) {
    cards = {}
    submittedCount = 0;

    Server_ChooseCards_Pub(who, what, message, amount)

    do { task.wait() } while (submittedCount !== GameContext.players.size())

    return cards;
}