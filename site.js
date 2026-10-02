/* ============================================================
   EDIT ONLY THIS BLOCK
   ============================================================ */
window.SITE = {
  buyUrl: '',                       // paste your Lemon Squeezy / Gumroad checkout link here
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

  // Hero year strip: 365 days, example trips shaded
  var strip = document.getElementById('year');
  if (strip) {
    var trips = [[18,31],[64,103],[150,157],[206,260],[300,307],[332,346]];
    var abroad = 0, html = '';
    for (var d = 0; d < 364; d++) {
      var on = trips.some(function(t){ return d > t[0] && d < t[1]; });
      if (on) abroad++;
      html += '<i' + (on ? ' class="on"' : '') + '></i>';
    }
    strip.innerHTML = html;
    var n = document.getElementById('yearCount'); if (n) n.textContent = abroad;
  }
})();
