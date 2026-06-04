import { ReplicatedStorage } from "@rbxts/services";
import { PlayerCard } from "shared/objects/abstracts/card_inherits/player_card";
import { GamePlayer } from "shared/objects/player";

const SkillCheck = ReplicatedStorage.WaitForChild("TS").WaitForChild("remotes").WaitForChild("SkillCheck").WaitForChild("SkillCheck") as RemoteEvent

export function Server_SkillCheck_Pub(initiator: GamePlayer, using: string) {
    SkillCheck.FireAllClients(initiator, using);
}

export function Client_SkillCheck_Sub(callback: (initiator: Player, using: string) => void) {
    SkillCheck.OnClientEvent.Connect(callback)
}


export function Client_SkillCheck_Pub(selectedCards: PlayerCard[]) {
    SkillCheck.FireServer(selectedCards)
}

export function Server_SkillCheck_Sub(callback: (player: Player, selectedCards: PlayerCard[]) => void) {
    SkillCheck.OnServerEvent.Connect((player: Player, cards: unknown) => { callback(player, cards as PlayerCard[]) })
}