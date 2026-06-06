import { Card } from "./abstracts/card"
import { EnemyCard } from "./abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card"
import { LocationCard } from "./abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card"
import { PlayerCard } from "./abstracts/card_inherits/player_card"
import { CostingCard } from "./abstracts/card_inherits/player_card_inherits/costing_card"
import { AssetCard } from "./abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card"
import { EventCard } from "./abstracts/card_inherits/player_card_inherits/costing_card_inherits/event_card"
import { Investigator } from "./abstracts/card_inherits/player_card_inherits/investigator"
import { Deck } from "./deck"
import { skillCheck } from "../skillcheck"
import { UpdatePlayerUI_Pub } from "shared/remotes/UpdatePlayerUI/Interface"
import { GameContext } from "shared/game_context"
import { payClues } from "shared/payClues"

class EquipmentSlot {

    private items: AssetCard[] = []
    private limit;
    private current_total = 0;

    constructor(limit: number) {
        this.limit = limit
    }

    public insert(card: AssetCard, cost: number): boolean {
        if (cost + this.current_total > this.limit) { return false; }
        this.items.push(card);
        return true;
    }

    public get() {
        return [...this.items];
    }

    public remove(card: AssetCard) {
        this.items.remove(this.items.indexOf(card));
    }
}

export class GamePlayer {

    _hand = new EquipmentSlot(2)
    _arcane = new EquipmentSlot(2)

    owner: Player
    deck: Deck
    investigator: Investigator
    hand: Card[] = []
    equipped: Record<string, EquipmentSlot> = {
        Hand: this._hand,
        ["Hand x2"]: this._hand,
        Arcane: this._arcane,
        ["Arcane x2"]: this._arcane,
        Body: new EquipmentSlot(1),
        Ally: new EquipmentSlot(1),
        Accessory: new EquipmentSlot(1),
        [""]: new EquipmentSlot(0) // the limit doesnt matter here since None takes up 0 slot space by default
    };
    discard = new Deck([]);

    damage = 0;
    horror = 0;

    location!: LocationCard
    resources = 0;
    clues = 0;
    actions = 0;

    constructor(owner: Player, deck: Deck, investigator: Investigator) {
        this.owner = owner
        this.deck = deck
        this.investigator = investigator
    }

    public draw() {
        this.hand.push(this.deck.pull() as PlayerCard)
        this.update()
    }

    public takeResource() {
        this.resources += 1
        this.update()
    }

    public play(card: CostingCard) {

        if (this.resources >= card.cost && this.actions > 0) {
            if (card instanceof EventCard) {
                card.onPlay(this);
            }
            if (card instanceof AssetCard) {
                let slot = card.slot
                // does it fit? if yes, insert. if not, fail and return
                if (!this.equipped[card.slot].insert(card, slot === "Hand x2" || slot === "Arcane x2" ? 2 : slot !== "" ? 1 : 0)) { return; } // 2hand or 2arcane, then hand/arcane/body/accessory, then none
            }

            // if successful, pay cost and remove from hand
            this.resources -= card.cost
            this.actions -= 1
            this.hand.remove(this.hand.indexOf(card));
        }
        this.update()
    }

    public activate(ability: () => void) {
        ability()
        this.update()
    }

    public move(location: LocationCard) {
        if (this.location === location) { return }
        this.location = location
        this.update()
    }

    public investigate(location: LocationCard) {
        if (skillCheck(this, location.shroud, "skill_intellect")) {
            location.clues -= 1
            this.clues += 1
        }
        this.update()
    }

    public fight(enemy: EnemyCard) {
        if (skillCheck(this, enemy.enemy_fight, "skill_combat")) {
            enemy.health -= 1
        }
        this.update()
    }

    public engage(enemy: EnemyCard) {
        enemy.engagedWith = this
        this.update()
    }

    public evade(enemy: EnemyCard) {
        if (skillCheck(this, enemy.enemy_evade, "skill_agility")) {
            enemy.engagedWith = undefined
        }
        this.update()
    }


    public attemptAdvance() {
        if(GameContext.act.clues !== 0 && payClues()) {
            print("successful")
        }
        this.update()
    }

    public update() {
        UpdatePlayerUI_Pub(this)
    }
}