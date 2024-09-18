const { MarkovMachine } = require('./markov');

describe('MarkovMachine', function() {
  test('chains are made correctly', function() {
    let mm = new MarkovMachine("the cat in the hat");
    expect(mm.chains).toEqual({
      the: ["cat", "hat"],
      cat: ["in"],
      in: ["the"],
      hat: [null]
    });
  });

  test('makeText generates text', function() {
    let mm = new MarkovMachine("the cat in the hat");
    let text = mm.makeText(10);
    expect(text.split(" ").length).toBeLessThanOrEqual(10);
  });

  test('makeText stops at null', function() {
    let mm = new MarkovMachine("the cat in the hat");
    let text = mm.makeText();
    expect(text.includes('hat')).toBe(true);
  });
});
