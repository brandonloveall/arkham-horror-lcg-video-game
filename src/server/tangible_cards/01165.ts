
import { TreacheryCard } from "server/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/treachery_card";

export class _01165 extends TreacheryCard {
    encounter_name = "Striking Fear";
    encounter_position = 6;
    code = "01165";
    pack_name = "Core Set";
    type_name = "Treachery";
    faction_name = "Mythos";
    position = 165;
    exceptional = false;
    myriad = false;
    name = "Dissonant Voices";
    quantity = 2;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `<b>Revelation</b> - Put Dissonant Voices into play in your threat area.
You cannot play assets or events.
<b>Forced</b> - At the end of the round: Discard Dissonant Voices.`;
    traits = "Terror.";
    flavor = ``;
    subname = "";
    restrictions = {};
}
