import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { GamePlayer } from "shared/objects/player";
import { CardType, Faction } from "shared/card_database_types";

export class _01118 extends EnemyCard {
	health = 4;
	enemy_damage = 1;
	enemy_horror = 2;
	enemy_fight = 4;
	enemy_evade = 1;
	victory = 1;
	engagedWith: GamePlayer | undefined;
	encounter_name = "The Gathering";
	encounter_position = 15;
	code = "01118";
	pack_name = "Core Set";
	faction_name = Faction.Mythos;
	position = 118;
	exceptional = false;
	myriad = false;
	name = "Flesh-Eater";
	quantity = 1;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `<b>Spawn</b> - Attic.`;
	traits = "Humanoid. Monster. Ghoul.";
	flavor = `A monstrous creature feeds from the rotting carcass in the attic.`;
	subname = "";
}

export default {
	code: "01118",
	faction_name: Faction.Mythos,
	type_name: CardType.Enemy,
	constructor: _01118,
};
