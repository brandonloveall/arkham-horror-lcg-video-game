import { SkillCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/skill_card";
import { CardType, Faction, Skill } from "shared/card_database_types";

export class _01539 extends SkillCard {
	skills = {
		[Skill.Agility]: 0,
		[Skill.Combat]: 0,
		[Skill.Intellect]: 1,
		[Skill.Willpower]: 0,
		[Skill.Wildcard]: 0,
	};
	xp = 0;
	deck_limit = 2;
	code = "01539";
	pack_name = "Revised Core Set";
	faction_name = Faction.Seeker;
	position = 39;
	exceptional = false;
	myriad = false;
	name = "Deduction";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `If this skill test is successful while investigating a location, discover 1 additional clue at that location.`;
	traits = "Practiced.";
	flavor = `I knew I had seen this symbol before. I must warn the others before it is too late!`;
	subname = "";
}

export default {
	code: "01539",
	faction_name: Faction.Seeker,
	type_name: CardType.Skill,
	constructor: _01539,
};
