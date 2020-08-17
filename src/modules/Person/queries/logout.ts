import { queryField } from '@nexus/schema';
import { ApolloError } from 'apollo-server-errors';

export const logoutQueryField = queryField('logout', {
    type: 'Person',
    resolve: (_, _args, { session, req, reply }) => {
        if (!session || !session.isLoggedIn || !session.owner) {
            throw new ApolloError('You must be logged in!', 'UNAUTHORIZED');
        }
        const { owner } = session;
        req.destroySession((err) => err && console.log);
        req.session = null as any;
        reply.setCookie('loggedIn', '0');

        return owner;
    },
});
