import { loadInput } from "../../utils.js";
const input = loadInput("./2024/1/input.txt").split("\n");
const [leftList, rightList] = input
	.map((line) => line.split(/\s+/).map(Number))
	.reduce(
		([left, right], [leftValue, rightValue]) => {
			return [
				[...left, leftValue],
				[...right, rightValue],
			];
		},
		[[], []]
	);

function calculateTotalDistance(leftList, rightList) {
	const sortedLeft = leftList.sort((a, b) => a - b);
	const sortedRight = rightList.sort((a, b) => a - b);

	const totalDistance = sortedLeft.reduce(
		(acc, curr, i) => acc + Math.abs(curr - sortedRight[i]),
		0
	);

	return totalDistance;
}

console.log("Solution A: ", calculateTotalDistance(leftList, rightList));

function calculateSimilarity(leftList, rightList) {
	const occurs = leftList.reduce((acc, curr) => {
		const rightOccurs = rightList.filter((value) => value === curr).length;
		return acc + curr * rightOccurs;
	}, 0);

	return occurs;
}

console.log("Solution B: ", calculateSimilarity(leftList, rightList));
