const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function generateText(text) {
  let res = new markov.MarkovMachine(text);
  console.log(res.makeText());
}

function makeText(path) {
  fs.readFile(path, "utf8", function read(err, data) {
    err ? logError("Cannot read file", path, err) : generateText(data);
  });
}

async function makeURLText(url) {
  let res;
  try {
    res = await axios.get(url);
  } catch (err) {
    logError("Cannot read URL", url, err)
  }
  generateText(res.data)
}

function logError(type, path, err){
  err ? console.error(`${type}: ${path}: ${err}`) : console.log(`${type}: ${path}`);
  process.exit(1);
}

let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
} else if (method === "url") {
  makeURLText(path);
} else {
  logError("Unknown method", method, null)
}