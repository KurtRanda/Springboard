$(function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck';
  
    // 1. Function to draw a single card from a newly shuffled deck
    async function part1() {
      // Request a new shuffled deck and draw a card
      let data = await $.getJSON(`${baseURL}/new/draw/`);
      // Destructure the suit and value of the first card in the deck
      let { suit, value } = data.cards[0];
      // Log the card's value and suit in lowercase (e.g., "queen of hearts")
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }
  
    // 2. Function to draw two cards from the same shuffled deck
    async function part2() {
      // Request a new shuffled deck and draw the first card
      let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
      // Store the deck ID to use for the second card
      let deckId = firstCardData.deck_id;
      // Request a second card from the same deck using the deck ID
      let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
      // Log both cards (first and second) by iterating over them
      [firstCardData, secondCardData].forEach(card => {
        let { suit, value } = card.cards[0];
        // Log each card's value and suit in lowercase (e.g., "5 of diamonds")
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
      });
    }
  
    // 3. Function to set up drawing cards interactively by button click
    async function setup() {
      let $btn = $('button'); // Select the button element
      let $cardArea = $('#card-area'); // Select the card area where cards will be displayed
  
      // Shuffle a new deck and store its deck ID
      let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
      
      // Show the button and add a click event listener to draw cards
      $btn.show().on('click', async function() {
        // Request to draw a single card from the deck
        let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
        // Get the image URL for the drawn card
        let cardSrc = cardData.cards[0].image;
        
        // Randomize the angle and position of the card for visual effect
        let angle = Math.random() * 90 - 45; // Rotate randomly between -45 and 45 degrees
        let randomX = Math.random() * 40 - 20; // Randomly shift the card horizontally
        let randomY = Math.random() * 40 - 20; // Randomly shift the card vertically
  
        // Append the card image to the card area with random rotation and translation
        $cardArea.append(
          $('<img>', {
            src: cardSrc,
            css: {
              transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
            }
          })
        );
  
        // If no cards remain in the deck, remove the draw button
        if (cardData.remaining === 0) $btn.remove();
      });
    }
  
    // Call the setup function to initialize the card drawing system
    setup();
  });
  