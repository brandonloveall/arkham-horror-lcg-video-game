import { Skill } from "shared/card_database_types";
import { EnemyCard } from "./abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { LocationCard } from "./abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card";
import { PlayerCard } from "./abstracts/card_inherits/player_card";
import { CostingCard } from "./abstracts/card_inherits/player_card_inherits/costing_card";
import { AssetCard } from "./abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { EventCard } from "./abstracts/card_inherits/player_card_inherits/costing_card_inherits/event_card";
import { Investigator } from "./abstracts/card_inherits/player_card_inherits/investigator";
import { Deck } from "./deck";
import { UpdatePlayerUI_Pub } from "shared/remotes/UpdatePlayerUI/Interface";
import { GameContext } from "shared/game_context";
import { payClues } from "shared/payClues";
import { TreacheryCard } from "./abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/treachery_card";
import { PlaySound_Pub } from "shared/remotes/PlaySound/Interface";
import { fight } from "shared/actions/fight";
import { evade } from "shared/actions/evade";
import { standardEngageTargets, standardEvadeTargets, standardFightTargets } from "shared/actions/helpers";
import { investigate } from "shared/actions/investigate";
import { engage } from "shared/actions/engage";
import { drawPlrCard } from "shared/actions/drawPlrCard";

class EquipmentSlot {
	private items: AssetCard[] = [];
	private limit;
	private current_total = 0;

	constructor(limit: number) {
		this.limit = limit;
	}

	public insert(card: AssetCard, cost: number): boolean {
		if (cost + this.current_total > this.limit) {
			return false;
		}
		this.items.push(card);
		this.current_total += cost;
		return true;
	}

	public get() {
		return [...this.items];
	}

	public remove(card: AssetCard) {
		if (card.slot === "") {
			return;
		}
		this.current_total -= ["Hand x2", "Arcane x2"].includes(this.items.remove(this.items.indexOf(card))!.slot)
			? 2
			: 1;
	}
}

export class GamePlayer {
	_hand = new EquipmentSlot(2);
	_arcane = new EquipmentSlot(2);

	owner: Player;
	deck: Deck;
	investigator: Investigator;
	hand: PlayerCard[] = [];
	equipped: Record<string, EquipmentSlot> = {
		Hand: this._hand,
		["Hand x2"]: this._hand,
		Arcane: this._arcane,
		["Arcane x2"]: this._arcane,
		Body: new EquipmentSlot(1),
		Ally: new EquipmentSlot(1),
		Accessory: new EquipmentSlot(1),
		[""]: new EquipmentSlot(0), // the limit doesnt matter here since None takes up 0 slot space by default
	};
	discardDeck = new Deck([]);

	damage = 0;
	horror = 0;

	location!: LocationCard;
	resources = 0;
	clues = 0;
	actions = 0;

	threat_area: (EnemyCard | TreacheryCard)[] = [];

	selectedObject!: LocationCard | EnemyCard;

	constructor(owner: Player, deck: Deck, investigator: Investigator) {
		this.owner = owner;
		this.deck = deck;
		this.investigator = investigator;

		task.spawn(() => {
			// eslint-disable-next-line no-constant-condition
			while (true) {
				task.wait(0.1);
				UpdatePlayerUI_Pub(this);
			}
		});
	}

	public getAllEquipment() {
		return [
			...this.equipped["Hand"].get(),
			...this.equipped["Arcane"].get(),
			...this.equipped[""].get(),
			...this.equipped["Body"].get(),
			...this.equipped["Accessory"].get(),
			...this.equipped["Ally"].get(),
		];
	}

	public draw() {
		drawPlrCard({ drawer: this, amount: 1 });
	}

	public takeResource() {
		if (this.actions === 0) {
			return;
		}
		this.resources += 1;
		this.actions--;
	}

	public play(card: CostingCard) {
		if (card.fast) {
			if (!card.canPlayFast(this)) {
				return;
			}
		} else {
			if (this.actions === 0 || this.resources < card.cost) {
				return;
			}
			this.actions--;
		}
		this.resources -= card.cost;
		if (card instanceof EventCard) {
			card.onPlay(this);
		}
		if (card instanceof AssetCard) {
			const slot = card.slot;
			// does it fit? if yes, insert. if not, fail and return
			if (
				!this.equipped[card.slot].insert(
					card,
					slot === "Hand x2" || slot === "Arcane x2" ? 2 : slot !== "" ? 1 : 0,
				)
			) {
				return;
			} // 2hand or 2arcane, then hand/arcane/body/accessory, then none
		}

		// if successful, pay cost and remove from hand
		this.hand.remove(this.hand.indexOf(card));
	}

	public activateAbility(ability: (plr: GamePlayer) => void) {
		ability(this);
	}

	public move(location: LocationCard) {
		if (this.location === location || !this.location.connects_to.includes(location.symbol) || this.actions === 0) {
			return;
		}
		this.location = location;
		this.actions--;
		this.investigator.move(location);
		if (!location.revealed) {
			location.reveal();
		}
		PlaySound_Pub("Move");
	}

	public investigate() {
		investigate({ initiator: this, location: this.location, using: Skill.Intellect });
	}

	public fight() {
		fight({
			initiator: this,
			using: Skill.Combat,
			free: false,
			targets: standardFightTargets(this),
		});
	}

	public engage() {
		engage({ initiator: this, targets: standardEngageTargets(this) });
	}

	public evade() {
		evade({ targets: standardEvadeTargets(this), initiator: this, using: Skill.Agility, free: false });
	}

	public attemptAdvance() {
		if (GameContext.act!.clues !== 0 && payClues()) {
			GameContext.act!.advance();
		}
	}

	public discard(id: string) {
		for (const card of this.hand) {
			if (card.id === id) {
				this.discardDeck.addCard(this.hand.remove(this.hand.indexOf(card))!);
				return;
			}
		}
		for (const card of this.getAllEquipment()) {
			if (card.id === id) {
				this.equipped[card.slot].remove(card);
				this.discardDeck.addCard(card);
				return;
			}
		}
	}

	public takeDamage(damage: number, horror: number) {
		this.damage += damage;
		this.horror += horror;
		if (this.damage >= this.investigator.health || this.horror >= this.investigator.sanity) {
			print("oops u died"); /** temporary **/
		}
	}

	public heal(health: number, sanity: number) {
		this.damage = math.clamp(this.damage - health, 0, this.investigator.health);
		this.horror = math.clamp(this.horror - sanity, 0, this.investigator.sanity);
	}
}
