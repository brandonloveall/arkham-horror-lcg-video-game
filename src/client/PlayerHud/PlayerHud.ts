import { Players } from "@rbxts/services"
import { Card } from "shared/objects/abstracts/card"
import { CostingCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card"
import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card"
import { PlayCard_Pub } from "shared/remotes/PlayCard/Interface"
import { UpdatePlayerUI_Sub } from "shared/remotes/UpdatePlayerUI/Interface"
const PlayerGui = Players.LocalPlayer.WaitForChild("PlayerGui")

const PlayerHud = PlayerGui.WaitForChild("PlayerHud")

const HealthHud = PlayerHud.WaitForChild("Health") as TextLabel
const SanityHud = PlayerHud.WaitForChild("Sanity") as TextLabel
const ActionsHud = PlayerHud.WaitForChild("Actions") as TextLabel
const ResourcesHud = PlayerHud.WaitForChild("Resources") as TextLabel
const Hand = PlayerHud.WaitForChild("Hand") as Frame

const CardTemplate = PlayerGui.WaitForChild("GuiElements").WaitForChild("CardTemplate") as TextButton

let currentHandCards: TextButton[] = []

UpdatePlayerUI_Sub((payload) => {
    HealthHud.Text = `${payload.damage}/${payload.health}`
    SanityHud.Text = `${payload.horror}/${payload.sanity}`
    ActionsHud.Text = `${payload.actions}`
    ResourcesHud.Text = `${payload.resources}`

    for(const card of currentHandCards) {
        card.Destroy()
    }

    for(const card of payload.hand) {
        print(payload.hand.size())
        const NewCard = CardTemplate.Clone()
        NewCard.Text = card.name
        NewCard.Parent = Hand
        if((card as CostingCard).cost !== undefined) {
            NewCard.MouseButton1Click.Connect(() => PlayCard_Pub(card.id))    
        }
        currentHandCards.push(NewCard)
    }
})