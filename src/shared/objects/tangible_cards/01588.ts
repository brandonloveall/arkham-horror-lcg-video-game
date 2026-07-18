import { EventCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/event_card";
import { GamePlayer } from "../player";
import { CardType, Faction } from "shared/card_database_types";

export class _01588 extends EventCard {
	cost = 0;
	skill_agility = 0;
	skill_combat = 0;
	skill_intellect = 0;
	skill_willpower = 0;
	skill_wildcard = 0;
	xp = 0;
	deck_limit = 2;
	code = "01588";
	pack_name = "Revised Core Set";
	faction_name = Faction.Neutral;
	position = 88;
	exceptional = false;
	myriad = false;
	name = "Emergency Cache";
	quantity = 10;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `Gain 3 resources.`;
	traits = "Supply.";
	flavor = `You can never be too prepared.`;
	subname = "";

	onPlay(whoPlayed: GamePlayer) {
		whoPlayed.resources += 3;
	}
}

export default {
	code: "01588",
	faction_name: Faction.Neutral,
	type_name: CardType.Event,
	constructor: _01588,
};
