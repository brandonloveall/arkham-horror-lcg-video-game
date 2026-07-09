import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { GamePlayer } from "shared/objects/player";

export class _01116 extends EnemyCard {
	health = 5;
	enemy_damage = 2;
	enemy_horror = 2;
	enemy_fight = 4;
	enemy_evade = 4;
	victory = 2;
	engagedWith: GamePlayer | undefined;
	encounter_name = "The Gathering";
	encounter_position = 13;
	code = "01116";
	pack_name = "Core Set";
	faction_name = "Mythos";
	position = 116;
	exceptional = false;
	myriad = false;
	name = "Ghoul Priest";
	quantity = 1;
	health_per_investigator = true;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `<b>Prey</b> - Highest [combat].
Hunter. Retaliate.`;
	traits = "Humanoid. Monster. Ghoul. Elite.";
	flavor = `A figure in red robes wearing a bone mask. It gibbers and snarls before leaping to attack.`;
	subname = "";
}
