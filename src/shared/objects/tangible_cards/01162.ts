
import { TreacheryCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/treachery_card";
import { GamePlayer } from "../player";
import { skillCheck } from "shared/skillcheck";

export class _01162 extends TreacheryCard {
    encounter_name = "Ghouls";
    encounter_position = 5;
    code = "01162";
    pack_name = "Core Set";
    type_name = "Treachery";
    faction_name = "Mythos";
    position = 162;
    exceptional = false;
    myriad = false;
    name = "Grasping Hands";
    quantity = 3;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `<b>Revelation</b> - Test [agility] (3). For each point you fail by, take 1 damage.`;
    traits = "Hazard.";
    flavor = `Decaying hands rise up from below and grasp and claw at your ankles.`;
    subname = "";
    restrictions = {};

    resolve(plrWhoDrew: GamePlayer): void {
        const [passed, byHowMuch] = skillCheck(plrWhoDrew, 3, "skill_agility")
        if(!passed) {
            plrWhoDrew.damage += math.abs(byHowMuch) // i could just subtract the negative but this way is more clear
        }
    }
}
