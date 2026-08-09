import { CardRegistry } from "shared/card_registry";
import { ScenarioCard } from "../abstracts/card_inherits/scenario_card";
import { IconToken } from "../chaos_bag";
import { GamePlayer } from "../player";
import { EnemyCard } from "../abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { ResolveObj } from "shared/skillcheck";
import { GameContext } from "shared/game_context";
import { _01108 } from "./01108";
import { _01105 } from "./01105";
import { Deck } from "../deck";
import { _01159 } from "./01159";
import { _01160 } from "./01160";
import { _01161 } from "./01161";
import { _01162 } from "./01162";
import { _01163 } from "./01163";
import { _01164 } from "./01164";
import { _01165 } from "./01165";
import { _01166 } from "./01166";
import { _01167 } from "./01167";
import { _01168 } from "./01168";
import { CardType, Faction } from "shared/card_database_types";
import { _01111 } from "./01111";

export class _01104 extends ScenarioCard {
	code = "01104";
	pack_name = "Core Set";
	faction_name = Faction.Mythos;
	position = 104;
	exceptional = false;
	myriad = false;
	name = "The Gathering";
	quantity = 1;
	health_per_investigator = false;
	is_unique = false;
	permanent = false;
	double_sided = true;
	text =
		"Easy / Standard\n[skull] -X. X is the number of [[Ghoul]] enemies at your location.\n[cultist] -1. If you fail, take 1 horror.\n[tablet] -2. If there is a [[Ghoul]] enemy at your location, take 1 damage.\n";
	traits = "";
	flavor = "";
	subname = "";

	/**
	 * FUTURE REFERENCE:
	 * curl https://arkhamdb.com/api/public/cards/<expansion>?encounter=1 | jq '.[] | range(.quantity) as $i | select((.encounter_name == <encounter names>) and (.type_code == "enemy" or .type_code == "treachery") and .name != <excluded cards>) .code'
	 */

	resolve(token: IconToken, puller: GamePlayer, resolveObj: ResolveObj) {
		if (token === IconToken.skull) {
			let total = 0;
			for (const card of CardRegistry.getAll()) {
				if (
					card instanceof EnemyCard &&
					card.traits.find("Ghoul")[0] !== undefined &&
					card.location === puller.location
				) {
					total--;
				}
			}
			return total;
		}
		if (token === IconToken.cultist) {
			resolveObj.onFail.push(() => puller.takeDamage(0, 1));
			return -1;
		}
		if (token === IconToken.tablet) {
			resolveObj.onFail.push(() => puller.takeDamage(1, 0));
			return -2;
		}
		return 0; // should never hit
	}

	setup() {
		GameContext.act = new _01108();
		GameContext.agenda = new _01105();
		GameContext.encounter_deck = new Deck([
			_01159,
			_01159,
			_01159,
			_01160,
			_01160,
			_01160,
			_01161,
			_01162,
			_01162,
			_01162,
			_01163,
			_01163,
			_01163,
			_01164,
			_01164,
			_01165,
			_01165,
			_01166,
			_01166,
			_01166,
			_01167,
			_01167,
			_01168,
			_01168,
		]);

		new _01111().place([5, 5]).reveal();

		for (const plr of GameContext.players) {
			plr.location = GameContext.game_map[5][5]!;
			plr.investigator.place(GameContext.game_map[5][5]!);
		}
	}
}

export default {
	code: "01104",
	faction_name: Faction.Mythos,
	type_name: CardType.Scenario,
	constructor: _01104,
};
