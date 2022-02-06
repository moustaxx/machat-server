import { LastRead } from 'prisma-machat';
import { TNodeModel } from '../../../../relay';

import { initTestServer, ITestUtils } from '../../../../tests/helpers';
import randomString from '../../../../tests/helpers/randomString';

let t: ITestUtils;

beforeEach(async () => {
    t = await initTestServer();
});

afterEach(async () => {
    await t.closeTestServer();
});

const queryString = `
    mutation($conversationId: Int!) {
        markConvAsRead(conversationId: $conversationId) {
            lastRead
            personID
            conversationID
        }
    }
`;

it('should mark conversation as read', async () => {
    const { user, cookies } = await t.createRandomUserAndLogin();

    const conversation = await t.prisma.conversation.create({
        data: {
            name: randomString(8),
            participants: { connect: { id: user.id } },
        },
    });

    const dateBeforeChange = new Date();

    await t.prisma.lastRead.create({
        data: {
            lastRead: dateBeforeChange,
            person: { connect: { id: user.id } },
            conversation: { connect: { id: conversation.id } },
        },
    });

    type TData = {
        markConvAsRead: Omit<TNodeModel<LastRead>, 'lastRead'> & {
            lastRead: string;
        };
    };
    const { data } = await t.gqlQuery<TData>({
        query: queryString,
        cookies,
        variables: { conversationId: conversation.id },
    });

    const date = new Date(data.markConvAsRead.lastRead).getTime();

    expect(data.markConvAsRead.personID).toEqual(user.id);
    expect(data.markConvAsRead.conversationID).toEqual(conversation.id);
    expect(date).toBeGreaterThan(dateBeforeChange.getTime());
});

it('should throw error when not logged in', async () => {
    const conversation = await t.prisma.conversation.create({
        data: { name: randomString(8) },
    });

    const { errors } = await t.gqlQuery({
        query: queryString,
        variables: {
            content: randomString(6),
            conversationId: conversation.id,
        },
    });

    const errorCode = errors?.[0].extensions.code;
    expect(errorCode).toEqual('UNAUTHORIZED');
});

it('should throw error when not permitted', async () => {
    const { cookies } = await t.createRandomUserAndLogin();

    const conversation = await t.prisma.conversation.create({
        data: { name: randomString(8) },
    });

    const { errors } = await t.gqlQuery({
        query: queryString,
        cookies,
        variables: {
            content: randomString(6),
            conversationId: conversation.id,
        },
    });

    const errorCode = errors?.[0].extensions.code;
    expect(errorCode).toEqual('FORBIDDEN');
});
