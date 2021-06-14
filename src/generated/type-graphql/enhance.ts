import { ClassType } from "type-graphql";
import * as crudResolvers from "./resolvers/crud/resolvers-crud.index";
import * as actionResolvers from "./resolvers/crud/resolvers-actions.index";
import * as relationResolvers from "./resolvers/relations/resolvers.index";
import * as models from "./models";
import * as outputTypes from "./resolvers/outputs";
import * as inputTypes from "./resolvers/inputs";
import * as argsTypes from "./resolvers/crud/args.index";

const crudResolversMap = {
  Conversation: crudResolvers.ConversationCrudResolver,
  Message: crudResolvers.MessageCrudResolver,
  Person: crudResolvers.PersonCrudResolver,
  LastRead: crudResolvers.LastReadCrudResolver,
  Session: crudResolvers.SessionCrudResolver
};
const relationResolversMap = {
  Conversation: relationResolvers.ConversationRelationsResolver,
  Message: relationResolvers.MessageRelationsResolver,
  Person: relationResolvers.PersonRelationsResolver,
  LastRead: relationResolvers.LastReadRelationsResolver
};
const actionResolversMap = {
  Conversation: {
    conversation: actionResolvers.FindUniqueConversationResolver,
    findFirstConversation: actionResolvers.FindFirstConversationResolver,
    conversations: actionResolvers.FindManyConversationResolver,
    createConversation: actionResolvers.CreateConversationResolver,
    deleteConversation: actionResolvers.DeleteConversationResolver,
    updateConversation: actionResolvers.UpdateConversationResolver,
    deleteManyConversation: actionResolvers.DeleteManyConversationResolver,
    updateManyConversation: actionResolvers.UpdateManyConversationResolver,
    upsertConversation: actionResolvers.UpsertConversationResolver,
    aggregateConversation: actionResolvers.AggregateConversationResolver
  },
  Message: {
    message: actionResolvers.FindUniqueMessageResolver,
    findFirstMessage: actionResolvers.FindFirstMessageResolver,
    messages: actionResolvers.FindManyMessageResolver,
    createMessage: actionResolvers.CreateMessageResolver,
    deleteMessage: actionResolvers.DeleteMessageResolver,
    updateMessage: actionResolvers.UpdateMessageResolver,
    deleteManyMessage: actionResolvers.DeleteManyMessageResolver,
    updateManyMessage: actionResolvers.UpdateManyMessageResolver,
    upsertMessage: actionResolvers.UpsertMessageResolver,
    aggregateMessage: actionResolvers.AggregateMessageResolver
  },
  Person: {
    person: actionResolvers.FindUniquePersonResolver,
    findFirstPerson: actionResolvers.FindFirstPersonResolver,
    people: actionResolvers.FindManyPersonResolver,
    createPerson: actionResolvers.CreatePersonResolver,
    deletePerson: actionResolvers.DeletePersonResolver,
    updatePerson: actionResolvers.UpdatePersonResolver,
    deleteManyPerson: actionResolvers.DeleteManyPersonResolver,
    updateManyPerson: actionResolvers.UpdateManyPersonResolver,
    upsertPerson: actionResolvers.UpsertPersonResolver,
    aggregatePerson: actionResolvers.AggregatePersonResolver
  },
  LastRead: {
    lastRead: actionResolvers.FindUniqueLastReadResolver,
    findFirstLastRead: actionResolvers.FindFirstLastReadResolver,
    lastReads: actionResolvers.FindManyLastReadResolver,
    createLastRead: actionResolvers.CreateLastReadResolver,
    deleteLastRead: actionResolvers.DeleteLastReadResolver,
    updateLastRead: actionResolvers.UpdateLastReadResolver,
    deleteManyLastRead: actionResolvers.DeleteManyLastReadResolver,
    updateManyLastRead: actionResolvers.UpdateManyLastReadResolver,
    upsertLastRead: actionResolvers.UpsertLastReadResolver,
    aggregateLastRead: actionResolvers.AggregateLastReadResolver
  },
  Session: {
    session: actionResolvers.FindUniqueSessionResolver,
    findFirstSession: actionResolvers.FindFirstSessionResolver,
    sessions: actionResolvers.FindManySessionResolver,
    createSession: actionResolvers.CreateSessionResolver,
    deleteSession: actionResolvers.DeleteSessionResolver,
    updateSession: actionResolvers.UpdateSessionResolver,
    deleteManySession: actionResolvers.DeleteManySessionResolver,
    updateManySession: actionResolvers.UpdateManySessionResolver,
    upsertSession: actionResolvers.UpsertSessionResolver,
    aggregateSession: actionResolvers.AggregateSessionResolver
  }
};
const resolversInfo = {
  Conversation: ["conversation", "findFirstConversation", "conversations", "createConversation", "deleteConversation", "updateConversation", "deleteManyConversation", "updateManyConversation", "upsertConversation", "aggregateConversation"],
  Message: ["message", "findFirstMessage", "messages", "createMessage", "deleteMessage", "updateMessage", "deleteManyMessage", "updateManyMessage", "upsertMessage", "aggregateMessage"],
  Person: ["person", "findFirstPerson", "people", "createPerson", "deletePerson", "updatePerson", "deleteManyPerson", "updateManyPerson", "upsertPerson", "aggregatePerson"],
  LastRead: ["lastRead", "findFirstLastRead", "lastReads", "createLastRead", "deleteLastRead", "updateLastRead", "deleteManyLastRead", "updateManyLastRead", "upsertLastRead", "aggregateLastRead"],
  Session: ["session", "findFirstSession", "sessions", "createSession", "deleteSession", "updateSession", "deleteManySession", "updateManySession", "upsertSession", "aggregateSession"]
};
const relationResolversInfo = {
  Conversation: ["messages", "lastRead", "participants"],
  Message: ["author", "conversation"],
  Person: ["messages", "lastRead", "conversations"],
  LastRead: ["person", "conversation"]
};
const modelsInfo = {
  Conversation: ["createdAt", "id", "name"],
  Message: ["content", "authorID", "conversationID", "createdAt", "id"],
  Person: ["createdAt", "email", "id", "isAdmin", "lastSeen", "username", "hash"],
  LastRead: ["lastRead", "personID", "conversationID"],
  Session: ["sid", "sess", "expire"]
};
const inputsInfo = {
  ConversationWhereInput: ["AND", "OR", "NOT", "createdAt", "id", "name", "messages", "lastRead", "participants"],
  ConversationOrderByInput: ["createdAt", "id", "name"],
  ConversationWhereUniqueInput: ["id"],
  MessageWhereInput: ["AND", "OR", "NOT", "content", "authorID", "conversationID", "createdAt", "id", "author", "conversation"],
  MessageOrderByInput: ["content", "authorID", "conversationID", "createdAt", "id"],
  MessageWhereUniqueInput: ["id"],
  PersonWhereInput: ["AND", "OR", "NOT", "createdAt", "email", "id", "isAdmin", "lastSeen", "username", "hash", "messages", "lastRead", "conversations"],
  PersonOrderByInput: ["createdAt", "email", "id", "isAdmin", "lastSeen", "username", "hash"],
  PersonWhereUniqueInput: ["email", "id", "username"],
  LastReadWhereInput: ["AND", "OR", "NOT", "lastRead", "personID", "conversationID", "person", "conversation"],
  LastReadOrderByInput: ["lastRead", "personID", "conversationID"],
  LastReadWhereUniqueInput: ["personID_conversationID"],
  SessionWhereInput: ["AND", "OR", "NOT", "sid", "sess", "expire"],
  SessionOrderByInput: ["sid", "sess", "expire"],
  SessionWhereUniqueInput: ["sid"],
  ConversationCreateInput: ["createdAt", "name", "messages", "lastRead", "participants"],
  ConversationUpdateInput: ["createdAt", "name", "messages", "lastRead", "participants"],
  ConversationUpdateManyMutationInput: ["createdAt", "name"],
  MessageCreateInput: ["content", "createdAt", "author", "conversation"],
  MessageUpdateInput: ["content", "createdAt", "author", "conversation"],
  MessageUpdateManyMutationInput: ["content", "createdAt"],
  PersonCreateInput: ["createdAt", "email", "isAdmin", "lastSeen", "username", "hash", "messages", "lastRead", "conversations"],
  PersonUpdateInput: ["createdAt", "email", "isAdmin", "lastSeen", "username", "hash", "messages", "lastRead", "conversations"],
  PersonUpdateManyMutationInput: ["createdAt", "email", "isAdmin", "lastSeen", "username", "hash"],
  LastReadCreateInput: ["lastRead", "person", "conversation"],
  LastReadUpdateInput: ["lastRead", "person", "conversation"],
  LastReadUpdateManyMutationInput: ["lastRead"],
  SessionCreateInput: ["sid", "sess", "expire"],
  SessionUpdateInput: ["sid", "sess", "expire"],
  SessionUpdateManyMutationInput: ["sid", "sess", "expire"],
  DateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  IntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  StringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not"],
  MessageListRelationFilter: ["every", "some", "none"],
  LastReadListRelationFilter: ["every", "some", "none"],
  PersonListRelationFilter: ["every", "some", "none"],
  PersonRelationFilter: ["is", "isNot"],
  ConversationRelationFilter: ["is", "isNot"],
  BoolFilter: ["equals", "not"],
  DateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  ConversationListRelationFilter: ["every", "some", "none"],
  LastReadPersonIDConversationIDCompoundUniqueInput: ["personID", "conversationID"],
  JsonFilter: ["equals", "not"],
  MessageCreateNestedManyWithoutConversationInput: ["create", "connectOrCreate", "connect"],
  LastReadCreateNestedManyWithoutConversationInput: ["create", "connectOrCreate", "connect"],
  PersonCreateNestedManyWithoutConversationsInput: ["create", "connectOrCreate", "connect"],
  DateTimeFieldUpdateOperationsInput: ["set"],
  StringFieldUpdateOperationsInput: ["set"],
  MessageUpdateManyWithoutConversationInput: ["create", "connectOrCreate", "upsert", "connect", "set", "disconnect", "delete", "update", "updateMany", "deleteMany"],
  LastReadUpdateManyWithoutConversationInput: ["create", "connectOrCreate", "upsert", "connect", "set", "disconnect", "delete", "update", "updateMany", "deleteMany"],
  PersonUpdateManyWithoutConversationsInput: ["create", "connectOrCreate", "upsert", "connect", "set", "disconnect", "delete", "update", "updateMany", "deleteMany"],
  IntFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  PersonCreateNestedOneWithoutMessagesInput: ["create", "connectOrCreate", "connect"],
  ConversationCreateNestedOneWithoutMessagesInput: ["create", "connectOrCreate", "connect"],
  PersonUpdateOneRequiredWithoutMessagesInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  ConversationUpdateOneRequiredWithoutMessagesInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  MessageCreateNestedManyWithoutAuthorInput: ["create", "connectOrCreate", "connect"],
  LastReadCreateNestedManyWithoutPersonInput: ["create", "connectOrCreate", "connect"],
  ConversationCreateNestedManyWithoutParticipantsInput: ["create", "connectOrCreate", "connect"],
  BoolFieldUpdateOperationsInput: ["set"],
  NullableDateTimeFieldUpdateOperationsInput: ["set"],
  MessageUpdateManyWithoutAuthorInput: ["create", "connectOrCreate", "upsert", "connect", "set", "disconnect", "delete", "update", "updateMany", "deleteMany"],
  LastReadUpdateManyWithoutPersonInput: ["create", "connectOrCreate", "upsert", "connect", "set", "disconnect", "delete", "update", "updateMany", "deleteMany"],
  ConversationUpdateManyWithoutParticipantsInput: ["create", "connectOrCreate", "upsert", "connect", "set", "disconnect", "delete", "update", "updateMany", "deleteMany"],
  PersonCreateNestedOneWithoutLastReadInput: ["create", "connectOrCreate", "connect"],
  ConversationCreateNestedOneWithoutLastReadInput: ["create", "connectOrCreate", "connect"],
  PersonUpdateOneRequiredWithoutLastReadInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  ConversationUpdateOneRequiredWithoutLastReadInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  NestedDateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedIntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedStringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  NestedBoolFilter: ["equals", "not"],
  NestedDateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  MessageCreateWithoutConversationInput: ["content", "createdAt", "author"],
  MessageCreateOrConnectWithoutConversationInput: ["where", "create"],
  LastReadCreateWithoutConversationInput: ["lastRead", "person"],
  LastReadCreateOrConnectWithoutConversationInput: ["where", "create"],
  PersonCreateWithoutConversationsInput: ["createdAt", "email", "isAdmin", "lastSeen", "username", "hash", "messages", "lastRead"],
  PersonCreateOrConnectWithoutConversationsInput: ["where", "create"],
  MessageUpsertWithWhereUniqueWithoutConversationInput: ["where", "update", "create"],
  MessageUpdateWithWhereUniqueWithoutConversationInput: ["where", "data"],
  MessageUpdateManyWithWhereWithoutConversationInput: ["where", "data"],
  MessageScalarWhereInput: ["AND", "OR", "NOT", "content", "authorID", "conversationID", "createdAt", "id"],
  LastReadUpsertWithWhereUniqueWithoutConversationInput: ["where", "update", "create"],
  LastReadUpdateWithWhereUniqueWithoutConversationInput: ["where", "data"],
  LastReadUpdateManyWithWhereWithoutConversationInput: ["where", "data"],
  LastReadScalarWhereInput: ["AND", "OR", "NOT", "lastRead", "personID", "conversationID"],
  PersonUpsertWithWhereUniqueWithoutConversationsInput: ["where", "update", "create"],
  PersonUpdateWithWhereUniqueWithoutConversationsInput: ["where", "data"],
  PersonUpdateManyWithWhereWithoutConversationsInput: ["where", "data"],
  PersonScalarWhereInput: ["AND", "OR", "NOT", "createdAt", "email", "id", "isAdmin", "lastSeen", "username", "hash"],
  PersonCreateWithoutMessagesInput: ["createdAt", "email", "isAdmin", "lastSeen", "username", "hash", "lastRead", "conversations"],
  PersonCreateOrConnectWithoutMessagesInput: ["where", "create"],
  ConversationCreateWithoutMessagesInput: ["createdAt", "name", "lastRead", "participants"],
  ConversationCreateOrConnectWithoutMessagesInput: ["where", "create"],
  PersonUpsertWithoutMessagesInput: ["update", "create"],
  PersonUpdateWithoutMessagesInput: ["createdAt", "email", "isAdmin", "lastSeen", "username", "hash", "lastRead", "conversations"],
  ConversationUpsertWithoutMessagesInput: ["update", "create"],
  ConversationUpdateWithoutMessagesInput: ["createdAt", "name", "lastRead", "participants"],
  MessageCreateWithoutAuthorInput: ["content", "createdAt", "conversation"],
  MessageCreateOrConnectWithoutAuthorInput: ["where", "create"],
  LastReadCreateWithoutPersonInput: ["lastRead", "conversation"],
  LastReadCreateOrConnectWithoutPersonInput: ["where", "create"],
  ConversationCreateWithoutParticipantsInput: ["createdAt", "name", "messages", "lastRead"],
  ConversationCreateOrConnectWithoutParticipantsInput: ["where", "create"],
  MessageUpsertWithWhereUniqueWithoutAuthorInput: ["where", "update", "create"],
  MessageUpdateWithWhereUniqueWithoutAuthorInput: ["where", "data"],
  MessageUpdateManyWithWhereWithoutAuthorInput: ["where", "data"],
  LastReadUpsertWithWhereUniqueWithoutPersonInput: ["where", "update", "create"],
  LastReadUpdateWithWhereUniqueWithoutPersonInput: ["where", "data"],
  LastReadUpdateManyWithWhereWithoutPersonInput: ["where", "data"],
  ConversationUpsertWithWhereUniqueWithoutParticipantsInput: ["where", "update", "create"],
  ConversationUpdateWithWhereUniqueWithoutParticipantsInput: ["where", "data"],
  ConversationUpdateManyWithWhereWithoutParticipantsInput: ["where", "data"],
  ConversationScalarWhereInput: ["AND", "OR", "NOT", "createdAt", "id", "name"],
  PersonCreateWithoutLastReadInput: ["createdAt", "email", "isAdmin", "lastSeen", "username", "hash", "messages", "conversations"],
  PersonCreateOrConnectWithoutLastReadInput: ["where", "create"],
  ConversationCreateWithoutLastReadInput: ["createdAt", "name", "messages", "participants"],
  ConversationCreateOrConnectWithoutLastReadInput: ["where", "create"],
  PersonUpsertWithoutLastReadInput: ["update", "create"],
  PersonUpdateWithoutLastReadInput: ["createdAt", "email", "isAdmin", "lastSeen", "username", "hash", "messages", "conversations"],
  ConversationUpsertWithoutLastReadInput: ["update", "create"],
  ConversationUpdateWithoutLastReadInput: ["createdAt", "name", "messages", "participants"],
  MessageUpdateWithoutConversationInput: ["content", "createdAt", "author"],
  LastReadUpdateWithoutConversationInput: ["lastRead", "person"],
  PersonUpdateWithoutConversationsInput: ["createdAt", "email", "isAdmin", "lastSeen", "username", "hash", "messages", "lastRead"],
  MessageUpdateWithoutAuthorInput: ["content", "createdAt", "conversation"],
  LastReadUpdateWithoutPersonInput: ["lastRead", "conversation"],
  ConversationUpdateWithoutParticipantsInput: ["createdAt", "name", "messages", "lastRead"]
};
const outputsInfo = {
  Query: ["findFirstConversation", "findManyConversation", "aggregateConversation", "findUniqueConversation", "findFirstMessage", "findManyMessage", "aggregateMessage", "findUniqueMessage", "findFirstPerson", "findManyPerson", "aggregatePerson", "findUniquePerson", "findFirstLastRead", "findManyLastRead", "aggregateLastRead", "findUniqueLastRead", "findFirstSession", "findManySession", "aggregateSession", "findUniqueSession"],
  Mutation: ["createOneConversation", "upsertOneConversation", "deleteOneConversation", "updateOneConversation", "updateManyConversation", "deleteManyConversation", "createOneMessage", "upsertOneMessage", "deleteOneMessage", "updateOneMessage", "updateManyMessage", "deleteManyMessage", "createOnePerson", "upsertOnePerson", "deleteOnePerson", "updateOnePerson", "updateManyPerson", "deleteManyPerson", "createOneLastRead", "upsertOneLastRead", "deleteOneLastRead", "updateOneLastRead", "updateManyLastRead", "deleteManyLastRead", "createOneSession", "upsertOneSession", "deleteOneSession", "updateOneSession", "updateManySession", "deleteManySession", "executeRaw", "queryRaw"],
  AggregateConversation: ["count", "avg", "sum", "min", "max"],
  AggregateMessage: ["count", "avg", "sum", "min", "max"],
  AggregatePerson: ["count", "avg", "sum", "min", "max"],
  AggregateLastRead: ["count", "avg", "sum", "min", "max"],
  AggregateSession: ["count", "min", "max"],
  AffectedRowsOutput: ["count"],
  ConversationCountAggregate: ["createdAt", "id", "name", "_all"],
  ConversationAvgAggregate: ["id"],
  ConversationSumAggregate: ["id"],
  ConversationMinAggregate: ["createdAt", "id", "name"],
  ConversationMaxAggregate: ["createdAt", "id", "name"],
  MessageCountAggregate: ["content", "authorID", "conversationID", "createdAt", "id", "_all"],
  MessageAvgAggregate: ["authorID", "conversationID", "id"],
  MessageSumAggregate: ["authorID", "conversationID", "id"],
  MessageMinAggregate: ["content", "authorID", "conversationID", "createdAt", "id"],
  MessageMaxAggregate: ["content", "authorID", "conversationID", "createdAt", "id"],
  PersonCountAggregate: ["createdAt", "email", "id", "isAdmin", "lastSeen", "username", "hash", "_all"],
  PersonAvgAggregate: ["id"],
  PersonSumAggregate: ["id"],
  PersonMinAggregate: ["createdAt", "email", "id", "isAdmin", "lastSeen", "username", "hash"],
  PersonMaxAggregate: ["createdAt", "email", "id", "isAdmin", "lastSeen", "username", "hash"],
  LastReadCountAggregate: ["lastRead", "personID", "conversationID", "_all"],
  LastReadAvgAggregate: ["personID", "conversationID"],
  LastReadSumAggregate: ["personID", "conversationID"],
  LastReadMinAggregate: ["lastRead", "personID", "conversationID"],
  LastReadMaxAggregate: ["lastRead", "personID", "conversationID"],
  SessionCountAggregate: ["sid", "sess", "expire", "_all"],
  SessionMinAggregate: ["sid", "expire"],
  SessionMaxAggregate: ["sid", "expire"],
  Conversation: ["createdAt", "id", "name", "messages", "lastRead", "participants"],
  Message: ["content", "authorID", "conversationID", "createdAt", "id", "author", "conversation"],
  Person: ["createdAt", "email", "id", "isAdmin", "lastSeen", "username", "hash", "messages", "lastRead", "conversations"],
  LastRead: ["lastRead", "personID", "conversationID", "person", "conversation"],
  Session: ["sid", "sess", "expire"]
};
const argsInfo = {
  FindUniqueConversationArgs: ["where"],
  FindFirstConversationArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyConversationArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateConversationArgs: ["data"],
  DeleteConversationArgs: ["where"],
  UpdateConversationArgs: ["data", "where"],
  DeleteManyConversationArgs: ["where"],
  UpdateManyConversationArgs: ["data", "where"],
  UpsertConversationArgs: ["where", "create", "update"],
  AggregateConversationArgs: ["where", "orderBy", "cursor", "take", "skip"],
  FindUniqueMessageArgs: ["where"],
  FindFirstMessageArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyMessageArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateMessageArgs: ["data"],
  DeleteMessageArgs: ["where"],
  UpdateMessageArgs: ["data", "where"],
  DeleteManyMessageArgs: ["where"],
  UpdateManyMessageArgs: ["data", "where"],
  UpsertMessageArgs: ["where", "create", "update"],
  AggregateMessageArgs: ["where", "orderBy", "cursor", "take", "skip"],
  FindUniquePersonArgs: ["where"],
  FindFirstPersonArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyPersonArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreatePersonArgs: ["data"],
  DeletePersonArgs: ["where"],
  UpdatePersonArgs: ["data", "where"],
  DeleteManyPersonArgs: ["where"],
  UpdateManyPersonArgs: ["data", "where"],
  UpsertPersonArgs: ["where", "create", "update"],
  AggregatePersonArgs: ["where", "orderBy", "cursor", "take", "skip"],
  FindUniqueLastReadArgs: ["where"],
  FindFirstLastReadArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyLastReadArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateLastReadArgs: ["data"],
  DeleteLastReadArgs: ["where"],
  UpdateLastReadArgs: ["data", "where"],
  DeleteManyLastReadArgs: ["where"],
  UpdateManyLastReadArgs: ["data", "where"],
  UpsertLastReadArgs: ["where", "create", "update"],
  AggregateLastReadArgs: ["where", "orderBy", "cursor", "take", "skip"],
  FindUniqueSessionArgs: ["where"],
  FindFirstSessionArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManySessionArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateSessionArgs: ["data"],
  DeleteSessionArgs: ["where"],
  UpdateSessionArgs: ["data", "where"],
  DeleteManySessionArgs: ["where"],
  UpdateManySessionArgs: ["data", "where"],
  UpsertSessionArgs: ["where", "create", "update"],
  AggregateSessionArgs: ["where", "orderBy", "cursor", "take", "skip"]
};

