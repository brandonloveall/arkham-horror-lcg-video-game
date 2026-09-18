// circular dependencies cannot be sent across client/server boundary. to remedy this, a helper function to find a cards owner is needed

import { GameContext } from "./game_context";

export function getOwner(username: string) {
	for (const plr of GameContext.players) {
		if (plr.owner.Name === username) {
			return plr;
		}
	}
}
