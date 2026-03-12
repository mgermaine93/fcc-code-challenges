import { useState, useEffect } from 'react'
import quotes from './assets/quotes.json' with { type: 'json' }
import QuoteComponent from './components/QuoteComponent'

const colorSchemes = ["#001219","#005f73","#ee9b00","#ca6702","#bb3e03","#ae2012","#9b2226"]

function App() {
  const [quote, setQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)])
  const [colorScheme, setColorScheme] = useState(colorSchemes[0])

  // Set body background color directly — CSS variables can't cross the React tree boundary
  useEffect(() => {
    document.body.style.backgroundColor = colorScheme
    document.body.style.color = colorScheme
  }, [colorScheme])

  function getQuoteAndAuthor() {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    setColorScheme(colorSchemes[Math.floor(Math.random() * colorSchemes.length)])
  }

  return (
    <QuoteComponent
      getQuoteAndAuthor={getQuoteAndAuthor}
      text={quote.text}
      author={quote.author}
      colorScheme={colorScheme}
    />
  )
}

export default App