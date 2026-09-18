import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";

interface Params {
	to: EnemyCard;
	damage: number;
}

export function dealDamageToEnemy(params: Params) {
	params.to.takeDamage(params.damage);
}
