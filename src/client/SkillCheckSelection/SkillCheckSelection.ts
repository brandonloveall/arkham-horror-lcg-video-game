import { Players } from "@rbxts/services";
import { PlayerCard } from "shared/objects/abstracts/card_inherits/player_card";
import { Client_SkillCheck_Pub, Client_SkillCheck_Sub } from "shared/remotes/SkillCheck/Interface";

const PlayerGui = Players.LocalPlayer.WaitForChild("PlayerGui")

const SCS = PlayerGui.WaitForChild("SkillCheckSelectionUI") as ScreenGui

const Frame = PlayerGui.WaitForChild("SkillCheckSelectionUI").WaitForChild("Frame")
const Box = Frame.WaitForChild("Cards") as ScrollingFrame
const ConfirmButton = Frame.WaitForChild("Confirm") as TextButton
const Template = PlayerGui.WaitForChild("GuiElements").WaitForChild("SelectableCard") as TextButton

let chosen_cards: PlayerCard[] = []

ConfirmButton.MouseButton1Click.Connect(() => { Client_SkillCheck_Pub(chosen_cards); SCS.Enabled = false })

Client_SkillCheck_Sub((initiator, using, available, limit) => {
    SCS.Enabled = true

    chosen_cards = []
    for(let card of SCS.GetChildren()) {
        if(!card.IsA("TextButton")) { continue }
        card.Destroy() 
    }

    for(const card of available) {
        const GuiCard = Template.Clone()
        GuiCard.Parent = Box;
        GuiCard.Text = card.name;
        GuiCard.MouseButton1Click.Connect(() => {
            if(chosen_cards.size() === limit && !chosen_cards.includes(card)) { return; }

            if(!chosen_cards.includes(card)) { chosen_cards.push(card); GuiCard.BackgroundColor3 = new Color3(0, 255, 0) }
            else { chosen_cards.remove(chosen_cards.indexOf(card)); GuiCard.BackgroundColor3 = new Color3(255, 0, 0) }
        })
    }


})