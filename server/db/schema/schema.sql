DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS buddy_requests CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS interests CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS main_goals CASCADE;
DROP TABLE IF EXISTS sub_goals CASCADE;
DROP TABLE IF EXISTS goal_relationship CASCADE;

CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar NOT NULL UNIQUE,
  "email" varchar NOT NULL UNIQUE,
  "password" varchar,
  "created_at" timestamp DEFAULT (now()),
  "buddy_availability" boolean DEFAULT true,
  "buddy_id" integer,
  "is_deleted" boolean DEFAULT false
);

CREATE TABLE "buddy_requests" (
  "id" integer PRIMARY KEY,
  "from_user" integer,
  "to_user" integer,
  "request_message" varchar,
  "is_deleted" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "messages" (
  "id" integer PRIMARY KEY,
  "sender_id" integer,
  "receiver_id" integer,
  "content" varchar,
  "created_at" timestamp DEFAULT (now()),
  "is_deleted" boolean DEFAULT false
);

CREATE TABLE "categories" (
  "id" integer PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "interests" (
  "id" integer PRIMARY KEY,
  "category_id" integer,
  "user_id" integer
);

CREATE TABLE "main_goals" (
  "id" integer PRIMARY KEY,
  "title" varchar,
  "note" text,
  "user_id" integer,
  "category_id" integer,
  "due_date" date DEFAULT null,
  "completed_on" date DEFAULT null,
  "is_deleted" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "sub_goals" (
  "id" integer PRIMARY KEY,
  "main_goal_id" integer NOT NULL,
  "title" varchar,
  "note" text,
  "priority" integer,
  "due_date" date DEFAULT null,
  "completed_on" date DEFAULT null,
  "is_deleted" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "goal_relationship" (
  "id" integer PRIMARY KEY,
  "parent_id" integer NOT NULL,
  "child_id" integer NOT NULL
);

ALTER TABLE "users" ADD FOREIGN KEY ("buddy_id") REFERENCES "users" ("id");

ALTER TABLE "buddy_requests" ADD FOREIGN KEY ("from_user") REFERENCES "users" ("id");

ALTER TABLE "buddy_requests" ADD FOREIGN KEY ("to_user") REFERENCES "users" ("id");

ALTER TABLE "messages" ADD FOREIGN KEY ("sender_id") REFERENCES "users" ("id");

ALTER TABLE "messages" ADD FOREIGN KEY ("receiver_id") REFERENCES "users" ("id");

ALTER TABLE "interests" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "interests" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "main_goals" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "main_goals" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "sub_goals" ADD FOREIGN KEY ("main_goal_id") REFERENCES "main_goals" ("id");

ALTER TABLE "goal_relationship" ADD FOREIGN KEY ("parent_id") REFERENCES "sub_goals" ("id");

ALTER TABLE "goal_relationship" ADD FOREIGN KEY ("child_id") REFERENCES "sub_goals" ("id");
