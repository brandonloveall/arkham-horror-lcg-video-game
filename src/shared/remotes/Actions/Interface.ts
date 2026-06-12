import { ReplicatedStorage } from "@rbxts/services";
import { CardRegistry } from "shared/card_registry";
import { GameContext } from "shared/game_context";
import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { LocationCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card";
import { CostingCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card";
import { RunService } from "@rbxts/services";
import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { GamePlayer } from "shared/objects/player";

const actions = ReplicatedStorage.WaitForChild("TS").WaitForChild("remotes").WaitForChild("Actions")

const PlayCard = actions.WaitForChild("PlayCard") as RemoteEvent
const Draw = actions.WaitForChild("Draw") as RemoteEvent
const Engage = actions.WaitForChild("Engage") as RemoteEvent
const Evade = actions.WaitForChild("Evade") as RemoteEvent
const Fight = actions.WaitForChild("Fight") as RemoteEvent
const GainResource = actions.WaitForChild("GainResource") as RemoteEvent
const Investigate = actions.WaitForChild("Investigate") as RemoteEvent
const Move = actions.WaitForChild("Move") as RemoteEvent
const EndTurn = actions.WaitForChild("EndTurn") as RemoteEvent
const ActivateAbility = actions.WaitForChild("ActivateAbility") as RemoteEvent
const AdvanceAct = actions.WaitForChild("AdvanceAct") as RemoteEvent

function getPlrObj(plr: Player) {
    return GameContext.players.find((e) => {
        return e.owner === plr
    })!
}

///////////////////////////////

export function Draw_Pub() {
    Draw.FireServer()
}

export function Engage_Pub(enemy_id: string) {
    Engage.FireServer(enemy_id)
}

export function Evade_Pub(enemy_id: string) {
    Evade.FireServer(enemy_id)
}

export function Fight_Pub(enemy_id: string) {
    Fight.FireServer(enemy_id)
}

export function GainResource_Pub() {
    GainResource.FireServer()
}

export function Investigate_Pub() {
    Investigate.FireServer()
}

export function Move_Pub(location_id: string) {
    Move.FireServer(location_id)
}

export function PlayCard_Pub(card_id: string) {
    PlayCard.FireServer(card_id);
}

export function EndTurn_Pub() {
    EndTurn.FireServer();
}

export function ActivateAbility_Pub(card_id: string) {
    ActivateAbility.FireServer(card_id)
}

export function AdvanceAct_Pub() {
    AdvanceAct.FireServer()
}

///////////////////////////////

export default (() => {
    if (RunService.IsServer()) {
        Draw.OnServerEvent.Connect((plr: Player) => {
            getPlrObj(plr).draw()
        })

        Engage.OnServerEvent.Connect((plr: Player, enemy_id: unknown) => {
            getPlrObj(plr).engage(CardRegistry.get(enemy_id as string) as EnemyCard)
        })

        Evade.OnServerEvent.Connect((plr: Player, enemy_id: unknown) => {
            getPlrObj(plr).evade(CardRegistry.get(enemy_id as string) as EnemyCard)
        })

        Fight.OnServerEvent.Connect((plr: Player, enemy_id: unknown) => {
            getPlrObj(plr).fight(CardRegistry.get(enemy_id as string) as EnemyCard)
        })

        GainResource.OnServerEvent.Connect((plr: Player) => {
            getPlrObj(plr).takeResource()
        })

        Investigate.OnServerEvent.Connect((plr: Player) => {
            const plrObj = getPlrObj(plr)
            plrObj.investigate(plrObj.location)
        })

        Move.OnServerEvent.Connect((plr: Player, location_id: unknown) => {
            getPlrObj(plr).move(CardRegistry.get(location_id as string) as LocationCard)
        })

        PlayCard.OnServerEvent.Connect((plr: Player, card_id: unknown) => {
            getPlrObj(plr).play(CardRegistry.get(card_id as string) as CostingCard)
        })

        ActivateAbility.OnServerEvent.Connect((plr: Player, card_id: unknown) => {
            const card = CardRegistry.get(card_id as string) as AssetCard
            if(!card.usable) { return; }
            getPlrObj(plr).activateAbility((gameplr: GamePlayer) => card.ability(gameplr))
        })

        AdvanceAct.OnServerEvent.Connect((plr: Player) => {
            getPlrObj(plr).attemptAdvance()
        })
    }
})()