import { SkillCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/skill_card";
import { CardType, Faction, Skill } from "shared/card_database_types";

export class _01589 extends SkillCard {
	skills = {
		[Skill.Agility]: 0,
		[Skill.Combat]: 0,
		[Skill.Intellect]: 0,
		[Skill.Willpower]: 2,
		[Skill.Wildcard]: 0,
	};
	xp = 0;
	deck_limit = 2;
	code = "01589";
	pack_name = "Revised Core Set";
	faction_name = Faction.Neutral;
	position = 89;
	exceptional = false;
	myriad = false;
	name = "Guts";
	quantity = 4;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `Max 1 committed per skill test.
If this test is successful, draw 1 card.`;
	traits = "Innate.";
	flavor = `Stay back! I'll handle this.`;
	subname = "";
}

export default {
	code: "01589",
	faction_name: Faction.Neutral,
	type_name: CardType.Skill,
	constructor: _01589,
};
