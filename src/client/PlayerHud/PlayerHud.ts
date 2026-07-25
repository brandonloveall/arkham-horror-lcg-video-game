import { Players } from "@rbxts/services";
import { CardType, Faction } from "shared/card_database_types";
import { CostingCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card";
import {
	ActivateAbility_Pub,
	AdvanceAct_Pub,
	Draw_Pub,
	EndTurn_Pub,
	Engage_Pub,
	Evade_Pub,
	Fight_Pub,
	GainResource_Pub,
	Investigate_Pub,
	Move_Pub,
} from "shared/remotes/Actions/Interface";
import { PlayCard_Pub } from "shared/remotes/Actions/Interface";
import { UpdatePlayerUI_Sub } from "shared/remotes/UpdatePlayerUI/Interface";

const PlayerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

const PlayerHud = PlayerGui.WaitForChild("PlayerHud") as ScreenGui;
const InvestigatorMenu = PlayerGui.WaitForChild("InvestigatorMenu") as ScreenGui;

const ActionsHud = PlayerHud.WaitForChild("ActionDiamonds") as Frame;
const ResourcesHud = PlayerHud.WaitForChild("Resources").WaitForChild("TextLabel") as TextLabel;
const CluesHud = PlayerHud.WaitForChild("Clues").WaitForChild("Clues") as TextLabel;
const Hand = PlayerHud.WaitForChild("Hand") as Frame;
const DeckSize = PlayerHud.WaitForChild("Deck").WaitForChild("amount") as TextLabel;

const Stats = InvestigatorMenu.WaitForChild("Frame").WaitForChild("miscAndStats").WaitForChild("stats") as TextLabel;
const Agility = Stats.WaitForChild("Agility").WaitForChild("TextLabel") as TextLabel;
const Combat = Stats.WaitForChild("Combat").WaitForChild("TextLabel") as TextLabel;
const Willpower = Stats.WaitForChild("Willpower").WaitForChild("TextLabel") as TextLabel;
const Intellect = Stats.WaitForChild("Intellect").WaitForChild("TextLabel") as TextLabel;

const Slots = InvestigatorMenu.WaitForChild("Frame").WaitForChild("slots");
const Hand1 = Slots.WaitForChild("Hand1");
const Hand2 = Slots.WaitForChild("Hand2");
const Arcane1 = Slots.WaitForChild("Arcane1");
const Arcane2 = Slots.WaitForChild("Arcane2");
const Body = Slots.WaitForChild("Body");
const Ally = Slots.WaitForChild("Ally");
const Accessory = Slots.WaitForChild("Accessory");

const HealthHud = Stats.Parent!.WaitForChild("healthAndSanity")
	.WaitForChild("Health")
	.WaitForChild("TextLabel") as TextLabel;
const SanityHud = Stats.Parent!.WaitForChild("healthAndSanity")
	.WaitForChild("Sanity")
	.WaitForChild("TextLabel") as TextLabel;

const ActionList = PlayerHud.WaitForChild("ActionButtons");

const Fight = ActionList.WaitForChild("Fight") as TextButton;
const GainResource = ActionList.WaitForChild("GainResource") as TextButton;
const Evade = ActionList.WaitForChild("Evade") as TextButton;
const Engage = ActionList.WaitForChild("Engage") as TextButton;
const Investigate = ActionList.WaitForChild("Investigate") as TextButton;
const Move = ActionList.WaitForChild("Move") as TextButton;
const EndTurn = ActionList.WaitForChild("EndTurn") as TextButton;
const AdvanceAct = ActionList.WaitForChild("AdvanceAct") as TextButton;

const MenuOpenButton = PlayerHud.WaitForChild("Assets").WaitForChild("Folder").WaitForChild("Dropdown") as TextButton;
const MenuCloseButton = InvestigatorMenu.WaitForChild("Frame")
	.WaitForChild("Folder")
	.WaitForChild("TextButton") as TextButton;

const CardTemplate = PlayerGui.WaitForChild("GuiElements").WaitForChild("CardTemplate") as Frame;
const AssetTemplate = PlayerGui.WaitForChild("GuiElements").WaitForChild("AssetTemplate") as TextButton;

let currentHandCards: Frame[] = [];
let currentAssets: TextButton[] = [];

UpdatePlayerUI_Sub((payload) => {
	HealthHud.Text = `${payload.health - payload.damage}`;
	SanityHud.Text = `${payload.sanity - payload.horror}`;
	ResourcesHud.Text = `${payload.resources}`;
	CluesHud.Text = `${payload.clues}`;
	DeckSize.Text = `${payload.deckSize}`;

	Agility.Text = `${payload.agility}`;
	Combat.Text = `${payload.combat}`;
	Intellect.Text = `${payload.intellect}`;
	Willpower.Text = `${payload.willpower}`;

	for (let i = 1; i <= payload.actions; i++) {
		(ActionsHud.WaitForChild(i) as ImageLabel).ImageTransparency = 0;
	}
	for (let i = payload.actions + 1; i <= ActionsHud.GetChildren().size() - 1; i++) {
		(ActionsHud.WaitForChild(i) as ImageLabel).ImageTransparency = 0.7;
	}
	for (const card of payload.hand) {
		if (currentHandCards.find((e) => e.Name === card.id)) {
			continue;
		}
		const NewCard = CardTemplate.Clone();

		const CardButton = NewCard.WaitForChild("TextButton") as TextButton;
		const Name = NewCard.WaitForChild("title") as TextLabel;
		const Cost = NewCard.WaitForChild("cost") as TextLabel;
		const Description = NewCard.WaitForChild("description") as TextLabel;
		const Skills = NewCard.WaitForChild("SkillIcons") as Frame;

		Name.Text = card.name;
		Description.Text = card.text;
		if ([CardType.Asset, CardType.Event, CardType.Skill].includes(card.type_name)) {
			const costingCard = card as CostingCard;
			if (card.type_name === CardType.Skill) {
				Cost.Destroy();
				Name.Size = new UDim2(1, 0, 0.1, 0);
				Name.Position = new UDim2(0, 0, 0, 0);
			} else {
				Cost.Text = tostring(costingCard.cost);
			}
			const skills = ["skill_agility", "skill_willpower", "skill_intellect", "skill_combat", "skill_wildcard"];
			const icons = [
				"rbxassetid://18623015454",
				"rbxassetid://18615903524",
				"rbxassetid://18615764098",
				"rbxassetid://18622919447",
				"rbxassetid://18623020407",
			];
			for (let i = 0; i < skills.size(); i++) {
				for (let _ = 0; _ < (costingCard[skills[i] as keyof CostingCard] as number); _++) {
					const Icon = PlayerGui.WaitForChild("GuiElements").WaitForChild("skill").Clone() as ImageLabel;
					Icon.Parent = Skills;
					Icon.Image = icons[i];
				}
			}
			if ([CardType.Asset, CardType.Event].includes(card.type_name)) {
				CardButton.MouseButton1Click.Connect(() => PlayCard_Pub(card.id));
			}
		}

		const colors = {
			[Faction.Neutral]: new Color3(0.83, 0.79, 0.71),
			[Faction.Seeker]: new Color3(0.69, 0.52, 0.15),
			[Faction.Survivor]: new Color3(0.61, 0.05, 0.05),
			[Faction.Mystic]: new Color3(0.38, 0.22, 0.53),
			[Faction.Guardian]: new Color3(0.09, 0.15, 0.46),
			[Faction.Rogue]: new Color3(0.05, 0.35, 0.06),
		};

		Name.BackgroundColor3 = colors[card.faction_name as keyof typeof colors];

		NewCard.Parent = Hand;
		NewCard.Name = card.id;
		currentHandCards.push(NewCard);
	}

	for (const card of currentHandCards) {
		if (!payload.hand.find((e) => e.id === card.Name)) {
			card.Destroy();
		}
	}
	currentHandCards = currentHandCards.filter((e) => e.Parent !== undefined);

	for (const asset of payload.assets) {
		if (currentAssets.find((e) => e.Name === asset.id)) {
			continue;
		}

		const NewAsset = AssetTemplate.Clone();
		NewAsset.Text = asset.name;
		NewAsset.Parent = (() => {
			switch (asset.slot) {
				case "Hand":
					return Hand1.GetChildren().size() > 0 ? Hand2 : Hand1;
				case "Arcane":
					return Arcane1.GetChildren().size() > 0 ? Arcane2 : Arcane1;
				case "Ally":
					return Ally;
				case "Body":
					return Body;
				case "Accessory":
					return Accessory;
			}
		})();
		NewAsset.MouseButton1Click.Connect(() => ActivateAbility_Pub(asset.id));
		NewAsset.Name = asset.id;
		currentAssets.push(NewAsset);
	}

	for (const asset of currentAssets) {
		if (!payload.assets.find((e) => e.id === asset.Name)) {
			asset.Destroy();
		}
	}
	currentAssets = currentAssets.filter((e) => e.Parent !== undefined);
});

(DeckSize.Parent!.WaitForChild("ImageButton") as ImageButton).MouseButton1Click.Connect(Draw_Pub);

Fight.MouseButton1Click.Connect(() => {
	Fight_Pub();
});

GainResource.MouseButton1Click.Connect(GainResource_Pub);

Evade.MouseButton1Click.Connect(() => {
	Evade_Pub();
});

Engage.MouseButton1Click.Connect(() => {
	Engage_Pub();
});

Investigate.MouseButton1Click.Connect(Investigate_Pub);

Move.MouseButton1Click.Connect(() => {
	Move_Pub();
});

AdvanceAct.MouseButton1Click.Connect(AdvanceAct_Pub);

EndTurn.MouseButton1Click.Connect(EndTurn_Pub);

MenuOpenButton.MouseButton1Click.Connect(() => {
	PlayerHud.Enabled = false;
	InvestigatorMenu.Enabled = true;
});
MenuCloseButton.MouseButton1Click.Connect(() => {
	PlayerHud.Enabled = true;
	InvestigatorMenu.Enabled = false;
});
