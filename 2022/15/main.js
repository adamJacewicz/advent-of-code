const fs = require("fs")
const path = require("path")

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
});

const getScanningArea = ({sensor, distance}, scanningArea = {}) => {
	const {x, y} = sensor
	const minY = y - distance < MIN ? MIN : y - distance
	const maxY = y + distance > MAX ? MAX : y + distance
	for (let i = minY; i <= maxY; i++) {
		const rest = Math.abs(Math.abs(i - y) - distance)
		if (!scanningArea[i]) {
			scanningArea[i] = []
		}
		scanningArea[i].push({from: Math.max(MIN, x - rest), to: Math.min(MAX, x + rest)})
	}
	return scanningArea
}

const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
const data = parseInput(input)
const MAX = 4000000
const MIN = 0


// Get amount of positions that cannot contain beacon in selected row

const part1 = (input, row) => {
	const blockedRow = input.reduce((result, data) => getScanningArea(data, result), [])
	const sortedRow = blockedRow[row].sort(({from: r1}, {from: r2}) => r1 - r2)
	const result = []
	sortedRow.forEach((range) => {
		Array.from({length: Math.abs(range.from - range.to)}, (_, i) => range.from + i)
			.forEach(el => !result.includes(el) && result.push(el)
			)
	})
	return result.length
}

const part2 = (input) => {
	const blockedFields = input.reduce((result, data) => getScanningArea(data, result), {})
	Object.entries(blockedFields).forEach(([key, value]) => {
		const sorted = value.sort(({from: r1}, {from: r2}) => r1 - r2)
		const rowBound = {from: sorted[0].from, to: sorted[0].to}
		sorted.forEach(range => {
			if (range.to <= rowBound.to) return
			if (rowBound.to < range.from) {
				console.log((rowBound.to + 1) * 4000000 + Number(key))
				throw Error()
			}
			rowBound.to = range.to
		})
	})
}


