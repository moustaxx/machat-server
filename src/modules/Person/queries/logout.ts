import { queryField } from 'nexus';
import isAuthorized from '../../../helpers/isAuthorized';

export const logoutQueryField = queryField('logout', {
    type: 'Person',
    resolve: (_, _args, { session, req, reply }) => {
        isAuthorized(session);

        const { owner } = session;
        req.destroySession((err) => err && console.log);
        req.session = null as any;
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        reply.setCookie('loggedIn', '0');

        return owner;
    },
});
