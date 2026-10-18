import { AssetCard } from "shared/objects/abstracts/card_inherits/asset_card";
import { CardType, Faction, Skill, Slot } from "shared/card_database_types";

export class _01535 extends AssetCard {
	slot = Slot.Hand;
	cost = 2;
	skills = {
		[Skill.Agility]: 0,
		[Skill.Combat]: 1,
		[Skill.Intellect]: 0,
		[Skill.Willpower]: 0,
		[Skill.Wildcard]: 0,
	};
	xp = 0;
	deck_limit = 2;
	code = "01535";
	pack_name = "Revised Core Set";
	faction_name = Faction.Seeker;
	exceptional = false;
	myriad = false;
	name = "Medical Texts";
	quantity = 2;
	is_unique = false;
	permanent = false;
	text = `➡️ Choose an investigator at your location and test 📖 (2). If you succeed, heal 1 damage from that investigator. If you fail, deal 1 damage to that investigator.`;
	traits = ["Item", "Tome"];
	flavor = ``;
	subname = "";
}

export default {
	code: "01535",
	faction_name: Faction.Seeker,
	type_name: CardType.Asset,
	constructor: _01535,
};
