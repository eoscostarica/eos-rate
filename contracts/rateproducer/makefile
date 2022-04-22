-include ../../.env

compile:
	@mkdir -p build
	@cd build && cmake `clsdk-cmake-args` .. && make -j $(nproc)
	@cd build && cp rateproducer.* ..
	@echo "compiled"

deploy:
	cleos -u $(CONTRACT_ENDPOINT) set contract $(CONTRACT_ACCOUNT) ./
	@echo "deployed"