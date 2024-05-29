import {
  char,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { CardTrait, CardType } from "../types";

export const createTable = pgTableCreator((name) => `obol_${name}`);

export const cycles = createTable(
  "cycle",
  {
    id: serial("id").primaryKey(),
    code: varchar("code", { length: 16 }).unique(),
    name: varchar("name", { length: 64 }).notNull().unique(),
    position: integer("position").notNull().unique(),
  }
);

export const releases = createTable(
  "release",
  {
    id: serial("id").primaryKey(),
    code: varchar("code", { length: 16 }).primaryKey(),
    name: varchar("name", { length: 64 }).notNull().unique(),
    cycleId: integer("cycleId").notNull().references(() => cycles.id),
    position: integer("position").notNull(),
  },
  (t) => ({
    unq: unique().on(t.cycleId, t.position),
  })
);

export const cards = createTable(
  "card",
  {
    id: serial("id").primaryKey(),
    code: char("code", { length: 5 }).unique(),
    name: varchar("name", { length: 128 }).notNull(),
    subtitle: varchar("name", { length: 64 }),
    cycleId: integer("cycleId").notNull().references(() => cycles.id),
    releaseId: integer("releaseId").notNull().references(() => releases.id),
    position: integer("position").notNull(),
    type: varchar("type", { length: 16 }).$type<CardType>().notNull(),
  },
  (t) => ({
    unq: unique().on(t.releaseId, t.position),
    nameIndex: index().on(t.name),
  })
);

export const traits = createTable(
  "trait",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 32 }).$type<CardTrait>().notNull().unique(),
  },
  (t) => ({
    nameIndex: index().on(t.name),
  })
);

export const cardsToTraits = createTable(
  "cards_to_traits",
  {
    cardId: integer("cardId").notNull().references(() => cards.id),
    traitId: integer("traitId").notNull().references(() => traits.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.cardId, t.traitId] }),
  })
);
