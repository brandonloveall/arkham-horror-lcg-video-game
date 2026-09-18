import { SkillCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/skill_card";
import { CardType, Faction, Skill } from "shared/card_database_types";

export class _01525 extends SkillCard {
	skills = {
		[Skill.Agility]: 0,
		[Skill.Combat]: 1,
		[Skill.Intellect]: 0,
		[Skill.Willpower]: 0,
		[Skill.Wildcard]: 0,
	};
	xp = 0;
	deck_limit = 2;
	code = "01525";
	pack_name = "Revised Core Set";
	faction_name = Faction.Guardian;
	position = 25;
	exceptional = false;
	myriad = false;
	name = "Vicious Blow";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `If this skill test is successful during an attack, that attack deals +1 damage.`;
	traits = "Practiced.";
	flavor = `With a sickening smack, he struck the abomination over and over... until at last, it stopped moving.`;
	subname = "";
}

export default {
	code: "01525",
	faction_name: Faction.Guardian,
	type_name: CardType.Skill,
	constructor: _01525,
};
