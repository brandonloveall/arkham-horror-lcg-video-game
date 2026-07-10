import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { GamePlayer } from "../player";
import { giveChoice } from "shared/giveChoice";
import { GameContext } from "shared/game_context";

export class _01519 extends AssetCard {
	slot = "";
	cost = 2;
	skill_agility = 0;
	skill_combat = 0;
	skill_intellect = 0;
	skill_willpower = 1;
	skill_wildcard = 0;
	xp = 0;
	deck_limit = 2;
	code = "01519";
	pack_name = "Revised Core Set";
	type_name = "Asset";
	faction_name = "Guardian";
	position = 19;
	exceptional = false;
	myriad = false;
	name = "First Aid";
	quantity = 2;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `Uses (3 supplies). If First Aid has no supplies, discard it.
[action] Spend 1 supply: Heal 1 damage or horror from an investigator at your location.`;
	traits = "Talent. Science.";
	flavor = ``;
	subname = "";

	uses = 3;

	ability(plr: GamePlayer) {
		this.uses--;
		giveChoice(
			plr,
			"Who to heal?",
			GameContext.players
				.filter((otherPlr) => otherPlr.location === plr.location)
				.map((otherPlr) => {
					return {
						text: `Heal ${otherPlr.owner.Name}`,
						outcome: () =>
							giveChoice(otherPlr, "Heal:", [
								{
									text: "1 horror",
									outcome: () => {
										otherPlr.heal(0, 1);
									},
								},
								{
									text: "1 damage",
									outcome: () => {
										otherPlr.heal(1, 0);
									},
								},
							]),
					};
				}),
		);
		if (this.uses === 0) {
			plr.discard(this.id);
		}
	}
}
