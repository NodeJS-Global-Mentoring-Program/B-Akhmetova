export type Permission = 'READ'| 'WRITE'|'DELETE'|'SHARE'|'UPLOAD_FILES';

export  type Group = {
    id: string,
    name: string,
    permissions: Array<Permission>
};

export  type mockGroup = {
    id: string,
    name: string,
    permissions: Array<number>
};
