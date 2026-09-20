import { CardRegistry } from "shared/card_registry";
import { GameContext } from "shared/game_context";
import { giveChoice } from "shared/giveChoice";
import { LocationCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card";
import { CostingCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card";
import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { GamePlayer } from "shared/objects/player";
import {
	ActivateAbility_Sub,
	AdvanceAct_Sub,
	Draw_Sub,
	Engage_Sub,
	Evade_Sub,
	Fight_Sub,
	GainResource_Sub,
	Investigate_Sub,
	Move_Sub,
	PlayCard_Sub,
} from "shared/remotes/Actions/Interface";

function getPlrObj(plr: Player) {
	return GameContext.players.find((e) => {
		return e.owner === plr;
	})!;
}

Draw_Sub((plr) => {
	getPlrObj(plr).draw();
});

Engage_Sub((plr) => {
	getPlrObj(plr).engage();
});

Evade_Sub((plr) => {
	getPlrObj(plr).evade();
});

Fight_Sub((plr) => {
	getPlrObj(plr).fight();
});

GainResource_Sub((plr) => {
	getPlrObj(plr).takeResource();
});

Investigate_Sub((plr) => {
	getPlrObj(plr).investigate();
});

Move_Sub((plr) => {
	const plrObj = getPlrObj(plr);
	const locations = CardRegistry.getAll().filter(
		(l) => l instanceof LocationCard && plrObj.location.connects_to.includes(l.symbol),
	);

	giveChoice(
		plrObj,
		"Move to:",
		locations.map((l) => {
			return {
				text: l.name,
				outcome: () => plrObj.move(l as LocationCard),
			};
		}),
	);
});

PlayCard_Sub((plr: Player, card_id: unknown) => {
	getPlrObj(plr).play(CardRegistry.get(card_id as string) as CostingCard);
});

ActivateAbility_Sub((plr, card_id) => {
	const card = CardRegistry.get(card_id as string) as AssetCard;
	getPlrObj(plr).activateAbility((gameplr: GamePlayer) => card.ability(gameplr));
});

AdvanceAct_Sub((plr) => {
	getPlrObj(plr).attemptAdvance();
});
