import { Card } from "./objects/abstracts/card";

export enum Faction {
	Mythos,
	Neutral,
	Guardian,
	Seeker,
	Survivor,
	Mystic,
	Rogue,
}

export enum CardType {
	Agenda,
	Enemy,
	Scenario,
	Act,
	Location,
	Asset,
	Treachery,
	Investigator,
	Event,
	Skill,
}

export enum Skill {
	Agility = "AGILITY",
	Willpower = "WILLPOWER",
	Combat = "COMBAT",
	Intellect = "INTELLECT",
	Wildcard = "WILDCARD",
}

export interface CardData {
	code: string;
	faction_name: Faction;
	type_name: CardType;
	constructor: new () => Card;
}
