import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { CardType, Faction } from "shared/card_database_types";

export class _01535 extends AssetCard {
	slot = "Hand";
	cost = 2;
	skill_agility = 0;
	skill_combat = 1;
	skill_intellect = 0;
	skill_willpower = 0;
	skill_wildcard = 0;
	xp = 0;
	deck_limit = 2;
	code = "01535";
	pack_name = "Revised Core Set";
	faction_name = Faction.Seeker;
	position = 35;
	exceptional = false;
	myriad = false;
	name = "Medical Texts";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `[action] Choose an investigator at your location and test [intellect] (2). If you succeed, heal 1 damage from that investigator. If you fail, deal 1 damage to that investigator.`;
	traits = "Item. Tome.";
	flavor = ``;
	subname = "";
}

export default {
	code: "01535",
	faction_name: Faction.Seeker,
	type_name: CardType.Asset,
	constructor: _01535,
};
