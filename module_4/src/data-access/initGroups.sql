CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS "Groups" (
    "id" uuid DEFAULT uuid_generate_v4 (),
    "name" VARCHAR (30) NOT NULL CONSTRAINT uniq_name UNIQUE,
    "permissions" TEXT []
);
INSERT INTO "Groups" ("name", "permissions")
VALUES (
        'group1',
        ARRAY ['READ', 'WRITE','DELETE','SHARE']
    ),
    ('group2', ARRAY ['DELETE','SHARE']),
    ('group3', ARRAY ['UPLOAD_FILES']),
    (
        'group4',
        ARRAY ['READ', 'WRITE','DELETE', 'UPLOAD_FILES']
    ) ON CONFLICT ON CONSTRAINT uniq_name DO NOTHING;
    