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
    query sessionOwner {
        sessionOwner {
            id
        }
    }
`;

it('should return session owner', async () => {
    const { cookies, user } = await t.createRandomUserAndLogin();

    type TPerson = { sessionOwner: TNodeModel<PersonType> };
    const { data } = await t.gqlQuery<TPerson>({
        query: queryString,
        cookies,
    });

    expect(fromGlobalId(data.sessionOwner.id).id).toEqual(user.id);
});
