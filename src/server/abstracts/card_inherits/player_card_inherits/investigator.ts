import { Damageable } from "server/abstracts/damageable";
import { PlayerCard } from "../player_card";
import { DeckOption, DeckRequirements } from "server/abstracts/deck_req_and_opt";

export abstract class Investigator extends PlayerCard implements Damageable {
    abstract health: number;
    abstract sanity: number;

    abstract deck_requirements: DeckRequirements
    abstract deck_options: DeckOption[]


}