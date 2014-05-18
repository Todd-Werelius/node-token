MOCHA ?= ./node_modules/.bin/mocha
#_MOCHA ?= ./node_modules/.bin/_mocha
_MOCHA ?= ./node_modules/mocha/bin/_mocha
MOCHA_REPORTER ?= spec

test-mocha: node_modules
	NODE_PATH=$(NODE_PATH_TEST) \
	$(MOCHA) \
		--reporter $(MOCHA_REPORTER) \
		$(TESTS)

.PHONY: test-mocha

#node .\node_modules\istanbul\lib\cli.js cover node_modules\mocha\bin\_mocha -- -R spec .\test\**\*.test.js
#node ./node_modules/istanbul/lib/cli.js cover node_modules/mocha/bin/_mocha -- -R spec ./test/**/*.test.js


