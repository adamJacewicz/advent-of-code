const fs = require("fs")
const path = require("path")

const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")

const parseInput = (input) => {
	return input.split("\n\n").map(x => x.split("\n")).map(z => z.map(x => JSON.parse(x)))
}

const isNumber = (a) => typeof  a === "number"
const isArray = (a) => Array.isArray(a)

const compare = (a,b) => {
	if(isNumber(a) && isNumber(b)) {
		return a < b
	}
	if(isArray(a) && isArray(b)) {
		return a < b
	}

}

console.log(input)


