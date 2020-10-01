import GroupDAL from '../data-access/GroupDAL';
import { Group } from '../types/group';
import { createNewGroup, mapPermision } from '../helpers/group';

export default class GroupService {
    groupDAL:GroupDAL;

    constructor(groupDAL: GroupDAL) {
        this.groupDAL = groupDAL;
    }

    async getAllGroups(): Promise<Group[]> {
        const groups = await this.groupDAL.getAllGroups();
        return groups.map(group => ({
            id: group.id,
            name: group.name,
            permissions: mapPermision(group.permissions)
        }));
    }

    async getGroupById(id: string): Promise<Group|null> {
        const group = await this.groupDAL.getGroupById(id);
        return group && {
            id: group.id,
            name: group.name,
            permissions: mapPermision(group.permissions)
        };
    }

    async createGroup(group: Group): Promise<Group> {
        const createdGroup = await this.groupDAL.createGroup(createNewGroup(group));
        return createdGroup && {
            id: createdGroup.id,
            name: createdGroup.name,
            permissions: mapPermision(createdGroup.permissions)
        };
    }

    updateGroup(group: Group, id: string): Promise<Group[]|number> {
        return this.groupDAL.updateGroup(group, id);
    }

    deleteGroup(id: string):  Promise<number> {
        return this.groupDAL.deleteGroup(id);
    }
}
