import { DeckData } from "../GetDecks/Interface";

const SetDecks = script.Parent!.WaitForChild("SetDecks") as RemoteEvent;

export function SetDecks_Pub(decks: DeckData[]) {
	SetDecks.FireServer(decks);
}

export function SetDecks_Sub(callback: (plr: Player, decks: DeckData[]) => void) {
	SetDecks.OnServerEvent.Connect((plr, decks) => callback(plr, decks as DeckData[]));
}
