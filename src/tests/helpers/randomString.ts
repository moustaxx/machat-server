const randomString = (length: number, type?: 'alpha' | 'numeric'): string => {
    let str = '';
    const min = type === 'alpha' ? 10 : 0;
    const max = type === 'numeric' ? 10 : 62;
    for (let i = 0; i < length; i += 1) {
        // eslint-disable-next-line no-bitwise
        let charCode = Math.random() * (max - min) + min << 0;
        const isInRange = charCode < 36 ? 55 : 61;
        charCode += charCode > 9 ? isInRange : 48;
        str += String.fromCharCode(charCode);
    }
    return str;
};

export default randomString;
