
import { giveChoice } from "shared/giveChoice";
import { EventCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/event_card";
import { GamePlayer } from "../player";
import { CardRegistry } from "shared/card_registry";
import { LocationCard } from "../abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card";
import { EnemyCard } from "../abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { Investigator } from "../abstracts/card_inherits/player_card_inherits/investigator";
import { GameContext } from "shared/game_context";

export class _01524 extends EventCard {
    cost = 5;
    skill_agility = 0;
    skill_combat = 0;
    skill_intellect = 0;
    skill_willpower = 1;
    skill_wildcard = 0;
    xp = 0;
    deck_limit = 2;
    code = "01524";
    pack_name = "Revised Core Set";
    type_name = "Event";
    faction_name = "Guardian";
    position = 24;
    exceptional = false;
    myriad = false;
    name = "Dynamite Blast";
    quantity = 2;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `Choose either your location or a connecting location. Deal 3 damage to each enemy and to each investigator at the chosen location.`;
    traits = "Tactic.";
    flavor = ``;
    subname = "";


    onPlay(plr: GamePlayer): void {
        const locations = CardRegistry.getAll().filter((e) => e instanceof LocationCard).filter((e) => e === plr.location || plr.location.connects_to.includes(e.symbol))
        giveChoice(plr, locations.map((location) => {
            return {
                text: `Throw dynamite at ${location.name}`,
                outcome: () => {
                    CardRegistry.getAll().filter((enemy) => enemy instanceof EnemyCard && enemy.location === location).forEach((enemy) => (enemy as EnemyCard).takeDamage(3));
                    GameContext.players.filter(otherPlr => otherPlr.location === plr.location).forEach(plr => plr.takeDamage(3, 0))
                }
            }
        }))
    }
}
