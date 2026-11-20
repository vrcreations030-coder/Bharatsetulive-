// Legal Pages Content
const LEGAL_PAGES = {
  about: {
    title: 'ℹ️ हमारे बारे में (About Us)',
    body: `<p><b>BharatSetu Live</b> एक स्वतंत्र (Independent) नागरिक सूचना पोर्टल है जिसका उद्देश्य भारत के नागरिकों को केंद्र व राज्य सरकार की योजनाओं, ग्राम पंचायत अपडेट्स, सरकारी नौकरियों, लोन और नागरिक सेवाओं की सटीक व सरल जानकारी एक ही स्थान पर उपलब्ध कराना है।</p>
           <p class="mt-2">हम किसी भी सरकारी विभाग या मंत्रालय से संबद्ध नहीं हैं। सभी आवेदन लिंक सीधे संबंधित आधिकारिक सरकारी पोर्टल (<code>.gov.in</code> / <code>.nic.in</code>) पर जाते हैं।</p>`
  },
  contact: {
    title: '📞 संपर्क करें (Contact Us)',
    body: `<p>किसी भी सुझाव, जानकारी में सुधार या तकनीकी सहायता के लिए हमसे संपर्क करें:</p>
           <div class="mt-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 space-y-1 text-sm">
             <p><b>संचालक पता:</b> VPO Basari, Distt. Chhatarpur, Madhya Pradesh – 471105, India</p>
             <p><b>पोर्टल:</b> BharatSetu Live (Independent Civic Information Portal)</p>
           </div>`
  },
  privacy: {
    title: '🔒 गोपनीयता नीति (Privacy Policy)',
    body: `<p>BharatSetu Live अपने उपयोगकर्ताओं की गोपनीयता का पूरा सम्मान करता है। हम कभी भी आपका OTP, पासवर्ड, बैंक पिन या संवेदनशील पहचान संख्या (जैसे आधार/पैन नंबर) अपनी वेबसाइट पर एकत्र नहीं करते हैं।</p>
           <p class="mt-2">यह वेबसाइट बेहतर अनुभव और विज्ञापनों (Google AdSense व थर्ड-पार्टी एड नेटवर्क) के लिए सामान्य कुकीज़ का उपयोग कर सकती है।</p>`
  },
  disclaimer: {
    title: '⚠️ अस्वीकरण (Disclaimer)',
    body: `<p><b>BharatSetu Live कोई आधिकारिक सरकारी वेबसाइट नहीं है।</b> यहाँ दी गई सभी जानकारी आधिकारिक सरकारी पोर्टलों, समाचार स्रोतों और सार्वजनिक अधिसूचनाओं के आधार पर तैयार की जाती है।</p>
           <p class="mt-2">किसी भी योजना या भर्ती में आवेदन करने से पहले कृपया संबंधित विभाग की आधिकारिक वेबसाइट पर जाकर अंतिम तिथि व शर्तों की पुष्टि अवश्य करें।</p>`
  },
  terms: {
    title: '📜 नियम व शर्तें (Terms & Conditions)',
    body: `<p>इस पोर्टल का उपयोग करके आप सहमत होते हैं कि यहाँ उपलब्ध जानकारी केवल सामान्य सूचना एवं मार्गदर्शन के लिए है। किसी भी तृतीय-पक्ष (Third-Party) या आधिकारिक वेबसाइट पर किए गए लेन-देन के लिए BharatSetu Live उत्तरदायी नहीं होगा।</p>`
  }
};

function renderLegalPage(key) {
  const page = LEGAL_PAGES[key];
  if (!page) return;
  document.getElementById('content-feed').innerHTML = `
    <div class="card-surface rounded-3xl p-5 sm:p-7 space-y-4">
      <button onclick="navigate('home')" class="text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline">← होम पर वापस जाएं</button>
      <h1 class="text-xl sm:text-2xl font-extrabold">${page.title}</h1>
      <div class="text-sm leading-relaxed space-y-2 opacity-90">${page.body}</div>
      <p class="text-[11px] opacity-60 pt-3 border-t border-emerald-200 dark:border-emerald-800">Last Updated: 2026 • BharatSetu Live</p>
    </div>`;
}

// Admin Auth Helpers
function getAdminCreds() {
  return JSON.parse(localStorage.getItem('bs_admin_creds') || '{"user":"admin","pass":"bharatsetu2026"}');
}
function isAdminLoggedIn() {
  return sessionStorage.getItem('bs_admin_auth') === '1';
}

