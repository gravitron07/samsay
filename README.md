# samsay [![Build Status](https://travis-ci.org/yeoman/samsay.svg?branch=master)](https://travis-ci.org/yeoman/samsay)

> Tell Yeoman what to say

Like [cowsay](https://en.wikipedia.org/wiki/Cowsay), but less cow.

This is a really stupid fork of https://github.com/yeoman/yosay.

I just wanted my generator to talk like Samuel L. Jackson.


## Install

```
$ npm install samsay
```


## Usage

```js
const samsay = require('samsay');

console.log(samsay('Hello, and welcome to my fantastic generator full of whimsy and bubble gum!'));

/*
     _-----_     ╭──────────────────────────╮
    |       |    │ Hello, and welcome to my │
    |--(o)--|    │ fantastic generator full │
   `---------´   │   of whimsy and bubble   │
    ( _´U`_ )    │           gum!           │
    /___A___\   /╰──────────────────────────╯
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `
 */
```

*You can style your text with [`chalk`](https://github.com/sindresorhus/chalk) before passing it to `samsay`.*


## CLI

```
$ npm install --global samsay
```

```
$ samsay --help

  Usage
    $ samsay <string>
    $ samsay <string> --maxLength 8
    $ echo <string> | samsay

  Example
    $ samsay 'Sindre is a horse'

     _-----_
    |       |
    |--(o)--|    ╭──────────────────────────╮
   `---------´   │     Sindre is a horse    │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `
```


## License

BSD-2-Clause © Google
