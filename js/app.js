let PORTAL_DATA = { lastUpdated: '', posts: [] };
let CURRENT_VIEW = 'home';

async function initPortal() {
  try {
    const res = await fetch('data/portal-data.json');
    PORTAL_DATA = await res.json();
    updateLastTimestamp();
    const initialPage = location.hash.replace('#', '') || 'home';
    if (initialPage !== 'home') {
      window.navigate(initialPage, true);
    } else {
      renderFeed('home');
    }
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
    badge.textContent = 'अपडेट: ' + d.toLocaleString('hi-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  }
}

function getEffectiveStatus(post) {
  if (post.status === 'Archive') return 'Archive';
  if (post.lastDate && new Date(post.lastDate) < new Date()) return 'Archive';
  return post.status || 'Live';
}

function formatPublishedDateTime(post) {
  const raw = post.publishedAt || post.updatedAt || PORTAL_DATA.lastUpdated;
  if (!raw) return 'आज अपडेट';
  const d = new Date(raw.includes('T') ? raw : raw + 'T10:30:00+05:30');
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// Direct Official Form Redirect on Click
function goDirectApply(url) {
  if (url && url.startsWith('http')) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

function renderFeed(view, searchQuery = '') {
  CURRENT_VIEW = view;
  const container = document.getElementById('content-feed');
  const allPosts = PORTAL_DATA.posts || [];

  // Search Mode
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    const matched = allPosts.filter(p =>
      (p.title + ' ' + p.summary + ' ' + p.state + ' ' + p.district + ' ' + p.department + ' ' + (p.keywords || []).join(' '))
        .toLowerCase().includes(q)
    );
    container.innerHTML = `
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-extrabold">🔍 खोज परिणाम: "${searchQuery}"</h2>
        <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">${matched.length} पोस्ट</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${matched.length ? matched.map(p => renderPostCard(p, 'emerald')).join('') : '<div class="card-surface p-6 rounded-2xl text-sm">कोई परिणाम नहीं मिला।</div>'}
      </div>`;
    return;
  }

  // HOME PAGE: Highlighted Nai Bharti + Colourful Category Sections
  if (view === 'home') {
    const livePosts = allPosts.filter(p => getEffectiveStatus(p) !== 'Archive');
    const jobs = livePosts.filter(p => p.category === 'jobs');
    const schemes = livePosts.filter(p => p.category === 'schemes');
    const panchayat = livePosts.filter(p => p.isPanchayat || p.category === 'panchayat');
    const loans = livePosts.filter(p => p.category === 'loans');

    container.innerHTML = `
      <div class="space-y-7">
        <!-- 1. HIGHLIGHTED NAI BHARTI (LATEST JOBS) -->
        <div class="rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-rose-600 via-red-600 to-orange-600 text-white shadow-lg">
          <div class="flex items-center justify-between gap-2 mb-3">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full bg-yellow-300 text-red-900 text-[11px] font-extrabold badge-hot">🔥 HOT • NEW</span>
              <h2 class="text-lg sm:text-xl font-extrabold">नई सरकारी भर्ती (Latest Jobs)</h2>
            </div>
            <button onclick="navigate('jobs')" class="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl">सभी देखें →</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-[#13221C] dark:text-[#ECF7F1]">
            ${jobs.length ? jobs.map(p => renderPostCard(p, 'rose')).join('') : '<div class="bg-white/15 text-white p-4 rounded-2xl text-xs">नई भर्ती जल्द अपडेट होगी।</div>'}
          </div>
        </div>

        <!-- 2. SARKARI YOJANA SECTION -->
        <div class="space-y-3">
          <div class="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow">
            <h2 class="font-extrabold text-base sm:text-lg">🏛️ प्रमुख सरकारी योजनाएं (Schemes)</h2>
            <button onclick="navigate('schemes')" class="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg">सभी →</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${schemes.length ? schemes.map(p => renderPostCard(p, 'orange')).join('') : '<div class="card-surface p-5 rounded-2xl text-xs">कोई योजना उपलब्ध नहीं।</div>'}
          </div>
        </div>

        <!-- 3. GRAM PANCHAYAT HUB SECTION -->
        <div class="space-y-3">
          <div class="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow">
            <h2 class="font-extrabold text-base sm:text-lg">🏡 ग्राम पंचायत व गाँव की योजनाएं</h2>
            <button onclick="navigate('panchayat')" class="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg">सभी →</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${panchayat.length ? panchayat.map(p => renderPostCard(p, 'green')).join('') : '<div class="card-surface p-5 rounded-2xl text-xs">कोई अपडेट उपलब्ध नहीं।</div>'}
          </div>
        </div>

        <!-- 4. LOANS & SUBSIDY SECTION -->
        <div class="space-y-3">
          <div class="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-700 text-white shadow">
            <h2 class="font-extrabold text-base sm:text-lg">💰 सरकारी लोन व सब्सिडी (Loans)</h2>
            <button onclick="navigate('loans')" class="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg">सभी →</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${loans.length ? loans.map(p => renderPostCard(p, 'teal')).join('') : '<div class="card-surface p-5 rounded-2xl text-xs">कोई लोन अपडेट उपलब्ध नहीं।</div>'}
          </div>
        </div>
      </div>`;
    return;
  }

  // CATEGORY PAGES
  let list = allPosts;
  if (view === 'archive') {
    list = list.filter(p => getEffectiveStatus(p) === 'Archive');
  } else {
    list = list.filter(p => getEffectiveStatus(p) !== 'Archive');
    if (view === 'panchayat') list = list.filter(p => p.isPanchayat || p.category === 'panchayat');
    else if (view === 'schemes') list = list.filter(p => p.category === 'schemes');
    else if (view === 'jobs') list = list.filter(p => p.category === 'jobs');
    else if (view === 'loans') list = list.filter(p => p.category === 'loans');
  }

  const titles = {
    schemes: '🏛️ केंद्र व राज्य सरकारी योजनाएं',
    panchayat: '🏡 ग्राम पंचायत व गाँव की योजनाएं',
    jobs: '🔥 नई सरकारी नौकरी व PSU भर्ती',
    loans: '💰 सरकारी लोन व सब्सिडी',
    archive: '🗄️ पुराना रिकॉर्ड (Permanent Archive)',
    states: '🗺️ राज्य व जिला पोर्टल'
  };

  let stateBar = '';
  if (view === 'states') {
    const states = ['All', 'Central', 'Madhya Pradesh', 'Uttar Pradesh', 'Bihar', 'Rajasthan'];
    stateBar = `<div class="flex flex-wrap gap-2 mb-4">
      ${states.map(s => `<button onclick="filterByState('${s}')" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow hover:opacity-90">${s}</button>`).join('')}
    </div>`;
  }

  container.innerHTML = `
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-lg sm:text-xl font-extrabold">${titles[view] || 'अपडेट्स'}</h2>
      <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">${list.length} पोस्ट</span>
    </div>
    ${stateBar}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${list.length ? list.map(p => renderPostCard(p, 'emerald')).join('') : '<div class="card-surface p-8 rounded-2xl text-center text-sm opacity-80">इस श्रेणी में अभी कोई नया अपडेट उपलब्ध नहीं है (Source Verification Pending)।</div>'}
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
      ${filtered.length ? filtered.map(p => renderPostCard(p, 'sky')).join('') : '<div class="card-surface p-6 rounded-2xl text-sm">इस राज्य का डेटा जल्द जोड़ा जाएगा (Source Verification Pending)।</div>'}
    </div>`;
}

// Colourful Card: Clicking Card -> Direct Official Form | Small Button -> Full Details
function renderPostCard(post, accent = 'emerald') {
  const effStatus = getEffectiveStatus(post);
  const borderAccent = {
    rose: 'border-l-4 border-l-rose-500',
    orange: 'border-l-4 border-l-orange-500',
    green: 'border-l-4 border-l-green-600',
    teal: 'border-l-4 border-l-teal-600',
    sky: 'border-l-4 border-l-sky-600',
    emerald: 'border-l-4 border-l-emerald-600'
  }[accent] || 'border-l-4 border-l-emerald-600';

  const statusBadge = effStatus === 'Archive'
    ? '<span class="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">Archive</span>'
    : '<span class="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-extrabold">● LIVE</span>';

  return `
    <article onclick="goDirectApply('${post.directApplyUrl}')" class="card-surface tile-card ${borderAccent} cursor-pointer rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-sm">
      <div>
        <div class="flex flex-wrap items-center justify-between gap-1.5 text-[11px] font-bold mb-2">
          <div class="flex items-center gap-1.5">
            ${statusBadge}
            <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">${post.state}</span>
          </div>
          <span class="text-[10px] opacity-75">🕒 ${formatPublishedDateTime(post)}</span>
        </div>
        <h3 class="font-extrabold text-base leading-snug mb-1.5 hover:text-emerald-700 dark:hover:text-emerald-300">${post.title}</h3>
        <p class="text-xs opacity-80 line-clamp-2">${post.summary}</p>
      </div>
      <div class="flex items-center justify-between gap-2 pt-2.5 border-t border-emerald-100 dark:border-emerald-900 text-xs">
        <span class="font-bold text-orange-600 dark:text-orange-400">📅 अंतिम तिथि: ${post.lastDate}</span>
        <div class="flex items-center gap-2">
          <button onclick="event.stopPropagation(); openPostDetail('${post.id}')" class="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/70 text-emerald-800 dark:text-emerald-200 font-bold hover:opacity-85">📄 जानकारी</button>
          <span class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#F28C28] to-orange-600 text-white font-bold shadow-sm">Apply ↗</span>
        </div>
      </div>
    </article>`;
}

function openPostDetail(id) {
  const post = PORTAL_DATA.posts.find(p => p.id === id);
  if (!post) return;
  const hero = document.getElementById('home-hero');
  const backBar = document.getElementById('inner-back-bar');
  if (hero) hero.classList.add('hidden');
  if (backBar) backBar.classList.remove('hidden');

  const container = document.getElementById('content-feed');
  const related = PORTAL_DATA.posts.filter(p => p.id !== id).slice(0, 4);

  container.innerHTML = `
    <div class="card-surface rounded-3xl p-5 sm:p-7 space-y-5 shadow-md">
      <div>
        <div class="flex flex-wrap gap-2 text-xs font-bold mb-2">
          <span class="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800">${getEffectiveStatus(post)}</span>
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">${post.state} • ${post.district}</span>
          <span class="opacity-75">🕒 Published: ${formatPublishedDateTime(post)}</span>
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

      <div class="p-4 rounded-2xl bg-gradient-to-r from-[#0B3D2E] to-[#147D5A] text-white space-y-2">
        <p class="text-xs text-emerald-100">💡 <b>पोर्टल पर जाकर क्या करें:</b> ${post.actionHint}</p>
        <div class="flex flex-wrap gap-3 pt-1">
          <a href="${post.directApplyUrl}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl bg-[#F28C28] hover:bg-orange-600 font-bold text-sm shadow">
            🚀 Apply Now — सीधा आधिकारिक फॉर्म ↗
          </a>
          <button onclick="window.print()" class="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 font-bold text-xs">
            🖨️ CSC चेकलिस्ट प्रिंट / PDF
          </button>
        </div>
        <p class="text-[10px] text-emerald-200 pt-1">* यह एक स्वतंत्र सूचना पोर्टल है। आवेदन केवल आधिकारिक सरकारी वेबसाइट पर ही करें।</p>
      </div>
    </div>

    <div class="mt-6">
      <h3 class="font-extrabold text-base mb-3">📌 इससे जुड़ी अन्य योजनाएं व अपडेट्स</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${related.map(p => renderPostCard(p, 'emerald')).join('')}</div>
    </div>`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

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
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
