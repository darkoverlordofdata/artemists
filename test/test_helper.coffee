#
#	test_helper - Set up the test environment
#
#
#
#

do (artemis = require('../build/artemis.js').artemis) ->



  Object.defineProperties @,
    # Use chai 'should' semantics
    should: value: require('chai').should()
    artemis: value: artemis

