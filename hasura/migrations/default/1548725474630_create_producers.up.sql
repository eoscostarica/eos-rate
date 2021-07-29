
CREATE TABLE producers (
        owner text PRIMARY KEY,
        system jsonb NOT NULL,
        bpjson jsonb NOT NULL
      );