import { GameContext } from "./game_context";
import { Server_PayClues_Pub, Server_PayClues_Sub } from "./remotes/PayClues/Interface";

let payments: Record<string, number> = {}
let finished = 0

Server_PayClues_Sub((plr, paid) => {
    payments[plr.Name] = paid
    finished++
})

export function payClues() { 
    const required = GameContext.act.clues;

    payments = {};
    finished = 0;

    let total = 0;

    Server_PayClues_Pub();

    do { task.wait() } while (finished !== GameContext.players.size())


    for (const plr of GameContext.players) {
        total += payments[plr.owner.Name];
    }

    if (total < required) { return false; }

    for (const plr of GameContext.players) {
        plr.clues -= payments[plr.owner.Name];
    }

    return true;
}