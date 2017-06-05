(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./string-format", "./string-formatc"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var string_format_1 = require("./string-format");
    exports.stringFormat = string_format_1.stringFormat;
    var string_formatc_1 = require("./string-formatc");
    exports.stringFormatc = string_formatc_1.stringFormatc;
});
