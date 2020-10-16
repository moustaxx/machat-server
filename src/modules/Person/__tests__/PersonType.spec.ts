import { randomBytes } from 'crypto';
import { initTestServer, ITestUtils } from '../../../tests/helpers';
import { NexusGenRootTypes } from '../../../generated/nexus';
import cursorUtils from '../../../helpers/cursor';

let t: ITestUtils;

beforeAll(async () => {
    t = await initTestServer();
});

afterAll(async () => {
    await t.closeTestServer();
});

const queryString = `
    query person($whereId: Int!, $first: Int!, $after: String) {
        person(where: { id: $whereId }) {
            id
            conversations(first: $first, after: $after) {
                edges {
                    node {
                        id
                    }
                }
            }
        }
    }
`;

type TPerson = {
    person: NexusGenRootTypes['Person'] & {
        conversations: NexusGenRootTypes['ConversationConnection']
    }
};

const makeConv = (...ids: number[]) => t.prisma.conversation.create({
    data: {
        name: randomBytes(8).toString('hex'),
        participants: {
            connect: ids.map((id) => ({ id })),
        },
    },
    include: { participants: true },
});

const makePeople = () => Promise.all([
    t.createRandomUserAndLogin(),
    t.createRandomUser(),
]);

it('should return only mine conversations', async () => {
    const [me, someone] = await makePeople();

    const convs = await Promise.all([
        makeConv(me.user.id, someone.user.id),
        makeConv(me.user.id),
        makeConv(someone.user.id),
    ]);

    const { data } = await t.gqlQuery<TPerson>({
        query: queryString,
        variables: { whereId: me.user.id, first: 20 },
        cookies: me.cookies,
    });

    const convEdges = data.person.conversations.edges;

    expect(convEdges).toHaveLength(2);
    expect(convEdges).toEqual(
        expect.arrayContaining([
            { node: { id: convs[0].id } },
            { node: { id: convs[1].id } },
        ]),
    );
});

it('should return only shared conversations', async () => {
    const [me, someone] = await makePeople();

    const [sharedConv] = await Promise.all([
        makeConv(me.user.id, someone.user.id),
        makeConv(me.user.id),
        makeConv(someone.user.id),
    ]);

    const { data } = await t.gqlQuery<TPerson>({
        query: queryString,
        variables: { whereId: someone.user.id, first: 20 },
        cookies: me.cookies,
    });

    const convEdges = data.person.conversations.edges;

    expect(convEdges).toEqual([{ node: { id: sharedConv.id } }]);
});

it('should paginate', async () => {
    const [me, someone] = await makePeople();

    const convs = [
        await makeConv(me.user.id), // 0
        await makeConv(me.user.id, someone.user.id), // 1 -> cursor
        await makeConv(someone.user.id), // 2
        await makeConv(someone.user.id, me.user.id), // 3 -> should be returned
        await makeConv(me.user.id), // 4
        await makeConv(me.user.id, someone.user.id), // 5 -> should be returned
        await makeConv(someone.user.id), // 6
        await makeConv(someone.user.id, me.user.id), // 7
    ];

    const { data } = await t.gqlQuery<TPerson>({
        query: queryString,
        variables: {
            whereId: someone.user.id,
            first: 2,
            after: cursorUtils.encodeCursor(convs[1]),
        },
        cookies: me.cookies,
    });

    const convEdges = data.person.conversations.edges;

    expect(convEdges).toEqual(
        expect.arrayContaining([
            { node: { id: convs[3].id } },
            { node: { id: convs[5].id } },
        ]),
    );
});
