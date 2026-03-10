import './QuoteComponent.css'

export default function QuoteComponent({ text, author, getQuoteAndAuthor }) {
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
        >
          Tweet
        </a>
        <button id="new-quote" onClick={getQuoteAndAuthor}>New Quote</button>
      </div>
    </div>
  )
}