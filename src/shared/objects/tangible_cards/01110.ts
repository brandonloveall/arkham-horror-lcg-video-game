
import { ActCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/act_card";
import { _01116 } from "./01116";
import { GameState, WhatHappened } from "shared/game_context";

export class _01110 extends ActCard {
    clues = 0;
    stage = 3;
    back_name = "Defending the Home";
    back_text = `The lead investigator must decide (choose one):
- It was never much of a home. Burn it down! <b>(→R1)</b>
- This hell-pit is my home! No way are we burning it! <b>(→R2)</b>`;
    back_flavor = `When the robed creature falls, the fiendish swarm burrows back into the ground and the chaos of the house quiets. But the stranger in your parlor chamber doesn't seem relieved.
"You broke my seal that was set to trap the ghouls within." She raises her torch. "Now, we must take more direct measures and burn this hell-pit to the ground!"`;
    encounter_name = "The Gathering";
    encounter_position = 7;
    code = "01110";
    pack_name = "Core Set";
    type_name = "Act";
    faction_name = "Mythos";
    position = 110;
    exceptional = false;
    myriad = false;
    name = "What Have You Done?";
    quantity = 1;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = true;
    text = `<b>Objective</b> - If the Ghoul Priest is Defeated, advance.`;
    traits = "";
    flavor = `A woman with a torch stands in your parlor, a glimmer of hatred in her eyes. "What have you done to my barrier?" she screams, furious. Before you can enter, a ghastly wail sounds behind you, and a creature wearing robes and a deer skull mask tears through the wall, advancing toward you.`;
    subname = "";

    reactions = {
        [WhatHappened.EnemyDefeated]: {
            reaction: () => this.advance(),
            optional: false
        }
    }

    advance() {
        // TODO: implement the "givechoice" function for this
        print("nice job")
    }
}
