import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { CardType, Faction } from "shared/card_database_types";

export class _01117 extends AssetCard {
	slot = "Ally";
	cost = 0;
	skill_agility = 0;
	skill_combat = 0;
	skill_intellect = 0;
	skill_willpower = 0;
	skill_wildcard = 0;
	xp = 0;
	deck_limit = 1;
	code = "01117";
	pack_name = "Core Set";
	faction_name = Faction.Neutral;
	position = 117;
	exceptional = false;
	myriad = false;
	name = "Lita Chantler";
	quantity = 1;
	health_per_investigator = false;
	is_unique = true;
	permanent = false;
	double_sided = false;
	text = `While you control Lita Chantler, she gains:
"Each investigator at your location gets +1 👊.
🔄 When an investigator at your location successfully attacks a Monster enemy: That investigator deals +1 damage."`;
	traits = "Ally.";
	flavor = ``;
	subname = "The Zealot";
}

export default {
	code: "01117",
	faction_name: Faction.Neutral,
	type_name: CardType.Asset,
	constructor: _01117,
};
