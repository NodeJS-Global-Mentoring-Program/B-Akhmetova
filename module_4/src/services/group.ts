import GroupDAL from '../data-access/GroupDAL';
import { Group } from '../types/group';
import { createNewGroup } from '../helpers/group';

export default class GroupService {
    groupDAL:GroupDAL;

    constructor(groupDAL: GroupDAL) {
        this.groupDAL = groupDAL;
    }

    getAllGroups(): Promise<Group[] | void> {
        return this.groupDAL.getAllGroups();
    }

    getGroupById(id: string): Promise<Group| null | void> {
        return this.groupDAL.getGroupById(id);
    }

    createGroup(group: Group): Promise<Group |void> {
        return this.groupDAL.createGroup(createNewGroup(group));
    }

    updateGroup(group: Group, id: string): Promise<any> {
        return this.groupDAL.updateGroup(group, id);
    }

    deleteGroup(id: string):  Promise<number | void> {
        return this.groupDAL.deleteGroup(id);
    }
}
