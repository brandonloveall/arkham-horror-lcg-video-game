import { Investigator } from "shared/objects/abstracts/card_inherits/player_card_inherits/investigator";
import { GamePlayer } from "../player";
import { WhatHappened } from "shared/game_context";
import { reactions } from "../abstracts/card";
import { CardType, Faction } from "shared/card_database_types";

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
	skill_agility = 2;
	skill_combat = 4;
	skill_intellect = 3;
	skill_willpower = 3;
	skill_wildcard = 0;
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

	reactions: reactions = {
		[WhatHappened.ENEMY_DEFEATED]: {
			reaction: (_fighter: unknown) => {
				const fighter = _fighter as GamePlayer;
				if (fighter.investigator === this) {
					fighter.location.discoverClue(fighter, 1);
				}
			},
			optional: true,
		},
	};

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
