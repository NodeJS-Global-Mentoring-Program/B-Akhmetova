import GroupDAL from '../data-access/GroupDAL';
import { Group } from '../types/group';
import { createNewGroup } from '../helpers/group';

export default class GroupService {
    groupDAL:GroupDAL;

    constructor(groupDAL: GroupDAL) {
        this.groupDAL = groupDAL;
    }

    getAllGroups(): Promise<Group[]> {
        return this.groupDAL.getAllGroups();
    }

    getGroupById(id: string): Promise<Group| null> {
        return this.groupDAL.getGroupById(id);
    }

    createGroup(group: Group): Promise<Group> {
        return this.groupDAL.createGroup(createNewGroup(group));
    }

    updateGroup(group: Group, id: string): Promise<Group[]|number> {
        return this.groupDAL.updateGroup(group, id);
    }

    deleteGroup(id: string):  Promise<number> {
        return this.groupDAL.deleteGroup(id);
    }
}
