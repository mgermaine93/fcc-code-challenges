// function getNewQuote() {
//     console.log("Hello from the random quote machine project!")
// }

async function getNewQuote() {
    const url = "https://api.breakingbadquotes.xyz/v1/quotes"
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const result = await response.json();
        console.log(result);
        const text = document.getElementById("text");
        text.innerText = result[0].quote
        const author = document.getElementById("author");
        author.innerText = result[0].author
        return result
    } catch (error) {
        console.error(error.message);
    }
}