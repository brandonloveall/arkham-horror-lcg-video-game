import { WholePossibleCard } from "./whole_possible_card"

export abstract class Card {
    code: string
    pack_code: string
    pack_name: string
    type_code: string
    type_name: string
    faction_code: string
    faction_name: string
    position: number
    exceptional: boolean
    myriad: boolean
    name: string
    quantity: number
    health_per_investigator: boolean
    is_unique: boolean
    permanent: boolean
    double_sided: boolean
    text: string
    traits: string[]
    flavor: string
    subname: string

    constructor(card: WholePossibleCard) {
        this.code = card.code
        this.pack_code = card.pack_code
        this.pack_name = card.pack_name
        this.type_code = card.type_code
        this.type_name = card.type_name
        this.faction_code = card.faction_code
        this.faction_name = card.faction_name
        this.position = card.position
        this.exceptional = card.exceptional
        this.myriad = card.myriad
        this.name = card.name
        this.quantity = card.quantity
        this.health_per_investigator = card.health_per_investigator
        this.is_unique = card.is_unique
        this.permanent = card.permanent
        this.double_sided = card.double_sided
        this.text = card.text
        this.traits = card.traits
        this.flavor = card.flavor
        this.subname = card.subname
    }

}