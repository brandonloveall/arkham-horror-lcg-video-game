import { Players, TweenService } from "@rbxts/services";
import { ShowPhaseTransition_Sub } from "shared/remotes/ShowPhaseTransition/Interface";

const phases = [
	"rbxassetid://95333480182794", // mythos
	"rbxassetid://111070317904756", // investigator
	"rbxassetid://103070132909689", // enemy
	"rbxassetid://82622523928085", // upkeep
];

const UI = Players.LocalPlayer.WaitForChild("PlayerGui").WaitForChild("PhaseDial") as ScreenGui;
const hold = UI.WaitForChild("Frame").WaitForChild("Frame") as Frame;
const innerNew = hold.WaitForChild("InnerNew") as ImageLabel;
const innerOld = hold.WaitForChild("InnerOld") as ImageLabel;

ShowPhaseTransition_Sub((oldIndex, newIndex) => {
	do {
		task.wait();
	} while (UI.Enabled && hold.Rotation !== 0);

	UI.Enabled = true;

	innerNew.Image = phases[newIndex];
	innerOld.Image = phases[oldIndex];

	task.wait(1);

	TweenService.Create(hold, new TweenInfo(2.5, Enum.EasingStyle.Exponential, Enum.EasingDirection.InOut), {
		Rotation: 180,
	}).Play();

	task.wait(3);
	UI.Enabled = false;
	hold.Rotation = 0;
});
