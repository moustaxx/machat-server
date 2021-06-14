import { initTestServer, ITestUtils } from '../../../../tests/helpers';
import { TNodeModel } from '../../../../relay';
import { PersonType } from '../../PersonType';

let t: ITestUtils;

beforeAll(async () => {
    t = await initTestServer();
});

afterAll(async () => {
    await t.closeTestServer();
});

const queryStringFull = `
    query person($whereId: Int!) {
        person(where: { id: $whereId }) {
            id
            username
            email
            isActive
            isAdmin
            lastSeen
            createdAt
            conversations(first: 20) {
                edges {
                    node {
                        id
                    }
                }
            }
        }
    }
`;

const queryString = `
    query person($whereId: Int!) {
        person(where: { id: $whereId }) {
            id
        }
    }
`;

it('should return person', async () => {
    const { cookies } = await t.createRandomUserAndLogin({ isAdmin: true });
    const { user } = await t.createRandomUser();

    type TPerson = { person: TNodeModel<PersonType> };
    const { data } = await t.gqlQuery<TPerson>({
        query: queryStringFull,
        variables: { whereId: user.id },
        cookies,
    });

    expect(data).toMatchSnapshot({
        person: {
            email: expect.any(String),
            username: expect.any(String),
            createdAt: expect.any(String),
        },
    });

    expect(data.person).toMatchObject({
        email: user.email,
        username: user.username,
        createdAt: user.createdAt.toISOString(),
    });
});


it('should throw error when user not found', async () => {
    const { cookies } = await t.createRandomUserAndLogin();

    const { errors } = await t.gqlQuery({
        query: queryString,
        variables: { whereId: 999 },
        cookies,
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('USER_NOT_FOUND');
});
