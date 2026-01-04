import { relations } from 'drizzle-orm';
import { text } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { boolean } from 'drizzle-orm/pg-core';
import { serial } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { users } from 'src/users/schema';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  content: text('content'),
  published: boolean('published').default(false),
  timestamp: timestamp('timestamp').defaultNow(),
  userId: integer('userId').references(() => users.id),
});

export const postReleasion = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));

export const userRelation = relations(users, ({ many }) => ({
  posts: many(posts),
}));
