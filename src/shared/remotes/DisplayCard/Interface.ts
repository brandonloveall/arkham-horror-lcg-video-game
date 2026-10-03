import { ReplicatedStorage } from "@rbxts/services";
import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { TreacheryCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/treachery_card";
import { GamePlayer } from "shared/objects/player";

const DisplayCard = ReplicatedStorage.WaitForChild("TS")
	.WaitForChild("remotes")
	.WaitForChild("DisplayCard")
	.WaitForChild("DisplayCard") as RemoteEvent;

export function DisplayCard_Pub(plr: GamePlayer, card: TreacheryCard | EnemyCard, backingShown?: boolean) {
	DisplayCard.FireClient(plr.owner, card, backingShown);
	task.wait(4.625);
}

export function DisplayCard_Sub(callback: (card: TreacheryCard | EnemyCard, backingShown?: boolean) => void) {
	DisplayCard.OnClientEvent.Connect(callback);
}
