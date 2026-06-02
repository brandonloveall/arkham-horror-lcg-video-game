import { ReplicatedStorage } from "@rbxts/services";
import { Card } from "shared/objects/abstracts/card";
import { GamePlayer } from "shared/objects/player";

const UpdatePlayerUI = ReplicatedStorage.WaitForChild("TS").WaitForChild("remotes").WaitForChild("UpdatePlayerUI").WaitForChild("UpdatePlayerUI") as RemoteEvent

interface UpdatePlayerUIPayload {
    hand: Card[],
    damage: number,
    horror: number,
    health: number,
    sanity: number,
    resources: number,
    actions: number
}

export function UpdatePlayerUI_Pub(player: GamePlayer) {
    UpdatePlayerUI.FireClient(player.owner, {
        hand: [...player.hand],
        damage: player.damage,
        horror: player.horror,
        health: player.investigator.health,
        sanity: player.investigator.sanity,
        resources: player.resources,
        actions: player.actions
    } satisfies UpdatePlayerUIPayload)
}

export function UpdatePlayerUI_Sub(callback: (payload: UpdatePlayerUIPayload) => any) {
    UpdatePlayerUI.OnClientEvent.Connect(callback)
}