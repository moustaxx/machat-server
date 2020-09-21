/** @jest-environment node */
import { ForbiddenError } from 'apollo-server-errors';
import onlyAdminCRUDResolver from '../onlyAdminCRUDResolver';

it('should resolve', async () => {
    const ctx = {
        session: {
            owner: {
                isAdmin: true,
            },
        },
    } as any;

    const fn = jest.fn(() => true);

    const args = [{}, {}, ctx, {} as any] as const;
    const ok: boolean = await onlyAdminCRUDResolver(...args, fn);

    expect(ok).toBeTruthy();
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith(...args);
});

it('should throw error when no session', async () => {
    const ctx = {
        session: undefined,
    } as any;

    try {
        await onlyAdminCRUDResolver({}, {}, ctx, {} as any, () => {});
    } catch (error) {
        expect(error).toEqual(new ForbiddenError('Insufficient permissions'));
    }
});

it('should throw error when not admin', async () => {
    const ctx = {
        session: {
            owner: {
                isAdmin: false,
            },
        },
    } as any;

    try {
        await onlyAdminCRUDResolver({}, {}, ctx, {} as any, () => {});
    } catch (error) {
        expect(error).toEqual(new ForbiddenError('Insufficient permissions'));
    }
});
