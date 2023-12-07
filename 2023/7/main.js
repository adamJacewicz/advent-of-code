import {loadInput} from "../../utils.js";

const weights = {1: 0, 2: 1, 3: 2, 4: 3, 5: 6}
const input = loadInput("./2023/7/input.txt").split("\n").map(line => line.split(" "))
const sortedCards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

function compareCards(a, b) {
	if (a.weight !== b.weight) return a.weight - b.weight
	for (let i = 0; i < 5; i++) {
		const ac = sortedCards.indexOf(a.cards[i])
		const bc = sortedCards.indexOf(b.cards[i])
		if (ac !== bc) return bc - ac
	}
}

function countCards(cards) {
	return cards.split("").reduce((res, card) => {
		if (!res[card]) res[card] = 0
		res[card] += 1
		return res
	}, {})
}

export function part1() {
	const countedCards = input.map(([cards, bid]) => ({
		cards, bid: Number(bid), weight: Object.values(countCards(cards)).reduce((res, val) => res + val * weights[val], 0)
	}))
	return countedCards.sort(compareCards).reduce((res, cards, index) => res + (cards.bid * (index + 1)), 0)
}

console.log("Solution A: ", part1())
const sortedCards2 = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"]

function compareCards2(a, b) {
	if (a.weight !== b.weight) return a.weight - b.weight
	for (let i = 0; i < 5; i++) {
		const ac = sortedCards2.indexOf(a.cards[i])
		const bc = sortedCards2.indexOf(b.cards[i])
		if (ac !== bc) return bc - ac
	}
}

function useJokers(countedCards) {
	const jokers = countedCards.J
	if (!jokers) return countedCards
	delete countedCards.J
	const xxx = Object.entries(countedCards)

	const x = xxx.reduce((max, c) => {
		if (!max) return c
		if (c[1] > max[1]) return c
		if (c[1] === max[1]) {
			const ac = sortedCards2.indexOf(c[0])
			const bc = sortedCards2.indexOf(max[0])
			if (ac < bc) return c
			return max
		}
		return max
	}, xxx.length !== 0 ? undefined : ["A", 5])
	if (!countedCards[x[0]]) {
		countedCards[x[0]] = 0
	}
	countedCards[x[0]] += jokers
	return countedCards
}

export function part2() {
	const z = input.map(([cards, bid]) => {
		return {
			cards,
			bid: Number(bid),
			weight: Object.values(useJokers(countCards(cards))).reduce((res, val) => res + val * weights[val], 0)
		}
	})
	return z.sort(compareCards2).reduce((res, cards, index) => res + (cards.bid * (index + 1)), 0)
}

console.log("Solution B: ", part2())
