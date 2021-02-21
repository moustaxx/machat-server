import * as TypeGraphQL from "type-graphql";

export enum MessageScalarFieldEnum {
  content = "content",
  authorID = "authorID",
  conversationID = "conversationID",
  createdAt = "createdAt",
  id = "id"
}
TypeGraphQL.registerEnumType(MessageScalarFieldEnum, {
  name: "MessageScalarFieldEnum",
  description: undefined,
});
