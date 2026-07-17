export interface DeckData {
	guid: string;
	cards: string[];
	isSelected: boolean;
	name: string;
	investigator: string;
}

const GetDecks = script.Parent!.WaitForChild("GetDecks") as RemoteFunction;

export function GetDecks_Bind(callback: (plr: Player) => DeckData[]) {
	GetDecks.OnServerInvoke = callback;
}

export function GetDecks_Invoke(callback: (decks: DeckData[]) => void) {
	callback(GetDecks.InvokeServer());
}
