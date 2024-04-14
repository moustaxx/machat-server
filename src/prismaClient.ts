import { PrismaClient } from '@prisma/client';

export type TPrisma = InstanceType<typeof PrismaClient>;

const prisma = new PrismaClient();

export default prisma;
