import { CardType } from "shared/card_database_types";
import { DoubleSided } from "shared/objects/abstracts/double_sided";
import { Card } from "../card";

export abstract class AgendaCard extends Card implements DoubleSided {
	abstract encounter_name: string;
	abstract encounter_position: number;

	abstract stage: number;
	abstract back_name: string;
	abstract back_text: string;
	abstract back_flavor: string;

	abstract doom: number;
	current_doom = 0;

	abstract advance(): void;

	type_name = CardType.Agenda;
}
