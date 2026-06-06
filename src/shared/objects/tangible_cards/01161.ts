
import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { GamePlayer } from "shared/objects/player";

export class _01161 extends EnemyCard {
    health = 3;
    enemy_damage = 1;
    enemy_horror = 1;
    enemy_fight = 3;
    enemy_evade = 3;
    victory = 0;
    engagedWith: GamePlayer | undefined;
    encounter_name = "Ghouls";
    encounter_position = 4;
    code = "01161";
    pack_name = "Core Set";
    faction_name = "Mythos";
    position = 161;
    exceptional = false;
    myriad = false;
    name = "Ravenous Ghoul";
    quantity = 1;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `<b>Prey</b> - Lowest remaining health.`;
    traits = "Humanoid. Monster. Ghoul.";
    flavor = `The sight of the thing raised the question: Do we eat to live, or do we live to eat?`;
    subname = "";

}
