// import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';

import {
    gqlRequest,
    createRandomUserAndLogin,
    initTestServer,
    closeTestServer,
    TGqlQuery,
    GQLResponse,
} from '../../../../tests/helpers';
import { NexusGenRootTypes } from '../../../../generated/nexus';

// let prisma: PrismaClient;
let app: FastifyInstance;
let gqlQuery: TGqlQuery;

beforeAll(async () => {
    const testing = await initTestServer();
    app = testing.app;
    // prisma = testing.app.prisma;
    gqlQuery = testing.gqlQuery;
});

afterAll(async () => {
    await closeTestServer(app);
});

const queryString = `
    query getPeople {
        people {
            id
        }
    }
`;

it('should throw FORBIDDEN error when quering people without permissions', async () => {
    const data = await gqlQuery({ query: queryString });

    const errorCode = data.errors?.[0].extensions?.code;
    expect(errorCode).toEqual('FORBIDDEN');
});

it('should return people list when admin permissions are present', async () => {
    const { cookies } = await createRandomUserAndLogin(app, { isAdmin: true });

    const peopleRes = await gqlRequest(app, {
        cookies,
        query: queryString,
    });

    type TPeopleQuery = GQLResponse<{ people: NexusGenRootTypes['Person'][] }>;
    const { data }: TPeopleQuery = await peopleRes.json();

    expect(data.people.length).toBeGreaterThan(0);
});