type ResolverModelNames = keyof typeof crudResolversMap;

type ModelResolverActionNames<
  TModel extends ResolverModelNames
  > = keyof typeof crudResolversMap[TModel]["prototype"];

export type ResolverActionsConfig<
  TModel extends ResolverModelNames
  > = Partial<Record<ModelResolverActionNames<TModel> | "_all", MethodDecorator[]>>;

export type ResolversEnhanceMap = {
  [TModel in ResolverModelNames]?: ResolverActionsConfig<TModel>;
};

export function applyResolversEnhanceMap(
  resolversEnhanceMap: ResolversEnhanceMap,
) {
  for (const resolversEnhanceMapKey of Object.keys(resolversEnhanceMap)) {
    const modelName = resolversEnhanceMapKey as keyof typeof resolversEnhanceMap;
    const crudTarget = crudResolversMap[modelName].prototype;
    const resolverActionsConfig = resolversEnhanceMap[modelName]!;
    const actionResolversConfig = actionResolversMap[modelName];
    if (resolverActionsConfig._all) {
      const allActionsDecorators = resolverActionsConfig._all;
      const resolverActionNames = resolversInfo[modelName as keyof typeof resolversInfo];
      for (const resolverActionName of resolverActionNames) {
        const actionTarget = (actionResolversConfig[
          resolverActionName as keyof typeof actionResolversConfig
        ] as Function).prototype;
        for (const allActionsDecorator of allActionsDecorators) {
          allActionsDecorator(
            crudTarget,
            resolverActionName,
            Object.getOwnPropertyDescriptor(crudTarget, resolverActionName)!,
          );
          allActionsDecorator(
            actionTarget,
            resolverActionName,
            Object.getOwnPropertyDescriptor(actionTarget, resolverActionName)!,
          );
        }
      }
    }
    const resolverActionsToApply = Object.keys(resolverActionsConfig).filter(
      it => it !== "_all"
    );
    for (const resolverActionName of resolverActionsToApply) {
      const decorators = resolverActionsConfig[
        resolverActionName as keyof typeof resolverActionsConfig
      ] as MethodDecorator[];
      const actionTarget = (actionResolversConfig[
        resolverActionName as keyof typeof actionResolversConfig
      ] as Function).prototype;
      for (const decorator of decorators) {
        decorator(
          crudTarget,
          resolverActionName,
          Object.getOwnPropertyDescriptor(crudTarget, resolverActionName)!,
        );
        decorator(
          actionTarget,
          resolverActionName,
          Object.getOwnPropertyDescriptor(actionTarget, resolverActionName)!,
        );
      }
    }
  }
}

