import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { GamePlayer } from "../player";
import { giveChoice } from "shared/giveChoice";
import { CardType, Faction, Skill } from "shared/card_database_types";

export class _01517 extends AssetCard {
	slot = "";
	cost = 2;
	skills = {
		[Skill.Agility]: 0,
		[Skill.Combat]: 1,
		[Skill.Intellect]: 0,
		[Skill.Willpower]: 1,
		[Skill.Wildcard]: 0,
	};
	xp = 0;
	deck_limit = 2;
	code = "01517";
	pack_name = "Revised Core Set";
	faction_name = Faction.Guardian;
	position = 17;
	exceptional = false;
	myriad = false;
	name = "Physical Training";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `🗲 Spend 1 resource: You get +1 🗣️ for this skill test.
🗲 Spend 1 resource: You get +1 👊 for this skill test.`;
	traits = "Talent.";
	flavor = ``;
	subname = "";

	added_willpower = 0;
	added_combat = 0;

	ability(plr: GamePlayer) {
		if (plr.resources < 1) {
			return;
		}
		giveChoice(plr, "-1 resource for:", [
			{
				text: "+1 willpower",
				outcome: () => {
					plr.resources--;
					plr.investigator.skills[Skill.Willpower]++;
					this.added_willpower++;
				},
			},
			{
				text: "+1 combat",
				outcome: () => {
					plr.resources--;
					plr.investigator.skills[Skill.Combat]++;
				},
			},
		]);
	}
}

export default {
	code: "01517",
	faction_name: Faction.Guardian,
	type_name: CardType.Asset,
	constructor: _01517,
};
