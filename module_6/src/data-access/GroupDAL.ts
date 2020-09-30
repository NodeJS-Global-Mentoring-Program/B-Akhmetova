import { Group } from '../types/group';
import db from '../models';

export default class GroupDAL {
    getAllGroups(): Promise<Group[]>  {
        return db.Group.findAll();
    }

    getGroupById(id: string): Promise<Group|null>  {
        return db.Group.findByPk(id);
    }

    createGroup(groupDTO: Group): Promise<Group> {
        return db.Group.create(groupDTO);
    }

    updateGroup(userData: Group, id: string): Promise<Group[]| number> {
        return db.Group.update(userData, { where: { id } });
    }

    deleteGroup(id: string): Promise<number> {
        return db.Group.destroy({ where: { id } });
    }
}
