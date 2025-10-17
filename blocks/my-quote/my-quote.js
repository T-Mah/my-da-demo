export default async function decorate(block) {
    const quotes = [...block.firstElementChild.children];
    block.classList.add(`my-quote-${quotes.length}-my-quotes`);
}