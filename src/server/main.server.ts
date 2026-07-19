import "./route_actions";
import { IconToken } from "shared/objects/chaos_bag";
import { StartCampaign_Sub } from "shared/remotes/StartCampaign/Interface";
import { NOTZ } from "./campaign_scripts";

StartCampaign_Sub((plr: Player, identifier: unknown, _chaos_bag: unknown) => {
	const chaos_bag = _chaos_bag as (number | IconToken)[];
	switch (identifier as string) {
		case "NOTZ":
			NOTZ(chaos_bag);
			break;
	}
});
