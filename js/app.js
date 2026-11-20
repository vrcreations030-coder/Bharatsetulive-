let PORTAL_DATA = { lastUpdated: '', posts: [] };
let CURRENT_VIEW = 'home';

// Load JSON Data on Startup
async function initPortal() {
  try {
    const res = await fetch('data/portal-data.json');
    PORTAL_DATA = await res.json();
    updateLastTimestamp();
    renderFeed('home');
  } catch (err) {
    document.getElementById('content-feed').innerHTML = `
      <div class="card-surface p-6 rounded-2xl text-center">
        <p class="font-bold text-red-600">डेटा लोड करने में समस्या आई।</p>
        <p class="text-xs opacity-75 mt-1">कृपया सुनिश्चित करें कि <code>data/portal-data.json</code> सही जगह सेव है।</p>
      </div>`;
  }
}

function updateLastTimestamp() {
  const badge = document.getElementById('last-updated-badge');
  if (badge && PORTAL_DATA.lastUpdated) {
    const d = new Date(PORTAL_DATA.lastUpdated);
    badge.textContent = 'अपडेट: ' + d.toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}

// Check if Post is Expired -> Auto Archive
function getEffectiveStatus(post) {
  if (post.status === 'Archive') return 'Archive';
  if (post.lastDate && new Date(post.lastDate) < new Date()) return 'Archive';
  return post.status || 'Live';
}

// Render Feed by Category / View
function renderFeed(view, searchQuery = '') {
  CURRENT_VIEW = view;
  const container = document.getElementById('content-feed');
  let list = PORTAL_DATA.posts || [];

  if (view === 'archive') {
    list = list.filter(p => getEffectiveStatus(p) === 'Archive');
  } else {
    list = list.filter(p => getEffectiveStatus(p) !== 'Archive');
    if (view === 'panchayat') list = list.filter(p => p.isPanchayat || p.category === 'panchayat');
    else if (view === 'schemes') list = list.filter(p => p.category === 'schemes');
    else if (view === 'jobs') list = list.filter(p => p.category === 'jobs');
    else if (view === 'loans') list = list.filter(p => p.category === 'loans');
  }

  // Fuzzy / Partial Search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = (PORTAL_DATA.posts || []).filter(p =>
      (p.title + ' ' + p.summary + ' ' + p.state + ' ' + p.district + ' ' + p.department + ' ' + (p.keywords || []).join(' '))
        .toLowerCase().includes(q)
    );
  }

  const titles = {
    home: '🆕 ताज़ा अपडेट व नवीनतम जानकारी',
    schemes: '🏛️ केंद्र व राज्य सरकारी योजनाएं',
    panchayat: '🏡 ग्राम पंचायत व गाँव की योजनाएं',
    jobs: '💼 सरकारी नौकरी व PSU भर्ती',
    loans: '💰 सरकारी लोन व सब्सिडी',
    archive: '🗄️ पुराना रिकॉर्ड (Permanent Archive)',
    states: '🗺️ राज्य व जिला पोर्टल'
  };

  let stateBar = '';
  if (view === 'states') {
    const states = ['All', 'Central', 'Madhya Pradesh', 'Uttar Pradesh', 'Bihar', 'Rajasthan'];
    stateBar = `<div class="flex flex-wrap gap-2 mb-4">
      ${states.map(s => `<button onclick="filterByState('${s}')" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800">${s}</button>`).join('')}
    </div>`;
  }

  if (list.length === 0) {
    container.innerHTML = `
      <h2 class="text-lg font-extrabold mb-3">${titles[view] || 'अपडेट्स'}</h2>
      ${stateBar}
      <div class="card-surface p-8 rounded-2xl text-center text-sm opacity-80">
        इस श्रेणी में अभी कोई नया अपडेट उपलब्ध नहीं है (Source Verification Pending)।
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-lg font-extrabold">${searchQuery ? '🔍 खोज परिणाम' : (titles[view] || 'अपडेट्स')}</h2>
      <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">${list.length} पोस्ट</span>
    </div>
    ${stateBar}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${list.map(post => renderPostCard(post)).join('')}
    </div>`;
}

function filterByState(stateName) {
  const container = document.getElementById('content-feed');
  const filtered = stateName === 'All'
    ? PORTAL_DATA.posts
    : PORTAL_DATA.posts.filter(p => p.state === stateName);
  container.innerHTML = `
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-lg font-extrabold">🗺️ ${stateName} — अपडेट्स</h2>
      <button onclick="renderFeed('states')" class="text-xs font-bold text-emerald-700 underline">← सभी राज्य</button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${filtered.length ? filtered.map(renderPostCard).join('') : '<div class="card-surface p-6 rounded-2xl text-sm">इस राज्य का डेटा जल्द जोड़ा जाएगा (Source Verification Pending)।</div>'}
    </div>`;
}

function renderPostCard(post) {
  const effStatus = getEffectiveStatus(post);
  const badgeColor = effStatus === 'Archive' ? 'bg-gray-200 text-gray-700' : 'bg-orange-100 text-orange-800';
  return `
    <article onclick="openPostDetail('${post.id}')" class="card-surface tile-card cursor-pointer rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-sm">
      <div>
        <div class="flex flex-wrap items-center gap-2 text-[11px] font-bold mb-2">
          <span class="px-2 py-0.5 rounded-full ${badgeColor}">${effStatus === 'Archive' ? 'Archive' : 'NEW • Live'}</span>
          <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">${post.state}</span>
          <span class="opacity-70">📅 अंतिम तिथि: ${post.lastDate}</span>
        </div>
        <h3 class="font-extrabold text-base leading-snug mb-1.5">${post.title}</h3>
        <p class="text-xs opacity-80 line-clamp-2">${post.summary}</p>
      </div>
      <div class="flex items-center justify-between pt-2 border-t border-emerald-100 dark:border-emerald-900 text-xs font-bold text-emerald-700 dark:text-emerald-300">
        <span>${post.department}</span>
        <span>पूरी जानकारी →</span>
      </div>
    </article>`;
}

// Deep Post Detail View + CSC Print Slip
function openPostDetail(id) {
  const post = PORTAL_DATA.posts.find(p => p.id === id);
  if (!post) return;
  const container = document.getElementById('content-feed');
  const related = PORTAL_DATA.posts.filter(p => p.id !== id).slice(0, 4);

  container.innerHTML = `
    <div class="card-surface rounded-3xl p-5 sm:p-7 space-y-5 shadow-md">
      <button onclick="renderFeed('${CURRENT_VIEW}')" class="text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline">← वापस सूची पर जाएं</button>

      <div>
        <div class="flex flex-wrap gap-2 text-xs font-bold mb-2">
          <span class="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800">${getEffectiveStatus(post)}</span>
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">${post.state} • ${post.district}</span>
          <span class="opacity-75">अपडेट: ${post.updatedAt}</span>
        </div>
        <h1 class="text-xl sm:text-2xl font-extrabold leading-tight">${post.title}</h1>
        <p class="text-sm opacity-85 mt-2">${post.summary}</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
        <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60"><b>विभाग:</b><br/>${post.department}</div>
        <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60"><b>शुरुआत:</b><br/>${post.launchDate}</div>
        <div class="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40"><b>अंतिम तिथि:</b><br/>${post.lastDate}</div>
      </div>

      <div class="space-y-4 text-sm">
        <div><h3 class="font-bold text-base mb-1">💰 लाभ व विवरण</h3><p>${post.benefits}</p></div>
        <div><h3 class="font-bold text-base mb-1">✅ पात्रता की शर्तें</h3><ul class="list-disc pl-5 space-y-1">${post.eligibility.map(i => `<li>${i}</li>`).join('')}</ul></div>
        <div><h3 class="font-bold text-base mb-1">📄 ज़रूरी दस्तावेज़</h3><ul class="list-disc pl-5 space-y-1">${post.documents.map(i => `<li>${i}</li>`).join('')}</ul></div>
        <div><h3 class="font-bold text-base mb-1">📝 ऑनलाइन आवेदन प्रक्रिया</h3><ol class="list-decimal pl-5 space-y-1">${post.steps.map(i => `<li>${i}</li>`).join('')}</ol></div>
      </div>

      <!-- Direct Official Apply Box -->
      <div class="p-4 rounded-2xl bg-gradient-to-r from-[#0B3D2E] to-[#147D5A] text-white space-y-2">
        <p class="text-xs text-emerald-100">💡 <b>पोर्टल पर जाकर क्या करें:</b> ${post.actionHint}</p>
        <div class="flex flex-wrap gap-3 pt-1">
          <a href="${post.directApplyUrl}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl bg-[#F28C28] hover:bg-orange-600 font-bold text-sm shadow">
            🚀 Apply Now — सीधा आधिकारिक पोर्टल ↗
          </a>
          <button onclick="window.print()" class="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 font-bold text-xs">
            🖨️ CSC चेकलिस्ट प्रिंट / PDF
          </button>
        </div>
        <p class="text-[10px] text-emerald-200 pt-1">* यह एक स्वतंत्र सूचना पोर्टल है। आवेदन केवल आधिकारिक सरकारी वेबसाइट पर ही करें।</p>
      </div>
    </div>

    <!-- Related Updates -->
    <div class="mt-6">
      <h3 class="font-extrabold text-base mb-3">📌 इससे जुड़ी अन्य योजनाएं व अपडेट्स</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${related.map(renderPostCard).join('')}</div>
    </div>`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Connect Search Input & Global Navigation
document.addEventListener('DOMContentLoaded', () => {
  initPortal();
  const searchInput = document.getElementById('global-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => renderFeed(CURRENT_VIEW, e.target.value));
  }
});

window.navigate = function(page) {
  if (['home', 'schemes', 'panchayat', 'jobs', 'loans', 'archive', 'states'].includes(page)) {
    renderFeed(page);
  } else {
    document.getElementById('content-feed').innerHTML = `
      <div class="card-surface p-6 rounded-2xl text-center">
        <h2 class="font-bold text-lg mb-1">${page.toUpperCase()} सेक्शन</h2>
        <p class="text-xs opacity-75">यह मॉड्यूल Step 3 (Seva Kendra & Tools) और Step 4 (Admin) में एक्टिव होगा।</p>
      </div>`;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
