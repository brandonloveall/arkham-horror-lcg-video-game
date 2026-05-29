import { DoubleSided } from "server/abstracts/double_sided";
import { NonplayerCard } from "../nonplayer_card";


export abstract class StoryCard extends NonplayerCard implements DoubleSided {
    stage!: number
    back_name!: string
    back_text!: string
    back_flavor!: string


}