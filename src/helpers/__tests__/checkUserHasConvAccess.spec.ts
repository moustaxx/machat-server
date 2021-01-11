import { PrismaClient } from 'prisma-machat';
import { ForbiddenError } from 'apollo-server-errors';

import randomString from '../../tests/helpers/randomString';
import checkUserHasConvAccess from '../checkUserHasConvAccess';
import { createRandomUserSep } from '../../tests/helpers';

let prisma: PrismaClient;

beforeAll(() => {
    prisma = new PrismaClient();
});

afterAll(async () => {
    await prisma.$disconnect();
});

it('should return that user can access the conversation', async () => {
    const { user } = await createRandomUserSep(prisma);

    const conversation = await prisma.conversation.create({
        data: {
            name: randomString(8),
            participants: { connect: { id: user.id } },
        },
    });

    await checkUserHasConvAccess(prisma, user, conversation.id);
});

it('should throw error that user cannot access the conversation', async () => {
    const { user } = await createRandomUserSep(prisma);

    const conversation = await prisma.conversation.create({
        data: {
            name: randomString(8),
        },
    });

    await checkUserHasConvAccess(prisma, user, conversation.id).catch((error) => {
        expect(error).toEqual(new ForbiddenError('Insufficient permissions'));
    });
});
