import {  Model } from 'sequelize';
export type Permission = 'READ'| 'WRITE'|'DELETE'|'SHARE'|'UPLOAD_FILES';

export  type IGroup = {
    id: string,
    name: string,
    permissions: Array<Permission>
};


export interface GroupInstance extends Model<IGroup, IGroup>, IGroup {}
