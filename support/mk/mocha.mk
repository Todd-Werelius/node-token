MOCHA ?= ./node_modules/.bin/mocha
_MOCHA ?= ./node_modules/.bin/_mocha
MOCHA_REPORTER ?= spec

test-mocha: node_modules
	NODE_PATH=$(NODE_PATH_TEST) \
	$(MOCHA) \
		--reporter $(MOCHA_REPORTER) \
		$(TESTS) \
		--recursive

.PHONY: test-mocha