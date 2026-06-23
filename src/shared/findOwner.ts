// circular dependencies cannot be sent across client/server boundary. to remedy this, a helper function to find a cards owner is needed

import { GameContext } from "./game_context";
import { Card } from "./objects/abstracts/card";
import { TreacheryCard } from "./objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/treachery_card";
import { PlayerCard } from "./objects/abstracts/card_inherits/player_card";
import { AssetCard } from "./objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";

export function getOwner(card: Card) {
    for(const plr of GameContext.players) {
        if(plr.hand.indexOf(card as PlayerCard)
        || plr.threat_area.indexOf(card as TreacheryCard)
        || plr.getAllEquipment().indexOf(card as AssetCard)
        ) { return plr; }
    }
}