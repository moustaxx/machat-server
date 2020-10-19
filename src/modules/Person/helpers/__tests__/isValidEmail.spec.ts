/** @jest-environment node */
import { randomBytes } from 'crypto';
import isValidEmail from '../isValidEmail';

it('should pass', async () => {
    const email = 'user@machat.ru';
    const email2 = 'user.dot@machat.chat.ru';

    expect(isValidEmail(email)).toBeTruthy();
    expect(isValidEmail(email2)).toBeTruthy();
});

it('should return false when wrong email', async () => {
    const email = '@usermach@t.ru';
    const email2 = 'user';

    expect(isValidEmail(email)).toBeFalsy();
    expect(isValidEmail(email2)).toBeFalsy();
});


it('should return false when email is too long', async () => {
    const text = randomBytes(40).toString('hex');
    const email = `${text}@machat.ru`;

    expect(isValidEmail(email)).toBeFalsy();
});
