import { PlayerCard } from "./objects/abstracts/card_inherits/player_card";
import { GamePlayer } from "./objects/player";
import { Server_SkillCheck_Pub, Server_SkillCheck_Sub } from "./remotes/SkillCheck/Interface";
import { GameContext } from "./game_context";
import { Investigator } from "./objects/abstracts/card_inherits/player_card_inherits/investigator";

let cards: Record<string, PlayerCard[]> = {}
let submittedCount = 0;

Server_SkillCheck_Sub((plr, selectedCards) => {
    cards[plr.Name] = selectedCards;
    submittedCount++;
})

// TODO: limit to 1 for allies and those only in the same location

export function skillCheck(initiator: GamePlayer, against: number, using: string): [passed: boolean, byHowMuch: number] {
    cards = {}
    submittedCount = 0;

    Server_SkillCheck_Pub(initiator, using)

    do { task.wait() } while(submittedCount !== GameContext.players.size())

    let total = 0;
    for(const plr of GameContext.players) {
        for(const card of cards[plr.owner.Name]) {
            total += card[using as keyof PlayerCard] as number;
            plr.discard.addCard(plr.hand.remove(plr.hand.indexOf(card))!)
        }
    }

    const final = total + (initiator.investigator[using as keyof Investigator] as number)

    return [ final >= against, final - against ]
}