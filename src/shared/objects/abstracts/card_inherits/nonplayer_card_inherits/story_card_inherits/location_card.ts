import { StoryCard } from "../story_card";

export abstract class LocationCard extends StoryCard {
    abstract shroud: number
    abstract clues: number

    protected static readonly Symbol = {
        RedSquare: 1,
        BlueTriangle: 2,
        BrownCross: 3,
        GreenDiamond: 4,
        YellowCircle: 5,
    } as const;

    abstract connects_to: typeof LocationCard.Symbol[keyof typeof LocationCard.Symbol][];
    abstract symbol: typeof LocationCard.Symbol[keyof typeof LocationCard.Symbol]
    revealed = false;
}