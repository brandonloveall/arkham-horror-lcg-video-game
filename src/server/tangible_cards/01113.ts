
import { LocationCard } from "server/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card";

export class _01113 extends LocationCard {
    shroud = 1;
    clues = 2;
    stage = 0;
    back_name = "";
    back_text = ``;
    back_flavor = `The smell of rotten meat assaults your nostrils as you approach the attic stairs.`;
    encounter_name = "The Gathering";
    encounter_position = 10;
    code = "01113";
    pack_name = "Core Set";
    type_name = "Location";
    faction_name = "Mythos";
    position = 113;
    exceptional = false;
    myriad = false;
    name = "Attic";
    quantity = 1;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = true;
    text = `<b>Forced</b> - After you enter the Attic: Take 1 horror.`;
    traits = "";
    flavor = `The bloody carcass of a malformed beast swings from a meat hook chained to the ceiling. Blood drains slowly from the carcass, dripping into a small barrel.`;
    subname = "";

    symbol = LocationCard.Symbol.BlueTriangle
    connects_to = [LocationCard.Symbol.RedSquare];
}
