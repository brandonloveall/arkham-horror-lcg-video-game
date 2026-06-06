import { StoryCard } from "../story_card";

export interface ActRestriction {
    canDirectlySpend: boolean
}

export abstract class ActCard extends StoryCard {
    abstract clues: number

    abstract advance(): void

    restriction?: ActRestriction
}