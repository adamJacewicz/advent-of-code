import {loadInput} from "../../utils.js";

const pipes = {
	"|": "TB",
	"-": "LR",
	"L": "TR",
	"J": "TL",
	"7": "BL",
	"F": "BR",
	"S": "TBRL"
}
const shifts = {
	R: [0, 1],
	L: [0, -1],
	T: [-1, 0],
	B: [1, 0],
}

function getStartPosition(matrix) {
	const x = matrix.findIndex(row => row.includes("S"))
	const y = matrix[x].indexOf("S")
	return [x, y]
}

function isStartPosition([x, y]) {
	return input[x][y] === "S"
}


const reversedDirections = {
	R: "L",
	L: "R",
	T: "B",
	B: "T"
}

function getAvailableDirections(pos, fromDir) {
	const pipe = input[pos[0]][pos[1]]
	const directions = pipes[pipe].replace(reversedDirections[fromDir], "")
	const [availableDirection] = directions.split("").reduce((res, dir) => {
		const [dx, dy] = shifts[dir]
		const newPipe = input[pos[0] + dx]?.[pos[1] + dy]
		if (!newPipe || newPipe === ".") return res
		const dirs = pipes[newPipe]
		return dirs.includes(reversedDirections[dir]) ? [...res, dir] : res
	}, [])
	const [dx, dy] = shifts[availableDirection]
	return {direction: availableDirection, position: [pos[0] + dx, pos[1] + dy]}
}

const input = loadInput("./2023/10/input.txt").split("\n").map(line => line.split(""))


export function part1() {
	const start = getStartPosition(input)
	const moves = []
	let currPos = start
	let dir
	do {
		moves.push(currPos)
		const {position, direction} = getAvailableDirections(currPos, dir)
		currPos = position
		dir = direction
	} while (!isStartPosition(currPos))
	return moves.length / 2
}


console.log("Solution A: ", part1())
const newInput = JSON.parse(JSON.stringify(input))
const shiftss = [[0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1], [-1, 0], [1, 0]]

function getNeighbours([x, y], neighbours = []) {
	shiftss.forEach(([dx, dy]) => {
		if (!!newInput[dx + x]?.[dy + y] && newInput[dx + x]?.[dy + y] !== "@") {
			if (!neighbours.find(([nx, ny]) => nx === dx + x && ny === dy + y)) {
				neighbours.push([dx + x, dy + y])
				neighbours = getNeighbours([dx + x, dy + y], neighbours)
			}
		}
	})
	return neighbours
}

export function part2() {
	let cells = 0
	const start = getStartPosition(input)
	const moves = []
	let currPos = start
	let dir
	do {
		newInput[currPos[0]][currPos[1]] = "@"
		moves.push(currPos)
		const {position, direction} = getAvailableDirections(currPos, dir)
		currPos = position
		dir = direction
	} while (!isStartPosition(currPos))
	for (let i = 1; i < newInput.length - 1; i++) {
		for (let j = 1; j < newInput[i].length - 1; j++) {
			const sign = newInput[i][j]
			if (sign !== "@") {
				const row = input[i]
				const col = newInput.map(row => row[j])
				const colA = col.slice(0, i)
				const colB = col.slice(i + 1)
				const rowA = row.slice(0, j)
				const rowB = row.slice(j + 1)
				if (![colA, colB, rowA, rowB].every(tab => tab.filter(z => z === "@").length % 2 === 0)) {
					console.log([colA, colB, rowA, rowB])

					cells += 1
				} else {
					const neighbours = getNeighbours([i, j])
					if (!neighbours.some(([x, y]) => x === 0 || x === input.length - 1 || y === 0 || y === input[0].length - 1)) {
						cells += 1
					}
				}

			}
		}
	}
	console.table(newInput)
	return cells
}
console.log("Solution B: ", part2())