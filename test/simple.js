var assert = require('assert');
var fs = require('fs');
var path = require('path');

var fingerprint = require('../');

var PUBLIC_KEY = fs.readFileSync(path.join(__dirname, 'id_rsa.pub'), 'utf-8');

var known_md5fingerprint = '64:c4:c5:c9:7e:91:91:db:e3:35:ca:de:be:84:2e:b0'; // `ssh-keygen -lf id_rsa.pub`
var known_sha1fingerprint = 'SHA1:/OHkp4vqKvRyTx/zgUBKWylKvLA'; // `ssh-keygen -E sha1 -lf id_rsa.pub`
var known_sha256fingerprint = 'SHA256:PKBYeRc7Vm0TFSoc4qzRZa4ArOMVvxztziWf6Rh2LHU'; // `ssh-keygen -E sha256 -lf id_rsa.pub`
var known_sha1HexFingerprint = 'fc:e1:e4:a7:8b:ea:2a:f4:72:4f:1f:f3:81:40:4a:5b:29:4a:bc:b0';

var md5fingerprint = fingerprint(PUBLIC_KEY, 'md5');
console.log('md5 => %s', md5fingerprint);
assert.strictEqual(md5fingerprint, known_md5fingerprint);

var sha1fingerprint = fingerprint(PUBLIC_KEY, 'sha1');
console.log('sha1 => %s', sha1fingerprint);
assert.strictEqual(sha1fingerprint, known_sha1fingerprint);

assert.throws(function () {
  fingerprint(PUBLIC_KEY, {});
}, TypeError);

var sha256fingerprint = fingerprint.calculate(PUBLIC_KEY, {algorithm: 'sha256'});
console.log('sha256 => %s', sha256fingerprint);
assert.strictEqual(sha256fingerprint, known_sha256fingerprint);

assert.throws(function () {
  fingerprint(PUBLIC_KEY, 1234);
}, TypeError);
assert.throws(function () {
  fingerprint(PUBLIC_KEY, 'notahashtype');
});

var sha1HexFingerprint = fingerprint.calculate(PUBLIC_KEY, {algorithm: 'sha1', style: 'hex'});
assert.strictEqual(sha1HexFingerprint, known_sha1HexFingerprint);
