import { HttpService } from "@rbxts/services"
import { CardRegistry } from "shared/card_registry";
import { WhatHappened } from "shared/game_context";

// TODO: make this a lot bigger to incorporate more reactions

export interface reaction {
    reaction: (...params: any) => void,
    optional: boolean
}

export type reactions = Partial<Record<WhatHappened, reaction>>

export abstract class Card {
    id: string = HttpService.GenerateGUID(false);

    abstract code: string
    abstract pack_name: string
    abstract type_name: string
    abstract faction_name: string
    abstract position: number
    abstract exceptional: boolean
    abstract myriad: boolean
    abstract name: string
    abstract quantity: number
    abstract health_per_investigator: boolean
    abstract is_unique: boolean
    abstract permanent: boolean
    abstract double_sided: boolean
    abstract text: string
    abstract traits: string
    abstract flavor: string
    abstract subname: string

    belongs_to: string = "" // for signature cards. if its blank, its fair game

    reactions?: reactions
    inPlay = false

    constructor() {
        CardRegistry.insert(this)
    }
}