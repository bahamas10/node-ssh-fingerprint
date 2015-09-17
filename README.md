ssh-fingerprint
===============

Generate a fingerprint given an SSH public key (without `ssh-keygen` or external dependencies)

Install
-------

    npm install ssh-fingerprint

Example
-------

``` js
var fs = require('fs');

var fp = require('ssh-fingerprint');

var publickey = fs.readFileSync('id_rsa.pub', 'utf-8');

console.log('fingerprint => %s',
  fp.calculate(publickey));
console.log('fingerprint => %s',
  fp.calculate(publickey, {algorithm: 'sha256'}));
```

yields

```
fingerprint => 64:c4:c5:c9:7e:91:91:db:e3:35:ca:de:be:84:2e:b0
fingerprint => SHA256:PKBYeRc7Vm0TFSoc4qzRZa4ArOMVvxztziWf6Rh2LHU
```

Usage
-----

### `fingerprint.calculate(pubkey, options);`

Parameters

- `pubkey`: A public key string, typically read from `id_rsa.pub`
- `options`: An object, should contain one or both of the properties:
  - `algorithm`: The hashing algorithm to use, defaults to `md5` (OpenSSH Standard prior to 6.8)
  - `style`: Output format of the fingerprint, choose from `hex` (the old style) or `base64`

The default value for `style` will change to `base64` when using an algorithm other than `md5` -- this mimics the behaviour of `ssh-keygen` in OpenSSH 6.8 and later.

Returns

- The stringified fingerprint, same as `ssh-keygen -E algorithm -fl id_rsa.pub`

### `fingerprint(pubkey, algorithm = 'md5');`

Compatibility alias for `fingerprint.calculate()`.

Parameters

- `pubkey`: A public key string
- `algorithm`: A string name of a hashing algorithm to use, same as `options.algorithm` above

Returns

- The stringified fingerprint, as above

License
-------

MIT
