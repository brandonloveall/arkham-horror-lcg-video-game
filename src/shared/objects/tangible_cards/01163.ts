import { TreacheryCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/treachery_card";
import { GamePlayer } from "../player";
import { skillCheck } from "shared/skillcheck";
import { CardType, Faction } from "shared/card_database_types";

export class _01163 extends TreacheryCard {
	encounter_name = "Striking Fear";
	encounter_position = 1;
	code = "01163";
	pack_name = "Core Set";
	faction_name = Faction.Mythos;
	position = 163;
	exceptional = false;
	myriad = false;
	name = "Rotting Remains";
	quantity = 3;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = false;
	text = `<b>Revelation</b> - Test [willpower] (3). For each point you fail by, take 1 horror.`;
	traits = "Terror.";
	flavor = `A sickening display of gore causes you to retch. You're glad this wasn't you.`;
	subname = "";

	resolve(plrWhoDrew: GamePlayer): void {
		const [passed, byHowMuch] = skillCheck({ initiator: plrWhoDrew, against: 3, using: "skill_willpower" });
		if (!passed) {
			plrWhoDrew.takeDamage(0, math.abs(byHowMuch));
		}
	}
}

export default {
	code: "01163",
	faction_name: Faction.Mythos,
	type_name: CardType.Treachery,
	constructor: _01163,
};
