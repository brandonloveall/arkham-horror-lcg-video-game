import { Server_GiveChoice_Pub, Server_GiveChoice_Sub } from "./remotes/GiveChoice/Interface"
import { GamePlayer } from "./objects/player"
import { GameContext } from "./game_context";

export type Choice = {
    text: string,
    outcome: () => void
}

let finished = false;
let _choiceIndex = 0

Server_GiveChoice_Sub((plr, choiceIndex) => { finished = true; choiceIndex = _choiceIndex })

export function giveChoice(who: GamePlayer, choices: Choice[]) {
    GameContext.lock = true
    finished = false
    Server_GiveChoice_Pub(who, choices)

    do { task.wait() } while(!finished)

    choices[_choiceIndex].outcome()
    GameContext.lock = false
}