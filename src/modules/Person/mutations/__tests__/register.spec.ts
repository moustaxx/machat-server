import { randomBytes } from 'crypto';
import { NexusGenRootTypes } from '../../../../generated/nexus';

import { GQLResponse, initTestServer, ITestUtils } from '../../../../tests/helpers';

let t: ITestUtils;

beforeAll(async () => {
    t = await initTestServer();
});

afterAll(async () => {
    await t.closeTestServer();
});

const queryString = `
    mutation register($email: String!, $username: String!, $password: String!) {
        register(email: $email, username: $username, password: $password) {
            email
            username
        }
    }
`;

it('should register', async () => {
    const username = randomBytes(4).toString('hex');
    const password = randomBytes(6).toString('hex');
    const email = `${username}@machat.ru`;

    const logoutRes = await t.gqlRequest({
        query: queryString,
        variables: { email, username, password },
    });

    const loggedIn = logoutRes.cookies.find((cookie) => cookie.name === 'loggedIn');

    type TPerson = GQLResponse<{ register: NexusGenRootTypes['Person'] }>;
    const { data }: TPerson = await logoutRes.json();

    expect(loggedIn?.value).toEqual('1');
    expect(data.register).toMatchObject({ email, username });
});

it('should throw error when username is too short', async () => {
    const username = randomBytes(1).toString('hex');
    const password = randomBytes(6).toString('hex');
    const email = `${username}@machat.ru`;

    const { errors } = await t.gqlQuery({
        query: queryString,
        variables: { username, password, email },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('GRAPHQL_VALIDATION_FAILED');
});

it('should throw error when password is too short', async () => {
    const username = randomBytes(4).toString('hex');
    const password = randomBytes(1).toString('hex');
    const email = `${username}@machat.ru`;

    const { errors } = await t.gqlQuery({
        query: queryString,
        variables: { username, password, email },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('GRAPHQL_VALIDATION_FAILED');
});

it('should throw wrong email error', async () => {
    const username = randomBytes(4).toString('hex');
    const password = randomBytes(6).toString('hex');
    const email = `@${username}mach@t.ru`;

    const { errors } = await t.gqlQuery({
        query: queryString,
        variables: { username, password, email },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('GRAPHQL_VALIDATION_FAILED');
});

it('should throw error when already logged in', async () => {
    const { username, password, user, cookies } = await t.createRandomUserAndLogin();

    const { errors } = await t.gqlQuery({
        query: queryString,
        cookies,
        variables: { username, password, email: user.email },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('ALREADY_LOGGED_IN');
});
