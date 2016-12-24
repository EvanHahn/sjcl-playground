const sjcl = require('sjcl')
const randomString = require('random-string')

const PASSWORD = '}tVwfk48k7>?IaF)nBFyqhe0(W"C:M/pF8t9qvjlkT6Ml+&^-)'
const COUNT = 10000
const MIN_LENGTH = 0
const MAX_LENGTH = 5000
const OPTIONS = {
  ks: 256,
  ts: 128,
  iter: 10000
}

function oneoff () {
  const encrypted = sjcl.encrypt(PASSWORD, randomString({
    length: MAX_LENGTH,
    special: true
  }, OPTIONS))
  console.log(`a ${MAX_LENGTH}-character blob is ${encrypted.length} characters`)
}

function benchmark () {
  console.log(`performance with ${COUNT} strings, each between ${MIN_LENGTH} and ${MAX_LENGTH} characters...`)

  console.time('generating')
  const plain = []
  for (let i = 0; i < COUNT; i++) {
    plain.push(randomString({
      length: (Math.random() * (MAX_LENGTH - MIN_LENGTH)) + MIN_LENGTH,
      special: true
    }))
  }
  const encrypted = plain.map((s) => sjcl.encrypt(PASSWORD, s, OPTIONS))
  console.timeEnd('generating')

  console.time('encrypting')
  plain.forEach((s) => sjcl.encrypt(PASSWORD, s, OPTIONS))
  console.timeEnd('encrypting')

  console.time('decrypting')
  encrypted.forEach((s) => sjcl.decrypt(PASSWORD, s))
  console.timeEnd('decrypting')
}

oneoff()
benchmark()
