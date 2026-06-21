import { Damageable } from "shared/objects/abstracts/damageable";
import { PlayerCard } from "../player_card";
import { DeckOption, DeckRequirements } from "shared/objects/abstracts/deck_req_and_opt";
import { LocationCard } from "../nonplayer_card_inherits/story_card_inherits/location_card";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { GamePlayer } from "shared/objects/player";

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

        const highlight: Highlight = new Instance("Highlight")
        highlight.Parent = this.model
        highlight.FillTransparency = 0.6
        highlight.FillColor = new Color3(0.5,0.5,0.5)
        highlight.Enabled = false

        return this;
    }

    public move(location: LocationCard) {
        this.model.PivotTo(new CFrame(location.model.WorldPivot.Position.add(new Vector3(0, 16, 0))))
    }

    abstract resolveElderToken(initiator: GamePlayer): number
}