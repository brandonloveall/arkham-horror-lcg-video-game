import { ContextActionService, Workspace } from "@rbxts/services";

task.wait(0.3);

const camera = Workspace.CurrentCamera as Camera;
const base = Workspace.WaitForChild("base") as Part;
camera.CameraType = Enum.CameraType.Scriptable;

camera.CFrame = base.CFrame.add(new Vector3(0, 200, 200)).mul(CFrame.fromEulerAngles(math.rad(-50), 0, 0));

function turnCamera(name: string, state: Enum.UserInputState) {
	if (state === Enum.UserInputState.Begin) {
		return;
	}
	camera.CFrame = camera.CFrame.mul(CFrame.fromEulerAngles(math.rad(50), 0, 0))
		.mul(new CFrame(new Vector3(name === "turnCameraLeft" ? -200 : 200, 0, -200)))
		.mul(CFrame.fromEulerAngles(0, math.rad(name === "turnCameraLeft" ? -90 : 90), 0))
		.mul(CFrame.fromEulerAngles(math.rad(-50), 0, 0));
	task.wait(0.05);
}

ContextActionService.BindAction("turnCameraLeft", turnCamera, false, Enum.KeyCode.Q);
ContextActionService.BindAction("turnCameraRight", turnCamera, false, Enum.KeyCode.E);
