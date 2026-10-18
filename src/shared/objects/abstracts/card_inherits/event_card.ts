import { EnemyCard } from "./enemy_card";
import { LocationCard } from "./location_card";
import { Card } from "../card";
import { GamePlayer } from "shared/objects/player";
import { CardType, Skill } from "shared/card_database_types";

export abstract class EventCard extends Card {
	abstract skills: Record<Skill, number>;
	abstract xp: number;
	abstract cost: number;
	abstract exceptional: boolean;
	abstract myriad: boolean;
	fast = false;

	canPlayFast(plr: GamePlayer) {
		return true;
	}

	abstract onPlay(whoPlayed: GamePlayer, target?: LocationCard | EnemyCard): void;

	type_name = CardType.Event;
}
