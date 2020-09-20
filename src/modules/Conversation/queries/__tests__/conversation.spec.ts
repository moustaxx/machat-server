import { randomBytes } from 'crypto';

import { NexusGenRootTypes } from '../../../../generated/nexus';
import { initTestServer, ITestUtils } from '../../../../tests/helpers';

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

    type TData = { conversation: NexusGenRootTypes['Conversation'] };
    const { data } = await t.gqlQuery<TData>({
        cookies,
        query: queryString,
        variables: { whereId: conversation.id },
    });

    expect(data.conversation.id).toBeTruthy();
});

it('should throw NO_DATA error when no data', async () => {
    const { cookies } = await t.createRandomUserAndLogin({ isAdmin: true });

    const { errors } = await t.gqlQuery({
        cookies,
        query: queryString,
        variables: { whereId: 999 },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('NO_DATA');
});

it('should throw FORBIDDEN error when not permitted', async () => {
    const { cookies } = await t.createRandomUserAndLogin();

    const conversation = await t.prisma.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
        },
    });

    const { errors } = await t.gqlQuery({
        query: queryString,
        cookies,
        variables: { whereId: conversation.id },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('FORBIDDEN');
});

it('should throw error when not authorized', async () => {
    const conversation = await t.prisma.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
        },
    });

    const { errors } = await t.gqlQuery({
        query: queryString,
        variables: { whereId: conversation.id },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('UNAUTHORIZED');
});
