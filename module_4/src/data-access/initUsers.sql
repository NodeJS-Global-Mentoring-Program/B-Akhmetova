CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS "Users" (
    "id" uuid DEFAULT uuid_generate_v4 (),
    "login" VARCHAR (30) NOT NULL CONSTRAINT uniq_login UNIQUE,
    "password" CHAR(100) NOT NULL,
    "age" int NOT NULL CHECK (
        age >= 4
        AND age <= 130
    )
);
INSERT INTO "Users" ("login", "password", "age")
VALUES ('user1', 'passw111', 22),
    ('user2', 'passw222', 12),
    ('user3', 'passw333', 34),
    ('user4', 'passw444', 24),
    ('user5', 'passw555', 56),
    ('user6', 'passw666', 45),
    ('user7', 'passw777', 19) ON CONFLICT ON CONSTRAINT uniq_login  DO NOTHING;
