type Model = {
    id?: number;
};
type Cursor = {
    id: number;
};

const cursorUtils = {
    getCursor: ({ id }: Model): Cursor => {
        if (!id) throw new Error('Model doesn\'t have an ID');
        return { id };
    },
    encodeCursor: ({ id }: Model): string => {
        if (!id) throw new Error('Model doesn\'t have an ID');
        return Buffer.from(JSON.stringify({ id })).toString('base64');
    },
    decodeCursor: (cursor: string): Cursor => JSON.parse(Buffer.from(cursor, 'base64').toString('ascii')),
};

export default cursorUtils;
