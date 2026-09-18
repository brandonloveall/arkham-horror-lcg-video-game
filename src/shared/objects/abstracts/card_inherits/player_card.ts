import { Skill } from "shared/card_database_types";
import { Card } from "../card";

export abstract class PlayerCard extends Card {
	abstract skills: Record<Skill, number>;
	abstract xp: number;
}
