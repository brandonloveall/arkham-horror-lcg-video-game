import { Card } from "./abstracts/card"
import { EnemyCard } from "./abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card"
import { LocationCard } from "./abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card"
import { PlayerCard } from "./abstracts/card_inherits/player_card"
import { CostingCard } from "./abstracts/card_inherits/player_card_inherits/costing_card"
import { AssetCard } from "./abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card"
import { EventCard } from "./abstracts/card_inherits/player_card_inherits/costing_card_inherits/event_card"
import { Investigator } from "./abstracts/card_inherits/player_card_inherits/investigator"
import { Deck } from "./deck"
import { skillCheck } from "./skillcheck"

class EquipmentSlot {

    private items: AssetCard[] = []
    private limit;
    private current_total = 0;

    constructor(limit: number) {
        this.limit = limit
    }

    public insert(card: AssetCard, cost: number): boolean {
        if(cost + this.current_total > this.limit) { return false; }
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

    owner: Player
    deck: Deck
    investigator: Investigator
    hand: Card[] = []
    equipped: Record<string, EquipmentSlot> = {
        Hand: new EquipmentSlot(2),
        Arcane: new EquipmentSlot(2),
        Body: new EquipmentSlot(1),
        Ally: new EquipmentSlot(1),
        Accessory: new EquipmentSlot(1),
        None: new EquipmentSlot(0) // the limit doesnt matter here since None takes up 0 slot space by default
    };

    location!: LocationCard
    resources!: number
    clues!: number
    actions!: number

    constructor(owner: Player, deck: Deck, investigator: Investigator) {
        this.owner = owner
        this.deck = deck
        this.investigator = investigator
    }

    public draw() {
        this.hand.push(this.deck.pull() as PlayerCard)
    }

    public takeResource() {
        this.resources += 1
    }

    public play(card: CostingCard) {
        if (this.resources >= card.cost && this.actions > 0) {
            if (card instanceof EventCard) {
                card.onPlay();
            }
            if (card instanceof AssetCard) {
                let slot = card.slot
                // does it fit? if yes, pay the cost. if not, do nothing
                if(!this.equipped[card.slot].insert(card, slot === "Hand x2" || slot === "Arcane x2" ? 2 : slot !== "" ? 1 : 0)) { return; } // 2hand or 2arcane, then hand/arcane/body/accessory, then none
            }
            this.resources -= card.cost
            this.actions -= 1

            // if successful, remove from hand
            this.hand.remove(this.hand.indexOf(card));
        }
    }

    public activate(ability: () => void) {
        ability()
    }

    public move(location: LocationCard) {
        if (this.location === location) { return }
        this.location = location
    }

    public investigate(location: LocationCard) {
        if (skillCheck()) {
            location.clues -= 1
            this.clues += 1
        }
    }

    public fight(enemy: EnemyCard) {
        if (skillCheck()) {
            enemy.health -= 1
        }
    }

    public engage(enemy: EnemyCard) {
        if (skillCheck()) {
            enemy.engagedWith = this
        }
    }

    public evade(enemy: EnemyCard) {
        if (skillCheck()) {
            enemy.engagedWith = undefined
        }
    }
}