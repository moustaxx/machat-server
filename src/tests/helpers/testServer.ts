import { FastifyInstance } from 'fastify';
import { PrismaClient } from 'prisma-machat';

import main from '../..';
import { gqlQuerySep, TGqlQuery } from './gqlQuery';
import { gqlRequestSep, TGqlRequest } from './gqlRequest';
import { createRandomUserSep, TCreateRandomUser } from './createRandomUser';
import { createRandomUserAndLoginSep, TRandomUserLogin } from './createRandomUserAndLogin';

export interface ITestUtils {
    app: FastifyInstance;
    prisma: PrismaClient;
    gqlQuery: TGqlQuery;
    gqlRequest: TGqlRequest;
    createRandomUser: TCreateRandomUser;
    createRandomUserAndLogin: TRandomUserLogin;
    closeTestServer: () => Promise<void>;
}

const closeTestServerSep = async (app: FastifyInstance): Promise<void> => {
    await Promise.allSettled([
        app.prisma.$disconnect(),
        app.close(),
    ]);
};

export const initTestServer = async (): Promise<ITestUtils> => {
    const app = await main(true);

    const gqlQuery: TGqlQuery = async (params) => gqlQuerySep(app, params);
    const gqlRequest: TGqlRequest = async (params) => gqlRequestSep(app, params);
    const createRandomUser: TCreateRandomUser = async (options) => {
        return createRandomUserSep(app.prisma, options);
    };
    const createRandomUserAndLogin: TRandomUserLogin = async (options) => {
        return createRandomUserAndLoginSep(app, options);
    };

    const closeTestServer = async (): Promise<void> => closeTestServerSep(app);

    return {
        prisma: app.prisma,
        app,
        gqlQuery,
        gqlRequest,
        closeTestServer,
        createRandomUser,
        createRandomUserAndLogin,
    };
};
