let PORTAL_DATA = { lastUpdated: '', posts: [] };
let CURRENT_VIEW = 'home';
let CURRENT_LANG = localStorage.getItem('bs_lang') || 'hi';

// 12-Language UI Dictionary
const UI_STRINGS = {
  hi: { tagline:'भारत की सरकारी जानकारी, अब एक ही जगह', heroTitle:'भारत की सभी सरकारी योजनाएं, नई भर्ती और ग्राम पंचायत अपडेट', navHome:'होम', navSchemes:'योजनाएं', navPanchayat:'ग्राम पंचायत', navStates:'राज्य व जिला', navJobs:'नौकरी / PSU', navSeva:'सेवा केंद्र', navTools:'टूल्स', navArchive:'पुराना रिकॉर्ड', tileJobs:'सरकारी नौकरी', tileSchemes:'सरकारी योजनाएं', tilePanchayat:'ग्राम पंचायत हब', tileStates:'राज्य व जिला पोर्टल', tileSeva:'सरकारी सेवा केंद्र', tileLoans:'लोन व सब्सिडी', tileTools:'नागरिक टूल्स', tileArchive:'पुराना रिकॉर्ड', backHome:'होम पेज पर वापस जाएं', readMore:'पूरी जानकारी पढ़ें →', viewAll:'सभी देखें →', lastDateLbl:'अंतिम तिथि:', ongoingLbl:'चालू है (Ongoing)', secJobs:'नई सरकारी भर्ती (Defence, Police, PSU, Railway)', secSchemes:'प्रमुख सरकारी योजनाएं (Schemes)', secPanchayat:'ग्राम पंचायत व गाँव की योजनाएं', secLoans:'सरकारी लोन व सब्सिडी (Loans)', searchPh:'खोजें: Navy, Police, PM Kisan, MP, आवास, लोन...' },
  en: { tagline:'Every government update. One trusted bridge.', heroTitle:'All Indian Govt Schemes, Latest Jobs & Gram Panchayat Updates', navHome:'Home', navSchemes:'Schemes', navPanchayat:'Panchayat', navStates:'States', navJobs:'Jobs / PSU', navSeva:'Seva Kendra', navTools:'Tools', navArchive:'Archive', tileJobs:'Govt Jobs', tileSchemes:'Govt Schemes', tilePanchayat:'Gram Panchayat Hub', tileStates:'States & Districts', tileSeva:'Sarkari Seva Kendra', tileLoans:'Loans & Subsidy', tileTools:'Citizen Tools', tileArchive:'Permanent Archive', backHome:'Back to Home Page', readMore:'View Full Details →', viewAll:'View All →', lastDateLbl:'Last Date:', ongoingLbl:'Ongoing / Active', secJobs:'Latest Govt Jobs (Defence, Police, PSU, Railway)', secSchemes:'Major Government Schemes', secPanchayat:'Gram Panchayat & Rural Schemes', secLoans:'Government Loans & Subsidies', searchPh:'Search: Navy, Police, PM Kisan, MP, Loan...' },
  bn: { tagline:'ভারতের সরকারি তথ্য, এখন এক জায়গায়', heroTitle:'ভারতের সমস্ত সরকারি প্রকল্প, চাকরি ও গ্রাম পঞ্চায়েত আপডেট', navHome:'হোম', navSchemes:'প্রকল্প', navPanchayat:'পঞ্চায়েত', navStates:'রাজ্য', navJobs:'চাকরি', navSeva:'সেবা কেন্দ্র', navTools:'টুলস', navArchive:'আর্কাইভ', tileJobs:'সরকারি চাকরি', tileSchemes:'সরকারি প্রকল্প', tilePanchayat:'গ্রাম পঞ্চায়েত হাব', tileStates:'রাজ্য ও জেলা', tileSeva:'সরকারি সেবা কেন্দ্র', tileLoans:'লোন ও ভর্তুকি', tileTools:'নাগরিক টুলস', tileArchive:'পুরানো রেকর্ড', backHome:'হোম পেজে ফিরে যান', readMore:'বিস্তারিত দেখুন →', viewAll:'সব দেখুন →', lastDateLbl:'শেষ তারিখ:', ongoingLbl:'চলমান (Ongoing)', secJobs:'নতুন সরকারি চাকরি (Defence, Police, PSU)', secSchemes:'প্রধান সরকারি প্রকল্প', secPanchayat:'গ্রাম পঞ্চায়েত ও গ্রামীণ প্রকল্প', secLoans:'সরকারি লোন ও ভর্তুকি', searchPh:'খুঁজুন: Navy, Police, PM Kisan...' },
  mr: { tagline:'भारताची सरकारी माहिती, आता एकाच ठिकाणी', heroTitle:'भारतातील सर्व सरकारी योजना, नोकऱ्या आणि ग्रामपंचायत अपडेट्स', navHome:'होम', navSchemes:'योजना', navPanchayat:'ग्रामपंचायत', navStates:'राज्य', navJobs:'नोकरी', navSeva:'सेवा केंद्र', navTools:'टूल्स', navArchive:'जुने रेकॉर्ड', tileJobs:'सरकारी नोकरी', tileSchemes:'सरकारी योजना', tilePanchayat:'ग्रामपंचायत हब', tileStates:'राज्य व जिल्हा', tileSeva:'सरकारी सेवा केंद्र', tileLoans:'कर्ज व अनुदान', tileTools:'नागरिक टूल्स', tileArchive:'जुने रेकॉर्ड', backHome:'होम पेजवर परत जा', readMore:'संपूर्ण माहिती पहा →', viewAll:'सर्व पहा →', lastDateLbl:'अंतिम तारीख:', ongoingLbl:'सुरू आहे (Ongoing)', secJobs:'नवीन सरकारी भरती (Defence, Police, PSU)', secSchemes:'प्रमुख सरकारी योजना', secPanchayat:'ग्रामपंचायत व ग्रामीण योजना', secLoans:'सरकारी कर्ज व अनुदान', searchPh:'शोधा: Navy, Police, PM Kisan...' },
  gu: { tagline:'ભારતની સરકારી માહિતી, હવે એક જ જગ્યાએ', heroTitle:'ભારતની તમામ સરકારી યોજનાઓ, નોકરી અને ગ્રામ પંચાયત અપડેટ', navHome:'હોમ', navSchemes:'યોજનાઓ', navPanchayat:'પંચાયત', navStates:'રાજ્ય', navJobs:'નોકરી', navSeva:'સેવા કેન્દ્ર', navTools:'ટૂલ્સ', navArchive:'જૂનો રેકોર્ડ', tileJobs:'સરકારી નોકરી', tileSchemes:'સરકારી યોજનાઓ', tilePanchayat:'ગ્રામ પંચાયત હબ', tileStates:'રાજ્ય અને જિલ્લો', tileSeva:'સરકારી સેવા કેન્દ્ર', tileLoans:'લોન અને સબસિડી', tileTools:'નાગરિક ટૂલ્સ', tileArchive:'જૂનો રેકોર્ડ', backHome:'હોમ પેજ પર પાછા જાઓ', readMore:'સંપૂર્ણ વિગતો જુઓ →', viewAll:'બધું જુઓ →', lastDateLbl:'છેલ્લી તારીખ:', ongoingLbl:'ચાલુ છે (Ongoing)', secJobs:'નવી સરકારી ભરતી (Defence, Police, PSU)', secSchemes:'મુખ્ય સરકારી યોજનાઓ', secPanchayat:'ગ્રામ પંચાયત અને ગ્રામીણ યોજનાઓ', secLoans:'સરકારી લોન અને સબસિડી', searchPh:'શોધો: Navy, Police, PM Kisan...' },
  ta: { tagline:'இந்திய அரசு தகவல்கள், ஒரே இடத்தில்', heroTitle:'அனைத்து அரசு திட்டங்கள், வேலைகள் மற்றும் கிராம பஞ்சாயத்து தகவல்கள்', navHome:'முகப்பு', navSchemes:'திட்டங்கள்', navPanchayat:'பஞ்சாயத்து', navStates:'மாநிலம்', navJobs:'வேலைகள்', navSeva:'சேவை மையம்', navTools:'கருவிகள்', navArchive:'ஆவணங்கள்', tileJobs:'அரசு வேலைகள்', tileSchemes:'அரசு திட்டங்கள்', tilePanchayat:'கிராம பஞ்சாயத்து', tileStates:'மாநிலங்கள்', tileSeva:'அரசு சேவை மையம்', tileLoans:'கடன் & மானியம்', tileTools:'குடிமக்கள் கருவிகள்', tileArchive:'பழைய பதிவுகள்', backHome:'முகப்புக்குத் திரும்பு', readMore:'முழு விவரம் →', viewAll:'அனைத்தும் →', lastDateLbl:'கடைசி தேதி:', ongoingLbl:'நடைமுறையில் உள்ளது', secJobs:'புதிய அரசு வேலைகள்', secSchemes:'முக்கிய அரசு திட்டங்கள்', secPanchayat:'கிராம பஞ்சாயத்து திட்டங்கள்', secLoans:'அரசு கடன் & மானியம்', searchPh:'தேடுங்கள்: Navy, Police, PM Kisan...' },
  te: { tagline:'భారత ప్రభుత్వ సమాచారం, ఒకే చోట', heroTitle:'అన్ని ప్రభుత్వ పథకాలు, ఉద్యోగాలు మరియు గ్రామ పంచాయతీ అప్‌డేట్స్', navHome:'హోమ్', navSchemes:'పథకాలు', navPanchayat:'పంచాయతీ', navStates:'రాష్ట్రం', navJobs:'ఉద్యోగాలు', navSeva:'సేవా కేంద్రం', navTools:'టూల్స్', navArchive:'ఆర్కైవ్', tileJobs:'ప్రభుత్వ ఉద్యోగాలు', tileSchemes:'ప్రభుత్వ పథకాలు', tilePanchayat:'గ్రామ పంచాయతీ హబ్', tileStates:'రాష్ట్రాలు & జిల్లాలు', tileSeva:'ప్రభుత్వ సేవా కేంద్రం', tileLoans:'రుణాలు & సబ్సిడీ', tileTools:'పౌర సాధనాలు', tileArchive:'పాత రికార్డులు', backHome:'హోమ్ పేజీకి వెళ్ళండి', readMore:'పూర్తి వివరాలు →', viewAll:'అన్నీ చూడండి →', lastDateLbl:'చివరి తేదీ:', ongoingLbl:'కొనసాగుతోంది', secJobs:'తాజా ప్రభుత్వ ఉద్యోగాలు', secSchemes:'ప్రధాన ప్రభుత్వ పథకాలు', secPanchayat:'గ్రామ పంచాయతీ పథకాలు', secLoans:'ప్రభుత్వ రుణాలు & సబ్సిడీ', searchPh:'వెతకండి: Navy, Police, PM Kisan...' },
  kn: { tagline:'ಭಾರತದ ಸರ್ಕಾರಿ ಮಾಹಿತಿ, ಒಂದೇ ಕಡೆ', heroTitle:'ಎಲ್ಲಾ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ಉದ್ಯೋಗಗಳು ಮತ್ತು ಗ್ರಾಮ ಪಂಚಾಯತ್ ಅಪ್‌ಡೇಟ್‌ಗಳು', navHome:'ಮುಖಪುಟ', navSchemes:'ಯೋಜನೆಗಳು', navPanchayat:'ಪಂಚಾಯತ್', navStates:'ರಾಜ್ಯ', navJobs:'ಉದ್ಯೋಗ', navSeva:'ಸೇವಾ ಕೇಂದ್ರ', navTools:'ಟೂಲ್ಸ್', navArchive:'ಹಳೆಯ ದಾಖಲೆ', tileJobs:'ಸರ್ಕಾರಿ ಉದ್ಯೋಗ', tileSchemes:'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು', tilePanchayat:'ಗ್ರಾಮ ಪಂಚಾಯತ್ ಹಬ್', tileStates:'ರಾಜ್ಯ ಮತ್ತು ಜಿಲ್ಲೆ', tileSeva:'ಸರ್ಕಾರಿ ಸೇವಾ ಕೇಂದ್ರ', tileLoans:'ಸಾಲ ಮತ್ತು ಸಬ್ಸಿಡಿ', tileTools:'ನಾಗರಿಕ ಟೂಲ್ಸ್', tileArchive:'ಹಳೆಯ ದಾಖಲೆ', backHome:'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ', readMore:'ಪೂರ್ಣ ವಿವರ →', viewAll:'ಎಲ್ಲಾ ನೋಡಿ →', lastDateLbl:'ಕೊನೆಯ ದಿನಾಂಕ:', ongoingLbl:'ಚಾಲ್ತಿಯಲ್ಲಿದೆ', secJobs:'ಹೊಸ ಸರ್ಕಾರಿ ಉದ್ಯೋಗಗಳು', secSchemes:'ಪ್ರಮುಖ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು', secPanchayat:'ಗ್ರಾಮ ಪಂಚಾಯತ್ ಯೋಜನೆಗಳು', secLoans:'ಸರ್ಕಾರಿ ಸಾಲ ಮತ್ತು ಸಬ್ಸಿಡಿ', searchPh:'ಹುಡುಕಿ: Navy, Police, PM Kisan...' },
  ml: { tagline:'ഇന്ത്യൻ സർക്കാർ വിവരങ്ങൾ, ഒരിടത്ത്', heroTitle:'എല്ലാ സർക്കാർ പദ്ധതികളും ജോലികളും ഗ്രാമപഞ്ചായത്ത് അപ്ഡേറ്റുകളും', navHome:'ഹോം', navSchemes:'പദ്ധതികൾ', navPanchayat:'പഞ്ചായത്ത്', navStates:'സംസ്ഥാനം', navJobs:'ജോലികൾ', navSeva:'സേവാ കേന്ദ്രം', navTools:'ടൂളുകൾ', navArchive:'ആർക്കൈവ്', tileJobs:'സർക്കാർ ജോലികൾ', tileSchemes:'സർക്കാർ പദ്ധതികൾ', tilePanchayat:'ഗ്രാമപഞ്ചായത്ത് ഹബ്', tileStates:'സംസ്ഥാനങ്ങൾ', tileSeva:'സർക്കാർ സേവാ കേന്ദ്രം', tileLoans:'ലോൺ & സബ്സിഡി', tileTools:'പൗര ടൂളുകൾ', tileArchive:'പഴയ രേഖകൾ', backHome:'ഹോം പേജിലേക്ക് മടങ്ങുക', readMore:'പൂർണ്ണ വിവരങ്ങൾ →', viewAll:'എല്ലാം കാണുക →', lastDateLbl:'അവസാന തീയതി:', ongoingLbl:'നിലവിലുണ്ട്', secJobs:'പുതിയ സർക്കാർ ജോലികൾ', secSchemes:'പ്രധാന സർക്കാർ പദ്ധതികൾ', secPanchayat:'ഗ്രാമപഞ്ചായത്ത് പദ്ധതികൾ', secLoans:'സർക്കാർ ലോൺ & സബ്സിഡി', searchPh:'തിരയുക: Navy, Police, PM Kisan...' },
  pa: { tagline:'ਭਾਰਤ ਦੀ ਸਰਕਾਰੀ ਜਾਣਕਾਰੀ, ਹੁਣ ਇੱਕੋ ਥਾਂ', heroTitle:'ਭਾਰਤ ਦੀਆਂ ਸਾਰੀਆਂ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ, ਨੌਕਰੀਆਂ ਅਤੇ ਗ੍ਰਾਮ ਪੰਚਾਇਤ ਅਪਡੇਟ', navHome:'ਹੋਮ', navSchemes:'ਯੋਜਨਾਵਾਂ', navPanchayat:'ਪੰਚਾਇਤ', navStates:'ਰਾਜ', navJobs:'ਨੌਕਰੀ', navSeva:'ਸੇਵਾ ਕੇਂਦਰ', navTools:'ਟੂਲਸ', navArchive:'ਪੁਰਾਣਾ ਰਿਕਾਰਡ', tileJobs:'ਸਰਕਾਰੀ ਨੌਕਰੀ', tileSchemes:'ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ', tilePanchayat:'ਗ੍ਰਾਮ ਪੰਚਾਇਤ ਹੱਬ', tileStates:'ਰਾਜ ਅਤੇ ਜ਼ਿਲ੍ਹਾ', tileSeva:'ਸਰਕਾਰੀ ਸੇਵਾ ਕੇਂਦਰ', tileLoans:'ਲੋਨ ਅਤੇ ਸਬਸਿਡੀ', tileTools:'ਨਾਗਰਿਕ ਟੂਲਸ', tileArchive:'ਪੁਰਾਣਾ ਰਿਕਾਰਡ', backHome:'ਹੋਮ ਪੇਜ ਤੇ ਵਾਪਸ ਜਾਓ', readMore:'ਪੂਰੀ ਜਾਣਕਾਰੀ →', viewAll:'ਸਭ ਦੇਖੋ →', lastDateLbl:'ਆਖਰੀ ਮਿਤੀ:', ongoingLbl:'ਚੱਲ ਰਹੀ ਹੈ', secJobs:'ਨਵੀਂ ਸਰਕਾਰੀ ਭਰਤੀ', secSchemes:'ਮੁੱਖ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ', secPanchayat:'ਗ੍ਰਾਮ ਪੰਚਾਇਤ ਯੋਜਨਾਵਾਂ', secLoans:'ਸਰਕਾਰੀ ਲੋਨ ਅਤੇ ਸਬਸਿਡੀ', searchPh:'ਖੋਜੋ: Navy, Police, PM Kisan...' },
  or: { tagline:'ଭାରତର ସରକାରୀ ସୂଚନା, ଏବେ ଗୋଟିଏ ସ୍ଥାନରେ', heroTitle:'ଭାରତର ସମସ୍ତ ସରକାରୀ ଯୋଜନା, ଚାକିରି ଏବଂ ଗ୍ରାମ ପଞ୍ଚାୟତ ଅପଡେଟ୍', navHome:'ହୋମ୍', navSchemes:'ଯୋଜନା', navPanchayat:'ପଞ୍ଚାୟତ', navStates:'ରାଜ୍ୟ', navJobs:'ଚାକିରି', navSeva:'ସେବା କେନ୍ଦ୍ର', navTools:'ଟୁଲ୍ସ', navArchive:'ପୁରୁଣା ରେକର୍ଡ', tileJobs:'ସରକାରୀ ଚାକିରି', tileSchemes:'ସରକାରୀ ଯୋଜନା', tilePanchayat:'ଗ୍ରାମ ପଞ୍ଚାୟତ ହବ୍', tileStates:'ରାଜ୍ୟ ଓ ଜିଲ୍ଲା', tileSeva:'ସରକାରୀ ସେବା କେନ୍ଦ୍ର', tileLoans:'ଋଣ ଓ ସବସିଡି', tileTools:'ନାଗରିକ ଟୁଲ୍ସ', tileArchive:'ପୁରୁଣା ରେକର୍ଡ', backHome:'ହୋମ୍ ପେଜକୁ ଫେରନ୍ତୁ', readMore:'ସମ୍ପୂର୍ଣ୍ଣ ବିବରଣୀ →', viewAll:'ସବୁ ଦେଖନ୍ତୁ →', lastDateLbl:'ଶେଷ ତାରିଖ:', ongoingLbl:'ଚାଲୁ ଅଛି', secJobs:'ନୂଆ ସରକାରୀ ଚାକିରି', secSchemes:'ପ୍ରମୁଖ ସରକାରୀ ଯୋଜନା', secPanchayat:'ଗ୍ରାମ ପଞ୍ଚାୟତ ଯୋଜନା', secLoans:'ସରକାରୀ ଋଣ ଓ ସବସିଡି', searchPh:'ଖୋଜନ୍ତୁ: Navy, Police, PM Kisan...' },
  as: { tagline:'ভাৰতৰ চৰকাৰী তথ্য, এতিয়া একেলগে', heroTitle:'ভাৰতৰ সকলো চৰকাৰী আঁচনি, চাকৰি আৰু গাঁও পঞ্চায়ত আপডেট', navHome:'হোম', navSchemes:'আঁচনি', navPanchayat:'পঞ্চায়ত', navStates:'ৰাজ্য', navJobs:'চাকৰি', navSeva:'সেৱা কেন্দ্ৰ', navTools:'টুলছ', navArchive:'পুৰণি ৰেকৰ্ড', tileJobs:'চৰকাৰী চাকৰি', tileSchemes:'চৰকাৰী আঁচনি', tilePanchayat:'গাঁও পঞ্চায়ত হাব', tileStates:'ৰাজ্য আৰু জিলা', tileSeva:'চৰকাৰী সেৱা কেন্দ্ৰ', tileLoans:'ঋণ আৰু ৰাজসাহায্য', tileTools:'নাগৰিক টুলছ', tileArchive:'পুৰণি ৰেকৰ্ড', backHome:'হোম পেজলৈ ঘূৰি যাওক', readMore:'সম্পূৰ্ণ বিৱৰণ →', viewAll:'সকলো চাওক →', lastDateLbl:'অন্তিম তাৰিখ:', ongoingLbl:'চলি আছে', secJobs:'নতুন চৰকাৰী চাকৰি', secSchemes:'মুখ্য চৰকাৰী আঁচনি', secPanchayat:'গাঁও পঞ্চায়ত আঁচনি', secLoans:'চৰকাৰী ঋণ আৰু ৰাজসাহায্য', searchPh:'সন্ধান কৰক: Navy, Police, PM Kisan...' }
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

function formatDeadline(post) {
  const dict = UI_STRINGS[CURRENT_LANG] || UI_STRINGS.hi;
  if (!post.lastDate || post.lastDate === '2026-12-31') {
    return dict.ongoingLbl;
  }
  return `${dict.lastDateLbl} ${post.lastDate}`;
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
  const dict = UI_STRINGS[CURRENT_LANG] || UI_STRINGS.hi;

  // Search Mode
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    const matched = allPosts.filter(p =>
      (p.title + ' ' + p.summary + ' ' + p.state + ' ' + p.district + ' ' + p.department + ' ' + (p.keywords || []).join(' '))
        .toLowerCase().includes(q)
    );
    container.innerHTML = `
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-extrabold">🔍 "${searchQuery}"</h2>
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-800">${matched.length} पोस्ट</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${matched.length ? matched.map(p => renderPostCard(p, 'indigo')).join('') : '<div class="card-surface p-6 rounded-2xl text-sm">कोई परिणाम नहीं मिला।</div>'}
      </div>`;
    return;
  }

  // HOME PAGE: Balanced Even Grids (6 Jobs, 4 Schemes, 4 Panchayat, 2/4 Loans)
  if (view === 'home') {
    const livePosts = allPosts.filter(p => getEffectiveStatus(p) !== 'Archive');
    const jobs = livePosts.filter(p => p.category === 'jobs');
    const schemes = livePosts.filter(p => p.category === 'schemes');
    const panchayat = livePosts.filter(p => p.isPanchayat || p.category === 'panchayat');
    const loans = livePosts.filter(p => p.category === 'loans');

    container.innerHTML = `
      <div class="space-y-7">
        <!-- 1. HIGHLIGHTED LATEST JOBS -->
        <div class="rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-slate-800 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-500/30">
          <div class="flex items-center justify-between gap-2 mb-4">
            <div class="flex items-center gap-2.5">
              <span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-extrabold">🔥 NEW</span>
              <h2 class="text-base sm:text-xl font-extrabold tracking-tight">${dict.secJobs}</h2>
            </div>
            <button onclick="navigate('jobs')" class="text-xs font-bold bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-xl shrink-0">${dict.viewAll}</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-[#0F172A] dark:text-[#F8FAFC]">
            ${jobs.slice(0, 6).map(p => renderPostCard(p, 'indigo')).join('')}
          </div>
        </div>

        <!-- 2. SARKARI YOJANA (Balanced 4 Cards on Home) -->
        <div class="space-y-3">
          <div class="flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md">
            <h2 class="font-extrabold text-base sm:text-lg">🏛️ ${dict.secSchemes}</h2>
            <button onclick="navigate('schemes')" class="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg">${dict.viewAll}</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${schemes.slice(0, 4).map(p => renderPostCard(p, 'amber')).join('')}
          </div>
        </div>

        <!-- 3. GRAM PANCHAYAT HUB (Balanced 4 Cards on Home) -->
        <div class="space-y-3">
          <div class="flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md">
            <h2 class="font-extrabold text-base sm:text-lg">🏡 ${dict.secPanchayat}</h2>
            <button onclick="navigate('panchayat')" class="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg">${dict.viewAll}</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${panchayat.slice(0, 4).map(p => renderPostCard(p, 'emerald')).join('')}
          </div>
        </div>

        <!-- 4. LOANS & SUBSIDY -->
        <div class="space-y-3">
          <div class="flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-md">
            <h2 class="font-extrabold text-base sm:text-lg">💰 ${dict.secLoans}</h2>
            <button onclick="navigate('loans')" class="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg">${dict.viewAll}</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${loans.slice(0, 2).map(p => renderPostCard(p, 'sky')).join('')}
          </div>
        </div>
      </div>`;
    return;
  }

  // STATES EXPLORER
  if (view === 'states') {
    container.innerHTML = `
      <div class="space-y-5">
        <div>
          <h2 class="text-xl font-extrabold">🗺️ ${dict.tileStates}</h2>
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
    schemes: '🏛️ ' + dict.secSchemes,
    panchayat: '🏡 ' + dict.secPanchayat,
    jobs: '💼 ' + dict.secJobs,
    loans: '💰 ' + dict.secLoans,
    archive: '🗄️ ' + dict.tileArchive
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

      <div class="space-y-3">
        <h3 class="font-extrabold text-base px-3 py-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-200">💼 ${stateName} — सरकारी नौकरी व भर्ती (${jobs.length})</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${jobs.length ? jobs.map(p => renderPostCard(p, 'indigo')).join('') : '<div class="card-surface p-4 rounded-2xl text-xs opacity-75">इस राज्य की नई राज्य-स्तरीय भर्ती जल्द अपडेट होगी।</div>'}
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="font-extrabold text-base px-3 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200">🏛️ ${stateName} — योजनाएं व ग्राम पंचायत (${schemes.length})</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${schemes.length ? schemes.map(p => renderPostCard(p, 'emerald')).join('') : '<div class="card-surface p-4 rounded-2xl text-xs opacity-75">इस राज्य की नई राज्य-स्तरीय योजनाएं जल्द जोड़ी जाएंगी।</div>'}
        </div>
      </div>

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
        <span class="font-semibold text-amber-700 dark:text-amber-400">📅 ${formatDeadline(post)}</span>
        <span class="font-bold text-indigo-700 dark:text-indigo-300">${dict.readMore}</span>
      </div>
    </article>`;
}

// Helper: Rich Category-Specific Detailed Sections & FAQs for Every Post
function buildRichContext(post) {
  const isJob = post.category === 'jobs';
  const isLoan = post.category === 'loans';
  const isPanchayat = post.category === 'panchayat' || post.isPanchayat;

  const extraSteps = isJob
    ? [
        'नीचे दिए गए आधिकारिक पोर्टल लिंक पर जाकर पहले नवीनतम आधिकारिक नोटिफिकेशन (PDF) डाउनलोड कर ध्यान से पढ़ें।',
        'नए यूज़र के रूप में अपना One-Time Registration (OTR) या Candidate Account बनाएं और मोबाइल/ईमेल वेरीफाई करें।',
        'अपनी व्यक्तिगत जानकारी, शैक्षणिक योग्यता और पता सही-सही भरें तथा स्पष्ट पासपोर्ट फोटो व हस्ताक्षर अपलोड करें।',
        'यदि आवेदन शुल्क लागू हो तो ऑनलाइन (UPI / Net Banking / Card) माध्यम से भुगतान करें।',
        'फाइनल सबमिट करने के बाद आवेदन फॉर्म की प्रिंट या PDF कॉपी भविष्य के लिए सुरक्षित रख लें।'
      ]
    : isLoan
    ? [
        'नीचे दिए गए आधिकारिक पोर्टल लिंक पर जाकर अपनी लोन श्रेणी व पात्रता (Eligibility) ऑनलाइन जांचें।',
        'अपने मोबाइल नंबर से रजिस्ट्रेशन करें और व्यवसाय/कृषि विवरण व आवश्यक लोन राशि का चयन करें।',
        'आवश्यक KYC व आय/व्यापार दस्तावेज़ अपलोड करके ऑनलाइन आवेदन सबमिट करें।',
        'डिजिटल अप्रूवल या इन-प्रिंसिपल लेटर मिलने के बाद संबंधित बैंक शाखा में दस्तावेज़ सत्यापन पूरा करें।'
      ]
    : [
        'आवेदन करने से पहले सुनिश्चित करें कि आपका बैंक खाता आधार व DBT (Direct Benefit Transfer) से लिंक हो।',
        'नीचे दिए गए आधिकारिक सरकारी पोर्टल पर जाएं और नया रजिस्ट्रेशन / लाभार्थी लॉगिन विकल्प चुनें।',
        'मांगी गई सभी जानकारी (नाम, पता, परिवार/भूमि या राशन विवरण) सही-सही भरें व e-KYC प्रक्रिया पूरी करें।',
        'ऑनलाइन आवेदन में समस्या आने पर आप अपने नजदीकी CSC (जनसेवा केंद्र) या ग्राम पंचायत सचिव की मदद भी ले सकते हैं।',
        'सबमिट करने के बाद मिलने वाला रजिस्ट्रेशन नंबर / रसीद संभाल कर रखें ताकि बाद में स्टेटस चेक किया जा सके।'
      ];

  const extraEligibility = isJob
    ? ['आवेदक भारत का नागरिक होना चाहिए तथा आधिकारिक विज्ञापन में निर्धारित आयु सीमा व शैक्षणिक योग्यता पूरी करता हो।', 'आरक्षित वर्ग (SC/ST/OBC/EWS/Ex-Servicemen) को सरकारी नियमानुसार आयु सीमा में छूट देय होगी।']
    : isPanchayat
    ? ['लाभार्थी का नाम संबंधित ग्राम पंचायत / स्थानीय निकाय के रिकॉर्ड में दर्ज होना चाहिए।', 'परिवार के पास वैध पहचान पत्र व सक्रिय बैंक खाता (DBT सक्षम) होना आवश्यक है।']
    : ['आवेदक संबंधित राज्य / भारत का स्थायी निवासी होना चाहिए।', 'लाभ राशि सीधे बैंक खाते में प्राप्त करने के लिए आधार सीडिंग (e-KYC) अनिवार्य है।'];

  const extraDocs = isJob
    ? ['वैध पहचान पत्र (आधार / वोटर आईडी / पैन)', 'सक्रिय मोबाइल नंबर एवं ईमेल आईडी', 'जाति / निवास / EWS प्रमाण पत्र (यदि लागू हो)']
    : ['आधार से जुड़ा सक्रिय मोबाइल नंबर (OTP सत्यापन के लिए)', 'पासपोर्ट साइज रंगीन फोटो', 'बैंक पासबुक की प्रति (IFSC कोड सहित)'];

  const faqs = isJob
    ? [
        { q: 'इस भर्ती के लिए आवेदन कैसे करें?', a: 'आवेदन केवल संबंधित विभाग की आधिकारिक वेबसाइट के माध्यम से ऑनलाइन किया जा सकता है। सीधा लिंक नीचे दिया गया है।' },
        { q: 'चयन प्रक्रिया और परीक्षा तिथि की जानकारी कहाँ मिलेगी?', a: 'चयन प्रक्रिया, सिलेबस और एडमिट कार्ड की नवीनतम सूचना आधिकारिक पोर्टल के Notification सेक्शन में जारी की जाती है।' },
        { q: 'क्या BharatSetu Live पर कोई फॉर्म या फीस जमा करनी होती है?', a: 'नहीं, यह केवल एक सूचना पोर्टल है। आपको अपनी जानकारी व शुल्क केवल आधिकारिक सरकारी पोर्टल पर ही भरना है।' }
      ]
    : [
        { q: 'इस योजना का लाभ सीधे बैंक खाते में कैसे आता है?', a: 'सत्यापन और e-KYC पूरा होने के बाद सरकार द्वारा सहायता राशि सीधे लाभार्थी के DBT-लिंक्ड बैंक खाते में भेजी जाती है।' },
        { q: 'क्या आवेदन के लिए CSC केंद्र जाना ज़रूरी है?', a: 'अधिकांश योजनाओं में आप घर बैठे मोबाइल से ऑनलाइन आवेदन कर सकते हैं, लेकिन बायोमेट्रिक e-KYC के लिए नजदीकी CSC केंद्र की सहायता ली जा सकती है।' },
        { q: 'आवेदन की स्थिति (Status) कैसे चेक करें?', a: 'आधिकारिक पोर्टल पर जाकर अपने रजिस्ट्रेशन नंबर या मोबाइल नंबर के माध्यम से आप कभी भी आवेदन का स्टेटस देख सकते हैं।' }
      ];

  return { extraSteps, extraEligibility, extraDocs, faqs };
}

// FULL DETAILED POST PAGE (Rich Overview + Complete Guide + FAQs + Bottom Apply)
function openPostDetail(id) {
  const post = PORTAL_DATA.posts.find(p => p.id === id);
  if (!post) return;
  const hero = document.getElementById('home-hero');
  const backBar = document.getElementById('inner-back-bar');
  if (hero) hero.classList.add('hidden');
  if (backBar) backBar.classList.remove('hidden');

  const container = document.getElementById('content-feed');
  const related = PORTAL_DATA.posts.filter(p => p.id !== id && p.category === post.category).slice(0, 4);
  const { extraSteps, extraEligibility, extraDocs, faqs } = buildRichContext(post);

  const allEligibility = [...(post.eligibility || []), ...extraEligibility];
  const allDocs = [...(post.documents || []), ...extraDocs];
  const allSteps = [...(post.steps || []), ...extraSteps];

  const shareText = encodeURIComponent(`${post.title}\nपूरी जानकारी और आधिकारिक लिंक यहाँ देखें: ${location.origin}/#home`);

  container.innerHTML = `
    <article class="card-surface rounded-3xl overflow-hidden shadow-lg">
      <!-- Top Colored Header Banner -->
      <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-7 space-y-3">
        <div class="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-extrabold">● ${getEffectiveStatus(post)}</span>
          <span class="px-2.5 py-0.5 rounded-full bg-white/15 text-white">${post.state} • ${post.district}</span>
          <span class="text-slate-300">🕒 Published: ${formatPublishedDateTime(post)}</span>
        </div>
        <h1 class="text-xl sm:text-3xl font-extrabold leading-snug">${post.title}</h1>
        <p class="text-sm text-slate-200 leading-relaxed">${post.summary}</p>
      </div>

      <div class="p-5 sm:p-7 space-y-6">
        <!-- 1. Quick Overview Table (Sarkari Result Style) -->
        <div>
          <h2 class="font-extrabold text-base sm:text-lg mb-3 flex items-center gap-2">📋 संक्षिप्त विवरण (Quick Overview)</h2>
          <div class="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm">
            <table class="w-full text-left border-collapse">
              <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                <tr class="bg-slate-50 dark:bg-slate-800/50">
                  <th class="p-3 font-bold w-2/5">योजना / भर्ती का नाम</th>
                  <td class="p-3 font-semibold">${post.title}</td>
                </tr>
                <tr>
                  <th class="p-3 font-bold">संबंधित विभाग (Department)</th>
                  <td class="p-3">${post.department}</td>
                </tr>
                <tr class="bg-slate-50 dark:bg-slate-800/50">
                  <th class="p-3 font-bold">राज्य / क्षेत्र (Level)</th>
                  <td class="p-3">${post.state} (${post.district})</td>
                </tr>
                <tr>
                  <th class="p-3 font-bold">आवेदन का माध्यम (Mode)</th>
                  <td class="p-3">Online (आधिकारिक सरकारी पोर्टल / CSC)</td>
                </tr>
                <tr class="bg-slate-50 dark:bg-slate-800/50">
                  <th class="p-3 font-bold">शुरुआत तिथि (Launch Date)</th>
                  <td class="p-3">${post.launchDate}</td>
                </tr>
                <tr>
                  <th class="p-3 font-bold">अंतिम तिथि / स्थिति</th>
                  <td class="p-3 font-extrabold text-amber-600 dark:text-amber-400">${formatDeadline(post)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 2. Benefits & Features -->
        <div class="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
          <h2 class="font-extrabold text-base sm:text-lg text-emerald-900 dark:text-emerald-300">💰 मुख्य लाभ एवं विशेषताएं (Benefits & Highlights)</h2>
          <p class="text-sm leading-relaxed">${post.benefits}</p>
          <p class="text-xs opacity-80">इस योजना/भर्ती के अंतर्गत पात्र नागरिकों को सरकारी नियमानुसार पारदर्शी तरीके से सीधा लाभ व सुविधाएं प्रदान की जाती हैं।</p>
        </div>

        <!-- 3. Eligibility & Documents (2-Column Grid on Desktop) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h2 class="font-extrabold text-base text-indigo-800 dark:text-indigo-300">✅ पात्रता की शर्तें (Eligibility Criteria)</h2>
            <ul class="space-y-2 text-sm">
              ${allEligibility.map(i => `<li class="flex items-start gap-2"><span class="text-emerald-600 font-bold">✔</span><span>${i}</span></li>`).join('')}
            </ul>
          </div>

          <div class="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h2 class="font-extrabold text-base text-indigo-800 dark:text-indigo-300">📄 ज़रूरी दस्तावेज़ (Documents Checklist)</h2>
            <ul class="space-y-2 text-sm">
              ${allDocs.map(i => `<li class="flex items-start gap-2"><span class="text-indigo-600 font-bold">▪</span><span>${i}</span></li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- 4. Detailed Step-by-Step Application Process -->
        <div class="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
          <h2 class="font-extrabold text-base sm:text-lg">📝 ऑनलाइन आवेदन कैसे करें? (Step-by-Step Guide)</h2>
          <ol class="space-y-2.5 text-sm">
            ${allSteps.map((step, idx) => `
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">${idx + 1}</span>
                <span class="leading-relaxed">${step}</span>
              </li>`).join('')}
          </ol>
        </div>

        <!-- 5. Important Safety & Verification Notice -->
        <div class="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs sm:text-sm space-y-1.5">
          <h3 class="font-extrabold text-amber-900 dark:text-amber-300">⚠️ महत्वपूर्ण निर्देश एवं सावधानी (Important Notice)</h3>
          <p class="opacity-90">• आवेदन करते समय केवल आधिकारिक सरकारी वेबसाइट (<code>.gov.in</code> / <code>.nic.in</code>) का ही उपयोग करें।</p>
          <p class="opacity-90">• किसी भी अनजान व्यक्ति के साथ अपना OTP, बैंक पिन या पासवर्ड कभी साझा न करें।</p>
        </div>

        <!-- 6. FAQs Section -->
        <div class="space-y-2.5">
          <h2 class="font-extrabold text-base sm:text-lg">❓ अक्सर पूछे जाने वाले सवाल (FAQs)</h2>
          <div class="space-y-2">
            ${faqs.map(f => `
              <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <p class="font-bold text-sm">प्र. ${f.q}</p>
                <p class="text-xs sm:text-sm opacity-85 mt-1">उ. ${f.a}</p>
              </div>`).join('')}
          </div>
        </div>

        <!-- 7. BOTTOM OFFICIAL APPLY BOX -->
        <div class="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white space-y-3.5 shadow-xl">
          <p class="text-xs sm:text-sm text-emerald-300 font-semibold">💡 पोर्टल पर जाकर क्या करें: <span class="text-white font-normal">${post.actionHint}</span></p>
          <div class="flex flex-wrap gap-3 pt-1">
            <a href="${post.directApplyUrl}" target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 font-extrabold text-sm shadow-md">
              🚀 Apply Now — आधिकारिक आवेदन फॉर्म खोलें ↗
            </a>
            <button onclick="window.print()" class="px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 font-bold text-xs">
              🖨️ प्रिंट / PDF सेव करें
            </button>
            <a href="https://wa.me/?text=${shareText}" target="_blank" rel="noopener noreferrer" class="px-4 py-3 rounded-xl bg-green-600 hover:bg-green-700 font-bold text-xs">
              📲 WhatsApp पर शेयर करें
            </a>
          </div>
          <p class="text-[11px] text-slate-400 pt-1">* BharatSetu Live एक स्वतंत्र सूचना पोर्टल है। आवेदन करने से पहले आधिकारिक वेबसाइट पर सभी शर्तों की पुष्टि अवश्य करें।</p>
        </div>
      </div>
    </article>

    <div class="mt-6">
      <h3 class="font-extrabold text-base mb-3">📌 इससे जुड़ी अन्य योजनाएं व भर्तियां</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${(related.length ? related : PORTAL_DATA.posts.slice(0, 4)).map(p => renderPostCard(p, 'indigo')).join('')}</div>
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
