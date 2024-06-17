# Old Book of Lore

## Data relationships

- GET /api/public/card/{card_code}.json
- GET /api/public/cards/
- GET /api/public/cards/{pack_code}.json
- GET /api/public/factions/
- GET /api/public/faq/{card_code}.json
- GET /api/public/packs/
- GET /api/public/taboos/

pack.cycle_position -> cycle.position
card.pack_code -> pack.code
card.faction_code -> faction.code

// Might make sense to mutate card.traits from a string into an array

cycle (_no API_)

- position: number
- name: string
- code: string
- id: number

pack

- name: string
- code: string
- position: number // position within its cycle
- cycle_position: number // used for cycle grouping
- available: date ("yyyy-mm-dd")
- known: number
- total: number
- url: string
- id: number

faction

- code: string
- name: string
- is_primary: boolean
- octgn_id: null

taboo

- id: number
- code: string
- name: string
- active: number
- date_start: date ("yyyy-mm-dd")
- date_update: date ("yyyy-mm-dd")
- cards: string (JSON blob) => object[]
  { code: string, xp: number }
  { code: string, text: string }
  { code: string, deck_limit: number, text: string }

trait (_no API_)

- name: string

card

- pack_code: string
- pack_name: string
- type_code: string
- type_name: string
- faction_code: string
- faction_name: string
- position: number
- exceptional: boolean
- myriad: boolean
- code: string
- name: string
- real_name: string
- subname: string
- cost: number
- text: string
- real_text: string
- quantity: number
- skill_wild: number
- skill_willpower: number
- skill_intellect: number
- skill_combat: number
- skill_agility: number
- xp: number
- health: number
- health_per_investigator: boolean
- sanity: number
- deck_limit: number
- slot: string
- real_slot: string
- traits: string
- real_traits: string
- flavor: string
- illustrator: string
- is_unique: boolean
- permanent: boolean
- double_sided: boolean
- back_text: string
- back_flavor: string
- octgn_id: string
- url: string
- imagesrc: string
- backimagesrc: string
- deck_requirements: object
  {
  size: number,
  card: {
  {card_code}: {
  {card_code}: {card_code}
  }
  },
  random: {
  target: string,
  value: string
  }
  }
- deck_options: {}
- restrictions: {}
- duplicated_by: string[]
- alternated_by: string[]
- customization_text: string
- customization_change: string
- customization_options: object[]
  { xp, text_change }
  { xp, real_text, tags, text_change }
  { xp, text_change, position }
  { xp, deck_limit, text_change, position }

```
\u003C < Less-than sign
\u003E > Greater-than sign

function unicodeToChar(text) {
   return text.replace(/\\u[\dA-F]{4}/gi,
          function (match) {
               return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
          });
}
```

### String tokens

- `[{token}]` (icon replacement)
  - action
  - fast
  - combat
  - reaction
  - skull
  - cultist
  - tablet
  - elder_thing
  - auto_fail
  - elder_sign
  - survivor
  - guardian
  - seeker
  - rogue
  - mystic
  - agility
  - strength
  - intellect
  - willpower
  - wild
  - bless
  - curse
- `[[{token}]]` (card traits, bold italic)
  - Traits
  - Item
  - Elite
  - Traits
  - Charm
  - Firearm
  - Upgrade
  - Humanoid
  - Weapon
  - Ally

## Views

- [ ] Deck gallery
- [ ] Deck readonly view (modal+fullpage)
- [ ] Deck builder

## TODO

- [x] Make it deploy
- [ ] Initial pass at data structure
- [ ] Scaffold basic UI with mock data
- [ ] Set up a database
- [ ] Attach database to UI
- [ ] Error management (sentry)
- [ ] Add authentication (clerk)
- [ ] Analytics (posthog)
