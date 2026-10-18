import { Card } from "../card";
import { LocationCard } from "./location_card";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { GamePlayer } from "shared/objects/player";
import { CardType, Skill } from "shared/card_database_types";

export abstract class Investigator extends Card {
	abstract skills: Record<Skill, number>;
	abstract xp: number;

	abstract health: number;
	abstract sanity: number;

	model!: Model;
	type_name = CardType.Investigator;

	public place(location: LocationCard) {
		this.inPlay = true;
		this.model = ReplicatedStorage.WaitForChild("Models").WaitForChild(this.code).Clone() as Model;
		this.model.Parent = Workspace;
		this.model.AddTag("INVESTIGATOR");

		const randomOnLocation = new CFrame(
			math.random(location.model.WorldPivot.Position.X - 8, location.model.WorldPivot.Position.X + 8),
			16,
			math.random(location.model.WorldPivot.Position.Z - 8, location.model.WorldPivot.Position.Z + 8),
		);

		this.model.PivotTo(randomOnLocation);
		this.model.Name = this.id;

		return this;
	}

	public move(location: LocationCard) {
		const randomOnLocation = new CFrame(
			math.random(location.model.WorldPivot.Position.X - 8, location.model.WorldPivot.Position.X + 8),
			16,
			math.random(location.model.WorldPivot.Position.Z - 8, location.model.WorldPivot.Position.Z + 8),
		);
		(this.model.WaitForChild("Humanoid") as Humanoid).MoveTo(randomOnLocation.Position);
	}

	abstract resolveElderToken(initiator: GamePlayer): number;
}
