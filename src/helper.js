export const renderTags = (tags) => tags.map((tag) => `<span>${tag}</span>`).join('');

export const getHref = () => {
  return window.location.href.replace('http://dev.', 'https://').replace(/\/$/, '');
};
