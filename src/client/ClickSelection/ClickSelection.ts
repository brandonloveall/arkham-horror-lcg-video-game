import { Players, UserInputService } from "@rbxts/services";

let mouse = Players.LocalPlayer.GetMouse()
let selected: Model | undefined = undefined

UserInputService.InputBegan.Connect((input, isProcessed) => {
    if(selected && selected.Parent === undefined) { selected === undefined } // if the model gets deleted (location out of play, enemy defeated, etc)
    // if its not processable, or not a mouse click, or no mouse target, or doesnt have any tags
    if(isProcessed || input.UserInputType !== Enum.UserInputType.MouseButton1 || mouse.Target === undefined || !(mouse.Target.Parent!.GetTags().size())) { return; }
    if(selected && selected.Parent !== undefined) { (selected.WaitForChild("Highlight") as Highlight).Enabled = false }
    if(mouse.Target.Parent!.GetTags().size()) { selected = mouse.Target.Parent! as Model; (selected.WaitForChild("Highlight") as Highlight).Enabled = true } else { selected === undefined }
})

export function getTarget() {
    return selected;
}