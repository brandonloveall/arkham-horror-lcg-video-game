import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { StoryCard } from "../story_card";
import { GameContext } from "shared/game_context";
import { Card } from "shared/objects/abstracts/card";
import { GamePlayer } from "shared/objects/player";
import { CardRegistry } from "shared/card_registry";
import { PlaySound_Pub } from "shared/remotes/PlaySound/Interface";

export abstract class LocationCard extends StoryCard {
	abstract shroud: number;
	abstract clues: number;
	model!: Model;
	xCoord = 0;
	yCoord = 0;

	protected static readonly Symbol = {
		RedSquare: 1,
		BlueTriangle: 2,
		BrownCross: 3,
		GreenDiamond: 4,
		YellowCircle: 5,
	} as const;

	abstract connects_to: (typeof LocationCard.Symbol)[keyof typeof LocationCard.Symbol][];
	abstract symbol: (typeof LocationCard.Symbol)[keyof typeof LocationCard.Symbol];
	revealed = false;
	attachments: Card[] = [];

	discoverClue(who: GamePlayer, amount: number) {
		if (this.clues >= amount) {
			this.clues -= amount;
			who.clues += amount;
			PlaySound_Pub("CluesFound");
		}
	}

	place(coords: [number, number]) {
		this.xCoord = coords[0];
		this.yCoord = coords[1];
		this.model = ReplicatedStorage.WaitForChild("Models").WaitForChild(this.code).Clone() as Model;
		this.model.Parent = Workspace;
		this.model.AddTag("LOCATION");
		this.model.PivotTo(new CFrame(new Vector3(this.xCoord * 16, 0, this.yCoord * 16)));
		GameContext.game_map[this.xCoord][this.yCoord] = this;
		this.model.Name = this.id;

		return this;
	}

	remove() {
		CardRegistry.remove(this);
		if (GameContext.game_map[this.xCoord][this.yCoord] === this) {
			GameContext.game_map[this.xCoord][this.yCoord] = undefined;
		}
		this.model.Destroy();
	}
}
