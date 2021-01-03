/** @jest-environment node */
import PersonActiveStatus from '../PersonActiveStatus';

jest.useFakeTimers();

const randomNumber = (max = 6) => {
    return Math.floor(Math.random() * max);
};

it('should return active status', () => {
    const id = randomNumber();
    const personActiveStatus = new PersonActiveStatus();

    const data = personActiveStatus.get(id);
    expect(typeof data === 'boolean').toBeTruthy();
});

it('should set active status to true', () => {
    const id = randomNumber();
    const personActiveStatus = new PersonActiveStatus();

    personActiveStatus.set(id, true);
    expect(personActiveStatus.get(id)).toEqual(true);
});

it('should set active status to false', () => {
    const id1 = randomNumber();
    const id2 = randomNumber();
    const personActiveStatus = new PersonActiveStatus();

    personActiveStatus.set(id1, false);

    expect(personActiveStatus.get(id1)).toEqual(false);
    expect(personActiveStatus.get(id2)).toEqual(false);
});

it('should set active status to false after long inactivity', () => {
    const id = randomNumber();
    const personActiveStatus = new PersonActiveStatus();

    personActiveStatus.set(id, true);
    expect(personActiveStatus.get(id)).toEqual(true);

    jest.advanceTimersByTime(40000);
    expect(personActiveStatus.get(id)).toEqual(false);
});
