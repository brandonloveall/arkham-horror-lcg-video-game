
import { ActCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/act_card";
import { _01116 } from "./01116";
import { GameContext, WhatHappened } from "shared/game_context";
import { EnemyCard } from "../abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { giveChoice } from "shared/giveChoice";

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
        [WhatHappened.ENEMY_DEFEATED]: {
            reaction: (enemy: EnemyCard) => { if (enemy.code === "01116") { this.advance() } },
            optional: false
        }
    }

    advance() {
        giveChoice(GameContext.players[0],
            [
                {
                    text: "It was never much of a home. Burn it down!",
                    outcome: () => { GameContext.resolutions[1]!() }
                },
                {
                    text: "This hell-pit is my home! No way we are burning it!",
                    outcome: () => { GameContext.resolutions[2]!() }
                }
            ]
        )
    }
}
