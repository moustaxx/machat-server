import { initTestServer, ITestUtils } from '../../../../tests/helpers';
import { TNodeConnection, TNodeModel, toGlobalId } from '../../../../relay';
import randomString from '../../../../tests/helpers/randomString';
import { PersonType } from '../../../Person';
import { ConversationType } from '../../ConversationType';

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
                edges {
                    node {
                        username
                        id
                    }
                }
            }
        }
    }
`;

it('should remove person from conversation', async () => {
    const someUser = await t.createRandomUser();
    const { user, cookies } = await t.createRandomUserAndLogin();

    const conversation = await t.prisma.conversation.create({
        data: {
            name: randomString(8),
            participants: { connect: [{ id: user.id }, { id: someUser.user.id }] },
        },
    });

    type TData = {
        removePersonFromConversation: Omit<TNodeModel<ConversationType>, 'participants'> & {
            participants: TNodeConnection<PersonType>;
        };
    };
    const { data } = await t.gqlQuery<TData>({
        query: queryString,
        cookies,
        variables: { personId: someUser.user.id, conversationId: conversation.id },
    });

    const { participants } = data.removePersonFromConversation;

    expect(participants.edges).not.toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                node: expect.objectContaining({
                    id: toGlobalId('PersonType', someUser.user.id),
                }),
            }),
        ]),
    );
});

it('should throw error when not permitted', async () => {
    const someUser = await t.createRandomUser();
    const { cookies } = await t.createRandomUserAndLogin();

    const conversation = await t.prisma.conversation.create({
        data: { name: randomString(8) },
    });

    const { errors } = await t.gqlQuery({
        query: queryString,
        cookies,
        variables: { personId: someUser.user.id, conversationId: conversation.id },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('FORBIDDEN');
});
