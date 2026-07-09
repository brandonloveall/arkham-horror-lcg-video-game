
import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { GamePlayer } from "../player";
import { WhatHappened } from "shared/game_context";
import { reactions } from "shared/objects/abstracts/card";
import { giveChoice } from "shared/giveChoice";

export class _01517 extends AssetCard {
    slot = "";
    cost = 2;
    skill_agility = 0;
    skill_combat = 1;
    skill_intellect = 0;
    skill_willpower = 1;
    skill_wildcard = 0;
    xp = 0;
    deck_limit = 2;
    code = "01517";
    pack_name = "Revised Core Set";
    type_name = "Asset";
    faction_name = "Guardian";
    position = 17;
    exceptional = false;
    myriad = false;
    name = "Physical Training";
    quantity = 2;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `[fast] Spend 1 resource: You get +1 [willpower] for this skill test.
[fast] Spend 1 resource: You get +1 [combat] for this skill test.`;
    traits = "Talent.";
    flavor = ``;
    subname = "";

    added_willpower = 0;
    added_combat = 0;

    reactions: reactions = {
        [WhatHappened.SKILL_CHECK_START]: {
            reaction: (initiator: GamePlayer) => {
                this.usable = true;
                this.added_willpower = 0;
                this.added_combat = 0;
            },
            optional: false
        },
        [WhatHappened.SKILL_CHECK_ENDED]: {
            reaction: (initiator: GamePlayer) => {
                this.usable = false;
                initiator.investigator.skill_willpower -= this.added_willpower;
                initiator.investigator.skill_combat -= this.added_combat
            },
            optional: false
        },
    }

    ability(plr: GamePlayer) {
        if(plr.resources < 1) { return; }
        giveChoice(plr, [
            {
                text: "-1 resource, +1 willpower",
                outcome: () => {
                    plr.resources--;
                    plr.investigator.skill_willpower++;
                    this.added_willpower++;
                }
            },
            {
                text: "-1 resource, +1 combat",
                outcome: () => {
                    plr.resources--;
                    plr.investigator.skill_combat++
                }
            },
        ])
    }
}