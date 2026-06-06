import { PlayerCard } from "./objects/abstracts/card_inherits/player_card";
import { GamePlayer } from "./objects/player";
import { Server_ChooseCards_Sub, Server_ChooseCards_Pub } from "./remotes/ChooseCards/Interface";
import { GameContext } from "./game_context";
import { Investigator } from "./objects/abstracts/card_inherits/player_card_inherits/investigator";

let cards: Record<string, PlayerCard[]> = {}
let submittedCount = 0;

Server_ChooseCards_Sub((plr, selectedCards) => {
    cards[plr.Name] = selectedCards as PlayerCard[];
    submittedCount++;
})

// TODO: limit to 1 for allies and those only in the same location

export function skillCheck(initiator: GamePlayer, against: number, using: string): [passed: boolean, byHowMuch: number] {
    cards = {}
    submittedCount = 0;

    for(const plr of GameContext.players) {
        Server_ChooseCards_Pub(plr, plr.hand.filter((e) => { return (e as PlayerCard)[using as keyof PlayerCard] !== 0 }), plr === initiator ? undefined : 1)
    }

    do { task.wait() } while (submittedCount !== GameContext.players.size())

    let total = 0;
    for (const plr of GameContext.players) {
        for (const card of cards[plr.owner.Name]) {
            total += card[using as keyof PlayerCard] as number;
            plr.discard(card.id)
            plr.update()
        }
    }

    const final = total + (initiator.investigator[using as keyof Investigator] as number)

    return [final >= against, final - against]
}