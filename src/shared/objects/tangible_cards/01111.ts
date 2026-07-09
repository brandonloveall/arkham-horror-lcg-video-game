import { LocationCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card";

export class _01111 extends LocationCard {
	shroud = 2;
	clues = 2;
	stage = 0;
	back_name = "";
	back_text = ``;
	back_flavor = `You've been investigating the strange events occurring in Arkham for several days now. Your deck in covered in newspaper articles, police reports, and witness accounts.`;
	encounter_name = "The Gathering";
	encounter_position = 8;
	code = "01111";
	pack_name = "Core Set";
	type_name = "Location";
	faction_name = "Mythos";
	position = 111;
	exceptional = false;
	myriad = false;
	name = "Study";
	quantity = 1;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = true;
	text = "";
	traits = "";
	flavor = `The door to your study has vanished.`;
	subname = "";

	symbol = LocationCard.Symbol.YellowCircle;
	connects_to = [];
}
