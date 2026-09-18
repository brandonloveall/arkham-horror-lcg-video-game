import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { GamePlayer } from "../player";
import { CardRegistry } from "shared/card_registry";
import { EnemyCard } from "../abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { CardType, Faction, Skill } from "shared/card_database_types";

export class _01520 extends AssetCard {
	slot = "Hand";
	cost = 3;
	skills = {
		[Skill.Agility]: 0,
		[Skill.Combat]: 1,
		[Skill.Intellect]: 0,
		[Skill.Willpower]: 0,
		[Skill.Wildcard]: 0,
	};
	xp = 0;
	deck_limit = 2;
	code = "01520";
	pack_name = "Revised Core Set";
	faction_name = Faction.Guardian;
	position = 20;
	exceptional = false;
	myriad = false;
	name = "Machete";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `➡️: <b>Fight.</b> You get +1 👊 for this attack. If the attacked enemy is the only enemy engaged with you, this attack deals +1 damage.`;
	traits = "Item. Weapon. Melee.";
	flavor = `Cuts through vines, underbrush, and tentacles equally well.`;
	subname = "";

	ability(plr: GamePlayer) {

	}
}

export default {
	code: "01520",
	faction_name: Faction.Guardian,
	type_name: CardType.Asset,
	constructor: _01520,
};
