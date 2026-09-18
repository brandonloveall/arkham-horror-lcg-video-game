import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { GamePlayer } from "../player";
import { EnemyCard } from "../abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { CardType, Faction, Skill } from "shared/card_database_types";

export class _01516 extends AssetCard {
	slot = "Hand";
	cost = 4;
	skills = {
		[Skill.Agility]: 1,
		[Skill.Combat]: 0,
		[Skill.Intellect]: 0,
		[Skill.Willpower]: 0,
		[Skill.Wildcard]: 0,
	};
	xp = 0;
	deck_limit = 2;
	code = "01516";
	pack_name = "Revised Core Set";
	faction_name = Faction.Guardian;
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
➡️ Spend 1 ammo: <b>Fight.</b> You get +1 👊 for this attack. This attack deals +1 damage.`;
	traits = "Item. Weapon. Firearm.";
	flavor = ``;
	subname = "";

	uses = 4;

	ability(plr: GamePlayer) {

	}
}

export default {
	code: "01516",
	faction_name: Faction.Guardian,
	type_name: CardType.Asset,
	constructor: _01516,
};
