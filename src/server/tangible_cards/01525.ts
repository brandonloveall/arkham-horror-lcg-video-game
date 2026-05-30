
import { SkillCard } from "server/abstracts/card_inherits/player_card_inherits/skill_card";

export class _01525 extends SkillCard {
    skill_agility = 0;
    skill_combat = 1;
    skill_intellect = 0;
    skill_willpower = 0;
    skill_wildcard = 0;
    xp = 0;
    deck_limit = 2;
    code = "01525";
    pack_name = "Revised Core Set";
    type_name = "Skill";
    faction_name = "Guardian";
    position = 25;
    exceptional = false;
    myriad = false;
    name = "Vicious Blow";
    quantity = 2;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `If this skill test is successful during an attack, that attack deals +1 damage.`;
    traits = "Practiced.";
    flavor = `With a sickening smack, he struck the abomination over and over... until at last, it stopped moving.`;
    subname = "";
}
