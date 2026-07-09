import { Players } from "@rbxts/services";
import { Client_GiveChoice_Pub, Client_GiveChoice_Sub } from "shared/remotes/GiveChoice/Interface";

const PlayerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

const GiveChoice = PlayerGui.WaitForChild("GiveChoice") as ScreenGui;
const frame = GiveChoice.WaitForChild("Frame") as Frame;

const template = PlayerGui.WaitForChild("GuiElements").WaitForChild("ChoiceButton") as TextButton;

Client_GiveChoice_Sub((choices) => {
	GiveChoice.Enabled = true;
	for (const oldChoice of frame.GetChildren()) {
		if (oldChoice.IsA("TextButton")) {
			oldChoice.Destroy();
		}
	}

	for (let i = 0; i < choices.size(); i++) {
		const newChoice = template.Clone();
		newChoice.Parent = frame;
		newChoice.MouseButton1Click.Connect(() => {
			Client_GiveChoice_Pub(i);
			GiveChoice.Enabled = false;
		});
		newChoice.Text = choices[i].text;
	}
});
