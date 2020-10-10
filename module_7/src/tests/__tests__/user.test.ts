jest.mock('../request');

import { fakeUsers } from '../data';
import { getUsers } from '../user';

it('Test get all users', async () => {
    expect.assertions(1);
    const data = await getUsers();
    expect(data).toEqual(fakeUsers);
});
