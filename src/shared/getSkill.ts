import { PlayerCard } from "./objects/abstracts/card_inherits/player_card";

export function getSkill(card: PlayerCard, skill: string) {
	switch (skill) {
		case "skill_agility":
			return card.skill_agility;
		case "skill_combat":
			return card.skill_combat;
		case "skill_intellect":
			return card.skill_intellect;
		case "skill_willpower":
			return card.skill_willpower;
		case "skill_wildcard":
			return card.skill_wildcard;
		default:
			return 0;
	}
}
