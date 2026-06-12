import { WhatHappened } from "./game_context";
import { reactions } from "./objects/abstracts/card";
import { PlayerCard } from "./objects/abstracts/card_inherits/player_card";

export function basicPlay(card: PlayerCard): reactions {
    return {
        [WhatHappened.PLAYER_TURN_BEGAN]: {
            reaction: () => { card.playable = true; },
            optional: false
        },
        [WhatHappened.PLAYER_TURN_ENDED]: {
            reaction: () => { card.playable = false; },
            optional: false
        }
    };
}