type RelationResolverModelNames = keyof typeof relationResolversMap;

type RelationResolverActionNames<
  TModel extends RelationResolverModelNames
  > = keyof typeof relationResolversMap[TModel]["prototype"];

export type RelationResolverActionsConfig<TModel extends RelationResolverModelNames>
  = Partial<Record<RelationResolverActionNames<TModel> | "_all", MethodDecorator[]>>;

export type RelationResolversEnhanceMap = {
  [TModel in RelationResolverModelNames]?: RelationResolverActionsConfig<TModel>;
};

export function applyRelationResolversEnhanceMap(
  relationResolversEnhanceMap: RelationResolversEnhanceMap,
) {
  for (const relationResolversEnhanceMapKey of Object.keys(relationResolversEnhanceMap)) {
    const modelName = relationResolversEnhanceMapKey as keyof typeof relationResolversEnhanceMap;
    const relationResolverTarget = relationResolversMap[modelName].prototype;
    const relationResolverActionsConfig = relationResolversEnhanceMap[modelName]!;
    if (relationResolverActionsConfig._all) {
      const allActionsDecorators = relationResolverActionsConfig._all;
      const relationResolverActionNames = relationResolversInfo[modelName as keyof typeof relationResolversInfo];
      for (const relationResolverActionName of relationResolverActionNames) {
        for (const allActionsDecorator of allActionsDecorators) {
          allActionsDecorator(
            relationResolverTarget,
            relationResolverActionName,
            Object.getOwnPropertyDescriptor(relationResolverTarget, relationResolverActionName)!,
          );
        }
      }
    }
    const relationResolverActionsToApply = Object.keys(relationResolverActionsConfig).filter(
      it => it !== "_all"
    );
    for (const relationResolverActionName of relationResolverActionsToApply) {
      const decorators = relationResolverActionsConfig[
        relationResolverActionName as keyof typeof relationResolverActionsConfig
      ] as MethodDecorator[];
      for (const decorator of decorators) {
        decorator(
          relationResolverTarget,
          relationResolverActionName,
          Object.getOwnPropertyDescriptor(relationResolverTarget, relationResolverActionName)!,
        );
      }
    }
  }
}

