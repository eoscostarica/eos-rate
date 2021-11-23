cmake_minimum_required(VERSION 3.16)
project(rateproducer)


set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)


find_package(clsdk REQUIRED)


add_executable(rateproducer src/rateproducer.cpp)
target_link_libraries(rateproducer eosio-contract-simple-malloc)


add_executable(rateproducer-abigen src/rateproducer.cpp)
target_link_libraries(rateproducer-abigen eosio-contract-abigen)
add_custom_command(TARGET rateproducer-abigen POST_BUILD
    COMMAND cltester rateproducer-abigen.wasm >rateproducer.abi
)


execute_process(COMMAND ln -sf ${clsdk_DIR} ${CMAKE_CURRENT_BINARY_DIR}/clsdk)
execute_process(COMMAND ln -sf ${WASI_SDK_PREFIX} ${CMAKE_CURRENT_BINARY_DIR}/wasi-sdk)


set(CMAKE_EXPORT_COMPILE_COMMANDS on)