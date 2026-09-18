import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { CardType, Faction, Skill } from "shared/card_database_types";

export class _01521 extends AssetCard {
	slot = "Ally";
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
	code = "01521";
	pack_name = "Revised Core Set";
	faction_name = Faction.Guardian;
	position = 21;
	exceptional = false;
	myriad = false;
	name = "Guard Dog";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `🔄 When an enemy attack deals damage to Guard Dog: Deal 1 damage to the attacking enemy.`;
	traits = "Ally. Creature.";
	flavor = `Fiercely loyal, these trained canines make for perfect companions.`;
	subname = "";
}

export default {
	code: "01521",
	faction_name: Faction.Guardian,
	type_name: CardType.Asset,
	constructor: _01521,
};
