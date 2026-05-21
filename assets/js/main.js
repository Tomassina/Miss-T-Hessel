(function () {
  'use strict';

  /* ── Header scroll behaviour ─────────────────────────────── */
  const header = document.getElementById('site-header');
  if (header) {
    const syncHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 60);
    window.addEventListener('scroll', syncHeader, { passive: true });
    syncHeader();
  }

  /* ── Set active nav link from current URL ────────────────── */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === currentFile || (currentFile === '' && href === 'index.html'));
  });

  /* ── Mobile nav toggle ───────────────────────────────────── */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav   = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });

    // Close nav when any link is tapped (mobile)
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Transcript toggle ───────────────────────────────────── */
  const transcriptToggle = document.getElementById('transcript-toggle');
  const transcriptPanel  = document.getElementById('transcript-panel');

  if (transcriptToggle && transcriptPanel) {
    transcriptToggle.addEventListener('click', () => {
      const open = transcriptPanel.classList.toggle('is-open');
      transcriptToggle.setAttribute('aria-expanded', String(open));
      transcriptPanel.setAttribute('aria-hidden', String(!open));

      const label = transcriptToggle.querySelector('.transcript-btn-label');
      if (label) label.textContent = open ? 'Hide Transcript' : 'View Transcript';
    });
  }

  /* ── Play button (placeholder behaviour) ────────────────── */
  const playBtn = document.getElementById('play-btn');
  if (playBtn && transcriptPanel) {
    playBtn.addEventListener('click', () => {
      // Open the transcript as the text alternative
      if (!transcriptPanel.classList.contains('is-open')) {
        transcriptPanel.classList.add('is-open');
        transcriptPanel.setAttribute('aria-hidden', 'false');
        if (transcriptToggle) {
          transcriptToggle.setAttribute('aria-expanded', 'true');
          const label = transcriptToggle.querySelector('.transcript-btn-label');
          if (label) label.textContent = 'Hide Transcript';
        }
      }

      // Brief message on the video label
      const videoLabel = document.querySelector('.video-label');
      if (videoLabel) {
        const original = videoLabel.textContent;
        videoLabel.textContent = 'Video coming soon — transcript is available below ↓';
        setTimeout(() => { videoLabel.textContent = original; }, 3500);
      }
    });
  }

})();
