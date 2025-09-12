import { useState } from "react"
import "../App.css"

function Counter() {
  const [count, setCount] = useState(0) // Iga komponendi enda jaoks olev state (algväärtus 0 on default)
  // useState on React hook, mis võimaldab funktsionaalsel komponendil hoida ja hallata state'i
  // Andmed kaovad ära kui refreshi teha, võimalik salvestada localStorage'i või backend'i
  function increaseCounter(amount: number) {
    // Vaja täpsustada, mis see on, mitte kasutada (any) ehk (amount: number)
    setCount(count => count + amount)
  }

  return (
    <>
      <h1>Vite + React + Marcus</h1>
      <div className="card">
        <button onClick={() => increaseCounter(1)}> count is {count} </button>
        count is {count}
      </div>
    </>
  )
}

export default Counter
