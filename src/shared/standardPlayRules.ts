import { WhatHappened } from "./game_context";
import { reactions } from "./objects/abstracts/card";
import { PlayerCard } from "./objects/abstracts/card_inherits/player_card";
import { GamePlayer } from "./objects/player";

export function standardPlayRules(card: PlayerCard): reactions {
    return {
        [WhatHappened.PLAYER_TURN_BEGAN]: {
            reaction: (plr: GamePlayer) => { if(plr.hand.includes(card)) { card.playable = true; }},
            optional: false
        },
        [WhatHappened.PLAYER_TURN_ENDED]: {
            reaction: (plr: GamePlayer) => { if(plr.hand.includes(card)) { card.playable = false; }},
            optional: false
        }
    };
}