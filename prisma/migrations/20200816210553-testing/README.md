# Migration `20200816210553-testing`

This migration has been generated at 8/16/2020, 11:05:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "test_7cn4Z5556b3qx_RXzs0S_"."conversation" (
"created_at" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"id" SERIAL,
"name" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "test_7cn4Z5556b3qx_RXzs0S_"."message" (
"content" text  NOT NULL ,
"author_id" integer   ,
"conversation_id" integer  NOT NULL ,
"created_at" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"id" SERIAL,
PRIMARY KEY ("id"))

CREATE TABLE "test_7cn4Z5556b3qx_RXzs0S_"."person" (
"created_at" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"email" text  NOT NULL ,
"id" SERIAL,
"is_active" boolean  NOT NULL DEFAULT true,
"is_admin" boolean   ,
"last_seen" timestamp(3)   ,
"username" text  NOT NULL ,
"hash" text  NOT NULL ,
"salt" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "test_7cn4Z5556b3qx_RXzs0S_"."session" (
"sid" text  NOT NULL ,
"sess" jsonb  NOT NULL ,
"expire" timestamp(3)  NOT NULL ,
PRIMARY KEY ("sid"))

CREATE TABLE "test_7cn4Z5556b3qx_RXzs0S_"."_ConversationToPerson" (
"A" integer  NOT NULL ,
"B" integer  NOT NULL )

CREATE UNIQUE INDEX "person.email_unique" ON "test_7cn4Z5556b3qx_RXzs0S_"."person"("email")

CREATE UNIQUE INDEX "person.username_unique" ON "test_7cn4Z5556b3qx_RXzs0S_"."person"("username")

CREATE UNIQUE INDEX "_ConversationToPerson_AB_unique" ON "test_7cn4Z5556b3qx_RXzs0S_"."_ConversationToPerson"("A","B")

CREATE  INDEX "_ConversationToPerson_B_index" ON "test_7cn4Z5556b3qx_RXzs0S_"."_ConversationToPerson"("B")

ALTER TABLE "test_7cn4Z5556b3qx_RXzs0S_"."message" ADD FOREIGN KEY ("author_id")REFERENCES "test_7cn4Z5556b3qx_RXzs0S_"."person"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "test_7cn4Z5556b3qx_RXzs0S_"."message" ADD FOREIGN KEY ("conversation_id")REFERENCES "test_7cn4Z5556b3qx_RXzs0S_"."conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "test_7cn4Z5556b3qx_RXzs0S_"."_ConversationToPerson" ADD FOREIGN KEY ("A")REFERENCES "test_7cn4Z5556b3qx_RXzs0S_"."conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "test_7cn4Z5556b3qx_RXzs0S_"."_ConversationToPerson" ADD FOREIGN KEY ("B")REFERENCES "test_7cn4Z5556b3qx_RXzs0S_"."person"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200816210553-testing
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,54 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model Conversation {
+  createdAt    DateTime  @default(now()) @map("created_at")
+  id           Int       @default(autoincrement()) @id
+  name         String
+  messages     Message[]
+  participants Person[]  @relation("ConversationToPerson", references: [id])
+
+  @@map(name: "conversation")
+}
+
+model Message {
+  content        String
+  authorID       Int?         @map("author_id")
+  conversationID Int          @map("conversation_id")
+  createdAt      DateTime     @default(now()) @map("created_at")
+  id             Int          @default(autoincrement()) @id
+  author         Person?      @relation(fields: [authorID], references: [id])
+  conversation   Conversation @relation(fields: [conversationID], references: [id])
+
+  @@map(name: "message")
+}
+
+model Person {
+  createdAt     DateTime       @default(now()) @map("created_at")
+  email         String         @unique
+  id            Int            @default(autoincrement()) @id
+  isActive      Boolean        @default(true) @map("is_active")
+  isAdmin       Boolean?       @map("is_admin")
+  lastSeen      DateTime?      @map("last_seen")
+  username      String         @unique
+  hash          String
+  salt          String
+  messages      Message[]
+  conversations Conversation[] @relation("ConversationToPerson", references: [id])
+
+  @@map(name: "person")
+}
+
+model Session {
+  sid    String   @id
+  sess   Json
+  expire DateTime
+
+  @@map(name: "session")
+}
```


