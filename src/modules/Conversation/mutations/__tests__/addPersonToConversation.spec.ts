import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { createFastifyGQLTestClient } from 'fastify-gql-integration-testing';
import { randomBytes } from 'crypto';

import {
    createRandomUserAndLogin,
    createRandomUser,
    initTestServer,
    closeTestServer,
} from '../../../../tests/helpers';
import { Conversation, Person } from '../../../../../node_modules/.prisma/client';

let prisma: PrismaClient;
let app: FastifyInstance;
let testClient: ReturnType<typeof createFastifyGQLTestClient>;

beforeAll(async () => {
    const testing = await initTestServer();
    app = testing.app;
    prisma = testing.app.prisma;
    testClient = testing.testClient;
});

afterAll(async () => {
    await closeTestServer(app);
});

const queryString = `
    mutation addPersonToConversation($personId: Int!, $conversationId: Int!) {
        addPersonToConversation(personId: $personId, conversationId: $conversationId) {
            id
            participants {
                username
                id
            }
        }
    }
`;

it('should add person to conversation', async () => {
    const someUser = await createRandomUser(prisma);
    const { user, cookies } = await createRandomUserAndLogin(app);

    const conversation = await prisma.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
            participants: { connect: { id: user.id } },
        },
    });

    type TData = { addPersonToConversation: Conversation & {
        participants: Person[];
    } };
    const { data } = await testClient.mutate<TData>(queryString, {
        cookies,
        variables: { personId: someUser.user.id, conversationId: conversation.id },
    });

    const { participants } = data.addPersonToConversation;

    const isParticipated = !!participants.find((participant) => {
        return participant.id === someUser.user.id;
    })?.id;
    expect(isParticipated).toBeTruthy();
});

it('should throw error when not permitted', async () => {
    const someUser = await createRandomUser(prisma);
    const { cookies } = await createRandomUserAndLogin(app);

    const conversation = await prisma.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
        },
    });

    const { errors } = await testClient.mutate(queryString, {
        cookies,
        variables: { personId: someUser.user.id, conversationId: conversation.id },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('FORBIDDEN');
});

it('should throw error when not authorized', async () => {
    const someUser = await createRandomUser(prisma);

    const conversation = await prisma.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
        },
    });

    const { errors } = await testClient.mutate(queryString, {
        variables: { personId: someUser.user.id, conversationId: conversation.id },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('UNAUTHORIZED');
});
