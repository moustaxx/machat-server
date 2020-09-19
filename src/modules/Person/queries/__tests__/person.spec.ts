import {
    createRandomUserAndLogin,
    initTestServer,
    closeTestServer,
    GQLResponse,
    TTestUtils,
} from '../../../../tests/helpers';
import { NexusGenRootTypes } from '../../../../generated/nexus';

let t: TTestUtils;

beforeAll(async () => {
    t = await initTestServer();
});

afterAll(async () => {
    await closeTestServer(t.app);
});

const queryString = `
    query getPeople {
        people {
            id
        }
    }
`;

it('should throw FORBIDDEN error when quering people without permissions', async () => {
    const data = await t.gqlQuery({ query: queryString });

    const errorCode = data.errors?.[0].extensions?.code;
    expect(errorCode).toEqual('FORBIDDEN');
});

it('should return people list when admin permissions are present', async () => {
    const { cookies } = await createRandomUserAndLogin(t.app, { isAdmin: true });

    const peopleRes = await t.gqlRequest({
        cookies,
        query: queryString,
    });

    type TPeopleQuery = GQLResponse<{ people: NexusGenRootTypes['Person'][] }>;
    const { data }: TPeopleQuery = await peopleRes.json();

    expect(data.people.length).toBeGreaterThan(0);
});
