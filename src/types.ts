export type Cycle = {
	code: string
	name: string
	position: number
};

export type Pack = {
	code: string
	name: string
	position: number
	cycle_position: number
	available: string
	total: number
	url: string
};

export type Faction = {
	code: string
	name: string
};

export type Card = {
	pack_code: string
	pack_name: string
	type_code: string
	type_name: string
	faction_code: string
	faction_name: string
	position: number
	exceptional: boolean
	myriad: boolean
	code: string
	name: string
	real_name: string
	subname?: string
	cost: number
	text: string
	real_text: string
	quantity: number
	skill_wild?: number
	skill_willpower?: number
	skill_intellect?: number
	skill_combat?: number
	skill_agility?: number
	xp: number
	health?: number
	health_per_investigator: boolean
	sanity?: number
	deck_limit: number
	slot?: string
	real_slot: string
	traits: string[]
	real_traits: string
	flavor?: string
	illustrator: string
	is_unique: boolean
	permanent: boolean
	double_sided: boolean
	back_text?: string
	back_flavor?: string
	url: string
	imagesrc: string
	backimagesrc?: string
	deck_requirements?: DeckRequirements
	deck_options?: DeckOption[]
	restrictions?: Restrictions
	duplicated_by?: string[]
	alternated_by?: string[]
	customization_text?: string
	customization_change?: string
	customization_options?: CustomizationOption[]
	linked_card?: Card
};

type LevelRange = {
	min: number
	max: number
};

type DeckRequirements = {
	size: number
	card: { [k1: string]: { [k2: string]: string } } // TODO: change to flat array
	random: {
		target: string,
		value: string
	}[]
};

type DeckOptionFaction = {
	faction: string[]
	level: LevelRange
	limit?: number
	error?: string
};

type DeckOptionTrait = {
	trait: string[]
	faction?: string[]
	id?: string
	not?: boolean
	type?: string[]
	level?: LevelRange
	size?: number
};

type DeckOptionTag = {
	tag: string[]
	level: LevelRange
	text?: string
};

type DeckOptionFactionSelect = {
	name: string
	faction_select: string[]
	level: LevelRange
	type?: string[]
	limit?: number
	id?: string
};

type DeckOptionDeckSizeSelect = {
	name: string
	deck_size_select: number[]
	faction: string[]
};

type DeckOptionSlot = {
	not: boolean
	slot: string[]
};

type DeckOptionTraitSelect = {
	name: string
	option_select: DeckOptionTrait[]
};

type DeckOptionPermanent = {
	not: boolean
	permanent: boolean
	level: LevelRange
	text: string[]
	error: string
};

type DeckOption =
	DeckOptionFaction |
	DeckOptionTrait |
	DeckOptionTag |
	DeckOptionFactionSelect |
	DeckOptionDeckSizeSelect |
	DeckOptionSlot |
	DeckOptionTraitSelect |
	DeckOptionPermanent
	;

type Restrictions = {
	investigator?: { [k: string]: string } // TODO: change to flat array
};

type CustomizationOption = {
	xp?: number
	text_change?: "append" | "insert" | "replace" | "trait"
	real_text?: string
	tags?: string
	deck_limit?: number
	position?: number
};

export type Taboo = {
	id: number
	code: string
	name: string
	active: number // should be a boolean?
	date_start: string // yyyy-mm-dd
	date_update: string // yyyy-mm-dd
	cards: TabooCard[]
};

type TabooCard = {
	code: string
	xp?: number
	text?: string
	deck_limit?: number
	deck_options?: DeckOption[]
	deck_requirements?: DeckRequirements
	customization_options?: CustomizationOption[]
};
