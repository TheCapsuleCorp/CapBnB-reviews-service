import React from 'react';
import { useParams } from 'react-router-dom';

const App = () => {
  const { roomId } = useParams();

  return (
    <div className="helloworld">Hello {roomId}!</div>
  );
};

export default App;
