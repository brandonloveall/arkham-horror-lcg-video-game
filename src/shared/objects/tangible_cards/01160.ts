
import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { GamePlayer } from "shared/objects/player";

export class _01160 extends EnemyCard {
    health = 2;
    enemy_damage = 1;
    enemy_horror = 1;
    enemy_fight = 2;
    enemy_evade = 2;
    victory = 0;
    engagedWith: GamePlayer | undefined;
    encounter_name = "Ghouls";
    encounter_position = 1;
    code = "01160";
    pack_name = "Core Set";
    faction_name = "Mythos";
    position = 160;
    exceptional = false;
    myriad = false;
    name = "Ghoul Minion";
    quantity = 3;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = ``;
    traits = "Humanoid. Monster. Ghoul.";
    flavor = `It was a colossal and nameless blasphemy with glaring red eyes, and it held in bony claws a thing that had been a man, gnawing at the head as a child nibbles at a stick of candy. <cite>H. P. Lovecraft, "Pickman's Model"</cite>`;
    subname = "";

}
