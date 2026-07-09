import { TreacheryCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/treachery_card";
import { GamePlayer } from "../player";
import { GameContext } from "shared/game_context";

export class _01166 extends TreacheryCard {
	encounter_name = "Ancient Evils";
	encounter_position = 1;
	code = "01166";
	pack_name = "Core Set";
	type_name = "Treachery";
	faction_name = "Mythos";
	position = 166;
	exceptional = false;
	myriad = false;
	name = "Ancient Evils";
	quantity = 3;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `<b>Revelation</b> - Place 1 doom on the current agenda. This effect can cause the current agenda to advance.`;
	traits = "Omen.";
	flavor = `Dark forces stir against you. If you do not act quickly, a sinister plot will be fulfilled.`;
	subname = "";

	resolve(plrWhoDrew: GamePlayer): void {
		if (++GameContext.agenda!.current_doom >= GameContext.agenda!.doom) {
			GameContext.agenda!.advance();
		}
	}
}
