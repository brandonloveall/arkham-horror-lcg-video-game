import { Investigator } from "shared/objects/abstracts/card_inherits/player_card_inherits/investigator";
import { GamePlayer } from "../player";
import { CardType, Faction, Skill } from "shared/card_database_types";

export class _01501 extends Investigator {
	health = 9;
	sanity = 5;
	deck_requirements = {
		size: 30,
		cards: ["01506", "01507"],
		random: [
			{
				target: "subtype",
				value: "basicweakness",
			},
		],
	};
	deck_options = [
		{
			faction: ["guardian", "neutral"],
			level: {
				min: 0,
				max: 5,
			},
		},
		{
			faction: ["seeker"],
			level: {
				min: 0,
				max: 2,
			},
		},
	];
	skills = {
		[Skill.Agility]: 2,
		[Skill.Combat]: 4,
		[Skill.Intellect]: 3,
		[Skill.Willpower]: 3,
		[Skill.Wildcard]: 0,
	};
	xp = 0;
	deck_limit = 1;
	code = "01501";
	pack_name = "Revised Core Set";
	faction_name = Faction.Guardian;
	position = 1;
	exceptional = false;
	myriad = false;
	name = "Roland Banks";
	quantity = 1;
	health_per_investigator = false;
	is_unique = true;
	permanent = false;
	double_sided = true;
	text =
		"🔄 After you defeat an enemy: Discover 1 clue at your location. (Limit once per round.)\n[elder_sign] effect: +1 for each clue on your location.";
	traits = "Agency. Detective.";
	flavor = 'Everything by the book: every "i" dotted, every "t" crossed. It had worked, until now.';
	subname = "The Fed";

	resolveElderToken(initiator: GamePlayer) {
		return initiator.location.clues;
	}
}

export default {
	code: "01501",
	faction_name: Faction.Guardian,
	type_name: CardType.Investigator,
	constructor: _01501,
};
