export const getNumber = (input: any): number => {
    const number = parseInt(input, 10);
    return number || 0;
};

export const getString = (input: any): string => input.toString();
