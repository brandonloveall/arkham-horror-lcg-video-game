import { Damageable } from "shared/objects/abstracts/damageable";
import { PlayerCard } from "../player_card";
import { DeckOption, DeckRequirements } from "shared/objects/abstracts/deck_req_and_opt";
import { LocationCard } from "../nonplayer_card_inherits/story_card_inherits/location_card";
import { ReplicatedStorage, Workspace } from "@rbxts/services";

export abstract class Investigator extends PlayerCard implements Damageable {
    abstract health: number;
    abstract sanity: number;

    abstract deck_requirements: DeckRequirements
    abstract deck_options: DeckOption[]
    model!: Model

    public place(location: LocationCard) {
        this.inPlay = true
        this.model = ReplicatedStorage.WaitForChild("Models").WaitForChild(this.code).Clone() as Model;
        this.model.Parent = Workspace
        this.model.AddTag("INVESTIGATOR")
        this.model.PivotTo(new CFrame(location.model.WorldPivot.Position.add(new Vector3(0, 16, 0))))
        this.model.Name = this.id
        return this;
    }

    public move(location: LocationCard) {
        this.model.PivotTo(new CFrame(location.model.WorldPivot.Position.add(new Vector3(0, 16, 0))))
    }
}