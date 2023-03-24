const fs = require("fs")
const path = require("path")

const lines = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
	.replace(/\r/g, "")
	.trim()
	.split("\n");


function getInput() {
	const board = new Set();
	let maxY = 0;
	for (const line of lines) {
		const points = line.split(" -> ").map((point) => {
			const [x, y] = point.split(",").map(Number);
			if (y > maxY) maxY = y;
			return {x, y};
		});

		const curr = points.shift();
		while (points.length) {
			const next = points.shift();
			while (
				curr.x !== next.x ||
				curr.y !== next.y
				) {
				board.add(`${curr.x}:${curr.y}`);
				if (curr.x !== next.x) {
					curr.x += Math.sign(next.x - curr.x);
				} else {
					curr.y += Math.sign(next.y - curr.y);
				}
			}
			board.add(`${curr.x}:${curr.y}`);
		}
	}
	return {board, maxY};
}


function part1() {
	const {board, maxY} = getInput();
	const rocks = board.size
	let exceededMinY = false
	const point = {x: 500, y: 0}
	while (!exceededMinY) {
		if (!board.has(`${point.x}:${point.y + 1}`)) {
			point.y++
		} else if (!board.has(`${point.x - 1}:${point.y + 1}`)) {
			point.y++;
			point.x--;
		} else if (!board.has(`${point.x + 1}:${point.y + 1}`)) {
			point.y++;
			point.x++;
		} else {
			board.add(`${point.x}:${point.y}`);
			point.x = 500
			point.y = 0
		}
		exceededMinY = point.y >= maxY
	}
	console.log(board.size - rocks)
	return board.size - rocks
}

function part2() {
	const {board, maxY} = getInput();
	const rocks = board.size
	let exceededHighestPoint = false

	const point = {x: 500, y: 0};
	while (!exceededHighestPoint) {
		exceededHighestPoint = board.has(`500:0`)
		if (point.y === maxY + 1) {
			board.add(`${point.x}:${point.y}`);
			point.x = 500
			point.y = 0
		} else if (!board.has(`${point.x}:${point.y + 1}`)) {
			point.y++;
		} else if (!board.has(`${point.x - 1}:${point.y + 1}`)) {
			point.y++;
			point.x--;
		} else if (!board.has(`${point.x + 1}:${point.y + 1}`)) {
			point.y++;
			point.x++;
		} else {
			board.add(`${point.x}:${point.y}`);
			point.x = 500
			point.y = 0
		}
	}
	console.log(board.size - rocks)
	return board.size - rocks
}


part1()
part2()

