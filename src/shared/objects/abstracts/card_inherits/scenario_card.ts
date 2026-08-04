import { IconToken } from "shared/objects/chaos_bag";
import { Card } from "../card";
import { GamePlayer } from "shared/objects/player";
import { ResolveObj } from "shared/skillcheck";
import { CardType } from "shared/card_database_types";

export abstract class ScenarioCard extends Card {
	abstract resolve(token: IconToken, puller: GamePlayer, resolveObj: ResolveObj): number;

	abstract setup(): void;

	type_name = CardType.Scenario;
}
