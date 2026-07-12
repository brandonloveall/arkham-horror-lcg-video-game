import { ReplicatedStorage } from "@rbxts/services";

const StartCampaign = ReplicatedStorage.WaitForChild("TS")
	.WaitForChild("remotes")
	.WaitForChild("StartCampaign")
	.WaitForChild("StartCampaign") as RemoteEvent;

export function StartCampaign_Pub(identifier: string, difficulty: number) {
	StartCampaign.FireServer(identifier, difficulty);
}

export function StartCampaign_Sub(callback: (player: Player, identifier: unknown, difficulty: unknown) => void) {
	StartCampaign.OnServerEvent.Connect(callback);
}
