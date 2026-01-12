import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const isIconsVariant = block.classList.contains('icons');

  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);

    if (isIconsVariant) {
      // For icons variant, extract icon from first div and restructure
      const divs = [...li.children];
      if (divs.length >= 1) {
        const iconDiv = divs[0];
        const iconText = iconDiv.textContent.trim();
        iconDiv.className = 'cards-card-icon';
        iconDiv.textContent = iconText;

        // Remaining divs become body
        if (divs.length > 1) {
          const bodyDiv = document.createElement('div');
          bodyDiv.className = 'cards-card-body';
          for (let i = 1; i < divs.length; i += 1) {
            while (divs[i].firstChild) bodyDiv.append(divs[i].firstChild);
            divs[i].remove();
          }
          li.append(bodyDiv);
        }
      }
    } else {
      // Standard cards behavior
      [...li.children].forEach((div) => {
        if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
        else div.className = 'cards-card-body';
      });
    }

    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(ul);
}
