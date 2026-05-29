interface DeckRequirements {
    size: number
    cards: string[]
    random: [
        {
            target: string
            value: string
        }
    ]
}

interface DeckOption {
    faction: string[]
    level: {
        min: number,
        max: number
    }
}

export type { DeckRequirements, DeckOption }