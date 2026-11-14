// ============================================================
//  НАСТРОЙКА: личный Telegram автора.
//  Впишите свой ник между кавычками, БЕЗ знака @.
//  Пример:  var AUTHOR_TELEGRAM = "ivan_petrov";
//  Пока тут пусто, кнопка «Написать автору» на сайте скрыта.
// ============================================================
var AUTHOR_TELEGRAM = "Stesha337";

(function () {
  // --- кнопка «Написать автору» ---
  var write = document.getElementById('write');
  var nick = AUTHOR_TELEGRAM.replace(/^@/, '').trim();
  if (write && nick) {
    write.href = 'https://t.me/' + encodeURIComponent(nick);
    write.hidden = false;
  }

  // --- светлая / тёмная тема ---
  var root = document.documentElement;
  var btn = document.getElementById('theme');
  function current() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  if (btn) {
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // --- кнопки «Скопировать» ---
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () { return copyOld(text); });
    }
    return copyOld(text);
  }
  function copyOld(text) {
    return new Promise(function (ok, fail) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy') ? ok() : fail(); } catch (e) { fail(e); }
      document.body.removeChild(ta);
    });
  }
  document.querySelectorAll('.copy').forEach(function (b) {
    var label = b.textContent;
    b.addEventListener('click', function () {
      copyText(b.getAttribute('data-copy')).then(function () {
        b.textContent = 'Скопировано';
        b.classList.add('done');
      }, function () {
        b.textContent = 'Не вышло';
      }).then(function () {
        setTimeout(function () { b.textContent = label; b.classList.remove('done'); }, 1600);
      });
    });
  });
})();
