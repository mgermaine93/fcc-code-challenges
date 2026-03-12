import './QuoteComponent.css'
import { useState } from 'react'


export default function QuoteComponent({ text, author, getQuoteAndAuthor, colorScheme }) {

    // const [colorScheme] = useState(colorSchemes)
    const [newQuoteHovered, setNewQuoteHovered] = useState(false)
    const [tweetHovered, setTweetHovered] = useState(false)

  return (
    <div
      id="quote-box"
    >
      <div id="quote-text">
        <span id="text">{text}</span>
      </div>
      <div id="quote-author">
        <span id="author">- {author}</span>
      </div>
      <div id="quote-buttons">
        <a
          id="tweet-quote"
          title="Tweet this quote!"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${text}" — ${author}`)}`}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setTweetHovered(true)}
          onMouseLeave={() => setTweetHovered(false)}
          style={{
            backgroundColor: tweetHovered ? colorScheme : 'transparent',
            color: tweetHovered ? 'var(--vanilla-custard)' : colorScheme,
            borderColor: tweetHovered ? 'var(--vanilla-custard)' : colorScheme,
            transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
          }}
        >
          Tweet
        </a>
        <button 
            id="new-quote"
            onClick={getQuoteAndAuthor}
            onMouseEnter={() => setNewQuoteHovered(true)}
            onMouseLeave={() => setNewQuoteHovered(false)}
            style={{
                backgroundColor: newQuoteHovered ? colorScheme : 'var(--vanilla-custard)',
                color: newQuoteHovered ? 'var(--vanilla-custard)' : colorScheme,
                transition: 'background-color 0.2s ease, color 0.2s ease',
            }}>
            New Quote
        </button>
      </div>
    </div>
  )
}