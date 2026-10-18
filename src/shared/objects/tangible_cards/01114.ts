import { LocationCard } from "shared/objects/abstracts/card_inherits/location_card";
import { CardType, Faction } from "shared/card_database_types";

export class _01114 extends LocationCard {
	shroud = 4;
	clues = 2;
	stage = 0;
	back_name = "";
	back_text = ``;
	back_flavor = `The stairs leading down to your cellar are slick, and they glisten with a thin layer of ice...`;
	encounter_name = "The Gathering";
	code = "01114";
	pack_name = "Core Set";
	faction_name = Faction.Mythos;
	name = "Cellar";
	quantity = 1;
	is_unique = false;
	permanent = false;
	text = `<b>Forced</b> - After you enter the Cellar: Take 1 damage.`;
	traits = [];
	flavor = `Your cellar seems to have been replaced with an underground network of icy tunnels and caverns. The cold chills you to the bone.`;
	subname = "";

	symbol = LocationCard.Symbol.BrownCross;
	connects_to = [LocationCard.Symbol.RedSquare];

	unrevealed_model_name = "01112_un";
}

export default {
	code: "01114",
	faction_name: Faction.Mythos,
	type_name: CardType.Location,
	constructor: _01114,
};
