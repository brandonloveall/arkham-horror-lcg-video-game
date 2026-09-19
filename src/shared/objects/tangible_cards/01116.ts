import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { GamePlayer } from "shared/objects/player";
import { CardType, Faction } from "shared/card_database_types";

export class _01116 extends EnemyCard {
	health = 5;
	damage = 2;
	horror = 2;
	fight = 4;
	evade = 4;
	victory = 2;
	engagedWith: GamePlayer | undefined;
	encounter_name = "The Gathering";
	encounter_position = 13;
	code = "01116";
	pack_name = "Core Set";
	faction_name = Faction.Mythos;
	position = 116;
	exceptional = false;
	myriad = false;
	name = "Ghoul Priest";
	quantity = 1;
	health_per_investigator = true;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `<b>Prey</b> - Highest 👊.
Hunter. Retaliate.`;
	traits = "Humanoid. Monster. Ghoul. Elite.";
	flavor = `A figure in red robes wearing a bone mask. It gibbers and snarls before leaping to attack.`;
	subname = "";
}

export default {
	code: "01116",
	faction_name: Faction.Mythos,
	type_name: CardType.Enemy,
	constructor: _01116,
};
