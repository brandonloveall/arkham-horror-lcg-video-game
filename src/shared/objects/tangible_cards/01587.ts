import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { GamePlayer } from "../player";
import { CardType, Faction, Skill } from "shared/card_database_types";

export class _01587 extends AssetCard {
	slot = "Hand";
	cost = 2;
	skills = {
		[Skill.Agility]: 0,
		[Skill.Combat]: 0,
		[Skill.Intellect]: 1,
		[Skill.Willpower]: 0,
		[Skill.Wildcard]: 0,
	};
	xp = 0;
	deck_limit = 2;
	code = "01587";
	pack_name = "Revised Core Set";
	faction_name = Faction.Neutral;
	position = 87;
	exceptional = false;
	myriad = false;
	name = "Flashlight";
	quantity = 10;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `Uses (3 supplies).
➡️ Spend 1 supply: <b>Investigate.</b> Your location gets -2 shroud for this investigation.`;
	traits = "Item. Tool.";
	flavor = ``;
	subname = "";

	uses = 3;

	ability(plr: GamePlayer) {

	}
}

export default {
	code: "01587",
	faction_name: Faction.Neutral,
	type_name: CardType.Asset,
	constructor: _01587,
};
