import { Score } from "@ethics-olympiad/types";

export default function scoresToCSV(scores: Score[]) {
  const sanitised: any = scores.map((score) => {
    const _s: any = score;
    delete _s._id;
    delete _s.eventID;
    delete _s.createdAt;
    delete _s.updatedAt;
    delete _s.__v;
    return _s;
  });

  const headers = getHeaders(sanitised[0]);
  const values = getValues(sanitised);
  return assembleCSV(headers, values);
}

function getHeaders(json: { [key: string]: any }, subkey?: string) {
  const keys: (string | string[])[] = Object.keys(json).map((key) => {
    if (typeof json[key] === "object") return getHeaders(json[key], key);
    else if (subkey) return `${subkey}.${key}`;
    else return key;
  });
  return keys.flat();
}

function getValues(jsonArr: any[]) {
  return jsonArr.map((json: any) => {
    const values: any[] = Object.values(json).map((value) => {
      if (typeof value === "object") return getValues([value]);
      else return value;
    });
    return values.flat().flat();
  });
}

// where headers are the first row of the csv,
// and the values are each successive row
function assembleCSV(headers: string[], values: any[]) {
  const stringifiedHeaders =
    headers.reverse().reduce((next, str) => str + "," + next) + ",\n";
  const stringifiedValues = values
    .map(
      (row: string[]) =>
        row.reverse().reduce((next, str) => str + "," + next) + ",\n"
    )
    .flat();
  return stringifiedHeaders + stringifiedValues.join("");
}
