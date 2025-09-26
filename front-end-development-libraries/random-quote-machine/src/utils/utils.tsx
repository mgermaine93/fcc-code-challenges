export type Quote = {
    quote: string;
    author: string;
}

type QuoteResponse = Quote[]

export async function getRandomQuote(): Promise<Quote[] | null> {
    const url = "https://api.breakingbadquotes.xyz/v1/quotes";
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const result: QuoteResponse = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error((error as Error).message);
        return null;
    }
}

export default { getRandomQuote }