
import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { GamePlayer } from "../player";

export class _01587 extends AssetCard {
    slot = "Hand";
    cost = 2;
    skill_agility = 0;
    skill_combat = 0;
    skill_intellect = 1;
    skill_willpower = 0;
    skill_wildcard = 0;
    xp = 0;
    deck_limit = 2;
    code = "01587";
    pack_name = "Revised Core Set";
    type_name = "Asset";
    faction_name = "Neutral";
    position = 87;
    exceptional = false;
    myriad = false;
    name = "Flashlight";
    quantity = 10;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `Uses (3 supplies).
[action] Spend 1 supply: <b>Investigate.</b> Your location gets -2 shroud for this investigation.`;
    traits = "Item. Tool.";
    flavor = ``;
    subname = "";

    uses = 3;

    ability(plr: GamePlayer) {
        if(this.uses === 0) { return true; }
        this.uses--;
        plr.investigate({
            location: plr.location,
            skill: "skill_intellect",
            shroudModifier: -2
        })
        return true;
    }
}