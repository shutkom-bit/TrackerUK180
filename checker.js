(function(){
  var box = document.getElementById('ckTrips'); if (!box) return;
  var DAY = 86400000, MAX = 5;
  function parse(v){ if(!v) return null; var p=v.split('-'); return Date.UTC(+p[0],+p[1]-1,+p[2])/DAY; }
  function today(){ var t=new Date(); return Date.UTC(t.getFullYear(),t.getMonth(),t.getDate())/DAY; }
  function minus12m(n){ var d=new Date(n*DAY); var y=d.getUTCFullYear(), m=d.getUTCMonth()-12, day=d.getUTCDate();
    var last=new Date(Date.UTC(y,m+1,0)).getUTCDate(); return Date.UTC(y,m,Math.min(day,last))/DAY; }
  function fmt(n){ var d=new Date(n*DAY); return String(d.getUTCDate()).padStart(2,'0')+'/'+String(d.getUTCMonth()+1).padStart(2,'0')+'/'+d.getUTCFullYear(); }

  function row(){
    if (box.children.length >= MAX) return;
    var i = box.children.length + 1;
    var r = document.createElement('div'); r.className = 'ckrow';
    r.innerHTML =
      '<label>Left the UK<input type="date" class="ckdep"></label>' +
      '<label>Came back<input type="date" class="ckret"></label>' +
      '<span class="ckdays" aria-label="Whole days abroad">0 days</span>' +
      '<button type="button" class="ckdel" aria-label="Remove trip">×</button>';
    box.appendChild(r);
    r.querySelectorAll('input').forEach(function(inp){ inp.addEventListener('input', calc); inp.addEventListener('change', calc); });
    r.querySelector('.ckdel').addEventListener('click', function(){ r.remove(); if(!box.children.length) row(); calc(); });
    document.getElementById('ckAdd').disabled = box.children.length >= MAX;
  }

  function calc(){
    var T = today(), ws = minus12m(T) + 1, days = {}, bad = false;
    box.querySelectorAll('.ckrow').forEach(function(r){
      var a = parse(r.querySelector('.ckdep').value), b = parse(r.querySelector('.ckret').value), n = 0;
      if (a !== null) {
        var end = (b === null) ? T : b;
        if (end < a) { bad = true; }
        else { for (var x = a + 1; x < end; x++) { n++; if (x >= ws && x <= T) days[x] = 1; } }
      }
      r.querySelector('.ckdays').textContent = n + (n === 1 ? ' day' : ' days');
    });
    var total = Object.keys(days).length;
    document.getElementById('ckTotal').textContent = total;
    var msg = document.getElementById('ckMsg'), res = msg.parentNode;
    res.className = 'ckresult' + (total > 180 ? ' bad' : total >= 150 ? ' warn' : total > 0 ? ' ok' : '');
    if (bad) msg.textContent = 'One of the return dates is before the departure date.';
    else if (!total) msg.textContent = 'Add the dates you left and came back to the UK. Leave "Came back" empty if you are abroad now.';
    else if (total > 180) msg.textContent = 'Over 180 days in the 12 months from ' + fmt(ws) + ' to ' + fmt(T) + '. Check the official guidance and get advice before you apply.';
    else if (total >= 150) msg.textContent = 'Close to the limit: ' + (180 - total) + ' days left in this window. The Home Office asks for details of absences from 150 days.';
    else msg.textContent = 'Within the limit for ' + fmt(ws) + ' to ' + fmt(T) + ', with ' + (180 - total) + ' days to spare in this window.';
  }

  document.getElementById('ckAdd').addEventListener('click', function(){ row(); });
  row(); row(); calc();
})();
