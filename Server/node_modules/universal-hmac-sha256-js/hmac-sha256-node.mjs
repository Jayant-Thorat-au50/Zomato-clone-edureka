/**
 * Performs a HMAC SHA256 hash.
 * @kind function
 * @name hmac_sha256
 * @param {Uint8Array} data Data to hash.
 * @param {Uint8Array} key Secret key.
 * @returns {Uint8Array} The HMAC-SHA256 data.
 * @example <caption>How to use.</caption>
 * ```js
 * const data = Uint8Array.from([104, 101, 108, 108, …])
 * const key =  Uint8Array.from([193, 208, 122, 108, …])
 *
 * hmac_sha256(data, key).then(console.log)
 * ```
 * > The logged output is UintArray([43, …])
 */
async function hmac_sha256(data, key) {
  if (!(data instanceof Uint8Array) && !(key instanceof Uint8Array))
    throw new TypeError('Expected Uint8Array input data.')

  if (typeof window == 'undefined' && typeof Deno === 'undefined') {
    const { createHmac } = await import('crypto')
    return Uint8Array.from([...createHmac('SHA256', key).update(data).digest()])
  } else
    return window.crypto.subtle
      .importKey(
        'raw',
        key,
        { name: 'HMAC', hash: { name: 'SHA-256' } },
        false,
        ['sign', 'verify']
      )
      .then(key => window.crypto.subtle.sign('HMAC', key, data))
      .then(signature => new Uint8Array(signature))
}

export default hmac_sha256
