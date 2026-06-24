
import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { Card, reactions } from "../abstracts/card";
import { WhatHappened } from "shared/game_context";
import { GamePlayer } from "../player";
import { PlayerCard } from "../abstracts/card_inherits/player_card";
import { giveChoice } from "shared/giveChoice";

export class _01532 extends AssetCard {
    slot = "Ally";
    cost = 2;
    skill_agility = 1;
    skill_combat = 0;
    skill_intellect = 0;
    skill_willpower = 0;
    skill_wildcard = 0;
    xp = 0;
    deck_limit = 2;
    code = "01532";
    pack_name = "Revised Core Set";
    type_name = "Asset";
    faction_name = "Seeker";
    position = 32;
    exceptional = false;
    myriad = false;
    name = "Research Librarian";
    quantity = 2;
    health_per_investigator = false;
    is_unique = false;
    permanent = false;
    double_sided = false;
    text = `[reaction] After Research Librarian enters play: Search your deck for a [[Tome]] asset and add it to your hand. Shuffle your deck.`;
    traits = "Ally. Miskatonic.";
    flavor = `"There have been problems at the Orne Library, as we both know, given poor Armitage's condition, and the other, unrelated... incident of a few years ago..."`;
    subname = "";

    reactions: reactions = {
        [WhatHappened.PLAYER_PLAYED_CARD]: {
            reaction: (plr: GamePlayer, card: PlayerCard) => {
                const tomes: Card[] = plr.deck.cards.filter(tome => tome.traits.find("Tome")[0] !== undefined)
                giveChoice(plr, tomes.map(t => {
                    return {
                        text: `Take ${t.name}`,
                        outcome: () => { plr.hand.push(plr.deck.pullSpecific(t) as PlayerCard); plr.update() }
                    }
                }))
            },
            optional: true,
            canUseReaction: (plr: GamePlayer, card: PlayerCard) => { return card === this }
        }
    }
}