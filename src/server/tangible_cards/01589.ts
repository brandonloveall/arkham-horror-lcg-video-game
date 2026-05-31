
import { SkillCard } from "server/abstracts/card_inherits/player_card_inherits/skill_card";

export class _01589 extends SkillCard {
    skill_agility = 0;
    skill_combat = 0;
    skill_intellect = 0;
    skill_willpower = 2;
    skill_wildcard = 0;
    xp = 0;
    deck_limit = 2;
    code = "01589";
    pack_name = "Revised Core Set";
    type_name = "Skill";
    faction_name = "Neutral";
    position = 89;
    exceptional = false;
    myriad = false;
    name = "Guts";
    quantity = 4;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `Max 1 committed per skill test.
If this test is successful, draw 1 card.`;
    traits = "Innate.";
    flavor = `Stay back! I'll handle this.`;
    subname = "";
    restrictions = {};
}
