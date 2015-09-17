var crypto = require('crypto');

var pubre = /^(ssh-[dr]s[as]\s+)|(\s+.+)|\n/g;

/* So you can var f = require('ssh-fingerprint'); f(...) */
module.exports = fingerprint;
fingerprint.calculate = calculate;

function fingerprint(pub, alg) {
  if (typeof (alg) !== 'string')
    throw (new TypeError('Expected string as second argument, ' +
      'got a ' + typeof (alg) + ' instead'));
  return (calculate(pub, {algorithm: alg}));
}

function calculate(pub, opts) {
  if (typeof(opts) !== 'object')
    throw (new TypeError('Expected object as second argument, ' +
      'got a ' + typeof (opts) + ' instead'));

  var alg = opts.algorithm;
  var style = opts.style;

  alg = alg || 'md5'; // OpenSSH Standard
  if (style === undefined)
    if (alg === 'md5')
      style = 'hex';
    else
      style = 'base64';

  var cleanpub = pub.replace(pubre, '');
  var pubbuffer = new Buffer(cleanpub, 'base64');
  var key = hash(pubbuffer, alg, style);

  return key;
}

// hash a string with the given alg
function hash(s, alg, style) {
  var h = crypto.createHash(alg).update(s);
  if (style === 'hex')
    return colons(h.digest('hex'));
  else if (style === 'base64')
    return sshBase64Format(alg, h);
  else
    throw (new Error('Unknown hash style: ' + style));
}

function sshBase64Format(alg, h) {
  return alg.toUpperCase() + ':' + base64Strip(h.digest('base64'));
}

// add colons, 'hello' => 'he:ll:o'
function colons(s) {
  return s.replace(/(.{2})(?=.)/g, '$1:');
}

// strip trailing = on base64-encoded payload
function base64Strip(s) {
  return s.replace(/=*$/, '');
}
