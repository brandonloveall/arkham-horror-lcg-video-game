import { Players } from "@rbxts/services";
import { Client_PayClues_Pub, Client_PayClues_Sub } from "shared/remotes/PayClues/Interface";

const GUI = Players.LocalPlayer.WaitForChild("PlayerGui").WaitForChild("PayClues") as ScreenGui;

const PayCluesFrame = GUI.WaitForChild("Frame") as Frame;

const Amount = PayCluesFrame.WaitForChild("Amount") as TextLabel;
const Subtract = PayCluesFrame.WaitForChild("Subtract") as TextButton;
const Add = PayCluesFrame.WaitForChild("Add") as TextButton;
const Confirm = PayCluesFrame.WaitForChild("Confirm") as TextButton;

let paid = 0;
let clueLimit = 0;

Client_PayClues_Sub((limit) => {
	paid = 0;
	clueLimit = limit;
	GUI.Enabled = true;
	Amount.Text = `0/${clueLimit}`;
});

Add.MouseButton1Click.Connect(() => {
	if (paid + 1 > clueLimit) {
		return;
	}
	paid++;
	Amount.Text = `${paid}/${clueLimit}`;
});

Subtract.MouseButton1Click.Connect(() => {
	if (paid - 1 < 0) {
		return;
	}
	paid--;
	Amount.Text = `${paid}/${clueLimit}`;
});

Confirm.MouseButton1Click.Connect(() => {
	Client_PayClues_Pub(paid);
	GUI.Enabled = false;
});
