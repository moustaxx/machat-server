import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LastReadOrderByWithRelationInput } from "../../../inputs/LastReadOrderByWithRelationInput";
import { LastReadWhereInput } from "../../../inputs/LastReadWhereInput";
import { LastReadWhereUniqueInput } from "../../../inputs/LastReadWhereUniqueInput";
import { LastReadScalarFieldEnum } from "../../../../enums/LastReadScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstLastReadArgs {
  @TypeGraphQL.Field(_type => LastReadWhereInput, {
    nullable: true
  })
  where?: LastReadWhereInput | undefined;

  @TypeGraphQL.Field(_type => [LastReadOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: LastReadOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => LastReadWhereUniqueInput, {
    nullable: true
  })
  cursor?: LastReadWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [LastReadScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"lastRead" | "personID" | "conversationID"> | undefined;
}
