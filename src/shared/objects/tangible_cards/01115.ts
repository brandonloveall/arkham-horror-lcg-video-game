import { LocationCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card";
import { CardType, Faction } from "shared/card_database_types";

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
	faction_name = Faction.Mythos;
	position = 115;
	exceptional = false;
	myriad = false;
	name = "Parlor";
	quantity = 1;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = true;
	text = `➡️ <b>Resign.</b> "This is too much for me!" You run out the front door, fleeing in panic.
While Lita Chantler is not controlled by a player, she gains: "➡️: <b>Parley.</b> Test 📖 (4). If you succeed, take control of Lita Chantler."`;
	traits = "";
	flavor = ``;
	subname = "";

	symbol = LocationCard.Symbol.GreenDiamond;
	connects_to = [LocationCard.Symbol.RedSquare];
}

export default {
	code: "01115",
	faction_name: Faction.Mythos,
	type_name: CardType.Location,
	constructor: _01115,
};
