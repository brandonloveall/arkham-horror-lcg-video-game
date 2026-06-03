import { GamePlayer } from "./objects/player";

export enum GameState {
    NONE,

    PlayerTurn_Began,
    PlayerTurn_InProgress,
    Playerturn_Ended,
}

interface GameContext {
    current_game_state: GameState,
    players: GamePlayer[]
}

export const GameContext = {
    current_game_state: GameState.NONE,
    players: [],
} satisfies GameContext