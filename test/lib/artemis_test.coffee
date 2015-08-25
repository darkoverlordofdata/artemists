describe 'Smoke test: ' , ->

  describe 'verify the api namespace', ->

    it "utils module", ->
      
      artemis.should.have.property 'utils'
      
    it "managers module", ->
      
      artemis.should.have.property 'managers'
      
    it "systems module", ->
      
      artemis.should.have.property 'systems'
      

    it 'create world', ->
      
      w = new artemis.World()
