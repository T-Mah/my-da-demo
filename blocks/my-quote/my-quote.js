export default async function decorate(block) {
    const [quotation, quoteAuthor] = [...block.children].map((c) => c.firstElementChild);
    const quoteblock = document.createElement('quoteblock');
    block.classList.add(`my-quote-${quotes.length}`);

    quotation.className = 'my-quote-quotation';
    quoteblock.append(quotation);

    if (quoteAuthor) {
    quoteAuthor.className = 'my-quote-attribution';
    quoteblock.append(quoteAuthor);
    const ems = quoteAuthor.querySelectorAll('em');
    ems.forEach((em) => {
      const cite = document.createElement('cite');
      cite.innerHTML = em.innerHTML;
      em.replaceWith(cite);
    });
  }
  block.innerHTML = '';
  block.append(quoteAuthor);
}