import { AuthChecker, buildSchema } from 'type-graphql';
import { Context } from './context';
import throwErrorWhenUnauthorized from './helpers/throwErrorWhenUnauthorized';

import * as allTypes from './modules';

const allTypesArr = Object.values(allTypes);

const authChecker: AuthChecker<Context> = ({ context }) => {
    throwErrorWhenUnauthorized(context.clientID);
    return true;
};

export const createSchema = buildSchema({
    resolvers: [...allTypesArr] as any,
    emitSchemaFile: `${__dirname}/../schema.graphql`,
    validate: false,
    authChecker,
});
