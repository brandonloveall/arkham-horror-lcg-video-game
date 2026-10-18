import { HttpService } from "@rbxts/services";
import { CardType, Faction } from "shared/card_database_types";
import { CardRegistry } from "shared/card_registry";

export abstract class Card {
	id: string = HttpService.GenerateGUID(false);

	abstract code: string;
	abstract pack_name: string;
	abstract type_name: CardType;
	abstract faction_name: Faction;
	abstract name: string;
	abstract quantity: number;
	abstract is_unique: boolean;
	abstract permanent: boolean;
	abstract text: string;
	abstract traits: string[];
	abstract flavor: string;
	abstract subname: string;

	owner_username?: string;

	inPlay = false;

	constructor() {
		CardRegistry.insert(this);
	}
}
