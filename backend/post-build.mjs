import { readFileSync, writeFileSync } from "fs";

const raw = readFileSync("package.json");
const json = JSON.parse(raw);

delete json.scripts;
delete json.devDependencies;

writeFileSync("./build/package.json", JSON.stringify(json, undefined, 2));