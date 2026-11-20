let PORTAL_DATA = { lastUpdated: '', posts: [] };
let CURRENT_VIEW = 'home';
let CURRENT_LANG = localStorage.getItem('bs_lang') || 'hi';

// 12-Language UI Dictionary
const UI_STRINGS = {
  hi: { tagline:'भारत की सरकारी जानकारी, अब एक ही जगह', heroTitle:'भारत की सभी सरकारी योजनाएं, नई भर्ती और ग्राम पंचायत अपडेट', navHome:'होम', navSchemes:'योजनाएं', navPanchayat:'ग्राम पंचायत', navStates:'राज्य व जिला', navJobs:'नौकरी / PSU', navSeva:'सेवा केंद्र', navTools:'टूल्स', navArchive:'पुराना रिकॉर्ड', tileJobs:'सरकारी नौकरी', tileSchemes:'सरकारी योजनाएं', tilePanchayat:'ग्राम पंचायत हब', tileStates:'राज्य व जिला पोर्टल', tileSeva:'सरकारी सेवा केंद्र', tileLoans:'लोन व सब्सिडी', tileTools:'नागरिक टूल्स', tileArchive:'पुराना रिकॉर्ड', backHome:'होम पेज पर वापस जाएं', readMore:'पूरी जानकारी पढ़ें →', searchPh:'खोजें: Navy, Police, PM Kisan, MP, आवास, लोन...' },
  en: { tagline:'Every government update. One trusted bridge.', heroTitle:'All Indian Govt Schemes, Latest Jobs & Gram Panchayat Updates', navHome:'Home', navSchemes:'Schemes', navPanchayat:'Panchayat', navStates:'States', navJobs:'Jobs / PSU', navSeva:'Seva Kendra', navTools:'Tools', navArchive:'Archive', tileJobs:'Govt Jobs', tileSchemes:'Govt Schemes', tilePanchayat:'Gram Panchayat Hub', tileStates:'States & Districts', tileSeva:'Sarkari Seva Kendra', tileLoans:'Loans & Subsidy', tileTools:'Citizen Tools', tileArchive:'Permanent Archive', backHome:'Back to Home Page', readMore:'View Full Details →', searchPh:'Search: Navy, Police, PM Kisan, MP, Loan...' },
  bn: { tagline:'ভারতের সরকারি তথ্য, এখন এক জায়গায়', heroTitle:'ভারতের সমস্ত সরকারি প্রকল্প, চাকরি ও গ্রাম পঞ্চায়েত আপডেট', navHome:'হোম', navSchemes:'প্রকল্প', navPanchayat:'পঞ্চায়েত', navStates:'রাজ্য', navJobs:'চাকরি', navSeva:'সেবা কেন্দ্র', navTools:'টুলস', navArchive:'আর্কাইভ', tileJobs:'সরকারি চাকরি', tileSchemes:'সরকারি প্রকল্প', tilePanchayat:'গ্রাম পঞ্চায়েত হাব', tileStates:'রাজ্য ও জেলা', tileSeva:'সরকারি সেবা কেন্দ্র', tileLoans:'লোন ও ভর্তুকি', tileTools:'নাগরিক টুলস', tileArchive:'পুরানো রেকর্ড', backHome:'হোম পেজে ফিরে যান', readMore:'বিস্তারিত দেখুন →', searchPh:'খুঁজুন: Navy, Police, PM Kisan...' },
  mr: { tagline:'भारताची सरकारी माहिती, आता एकाच ठिकाणी', heroTitle:'भारतातील सर्व सरकारी योजना, नोकऱ्या आणि ग्रामपंचायत अपडेट्स', navHome:'होम', navSchemes:'योजना', navPanchayat:'ग्रामपंचायत', navStates:'राज्य', navJobs:'नोकरी', navSeva:'सेवा केंद्र', navTools:'टूल्स', navArchive:'जुने रेकॉर्ड', tileJobs:'सरकारी नोकरी', tileSchemes:'सरकारी योजना', tilePanchayat:'ग्रामपंचायत हब', tileStates:'राज्य व जिल्हा', tileSeva:'सरकारी सेवा केंद्र', tileLoans:'कर्ज व अनुदान', tileTools:'नागरिक टूल्स', tileArchive:'जुने रेकॉर्ड', backHome:'होम पेजवर परत जा', readMore:'संपूर्ण माहिती पहा →', searchPh:'शोधा: Navy, Police, PM Kisan...' },
  gu: { tagline:'ભારતની સરકારી માહિતી, હવે એક જ જગ્યાએ', heroTitle:'ભારતની તમામ સરકારી યોજનાઓ, નોકરી અને ગ્રામ પંચાયત અપડેટ', navHome:'હોમ', navSchemes:'યોજનાઓ', navPanchayat:'પંચાયત', navStates:'રાજ્ય', navJobs:'નોકરી', navSeva:'સેવા કેન્દ્ર', navTools:'ટૂલ્સ', navArchive:'જૂનો રેકોર્ડ', tileJobs:'સરકારી નોકરી', tileSchemes:'સરકારી યોજનાઓ', tilePanchayat:'ગ્રામ પંચાયત હબ', tileStates:'રાજ્ય અને જિલ્લો', tileSeva:'સરકારી સેવા કેન્દ્ર', tileLoans:'લોન અને સબસિડી', tileTools:'નાગરિક ટૂલ્સ', tileArchive:'જૂનો રેકોર્ડ', backHome:'હોમ પેજ પર પાછા જાઓ', readMore:'સંપૂર્ણ વિગતો જુઓ →', searchPh:'શોધો: Navy, Police, PM Kisan...' },
  ta: { tagline:'இந்திய அரசு தகவல்கள், ஒரே இடத்தில்', heroTitle:'அனைத்து அரசு திட்டங்கள், வேலைகள் மற்றும் கிராம பஞ்சாயத்து தகவல்கள்', navHome:'முகப்பு', navSchemes:'திட்டங்கள்', navPanchayat:'பஞ்சாயத்து', navStates:'மாநிலம்', navJobs:'வேலைகள்', navSeva:'சேவை மையம்', navTools:'கருவிகள்', navArchive:'ஆவணங்கள்', tileJobs:'அரசு வேலைகள்', tileSchemes:'அரசு திட்டங்கள்', tilePanchayat:'கிராம பஞ்சாயத்து', tileStates:'மாநிலங்கள்', tileSeva:'அரசு சேவை மையம்', tileLoans:'கடன் & மானியம்', tileTools:'குடிமக்கள் கருவிகள்', tileArchive:'பழைய பதிவுகள்', backHome:'முகப்புக்குத் திரும்பு', readMore:'முழு விவரம் →', searchPh:'தேடுங்கள்: Navy, Police, PM Kisan...' },
  te: { tagline:'భారత ప్రభుత్వ సమాచారం, ఒకే చోట', heroTitle:'అన్ని ప్రభుత్వ పథకాలు, ఉద్యోగాలు మరియు గ్రామ పంచాయతీ అప్‌డేట్స్', navHome:'హోమ్', navSchemes:'పథకాలు', navPanchayat:'పంచాయతీ', navStates:'రాష్ట్రం', navJobs:'ఉద్యోగాలు', navSeva:'సేవా కేంద్రం', navTools:'టూల్స్', navArchive:'ఆర్కైవ్', tileJobs:'ప్రభుత్వ ఉద్యోగాలు', tileSchemes:'ప్రభుత్వ పథకాలు', tilePanchayat:'గ్రామ పంచాయతీ హబ్', tileStates:'రాష్ట్రాలు & జిల్లాలు', tileSeva:'ప్రభుత్వ సేవా కేంద్రం', tileLoans:'రుణాలు & సబ్సిడీ', tileTools:'పౌర సాధనాలు', tileArchive:'పాత రికార్డులు', backHome:'హోమ్ పేజీకి వెళ్ళండి', readMore:'పూర్తి వివరాలు →', searchPh:'వెతకండి: Navy, Police, PM Kisan...' },
  kn: { tagline:'ಭಾರತದ ಸರ್ಕಾರಿ ಮಾಹಿತಿ, ಒಂದೇ ಕಡೆ', heroTitle:'ಎಲ್ಲಾ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ಉದ್ಯೋಗಗಳು ಮತ್ತು ಗ್ರಾಮ ಪಂಚಾಯತ್ ಅಪ್‌ಡೇಟ್‌ಗಳು', navHome:'ಮುಖಪುಟ', navSchemes:'ಯೋಜನೆಗಳು', navPanchayat:'ಪಂಚಾಯತ್', navStates:'ರಾಜ್ಯ', navJobs:'ಉದ್ಯೋಗ', navSeva:'ಸೇವಾ ಕೇಂದ್ರ', navTools:'ಟೂಲ್ಸ್', navArchive:'ಹಳೆಯ ದಾಖಲೆ', tileJobs:'ಸರ್ಕಾರಿ ಉದ್ಯೋಗ', tileSchemes:'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು', tilePanchayat:'ಗ್ರಾಮ ಪಂಚಾಯತ್ ಹಬ್', tileStates:'ರಾಜ್ಯ ಮತ್ತು ಜಿಲ್ಲೆ', tileSeva:'ಸರ್ಕಾರಿ ಸೇವಾ ಕೇಂದ್ರ', tileLoans:'ಸಾಲ ಮತ್ತು ಸಬ್ಸಿಡಿ', tileTools:'ನಾಗರಿಕ ಟೂಲ್ಸ್', tileArchive:'ಹಳೆಯ ದಾಖಲೆ', backHome:'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ', readMore:'ಪೂರ್ಣ ವಿವರ →', searchPh:'ಹುಡುಕಿ: Navy, Police, PM Kisan...' },
  ml: { tagline:'ഇന്ത്യൻ സർക്കാർ വിവരങ്ങൾ, ഒരിടത്ത്', heroTitle:'എല്ലാ സർക്കാർ പദ്ധതികളും ജോലികളും ഗ്രാമപഞ്ചായത്ത് അപ്ഡേറ്റുകളും', navHome:'ഹോം', navSchemes:'പദ്ധതികൾ', navPanchayat:'പഞ്ചായത്ത്', navStates:'സംസ്ഥാനം', navJobs:'ജോലികൾ', navSeva:'സേവാ കേന്ദ്രം', navTools:'ടൂളുകൾ', navArchive:'ആർക്കൈവ്', tileJobs:'സർക്കാർ ജോലികൾ', tileSchemes:'സർക്കാർ പദ്ധതികൾ', tilePanchayat:'ഗ്രാമപഞ്ചായത്ത് ഹബ്', tileStates:'സംസ്ഥാനങ്ങൾ', tileSeva:'സർക്കാർ സേവാ കേന്ദ്രം', tileLoans:'ലോൺ & സബ്സിഡി', tileTools:'പൗര ടൂളുകൾ', tileArchive:'പഴയ രേഖകൾ', backHome:'ഹോം പേജിലേക്ക് മടങ്ങുക', readMore:'പൂർണ്ണ വിവരങ്ങൾ →', searchPh:'തിരയുക: Navy, Police, PM Kisan...' },
  pa: { tagline:'ਭਾਰਤ ਦੀ ਸਰਕਾਰੀ ਜਾਣਕਾਰੀ, ਹੁਣ ਇੱਕੋ ਥਾਂ', heroTitle:'ਭਾਰਤ ਦੀਆਂ ਸਾਰੀਆਂ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ, ਨੌਕਰੀਆਂ ਅਤੇ ਗ੍ਰਾਮ ਪੰਚਾਇਤ ਅਪਡੇਟ', navHome:'ਹੋਮ', navSchemes:'ਯੋਜਨਾਵਾਂ', navPanchayat:'ਪੰਚਾਇਤ', navStates:'ਰਾਜ', navJobs:'ਨੌਕਰੀ', navSeva:'ਸੇਵਾ ਕੇਂਦਰ', navTools:'ਟੂਲਸ', navArchive:'ਪੁਰਾਣਾ ਰਿਕਾਰਡ', tileJobs:'ਸਰਕਾਰੀ ਨੌਕਰੀ', tileSchemes:'ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ', tilePanchayat:'ਗ੍ਰਾਮ ਪੰਚਾਇਤ ਹੱਬ', tileStates:'ਰਾਜ ਅਤੇ ਜ਼ਿਲ੍ਹਾ', tileSeva:'ਸਰਕਾਰੀ ਸੇਵਾ ਕੇਂਦਰ', tileLoans:'ਲੋਨ ਅਤੇ ਸਬਸਿਡੀ', tileTools:'ਨਾਗਰਿਕ ਟੂਲਸ', tileArchive:'ਪੁਰਾਣਾ ਰਿਕਾਰਡ', backHome:'ਹੋਮ ਪੇਜ ਤੇ ਵਾਪਸ ਜਾਓ', readMore:'ਪੂਰੀ ਜਾਣਕਾਰੀ →', searchPh:'ਖੋਜੋ: Navy, Police, PM Kisan...' },
  or: { tagline:'ଭାରତର ସରକାରୀ ସୂଚନା, ଏବେ ଗୋଟିଏ ସ୍ଥାନରେ', heroTitle:'ଭାରତର ସମସ୍ତ ସରକାରୀ ଯୋଜନା, ଚାକିରି ଏବଂ ଗ୍ରାମ ପଞ୍ଚାୟତ ଅପଡେଟ୍', navHome:'ହୋମ୍', navSchemes:'ଯୋଜନା', navPanchayat:'ପଞ୍ଚାୟତ', navStates:'ରାଜ୍ୟ', navJobs:'ଚାକିରି', navSeva:'ସେବା କେନ୍ଦ୍ର', navTools:'ଟୁଲ୍ସ', navArchive:'ପୁରୁଣା ରେକର୍ଡ', tileJobs:'ସରକାରୀ ଚାକିରି', tileSchemes:'ସରକାରୀ ଯୋଜନା', tilePanchayat:'ଗ୍ରାମ ପଞ୍ଚାୟତ ହବ୍', tileStates:'ରାଜ୍ୟ ଓ ଜିଲ୍ଲା', tileSeva:'ସରକାରୀ ସେବା କେନ୍ଦ୍ର', tileLoans:'ଋଣ ଓ ସବସିଡି', tileTools:'ନାଗରିକ ଟୁଲ୍ସ', tileArchive:'ପୁରୁଣା ରେକର୍ଡ', backHome:'ହୋମ୍ ପେଜକୁ ଫେରନ୍ତୁ', readMore:'ସମ୍ପୂର୍ଣ୍ଣ ବିବରଣୀ →', searchPh:'ଖୋଜନ୍ତୁ: Navy, Police, PM Kisan...' },
  as: { tagline:'ভাৰতৰ চৰকাৰী তথ্য, এতিয়া একেলগে', heroTitle:'ভাৰতৰ সকলো চৰকাৰী আঁচনি, চাকৰি আৰু গাঁও পঞ্চায়ত আপডেট', navHome:'হোম', navSchemes:'আঁচনি', navPanchayat:'পঞ্চায়ত', navStates:'ৰাজ্য', navJobs:'চাকৰি', navSeva:'সেৱা কেন্দ্ৰ', navTools:'টুলছ', navArchive:'পুৰণি ৰেকৰ্ড', tileJobs:'চৰকাৰী চাকৰি', tileSchemes:'চৰকাৰী আঁচনি', tilePanchayat:'গাঁও পঞ্চায়ত হাব', tileStates:'ৰাজ্য আৰু জিলা', tileSeva:'চৰকাৰী সেৱা কেন্দ্ৰ', tileLoans:'ঋণ আৰু ৰাজসাহায্য', tileTools:'নাগৰিক টুলছ', tileArchive:'পুৰণি ৰেকৰ্ড', backHome:'হোম পেজলৈ ঘূৰি যাওক', readMore:'সম্পূৰ্ণ বিৱৰণ →', searchPh:'সন্ধান কৰক: Navy, Police, PM Kisan...' }
};

