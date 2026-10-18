import { CardType } from "shared/card_database_types";
import { Card } from "../card";

export interface ActRestriction {
	canDirectlySpend: boolean;
}

interface Advancement {
	advance: () => void;
	canAdvance: () => boolean;
	optional: boolean;
}

export abstract class ActCard extends Card {
	abstract encounter_name: string;

	abstract stage: number;
	abstract back_name: string;
	abstract back_text: string;
	abstract back_flavor: string;

	abstract clues?: number;

	abstract advancement: Advancement;

	type_name = CardType.Act;
}
