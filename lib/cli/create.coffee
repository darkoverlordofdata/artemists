#!/usr/bin/env coffee
###
 * Artemis code generation
 *
 * emulate the partial class strategy for extensions
 * used by artemis_CSharp
 *
###
fs = require('fs')
mkdirp = require('mkdirp')
config = require("#{process.cwd()}/artemis.json")

module.exports =
#
# create a new entity, component or system
#
# @param  [String]  type to create
# @param  [Array<String>]  remaining arguments
# @return none
#
  run: (type, name, args...) ->

    switch type
      when '-e' or '--entity'
        create.entity(name, args...)

      when '-c' or '--component'
        create.component(name, args...)

      when '-s' or '--system'
        create.system(name, args...)

      when '-x' or '--extension'
        create.extension(name, args...)


###
 *
 * Create E/C/S
 *
###
create =
  entity:(name) ->
    config.entities[name] = true
    fs.writeFileSync("#{process.cwd()}/artemis.json", JSON.stringify(config, null, 2))

  component:(name, args...) ->
    args = if args.length is 0 then false else args
    config.components[name] = args
    fs.writeFileSync("#{process.cwd()}/artemis.json", JSON.stringify(config, null, 2))

  system:(name, args...) ->
    config.systems[name] = true
    fs.writeFileSync("#{process.cwd()}/artemis.json", JSON.stringify(config, null, 2))
    template = systemTemplate(name, args...)
    mkdirp.sync "#{process.cwd()}/#{config.src}/systems"
    fs.writeFileSync("#{process.cwd()}/#{config.src}/systems/#{name}.ts", template)

    # update the project
    tsconfig = JSON.parse(fs.readFileSync("#{process.cwd()}/tsconfig.json", 'utf8'))
    if tsconfig.files.indexOf("#{config.src}/systems/#{name}.ts") is -1
      tsconfig.files.push "#{config.src}/systems/#{name}.ts"
      fs.writeFileSync("#{process.cwd()}/tsconfig.json", JSON.stringify(tsconfig, null, 2))

  extension:(name, method, args...) ->
    config.extensions = config.extensions || {}
    config.extensions[name] = config.extensions[name] || {}
    config.extensions[name][method] = args
    fs.writeFileSync("#{process.cwd()}/artemis.json", JSON.stringify(config, null, 2))



systemTemplate = (name, uber='EntityProcessingSystem', components...) ->

  sb = [] # StringBuilder

  sb.push "module #{config.namespace}.systems {"
  sb.push ""
  sb.push "  import Aspect = artemis.Aspect;"
  sb.push "  import ComponentMapper = artemis.ComponentMapper;"
  sb.push "  import Entity = artemis.Entity;"
  if uber is 'EntitySystem'
    sb.push "  import #{uber} = artemis.EntitySystem"
  else
    sb.push "  import #{uber} = artemis.systems.#{uber}"
  for component in components
    sb.push "  import #{component} = artemis.components.#{component};"
  sb.push ""
  
  sb.push "  export class #{name} extends #{uber} {"

  sb.push ""
  sb.push "    constructor() {"
  sb.push "        super(Aspect.getAspectForAll(#{components.join(', ')}));"
  sb.push "    }"
  sb.push ""
  sb.push "    public initialize() {"
  sb.push "    }"
  sb.push "    "

  switch uber
  
    when "EntitySystem"
      sb.push "    protected processEntities(entities:ImmutableBag<Entity>) {"
      sb.push "    }"
      sb.push "    "
      sb.push "    protected checkProcessing():boolean {"
      sb.push "      return true;"
      sb.push "    }"
      sb.push "    "
      sb.push "    "
      sb.push "    "
  
    when "DelayedEntityProcessingSystem"
      sb.push "    protected processDelta(e:Entity, accumulatedDelta:number) {"
      sb.push "    }"
      sb.push "    "
      sb.push "    protected processExpired(e:Entity) {"
      sb.push "    }"
      sb.push "    "
      sb.push "    protected getRemainingDelay(e:Entity):number {"
      sb.push "      return 0;"
      sb.push "    }"
      sb.push "    "
      
    when "EntityProcessingSystem"
      sb.push "    public processEach(e:Entity) {"
      sb.push "    }"
      sb.push "    "
    
    when "IntervalEntitySystem"
      sb.push "    public processEach(e:Entity) {"
      sb.push "    }"
      sb.push "    "
    
    when "IntervalEntitySystem"
      sb.push "    "
      sb.push "    "
      sb.push "    "
  
    when "VoidEntitySystem"
      sb.push "    protected processSystem() {"
      sb.push "    }"
      sb.push "    "

  sb.push ""

  sb.push ""
  sb.push ""
  sb.push "  }"
  sb.push "}"
  sb.join('\n')


