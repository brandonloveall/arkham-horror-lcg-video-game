import { Investigator } from "shared/objects/abstracts/card_inherits/player_card_inherits/investigator";

export class _01501 extends Investigator {
    health = 9;
    sanity = 5;
    deck_requirements = {
        size: 30,
        cards: ["01506", "01507"],
        random: [{
            target: "subtype",
            value: "basicweakness"
        }]
    };
    deck_options = [
        {
            faction: [
                "guardian",
                "neutral"
            ],
            level: {
                min: 0,
                max: 5
            }
        },
        {
            faction: [
                "seeker"
            ],
            level: {
                min: 0,
                max: 2
            }
        }
    ];
    skill_agility = 2;
    skill_combat = 4;
    skill_intellect = 3;
    skill_willpower = 3;
    skill_wildcard = 0;
    xp = 0;
    deck_limit = 1;
    code = "01501";
    pack_name = "Revised Core Set";
    type_name = "Investigator";
    faction_name = "Guardian";
    position = 1;
    exceptional = false;
    myriad = false;
    name = "Roland Banks";
    quantity = 1;
    health_per_investigator = false;
    is_unique = true;
    permanent = false;
    double_sided = true;
    text = "[reaction] After you defeat an enemy: Discover 1 clue at your location. (Limit once per round.)\n[elder_sign] effect: +1 for each clue on your location.";
    traits = "Agency. Detective.";
    flavor = "Everything by the book: every \"i\" dotted, every \"t\" crossed. It had worked, until now.";
    subname = "The Fed";
}