import { GameContext } from "shared/game_context";
import { ActCard } from "shared/objects/abstracts/card_inherits/act_card";
import { _01110 } from "./01110";
import { CardType, Faction } from "shared/card_database_types";
import { _01112 } from "./01112";

export class _01109 extends ActCard {
	clues = 3;
	stage = 2;
	back_name = "Breaking the Barrier";
	back_text = `The barrier blocking passage into the parlor has vanished. Reveal the Parlor.
Put the set-aside Lita Chantler into play in the Parlor.
Spawn the set-aside Ghoul Priest in the Hallway.`;
	back_flavor = `Using the barrel from the attic, you carry ice and snow from the cellar and hurl it at the barrier. The barrier sparks and shudders as it consumes the ice, then hisses and fades out of existence.`;
	encounter_name = "The Gathering";
	code = "01109";
	pack_name = "Core Set";
	faction_name = Faction.Mythos;
	name = "The Barrier";
	quantity = 1;
	is_unique = false;
	permanent = false;
	text = `<b>Objective</b> - When the round ends, investigators in the hallway may, as a group, spend the requisite number of clues to advance.`;
	traits = [];
	flavor = `A glowing barrier blocks the path to your parlor. As you move toward it, intense heat forces you to back away. Picking up a handful of dirt, you toss it as the barrier and watch in horror as the dirt incinerates. Perhaps there's something in the cellar or attic that can help.`;
	subname = "";

	advancement = {
		advance: () => {
			GameContext.act = new _01110();
		},
		optional: true,
		canAdvance: () => {
			let total = 0;
			for (const plr of GameContext.players) {
				if (plr.location instanceof _01112) {
					total += plr.clues;
				}
			}
			return total >= this.clues;
		},
	};
}

export default {
	code: "01109",
	faction_name: Faction.Mythos,
	type_name: CardType.Act,
	constructor: _01109,
};
