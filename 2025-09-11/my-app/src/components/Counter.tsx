import { useState } from "react"
import "../App.css"
import "./Counter.css" // uus css fail

function Counter() {
  const [count, setCount] = useState(0)

  function increaseCounter(amount: number) {
    setCount(count => count + amount)
  }

  function decreaseCounter(amount: number) {
    setCount(count => count - amount)
  }

  return (
    <>
      <h1>Vite + React + Marcus</h1>
      <div className="card">
        <h2>count is {count}</h2>

        <div className="counter-grid">
          <button onClick={() => increaseCounter(100)}>+100</button>
          <button onClick={() => increaseCounter(50)}>+50</button>
          <button onClick={() => increaseCounter(25)}>+25</button>
          <button onClick={() => increaseCounter(1)}>+1</button>

          <button onClick={() => decreaseCounter(1)}>-1</button>
          <button onClick={() => decreaseCounter(25)}>-25</button>
          <button onClick={() => decreaseCounter(50)}>-50</button>
          <button onClick={() => decreaseCounter(100)}>-100</button>
        </div>
      </div>
    </>
  )
}

export default Counter
