
import { EventCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/event_card";

export class _01523 extends EventCard {
    cost = 1;
    skill_agility = 1;
    skill_combat = 0;
    skill_intellect = 0;
    skill_willpower = 1;
    skill_wildcard = 0;
    xp = 0;
    deck_limit = 2;
    code = "01523";
    pack_name = "Revised Core Set";
    type_name = "Event";
    faction_name = "Guardian";
    position = 23;
    exceptional = false;
    myriad = false;
    name = "Dodge";
    quantity = 2;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `Fast. Play when an enemy attacks an investigator at your location.
Cancel that attack.`;
    traits = "Tactic.";
    flavor = ``;
    subname = "";
    restrictions = {};

    onPlay(): void {
        print("not yet implemented")
    }
}
