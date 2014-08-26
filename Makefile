
BIN := node_modules/.bin
EXAMPLES = $(wildcard examples/*/index.js)

test: clean
	@$(BIN)/mocha --reporter spec

examples: $(EXAMPLES:index.js=build.js)

examples/%/build.js: examples/%/index.js
	$(BIN)/duo --use ./index.js $^ > $@

clean:
	@rm -rf components examples/*/components
	@rm -f examples/*/build.js


.PHONY: examples test
