import { mockGroup } from '../../types/group';
import db from './fakeDBGroup';

export default class GroupDAL {
    getAllGroups(): Promise<mockGroup[]>  {
        return Promise.resolve(db);
    }

    getGroupById(id: string): Promise<mockGroup|undefined>  {
        return Promise.resolve(db.find(g => g.id === id));
    }

    createGroup(groupDTO: mockGroup): mockGroup {
        Promise.resolve(db.push(groupDTO));
        return groupDTO;
    }

    updateGroup(groupData: mockGroup, id: string): Promise<mockGroup[]| number> {
        const groupIndex = db.findIndex(g => g.id === id);
        db.splice(groupIndex, 1, groupData);
        return Promise.resolve(1);
    }

    deleteGroup(id: string): Promise<number> {
        const group = db.find(g => g.id === id);
        const groupIndex = db.findIndex(g => g.id === id);

        if (group) {
            const deletedGroup: mockGroup = {
                id: group.id,
                name: group.name,
                permissions: group.permissions
            };

            db.splice(groupIndex, 1, deletedGroup);
            return Promise.resolve(1);
        }
        return Promise.resolve(0);
    }
}
