'use strict'

const fs = require('fs')
const path = require('path')
const ndjson = require('ndjson')

const patterns = () =>
    fs.createReadStream(path.join(__dirname, 'data.ndjson'))
    .pipe(ndjson.parse())

module.exports = patterns
