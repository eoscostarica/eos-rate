#include "../include/rateproducer.hpp"


namespace eoscostarica {
    void rateproducer::rate(
        name user,
        name bp, 
        int8_t transparency,
        int8_t infrastructure,
        int8_t trustiness,
        int8_t community,
        int8_t development) {
        require_auth(user);
        rate_aux(_self, user, bp, transparency, infrastructure, trustiness, community, development);
        if(is_eden(user)) rate_aux(eden_scope, user, bp, transparency, infrastructure, trustiness, community, development);
    }

    void rateproducer::rate_aux(
        name scope,
        name user, 
        name bp, 
        int8_t transparency,
        int8_t infrastructure,
        int8_t trustiness,
        int8_t community,
        int8_t development) {
        check( (transparency+infrastructure+trustiness+community+development), "Error vote must have value for at least one category");  
        check( (MINVAL<= transparency &&  transparency<=MAXVAL ), "Error transparency value out of range");
        check( (MINVAL<= infrastructure &&  infrastructure<=MAXVAL ), "Error infrastructure value out of range" );
        check( (MINVAL<= trustiness &&  trustiness<=MAXVAL ), "Error trustiness value out of range" );
        check( (MINVAL<= development &&  development <=MAXVAL ), "Error development value out of range" );
        check( (MINVAL<= community &&  community<=MAXVAL ), "Error community value out of range" );

        bool isEden = is_eden(user);

        // checks if the bp is active 
        check( is_blockproducer(bp), "votes are allowed only for registered block producers" );

        eosio::name proxy_name = get_proxy(user);
        if(proxy_name.length()) {
            // active proxy??
            check(is_active_proxy(proxy_name), "votes are allowed only for active proxies" );
            // account votes through a proxy
            if(!isEden) check( MIN_VOTERS <= get_voters(proxy_name), "delegated proxy does not have enough voters" );
        } else {
            // acount must vote for at least 21 bp
            if(!isEden) check( MIN_VOTERS <= get_voters(user), "account does not have enough voters" );
        }

        // upsert bp rating
        ratings_table _ratings(_self, scope.value);
        auto uniq_rating = (static_cast<uint128_t>(user.value) << 64) | bp.value;

        auto uniq_rating_index = _ratings.get_index<name("uniqrating")>();
        auto existing_rating = uniq_rating_index.find(uniq_rating);

        if( existing_rating == uniq_rating_index.end() ) {
            _ratings.emplace(user, [&]( auto& row ) {
                row.id = _ratings.available_primary_key();
                row.uniq_rating = uniq_rating;
                row.user = user;
                row.bp = bp;
                row.transparency = transparency;
                row.infrastructure = infrastructure;
                row.trustiness = trustiness;
                row.community = community;
                row.development = development ;   
            });
            //save stats
            save_bp_stats(scope,
                        user,
                        bp,
                        transparency,
                        infrastructure,
                        trustiness,
                        community,
                        development);
        

        } else {
            //the voter update its vote
            uniq_rating_index.modify(existing_rating, user, [&]( auto& row ) {
                row.user = user;
                row.bp = bp;
                row.transparency = transparency;
                row.infrastructure = infrastructure;
                row.trustiness = trustiness;
                row.community = community;
                row.development = development ;  
            });
            //update bp stats
            float bp_transparency = 0;
            float bp_infrastructure = 0;
            float bp_trustiness = 0;
            float bp_community = 0;
            float bp_development = 0;
            uint32_t  bp_ratings_cntr = 0;
            float  bp_average = 0;
            calculate_bp_stats (scope,
                                bp,
                                &bp_transparency,
                                &bp_infrastructure,
                                &bp_trustiness,
                                &bp_community,
                                &bp_development,
                                &bp_ratings_cntr,
                                &bp_average);
            update_bp_stats (scope,
                            &user,
                            &bp,
                            &bp_transparency,
                            &bp_infrastructure,
                            &bp_trustiness,
                            &bp_community,
                            &bp_development,
                            &bp_ratings_cntr,
                            &bp_average);
        }
    }

