import { v4 as uuid } from 'uuid';

import {
    getAllUsers,
    getUserById,
    getAutoSuggestUsers,
    createUser,
    addUserToGroup,
    loginUser,
    updateUser,
    deleteUser } from '../controllers/controller-methods/user';

describe('User controller',  () => {
    // GET ALL USERS
    it('GET all users. Go to the Next function on error', async () => {
        const req = {};
        const resp = {};
        const next = jest.fn();

        await getAllUsers(req, resp, next);
        expect(next).toHaveBeenCalled();
    });

    it('GET all users, called with status 200', async () => {
        const req = {};
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        await getAllUsers(req, resp, next);
        expect(resp.status).toBeCalledWith(200);
    });

    // GET USER BY ID
    it('GET user by id. Go to the Next function on error', async () => {
        const req = {};
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        await getUserById(req, resp, next);
        expect(next).toHaveBeenCalled();
    });

    it('GET user by Id. Called with status 200', async () => {
        const req = { params: { id: '788bfdc7-4c7b-409e-b606-7f9d91b19dde' } };
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        await getUserById(req, resp, next);
        expect(resp.status).toBeCalledWith(200);
    });

    // GET AUTO SUGGEST USERS
    it('GET auto suggest users. Empty result', async () => {
        const req = { query: { limit: '', loginSubstring: 'fsdfsfsfd' } };
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        const result = await getAutoSuggestUsers(req, resp, next);
        expect(result).toBeTruthy();
    });

    it('GET auto suggest users. Called with status 200', async () => {
        const req = { query: { limit: 5, loginSubstring: 'user' } };
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        await getAutoSuggestUsers(req, resp, next);
        expect(resp.status).toBeCalledWith(200);
    });

    // CREATE USER
    it('Create user. Go to the Next function on error', async () => {
        const req = {};
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        await createUser(req, resp, next);
        expect(next).toHaveBeenCalled();
    });

    it('Create user. Called with status 200', async () => {
        const req = {
            body: {
                id: uuid(),
                login : 'John_34',
                password: 'passw-907',
                age: 35
            }
        };
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        await createUser(req, resp, next);
        expect(resp.status).toBeCalledWith(200);
    });
});
