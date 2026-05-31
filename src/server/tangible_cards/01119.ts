
import { EnemyCard } from "server/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { GamePlayer } from "server/player";

export class _01119 extends EnemyCard {
    health = 4;
    enemy_damage = 2;
    enemy_horror = 1;
    enemy_fight = 3;
    enemy_evade = 4;
    victory = 1;
    engagedWith: GamePlayer | undefined;
    encounter_name = "The Gathering";
    encounter_position = 16;
    code = "01119";
    pack_name = "Core Set";
    type_name = "Enemy";
    faction_name = "Mythos";
    position = 119;
    exceptional = false;
    myriad = false;
    name = "Icy Ghoul";
    quantity = 1;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `<b>Spawn</b> - Cellar.`;
    traits = "Humanoid. Monster. Ghoul.";
    flavor = `Inside the tunnels beneath the house, a massive beast tears its way out of the ice. It is covered in a think layer of frost, its breath visible in the bitter cold.`;
    subname = "";
    restrictions = {};
}
