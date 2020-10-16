import { queryField } from '@nexus/schema';
import isAuthorized from '../../../helpers/isAuthorized';

export const logoutQueryField = queryField('logout', {
    type: 'Person',
    resolve: (_, _args, { session, req, reply }) => {
        isAuthorized(session);

        const { owner } = session;
        req.destroySession((err) => err && console.log);
        req.session = null as any;
        reply.setCookie('loggedIn', '0');

        return owner;
    },
});
