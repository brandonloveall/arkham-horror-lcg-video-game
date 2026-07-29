import { Players, TweenService } from "@rbxts/services";

const plrgui = Players.LocalPlayer.WaitForChild("PlayerGui").WaitForChild("MainMenu");
const tentaclemenu = plrgui.WaitForChild("tentacleanim") as Frame;
const tentaclepng = tentaclemenu.WaitForChild("ImageLabel") as ImageLabel;
const mainmenu = plrgui.WaitForChild("menu") as Frame;

task.wait(1);

TweenService.Create(tentaclepng, new TweenInfo(0.7, Enum.EasingStyle.Exponential, Enum.EasingDirection.Out), {
	Position: new UDim2(0.5, 0, -0.4, 0),
}).Play();
task.wait(0.7);
TweenService.Create(tentaclemenu, new TweenInfo(1.7, Enum.EasingStyle.Exponential, Enum.EasingDirection.InOut), {
	Position: new UDim2(0, 0, 1, 0),
}).Play();
TweenService.Create(tentaclepng, new TweenInfo(1.7, Enum.EasingStyle.Exponential, Enum.EasingDirection.InOut), {
	Position: new UDim2(0.5, 0, 0, 0),
}).Play();
TweenService.Create(mainmenu, new TweenInfo(1.7, Enum.EasingStyle.Exponential, Enum.EasingDirection.InOut), {
	Position: new UDim2(0, 0, 0, 0),
}).Play();
