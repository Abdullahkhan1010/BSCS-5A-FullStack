import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from './actions'; // Import action creator

function App() {
  const count = useSelector((state) => state.count); // Read from store
  const dispatch = useDispatch(); // Get dispatch function

  const handleIncrement = () => {
    dispatch(increment()); // Dispatch action using action creator
  };

  return (
    <div>
      <h1>Redux Counter</h1>
      <h2>Count: {count}</h2>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}

export default App;