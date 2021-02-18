import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
    first?: boolean
    last?: boolean
    before?: boolean
    after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime' | 'Json'

// Prisma model type definitions
interface PrismaModels {
  Conversation: Prisma.Conversation
  Message: Prisma.Message
  Person: Prisma.Person
  LastRead: Prisma.LastRead
  Session: Prisma.Session
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    conversations: {
      filtering: 'AND' | 'OR' | 'NOT' | 'createdAt' | 'id' | 'name' | 'messages' | 'lastRead' | 'participants'
      ordering: 'createdAt' | 'id' | 'name'
    }
    messages: {
      filtering: 'AND' | 'OR' | 'NOT' | 'content' | 'authorID' | 'conversationID' | 'createdAt' | 'id' | 'author' | 'conversation'
      ordering: 'content' | 'authorID' | 'conversationID' | 'createdAt' | 'id' | 'author' | 'conversation'
    }
    people: {
      filtering: 'AND' | 'OR' | 'NOT' | 'createdAt' | 'email' | 'id' | 'isAdmin' | 'lastSeen' | 'username' | 'hash' | 'messages' | 'lastRead' | 'conversations'
      ordering: 'createdAt' | 'email' | 'id' | 'isAdmin' | 'lastSeen' | 'username' | 'hash'
    }
    lastReads: {
      filtering: 'AND' | 'OR' | 'NOT' | 'lastRead' | 'personID' | 'conversationID' | 'person' | 'conversation'
      ordering: 'lastRead' | 'personID' | 'conversationID' | 'person' | 'conversation'
    }
    sessions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'sid' | 'sess' | 'expire'
      ordering: 'sid' | 'sess' | 'expire'
    }
  },
  Conversation: {
    messages: {
      filtering: 'AND' | 'OR' | 'NOT' | 'content' | 'authorID' | 'conversationID' | 'createdAt' | 'id' | 'author' | 'conversation'
      ordering: 'content' | 'authorID' | 'conversationID' | 'createdAt' | 'id' | 'author' | 'conversation'
    }
    lastRead: {
      filtering: 'AND' | 'OR' | 'NOT' | 'lastRead' | 'personID' | 'conversationID' | 'person' | 'conversation'
      ordering: 'lastRead' | 'personID' | 'conversationID' | 'person' | 'conversation'
    }
    participants: {
      filtering: 'AND' | 'OR' | 'NOT' | 'createdAt' | 'email' | 'id' | 'isAdmin' | 'lastSeen' | 'username' | 'hash' | 'messages' | 'lastRead' | 'conversations'
      ordering: 'createdAt' | 'email' | 'id' | 'isAdmin' | 'lastSeen' | 'username' | 'hash'
    }
  }
  Message: {

  }
  Person: {
    messages: {
      filtering: 'AND' | 'OR' | 'NOT' | 'content' | 'authorID' | 'conversationID' | 'createdAt' | 'id' | 'author' | 'conversation'
      ordering: 'content' | 'authorID' | 'conversationID' | 'createdAt' | 'id' | 'author' | 'conversation'
    }
    lastRead: {
      filtering: 'AND' | 'OR' | 'NOT' | 'lastRead' | 'personID' | 'conversationID' | 'person' | 'conversation'
      ordering: 'lastRead' | 'personID' | 'conversationID' | 'person' | 'conversation'
    }
    conversations: {
      filtering: 'AND' | 'OR' | 'NOT' | 'createdAt' | 'id' | 'name' | 'messages' | 'lastRead' | 'participants'
      ordering: 'createdAt' | 'id' | 'name'
    }
  }
  LastRead: {

  }
  Session: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    conversation: 'Conversation'
    conversations: 'Conversation'
    message: 'Message'
    messages: 'Message'
    person: 'Person'
    people: 'Person'
    lastRead: 'LastRead'
    lastReads: 'LastRead'
    session: 'Session'
    sessions: 'Session'
  },
  Mutation: {
    createOneConversation: 'Conversation'
    updateOneConversation: 'Conversation'
    updateManyConversation: 'AffectedRowsOutput'
    deleteOneConversation: 'Conversation'
    deleteManyConversation: 'AffectedRowsOutput'
    upsertOneConversation: 'Conversation'
    createOneMessage: 'Message'
    updateOneMessage: 'Message'
    updateManyMessage: 'AffectedRowsOutput'
    deleteOneMessage: 'Message'
    deleteManyMessage: 'AffectedRowsOutput'
    upsertOneMessage: 'Message'
    createOnePerson: 'Person'
    updateOnePerson: 'Person'
    updateManyPerson: 'AffectedRowsOutput'
    deleteOnePerson: 'Person'
    deleteManyPerson: 'AffectedRowsOutput'
    upsertOnePerson: 'Person'
    createOneLastRead: 'LastRead'
    updateOneLastRead: 'LastRead'
    updateManyLastRead: 'AffectedRowsOutput'
    deleteOneLastRead: 'LastRead'
    deleteManyLastRead: 'AffectedRowsOutput'
    upsertOneLastRead: 'LastRead'
    createOneSession: 'Session'
    updateOneSession: 'Session'
    updateManySession: 'AffectedRowsOutput'
    deleteOneSession: 'Session'
    deleteManySession: 'AffectedRowsOutput'
    upsertOneSession: 'Session'
  },
  Conversation: {
    createdAt: 'DateTime'
    id: 'Int'
    name: 'String'
    messages: 'Message'
    lastRead: 'LastRead'
    participants: 'Person'
  }
  Message: {
    content: 'String'
    authorID: 'Int'
    conversationID: 'Int'
    createdAt: 'DateTime'
    id: 'Int'
    author: 'Person'
    conversation: 'Conversation'
  }
  Person: {
    createdAt: 'DateTime'
    email: 'String'
    id: 'Int'
    isAdmin: 'Boolean'
    lastSeen: 'DateTime'
    username: 'String'
    hash: 'String'
    messages: 'Message'
    lastRead: 'LastRead'
    conversations: 'Conversation'
  }
  LastRead: {
    lastRead: 'DateTime'
    personID: 'Int'
    conversationID: 'Int'
    person: 'Person'
    conversation: 'Conversation'
  }
  Session: {
    sid: 'String'
    sess: 'Json'
    expire: 'DateTime'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  Conversation: Typegen.NexusPrismaFields<'Conversation'>
  Message: Typegen.NexusPrismaFields<'Message'>
  Person: Typegen.NexusPrismaFields<'Person'>
  LastRead: Typegen.NexusPrismaFields<'LastRead'>
  Session: Typegen.NexusPrismaFields<'Session'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  