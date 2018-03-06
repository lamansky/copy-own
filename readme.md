# copy-own

Copies an object’s own properties to another object.

“Own” properties are those that are not inherited from the prototype chain.

## Installation

Requires [Node.js](https://nodejs.org/) 6.0.0 or above.

```bash
npm i copy-own
```

## API

The module exports a single function.

### Parameters

1. `from` (object): The source object that possesses the properties to be copied.
2. Optional: `to` (object): The destination object that should receive the copied properties. Defaults to a new object.
3. Object argument:
    * Optional: `enumOnly` (boolean): Whether or not to limit the copy operation to only those properties that were defined with the `enumerable` flag. Defaults to `false`.
    * Optional: `overwrite` (boolean): Whether or not to overwrite `to` properties with `from` properties if they have the same key. Defaults to `true`.

### Return Value

The function modifies the second argument and returns it.

## Examples

```javascript
const copyOwn = require('copy-own')

const from = {a: 'from', b: 'from'}
const to = {b: 'to', c: 'to'}
const to = copyOwn(from, to)
to.a // 'from'
to.b // 'from'
to.c // 'to'
```

Here is the same example repeated with `overwrite` set to `false`:

```javascript
const copyOwn = require('copy-own')

const from = {a: 'from', b: 'from'}
const to = {b: 'to', c: 'to'}
const to = copyOwn(from, to, {overwrite: false})
to.a // 'from'
to.b // 'to'
to.c // 'to'
```

When no destination object is specified, a new object is created:

```javascript
const copyOwn = require('copy-own')

const from = {a: 1, b: 2}
const to = copyOwn(from)
to.a // 1
to.b // 2
```
