import {getArgument} from "./utils.js";

const day = getArgument("--day")
const year = getArgument("--year")
import(`./${year}/${day}/main.js`)
