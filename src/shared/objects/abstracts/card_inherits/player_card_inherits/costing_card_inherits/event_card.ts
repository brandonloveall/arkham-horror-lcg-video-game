import { EnemyCard } from "../../nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { LocationCard } from "../../nonplayer_card_inherits/story_card_inherits/location_card";
import { CostingCard } from "../costing_card";
import { GamePlayer } from "shared/objects/player";
import { CardType } from "shared/card_database_types";

export abstract class EventCard extends CostingCard {
	abstract onPlay(whoPlayed: GamePlayer, target?: LocationCard | EnemyCard): void;

	type_name = CardType.Event;
}
