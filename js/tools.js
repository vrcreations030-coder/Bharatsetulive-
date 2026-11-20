// 1. One-Stop Official Sarkari Seva Kendra (Direct Official Links Only)
const SEVA_SERVICES = [
  { name: 'Aadhaar (myAadhaar)', desc: 'डाउनलोड, PVC कार्ड ऑर्डर, पता अपडेट, बैंक सीडिंग स्टेटस', url: 'https://myaadhaar.uidai.gov.in/', icon: '🪪', grad: 'from-orange-500 to-red-600' },
  { name: 'PAN Card (Income Tax)', desc: 'Instant e-PAN, नया पैन आवेदन, पैन-आधार लिंक स्टेटस', url: 'https://www.incometax.gov.in/iec/foportal/', icon: '💳', grad: 'from-blue-600 to-indigo-700' },
  { name: 'DigiLocker & UMANG', desc: 'मार्कशीट, ड्राइविंग लाइसेंस, RC व सरकारी प्रमाण पत्र', url: 'https://www.digilocker.gov.in/', icon: '📂', grad: 'from-purple-600 to-violet-700' },
  { name: 'Ayushman Bharat (PM-JAY)', desc: 'पात्रता जांचें, आयुष्मान कार्ड डाउनलोड व अस्पताल सूची', url: 'https://beneficiary.nha.gov.in/', icon: '🏥', grad: 'from-teal-500 to-emerald-700' },
  { name: 'Ration Card (NFSA)', desc: 'राशन कार्ड स्टेटस, सदस्य जोड़ें/हटाएं, वन नेशन वन राशन', url: 'https://nfsa.gov.in/', icon: '🌾', grad: 'from-green-600 to-emerald-800' },
  { name: 'Parivahan (DL & RC)', desc: 'ड्राइविंग लाइसेंस, वाहन RC स्टेटस और ई-चालान', url: 'https://parivahan.gov.in/', icon: '🚗', grad: 'from-sky-500 to-blue-700' },
  { name: 'EPFO / PF Passbook', desc: 'UAN एक्टिवेशन, PF पासबुक और क्लेम स्टेटस', url: 'https://www.epfindia.gov.in/', icon: '🏦', grad: 'from-amber-500 to-orange-700' },
  { name: 'Voter ID (ECINet)', desc: 'नया वोटर रजिस्ट्रेशन, e-EPIC डाउनलोड और सुधार', url: 'https://voters.eci.gov.in/', icon: '🗳️', grad: 'from-pink-500 to-rose-700' },
  { name: 'Bhulekh (खसरा-खतौनी)', desc: 'MP भूलेख एवं भूमि रिकॉर्ड की ऑनलाइन जांच', url: 'https://mpbhulekh.gov.in/', icon: '🗺️', grad: 'from-emerald-600 to-teal-800' }
];

function renderSevaKendra() {
  const container = document.getElementById('content-feed');
  container.innerHTML = `
    <div class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 class="text-xl font-extrabold">🪪 वन-स्टॉप सरकारी सेवा केंद्र</h2>
          <p class="text-xs opacity-75">सभी प्रमुख सरकारी सेवाओं के सीधे आधिकारिक पोर्टल लिंक</p>
        </div>
        <span class="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 w-fit">🔒 100% सुरक्षित • कोई ID नंबर यहाँ न भरें</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${SEVA_SERVICES.map(s => `
          <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="tile-card rounded-2xl p-4 text-white bg-gradient-to-br ${s.grad} shadow-md flex flex-col justify-between gap-3">
            <div class="flex items-start gap-3">
              <div class="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shrink-0">${s.icon}</div>
              <div>
                <h3 class="font-extrabold text-base">${s.name}</h3>
                <p class="text-xs text-white/90 mt-0.5">${s.desc}</p>
              </div>
            </div>
            <div class="text-xs font-bold text-right text-white/95">आधिकारिक पोर्टल खोलें ↗</div>
          </a>
        `).join('')}
      </div>
    </div>`;
}

