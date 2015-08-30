describe 'Smoke test: ' , ->

  describe 'verify the api namespace', ->

    it "has a utils module", ->
      artemis.should.have.property 'utils'
      
    it "has a managers module", ->
      artemis.should.have.property 'managers'
      
    it "has a systems module", ->
      artemis.should.have.property 'systems'

    it "has a components nodule", ->
      brokenspork.should.have.property 'components'

    it "has a core nodule", ->
    brokenspork.should.have.property 'core'

    it "has a systems nodule", ->
    brokenspork.should.have.property 'systems'

    it 'create world', ->
      w = new artemis.World()
