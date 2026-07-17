import { Players } from "@rbxts/services";
import { DeckData, GetDecks_Invoke } from "shared/remotes/GetDecks/Interface";

const MainMenu = Players.LocalPlayer.WaitForChild("PlayerGui").WaitForChild("MainMenu") as ScreenGui;
const decksFrame = MainMenu.WaitForChild("decks") as Frame;
const menu = MainMenu.WaitForChild("menu") as Frame;

const gotoDecks = menu.WaitForChild("menu").WaitForChild("Decks") as TextButton;
const template = MainMenu.Parent!.WaitForChild("GuiElements").WaitForChild("DeckTemplate") as Frame;

const decks: Map<string, DeckData> = new Map();

GetDecks_Invoke((_decks) => {
	decks.clear();
	for (const deck of _decks) {
		const deckTemplate = template.Clone();

		const deckTitle = deckTemplate.WaitForChild("title") as TextLabel;
		const selected = deckTitle.WaitForChild("selected") as TextLabel;
		deckTitle.Text = deck.name;
		selected.Visible = deck.isSelected;
		deckTemplate.Parent = decksFrame;

		decks.set(deck.guid, deck);
	}
});

gotoDecks.MouseButton1Click.Connect(() => {
	menu.Visible = false;
	decksFrame.Visible = true;
});
