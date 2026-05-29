import { Deck } from "../abstracts/deck"

export class GamePlayer {
    owner: Player
    deck?: Deck
    //investigator: Investigator

    constructor(owner: Player) {
        this.owner = owner
    }

    public setDeck(deck: Deck) {
        this.deck = deck
    }
}