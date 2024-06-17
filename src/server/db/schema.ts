import {
  boolean,
  char,
  integer,
  pgTableCreator,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `obol_${name}`);

export const cycles = createTable(
  "cycle",
  {
    code: varchar("code", { length: 16 }).primaryKey(),
    name: varchar("name", { length: 256 }).notNull().unique(),
    position: integer("position").notNull().unique(),
  }
);

export const packs = createTable(
  "pack",
  {
    code: varchar("code", { length: 16 }).primaryKey(),
    name: varchar("name", { length: 256 }).notNull().unique(),
    position: integer("position").notNull().unique(),
    cycle_code: varchar("cycle_code", { length: 16 }).notNull().references(() => cycles.code),
  }
);

export const types = createTable(
  "type",
  {
    code: varchar("code", { length: 16 }).primaryKey(),
    name: varchar("name", { length: 256 }).notNull().unique(),
  }
);

export const factions = createTable(
  "faction",
  {
    code: varchar("code", { length: 16 }).primaryKey(),
    name: varchar("name", { length: 256 }).notNull().unique(),
  }
);

export const cards = createTable(
  "card",
  {
    code: char("code", { length: 5 }).primaryKey(),
    pack_code: varchar("pack_code", { length: 16 }).notNull().references(() => packs.code),
    type_code: varchar("type_code", { length: 16 }).notNull().references(() => types.code),
    faction_code: varchar("faction_code", { length: 16 }).notNull().references(() => factions.code),
    position: integer("position").notNull(),
    exceptional: boolean("exceptional"),
    myriad: boolean("myriad"),
    name: varchar("name", { length: 256 }).notNull(),
    subname: varchar("subname", { length: 256 }),
    cost: integer("cost"),
    text: varchar("name", { length: 256 }).notNull(),
    quantity: integer("quantity").notNull(),
    skill_wild: integer("skill_wild"),
    skill_willpower: integer("skill_willpower"),
    skill_intellect: integer("skill_intellect"),
    skill_combat: integer("skill_combat"),
    skill_agility: integer("skill_agility"),
    xp: integer("xp"),
    health: integer("health"),
    santity: integer("sanity"),
    deck_limit: integer("deck_limit").notNull(),
    slot: varchar("pack_code", { length: 16 }),
    flavor: varchar("flavor", { length: 256 }),
    illustrator: varchar("illustrator", { length: 256 }),
    is_unique: boolean("is_unique"),
    permanent: boolean("permanent"),
    double_sided: boolean("double_sided"),
    back_text: varchar("back_text", { length: 256 }),
    back_flavor: varchar("back_flavor", { length: 256 }),
    imagesrc: varchar("imagesrc", { length: 256 }),
    backimagesrc: varchar("backimagesrc", { length: 256 }),
  }
);

export const cardTraits = createTable(
  "card_traits",
  {
    card_code: char("card_code", { length: 5 }).notNull().references(() => cards.code),
    trait: varchar("trait", { length: 256 }).notNull(),
  }
);

// export const cardDeckRequirements = createTable(
//   "card_deck_requirements", {}
// );

// export const cardDeckOptions = createTable(
//   "card_deck_options", {}
// );

// export const cardRestrictions = createTable(
//   "card_restrictions", {}
// );

// export const cardDuplicatedBy = createTable(
//   "card_duplicated_by", {}
// );

// export const cardAlternatedBy = createTable(
//   "card_alternated_by", {}
// );

// export const cardCustomizationOptions = createTable(
//   "card_customization_options", {}
// );

// export const releases = createTable(
//   "release",
//   {
//     id: serial("id").primaryKey(),
//     code: varchar("code", { length: 256 }).notNull().unique(),
//     name: varchar("name", { length: 256 }).notNull().unique(),
//     cycleId: integer("cycleId").notNull().references(() => cycles.id),
//     position: integer("position").notNull(),
//   },
//   (t) => ({
//     unq: unique().on(t.cycleId, t.position),
//   })
// );

// export const cards = createTable(
//   "card",
//   {
//     id: serial("id").primaryKey(),
//     code: char("code", { length: 5 }).notNull().unique(),
//     name: varchar("name", { length: 256 }).notNull(),
//     subtitle: varchar("name", { length: 256 }),
//     cycleId: integer("cycleId").notNull().references(() => cycles.id),
//     releaseId: integer("releaseId").notNull().references(() => releases.id),
//     position: integer("position").notNull(),
//     type: varchar("type", { length: 256 }).$type<CardType>().notNull(),
//   },
//   (t) => ({
//     unq: unique().on(t.releaseId, t.position),
//     nameIndex: index().on(t.name),
//   })
// );

// export const cardsRelations = relations(cards, ({ many }) => ({
//   cardsToTraits: many(cardsToTraits)
// }));

// export const traits = createTable(
//   "trait",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 256 }).$type<CardTrait>().notNull().unique(),
//   },
//   (t) => ({
//     nameIndex: index().on(t.name),
//   })
// );

// export const traitsRelations = relations(traits, ({ many }) => ({
//   cardsToTraits: many(cardsToTraits)
// }));

// export const cardsToTraits = createTable(
//   "cards_to_traits",
//   {
//     cardId: integer("cardId").notNull().references(() => cards.id),
//     traitId: integer("traitId").notNull().references(() => traits.id),
//   },
//   (t) => ({
//     pk: primaryKey({ columns: [t.cardId, t.traitId] }),
//   })
// );
