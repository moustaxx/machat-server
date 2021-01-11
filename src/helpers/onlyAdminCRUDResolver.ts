import { CustomFieldResolver } from 'nexus-plugin-prisma/typegen';
import { ForbiddenError } from 'apollo-server-errors';

const onlyAdminCRUDResolver: CustomFieldResolver<any, any> = async (
    root,
    args,
    ctx,
    info,
    originalResolve,
) => {
    if (!ctx.session?.owner?.isAdmin) {
        throw new ForbiddenError('Insufficient permissions');
    }
    return originalResolve(root, args, ctx, info) as Promise<unknown>;
};

export default onlyAdminCRUDResolver;
