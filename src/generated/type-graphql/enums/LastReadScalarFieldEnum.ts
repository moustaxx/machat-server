import * as TypeGraphQL from "type-graphql";

export enum LastReadScalarFieldEnum {
  lastRead = "lastRead",
  personID = "personID",
  conversationID = "conversationID"
}
TypeGraphQL.registerEnumType(LastReadScalarFieldEnum, {
  name: "LastReadScalarFieldEnum",
  description: undefined,
});
