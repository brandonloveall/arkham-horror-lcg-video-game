import { EventCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/event_card";
import { GamePlayer } from "../player";
import { CardType, Faction, Skill } from "shared/card_database_types";

export class _01538 extends EventCard {
	cost = 0;
	skills = {
		[Skill.Agility]: 1,
		[Skill.Combat]: 0,
		[Skill.Intellect]: 1,
		[Skill.Willpower]: 1,
		[Skill.Wildcard]: 0,
	};
	xp = 0;
	deck_limit = 2;
	code = "01538";
	pack_name = "Revised Core Set";
	faction_name = Faction.Seeker;
	position = 38;
	exceptional = false;
	myriad = false;
	name = "Barricade";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `Attach to your location.
Non-Elite enemies cannot move into attached location.
<b>Forced</b> - When an investigator leaves attached location: Discard Barricade.`;
	traits = "Insight. Tactic.";
	flavor = ``;
	subname = "";

	onPlay(whoPlayed: GamePlayer): void {
		whoPlayed.location.attachments.push(this);
	}
}

export default {
	code: "01538",
	faction_name: Faction.Seeker,
	type_name: CardType.Event,
	constructor: _01538,
};
