import { ReplicatedStorage } from "@rbxts/services";
import { CardRegistry } from "shared/card_registry";
import { CostingCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card";

const PlayCard = ReplicatedStorage.WaitForChild("TS").WaitForChild("remotes").WaitForChild("PlayCard").WaitForChild("PlayCard") as RemoteEvent

export function PlayCard_Pub(card_id: string) {
    PlayCard.FireServer(card_id);
}

export function PlayCard_Sub(callback: (player: Player, card: CostingCard) => void) {
    PlayCard.OnServerEvent.Connect((player: Player, card_id: unknown) => { callback(player, CardRegistry.get(card_id as string) as CostingCard) })
}