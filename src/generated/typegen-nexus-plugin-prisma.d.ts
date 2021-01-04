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
  Session: Prisma.Session
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    conversations: {
      filtering: 'AND' | 'OR' | 'NOT' | 'createdAt' | 'id' | 'name' | 'messages' | 'participants'
      ordering: 'createdAt' | 'id' | 'name'
    }
    messages: {
      filtering: 'AND' | 'OR' | 'NOT' | 'content' | 'authorID' | 'conversationID' | 'createdAt' | 'id' | 'author' | 'conversation'
      ordering: 'content' | 'authorID' | 'conversationID' | 'createdAt' | 'id'
    }
    people: {
      filtering: 'AND' | 'OR' | 'NOT' | 'createdAt' | 'email' | 'id' | 'isAdmin' | 'lastSeen' | 'username' | 'hash' | 'messages' | 'conversations'
      ordering: 'createdAt' | 'email' | 'id' | 'isAdmin' | 'lastSeen' | 'username' | 'hash'
    }
    sessions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'sid' | 'sess' | 'expire'
      ordering: 'sid' | 'sess' | 'expire'
    }
  },
  Conversation: {
    messages: {
      filtering: 'AND' | 'OR' | 'NOT' | 'content' | 'authorID' | 'conversationID' | 'createdAt' | 'id' | 'author' | 'conversation'
      ordering: 'content' | 'authorID' | 'conversationID' | 'createdAt' | 'id'
    }
    participants: {
      filtering: 'AND' | 'OR' | 'NOT' | 'createdAt' | 'email' | 'id' | 'isAdmin' | 'lastSeen' | 'username' | 'hash' | 'messages' | 'conversations'
      ordering: 'createdAt' | 'email' | 'id' | 'isAdmin' | 'lastSeen' | 'username' | 'hash'
    }
  }
  Message: {

  }
  Person: {
    messages: {
      filtering: 'AND' | 'OR' | 'NOT' | 'content' | 'authorID' | 'conversationID' | 'createdAt' | 'id' | 'author' | 'conversation'
      ordering: 'content' | 'authorID' | 'conversationID' | 'createdAt' | 'id'
    }
    conversations: {
      filtering: 'AND' | 'OR' | 'NOT' | 'createdAt' | 'id' | 'name' | 'messages' | 'participants'
      ordering: 'createdAt' | 'id' | 'name'
    }
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
    session: 'Session'
    sessions: 'Session'
  },
  Mutation: {
    createOneConversation: 'Conversation'
    updateOneConversation: 'Conversation'
    updateManyConversation: 'BatchPayload'
    deleteOneConversation: 'Conversation'
    deleteManyConversation: 'BatchPayload'
    upsertOneConversation: 'Conversation'
    createOneMessage: 'Message'
    updateOneMessage: 'Message'
    updateManyMessage: 'BatchPayload'
    deleteOneMessage: 'Message'
    deleteManyMessage: 'BatchPayload'
    upsertOneMessage: 'Message'
    createOnePerson: 'Person'
    updateOnePerson: 'Person'
    updateManyPerson: 'BatchPayload'
    deleteOnePerson: 'Person'
    deleteManyPerson: 'BatchPayload'
    upsertOnePerson: 'Person'
    createOneSession: 'Session'
    updateOneSession: 'Session'
    updateManySession: 'BatchPayload'
    deleteOneSession: 'Session'
    deleteManySession: 'BatchPayload'
    upsertOneSession: 'Session'
  },
  Conversation: {
    createdAt: 'DateTime'
    id: 'Int'
    name: 'String'
    messages: 'Message'
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
    conversations: 'Conversation'
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
  