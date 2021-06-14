import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class PageInfo {
    @Field((_type) => Boolean)
    hasNextPage!: boolean;

    @Field((_type) => Boolean)
    hasPreviousPage!: boolean;

    @Field((_type) => String, { nullable: true })
    startCursor?: string;

    @Field((_type) => String, { nullable: true })
    endCursor?: string;
}
