import { ReplicatedStorage } from "@rbxts/services";
import { Skill } from "shared/card_database_types";
import { PlayerCard } from "shared/objects/abstracts/card_inherits/player_card";
import { IconToken } from "shared/objects/chaos_bag";

const ShowCommittedCards = ReplicatedStorage.WaitForChild("TS")
	.WaitForChild("remotes")
	.WaitForChild("SkillCheckAnimation")
	.WaitForChild("ShowCommittedCards") as RemoteEvent;

const RevealToken = ReplicatedStorage.WaitForChild("TS")
	.WaitForChild("remotes")
	.WaitForChild("SkillCheckAnimation")
	.WaitForChild("RevealToken") as RemoteEvent;

const DisplaySkillTestResult = ReplicatedStorage.WaitForChild("TS")
	.WaitForChild("remotes")
	.WaitForChild("SkillCheckAnimation")
	.WaitForChild("DisplaySkillTestResult") as RemoteEvent;

/////////////////////////////////////////////////////////////////////////////////

export function ShowCommittedCards_Pub(cards: PlayerCard[]) {
	ShowCommittedCards.FireAllClients(cards);
}

export function ShowCommittedCards_Sub(callback: (cards: PlayerCard[]) => void) {
	ShowCommittedCards.OnClientEvent.Connect(callback);
}

/////////////////////////////////////////////////////////////////////////////////

export function RevealToken_Pub(allTokens: (IconToken | number)[], chosenToken: IconToken | number) {
	RevealToken.FireAllClients(allTokens, chosenToken);
}

export function RevealToken_Sub(
	callback: (allTokens: (IconToken | number)[], chosenToken: IconToken | number) => void,
) {
	RevealToken.OnClientEvent.Connect(callback);
}

/////////////////////////////////////////////////////////////////////////////////

export function DisplaySkillTestResult_Pub(
	skill: Skill,
	base: number,
	bonus: number,
	token: IconToken | number,
	isSuccessful: boolean,
) {
	DisplaySkillTestResult.FireAllClients(skill, base, bonus, token, isSuccessful);
}

export function DisplaySkillTestResult_Sub(
	callback: (skill: Skill, base: number, bonus: number, token: IconToken | number, isSuccessful: boolean) => void,
) {
	DisplaySkillTestResult.OnClientEvent.Connect(callback);
}
