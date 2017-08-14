# @brycemarshall/string-format
A Typescript port of Matt Esch's string-template library (original NPM Package at https://www.npmjs.com/package/string-template)

## Installation

npm install @brycemarshall/string-format

## The module exports the following two functions:

```ts
function stringFormat(format: string, ...args: any[]): string
function stringFormatc(format: string, inline?: boolean): string
```

## Usage - stringFormat

A simple string formatting function based on named or indexed arguments

```ts
import { stringFormat } from '@brycemarshall/string-format';

// Format using an object hash with keys matching [0-9a-zA-Z]+
let greeting = stringFormat("Hello {name}, you have {count} unread messages", {
    name: "Robert",
    count: 12
})
// greeting -> "Hello Robert, you have 12 unread messages"

// Format using a number indexed array
let greeting = stringFormat("Hello {0}, you have {1} unread messages", ["Robert", 12])
// greeting -> "Hello Robert, you have 12 unread messages"


// Format using optional arguments
let greeting = stringFormat("Hello {0}, you have {1} unread messages",
     "Robert",
     12)
// greeting -> "Hello Robert, you have 12 unread messages"

// Escape {} pairs by using double {{}}
let text = stringFormat("{{0}}")
// text -> "{0}"
```

## Usage - stringFormatc

`@brycemarshall/string-format` exposes two template compiling options for when you need the additional performance.
Arguments passed to the compiled template are of the same structure as the main `string-template` function, so either a single object/array or a list of arguments.

```ts
import { stringFormatc } from '@brycemarshall/string-format';

let greetingTemplate = stringFormatc("Hello {0}, you have {1} unread messages")

let greeting = greetingTemplate("Robert", 12)
// -> "Hello Robert, you have 12 unread messages"
```

Passing a truthy second argument to `compile` will opt into using `new Function` to generate a function. The function returned contains a literal string concatenation statement, interleaving the correct arguments you have passed in.

```ts

import { stringFormatc } from '@brycemarshall/string-format';

let greetingTemplate = stringFormatc("Hello {0}, you have {1} unread messages", true)
// -> greetingTemplate generated using new Function

let greeting = greetingTemplate(["Robert", 12])
// -> "Hello Robert, you have 12 unread messages"
```

## Contributors

 - Matt-Esch, Bryce Marshall

## MIT Licenced
