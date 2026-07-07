import { CardRegistry } from "./card_registry";
import { GameContext, WhatHappened } from "./game_context";
import { giveChoice } from "./giveChoice";
import { GamePlayer } from "./objects/player";

export function performReactions(whatHappened: WhatHappened, plr: GamePlayer, ...args: unknown[]) {
    GameContext.lock = true;
    GameContext.most_recent_happening = {
        happening: whatHappened,
        who: plr
    }
    for(const card of CardRegistry.getAll()) {
        if(card.inPlay && card.reactions && card.reactions[whatHappened]) {
            if(!card.reactions[whatHappened].optional) { card.reactions[whatHappened].reaction(plr, ...args); wait(3) } // 3 seconds is the flat amount of time for ANY non-optional reaction for players to play reaction cards
            else{
                if(!card.reactions![whatHappened]!.canUseReaction!(plr, ...args)) { continue; }
                giveChoice(plr, [
                    {
                        text: `Use ${card.name}'s reaction`,
                        outcome: () => card.reactions![whatHappened]!.reaction(plr, ...args)
                    },
                    {
                        text: `Do not use ${card.name}'s reaction`,
                        outcome: () => {  }
                    }
                ])
            }
        }
    }
    GameContext.lock = false;
}