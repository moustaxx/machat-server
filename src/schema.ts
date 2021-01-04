import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import { makeSchema, asNexusMethod, connectionPlugin } from 'nexus';
import { DateTimeResolver } from 'graphql-scalars';

import * as allTypes from './modules';

export const schema = makeSchema({
    types: [
        allTypes,
        asNexusMethod(DateTimeResolver, 'date', 'Date'),
    ],
    plugins: [
        nexusSchemaPrisma({
            experimentalCRUD: true,
            outputs: {
                typegen: `${__dirname}/generated/typegen-nexus-plugin-prisma.d.ts`,
            },
        }),
        connectionPlugin(),
    ],
    nonNullDefaults: {
        output: true,
    },
    outputs: {
        schema: `${__dirname}/../schema.graphql`,
        typegen: `${__dirname}/generated/nexus.d.ts`,
    },
    contextType: {
        module: require.resolve('./context'),
        export: 'Context',
    },
    sourceTypes: {
        modules: [
            { module: '@prisma/client', alias: 'prisma' },
        ],
    },
});
