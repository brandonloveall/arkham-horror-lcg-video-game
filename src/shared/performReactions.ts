import { CardRegistry } from "./card_registry";
import { WhatHappened } from "./game_context";
import { GamePlayer } from "./objects/player";

export function performReactions(whatHappened: WhatHappened, plr: GamePlayer, ...args: unknown[]) {
    for(const card of CardRegistry.getAll()) {
        if(card.reactions && card.reactions[whatHappened]) {
            if(!card.reactions[whatHappened].optional) { card.reactions[whatHappened].reaction(plr, ...args) }
        }
    }
}