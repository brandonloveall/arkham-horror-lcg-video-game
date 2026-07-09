import { ReplicatedStorage } from "@rbxts/services";
import { GameContext } from "shared/game_context";

const PayClues = ReplicatedStorage.WaitForChild("TS")
	.WaitForChild("remotes")
	.WaitForChild("PayClues")
	.WaitForChild("PayClues") as RemoteEvent;

export function Server_PayClues_Pub() {
	for (const plr of GameContext.players) {
		PayClues.FireClient(plr.owner, plr.clues);
	}
}

export function Client_PayClues_Sub(callback: (limit: number) => void) {
	PayClues.OnClientEvent.Connect(callback);
}

export function Client_PayClues_Pub(paid: number) {
	PayClues.FireServer(paid);
}

export function Server_PayClues_Sub(callback: (player: Player, paid: number) => void) {
	PayClues.OnServerEvent.Connect((plr, paid) => callback(plr, paid as number));
}
