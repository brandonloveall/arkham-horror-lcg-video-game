import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { CardType, Faction, Skill } from "shared/card_database_types";

export class _01533 extends AssetCard {
	slot = "Ally";
	cost = 4;
	skills = {
		[Skill.Agility]: 0,
		[Skill.Combat]: 0,
		[Skill.Intellect]: 1,
		[Skill.Willpower]: 0,
		[Skill.Wildcard]: 0,
	};
	xp = 0;
	deck_limit = 2;
	code = "01533";
	pack_name = "Revised Core Set";
	faction_name = Faction.Seeker;
	position = 33;
	exceptional = false;
	myriad = false;
	name = "Dr. Milan Christopher";
	quantity = 2;
	health_per_investigator = false;
	is_unique = true;
	permanent = false;
	double_sided = false;
	text = `You get +1 📖.
🔄 After you successfully investigate: Gain 1 resource.`;
	traits = "Ally. Miskatonic.";
	flavor = `"While I truly believe that this nightmare is just a singular abomination, I must admit that I am exhilarated by the possibility that this is but one specimen of a new genus!"`;
	subname = "Professor of Entomology";
}

export default {
	code: "01533",
	faction_name: Faction.Seeker,
	type_name: CardType.Asset,
	constructor: _01533,
};
