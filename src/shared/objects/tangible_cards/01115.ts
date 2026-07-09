import { LocationCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card";

export class _01115 extends LocationCard {
	shroud = 2;
	clues = 0;
	stage = 0;
	back_name = "";
	back_text = `The entrance to the Parlor is blocked by a darkly glowing unfathomable barrier. You cannot move into the Parlor.`;
	back_flavor = `You're unsure what would happen if you tried to cross the threshold of the strange barrier, but based on its extreme heat, you sure as hell don't want to try.`;
	encounter_name = "The Gathering";
	encounter_position = 12;
	code = "01115";
	pack_name = "Core Set";
	type_name = "Location";
	faction_name = "Mythos";
	position = 115;
	exceptional = false;
	myriad = false;
	name = "Parlor";
	quantity = 1;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = true;
	text = `[action] <b>Resign.</b> "This is too much for me!" You run out the front door, fleeing in panic.
While Lita Chantler is not controlled by a player, she gains: "[action]: <b>Parley.</b> Test [intellect] (4). If you succeed, take control of Lita Chantler."`;
	traits = "";
	flavor = ``;
	subname = "";

	symbol = LocationCard.Symbol.GreenDiamond;
	connects_to = [LocationCard.Symbol.RedSquare];
}