type TypeConfig = {
  class?: ClassDecorator[];
  fields?: FieldsConfig;
};

type FieldsConfig<TTypeKeys extends string = string> = Partial<
  Record<TTypeKeys | "_all", PropertyDecorator[]>
>;

function applyTypeClassEnhanceConfig<
  TEnhanceConfig extends TypeConfig,
  TType extends object
>(
  enhanceConfig: TEnhanceConfig,
  typeClass: ClassType<TType>,
  typePrototype: TType,
  typeFieldNames: string[]
) {
  if (enhanceConfig.class) {
    for (const decorator of enhanceConfig.class) {
      decorator(typeClass);
    }
  }
  if (enhanceConfig.fields) {
    if (enhanceConfig.fields._all) {
      const allFieldsDecorators = enhanceConfig.fields._all;
      for (const typeFieldName of typeFieldNames) {
        for (const allFieldsDecorator of allFieldsDecorators) {
          allFieldsDecorator(typePrototype, typeFieldName);
        }
      }
    }
    const configFieldsToApply = Object.keys(enhanceConfig.fields).filter(
      it => it !== "_all"
    );
    for (const typeFieldName of configFieldsToApply) {
      const fieldDecorators = enhanceConfig.fields[typeFieldName]!;
      for (const fieldDecorator of fieldDecorators) {
        fieldDecorator(typePrototype, typeFieldName);
      }
    }
  }
}

