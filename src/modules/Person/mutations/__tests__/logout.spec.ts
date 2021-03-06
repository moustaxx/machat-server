import { initTestServer, ITestUtils } from '../../../../tests/helpers';
import { fromGlobalId, TNodeModel } from '../../../../relay';
import { PersonType } from '../../PersonType';

let t: ITestUtils;

beforeAll(async () => {
    t = await initTestServer();
});

afterAll(async () => {
    await t.closeTestServer();
});

const queryString = `
    mutation logout {
        logout {
            id
        }
    }
`;

it('should log out', async () => {
    const { user, cookies } = await t.createRandomUserAndLogin();

    const logoutRes = await t.gqlRequest({
        query: queryString,
        cookies,
    });

    const cookiesAfterLogout = logoutRes.cookies;
    const loggedIn = cookiesAfterLogout.find((cookie) => cookie.name === 'loggedIn');

    type TData = { data: { logout: TNodeModel<PersonType> } };
    const { data } = await logoutRes.json<Promise<TData>>();

    expect(loggedIn?.value).toEqual('0');
    expect(fromGlobalId(data.logout.id).id).toBe(user.id);
});
