import { CardRegistry } from "shared/card_registry"
import { GameContext } from "shared/game_context"
import { giveChoice } from "shared/giveChoice"
import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card"
import { LocationCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card"
import { CostingCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card"
import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card"
import { GamePlayer } from "shared/objects/player"
import { ActivateAbility_Sub, AdvanceAct_Sub, Draw_Sub, Engage_Sub, Evade_Sub, Fight_Sub, GainResource_Sub, Investigate_Sub, Move_Sub, PlayCard_Sub } from "shared/remotes/Actions/Interface"

function getPlrObj(plr: Player) {
    return GameContext.players.find((e) => {
        return e.owner === plr
    })!
}

Draw_Sub((plr) => {
    const plrObj = getPlrObj(plr)

    plrObj.draw()
})

Engage_Sub((plr) => {
    const plrObj = getPlrObj(plr)
    const enemies = CardRegistry.getAll().filter((e) => e instanceof EnemyCard && plrObj.location === e.location)

    giveChoice(plrObj, enemies.map(e => {
        return {
            text: `Engage ${e.name}`,
            outcome: () => getPlrObj(plr).engage(e as EnemyCard)
        }
    }))
})

Evade_Sub((plr) => {
    const plrObj = getPlrObj(plr)
    const enemies = CardRegistry.getAll().filter(e => e instanceof EnemyCard && e.engagedWith === plrObj)

    giveChoice(plrObj, enemies.map(e => {
        return {
            text: `Evade ${e.name}`,
            outcome: () => plrObj.evade(e as EnemyCard)
        }
    }))
})

Fight_Sub((plr) => {
    const plrObj = getPlrObj(plr)
    const enemies = CardRegistry.getAll().filter(e => e instanceof EnemyCard && e.location === plrObj.location)

    giveChoice(plrObj, enemies.map(e => {
        return {
            text: `Fight ${e.name}`,
            outcome: () =>plrObj.fight({
                enemy: e as EnemyCard,
                skill: "skill_combat"
            })
        }
    }))
})

GainResource_Sub((plr) => {
    getPlrObj(plr).takeResource()
})

Investigate_Sub((plr) => {
    const plrObj = getPlrObj(plr)
    plrObj.investigate({
        location: plrObj.location,
        skill: "skill_intellect"
    })
})

Move_Sub(plr => {
    const plrObj = getPlrObj(plr)
    const locations = CardRegistry.getAll().filter(l => l instanceof LocationCard && plrObj.location.connects_to.includes(l.symbol))

    giveChoice(plrObj, locations.map(l => {
        return {
            text: `Move to ${l.name}`,
            outcome: () => plrObj.move(l as LocationCard)
        }
    }))
})

PlayCard_Sub((plr: Player, card_id: unknown) => {
    getPlrObj(plr).play(CardRegistry.get(card_id as string) as CostingCard)
})

ActivateAbility_Sub((plr, card_id) => {
    const card = CardRegistry.get(card_id as string) as AssetCard
    getPlrObj(plr).activateAbility((gameplr: GamePlayer) => card.ability(gameplr), card.text.find("[action]") === undefined)
})

AdvanceAct_Sub((plr) => {
    getPlrObj(plr).attemptAdvance()
})