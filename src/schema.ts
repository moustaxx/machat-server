import { buildSchema } from 'type-graphql';

import * as allTypes from './modules';

const allTypesArr = Object.values(allTypes);

export const createSchema = buildSchema({

    resolvers: [...allTypesArr] as any,
    emitSchemaFile: `${__dirname}/../schema.graphql`,
    validate: false,
});
