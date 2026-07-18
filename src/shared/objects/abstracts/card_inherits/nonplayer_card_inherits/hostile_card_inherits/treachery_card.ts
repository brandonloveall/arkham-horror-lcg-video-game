import { GamePlayer } from "shared/objects/player";
import { HostileCard } from "../hostile_card";
import { CardType } from "shared/card_database_types";

export abstract class TreacheryCard extends HostileCard {
	abstract resolve(plrWhoDrew: GamePlayer): void;

	type_name: CardType = CardType.Treachery
}
