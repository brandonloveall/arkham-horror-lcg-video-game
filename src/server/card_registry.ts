import { Card } from "shared/objects/abstracts/card";

class _CardRegistry {
    private registry: Map<string, Card> = new Map<string, Card>();

    public get(key: string) {
        return this.registry.get(key);
    }

    public insert(card: Card) {
        this.registry.set(card.id, card)
    }

    public remove(card: Card) {
        this.registry.delete(card.id)
    }
}

export const CardRegistry = new _CardRegistry();