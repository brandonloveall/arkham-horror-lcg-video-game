
import { ActCard } from "server/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/act_card";

export class _01108 extends ActCard {
    clues = 2;
    stage = 1;
    back_name = "The Door on the Floor";
    back_text = `Put into play the set-aside Hallway, Cellar, Attic, and Parlor.
Discard each enemy in the Study.
Place each investigator in the Hallway.
Remove the Study from the game.`;
    back_flavor = `You notice that the edges of your newly purchased rug are tattered and mud-stained. Finding this odd, you shift the furniture aside and pull back the rug. To your surprise, you see the door leading out of your study. You slowly turn the knob, and the door swings open, revealing your hallway below.
You jump through the doorway, landing on your feet on soft dirt. The door to the study slams shut above you. The smell of burning wood fills the narrow hall, intermingled with the scent of rot and decay.`;
    encounter_name = "The Gathering";
    encounter_position = 5;
    code = "01108";
    pack_name = "Core Set";
    type_name = "Act";
    faction_name = "Mythos";
    position = 108;
    exceptional = false;
    myriad = false;
    name = "Trapped";
    quantity = 1;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = true;
    text = `null`;
    traits = "null";
    flavor = `As you leap to investigate, the door to your study vanishes before your eyes, leaving behind only solid wall. You're trapped inside your study until you can find another way out.`;
    subname = "";
}
