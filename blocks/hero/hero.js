export default function decorate(block) {
  const tags = [
    { text: '💡 Insight', className: 'insight' },
    { text: '✅ Action', className: 'action' },
    { text: '❓ Question', className: 'question' },
    { text: '🎯 Goal', className: 'goal' },
  ];

  // Check if this is the center variant
  if (block.classList.contains('center')) {
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'hero-tags';

    tags.forEach((tag) => {
      const tagEl = document.createElement('span');
      tagEl.className = `hero-tag ${tag.className}`;
      tagEl.textContent = tag.text;
      tagsContainer.appendChild(tagEl);
    });

    block.appendChild(tagsContainer);
  }

  // Check if this is the split variant
  if (block.classList.contains('split')) {
    // Create a wrapper for the grid layout
    const wrapper = document.createElement('div');
    wrapper.className = 'hero-grid';

    // Get all rows from the block
    const rows = [...block.children];

    // Find the row that contains actual content (has both text and picture)
    let contentRow = rows.find((row) => row.querySelector('picture') || row.querySelector('h1'));

    if (contentRow) {
      const cols = [...contentRow.children];

      // First column is text content
      if (cols[0]) {
        cols[0].classList.add('hero-content');

        // Find all links and wrap them in a button container
        const links = cols[0].querySelectorAll('a');
        if (links.length > 0) {
          const buttonContainer = document.createElement('div');
          buttonContainer.className = 'button-container';

          links.forEach((link, index) => {
            // Remove the link from its parent paragraph
            const parentP = link.closest('p');

            // Add button classes
            link.classList.add('button');
            if (index === 0) {
              link.classList.add('primary');
            } else {
              link.classList.add('secondary');
            }

            buttonContainer.appendChild(link);

            // Remove empty parent paragraph if it exists
            if (parentP && parentP.textContent.trim() === '') {
              parentP.remove();
            }
          });

          cols[0].appendChild(buttonContainer);
        }

        wrapper.appendChild(cols[0]);
      }

      // Second column is image content
      if (cols[1] && cols[1].querySelector('picture')) {
        cols[1].classList.add('hero-image-wrapper');

        // Add floating tags around the image
        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'hero-tags';

        tags.forEach((tag) => {
          const tagEl = document.createElement('span');
          tagEl.className = `hero-tag ${tag.className}`;
          tagEl.textContent = tag.text;
          tagsContainer.appendChild(tagEl);
        });

        cols[1].appendChild(tagsContainer);
        wrapper.appendChild(cols[1]);
      }
    }

    // Clear block and add the wrapper
    block.textContent = '';
    block.appendChild(wrapper);
  }
}
