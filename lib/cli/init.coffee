#!/usr/bin/env coffee
###
 * Artemis code generation
 *
 * emulate the partial class strategy for extensions
 * used by Entitas_CSharp
 *
###
fs = require('fs')
path = require('path')
liquid = require('liquid.coffee')
mkdirp = require('mkdirp')

module.exports =
#
# create a new component or system
#
# @param  [String]  project namespace
# @param  [String]  flag -t/--template
# @param  [String]  type
# @return none
#
  run: (namespace, flag, type) ->

    flag = flag || '-t'
    type = type || 'default'

    content = """
{
  "namespace":"#{namespace}",
  "src": "example/src",
  "output": {
    "javascript": "web/src/#{namespace}/generatedExtensions.js",
    "typescript": "example/src/generatedComponents.ts",
    "declaration": "example/ext/#{namespace}.d.ts"
  },
  "components": {
  },
  "systems": {
  },
  "entities": {
  }
}
"""
    fs.writeFileSync("#{process.cwd()}/artemis.json", content)
#    if type is 'none'
#      fs.writeFileSync("#{process.cwd()}/artemis.json", content)
#      return
#
#    # source template folder
#    tf = "#{__dirname}/tpl/#{type}"
#
#    # generate artemis.json from Liquid template
#    tpl = liquid.Template.parse(fs.readFileSync("#{tf}/artemis.json", 'utf8'))
#    content = tpl.render(namespace:namespace)
#    config = JSON.parse(content)
#    fs.writeFileSync("#{process.cwd()}/artemis.json", content)
#    console.log "#{type}:config #{process.cwd()}/artemis.json"
#
#    # ensure that the project has a tsconfig
#    if not fs.existsSync("#{process.cwd()}/tsconfig.json")
#      tpl = liquid.Template.parse(fs.readFileSync("#{tf}/tsconfig.json", 'utf8'))
#      tsconfig = JSON.parse(tpl.render(namespace:namespace))
#      tsconfig.files = []
#      fs.writeFileSync("#{process.cwd()}/tsconfig.json", JSON.stringify(tsconfig, null, 2))
#
#
#
#    # generate list of source files from Liquid templates
#    cfg = JSON.parse(fs.readFileSync("#{tf}/tsconfig.json", 'utf8'))
#    for file in cfg.files
#      tpl = liquid.Template.parse(fs.readFileSync("#{tf}/#{file}", 'utf8'))
#      content = tpl.render(namespace:namespace)
#      folder = path.dirname(file)
#      base = path.basename(file, '.tpl')
#      mkdirp.sync "#{process.cwd()}/#{config.src}/#{folder}"
#      fs.writeFileSync("#{process.cwd()}/#{config.src}/#{folder}/#{base}", content)
#      console.log "#{type}:source #{process.cwd()}/#{config.src}/#{folder}/#{base}"
#
#      # update the project
#      tsconfig = JSON.parse(fs.readFileSync("#{process.cwd()}/tsconfig.json", 'utf8'))
#      if tsconfig.files.indexOf("#{config.src}/#{folder}/#{base}") is -1
#        tsconfig.files.push "#{config.src}/#{folder}/#{base}"
#        fs.writeFileSync("#{process.cwd()}/tsconfig.json", JSON.stringify(tsconfig, null, 2))
#
#
#
#
