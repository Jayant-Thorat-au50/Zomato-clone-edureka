# Universal-HMAC-SHA256-js

An optimised universal JavaScript (Browsers + Node.js) HMAC-SHA256 hashing algorithm.

- Zero dependencies
- 🤏 Small bundle impact (\~400 bytes)

# Setup

```shell
npm i universal-hmac-sha256-js
```

Node CJS.

```js
const hmac_sha256 = import('universal-hmac-sha256-js/hmac-sha256-node.mjs')
```

Node ESM.

```js
import hmac_sha256 from 'universal-hmac-sha256-js/hmac-sha256-node.mjs'
```

Deno.

```js
import hmac_sha256 from 'https://deno.land/x/hmacsha256/hmac-sha256-deno.mjs'
```

# API

## function hmac_sha256

Performs a HMAC SHA256 hash.

| Parameter | Type       | Description   |
| :-------- | :--------- | :------------ |
| `data`    | Uint8Array | Data to hash. |
| `key`     | Uint8Array | Secret key.   |

**Returns:** Uint8Array — The HMAC-SHA256 data.

### Examples

_How to use._

> ```js
> const data = Uint8Array.from([104, 101, 108, 108, …])
> const key =  Uint8Array.from([193, 208, 122, 108, …])
>
> hmac_sha256(data, key).then(console.log)
> ```
>
> > The logged output is UintArray(\[43, …])
