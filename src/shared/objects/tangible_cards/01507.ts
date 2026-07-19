import { TreacheryCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/treachery_card";
import { GamePlayer } from "../player";
import { CardType, Faction } from "shared/card_database_types";

export class _01507 extends TreacheryCard {
	encounter_name = "";
	encounter_position = 0;
	code = "01507";
	pack_name = "Revised Core Set";
	faction_name = Faction.Neutral;
	position = 7;
	exceptional = false;
	myriad = false;
	name = "Cover Up";
	quantity = 1;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `<b>Revelation</b> - Put Cover Up into play in your threat area, with 3 clues on it.
🔄 When you would discover 1 or more clues at your location: Discard that many clues from Cover Up instead.
<b>Forced</b> - When the game ends, if there are any clues on Cover Up: You suffer 1 mental trauma.`;
	traits = "Task.";
	flavor = ``;
	subname = "";
	belongs_to = "01501";

	resolve(plrWhoDrew: GamePlayer): void {
		plrWhoDrew.threat_area.push(this);
	}
}

export default {
	code: "01507",
	faction_name: Faction.Neutral,
	type_name: CardType.Treachery,
	constructor: _01507,
};
