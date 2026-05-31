
import { AgendaCard } from "server/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/agenda_card";

export class _01107 extends AgendaCard {
    doom = 10;
    stage = 3;
    back_name = "The Ghouls Break Free";
    back_text = `- If the investigators are at Act 1 or 2, they are trapped inside the house as the ghouls tear them apart. <b>(→R3)</b>
- If the investigators are at Act 3, they barely escape with their lives, allowing the ghouls to run rampant. Each investigator that has not resigned is defeated and suffers 1 physical trauma.`;
    back_flavor = `The ground begins to shake and you can see claws rising up from the dirt as uncanny creatures desperately try to claw their way out of the ground all around you. Everywhere you turn, you see monsters rising from the earth. Terrified, you flee as fast as you can.`;
    encounter_name = "The Gathering";
    encounter_position = 4;
    code = "01107";
    pack_name = "Core Set";
    type_name = "Agenda";
    faction_name = "Mythos";
    position = 107;
    exceptional = false;
    myriad = false;
    name = "They're Getting Out!";
    quantity = 1;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = true;
    text = `<b>Forced</b> - At the end of the enemy phase: Each unengaged [[Ghoul]] enemy moves 1 location towards the Parlor.
<b>Forced</b> - At the end of the round: Place 1 doom on this agenda for each [[Ghoul]] enemy in the Hallway or Parlor.`;
    traits = "";
    flavor = `You hear a crazed howl outside, and suddenly all the creatures turn their attention to that sound. They rush to escape the house, breaking down doors and clawing at everything in their way.`;
    subname = "";
}
