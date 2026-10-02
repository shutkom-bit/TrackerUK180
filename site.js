/* ============================================================
   EDIT ONLY THIS BLOCK
   ============================================================ */
window.SITE = {
  buyUrl: 'https://buy.stripe.com/cNidR16fw66Rdxec3N1oI00',                       // paste your Lemon Squeezy / Gumroad checkout link here
  price:  '£9',                     // shown on the buy buttons
  seller: 'Mihaly Sutko',            // legal name of the seller (you)
  email:  'tracker.uk180@gmail.com',       // contact email for customers
  location: 'Scotland, United Kingdom'
};
/* ============================================================ */

(function(){
  var S = window.SITE;
  document.querySelectorAll('[data-buy]').forEach(function(a){
    a.textContent = 'Buy Tracker UK180 for ' + S.price;
    if (S.buyUrl) { a.href = S.buyUrl; } else { a.href = '#'; a.addEventListener('click', function(e){ e.preventDefault(); alert('Checkout link coming soon.'); }); }
  });
  document.querySelectorAll('[data-price]').forEach(function(el){ el.textContent = S.price; });
  document.querySelectorAll('[data-seller]').forEach(function(el){ el.textContent = S.seller; });
  document.querySelectorAll('[data-location]').forEach(function(el){ el.textContent = S.location; });
  document.querySelectorAll('[data-email]').forEach(function(el){
    el.textContent = S.email;
    if (el.tagName === 'A') el.href = 'mailto:' + S.email;
  });
  document.querySelectorAll('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear(); });

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero year strip: 364 days, example trips fill in one by one
  var strip = document.getElementById('year');
  if (strip) {
    var trips = [[18,31],[64,103],[150,157],[206,260],[300,307],[332,346]];
    var cells = [], html = '';
    for (var d = 0; d < 364; d++) html += '<i></i>';
    strip.innerHTML = html;
    var items = strip.children, on = [];
    for (var k = 0; k < 364; k++) if (trips.some(function(t){ return k > t[0] && k < t[1]; })) on.push(k);
    var counter = document.getElementById('yearCount');
    var play = function(){
      if (reduce) { on.forEach(function(k){ items[k].classList.add('on'); }); counter.textContent = on.length; return; }
      var i = 0;
      (function step(){
        for (var n = 0; n < 3 && i < on.length; n++, i++) {
          var el = items[on[i]]; el.classList.add('on','pop');
          (function(e){ setTimeout(function(){ e.classList.remove('pop'); }, 250); })(el);
        }
        counter.textContent = i;
        if (i < on.length) setTimeout(step, 22);
      })();
    };
    if ('IntersectionObserver' in window) {
      var seen = false;
      new IntersectionObserver(function(es, ob){ if (es[0].isIntersecting && !seen) { seen = true; play(); ob.disconnect(); } }, {threshold: .3}).observe(strip);
    } else play();
  }

  // Reveal sections on scroll
  var rv = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) rv.forEach(function(el){ el.classList.add('in'); });
  else {
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, {threshold: .12});
    rv.forEach(function(el){ io.observe(el); });
  }
})();
