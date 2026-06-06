import { ActCard } from "./objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/act_card";
import { AgendaCard } from "./objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/agenda_card";
import { LocationCard } from "./objects/abstracts/card_inherits/nonplayer_card_inherits/story_card_inherits/location_card";
import { ChaosBag } from "./objects/chaos_bag";
import { Deck } from "./objects/deck";
import { GamePlayer } from "./objects/player";
import { _01105 } from "./objects/tangible_cards/01105";
import { _01108 } from "./objects/tangible_cards/01108";

export enum GameState {
    NONE,

    PlayerTurn_Began,
    PlayerTurn_InProgress,
    Playerturn_Ended,
}

let dudAgenda = new _01105();
let dudAct = new _01108()
let dudBag = new ChaosBag([0]);
let dudDeck = new Deck([]);

export const GameContext: {
    current_game_state: GameState,
    players: GamePlayer[],
    agenda: AgendaCard,
    act: ActCard,
    chaos_bag: ChaosBag,
    encounter_deck: Deck,
    game_map: (LocationCard | undefined)[][],
    player_with_turn: GamePlayer | undefined
} = {
    current_game_state: GameState.NONE,
    players: [],
    agenda: dudAgenda,
    act: dudAct,
    chaos_bag: dudBag,
    encounter_deck: dudDeck,
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
    player_with_turn: undefined
}