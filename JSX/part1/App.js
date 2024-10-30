
import React from 'react';
import FirstComponent from './FirstComponent';
import NamedComponent from './NamedComponent';

function App() {
  return (
    <div>
      <FirstComponent />
      <NamedComponent name="Kurt" />
    </div>
  );
}

export default App;
