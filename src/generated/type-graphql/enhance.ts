import { ClassType } from "type-graphql";
import * as tslib from "tslib";
import * as crudResolvers from "./resolvers/crud/resolvers-crud.index";
import * as argsTypes from "./resolvers/crud/args.index";
import * as actionResolvers from "./resolvers/crud/resolvers-actions.index";
import * as relationResolvers from "./resolvers/relations/resolvers.index";
import * as models from "./models";
import * as outputTypes from "./resolvers/outputs";
import * as inputTypes from "./resolvers/inputs";

const crudResolversMap = {
  Conversation: crudResolvers.ConversationCrudResolver,
  Message: crudResolvers.MessageCrudResolver,
  Person: crudResolvers.PersonCrudResolver,
  LastRead: crudResolvers.LastReadCrudResolver,
  Session: crudResolvers.SessionCrudResolver
};
const actionResolversMap = {
  Conversation: {
    conversation: actionResolvers.FindUniqueConversationResolver,
    findFirstConversation: actionResolvers.FindFirstConversationResolver,
    conversations: actionResolvers.FindManyConversationResolver,
    createConversation: actionResolvers.CreateConversationResolver,
    createManyConversation: actionResolvers.CreateManyConversationResolver,
    deleteConversation: actionResolvers.DeleteConversationResolver,
    updateConversation: actionResolvers.UpdateConversationResolver,
    deleteManyConversation: actionResolvers.DeleteManyConversationResolver,
    updateManyConversation: actionResolvers.UpdateManyConversationResolver,
    upsertConversation: actionResolvers.UpsertConversationResolver,
    aggregateConversation: actionResolvers.AggregateConversationResolver,
    groupByConversation: actionResolvers.GroupByConversationResolver
  },
  Message: {
    message: actionResolvers.FindUniqueMessageResolver,
    findFirstMessage: actionResolvers.FindFirstMessageResolver,
    messages: actionResolvers.FindManyMessageResolver,
    createMessage: actionResolvers.CreateMessageResolver,
    createManyMessage: actionResolvers.CreateManyMessageResolver,
    deleteMessage: actionResolvers.DeleteMessageResolver,
    updateMessage: actionResolvers.UpdateMessageResolver,
    deleteManyMessage: actionResolvers.DeleteManyMessageResolver,
    updateManyMessage: actionResolvers.UpdateManyMessageResolver,
    upsertMessage: actionResolvers.UpsertMessageResolver,
    aggregateMessage: actionResolvers.AggregateMessageResolver,
    groupByMessage: actionResolvers.GroupByMessageResolver
  },
  Person: {
    person: actionResolvers.FindUniquePersonResolver,
    findFirstPerson: actionResolvers.FindFirstPersonResolver,
    people: actionResolvers.FindManyPersonResolver,
    createPerson: actionResolvers.CreatePersonResolver,
    createManyPerson: actionResolvers.CreateManyPersonResolver,
    deletePerson: actionResolvers.DeletePersonResolver,
    updatePerson: actionResolvers.UpdatePersonResolver,
    deleteManyPerson: actionResolvers.DeleteManyPersonResolver,
    updateManyPerson: actionResolvers.UpdateManyPersonResolver,
    upsertPerson: actionResolvers.UpsertPersonResolver,
    aggregatePerson: actionResolvers.AggregatePersonResolver,
    groupByPerson: actionResolvers.GroupByPersonResolver
  },
  LastRead: {
    lastRead: actionResolvers.FindUniqueLastReadResolver,
    findFirstLastRead: actionResolvers.FindFirstLastReadResolver,
    lastReads: actionResolvers.FindManyLastReadResolver,
    createLastRead: actionResolvers.CreateLastReadResolver,
    createManyLastRead: actionResolvers.CreateManyLastReadResolver,
    deleteLastRead: actionResolvers.DeleteLastReadResolver,
    updateLastRead: actionResolvers.UpdateLastReadResolver,
    deleteManyLastRead: actionResolvers.DeleteManyLastReadResolver,
    updateManyLastRead: actionResolvers.UpdateManyLastReadResolver,
    upsertLastRead: actionResolvers.UpsertLastReadResolver,
    aggregateLastRead: actionResolvers.AggregateLastReadResolver,
    groupByLastRead: actionResolvers.GroupByLastReadResolver
  },
  Session: {
    session: actionResolvers.FindUniqueSessionResolver,
    findFirstSession: actionResolvers.FindFirstSessionResolver,
    sessions: actionResolvers.FindManySessionResolver,
    createSession: actionResolvers.CreateSessionResolver,
    createManySession: actionResolvers.CreateManySessionResolver,
    deleteSession: actionResolvers.DeleteSessionResolver,
    updateSession: actionResolvers.UpdateSessionResolver,
    deleteManySession: actionResolvers.DeleteManySessionResolver,
    updateManySession: actionResolvers.UpdateManySessionResolver,
    upsertSession: actionResolvers.UpsertSessionResolver,
    aggregateSession: actionResolvers.AggregateSessionResolver,
    groupBySession: actionResolvers.GroupBySessionResolver
  }
};
const crudResolversInfo = {
  Conversation: ["conversation", "findFirstConversation", "conversations", "createConversation", "createManyConversation", "deleteConversation", "updateConversation", "deleteManyConversation", "updateManyConversation", "upsertConversation", "aggregateConversation", "groupByConversation"],
  Message: ["message", "findFirstMessage", "messages", "createMessage", "createManyMessage", "deleteMessage", "updateMessage", "deleteManyMessage", "updateManyMessage", "upsertMessage", "aggregateMessage", "groupByMessage"],
  Person: ["person", "findFirstPerson", "people", "createPerson", "createManyPerson", "deletePerson", "updatePerson", "deleteManyPerson", "updateManyPerson", "upsertPerson", "aggregatePerson", "groupByPerson"],
  LastRead: ["lastRead", "findFirstLastRead", "lastReads", "createLastRead", "createManyLastRead", "deleteLastRead", "updateLastRead", "deleteManyLastRead", "updateManyLastRead", "upsertLastRead", "aggregateLastRead", "groupByLastRead"],
  Session: ["session", "findFirstSession", "sessions", "createSession", "createManySession", "deleteSession", "updateSession", "deleteManySession", "updateManySession", "upsertSession", "aggregateSession", "groupBySession"]
};
const argsInfo = {
  FindUniqueConversationArgs: ["where"],
  FindFirstConversationArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyConversationArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateConversationArgs: ["data"],
  CreateManyConversationArgs: ["data", "skipDuplicates"],
  DeleteConversationArgs: ["where"],
  UpdateConversationArgs: ["data", "where"],
  DeleteManyConversationArgs: ["where"],
  UpdateManyConversationArgs: ["data", "where"],
  UpsertConversationArgs: ["where", "create", "update"],
  AggregateConversationArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByConversationArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueMessageArgs: ["where"],
  FindFirstMessageArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyMessageArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateMessageArgs: ["data"],
  CreateManyMessageArgs: ["data", "skipDuplicates"],
  DeleteMessageArgs: ["where"],
  UpdateMessageArgs: ["data", "where"],
  DeleteManyMessageArgs: ["where"],
  UpdateManyMessageArgs: ["data", "where"],
  UpsertMessageArgs: ["where", "create", "update"],
  AggregateMessageArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByMessageArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniquePersonArgs: ["where"],
  FindFirstPersonArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyPersonArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreatePersonArgs: ["data"],
  CreateManyPersonArgs: ["data", "skipDuplicates"],
  DeletePersonArgs: ["where"],
  UpdatePersonArgs: ["data", "where"],
  DeleteManyPersonArgs: ["where"],
  UpdateManyPersonArgs: ["data", "where"],
  UpsertPersonArgs: ["where", "create", "update"],
  AggregatePersonArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByPersonArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueLastReadArgs: ["where"],
  FindFirstLastReadArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyLastReadArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateLastReadArgs: ["data"],
  CreateManyLastReadArgs: ["data", "skipDuplicates"],
  DeleteLastReadArgs: ["where"],
  UpdateLastReadArgs: ["data", "where"],
  DeleteManyLastReadArgs: ["where"],
  UpdateManyLastReadArgs: ["data", "where"],
  UpsertLastReadArgs: ["where", "create", "update"],
  AggregateLastReadArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupByLastReadArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  FindUniqueSessionArgs: ["where"],
  FindFirstSessionArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManySessionArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  CreateSessionArgs: ["data"],
  CreateManySessionArgs: ["data", "skipDuplicates"],
  DeleteSessionArgs: ["where"],
  UpdateSessionArgs: ["data", "where"],
  DeleteManySessionArgs: ["where"],
  UpdateManySessionArgs: ["data", "where"],
  UpsertSessionArgs: ["where", "create", "update"],
  AggregateSessionArgs: ["where", "orderBy", "cursor", "take", "skip"],
  GroupBySessionArgs: ["where", "orderBy", "by", "having", "take", "skip"]
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
      const resolverActionNames = crudResolversInfo[modelName as keyof typeof crudResolversInfo];
      for (const resolverActionName of resolverActionNames) {
        const actionTarget = (actionResolversConfig[
          resolverActionName as keyof typeof actionResolversConfig
        ] as Function).prototype;
        tslib.__decorate(allActionsDecorators, crudTarget, resolverActionName, null);
        tslib.__decorate(allActionsDecorators, actionTarget, resolverActionName, null);
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
      tslib.__decorate(decorators, crudTarget, resolverActionName, null);
      tslib.__decorate(decorators, actionTarget, resolverActionName, null);
    }
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

const relationResolversMap = {
  Conversation: relationResolvers.ConversationRelationsResolver,
  Message: relationResolvers.MessageRelationsResolver,
  Person: relationResolvers.PersonRelationsResolver,
  LastRead: relationResolvers.LastReadRelationsResolver
};
const relationResolversInfo = {
  Conversation: ["messages", "lastRead", "participants"],
  Message: ["author", "conversation"],
  Person: ["messages", "lastRead", "conversations"],
  LastRead: ["person", "conversation"]
};

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
        tslib.__decorate(allActionsDecorators, relationResolverTarget, relationResolverActionName, null);
      }
    }
    const relationResolverActionsToApply = Object.keys(relationResolverActionsConfig).filter(
      it => it !== "_all"
    );
    for (const relationResolverActionName of relationResolverActionsToApply) {
      const decorators = relationResolverActionsConfig[
        relationResolverActionName as keyof typeof relationResolverActionsConfig
      ] as MethodDecorator[];
      tslib.__decorate(decorators, relationResolverTarget, relationResolverActionName, null);
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
    tslib.__decorate(enhanceConfig.class, typeClass);
  }
  if (enhanceConfig.fields) {
    if (enhanceConfig.fields._all) {
      const allFieldsDecorators = enhanceConfig.fields._all;
      for (const typeFieldName of typeFieldNames) {
        tslib.__decorate(allFieldsDecorators, typePrototype, typeFieldName, void 0);
      }
    }
    const configFieldsToApply = Object.keys(enhanceConfig.fields).filter(
      it => it !== "_all"
    );
    for (const typeFieldName of configFieldsToApply) {
      const fieldDecorators = enhanceConfig.fields[typeFieldName]!;
      tslib.__decorate(fieldDecorators, typePrototype, typeFieldName, void 0);
    }
  }
}

