import { CardRegistry } from "shared/card_registry";
import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { GamePlayer } from "shared/objects/player";

export function standardFightTargets(plr: GamePlayer) {
	return CardRegistry.getAll().filter((e) => e instanceof EnemyCard && e.location === plr.location) as EnemyCard[];
}

export function standardEvadeTargets(plr: GamePlayer) {
	return CardRegistry.getAll().filter((e) => e instanceof EnemyCard && e.engagedWith === plr) as EnemyCard[];
}
