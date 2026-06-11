import { IconToken } from "shared/objects/chaos_bag";
import { Card } from "../card";

export abstract class ScenarioCard extends Card {
    abstract resolve: (token: IconToken) => number
}