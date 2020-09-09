import { v4 as uuid } from 'uuid';

import { Group } from '../types/group';

export const createNewGroup = (fields: Group): Group => {
    return {
        id: fields.id || uuid(),
        name : fields.name,
        permissions: fields.permissions
    };
};
