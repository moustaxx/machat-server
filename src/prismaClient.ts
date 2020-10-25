import { PrismaClient } from 'prisma-machat';

export type TPrisma = InstanceType<typeof PrismaClient>;

const prisma = new PrismaClient();

export default prisma;
