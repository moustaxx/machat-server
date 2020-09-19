import { FastifyInstance } from 'fastify';

import { GQLResponse, IGqlRequestParams } from './types';

export async function gqlQuerySep<T>(app: FastifyInstance, {
    url,
    query,
    cookies,
    headers,
    variables,
    operationName,
}: IGqlRequestParams): Promise<GQLResponse<T>> {
    const res = await app.inject({
        url: url || '/graphql',
        method: 'POST',
        cookies,
        headers: {
            'content-type': 'application/json; charset=utf-8',
            ...headers,
        },
        payload: JSON.stringify({
            query,
            variables,
            operationName,
        }),
    });
    return res.json();
}

export type TGqlQuery = <T>(params: IGqlRequestParams) => Promise<GQLResponse<T>>;
