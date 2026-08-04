import { PlayerCard } from "./objects/abstracts/card_inherits/player_card";
import { GamePlayer } from "./objects/player";
import { Server_ChooseCards_Sub, Server_ChooseCards_Pub } from "./remotes/ChooseCards/Interface";
import { GameContext, WhatHappened } from "./game_context";
import { SkillCheckAnimation_Pub } from "./remotes/SkillCheckAnimation/Interface";
import { performReactions } from "./performReactions";
import { IconToken } from "./objects/chaos_bag";

let cards: Record<string, PlayerCard[]> = {};
let submittedCount = 0;

Server_ChooseCards_Sub((plr, selectedCards) => {
	cards[plr.Name] = selectedCards as PlayerCard[];
	submittedCount++;
});

export interface ResolveObj {
	onFail: (() => void)[];
	onPass: (() => void)[];
}

// TODO: limit to 1 for allies and those only in the same location

export function skillCheck(skillCheckObj: {
	initiator: GamePlayer;
	against: number;
	using: string;
	bonus?: number;
}): [passed: boolean, byHowMuch: number] {
	GameContext.lock = true;

	const { initiator, against, using, bonus = 0 } = skillCheckObj;

	performReactions(WhatHappened.SKILL_CHECK_START, initiator);
	cards = {};
	submittedCount = 0;

	for (const plr of GameContext.players) {
		Server_ChooseCards_Pub(
			plr,
			plr.hand.filter((e) => {
				return e.getSkill(using) !== 0;
			}),
			`Skill Check by ${initiator.owner.Name}: ${initiator.investigator.getSkill(using)} against ${against} using ${using}.`,
			plr === initiator ? undefined : 1,
		);
	}

	do {
		task.wait();
	} while (submittedCount !== GameContext.players.size());

	let total = 0;
	for (const plr of GameContext.players) {
		for (const card of cards[plr.owner.Name]) {
			total += card.getSkill(using);
			plr.discard(card.id);
		}
	}

	const pulledToken = GameContext.chaos_bag!.pull();
	let finalToken = 0;

	const resolveObj: ResolveObj = {
		onFail: [],
		onPass: [],
	};

	if (pulledToken > 1) {
		// if its an IconToken
		if (pulledToken === IconToken.elder_sign) {
			finalToken = initiator.investigator.resolveElderToken(initiator);
		} else {
			finalToken = GameContext.scenario_card!.resolve(pulledToken, initiator, resolveObj);
		}
	}

	const final = total + initiator.investigator.getSkill(using) + finalToken + bonus;

	SkillCheckAnimation_Pub(initiator.investigator.getSkill(using), total, pulledToken, finalToken);

	GameContext.lock = false;
	performReactions(WhatHappened.SKILL_CHECK_ENDED, initiator);

	const passed = final >= against;

	if (!passed) {
		for (const onFail of resolveObj.onFail) {
			onFail();
		}
	} else {
		for (const onPass of resolveObj.onPass) {
			onPass();
		}
	}

	return [passed, final - against];
}