window.changeLanguage = function(lang) {
  CURRENT_LANG = lang || 'hi';
  localStorage.setItem('bs_lang', CURRENT_LANG);
  document.documentElement.lang = CURRENT_LANG;
  const dict = UI_STRINGS[CURRENT_LANG] || UI_STRINGS.hi;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (dict[k]) el.textContent = dict[k];
  });
  const searchEl = document.getElementById('global-search');
  if (searchEl && dict.searchPh) searchEl.placeholder = dict.searchPh;
  if (PORTAL_DATA.posts.length && ['home','schemes','panchayat','jobs','loans','archive','states'].includes(CURRENT_VIEW)) {
    renderFeed(CURRENT_VIEW);
  }
};

// State Cards Data
const STATE_LIST = [
  { name: 'Madhya Pradesh', hi: 'मध्य प्रदेश', capital: 'भोपाल', grad: 'from-emerald-600 to-teal-700' },
  { name: 'Uttar Pradesh', hi: 'उत्तर प्रदेश', capital: 'लखनऊ', grad: 'from-indigo-600 to-blue-700' },
  { name: 'Bihar', hi: 'बिहार', capital: 'पटना', grad: 'from-amber-600 to-orange-700' },
  { name: 'Rajasthan', hi: 'राजस्थान', capital: 'जयपुर', grad: 'from-rose-600 to-pink-700' },
  { name: 'Maharashtra', hi: 'महाराष्ट्र', capital: 'मुंबई', grad: 'from-sky-600 to-cyan-700' },
  { name: 'Delhi', hi: 'दिल्ली (NCT)', capital: 'नई दिल्ली', grad: 'from-violet-600 to-purple-700' },
  { name: 'Gujarat', hi: 'गुजरात', capital: 'गांधीनगर', grad: 'from-teal-600 to-emerald-700' },
  { name: 'Central', hi: 'केंद्र सरकार (All India)', capital: 'भारत सरकार', grad: 'from-slate-700 to-slate-900' }
];

