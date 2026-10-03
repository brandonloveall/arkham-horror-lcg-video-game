import { Players, TweenService } from "@rbxts/services";
import CardGuiMaker from "client/cardGuiMaker";
import { DisplayCard_Sub } from "shared/remotes/DisplayCard/Interface";

const DCUI = Players.LocalPlayer.WaitForChild("PlayerGui").WaitForChild("CardReveal") as ScreenGui;

DisplayCard_Sub((card, backingShown) => {
	const guiCard = CardGuiMaker.createCardGui(card, backingShown);
	guiCard.Position = new UDim2(0.5, 0, 0, 0);
	guiCard.AnchorPoint = new Vector2(0.5, 1);
	guiCard.Size = new UDim2(0, 210, 0, 300);
	guiCard.WaitForChild("UIAspectRatioConstraint").Destroy();
	guiCard.Parent = DCUI;

	TweenService.Create(guiCard, new TweenInfo(1, Enum.EasingStyle.Exponential, Enum.EasingDirection.Out), {
		Position: new UDim2(0.5, 0, 0.5, 100),
	}).Play();
	task.wait(2);

	if (backingShown) {
		TweenService.Create(guiCard, new TweenInfo(0.75 / 2, Enum.EasingStyle.Sine), {
			Size: new UDim2(0, 0, 0, 300),
		}).Play();
		task.wait(0.75 / 2);
		(guiCard.WaitForChild("backing") as ImageLabel).Visible = false;
		TweenService.Create(guiCard, new TweenInfo(0.75 / 2, Enum.EasingStyle.Sine), {
			Size: new UDim2(0, -210, 0, 300),
		}).Play();
		task.wait(2.25);
	}

	guiCard.Destroy();
});
