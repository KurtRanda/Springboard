// src/App.js
import React from 'react';
import Tweet from './Tweet';

function App() {
  return (
    <div>
      <Tweet
        username="user123"
        name="John Doe"
        date="2024-10-29"
        message="Hello world! This is my first tweet."
      />
      <Tweet
        username="jane_doe"
        name="Jane Doe"
        date="2024-10-28"
        message="Just learned React! It's so much fun!"
      />
      <Tweet
        username="dev_guru"
        name="Dev Guru"
        date="2024-10-27"
        message="Always keep learning and coding. 🚀"
      />
    </div>
  );
}

export default App;
