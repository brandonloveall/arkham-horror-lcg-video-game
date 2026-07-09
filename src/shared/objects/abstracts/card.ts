import { HttpService } from "@rbxts/services";
import { CardRegistry } from "shared/card_registry";
import { WhatHappened } from "shared/game_context";

// TODO: make this a lot bigger to incorporate more reactions

export interface reaction {
	reaction: (...params: unknown[]) => void;
	optional: boolean;
	canUseReaction?: (...params: unknown[]) => boolean;
}

export type reactions = Partial<Record<WhatHappened, reaction>>;

/**
 * Builds a `reaction` entry while letting you write the handler with real,
 * typed parameters. The unknown[] cast the interface demands happens here once,
 * so implementations never need in-body casts.
 */
export function makeReaction<A extends unknown[]>(
	optional: boolean,
	fn: (...args: A) => void,
	canUseReaction?: (...args: A) => boolean,
): reaction {
	return {
		reaction: fn as (...params: unknown[]) => void,
		optional,
		canUseReaction: canUseReaction as ((...params: unknown[]) => boolean) | undefined,
	};
}

export abstract class Card {
	id: string = HttpService.GenerateGUID(false);

	abstract code: string;
	abstract pack_name: string;
	abstract type_name: string;
	abstract faction_name: string;
	abstract position: number;
	abstract exceptional: boolean;
	abstract myriad: boolean;
	abstract name: string;
	abstract quantity: number;
	abstract health_per_investigator: boolean;
	abstract is_unique: boolean;
	abstract permanent: boolean;
	abstract double_sided: boolean;
	abstract text: string;
	abstract traits: string;
	abstract flavor: string;
	abstract subname: string;

	belongs_to: string = ""; // for signature cards. if its blank, its fair game

	reactions?: reactions;
	inPlay = false;

	constructor() {
		CardRegistry.insert(this);
	}
}