    void rateproducer::save_bp_stats (
        name scope,
        name user,
        name bp_name,
        float transparency,
        float infrastructure,
        float trustiness,
        float community,
        float development) {
        stats_table _stats(_self, scope.value);
        auto itr = _stats.find(bp_name.value);
        float counter =0;
        float sum = 0;
        if(itr == _stats.end()) {
        //new entry
            _stats.emplace(user, [&]( auto& row ) {
                if (transparency) {
                    row.transparency = transparency;
                    counter++;
                    sum += transparency;
                }

                if (infrastructure) {
                    row.infrastructure = infrastructure;
                    counter++;
                    sum += infrastructure;
                }

                if (trustiness) {
                    row.trustiness = trustiness;
                    counter++;
                    sum += trustiness;
                }

                if (development) {
                    row.development = development;
                    counter++;
                    sum += development;
                }

                if (community) {
                    row.community = community;
                    counter++;
                    sum += community;
                }

                if(counter) {
                    row.bp = bp_name;
                    row.ratings_cntr = 1;
                    row.average =sum/counter;
                    
                }
            });
        } else {
            //update the entry
            _stats.modify(itr, user, [&]( auto& row ) {
                if (transparency) {
                    sum += transparency;
                    if(row.transparency) {
                        transparency = (transparency + row.transparency)/2;
                    }
                    row.transparency = transparency;
                    counter++;
                }

                if (infrastructure) {
                    sum += infrastructure;
                    if(row.infrastructure) {
                        infrastructure = (infrastructure + row.infrastructure)/2;
                    }
                    row.infrastructure = infrastructure;
                    counter++;
                }

                if (trustiness) {
                    sum += trustiness;
                    if(row.trustiness) {
                        trustiness = (trustiness + row.trustiness) / 2;
                    }
                    row.trustiness = trustiness;
                    counter++;
                }

                if (development) {
                    sum += development;
                    if(row.development) {
                        development  = (development + row.development) / 2;
                    }
                    row.development = development;
                    counter++;
                }

                if (community) {
                    sum += community;
                    if(row.community) {
                        community = (community + row.community) / 2;
                    }
                    row.community = community;
                    counter++;
                }

                if(counter) {
                    row.ratings_cntr++;
                    row.average =( (sum/counter) + row.average ) / 2;
                }
            });
        }
    }

    void rateproducer::calculate_bp_stats (
        name scope,
        name bp_name,
        float * transparency,
        float * infrastructure,
        float * trustiness,
        float * community,
        float * development,
        uint32_t * ratings_cntr,
        float  * average) {
        
        float category_counter = 0;
        
        float transparency_total  = 0;
        float infrastructure_total = 0;
        float trustiness_total = 0;
        float community_total = 0;
        float development_total = 0;
        
        float transparency_cntr = 0;
        float infrastructure_cntr = 0;
        float trustiness_cntr = 0;
        float community_cntr = 0;
        float development_cntr = 0;
        uint32_t voters_cntr = 0;

        ratings_table _ratings(_self, scope.value);
        auto bps_index = _ratings.get_index<name("bp")>();
        auto bps_it = bps_index.find(bp_name.value); 
        
        while(bps_it != bps_index.end()) {
            if(bp_name == bps_it->bp) {
                if(bps_it->transparency) {
                    transparency_total+=bps_it->transparency;
                    transparency_cntr++;
                }

                if(bps_it->infrastructure) {
                    infrastructure_total+=bps_it->infrastructure;
                    infrastructure_cntr++;
                }

                if(bps_it->trustiness) {
                    trustiness_total+=bps_it->trustiness;
                    trustiness_cntr++;
                }

                if(bps_it->community) {
                    community_total+=bps_it->community;
                    community_cntr++;
                }

                if(bps_it->development) {
                    development_total+=bps_it->development;
                    development_cntr++;
                }
                voters_cntr++;
            }
            bps_it ++;
        }
        
        if(transparency_cntr) {
            *transparency = transparency_total/transparency_cntr;
            category_counter++;
        }
        
        if(infrastructure_cntr) {
            *infrastructure =infrastructure_total/infrastructure_cntr;
            category_counter++;
        }
            
        if(trustiness_cntr) {
            *trustiness = trustiness_total/trustiness_cntr;
            category_counter++;
        }
            
        if(community_cntr) {
            *community = community_total/community_cntr;
            category_counter++;
        }
            
        if(development_cntr) {
            *development = development_total/development_cntr;
            category_counter++;
        } 
        *average = (*transparency + *infrastructure + *trustiness + *community +*development)/category_counter;
        *ratings_cntr = voters_cntr;
    }

