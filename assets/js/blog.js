// File: assets/js/blog.js

/* =========================================
   AlgorithM Blog - Interactions
   - カテゴリフィルター
   - キーワード検索
   - ヘッダー / 進捗バー
   - フェードイン
========================================= */

(function () {
  'use strict';

  // ---------- 一覧ページ: フィルタリング ----------
  const categoryTags = document.querySelectorAll('#categoryTags .tag');
  const searchInput = document.getElementById('searchInput');
  const articleCards = document.querySelectorAll('#articleGrid .article-card');
  const articleCount = document.getElementById('articleCount');
  const emptyState = document.getElementById('emptyState');
  const articleGrid = document.getElementById('articleGrid');

  let currentCategory = 'all';
  let currentKeyword = '';

  function applyFilter() {
    if (!articleCards.length) return;
    let visibleCount = 0;
    const keyword = currentKeyword.toLowerCase().trim();

    articleCards.forEach((card) => {
      const category = card.getAttribute('data-category') || '';
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      const title = card.querySelector('.article-card__title')?.textContent.toLowerCase() || '';
      const excerpt = card.querySelector('.article-card__excerpt')?.textContent.toLowerCase() || '';

      const matchCategory = currentCategory === 'all' || category === currentCategory;
      const matchKeyword =
        !keyword ||
        title.includes(keyword) ||
        excerpt.includes(keyword) ||
        tags.includes(keyword);

      if (matchCategory && matchKeyword) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (articleCount) articleCount.textContent = visibleCount;
    if (emptyState && articleGrid) {
      if (visibleCount === 0) {
        emptyState.hidden = false;
        articleGrid.style.display = 'none';
      } else {
        emptyState.hidden = true;
        articleGrid.style.display = '';
      }
    }
  }

  categoryTags.forEach((tag) => {
    tag.addEventListener('click', () => {
      categoryTags.forEach((t) => t.classList.remove('is-active'));
      tag.classList.add('is-active');
      currentCategory = tag.getAttribute('data-filter') || 'all';
      applyFilter();
    });
  });

  if (searchInput) {
    let timer = null;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        currentKeyword = e.target.value;
        applyFilter();
      }, 150);
    });
  }

  // ---------- 個別記事: 読了進捗バー ----------
  const progressBar = document.getElementById('readingProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / docHeight) * 100;
      progressBar.style.width = Math.min(scrolled, 100) + '%';
    }, { passive: true });
  }

  // ---------- ヘッダー挙動 ----------
  const header = document.getElementById('siteHeader');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    if (!header) return;
    const current = window.pageYOffset;
    if (current > lastScroll && current > 120) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    header.style.transition = 'transform 0.3s ease';
    lastScroll = current;
  }, { passive: true });

  // ---------- フェードインアニメーション ----------
  if ('IntersectionObserver' in window) {
    const fadeTargets = document.querySelectorAll(
      '.article-card, .featured-card, .newsletter-card, .related-card, .post-body h2, .post-body h3'
    );
    fadeTargets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeTargets.forEach((el) => io.observe(el));
  }

  // ---------- ナビトグル ----------
  const navToggle = document.querySelector('.nav-toggle');
  const globalNav = document.querySelector('.global-nav');
  if (navToggle && globalNav) {
    navToggle.addEventListener('click', () => {
      globalNav.classList.toggle('is-open');
    });
  }

  // ---------- イースターエッグ ----------
  console.log('%c Hello, fellow developer. We are hiring. ', 'background:#0A0E1A;color:#00E5FF;font-family:monospace;padding:8px 12px;border-radius:4px;');

})();
