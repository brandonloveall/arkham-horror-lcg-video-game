import { Players, TweenService } from "@rbxts/services";
import { CardType } from "shared/card_database_types";
import CardGuiMaker from "client/cardGuiMaker";
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

const Stats = InvestigatorMenu.WaitForChild("Frame").WaitForChild("Canvas").WaitForChild("miscAndStats") as Frame;

const Agility = Stats.WaitForChild("Agility").WaitForChild("Icon").WaitForChild("TextLabel") as TextLabel;
const Combat = Stats.WaitForChild("Combat").WaitForChild("Icon").WaitForChild("TextLabel") as TextLabel;
const Willpower = Stats.WaitForChild("Willpower").WaitForChild("Icon").WaitForChild("TextLabel") as TextLabel;
const Intellect = Stats.WaitForChild("Intellect").WaitForChild("Icon").WaitForChild("TextLabel") as TextLabel;

const Slots = InvestigatorMenu.WaitForChild("Frame").WaitForChild("Canvas").WaitForChild("slots");

const Hand1 = Slots.WaitForChild("Hand1").WaitForChild("Icon");
const Hand2 = Slots.WaitForChild("Hand2").WaitForChild("Icon");
const Arcane1 = Slots.WaitForChild("Arcane1").WaitForChild("Icon");
const Arcane2 = Slots.WaitForChild("Arcane2").WaitForChild("Icon");
const Body = Slots.WaitForChild("Body").WaitForChild("Icon");
const Ally = Slots.WaitForChild("Ally").WaitForChild("Icon");
const Accessory = Slots.WaitForChild("Accessory").WaitForChild("Icon");

const HealthHud = Stats.WaitForChild("Health").WaitForChild("Icon").WaitForChild("TextLabel") as TextLabel;
const SanityHud = Stats.WaitForChild("Sanity").WaitForChild("Icon").WaitForChild("TextLabel") as TextLabel;

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
	.WaitForChild("Canvas")
	.WaitForChild("CloseButton") as TextButton;

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
		const NewCard = CardGuiMaker.createCardGui(card);

		const CardButton = new Instance("TextButton");
		CardButton.Parent = NewCard;
		CardButton.Transparency = 1;
		CardButton.Size = new UDim2(1, 0, 1, 0);

		if ([CardType.Asset, CardType.Event].includes(card.type_name)) {
			CardButton.MouseButton1Click.Connect(() => PlayCard_Pub(card.id));
		}

		const holder = new Instance("Frame");
		holder.Size = new UDim2(0, 147, 0, 0);
		holder.Parent = Hand;
		holder.Name = card.id;

		NewCard.Position = new UDim2(0, 0, 0, 200);
		NewCard.Parent = holder;
		NewCard.Name = "card";

		TweenService.Create(NewCard, new TweenInfo(0.7, Enum.EasingStyle.Exponential, Enum.EasingDirection.Out), {
			Position: new UDim2(0, 0, 0, 0),
		}).Play();

		currentHandCards.push(holder);
	}

	for (const card of currentHandCards) {
		if (!payload.hand.find((e) => e.id === card.Name)) {
			task.spawn(() => {
				TweenService.Create(
					card.WaitForChild("card") as Frame,
					new TweenInfo(0.7, Enum.EasingStyle.Exponential, Enum.EasingDirection.Out),
					{
						Position: new UDim2(0, 0, 0, 232),
					},
				).Play();
				task.wait(0.7);
				card.Destroy();
			});
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
