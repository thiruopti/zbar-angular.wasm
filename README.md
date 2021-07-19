# ZBar.wasm

[![GitHub](https://img.shields.io/github/license/samsam2310/zbar.wasm)](https://thiruopti/zbar-angular.wasm/blob/master/LICENSE)


[![npm version](https://badge.fury.io/js/zbar.wasm.svg)](https://www.npmjs.com/package/zbar-angular.wasm)

A webassembly build of C/C++ Zbar barcode scanning library.

* **Fast.** Webassembly is faster than many pure ECMAScript implementations.
* **Powerful** ZBar supports many kinds of barcode, includes CODE128...etc.
* **Portability** Most modern browsers and nodejs supports Webassembly.


## Quick Start

Install:
``` bash
npm i zbar-angular.wasm
```

Quick example (nodejs):

``` javascript
const { createCanvas, loadImage } = require('canvas');
const { scanImageData } = require('zbar-angular.wasm');

const getImageData = async (src) => {
  const img = await loadImage(src);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, img.width, img.height);
};

const url = 'https://raw.githubusercontent.com/zbar-angular-wasm/demo/master/node/test.png';
const main = async () => {
  const img = await getImageData(url);
  const res = await scanImageData(img);
  console.log(res[0].typeName); // ZBAR_QRCODE
  console.log(res[0].decode()); // Hello World
};

main();
```


## Documentation

The full documentation for ZBar.wasm can be found on the [wiki](https://github.com/thiruopti/zbar-angular.wasm/wiki).

Note that for frontend developer who use webpack to bundle js codes, webpack [file-loader](https://webpack.js.org/loaders/file-loader/) is required to load the wasm binary.
Some project like create-react-app already handle this for you. But if you want to use your own webpack config, remember to use file-loader for file `zbar-angular.wasm.bin`.
For the reason why not just use `*.wasm` extensions, see [this issue](https://github.com/webpack/webpack/issues/6725)


## How to Build ZBar.wasm

ZBar.wasm use [emscripten](https://emscripten.org/) to compile C++ code into webassembly.
The default Makefile use docker to provide emscripten environment.
Makesure docker command is accessable by the user that running Makefile.
Overwrite Makefile variable can change the toolchains for building.

To build:
``` bash
npm i
npm run build
npm run test
```
