import { PlaySound_Pub } from "shared/remotes/PlaySound/Interface";
import { start } from "./game_manager";
import { _01104 } from "shared/objects/tangible_cards/01104";
import { IconToken } from "shared/objects/chaos_bag";

export function NOTZ(chaos_bag: (number | IconToken)[]) {
	PlaySound_Pub("TheGhoulsHunger");
	start(_01104, chaos_bag);
}
