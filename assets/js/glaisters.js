/* Glaisters Farm — transparent masthead over hero images */
(function () {
  var masthead = document.querySelector('.masthead');
  var hero = document.querySelector('.page__hero--overlay');
  if (!masthead || !hero) return;

  function updateMasthead() {
    var heroBottom = hero.getBoundingClientRect().bottom;
    var threshold = masthead.offsetHeight;
    if (heroBottom > threshold) {
      masthead.classList.add('masthead--transparent');
    } else {
      masthead.classList.remove('masthead--transparent');
    }
  }

  updateMasthead();
  window.addEventListener('scroll', updateMasthead, { passive: true });
})();
