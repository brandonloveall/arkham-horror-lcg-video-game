import { CostingCard } from "../costing_card";
import { GamePlayer } from "shared/objects/player";

export abstract class EventCard extends CostingCard {
    abstract onPlay(whoPlayed: GamePlayer): void;
}