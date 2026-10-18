import { TreacheryCard } from "shared/objects/abstracts/card_inherits/treachery_card";
import { GamePlayer } from "../player";
import { skillTest } from "shared/actions/skilltest";
import { CardType, Faction, Skill } from "shared/card_database_types";

export class _01162 extends TreacheryCard {
	encounter_name = "Ghouls";
	code = "01162";
	pack_name = "Core Set";
	faction_name = Faction.Mythos;
	name = "Grasping Hands";
	quantity = 3;
	is_unique = false;
	permanent = false;
	text = `<b>Revelation</b> - Test 👟 (3). For each point you fail by, take 1 damage.`;
	traits = ["Hazard"];
	flavor = `Decaying hands rise up from below and grasp and claw at your ankles.`;
	subname = "";

	resolve(plrWhoDrew: GamePlayer): void {
		const [passed, byHowMuch] = skillTest({ initiator: plrWhoDrew, against: 3, using: Skill.Agility });
		if (!passed) {
			plrWhoDrew.takeDamage(math.abs(byHowMuch), 0);
		}
	}
}

export default {
	code: "01162",
	faction_name: Faction.Mythos,
	type_name: CardType.Treachery,
	constructor: _01162,
};
