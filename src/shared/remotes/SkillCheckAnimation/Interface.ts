import { ReplicatedStorage } from "@rbxts/services";
import { IconToken } from "shared/objects/chaos_bag";

const SkillCheckAnimation = ReplicatedStorage.WaitForChild("TS").WaitForChild("remotes").WaitForChild("SkillCheckAnimation").WaitForChild("SkillCheckAnimation") as RemoteEvent

export function SkillCheckAnimation_Pub(investigatorStat: number, commitTotal: number, pulledToken: number | IconToken, finalValue?: number) {
    SkillCheckAnimation.FireAllClients(investigatorStat, commitTotal, pulledToken, finalValue)
}

export function SkillCheckAnimation_Sub(callback: (plr: Player, investigatorStat: number, commitTotal: number, pulledToken: number | IconToken, finalValue?: number) => void) {
    SkillCheckAnimation.FireAllClients(callback)
}