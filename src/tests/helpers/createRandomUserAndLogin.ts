import { Person } from 'prisma-machat';
import { FastifyInstance } from 'fastify';

import { createRandomUserSep } from './createRandomUser';
import { gqlRequestSep } from './gqlRequest';
import { TCookie } from './types';

type TRandomUser = {
    user: Omit<Person, 'hash'>;
    username: string;
    password: string;
    cookies: Record<string, string>;
    cookiesArray: TCookie[];
};

export type TRandomUserLogin = (
    options?: {
        isAdmin?: boolean;
    },
) => Promise<TRandomUser>;

type TRandomUserLoginSep = (
    app: FastifyInstance,
    options?: {
        isAdmin?: boolean;
    },
) => Promise<TRandomUser>;

export const createRandomUserAndLoginSep: TRandomUserLoginSep = async (app, options) => {
    const {
        username,
        password,
        user,
    } = await createRandomUserSep(app.prisma, { isAdmin: options?.isAdmin });

    const loginRes = await gqlRequestSep(app, {
        query: `
            mutation login($username: String!, $password: String!) {
                login(username: $username, password: $password) {
                    id
                }
            }
        `,
        variables: { username, password },
    });

    const cookiesArray = loginRes.cookies;
    let cookies: Record<string, string> = {};
    cookiesArray.forEach((cookie) => {
        cookies = { ...cookies, [cookie.name]: cookie.value };
    });

    return {
        user,
        username,
        password,
        cookies,
        cookiesArray,
    };
};
