export class ChaosBag {
	private tokens: (number | IconToken)[];

	constructor(tokens: (number | IconToken)[]) {
		this.tokens = tokens;
	}

	public pull() {
		return this.tokens[math.floor(math.random() * this.tokens.size())];
	}

	public removeSpecific(token: number | IconToken) {
		this.tokens.remove(this.tokens.indexOf(token));
	}

	public removeRandom() {
		this.tokens.remove(math.floor(math.random() * this.tokens.size()));
	}

	public add(token: number | IconToken) {
		this.tokens.push(token);
	}

	public getWhatsInside() {
		return [...this.tokens]; // clone for immutability
	}
}

// due to limitations of enums, the first two values (0 and 1) are excluded since number tokens range from -8 to +1
export enum IconToken {
	_,
	__,
	skull,
	cultist,
	tablet,
	elder_thing,
	auto_fail,
	elder_sign,
}
