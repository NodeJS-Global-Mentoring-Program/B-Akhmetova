import { fakeUsers } from '../data';

const request = () => {
    return new Promise((resolve) => {
        process.nextTick(() => resolve(fakeUsers));
    });
};

export default request;
