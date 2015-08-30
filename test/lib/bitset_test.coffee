describe 'BitSet test: ' , ->

  describe 'verify the api namespace', ->

    it "Create BitSet object", ->
      
      b = new artemis.utils.BitSet(40)
      b.words_.length.should.equal(2)
      
    it "Set But", ->
      
      b = new artemis.utils.BitSet(40)
      b.set(32, true)
      b.words_[1].should.equal(1)
      b.set(31, true)
      # b.words_[0].should.equal(2**31)
      #console.log b

    it "Get Bit", ->
      
      b = new artemis.utils.BitSet(40)
      b.set(32, true)
      c = b.get(32)
      #console.log 'c',c
      b.set(31, true)
      c = b.get(30)
      #console.log 'c',c
      # b.words_[0].should.equal(2**31)
      #console.log b
      