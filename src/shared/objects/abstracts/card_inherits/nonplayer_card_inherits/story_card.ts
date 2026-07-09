import { DoubleSided } from "shared/objects/abstracts/double_sided";
import { NonplayerCard } from "../nonplayer_card";

export abstract class StoryCard extends NonplayerCard implements DoubleSided {
	abstract stage: number;
	abstract back_name: string;
	abstract back_text: string;
	abstract back_flavor: string;
}
