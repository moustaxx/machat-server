import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { createFastifyGQLTestClient } from 'fastify-gql-integration-testing';
import { randomBytes } from 'crypto';

import main from '../../../..';
import { createRandomUserAndLogin, createRandomUser } from '../../../../tests/helpers';
import { Conversation, Person } from '../../../../../node_modules/.prisma/client';

let client: PrismaClient;
let app: FastifyInstance;
let testClient: ReturnType<typeof createFastifyGQLTestClient>;

beforeAll(async () => {
    client = new PrismaClient();
    app = await main(true);
    testClient = createFastifyGQLTestClient(app);
});

afterAll(async () => {
    await Promise.allSettled([
        client.$disconnect(),
        app.close(),
    ]);
});

const queryString = `
    mutation removePersonFromConversation($personId: Int!, $conversationId: Int!) {
        removePersonFromConversation(personId: $personId, conversationId: $conversationId) {
            id
            participants {
                username
                id
            }
        }
    }
`;

it('should remove person from conversation', async () => {
    const someUser = await createRandomUser(client);
    const { user, cookies } = await createRandomUserAndLogin(app, client);

    const conversation = await client.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
            participants: { connect: [{ id: user.id }, { id: someUser.user.id }] },
        },
    });

    type TData = { removePersonFromConversation: Conversation & {
        participants: Person[];
    } };
    const { data } = await testClient.mutate<TData>(queryString, {
        cookies,
        variables: { personId: someUser.user.id, conversationId: conversation.id },
    });

    const { participants } = data.removePersonFromConversation;

    const isParticipated = !!participants.find((participant) => {
        return participant.id === someUser.user.id;
    })?.id;
    expect(isParticipated).toBeFalsy();
});

it('should throw error when not permitted', async () => {
    const someUser = await createRandomUser(client);
    const { cookies } = await createRandomUserAndLogin(app, client);

    const conversation = await client.conversation.create({
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
    const someUser = await createRandomUser(client);

    const conversation = await client.conversation.create({
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
