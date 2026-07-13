import { Players } from "@rbxts/services";
import { IconToken } from "shared/objects/chaos_bag";
import { StartCampaign_Pub } from "shared/remotes/StartCampaign/Interface";

const PLRGUI = Players.LocalPlayer.WaitForChild("PlayerGui");

interface Campaign {
	identifier: string;
	icon: string;
	difficulties: {
		easy: (number | IconToken)[];
		standard: (number | IconToken)[];
		hard: (number | IconToken)[];
		expert: (number | IconToken)[];
	};
}

const campaignList: Campaign[] = [
	{
		identifier: "NOTZ",
		icon: "blah",
		difficulties: {
			easy: [
				1,
				1,
				0,
				0,
				0,
				-1,
				-1,
				-1,
				-2,
				-2,
				IconToken.skull,
				IconToken.skull,
				IconToken.cultist,
				IconToken.tablet,
				IconToken.auto_fail,
				IconToken.elder_sign,
			],
			standard: [
				1,
				0,
				0,
				-1,
				-1,
				-1,
				-2,
				-2,
				-3,
				-4,
				IconToken.skull,
				IconToken.skull,
				IconToken.cultist,
				IconToken.tablet,
				IconToken.auto_fail,
				IconToken.elder_sign,
			],
			hard: [
				0,
				0,
				0,
				-1,
				-1,
				-2,
				-2,
				-3,
				-3,
				-4,
				-5,
				IconToken.skull,
				IconToken.skull,
				IconToken.cultist,
				IconToken.tablet,
				IconToken.auto_fail,
				IconToken.elder_sign,
			],
			expert: [
				0,
				-1,
				-1,
				-2,
				-2,
				-3,
				-3,
				-4,
				-4,
				-5,
				-6,
				-8,
				IconToken.skull,
				IconToken.skull,
				IconToken.cultist,
				IconToken.tablet,
				IconToken.auto_fail,
				IconToken.elder_sign,
			],
		},
	},
	{
		identifier: "TDL",
		icon: "blah",
		difficulties: {
			easy: [],
			standard: [],
			hard: [],
			expert: [],
		},
	},
];

const MainMenu = PLRGUI.WaitForChild("MainMenu") as ScreenGui;

const menu = MainMenu.WaitForChild("menu").WaitForChild("menu") as Frame;

const campaigns = MainMenu.WaitForChild("campaigns") as Frame;
const left = campaigns.WaitForChild("left") as TextButton;
const right = campaigns.WaitForChild("right") as TextButton;

const openCampaigns = menu.WaitForChild("Choose") as TextButton;

let currentIndex = 0;
let currentCampaignFrame: Frame = new Instance("Frame");

function buildCampaign(campaignObj: Campaign) {
	const PlayerHud = Players.LocalPlayer.WaitForChild("PlayerGui").WaitForChild("PlayerHud") as ScreenGui;
	currentCampaignFrame.Destroy();
	const template = PLRGUI.WaitForChild("GuiElements").WaitForChild("campaign").Clone() as Frame;

	const icon = template.WaitForChild("icon") as ImageLabel;
	const difficulties = template.WaitForChild("difficulties") as Frame;
	icon.Image = campaignObj.icon;

	const easy = difficulties.FindFirstChild("easy") as TextButton;
	const standard = difficulties.FindFirstChild("standard") as TextButton;
	const hard = difficulties.FindFirstChild("hard") as TextButton;
	const expert = difficulties.FindFirstChild("expert") as TextButton;

	// 1 easy 2 standard 3 hard 4 expert
	easy.MouseButton1Click.Connect(() => {
		StartCampaign_Pub(campaignObj.identifier, campaignObj.difficulties.easy);
		MainMenu.Enabled = false;
		PlayerHud.Enabled = true;
	});
	standard.MouseButton1Click.Connect(() => {
		StartCampaign_Pub(campaignObj.identifier, campaignObj.difficulties.standard);
		MainMenu.Enabled = false;
		PlayerHud.Enabled = true;
	});
	hard.MouseButton1Click.Connect(() => {
		StartCampaign_Pub(campaignObj.identifier, campaignObj.difficulties.hard);
		MainMenu.Enabled = false;
		PlayerHud.Enabled = true;
	});
	expert.MouseButton1Click.Connect(() => {
		StartCampaign_Pub(campaignObj.identifier, campaignObj.difficulties.expert);
		MainMenu.Enabled = false;
		PlayerHud.Enabled = true;
	});
	template.Parent = campaigns;
	currentCampaignFrame = template;
}

openCampaigns.MouseButton1Click.Connect(() => {
	menu.Visible = false;
	campaigns.Visible = true;
});

buildCampaign(campaignList[0]);

left.MouseButton1Click.Connect(() => {
	currentIndex = currentIndex === 0 ? campaignList.size() - 1 : currentIndex - 1;
	buildCampaign(campaignList[currentIndex]);
});

right.MouseButton1Click.Connect(() => {
	currentIndex = currentIndex === campaignList.size() - 1 ? 0 : currentIndex + 1;
	buildCampaign(campaignList[currentIndex]);
});
