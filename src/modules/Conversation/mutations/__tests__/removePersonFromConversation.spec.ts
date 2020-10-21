import { randomBytes } from 'crypto';
import { Conversation, Person } from '@prisma/client';

import { initTestServer, ITestUtils } from '../../../../tests/helpers';

let t: ITestUtils;

beforeAll(async () => {
    t = await initTestServer();
});

afterAll(async () => {
    await t.closeTestServer();
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
    const someUser = await t.createRandomUser();
    const { user, cookies } = await t.createRandomUserAndLogin();

    const conversation = await t.prisma.conversation.create({
        data: {
            name: randomBytes(8).toString('hex'),
            participants: { connect: [{ id: user.id }, { id: someUser.user.id }] },
        },
    });

    type TData = {
        removePersonFromConversation: Conversation & {
            participants: Person[];
        }
    };
    const { data } = await t.gqlQuery<TData>({
        query: queryString,
        cookies,
        variables: { personId: someUser.user.id, conversationId: conversation.id },
    });

    const { participants } = data.removePersonFromConversation;

    expect(participants).not.toEqual(
        expect.arrayContaining([
            expect.objectContaining({ id: someUser.user.id }),
        ]),
    );
});

it('should throw error when not permitted', async () => {
    const someUser = await t.createRandomUser();
    const { cookies } = await t.createRandomUserAndLogin();

    const conversation = await t.prisma.conversation.create({
        data: { name: randomBytes(8).toString('hex') },
    });

    const { errors } = await t.gqlQuery({
        query: queryString,
        cookies,
        variables: { personId: someUser.user.id, conversationId: conversation.id },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('FORBIDDEN');
});
