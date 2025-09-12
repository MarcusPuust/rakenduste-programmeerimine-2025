import { useState } from "react"
import "./Dice.css"

export default function Dice() {
  const [value, setValue] = useState<number>(1)

  const roll = () => {
    const n = Math.floor(Math.random() * 6) + 1
    setValue(n)
  }

  return (
    <section className="dice-container">
      <div className="dice-card">
        <h2 className="dice-title">Täringu veeretaja</h2>
        <div
          key={value}
          className="dice-face"
        >
          {value}
        </div>
        <button
          className="dice-btn"
          type="button"
          onClick={roll}
        >
          Veereta täringut
        </button>
      </div>
    </section>
  )
}
