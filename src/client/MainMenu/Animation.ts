import { Players, TweenService } from "@rbxts/services";

const plrgui = Players.LocalPlayer.WaitForChild("PlayerGui").WaitForChild("MainMenu");
const tentaclemenu = plrgui.WaitForChild("tentacleanim") as Frame;
const tentaclepng = tentaclemenu.WaitForChild("ImageLabel") as ImageLabel;
const mainmenu = plrgui.WaitForChild("menu") as Frame;

const text = tentaclemenu.WaitForChild("introtext") as TextLabel;
const img = tentaclemenu.WaitForChild("logoimg") as ImageLabel;

text.Text = "A game by<br/>DIM CARCOSA";
img.Image = "rbxassetid://94048577462057";

task.wait(1);

TweenService.Create(text, new TweenInfo(1.5, Enum.EasingStyle.Linear), {
	TextTransparency: 0,
}).Play();
TweenService.Create(img, new TweenInfo(2, Enum.EasingStyle.Linear), {
	ImageTransparency: 0,
}).Play();

task.wait(3);

TweenService.Create(text, new TweenInfo(1.5, Enum.EasingStyle.Linear), {
	TextTransparency: 1,
}).Play();
TweenService.Create(img, new TweenInfo(1.5, Enum.EasingStyle.Linear), {
	ImageTransparency: 1,
}).Play();

task.wait(1.5);
text.Text = "This is a noncommercial fan game.<br/>All property belongs to<br/>FANTASY FLIGHT GAMES";
img.Image = "rbxassetid://117562896448258";
task.wait(0.5);

TweenService.Create(text, new TweenInfo(1.5, Enum.EasingStyle.Linear), {
	TextTransparency: 0,
}).Play();
TweenService.Create(img, new TweenInfo(2, Enum.EasingStyle.Linear), {
	ImageTransparency: 0,
}).Play();

task.wait(5);

TweenService.Create(text, new TweenInfo(1.5, Enum.EasingStyle.Linear), {
	TextTransparency: 1,
}).Play();
TweenService.Create(img, new TweenInfo(1.5, Enum.EasingStyle.Linear), {
	ImageTransparency: 1,
}).Play();

task.wait(2);

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
