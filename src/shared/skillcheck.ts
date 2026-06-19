import { PlayerCard } from "./objects/abstracts/card_inherits/player_card";
import { GamePlayer } from "./objects/player";
import { Server_ChooseCards_Sub, Server_ChooseCards_Pub } from "./remotes/ChooseCards/Interface";
import { GameContext, WhatHappened } from "./game_context";
import { Investigator } from "./objects/abstracts/card_inherits/player_card_inherits/investigator";
import { SkillCheckAnimation_Pub } from "./remotes/SkillCheckAnimation/Interface";
import { performReactions } from "./performReactions";

let cards: Record<string, PlayerCard[]> = {}
let submittedCount = 0;

Server_ChooseCards_Sub((plr, selectedCards) => {
    cards[plr.Name] = selectedCards as PlayerCard[];
    submittedCount++;
})

// TODO: limit to 1 for allies and those only in the same location

export function skillCheck(skillCheckObj: {initiator: GamePlayer, against: number, using: string, bonus?: number}): [passed: boolean, byHowMuch: number] {
    GameContext.lock = true

    const { initiator, against, using, bonus = 0 } = skillCheckObj

    performReactions(WhatHappened.SKILL_CHECK_START, initiator)
    cards = {}
    submittedCount = 0;

    for(const plr of GameContext.players) {
        Server_ChooseCards_Pub(
            plr,
            plr.hand.filter((e) => { return (e)[using as keyof PlayerCard] !== 0 }),
            `Skill Check by ${initiator.owner.Name}: ${initiator.investigator.getSkill(using)} against ${against} using ${using}.`,
            plr === initiator ? undefined : 1)
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

    let pulledToken = GameContext.chaos_bag!.pull()
    let finalToken = 0

    if(pulledToken > 1) { // if its an IconToken
        finalToken = GameContext.scenario_card!.resolve(pulledToken)
    }

    const final = total + (initiator.investigator[using as keyof Investigator] as number) + finalToken + bonus

    SkillCheckAnimation_Pub(initiator.investigator[using as keyof Investigator] as number, total, pulledToken, finalToken)
    
    GameContext.lock = false
    performReactions(WhatHappened.SKILL_CHECK_ENDED, initiator)
    return [final >= against, final - against]
}