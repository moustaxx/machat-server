import { GraphQLError } from 'graphql';

export type TCookie = {
    name: string;
    value: string;
    path: string;
    expires: number | Date;
    httpOnly: boolean;
};

export interface IGqlRequestParams {
    url?: string;
    query?: string;
    cookies?: {
        [k: string]: string;
    } ;
    headers?: Record<string, string>;
    variables?: Record<string, unknown>;
    operationName?: string;
}

export declare type GQLResponse<T> = {
    data: T;
    errors?: GraphQLError[];
};
