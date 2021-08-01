
CREATE OR REPLACE VIEW producers_list AS
    SELECT
        owner,
        bpjson,
        system,
        bpjson->'org'->>'candidate_name' AS candidate_name,
        system->>'total_votes' AS total_votes
    FROM
        producers;