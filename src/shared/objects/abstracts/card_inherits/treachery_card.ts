import { GamePlayer } from "shared/objects/player";
import { Card } from "../card";
import { CardType } from "shared/card_database_types";

export abstract class TreacheryCard extends Card {
	abstract encounter_name: string;

	abstract resolve(plrWhoDrew: GamePlayer): void;

	type_name: CardType = CardType.Treachery
}
