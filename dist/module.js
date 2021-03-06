"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanImageData = exports.scanRGBABuffer = exports.scanGrayBuffer = exports.getDefaultScanner = void 0;
const Image_1 = require("./Image");
const ImageScanner_1 = require("./ImageScanner");
const defaultScannerPromise = ImageScanner_1.ImageScanner.create();
const enum_1 = require("./enum");
exports.getDefaultScanner = async () => {
    return await defaultScannerPromise;
};
const scanImage = async (image, scanner) => {
    if (scanner === undefined) {
        scanner = await defaultScannerPromise;
    }
    // To enable only code 128 barcode types
    scanner.setConfig(enum_1.ZBarSymbolType.ZBAR_NONE, enum_1.ZBarConfigType.ZBAR_CFG_ENABLE, 0);
    scanner.setConfig(enum_1.ZBarSymbolType.ZBAR_CODE128, enum_1.ZBarConfigType.ZBAR_CFG_ENABLE, 1);
    const res = scanner.scan(image);
    if (res < 0) {
        throw Error('Scan Failed');
    }
    if (res === 0)
        return [];
    return image.getSymbols();
};
exports.scanGrayBuffer = async (buffer, width, height, scanner) => {
    const image = await Image_1.Image.createFromGrayBuffer(width, height, buffer);
    const res = await scanImage(image, scanner);
    image.destroy();
    return res;
};
exports.scanRGBABuffer = async (buffer, width, height, scanner) => {
    const image = await Image_1.Image.createFromRGBABuffer(width, height, buffer);
    const res = await scanImage(image, scanner);
    image.destroy();
    return res;
};
exports.scanImageData = async (image, scanner) => {
    return await exports.scanRGBABuffer(image.data.buffer, image.width, image.height, scanner);
};
//# sourceMappingURL=module.js.map