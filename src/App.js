import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, addCounter, removeCounter, removeCounterByIndex } from './redux/slices/counterSlice';
import Table from "../src/components/Table"
import '../src/styles/App.css';
import UserForm from './components/Form';
function App() {
  const counters = useSelector((state) => state.counter.counters);
  const dispatch = useDispatch();
  const totalSum = counters.reduce((total, count) => total + count, 0);

  return (
    <div className="App">
      <UserForm />
      <h2>Total Sum: {totalSum}</h2>

      <h1>Multi Counter</h1>

      {counters.map((count, index) => (
        <div className="counter-container" key={index}>
          <button
            className="counter-button decrement"
            onClick={() => dispatch(decrement(index))}
            disabled={count <= 0}
          >
            -
          </button>
          <span className="counter-display">{count}</span>
          <button
            className="counter-button increment"
            onClick={() => dispatch(increment(index))}
          >
            +
          </button>
          {index !== 0 && (
            <button
              className="counter-button delete"
              onClick={() => dispatch(removeCounterByIndex(index))}
            >
              Delete
            </button>
          )}
        </div>
      ))}

      <div className="controls">
        <button
          className="control-button"
          onClick={() => dispatch(addCounter())}
          disabled={counters.length >= 5}
        >
          Add Counter
        </button>
        <button
          className="control-button"
          onClick={() => dispatch(removeCounter())}
        >
          Remove Last Counter
        </button>
      </div>

      {counters.length >= 5 && <p className="max-message">You can only have a maximum of 5 counters.</p>}
    
    
      <Table />

    </div>
  );
}

export default App;
