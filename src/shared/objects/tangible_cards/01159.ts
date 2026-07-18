import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { GamePlayer } from "shared/objects/player";
import { CardType, Faction } from "shared/card_database_types";

export class _01159 extends EnemyCard {
	health = 1;
	enemy_damage = 1;
	enemy_horror = 0;
	enemy_fight = 1;
	enemy_evade = 3;
	victory = 0;
	engagedWith: GamePlayer | undefined;
	encounter_name = "Rats";
	encounter_position = 1;
	code = "01159";
	pack_name = "Core Set";
	faction_name = Faction.Mythos;
	position = 159;
	exceptional = false;
	myriad = false;
	name = "Swarm of Rats";
	quantity = 3;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `Hunter.`;
	traits = "Creature.";
	flavor = `A horde of cruel rats skitters forth in an undulating wave of claws, teeth, and mottled fur.`;
	subname = "";
}

export default {
	code: "01159",
	faction_name: Faction.Mythos,
	type_name: CardType.Enemy,
	constructor: _01159,
};
