
import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { GamePlayer } from "../player";
import { EnemyCard } from "../abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";

export class _01516 extends AssetCard {
    slot = "Hand";
    cost = 4;
    skill_agility = 1;
    skill_combat = 0;
    skill_intellect = 0;
    skill_willpower = 0;
    skill_wildcard = 0;
    xp = 0;
    deck_limit = 2;
    code = "01516";
    pack_name = "Revised Core Set";
    type_name = "Asset";
    faction_name = "Guardian";
    position = 16;
    exceptional = false;
    myriad = false;
    name = ".45 Automatic";
    quantity = 2;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `Uses (4 ammo).
[action] Spend 1 ammo: <b>Fight.</b> You get +1 [combat] for this attack. This attack deals +1 damage.`;
    traits = "Item. Weapon. Firearm.";
    flavor = ``;
    subname = "";

    uses = 4;

    ability(plr: GamePlayer) {
        if(this.uses === 0) { return true; }
        this.uses--;
        plr.fight({
            enemy: plr.selectedObject as EnemyCard,
            skill: "skill_combat",
            bonusStat: 1,
            bonusDmg: 1
        })
        return false;
    }
}