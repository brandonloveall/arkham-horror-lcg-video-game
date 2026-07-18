import { ReplicatedStorage } from "@rbxts/services";
import { CardData } from "./card_database_types";

const rootdir = ReplicatedStorage.WaitForChild("TS")
	.WaitForChild("objects")
	.WaitForChild("tangible_cards")
	.GetChildren() as ModuleScript[];

const database: CardData[] = [];

for (const mod of rootdir) {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	database.push((require(mod) as { default: CardData }).default);
}

export function getConstructorFromId(id: string) {
	for (const card of database) {
		if (card.code === id) {
			return card.constructor;
		}
	}
}
