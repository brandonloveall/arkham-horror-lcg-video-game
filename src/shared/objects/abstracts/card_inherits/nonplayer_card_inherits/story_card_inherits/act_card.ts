import { CardType } from "shared/card_database_types";
import { StoryCard } from "../story_card";

export interface ActRestriction {
	canDirectlySpend: boolean;
}

interface Advancement {
	advance: () => void;
	canAdvance: () => boolean;
	optional: boolean;
}

export abstract class ActCard extends StoryCard {
	abstract clues: number;

	abstract advancement: Advancement;

	type_name = CardType.Act;
}
