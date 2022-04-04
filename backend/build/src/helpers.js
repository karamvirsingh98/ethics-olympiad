"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrToKeyedObject = exports.stringIn = exports.filterOutFromObj = void 0;
function filterOutFromObj(obj, idsToFilterOut) {
    return Object.fromEntries(Object.entries(obj).filter((entry) => {
        return !stringIn(entry[0], idsToFilterOut);
    }));
}
exports.filterOutFromObj = filterOutFromObj;
function stringIn(str, ar) {
    return ar.includes(str);
}
exports.stringIn = stringIn;
function arrToKeyedObject(arr, idField = "_id") {
    return Object.fromEntries(arr.map((obj) => [obj[idField], obj]));
}
exports.arrToKeyedObject = arrToKeyedObject;
