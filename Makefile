
BIN := node_modules/.bin
EXAMPLES = $(wildcard examples/*/index.js)

test: clean node_modules
	@$(BIN)/mocha --reporter spec

examples: node_modules $(EXAMPLES:index.js=build.js)

examples/%/build.js: examples/%/index.js
	$(BIN)/duo --use ./index.js $^ > $@

clean:
	@rm -rf components examples/*/components
	@rm -f examples/*/build.js

node_modules: package.json
	@npm install
	@touch $@

.PHONY: examples test
