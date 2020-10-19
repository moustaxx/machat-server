import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';
import argon2 from 'argon2';

import { NexusGenRootTypes } from '../../generated/nexus';

type TRandomUser = {
    username: string;
    password: string;
    email: string;
    user: NexusGenRootTypes['Person'];
};

export type TCreateRandomUser = (
    options?: {
        isAdmin?: boolean;
    },
) => Promise<TRandomUser>;

type TCreateRandomUserSep = (
    prisma: PrismaClient,
    options?: {
        isAdmin?: boolean,
    },
) => Promise<TRandomUser>;

export const createRandomUserSep: TCreateRandomUserSep = async (prisma, options) => {
    const username = randomBytes(5).toString('hex');
    const password = randomBytes(9).toString('hex');
    const email = `${username}@machat.ru`;

    const hash = await argon2.hash(password);

    const user = await prisma.person.create({
        data: {
            email,
            username,
            hash,
            isAdmin: options?.isAdmin,
        },
    });

    if (!user.id) throw Error('Cannot create random user!');

    return {
        user,
        username,
        password,
        email,
    };
};
