import { Ctx, Field, FieldResolver, Int, ObjectType, Resolver, Root } from 'type-graphql';
import { Context } from '../../context';
import { ConversationType } from '../Conversation';
import { PersonType } from '../Person';

@ObjectType()
export class LastReadType {
    @Field((_type) => Date)
    lastRead!: Date;

    @Field((_type) => Int)
    personID!: number;

    @Field((_type) => Int)
    conversationID!: number;

    person!: PersonType;

    conversation!: ConversationType;
}

const whereIDEqalsID = (lastRead: LastReadType) => ({
    where: {
        personID_conversationID: {
            personID: lastRead.personID,
            conversationID: lastRead.conversationID,
        },
    },
});

@Resolver((_of) => LastReadType)
export class LastReadTypeResolver {
    @FieldResolver((_type) => PersonType)
    async person(
    // eslint-disable-next-line @typescript-eslint/indent
        @Root() lastRead: LastReadType,
        @Ctx() { prisma }: Context,
    ) {
        return prisma.lastRead.findUnique(whereIDEqalsID(lastRead)).person();
    }

    @FieldResolver((_type) => ConversationType)
    async conversation(
    // eslint-disable-next-line @typescript-eslint/indent
        @Root() lastRead: LastReadType,
        @Ctx() { prisma }: Context,
    ) {
        return prisma.lastRead.findUnique(whereIDEqalsID(lastRead)).conversation();
    }
}

