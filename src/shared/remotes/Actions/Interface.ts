import { ReplicatedStorage } from "@rbxts/services";

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

///////////////////////////////

export function Draw_Pub() {
    Draw.FireServer()
}

export function Engage_Pub() {
    Engage.FireServer()
}

export function Evade_Pub() {
    Evade.FireServer()
}

export function Fight_Pub() {
    Fight.FireServer()
}

export function GainResource_Pub() {
    GainResource.FireServer()
}

export function Investigate_Pub() {
    Investigate.FireServer()
}

export function Move_Pub() {
    Move.FireServer()
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

export function Draw_Sub(callback: (plr: Player) => void) {
    Draw.OnServerEvent.Connect(callback)
}

export function Engage_Sub(callback: (plr: Player) => void) {
    Engage.OnServerEvent.Connect(callback)
}

export function Evade_Sub(callback: (plr: Player) => void) {
    Evade.OnServerEvent.Connect(callback)
}

export function Fight_Sub(callback: (plr: Player) => void) {
    Fight.OnServerEvent.Connect(callback)
}

export function GainResource_Sub(callback: (plr: Player) => void) {
    GainResource.OnServerEvent.Connect(callback)
}

export function Investigate_Sub(callback: (plr: Player) => void) {
    Investigate.OnServerEvent.Connect(callback)
}

export function Move_Sub(callback: (plr: Player) => void) {
    Move.OnServerEvent.Connect(callback)
}

export function PlayCard_Sub(callback: (plr: Player, card_id: unknown) => void) {
    PlayCard.OnServerEvent.Connect(callback)
}

export function EndTurn_Sub(callback: (plr: Player) => void) {
    EndTurn.OnServerEvent.Connect(callback)
}

export function ActivateAbility_Sub(callback: (plr: Player, card_id: unknown) => void) {
    ActivateAbility.OnServerEvent.Connect(callback)
}

export function AdvanceAct_Sub(callback: (plr: Player) => void) {
    AdvanceAct.OnServerEvent.Connect(callback)
}

///////////////////////////////