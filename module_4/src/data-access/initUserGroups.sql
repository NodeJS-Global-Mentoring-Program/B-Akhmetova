CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS "UserGroup" (
    "userId" uuid DEFAULT uuid_generate_v4 (),
    "groupId" uuid DEFAULT uuid_generate_v4 ()
);