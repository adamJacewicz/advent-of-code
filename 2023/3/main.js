import {loadInput} from "../../utils.js";

const input = loadInput("./2023/3/input.txt").split("\r\n")

function parseInput(input) {
	return input.map(line => line.split(""))
}

const parsedInput = parseInput(input)
const neighbours = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]

function isNumber(value) {
	return !isNaN(Number(value))
}

function isSymbol(value) {
	return !isNumber(value) && value !== "."
}


function checkNextCol(row, col, digits) {
	if (col === 0) return digits
	const next = parsedInput[row][col + 1]
	if (isNumber(next)) {
		digits.push(next)
		checkNextCol(row, col + 1, digits)
	}
	return digits
}

function checkPrevCol(row, col, digits) {
	if (col === 0) return digits
	const prev = parsedInput[row][col - 1]
	if (isNumber(prev)) {
		digits.unshift(prev)
		checkPrevCol(row, col - 1, digits)
	}
	return digits
}

function checkDigits(row, col) {
	const prev = checkPrevCol(row, col, [])
	const next = checkNextCol(row, col, [])
	return Number([...prev, parsedInput[row][col], ...next].join(""))
}

function checkNeighbours(row, col) {
	return neighbours.reduce((res, [sx, sy]) => {
		const cell = input[row + sx]?.[col + sy]
		if (isNumber(cell)) {
			const digit = checkDigits(row + sx, col + sy)
			if (!res.includes(digit)) return [...res, digit]
		}
		return res
	}, [])
}

export function part1() {
	return parsedInput.reduce((sum, row, rowIndex) => {
		row.forEach((cell, colIndex) => {
			if (isSymbol(cell)) {
				checkNeighbours(rowIndex, colIndex).forEach(digit => sum += digit)
			}
		})
		return sum
	}, 0)
}

console.log("Solution A: ", part1())


export function part2() {
	return parsedInput.reduce((sum, row, rowIndex) => {
		row.forEach((cell, colIndex) => {
			if (cell === "*") {
				const neighbours = checkNeighbours(rowIndex, colIndex)
				if (neighbours.length === 2) {
					sum += neighbours[0] * neighbours[1]
				}
			}
		})
		return sum
	}, 0)
}

console.log("Solution B: ", part2())
