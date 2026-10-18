import { Card } from "./objects/abstracts/card";
import { AssetCard } from "./objects/abstracts/card_inherits/asset_card";
import { EventCard } from "./objects/abstracts/card_inherits/event_card";
import { SkillCard } from "./objects/abstracts/card_inherits/skill_card";

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

// Slot and Skill require string indexing due to a number indexing bug when sent to client
export enum Skill {
	Agility = "AGILITY",
	Willpower = "WILLPOWER",
	Combat = "COMBAT",
	Intellect = "INTELLECT",
	Wildcard = "WILDCARD",
}

export enum Slot {
	Hand = "HAND",
	Hand2 = "2HAND",
	Arcane = "ARCANE",
	Arcane2 = "ARCANE2",
	Ally = "ALLY",
	Accessory = "ACCESSORY",
	Body = "BODY",
	None = "NONE",
}

export interface CardData {
	code: string;
	faction_name: Faction;
	type_name: CardType;
	constructor: new () => Card;
}

export type PlayableCard = AssetCard | EventCard;

export type PlayerCard = AssetCard | EventCard | SkillCard;