    void rateproducer::update_bp_stats (
        name scope,
        name * user,
        name * bp_name,
        float * transparency,
        float * infrastructure,
        float * trustiness,
        float * community,
        float * development,
        uint32_t * ratings_cntr,
        float * average) {
        
        stats_table _stats(_self, scope.value);
        auto itr = _stats.find(bp_name->value);
        if(itr != _stats.end()) {
            //if rate categories are more than zero
            // we store, otherwise remove the entry
            if( *transparency +
                *infrastructure +
                *trustiness +
                *community +
                *development) {
            
                _stats.modify(itr,*user, [&]( auto& row ) {
                    row.transparency = *transparency;
                    row.infrastructure = *infrastructure;
                    row.trustiness = *trustiness;
                    row.development = *development;
                    row.community = *community;      
                    row.ratings_cntr= *ratings_cntr;
                    row.average = *average;
                    });
            } else {
                _stats.erase(itr);
            }  
        }
    }

    void rateproducer::erase(name bp_name) {
        erase_aux(_self, bp_name);
        erase_aux(eden_scope, bp_name);
    }

    void rateproducer::erase_aux(name scope, name bp_name) {
        
        require_auth(_self);

        ratings_table _ratings(_self, scope.value);
        auto itr = _ratings.begin();
        while (itr != _ratings.end()) {
            if(itr->bp == bp_name) {
                itr = _ratings.erase(itr);
            } else {
                itr++;
            }
        }
        
        //clean the stats summary
        stats_table _stats(_self, scope.value);
        auto itr_stats = _stats.find(bp_name.value);
        if (itr_stats != _stats.end()) _stats.erase(itr_stats);
    }

    void rateproducer::wipe() {
        wipe_aux(_self);
        wipe_aux(eden_scope);
    }

    void rateproducer::wipe_aux(name scope) {
        require_auth(_self);
        ratings_table _ratings(_self, scope.value);
        auto itr = _ratings.begin();
        while (itr != _ratings.end()) {
            itr = _ratings.erase(itr);
        }

        stats_table _stats(_self, scope.value);
        auto itr_stats = _stats.begin();
        while (itr_stats != _stats.end()) {
            itr_stats = _stats.erase(itr_stats);
        }
    }

    void rateproducer::erase_bp_info(name scope, std::set<eosio::name> * bps_to_clean) {
        ratings_table _ratings(_self, scope.value);
        stats_table _stats(_self, scope.value);
        
        std::set<eosio::name>::iterator it;
        for (it = bps_to_clean->begin(); it != bps_to_clean->end(); ++it) {
            //clean all ratings related to an bp
            auto itr = _ratings.begin();
            while (itr != _ratings.end()) {
                if(itr->bp == *it) {
                    itr = _ratings.erase(itr);
                } else {
                    itr++;
                }
            }
            //clean the stats summary
            auto itr_stats = _stats.find((*it).value);
            if (itr_stats != _stats.end()) _stats.erase(itr_stats);
        }
    }

