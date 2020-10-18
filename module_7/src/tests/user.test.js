

import { getAllUsers } from '../controllers/controller-methods/user';

describe('User controller',  () => {
    it('GET all users, FAILURE', async () => {
        const req = {};
        const resp = {};
        const next = jest.fn();

        await getAllUsers(req, resp, next);
        expect(next).toHaveBeenCalled();
    });

    it('GET all users, SUCCESS', async () => {
        const req = {};
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        await getAllUsers(req, resp, next);
        expect(resp.status).toBeCalledWith(200);
    });
});
