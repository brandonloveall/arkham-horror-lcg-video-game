import { Players } from "@rbxts/services";
import { Card } from "shared/objects/abstracts/card";
import { Client_ChooseCards_Pub, Client_ChooseCards_Sub } from "shared/remotes/ChooseCards/Interface";

const PlayerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

const CardPickingUI = PlayerGui.WaitForChild("CardPickingUI") as ScreenGui;

const Frame = PlayerGui.WaitForChild("CardPickingUI").WaitForChild("Frame");
const Box = Frame.WaitForChild("Cards") as ScrollingFrame;
const ConfirmButton = Frame.WaitForChild("Confirm") as TextButton;
const Template = PlayerGui.WaitForChild("GuiElements").WaitForChild("SelectableCard") as TextButton;
const Message = Frame.WaitForChild("Message") as TextLabel;

let chosen_cards: Card[] = [];
let _amount: number | undefined;

ConfirmButton.MouseButton1Click.Connect(() => {
	if (_amount !== undefined && chosen_cards.size() !== _amount) {
		return;
	}
	Client_ChooseCards_Pub(chosen_cards);
	CardPickingUI.Enabled = false;
});

Client_ChooseCards_Sub((what: Card[], message: string, amount?: number) => {
	CardPickingUI.Enabled = true;
	Message.Text = message;
	chosen_cards = [];
	_amount = amount;

	for (const card of Box.GetChildren()) {
		if (card.IsA("TextButton")) {
			card.Destroy();
		}
	}

	for (const card of what) {
		const GuiCard = Template.Clone();
		GuiCard.Parent = Box;
		GuiCard.Text = card.name;
		GuiCard.MouseButton1Click.Connect(() => {
			if (_amount !== undefined && chosen_cards.size() === _amount && !chosen_cards.includes(card)) {
				return;
			}

			if (!chosen_cards.includes(card)) {
				chosen_cards.push(card);
				GuiCard.BackgroundColor3 = new Color3(0, 255, 0);
			} else {
				chosen_cards.remove(chosen_cards.indexOf(card));
				GuiCard.BackgroundColor3 = new Color3(255, 0, 0);
			}
		});
	}
});
