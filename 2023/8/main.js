import {loadInput} from "../../utils.js";

const input = loadInput("./2023/8/input.txt").split("\n\n")
const directionsMap = {
	L: 0,
	R: 1
}
const [instructions, network] = input
const parsedNetwork = Object.fromEntries(network.replace(/(\(|\))/g, "").split("\n").map(line => line.split(" = ").map(x => x.split(", "))))
const parsedInstructions = instructions.split("").map(direction => directionsMap[direction])

export function part1() {
	let currentStep = "AAA"
	let step = 0
	while (currentStep !== "ZZZ") {
		currentStep = parsedNetwork[currentStep][parsedInstructions[step % parsedInstructions.length]]
		step++
	}
	return step
}

console.log("Solution A: ", part1())

function lcm(...nums) {
	return nums.reduce((res, num) => {
		if(!res) return num
		const lar = Math.max(res, num);
		const small = Math.min(res, num);
		let i = lar;
		while (i % small !== 0) {
			i += lar;
		}
		return i;
	})
}

export function part2() {
	const startNodes = Object.keys(parsedNetwork).filter(node => node.endsWith("A"))

	const steps = startNodes.map(node => {
		let currentStep = node
		let step = 0
		while (!currentStep.endsWith("Z")) {
			currentStep = parsedNetwork[currentStep][parsedInstructions[step % parsedInstructions.length]]
			step++
		}
		return step
	})

	return lcm(...steps)
}

console.log("Solution B: ", part2())
