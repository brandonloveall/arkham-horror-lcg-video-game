import { EnemyCard } from "./abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card"
import { LocationCard } from "./abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card"
import { PlayerCard } from "./abstracts/card_inherits/player_card"
import { AssetCard } from "./abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card"
import { EventCard } from "./abstracts/card_inherits/player_card_inherits/costing_card_inherits/event_card"
import { Investigator } from "./abstracts/card_inherits/player_card_inherits/investigator"
import { Deck } from "./deck"
import { skillCheck } from "./skillcheck"

export class GamePlayer {
    owner: Player
    deck: Deck
    investigator: Investigator
    hand!: PlayerCard[]
    slots = {
        hand: [],
        arcane: [],
        body: [],
        ally: [],
        accessory: [],
        none: []
    }
    location!: LocationCard
    resources!: number
    clues!: number

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

    public play(card: PlayerCard) {
        if (card instanceof EventCard) {

        }
        if (card instanceof AssetCard) {

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