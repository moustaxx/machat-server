const regexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const isValidEmail = (email: string): boolean => {
    if (!email || email.length > 64 || !email.match(regexp)) return false;
    return true;
};

export default isValidEmail;
