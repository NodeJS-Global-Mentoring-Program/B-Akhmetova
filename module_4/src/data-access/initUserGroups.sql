CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS userGroup (
    userid uuid DEFAULT uuid_generate_v4 (),
    groupid uuid DEFAULT uuid_generate_v4 ()
);