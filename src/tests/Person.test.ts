import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { createFastifyGQLTestClient } from 'fastify-gql-integration-testing';

import main from '..';

let client: PrismaClient;
let app: FastifyInstance;
let testClient: ReturnType<typeof createFastifyGQLTestClient>;

beforeAll(async () => {
    client = new PrismaClient();
    app = await main(true);
    testClient = createFastifyGQLTestClient(app);
});

afterAll(async () => {
    await client.$disconnect();
    app.close();
});

// it('register', async () => {
//     const post = await client.person.create({
//         data: {
//             email: 'testowy@email.test',
//             username: 'testowy',
//             hash: 'asdsadasd',
//             salt: 'sadsadsa',
//         },
//     });

//     expect(post.isActive).toBeTruthy();
// });

it('throw FORBIDDEN error when quering people without permissions', async () => {
    const data = await testClient.query(`
        query getPeople {
            people {
                id
            }
        }
    `);

    const errorCode = data.errors && data.errors[0].extensions?.code;

    expect(errorCode).toEqual('FORBIDDEN');
});
