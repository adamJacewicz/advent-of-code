import {loadInput} from "../../utils.js";

const input = loadInput("./2023/4/input.txt").replace(/Card\W+\d+:\W+/g, "").split("\r\n").map(line => line.split(/\W\|\W+/).map(nums => nums.split(/\W+/)))

function getCardPoints(card) {
	const [winning, my] = card
	return my.reduce((res, number) => {
		if (winning.includes(number)) {
			return !res ? 1 : res * 2
		}
		return res
	}, 0)
}

function getMatchesCount(card) {
	const [winning, my] = card
	return my.reduce((res, number) => {
		if(winning.includes(number)) {
			return res + 1
		}
		return res
	}, 0)
}


export function part1() {
	return input.map(getCardPoints).reduce((res, points) => res + points, 0)
}

console.log("Solution A: ", part1())

export function part2() {
	const cards = input.map(card => ({count: 1, card}))
	cards.forEach(({card, count}, index, cards) => {
		const matches = getMatchesCount(card)
		for (let i = 0; i < count; i++) {
			for (let j = 1; j < matches + 1; j++) {
				if (cards[index + j]) {
					cards[index + j].count += 1
				}
			}
		}
	})
	return cards.reduce((sum, {count}) => sum + count, 0)
}

console.log("Solution B: ", part2())
