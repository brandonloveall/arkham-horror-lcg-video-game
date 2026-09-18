import { GameContext } from "./game_context";
import { PlayerCard } from "./objects/abstracts/card_inherits/player_card";
import { GamePlayer } from "./objects/player";
import { Server_ChooseCards_Sub, Server_ChooseCards_Pub } from "./remotes/ChooseCards/Interface";

let cards: Record<string, PlayerCard[]>;
let submittedCount = 0;

Server_ChooseCards_Sub((plr, selectedCards) => {
	cards[plr.Name] = selectedCards as PlayerCard[];
	submittedCount++;
});

interface AllowedPlayerCards {
	player: GamePlayer;
	allowedCards: PlayerCard[];
	chooseCap: number;
}

export function chooseCards(params: AllowedPlayerCards[], message: string): Record<string, PlayerCard[]> {
	cards = {};
	submittedCount = 0;

	for (const { player, allowedCards, chooseCap } of params) {
		Server_ChooseCards_Pub(player, allowedCards, message, { amount: chooseCap, maximum: true });
	}

	do {
		task.wait();
	} while (submittedCount !== GameContext.players.size());

	return cards;
}
