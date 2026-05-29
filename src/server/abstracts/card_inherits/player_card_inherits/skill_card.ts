import { WholePossibleCard } from "server/abstracts/whole_possible_card";
import { PlayerCard } from "../player_card";

export abstract class SkillCard extends PlayerCard {
    constructor(card: WholePossibleCard) {
        super(card)
    }
}