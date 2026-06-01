import { ReplicatedStorage } from "@rbxts/services";
import { Card } from "shared/objects/abstracts/card";
import { GamePlayer } from "shared/objects/player";

const UpdatePlayerUI = ReplicatedStorage.WaitForChild("TS").WaitForChild("remotes").WaitForChild("UpdatePlayerUI") as RemoteEvent

interface UpdatePlayerUIPayload {
    hand: Card[],
    health: number,
    sanity: number
}

export function UpdatePlayerUI_Fire(player: GamePlayer) {
    UpdatePlayerUI.FireClient(player.owner, {
        hand: [...player.hand],
        health: player.investigator.health - player.damage,
        sanity: player.investigator.sanity - player.horror,
    } satisfies UpdatePlayerUIPayload)
}