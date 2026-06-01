import { Card } from "./abstracts/card"

export class Deck {
    cards: Card[]

    constructor(cards: Card[]) {
        this.cards = cards
    }

    public pull() {
        return this.cards.pop()
    }

    public shuffle() {
        for (let i = this.cards.size() - 1; i > 0; i--) {
            const j = math.floor(math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    public addCard(card: Card) {
        this.cards.unshift(card)
    }
}