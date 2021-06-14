import { Field, ID, InterfaceType } from 'type-graphql';
import { ConversationType, MessageType, PersonType } from '../modules';

@InterfaceType({
    isAbstract: true,
    description: 'An object with a global ID.',
    resolveType: (value) => {
        if ('createdAt' in value && 'name' in value) return ConversationType;
        if ('authorID' in value) return MessageType;
        if ('username' in value) return PersonType;
        throw new Error('Unknown type');
    },
})
export abstract class Node {
    @Field(() => ID, {
        name: 'id',
        description: 'The global ID of the object.',
    })
    readonly globalId!: string;
}
