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

    const rows = [...block.children];

    // First row is text content
    if (rows[0]) {
      rows[0].classList.add('hero-content');
      wrapper.appendChild(rows[0]);
    }

    // Second row is image content
    if (rows[1]) {
      rows[1].classList.add('hero-image-wrapper');

      // Add floating tags
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'hero-tags';

      tags.forEach((tag) => {
        const tagEl = document.createElement('span');
        tagEl.className = `hero-tag ${tag.className}`;
        tagEl.textContent = tag.text;
        tagsContainer.appendChild(tagEl);
      });

      rows[1].appendChild(tagsContainer);
      wrapper.appendChild(rows[1]);
    }

    block.appendChild(wrapper);
  }
}
