import { TreacheryCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/treachery_card";
import { GamePlayer } from "../player";
import { reactions } from "../abstracts/card";
import { GameContext, WhatHappened } from "shared/game_context";
import { getOwner } from "shared/findOwner";
import { CardType, Faction } from "shared/card_database_types";

export class _01165 extends TreacheryCard {
	encounter_name = "Striking Fear";
	encounter_position = 6;
	code = "01165";
	pack_name = "Core Set";
	faction_name = Faction.Mythos;
	position = 165;
	exceptional = false;
	myriad = false;
	name = "Dissonant Voices";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `<b>Revelation</b> - Put Dissonant Voices into play in your threat area.
You cannot play assets or events.
<b>Forced</b> - At the end of the round: Discard Dissonant Voices.`;
	traits = "Terror.";
	flavor = ``;
	subname = "";

	reactions: reactions = {
		[WhatHappened.ROUND_ENDED]: {
			reaction: () => {
				GameContext.encounter_discard.addCard(this);
				getOwner(this)!.threat_area.remove(getOwner(this)!.threat_area.indexOf(this));
			},
			optional: false,
		},
	};

	resolve(plrWhoDrew: GamePlayer): void {
		plrWhoDrew.threat_area.push(this);
	}
}

export default {
	code: "01165",
	faction_name: Faction.Mythos,
	type_name: CardType.Treachery,
	constructor: _01165,
};
