import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { GamePlayer } from "../player";
import { EnemyCard } from "../abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { CardType, Faction } from "shared/card_database_types";

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
	faction_name = Faction.Neutral;
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
➡️ Spend 1 ammo: <b>Fight.</b> You get +1 👊 for this attack (if there are 1 or more clues on your location, you get +3 👊, instead). This attack deals +1 damage.`;
	traits = "Item. Weapon. Firearm.";
	flavor = ``;
	subname = "";
	belongs_to = "01501";

	uses = 4;

	ability(plr: GamePlayer) {
		if (this.uses === 0) {
			return;
		}

		this.uses--;
		plr.fight({
			enemy: plr.selectedObject as EnemyCard,
			skill: "skill_combat",
			bonusStat: plr.location.clues >= 1 ? 3 : 1,
			bonusDmg: 1,
		});
	}
}

export default {
	code: "01506",
	faction_name: Faction.Neutral,
	type_name: CardType.Asset,
	constructor: _01506,
};
