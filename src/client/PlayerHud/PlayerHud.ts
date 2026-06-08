import { Players } from "@rbxts/services"
import { CostingCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card"
import { ActivateAbility_Pub, AdvanceAct_Pub, Draw_Pub, EndTurn_Pub, Engage_Pub, Evade_Pub, Fight_Pub, GainResource_Pub, Investigate_Pub, Move_Pub } from "shared/remotes/Actions/Interface"
import { PlayCard_Pub } from "shared/remotes/Actions/Interface"
import { UpdatePlayerUI_Sub } from "shared/remotes/UpdatePlayerUI/Interface"
import { getTarget } from "client/ClickSelection/ClickSelection"

const PlayerGui = Players.LocalPlayer.WaitForChild("PlayerGui")

const PlayerHud = PlayerGui.WaitForChild("PlayerHud")

const HealthHud = PlayerHud.WaitForChild("Health") as TextLabel
const SanityHud = PlayerHud.WaitForChild("Sanity") as TextLabel
const ActionsHud = PlayerHud.WaitForChild("Actions") as TextLabel
const ResourcesHud = PlayerHud.WaitForChild("Resources") as TextLabel
const CluesHud = PlayerHud.WaitForChild("Clues") as TextLabel
const Hand = PlayerHud.WaitForChild("Hand") as Frame

const ActionList = PlayerHud.WaitForChild("ActionButtons")

const Draw = ActionList.WaitForChild("Draw") as TextButton
const Fight = ActionList.WaitForChild("Fight") as TextButton
const GainResource = ActionList.WaitForChild("GainResource") as TextButton
const Evade = ActionList.WaitForChild("Evade") as TextButton
const Engage = ActionList.WaitForChild("Engage") as TextButton
const Investigate = ActionList.WaitForChild("Investigate") as TextButton
const Move = ActionList.WaitForChild("Move") as TextButton
const EndTurn = ActionList.WaitForChild("EndTurn") as TextButton
const AdvanceAct = ActionList.WaitForChild("AdvanceAct") as TextButton

const Assets = PlayerHud.WaitForChild("Assets") as Frame
const AssetDropdown = Assets.WaitForChild("Folder").WaitForChild("Dropdown") as TextButton

const CardTemplate = PlayerGui.WaitForChild("GuiElements").WaitForChild("CardTemplate") as TextButton
const AssetTemplate = PlayerGui.WaitForChild("GuiElements").WaitForChild("AssetTemplate") as TextButton

let currentHandCards: TextButton[] = []
let currentAssets: TextButton[] = []

UpdatePlayerUI_Sub((payload) => {
    HealthHud.Text = `${payload.damage}/${payload.health}`
    SanityHud.Text = `${payload.horror}/${payload.sanity}`
    ActionsHud.Text = `${payload.actions}`
    ResourcesHud.Text = `${payload.resources}`
    CluesHud.Text = `${payload.clues}`

    for (const card of currentHandCards) {
        card.Destroy()
    }

    for (const card of payload.hand) {
        const NewCard = CardTemplate.Clone()
        NewCard.Text = card.name
        NewCard.Parent = Hand
        if ((card as CostingCard).cost !== undefined) {
            NewCard.MouseButton1Click.Connect(() => PlayCard_Pub(card.id))
        }
        currentHandCards.push(NewCard)
    }

    for(const asset of currentAssets) {
        asset.Destroy()
    }

    for(const asset of payload.assets) {
        const NewAsset = AssetTemplate.Clone()
        NewAsset.Text = asset.name
        NewAsset.Parent = Assets
        NewAsset.MouseButton1Click.Connect(() => ActivateAbility_Pub(asset.id))
    }
})

Draw.MouseButton1Click.Connect(Draw_Pub)

Fight.MouseButton1Click.Connect(() => {
    if (getTarget().HasTag("ENEMY")) {
        Fight_Pub(getTarget().Name)
    }
})

GainResource.MouseButton1Click.Connect(GainResource_Pub)

Evade.MouseButton1Click.Connect(() => {
    if (getTarget().HasTag("ENEMY")) {
        Evade_Pub(getTarget().Name)
    }
})

Engage.MouseButton1Click.Connect(() => {
    if (getTarget().HasTag("ENEMY")) {
        Engage_Pub(getTarget().Name)
    }

})

Investigate.MouseButton1Click.Connect(Investigate_Pub)

Move.MouseButton1Click.Connect(() => {
    if(getTarget().HasTag("LOCATION")) {
        Move_Pub(getTarget().Name)
    }
})

AdvanceAct.MouseButton1Click.Connect(AdvanceAct_Pub)

EndTurn.MouseButton1Click.Connect(EndTurn_Pub)

let assetMenuShown = false

AssetDropdown.MouseButton1Click.Connect(() => { Assets.Position = new UDim2(0, assetMenuShown ? -200 : 0, 0, 0); assetMenuShown = !assetMenuShown })