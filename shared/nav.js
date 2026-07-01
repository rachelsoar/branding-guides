/* Soar Brand Guide — Navigation + Section Toggle
   Auto-generates table of contents from h2 elements.
   Makes sections collapsible via h2 click.
   Runs on all brand guide sub-pages. */

(function () {
  var sections = document.querySelectorAll('section');
  var tocContainer = document.getElementById('page-index');
  if (!tocContainer || sections.length === 0) return;

  /* Build TOC and wire up toggles */
  var tocList = document.createElement('div');
  tocList.className = 'toc-list';

  sections.forEach(function (section, i) {
    var heading = section.querySelector('h2');
    if (!heading) return;

    /* Add anchor id */
    var id = 'section-' + heading.textContent.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    section.setAttribute('id', id);

    /* Build TOC link */
    var link = document.createElement('a');
    link.className = 'toc-link';
    link.href = '#' + id;
    link.textContent = heading.textContent;
    tocList.appendChild(link);

    /* Make section collapsible */
    section.classList.add('collapsible');
    section.classList.add('is-open');

    var toggle = document.createElement('span');
    toggle.className = 'section-toggle material-symbols-outlined';
    toggle.textContent = 'expand_less';
    toggle.setAttribute('aria-hidden', 'true');
    heading.appendChild(toggle);

    heading.style.cursor = 'pointer';
    heading.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') return;
      var isOpen = section.classList.toggle('is-open');
      toggle.textContent = isOpen ? 'expand_less' : 'expand_more';
    });
  });

  tocContainer.appendChild(tocList);

  /* Expand All / Collapse All */
  var controls = document.createElement('div');
  controls.className = 'toc-controls';
  controls.innerHTML = '<button onclick="toggleAll(true)">Expand all</button><button onclick="toggleAll(false)">Collapse all</button>';
  tocContainer.appendChild(controls);

  window.toggleAll = function (open) {
    document.querySelectorAll('section.collapsible').forEach(function (s) {
      if (open) s.classList.add('is-open');
      else s.classList.remove('is-open');
      var t = s.querySelector('.section-toggle');
      if (t) t.textContent = open ? 'expand_less' : 'expand_more';
    });
  };
})();