async function initPortal() {
  try {
    const res = await fetch('data/portal-data.json');
    PORTAL_DATA = await res.json();
    updateLastTimestamp();
    const sel = document.getElementById('lang-select');
    if (sel) sel.value = CURRENT_LANG;
    window.changeLanguage(CURRENT_LANG);

    const initialPage = location.hash.replace('#', '') || 'home';
    window.navigate(initialPage, true);
  } catch (err) {
    document.getElementById('content-feed').innerHTML = `
      <div class="card-surface p-6 rounded-2xl text-center">
        <p class="font-bold text-red-600">डेटा लोड करने में समस्या आई।</p>
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
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-800">${matched.length} पोस्ट</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${matched.length ? matched.map(p => renderPostCard(p, 'indigo')).join('') : '<div class="card-surface p-6 rounded-2xl text-sm">कोई परिणाम नहीं मिला।</div>'}
      </div>`;
    return;
  }

  // HOME PAGE: Classy Highlighted Latest Jobs + Category Sections
  if (view === 'home') {
    const livePosts = allPosts.filter(p => getEffectiveStatus(p) !== 'Archive');
    const jobs = livePosts.filter(p => p.category === 'jobs');
    const schemes = livePosts.filter(p => p.category === 'schemes');
    const panchayat = livePosts.filter(p => p.isPanchayat || p.category === 'panchayat');
    const loans = livePosts.filter(p => p.category === 'loans');

    container.innerHTML = `
      <div class="space-y-7">
        <!-- 1. HIGHLIGHTED LATEST JOBS (Classy Deep Indigo-Slate Theme) -->
        <div class="rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-slate-800 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-500/30">
          <div class="flex items-center justify-between gap-2 mb-4">
            <div class="flex items-center gap-2.5">
              <span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-extrabold">🔥 NEW</span>
              <h2 class="text-lg sm:text-xl font-extrabold tracking-tight">नई सरकारी भर्ती (Defence, Police, PSU, Railway)</h2>
            </div>
            <button onclick="navigate('jobs')" class="text-xs font-bold bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-xl shrink-0">सभी देखें →</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-[#0F172A] dark:text-[#F8FAFC]">
            ${jobs.slice(0, 6).map(p => renderPostCard(p, 'indigo')).join('')}
          </div>
        </div>

        <!-- 2. SARKARI YOJANA -->
        <div class="space-y-3">
          <div class="flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md">
            <h2 class="font-extrabold text-base sm:text-lg">🏛️ प्रमुख सरकारी योजनाएं (Schemes)</h2>
            <button onclick="navigate('schemes')" class="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg">सभी →</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${schemes.map(p => renderPostCard(p, 'amber')).join('')}
          </div>
        </div>

        <!-- 3. GRAM PANCHAYAT HUB -->
        <div class="space-y-3">
          <div class="flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md">
            <h2 class="font-extrabold text-base sm:text-lg">🏡 ग्राम पंचायत व गाँव की योजनाएं</h2>
            <button onclick="navigate('panchayat')" class="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg">सभी →</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${panchayat.slice(0, 4).map(p => renderPostCard(p, 'emerald')).join('')}
          </div>
        </div>

        <!-- 4. LOANS & SUBSIDY -->
        <div class="space-y-3">
          <div class="flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-md">
            <h2 class="font-extrabold text-base sm:text-lg">💰 सरकारी लोन व सब्सिडी (Loans)</h2>
            <button onclick="navigate('loans')" class="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg">सभी →</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${loans.map(p => renderPostCard(p, 'sky')).join('')}
          </div>
        </div>
      </div>`;
    return;
  }

  // STATES EXPLORER: Colourful State Blocks Page
  if (view === 'states') {
    container.innerHTML = `
      <div class="space-y-5">
        <div>
          <h2 class="text-xl font-extrabold">🗺️ राज्य व केंद्र शासित प्रदेश पोर्टल</h2>
          <p class="text-xs opacity-75 mt-0.5">किसी भी राज्य पर क्लिक करके उसकी विभाग-वार (Department-wise) योजनाएं और भर्तियां देखें</p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          ${STATE_LIST.map(st => {
            const count = allPosts.filter(p => p.state === st.name && getEffectiveStatus(p) !== 'Archive').length;
            return `
              <button onclick="openStateHub('${st.name}')" class="tile-card rounded-2xl p-4 text-white text-left bg-gradient-to-br ${st.grad} shadow-md flex flex-col justify-between gap-2">
                <div>
                  <div class="text-base sm:text-lg font-extrabold">${st.hi}</div>
                  <div class="text-[11px] text-white/80">${st.name} • ${st.capital}</div>
                </div>
                <div class="flex items-center justify-between pt-2 border-t border-white/20 text-xs font-bold">
                  <span>${count} राज्य अपडेट</span>
                  <span>खोलें →</span>
                </div>
              </button>`;
          }).join('')}
        </div>
      </div>`;
    return;
  }

  // OTHER CATEGORY PAGES
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
    jobs: '💼 नई सरकारी नौकरी, Defence, Police & PSU भर्ती',
    loans: '💰 सरकारी लोन व सब्सिडी',
    archive: '🗄️ पुराना रिकॉर्ड (Permanent Archive)'
  };

  container.innerHTML = `
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg sm:text-xl font-extrabold">${titles[view] || 'अपडेट्स'}</h2>
      <span class="text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-800">${list.length} पोस्ट</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${list.length ? list.map(p => renderPostCard(p, 'indigo')).join('') : '<div class="card-surface p-8 rounded-2xl text-center text-sm opacity-80">इस श्रेणी में अभी कोई नया अपडेट उपलब्ध नहीं है।</div>'}
    </div>`;
}

