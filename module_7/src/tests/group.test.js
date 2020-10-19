import { v4 as uuid } from 'uuid';

jest.mock('../data-access/GroupDAL');

import {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup } from '../controllers/controller-methods/group';

const next = jest.fn();
const id = '788bfdc7-4c7b-409e-b606-7f9d91b19dui';

describe('Group controller', () => {
    // GET ALL GROUPS
    it('GET all groups. Go to the Next function on error', async () => {
        const req = {};
        const resp = {};

        await getAllGroups(req, resp, next);
        expect(next).toHaveBeenCalled();
    });

    it('GET all groups, called with status 200', async () => {
        const req = {};
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await getAllGroups(req, resp, next);
        expect(resp.status).toBeCalledWith(200);
    });

    // GET GROUP BY ID
    it('GET group by id. Go to the Next function on error', async () => {
        const req = {};
        const resp = {};

        await getGroupById(req, resp, next);
        expect(next).toHaveBeenCalled();
    });

    it('GET group by Id. Called with status 200', async () => {
        const req = { params: { id } };
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await getGroupById(req, resp, next);
        expect(resp.status).toBeCalledWith(200);
    });

    // CREATE GROUP
    it('CREATE group. Go to the Next function on error', async () => {
        const req = {};
        const resp = {};

        await createGroup(req, resp, next);
        expect(next).toHaveBeenCalled();
    });

    it('CREATE group. Called with status 200', async () => {
        const req = {
            body: {
                id: uuid(),
                name: 'group34',
                permissions: [1, 4]
            }
        };
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await createGroup(req, resp, next);
        expect(resp.status).toBeCalledWith(200);
    });

    // UPDATE GROUP
    it('UPDATE group. Go to the Next function on error', async () => {
        const req = {};
        const resp = {};

        await updateGroup(req, resp, next);
        expect(next).toHaveBeenCalled();
    });

    it('UPDATE group. Called with status 200', async () => {
        const req = {
            body: {
                id,
                name: 'groupNew23',
                permissions: [2, 4]
            },
            params: { id }
        };
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await updateGroup(req, resp, next);
        expect(resp.status).toBeCalledWith(200);
    });

    // DELETE GROUP
    it('DELETE group. Go to the Next function on error', async () => {
        const req = {};
        const resp = {};

        await deleteGroup(req, resp, next);
        expect(next).toHaveBeenCalled();
    });

    it('DELETE group. Called with status 200', async () => {
        const req = { params: { id } };
        const resp = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await deleteGroup(req, resp, next);
        expect(resp.status).toBeCalledWith(200);
    });
});

