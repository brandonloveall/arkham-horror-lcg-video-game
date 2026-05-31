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

    }

    public addCard(card: Card) {
        this.cards.push(card)
    }
}