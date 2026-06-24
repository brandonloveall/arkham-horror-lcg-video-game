import { CardRegistry } from "shared/card_registry";
import { ScenarioCard } from "../abstracts/card_inherits/scenario_card";
import { IconToken } from "../chaos_bag";
import { GamePlayer } from "../player";
import { EnemyCard } from "../abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { ResolveObj } from "shared/skillcheck";

export class _01104 extends ScenarioCard {
    code = "01104";
    pack_name = "Core Set";
    type_name = "Scenario";
    faction_name = "Mythos";
    position = 104;
    exceptional = false;
    myriad = false;
    name = "The Gathering";
    quantity = 1;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = true;
    text = "Easy / Standard\n[skull] -X. X is the number of [[Ghoul]] enemies at your location.\n[cultist] -1. If you fail, take 1 horror.\n[tablet] -2. If there is a [[Ghoul]] enemy at your location, take 1 damage.\n"
    traits = "";
    flavor = "";
    subname = "";
    
    resolve(token: IconToken, puller: GamePlayer, resolveObj: ResolveObj) {
        if(token === IconToken.skull) {
            let total = 0;
            for(const card of CardRegistry.getAll()) {
                if(card instanceof EnemyCard && card.traits.find("Ghoul")[0] !== undefined && card.location === puller.location) { 
                    total--;
                }
            }
            return total;
        }
        if(token === IconToken.cultist) {
            resolveObj.onFail.push(() => puller.takeDamage(0, 1))
            return -1;
        }
        if(token === IconToken.tablet) {
            resolveObj.onFail.push(() => puller.takeDamage(1, 0))
            return -2;
        }
        return 0; // should never hit
    };
}