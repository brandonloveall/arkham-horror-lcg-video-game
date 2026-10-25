import { AssetCard } from "shared/objects/abstracts/card_inherits/asset_card";
import { GamePlayer } from "../player";
import { CardType, Faction, Skill, Slot } from "shared/card_database_types";

export class _01506 extends AssetCard {
	slot = Slot.Hand;
	cost = 3;
	skills = {
		[Skill.Agility]: 1,
		[Skill.Combat]: 1,
		[Skill.Intellect]: 0,
		[Skill.Willpower]: 0,
		[Skill.Wildcard]: 0,
	};
	xp = 0;
	deck_limit = 1;
	code = "01506";
	pack_name = "Revised Core Set";
	faction_name = Faction.Neutral;
	exceptional = false;
	myriad = false;
	name = "Roland's .38 Special";
	quantity = 1;
	is_unique = true;
	permanent = false;
	text = `Roland Banks deck only.
Uses (4 ammo).
➡️ Spend 1 ammo: <b>Fight.</b> You get +1 👊 for this attack (if there are 1 or more clues on your location, you get +3 👊, instead). This attack deals +1 damage.`;
	traits = ["Item", "Weapon", "Firearm"];
	flavor = ``;
	subname = "";
	belongs_to = "01501";

	uses = 4;

	ability(plr: GamePlayer) {

	}
}

export default {
	code: "01506",
	faction_name: Faction.Neutral,
	type_name: CardType.Asset,
	constructor: _01506,
};
