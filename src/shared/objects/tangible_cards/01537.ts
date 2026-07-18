import { EventCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/event_card";
import { GamePlayer } from "../player";
import { GameContext } from "shared/game_context";
import { CardType, Faction } from "shared/card_database_types";

export class _01537 extends EventCard {
	cost = 2;
	skill_agility = 0;
	skill_combat = 0;
	skill_intellect = 2;
	skill_willpower = 0;
	skill_wildcard = 0;
	xp = 0;
	deck_limit = 2;
	code = "01537";
	pack_name = "Revised Core Set";
	faction_name = Faction.Seeker;
	position = 37;
	exceptional = false;
	myriad = false;
	name = "Working a Hunch";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `Fast. Play only during your turn.
Discover 1 clue at your location.`;
	traits = "Insight.";
	flavor = ``;
	subname = "";

	fast = true;
	canPlayFast(plr: GamePlayer) {
		return GameContext.player_with_turn === plr;
	}

	onPlay(whoPlayed: GamePlayer): void {
		whoPlayed.location.discoverClue(whoPlayed, 1);
	}
}

export default {
	code: "01537",
	faction_name: Faction.Seeker,
	type_name: CardType.Event,
	constructor: _01537,
};
