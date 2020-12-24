class MarkovMachine {

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      chains.has(word) ? chains.get(word).push(nextWord)
      : chains.set(word, [nextWord]);
    }

    this.chains = chains;
  }
  
  static choice(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let output = [];

    while (output.length < numWords && key !== null) {
      output.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return output.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};