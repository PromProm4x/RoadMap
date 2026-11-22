import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userLearningStateTable = pgTable("user_learning_state", {
  userId: text("user_id").primaryKey(),
  state: jsonb("state").$type<Record<string, unknown>>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type UserLearningState = typeof userLearningStateTable.$inferSelect;
