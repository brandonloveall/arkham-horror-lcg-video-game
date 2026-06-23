import { WhatHappened } from "./game_context";
import { reactions } from "./objects/abstracts/card";
import { PlayerCard } from "./objects/abstracts/card_inherits/player_card";
import { AssetCard } from "./objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { GamePlayer } from "./objects/player";

export function standardEventCard(card: PlayerCard): reactions {
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

export function standardAssetCard(card: AssetCard): reactions {
    return {
        [WhatHappened.PLAYER_TURN_BEGAN]: {
            reaction: (plr: GamePlayer) => { if(plr.hand.includes(card)) { card.usable = true; card.playable = true; }},
            optional: false
        },
        [WhatHappened.PLAYER_TURN_ENDED]: {
            reaction: (plr: GamePlayer) => { if(plr.hand.includes(card)) { card.usable = false; card.playable = false; }},
            optional: false
        }
    };
}