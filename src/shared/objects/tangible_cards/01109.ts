import { GameContext } from "shared/game_context";
import { ActCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/act_card";
import { _01110 } from "./01110";

export class _01109 extends ActCard {
	clues = 3;
	stage = 2;
	back_name = "Breaking the Barrier";
	back_text = `The barrier blocking passage into the parlor has vanished. Reveal the Parlor.
Put the set-aside Lita Chantler into play in the Parlor.
Spawn the set-aside Ghoul Priest in the Hallway.`;
	back_flavor = `Using the barrel from the attic, you carry ice and snow from the cellar and hurl it at the barrier. The barrier sparks and shudders as it consumes the ice, then hisses and fades out of existence.`;
	encounter_name = "The Gathering";
	encounter_position = 6;
	code = "01109";
	pack_name = "Core Set";
	type_name = "Act";
	faction_name = "Mythos";
	position = 109;
	exceptional = false;
	myriad = false;
	name = "The Barrier";
	quantity = 1;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = true;
	text = `<b>Objective</b> - When the round ends, investigators in the hallway may, as a group, spend the requisite number of clues to advance.`;
	traits = "";
	flavor = `A glowing barrier blocks the path to your parlor. As you move toward it, intense heat forces you to back away. Picking up a handful of dirt, you toss it as the barrier and watch in horror as the dirt incinerates. Perhaps there's something in the cellar or attic that can help.`;
	subname = "";

	restrictions = {
		canDirectlySpend: false,
	};

	advance() {
		GameContext.act = new _01110();
	}
}
