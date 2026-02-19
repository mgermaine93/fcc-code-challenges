import './QuoteComponent.css'

export default function QuoteComponent({children, getQuoteAndAuthor, text, author}) {

    // defining this function here allows it to have access to this component's props and state, which is handy for setting the quote and author values
    // function getQuoteAndAuthor() {
    //     console.log("Hello, folks!")
    //     const first = Math.random()
    //     const second = Math.random()
    //     return {
    //         first: first,
    //         second: second
    //     }
    // }

    return (
        <div id="quote-box">
            <div id="quote-text">
                <span id="text">{text}</span>
            </div>
            <div id="quote-author">
                <span id="author">{author}</span>
            </div>
            <div id="quote-buttons">
                {/* don't execute the getQuoteAndAuthor function here, e.g., no parentheses. instead, naming it here allows React to execute it*/}
                <button id="new-quote" onClick={getQuoteAndAuthor}>{children}</button>
            </div>
        </div>
    )
}