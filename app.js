// AI Service order site
// ★★★ Zaw fills these in — order payment numbers + messenger link ★★★
var CONFIG = {
  wavepay: '',    // e.g. '09712345678'
  kbzpay: '',     // e.g. '09712345678'
  messenger: ''   // e.g. 'https://m.me/yourusername'
};

var SERVICES = {
  portrait: { name: 'AI ဓာတ်ပုံ', price: '10,000 Ks/ပုံ' },
  logo:     { name: 'AI Logo', price: '30,000 Ks' },
  poster:   { name: 'AI Poster', price: '20,000 Ks' },
  voice:    { name: 'AI အသံဖတ်', price: '8,000 Ks/မိနစ်' },
  writing:  { name: 'AI စာရေး', price: '5,000 Ks/ပုဒ်' }
};

// ---------- render payment numbers ----------
(function () {
  var box = document.getElementById('pay-box');
  function num(v) { return v ? '<b>' + v + '</b>' : '<b>မကြာမီ ဖြည့်မည်</b>'; }
  box.innerHTML =
    'WavePay: ' + num(CONFIG.wavepay) + '<br>' +
    'KBZPay: ' + num(CONFIG.kbzpay) + '<br>' +
    '<span style="font-size:12px;color:#666">ငွေလွှဲပြီးရင် ရတဲ့ Transaction ID ကို အောက်မှာ ထည့်ပါ</span>';
})();

// ---------- service card order buttons ----------
document.querySelectorAll('.btn-order').forEach(function (b) {
  b.onclick = function () {
    document.getElementById('od-service').value = b.dataset.service;
    document.getElementById('order-title').scrollIntoView({ behavior: 'smooth' });
  };
});

// ---------- submit order ----------
document.getElementById('od-submit').onclick = function () {
  var service = document.getElementById('od-service').value;
  var name = document.getElementById('od-name').value.trim();
  var phone = document.getElementById('od-phone').value.trim();
  var details = document.getElementById('od-details').value.trim();
  var txn = document.getElementById('od-txn').value.trim();
  var payMethod = document.querySelector('input[name="pay"]:checked').value;
  var photo = document.getElementById('od-photo').files[0];

  if (!name) { alert('နာမည်ထည့်ပါ'); return; }
  if (!phone) { alert('ဖုန်းနံပါတ်ထည့်ပါ'); return; }
  if (!txn) { alert('Transaction ID ထည့်ပါ (ငွေလွှဲပြီးမှ ရမယ်)'); return; }

  var s = SERVICES[service];
  var lines = [
    '🧾 AI Service Order',
    '------------------------',
    'Service: ' + s.name + ' (' + s.price + ')',
    'နာမည်: ' + name,
    'ဖုန်း: ' + phone,
    'အသေးစိတ်: ' + (details || '—'),
    'ငွေပေးချေမှု: ' + payMethod,
    'Txn ID: ' + txn,
    'ဓာတ်ပုံမူရင်း: ' + (photo ? 'ရှိတယ် (Messenger မှာ တွဲပို့မယ်)' : 'မရှိဘူး')
  ];
  var text = lines.join('\n');
  document.getElementById('order-text').textContent = text;
  document.getElementById('order-done').classList.remove('hidden');
  document.getElementById('order-done').scrollIntoView({ behavior: 'smooth' });

  copyText(text);
};

function copyText(t) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(t).catch(function () {});
  } else {
    var ta = document.createElement('textarea');
    ta.value = t;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    ta.remove();
  }
}

document.getElementById('od-copy').onclick = function () {
  var t = document.getElementById('order-text').textContent;
  copyText(t);
  alert('Copy ကူးပြီးပြီ');
};

document.getElementById('od-messenger').onclick = function () {
  if (CONFIG.messenger) {
    window.open(CONFIG.messenger, '_blank');
  } else {
    alert('Messenger လင့် မကြာမီ ဖြည့်မည် — order စာသား copy ကူးထားပြီး Messenger မှာ paste ပို့လိုက်ပါ');
  }
};
