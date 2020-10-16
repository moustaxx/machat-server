/** @jest-environment node */
import cursorUtils from '../cursor';

const model = { id: 1234, toBeDeleted: 'test' };
const cursor = { id: 1234 };
const encodedCursor = 'eyJpZCI6MTIzNH0=';

it('should get cursor', () => {
    const res = cursorUtils.getCursor(model);
    expect(res).toEqual(cursor);
});

it('should encode cursor', () => {
    const res = cursorUtils.encodeCursor(model);
    expect(res).toEqual(encodedCursor);
});

it('should decode cursor', () => {
    const res = cursorUtils.decodeCursor(encodedCursor);
    expect(res).toEqual(cursor);
});
