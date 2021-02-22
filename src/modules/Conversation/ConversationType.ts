import { ObjectType, Resolver } from 'type-graphql';
import { Conversation, ConversationRelationsResolver } from '../../generated/type-graphql';
import { ConnectionType, EdgeType } from '../../relay';

@ObjectType()
export class ConversationType extends Conversation {
}

@Resolver((_of) => ConversationType)
export class ConversationTypeResolver extends ConversationRelationsResolver { }

@ObjectType()
export class ConversationEdge extends EdgeType(ConversationType) { }

@ObjectType()
export class ConversationConnection extends ConnectionType(ConversationEdge) { }