// 2. Working Citizen Tools Hub
function renderCitizenTools() {
  const container = document.getElementById('content-feed');
  container.innerHTML = `
    <div class="space-y-5">
      <h2 class="text-xl font-extrabold">🧮 नागरिक टूल्स व कैलकुलेटर</h2>

      <!-- 20-Sec Eligibility Finder -->
      <div class="card-surface rounded-2xl p-4 sm:p-5 space-y-3">
        <h3 class="font-extrabold text-base">⚡ 20-सेकंड पात्रता जांच (Eligibility Finder)</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <select id="el-state" class="rounded-xl border border-emerald-300 dark:border-emerald-700 bg-transparent px-3 py-2">
            <option value="All">सभी राज्य (All India)</option>
            <option value="Central">केंद्र सरकार (Central)</option>
            <option value="Madhya Pradesh">मध्य प्रदेश (MP)</option>
          </select>
          <select id="el-role" class="rounded-xl border border-emerald-300 dark:border-emerald-700 bg-transparent px-3 py-2">
            <option value="all">पेशा चुनें (सभी)</option>
            <option value="schemes">किसान / ग्रामीण परिवार</option>
            <option value="panchayat">ग्राम पंचायत / आवास</option>
            <option value="jobs">छात्र / नौकरी की तलाश</option>
            <option value="loans">व्यापारी / लोन इच्छुक</option>
          </select>
          <button onclick="runEligibility()" class="rounded-xl bg-[#0B3D2E] hover:bg-emerald-800 text-white font-bold px-4 py-2">पात्र योजनाएं खोजें</button>
        </div>
        <div id="el-result" class="text-xs space-y-2"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Live PIN Code Lookup -->
        <div class="card-surface rounded-2xl p-4 space-y-3">
          <h3 class="font-extrabold text-base">📮 PIN Code खोजें</h3>
          <div class="flex gap-2">
            <input id="pin-input" type="text" maxlength="6" placeholder="जैसे: 471105" class="flex-1 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-transparent px-3 py-2 text-sm" />
            <button onclick="lookupPin()" class="rounded-xl bg-emerald-700 text-white font-bold px-4 py-2 text-sm">खोजें</button>
          </div>
          <div id="pin-result" class="text-xs opacity-90"></div>
        </div>

        <!-- Live Bank IFSC Lookup -->
        <div class="card-surface rounded-2xl p-4 space-y-3">
          <h3 class="font-extrabold text-base">🏦 बैंक IFSC कोड जांचें</h3>
          <div class="flex gap-2">
            <input id="ifsc-input" type="text" maxlength="11" placeholder="जैसे: SBIN0000300" class="flex-1 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-transparent px-3 py-2 text-sm uppercase" />
            <button onclick="lookupIfsc()" class="rounded-xl bg-emerald-700 text-white font-bold px-4 py-2 text-sm">जांचें</button>
          </div>
          <div id="ifsc-result" class="text-xs opacity-90"></div>
        </div>

        <!-- Age Calculator -->
        <div class="card-surface rounded-2xl p-4 space-y-3">
          <h3 class="font-extrabold text-base">🎂 आयु कैलकुलेटर (Age Calculator)</h3>
          <div class="flex gap-2">
            <input id="dob-input" type="date" class="flex-1 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-transparent px-3 py-2 text-sm" />
            <button onclick="calcAge()" class="rounded-xl bg-orange-600 text-white font-bold px-4 py-2 text-sm">गणना</button>
          </div>
          <div id="age-result" class="text-xs font-bold text-emerald-700 dark:text-emerald-300"></div>
        </div>

        <!-- Loan EMI Calculator -->
        <div class="card-surface rounded-2xl p-4 space-y-3">
          <h3 class="font-extrabold text-base">💰 लोन EMI कैलकुलेटर</h3>
          <div class="grid grid-cols-3 gap-2 text-xs">
            <input id="emi-p" type="number" placeholder="राशि (₹)" value="100000" class="rounded-xl border border-emerald-300 dark:border-emerald-700 bg-transparent px-2.5 py-2" />
            <input id="emi-r" type="number" placeholder="ब्याज %" value="9" class="rounded-xl border border-emerald-300 dark:border-emerald-700 bg-transparent px-2.5 py-2" />
            <input id="emi-m" type="number" placeholder="महीने" value="24" class="rounded-xl border border-emerald-300 dark:border-emerald-700 bg-transparent px-2.5 py-2" />
          </div>
          <button onclick="calcEmi()" class="w-full rounded-xl bg-teal-700 text-white font-bold py-2 text-sm">EMI निकालें</button>
          <div id="emi-result" class="text-xs font-bold text-emerald-700 dark:text-emerald-300"></div>
        </div>
      </div>
    </div>`;
}

