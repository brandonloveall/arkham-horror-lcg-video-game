import { EventCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/event_card";
import { GamePlayer } from "../player";
import { GameContext } from "shared/game_context";

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
	type_name = "Event";
	faction_name = "Seeker";
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
Until the end of the round, you may use your [intellect] in place of your [combat] and [agility].`;
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
