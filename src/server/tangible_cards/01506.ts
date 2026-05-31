
import { AssetCard } from "server/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";

export class _01506 extends AssetCard {
    slot = "Hand";
    cost = 3;
    skill_agility = 1;
    skill_combat = 1;
    skill_intellect = 0;
    skill_willpower = 0;
    skill_wildcard = 0;
    xp = 0;
    deck_limit = 1;
    code = "01506";
    pack_name = "Revised Core Set";
    type_name = "Asset";
    faction_name = "Neutral";
    position = 6;
    exceptional = false;
    myriad = false;
    name = "Roland's .38 Special";
    quantity = 1;
    health_per_investigator = false;
    is_unique = true;
    permanent = false;
    double_sided = false;
    text = `Roland Banks deck only.
Uses (4 ammo).
[action] Spend 1 ammo: <b>Fight.</b> You get +1 [combat] for this attack (if there are 1 or more clues on your location, you get +3 [combat], instead). This attack deals +1 damage.`;
    traits = "Item. Weapon. Firearm.";
    flavor = ``;
    subname = "";
    restrictions = {"investigator":{"01001":"01001"}};
}