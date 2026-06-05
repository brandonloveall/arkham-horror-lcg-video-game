import { Players, UserInputService } from "@rbxts/services";

let mouse = Players.LocalPlayer.GetMouse()
let selected: Model

UserInputService.InputBegan.Connect((input, isProcessed) => {
    // if its not processable, or not a mouse click, or no mouse target, or doesnt have any tags
    if(isProcessed || input.UserInputType !== Enum.UserInputType.MouseButton1 || mouse.Target === undefined || !(mouse.Target.Parent!.GetTags().size())) { return; }

    selected = mouse.Target.Parent! as Model
})

export function getTarget() {
    return selected;
}