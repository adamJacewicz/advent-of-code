import {loadInput} from "../../utils.js";

const input = loadInput("./2023/11/input.txt").split("\n").map(row => row.split(""))

function getEmptyRowsIndex() {
	return input.reduce((res, row, i) => {
		return row.every(item => item === ".") ? [...res, i] : res
	}, [])
}

function getEmptyColumnsIndex() {
	return input[0].reduce((res, el, i) => {
		return input.map(row => row[i]).every(item => item === ".") ? [...res, i] : res
	}, [])
}

const emptyRows = getEmptyRowsIndex()
const emptyColumns = getEmptyColumnsIndex()


function getEmptyRowsBetweenGalaxies(a, b) {
	const ax = a[0]
	const bx = b[0]
	const start = Math.min(ax, bx)
	const end = Math.max(ax, bx)
	return emptyRows.filter(index => start < index && end > index)
}

function getEmptyColumnsBetweenGalaxies(a, b) {
	const ay = a[1]
	const by = b[1]
	const start = Math.min(ay, by)
	const end = Math.max(ay, by)
	return emptyColumns.filter(index => start < index && end > index)
}

function getShortestPath(a, b) {
	const [ax, ay] = a
	const [bx, by] = b
	return Math.abs(ax - bx) + Math.abs(ay - by)
}


function getGalaxies() {
	const result = []
	input.forEach((row, i) => {
		row.forEach((el, j) => {
			if (el === "#") result.push([i, j])
		})
	})
	return result
}

export function part1(value = 1) {
	const galaxies = getGalaxies()
	const result = new Map([])
	galaxies.forEach((g1, g1Index) => {
		galaxies.toSpliced(0, g1Index).forEach((g2, g2Index) => {
			const g1Number = g1Index + 1
			const g2Number = g2Index + g1Index + 1
			const key = `${g1Number}-${g2Number}`
			if (!result.has(key)) {
				const additionalRows = getEmptyRowsBetweenGalaxies(g1, g2).length * (value - 1)
				const additionalColumns = getEmptyColumnsBetweenGalaxies(g1, g2).length * (value - 1)
				result.set(key, getShortestPath(g1, g2) + additionalRows + additionalColumns)
			}
		})
	})

	return Array.from(result.values()).reduce((res, value) => res + value)
}


console.log("Solution A: ", part1(2))


export function part2() {
	return part1(1000000)
}

console.log("Solution B: ", part2())













