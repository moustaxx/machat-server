import { PrismaClient } from '@prisma/client';
import { ForbiddenError } from 'apollo-server-errors';

import randomString from '../../tests/helpers/randomString';
import throwErrorWhenNoConvAccess from '../throwErrorWhenNoConvAccess';
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

    await throwErrorWhenNoConvAccess(prisma, user.id, conversation.id);
});

it('should throw error that user cannot access the conversation', async () => {
    const { user } = await createRandomUserSep(prisma);

    const conversation = await prisma.conversation.create({
        data: {
            name: randomString(8),
        },
    });

    await throwErrorWhenNoConvAccess(prisma, user.id, conversation.id).catch((error) => {
        expect(error).toEqual(new ForbiddenError('Insufficient permissions'));
    });
});
