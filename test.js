'use strict'

const test = require('tape')
const isObject = require('lodash.isobject')
const isString = require('lodash.isstring')
const isArray = require('lodash.isarray')
const ndjson = require('ndjson')
const path = require('path')
const fs = require('fs')
const isStream = require('is-stream')
const getStations = require('vbb-stations')
const linesAt = require('vbb-lines-at')
const isURL = require('is-url')
const isHexcolor = require('is-hexcolor')

const platformPatterns = require('.')

const notNullString = (x) => isString(x) && !!x
const undefinedOrString = (x) => (isString(x) && !!x) || x === undefined

const dataFile = path.join(__dirname, 'data.ndjson')

test('data.ndjson looks correct', (t) => {
	fs.createReadStream(dataFile)
	.on('error', err => t.ifError(err))
	.pipe(ndjson.parse())
	.on('error', err => t.ifError(err))
	.on('data', () => {})
	.once('end', () => t.end())
})

test('data.ndjson contains correct values', (t) => {
	const patterns = platformPatterns()
	t.ok(isStream.readable(patterns))

	let i = 0
	patterns.on('data', (p) => {
		let desc = 'row ' + i++
		if(p.station.name) desc += ` (${p.station.name})`
		else if(p.station.id) desc += ` (${p.station.id})`

		// station
		t.ok(isObject(p.station), desc + ' station')
		t.ok(notNullString(p.station.id), desc + ' station.id')
		const [stat] = getStations(p.station.id)
		t.ok(stat, desc + ' station.id')
		t.ok(undefinedOrString(p.station.name), desc + ' station.name')

		// lines
		t.ok(isArray(p.lines) && p.lines.length > 0 && p.lines.every(notNullString), desc + ' lines')
		const stationLines = linesAt[p.station.id].map(l => l.name)
		t.ok(p.lines.every(l => stationLines.includes(l)), desc + ' lines')
		// todo: lines at previousStation and nextStation if set

		// previousStation
		if(p.previousStation){
			t.ok(isObject(p.previousStation), desc + ' previousStation')
			t.ok(notNullString(p.previousStation.id), desc + ' previousStation.id')
			const [prev] = getStations(p.previousStation.id)
			t.ok(prev, desc + ' previousStation.id')
			t.ok(undefinedOrString(p.previousStation.name), desc + ' previousStation.name')
		}

		// nextStation
		if(p.nextStation){
			t.ok(isObject(p.nextStation), desc + ' nextStation')
			t.ok(notNullString(p.nextStation.id), desc + ' nextStation.id')
			const [next] = getStations(p.nextStation.id)
			t.ok(next, desc + ' nextStation.id')
			t.ok(undefinedOrString(p.nextStation.name), desc + ' nextStation.name')
		}

		// colors
		t.ok(isArray(p.colors), desc + ' colors')
		t.ok(p.colors.length > 0, desc + ' colors')
		t.ok(p.colors.every(isHexcolor), desc + ' colors')

		// image
		if(p.image){
			t.ok(['flickr', 'commons'].includes(p.image.source), desc + ' image.source')
			if(p.image.source === 'flickr'){
				t.ok(notNullString(p.image.user), desc + ' image.user (flickr)')
				t.ok(Number.isInteger(p.image.id) && p.image.id >= 0, desc + ' image.id (flickr)')
			}
			if(p.image.source === 'commons'){
				t.ok(notNullString(p.image.id), desc + ' image.id (commons)')
			}
		}
	})

	patterns.on('error', err => t.ifError(err))
	patterns.once('end', () => t.end())
})
