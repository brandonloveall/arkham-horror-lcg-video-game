import { EnemyCard } from "./abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { LocationCard } from "./abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card";
import { PlayerCard } from "./abstracts/card_inherits/player_card";
import { CostingCard } from "./abstracts/card_inherits/player_card_inherits/costing_card";
import { AssetCard } from "./abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { EventCard } from "./abstracts/card_inherits/player_card_inherits/costing_card_inherits/event_card";
import { Investigator } from "./abstracts/card_inherits/player_card_inherits/investigator";
import { Deck } from "./deck";
import { skillCheck } from "../skillcheck";
import { UpdatePlayerUI_Pub } from "shared/remotes/UpdatePlayerUI/Interface";
import { GameContext, WhatHappened } from "shared/game_context";
import { payClues } from "shared/payClues";
import { performReactions } from "shared/performReactions";
import { TreacheryCard } from "./abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/treachery_card";
import { PlaySound_Pub } from "shared/remotes/PlaySound/Interface";

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
		if (this.actions === 0) {
			return;
		}
		performReactions(WhatHappened.PLAYER_DREW_CARD, this);
		if (this.deck.isEmpty()) {
			const temp = this.deck;
			this.deck = this.discardDeck;
			this.discardDeck = temp;
			this.horror++;
			this.deck.shuffle();
		}

		const card = this.deck.pull();
		if (card instanceof EnemyCard) {
			card.place(this.location);
			card.is_ready = true;
			card.engagedWith = this;
			card.inPlay = true;
			this.threat_area.push(card);
		}
		if (card instanceof TreacheryCard) {
			card.resolve(this);
		}
		if (card instanceof AssetCard || card instanceof EventCard) {
			this.hand.push(card);
		}
		this.actions--;
		this.update();
	}

	public takeResource() {
		if (this.actions === 0) {
			return;
		}
		performReactions(WhatHappened.PLAYER_TOOK_RESOURCE, this);
		this.resources += 1;
		this.actions--;
		this.update();
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
			performReactions(WhatHappened.PLAYER_PLAYED_CARD, this, card);
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
		this.update();
	}

	// TODO: fix
	public activateAbility(ability: (plr: GamePlayer) => void, isFree: boolean) {
		if (!isFree) {
			performReactions(WhatHappened.PLAYER_ACTIVATED_ABILITY, this);
			this.actions--;
		}
		ability(this);
		this.update();
	}

	public move(location: LocationCard) {
		if (this.location === location || !this.location.connects_to.includes(location.symbol) || this.actions === 0) {
			return;
		}
		performReactions(WhatHappened.PLAYER_MOVED, this, location);
		this.location = location;
		this.actions--;
		this.update();
		this.investigator.move(location);
		PlaySound_Pub("Move");
	}

	public investigate(investigateObj: {
		location: LocationCard;
		skill: string;
		bonusStat?: number;
		shroudModifier?: number;
	}) {
		if (this.actions === 0) {
			return;
		}

		const { location, skill, bonusStat, shroudModifier } = investigateObj;

		PlaySound_Pub("Investigate");
		performReactions(WhatHappened.PLAYER_INVESTIGATED, this, location);
		const [passed] = skillCheck({
			initiator: this,
			against: location.shroud + (shroudModifier !== undefined ? shroudModifier : 0),
			using: skill,
			bonus: bonusStat,
		});
		if (passed) {
			location.discoverClue(this, 1);
		}
		this.actions--;
		this.update();
	}

	public fight(fightObj: { enemy: EnemyCard; skill: string; bonusStat?: number; bonusDmg?: number }) {
		if (this.actions === 0) {
			return;
		}
		const { enemy, skill, bonusStat = 0, bonusDmg = 0 } = fightObj;

		performReactions(WhatHappened.PLAYER_FOUGHT, this, enemy);
		const [passed] = skillCheck({ initiator: this, against: enemy.enemy_fight, using: skill, bonus: bonusStat });
		if (passed) {
			enemy.takeDamage(1 + bonusDmg);
		}
		this.actions--;
		this.update();
	}

	public engage(enemy: EnemyCard) {
		if (enemy.engagedWith === this || this.actions === 0) {
			return;
		}
		performReactions(WhatHappened.PLAYER_ENGAGED_ENEMY, this, enemy);
		enemy.engagedWith = this;
		this.threat_area.push(enemy);
		this.actions--;
		this.update();
	}

	public evade(enemy: EnemyCard) {
		if (this.actions === 0) {
			return;
		}
		performReactions(WhatHappened.PLAYER_EVADED_ENEMY, this, enemy);
		const [passed] = skillCheck({ initiator: this, against: enemy.enemy_evade, using: "skill_agility" });
		if (passed) {
			enemy.engagedWith = undefined;
			this.threat_area.remove(this.threat_area.indexOf(enemy));
		}
		this.actions--;
		this.update();
	}

	public attemptAdvance() {
		if (GameContext.act!.clues !== 0 && payClues()) {
			GameContext.act!.advance();
		}
		this.update();
	}

	public update() {
		UpdatePlayerUI_Pub(this);
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
		this.update();
	}

	public takeDamage(damage: number, horror: number) {
		this.damage += damage;
		this.horror += horror;
		if (this.damage >= this.investigator.health || this.horror >= this.investigator.sanity) {
			print("oops u died"); /** temporary **/
		}
		this.update();
	}

	public heal(health: number, sanity: number) {
		this.damage = this.damage - health < 0 ? 0 : this.damage - health;
		this.horror = this.horror - sanity < 0 ? 0 : this.horror - sanity;
		this.update();
	}
}
