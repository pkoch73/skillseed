export default function decorate(block) {
  const rows = [...block.children];
  const container = document.createElement('div');

  // Transpose: columns become pricing cards
  // First, determine number of columns from first row
  const numCols = rows[0]?.children.length || 0;

  for (let col = 0; col < numCols; col += 1) {
    const cardEl = document.createElement('div');
    cardEl.className = 'pricing-card';

    // Mark second card as featured (Growth tier)
    if (col === 1) {
      cardEl.classList.add('featured');
    }

    let featuresList = null;

    rows.forEach((row, rowIndex) => {
      const cell = row.children[col];
      if (!cell) return;

      const content = cell.textContent.trim();
      const link = cell.querySelector('a');

      if (rowIndex === 0) {
        // Tier name
        const tier = document.createElement('h3');
        tier.className = 'pricing-tier';
        tier.textContent = content;
        cardEl.appendChild(tier);
      } else if (rowIndex === 1) {
        // Price
        const price = document.createElement('div');
        price.className = 'pricing-price';
        if (content.includes('/')) {
          const [amount, period] = content.split('/');
          price.innerHTML = `${amount.trim()}<span>/${period.trim()}</span>`;
        } else {
          price.textContent = content;
        }
        cardEl.appendChild(price);
      } else if (rowIndex === 2) {
        // Description
        const desc = document.createElement('p');
        desc.className = 'pricing-description';
        desc.textContent = content;
        cardEl.appendChild(desc);
      } else if (link) {
        // CTA button - should come last
        const cta = document.createElement('div');
        cta.className = 'pricing-cta';
        link.className = 'button';
        cta.appendChild(link);
        cardEl.appendChild(cta);
      } else if (content) {
        // Feature item
        if (!featuresList) {
          featuresList = document.createElement('ul');
          featuresList.className = 'pricing-features';
          // Insert before CTA if it exists
          const existingCta = cardEl.querySelector('.pricing-cta');
          if (existingCta) {
            cardEl.insertBefore(featuresList, existingCta);
          } else {
            cardEl.appendChild(featuresList);
          }
        }
        const li = document.createElement('li');
        li.textContent = content;
        featuresList.appendChild(li);
      }
    });

    container.appendChild(cardEl);
  }

  block.replaceChildren(container);
}
