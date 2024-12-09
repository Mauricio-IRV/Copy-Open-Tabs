document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({}, (tabs) => {
    const urlList = document.getElementById('url-list');
    const linkFormatSelect = document.getElementById('link-format');

    // Function to generate links based on selected format
    const generateLinks = () => {
      const selectedFormat = linkFormatSelect.value;
      const links = [];

      tabs.forEach(tab => {
        if (selectedFormat === 'markdown') {
          links.push(`[${tab.title}](${tab.url})`);
        } else if (selectedFormat === 'html') {
          links.push(`<a href="${tab.url}">${tab.title}</a>`);
        } else if (selectedFormat === 'plain') {
          links.push(tab.url);
        }
      });

      // Join the links and set the value of the textarea
      urlList.value = links.join('\n');
    };

    // Generate links initially
    generateLinks();

    // Update links when the format changes
    linkFormatSelect.addEventListener('change', generateLinks);

    // Copy to clipboard functionality
    document.getElementById('copy-btn').addEventListener('click', () => {
      navigator.clipboard.writeText(urlList.value).then(() => { }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    });
  });

  // Toggle Dark/Light Mode
  const toggleBtn = document.getElementById('toggle-btn');
  toggleBtn.addEventListener('change', () => {
    document.body.classList.toggle('light-mode');
  });
});