type ModelNames = keyof typeof models;

type ModelFieldNames<TModel extends ModelNames> = Exclude<
  keyof typeof models[TModel]["prototype"],
  number | symbol
>;

type ModelFieldsConfig<TModel extends ModelNames> = FieldsConfig<
  ModelFieldNames<TModel>
>;

export type ModelConfig<TModel extends ModelNames> = {
  class?: ClassDecorator[];
  fields?: ModelFieldsConfig<TModel>;
};

export type ModelsEnhanceMap = {
  [TModel in ModelNames]?: ModelConfig<TModel>;
};

export function applyModelsEnhanceMap(modelsEnhanceMap: ModelsEnhanceMap) {
  for (const modelsEnhanceMapKey of Object.keys(modelsEnhanceMap)) {
    const modelName = modelsEnhanceMapKey as keyof typeof modelsEnhanceMap;
    const modelConfig = modelsEnhanceMap[modelName]!;
    const modelClass = models[modelName];
    const modelTarget = modelClass.prototype;
    applyTypeClassEnhanceConfig(
      modelConfig,
      modelClass,
      modelTarget,
      modelsInfo[modelName as keyof typeof modelsInfo],
    );
  }
}

type OutputTypesNames = keyof typeof outputTypes;

type OutputTypeFieldNames<TOutput extends OutputTypesNames> = Exclude<
  keyof typeof outputTypes[TOutput]["prototype"],
  number | symbol
