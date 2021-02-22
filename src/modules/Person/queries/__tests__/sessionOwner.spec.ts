import { Person } from '@prisma/client';
import { initTestServer, ITestUtils } from '../../../../tests/helpers';

let t: ITestUtils;

beforeAll(async () => {
    t = await initTestServer();
});

afterAll(async () => {
    await t.closeTestServer();
});

const queryString = `
    query sessionOwner {
        sessionOwner {
            id
        }
    }
`;

it('should return session owner', async () => {
    const { cookies, user } = await t.createRandomUserAndLogin();

    type TPerson = { sessionOwner: Omit<Person, 'hash'> };
    const { data } = await t.gqlQuery<TPerson>({
        query: queryString,
        cookies,
    });

    expect(data.sessionOwner.id).toEqual(user.id);
});
