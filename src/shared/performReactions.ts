import { CardRegistry } from "./card_registry";
import { WhatHappened } from "./game_context";
import { giveChoice } from "./giveChoice";
import { GamePlayer } from "./objects/player";

export function performReactions(whatHappened: WhatHappened, plr: GamePlayer, ...args: unknown[]) {
    for(const card of CardRegistry.getAll()) {
        if(card.reactions && card.reactions[whatHappened]) {
            if(!card.reactions[whatHappened].optional) { card.reactions[whatHappened].reaction(plr, ...args) }
            else{
                if(!card.reactions![whatHappened]!.canUseReaction!(plr, ...args)) { return; }
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
}