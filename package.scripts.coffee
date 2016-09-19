###
#+--------------------------------------------------------------------+
#| package.scripts.coffee
#+--------------------------------------------------------------------+
#| Copyright DarkOverlordOfData (c) 2014-2015
#+--------------------------------------------------------------------+
#|
#| Generate npm scripts for package.json
#|
#| package.scripts is free software; you can copy, modify, and distribute
#| it under the terms of the MIT License
#|
#+--------------------------------------------------------------------+
###
fs = require('fs')


# paths:
LIB_NAME        = (require('./package.json')).name
COMPILER_JAR    = "packages/closure-compiler/lib/vendor/compiler.jar"

###
# bind npm scripts 
###
module.exports = (project, options = {}) ->

  ### 
   * VS Code ctrl-shift-b 
  ###
  _vscode_build: 
      "bin/artemis generate && tsc -p ./tsconfig_artemis.json && tsc -p ./tsconfig_example.json"

  ### 
   * build the project 
  ###
  build: do ->
    options.compile ?= 'ADVANCED_OPTIMIZATIONS'

    step = [].concat(project.config.pre_build || [])

    # Build with tsc, then compress
    step.push """
      tsc --outFile build/#{LIB_NAME}.js
      cat build/#{LIB_NAME}.js | \
        java -jar #{COMPILER_JAR} \
          --compilation_level #{options.compile} \
          --js_output_file build/#{LIB_NAME}.min.js
    """
    return step.concat(project.config.post_build || [])

  ### 
   * delete the prior build items 
  ###
  clean: """
    rm -rf build/*
    mkdir -p build
    mkdir -p build/web
    mkdir -p build/lib
  """
  
  ### 
   * publish gh-pages 
  ###
  publish: """
    gulp publish
  """

  ### 
   * get the dependencies 
  ###
  postinstall: """
    bower-install
  """

  ### 
   * prepare for build 
  ###
  prebuild: """
    npm run clean -s
  """

  ### 
   * run the dev version of the app 
  ###
  start: """
    tools/server web
  """

  ### 
   * run the build version of the app 
  ###
  serve: """
    tools/server build/web
  """

  ### 
   * run the unit tests 
  ###
  test: """
    NODE_ENV=test mocha \
      --compilers coffee:coffee-script \
      --require test/test_helper.js \
      --recursive
  """
