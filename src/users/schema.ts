import { relations } from 'drizzle-orm';
import { text } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { primaryKey } from 'drizzle-orm/pg-core';
import { boolean } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { serial } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique(),
  password: text('password'),
});

export const profile = pgTable('profile', {
  id: serial('id').primaryKey(),
  age: integer('age'),
  biography: text('biography'),
  userId: integer('userId').references(() => users.id),
  timestamp: timestamp('timestamp').defaultNow(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  content: text('content'),
  published: boolean('published').default(false),
  timestamp: timestamp('timestamp').defaultNow(),
  userId: integer('userId').references(() => users.id),
  reaction: boolean().default(false),
});

export const catagories = pgTable('catagories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const post_to_catagories = pgTable(
  'post_to_catagories',
  {
    post_id: integer('post_id')
      .notNull()
      .references(() => posts.id),
    catagory_id: integer('catagory_id')
      .notNull()
      .references(() => catagories.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.post_id, t.catagory_id] }),
  }),
);

//=============================================================

export const userRelation = relations(users, ({ many, one }) => ({
  posts: many(posts),
  profile: one(profile),
}));

export const postReleasion = relations(posts, ({ many, one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  post_to_catagories: many(post_to_catagories),
}));

export const profile_relation = relations(profile, ({ one }) => ({
  user: one(users, {
    fields: [profile.userId],
    references: [users.id],
  }),
}));

export const catagories_relation = relations(catagories, ({ many }) => ({
  post_to_catagories: many(post_to_catagories),
}));

export const post_to_catagories_relation = relations(
  post_to_catagories,
  ({ one }) => ({
    post: one(posts, {
      fields: [post_to_catagories.post_id],
      references: [posts.id],
    }),
    catagory: one(catagories, {
      fields: [post_to_catagories.catagory_id],
      references: [catagories.id],
    }),
  }),
);
