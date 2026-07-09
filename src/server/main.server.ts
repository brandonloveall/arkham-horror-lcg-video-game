import { _01104 } from "shared/objects/tangible_cards/01104";
import { start } from "./game_manager";
import "./route_actions";
import { IconToken } from "shared/objects/chaos_bag";

task.wait(3);

start(_01104, [
	1,
	0,
	0,
	-1,
	-1,
	-1,
	-2,
	-2,
	-3,
	-4,
	IconToken.skull,
	IconToken.skull,
	IconToken.cultist,
	IconToken.tablet,
	IconToken.auto_fail,
	IconToken.elder_sign,
]);
