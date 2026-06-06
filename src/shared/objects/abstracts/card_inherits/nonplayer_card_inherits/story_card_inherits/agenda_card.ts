import { StoryCard } from "../story_card";

export abstract class AgendaCard extends StoryCard {
    abstract doom: number
    current_doom = 0

    abstract advance(): void
}