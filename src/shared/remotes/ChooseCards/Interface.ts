import { ReplicatedStorage } from "@rbxts/services";
import { Card } from "shared/objects/abstracts/card";
import { PlayerCard } from "shared/objects/abstracts/card_inherits/player_card";
import { GamePlayer } from "shared/objects/player";

const ChooseCards = ReplicatedStorage.WaitForChild("TS").WaitForChild("remotes").WaitForChild("ChooseCards").WaitForChild("ChooseCards") as RemoteEvent

export function Server_ChooseCards_Pub(who: GamePlayer, what: Card[], message: string, amount?: number) {
    ChooseCards.FireClient(who.owner, what, message, amount)
}

export function Client_ChooseCards_Sub(callback: (what: Card[], message: string, amount?: number) => void) {
    ChooseCards.OnClientEvent.Connect(callback)
}


export function Client_ChooseCards_Pub(selectedCards: Card[]) {
    ChooseCards.FireServer(selectedCards)
}

export function Server_ChooseCards_Sub(callback: (player: Player, selectedCards: Card[]) => void) {
    ChooseCards.OnServerEvent.Connect((player: Player, cards: unknown) => { callback(player, cards as PlayerCard[]) })
}