>;

type OutputTypeFieldsConfig<
  TOutput extends OutputTypesNames
  > = FieldsConfig<OutputTypeFieldNames<TOutput>>;

export type OutputTypeConfig<TOutput extends OutputTypesNames> = {
  class?: ClassDecorator[];
  fields?: OutputTypeFieldsConfig<TOutput>;
};

export type OutputTypesEnhanceMap = {
  [TOutput in OutputTypesNames]?: OutputTypeConfig<TOutput>;
};

export function applyOutputTypesEnhanceMap(
  outputTypesEnhanceMap: OutputTypesEnhanceMap,
) {
  for (const outputTypeEnhanceMapKey of Object.keys(outputTypesEnhanceMap)) {
    const outputTypeName = outputTypeEnhanceMapKey as keyof typeof outputTypesEnhanceMap;
    const typeConfig = outputTypesEnhanceMap[outputTypeName]!;
    const typeClass = outputTypes[outputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      outputsInfo[outputTypeName as keyof typeof outputsInfo],
    );
  }
}

type InputTypesNames = keyof typeof inputTypes;

type InputTypeFieldNames<TInput extends InputTypesNames> = Exclude<
  keyof typeof inputTypes[TInput]["prototype"],
  number | symbol
>;

type InputTypeFieldsConfig<
  TInput extends InputTypesNames
  > = FieldsConfig<InputTypeFieldNames<TInput>>;

