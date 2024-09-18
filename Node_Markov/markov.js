/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text. */
  constructor(text) {
    let words = text.split(/[ \r\n]+/); // split on spaces and line breaks
    this.words = words.filter(c => c !== ""); // filter out empty strings
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]}
   */
  makeChains() {
    this.chains = {};

    // Loop through each word and create the chains
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null; // next word is null if there is none

      if (this.chains[word]) {
        this.chains[word].push(nextWord);
      } else {
        this.chains[word] = [nextWord];
      }
    }
  }

  /** Pick a random word from an array */
  static choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** return random text from chains */
  makeText(numWords = 100) {
    // Pick a random word to start the text
    let keys = Object.keys(this.chains);
    let word = MarkovMachine.choice(keys);
    let output = [];

    // Generate up to numWords of text
    while (output.length < numWords && word !== null) {
      output.push(word);
      word = MarkovMachine.choice(this.chains[word]);
    }

    return output.join(" ");
  }
}

module.exports = { MarkovMachine };
