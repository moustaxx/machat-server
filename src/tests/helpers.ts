import { FastifyInstance } from 'fastify';
import { Response } from 'light-my-request';

export type TCookie = {
    name: string;
    value: string;
    path: string;
    expires: number | Date;
    httpOnly: boolean;
};

interface IQueryParams {
    url?: string;
    query?: string;
    cookies?: {
        [k: string]: string;
    } ;
    headers?: Record<string, string>;
    variables?: Record<string, string>;
    operationName?: string;
}

export interface TResponse extends Omit<Response, 'cookies'> {
    cookies: TCookie[];
}

export async function gqlRequest(app: FastifyInstance, {
    url,
    query,
    cookies,
    headers,
    variables,
    operationName,
}: IQueryParams): Promise<TResponse> {
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
