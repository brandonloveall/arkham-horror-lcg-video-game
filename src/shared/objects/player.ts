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
import { GameContext, WhatHappened } from "shared/game_context"
import { payClues } from "shared/payClues"
import { CardRegistry } from "shared/card_registry"
import { performReactions } from "shared/performReactions"
import { TreacheryCard } from "./abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/treachery_card"
import { PlaySound_Pub } from "shared/remotes/PlaySound/Interface"

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
        this.current_total += cost
        return true;
    }

    public get() {
        return [...this.items];
    }

    public remove(card: AssetCard) {
        if (card.slot === "") { return; }
        this.current_total -= ["Hand x2", "Arcane x2"].includes(this.items.remove(this.items.indexOf(card))!.slot) ? 2 : 1
    }
}

export class GamePlayer {

    _hand = new EquipmentSlot(2)
    _arcane = new EquipmentSlot(2)

    owner: Player
    deck: Deck
    investigator: Investigator
    hand: PlayerCard[] = []
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
    discardDeck = new Deck([]);

    damage = 0;
    horror = 0;

    location!: LocationCard
    resources = 0;
    clues = 0;
    actions = 0;

    threat_area: Card[] = []

    constructor(owner: Player, deck: Deck, investigator: Investigator) {
        this.owner = owner
        this.deck = deck
        this.investigator = investigator
    }

    public getAllEquipment() {
        return [...this.equipped["Hand"].get(), ...this.equipped["Arcane"].get(), ...this.equipped[""].get(), ...this.equipped["Body"].get(), ...this.equipped["Accessory"].get(), ...this.equipped["Ally"].get()]
    }

    public draw(free?: boolean) {
        if(!free) { performReactions(WhatHappened.PlayerDrewCard, this); this.actions -= 1  }
        if (this.deck.isEmpty()) {
            this.deck, this.discardDeck = this.discardDeck, this.deck
            this.horror++
            this.deck.shuffle()
        }

        const card = this.deck.pull()
        if(card instanceof EnemyCard) {
            card.place(this.location)
            card.engagedWith = this
            card.inPlay = true
            this.threat_area.push(card)
        }
        if(card instanceof TreacheryCard) {
            card.resolve(this)
        }
        if(card instanceof AssetCard || card instanceof EventCard) {
            this.hand.push(this.deck.pull() as PlayerCard)
        }
        this.update()
    }

    public takeResource() {
        performReactions(WhatHappened.PlayerTookResource, this)
        this.resources += 1
        this.actions -= 1
        this.update()
    }

    public play(card: CostingCard) {
        performReactions(WhatHappened.PlayerPlayedCard, this)
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

    public activateAbility(ability: () => void) {
        performReactions(WhatHappened.PlayerActivatedAbility, this)
        ability()
        this.actions -= 1
        this.update()
    }

    public move(location: LocationCard) {
        if (this.location === location || !this.location.connects_to.includes(location.symbol)) { return }
        performReactions(WhatHappened.PlayerMoved, this, location)
        this.location = location
        this.actions -= 1
        this.update()
        this.investigator.move(location)
        PlaySound_Pub("Move")
    }

    public investigate(location: LocationCard) {
        if(this.actions === 0) { return; }
        PlaySound_Pub("Investigate")
        performReactions(WhatHappened.PlayerInvestigated, this, location)
        const [passed] = skillCheck(this, location.shroud, "skill_intellect")
        if (passed) {
            location.discoverClue(this, 1)
        }
        this.actions -= 1
        this.update()
    }

    public fight(enemy: EnemyCard) {
        performReactions(WhatHappened.PlayerFought, this, enemy)
        const [passed] = skillCheck(this, enemy.enemy_fight, "skill_combat")
        if (passed) {
            enemy.takeDamage(1)
        }
        this.actions -= 1
        this.update()
    }

    public engage(enemy: EnemyCard) {
        if(enemy.engagedWith === this) { return; }
        performReactions(WhatHappened.PlayerEngagedEnemy, this, enemy)
        enemy.engagedWith = this
        this.threat_area.push(enemy)
        this.actions -= 1
        this.update()
    }

    public evade(enemy: EnemyCard) {
        performReactions(WhatHappened.PlayerEvadedEnemy, this, enemy)
        const [passed] = skillCheck(this, enemy.enemy_evade, "skill_agility")
        if (passed) {
            enemy.engagedWith = undefined
            this.threat_area.remove(this.threat_area.indexOf(enemy))
        }
        this.actions -= 1
        this.update()
    }


    public attemptAdvance() {
        if (GameContext.act!.clues !== 0 && payClues()) {
            GameContext.act!.advance()
        }
        this.update()
    }

    public update() {
        UpdatePlayerUI_Pub(this)
    }

    public discard(id: string) {
        for (const card of this.hand) {
            if (card.id === id) { this.discardDeck.addCard(this.hand.remove(this.hand.indexOf(card))!) }
        }
        for (const card of this.getAllEquipment()) {
            if (card.id === id) { this.equipped[card.slot].remove(card) }
        }
        this.update()
    }

    public takeDamage(damage: number, horror: number) {
        this.damage += damage
        this.horror += horror
        if(this.damage >= this.investigator.health || this.horror >= this.investigator.sanity) { print("oops u died") /** temporary **/  }
        this.update()
    }
}