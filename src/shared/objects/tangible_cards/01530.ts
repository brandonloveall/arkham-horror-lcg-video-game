
import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { reactions } from "../abstracts/card";
import { WhatHappened } from "shared/game_context";
import { PlayerCard } from "../abstracts/card_inherits/player_card";
import { GamePlayer } from "../player";
import { LocationCard } from "../abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card";
import { getOwner } from "shared/findOwner";

export class _01530 extends AssetCard {
    slot = "Hand";
    cost = 1;
    skill_agility = 0;
    skill_combat = 0;
    skill_intellect = 1;
    skill_willpower = 0;
    skill_wildcard = 0;
    xp = 0;
    deck_limit = 2;
    code = "01530";
    pack_name = "Revised Core Set";
    type_name = "Asset";
    faction_name = "Seeker";
    position = 30;
    exceptional = false;
    myriad = false;
    name = "Magnifying Glass";
    quantity = 2;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `Fast.
You get +1 [intellect] while investigating.`;
    traits = "Item. Tool.";
    flavor = `A lens into a world unseen can reveal things you wish it hadn't.`;
    subname = "";

    fast = true;
    canPlayFast(plr: GamePlayer) {
        return true;
    }

    // reactions: reactions = {
    //     [WhatHappened.PLAYER_INVESTIGATED]: {
    //         reaction: (investigateObj: InvestigateObj) => {
    //             if(investigateObj.plr.name === getOwner(this)) { investigateObj.skill_bonus++; }
    //         },
    //         optional: false
    //     }
    // }

}