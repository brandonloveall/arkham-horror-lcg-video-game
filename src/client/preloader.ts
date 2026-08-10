import { ContentProvider, Players } from "@rbxts/services";

const ui = Players.LocalPlayer.WaitForChild("PlayerGui");

const allUi = ui.GetDescendants();

let counter = 0;

for (const item of allUi) {
	ContentProvider.PreloadAsync([item]);
	counter++;
	print(counter);
}
