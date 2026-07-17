import { _01104 } from "shared/objects/tangible_cards/01104";
import { start } from "./game_manager";
import "./route_actions";
import { IconToken } from "shared/objects/chaos_bag";
import { StartCampaign_Sub } from "shared/remotes/StartCampaign/Interface";
import { GetDecks_Bind } from "shared/remotes/GetDecks/Interface";
import { DataStoreService } from "@rbxts/services";
import { DeckData } from "shared/remotes/GetDecks/Interface";
import { HttpService } from "@rbxts/services";

StartCampaign_Sub((plr: Player, identifier: unknown, _chaos_bag: unknown) => {
	const chaos_bag = _chaos_bag as (number | IconToken)[];
	switch (identifier as string) {
		case "NOTZ":
			start(_01104, chaos_bag);
			break;
	}
});

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
