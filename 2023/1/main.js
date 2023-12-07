import {loadInput} from "../../utils.js";
const input = loadInput("./2023/1/input.txt").split("\n\n")
const nums = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

// 1

const getFirstAndLastDigitsA = (str) => {
	const first = str.match(/^[^\d]*(\d)/)[1];
	const last = str.match(/(\d)[^\d]*$/)[1];
	return [first, last];
};

export function part1() {
	return input.reduce((res, str) => res + Number(getFirstAndLastDigitsA(str).join("")), 0)
}

console.log("Solution A: ",part1())

// 2

function isNumber(value) {
	return !isNaN(Number(value))
}

function number(str) {
	if (isNumber(str.charAt(0))) {
		return parseInt(str.charAt(0));
	}
	const index = nums.findIndex((n) => str.startsWith(n));
	return index < 0 ? null : index;
};


function getFirstAndLastDigitsB(str) {
	let first, last
	for (let i = 0; i < str.length; i++) {
		const n = number(str.slice(i))
		if (n) {
			first = first || n
			last = n
		}
	}
	return [first, last]
}

export function part2() {
	return input.reduce((res, str) => res + Number(getFirstAndLastDigitsB(str).join("")), 0)
}


console.log("Solution B: ",part2())
