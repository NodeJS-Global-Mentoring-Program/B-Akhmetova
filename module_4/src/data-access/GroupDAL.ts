import { IGroup } from '../interfaces/group';
import db from '../models';

export default class GroupDAL {
    getAllGroups(): Promise<IGroup[]|  void>  {
        return db.Group.findAll();
    }

    getGroupById(id: string): Promise<IGroup| null |void>  {
        return db.Group.findByPk(id);
    }

    createGroup(groupDTO: IGroup): Promise<IGroup |void> {
        return db.Group.create(groupDTO);
    }

    updateGroup(userData: IGroup, id: string): Promise<any> {
        return db.Group.update(userData, { where: { id } });
    }

    deleteGroup(id: string): Promise<number | void> {
        return db.Group.destroy({ where: { id } });
    }
}
