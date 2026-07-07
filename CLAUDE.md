# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Bloxburg Horror is a fanmade Roblox port of *Arkham Horror: The Card Game* (Fantasy Flight Games). It is written in TypeScript and compiled to Luau via [roblox-ts](https://roblox-ts.com/), then synced into Roblox Studio with [Rojo](https://rojo.space/). The project is mid-rewrite from Luau into TypeScript.

## Commands

```bash
npm run build      # rbxtsc: compile src/ (TypeScript) -> out/ (Luau)
npm run watch      # rbxtsc -w: recompile on change (use this during development)
npx eslint src     # lint (eslint + @typescript-eslint + roblox-ts + prettier rules)
```

- There is **no test framework** in this project — do not look for or invent test commands.
- `out/`, `include/`, and `node_modules/` are gitignored build artifacts; never edit them by hand. Only edit `src/`.
- `rbxtsc` only produces `out/`. A running **Rojo** server (`default.project.json`) is what pushes `out/` into Studio; it is driven by the Rojo VS Code plugin / external Rojo binary, not an npm script here.
- Code style is enforced by `.prettierrc`: **tabs** (width 4), `printWidth` 120, trailing commas everywhere. `formatOnSave` is on in `.vscode`.

## Compilation & project layout (roblox-ts + Rojo)

`default.project.json` maps compiled output into the Roblox DataModel:

| Source        | Compiled to    | Roblox location                              |
| ------------- | -------------- | -------------------------------------------- |
| `src/server`  | `out/server`   | `ServerScriptService.TS`                     |
| `src/shared`  | `out/shared`   | `ReplicatedStorage.TS` (client + server)     |
| `src/client`  | `out/client`   | `StarterPlayer.StarterPlayerScripts.TS`      |

Imports use the `baseUrl: src` root, so `import ... from "shared/..."` resolves to `src/shared/...`. Server/client entry points are `main.server.ts` / `main.client.ts`; both just import modules for their side effects (route registration, UI setup).

Because this compiles to Luau, **roblox-ts idioms apply, not standard JS/TS**:
- Arrays use Luau-backed methods: `.size()` (not `.length`), `.remove(i)`, `.unshift()`, `.push()`, `.indexOf()`.
- Use `task.wait()` / `task.spawn()` and `math.random()` / `math.floor()`, not JS equivalents.
- `Array.from` and similar are unavailable — see the hard-coded 10×10 `game_map` in `game_context.ts` for how this is worked around.
- Tuple returns come back as Luau multi-returns (e.g. `const [passed, byHowMuch] = skillCheck(...)`).

## Core architecture

### Global singletons (server-authoritative)
- **`shared/game_context.ts`** — `GameContext`, the single mutable source of truth for a match: players, act/agenda, chaos bag, encounter deck/discard, `game_map` (10×10 grid of `LocationCard`), `player_with_turn`, `scenario_card`, a `lock` flag (set during reactions/skill checks), and `most_recent_happening`. Also defines the `WhatHappened` enum used throughout the reaction system. Resolutions are 1-indexed to match card naming (R1, R2…); always set them via `setResolutions()`.
- **`shared/card_registry.ts`** — `CardRegistry`, a `Map` of every `Card` instance keyed by its GUID `id`. Every `Card` inserts itself here in its constructor. `CardRegistry.getAll()` is scanned all over (e.g. to find enemies at a location, or cards with reactions). Remotes pass card `id` strings across the client/server boundary and resolve them back to objects via `CardRegistry.get(id)`.

### Game loop (`server/game_manager.ts`)
`start()` builds the hard-coded *Night of the Zealot* scenario (decks, chaos bag, investigator, map placement) and kicks off a phase cycle, each phase `task.spawn`-ing the next:

`investigatorPhase` → `enemyPhase` → `upkeepPhase` → `mythosPhase` → back to `investigatorPhase`.

