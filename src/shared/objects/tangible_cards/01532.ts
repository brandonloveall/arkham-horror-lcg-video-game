import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { CardType, Faction, Skill } from "shared/card_database_types";

export class _01532 extends AssetCard {
	slot = "Ally";
	cost = 2;
	skills = {
		[Skill.Agility]: 1,
		[Skill.Combat]: 0,
		[Skill.Intellect]: 0,
		[Skill.Willpower]: 0,
		[Skill.Wildcard]: 0,
	};
	xp = 0;
	deck_limit = 2;
	code = "01532";
	pack_name = "Revised Core Set";
	faction_name = Faction.Seeker;
	position = 32;
	exceptional = false;
	myriad = false;
	name = "Research Librarian";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `🔄 After Research Librarian enters play: Search your deck for a Tome asset and add it to your hand. Shuffle your deck.`;
	traits = "Ally. Miskatonic.";
	flavor = `"There have been problems at the Orne Library, as we both know, given poor Armitage's condition, and the other, unrelated... incident of a few years ago..."`;
	subname = "";
}

export default {
	code: "01532",
	faction_name: Faction.Seeker,
	type_name: CardType.Asset,
	constructor: _01532,
};
