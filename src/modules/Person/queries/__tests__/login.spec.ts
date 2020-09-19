import {
    createRandomUserAndLogin,
    createRandomUser,
    initTestServer,
    closeTestServer,
    TTestUtils,
} from '../../../../tests/helpers';

let t: TTestUtils;

beforeAll(async () => {
    t = await initTestServer();
});

afterAll(async () => {
    await closeTestServer(t.app);
});

const queryString = `
    query login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
        }
    }
`;

it('should log in', async () => {
    const { cookiesArray } = await createRandomUserAndLogin(t.app);
    const loggedIn = cookiesArray.find((cookie) => cookie.name === 'loggedIn');

    expect(loggedIn?.value).toEqual('1');
});

it('should throw error when already logged in', async () => {
    const { username, password, cookies } = await createRandomUserAndLogin(t.app);

    const { errors } = await t.gqlQuery({
        query: queryString,
        cookies,
        variables: { username, password },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('ALREADY_LOGGED_IN');
});

it('should throw error when wrong password', async () => {
    const { username } = await createRandomUser(t.prisma);

    const { errors } = await t.gqlQuery({
        query: queryString,
        variables: { username, password: 'wrong_password' },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('GRAPHQL_VALIDATION_FAILED');
});
