import { readFileSync, writeFileSync } from "fs";

const raw = readFileSync("package.json");
const json = JSON.parse(raw);

delete json.scripts.dev;
delete json.scripts.predeploy;
delete json.devDependencies;

writeFileSync("./dist/package.json", JSON.stringify(json, undefined, 2));
