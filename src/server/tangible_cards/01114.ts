
import { LocationCard } from "server/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card";
import { _01112 } from "./01112";

export class _01114 extends LocationCard {
    shroud = 4;
    clues = 2;
    stage = 0;
    back_name = "";
    back_text = ``;
    back_flavor = `The stairs leading down to your cellar are slick, and they glisten with a thin layer of ice...`;
    encounter_name = "The Gathering";
    encounter_position = 11;
    code = "01114";
    pack_name = "Core Set";
    type_name = "Location";
    faction_name = "Mythos";
    position = 114;
    exceptional = false;
    myriad = false;
    name = "Cellar";
    quantity = 1;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = true;
    text = `<b>Forced</b> - After you enter the Cellar: Take 1 damage.`;
    traits = "";
    flavor = `Your cellar seems to have been replaced with an underground network of icy tunnels and caverns. The cold chills you to the bone.`;
    subname = "";

    symbol = LocationCard.Symbol.BrownCross
    connects_to = [LocationCard.Symbol.RedSquare];
}
