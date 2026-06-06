
import { TreacheryCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/treachery_card";
import { GamePlayer } from "../player";

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
    restrictions = {};

    resolve(plrWhoDrew: GamePlayer): void {
        plrWhoDrew.threat_area.push(this)
    }
}
