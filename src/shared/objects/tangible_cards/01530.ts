import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { GamePlayer } from "../player";
import { CardType, Faction, Skill } from "shared/card_database_types";

export class _01530 extends AssetCard {
	slot = "Hand";
	cost = 1;
	skills = {
		[Skill.Agility]: 0,
		[Skill.Combat]: 0,
		[Skill.Intellect]: 1,
		[Skill.Willpower]: 0,
		[Skill.Wildcard]: 0,
	};
	xp = 0;
	deck_limit = 2;
	code = "01530";
	pack_name = "Revised Core Set";
	faction_name = Faction.Seeker;
	position = 30;
	exceptional = false;
	myriad = false;
	name = "Magnifying Glass";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `Fast.
You get +1 📖 while investigating.`;
	traits = "Item. Tool.";
	flavor = `A lens into a world unseen can reveal things you wish it hadn't.`;
	subname = "";

	fast = true;
	canPlayFast(plr: GamePlayer) {
		return true;
	}
}

export default {
	code: "01530",
	faction_name: Faction.Seeker,
	type_name: CardType.Asset,
	constructor: _01530,
};
