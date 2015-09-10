describe 'Smoke test: ' , ->

  describe 'verify the api namespace', ->

    it "has a utils module", ->
      artemis.should.have.property 'utils'
      
    it "has a managers module", ->
      artemis.should.have.property 'managers'
      
    it "has a systems module", ->
      artemis.should.have.property 'systems'

