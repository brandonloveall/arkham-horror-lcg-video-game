import { ReplicatedStorage } from "@rbxts/services";
import { Choice } from "shared/giveChoice";
import { GamePlayer } from "shared/objects/player";

const GiveChoice = ReplicatedStorage.WaitForChild("TS")
	.WaitForChild("remotes")
	.WaitForChild("GiveChoice")
	.WaitForChild("GiveChoice") as RemoteEvent;

export function Server_GiveChoice_Pub(who: GamePlayer, title: string, choices: Choice[]) {
	GiveChoice.FireClient(who.owner, title, choices);
}

export function Client_GiveChoice_Sub(callback: (title: string, choices: Choice[]) => void) {
	GiveChoice.OnClientEvent.Connect(callback);
}

export function Client_GiveChoice_Pub(selectedChoiceIndex: number) {
	GiveChoice.FireServer(selectedChoiceIndex);
}

export function Server_GiveChoice_Sub(callback: (player: Player, selectedChoiceIndex: unknown) => void) {
	GiveChoice.OnServerEvent.Connect((plr, index) => {
		callback(plr, index);
	});
}
