let favNumber = 7;
let baseURL = "http://numbersapi.com";

// 1. Get a fact about your favorite number
async function part1() {
  let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
  console.log(data);
}
part1();

// 2. Get facts about multiple numbers
const favNumbers = [5, 31, 92];
async function part2() {
  let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
  for (let number in data) {
    $('body').append(`<p>Fact about ${number}: ${data[number]}</p>`);
  }
}
part2();

// 3. Get 4 facts about your favorite number
async function part3() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
  );
  facts.forEach(data => {
    $('body').append(`<p>${data.text}</p>`);
  });
}
part3();
