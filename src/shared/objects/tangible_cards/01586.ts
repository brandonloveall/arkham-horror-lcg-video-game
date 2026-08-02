import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { GamePlayer } from "../player";
import { EnemyCard } from "../abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { giveChoice } from "shared/giveChoice";
import { CardType, Faction } from "shared/card_database_types";

export class _01586 extends AssetCard {
	slot = "Hand";
	cost = 1;
	skill_agility = 0;
	skill_combat = 1;
	skill_intellect = 0;
	skill_willpower = 0;
	skill_wildcard = 0;
	xp = 0;
	deck_limit = 2;
	code = "01586";
	pack_name = "Revised Core Set";
	faction_name = Faction.Neutral;
	position = 86;
	exceptional = false;
	myriad = false;
	name = "Knife";
	quantity = 10;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `➡️: <b>Fight.</b> You get +1 👊 for this attack.
➡️ Discard Knife: <b>Fight.</b> You get +2 👊 for this attack. This attack deals +1 damage.`;
	traits = "Item. Weapon. Melee.";
	flavor = ``;
	subname = "";

	ability(plr: GamePlayer) {
		const enemy = plr.selectedObject as EnemyCard;

		giveChoice(plr, "Attack with Knife:", [
			{
				text: "+1 combat",
				outcome: () => {
					plr.fight({
						enemy: enemy,
						skill: "skill_combat",
						bonusStat: 1,
					});
				},
			},
			{
				text: "Discard Knife: +2 combat, +1 damage",
				outcome: () => {
					plr.discard(this.id);
					plr.fight({
						enemy: enemy,
						skill: "skill_combat",
						bonusStat: 2,
						bonusDmg: 1,
					});
				},
			},
		]);
	}
}

export default {
	code: "01586",
	faction_name: Faction.Neutral,
	type_name: CardType.Asset,
	constructor: _01586,
};
