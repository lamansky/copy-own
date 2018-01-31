# copy-own

Copies an object’s own properties to another object.

“Own” properties are those that are not inherited from the prototype chain.

## Installation

Requires [Node.js](https://nodejs.org/) 6.0.0 or above.

```bash
npm i copy-own
```

The module exports a single function.

## Usage Example

```javascript
const copyOwn = require('copy-own')

const from = {a: 1, b: 2}
const to = copyOwn(from, {})
to.a // 1
to.b // 2
```

The function modifies the second argument and returns it.
