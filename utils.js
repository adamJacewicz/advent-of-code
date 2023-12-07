import path from 'path';
import fs from 'fs';
import {fileURLToPath} from 'url';

export function getArgument(argName) {
	const args = process.argv.slice(2)
	const arg = args.find(arg => arg.startsWith(argName))
	return arg.split("=")[1]
}


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export function loadInput(path) {
	return fs.readFileSync(path, "utf-8")
}