import {loadInput} from "../../utils.js";

const pipes = {
	"|": "TB",
	"-": "LR",
	"L": "TR",
	"J": "TL",
	"7": "BL",
	"F": "BR",
}


const availablePipes = {
	R: ["-", "7", "J"],
	L: ["-", "F", "L"],
	T: ["|", "F", "7"],
	B: ["|", "J", "L"],
}


function getAvailablePipes(pos, from = pos) {
	const direction = getDirection(pos, from)
	const av = getAvailableDirections(pos, direction)
	const [x, y] = from
	if(!direction) {
		const [dx, dy]  = shifts[av[0]]
		return [x + dx, y + dy]
	}
	let fromDir = av[0]
	const pipe = input[x][y]
	let z = fromDir === "T" ? "B" : fromDir === "B" ? "T" : fromDir === "L" ? "R" : "L"
	console.log(av)
	const toDir = pipes[pipe].replace(z, "")
	console.log({z,a:av, direction,fromDir,toDir})

	const [dx, dy] = shifts[toDir]
	return [x + dx, y + dy]
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

function isSamePosition(a, b) {
	if (!a || !b) return false
	const [x1, y1] = a
	const [x2, y2] = b
	return x1 === x2 && y1 === y2
}

function isValidPosition([x, y]) {
	return x >= 0 && y >= 0 && x <= input.length - 1 && y <= input[0].length - 1
}

function isStartPosition([x, y]) {
	return input[x][y] === "S"
}

function getDirection([x1, y1], [x2, y2]) {
	if (x1 < x2) return "B"
	if (x1 > x2) return "T"
	if (y1 < y2) return "R"
	if (y1 > y2) return "L"
	return undefined
}

function getAvailableDirections(pos, fromDir) {
	const pipe = input[pos[0]][pos[1]]
	if(pipe === "S") return Object.entries(shifts).reduce((res, [key, [dx,dy]]) => {
				const newPipe = input[pos[0] +dx][pos[1] + dy]
		return availablePipes[key].includes(newPipe) && key !== fromDir ? [...res, key] : res
	}, [])
	const directions = pipes[pipe]
	return directions.split("").reduce((res, dir) => {
		const [dx,dy] = shifts[dir]
		const newPipe = input[pos[0] + dx][pos[1] + dy]
		return availablePipes[dir].includes(newPipe) && dir !== fromDir ? [...res, dir] : res
	}, [])
}

const input = loadInput("./2023/10/input.txt").split("\n").map(line => line.split(""))

const start = getStartPosition(input)

const moves = []

function process(pos = start, from) {
	console.log(pos,from)
	moves.push(pos)
	if (moves.length > 1 && isStartPosition(pos)) return moves.length - 1
	const availablePositions = getAvailablePipes(pos, from)
	return process(availablePositions, pos)
}

export function part1() {
	const steps = process()
}


console.log("Solution A: ", part1())

export function part2() {
}

console.log("Solution B: ", part2())
