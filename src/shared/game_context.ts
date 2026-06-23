import { ActCard } from "./objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/act_card";
import { AgendaCard } from "./objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/agenda_card";
import { LocationCard } from "./objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card";
import { ScenarioCard } from "./objects/abstracts/card_inherits/scenario_card";
import { ChaosBag } from "./objects/chaos_bag";
import { Deck } from "./objects/deck";
import { GamePlayer } from "./objects/player";

export enum WhatHappened {
    ENEMY_ATTACKED,
    ENEMY_DEFEATED,

    PLAYER_MOVED,
    PLAYER_DREW_CARD,
    PLAYER_TOOK_RESOURCE,
    PLAYER_ACTIVATED_ABILITY,
    PLAYER_INVESTIGATED,
    PLAYER_PLAYED_CARD,
    PLAYER_FOUGHT,
    PLAYER_ENGAGED_ENEMY,
    PLAYER_EVADED_ENEMY,

    SKILL_CHECK_START,
    SKILL_CHECK_ENDED,
    PLAYER_TURN_BEGAN,
    PLAYER_TURN_ENDED,

    ROUND_ENDED,
    ASSET_DAMAGED
}

export enum PlayerWithTurn {
    Self,
    Other
}

export const GameContext: {
    players: GamePlayer[],
    agenda?: AgendaCard,
    act?: ActCard,
    chaos_bag?: ChaosBag,
    encounter_deck?: Deck,
    game_map: (LocationCard | undefined)[][],
    player_with_turn: GamePlayer | undefined,
    encounter_discard: Deck,
    lock: boolean,
    scenario_card: ScenarioCard | undefined,
    resolutions: ((() => void) | undefined)[] // resolutions are 1-indexed to match the naming scheme (R1, R2, etc), so use the setResolutions func
} = {
    players: [],
    agenda: undefined,
    act: undefined,
    chaos_bag: undefined,
    encounter_deck: undefined,
    game_map: [ // Hard coded to be a 10x10 grid. Array.from not available in Luau, so have to hard code it
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
    ],
    player_with_turn: undefined,
    encounter_discard: new Deck([]),
    lock: false,
    scenario_card: undefined,
    resolutions: [undefined]
}

export function setResolutions(resolutions: (() => void)[]) {
    GameContext.resolutions = [undefined, ...resolutions]
}