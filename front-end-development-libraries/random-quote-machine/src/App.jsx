// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import QuoteComponent from './components/QuoteComponent'

function App() {
  // const [count, setCount] = useState(0)
  async function getQuoteAndAuthor() {
    const url = "https://api.quotable.io/quotes/random"
    console.log("Hellooooo, folks!")
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} ${response.text()}`)
      }
      const data = await response.json()
      console.log(data)
      return data
    } catch (e) {
      console.error(`Error fetching data: ${e}`)
    }
  }

  return (
    <div id="quote-box">
      <QuoteComponent onClick={getQuoteAndAuthor}
        // text="Whaddup"
        // author="Yo Mama"
      />
      {/* Dynamic content? */}
      <button id="new-quote" onClick={getQuoteAndAuthor}>Hi</button>
    </div>
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  )
}

export default App
