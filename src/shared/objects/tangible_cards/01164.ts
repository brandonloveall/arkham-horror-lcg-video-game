
import { TreacheryCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/treachery_card";
import { GamePlayer } from "../player";
import { GameContext, WhatHappened } from "shared/game_context";
import { skillCheck } from "shared/skillcheck";
import { reactions } from "../abstracts/card";

export class _01164 extends TreacheryCard {
    encounter_name = "Striking Fear";
    encounter_position = 4;
    code = "01164";
    pack_name = "Core Set";
    type_name = "Treachery";
    faction_name = "Mythos";
    position = 164;
    exceptional = false;
    myriad = false;
    name = "Frozen in Fear";
    quantity = 2;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `<b>Revelation</b> - Put Frozen in Fear into play in your threat area.
The first time you perform one of the following actions (move, fight, or evade) each round, it costs 1 additional action.
<b>Forced</b> - At the end of your turn: Test [willpower] (3). If you succeed, discard Frozen in Fear.`;
    traits = "Terror.";
    flavor = ``;
    subname = "";

    reactions: reactions = {
        [WhatHappened.PLAYER_TURN_ENDED]: {
            reaction: (plr: GamePlayer) => {
                if(!plr.threat_area.includes(this)) { return; }
                const [passed, byHowMuch] = skillCheck({
                    initiator: plr, 
                    against: 3,
                    using: "skill_willpower"
                })
                if(passed) {
                    GameContext.encounter_discard.addCard(this)
                    plr.threat_area.remove(plr.threat_area.indexOf(this))
                }
            },
            optional: false
        },
    }

    resolve(plrWhoDrew: GamePlayer): void {
        plrWhoDrew.threat_area.push(this)
    }
}
