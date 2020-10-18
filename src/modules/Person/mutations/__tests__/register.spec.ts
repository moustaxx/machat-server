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

const expectValidationError = async (credentials: {
    username: string;
    password: string;
    email: string;
}) => {
    const { errors } = await t.gqlQuery({
        query: queryString,
        variables: credentials as any,
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('GRAPHQL_VALIDATION_FAILED');
};

const generateCredentials = (usernameLength = 4, passwordLength = 6) => {
    const username = randomBytes(usernameLength).toString('hex');
    const password = randomBytes(passwordLength).toString('hex');
    const email = `${username}@machat.ru`;

    return { username, password, email };
};

it('should register', async () => {
    const { username, password, email } = generateCredentials();

    const logoutRes = await t.gqlRequest({
        query: queryString,
        variables: { username, password, email },
    });

    const loggedIn = logoutRes.cookies.find((cookie) => cookie.name === 'loggedIn');

    type TPerson = GQLResponse<{ register: NexusGenRootTypes['Person'] }>;
    const { data }: TPerson = await logoutRes.json();

    expect(loggedIn?.value).toEqual('1');
    expect(data.register).toMatchObject({ email, username });
});

it('should throw error when username is too short', async () => {
    const credentials = generateCredentials(1, 6);
    await expectValidationError(credentials);
});

it('should throw error when username is too long', async () => {
    const credentials = generateCredentials(15, 6);
    await expectValidationError(credentials);
});

it('should throw error when password is too short', async () => {
    const credentials = generateCredentials(4, 1);
    await expectValidationError(credentials);
});

it('should throw error when password is too long', async () => {
    const credentials = generateCredentials(4, 55);
    await expectValidationError(credentials);
});

it('should throw wrong email error', async () => {
    const { username, password } = generateCredentials();
    const email = `@${username}mach@t.ru`;
    await expectValidationError({ username, password, email });
});

it('should throw error when already logged in', async () => {
    const { username, password, user, cookies } = await t.createRandomUserAndLogin();
    const { errors } = await t.gqlQuery({
        cookies,
        query: queryString,
        variables: { username, password, email: user.email },
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('ALREADY_LOGGED_IN');
});
