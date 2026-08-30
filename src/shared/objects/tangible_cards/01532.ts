import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { Card, reactions } from "../abstracts/card";
import { WhatHappened } from "shared/game_context";
import { GamePlayer } from "../player";
import { PlayerCard } from "../abstracts/card_inherits/player_card";
import { giveChoice } from "shared/giveChoice";
import { CardType, Faction } from "shared/card_database_types";

export class _01532 extends AssetCard {
	slot = "Ally";
	cost = 2;
	skill_agility = 1;
	skill_combat = 0;
	skill_intellect = 0;
	skill_willpower = 0;
	skill_wildcard = 0;
	xp = 0;
	deck_limit = 2;
	code = "01532";
	pack_name = "Revised Core Set";
	faction_name = Faction.Seeker;
	position = 32;
	exceptional = false;
	myriad = false;
	name = "Research Librarian";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `🔄 After Research Librarian enters play: Search your deck for a Tome asset and add it to your hand. Shuffle your deck.`;
	traits = "Ally. Miskatonic.";
	flavor = `"There have been problems at the Orne Library, as we both know, given poor Armitage's condition, and the other, unrelated... incident of a few years ago..."`;
	subname = "";

	reactions: reactions = {
		[WhatHappened.PLAYER_PLAYED_CARD]: {
			reaction: (_plr: unknown) => {
				const plr = _plr as GamePlayer;
				const tomes: Card[] = plr.deck.cards.filter((tome) => tome.traits.find("Tome")[0] !== undefined);
				giveChoice(
					plr,
					"Take a tome:",
					tomes.map((t) => {
						return {
							text: t.name,
							outcome: () => {
								plr.hand.push(plr.deck.pullSpecific(t) as PlayerCard);
							},
						};
					}),
				);
			},
			optional: true,
			canUseReaction: (_plr: unknown, _card: unknown) => {
				const card = _card as PlayerCard;
				return card === this;
			},
		},
	};
}

export default {
	code: "01532",
	faction_name: Faction.Seeker,
	type_name: CardType.Asset,
	constructor: _01532,
};
