
import { SkillCard } from "server/abstracts/card_inherits/player_card_inherits/skill_card";

export class _01539 extends SkillCard {
    skill_agility = 0;
    skill_combat = 0;
    skill_intellect = 1;
    skill_willpower = 0;
    skill_wildcard = 0;
    xp = 0;
    deck_limit = 2;
    code = "01539";
    pack_name = "Revised Core Set";
    type_name = "Skill";
    faction_name = "Seeker";
    position = 39;
    exceptional = false;
    myriad = false;
    name = "Deduction";
    quantity = 2;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `If this skill test is successful while investigating a location, discover 1 additional clue at that location.`;
    traits = "Practiced.";
    flavor = `I knew I had seen this symbol before. I must warn the others before it is too late!`;
    subname = "";
    restrictions = {};
}
