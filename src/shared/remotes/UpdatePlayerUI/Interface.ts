import { ReplicatedStorage } from "@rbxts/services";
import { PlayerCard } from "shared/objects/abstracts/card_inherits/player_card";
import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { GamePlayer } from "shared/objects/player";

const UpdatePlayerUI = ReplicatedStorage.WaitForChild("TS").WaitForChild("remotes").WaitForChild("UpdatePlayerUI").WaitForChild("UpdatePlayerUI") as RemoteEvent

interface UpdatePlayerUIPayload {
    hand: PlayerCard[],
    damage: number,
    horror: number,
    health: number,
    sanity: number,
    resources: number,
    actions: number,
    clues: number,
    assets: AssetCard[],
    deckSize: number,
    agility: number,
    combat: number,
    willpower: number,
    intellect: number
}

export function UpdatePlayerUI_Pub(player: GamePlayer) {
    UpdatePlayerUI.FireClient(player.owner, {
        hand: player.hand,
        damage: player.damage,
        horror: player.horror,
        health: player.investigator.health,
        sanity: player.investigator.sanity,
        resources: player.resources,
        actions: player.actions,
        clues: player.clues,
        assets: player.getAllEquipment(),
        deckSize: player.deck.size(),

        agility: player.investigator.skill_agility,
        combat: player.investigator.skill_combat,
        intellect: player.investigator.skill_intellect,
        willpower: player.investigator.skill_willpower
    } satisfies UpdatePlayerUIPayload)
}

export function UpdatePlayerUI_Sub(callback: (payload: UpdatePlayerUIPayload) => any) {
    UpdatePlayerUI.OnClientEvent.Connect(callback)
}