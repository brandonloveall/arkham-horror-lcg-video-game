import { CardType, Skill } from "shared/card_database_types";
import { Card } from "../card";

export abstract class SkillCard extends Card {
	abstract skills: Record<Skill, number>;
	abstract xp: number;

	type_name = CardType.Skill;
}
