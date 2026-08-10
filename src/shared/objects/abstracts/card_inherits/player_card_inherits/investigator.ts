import { Damageable } from "shared/objects/abstracts/damageable";
import { PlayerCard } from "../player_card";
import { DeckOption, DeckRequirements } from "shared/objects/abstracts/deck_req_and_opt";
import { LocationCard } from "../nonplayer_card_inherits/story_card_inherits/location_card";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { GamePlayer } from "shared/objects/player";
import { CardType } from "shared/card_database_types";

export abstract class Investigator extends PlayerCard implements Damageable {
	abstract health: number;
	abstract sanity: number;

	abstract deck_requirements: DeckRequirements;
	abstract deck_options: DeckOption[];
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

		this.model.PivotTo(randomOnLocation);
	}

	abstract resolveElderToken(initiator: GamePlayer): number;
}
