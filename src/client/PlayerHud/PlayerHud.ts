import { Players } from "@rbxts/services"
import { CostingCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card"
import { ActivateAbility_Pub, AdvanceAct_Pub, Draw_Pub, EndTurn_Pub, Engage_Pub, Evade_Pub, Fight_Pub, GainResource_Pub, Investigate_Pub, Move_Pub } from "shared/remotes/Actions/Interface"
import { PlayCard_Pub } from "shared/remotes/Actions/Interface"
import { UpdatePlayerUI_Sub } from "shared/remotes/UpdatePlayerUI/Interface"

const PlayerGui = Players.LocalPlayer.WaitForChild("PlayerGui")

const PlayerHud = PlayerGui.WaitForChild("PlayerHud") as ScreenGui
const InvestigatorMenu = PlayerGui.WaitForChild("InvestigatorMenu") as ScreenGui

const ActionsHud = PlayerHud.WaitForChild("ActionDiamonds") as Frame
const ResourcesHud = PlayerHud.WaitForChild("Resources").WaitForChild("TextLabel") as TextLabel
const CluesHud = PlayerHud.WaitForChild("Clues").WaitForChild("Clues") as TextLabel
const Hand = PlayerHud.WaitForChild("Hand") as Frame
const DeckSize = PlayerHud.WaitForChild("Deck").WaitForChild("amount") as TextLabel

const Stats = InvestigatorMenu.WaitForChild("Frame").WaitForChild("miscAndStats").WaitForChild("stats") as TextLabel
const Agility = Stats.WaitForChild("Agility").WaitForChild("TextLabel") as TextLabel
const Combat = Stats.WaitForChild("Combat").WaitForChild("TextLabel") as TextLabel
const Willpower = Stats.WaitForChild("Willpower").WaitForChild("TextLabel") as TextLabel
const Intellect = Stats.WaitForChild("Intellect").WaitForChild("TextLabel") as TextLabel

const HealthHud = Stats.Parent!.WaitForChild("healthAndSanity").WaitForChild("Health").WaitForChild("TextLabel") as TextLabel
const SanityHud = Stats.Parent!.WaitForChild("healthAndSanity").WaitForChild("Sanity").WaitForChild("TextLabel") as TextLabel

const ActionList = PlayerHud.WaitForChild("ActionButtons")

const Fight = ActionList.WaitForChild("Fight") as TextButton
const GainResource = ActionList.WaitForChild("GainResource") as TextButton
const Evade = ActionList.WaitForChild("Evade") as TextButton
const Engage = ActionList.WaitForChild("Engage") as TextButton
const Investigate = ActionList.WaitForChild("Investigate") as TextButton
const Move = ActionList.WaitForChild("Move") as TextButton
const EndTurn = ActionList.WaitForChild("EndTurn") as TextButton
const AdvanceAct = ActionList.WaitForChild("AdvanceAct") as TextButton

const Assets = PlayerHud.WaitForChild("Assets") as Frame
const MenuOpenButton = Assets.WaitForChild("Folder").WaitForChild("Dropdown") as TextButton
const MenuCloseButton = InvestigatorMenu.WaitForChild("Frame").WaitForChild("Folder").WaitForChild("TextButton") as TextButton

const CardTemplate = PlayerGui.WaitForChild("GuiElements").WaitForChild("CardTemplate") as Frame
const AssetTemplate = PlayerGui.WaitForChild("GuiElements").WaitForChild("AssetTemplate") as TextButton

let currentHandCards: Frame[] = []

UpdatePlayerUI_Sub((payload) => {
    HealthHud.Text = `${payload.health - payload.damage}`
    SanityHud.Text = `${payload.sanity - payload.horror}`
    ResourcesHud.Text = `${payload.resources}`
    CluesHud.Text = `${payload.clues}`
    DeckSize.Text = `${payload.deckSize}`

    Agility.Text = `${payload.agility}`
    Combat.Text = `${payload.combat}`,
    Intellect.Text = `${payload.intellect}`,
    Willpower.Text = `${payload.willpower}`
    
    for(let i = 1; i <= payload.actions; i++) {
        (ActionsHud.WaitForChild(i) as ImageLabel).ImageTransparency = 0
    }
    for(let i = payload.actions + 1; i <= ActionsHud.GetChildren().size() - 1; i++) {
        (ActionsHud.WaitForChild(i) as ImageLabel).ImageTransparency = 0.7
    }

    for (const card of currentHandCards) {
        card.Destroy()
    }

    for (let card of payload.hand) {
        const NewCard = CardTemplate.Clone()

        const CardButton = NewCard.WaitForChild("TextButton") as TextButton
        const Name = NewCard.WaitForChild("title") as TextLabel
        const Cost = NewCard.WaitForChild("cost") as TextLabel
        const Description = NewCard.WaitForChild("description") as TextLabel
        const Skills = NewCard.WaitForChild("SkillIcons") as Frame

        Name.Text = card.name
        Description.Text = card.text
        if(card.type_name === "Asset" || card.type_name === "Event") {
            const costingCard = (card as CostingCard)
            Cost.Text = "" + costingCard.cost
            const skills = ["skill_agility", "skill_willpower", "skill_intellect", "skill_combat", "skill_wildcard"]
            const icons = ["rbxassetid://18623015454", "rbxassetid://18615903524", "rbxassetid://18615764098", "rbxassetid://18622919447", "rbxassetid://18623020407"]
            for(let i = 0; i < skills.size(); i++) {
                for(let _ = 0; _ < (costingCard[skills[i] as keyof CostingCard] as number); _++) {
                    const Icon = PlayerGui.WaitForChild("GuiElements").WaitForChild("skill").Clone() as ImageLabel
                    Icon.Parent = Skills
                    Icon.Image = icons[i]
                }
            }
            CardButton.MouseButton1Click.Connect(() => PlayCard_Pub(card.id))
        }

        const colors = {
            Neutral: new Color3(0.83,0.79,0.71),
            Seeker: new Color3(0.69,0.52,0.15),
            Survivor: new Color3(0.61,0.05,0.05),
            Mystic: new Color3(0.38,0.22,0.53),
            Guardian: new Color3(0.09,0.15,0.46),
            Rogue: new Color3(0.05,0.35,0.06)
        } 

        Name.BackgroundColor3 = colors[card.faction_name as keyof typeof colors]

        NewCard.Parent = Hand
        if ((card as CostingCard).cost !== undefined) {
        }
        currentHandCards.push(NewCard)
    }

    for(const asset of Assets.GetChildren()) {
        if(asset.IsA("TextButton")) { asset.Destroy() }
    }

    for(const asset of payload.assets) {
        const NewAsset = AssetTemplate.Clone()
        NewAsset.Text = asset.name
        NewAsset.Parent = Assets
        NewAsset.MouseButton1Click.Connect(() => ActivateAbility_Pub(asset.id))
    }
});

(DeckSize.Parent!.WaitForChild("ImageButton") as ImageButton).MouseButton1Click.Connect(Draw_Pub)

Fight.MouseButton1Click.Connect(() => {
    Fight_Pub()
})

GainResource.MouseButton1Click.Connect(GainResource_Pub)

Evade.MouseButton1Click.Connect(() => {
    Evade_Pub()
})

Engage.MouseButton1Click.Connect(() => {
    Engage_Pub()
})

Investigate.MouseButton1Click.Connect(Investigate_Pub)

Move.MouseButton1Click.Connect(() => {
    Move_Pub()
})

AdvanceAct.MouseButton1Click.Connect(AdvanceAct_Pub)

EndTurn.MouseButton1Click.Connect(EndTurn_Pub)

let assetMenuShown = false

MenuOpenButton.MouseButton1Click.Connect(() => { PlayerHud.Enabled = false; InvestigatorMenu.Enabled = true })
MenuCloseButton.MouseButton1Click.Connect(() => { PlayerHud.Enabled = true; InvestigatorMenu.Enabled = false })