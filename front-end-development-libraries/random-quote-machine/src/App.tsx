import { useState, useEffect} from 'react'
import { type Quote, getRandomQuote} from "./utils/utils"
import './App.css'

function App() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const randomQuote = async() => {
    setIsLoading(true);

    try {
      const randomQuote = await getRandomQuote();
      if (randomQuote && randomQuote.length > 0) {
        setQuote(randomQuote[0])
      }
    } catch (e) {
      console.log(`Error fetching the quote: ${e}`)
    } finally {
      setIsLoading(false)
    }

    const randomQuote = await getRandomQuote();
    console.log(randomQuote)
  }

  // Fetch quote on component mount
  useEffect(() => {
    randomQuote();
  }, []);

  return (
    <>
      <div id="quote-box">
        {isLoading ? (
          <p>Loading...</p>
        ) : quote ? (
          <>
            <p id="text">"{quote.quote}"</p>
            <p id="author">{quote.author}</p>
            <button id="new-quote" onClick={randomQuote}>New Quote</button>
          </>
        ) : (
          <p>No quote available</p>
        )}
      </div>
    </>
  )
}

export default App
