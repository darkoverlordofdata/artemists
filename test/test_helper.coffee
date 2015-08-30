#
#	test_helper - Set up the test environment
#
#
#
#

do (artemis = require('../build/artemis.js').artemis,
    brokenspork = require('../build/artemis.js').brokenspork) ->



  Object.defineProperties @,
    # Use chai 'should' semantics
    should: value: require('chai').should()
    artemis: value: artemis
    brokenspork: value: brokenspork

