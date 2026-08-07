import { ReplicatedStorage, TweenService, Workspace } from "@rbxts/services";
import { StoryCard } from "../story_card";
import { GameContext } from "shared/game_context";
import { Card } from "shared/objects/abstracts/card";
import { GamePlayer } from "shared/objects/player";
import { CardRegistry } from "shared/card_registry";
import { PlaySound_Pub } from "shared/remotes/PlaySound/Interface";
import { CardType } from "shared/card_database_types";

export abstract class LocationCard extends StoryCard {
	abstract shroud: number;
	abstract clues: number;
	model!: Model;
	xCoord = 0;
	yCoord = 0;
	type_name = CardType.Location;

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
		const bubble = ReplicatedStorage.WaitForChild("Models").WaitForChild("reuse").WaitForChild("bubble") as Part;

		this.xCoord = coords[0];
		this.yCoord = coords[1];
		this.model = ReplicatedStorage.WaitForChild("Models").WaitForChild(this.code).Clone() as Model;
		this.model.Parent = Workspace;
		this.model.AddTag("LOCATION");

		this.model.PivotTo(new CFrame(new Vector3(this.xCoord * 32 - 80, -16, this.yCoord * 32 - 80)));

		TweenService.Create(
			this.model.PrimaryPart!,
			new TweenInfo(2.5, Enum.EasingStyle.Sine, Enum.EasingDirection.Out),
			{
				Position: new Vector3(this.xCoord * 32 - 80, 0, this.yCoord * 32 - 80),
			},
		).Play();

		PlaySound_Pub("LocationBubbles");
		task.spawn(() => {
			for (let i = 0; i < 50; i++) {
				task.spawn(() => {
					const x = math.random(this.xCoord * 32 - 88, this.xCoord * 32 - 88 + 16);
					const y = math.random(this.yCoord * 32 - 88, this.yCoord * 32 - 88 + 16);

					const bub = bubble.Clone();
					bub.Position = new Vector3(x, -3, y);
					bub.Parent = Workspace;
					TweenService.Create(bub, new TweenInfo(1.5, Enum.EasingStyle.Linear), {
						Position: new Vector3(x, 16, y),
						Transparency: 1,
					}).Play();
					task.wait(1.5);
					bub.Destroy();
				});
				task.wait(2.5 / 50);
			}
		});

		GameContext.game_map[this.xCoord][this.yCoord] = this;
		this.model.Name = this.id;

		for (const _ of GameContext.game_map) {
			for (const location of _) {
				if (location !== undefined && this.connects_to.includes(location.symbol)) {
					if (location.connects_to.includes(this.symbol)) {
						const biArrow = ReplicatedStorage.WaitForChild("Models")
							.WaitForChild("twoway")
							.Clone() as UnionOperation;
						biArrow.Position = new Vector3(
							this.model.GetPivot().Position.X,
							0,
							this.model.GetPivot().Position.Z,
						)
							.add(
								new Vector3(
									location.model.GetPivot().Position.X,
									0,
									location.model.GetPivot().Position.Z,
								),
							)
							.div(2);
						biArrow.CFrame = CFrame.lookAt(
							biArrow.CFrame.Position,
							new Vector3(location.model.GetPivot().Position.X, 0, location.model.GetPivot().Position.Z),
							new Vector3(0, 0, 1),
						);
						biArrow.Parent = Workspace;
					} else {
						const singleArrow = ReplicatedStorage.WaitForChild("Models")
							.WaitForChild("oneway")
							.Clone() as UnionOperation;
						singleArrow.Position = this.model
							.GetPivot()
							.Position.add(location.model.GetPivot().Position)
							.div(2);
						singleArrow.CFrame = CFrame.lookAt(
							singleArrow.CFrame.Position,
							location.model.GetPivot().Position,
							new Vector3(0, 0, 1),
						).mul(CFrame.fromEulerAngles(math.rad(90), 0, 0));
						singleArrow.Parent = Workspace;
					}
				}
			}
		}

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
