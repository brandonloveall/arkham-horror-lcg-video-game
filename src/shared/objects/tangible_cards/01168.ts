import { TreacheryCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/treachery_card";
import { GamePlayer } from "../player";
import { CardType, Faction } from "shared/card_database_types";

export class _01168 extends TreacheryCard {
	encounter_name = "Chilling Cold";
	encounter_position = 3;
	code = "01168";
	pack_name = "Core Set";
	faction_name = Faction.Mythos;
	position = 168;
	exceptional = false;
	myriad = false;
	name = "Obscuring Fog";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `<b>Revelation</b> - Attach to your location. Limit 1 per location.
Attached location gets +2 shroud.
<b>Forced</b> - After attached location is successfully investigated: Discard Obscuring Fog.`;
	traits = "Hazard.";
	flavor = ``;
	subname = "";

	resolve(plrWhoDrew: GamePlayer): void {
		if (
			plrWhoDrew.location.attachments.find((e) => {
				return e.id === this.id;
			})
		) {
			return;
		}
		plrWhoDrew.location.attachments.push(this);
	}
}

export default {
	code: "01168",
	faction_name: Faction.Mythos,
	type_name: CardType.Treachery,
	constructor: _01168,
};
