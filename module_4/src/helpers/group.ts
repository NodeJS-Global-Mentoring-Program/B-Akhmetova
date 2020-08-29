import { v4 as uuid } from 'uuid';

import { IGroup } from '../interfaces/group';

export const createNewGroup = (fields: IGroup): IGroup => {
    return {
        id: fields.id || uuid(),
        name : fields.name,
        permissions: fields.permissions
    };
};
