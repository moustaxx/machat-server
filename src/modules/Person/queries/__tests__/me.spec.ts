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
    query me {
        me {
            id
        }
    }
`;

it('should return me', async () => {
    const { cookies, user } = await t.createRandomUserAndLogin();

    type TPerson = { me: Omit<Person, 'hash'> };
    const { data } = await t.gqlQuery<TPerson>({
        query: queryString,
        cookies,
    });

    expect(data.me.id).toEqual(user.id);
});

it('should throw error when user not found', async () => {
    const { cookies, user } = await t.createRandomUserAndLogin();

    await t.prisma.person.delete({ where: { id: user.id } });

    const { errors } = await t.gqlQuery({
        query: queryString,
        cookies,
    });

    const errorCode = errors?.[0].extensions?.code;
    expect(errorCode).toEqual('USER_NOT_FOUND');
});
