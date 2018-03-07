# vbb-platform-patterns

Crowd sourced database of VBB station platform wall (tile) color patterns.

You're invited to help, see the [data structure](#data-structure) and [contributing](#contributing) sections!

[![npm version](https://img.shields.io/npm/v/boilerplate.svg)](https://www.npmjs.com/package/boilerplate)
[![Build Status](https://travis-ci.org/juliuste/boilerplate.svg?branch=master)](https://travis-ci.org/juliuste/boilerplate)
[![Greenkeeper badge](https://badges.greenkeeper.io/juliuste/boilerplate.svg)](https://greenkeeper.io/)
[![dependency status](https://img.shields.io/david/juliuste/boilerplate.svg)](https://david-dm.org/juliuste/boilerplate)
[![dev dependency status](https://img.shields.io/david/dev/juliuste/boilerplate.svg)](https://david-dm.org/juliuste/boilerplate#info=devDependencies)
[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](license)
[![chat on gitter](https://badges.gitter.im/juliuste.svg)](https://gitter.im/juliuste)

## Installation and Usage

If you're using `JavaScript`, you can use the module by installing:

```shell
npm install vbb-platform-patterns
```

If you call the function exported by the module, it will return a stream that emits objects which look like this:

```js
{
    fromStation: {
        id: "900000045102",
        name: "Heidelberger Platz"
    },
    fromLines: ["S42","S46"],
    previousStation: {
        id: "900000044101",
        name: "Hohenzollerndamm"
    },
    fromPosition: 1,
    toStation: {
        id: "900000045102",
        name: "Heidelberger Platz"
    },
    toLines: ["U3"],
    nextStation: {
        id: "900000045101",
        name: "Rüdesheimer Platz"
    },
    toPosition: 1,
    samePlatform: false
}
```

## Data structure

The dataset is located in `data.ndjson`, a [ndjson](http://ndjson.org/) file which you can edit using a text editor or [vbb-platform-patterns-cli](https://github.com/juliuste/vbb-platform-patterns-cli).

Let's take `U Boddinstraße` as an example: The dataset row would then contain the following information:

| key name | description | required | example |
| -------- | ----------- | -------- | ------- |
| `station` | Station. Object containing the keys below. | yes | `{"id":"900000079202","name":"U Boddinstr."}` |
| `station.id` | Station ID\* | yes | `900000079202` |
| `station.name` | Station name (only for readability of the dataset) | no | `U Boddinstr.` |
| `lines` | Lines that stop at the platform you're describing. | yes | `["U8"]` |
| `previousStation` | Previous station on the line. Only set this if there is different patterns on the platforms depending on where you're coming from (like at `U Bundesplatz`). See also `nextStation` | no | `null` |
| `previousStation.id` | Previous station ID\* | (yes) | - |
| `previousStation.name` | Previous station name (only for readability of the dataset) | no | - |
| `nextStation` | Next station on the line. Only set this if there is different patterns on the platforms depending on where you're coming from (like at `U Bundesplatz`). See also `previousStation` | no | `null` |
| `nextStation.id` | Next station ID\* | (yes) | - |
| `nextStation.name` | Next station name (only for readability of the dataset) | no | - |
| `colors`| Color(s) of the tile pattern. See the [colors](#colors) section for a list of valid values. | yes | ["silver", "blue"]
| `image`| URL to CC-licensed image of the wall pattern. Can contain the station sign. | no | `https://c2.staticflickr.com/4/3851/15018334836_96191ddb46_b.jpg` |

\* See [this document](station-ids.md) if you don't know how to find out some station's VBB station ID

Finally, our example would give us the following data row for the NDJSON file:

```json
{"station":{"id":"900000079202","name":"U Boddinstr."},"lines":["U8"],"colors":["silver","blue"],"image":"https://c2.staticflickr.com/4/3851/15018334836_96191ddb46_b.jpg"}
```

## Colors

Valid `color` values are all 17 CSS2 color names you can find [here](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) (black -> orange).

## Contributing

If you want to add information to the dataset, **[fork this repository](https://help.github.com/articles/fork-a-repo/), add information and finally [submit a pull request](https://help.github.com/articles/about-pull-requests/)**. If you don't know how any of this works, you can also just [open an issue](https://github.com/juliuste/vbb-platform-patterns/issues) with the information you want to add in text form and I'll add it to the dataset for you. The same applies if you have found an error or want to change anything about the data structure.

Please note that by contributing to this project, you waive any copyright claims on the information you add.

## License

This dataset is licensed under the [`ODbL` license (v1.0)](https://opendatacommons.org/licenses/odbl/1.0/).
