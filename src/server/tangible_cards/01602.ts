
import { EnemyCard } from "server/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { GamePlayer } from "server/player";

export class _01602 extends EnemyCard {
    health = 3;
    enemy_damage = 1;
    enemy_horror = 0;
    enemy_fight = 2;
    enemy_evade = 3;
    victory = 0;
    engagedWith: GamePlayer | undefined;
    encounter_name = "";
    encounter_position = 0;
    code = "01602";
    pack_name = "Revised Core Set";
    type_name = "Enemy";
    faction_name = "Neutral";
    position = 102;
    exceptional = false;
    myriad = false;
    name = "Silver Twilight Acolyte";
    quantity = 1;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `<b>Prey</b> - Bearer only.
Hunter.
<b>Forced</b> - After Silver Twilight Acolyte attacks: Place 1 doom on the current agenda.`;
    traits = "Humanoid. Cultist. Silver Twilight.";
    flavor = `You'll never forget the day you learned the true secret of the Silver Twilight Lodge's inner circle. The truth is too terrible for the Lodge to let you live.`;
    subname = "";
    restrictions = {};
}
