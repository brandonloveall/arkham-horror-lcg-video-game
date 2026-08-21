import { GetDecks_Bind } from "shared/remotes/GetDecks/Interface";
import { DataStoreService } from "@rbxts/services";
import { DeckData } from "shared/remotes/GetDecks/Interface";
import { HttpService } from "@rbxts/services";
import { getConstructorFromId } from "shared/card_database";
import { Card } from "shared/objects/abstracts/card";
import { Investigator } from "shared/objects/abstracts/card_inherits/player_card_inherits/investigator";
import { _01501 } from "shared/objects/tangible_cards/01501";
import { _01506 } from "shared/objects/tangible_cards/01506";
import { SetDecks_Sub } from "shared/remotes/SetDecks/Interface";

GetDecks_Bind((plr: Player) => {
	const data = DataStoreService.GetDataStore(tostring(plr.UserId), "player_data");
	if (data.GetAsync("decks")[0] === undefined) {
		data.SetAsync("decks", [
			{
				guid: HttpService.GenerateGUID(false),
				isSelected: true,
				cards: [
					"01506",
					"01516",
					"01517",
					"01518",
					"01519",
					"01520",
					"01521",
					"01530",
					"01531",
					"01532",
					"01533",
					"01534",
					"01535",
					"01586",
					"01586",
					"01587",
					"01587",
					"01522",
					"01523",
					"01524",
					"01536",
					"01537",
					"01538",
					"01588",
					"01588",
					"01525",
					"01539",
					"01589",
					"01589",
					"01592",
					"01592",
					"01507",
					"01602",
				],
				name: "Starter Deck",
				investigator: "01501",
			},
		] satisfies DeckData[]);
	}
	return data.GetAsync("decks") as DeckData[];
});

export function getPlrsSelectedDeck(plr: Player): [(new () => Card)[], new () => Investigator] {
	const decks = DataStoreService.GetDataStore(tostring(plr.UserId), "player_data").GetAsync("decks")[0] as DeckData[];
	for (const deck of decks) {
		if (deck.isSelected) {
			return [
				deck.cards.map((card) => {
					return getConstructorFromId(card)!;
				}),
				getConstructorFromId(deck.investigator) as new () => Investigator,
			];
		}
	}
	return [[_01506], _01501]; // only exists to guarantee to the compiler something will be returned. one deck will always have the isSelected() attribute
}

SetDecks_Sub((plr, decks) => {
	const data = DataStoreService.GetDataStore(tostring(plr.UserId), "player_data");

	data.SetAsync("decks", decks);
});
