import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { StoryCard } from "../story_card";
import { GameContext } from "shared/game_context";
import { Card } from "shared/objects/abstracts/card";

export abstract class LocationCard extends StoryCard {
    abstract shroud: number
    abstract clues: number
    model!: Model;

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
    attachments: Card[] = []
}

export function Place(location: LocationCard, coords: [number, number]) {
        location.model = ReplicatedStorage.WaitForChild("Models").WaitForChild(location.code) as Model;
        location.model.AddTag("LOCATION")
        location.model.MoveTo(new Vector3(coords[0], coords[1], 0))
        GameContext.game_map[coords[0]][coords[1]] = location;
        location.model.Parent = Workspace
        location.model.Name = location.id
        return location;
}