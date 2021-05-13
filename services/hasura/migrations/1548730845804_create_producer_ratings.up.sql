
      CREATE TABLE producer_ratings (
              account text NOT NULL,
              bp text NOT NULL,
              ratings jsonb NOT NULL,
              PRIMARY KEY(account, bp)
            );