const modelsInfo = {
  Conversation: ["createdAt", "id", "name"],
  Message: ["content", "authorID", "conversationID", "createdAt", "id"],
  Person: ["createdAt", "email", "id", "isAdmin", "lastSeen", "username", "hash"],
  LastRead: ["lastRead", "personID", "conversationID"],
  Session: ["sid", "sess", "expire"]
};

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

const outputsInfo = {
  AggregateConversation: ["_count", "_avg", "_sum", "_min", "_max"],
  ConversationGroupBy: ["createdAt", "id", "name", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateMessage: ["_count", "_avg", "_sum", "_min", "_max"],
  MessageGroupBy: ["content", "authorID", "conversationID", "createdAt", "id", "_count", "_avg", "_sum", "_min", "_max"],
  AggregatePerson: ["_count", "_avg", "_sum", "_min", "_max"],
  PersonGroupBy: ["createdAt", "email", "id", "isAdmin", "lastSeen", "username", "hash", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateLastRead: ["_count", "_avg", "_sum", "_min", "_max"],
  LastReadGroupBy: ["lastRead", "personID", "conversationID", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateSession: ["_count", "_min", "_max"],
  SessionGroupBy: ["sid", "sess", "expire", "_count", "_min", "_max"],
  AffectedRowsOutput: ["count"],
  ConversationCount: ["messages", "lastRead", "participants"],
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
  PersonCount: ["messages", "lastRead", "conversations"],
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
  SessionMaxAggregate: ["sid", "expire"]
};

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

const inputsInfo = {
  ConversationWhereInput: ["AND", "OR", "NOT", "createdAt", "id", "name", "messages", "lastRead", "participants"],
  ConversationOrderByWithRelationInput: ["createdAt", "id", "name", "messages", "lastRead", "participants"],
  ConversationWhereUniqueInput: ["id"],
  ConversationOrderByWithAggregationInput: ["createdAt", "id", "name", "_count", "_avg", "_max", "_min", "_sum"],
  ConversationScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "createdAt", "id", "name"],
  MessageWhereInput: ["AND", "OR", "NOT", "content", "authorID", "conversationID", "createdAt", "id", "author", "conversation"],
  MessageOrderByWithRelationInput: ["content", "authorID", "conversationID", "createdAt", "id", "author", "conversation"],
  MessageWhereUniqueInput: ["id"],
  MessageOrderByWithAggregationInput: ["content", "authorID", "conversationID", "createdAt", "id", "_count", "_avg", "_max", "_min", "_sum"],
  MessageScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "content", "authorID", "conversationID", "createdAt", "id"],
  PersonWhereInput: ["AND", "OR", "NOT", "createdAt", "email", "id", "isAdmin", "lastSeen", "username", "hash", "messages", "lastRead", "conversations"],
  PersonOrderByWithRelationInput: ["createdAt", "email", "id", "isAdmin", "lastSeen", "username", "hash", "messages", "lastRead", "conversations"],
  PersonWhereUniqueInput: ["email", "id", "username"],
  PersonOrderByWithAggregationInput: ["createdAt", "email", "id", "isAdmin", "lastSeen", "username", "hash", "_count", "_avg", "_max", "_min", "_sum"],
  PersonScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "createdAt", "email", "id", "isAdmin", "lastSeen", "username", "hash"],
  LastReadWhereInput: ["AND", "OR", "NOT", "lastRead", "personID", "conversationID", "person", "conversation"],
  LastReadOrderByWithRelationInput: ["lastRead", "personID", "conversationID", "person", "conversation"],
  LastReadWhereUniqueInput: ["personID_conversationID"],
  LastReadOrderByWithAggregationInput: ["lastRead", "personID", "conversationID", "_count", "_avg", "_max", "_min", "_sum"],
  LastReadScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "lastRead", "personID", "conversationID"],
  SessionWhereInput: ["AND", "OR", "NOT", "sid", "sess", "expire"],
  SessionOrderByWithRelationInput: ["sid", "sess", "expire"],
  SessionWhereUniqueInput: ["sid"],
  SessionOrderByWithAggregationInput: ["sid", "sess", "expire", "_count", "_max", "_min"],
  SessionScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "sid", "sess", "expire"],
  ConversationCreateInput: ["createdAt", "name", "messages", "lastRead", "participants"],
  ConversationUpdateInput: ["createdAt", "name", "messages", "lastRead", "participants"],
  ConversationCreateManyInput: ["createdAt", "id", "name"],
  ConversationUpdateManyMutationInput: ["createdAt", "name"],
  MessageCreateInput: ["content", "createdAt", "author", "conversation"],
  MessageUpdateInput: ["content", "createdAt", "author", "conversation"],
  MessageCreateManyInput: ["content", "authorID", "conversationID", "createdAt", "id"],
  MessageUpdateManyMutationInput: ["content", "createdAt"],
  PersonCreateInput: ["createdAt", "email", "isAdmin", "lastSeen", "username", "hash", "messages", "lastRead", "conversations"],
  PersonUpdateInput: ["createdAt", "email", "isAdmin", "lastSeen", "username", "hash", "messages", "lastRead", "conversations"],
  PersonCreateManyInput: ["createdAt", "email", "id", "isAdmin", "lastSeen", "username", "hash"],
  PersonUpdateManyMutationInput: ["createdAt", "email", "isAdmin", "lastSeen", "username", "hash"],
  LastReadCreateInput: ["lastRead", "person", "conversation"],
  LastReadUpdateInput: ["lastRead", "person", "conversation"],
  LastReadCreateManyInput: ["lastRead", "personID", "conversationID"],
  LastReadUpdateManyMutationInput: ["lastRead"],
  SessionCreateInput: ["sid", "sess", "expire"],
  SessionUpdateInput: ["sid", "sess", "expire"],
  SessionCreateManyInput: ["sid", "sess", "expire"],
  SessionUpdateManyMutationInput: ["sid", "sess", "expire"],
  DateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  IntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  StringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not"],
  MessageListRelationFilter: ["every", "some", "none"],
  LastReadListRelationFilter: ["every", "some", "none"],
  PersonListRelationFilter: ["every", "some", "none"],
  MessageOrderByRelationAggregateInput: ["_count"],
  LastReadOrderByRelationAggregateInput: ["_count"],
  PersonOrderByRelationAggregateInput: ["_count"],
  ConversationCountOrderByAggregateInput: ["createdAt", "id", "name"],
  ConversationAvgOrderByAggregateInput: ["id"],
  ConversationMaxOrderByAggregateInput: ["createdAt", "id", "name"],
  ConversationMinOrderByAggregateInput: ["createdAt", "id", "name"],
  ConversationSumOrderByAggregateInput: ["id"],
  DateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  IntWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  StringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not", "_count", "_min", "_max"],
  PersonRelationFilter: ["is", "isNot"],
  ConversationRelationFilter: ["is", "isNot"],
  MessageCountOrderByAggregateInput: ["content", "authorID", "conversationID", "createdAt", "id"],
  MessageAvgOrderByAggregateInput: ["authorID", "conversationID", "id"],
  MessageMaxOrderByAggregateInput: ["content", "authorID", "conversationID", "createdAt", "id"],
  MessageMinOrderByAggregateInput: ["content", "authorID", "conversationID", "createdAt", "id"],
  MessageSumOrderByAggregateInput: ["authorID", "conversationID", "id"],
  BoolFilter: ["equals", "not"],
  DateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  ConversationListRelationFilter: ["every", "some", "none"],
  ConversationOrderByRelationAggregateInput: ["_count"],
  PersonCountOrderByAggregateInput: ["createdAt", "email", "id", "isAdmin", "lastSeen", "username", "hash"],
  PersonAvgOrderByAggregateInput: ["id"],
  PersonMaxOrderByAggregateInput: ["createdAt", "email", "id", "isAdmin", "lastSeen", "username", "hash"],
  PersonMinOrderByAggregateInput: ["createdAt", "email", "id", "isAdmin", "lastSeen", "username", "hash"],
  PersonSumOrderByAggregateInput: ["id"],
  BoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  DateTimeNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  LastReadPersonIDConversationIDCompoundUniqueInput: ["personID", "conversationID"],
  LastReadCountOrderByAggregateInput: ["lastRead", "personID", "conversationID"],
  LastReadAvgOrderByAggregateInput: ["personID", "conversationID"],
  LastReadMaxOrderByAggregateInput: ["lastRead", "personID", "conversationID"],
  LastReadMinOrderByAggregateInput: ["lastRead", "personID", "conversationID"],
  LastReadSumOrderByAggregateInput: ["personID", "conversationID"],
  JsonFilter: ["equals", "not"],
  SessionCountOrderByAggregateInput: ["sid", "sess", "expire"],
  SessionMaxOrderByAggregateInput: ["sid", "expire"],
  SessionMinOrderByAggregateInput: ["sid", "expire"],
  JsonWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  MessageCreateNestedManyWithoutConversationInput: ["create", "connectOrCreate", "createMany", "connect"],
  LastReadCreateNestedManyWithoutConversationInput: ["create", "connectOrCreate", "createMany", "connect"],
  PersonCreateNestedManyWithoutConversationsInput: ["create", "connectOrCreate", "connect"],
  DateTimeFieldUpdateOperationsInput: ["set"],
  StringFieldUpdateOperationsInput: ["set"],
  MessageUpdateManyWithoutConversationInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  LastReadUpdateManyWithoutConversationInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  PersonUpdateManyWithoutConversationsInput: ["create", "connectOrCreate", "upsert", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  IntFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  PersonCreateNestedOneWithoutMessagesInput: ["create", "connectOrCreate", "connect"],
  ConversationCreateNestedOneWithoutMessagesInput: ["create", "connectOrCreate", "connect"],
  PersonUpdateOneRequiredWithoutMessagesInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  ConversationUpdateOneRequiredWithoutMessagesInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  MessageCreateNestedManyWithoutAuthorInput: ["create", "connectOrCreate", "createMany", "connect"],
  LastReadCreateNestedManyWithoutPersonInput: ["create", "connectOrCreate", "createMany", "connect"],
  ConversationCreateNestedManyWithoutParticipantsInput: ["create", "connectOrCreate", "connect"],
  BoolFieldUpdateOperationsInput: ["set"],
  NullableDateTimeFieldUpdateOperationsInput: ["set"],
  MessageUpdateManyWithoutAuthorInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  LastReadUpdateManyWithoutPersonInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  ConversationUpdateManyWithoutParticipantsInput: ["create", "connectOrCreate", "upsert", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  PersonCreateNestedOneWithoutLastReadInput: ["create", "connectOrCreate", "connect"],
  ConversationCreateNestedOneWithoutLastReadInput: ["create", "connectOrCreate", "connect"],
  PersonUpdateOneRequiredWithoutLastReadInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  ConversationUpdateOneRequiredWithoutLastReadInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  NestedDateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedIntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedStringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  NestedDateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  NestedIntWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  NestedFloatFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedStringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  NestedBoolFilter: ["equals", "not"],
  NestedDateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedBoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  NestedDateTimeNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  NestedIntNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedJsonFilter: ["equals", "not"],
  MessageCreateWithoutConversationInput: ["content", "createdAt", "author"],
  MessageCreateOrConnectWithoutConversationInput: ["where", "create"],
  MessageCreateManyConversationInputEnvelope: ["data", "skipDuplicates"],
  LastReadCreateWithoutConversationInput: ["lastRead", "person"],
  LastReadCreateOrConnectWithoutConversationInput: ["where", "create"],
  LastReadCreateManyConversationInputEnvelope: ["data", "skipDuplicates"],
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
  MessageCreateManyAuthorInputEnvelope: ["data", "skipDuplicates"],
  LastReadCreateWithoutPersonInput: ["lastRead", "conversation"],
  LastReadCreateOrConnectWithoutPersonInput: ["where", "create"],
  LastReadCreateManyPersonInputEnvelope: ["data", "skipDuplicates"],
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
  MessageCreateManyConversationInput: ["content", "authorID", "createdAt", "id"],
  LastReadCreateManyConversationInput: ["lastRead", "personID"],
  MessageUpdateWithoutConversationInput: ["content", "createdAt", "author"],
  LastReadUpdateWithoutConversationInput: ["lastRead", "person"],
  PersonUpdateWithoutConversationsInput: ["createdAt", "email", "isAdmin", "lastSeen", "username", "hash", "messages", "lastRead"],
  MessageCreateManyAuthorInput: ["content", "conversationID", "createdAt", "id"],
  LastReadCreateManyPersonInput: ["lastRead", "conversationID"],
  MessageUpdateWithoutAuthorInput: ["content", "createdAt", "conversation"],
  LastReadUpdateWithoutPersonInput: ["lastRead", "conversation"],
  ConversationUpdateWithoutParticipantsInput: ["createdAt", "name", "messages", "lastRead"]
};

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

