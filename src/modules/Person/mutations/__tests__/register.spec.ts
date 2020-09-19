import { randomBytes } from 'crypto';

import {
    createRandomUserAndLogin,
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
    mutation register($email: String!, $username: String!, $password: String!) {
        register(email: $email, username: $username, password: $password) {
            id
        }
    }
`;

it('should register', async () => {
    const username = randomBytes(5).toString('hex');
    const password = randomBytes(9).toString('hex');
    const email = `${username}@machat.ru`;

    const logoutRes = await t.gqlRequest({
        query: queryString,
        variables: { email, username, password },
    });

    const loggedIn = logoutRes.cookies.find((cookie) => cookie.name === 'loggedIn');

    const logoutJson = await logoutRes.json();

    expect(loggedIn?.value).toEqual('1');
    expect(logoutJson.data.register.id).toBeTruthy();
});

it('should throw error when already logged in', async () => {
    const { username, password, user, cookies } = await createRandomUserAndLogin(t.app);

    const { errors } = await t.gqlQuery({
        query: queryString,
        cookies,
        variables: { username, password, email: user.email },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('ALREADY_LOGGED_IN');
});