// STATE HUB: Category-Wise & Department-Wise View Inside Selected State
function openStateHub(stateName) {
  const container = document.getElementById('content-feed');
  const livePosts = (PORTAL_DATA.posts || []).filter(p => getEffectiveStatus(p) !== 'Archive');
  const statePosts = livePosts.filter(p => p.state === stateName);
  const centralPosts = stateName === 'Central' ? [] : livePosts.filter(p => p.state === 'Central');

  const jobs = statePosts.filter(p => p.category === 'jobs');
  const schemes = statePosts.filter(p => p.category === 'schemes' || p.category === 'panchayat' || p.category === 'loans');

  container.innerHTML = `
    <div class="space-y-6">
      <div class="rounded-3xl p-5 bg-gradient-to-r from-slate-800 to-indigo-900 text-white shadow-lg flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-xl sm:text-2xl font-extrabold">🗺️ ${stateName} — राज्य पोर्टल</h2>
          <p class="text-xs text-slate-300 mt-1">श्रेणी व विभाग के अनुसार सभी योजनाएं और भर्तियां</p>
        </div>
        <button onclick="renderFeed('states')" class="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold">← सभी राज्य देखें</button>
      </div>

      <!-- State Specific Jobs -->
      <div class="space-y-3">
        <h3 class="font-extrabold text-base px-3 py-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-200">💼 ${stateName} — सरकारी नौकरी व भर्ती (${jobs.length})</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
           ${jobs.length ? jobs.map(p => renderPostCard(p, 'indigo')).join('') : '<div class="card-surface p-4 rounded-2xl text-xs opacity-75">इस राज्य की नई राज्य-स्तरीय भर्ती जल्द अपडेट होगी (Source Verification Pending)।</div>'}
        </div>
      </div>

      <!-- State Specific Schemes -->
      <div class="space-y-3">
        <h3 class="font-extrabold text-base px-3 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200">🏛️ ${stateName} — योजनाएं व ग्राम पंचायत (${schemes.length})</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${schemes.length ? schemes.map(p => renderPostCard(p, 'emerald')).join('') : '<div class="card-surface p-4 rounded-2xl text-xs opacity-75">इस राज्य की नई राज्य-स्तरीय योजनाएं जल्द जोड़ी जाएंगी।</div>'}
        </div>
      </div>

      <!-- Applicable Central Schemes in this State -->
      ${centralPosts.length ? `
        <div class="space-y-3 pt-2">
          <h3 class="font-extrabold text-base px-3 py-2 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200">🇮🇳 केंद्र सरकार की योजनाएं व भर्तियां (${stateName} के नागरिकों के लिए लागू)</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${centralPosts.slice(0, 6).map(p => renderPostCard(p, 'amber')).join('')}
          </div>
        </div>` : ''}
    </div>`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// CLEAN CARD: No Apply Button on Card -> Click anywhere to open Full Details Page
function renderPostCard(post, accent = 'indigo') {
  const effStatus = getEffectiveStatus(post);
  const dict = UI_STRINGS[CURRENT_LANG] || UI_STRINGS.hi;
  const borderAccent = {
    indigo: 'border-l-4 border-l-indigo-500',
    amber: 'border-l-4 border-l-amber-500',
    emerald: 'border-l-4 border-l-emerald-600',
    sky: 'border-l-4 border-l-sky-500'
  }[accent] || 'border-l-4 border-l-indigo-500';

  const statusBadge = effStatus === 'Archive'
    ? '<span class="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">Archive</span>'
    : '<span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">● LIVE</span>';

  return `
    <article onclick="openPostDetail('${post.id}')" class="card-surface tile-card ${borderAccent} cursor-pointer rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-sm">
      <div>
        <div class="flex flex-wrap items-center justify-between gap-1.5 text-[11px] font-bold mb-2">
          <div class="flex items-center gap-1.5">
            ${statusBadge}
            <span class="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">${post.state}</span>
          </div>
          <span class="text-[10px] opacity-70">🕒 ${formatPublishedDateTime(post)}</span>
        </div>
        <h3 class="font-extrabold text-base leading-snug mb-1.5">${post.title}</h3>
        <p class="text-xs opacity-80 line-clamp-2">${post.summary}</p>
      </div>
      <div class="flex items-center justify-between gap-2 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-xs">
        <span class="font-semibold text-amber-700 dark:text-amber-400">📅 अंतिम तिथि: ${post.lastDate}</span>
        <span class="font-bold text-indigo-700 dark:text-indigo-300">${dict.readMore}</span>
      </div>
    </article>`;
}

// FULL DETAILS PAGE (Apply Button ONLY at the Bottom)
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
        <div class="flex flex-wrap gap-2 text-xs font-bold mb-2.5">
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">${getEffectiveStatus(post)}</span>
          <span class="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">${post.state} • ${post.district}</span>
          <span class="opacity-75">🕒 Published: ${formatPublishedDateTime(post)}</span>
        </div>
        <h1 class="text-xl sm:text-2xl font-extrabold leading-tight">${post.title}</h1>
        <p class="text-sm opacity-85 mt-2">${post.summary}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div class="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/70"><b>विभाग (Department):</b><br/>${post.department}</div>
        <div class="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/70"><b>शुरुआत तिथि:</b><br/>${post.launchDate}</div>
        <div class="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200"><b>अंतिम तिथि (Last Date):</b><br/>${post.lastDate}</div>
      </div>

      <div class="space-y-4 text-sm leading-relaxed">
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
          <h3 class="font-extrabold text-base mb-1.5">💰 लाभ व वेतनमान (Benefits)</h3>
          <p>${post.benefits}</p>
        </div>
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
          <h3 class="font-extrabold text-base mb-1.5">✅ पात्रता की शर्तें (Eligibility)</h3>
          <ul class="list-disc pl-5 space-y-1">${post.eligibility.map(i => `<li>${i}</li>`).join('')}</ul>
        </div>
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
          <h3 class="font-extrabold text-base mb-1.5">📄 ज़रूरी दस्तावेज़ (Documents Required)</h3>
          <ul class="list-disc pl-5 space-y-1">${post.documents.map(i => `<li>${i}</li>`).join('')}</ul>
        </div>
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
          <h3 class="font-extrabold text-base mb-1.5">📝 ऑनलाइन आवेदन प्रक्रिया (How to Apply)</h3>
          <ol class="list-decimal pl-5 space-y-1">${post.steps.map(i => `<li>${i}</li>`).join('')}</ol>
        </div>
      </div>

      <!-- APPLY BUTTON AT THE BOTTOM OF FULL DETAILS -->
      <div class="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white space-y-3 shadow-lg">
        <p class="text-xs text-slate-200">💡 <b>पोर्टल पर जाकर क्या करें:</b> ${post.actionHint}</p>
        <div class="flex flex-wrap gap-3 pt-1">
          <a href="${post.directApplyUrl}" target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 font-extrabold text-sm shadow-md">
            🚀 Apply Now — आधिकारिक आवेदन फॉर्म खोलें ↗
          </a>
          <button onclick="window.print()" class="px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 font-bold text-xs">
            🖨️ CSC चेकलिस्ट प्रिंट / PDF
          </button>
        </div>
        <p class="text-[10px] text-slate-400 pt-1">* BharatSetu Live एक स्वतंत्र सूचना पोर्टल है। आवेदन केवल आधिकारिक सरकारी वेबसाइट पर ही करें।</p>
      </div>
    </div>

    <div class="mt-6">
      <h3 class="font-extrabold text-base mb-3">📌 इससे जुड़ी अन्य योजनाएं व भर्तियां</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${related.map(p => renderPostCard(p, 'indigo')).join('')}</div>
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
