import { GQLResponse, initTestServer, ITestUtils } from '../../../../tests/helpers';
import { TNodeModel } from '../../../../relay';
import randomString from '../../../../tests/helpers/randomString';
import { PersonType } from '../../PersonType';

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

interface ICredentials {
    username: string;
    password: string;
    email: string;
}

const expectErrorOnRegister = async (
    credentials: ICredentials,
    expectedError: string,
    cookies?: Record<string, string>,
) => {
    const { errors } = await t.gqlQuery({
        cookies,
        query: queryString,
        variables: credentials as any,
    });

    const errorCode = errors?.[0].extensions.code;
    expect(errorCode).toEqual(expectedError);
};

const expectValidationError = async (credentials: ICredentials) => {
    await expectErrorOnRegister(credentials, 'GRAPHQL_VALIDATION_FAILED');
};

const generateCredentials = (usernameLength = 6, passwordLength = 8) => {
    const username = randomString(usernameLength);
    const password = randomString(passwordLength);
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

    type TPerson = GQLResponse<{ register: TNodeModel<PersonType> }>;
    const { data }: TPerson = await logoutRes.json();

    expect(loggedIn?.value).toEqual('1');
    expect(data.register).toMatchObject({ email, username });
});

it('should throw error when username is too short', async () => {
    const credentials = generateCredentials(2, 8);
    await expectValidationError(credentials);
});

it('should throw error when username is too long', async () => {
    const credentials = generateCredentials(30, 8);
    await expectValidationError(credentials);
});

it('should throw error when password is too short', async () => {
    const credentials = generateCredentials(8, 2);
    await expectValidationError(credentials);
});

it('should throw error when password is too long', async () => {
    const credentials = generateCredentials(8, 110);
    await expectValidationError(credentials);
});

it('should throw wrong email error', async () => {
    const { username, password } = generateCredentials();
    const email = `@${username}mach@t.ru`;
    await expectValidationError({ username, password, email });
});

it('should throw error when already logged in', async () => {
    const { cookies } = await t.createRandomUserAndLogin();
    const credentials = generateCredentials();

    await expectErrorOnRegister(credentials, 'ALREADY_LOGGED_IN', cookies);
});
