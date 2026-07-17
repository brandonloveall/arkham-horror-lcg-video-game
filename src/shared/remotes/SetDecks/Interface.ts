const SetDecks = script.Parent!.WaitForChild("SetDecks") as RemoteEvent;

export function SetDecks_Pub(decks: string[][]) {
	SetDecks.FireServer(decks);
}

export function SetDecks_Sub(callback: (plr: Player, decks: string[][]) => void) {
	SetDecks.OnServerEvent.Connect((plr, decks) => callback(plr, decks as string[][]));
}
