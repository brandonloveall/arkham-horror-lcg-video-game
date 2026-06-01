
import { EventCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/event_card";

export class _01524 extends EventCard {
    cost = 5;
    skill_agility = 0;
    skill_combat = 0;
    skill_intellect = 0;
    skill_willpower = 1;
    skill_wildcard = 0;
    xp = 0;
    deck_limit = 2;
    code = "01524";
    pack_name = "Revised Core Set";
    type_name = "Event";
    faction_name = "Guardian";
    position = 24;
    exceptional = false;
    myriad = false;
    name = "Dynamite Blast";
    quantity = 2;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `Choose either your location or a connecting location. Deal 3 damage to each enemy and to each investigator at the chosen location.`;
    traits = "Tactic.";
    flavor = ``;
    subname = "";
    restrictions = {};

    onPlay(): void {
        print("not yet implemented")
    }
}
