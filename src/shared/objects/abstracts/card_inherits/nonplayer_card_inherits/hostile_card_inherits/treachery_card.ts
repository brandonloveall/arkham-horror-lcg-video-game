import { GamePlayer } from "shared/objects/player";
import { HostileCard } from "../hostile_card";

export abstract class TreacheryCard extends HostileCard {
	abstract resolve(plrWhoDrew: GamePlayer): void;
}