// Tool Functions
function runEligibility() {
  const st = document.getElementById('el-state').value;
  const role = document.getElementById('el-role').value;
  const res = document.getElementById('el-result');
  const matches = (PORTAL_DATA.posts || []).filter(p => {
    const stOk = st === 'All' || p.state === st || p.state === 'Central';
    const roleOk = role === 'all' || p.category === role || (role === 'panchayat' && p.isPanchayat);
    return stOk && roleOk && getEffectiveStatus(p) !== 'Archive';
  });
  if (!matches.length) {
    res.innerHTML = '<p class="text-orange-600 font-semibold">कोई सीधी योजना नहीं मिली, कृपया अन्य विकल्प चुनें।</p>';
    return;
  }
  res.innerHTML = matches.map(m => `
    <div onclick="openPostDetail('${m.id}')" class="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 cursor-pointer flex justify-between items-center font-bold">
      <span>✅ ${m.title}</span><span class="text-emerald-700 dark:text-emerald-300">देखें →</span>
    </div>`).join('');
}

async function lookupPin() {
  const pin = document.getElementById('pin-input').value.trim();
  const out = document.getElementById('pin-result');
  if (!/^\d{6}$/.test(pin)) { out.innerHTML = '<span class="text-red-500">सही 6 अंकों का PIN कोड डालें।</span>'; return; }
  out.textContent = 'खोज रहा है...';
  try {
    const r = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    const d = await r.json();
    if (d[0].Status === 'Success') {
      const po = d[0].PostOffice[0];
      out.innerHTML = `<b>पोस्ट ऑफिस:</b> ${po.Name} | <b>जिला:</b> ${po.District} | <b>राज्य:</b> ${po.State}`;
    } else {
      out.innerHTML = '<span class="text-red-500">यह PIN कोड नहीं मिला।</span>';
    }
  } catch { out.innerHTML = '<span class="text-red-500">नेटवर्क त्रुटि, पुनः प्रयास करें।</span>'; }
}

async function lookupIfsc() {
  const code = document.getElementById('ifsc-input').value.trim().toUpperCase();
  const out = document.getElementById('ifsc-result');
  if (code.length !== 11) { out.innerHTML = '<span class="text-red-500">सही 11 अंकों का IFSC कोड डालें।</span>'; return; }
  out.textContent = 'जांच रहा है...';
  try {
    const r = await fetch(`https://ifsc.razorpay.com/${code}`);
    if (!r.ok) throw new Error();
    const d = await r.json();
    out.innerHTML = `<b>बैंक:</b> ${d.BANK} | <b>शाखा:</b> ${d.BRANCH} | <b>शहर:</b> ${d.CITY}, ${d.STATE}`;
  } catch { out.innerHTML = '<span class="text-red-500">IFSC कोड अमान्य है या नहीं मिला।</span>'; }
}

function calcAge() {
  const val = document.getElementById('dob-input').value;
  const out = document.getElementById('age-result');
  if (!val) { out.textContent = 'कृपया जन्म तिथि चुनें।'; return; }
  const dob = new Date(val), now = new Date();
  let y = now.getFullYear() - dob.getFullYear();
  let m = now.getMonth() - dob.getMonth();
  let d = now.getDate() - dob.getDate();
  if (d < 0) { m--; d += 30; }
  if (m < 0) { y--; m += 12; }
  out.textContent = `आपकी आयु: ${y} वर्ष, ${m} माह, ${d} दिन`;
}

function calcEmi() {
  const P = parseFloat(document.getElementById('emi-p').value) || 0;
  const r = (parseFloat(document.getElementById('emi-r').value) || 0) / 12 / 100;
  const n = parseFloat(document.getElementById('emi-m').value) || 1;
  const emi = r > 0 ? (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : P / n;
  const total = emi * n;
  document.getElementById('emi-result').textContent = `मासिक EMI: ₹${Math.round(emi).toLocaleString('en-IN')} | कुल भुगतान: ₹${Math.round(total).toLocaleString('en-IN')}`;
}

// Hook into global navigate() without touching app.js
const _origNavigate = window.navigate;
window.navigate = function(page) {
  if (page === 'seva') {
    renderSevaKendra();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (page === 'tools') {
    renderCitizenTools();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (typeof _origNavigate === 'function') {
    _origNavigate(page);
  }
};
