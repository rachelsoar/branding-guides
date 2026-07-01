/* Soar Brand Guide — Changelog Badge System
   Reads data-updated="YYYY-MM-DD" on <section> elements.
   If updated within the last 14 days, injects a visible badge
   and highlights the section. Badges auto-expire. */

(function () {
  var DAYS_VISIBLE = 14;
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var sections = document.querySelectorAll('section[data-updated]');

  sections.forEach(function (section) {
    var dateStr = section.getAttribute('data-updated');
    var parts = dateStr.split('-');
    var updated = new Date(parts[0], parts[1] - 1, parts[2]);
    var diffDays = Math.floor((today - updated) / 86400000);

    if (diffDays <= DAYS_VISIBLE && diffDays >= 0) {
      section.classList.add('recently-updated');

      var heading = section.querySelector('h2, h3');
      if (heading) {
        var badge = document.createElement('span');
        badge.className = 'updated-badge';
        badge.innerHTML = '<span class="material-symbols-outlined">fiber_new</span>Updated ' + dateStr;
        heading.appendChild(badge);
      }
    }
  });

  /* Build the "what's new" feed on the hub page if container exists */
  var feed = document.getElementById('changelog-feed');
  if (!feed) return;

  var allUpdates = [];
  var pages = document.querySelectorAll('[data-page-title]');
  pages.forEach(function (el) {
    var title = el.getAttribute('data-page-title');
    var entries = el.querySelectorAll('[data-changelog]');
    entries.forEach(function (entry) {
      allUpdates.push({
        date: entry.getAttribute('data-date'),
        text: entry.textContent,
        page: title
      });
    });
  });

  allUpdates.sort(function (a, b) { return b.date.localeCompare(a.date); });

  allUpdates.slice(0, 10).forEach(function (item) {
    var div = document.createElement('div');
    div.className = 'changelog-item';
    div.innerHTML = '<span class="changelog-date">' + item.date + '</span><span class="changelog-text"><strong>' + item.page + ':</strong> ' + item.text + '</span>';
    feed.appendChild(div);
  });
})();
