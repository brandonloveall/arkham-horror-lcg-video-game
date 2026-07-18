import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { reactions } from "../abstracts/card";
import { WhatHappened } from "shared/game_context";
import { CardType, Faction } from "shared/card_database_types";

export class _01521 extends AssetCard {
	slot = "Ally";
	cost = 3;
	skill_agility = 0;
	skill_combat = 1;
	skill_intellect = 0;
	skill_willpower = 0;
	skill_wildcard = 0;
	xp = 0;
	deck_limit = 2;
	code = "01521";
	pack_name = "Revised Core Set";
	faction_name = Faction.Guardian;
	position = 21;
	exceptional = false;
	myriad = false;
	name = "Guard Dog";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `[reaction] When an enemy attack deals damage to Guard Dog: Deal 1 damage to the attacking enemy.`;
	traits = "Ally. Creature.";
	flavor = `Fiercely loyal, these trained canines make for perfect companions.`;
	subname = "";

	reactions: reactions = {
		[WhatHappened.ASSET_DAMAGED]: {
			reaction: (_asset: unknown) => {
				print("ldfgsk");
			},
			optional: true,
		},
	};
}

export default {
	code: "01521",
	faction_name: Faction.Guardian,
	type_name: CardType.Asset,
	constructor: _01521,
};
