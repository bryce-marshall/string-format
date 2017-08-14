export function stringFormat(format: string, ...args: any[]): string {
    return formatStringImp.apply(null, arguments);
}

var nargs = /\{([0-9a-zA-Z]+)\}/g
function formatStringImp(format: string): string {
    var _args

    if (arguments.length === 2 && typeof arguments[1] === "object") {
        _args = arguments[1]
    } else {
        _args = Array.prototype.slice.call(arguments, 1)
    }

    if (!_args || !_args.hasOwnProperty) {
        _args = {}
    }

    return format.replace(nargs, function replaceArg(match, i, index) {
        var result

        if (format[index - 1] === "{" &&
            format[index + match.length] === "}") {
            return i
        } else {
            result = _args[i];
            if (result === null || result === undefined) {
                return ""
            }

            return result
        }
    })
}