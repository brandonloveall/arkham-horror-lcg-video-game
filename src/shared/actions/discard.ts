import { getOwner } from "shared/findOwner";
import { Card } from "shared/objects/abstracts/card";

export function discard(card: Card) {
	if (card.owner_username !== undefined) {
		getOwner(card.owner_username)!.discard(card.id);
	}
}
