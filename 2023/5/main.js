import {loadInput} from "../../utils.js";

const processes = [
	'seedToSoil',
	'soilToFertilizer',
	'fertilizerToWater',
	'waterToLight',
	'lightToTemperature',
	'temperatureToHumidity',
	'humidityToLocation'
]

let activeProcess = 0

const toCamelCase = (str) => {
	let s = str
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		?.map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
		.join("");
	return s && s.slice(0, 1).toLowerCase() + s.slice(1);
};

const input = loadInput("./2023/5/input.txt")

const seeds = input.match(/seeds:(\W\d+)+/g)[0].split(": ")[1].split(" ").map(Number)

function inRange(value, range) {
	return range.source <= value && range.source + range.length >= value
}


function processSeed(seed) {
	if (activeProcess === 7) {
		activeProcess = 0
		return seed
	}

	const range = maps[processes[activeProcess]].find(r => inRange(seed, r))
	activeProcess++
	return processSeed(range ? range.destination + (seed - range.source) : seed)
}

const maps = input.match(/[a-z]+-to-[a-z]+ map:(\n(\d+\W?)+)+/g).reduce((res, line) => {
	const [name, range] = line.split(" map:\n")
	res[toCamelCase(name)] = range.split("\n").filter(Boolean).map(range => {
		const [destination, source, length] = range.split(" ").map(Number)
		return {
			destination,
			source,
			length
		}
	})
	return res
}, {})


export function part1() {
	return Math.min(...seeds.map(processSeed))
}

console.log("Solution A: ", part1())

export function part2() {
	const seedsRanges = seeds.reduce((res, seed) => {
		const lastRange = res.at(-1)
		if (!lastRange || lastRange.length === 2) {
			res.push([seed])
		} else {
			lastRange.push(seed)
		}
		return res
	}, [])

	return Math.min(...seedsRanges.map(([seed, range]) => {
			return Array.from({length: range}, (_, i) => seed + i)
		}).flat().map(processSeed)
	)

}

console.log("Solution B: ", part2())
