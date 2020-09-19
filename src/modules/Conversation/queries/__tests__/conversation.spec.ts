import { randomBytes } from 'crypto';

import { NexusGenRootTypes } from '../../../../generated/nexus';
import { initTestServer, GQLResponse, ITestUtils } from '../../../../tests/helpers';

let t: ITestUtils;

beforeAll(async () => {
    t = await initTestServer();
});

afterAll(async () => {
    await t.closeTestServer();
});

const queryString = `
    query conversation($whereId: Int!) {
        conversation(whereId: $whereId) {
            id
        }
    }
`;

it('should return conversation', async () => {
    const { cookies, user } = await t.createRandomUserAndLogin();

    const conversation = await t.prisma.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
            participants: { connect: { id: user.id } },
        },
    });

    const conversationRes = await t.gqlRequest({
        cookies,
        query: queryString,
        variables: { whereId: conversation.id },
    });

    type TData = GQLResponse<{ conversation: NexusGenRootTypes['Conversation'] }>;
    const { data }: TData = await conversationRes.json();

    expect(data.conversation.id).toBeTruthy();
});

it('should throw FORBIDDEN error when not permitted', async () => {
    const { cookies } = await t.createRandomUserAndLogin();

    const conversation = await t.prisma.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
        },
    });

    const data = await t.gqlQuery({
        query: queryString,
        cookies,
        variables: { whereId: conversation.id },
    });

    const errorCode = data.errors?.[0].extensions?.code;
    expect(errorCode).toEqual('FORBIDDEN');
});

it('should throw error when not authorized', async () => {
    const conversation = await t.prisma.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
        },
    });

    const data = await t.gqlQuery({
        query: queryString,
        variables: { whereId: conversation.id },
    });

    const errorCode = data.errors?.[0].extensions?.code;
    expect(errorCode).toEqual('UNAUTHORIZED');
});
