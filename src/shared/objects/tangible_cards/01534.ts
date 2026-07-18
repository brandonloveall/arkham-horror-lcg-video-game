import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { CardType, Faction } from "shared/card_database_types";

export class _01534 extends AssetCard {
	slot = "";
	cost = 2;
	skill_agility = 1;
	skill_combat = 0;
	skill_intellect = 1;
	skill_willpower = 0;
	skill_wildcard = 0;
	xp = 0;
	deck_limit = 2;
	code = "01534";
	pack_name = "Revised Core Set";
	faction_name = Faction.Seeker;
	position = 34;
	exceptional = false;
	myriad = false;
	name = "Hyperawareness";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `[fast] Spend 1 resource: You get +1 [intellect] for this skill test.
[fast] Spend 1 resource: You get +1 [agility] for this skill test.`;
	traits = "Talent.";
	flavor = ``;
	subname = "";
}

export default {
	code: "01534",
	faction_name: Faction.Seeker,
	type_name: CardType.Asset,
	constructor: _01534,
};
