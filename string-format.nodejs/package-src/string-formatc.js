(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./string-format"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var string_format_1 = require("./string-format");
    function stringFormatc(format, inline) {
        return compileImp.apply(null, arguments);
    }
    exports.stringFormatc = stringFormatc;
    var whitespaceRegex = /["'\\\n\r\u2028\u2029]/g;
    var nargs = /\{[0-9a-zA-Z]+\}/g;
    var replaceTemplate = "    var args\n" +
        "    var result\n" +
        "    if (arguments.length === 1 && typeof arguments[0] === \"object\") {\n" +
        "        args = arguments[0]\n" +
        "    } else {\n" +
        "        args = arguments" +
        "    }\n\n" +
        "    if (!args || !(\"hasOwnProperty\" in args)) {\n" +
        "       args = {}\n" +
        "    }\n\n" +
        "    return {0}";
    var literalTemplate = "\"{0}\"";
    var argTemplate = "(result = args.hasOwnProperty(\"{0}\") ? " +
        "args[\"{0}\"] : null, \n        " +
        "(result === null || result === undefined) ? \"\" : result)";
    function compileImp(string, inline) {
        var replacements = string.match(nargs);
        var interleave = string.split(nargs);
        var replace = [];
        for (var i = 0; i < interleave.length; i++) {
            var current = interleave[i];
            var replacement = replacements[i];
            var escapeLeft = current.charAt(current.length - 1);
            var escapeRight = (interleave[i + 1] || "").charAt(0);
            if (replacement) {
                replacement = replacement.substring(1, replacement.length - 1);
            }
            if (escapeLeft === "{" && escapeRight === "}") {
                replace.push(current + replacement);
            }
            else {
                replace.push(current);
                if (replacement) {
                    replace.push({ name: replacement });
                }
            }
        }
        var prev = [""];
        for (var j = 0; j < replace.length; j++) {
            var curr = replace[j];
            if (String(curr) === curr) {
                var top = prev[prev.length - 1];
                if (String(top) === top) {
                    prev[prev.length - 1] = top + curr;
                }
                else {
                    prev.push(curr);
                }
            }
            else {
                prev.push(curr);
            }
        }
        replace = prev;
        if (inline) {
            for (var k = 0; k < replace.length; k++) {
                var token = replace[k];
                if (String(token) === token) {
                    replace[k] = string_format_1.stringFormat(literalTemplate, escape(token));
                }
                else {
                    replace[k] = string_format_1.stringFormat(argTemplate, escape(token.name));
                }
            }
            var replaceCode = replace.join(" +\n    ");
            var compiledSource = string_format_1.stringFormat(replaceTemplate, replaceCode);
            return new Function(compiledSource);
        }
    }
    function escape(string) {
        string = '' + string;
        return string.replace(whitespaceRegex, escapedWhitespace);
    }
    function escapedWhitespace(character) {
        switch (character) {
            case '"':
            case "'":
            case '\\':
                return '\\' + character;
            case '\n':
                return '\\n';
            case '\r':
                return '\\r';
            case '\u2028':
                return '\\u2028';
            case '\u2029':
                return '\\u2029';
        }
    }
});
