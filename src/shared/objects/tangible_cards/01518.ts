import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { CardType, Faction } from "shared/card_database_types";

export class _01518 extends AssetCard {
	slot = "Ally";
	cost = 4;
	skill_agility = 0;
	skill_combat = 1;
	skill_intellect = 0;
	skill_willpower = 0;
	skill_wildcard = 0;
	xp = 0;
	deck_limit = 2;
	code = "01518";
	pack_name = "Revised Core Set";
	faction_name = Faction.Guardian;
	position = 18;
	exceptional = false;
	myriad = false;
	name = "Beat Cop";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `You get +1 👊.
🗲 Discard Beat Cop: Deal 1 damage to an enemy at your location.`;
	traits = "Ally. Police.";
	flavor = ``;
	subname = "";
}

export default {
	code: "01518",
	faction_name: Faction.Guardian,
	type_name: CardType.Asset,
	constructor: _01518,
};
