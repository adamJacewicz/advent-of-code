const fs = require("fs")
const path = require("path")

const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
let MAX = 40000000
let MIN = -40000000

const getDistance = (a, b) => Math.abs(b.x - a.x) + Math.abs(b.y - a.y);

const parseInput = (input) => input.split("\n").map((row, i) => {
	const coords = row.match(/(-?\d+)/g) ?? [];
	if (coords.length < 4) throw Error(`Data is missing in row ${i + 1}:\n"${row}"`)
	const [sx, sy, bx, by] = coords.map(Number)
	const sensor = {x: sx, y: sy}
	const beacon = {x: bx, y: by}
	const distance = getDistance(sensor, beacon)
	return {
		sensor, beacon, distance
	};
})

const getScanningArea = (row) => (scanningArea, {sensor, distance}) => {
	const {x, y} = sensor
	const minY = y - distance < MIN ? MIN : y - distance
	const maxY = y + distance > MAX ? MAX : y + distance
	if (row !== undefined && (row < maxY && row > minY) || row === undefined) {
		for (let i = minY; i <= maxY; i++) {
			const rest = Math.abs(Math.abs(i - y) - distance)
			if (!scanningArea[i]) {
				scanningArea[i] = []
			}
			scanningArea[i].push({from: Math.max(MIN, x - rest), to: Math.min(MAX, x + rest)})
		}
	}
	return scanningArea
}

// Get amount of positions that cannot contain beacon in selected row

const part1 = (input, row = 10) => {
	MIN = 0
	const blockedFields = input.reduce(getScanningArea(row), [])
	const sortedRow = blockedFields[row].sort((r1, r2) => r1.from - r2.from)
	const result = [{from: sortedRow[0].from, to: sortedRow[0].to}]
	sortedRow.forEach((range) => {
		const last = result[result.length - 1]
		if (range.to > last.to) last.to = range.to
		if (last.to < range.from) result.push({from: range.from, to: range.to})
	})
	return result.reduce((res, range) => res + Math.abs(range.from - range.to), 0)
}

// Get tuning frequency

const part2 = (input) => {
	const blockedFields = input.reduce(getScanningArea(), {})
	const fieldsEntries = Object.entries(blockedFields)
	for (let i = 0; i < fieldsEntries.length; i++) {
		const [key, value] = fieldsEntries[i]
		const sorted = value.sort((r1, r2) => r1.from - r2.from)
		const rowBound = {from: sorted[0].from, to: sorted[0].to}
		for (let j = 0; j < sorted.length; j++) {
			const range = sorted[j]
			if (rowBound.to < range.from) {
				return (rowBound.to + 1) * 4000000 + Number(key)
			}
			if (range.to > rowBound.to) rowBound.to = range.to
		}
	}
}

const data = parseInput(input)

console.log(part1(data, 2000000))
console.log(part2(data))

