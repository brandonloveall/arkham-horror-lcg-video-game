
import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { GamePlayer } from "../player";
import { CardRegistry } from "shared/card_registry";
import { EnemyCard } from "../abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";

export class _01520 extends AssetCard {
    slot = "Hand";
    cost = 3;
    skill_agility = 0;
    skill_combat = 1;
    skill_intellect = 0;
    skill_willpower = 0;
    skill_wildcard = 0;
    xp = 0;
    deck_limit = 2;
    code = "01520";
    pack_name = "Revised Core Set";
    type_name = "Asset";
    faction_name = "Guardian";
    position = 20;
    exceptional = false;
    myriad = false;
    name = "Machete";
    quantity = 2;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `[action]: <b>Fight.</b> You get +1 [combat] for this attack. If the attacked enemy is the only enemy engaged with you, this attack deals +1 damage.`;
    traits = "Item. Weapon. Melee.";
    flavor = `Cuts through vines, underbrush, and tentacles equally well.`;
    subname = "";

    ability(plr: GamePlayer) {
        let engagedWith = 0;
        let isEngagedWithTarget = false;

        for(const card of CardRegistry.getAll()) {
            if(card instanceof EnemyCard) {
                if(card.engagedWith === plr) {
                    engagedWith++;
                    if(card === plr.selectedObject) { isEngagedWithTarget = true; }
                }
            }
        }

        plr.fight({
            enemy: plr.selectedObject as EnemyCard,
            skill: "skill_combat",
            bonusStat: 1,
            bonusDmg: engagedWith === 1 && isEngagedWithTarget ? 1 : 0
        })
    }
}