function renderAdminPortal() {
  const container = document.getElementById('content-feed');
  if (!isAdminLoggedIn()) {
    container.innerHTML = `
      <div class="max-w-md mx-auto card-surface rounded-3xl p-6 space-y-4 shadow-md">
        <h2 class="text-xl font-extrabold text-center">🔒 Admin Command Center</h2>
        <p class="text-xs text-center opacity-75">BharatSetu Live प्रबंधन पैनल में लॉगिन करें</p>
        <input id="adm-user" type="text" placeholder="User ID" class="w-full rounded-xl border border-emerald-300 dark:border-emerald-700 bg-transparent px-3 py-2.5 text-sm" />
        <input id="adm-pass" type="password" placeholder="Password" class="w-full rounded-xl border border-emerald-300 dark:border-emerald-700 bg-transparent px-3 py-2.5 text-sm" />
        <button onclick="adminLogin()" class="w-full rounded-xl bg-[#0B3D2E] hover:bg-emerald-800 text-white font-bold py-2.5 text-sm">लॉगिन करें</button>
        <p id="adm-err" class="text-xs text-red-500 text-center font-semibold"></p>
      </div>`;
    return;
  }

  const posts = PORTAL_DATA.posts || [];
  const liveCount = posts.filter(p => getEffectiveStatus(p) !== 'Archive').length;
  const archCount = posts.length - liveCount;
  const panchCount = posts.filter(p => p.isPanchayat).length;
  const adConfig = JSON.parse(localStorage.getItem('bs_ad_config') || '{"enabled":false,"code":""}');

  container.innerHTML = `
    <div class="space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h2 class="text-xl font-extrabold">⚙️ Admin Command Center</h2>
        <div class="flex gap-2">
          <button onclick="exportPortalJson()" class="px-3 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold">⬇️ Download portal-data.json</button>
          <button onclick="adminLogout()" class="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold">लॉगआउट</button>
        </div>
      </div>

      <!-- Real DB KPI Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-white">
        <div class="rounded-2xl p-4 bg-gradient-to-br from-emerald-600 to-emerald-800"><div class="text-2xl font-extrabold">${posts.length}</div><div class="text-xs opacity-90">कुल पोस्ट</div></div>
        <div class="rounded-2xl p-4 bg-gradient-to-br from-orange-500 to-orange-700"><div class="text-2xl font-extrabold">${liveCount}</div><div class="text-xs opacity-90">Live अपडेट्स</div></div>
        <div class="rounded-2xl p-4 bg-gradient-to-br from-green-600 to-green-800"><div class="text-2xl font-extrabold">${panchCount}</div><div class="text-xs opacity-90">ग्राम पंचायत</div></div>
        <div class="rounded-2xl p-4 bg-gradient-to-br from-slate-600 to-slate-800"><div class="text-2xl font-extrabold">${archCount}</div><div class="text-xs opacity-90">Archive</div></div>
      </div>

      <!-- Quick Add Post Form -->
      <div class="card-surface rounded-2xl p-4 sm:p-5 space-y-3">
        <h3 class="font-extrabold text-base">➕ नई पोस्ट जोड़ें (Add New Post)</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <input id="np-title" placeholder="पोस्ट का शीर्षक (Title)" class="rounded-xl border border-emerald-300 dark:border-emerald-700 bg-transparent px-3 py-2" />
          <select id="np-cat" class="rounded-xl border border-emerald-300 dark:border-emerald-700 bg-transparent px-3 py-2">
            <option value="schemes">Schemes (योजना)</option>
            <option value="panchayat">Gram Panchayat (ग्राम पंचायत)</option>
            <option value="jobs">Jobs / PSU (नौकरी)</option>
            <option value="loans">Loans (लोन)</option>
          </select>
          <input id="np-state" placeholder="राज्य (जैसे: Central या Madhya Pradesh)" value="Central" class="rounded-xl border border-emerald-300 dark:border-emerald-700 bg-transparent px-3 py-2" />
          <input id="np-dept" placeholder="विभाग (Department)" value="Panchayati Raj & Rural Development" class="rounded-xl border border-emerald-300 dark:border-emerald-700 bg-transparent px-3 py-2" />
          <input id="np-lastdate" type="date" class="rounded-xl border border-emerald-300 dark:border-emerald-700 bg-transparent px-3 py-2" />
          <input id="np-url" placeholder="Direct Official URL (https://...)" class="rounded-xl border border-emerald-300 dark:border-emerald-700 bg-transparent px-3 py-2" />
        </div>
        <textarea id="np-summary" rows="2" placeholder="संक्षिप्त विवरण (Summary)" class="w-full rounded-xl border border-emerald-300 dark:border-emerald-700 bg-transparent px-3 py-2 text-xs"></textarea>
        <button onclick="adminAddPost()" class="px-5 py-2 rounded-xl bg-[#F28C28] hover:bg-orange-600 text-white font-bold text-xs">पोस्ट जोड़ें</button>
      </div>

      <!-- Multi-Network Ad Manager -->
      <div class="card-surface rounded-2xl p-4 sm:p-5 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="font-extrabold text-base">📢 Multi-Network Ad Manager</h3>
          <label class="text-xs font-bold flex items-center gap-1.5">
            <input id="ad-toggle" type="checkbox" ${adConfig.enabled ? 'checked' : ''} /> Ads Active
          </label>
        </div>
        <textarea id="ad-code" rows="2" placeholder="AdSense / Adsterra / Custom Banner HTML कोड यहाँ पेस्ट करें" class="w-full rounded-xl border border-emerald-300 dark:border-emerald-700 bg-transparent px-3 py-2 text-xs font-mono">${adConfig.code || ''}</textarea>
        <button onclick="saveAdConfig()" class="px-4 py-1.5 rounded-xl bg-emerald-700 text-white font-bold text-xs">Ad सेटिंग सेव करें</button>
      </div>

      <!-- Manage Existing Posts -->
      <div class="card-surface rounded-2xl p-4 sm:p-5 space-y-3">
        <h3 class="font-extrabold text-base">📋 मौजूदा पोस्ट प्रबंधन (${posts.length})</h3>
        <div class="space-y-2 max-h-80 overflow-y-auto text-xs">
          ${posts.map((p, i) => `
            <div class="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-between gap-2">
              <div class="truncate"><b>${p.title}</b> <span class="opacity-70">(${p.state} •${getEffectiveStatus(p)})</span></div>
              <button onclick="adminDeletePost(${i})" class="px-2.5 py-1 rounded-lg bg-red-100 text-red-700 font-bold shrink-0">हटाएं</button>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

function adminLogin() {
  const u = document.getElementById('adm-user').value.trim();
  const p = document.getElementById('adm-pass').value.trim();
  const creds = getAdminCreds();
  if (u === creds.user && p === creds.pass) {
    sessionStorage.setItem('bs_admin_auth', '1');
    renderAdminPortal();
  } else {
    document.getElementById('adm-err').textContent = 'गलत User ID या Password!';
  }
}

function adminLogout() {
  sessionStorage.removeItem('bs_admin_auth');
  navigate('home');
}

function adminAddPost() {
  const title = document.getElementById('np-title').value.trim();
  const url = document.getElementById('np-url').value.trim();
  if (!title || !url.startsWith('https://')) {
    alert('कृपया सही शीर्षक और https:// आधिकारिक लिंक भरें।');
    return;
  }
  const cat = document.getElementById('np-cat').value;
  PORTAL_DATA.posts.unshift({
    id: 'post-' + Date.now(),
    category: cat,
    isPanchayat: cat === 'panchayat',
    state: document.getElementById('np-state').value.trim() || 'Central',
    district: 'All India',
    department: document.getElementById('np-dept').value.trim() || 'General',
    status: 'Live',
    title,
    summary: document.getElementById('np-summary').value.trim() || title,
    updatedAt: new Date().toISOString().slice(0, 10),
    launchDate: new Date().toISOString().slice(0, 10),
    lastDate: document.getElementById('np-lastdate').value || '2026-12-31',
    benefits: 'आधिकारिक अधिसूचना के अनुसार।',
    eligibility: ['संबंधित विभाग की आधिकारिक शर्तें लागू।'],
    documents: ['पहचान प्रमाण', 'आवश्यक योग्यता प्रमाण पत्र'],
    steps: ['नीचे दिए गए सीधे आधिकारिक पोर्टल लिंक पर जाकर आवेदन करें।'],
    actionHint: 'आधिकारिक पोर्टल पर नया रजिस्ट्रेशन विकल्प चुनें।',
    directApplyUrl: url,
    keywords: title.toLowerCase().split(' ')
  });
  PORTAL_DATA.lastUpdated = new Date().toISOString();
  renderAdminPortal();
  alert('पोस्ट जुड़ गई! इसे लाइव सेव करने के लिए "Download portal-data.json" करके GitHub पर अपलोड करें।');
}

function adminDeletePost(index) {
  if (confirm('क्या आप इस पोस्ट को हटाना चाहते हैं?')) {
    PORTAL_DATA.posts.splice(index, 1);
    renderAdminPortal();
  }
}

function exportPortalJson() {
  const blob = new Blob([JSON.stringify(PORTAL_DATA, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'portal-data.json';
  a.click();
}

function saveAdConfig() {
  const enabled = document.getElementById('ad-toggle').checked;
  const code = document.getElementById('ad-code').value;
  localStorage.setItem('bs_ad_config', JSON.stringify({ enabled, code }));
  alert('Ad सेटिंग सेव हो गई!');
}

// Hook Admin & Legal Pages into navigate() + Ctrl+Shift+A + #admin
const _prevNavigate = window.navigate;
window.navigate = function(page) {
  if (page === 'admin') {
    renderAdminPortal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (LEGAL_PAGES[page]) {
    renderLegalPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (typeof _prevNavigate === 'function') {
    _prevNavigate(page);
  }
};

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') navigate('admin');
});
window.addEventListener('load', () => {
  if (location.hash === '#admin') setTimeout(() => navigate('admin'), 300);
});
