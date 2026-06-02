import { HttpService } from "@rbxts/services"
import { CardRegistry } from "shared/card_registry";

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

    constructor() {
        CardRegistry.insert(this)
    }
}