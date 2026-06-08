import { SoundService } from "@rbxts/services";
import { PlaySound_Sub } from "shared/remotes/PlaySound/Interface";

PlaySound_Sub((soundName) => {
    (SoundService.FindFirstChild(soundName) as Sound).Play()
})