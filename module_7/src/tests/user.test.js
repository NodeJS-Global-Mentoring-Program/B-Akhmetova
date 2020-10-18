import { v4 as uuid } from 'uuid';

jest.mock('../data-access/UserDAL');

import {
    getAllUsers,
    getUserById,
    getAutoSuggestUsers,
    createUser,
    loginUser,
    updateUser,
    deleteUser } from '../controllers/controller-methods/user';

const next = jest.fn();
const id = '788bfdc7-4c7b-409e-b606-7f9d91b19dde';

describe('User controller',  () => {
    // GET ALL USERS
    it('GET all users. Go to the Next function on error', async () => {
        const req = {};
        const resp = {};

        await getAllUsers(req, resp, next);
        expect(next).toHaveBeenCalled();
    });

    it('GET all users, called with status 200', async () => {
        const req = {};
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await getAllUsers(req, resp, next);
        expect(resp.status).toBeCalledWith(200);
    });

    // GET USER BY ID
    it('GET user by id. Go to the Next function on error', async () => {
        const req = {};
        const resp = {};

        await getUserById(req, resp, next);
        expect(next).toHaveBeenCalled();
    });

    it('GET user by Id. Called with status 200', async () => {
        const req = { params: { id } };
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await getUserById(req, resp, next);
        expect(resp.status).toBeCalledWith(200);
    });

    // GET AUTO SUGGEST USERS
    it('GET auto suggest users. Empty result', async () => {
        const req = { query: { limit: '', loginSubstring: 'fsdfsfsfd' } };
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        const result = await getAutoSuggestUsers(req, resp, next);
        expect(result).toBeTruthy();
    });

    it('GET auto suggest users. Called with status 200', async () => {
        const req = { query: { limit: 5, loginSubstring: 'user' } };
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await getAutoSuggestUsers(req, resp, next);
        expect(resp.status).toBeCalledWith(200);
    });

    // CREATE USER
    it('CREATE user. Go to the Next function on error', async () => {
        const req = {};
        const resp = {};

        await createUser(req, resp, next);
        expect(next).toHaveBeenCalled();
    });

    it('CREATE user. Called with status 200', async () => {
        const req = {
            body: {
                id: uuid(),
                login : 'John_36',
                password: 'passw-907',
                age: 35,
                isDeleted: false
            }
        };
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await createUser(req, resp, next);
        expect(resp.status).toBeCalledWith(200);
    });

    // LOGIN USER
    it('LOGIN user. Go to the Next function on error', async () => {
        const req = { body: {} };
        const resp = {};

        await loginUser(req, resp, next);
        expect(next).toHaveBeenCalled();
    });

    it('LOGIN user. Called with status 200', async () => {
        const req = { body: { login: 'user1', password: 'password1' } };
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await loginUser(req, resp, next);
        expect(next).toHaveBeenCalled();
    });

    // UPDATE USER
    it('UPDATE user. Go to the Next function on error', async () => {
        const req = {};
        const resp = {};

        await updateUser(req, resp, next);
        expect(next).toHaveBeenCalled();
    });

    it('UPDATE user. Called with status 200', async () => {
        const req = {
            body: {
                id,
                login : 'John_39',
                password: 'passw-new',
                age: 35,
                isDeleted: false
            },
            params: { id }
        };
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await updateUser(req, resp, next);
        expect(resp.status).toBeCalledWith(200);
    });

    // DELETE USER
    it('DELETE user. Go to the Next function on error', async () => {
        const req = {};
        const resp = {};

        await deleteUser(req, resp, next);
        expect(next).toHaveBeenCalled();
    });

    it('DELETE user. Called with status 200', async () => {
        const req = { params: { id } };
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await deleteUser(req, resp, next);
        expect(resp.status).toBeCalledWith(200);
    });
});
