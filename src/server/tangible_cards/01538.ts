
import { EventCard } from "server/abstracts/card_inherits/player_card_inherits/costing_card_inherits/event_card";

export class _01538 extends EventCard {
    cost = 0;
    skill_agility = 1;
    skill_combat = 0;
    skill_intellect = 1;
    skill_willpower = 1;
    skill_wildcard = 0;
    xp = 0;
    deck_limit = 2;
    code = "01538";
    pack_name = "Revised Core Set";
    type_name = "Event";
    faction_name = "Seeker";
    position = 38;
    exceptional = false;
    myriad = false;
    name = "Barricade";
    quantity = 2;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `Attach to your location.
Non-[[Elite]] enemies cannot move into attached location.
<b>Forced</b> - When an investigator leaves attached location: Discard Barricade.`;
    traits = "Insight. Tactic.";
    flavor = ``;
    subname = "";
    restrictions = {};
}
