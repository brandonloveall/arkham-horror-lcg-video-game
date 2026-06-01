
import { LocationCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card";
import { _01113 } from "./01113";
import { _01114 } from "./01114";
import { _01115 } from "./01115";

export class _01112 extends LocationCard {
    shroud = 1;
    clues = 0;
    stage = 0;
    back_name = "";
    back_text = ``;
    back_flavor = `A moment of panic and disorientation strikes as you land upon the floor of the hallway. The world spins, as if turned on its head.`;
    encounter_name = "The Gathering";
    encounter_position = 9;
    code = "01112";
    pack_name = "Core Set";
    type_name = "Location";
    faction_name = "Mythos";
    position = 112;
    exceptional = false;
    myriad = false;
    name = "Hallway";
    quantity = 1;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = true;
    text = ``;
    traits = "";
    flavor = `The walls of your house are splattered with mud, and your hardwood floor is gone, replaced with a dirt path.`;
    subname = "";

    symbol = LocationCard.Symbol.RedSquare;
    connects_to = [LocationCard.Symbol.BlueTriangle, LocationCard.Symbol.BrownCross, LocationCard.Symbol.GreenDiamond];
}
