import GroupDAL from '../data-access/GroupDAL';
import { IGroup } from '../interfaces/group';
import { createNewGroup } from '../helpers/group';

export default class GroupService {
    groupDAL:GroupDAL;

    constructor(groupDAL: GroupDAL) {
        this.groupDAL = groupDAL;
    }

    getAllGroups(): Promise<IGroup[] | void> {
        return this.groupDAL.getAllGroups();
    }

    getGroupById(id: string): Promise<IGroup| null | void> {
        return this.groupDAL.getGroupById(id);
    }

    createGroup(group: IGroup): Promise<IGroup |void> {
        return this.groupDAL.createGroup(createNewGroup(group));
    }

    updateGroup(group: IGroup, id: string): Promise<any> {
        return this.groupDAL.updateGroup(group, id);
    }

    deleteGroup(id: string):  Promise<number | void> {
        return this.groupDAL.deleteGroup(id);
    }
}
