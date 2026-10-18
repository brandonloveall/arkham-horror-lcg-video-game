import { EnemyCard } from "shared/objects/abstracts/card_inherits/enemy_card";
import { GamePlayer } from "shared/objects/player";
import { CardType, Faction } from "shared/card_database_types";

export class _01119 extends EnemyCard {
	health = 4;
	damage = 2;
	horror = 1;
	fight = 3;
	evade = 4;
	victory = 1;
	engagedWith: GamePlayer | undefined;
	encounter_name = "The Gathering";
	code = "01119";
	pack_name = "Core Set";
	faction_name = Faction.Mythos;
	name = "Icy Ghoul";
	quantity = 1;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	text = `<b>Spawn</b> - Cellar.`;
	traits = ["Humanoid", "Monster", "Ghoul"];
	flavor = `Inside the tunnels beneath the house, a massive beast tears its way out of the ice. It is covered in a think layer of frost, its breath visible in the bitter cold.`;
	subname = "";
}

export default {
	code: "01119",
	faction_name: Faction.Mythos,
	type_name: CardType.Enemy,
	constructor: _01119,
};