export type InputTypeConfig<TInput extends InputTypesNames> = {
  class?: ClassDecorator[];
  fields?: InputTypeFieldsConfig<TInput>;
};

export type InputTypesEnhanceMap = {
  [TInput in InputTypesNames]?: InputTypeConfig<TInput>;
};

export function applyInputTypesEnhanceMap(
  inputTypesEnhanceMap: InputTypesEnhanceMap,
) {
  for (const inputTypeEnhanceMapKey of Object.keys(inputTypesEnhanceMap)) {
    const inputTypeName = inputTypeEnhanceMapKey as keyof typeof inputTypesEnhanceMap;
    const typeConfig = inputTypesEnhanceMap[inputTypeName]!;
    const typeClass = inputTypes[inputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      inputsInfo[inputTypeName as keyof typeof inputsInfo],
    );
  }
}

type ArgsTypesNames = keyof typeof argsTypes;

type ArgFieldNames<TArgsType extends ArgsTypesNames> = Exclude<
  keyof typeof argsTypes[TArgsType]["prototype"],
  number | symbol
>;

type ArgFieldsConfig<
  TArgsType extends ArgsTypesNames
  > = FieldsConfig<ArgFieldNames<TArgsType>>;

export type ArgConfig<TArgsType extends ArgsTypesNames> = {
  class?: ClassDecorator[];
  fields?: ArgFieldsConfig<TArgsType>;
};

export type ArgsTypesEnhanceMap = {
  [TArgsType in ArgsTypesNames]?: ArgConfig<TArgsType>;
};

export function applyArgsTypesEnhanceMap(
  argsTypesEnhanceMap: ArgsTypesEnhanceMap,
) {
  for (const argsTypesEnhanceMapKey of Object.keys(argsTypesEnhanceMap)) {
    const argsTypeName = argsTypesEnhanceMapKey as keyof typeof argsTypesEnhanceMap;
    const typeConfig = argsTypesEnhanceMap[argsTypeName]!;
    const typeClass = argsTypes[argsTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      argsInfo[argsTypeName as keyof typeof argsInfo],
    );
  }
}







