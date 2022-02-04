import { initTestServer, ITestUtils } from '../../../../tests/helpers';
import { TNodeModel, TNodeConnection, toGlobalId } from '../../../../relay';
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
    mutation createConversation($name: String!, $participantIDs: [Int!]!) {
        createConversation(name: $name, participantIDs: $participantIDs) {
            id
            participants {
                edges {
                    node {
                        id
                    }
                }
            }
        }
    }
`;

it('should create conversation', async () => {
    const { user } = await t.createRandomUser();
    const { user: me, cookies } = await t.createRandomUserAndLogin();

    type TData = {
        createConversation: Omit<TNodeModel<ConversationType>, 'participants'> & {
            participants: TNodeConnection<PersonType>;
        };
    };
    const { data } = await t.gqlQuery<TData>({
        query: queryString,
        cookies,
        variables: { name: randomString(8), participantIDs: [user.id] },
    });

    const { participants } = data.createConversation;
    expect(data.createConversation.id).toBeTruthy();

    expect(participants.edges).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                node: expect.objectContaining({
                    id: toGlobalId('PersonType', me.id),
                }),
            }),
            expect.objectContaining({
                node: expect.objectContaining({
                    id: toGlobalId('PersonType', user.id),
                }),
            }),
        ]),
    );
});

it('should throw error when converasation name length is < 2', async () => {
    const { user } = await t.createRandomUser();
    const { cookies } = await t.createRandomUserAndLogin();

    type TData = {
        createConversation: Omit<TNodeModel<ConversationType>, 'participants'> & {
            participants: TNodeConnection<PersonType>;
        };
    };
    const { errors } = await t.gqlQuery<TData>({
        query: queryString,
        cookies,
        variables: { name: 'a', participantIDs: [user.id] },
    });

    const errorCode = errors?.[0].extensions.code;
    expect(errorCode).toEqual('BAD_USER_INPUT');
});

it('should throw error when no participants declared', async () => {
    const { cookies } = await t.createRandomUserAndLogin();

    type TData = {
        createConversation: Omit<TNodeModel<ConversationType>, 'participants'> & {
            participants: TNodeConnection<PersonType>;
        };
    };
    const { errors } = await t.gqlQuery<TData>({
        query: queryString,
        cookies,
        variables: { name: randomString(8), participantIDs: [] },
    });

    const errorCode = errors?.[0].extensions.code;
    expect(errorCode).toEqual('BAD_USER_INPUT');
});

it('should throw error when specified only self in participants', async () => {
    const { user: me, cookies } = await t.createRandomUserAndLogin();

    type TData = {
        createConversation: Omit<TNodeModel<ConversationType>, 'participants'> & {
            participants: TNodeConnection<PersonType>;
        };
    };
    const { errors } = await t.gqlQuery<TData>({
        query: queryString,
        cookies,
        variables: { name: randomString(8), participantIDs: me.id },
    });

    const errorCode = errors?.[0].extensions.code;
    expect(errorCode).toEqual('BAD_USER_INPUT');
});

it('should throw error when not logged in', async () => {
    const { user } = await t.createRandomUser();

    type TData = {
        createConversation: Omit<TNodeModel<ConversationType>, 'participants'> & {
            participants: TNodeConnection<PersonType>;
        };
    };
    const { errors } = await t.gqlQuery<TData>({
        query: queryString,
        variables: { name: randomString(8), participantIDs: [user.id] },
    });

    const errorCode = errors?.[0].extensions.code;
    expect(errorCode).toEqual('UNAUTHORIZED');
});
