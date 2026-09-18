import { GameContext, WhatHappened } from "shared/game_context";
import { EventCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/event_card";
import { GamePlayer } from "../player";
import { CardType, Faction, Skill } from "shared/card_database_types";

export class _01523 extends EventCard {
	cost = 1;
	skills = {
		[Skill.Agility]: 1,
		[Skill.Combat]: 0,
		[Skill.Intellect]: 0,
		[Skill.Willpower]: 1,
		[Skill.Wildcard]: 0,
	};
	xp = 0;
	deck_limit = 2;
	code = "01523";
	pack_name = "Revised Core Set";
	faction_name = Faction.Guardian;
	position = 23;
	exceptional = false;
	myriad = false;
	name = "Dodge";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `Fast. Play when an enemy attacks an investigator at your location.
Cancel that attack.`;
	traits = "Tactic.";
	flavor = ``;
	subname = "";

	fast = true;
	canPlayFast(plr: GamePlayer) {
		return (
			GameContext.most_recent_happening.who!.location === plr.location &&
			GameContext.most_recent_happening.happening === WhatHappened.ENEMY_ATTACKED
		);
	}

	onPlay(): void {
		print("not yet implemented");
	}
}

export default {
	code: "01523",
	faction_name: Faction.Guardian,
	type_name: CardType.Event,
	constructor: _01523,
};
