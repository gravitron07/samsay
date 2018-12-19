#!/usr/bin/env node
'use strict';
const pkg = require('./package.json');
const samsay = require('.');

require('taketalk')({
  init(input, options) {
    console.log(samsay(input, options));
  },
  help() {
    console.log(`
  ${pkg.description}

  Usage
    $ samsay <string>
    $ samsay <string> --maxLength 8
    $ echo <string> | samsay

  Example
    $ samsay 'Sindre is a horse'
    ${samsay('Sindre is a horse')}`);
  },
  version: pkg.version
});
