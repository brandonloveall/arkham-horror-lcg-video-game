import { HostileCard } from "../hostile_card";
import { GamePlayer } from "shared/objects/player";
import { LocationCard } from "../story_card_inherits/location_card";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { GameContext } from "shared/game_context";
// eslint-disable-next-line
import { PlaySound_Pub } from "shared/remotes/PlaySound/Interface";
import { CardType } from "shared/card_database_types";

export abstract class EnemyCard extends HostileCard {
	abstract health: number;
	sanity = undefined;
	abstract damage: number;
	abstract horror: number;
	abstract fight: number;
	abstract evade: number;
	abstract victory: number;

	abstract engagedWith: GamePlayer | undefined;

	is_ready = false;
	location: LocationCard | undefined;
	model!: Model;
	type_name = CardType.Enemy;

	damageTaken = 0;

	place(location: LocationCard) {
		this.inPlay = true;
		this.model = ReplicatedStorage.WaitForChild("Models").WaitForChild(this.code).Clone() as Model;
		this.model.Parent = Workspace;
		this.model.AddTag("ENEMY");

		const randomOnLocation = new CFrame(
			math.random(location.model.WorldPivot.Position.X - 8, location.model.WorldPivot.Position.X + 8),
			16,
			math.random(location.model.WorldPivot.Position.Z - 8, location.model.WorldPivot.Position.Z + 8),
		);

		this.model.PivotTo(randomOnLocation);
		this.model.Name = this.id;
		this.location = location;

		return this;
	}

	attackOfOpportunity(who: GamePlayer) {
		if (this.engagedWith === who && this.is_ready && this.inPlay) {
			this.attack(who);
		}
	}

	attack(plr: GamePlayer) {
		plr.takeDamage(this.damage, this.horror);
		PlaySound_Pub("Enemy_Attack");
	}

	takeDamage(damage: number) {
		this.damageTaken += damage;
		if (this.damageTaken >= this.health) {
			this.model.Destroy();
			if (this.engagedWith !== undefined) {
				this.engagedWith.threat_area.remove(this.engagedWith.threat_area.indexOf(this));
				this.engagedWith = undefined;
			}
			GameContext.encounter_discard.addCard(this);
			this.inPlay = false;
			this.location = undefined;
			this.damageTaken = 0;
			this.is_ready = false;
			PlaySound_Pub("Enemy_Defeated");
		} else {
			PlaySound_Pub("Enemy_Hurt");
		}
	}

	move(location: LocationCard) {
		this.model.PivotTo(new CFrame(location.model.WorldPivot.Position.add(new Vector3(0, 16, 0))));
		this.location = location;
	}
}
