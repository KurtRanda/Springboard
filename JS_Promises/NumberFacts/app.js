let favNumber = 7;
let favNumbers = [5, 31, 92];
let baseURL = "http://numbersapi.com";

// 1. Get a single fact about your favorite number
$.getJSON(`${baseURL}/${favNumber}?json`).then(data => {
  $("body").append(`<p>Single fact about ${favNumber}: ${data.text}</p>`);
});

// 2. Get facts about multiple numbers
$.getJSON(`${baseURL}/${favNumbers}?json`).then(data => {
  Object.values(data).forEach(fact => {
    $("body").append(`<p>${fact}</p>`);
  });
});

// 3. Get 4 different facts about your favorite number
Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${baseURL}/${favNumber}?json`);
  })
).then(facts => {
  facts.forEach(data => {
    $("body").append(`<p>Fact: ${data.text}</p>`);
  });
});
