import { ContextActionService, RunService, UserInputService, Workspace } from "@rbxts/services";

const rod = Workspace.WaitForChild("rod") as BasePart;
const camerahold = Workspace.WaitForChild("camerahold") as BasePart;
const cambase = Workspace.WaitForChild("cambase") as BasePart;
const map = Workspace.WaitForChild("map") as BasePart;

let camera = Workspace.CurrentCamera as Camera;
camera.CameraType = Enum.CameraType.Scriptable;

Workspace.GetPropertyChangedSignal("CurrentCamera").Connect(() => {
	const current = Workspace.CurrentCamera;
	if (current === undefined) return;
	camera = current;
	camera.CameraType = Enum.CameraType.Scriptable;
});

const PAN_SPEED = 60;
const SLIDE_STEP = 5;
const END_MARGIN = 10;
const SENSITIVITY = 0.006;
const MIN_ELEVATION = math.rad(5);
const MAX_ELEVATION = math.rad(89);

for (const part of [cambase, rod, camerahold]) {
	part.Anchored = true;
}

function longestAxis(size: Vector3) {
	if (size.Y >= size.X && size.Y >= size.Z) return new Vector3(0, 1, 0);
	if (size.Z >= size.X) return new Vector3(0, 0, 1);
	return new Vector3(1, 0, 0);
}

let rodAxis = longestAxis(rod.Size);
const rodLength = rod.Size.Dot(rodAxis);
if (rod.CFrame.PointToObjectSpace(cambase.Position).Dot(rodAxis) > 0) {
	rodAxis = rodAxis.mul(-1);
}

const initialBaseCFrame = cambase.CFrame;
const rodOffset = initialBaseCFrame.Inverse().mul(rod.CFrame);
const holdLocal = rod.CFrame.PointToObjectSpace(camerahold.Position);
const holdSideways = holdLocal.sub(rodAxis.mul(holdLocal.Dot(rodAxis)));
const holdRotation = rod.CFrame.Rotation.Inverse().mul(camerahold.CFrame.Rotation);
const minSlide = math.min(END_MARGIN, rodLength);

const rodDirection = rod.CFrame.VectorToWorldSpace(rodAxis);
const pitchRadius = math.sqrt(rodDirection.Y * rodDirection.Y + rodDirection.Z * rodDirection.Z);
const pitchPhase = math.atan2(rodDirection.Z, rodDirection.Y);
const initialElevation = math.asin(math.clamp(rodDirection.Y, -1, 1));

function pitchForElevation(elevation: number) {
	if (pitchRadius < 0.001) return 0;
	const offset = math.acos(math.clamp(math.sin(elevation) / pitchRadius, -1, 1));
	return pitchPhase < 0 ? -pitchPhase - offset : -pitchPhase + offset;
}

const pitchAtTop = pitchForElevation(MAX_ELEVATION);
const pitchAtBottom = pitchForElevation(math.min(MIN_ELEVATION, initialElevation));
const minPitch = math.min(pitchAtTop, pitchAtBottom);
const maxPitch = math.max(pitchAtTop, pitchAtBottom);

const mapHalfX = map.Size.X / 2;
const mapHalfZ = map.Size.Z / 2;

function clampToMap(position: Vector3) {
	const mapLocal = map.CFrame.PointToObjectSpace(position);
	const x = math.clamp(mapLocal.X, -mapHalfX, mapHalfX);
	const z = math.clamp(mapLocal.Z, -mapHalfZ, mapHalfZ);
	const world = map.CFrame.PointToWorldSpace(new Vector3(x, mapLocal.Y, z));
	return new Vector3(world.X, position.Y, world.Z);
}

let basePosition = clampToMap(initialBaseCFrame.Position);
let yaw = 0;
let pitch = 0;
let slide = math.clamp(holdLocal.Dot(rodAxis) + rodLength / 2, minSlide, rodLength);
let rotating = false;

const held = { forward: false, back: false, left: false, right: false };

function onRigKey(_name: string, state: Enum.UserInputState, input: InputObject) {
	const pressed = state === Enum.UserInputState.Begin;
	const key = input.KeyCode;
	if (key === Enum.KeyCode.W) held.forward = pressed;
	else if (key === Enum.KeyCode.S) held.back = pressed;
	else if (key === Enum.KeyCode.A) held.left = pressed;
	else if (key === Enum.KeyCode.D) held.right = pressed;
}

ContextActionService.BindAction(
	"moveCameraRig",
	onRigKey,
	false,
	Enum.KeyCode.W,
	Enum.KeyCode.A,
	Enum.KeyCode.S,
	Enum.KeyCode.D,
);

UserInputService.InputBegan.Connect((input, processed) => {
	if (processed || input.UserInputType !== Enum.UserInputType.MouseButton2) return;
	rotating = true;
	UserInputService.MouseBehavior = Enum.MouseBehavior.LockCurrentPosition;
});

UserInputService.InputEnded.Connect((input) => {
	if (input.UserInputType !== Enum.UserInputType.MouseButton2) return;
	rotating = false;
	UserInputService.MouseBehavior = Enum.MouseBehavior.Default;
});

UserInputService.InputChanged.Connect((input, processed) => {
	if (input.UserInputType === Enum.UserInputType.MouseWheel) {
		if (processed) return;
		slide = math.clamp(slide - input.Position.Z * SLIDE_STEP, minSlide, rodLength);
	} else if (rotating && input.UserInputType === Enum.UserInputType.MouseMovement) {
		yaw -= input.Delta.X * SENSITIVITY;
		pitch = math.clamp(pitch - input.Delta.Y * SENSITIVITY, minPitch, maxPitch);
	}
});

function groundForward() {
	const cframe = camerahold.CFrame;
	let flat = new Vector3(cframe.LookVector.X, 0, cframe.LookVector.Z);
	if (flat.Magnitude < 0.001) {
		flat = new Vector3(cframe.UpVector.X, 0, cframe.UpVector.Z);
	}
	return flat.Magnitude < 0.001 ? new Vector3(0, 0, -1) : flat.Unit;
}

RunService.RenderStepped.Connect((deltaTime) => {
	const forward = groundForward();
	const right = new Vector3(-forward.Z, 0, forward.X);

	const forwardInput = (held.forward ? 1 : 0) - (held.back ? 1 : 0);
	const rightInput = (held.right ? 1 : 0) - (held.left ? 1 : 0);
	if (forwardInput !== 0 || rightInput !== 0) {
		const direction = forward.mul(forwardInput).add(right.mul(rightInput)).Unit;
		basePosition = clampToMap(basePosition.add(direction.mul(PAN_SPEED * deltaTime)));
	}

	const baseCFrame = new CFrame(basePosition)
		.mul(CFrame.Angles(0, yaw, 0))
		.mul(CFrame.Angles(pitch, 0, 0))
		.mul(initialBaseCFrame.Rotation);
	const rodCFrame = baseCFrame.mul(rodOffset);
	const holdPosition = holdSideways.add(rodAxis.mul(slide - rodLength / 2));

	cambase.CFrame = baseCFrame;
	rod.CFrame = rodCFrame;
	camerahold.CFrame = rodCFrame.mul(new CFrame(holdPosition)).mul(holdRotation);
	camera.CFrame = camerahold.CFrame;
});
