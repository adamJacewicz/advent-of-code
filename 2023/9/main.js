import {loadInput} from "../../utils.js";

const input = loadInput("./2023/9/input.txt").split("\n").map(line => line.split(" ").map(Number))


function getNext(sequences) {
	return sequences.toReversed().reduce((res, nums) => {
		return res + nums.at(-1)
	}, 0)
}

function getFirst(sequences) {
	return sequences.toReversed().reduce((res, nums) => {
		return  nums.at(0) - res
	}, 0)
}

function findDifferences(nums) {
	const last = nums.at(-1)
	const diffs = last.reduce((res, num, i) => {
		return i === last.length - 1 ? res : [...res, last[i + 1] - num]
	}, [])
	nums.push(diffs)
	return diffs.some(Boolean) ? findDifferences(nums) : nums
}

export function part1() {
	return input.map((seq) => findDifferences([seq])).map(getNext).reduce((sum, value) => sum + value, 0)
}

console.log("Solution A: ", part1())


export function part2() {
	return input.map((seq) => findDifferences([seq])).map(getFirst).reduce((sum, value) => sum + value, 0)
}

console.log("Solution B: ", part2())
