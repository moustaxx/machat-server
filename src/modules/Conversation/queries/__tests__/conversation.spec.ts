import { Conversation } from '@prisma/client';
import { initTestServer, ITestUtils } from '../../../../tests/helpers';
import randomString from '../../../../tests/helpers/randomString';

let t: ITestUtils;

beforeAll(async () => {
    t = await initTestServer();
});

afterAll(async () => {
    await t.closeTestServer();
});

const queryStringFull = `
    query conversation($whereId: Int!) {
        conversation(whereId: $whereId) {
            id
            name
            createdAt
            participants {
                id
            }
            messages {
                id
            }
        }
    }
`;

const queryString = `
    query conversation($whereId: Int!) {
        conversation(whereId: $whereId) {
            id
        }
    }
`;

it('should return conversation', async () => {
    const { cookies, user } = await t.createRandomUserAndLogin();

    const name = randomString(8);
    const conversation = await t.prisma.conversation.create({
        data: {
            name,
            participants: { connect: { id: user.id } },
        },
    });

    type TData = { conversation: Conversation };
    const { data } = await t.gqlQuery<TData>({
        cookies,
        query: queryStringFull,
        variables: { whereId: conversation.id },
    });

    expect(data).toMatchSnapshot({
        conversation: {
            name: expect.any(String),
            createdAt: expect.any(String),
        },
    });

    expect(data.conversation.name).toEqual(name);
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
            name: randomString(8),
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
