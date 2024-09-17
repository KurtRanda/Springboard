let baseURL = "https://deckofcardsapi.com/api/deck";
let deckId = null;

// 3. When the page loads, create a new shuffled deck
$.getJSON(`${baseURL}/new/shuffle/`, function (data) {
  deckId = data.deck_id;
  console.log("Deck is shuffled. Deck ID:", deckId);
  
  // Enable the draw card button
  $("#drawCard").on("click", function () {
    drawCard();
  });
});

// Function to draw a card
function drawCard() {
  if (!deckId) return;

  $.getJSON(`${baseURL}/${deckId}/draw/?count=1`, function (data) {
    if (data.remaining === 0) {
      $("#drawCard").prop("disabled", true).text("No more cards");
    }
    let card = data.cards[0];
    $("#cardContainer").append(
      `<img src="${card.image}" alt="${card.value} of ${card.suit}">`
    );
  });
}
