import { SkillCard } from "shared/objects/abstracts/card_inherits/skill_card";
import { CardType, Faction, Skill } from "shared/card_database_types";

export class _01592 extends SkillCard {
	skills = {
		[Skill.Agility]: 2,
		[Skill.Combat]: 0,
		[Skill.Intellect]: 0,
		[Skill.Willpower]: 0,
		[Skill.Wildcard]: 0,
	};
	xp = 0;
	deck_limit = 2;
	code = "01592";
	pack_name = "Revised Core Set";
	faction_name = Faction.Neutral;
	exceptional = false;
	myriad = false;
	name = "Manual Dexterity";
	quantity = 4;
	is_unique = false;
	permanent = false;
	text = `Max 1 committed per skill test.
If this test is successful, draw 1 card.`;
	traits = ["Innate"];
	flavor = `Too easy.`;
	subname = "";
}

export default {
	code: "01592",
	faction_name: Faction.Neutral,
	type_name: CardType.Skill,
	constructor: _01592,
};
