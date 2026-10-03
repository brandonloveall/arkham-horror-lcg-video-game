import { Players } from "@rbxts/services";
import { CardType, Faction } from "shared/card_database_types";
import { EnemyCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/enemy_card";
import { TreacheryCard } from "shared/objects/abstracts/card_inherits/nonplayer_card_inherits/hostile_card_inherits/treachery_card";
import { AssetCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/asset_card";
import { EventCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/costing_card_inherits/event_card";
import { SkillCard } from "shared/objects/abstracts/card_inherits/player_card_inherits/skill_card";

const templates = Players.LocalPlayer.WaitForChild("PlayerGui")
	.WaitForChild("GuiElements")
	.WaitForChild("CardTemplates");

const assetTemplate = templates.WaitForChild("asset") as Frame;
const eventTemplate = templates.WaitForChild("event") as Frame;
const skillTemplate = templates.WaitForChild("skill") as Frame;

const treacheryTemplate = templates.WaitForChild("treachery") as Frame;

const typeToImg: Partial<Record<Faction, Partial<Record<CardType, string>>>> = {
	[Faction.Guardian]: {
		[CardType.Asset]: "86668953294664",
		[CardType.Event]: "99521914994493",
		[CardType.Skill]: "92828316198179",
	},

	[Faction.Neutral]: {
		[CardType.Asset]: "134367911044409",
		[CardType.Event]: "125716371037130",
		[CardType.Skill]: "97449947036764",
	},

	[Faction.Seeker]: {
		[CardType.Asset]: "118483290954479",
		[CardType.Event]: "70400239518809",
		[CardType.Skill]: "140339178631637",
	},

	[Faction.Mythos]: {
		[CardType.Treachery]: "112064146731154",
	},
};

class CardGuiMaker {
	static createCardGui(card: AssetCard | EventCard | SkillCard | EnemyCard | TreacheryCard, backingShown?: boolean) {
		let template!: Frame;
		if (card.type_name === CardType.Asset) {
			template = assetTemplate.Clone();
			(template.WaitForChild("cost") as TextLabel).Text = tostring((card as AssetCard).cost);
		}
		if (card.type_name === CardType.Event) {
			template = eventTemplate.Clone();
			(template.WaitForChild("cost") as TextLabel).Text = tostring((card as EventCard).cost);
		}
		if (card.type_name === CardType.Skill) {
			template = skillTemplate.Clone();
		}
		if (card.type_name === CardType.Treachery) {
			template = treacheryTemplate.Clone();
		}

		(template.WaitForChild("title") as TextLabel).Text = card.name;
		(template.WaitForChild("description") as TextLabel).Text = card.text;
		(template.WaitForChild("attributes") as TextLabel).Text = card.traits;

		(template.WaitForChild("Background") as ImageLabel).Image =
			"rbxassetid://" + tostring(typeToImg[card.faction_name]![card.type_name]!);

		(template.WaitForChild("backing") as ImageLabel).Visible = !!backingShown;
		return template;
	}
}

export default CardGuiMaker;
