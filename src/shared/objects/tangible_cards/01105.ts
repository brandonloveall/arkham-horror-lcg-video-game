import { AgendaCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/agenda_card";
import { CardType, Faction } from "shared/card_database_types";

export class _01105 extends AgendaCard {
	doom = 3;
	stage = 1;
	back_name = "A Lapse in Time";
	back_text = `The lead investigator must decide (choose one): Either each investigator discards 1 card at random from his or her hand, or the lead investigator takes 2 horror.`;
	back_flavor = `Your house continues to change before your very eyes. The walls have decayed, and the ground in many rooms has turned to dirt. It is almost as if you have been transported somewhere else entirely, although every now and again you recognize elements of your former home.`;
	encounter_name = "The Gathering";
	encounter_position = 2;
	code = "01105";
	pack_name = "Core Set";
	faction_name = Faction.Mythos;
	position = 105;
	exceptional = false;
	myriad = false;
	name = "What's Going On?!";
	quantity = 1;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = true;
	text = ``;
	traits = "";
	flavor = `It is late at night. You are holed up in your study, researching the bloody disappearances that have been taking place in the region. A few hours into your research, you hear the sound of strange chanting coming from your parlor, down the hall. At the same time, you hear dirt churning, as if something were digging beneath the floor.`;
	subname = "";

	advance(): void {
		print("Method not implemented.");
	}
}

export default {
	code: "01105",
	faction_name: Faction.Mythos,
	type_name: CardType.Agenda,
	constructor: _01105,
};
