import { CardType } from "shared/card_database_types";
import { DoubleSided } from "shared/objects/abstracts/double_sided";
import { Card } from "../card";

export interface ActRestriction {
	canDirectlySpend: boolean;
}

interface Advancement {
	advance: () => void;
	canAdvance: () => boolean;
	optional: boolean;
}

export abstract class ActCard extends Card implements DoubleSided {
	abstract encounter_name: string;
	abstract encounter_position: number;

	abstract stage: number;
	abstract back_name: string;
	abstract back_text: string;
	abstract back_flavor: string;

	abstract clues: number;

	abstract advancement: Advancement;

	type_name = CardType.Act;
}
