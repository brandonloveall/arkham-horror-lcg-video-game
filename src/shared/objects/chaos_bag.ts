export class ChaosBag {
    private tokens: (number | IconToken)[];

    constructor(tokens: (number | IconToken)[]) {
        this.tokens = tokens;
    }

    public pull() {
        return this.tokens[math.round(math.random() * this.tokens.size())];
    }

    public removeSpecific(token: number | IconToken) {
        this.tokens.remove(this.tokens.indexOf(token));
    }

    public removeRandom() {
        this.tokens.remove(math.round(math.random() * this.tokens.size()));
    }

    public add(token: number | IconToken) {
        this.tokens.push(token);
    }
}

export enum IconToken {
    _,
    __,
    skull,
    cultist,
    tablet,
    elder_thing,
    auto_fail,
    elder_sign
}