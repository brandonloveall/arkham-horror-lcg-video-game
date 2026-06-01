import { CostingCard } from "../costing_card";

export abstract class EventCard extends CostingCard {
    abstract onPlay(): void;
}