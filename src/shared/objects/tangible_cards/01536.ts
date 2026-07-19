import { EventCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/event_card";
import { GamePlayer } from "../player";
import { GameContext } from "shared/game_context";
import { CardType, Faction } from "shared/card_database_types";

export class _01536 extends EventCard {
	cost = 1;
	skill_agility = 1;
	skill_combat = 1;
	skill_intellect = 0;
	skill_willpower = 0;
	skill_wildcard = 0;
	xp = 0;
	deck_limit = 2;
	code = "01536";
	pack_name = "Revised Core Set";
	faction_name = Faction.Seeker;
	position = 36;
	exceptional = false;
	myriad = false;
	name = "Mind over Matter";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `Fast. Play only during your turn.
Until the end of the round, you may use your 📖 in place of your 👊 and 👟.`;
	traits = "Insight.";
	flavor = ``;
	subname = "";

	fast = true;
	canPlayFast(plr: GamePlayer) {
		return plr === GameContext.player_with_turn;
	}

	onPlay(): void {
		print("not yet implemented");
	}
}

export default {
	code: "01536",
	faction_name: Faction.Seeker,
	type_name: CardType.Event,
	constructor: _01536,
};
