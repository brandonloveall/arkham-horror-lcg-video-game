
import { TreacheryCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/treachery_card";
import { GamePlayer } from "../player";
import { skillCheck } from "shared/skillcheck";
import { discard } from "shared/discard";

export class _01167 extends TreacheryCard {
    encounter_name = "Chilling Cold";
    encounter_position = 1;
    code = "01167";
    pack_name = "Core Set";
    type_name = "Treachery";
    faction_name = "Mythos";
    position = 167;
    exceptional = false;
    myriad = false;
    name = "Crypt Chill";
    quantity = 2;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `<b>Revelation</b> - Test [willpower] (4). If you fail, choose and discard 1 asset you control (if you cannot, take 2 damage instead).`;
    traits = "Hazard.";
    flavor = `The supernatural cold threatens to freeze your soul.`;
    subname = "";

    resolve(plrWhoDrew: GamePlayer): void {
        const [passed] = skillCheck(plrWhoDrew, 4, "skill_willpower")
        if(!passed) {
            const couldDiscard = discard(plrWhoDrew, plrWhoDrew.getAllEquipment(), 1)
            if(!couldDiscard) {
                plrWhoDrew.takeDamage(2, 0)
            }
        }
    }
}
