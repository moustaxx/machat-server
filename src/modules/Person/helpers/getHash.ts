import { scryptSync } from 'crypto';

export const getHash = (password: string, salt: string): string => {
    return scryptSync(password, salt, 32).toString('hex');
};
