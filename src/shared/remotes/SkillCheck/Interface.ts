import { ReplicatedStorage } from "@rbxts/services";
import { GameContext } from "shared/game_context";
import { PlayerCard } from "shared/objects/abstracts/card_inherits/player_card";
import { GamePlayer } from "shared/objects/player";

const SkillCheck = ReplicatedStorage.WaitForChild("TS").WaitForChild("remotes").WaitForChild("SkillCheck").WaitForChild("SkillCheck") as RemoteEvent

export function Server_SkillCheck_Pub(initiator: GamePlayer, using: string) {

    for(const plr of GameContext.players) {
        SkillCheck.FireClient(plr.owner, initiator, using, plr.hand, plr === initiator ? 999 : 1);
    }
}

export function Client_SkillCheck_Sub(callback: (initiator: GamePlayer, using: string, available: PlayerCard[], limit: number) => void) {
    SkillCheck.OnClientEvent.Connect(callback)
}


export function Client_SkillCheck_Pub(selectedCards: PlayerCard[]) {
    SkillCheck.FireServer(selectedCards)
}

export function Server_SkillCheck_Sub(callback: (player: Player, selectedCards: PlayerCard[]) => void) {
    SkillCheck.OnServerEvent.Connect((player: Player, cards: unknown) => { callback(player, cards as PlayerCard[]) })
}