
      // Set year
    document.getElementById('year').textContent = new Date().getFullYear();

    const inviteForm = document.getElementById('inviteForm');
    const linkBox = document.getElementById('linkBox');
    const generatedLinkEl = document.getElementById('generatedLink');
    const copyBtn = document.getElementById('copyBtn');
    const openBtn = document.getElementById('openBtn');

    inviteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!name || !email) {
        // minimal inline validation
        alert('Please enter both name and email.');
        return;
      }

      // Example link generation:
      // You can change this to server endpoint that generates a one-time token / DB id
      const base = window.location.origin; // current origin
      const params = new URLSearchParams({ name: name, email: email });
      const inviteLink = `${base}/invitation?${params.toString()}`;

      // show link
      generatedLinkEl.textContent = inviteLink;
      generatedLinkEl.setAttribute('data-url', inviteLink);
      openBtn.href = inviteLink;
      linkBox.style.display = 'block';

      // smooth scroll to link area on smaller screens
      linkBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    copyBtn.addEventListener('click', async function () {
      const url = generatedLinkEl.getAttribute('data-url');
      if (!url) return;
      try {
        await navigator.clipboard.writeText(url);
        // little visual feedback
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = 'Copy'), 1500);
      } catch (err) {
        // fallback
        alert('Could not copy. Select and copy manually.');
      }
    });
