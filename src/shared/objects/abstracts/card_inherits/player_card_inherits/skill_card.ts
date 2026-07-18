import { CardType } from "shared/card_database_types";
import { PlayerCard } from "../player_card";

export abstract class SkillCard extends PlayerCard {
	type_name = CardType.Skill;
}
