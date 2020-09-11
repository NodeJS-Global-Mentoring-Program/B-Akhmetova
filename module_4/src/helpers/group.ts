import { v4 as uuid } from 'uuid';

import { Permission } from '../types/group';

import { PermissionTypes } from '../constants/group';

import { Group } from '../types/group';

export const createNewGroup = (fields: Group): Group => {
    return {
        id: fields.id || uuid(),
        name: fields.name,
        permissions: fields.permissions
    };
};

export const mapPermision = (permissions: Array<any>): Array<Permission> => {
    const mappedPermissions: Array<any> = [];

    permissions.forEach((number) => mappedPermissions.push(PermissionTypes[number]));

    return mappedPermissions;
};
