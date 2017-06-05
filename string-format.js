"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringFormat(format) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return formatStringImp.apply(null, arguments);
}
exports.stringFormat = stringFormat;
var nargs = /\{([0-9a-zA-Z]+)\}/g;
function formatStringImp(format) {
    var _args;
    if (arguments.length === 2 && typeof arguments[1] === "object") {
        _args = arguments[1];
    }
    else {
        _args = Array.prototype.slice.call(arguments, 1);
    }
    if (!_args || !_args.hasOwnProperty) {
        _args = {};
    }
    return format.replace(nargs, function replaceArg(match, i, index) {
        var result;
        if (format[index - 1] === "{" &&
            format[index + match.length] === "}") {
            return i;
        }
        else {
            result = _args.hasOwnProperty(i) ? _args[i] : null;
            if (result === null || result === undefined) {
                return "";
            }
            return result;
        }
    });
}
