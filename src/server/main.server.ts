import { start } from "./game_manager";
import { UpdatePlayerUI_Pub } from "shared/remotes/UpdatePlayerUI/Interface";
import "../shared/remotes/Actions/Interface"

wait(5)

let plr = start()
UpdatePlayerUI_Pub(plr)