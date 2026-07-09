import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";

export class _01531 extends AssetCard {
	slot = "Hand";
	cost = 3;
	skill_agility = 0;
	skill_combat = 0;
	skill_intellect = 0;
	skill_willpower = 1;
	skill_wildcard = 0;
	xp = 0;
	deck_limit = 2;
	code = "01531";
	pack_name = "Revised Core Set";
	type_name = "Asset";
	faction_name = "Seeker";
	position = 31;
	exceptional = false;
	myriad = false;
	name = "Old Book of Lore";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `[action] Exhaust Old Book of Lore: Choose an investigator at your location. That investigator searches the top 3 cards of his or her deck for a card, draws it, and shuffles the remaining cards into his or her deck.`;
	traits = "Item. Tome.";
	flavor = ``;
	subname = "";
}
