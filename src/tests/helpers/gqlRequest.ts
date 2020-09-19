import { FastifyInstance } from 'fastify';
import { Response } from 'light-my-request';

import { IGqlRequestParams, TCookie } from './types';

export interface TResponse extends Omit<Response, 'cookies'> {
    cookies: TCookie[];
}

export async function gqlRequestSep(app: FastifyInstance, {
    url,
    query,
    cookies,
    headers,
    variables,
    operationName,
}: IGqlRequestParams): Promise<TResponse> {
    return app.inject({
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
    }) as Promise<TResponse>;
}

export type TGqlRequest = (params: IGqlRequestParams) => Promise<TResponse>;
