import { ReplicatedStorage } from "@rbxts/services";
import { IconToken } from "shared/objects/chaos_bag";

const StartCampaign = ReplicatedStorage.WaitForChild("TS")
	.WaitForChild("remotes")
	.WaitForChild("StartCampaign")
	.WaitForChild("StartCampaign") as RemoteEvent;

export function StartCampaign_Pub(identifier: string, chaos_bag: (number | IconToken)[]) {
	StartCampaign.FireServer(identifier, chaos_bag);
}

export function StartCampaign_Sub(callback: (player: Player, identifier: unknown, difficulty: unknown) => void) {
	StartCampaign.OnServerEvent.Connect(callback);
}