    void rateproducer::rminactive() {
        rminactive_aux(_self);
        rminactive_aux(eden_scope);
    }

    void rateproducer::rminactive_aux(name scope) {
        require_auth(_self);
        std::set<eosio::name> noupdated_bps; 
        stats_table _stats(_self, scope.value);
        auto itr_stats = _stats.begin();
        while (itr_stats != _stats.end()) {
            if (!is_blockproducer(itr_stats->bp)) {
                noupdated_bps.insert(itr_stats->bp);
            }
            itr_stats++;
        }
        if(noupdated_bps.size()) erase_bp_info(scope, &noupdated_bps);
        print("bps deleted:",noupdated_bps.size());
    }

    void rateproducer::rmrate(name user, name bp) {
        rmrate_aux(_self, user, bp);
        if(is_eden(user)) rmrate_aux(eden_scope, user, bp);
    }

    void rateproducer::rmrate_aux(name scope, name user, name bp) {
        require_auth(user);
        
        ratings_table _ratings(_self, scope.value);
        auto uniq_rating = (static_cast<uint128_t>(user.value) << 64) | bp.value;

        auto uniq_rating_index = _ratings.get_index<name("uniqrating")>();
        auto existing_rating = uniq_rating_index.find(uniq_rating);

        check( existing_rating != uniq_rating_index.end(), "Rating does not exist" );

        //delete rate info
        auto itr = uniq_rating_index.erase(existing_rating);
        
        //update bp stats
        float bp_transparency = 0;
        float bp_infrastructure = 0;
        float bp_trustiness = 0;
        float bp_community = 0;
        float bp_development = 0;
        uint32_t  bp_ratings_cntr = 0;
        float  bp_average = 0;

        //re-calculate stats for the bp 
        calculate_bp_stats (scope,
                            bp,
                            &bp_transparency,
                            &bp_infrastructure,
                            &bp_trustiness,
                            &bp_community,
                            &bp_development,
                            &bp_ratings_cntr,
                            &bp_average);
                            
        //save the re-calcualtes stats
        update_bp_stats (scope,
                        &user,
                        &bp,
                        &bp_transparency,
                        &bp_infrastructure,
                        &bp_trustiness,
                        &bp_community,
                        &bp_development,
                        &bp_ratings_cntr,
                        &bp_average);
    }

    void rateproducer::loadedens() {
        config c = cfg.get_or_create(_self, config{.owner = _self, .version = 0});
        require_auth(c.owner);

        // assert we only run once
        // the comparison value needs to be hard-coded with each new migration
        eosio::check(c.version < 1, "Migration already ran");

        ratings_table _ratings_self(_self, _self.value);
        ratings_table _ratings_eden(_self, eden_scope.value);

        for(auto itr = _ratings_self.begin(); itr != _ratings_self.end(); itr++) {
            if(is_eden(itr->user)) {
                _ratings_eden.emplace(_self, [&]( auto& row ) {
                    row.id = itr->id;
                    row.uniq_rating = itr->uniq_rating;
                    row.user = itr->user;
                    row.bp = itr->bp;
                    row.transparency = itr->transparency;
                    row.infrastructure = itr->infrastructure;
                    row.trustiness = itr->trustiness;
                    row.community = itr->community;
                    row.development = itr->development ;   
                });
                //save stats
                save_bp_stats(eden_scope,
                            _self,
                            itr->bp,
                            itr->transparency,
                            itr->infrastructure,
                            itr->trustiness,
                            itr->community,
                            itr->development);
            }
        }

        c.version++;
        cfg.set(c, c.owner);
    }
} // namespace eoscostarica


EOSIO_ACTION_DISPATCHER(eoscostarica::actions)

EOSIO_ABIGEN(actions(eoscostarica::actions),
            table("ratings"_n, eoscostarica::ratings),
            table("stats"_n, eoscostarica::stats))