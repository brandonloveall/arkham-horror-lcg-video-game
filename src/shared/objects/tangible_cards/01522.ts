
import { GameContext, WhatHappened } from "shared/game_context";
import { EventCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/event_card";
import { GamePlayer } from "../player";
import { getOwner } from "shared/findOwner";

export class _01522 extends EventCard {
    cost = 1;
    skill_agility = 0;
    skill_combat = 0;
    skill_intellect = 2;
    skill_willpower = 0;
    skill_wildcard = 0;
    xp = 0;
    deck_limit = 2;
    code = "01522";
    pack_name = "Revised Core Set";
    type_name = "Event";
    faction_name = "Guardian";
    position = 22;
    exceptional = false;
    myriad = false;
    name = "Evidence!";
    quantity = 2;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `Fast. Play after you defeat an enemy.
Discover 1 clue at your location.`;
    traits = "Insight.";
    flavor = `Just as I suspected!`;
    subname = "";

    fast = true;
    canPlayFast(plr: GamePlayer) {
        return GameContext.most_recent_happening.happening === WhatHappened.ENEMY_DEFEATED && getOwner(this) === plr
    }

    onPlay(plr: GamePlayer): void {
        plr.location.discoverClue(plr, 1)
    }
}
