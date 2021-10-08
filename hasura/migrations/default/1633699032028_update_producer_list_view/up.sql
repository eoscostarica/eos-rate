DROP VIEW "public"."producers_list";

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
    ratings_stats.development,
    ratings_stats.ratings_cntr,
    -- Eden Ratings Stats
    eden_ratings_stats.average AS eden_average,
    eden_ratings_stats.transparency AS eden_transparency,
    eden_ratings_stats.infrastructure AS eden_infrastructure,
    eden_ratings_stats.trustiness AS eden_trustiness,
    eden_ratings_stats.community AS eden_community,
    eden_ratings_stats.development AS eden_development,
    eden_ratings_stats.ratings_cntr AS eden_ratings_cntr,
    producers.general_info
   FROM ((producers
     FULL JOIN ratings_stats ON (((ratings_stats.bp)::text = producers.owner)))
     FULL JOIN eden_ratings_stats ON (((eden_ratings_stats.bp)::text = producers.owner)));
