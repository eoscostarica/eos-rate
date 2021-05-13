
CREATE OR REPLACE VIEW "public"."producers_list" AS 
 SELECT producers.owner,
    producers.bpjson,
    producers.system,
    ((producers.bpjson -> 'org'::text) ->> 'candidate_name'::text) AS candidate_name,
    (producers.system ->> 'total_votes'::text) AS total_votes,
    ratings_stats.average,
    ratings_stats.transparency,
    ratings_stats.infrastructure,
    ratings_stats.trustiness,
    ratings_stats.community,
    ratings_stats.development
   FROM (producers
     FULL JOIN ratings_stats ON (((ratings_stats.bp)::text = producers.owner)));