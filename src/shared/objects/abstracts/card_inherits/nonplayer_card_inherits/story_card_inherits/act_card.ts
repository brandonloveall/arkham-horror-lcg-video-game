import { CardType } from "shared/card_database_types";
import { StoryCard } from "../story_card";

export interface ActRestriction {
	canDirectlySpend: boolean;
}

export abstract class ActCard extends StoryCard {
	abstract clues: number;

	abstract advance(): void;

	restriction?: ActRestriction;

	type_name = CardType.Act
}