Player turns block on an `endedTurn` flag toggled by the `EndTurn` remote. Turn/action logic lives on `GamePlayer` (see below), not in the manager.

### Card class hierarchy (`shared/objects/abstracts/`)
Deep inheritance rooted at `Card`. The directory nesting mirrors the inheritance chain (`card_inherits/…`):

```
Card
├─ PlayerCard            (skills, xp, deck_limit)
│  ├─ Investigator
│  ├─ SkillCard
│  └─ CostingCard        (cost, fast?)
│     ├─ AssetCard       (slot, ability())
│     └─ EventCard       (onPlay())
├─ NonplayerCard
│  ├─ StoryCard → ActCard / AgendaCard / LocationCard
│  └─ HostileCard → EnemyCard / TreacheryCard
└─ ScenarioCard
```

Cross-cutting capabilities are plain interfaces (`Damageable`, `Readies` with `is_ready`, `DoubleSided`) that concrete classes `implements`.

### Tangible cards (`shared/objects/tangible_cards/NNNNN.ts`)
Each real card is its own class named `_<code>` (e.g. `_01506` = "Roland's .38 Special"), matching the Arkham card code. They extend the appropriate abstract and fill in the concrete data (`cost`, `text`, `traits`, skill icons…) plus behavior (`ability`, `onPlay`, `reactions`). **To add a card, create a `_NNNNN.ts` here and reference it where the scenario is assembled in `game_manager.ts`.** `belongs_to` links signature cards to an investigator code (blank = usable by anyone).

### Player model (`shared/objects/player.ts`)
`GamePlayer` owns nearly all action logic: `draw`, `takeResource`, `play`, `move`, `investigate`, `fight`, `engage`, `evade`, `activateAbility`, `attemptAdvance`. Actions guard on `this.actions` and fire `performReactions(...)`. Equipment slots (`Hand`/`Arcane`/`Body`/`Ally`/`Accessory`) are enforced by the private `EquipmentSlot` class. **Every state-changing method must call `this.update()`**, which pushes the player's full UI state to the client via `UpdatePlayerUI_Pub`.

### Reactions (`shared/performReactions.ts`)
Triggered abilities are driven by the `WhatHappened` enum. Any in-play card with a `reactions` map keyed by a `WhatHappened` value gets a chance to fire when that event occurs (see `EnemyCard`'s attack-of-opportunity reactions). Non-optional reactions resolve automatically (with a flat 3s window); optional ones present a choice via `giveChoice`. `GameContext.lock` is held during resolution.

### Skill checks (`shared/skillcheck.ts`)
`skillCheck({ initiator, against, using, bonus })` orchestrates the full check: fire `SKILL_CHECK_START` reactions → prompt each player to commit skill cards (`ChooseCards` remote) → pull a chaos token from `GameContext.chaos_bag` → resolve the token (elder sign via the investigator, symbol tokens via `scenario_card.resolve`, which can push `onPass`/`onFail` callbacks) → play the animation → return `[passed, byHowMuch]`.

### Remotes (`shared/remotes/<Group>/<Name>/`)
Client/server messaging follows a strict convention — match it exactly when adding one:
- A **`<Name>.model.json`** (`{ "ClassName": "RemoteEvent" }`) that Rojo materializes as a `RemoteEvent` instance at `ReplicatedStorage.TS.remotes.<Group>.<Name>`.
- An **`Interface.ts`** exporting typed `<Name>_Pub(...)` (fire) and `<Name>_Sub(callback)` (connect) wrappers. Nothing calls `FireServer`/`OnServerEvent` directly outside these interfaces.

Server registers handlers in `server/route_actions.ts` (`*_Sub`), which resolve the acting `Player` to a `GamePlayer` and delegate to its methods. Client UI lives under `src/client/` (each folder wires up one remote / HUD piece; TSX/`jsx: react` is configured for UI but note the client is currently plain-TS).
