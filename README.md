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

var fingerprint = require('ssh-fingerprint');

var publickey = fs.readFileSync('id_rsa.pub', 'utf-8');

console.log('fingerprint => %s', fingerprint(publickey));
```

yields

```
fingerprint => 64:c4:c5:c9:7e:91:91:db:e3:35:ca:de:be:84:2e:b0
```

Usage
-----

### `fingerprint(pubkey, algorithm = 'md5', style = 'hex');`

Parameters

- `pubkey`: A public key string, typically read from `id_rsa.pub`
- `algorithm`: Hashing algorithm to use, defaults to `md5` (OpenSSH Standard prior to 6.8)
- `hex`: Style of hash output, choose from `hex` (OpenSSH 6.7 style) or `base64` (OpenSSH 6.8 and later)

The default value of `style` will change to `base64` when using an algorithm other than `md5` -- this mimics the behaviour of `ssh-keygen` in OpenSSH 6.8 and later.

Returns

- The stringified fingerprint, same as `ssh-keygen -E algorithm -fl id_rsa.pub`

License
-------

MIT
