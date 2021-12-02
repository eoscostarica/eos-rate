CREATE OR REPLACE VIEW "public"."producers_list" AS 
 SELECT producers.owner,
    producers.bpjson,
    producers.system,
    ((producers.bpjson -> 'org'::text) ->> 'candidate_name'::text) AS candidate_name,
    CAST((producers.system ->> 'total_votes'::text)AS double precision) AS total_votes,
    ratings_stats.average,
    ratings_stats.transparency,
    ratings_stats.infrastructure,
    ratings_stats.trustiness,
    ratings_stats.community,
    ratings_stats.development,
    ratings_stats.ratings_cntr,
    total_ratings_stats.average AS total_average,
    total_ratings_stats.transparency AS total_transparency,
    total_ratings_stats.infrastructure AS total_infrastructure,
    total_ratings_stats.trustiness AS total_trustiness,
    total_ratings_stats.community AS total_community,
    total_ratings_stats.development AS total_development,
    total_ratings_stats.ratings_cntr AS total_ratings_cntr,
    eden_ratings_stats.average AS eden_average,
    eden_ratings_stats.transparency AS eden_transparency,
    eden_ratings_stats.infrastructure AS eden_infrastructure,
    eden_ratings_stats.trustiness AS eden_trustiness,
    eden_ratings_stats.community AS eden_community,
    eden_ratings_stats.development AS eden_development,
    eden_ratings_stats.ratings_cntr AS eden_ratings_cntr,
    producers.general_info
   FROM (((producers
     FULL JOIN ratings_stats ON (((ratings_stats.bp)::text = producers.owner)))
     FULL JOIN total_ratings_stats ON (((total_ratings_stats.bp)::text = producers.owner)))
     FULL JOIN eden_ratings_stats ON (((eden_ratings_stats.bp)::text = producers.owner)));
