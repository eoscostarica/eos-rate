#pragma once

#include <eosio/eosio.hpp>
#include <eosio/singleton.hpp>
#include <eosio/system.hpp>

namespace eden
{
   inline constexpr auto token_contract = "eosio.token"_n;
   inline constexpr uint64_t default_scope = 0;
   inline constexpr uint16_t max_active_members = 10000;
   inline constexpr uint32_t induction_expiration_secs = 7 * 24 * 60 * 60;  // 1 week
   inline constexpr double initial_market_fee = 0.05;

   inline constexpr uint32_t max_gc_on_induction = 32;
   inline constexpr uint32_t election_seeding_window = 24 * 60 * 60;
   inline constexpr uint16_t min_election_threshold = 1000;

   inline static uint128_t combine_names(const eosio::name a, const eosio::name b)
   {
      return uint128_t{a.value} << 64 | b.value;
   }

#define EDEN_FORWARD_FUNCTION(var, fun)                                \
   auto fun() const                                                    \
   {                                                                   \
      return std::visit([](auto& value) { return value.fun(); }, var); \
   }
#define EDEN_FORWARD_FUNCTIONS(var, ...) \
   EOSIO_MAP_REUSE_ARG0(EDEN_FORWARD_FUNCTION, var, __VA_ARGS__)

#define EDEN_FORWARD_MEMBER(var, member)                                                    \
   decltype(auto) member()                                                                  \
   {                                                                                        \
      return std::visit([](auto& value) -> decltype(auto) { return (value.member); }, var); \
   }                                                                                        \
   decltype(auto) member() const                                                            \
   {                                                                                        \
      return std::visit([](auto& value) -> decltype(auto) { return (value.member); }, var); \
   }
#define EDEN_FORWARD_MEMBERS(var, ...) EOSIO_MAP_REUSE_ARG0(EDEN_FORWARD_MEMBER, var, __VA_ARGS__)

   template <typename Index>
   void clear_secondary_index(Index idx)
   {
      using secondary_key_type = typename Index::secondary_key_type;
      secondary_key_type secondary =
          eosio::_multi_index_detail::secondary_key_traits<secondary_key_type>::true_lowest();
      using traits = eosio::_multi_index_detail::secondary_index_db_functions<secondary_key_type>;
      uint64_t primary;
      int itr = traits::db_idx_lowerbound(idx.get_code().value, idx.get_scope(), idx.name(),
                                          secondary, primary);
      while (itr >= 0)
      {
         auto tmp = itr;
         uint64_t primary;
         itr = traits::db_idx_next(itr, &primary);
         traits::db_idx_remove(tmp);
      }
   }

   template <eosio::name::raw TableName, typename T, typename... Indices>
   void clear_secondary(eosio::multi_index<TableName, T, Indices...>& tb)
   {
      (clear_secondary_index(
           tb.template get_index<static_cast<eosio::name::raw>(Indices::index_name)>()),
       ...);
   }

   template <eosio::name::raw TableName, typename T, typename... Indices>
   void clear_primary(eosio::multi_index<TableName, T, Indices...>& tb)
   {
      auto itr = eosio::internal_use_do_not_use::db_lowerbound_i64(
          tb.get_code().value, tb.get_scope(), static_cast<uint64_t>(TableName), 0);
      while (itr >= 0)
      {
         auto tmp = itr;
         uint64_t primary;
         itr = eosio::internal_use_do_not_use::db_next_i64(itr, &primary);
         eosio::internal_use_do_not_use::db_remove_i64(tmp);
      }
   }

   // Warning: this leaves the multi_index with a bad cache.
   // However, it will work even if the data in the table does not
   // match the type of the multi_index.
   template <typename T>
   void clear_table(T&& tb)
   {
      clear_secondary(tb);
      clear_primary(tb);
   }

   template <eosio::name::raw SingletonName, typename T>
   void clear_singleton(eosio::singleton<SingletonName, T>& singleton, eosio::name contract)
   {
      auto itr = eosio::internal_use_do_not_use::db_lowerbound_i64(
          contract.value, default_scope, static_cast<uint64_t>(SingletonName), 0);
      while (itr >= 0)
      {
         auto tmp = itr;
         uint64_t primary;
         itr = eosio::internal_use_do_not_use::db_next_i64(itr, &primary);
         eosio::internal_use_do_not_use::db_remove_i64(tmp);
      }
   }

}  // namespace eden
