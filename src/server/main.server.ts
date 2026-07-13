import { _01104 } from "shared/objects/tangible_cards/01104";
import { start } from "./game_manager";
import "./route_actions";
import { IconToken } from "shared/objects/chaos_bag";
import { StartCampaign_Sub } from "shared/remotes/StartCampaign/Interface";

StartCampaign_Sub((plr: Player, identifier: unknown, _chaos_bag: unknown) => {
	const chaos_bag = _chaos_bag as (number | IconToken)[];
	switch (identifier as string) {
		case "NOTZ":
			start(_01104, chaos_bag);
			break;
	}
});
