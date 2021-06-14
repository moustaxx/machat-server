import * as TypeGraphQL from "type-graphql";

export enum PersonScalarFieldEnum {
  createdAt = "createdAt",
  email = "email",
  id = "id",
  isAdmin = "isAdmin",
  lastSeen = "lastSeen",
  username = "username",
  hash = "hash"
}
TypeGraphQL.registerEnumType(PersonScalarFieldEnum, {
  name: "PersonScalarFieldEnum",
  description: undefined,
});
