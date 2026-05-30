import { Card } from "../card";

export abstract class NonplayerCard extends Card {
    abstract encounter_name: string
    abstract encounter_position: number

}