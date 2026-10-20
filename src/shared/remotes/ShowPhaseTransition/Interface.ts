import { ReplicatedStorage } from "@rbxts/services";

const ShowPhaseTransition = ReplicatedStorage.WaitForChild("TS")
	.WaitForChild("remotes")
	.WaitForChild("ShowPhaseTransition")
	.WaitForChild("ShowPhaseTransition") as RemoteEvent;

export function ShowPhaseTransition_Pub(oldPhase: number, newPhase: number) {
	ShowPhaseTransition.FireAllClients(oldPhase, newPhase);
	task.wait(4);
}

export function ShowPhaseTransition_Sub(callback: (oldPhase: number, newPhase: number) => void) {
	ShowPhaseTransition.OnClientEvent.Connect(callback);
}
