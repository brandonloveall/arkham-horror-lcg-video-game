import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { GamePlayer } from "../player";
import { CardType, Faction, Skill } from "shared/card_database_types";

export class _01586 extends AssetCard {
	slot = "Hand";
	cost = 1;
	skills = {
		[Skill.Agility]: 0,
		[Skill.Combat]: 1,
		[Skill.Intellect]: 0,
		[Skill.Willpower]: 0,
		[Skill.Wildcard]: 0,
	};
	xp = 0;
	deck_limit = 2;
	code = "01586";
	pack_name = "Revised Core Set";
	faction_name = Faction.Neutral;
	position = 86;
	exceptional = false;
	myriad = false;
	name = "Knife";
	quantity = 10;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `➡️: <b>Fight.</b> You get +1 👊 for this attack.
➡️ Discard Knife: <b>Fight.</b> You get +2 👊 for this attack. This attack deals +1 damage.`;
	traits = "Item. Weapon. Melee.";
	flavor = ``;
	subname = "";

	ability(plr: GamePlayer) {
		
	}
}

export default {
	code: "01586",
	faction_name: Faction.Neutral,
	type_name: CardType.Asset,
	constructor: _01586,
};
