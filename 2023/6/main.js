import {loadInput} from "../../utils.js";


const input = loadInput("./2023/6/input.txt")

const [times, distances] = input.match(/(\d+ *)+/g).map(val => val.split(/\W+/g).map(Number))
const races = times.map((time, i) => ({time, distance: distances[i]}))

function countWaysToWin(race) {
	const [firstWay, lastWay] = findZeros(-1, race.time, -race.distance)
	return Math.abs(Math.floor(firstWay + 1) - Math.ceil(lastWay - 1)) + 1
}

function findZeros(a, b, c) {
	const delta = Math.pow(b, 2) - 4 * a * c
	const x1 = (-b + Math.sqrt(delta)) / 2 * a
	const x2 = (-b - Math.sqrt(delta)) / 2 * a
	return [x1, x2]
}


export function part1() {
	return races.map(countWaysToWin).reduce((res, ways) => res * ways, 1)
}

console.log("Solution A: ", part1())

export function part2() {
	const time = times.join("")
	const distance = distances.join("")
	return countWaysToWin({time, distance})
}

console.log("Solution B: ", part2())
