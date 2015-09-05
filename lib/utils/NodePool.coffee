###
 * This internal class maintains a pool of deleted nodes for reuse by the framework. This reduces the overhead
 * from object creation and garbage collection.
 *
 * Because nodes may be deleted from a NodeList while in use, by deleting Nodes from a NodeList
 * while iterating through the NodeList, the pool also maintains a cache of nodes that are added to the pool
 * but should not be reused yet. They are then released into the pool by calling the releaseCache method.
###
'use strict'

class ash.core.NodePool

  ###*
   * @type {ash.core.Node}
  ###
  tail: null
  
  ###*
   * @type {Function}
  ###
  nodeClass: null
  
  ###*
   * @type {ash.core.Node}
  ###
  cacheTail: null
  
  ###*
   * @type {ash.ext.Dictionary}
  ###
  components: null
  
  ###*
   * Creates a pool for the given node class.
   * 
   * @constructor
   * @param {Function} nodeClass
   * @param {ash.core.Dictionary} 
  ###
  constructor: (@nodeClass, @components) ->


  ###*
   * Fetches a node from the pool.
   * @return {ash.core.Node}
  ###
  get: ->
    if (@tail)
      node = @tail
      @tail = @tail.previous
      node.previous = null
      return node
    else
      node = new @nodeClass()
      return node

  ###*
   * dispose of a node
   * @param {ash.core.Node} 
  ###
  dispose: (node) ->
    for componentName of @components
      node[componentName] = null
    node.entity = null
    node.next = null
    node.previous = @tail
    @tail = node
    return # Void

  ###*
   * Adds a node to the cache
   * @param {ash.core.Node} 
  ###
  cache: (node) ->
    node.previous = @cacheTail
    @cacheTail = node
    return # Void

  ###*
   * Releases all nodes from the cache into the pool
  ###
  releaseCache: () ->
    while (@cacheTail)
      node = @cacheTail
      @cacheTail = node.previous
      @dispose(node)

    return # Void
