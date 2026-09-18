import { Skill } from "shared/card_database_types";
import { ReplicatedStorage } from "@rbxts/services";
import { GameContext } from "shared/game_context";
import { ActCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/act_card";
import { AgendaCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/agenda_card";
import { PlayerCard } from "shared/objects/abstracts/card_inherits/player_card";
import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { GamePlayer } from "shared/objects/player";

const UpdatePlayerUI = ReplicatedStorage.WaitForChild("TS")
	.WaitForChild("remotes")
	.WaitForChild("UpdatePlayerUI")
	.WaitForChild("UpdatePlayerUI") as RemoteEvent;

interface UpdatePlayerUIPayload {
	hand: PlayerCard[];
	damage: number;
	horror: number;
	health: number;
	sanity: number;
	resources: number;
	actions: number;
	clues: number;
	assets: AssetCard[];
	deckSize: number;
	skills: Record<Skill, number>;
	act: ActCard | undefined;
	agenda: AgendaCard | undefined;
	actAdvanceable: boolean;
}

export function UpdatePlayerUI_Pub(player: GamePlayer) {
	UpdatePlayerUI.FireClient(player.owner, {
		hand: player.hand,
		damage: player.damage,
		horror: player.horror,
		health: player.investigator.health,
		sanity: player.investigator.sanity,
		resources: player.resources,
		actions: player.actions,
		clues: player.clues,
		assets: player.getAllEquipment(),
		deckSize: player.deck.size(),

		skills: player.investigator.skills,

		act: GameContext.act,
		agenda: GameContext.agenda,
		actAdvanceable: false,
	} satisfies UpdatePlayerUIPayload);
}

export function UpdatePlayerUI_Sub(callback: (payload: UpdatePlayerUIPayload) => unknown) {
	UpdatePlayerUI.OnClientEvent.Connect(callback);
}
