import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { StoryCard } from "../story_card";
import { GameContext } from "shared/game_context";
import { Card } from "shared/objects/abstracts/card";
import { GamePlayer } from "shared/objects/player";

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

    discoverClue(who: GamePlayer, amount: number) {
        if (this.clues >= amount) { this.clues -= amount; who.clues += amount }
    }

    place(coords: [number, number]) {
        this.model = ReplicatedStorage.WaitForChild("Models").WaitForChild(this.code).Clone() as Model;
        this.model.Parent = Workspace
        this.model.AddTag("LOCATION")
        this.model.PivotTo(new CFrame(new Vector3(coords[0] * 16, 0, coords[1] * 16)))
        GameContext.game_map[coords[0]][coords[1]] = this;
        this.model.Name = this.id
        return this;
    }
}