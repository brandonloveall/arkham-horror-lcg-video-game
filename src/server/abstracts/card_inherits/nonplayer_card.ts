import { Card } from "../card";

export abstract class NonplayerCard extends Card {
    encounter_code!: string
    encounter_name!: string
    encounter_position!: number

}