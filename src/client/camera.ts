import { ContextActionService, Workspace } from "@rbxts/services";

const camera = Workspace.CurrentCamera as Camera
let base = Workspace.WaitForChild("base") as Part
camera.CameraType = Enum.CameraType.Scriptable
camera.CFrame = base.CFrame.add(new Vector3(0, 100, 100)).mul(CFrame.fromEulerAngles(math.rad(-60), 0, 0))

function turnCamera(name: string, state: Enum.UserInputState, inputObj: InputObject) {
    if(state === Enum.UserInputState.Begin) { return; }
    camera.CFrame = camera.CFrame.mul(CFrame.fromEulerAngles(math.rad(60), 0, 0)).mul(new CFrame(new Vector3(name === "turnCameraLeft" ? -100 : 100 , 0, -100))).mul(CFrame.fromEulerAngles(0, math.rad(name === "turnCameraLeft" ? -90 : 90), 0)).mul(CFrame.fromEulerAngles(math.rad(-60), 0, 0)); task.wait(0.05)
}

ContextActionService.BindAction("turnCameraLeft", turnCamera, false, Enum.KeyCode.Left)
ContextActionService.BindAction("turnCameraRight", turnCamera, false, Enum.KeyCode.Right)