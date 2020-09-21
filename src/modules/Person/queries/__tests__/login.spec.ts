import { initTestServer, ITestUtils } from '../../../../tests/helpers';

let t: ITestUtils;

beforeAll(async () => {
    t = await initTestServer();
});

afterAll(async () => {
    await t.closeTestServer();
});

const queryString = `
    query login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
        }
    }
`;

it('should log in', async () => {
    const { cookiesArray } = await t.createRandomUserAndLogin();
    const loggedIn = cookiesArray.find((cookie) => cookie.name === 'loggedIn');

    expect(loggedIn?.value).toEqual('1');
});

it('should throw error when already logged in', async () => {
    const { username, password, cookies } = await t.createRandomUserAndLogin();

    const { errors } = await t.gqlQuery({
        query: queryString,
        cookies,
        variables: { username, password },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('ALREADY_LOGGED_IN');
});

it('should throw error when wrong username', async () => {
    const { errors } = await t.gqlQuery({
        query: queryString,
        variables: { username: 'wrong_username', password: 'password' },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('WRONG_CREDENTIALS');
});

it('should throw error when wrong password', async () => {
    const { username } = await t.createRandomUser();

    const { errors } = await t.gqlQuery({
        query: queryString,
        variables: { username, password: 'wrong_password' },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('WRONG_CREDENTIALS');
});
