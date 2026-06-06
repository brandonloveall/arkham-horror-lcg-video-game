
import { AgendaCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/agenda_card";

export class _01106 extends AgendaCard {
    doom = 7;
    stage = 2;
    back_name = "The Tunnels Below";
    back_text = `Shuffle the encounter discard pile into the encounter deck. Discard cards from the top of the encounter deck until a [[Ghoul]] enemy is discarded. The lead investigator draws that enemy.`;
    back_flavor = `A feral beast, roughly humanoid with a canine cast and hooves for feet, tears through the ground in front of you. Below the floor, you can see vast tunnels beneath your house. Fiendish howling echoes from deep within the underground caverns.`;
    encounter_name = "The Gathering";
    encounter_position = 3;
    code = "01106";
    pack_name = "Core Set";
    type_name = "Agenda";
    faction_name = "Mythos";
    position = 106;
    exceptional = false;
    myriad = false;
    name = "Rise of the Ghouls";
    quantity = 1;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = true;
    text = ``;
    traits = "";
    flavor = `The floor beneath you is giving way, and you see a vast network of tunnels, twisting into the darkness below. Shapes and silhouettes of strange creatures move swiftly through the tunnels, trying to find a way up. You probably don't want to be here when they do...`;
    subname = "";

    advance(): void {
        print("Method not implemented.");
    }
}
