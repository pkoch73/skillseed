export default function decorate(block) {
  // Check if this is the center variant
  if (block.classList.contains('center')) {
    // Add floating tags for visual interest
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'hero-tags';

    const tags = [
      { text: '💡 Insight', className: 'insight' },
      { text: '✅ Action', className: 'action' },
      { text: '❓ Question', className: 'question' },
      { text: '🎯 Goal', className: 'goal' },
    ];

    tags.forEach((tag) => {
      const tagEl = document.createElement('span');
      tagEl.className = `hero-tag ${tag.className}`;
      tagEl.textContent = tag.text;
      tagsContainer.appendChild(tagEl);
    });

    block.appendChild(tagsContainer);
  }
}

