import { ReplicatedStorage } from "@rbxts/services";
import { GamePlayer } from "shared/objects/player";
const PlaySound = ReplicatedStorage.WaitForChild("TS").WaitForChild("remotes").WaitForChild("PlaySound").WaitForChild("PlaySound") as RemoteEvent

export function PlaySound_Pub(soundName: string, to?: GamePlayer) {
    if(to) {
        PlaySound.FireClient(to.owner, soundName)
    } else {
        PlaySound.FireAllClients(soundName)
    }
}

export function PlaySound_Sub(callback: (soundName: string) => void) {
    PlaySound.OnClientEvent.Connect(callback)
}