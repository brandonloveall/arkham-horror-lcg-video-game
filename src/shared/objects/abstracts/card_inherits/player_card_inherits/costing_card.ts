import { PlayerCard } from "../player_card";

export abstract class CostingCard extends PlayerCard {
    abstract cost: number
}