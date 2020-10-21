import { initTestServer, ITestUtils } from '../../../../tests/helpers';
import { NexusGenRootTypes } from '../../../../generated/nexus';

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

    type TPerson = { sessionOwner: NexusGenRootTypes['Person'] };
    const { data } = await t.gqlQuery<TPerson>({
        query: queryString,
        cookies,
    });

    expect(data.sessionOwner.id).toEqual(user.id);
});
