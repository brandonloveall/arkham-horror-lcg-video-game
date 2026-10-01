import { Players, TweenService } from "@rbxts/services";
import { RevealToken_Sub } from "shared/remotes/SkillCheckAnimation/Interface";
const STAGUI = Players.LocalPlayer.WaitForChild("PlayerGui").WaitForChild("SkillCheckAnimation");

const portalhold = STAGUI.WaitForChild("chaosicon") as Frame;
const portal = portalhold.WaitForChild("chaosicon") as ImageLabel;

const tokenImg = STAGUI.WaitForChild("tokenImg") as ImageLabel;

const flash = STAGUI.WaitForChild("flash") as Frame;

const tokenToImg = [
	"122884282617898", // -8
	"109151873034600", // -7
	"129476727671527", // -6
	"92775126671848", // -5
	"80291389995475", // -4
	"94175732506380", // -3
	"117033223661048", // -2
	"118998366488305", // -1
	"101233121653245", // 0
	"73399354650279", // +1
	"128025021789515", // skull
	"78281416655593", // cultist
	"109866891654576", // tablet
	"101400445194924", // elder_thing
	"126057877924224", // auto_fail
	"114518136454613", // elder_sign
];

RevealToken_Sub((allTokens, token) => {
	(STAGUI.Parent!.WaitForChild("PlayerHud") as ScreenGui).Enabled = false;
	tokenImg.Image = "rbxassetid://" + tokenToImg[allTokens[math.random(0, allTokens.size() - 1)] + 8];
	const counter = new Instance("NumberValue");

	const rotation = TweenService.Create(
		portalhold,
		new TweenInfo(6, Enum.EasingStyle.Exponential, Enum.EasingDirection.InOut),
		{
			Rotation: 1080,
		},
	);
	rotation.Play();
	rotation.Completed.Connect(() => {
		portalhold.Rotation = 0;
	});
	TweenService.Create(portal, new TweenInfo(3, Enum.EasingStyle.Linear), {
		ImageTransparency: 0,
	}).Play();
	TweenService.Create(counter, new TweenInfo(3, Enum.EasingStyle.Exponential, Enum.EasingDirection.In), {
		Value: 15,
	}).Play();

	TweenService.Create(tokenImg, new TweenInfo(3, Enum.EasingStyle.Linear), {
		ImageTransparency: 0,
	}).Play();

	const flashanim = TweenService.Create(
		flash,
		new TweenInfo(3, Enum.EasingStyle.Exponential, Enum.EasingDirection.In),
		{
			Transparency: 0,
		},
	);
	flashanim.Play();
	flashanim.Completed.Connect(() => (flash.Transparency = 1));

	let closestVal = 0;
	counter.GetPropertyChangedSignal("Value").Connect(() => {
		const rounded = math.round(counter.Value);
		if (rounded !== closestVal) {
			closestVal = rounded;
			tokenImg.Image = "rbxassetid://" + tokenToImg[allTokens[math.random(0, allTokens.size() - 1)] + 8];
		}
	});

	task.wait(3);

	/// FLASH THE TOKEN HERE
	tokenImg.Image = "rbxassetid://" + tokenToImg[token + 8]; // shift by 8 cause its either exact number val or icontoken
	///

	TweenService.Create(portal, new TweenInfo(1.5, Enum.EasingStyle.Linear), {
		ImageTransparency: 1,
	}).Play();

	task.wait(2);
	tokenImg.ImageTransparency = 1;
	(STAGUI.Parent!.WaitForChild("PlayerHud") as ScreenGui).Enabled = true;
});
