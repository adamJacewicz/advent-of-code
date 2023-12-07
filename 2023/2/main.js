import {loadInput} from "../../utils.js";

const input = loadInput("./2023/2/input.txt").replace(/Game \d+:\W/g, "").split("\r\n")
const bag = {
	red: 12,
	green: 13,
	blue: 14
}

function isGameValid(game) {
	return game.every(set => set.blue <= bag.blue && set.red <= bag.red && set.green <= bag.green)
}

function parseInput(input) {
	return input.map((line) => line.split("; ").map(color => color.split(", ").reduce((res, c) => {
				const [n, cc] = c.split(" ")
				res[cc] = Number(n)
				return res
			}, {blue: 0, red: 0, green: 0})
		)
	)
}

export function part1() {
	return parseInput(input).reduce((res, game, index) => {
			if (isGameValid(game)) {
				res += index + 1
			}
			return res
		}
		, 0)
}

console.log("Solution A: ", part1())


function getMinCubes(game) {
	return game.reduce((res, set) => {
		res.blue = Math.max(res.blue, set.blue)
		res.red = Math.max(res.red, set.red)
		res.green = Math.max(res.green, set.green)
		return res
	}, {blue: 0, red: 0, green: 0})
}

function powerOfSet(set) {
	return set.blue * set.red * set.green
}


export function part2() {
	return parseInput(input).map(getMinCubes).map(powerOfSet).reduce((res, power) => res + power, 0)
}

console.log("Solution B: ", part2())
