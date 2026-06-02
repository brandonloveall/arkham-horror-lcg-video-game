import { ReplicatedStorage } from "@rbxts/services";

const PlayCard = ReplicatedStorage.WaitForChild("TS").WaitForChild("remotes").WaitForChild("PlayCard").WaitForChild("PlayCard") as RemoteEvent

export function PlayCard_Pub(card_id: string) {
    PlayCard.FireServer(card_id);
}

export function PlayCard_Sub(callback: (card_id: string) => void) {
    PlayCard.OnClientEvent.Connect(callback)
}