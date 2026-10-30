/* Neem Karoli Trip: all page features (planner, Ask the guide, crowd meter, filters, analytics consent...).
   Each part runs on its own, so a mistake in one part cannot stop the others. */

var NKT_PARTS = [];

/* ===== part 1 ===== */
NKT_PARTS.push(function () {
try {
(function(){
  /* ------------------------------------------------------------
     BOOKING LINKS — swap these for your affiliate links later.
     ------------------------------------------------------------ */
  var LINKS = {
    stays: "https://www.booking.com/searchresults.html?ss=Bhowali%2C+Uttarakhand%2C+India",
    staysNainital: "https://www.booking.com/searchresults.html?ss=Nainital%2C+Uttarakhand%2C+India",
    trains: "https://www.irctc.co.in/nget/train-search",
    buses: "https://www.redbus.in/",
    cabs: "https://www.makemytrip.com/cabs/"
  };

  /* ------------------------------------------------------------
     COST ASSUMPTIONS (rupees). Edit here if prices change.
     Tier index: 0 = budget, 1 = comfortable, 2 = premium
     ------------------------------------------------------------ */
  var FROM = {
    delhi:     {km:310, en:"Delhi / NCR",          hi:"दिल्ली / NCR",          far:true,  toll:600},
    lucknow:   {km:420, en:"Lucknow",              hi:"लखनऊ",                 far:true,  toll:700},
    kathgodam: {km:40,  en:"Kathgodam / Haldwani", hi:"काठगोदाम / हल्द्वानी", far:false, toll:0},
    nainital:  {km:17,  en:"Nainital",             hi:"नैनीताल",              far:false, toll:0}
  };
  var TRAIN = {delhi:[350,900,1500], lucknow:[350,1000,1700]};   // per person, one way
  var BUS   = {delhi:[500,900,1400], lucknow:[700,1100,1600]};   // per person, one way
  var HILL_TAXI = {kathgodam:{sedan:2100,suv:3200}, nainital:{sedan:1000,suv:1500}}; // per vehicle, one way
  var DAY_HIRE = {sedan:2500, suv:3500};       // sightseeing taxi, per vehicle per day
  var CAB_KM = {sedan:12, suv:16};             // outstation cab, per km
  var DRIVER_NIGHT = 400;
  var FUEL_KM = 7, PARKING_DAY = 150;
  var ROOM = [1800,3500,7000];                 // per room per night (2 per room)
  var FOOD = [500,900,1600];                   // per person per day
  var MISC = 250;                              // shuttle, parking, prasad, per person

  var T = {
    en:{
      est:"Estimated total", range:"Likely range", pp:"per person", travel:"Travel to and back",
      hill:"Taxi up the hill and back", sights:"Sightseeing", stay:"Stay", food:"Food",
      misc:"Shuttle, parking, prasad and small costs", plan:"Your plan", day:"Day",
      rooms:function(r,n){return r+(r>1?" rooms":" room")+" × "+n+(n>1?" nights":" night");},
      people:function(p){return p+(p>1?" people":" person");},
      vehicle:function(v){return v.count+" "+(v.type==="suv"?"SUV":"sedan")+(v.count>1?"s":"");},
      cars:function(c){return c+" car"+(c>1?"s":"")+", fuel, tolls and parking";},
      bookStay:"Check rooms", bookTrain:"Book train (IRCTC)", bookBus:"Find buses", bookCab:"Find cabs",
      share:"Share plan on WhatsApp", shareHead:"My Kainchi Dham trip plan",
      dayTripNote:"Day trip: no hotel needed."
    },
    hi:{
      est:"अनुमानित कुल खर्च", range:"संभावित रेंज", pp:"प्रति व्यक्ति", travel:"आने-जाने का किराया",
      hill:"पहाड़ तक टैक्सी (आना-जाना)", sights:"आसपास घूमना", stay:"ठहरना", food:"खाना",
      misc:"शटल, पार्किंग, प्रसाद व छोटे खर्च", plan:"आपका प्लान", day:"दिन",
      rooms:function(r,n){return r+" कमरा × "+n+" रात";},
      people:function(p){return p+" लोग";},
      vehicle:function(v){return v.count+" "+(v.type==="suv"?"एसयूवी":"सेडान");},
      cars:function(c){return c+" गाड़ी, पेट्रोल, टोल और पार्किंग";},
      bookStay:"कमरे देखें", bookTrain:"ट्रेन बुक करें (IRCTC)", bookBus:"बसें देखें", bookCab:"कैब देखें",
      share:"WhatsApp पर प्लान भेजें", shareHead:"मेरा कैंची धाम यात्रा प्लान",
      dayTripNote:"एक दिन की यात्रा: होटल की ज़रूरत नहीं।"
    }
  };

  var S = { /* itinerary sentences */
    en:{
      trainDelhiGo:"Take the Ranikhet Express (15013) from Old Delhi at 22:05; it reaches Kathgodam at 05:05. Prefer daytime? The Shatabdi (12040) leaves New Delhi at 06:20 and arrives at 11:55.",
      trainLkoGo:"Take the Lucknow–Kathgodam Express. It does not run daily, so check days and times on IRCTC.",
      busGo:"Take an overnight bus to Haldwani or Kathgodam.",
      hillUp:"Taxi up the hill to your stay, about 1–1.5 hours.",
      carDelhiGo:"Leave by 4–5 AM. Route: Delhi, Moradabad, Rampur, Haldwani, then Bhimtal or Bhowali. About 310 km, 6–8 hours with breaks.",
      carLkoGo:"Leave early; it is over 400 km. Break the drive at Haldwani if you are tired, and avoid hill roads after dark.",
      cabFarGo:"Your cab picks you up early morning. About 6–8 hours from Delhi; longer from Lucknow.",
      localGo:"Short taxi or drive to Kainchi Dham: about 1–1.5 hours from Kathgodam, 40 minutes from Nainital.",
      checkin:"Check in, rest, and keep the evening light. Ask your hotel where today's shuttle parking is.",
      darshan:"Be at the parking or shuttle point by 7 AM. Weekday mornings are the calmest.",
      darshan2:"Darshan takes about 1–2 hours with the queue; much longer on weekends. No photos inside.",
      after:"After darshan, visit Golu Devta temple at Ghorakhal or the Bhowali fruit market.",
      sightsDay:"Pick 2–3: Bhumiadhar ashram, Kakrighat ashram, Hanuman Garhi and Naini Lake, or Bhimtal.",
      sightsShort:"If time allows, add Golu Devta or Bhumiadhar on the way back.",
      sightsArrive:"Arrived early? Spend the afternoon at Golu Devta temple or Bhumiadhar ashram.",
      free:"Free day: walk around Bhowali or Bhimtal, or go back for a quiet second darshan on a weekday.",
      retTrainDelhi:"Return by the Shatabdi (12039), Kathgodam 15:15 to New Delhi 20:55, or the Ranikhet Express (15014), Kathgodam 20:35 to Old Delhi 04:10.",
      retTrainLko:"Return by the Kathgodam–Lucknow Express (15044), which leaves Kathgodam at 11:15 on its running days.",
      retBus:"Taxi down to Haldwani or Kathgodam and take an evening bus.",
      retRoad:"Start back by noon so you are off the hill roads before dark.",
      retLocal:"Head back after lunch.",
      t1:"Travel and check in", t2:"Darshan day", t3:"Nearby places", tFree:"Easy day", tLast:"Head home", tDay:"Darshan and back"
    },
    hi:{
      trainDelhiGo:"पुरानी दिल्ली से रात 22:05 की रानीखेत एक्सप्रेस (15013) लें; यह सुबह 05:05 पर काठगोदाम पहुँचती है। दिन में जाना हो तो शताब्दी (12040) नई दिल्ली से 06:20 पर चलकर 11:55 पर पहुँचती है।",
      trainLkoGo:"लखनऊ–काठगोदाम एक्सप्रेस लें। यह रोज़ नहीं चलती, इसलिए दिन और समय IRCTC पर देख लें।",
      busGo:"हल्द्वानी या काठगोदाम के लिए रात की बस लें।",
      hillUp:"वहाँ से टैक्सी से ठहरने की जगह तक, लगभग 1–1.5 घंटे।",
      carDelhiGo:"सुबह 4–5 बजे निकलें। रास्ता: दिल्ली, मुरादाबाद, रामपुर, हल्द्वानी, फिर भीमताल या भवाली। लगभग 310 किमी, रुकते-रुकाते 6–8 घंटे।",
      carLkoGo:"जल्दी निकलें; दूरी 400 किमी से ज़्यादा है। थकान हो तो हल्द्वानी में रुकें, और अँधेरे में पहाड़ी सड़क पर न चलें।",
      cabFarGo:"कैब सुबह जल्दी लेने आएगी। दिल्ली से लगभग 6–8 घंटे; लखनऊ से ज़्यादा।",
      localGo:"कैंची धाम तक छोटी टैक्सी या ड्राइव: काठगोदाम से लगभग 1–1.5 घंटे, नैनीताल से 40 मिनट।",
      checkin:"चेक-इन करें, आराम करें और शाम हल्की रखें। होटल से पूछ लें कि आज शटल पार्किंग कहाँ है।",
      darshan:"सुबह 7 बजे तक पार्किंग या शटल पॉइंट पर पहुँच जाएँ। कार्यदिवस की सुबह सबसे शांत होती है।",
      darshan2:"लाइन मिलाकर दर्शन में 1–2 घंटे लगते हैं; वीकेंड पर कहीं ज़्यादा। अंदर फ़ोटो न लें।",
      after:"दर्शन के बाद घोड़ाखाल का गोलू देवता मंदिर या भवाली का फल बाज़ार देखें।",
      sightsDay:"2–3 जगहें चुनें: भूमियाधार आश्रम, काकड़ीघाट आश्रम, हनुमान गढ़ी और नैनी झील, या भीमताल।",
      sightsShort:"समय हो तो लौटते हुए गोलू देवता या भूमियाधार जोड़ लें।",
      sightsArrive:"जल्दी पहुँच गए? दोपहर गोलू देवता मंदिर या भूमियाधार आश्रम में बिताएँ।",
      free:"आराम का दिन: भवाली या भीमताल घूमें, या किसी कार्यदिवस पर शांति से दोबारा दर्शन करें।",
      retTrainDelhi:"शताब्दी (12039) से लौटें, काठगोदाम 15:15 से नई दिल्ली 20:55, या रानीखेत एक्सप्रेस (15014), काठगोदाम 20:35 से पुरानी दिल्ली 04:10।",
      retTrainLko:"काठगोदाम–लखनऊ एक्सप्रेस (15044) से लौटें, जो चलने वाले दिनों में काठगोदाम से 11:15 पर निकलती है।",
      retBus:"टैक्सी से हल्द्वानी या काठगोदाम उतरें और शाम की बस लें।",
      retRoad:"दोपहर 12 बजे तक वापसी शुरू करें ताकि अँधेरे से पहले पहाड़ी रास्ता पार हो जाए।",
      retLocal:"दोपहर के खाने के बाद वापस लौटें।",
      t1:"यात्रा और चेक-इन", t2:"दर्शन का दिन", t3:"आसपास की जगहें", tFree:"आराम का दिन", tLast:"घर वापसी", tDay:"दर्शन और वापसी"
    }
  };

  var lang = "en";
  var people = 2;
  var $ = function(s){return document.querySelector(s);};
  var NF = (window.Intl && Intl.NumberFormat) ? new Intl.NumberFormat("en-IN") : null;
  var fmt = function(n){ n = Math.round(n); return "₹" + (NF ? NF.format(n) : n.toLocaleString("en-IN")); };
  var round100 = function(n){return Math.round(n/100)*100;};

  function vehicleFor(p){
    return p <= 4 ? {type:"sedan", count:1} : {type:"suv", count:Math.ceil(p/6)};
  }

  function readForm(){
    var f = $("#planForm");
    return {
      from: f.from.value,
      mode: (f.querySelector('input[name=mode]:checked')||{}).value,
      nights: +f.querySelector('input[name=nights]:checked').value,
      tier: +f.querySelector('input[name=tier]:checked').value,
      sights: $("#sights").checked,
      date: ($("#tripDate") || {}).value || "",
      people: people
    };
  }

  function syncModes(){
    var from = FROM[$("#from").value];
    var radios = document.querySelectorAll('input[name=mode]');
    radios.forEach(function(r){
      var off = !from.far && (r.value === "train" || r.value === "bus");
      r.disabled = off;
    });
    var cur = document.querySelector('input[name=mode]:checked');
    if (!cur || cur.disabled){ document.querySelector('input[name=mode][value=' + (from.far ? "train" : "cab") + ']').checked = true; }
  }

  function calc(o){
    var F = FROM[o.from], v = vehicleFor(o.people), days = o.nights + 1, rows = [];
    var travel = 0, hill = 0, sights = 0, travelNote = "", hillNote = "";
    if (o.mode === "train" || o.mode === "bus"){
      var fare = (o.mode === "train" ? TRAIN : BUS)[o.from][o.tier];
      travel = 2 * fare * o.people;
      travelNote = T[lang].people(o.people);
      hill = 2 * HILL_TAXI.kathgodam[v.type] * v.count;
      hillNote = T[lang].vehicle(v);
      if (o.sights) sights = DAY_HIRE[v.type] * v.count;
    } else if (o.mode === "car"){
      var cars = Math.ceil(o.people / 5);
      var km = 2 * F.km + 30 * days + (o.sights ? 60 : 0);
      travel = cars * (km * FUEL_KM + 2 * F.toll + PARKING_DAY * days);
      travelNote = T[lang].cars(cars);
    } else { /* cab */
      if (F.far){
        var ckm = 2 * F.km + 40 * days + (o.sights ? 60 : 0);
        travel = v.count * (ckm * CAB_KM[v.type] + DRIVER_NIGHT * o.nights);
        travelNote = T[lang].vehicle(v);
      } else {
        travel = 2 * HILL_TAXI[o.from][v.type] * v.count;
        travelNote = T[lang].vehicle(v);
        if (o.sights) sights = DAY_HIRE[v.type] * v.count;
      }
    }
    var rooms = Math.ceil(o.people / 2);
    var stay = ROOM[o.tier] * rooms * o.nights;
    var food = FOOD[o.tier] * o.people * days;
    var misc = MISC * o.people;

    rows.push([T[lang].travel, travelNote, travel]);
    if (hill) rows.push([T[lang].hill, hillNote, hill]);
    if (sights) rows.push([T[lang].sights, T[lang].vehicle(v), sights]);
    rows.push([T[lang].stay, o.nights ? T[lang].rooms(rooms, o.nights) : T[lang].dayTripNote, stay]);
    rows.push([T[lang].food, T[lang].people(o.people), food]);
    rows.push([T[lang].misc, T[lang].people(o.people), misc]);
    var total = travel + hill + sights + stay + food + misc;
    return {rows:rows, total:total, low:round100(total*0.85), high:round100(total*1.15), pp:total/o.people};
  }

  function itinerary(o){
    var s = S[lang], F = FROM[o.from], go = [], ret;
    if (o.mode === "train"){ go = [o.from === "delhi" ? s.trainDelhiGo : s.trainLkoGo, s.hillUp]; }
    else if (o.mode === "bus"){ go = [s.busGo, s.hillUp]; }
    else if (o.mode === "car"){ go = [F.far ? (o.from === "delhi" ? s.carDelhiGo : s.carLkoGo) : s.localGo]; }
    else { go = [F.far ? s.cabFarGo : s.localGo]; }

    if (!F.far) ret = s.retLocal;
    else if (o.mode === "train") ret = o.from === "delhi" ? s.retTrainDelhi : s.retTrainLko;
    else if (o.mode === "bus") ret = s.retBus;
    else ret = s.retRoad;

    var days = [];
    if (o.nights === 0){
      var d = go.concat([s.darshan, s.darshan2]);
      if (o.sights) d.push(s.sightsShort);
      d.push(ret);
      days.push([s.tDay, d]);
      return days;
    }
    var first = go.concat([s.checkin]);
    if (o.nights === 1 && o.sights) first.push(s.sightsArrive);
    days.push([s.t1, first]);
    var dd = [s.darshan, s.darshan2, s.after];
    if (o.nights === 1) dd.push(ret);
    days.push([o.nights === 1 ? s.tDay : s.t2, dd]);
    for (var i = 2; i < o.nights; i++){
      days.push(i === 2 && o.sights ? [s.t3, [s.sightsDay]] : [s.tFree, [s.free]]);
    }
    if (o.nights >= 2){
      var last = [];
      if (o.sights && o.nights === 2) last.push(s.sightsShort);
      last.push(ret);
      days.push([s.tLast, last]);
    }
    return days;
  }

  function esc(t){ return String(t).replace(/[&<>"]/g, function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); }

  var lastTotal = null;
  var calm = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  /* Roll the trip cost from the old number to the new one instead of jumping. */
  function rollTotal(to){
    var el = $("#result .total"), from = lastTotal;
    lastTotal = to;
    if (!el || from === null || from === to || calm) return;
    var t0 = performance.now(), dur = 650;
    el.classList.add("rolling");
    (function step(now){
      var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(from + (to - from) * e);
      if (p < 1) requestAnimationFrame(step); else el.classList.remove("rolling");
    })(t0);
  }
  function bump(el){
    if (!el || calm) return;
    el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
  }

  function render(){
    var o = readForm(), r = calc(o), it = withNote(o, itinerary(o)), t = T[lang];
    var html = '<div class="total">' + fmt(r.total) + '</div>' +
      '<p class="total-note">' + t.range + ': ' + fmt(r.low) + ' – ' + fmt(r.high) + '<br>' + fmt(r.pp) + ' ' + t.pp + '</p>' +
      forYouHtml(o) +
      '<table class="breakdown"><tbody>' +
      r.rows.map(function(x){ return '<tr><td>' + esc(x[0]) + '<small>' + esc(x[1]) + '</small></td><td>' + fmt(x[2]) + '</td></tr>'; }).join("") +
      '</tbody></table>' +
      '<h3 style="margin-bottom:10px">' + t.plan + '</h3><ol class="days">' +
      it.map(function(d, i){ var dd = startOf(o) ? dlabel(addDays(startOf(o), i)) : ""; return '<li><h4>' + (dd ? '<span class="day-date">' + dd + '</span> ' : '') + esc(d[0]) + '</h4><ul>' + d[1].map(function(x){return '<li>' + esc(x) + '</li>';}).join("") + '</ul></li>'; }).join("") +
      '</ol><div class="actions">';
    if (o.nights > 0) html += '<a data-link="plan-stays" class="btn btn-solid" href="' + LINKS.stays + '" target="_blank" rel="noopener sponsored">' + t.bookStay + '</a>';
    if (o.mode === "train") html += '<a data-link="plan-trains" class="btn btn-line" href="' + LINKS.trains + '" target="_blank" rel="noopener">' + t.bookTrain + '</a>';
    if (o.mode === "bus") html += '<a data-link="plan-buses" class="btn btn-line" href="' + LINKS.buses + '" target="_blank" rel="noopener sponsored">' + t.bookBus + '</a>';
    if (o.mode === "cab") html += '<a data-link="plan-cabs" class="btn btn-line" href="' + LINKS.cabs + '" target="_blank" rel="noopener sponsored">' + t.bookCab + '</a>';
    html += '<a class="btn btn-line" id="shareBtn" href="#" target="_blank" rel="noopener">' + t.share + '</a>' +
      '<button type="button" class="btn btn-line" id="savePlanBtn">💾 ' + SM[lang].save + '</button>' +
      '<button type="button" class="btn btn-line" id="pdfBtn">📄 ' + SM[lang].pdf + '</button>' +
      '<button type="button" class="btn btn-line" id="calBtn" aria-expanded="false" aria-controls="calRow">📅 ' + SM[lang].cal + '</button></div>' +
      '<div class="cal-row" id="calRow" hidden></div>';
    $("#result").innerHTML = html;
    rollTotal(r.total);
    updateDateCrowd(o);

    var msg = t.shareHead + " (" + FROM[o.from][lang] + ", " + t.people(o.people) + ")\n" +
      t.est + ": " + fmt(r.total) + " (" + fmt(r.low) + " – " + fmt(r.high) + ")\n\n" +
      (startOf(o) ? dlabel(startOf(o)) + "\n" : "") +
      it.map(function(d, i){ return t.day + " " + (i+1) + (startOf(o) ? " (" + dlabel(addDays(startOf(o), i)) + ")" : "") + ": " + d[0] + "\n- " + d[1].join("\n- "); }).join("\n\n") +
      "\n\nhttps://neemkarolitrip.com";
    $("#shareBtn").href = "https://wa.me/?text=" + encodeURIComponent(msg);
  }

  /* ================================================================
     SMART PLANNER: personal suggestions, PDF trip plan, saved plans (with consent)
     Everything runs on this device. Saved data stays in this browser only.
     ================================================================ */
  var SM = {
    en:{
      forYou:"Suggested for you", save:"Save plan", pdf:"Download PDF", saved:"Plan saved on this phone ✓",
      askTitle:"Save plans on this phone?",
      askText:"Your saved plans and recent questions stay only on this device. Nothing is sent to us. You can delete them anytime.",
      allow:"Allow and save", notNow:"Not now",
      mine:"My saved plans", open:"Open", del:"Delete", delAll:"Delete all saved data", deleted:"Saved data deleted",
      nights:function(n){ return n === 0 ? "day trip" : n + (n > 1 ? " nights" : " night"); },
      tiers:["Budget","Comfortable","Premium"], modes:{train:"Train + taxi", car:"Own car", bus:"Bus + taxi", cab:"Taxi all the way"},
      stay0:["Stay in Bhowali","Closest town (9 km) with budget rooms and the weekend shuttle parking. Best value for your budget."],
      stay1:["Stay in Bhowali","Closest town (9 km). Good mid-range rooms and an easy early start for darshan."],
      stay1f:["Stay in Bhimtal","Lakeside and quieter, good for families, and on the way up from Kathgodam."],
      stay2:["Kainchi road or Nainital","For premium comfort: a resort on the Kainchi road (walking distance, books out first) or a lake-view hotel in Nainital."],
      dayTrip:["Day trip","No stay needed. Start back by noon so you are off the hill roads before dark."],
      best:function(d, lv, wk){ return ["Best day to go", "Calmest day in the next 2 weeks: " + d + " (" + lv + "). This weekend looks " + wk + ". Our estimate, not official."]; },
      trainDelhi:["Train tip","The overnight Ranikhet Express (22:05 → 05:05) gets you into the queue before the crowds."],
      train:["Train tip","Take a train to Kathgodam, then a taxi up the hill (about 1–1.5 hours)."],
      car:["Driving tip","Leave by 4–5 AM. On busy weekends police send cars to parking at Bhimtal or Bhowali, with a shuttle to the temple."],
      bus:["Bus tip","Take an overnight bus to Haldwani or Kathgodam, then a taxi up the hill."],
      cab:["Taxi tip","Ask your driver about weekend shuttle-only rules. On busy days cars stop at the parking lots."],
      group:function(n){ return ["Group of " + n, "An SUV or Tempo Traveller usually costs less per person than two cabs."]; },
      solo:["Travelling solo","Shared taxis between Haldwani or Kathgodam and Bhowali are the cheapest way up the hill."],
      places1:["After darshan","Golu Devta temple at Ghorakhal and the Bhowali fruit market are both close by."],
      places2:["With your extra days","Add Bhumiadhar and Kakrighat ashrams, Hanuman Garhi and Naini Lake, or a drive to Mukteshwar."],
      pdfTitle:"Kainchi Dham trip plan", summary:"Trip summary", checklist:"Packing checklist",
      items:["ID card for every traveller","Cash in small notes (some places don't take UPI)","A warm layer, even in summer","Comfortable shoes you can slip off at the temple","Modest clothes","Water bottle and light snacks","Phone power bank","Your tickets and hotel booking"],
      foot:function(d){ return "Estimate made on " + d + " at neemkarolitrip.com. Prices are rough guides, not quotes. Check the latest rules on the website before you go. Independent guide, not connected with the temple trust."; },
      from:"From", trav:"Travellers", mode:"Travel", stayL:"Stay", comfort:"Comfort",
      dateL:"Dates", cal:"Add to calendar", gcal:"Google Calendar", ics:"iPhone / Outlook (.ics)", calTitle:"Kainchi Dham trip",
      calCheck:"Check the latest rules before you go: https://neemkarolitrip.com/#status", calRemind:"Tomorrow: Kainchi Dham trip. Check the latest rules on neemkarolitrip.com.",
      crowdOn:"Expected crowd on", calmer:"Calmer nearby:", useDate:"Use this date", estimate:"our estimate"
    },
    hi:{
      forYou:"आपके लिए सुझाव", save:"प्लान सेव करें", pdf:"PDF डाउनलोड करें", saved:"प्लान इस फ़ोन पर सेव हो गया ✓",
      askTitle:"प्लान इस फ़ोन पर सेव करें?",
      askText:"आपके सेव किए प्लान और हाल के सवाल सिर्फ़ इसी डिवाइस पर रहेंगे। हमें कुछ नहीं भेजा जाता। आप इन्हें कभी भी मिटा सकते हैं।",
      allow:"अनुमति दें और सेव करें", notNow:"अभी नहीं",
      mine:"मेरे सेव किए प्लान", open:"खोलें", del:"हटाएँ", delAll:"सारा सेव डेटा मिटाएँ", deleted:"सेव डेटा मिटा दिया गया",
      nights:function(n){ return n === 0 ? "एक दिन की यात्रा" : n + " रात"; },
      tiers:["किफ़ायती","आरामदायक","प्रीमियम"], modes:{train:"ट्रेन + टैक्सी", car:"अपनी गाड़ी", bus:"बस + टैक्सी", cab:"पूरी यात्रा टैक्सी से"},
      stay0:["भवाली में ठहरें","सबसे पास का शहर (9 किमी), किफ़ायती कमरे और वीकेंड शटल पार्किंग। आपके बजट में सबसे अच्छा।"],
      stay1:["भवाली में ठहरें","सबसे पास का शहर (9 किमी)। अच्छे मिड-रेंज कमरे और दर्शन के लिए सुबह जल्दी निकलना आसान।"],
      stay1f:["भीमताल में ठहरें","झील किनारे और शांत, परिवारों के लिए अच्छा, काठगोदाम से ऊपर आते रास्ते में।"],
      stay2:["कैंची रोड या नैनीताल","प्रीमियम आराम के लिए: कैंची रोड पर रिसॉर्ट (पैदल दूरी, सबसे पहले भरते हैं) या नैनीताल में झील के नज़ारे वाला होटल।"],
      dayTrip:["एक दिन की यात्रा","होटल की ज़रूरत नहीं। दोपहर 12 बजे तक वापसी शुरू करें ताकि अँधेरे से पहले पहाड़ी रास्ता पार हो जाए।"],
      best:function(d, lv, wk){ return ["जाने का सबसे अच्छा दिन", "अगले 2 हफ़्तों में सबसे शांत दिन: " + d + " (" + lv + ")। इस वीकेंड: " + wk + "। यह हमारा अनुमान है, आधिकारिक नहीं।"]; },
      trainDelhi:["ट्रेन टिप","रात की रानीखेत एक्सप्रेस (22:05 → 05:05) से आप भीड़ से पहले लाइन में लग सकते हैं।"],
      train:["ट्रेन टिप","काठगोदाम तक ट्रेन, फिर टैक्सी से पहाड़ (लगभग 1–1.5 घंटे)।"],
      car:["ड्राइविंग टिप","सुबह 4–5 बजे निकलें। व्यस्त वीकेंड पर पुलिस गाड़ियों को भीमताल या भवाली की पार्किंग में भेजती है, वहाँ से मंदिर तक शटल।"],
      bus:["बस टिप","हल्द्वानी या काठगोदाम के लिए रात की बस लें, फिर टैक्सी से पहाड़।"],
      cab:["टैक्सी टिप","ड्राइवर से वीकेंड के शटल नियम पूछ लें। व्यस्त दिनों में गाड़ियाँ पार्किंग पर रुकती हैं।"],
      group:function(n){ return [n + " लोगों का ग्रुप", "एसयूवी या टेम्पो ट्रैवलर आम तौर पर दो कैब से सस्ता पड़ता है।"]; },
      solo:["अकेले यात्रा","हल्द्वानी या काठगोदाम से भवाली तक शेयर्ड टैक्सी सबसे सस्ता रास्ता है।"],
      places1:["दर्शन के बाद","घोड़ाखाल का गोलू देवता मंदिर और भवाली का फल बाज़ार, दोनों पास हैं।"],
      places2:["अतिरिक्त दिनों में","भूमियाधार और काकड़ीघाट आश्रम, हनुमान गढ़ी और नैनी झील, या मुक्तेश्वर की ड्राइव जोड़ें।"],
      pdfTitle:"कैंची धाम यात्रा प्लान", summary:"यात्रा का सार", checklist:"सामान की चेकलिस्ट",
      items:["हर यात्री का पहचान पत्र","छोटे नोटों में कैश (कुछ जगह UPI नहीं चलता)","एक गर्म कपड़ा, गर्मी में भी","आरामदायक जूते जो मंदिर पर आसानी से उतर सकें","शालीन कपड़े","पानी की बोतल और हल्का नाश्ता","फ़ोन पावर बैंक","आपके टिकट और होटल बुकिंग"],
      foot:function(d){ return d + " को neemkarolitrip.com पर बनाया गया अनुमान। कीमतें मोटा अंदाज़ा हैं, कोटेशन नहीं। जाने से पहले वेबसाइट पर ताज़ा नियम ज़रूर देखें। स्वतंत्र गाइड, मंदिर ट्रस्ट से कोई संबंध नहीं।"; },
      from:"कहाँ से", trav:"यात्री", mode:"साधन", stayL:"ठहरना", comfort:"सुविधा",
      dateL:"तारीख़ें", cal:"कैलेंडर में जोड़ें", gcal:"Google Calendar", ics:"iPhone / Outlook (.ics)", calTitle:"कैंची धाम यात्रा",
      calCheck:"जाने से पहले ताज़ा नियम देखें: https://neemkarolitrip.com/#status", calRemind:"कल: कैंची धाम यात्रा। neemkarolitrip.com पर ताज़ा नियम देख लें।",
      crowdOn:"अनुमानित भीड़:", calmer:"पास में कम भीड़ वाला दिन:", useDate:"यह तारीख़ चुनें", estimate:"हमारा अनुमान"
    }
  };
  var ICON = {stay:"🏨", best:"📅", tip:"🧭", group:"👨‍👩‍👧", solo:"🎒", places:"⛰️"};

  function suggestions(o){
    var m = SM[lang], list = [];
    if (o.nights === 0) list.push([ICON.stay].concat(m.dayTrip));
    else if (o.tier === 0) list.push([ICON.stay].concat(m.stay0));
    else if (o.tier === 1) list.push([ICON.stay].concat(o.people >= 3 ? m.stay1f : m.stay1));
    else list.push([ICON.stay].concat(m.stay2));
    var C = window.nktCrowd;
    if (C){
      var days = C.days(14), calmest = days[0], wk = null;
      days.forEach(function(d){ if (d.lvl < calmest.lvl) calmest = d; });
      for (var i = 0; i < days.length && !wk; i++){ if (days[i].d.getUTCDay() === 6) wk = days[i]; }
      var wl = C.LV[lang][(wk || days[0]).lvl], cl = C.LV[lang][calmest.lvl];
      if (lang === "en"){ wl = wl.toLowerCase(); cl = cl.toLowerCase(); }
      list.push([ICON.best].concat(m.best(C.label(calmest.d), cl, wl)));
    }
    var far = FROM[o.from].far;
    if (o.mode === "train") list.push([ICON.tip].concat(o.from === "delhi" ? m.trainDelhi : m.train));
    else if (o.mode === "car") list.push([ICON.tip].concat(m.car));
    else if (o.mode === "bus") list.push([ICON.tip].concat(m.bus));
    else list.push([ICON.tip].concat(m.cab));
    if (o.people >= 5) list.push([ICON.group].concat(m.group(o.people)));
    else if (o.people === 1 && far) list.push([ICON.solo].concat(m.solo));
    if (o.sights && o.nights >= 2) list.push([ICON.places].concat(m.places2));
    else if (o.sights && o.nights === 1) list.push([ICON.places].concat(m.places1));
    return list;
  }
  function forYouHtml(o){
    return '<div class="foryou"><h3>✨ ' + SM[lang].forYou + '</h3><ul>' + suggestions(o).map(function(s){
      return '<li><span class="fy-i" aria-hidden="true">' + s[0] + '</span><div><b>' + esc(s[1]) + '</b><span>' + esc(s[2]) + '</span></div></li>';
    }).join("") + '</ul></div>';
  }

  /* --- storage helpers (every call is wrapped: private mode or blocked storage must not break the page) --- */
  function store(k, v){ try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
  function load(k, d){ try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } }
  function consent(){ try { return localStorage.getItem("nkt-save") === "yes"; } catch(e){ return false; } }
  function notify(text){
    var box = document.getElementById("toast"), t = document.getElementById("toastText");
    if (!box || !t) return;
    t.textContent = text; box.classList.add("show", "nospin");
    clearTimeout(notify.t); notify.t = setTimeout(function(){ box.classList.remove("show", "nospin"); }, 2400);
  }
  function summary(o){
    var m = SM[lang];
    var d = startOf(o);
    return (d ? dlabel(d) + " · " : "") + FROM[o.from][lang] + " · " + T[lang].people(o.people) + " · " + m.modes[o.mode] + " · " + m.nights(o.nights) + " · " + m.tiers[o.tier];
  }
  function dateLabel(ts){ try { return new Date(ts).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {day:"numeric", month:"short", timeZone:"Asia/Kolkata"}); } catch(e){ return ""; } }
  function renderSaved(){
    var box = document.getElementById("savedPlans"); if (!box) return;
    var plans = load("nkt-plans", []), m = SM[lang];
    if (!plans.length){ box.hidden = true; box.innerHTML = ""; return; }
    box.hidden = false;
    box.innerHTML = '<h3>💾 ' + m.mine + '</h3><ul>' + plans.map(function(p, i){
      return '<li><div><b>' + fmt(p.total) + '</b><span>' + esc(summary(p.o)) + ' · ' + dateLabel(p.t) + '</span></div>' +
        '<button type="button" class="btn btn-line sp-open" data-i="' + i + '">' + m.open + '</button>' +
        '<button type="button" class="sp-del" data-i="' + i + '" aria-label="' + m.del + '">✕</button></li>';
    }).join("") + '</ul><button type="button" class="sp-all">' + m.delAll + '</button>';
  }
  function savePlan(){
    var o = readForm(), r = calc(o), plans = load("nkt-plans", []);
    plans = plans.filter(function(p){ return JSON.stringify(p.o) !== JSON.stringify(o); });
    plans.unshift({o:o, total:r.total, t:Date.now()});
    store("nkt-plans", plans.slice(0, 6));
    renderSaved(); notify(SM[lang].saved);
  }
  function openPlan(o){
    var f = $("#planForm");
    f.from.value = o.from; syncModes();
    var pick = function(n, v){ var el = f.querySelector('input[name=' + n + '][value="' + v + '"]'); if (el && !el.disabled) el.checked = true; };
    pick("mode", o.mode); pick("nights", o.nights); pick("tier", o.tier);
    $("#sights").checked = !!o.sights;
    var od = parseYmd(o.date); if (od && od >= istToday()) $("#tripDate").value = ymd(od);
    people = Math.min(12, Math.max(1, o.people || 2)); $("#peopleOut").textContent = people;
    render();
    var res = $("#result"); if (res && res.scrollIntoView) res.scrollIntoView({behavior:"smooth", block:"start"});
  }
  function askConsent(after){
    var m = SM[lang], host = $("#result .actions"); if (!host || $("#saveAsk")) return;
    var d = document.createElement("div");
    d.className = "save-ask"; d.id = "saveAsk"; d.setAttribute("role", "dialog"); d.setAttribute("aria-labelledby", "saveAskT");
    d.innerHTML = '<b id="saveAskT">🔒 ' + m.askTitle + '</b><p>' + m.askText + '</p><div class="row"><button type="button" class="btn btn-solid" data-a="yes">' + m.allow + '</button><button type="button" class="btn btn-line" data-a="no">' + m.notNow + '</button></div>';
    host.parentNode.insertBefore(d, host.nextSibling);
    d.addEventListener("click", function(e){
      var b = e.target.closest("button"); if (!b) return;
      if (b.getAttribute("data-a") === "yes"){ try { localStorage.setItem("nkt-save", "yes"); } catch(err){} after(); }
      d.remove();
    });
    var first = d.querySelector("button"); if (first) first.focus();
  }
  function printPlan(){
    var o = readForm(), r = calc(o), it = withNote(o, itinerary(o)), m = SM[lang], t = T[lang];
    var box = document.getElementById("printPlan");
    if (!box){ box = document.createElement("div"); box.id = "printPlan"; document.body.appendChild(box); }
    box.setAttribute("lang", lang === "hi" ? "hi" : "en");
    box.innerHTML =
      '<header><svg width="40" height="40" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#1F3B2D"/><path d="M14 50 C30 50 34 40 22 36 C10 32 24 22 40 26 C54 30 50 16 34 14" stroke="#E8A317" stroke-width="6" fill="none" stroke-linecap="round"/></svg><div><b>' + m.pdfTitle + '</b><span>neemkarolitrip.com</span></div></header>' +
      '<h2>' + m.summary + '</h2><table class="pp-sum"><tr><td>' + m.from + '</td><td>' + esc(FROM[o.from][lang]) + '</td><td>' + m.trav + '</td><td>' + esc(t.people(o.people)) + '</td></tr>' +
      '<tr><td>' + m.mode + '</td><td>' + esc(m.modes[o.mode]) + '</td><td>' + m.stayL + '</td><td>' + esc(m.nights(o.nights)) + ' · ' + esc(m.tiers[o.tier]) + '</td></tr>' +
      (startOf(o) ? '<tr><td>' + m.dateL + '</td><td colspan="3">' + esc(dlabel(startOf(o))) + (it.length > 1 ? ' – ' + esc(dlabel(addDays(startOf(o), it.length - 1))) : '') + '</td></tr>' : '') + '</table>' +
      '<p class="pp-total">' + t.est + ': <b>' + fmt(r.total) + '</b> <span>(' + t.range + ' ' + fmt(r.low) + ' – ' + fmt(r.high) + ' · ' + fmt(r.pp) + ' ' + t.pp + ')</span></p>' +
      '<table class="pp-rows">' + r.rows.map(function(x){ return '<tr><td>' + esc(x[0]) + '<small>' + esc(x[1]) + '</small></td><td>' + fmt(x[2]) + '</td></tr>'; }).join("") + '</table>' +
      '<h2>' + t.plan + '</h2><ol class="pp-days">' + it.map(function(d, i){ return '<li><b>' + (startOf(o) ? esc(dlabel(addDays(startOf(o), i))) + ' · ' : '') + esc(d[0]) + '</b><ul>' + d[1].map(function(x){ return '<li>' + esc(x) + '</li>'; }).join("") + '</ul></li>'; }).join("") + '</ol>' +
      '<h2>✨ ' + m.forYou + '</h2><ul class="pp-tips">' + suggestions(o).map(function(s){ return '<li><b>' + esc(s[1]) + ':</b> ' + esc(s[2]) + '</li>'; }).join("") + '</ul>' +
      '<h2>' + m.checklist + '</h2><ul class="pp-check">' + m.items.map(function(x){ return '<li>☐ ' + esc(x) + '</li>'; }).join("") + '</ul>' +
      '<footer>' + esc(m.foot(dateLabel(Date.now()))) + '</footer>';
    var old = document.title;
    document.title = m.pdfTitle + " – Neem Karoli Trip";
    var done = function(){ document.title = old; window.removeEventListener("afterprint", done); };
    window.addEventListener("afterprint", done);
    setTimeout(function(){ window.print(); setTimeout(done, 1500); }, 60);
  }

  /* one listener for the result area and the saved list */
  document.addEventListener("click", function(e){
    var b = e.target.closest && e.target.closest("button"); if (!b) return;
    if (b.id === "savePlanBtn"){ if (consent()) savePlan(); else askConsent(savePlan); }
    else if (b.id === "pdfBtn") printPlan();
    else if (b.classList.contains("sp-open")){ var p = load("nkt-plans", [])[+b.getAttribute("data-i")]; if (p) openPlan(p.o); }
    else if (b.classList.contains("sp-del")){ var ps = load("nkt-plans", []); ps.splice(+b.getAttribute("data-i"), 1); store("nkt-plans", ps.length ? ps : null); renderSaved(); }
    else if (b.classList.contains("sp-all")){ store("nkt-plans", null); store("nkt-recent", null); store("nkt-save", null); renderSaved(); notify(SM[lang].deleted); document.dispatchEvent(new CustomEvent("nkt-saved-cleared")); }
  });

  /* small public hooks so the Ask box can quote costs and open plans */
  window.nktPlan = {
    quote:function(opt){
      var from = FROM[opt.from] ? opt.from : "delhi";
      var o = {from:from, mode:FROM[from].far ? "train" : "cab", nights:1, tier:1, sights:true, people:Math.min(12, Math.max(1, opt.people || 2))};
      var r = calc(o); return {o:o, total:r.total, low:r.low, high:r.high, label:summary(o)};
    },
    open:openPlan
  };
  window.nktPlanRefresh = function(){ render(); renderSaved(); };

  /* ================================================================
     TRIP DATE, CALENDAR EXPORT AND QUICK-START PRESETS
     ================================================================ */
  function istToday(){ var d = new Date(Date.now() + 330 * 60000); return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())); }
  function ymd(dt){ return dt.toISOString().slice(0, 10); }
  function parseYmd(v){ var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || ""); return m ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])) : null; }
  function addDays(dt, n){ return new Date(dt.getTime() + n * 86400000); }
  function startOf(o){ return parseYmd(o.date); }
  var DLF = {};
  function dlabel(dt){
    try { var k = lang; if (!DLF[k]) DLF[k] = new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", {weekday:"short", day:"numeric", month:"short", timeZone:"UTC"}); return DLF[k].format(dt); }
    catch(e){ return ymd(dt); }
  }
  /* With real dates shown, make overnight travel unmistakable: you leave the evening BEFORE day 1. */
  function withNote(o, it){
    var d = startOf(o);
    if (!d || !FROM[o.from] || !FROM[o.from].far || (o.mode !== "train" && o.mode !== "bus")) return it;
    var prev = dlabel(addDays(d, -1));
    var note = lang === "hi" ? "रात की ट्रेन या बस लें तो एक दिन पहले शाम को निकलें (" + prev + ")।" : "Taking the overnight train or bus? You leave the evening before (" + prev + ").";
    var copy = it.map(function(x){ return [x[0], x[1].slice()]; });
    copy[0][1].unshift(note);
    return copy;
  }
  function nextSaturday(){ var d = addDays(istToday(), 1); while (d.getUTCDay() !== 6) d = addDays(d, 1); return d; }
  (function(){
    var inp = $("#tripDate"); if (!inp) return;
    inp.min = ymd(istToday()); inp.max = ymd(addDays(istToday(), 365));
    if (!inp.value) inp.value = ymd(nextSaturday());
  })();

  function updateDateCrowd(o){
    var el = $("#dateCrowd"), C = window.nktCrowd, d = startOf(o), m = SM[lang];
    if (!el) return;
    if (!d || !C || !C.at){ el.innerHTML = ""; return; }
    var e = C.at(d), LV = C.LV[lang], better = null, today = istToday();
    for (var k = 1; k <= 7 && !better; k++){
      [k, -k].forEach(function(sh){
        var x = addDays(d, sh); if (better || x < today) return;
        var ex = C.at(x); if (ex.lvl < e.lvl) better = {d:x, lvl:ex.lvl};
      });
    }
    el.innerHTML = '<span class="dc-dot" style="--lvl:' + C.COL[e.lvl] + '"></span>' + m.crowdOn + ' ' + esc(dlabel(d)) + ': <b>' + LV[e.lvl] + '</b> <small>(' + m.estimate + ')</small>' +
      (better ? '<br>' + m.calmer + ' ' + esc(dlabel(better.d)) + ' (' + LV[better.lvl] + ') <button type="button" class="dc-use" data-d="' + ymd(better.d) + '">' + m.useDate + '</button>' : '');
  }

  function icsText(s){ return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n"); }
  function fold(line){
    var enc = window.TextEncoder ? new TextEncoder() : null, out = "", cur = "", n = 0;
    Array.from(line).forEach(function(ch){
      var b = enc ? enc.encode(ch).length : 3;
      if (n + b > 73){ out += cur + "\r\n "; cur = ""; n = 1; }
      cur += ch; n += b;
    });
    return out + cur;
  }
  function ymdc(dt){ return ymd(dt).replace(/-/g, ""); }
  function calPlan(){
    var o = readForm(), start = startOf(o) || nextSaturday(), m = SM[lang], t = T[lang];
    var it = withNote({from:o.from, mode:o.mode, date:ymd(start)}, itinerary(o));
    var details = it.map(function(d, i){ return t.day + " " + (i + 1) + " (" + dlabel(addDays(start, i)) + "): " + d[0] + "\n- " + d[1].join("\n- "); }).join("\n\n") + "\n\n" + m.calCheck;
    return {o:o, it:it, start:start, m:m, t:t, details:details};
  }
  function googleCalUrl(){
    var c = calPlan();
    return "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent(c.m.calTitle + " (" + FROM[c.o.from][lang] + ")") +
      "&dates=" + ymdc(c.start) + "/" + ymdc(addDays(c.start, c.it.length)) +
      "&details=" + encodeURIComponent(c.details.slice(0, 1800)) +
      "&location=" + encodeURIComponent("Kainchi Dham, Nainital, Uttarakhand");
  }
  function downloadIcs(){
    var c = calPlan(), stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z"), lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Neem Karoli Trip//Trip planner//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH"];
    c.it.forEach(function(d, i){
      var day = addDays(c.start, i);
      lines.push("BEGIN:VEVENT", "UID:nkt-" + ymdc(c.start) + "-" + i + "-" + Date.now() + "@neemkarolitrip.com", "DTSTAMP:" + stamp,
        "DTSTART;VALUE=DATE:" + ymdc(day), "DTEND;VALUE=DATE:" + ymdc(addDays(day, 1)),
        "SUMMARY:" + icsText(c.m.calTitle + " – " + c.t.day + " " + (i + 1) + ": " + d[0]),
        "DESCRIPTION:" + icsText("- " + d[1].join("\n- ") + "\n\n" + c.m.calCheck),
        "LOCATION:" + icsText("Kainchi Dham, Nainital, Uttarakhand"), "URL:https://neemkarolitrip.com/#planner");
      if (i === 0) lines.push("BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:" + icsText(c.m.calRemind), "TRIGGER:-PT12H", "END:VALARM");
      lines.push("END:VEVENT");
    });
    lines.push("END:VCALENDAR");
    var ics = lines.map(fold).join("\r\n") + "\r\n";
    var ios = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (ios){ location.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(ics); return; }
    var url = URL.createObjectURL(new Blob([ics], {type:"text/calendar;charset=utf-8"}));
    var a = document.createElement("a"); a.href = url; a.download = "kainchi-dham-trip.ics";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){ URL.revokeObjectURL(url); }, 4000);
  }
  function toggleCal(btn){
    var row = $("#calRow"); if (!row) return;
    var open = row.hidden;
    if (open){
      var m = SM[lang];
      row.innerHTML = '<a class="btn btn-line" id="gcalLink" href="' + esc(googleCalUrl()) + '" target="_blank" rel="noopener">' + m.gcal + '</a>' +
        '<button type="button" class="btn btn-line" id="icsBtn">' + m.ics + '</button>';
    }
    row.hidden = !open; btn.setAttribute("aria-expanded", String(open));
  }

  var PRESETS = {
    weekend:{from:"delhi", mode:"train", nights:1, tier:1, sights:true, people:2, sat:true},
    family:{from:"delhi", mode:"car", nights:2, tier:1, sights:true, people:4},
    daytrip:{from:"nainital", mode:"cab", nights:0, tier:1, sights:false, people:2},
    solo:{from:"delhi", mode:"bus", nights:1, tier:0, sights:false, people:1},
    premium:{from:"lucknow", mode:"train", nights:2, tier:2, sights:true, people:2}
  };
  var presetBox = document.querySelector(".presets");
  if (presetBox) presetBox.addEventListener("click", function(e){
    var b = e.target.closest("button[data-preset]"); if (!b) return;
    var p = PRESETS[b.getAttribute("data-preset")]; if (!p) return;
    var o = {from:p.from, mode:p.mode, nights:p.nights, tier:p.tier, sights:p.sights, people:p.people, date:p.sat ? ymd(nextSaturday()) : ($("#tripDate").value || "")};
    openPlan(o);
    presetBox.querySelectorAll("button").forEach(function(x){ x.setAttribute("aria-pressed", String(x === b)); });
    if (window.gtag) gtag("event", "preset_used", {preset:b.getAttribute("data-preset")});
  });
  $("#planForm").addEventListener("change", function(e){
    if (e.isTrusted && presetBox) presetBox.querySelectorAll("button").forEach(function(x){ x.setAttribute("aria-pressed", "false"); });
  });
  document.addEventListener("click", function(e){
    var b = e.target.closest && e.target.closest("button"); if (!b) return;
    if (b.id === "calBtn") toggleCal(b);
    else if (b.id === "icsBtn"){ downloadIcs(); if (window.gtag) gtag("event", "calendar_add", {type:"ics"}); }
    else if (b.classList.contains("dc-use")){ $("#tripDate").value = b.getAttribute("data-d"); render(); }
  });
  document.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest("#gcalLink"); if (a && window.gtag) gtag("event", "calendar_add", {type:"google"});
  });

  function fillFrom(){
    var sel = $("#from"), cur = sel.value || "delhi";
    sel.innerHTML = Object.keys(FROM).map(function(k){ return '<option value="' + k + '">' + FROM[k][lang] + '</option>'; }).join("");
    sel.value = cur;
  }

  function setLang(l){
    lang = l;
    document.documentElement.setAttribute("data-lang", l);
    document.documentElement.setAttribute("lang", l === "hi" ? "hi" : "en");
    document.querySelectorAll("[data-set-lang]").forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === l)); });
    try { localStorage.setItem("nkt-lang", l); } catch(e){}
    fillFrom(); render(); renderSaved();
  }

  document.querySelectorAll("[data-link]").forEach(function(a){ var k = a.getAttribute("data-link"); if (LINKS[k]) a.href = LINKS[k]; });
  document.querySelectorAll("[data-set-lang]").forEach(function(b){ b.addEventListener("click", function(){
    var l = b.getAttribute("data-set-lang");
    if (l === lang) return;
    if (document.startViewTransition && !calm) document.startViewTransition(function(){ setLang(l); });
    else setLang(l);
  }); });
  document.querySelectorAll("[data-step]").forEach(function(b){
    b.addEventListener("click", function(){
      var before = people;
      people = Math.min(12, Math.max(1, people + (+b.getAttribute("data-step"))));
      $("#peopleOut").textContent = people;
      if (people === before) { b.classList.remove("nudge"); void b.offsetWidth; b.classList.add("nudge"); return; }
      bump($("#peopleOut")); render();
    });
  });
  $("#planForm").addEventListener("change", function(e){ if (e.target.id === "from") syncModes(); render(); });

  var saved = null;
  try { saved = localStorage.getItem("nkt-lang"); } catch(e){}
  if (!saved && (navigator.language || "").toLowerCase().indexOf("hi") === 0) saved = "hi";
  fillFrom(); syncModes(); setLang(saved === "hi" ? "hi" : "en");
})();
} catch (e) { if (window.console) console.error('nkt part 1', e); }
});

/* ===== part 2 ===== */
NKT_PARTS.push(function () {
try {
/* ================================================================
   PREMIUM MOTION + "ASK THE GUIDE"
   No libraries. Everything is visible without this script.
   ================================================================ */
(function(){
  var root = document.documentElement;
  var reduce = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  var hasIO = "IntersectionObserver" in window;
  function L(){ return root.getAttribute("data-lang") === "hi" ? "hi" : "en"; }
  function $$(s, el){ return [].slice.call((el || document).querySelectorAll(s)); }
  function esc(t){ return String(t).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

  /* ---------- scroll: progress bar, hero parallax, journey rail ---------- */
  var bar = document.querySelector(".progress span");
  var hero = document.getElementById("hero");
  var layers = $$(".scene .layer[data-depth]");
  var copy = document.querySelector(".hero-copy");
  var scene = document.querySelector(".scene");
  var heads = $$(".sec-head h2");
  var journey = document.getElementById("journey");
  var stops = journey ? $$("li", journey) : [];
  var ticking = false;

  /* Measurements are cached and refreshed on resize, so scrolling only reads positions once per frame
     and then writes styles (no read-write-read "layout thrashing"). */
  var hb = 0, jh = 0, stopTops = [], stickPx = 108;
  function setStick(){
    var b = document.querySelector(".bar"), c = document.querySelector(".chips");
    var h = (b ? b.getBoundingClientRect().height : 56) + (c ? c.getBoundingClientRect().height : 52);
    root.style.setProperty("--stick", Math.round(h) + "px");
    stickPx = Math.round(h);
  }
  function measure(){
    setStick();
    hb = hero ? hero.offsetHeight : 0;
    if (journey){
      jh = journey.getBoundingClientRect().height || 1;
      journey.style.setProperty("--jh", Math.max(0, jh - 20).toFixed(1) + "px");
      stopTops = stops.map(function(s){ return s.offsetTop; });
    }
  }
  function frame(){
    ticking = false;
    /* reads */
    var y = window.pageYOffset || root.scrollTop, vh = window.innerHeight;
    var max = root.scrollHeight - vh;
    var jr = journey && !reduce ? journey.getBoundingClientRect() : null;
    var stuck = heads.map(function(h){ return Math.abs(h.getBoundingClientRect().top - stickPx) < 2; });
    /* writes */
    if (bar) bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0).toFixed(4) + ")";
    if (!reduce && hero && y < hb + 80){
      layers.forEach(function(l){ l.style.transform = "translate3d(0," + (y * +l.getAttribute("data-depth")).toFixed(1) + "px,0)"; });
      if (scene) scene.style.transform = "scale(" + (1 + Math.min(y / hb, 1) * 0.14).toFixed(4) + ")";
      if (copy){
        copy.style.transform = "translate3d(0," + (y * -0.12).toFixed(1) + "px,0)";
        copy.style.opacity = Math.max(0, 1 - y / (hb * 0.85)).toFixed(3);
      }
    }
    if (jr && jr.top < vh && jr.bottom > 0){
      var p = Math.max(0, Math.min(1, (vh * 0.7 - jr.top) / jh));
      journey.style.setProperty("--p", p.toFixed(3));
      stops.forEach(function(s, i){ s.classList.toggle("reached", p >= (stopTops[i] + 12) / jh - 0.02); });
    }
    heads.forEach(function(h, i){ if (h.classList.contains("is-stuck") !== stuck[i]) h.classList.toggle("is-stuck", stuck[i]); });
  }
  function onScroll(){ if (!ticking){ ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener("scroll", onScroll, {passive:true});
  window.addEventListener("resize", function(){ measure(); onScroll(); });
  if (journey && reduce){ journey.style.setProperty("--p", 1); stops.forEach(function(s){ s.classList.add("reached"); }); }
  measure();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ measure(); onScroll(); });
  frame();

  /* ---------- gold highlight on key words ---------- */
  var hls = $$("#status li > strong > span, main section p b, .route li b, .journey b span");
  hls.forEach(function(el){ el.classList.add("hl-sweep"); });
  if (reduce || !hasIO){ hls.forEach(function(el){ el.classList.add("lit"); }); }
  else {
    var hio = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("lit"); hio.unobserve(e.target); } });
    }, {rootMargin:"0px 0px -18% 0px", threshold:1});
    hls.forEach(function(el){ hio.observe(el); });
  }

  /* ---------- reveal on scroll (only elements that start below the screen) ---------- */
  if (!reduce && hasIO){
    var sel = ".sec-head > *,.status li,.stat,.route,.stay,.dos li,.places li,.events li,.planner,.story p,.journey li,.price-guide,.follow-cta,details.faq";
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    }, {rootMargin:"0px 0px -6% 0px", threshold:0.08});
    $$(sel).forEach(function(el){
      var r = el.getBoundingClientRect();
      if (r.height && r.top < window.innerHeight && r.bottom > 0) return;
      var sibs = el.parentElement ? [].slice.call(el.parentElement.children).filter(function(c){ return c.matches(sel); }) : [];
      var ix = Math.max(0, sibs.indexOf(el));
      el.style.setProperty("--i", Math.min(5, ix));
      if (el.matches(".route,.stay,.stat,.dos li")) el.style.setProperty("--dx", (ix % 2 ? 36 : -36) + "px");
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  /* ---------- count-up numbers (the real value is in the HTML) ---------- */
  if (!reduce && hasIO){
    var cio = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        var el = e.target, to = +el.getAttribute("data-count"), dec = +(el.getAttribute("data-dec") || 0);
        var group = el.getAttribute("data-group") !== "0", t0 = null, dur = 1500;
        var f = function(v){ return v.toLocaleString("en-IN", {minimumFractionDigits:dec, maximumFractionDigits:dec, useGrouping:group}); };
        function step(t){
          if (t0 === null) t0 = t;
          var k = Math.min(1, (t - t0) / dur);
          el.textContent = f(k < 1 ? to * (1 - Math.pow(1 - k, 3)) : to);
          if (k < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, {threshold:0.6});
    $$("[data-count]").forEach(function(n){ cio.observe(n); });
  }

  /* ---------- live rules ticker in the hero (reads the rules list itself) ---------- */
  var liveText = document.getElementById("liveText"), tick = null, idx = 0;
  function startTicker(){
    if (!liveText) return;
    clearInterval(tick);
    var list = $$('#status li > strong > span[lang="' + L() + '"]').map(function(s){ return s.textContent.trim(); });
    idx = 0;
    if (list[0]) liveText.textContent = list[0];
    if (reduce || list.length < 2) return;
    tick = setInterval(function(){
      if (document.hidden) return;
      liveText.classList.add("out");
      setTimeout(function(){ idx = (idx + 1) % list.length; liveText.textContent = list[idx]; liveText.classList.remove("out"); }, 350);
    }, 4000);
  }

  /* ---------- section chips follow the scroll ---------- */
  var chipLinks = $$('.chips a[href^="#"]');
  var nav = document.querySelector(".chips nav");
  if (hasIO){
    var spy = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (!e.isIntersecting) return;
        chipLinks.forEach(function(a){
          if (a.getAttribute("href") === "#" + e.target.id){
            a.setAttribute("aria-current", "true");
            if (nav) nav.scrollTo({left: a.offsetLeft - nav.offsetLeft - 16, behavior: reduce ? "auto" : "smooth"});
          } else a.removeAttribute("aria-current");
        });
      });
    }, {rootMargin:"-40% 0px -55% 0px"});
    chipLinks.forEach(function(a){ var s = document.querySelector(a.getAttribute("href")); if (s) spy.observe(s); });
  }

  /* ---------- Ask the guide: answers only from this page's own facts ---------- */
  var KB = [
    {k:["regist","रजिस्ट्रेशन","पंजीकरण","panjikaran","permit","e-pass","epass"," pass ","token","slot","online","booking for darshan"], s:"#status", l:{en:"Latest rules", hi:"ताज़ा नियम"},
     a:{en:"Not yet. As of 11 October 2026 no registration is needed. Officials plan weekend registration with a limit of about 20,000–25,000 visitors a day, but there is no start date. If it starts, register only on the official government portal.",
        hi:"अभी नहीं। 11 अक्टूबर 2026 तक रजिस्ट्रेशन की ज़रूरत नहीं है। अधिकारी वीकेंड के लिए रोज़ लगभग 20,000–25,000 श्रद्धालुओं की सीमा के साथ रजिस्ट्रेशन की योजना बना रहे हैं, पर शुरू होने की तारीख़ तय नहीं है। लागू होने पर केवल आधिकारिक सरकारी पोर्टल पर रजिस्टर करें।"}},
    {k:["parking","पार्किंग","park","पार्क","car","कार","gaadi","gadi","गाड़ी","गाडी","vehicle","वाहन","shuttle","शटल","bike","बाइक","scooty","taxi","टैक्सी","drive"], s:"#status", l:{en:"Latest rules", hi:"ताज़ा नियम"},
     a:{en:"On busy weekends police send cars to set parking: Vikas Bhawan in Bhimtal if you come via Bhimtal, or the Sanatorium in Bhowali if you come via Gethia or Nainital. A shuttle takes you to the temple. On quiet weekdays you can drive to the parking near the temple.",
        hi:"व्यस्त वीकेंड पर पुलिस गाड़ियों को तय पार्किंग में भेजती है: भीमताल की ओर से आएँ तो भीमताल विकास भवन, गेठिया या नैनीताल की ओर से आएँ तो भवाली सेनेटोरियम। वहाँ से शटल मंदिर तक ले जाती है। शांत कार्यदिवसों पर मंदिर के पास की पार्किंग तक जा सकते हैं।"}},
    {k:["timing","time","open","close","khul","खुल","बंद","samay","समय","baje","बजे","aarti","आरती","hours","kab"], s:"#timings", l:{en:"Timings", hi:"समय"},
     a:{en:"The temple is generally open from about 6 AM to 7 PM. Hours and aarti times change with the season and on festival days, so check the trust's notices before you go.",
        hi:"मंदिर आम तौर पर सुबह लगभग 6 से शाम 7 बजे तक खुला रहता है। मौसम और त्योहारों पर समय व आरती का समय बदलता है, इसलिए जाने से पहले ट्रस्ट की सूचनाएँ देख लें।"}},
    {k:["crowd","भीड़","भीड","bheed","bheer","queue","line","लाइन","wait","rush","how long","kitna time","कितना समय","कितनी देर"], s:"#status", l:{en:"Latest rules", hi:"ताज़ा नियम"},
     a:{en:"Weekends are very busy. On 4 October 2026 the queue began at 4 AM. Darshan takes about 1–2 hours on a weekday morning and several hours on weekends, so go on a weekday between 6 and 8 AM if you can.",
        hi:"वीकेंड पर बहुत भीड़ रहती है। 4 अक्टूबर 2026 को लाइन सुबह 4 बजे से लगी। कार्यदिवस की सुबह दर्शन में लगभग 1–2 घंटे लगते हैं और वीकेंड पर कई घंटे, इसलिए हो सके तो कार्यदिवस पर सुबह 6 से 8 बजे के बीच जाएँ।"}},
    {k:["fee","ticket","टिकट","charge","शुल्क","free","मुफ्त","paisa lagta","entry fee","entry ticket"], s:"#faq", l:{en:"FAQ", hi:"सवाल-जवाब"},
     a:{en:"No. Darshan is free. Small costs are the shuttle, parking and any prasad you buy.",
        hi:"नहीं, दर्शन निःशुल्क हैं। छोटे खर्च बस शटल, पार्किंग और प्रसाद के होते हैं।"}},
    {k:["train","ट्रेन","station","स्टेशन","railway","रेल","kathgodam","काठगोदाम","irctc","shatabdi","शताब्दी","ranikhet","रानीखेत"], s:"#reach", l:{en:"How to reach", hi:"कैसे पहुँचें"},
     a:{en:"Kathgodam is the nearest station, about 40 km away (1–1.5 hours by taxi). From Delhi: the Ranikhet Express leaves Old Delhi at 22:05 and reaches at 05:05, or the Shatabdi leaves New Delhi at 06:20 and reaches at 11:55.",
        hi:"नज़दीकी स्टेशन काठगोदाम है, लगभग 40 किमी (टैक्सी से 1–1.5 घंटे)। दिल्ली से: रानीखेत एक्सप्रेस पुरानी दिल्ली से 22:05 पर चलकर 05:05 पर पहुँचती है, या शताब्दी नई दिल्ली से 06:20 पर चलकर 11:55 पर।"}},
    {k:["from delhi","दिल्ली से","delhi","दिल्ली","distance","दूरी","km","कितनी दूर","how far","road","सड़क","route","रास्ता","lucknow","लखनऊ"], s:"#reach", l:{en:"How to reach", hi:"कैसे पहुँचें"},
     a:{en:"From Delhi it is about 310 km by road via Moradabad, Rampur and Haldwani, so plan 6–8 hours. By train, go to Kathgodam and take a taxi up the hill. Kainchi Dham is 9 km past Bhowali on the Nainital–Almora road.",
        hi:"दिल्ली से सड़क के रास्ते मुरादाबाद, रामपुर और हल्द्वानी होते हुए लगभग 310 किमी है, 6–8 घंटे मानकर चलें। ट्रेन से काठगोदाम जाएँ और वहाँ से टैक्सी लें। कैंची धाम नैनीताल–अल्मोड़ा मार्ग पर भवाली से 9 किमी आगे है।"}},
    {k:["flight","airport","एयरपोर्ट","हवाई","pantnagar","पंतनगर","plane","fly"], s:"#reach", l:{en:"How to reach", hi:"कैसे पहुँचें"},
     a:{en:"The nearest airport is Pantnagar, about 70–80 km away. A sedan taxi to Kainchi costs roughly ₹1,800 one way.",
        hi:"नज़दीकी हवाई अड्डा पंतनगर है, लगभग 70–80 किमी। कैंची तक सेडान टैक्सी एक तरफ़ लगभग ₹1,800।"}},
    {k:["hotel","होटल","stay","ठहर","room","कमरा","कमरे","homestay","होमस्टे","dharamshala","धर्मशाला","night","रात","rukna","रुक"], s:"#stay", l:{en:"Where to stay", hi:"कहाँ ठहरें"},
     a:{en:"The ashram generally does not host the public overnight. Stay in Bhowali (9 km), Bhimtal (about 20 km) or Nainital (17 km), and book before you travel. Budget rooms are about ₹1,500–2,500 a night; weekends cost more.",
        hi:"आश्रम में आम लोगों के रात रुकने की व्यवस्था आम तौर पर नहीं होती। भवाली (9 किमी), भीमताल (लगभग 20 किमी) या नैनीताल (17 किमी) में ठहरें और निकलने से पहले बुकिंग कर लें। किफ़ायती कमरे लगभग ₹1,500–2,500 प्रति रात; वीकेंड पर ज़्यादा।"}},
    {k:["cost","खर्च","kharcha","budget","बजट","price","कितना पैसा","kitna","expense","money","पैसे"], s:"#planner", l:{en:"Trip planner", hi:"यात्रा प्लानर"},
     a:{en:"It depends on your city, travel mode and group size. The trip planner on this page gives an estimate with a day-by-day plan in a few taps.",
        hi:"यह आपके शहर, यात्रा के साधन और लोगों की संख्या पर निर्भर है। इस पेज का यात्रा प्लानर कुछ ही टैप में अनुमानित खर्च और दिन-वार प्लान बता देता है।"}},
    {k:["photo","फोटो","camera","कैमरा","mobile","phone","फोन","dress","कपड़े","kapde","clothes","shoes","जूते","video"], s:"#timings", l:{en:"Temple etiquette", hi:"मंदिर के नियम"},
     a:{en:"Photography is not allowed inside the temple, so keep your phone away during darshan. Wear modest clothes; footwear stays outside. Carry a warm layer.",
        hi:"मंदिर के अंदर फ़ोटो लेने की अनुमति नहीं है, दर्शन के समय फ़ोन जेब में रखें। शालीन कपड़े पहनें; जूते-चप्पल बाहर उतारने होंगे। एक गर्म कपड़ा साथ रखें।"}},
    {k:["best time","सबसे अच्छा","month","महीना","महीने","weather","मौसम","mausam","season","monsoon","बरसात","rain","बारिश","winter","सर्दी","snow"], s:"#faq", l:{en:"FAQ", hi:"सवाल-जवाब"},
     a:{en:"March to June and September to November have the best weather, and weekday mornings have the shortest queues. July to September can bring landslides and road closures.",
        hi:"मौसम के लिहाज़ से मार्च से जून और सितंबर से नवंबर सबसे अच्छे हैं, और कार्यदिवस की सुबह लाइन सबसे छोटी होती है। जुलाई से सितंबर में भूस्खलन और रास्ते बंद होने की आशंका रहती है।"}},
    {k:["prasad","प्रसाद","malpua","मालपुआ","mela","मेला","मेले","15 june","15 जून","foundation","स्थापना","bhandara","भंडारा"], s:"#events", l:{en:"Events", hi:"मेले व पर्व"},
     a:{en:"The biggest day is the Foundation Day fair on 15 June (next: 15 June 2027), when lakhs of devotees come for malpua prasad and private vehicles are stopped well before the temple. We never sell prasad.",
        hi:"साल का सबसे बड़ा दिन 15 जून का स्थापना दिवस मेला है (अगला: 15 जून 2027), जब लाखों श्रद्धालु मालपुए का प्रसाद लेने आते हैं और निजी वाहन मंदिर से काफ़ी पहले रोक दिए जाते हैं। हम प्रसाद नहीं बेचते।"}},
    {k:["day trip","same day","एक दिन","one day","return","वापस","lautna","लौट"], s:"#faq", l:{en:"FAQ", hi:"सवाल-जवाब"},
     a:{en:"Yes. Take the overnight Ranikhet Express to Kathgodam (05:05), do darshan in the morning, and return by the Shatabdi at 15:15 or the Ranikhet Express at 20:35.",
        hi:"हाँ। रात की रानीखेत एक्सप्रेस से काठगोदाम (05:05) पहुँचें, सुबह दर्शन करें और 15:15 की शताब्दी या 20:35 की रानीखेत एक्सप्रेस से लौटें।"}},
    {k:["nearby","आसपास","ghumne","घूमने","places","जगह","golu","गोलू","bhumiadhar","भूमियाधार","hanuman garhi","हनुमान गढ़ी","naini","नैनी","mukteshwar","मुक्तेश्वर","kakrighat","काकड़ीघाट","bhimtal","भीमताल"], s:"#nearby", l:{en:"Places nearby", hi:"आसपास"},
     a:{en:"Good add-ons: Golu Devta temple at Ghorakhal, Baba's ashrams at Bhumiadhar, Kakrighat and Hanuman Garhi, Naini Lake, Bhimtal and Mukteshwar.",
        hi:"साथ में घूमें: घोड़ाखाल का गोलू देवता मंदिर, भूमियाधार, काकड़ीघाट और हनुमान गढ़ी के आश्रम, नैनी झील, भीमताल और मुक्तेश्वर।"}},
    {k:["rate list","rate","रेट","overcharg","ज़्यादा पैसे","ज्यादा पैसे","cheat","complaint","शिकायत"], s:"#status", l:{en:"Latest rules", hi:"ताज़ा नियम"},
     a:{en:"Hotels, homestays, shops and eateries must now display rate lists. Ask to see it before you pay; overcharging can be reported.",
        hi:"होटल, होमस्टे, दुकानों और ढाबों को अब रेट लिस्ट लगानी होगी। भुगतान से पहले रेट लिस्ट देखें; ज़्यादा पैसे लेने की शिकायत की जा सकती है।"}},
    {k:["official","आधिकारिक","trust","ट्रस्ट","who runs","website"], s:"#faq", l:{en:"FAQ", hi:"सवाल-जवाब"},
     a:{en:"This is an independent travel guide, not the temple trust. For official notices, see the Shri Kainchi Hanuman Mandir & Ashram Trust website.",
        hi:"यह एक स्वतंत्र यात्रा गाइड है, मंदिर ट्रस्ट नहीं। आधिकारिक सूचनाओं के लिए श्री कैंची हनुमान मंदिर एवं आश्रम ट्रस्ट की वेबसाइट देखें।"}},
    {k:["baba","बाबा","maharaj","महाराज","history","इतिहास","who is","कौन","neem karoli","नीम करोली","hanuman ansh","हनुमान अंश","film","फिल्म","steve jobs"], s:"#history", l:{en:"About Baba", hi:"बाबा के बारे में"},
     a:{en:"Neem Karoli Baba, called Maharaj-ji, chose this riverside spot in 1962. The Hanuman temple was consecrated on 15 June 1964. He left his body on 11 September 1973 in Vrindavan.",
        hi:"महाराज जी कहे जाने वाले नीम करोली बाबा ने 1962 में नदी किनारे यह जगह चुनी। 15 जून 1964 को हनुमान मंदिर की प्रतिष्ठा हुई। 11 सितंबर 1973 को उन्होंने वृंदावन में देह त्यागी।"}}
  ];
  /* extra Hinglish / everyday phrasings, by KB position */
  var EXTRA = {0:["register","registeration","rajistration","registr","e pass","pass chahiye"],
    1:["gaadi kaha","gadi kahan","park kahan","parking kahan","shuttle bus"],
    2:["kab khulta","kab tak","khulta","band hota","opening","closing","darshan time","timings"],
    3:["bhid","bheed","rush","bhir","kitni bheed"], 5:["train se","rail se","nearest station"],
    6:["kaise jaye","kaise jayen","kaise pahunche","kaise pahuche","kaise jana","rasta"],
    8:["kahan ruke","kahan rukein","rukne","lodge","stay kare"], 9:["kharch","kitna lagega","kitne paise","kitna kharcha","total cost"],
    11:["kab jaye","kab jana","sahi samay","best month","konsa mahina"], 14:["aas paas","aaspas","dekhne","sightseeing"]};
  KB.forEach(function(e, i){ if (EXTRA[i]) e.k = e.k.concat(EXTRA[i]); });
  var UI = {
    en:{ph:"Ask about parking, timings, trains…", more:"More in", wa:"Ask us on WhatsApp",
        none:"I couldn't find that in this guide yet. Check the FAQ, or ask us on the WhatsApp channel.",
        example:"Do I need registration?", dym:"Did you mean:", openPlan:"Open in trip planner", crowd:"See the crowd meter", recent:"Recent:", clear:"Clear"},
    hi:{ph:"पार्किंग, समय, ट्रेन के बारे में पूछें…", more:"और जानकारी:", wa:"WhatsApp पर पूछें",
        none:"यह जानकारी अभी इस गाइड में नहीं है। सवाल-जवाब देखें या WhatsApp चैनल पर पूछें।",
        example:"क्या रजिस्ट्रेशन ज़रूरी है?", dym:"क्या आप यह पूछना चाहते हैं:", openPlan:"यात्रा प्लानर में खोलें", crowd:"भीड़ मीटर देखें", recent:"हाल के सवाल:", clear:"मिटाएँ"}
  };
  function norm(s){ s = String(s); if (s.normalize) s = s.normalize("NFD"); return " " + s.toLowerCase().replace(/़/g, "").replace(/[?.!,;:'"()–—]/g, " ").replace(/\s+/g, " ") + " "; }
  KB.forEach(function(e){ e.k = e.k.map(function(k){ return k.charAt(0) === " " ? " " + norm(k).trim() + " " : norm(k).trim(); }); });
  /* --- smarter Ask box: Hinglish words, spelling mistakes, follow-ups and live answers --- */
  /* edit distance that also counts two swapped letters ("trian" -> "train") as one mistake */
  function lev(a, b){
    if (Math.abs(a.length - b.length) > 2) return 9;
    var d = [], i, j;
    for (i = 0; i <= a.length; i++){ d[i] = [i]; }
    for (j = 0; j <= b.length; j++){ d[0][j] = j; }
    for (i = 1; i <= a.length; i++){
      for (j = 1; j <= b.length; j++){
        var c = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
    return d[a.length][b.length];
  }
  var VOCAB = [];
  var GENERIC = ["kitna","kitni","night","online","phone","mobile","delhi","route","money","price"];
  KB.forEach(function(e, i){ e.k.forEach(function(k){ var w = k.trim(); if (w.indexOf(" ") < 0 && /^[a-z]{5,}$/.test(w) && GENERIC.indexOf(w) < 0) VOCAB.push([w, i]); }); });
  function score(q){
    var n = norm(q), words = n.trim().split(" ").filter(function(w){ return /^[a-z]{4,}$/.test(w); });
    var sc = KB.map(function(e){ var s = 0; e.k.forEach(function(k){ if (n.indexOf(k) > -1) s += k.length + 2; }); return s; });
    var near = KB.map(function(){ return 0; });
    words.forEach(function(w){
      VOCAB.forEach(function(v){
        if (n.indexOf(v[0]) > -1) return;
        var d = lev(w, v[0]), lim = v[0].length >= 7 ? 2 : 1;
        if (d <= lim){ sc[v[1]] += v[0].length; near[v[1]] += v[0].length; }
        else if (d === lim + 1) near[v[1]] += 1;
      });
    });
    return {n:n, sc:sc, near:near};
  }
  var CITY = [[/delhi|dilli|ncr|noida|gurgaon|gurugram|ghaziabad|faridabad|दिल्ली/, "delhi"], [/lucknow|lko|लखनऊ/, "lucknow"],
              [/kathgodam|haldwani|काठगोदाम|हल्द्वानी/, "kathgodam"], [/nainital|naini tal|नैनीताल/, "nainital"]];
  function cityOf(n){ for (var i = 0; i < CITY.length; i++) if (CITY[i][0].test(n)) return CITY[i][1]; return null; }
  function peopleOf(n){
    var m = n.match(/(\d{1,2})\s*(people|persons?|log|logo|logon|लोग|adults?|members?|pax|friends|jan|ke liye|के लिए)/) || n.match(/ for (\d{1,2}) /);
    if (m && +m[1] >= 1 && +m[1] <= 12) return +m[1];
    var W = {" solo ":1, " alone ":1, " akela ":1, " akele ":1, " couple ":2, " do log":2, " teen log":3, " char log":4, " chaar log":4, " paanch log":5};
    for (var k in W) if (n.indexOf(k) > -1) return W[k];
    return null;
  }
  var DAYW = / weekend|saturday|sunday| today | tomorrow | aaj | kal |shanivar|ravivar|वीकेंड|शनिवार|रविवार| आज | कल /;
  var QS = [["Do I need registration?","क्या रजिस्ट्रेशन ज़रूरी है?"],["Where do I park on weekends?","वीकेंड पर पार्किंग कहाँ है?"],["Temple timings?","मंदिर कब खुलता है?"],
    ["How crowded is it this week?","इस हफ़्ते कितनी भीड़ है?"],["Is there an entry fee?","क्या कोई एंट्री फ़ीस है?"],["Nearest railway station?","नज़दीकी रेलवे स्टेशन?"],
    ["How do I reach from Delhi?","दिल्ली से कैसे पहुँचें?"],["Nearest airport?","नज़दीकी एयरपोर्ट?"],["Where to stay?","कहाँ ठहरें?"],
    ["How much will the trip cost?","यात्रा में कितना खर्च होगा?"],["Can I take photos?","क्या फ़ोटो ले सकते हैं?"],["Best time to visit?","जाने का सबसे अच्छा समय?"],
    ["When is the 15 June fair?","15 जून का मेला कब है?"],["Can I do a day trip?","क्या एक दिन में लौट सकते हैं?"],["Places to visit nearby?","आसपास घूमने की जगहें?"],
    ["Are rate lists displayed?","क्या रेट लिस्ट लगती है?"],["Is this the official website?","क्या यह आधिकारिक वेबसाइट है?"],["Who was Neem Karoli Baba?","नीम करोली बाबा कौन थे?"]];
  var lastCost = null, lastIntent = null;
  var NF2 = (window.Intl && Intl.NumberFormat) ? new Intl.NumberFormat("en-IN") : null;
  function money(n){ n = Math.round(n); return "₹" + (NF2 ? NF2.format(n) : n.toLocaleString("en-IN")); }

  /* Works out the answer: {text, link} where link is ready-made HTML */
  function answer(q, remember){
    var l = L(), U = UI[l], r = score(q), n = r.n, best = -1, top = 0;
    r.sc.forEach(function(s, i){ if (s > top){ top = s; best = i; } });
    var city = cityOf(n), ppl = peopleOf(n), day = DAYW.test(n), intent = null;
    var costS = r.sc[9], crowdS = r.sc[3] + (day ? 3 : 0);
    if ((costS > 0 && costS >= crowdS) || (top === 0 && (city || ppl) && lastIntent === "cost") || (top === 0 && city && ppl)) intent = "cost";
    else if (r.sc[3] > 0 || (day && (top === 0 || best === 3)) || (top === 0 && lastIntent === "crowd" && day)) intent = "crowd";
    if (remember) lastIntent = intent || (best > -1 ? "kb" : lastIntent);

    if (intent === "cost" && window.nktPlan){
      var from = city || (lastCost && lastCost.from) || "delhi", pp = ppl || (lastCost && lastCost.people) || 2;
      var qd = window.nktPlan.quote({from:from, people:pp});
      if (remember) lastCost = {from:qd.o.from, people:qd.o.people};
      var text = l === "hi"
        ? qd.label + " के लिए कुल लगभग " + money(qd.total) + " (संभावित " + money(qd.low) + " – " + money(qd.high) + ")। प्लानर में शहर, साधन या रातें बदलकर देखें।" + (city ? "" : " टिप: ऐसे पूछें — 'लखनऊ से 4 लोगों का खर्च'।")
        : "About " + money(qd.total) + " in total for " + qd.label + " (likely " + money(qd.low) + " – " + money(qd.high) + "). Change the city, travel mode or nights in the planner." + (city ? "" : " Tip: ask like 'cost from Lucknow for 4 people'.");
      return {text:text, link:'<button type="button" class="ask-more ask-open" data-from="' + qd.o.from + '" data-people="' + qd.o.people + '">' + U.openPlan + ' →</button>'};
    }
    if (intent === "crowd" && window.nktCrowd){
      var C = window.nktCrowd, ds = C.days(8), today = ds[0], calm = ds[0], sat = null, sun = null, LV = C.LV[l];
      ds.forEach(function(d){ if (d.lvl < calm.lvl) calm = d; if (!sat && d.d.getUTCDay() === 6) sat = d; if (!sun && d.d.getUTCDay() === 0) sun = d; });
      sat = sat || today; sun = sun || today;
      var t2 = l === "hi"
        ? "हमारा अनुमान: आज (" + C.label(today.d) + ") भीड़ " + LV[today.lvl] + "। इस वीकेंड: शनिवार " + LV[sat.lvl] + ", रविवार " + LV[sun.lvl] + "। इस हफ़्ते सबसे शांत दिन: " + C.label(calm.d) + "। कार्यदिवस की सुबह दर्शन में लगभग 1–2 घंटे और वीकेंड पर कई घंटे लगते हैं; सुबह 6 से 8 बजे लाइन सबसे छोटी होती है। (अनुमान, आधिकारिक नहीं)"
        : "Our estimate: today (" + C.label(today.d) + ") looks " + LV[today.lvl].toLowerCase() + ". This weekend: Saturday " + LV[sat.lvl].toLowerCase() + ", Sunday " + LV[sun.lvl].toLowerCase() + ". Calmest day this week: " + C.label(calm.d) + ". Darshan takes about 1–2 hours on a weekday morning and several hours on weekends; weekday mornings between 6 and 8 AM have the shortest queues. (Estimate, not official.)";
      return {text:t2, link:'<a class="ask-more" href="#crowd">' + U.crowd + ' →</a>'};
    }
    if (best > -1){
      var e = KB[best];
      return {text:e.a[l], link:'<a class="ask-more" href="' + e.s + '">' + U.more + " " + e.l[l] + " →</a>"};
    }
    var sug = r.near.map(function(v, i){ return [v, i]; }).filter(function(x){ return x[0] > 0; }).sort(function(a, b){ return b[0] - a[0]; }).slice(0, 3).map(function(x){ return x[1]; });
    if (!sug.length) sug = [0, 8, 9];
    return {text:U.none, link:'<div class="ask-sugg"><span>' + U.dym + '</span>' + sug.map(function(i){ return '<button type="button" data-q="' + esc(QS[i][l === "hi" ? 1 : 0]) + '">' + esc(QS[i][l === "hi" ? 1 : 0]) + '</button>'; }).join("") +
      '</div><a class="ask-more" href="https://whatsapp.com/channel/0029VbDgY4nIiRoyCXgAjm0I" target="_blank" rel="noopener">' + U.wa + " →</a>"};
  }
  var out = document.getElementById("askOut"), input = document.getElementById("askInput"), form = document.getElementById("askForm");
  var lastQ = null, isExample = true, timer = null;
  function render(q, animate, remember){
    var res = answer(q, remember);
    var body = animate && !reduce
      ? res.text.split(" ").map(function(w, i){ return '<span class="w" style="--n:' + i + '">' + esc(w) + "</span>"; }).join(" ")
      : esc(res.text);
    out.innerHTML = '<p class="ask-q">' + esc(q) + '</p><p class="ask-a">' + body + "</p>" + res.link;
  }
  /* recent questions: kept on this phone only, and only after the visitor allowed saving */
  function recentList(){ try { return JSON.parse(localStorage.getItem("nkt-recent") || "[]"); } catch(e){ return []; } }
  function rememberQ(q){
    try {
      if (localStorage.getItem("nkt-save") !== "yes") return;
      var a = recentList().filter(function(x){ return x.toLowerCase() !== q.toLowerCase(); });
      a.unshift(q); localStorage.setItem("nkt-recent", JSON.stringify(a.slice(0, 5)));
    } catch(e){}
    showRecent();
  }
  function showRecent(){
    var box = document.getElementById("askRecent"); if (!box) return;
    var a = recentList(), U = UI[L()];
    if (!a.length){ box.hidden = true; box.innerHTML = ""; return; }
    box.hidden = false;
    box.innerHTML = '<span>🕘 ' + U.recent + '</span>' + a.map(function(q){ return '<button type="button" data-q="' + esc(q) + '">' + esc(q) + '</button>'; }).join("") + '<button type="button" class="rc-clear">' + U.clear + '</button>';
  }
  document.addEventListener("nkt-saved-cleared", showRecent);
  function ask(q){
    q = (q || "").trim();
    if (!q || !out) return;
    lastQ = q; isExample = false;
    clearTimeout(timer);
    rememberQ(q);
    if (reduce){ render(q, false, true); return; }
    out.innerHTML = '<p class="ask-q">' + esc(q) + '</p><p class="thinking" aria-label="…"><span></span><span></span><span></span></p>';
    timer = setTimeout(function(){ render(q, true, true); }, 450);
  }
  var askCard = document.querySelector(".ask-card");
  if (askCard) askCard.addEventListener("click", function(ev){
    var b = ev.target.closest && ev.target.closest("button"); if (!b) return;
    if (b.classList.contains("rc-clear")){ try { localStorage.removeItem("nkt-recent"); } catch(e){} showRecent(); return; }
    if (b.classList.contains("ask-open") && window.nktPlan){ window.nktPlan.open({from:b.getAttribute("data-from"), people:+b.getAttribute("data-people"), mode:"", nights:1, tier:1, sights:true}); return; }
    var dq = b.getAttribute("data-q");
    if (dq && (b.closest(".ask-sugg") || b.closest(".ask-recent"))){ input.value = dq; ask(dq); }
  });
  if (form){
    form.addEventListener("submit", function(ev){ ev.preventDefault(); ask(input.value); });
    $$(".ask-chips button").forEach(function(b){
      b.addEventListener("click", function(){
        var span = b.querySelector('[lang="' + L() + '"]');
        var q = (span || b).textContent.trim();
        input.value = q; ask(q);
      });
    });
  }
  function onLang(){
    if (input) input.placeholder = UI[L()].ph;
    if (out){
      if (isExample) render(UI[L()].example, false);
      else if (lastQ) render(lastQ, false);
    }
    startTicker();
  }
  new MutationObserver(onLang).observe(root, {attributes:true, attributeFilter:["data-lang"]});
  showRecent();
  onLang();
})();
} catch (e) { if (window.console) console.error('nkt part 2', e); }
});

/* ===== part 3 ===== */
NKT_PARTS.push(function () {
try {
/* ================================================================
   ADVANCED MOTION: live sky, route map, crowd meter, card tilt
   ================================================================ */
(function(){
  var $ = function(s, r){ return (r || document).querySelector(s); };
  var $$ = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var calm = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  var root = document.documentElement;
  function L(){ return root.getAttribute("data-lang") === "hi" ? "hi" : "en"; }
  function istNow(){ return new Date(Date.now() + 330 * 60000); } /* read with getUTC* = time in India */

  /* ---------- 1. LIVE SKY: the hero follows the time of day in India ---------- */
  var hero = $("#hero"), skyNow = $("#skyNow");
  if (hero){
    var stars = $(".stars", hero);
    if (stars && !stars.children.length){
      var seed = 7, rnd = function(){ seed = (seed * 16807) % 2147483647; return seed / 2147483647; }, html = "";
      for (var i = 0; i < 70; i++){
        var s = (1 + rnd() * 1.6).toFixed(1), cls = i % 5 === 0 ? "b" : (i % 7 === 0 ? "c" : "");
        html += '<i class="' + cls + '" style="left:' + (rnd() * 100).toFixed(1) + '%;top:' + (rnd() * 100).toFixed(1) + '%;width:' + s + 'px;height:' + s + 'px;opacity:' + (.45 + rnd() * .55).toFixed(2) + '"></i>';
      }
      stars.innerHTML = html;
    }
    var forced = (location.search.match(/[?&]sky=(dawn|day|dusk|night)/) || [])[1];
    var NAMES = {en:{dawn:"🌅 Dawn", day:"☀️ Daytime", dusk:"🌇 Evening", night:"🌙 Night"},
                 hi:{dawn:"🌅 भोर", day:"☀️ दिन", dusk:"🌇 शाम", night:"🌙 रात"}};
    var sky = function(){
      var d = istNow(), h = d.getUTCHours(), m = d.getUTCMinutes(), hh = h + m / 60;
      var ph = forced || (hh >= 19.25 || hh < 5 ? "night" : hh < 7.5 ? "dawn" : hh < 16.5 ? "day" : "dusk");
      if (hero.getAttribute("data-sky") !== ph) hero.setAttribute("data-sky", ph);
      if (skyNow){
        var t = ((h % 12) || 12) + ":" + (m < 10 ? "0" : "") + m + (h < 12 ? " AM" : " PM");
        skyNow.textContent = L() === "hi" ? NAMES.hi[ph] + " · कैंची में अभी " + t : NAMES.en[ph] + " at Kainchi · " + t;
      }
    };
    sky();
    setInterval(sky, 60000);
    new MutationObserver(sky).observe(root, {attributes:true, attributeFilter:["data-lang"]});
  }

  /* Pause the hero's looping animations while it is off screen (saves battery and keeps scrolling smooth). */
  if (hero && "IntersectionObserver" in window){
    new IntersectionObserver(function(es){ hero.classList.toggle("hero-off", !es[0].isIntersecting); }).observe(hero);
  }

  /* ---------- 2. ROUTE MAP: the car drives Delhi -> Kainchi as you scroll ---------- */
  var map = $("#routemap"), road = $("#rmRoad"), car = $("#rmCar");
  /* Set up only when the map is about to scroll into view: keeps page load light. */
  var initMap = function(){
    var total = road.getTotalLength();
    road.style.strokeDasharray = total + " " + total;
    var samples = [];
    for (var k = 0; k <= 240; k++){ var pt = road.getPointAtLength(total * k / 240); samples.push([pt.x, pt.y, total * k / 240]); }
    var stops = $$(".rm-stop", map).map(function(g){
      var m = (g.getAttribute("transform") || "").match(/translate\(([\d.]+) ([\d.]+)\)/), x = +m[1], y = +m[2], best = 0, bd = 1e9;
      samples.forEach(function(s){ var dd = (s[0] - x) * (s[0] - x) + (s[1] - y) * (s[1] - y); if (dd < bd){ bd = dd; best = s[2]; } });
      return {g:g, key:g.getAttribute("data-stop"), km:+g.getAttribute("data-km"), at:best};
    }).sort(function(a, b){ return a.at - b.at; });
    stops[0].at = 0; stops[stops.length - 1].at = total;
    var NOTES = {
      en:{delhi:["Delhi","Start. Overnight train, or a 6–8 hour drive."],
          moradabad:["Moradabad","About halfway. A common stop for tea or a meal."],
          rampur:["Rampur","Turn north towards Rudrapur and Haldwani."],
          haldwani:["Haldwani","Last big town in the plains. Top up fuel and cash here."],
          kathgodam:["Kathgodam","The railhead. The hill road starts here."],
          bhimtal:["Bhimtal","Lake town. On busy weekends you may have to park here and take the shuttle."],
          bhowali:["Bhowali","9 km to go. Weekend parking and shuttles also run from here."],
          kainchi:["Kainchi Dham 🙏","You've arrived, past the two hairpin bends that give Kainchi its name."]},
      hi:{delhi:["दिल्ली","शुरुआत। रात की ट्रेन, या 6–8 घंटे की ड्राइव।"],
          moradabad:["मुरादाबाद","लगभग आधा रास्ता। चाय या खाने के लिए आम पड़ाव।"],
          rampur:["रामपुर","यहाँ से रुद्रपुर और हल्द्वानी की ओर उत्तर मुड़ें।"],
          haldwani:["हल्द्वानी","मैदान का आख़िरी बड़ा शहर। पेट्रोल और कैश यहीं ले लें।"],
          kathgodam:["काठगोदाम","रेलवे स्टेशन। यहीं से पहाड़ी रास्ता शुरू होता है।"],
          bhimtal:["भीमताल","झील वाला शहर। व्यस्त वीकेंड पर यहीं पार्क करके शटल लेनी पड़ सकती है।"],
          bhowali:["भवाली","बस 9 किमी बाकी। वीकेंड पार्किंग और शटल यहाँ से भी चलती हैं।"],
          kainchi:["कैंची धाम 🙏","पहुँच गए! उन दो हेयरपिन मोड़ों के बाद, जिनसे 'कैंची' नाम पड़ा।"]}};
    var kmOut = $("#rmKm"), noteOut = $("#rmNote"), lastStop = null, lastP = -1;
    var kmAt = function(len){
      for (var i = 1; i < stops.length; i++){
        if (len <= stops[i].at){ var a = stops[i - 1], b = stops[i]; return a.km + (b.km - a.km) * ((len - a.at) / Math.max(1, b.at - a.at)); }
      }
      return stops[stops.length - 1].km;
    };
    var showNote = function(s){
      var n = NOTES[L()][s.key];
      noteOut.innerHTML = "<b>" + n[0] + "</b><span>" + n[1] + "</span>";
    };
    var place = function(p){
      if (Math.abs(p - lastP) < 0.0005) return;
      lastP = p;
      var len = total * p, a = road.getPointAtLength(len), b = road.getPointAtLength(Math.min(total, len + 1.5)), c = road.getPointAtLength(Math.max(0, len - 1.5));
      var ang = Math.atan2(b.y - c.y, b.x - c.x) * 180 / Math.PI, flip = Math.abs(ang) > 90 ? " scale(1 -1)" : "";
      car.setAttribute("transform", "translate(" + a.x.toFixed(1) + " " + a.y.toFixed(1) + ") rotate(" + ang.toFixed(1) + ")" + flip);
      road.style.strokeDashoffset = (total - len).toFixed(1);
      var cur = stops[0];
      stops.forEach(function(s){
        var on = len >= s.at - 0.5;
        if (on) cur = s;
        if (on && !s.g.classList.contains("reached")){ s.g.classList.add("reached", "pop"); setTimeout(function(){ s.g.classList.remove("pop"); }, 520); }
        if (!on) s.g.classList.remove("reached");
      });
      if (kmOut) kmOut.firstChild.nodeValue = Math.round(kmAt(len)) + " km";
      if (cur !== lastStop){ lastStop = cur; showNote(cur); }
    };
    new MutationObserver(function(){ if (lastStop) showNote(lastStop); }).observe(root, {attributes:true, attributeFilter:["data-lang"]});
    if (calm){ place(1); }
    else {
      var queued = false;
      var onScroll = function(){
        if (queued) return; queued = true;
        requestAnimationFrame(function(){
          queued = false;
          var r = map.getBoundingClientRect(), vh = window.innerHeight, h = r.height;
          var span = Math.max(220, vh - h - 190);
          var pr = Math.min(1, Math.max(0, (vh - h - r.top) / span)); place(pr > .985 ? 1 : pr);
        });
      };
      window.addEventListener("scroll", onScroll, {passive:true});
      window.addEventListener("resize", onScroll);
      onScroll();
    }
  };
  if (map && road && car && road.getTotalLength){
    if ("IntersectionObserver" in window){
      var mio = new IntersectionObserver(function(es){ if (es[0].isIntersecting){ mio.disconnect(); initMap(); } }, {rootMargin:"900px 0px"});
      mio.observe(map);
    } else initMap();
  }

  /* ---------- 3. CROWD METER: estimate for today and the next 6 days ---------- */
  var crowd = $("#crowd");
  if (crowd){
    var LV = {en:["Calm","Moderate","Busy","Very busy"], hi:["शांत","सामान्य","ज़्यादा भीड़","बहुत ज़्यादा भीड़"]};
    var TIP = {en:["A good day for a peaceful darshan.","Some queues. Reach early in the morning.","Long queues likely. Arrive before 8 AM; parking may be shuttle-only.","Very heavy crowds. Expect diversions, shuttle-only access and full hotels."],
               hi:["शांति से दर्शन के लिए अच्छा दिन।","कुछ कतारें। सुबह जल्दी पहुँचें।","लंबी कतारें संभव। सुबह 8 बजे से पहले पहुँचें; पार्किंग सिर्फ़ शटल वाली हो सकती है।","बहुत भारी भीड़। डायवर्ज़न, सिर्फ़ शटल से पहुँच और भरे होटल मानकर चलें।"]};
    var WHY = {en:{weekend:"weekend", weekday:"weekday", peak:"peak season", hols:"holiday season", ph:"public holiday", fair:"Foundation Day fair", samadhi:"Maharaj-ji's samadhi day", busy:"announced big crowd day", why:"Why: "},
               hi:{weekend:"वीकेंड", weekday:"आम दिन", peak:"पीक सीज़न", hols:"छुट्टियों का मौसम", ph:"सरकारी छुट्टी", fair:"स्थापना दिवस मेला", samadhi:"महाराज जी की समाधि तिथि", busy:"घोषित भीड़ वाला दिन", why:"क्यों: "}};
    var COL = ["#4E9F6A","#D8A31A","#E07B39","#C2412B"], ANG = [-67.5,-22.5,22.5,67.5];
    var PUBLIC = ["01-01","01-26","08-15","10-02","12-25"], FAIR = ["06-14","06-15","06-16"];
    var BUSY = (crowd.getAttribute("data-busy") || "").split(",").map(function(x){ return x.trim(); }).filter(Boolean);
    var estimate = function(dt){
      var dow = dt.getUTCDay(), mo = dt.getUTCMonth(), md = ("0" + (mo + 1)).slice(-2) + "-" + ("0" + dt.getUTCDate()).slice(-2);
      var lvl = [2,1,0,0,0,1,2][dow], why = [dow === 0 || dow === 6 ? "weekend" : "weekday"];
      var hols = (mo === 11 && dt.getUTCDate() >= 24) || (mo === 0 && dt.getUTCDate() <= 1);
      if (hols){ lvl++; why.push("hols"); }
      else if ([2,3,4,5,8,9,10].indexOf(mo) > -1){ lvl++; why.push("peak"); }
      if (PUBLIC.indexOf(md) > -1){ lvl = Math.max(lvl + 1, 2); why.push("ph"); }
      if (md === "09-11"){ lvl++; why.push("samadhi"); }
      if (FAIR.indexOf(md) > -1){ lvl = 3; why = ["fair"]; }
      if (BUSY.indexOf(dt.getUTCFullYear() + "-" + md) > -1){ lvl = 3; why = ["busy"]; }
      return {lvl:Math.min(3, lvl), why:why};
    };
    var t0 = istNow(), days = [];
    for (var j = 0; j < 7; j++){ var dt = new Date(Date.UTC(t0.getUTCFullYear(), t0.getUTCMonth(), t0.getUTCDate() + j)); var e = estimate(dt); days.push({d:dt, lvl:e.lvl, why:e.why}); }
    var sel = 0, shown = false, needle = $("#crowdNeedle");
    var DF = {};
    var fmtDay = function(dt, opt){
      try {
        var key = L() + JSON.stringify(opt);
        if (!DF[key]) DF[key] = new Intl.DateTimeFormat(L() === "hi" ? "hi-IN" : "en-IN", Object.assign({timeZone:"UTC"}, opt));
        return DF[key].format(dt);
      } catch(e){ return dt.toUTCString().slice(0, 10); }
    };
    var paint = function(){
      var x = days[sel], lg = L();
      crowd.style.setProperty("--lvl", COL[x.lvl]);
      $("#crowdLevel").textContent = LV[lg][x.lvl];
      $("#crowdTip").textContent = TIP[lg][x.lvl] + " " + WHY[lg].why + x.why.map(function(w){ return WHY[lg][w]; }).join(" + ") + ".";
      $("#crowdDate").textContent = (sel === 0 ? (lg === "hi" ? "आज, " : "Today, ") : "") + fmtDay(x.d, {weekday:"short", day:"numeric", month:"short"});
      if (shown && needle) needle.style.transform = "rotate(" + ANG[x.lvl] + "deg)";
      $("#crowdDays").innerHTML = days.map(function(y, i){
        return '<button type="button" aria-pressed="' + (i === sel) + '" data-i="' + i + '" style="--lvl:' + COL[y.lvl] + '" aria-label="' + fmtDay(y.d, {weekday:"long", day:"numeric", month:"long"}) + ': ' + LV[lg][y.lvl] + '">' +
          '<span>' + (i === 0 ? (lg === "hi" ? "आज" : "Today") : fmtDay(y.d, {weekday:"short"})) + '</span><b>' + y.d.getUTCDate() + '</b><i></i></button>';
      }).join("");
    };
    $("#crowdDays").addEventListener("click", function(e){ var b = e.target.closest("button"); if (!b) return; sel = +b.getAttribute("data-i"); paint(); var nb = $('#crowdDays button[data-i="' + sel + '"]'); if (nb) nb.focus(); });
    paint();
    window.nktCrowd = {
      LV:LV, COL:COL,
      at:function(dt){ return estimate(dt); },
      days:function(n){ var t = istNow(), list = []; for (var q = 0; q < n; q++){ var dd = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate() + q)), ee = estimate(dd); list.push({d:dd, lvl:ee.lvl, why:ee.why}); } return list; },
      label:function(dt){ return fmtDay(dt, {weekday:"short", day:"numeric", month:"short"}); }
    };
    if (window.nktPlanRefresh) window.nktPlanRefresh();
    var reveal = function(){ shown = true; if (needle) needle.style.transform = "rotate(" + ANG[days[sel].lvl] + "deg)"; };
    if (calm || !("IntersectionObserver" in window)) reveal();
    else new IntersectionObserver(function(en, ob){ if (en[0].isIntersecting){ setTimeout(reveal, 250); ob.disconnect(); } }, {threshold:.5}).observe(crowd);
    new MutationObserver(paint).observe(root, {attributes:true, attributeFilter:["data-lang"]});
  }

  /* ---------- 4. CARD LIFT & TILT: cards lean toward the finger or mouse ---------- */
  if (!calm){
    $$(".stay, .route, .stat").forEach(function(c){
      c.classList.add("tilt");
      c.addEventListener("animationend", function(e){ if (e.animationName === "reveal") c.classList.add("settled"); });
      var settle = function(){
        if (c.classList.contains("settled")) return;
        if (!c.getAnimations || c.getAnimations().every(function(a){ return a.playState !== "running"; })) c.classList.add("settled");
      };
      var aim = function(e){
        var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.setProperty("--ry", ((x - .5) * 8).toFixed(2) + "deg");
        c.style.setProperty("--rx", ((.5 - y) * 6).toFixed(2) + "deg");
        c.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
        c.style.setProperty("--my", (y * 100).toFixed(1) + "%");
      };
      var rest = function(){ c.classList.remove("active"); c.style.removeProperty("--rx"); c.style.removeProperty("--ry"); };
      c.addEventListener("pointerenter", function(e){ if (e.pointerType === "mouse"){ settle(); c.classList.add("active"); aim(e); } });
      c.addEventListener("pointermove", function(e){ if (e.pointerType === "mouse" && c.classList.contains("active")) aim(e); });
      c.addEventListener("pointerleave", function(e){ if (e.pointerType === "mouse") rest(); });
      c.addEventListener("pointerdown", function(e){ if (e.pointerType !== "mouse"){ settle(); c.classList.add("active"); aim(e); } });
      c.addEventListener("pointerup", function(e){ if (e.pointerType !== "mouse") setTimeout(rest, 160); });
      c.addEventListener("pointercancel", rest);
    });
  }
})();
} catch (e) { if (window.console) console.error('nkt part 3', e); }
});

/* ===== part 4 ===== */
NKT_PARTS.push(function () {
try {
/* ================================================================
   LIGHT / DARK BUTTON — remembers the visitor's choice (nkt-theme)
   ================================================================ */
(function(){
  var root = document.documentElement, btn = document.getElementById("themeBtn");
  var mq = window.matchMedia ? matchMedia("(prefers-color-scheme: dark)") : null;
  function current(){ var t = root.getAttribute("data-theme"); return t || (mq && mq.matches ? "dark" : "light"); }
  function sync(){
    var dark = current() === "dark";
    root.classList.toggle("theme-dark", dark);
    if (btn){
      var hi = root.getAttribute("data-lang") === "hi";
      btn.setAttribute("aria-label", dark ? (hi ? "लाइट मोड चालू करें" : "Switch to light mode") : (hi ? "डार्क मोड चालू करें" : "Switch to dark mode"));
    }
  }
  if (btn) btn.addEventListener("click", function(){
    var next = current() === "dark" ? "light" : "dark";
    var go = function(){ root.setAttribute("data-theme", next); sync(); };
    root.classList.add("theme-anim");
    if (document.startViewTransition && !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) document.startViewTransition(go); else go();
    setTimeout(function(){ root.classList.remove("theme-anim"); }, 600);
    try { localStorage.setItem("nkt-theme", next); } catch(e){}
  });
  if (mq && mq.addEventListener) mq.addEventListener("change", sync);
  new MutationObserver(sync).observe(root, {attributes:true, attributeFilter:["data-lang"]});
  sync();
})();
} catch (e) { if (window.console) console.error('nkt part 4', e); }
});

/* ===== part 5 ===== */
NKT_PARTS.push(function () {
try {
/* ================================================================
   FILTERS (stays, nearby places) + RULES ALERT BAR
   ================================================================ */
(function(){
  var root = document.documentElement;
  function hi(){ return root.getAttribute("data-lang") === "hi"; }
  document.querySelectorAll(".filters").forEach(function(group){
    var items = [].slice.call(document.querySelectorAll(group.getAttribute("data-target")));
    var count = group.querySelector(".f-count"), current = "all";
    function apply(f, animate){
      current = f;
      var keys = f.split(" "), shown = 0;
      items.forEach(function(el){
        var tags = (el.getAttribute("data-tags") || "").split(" ");
        var on = f === "all" || keys.some(function(k){ return tags.indexOf(k) > -1; });
        el.classList.toggle("f-hide", !on);
        if (on){ shown++; if (animate){ el.classList.remove("f-in"); void el.offsetWidth; el.classList.add("f-in"); } }
      });
      if (count) count.textContent = f === "all" ? "" : (hi() ? items.length + " में से " + shown : "Showing " + shown + " of " + items.length);
    }
    group.addEventListener("click", function(e){
      var b = e.target.closest("button"); if (!b) return;
      group.querySelectorAll("button").forEach(function(x){ x.setAttribute("aria-pressed", String(x === b)); });
      apply(b.getAttribute("data-f"), true);
    });
    new MutationObserver(function(){ apply(current, false); }).observe(root, {attributes:true, attributeFilter:["data-lang"]});
  });

  var bar = document.getElementById("alertBar");
  if (bar && bar.getAttribute("data-active") === "true" && (bar.querySelector(".ab-en").textContent.trim() || bar.querySelector(".ab-hi").textContent.trim())){
    bar.hidden = false;
    bar.querySelector(".ab-x").addEventListener("click", function(){ bar.hidden = true; });
  }
})();
} catch (e) { if (window.console) console.error('nkt part 5', e); }
});

/* ===== part 6 ===== */
NKT_PARTS.push(function () {
try {
/* ================================================================
   HERO: words rise in, the key phrase rotates a few times, and diya lights
   drift up and glow toward your finger. Everything pauses off screen,
   and stays off for reduced-motion users and data-saver mode.
   ================================================================ */
(function(){
  var hero = document.getElementById("hero"); if (!hero) return;
  var root = document.documentElement;
  var calm = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  var conn = navigator.connection || {};
  var lite = conn.saveData || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || (navigator.deviceMemory && navigator.deviceMemory <= 4);
  function visible(){ return !hero.classList.contains("hero-off") && !document.hidden; }

  /* --- 1. dynamic headline --- */
  var ALT = {en:["parking sorted", "crowds avoided", "costs clear"], hi:["भीड़ से बचकर", "खर्च पहले से तय", "पार्किंग तय"]};
  var h1 = hero.querySelector("h1"), rots = [];
  if (h1){
    [].slice.call(h1.querySelectorAll("span[lang]")).forEach(function(sp){
      var lg = sp.getAttribute("lang"), txt = sp.textContent.trim(), cut = txt.indexOf(",");
      if (cut < 0) return;
      var lead = txt.slice(0, cut + 1), rest = txt.slice(cut + 1).trim(), k = 0;
      var words = lead.split(" ").map(function(w){ return '<span class="wd" style="--k:' + (k++) + '">' + w + '</span>'; }).join(" ");
      sp.innerHTML = words + ' <span class="rot" aria-hidden="true" style="--k:' + k + '"><span class="on">' + rest + '</span>' +
        (calm ? "" : ALT[lg].map(function(a){ return '<span>' + a + '</span>'; }).join("")) + '</span><span class="sr-only">' + rest + '</span>';
      var rot = sp.querySelector(".rot");
      rots.push(rot);
    });
    /* never let a shorter alternative make the headline jump: drop any phrase wider than the original */
    var textW = function(el){ var r = document.createRange(); r.selectNodeContents(el); return r.getBoundingClientRect().width; };
    var prune = function(){ rots.forEach(function(rot){
      var items = [].slice.call(rot.children), w0 = textW(items[0]);
      if (!w0) return;
      items.slice(1).forEach(function(it){ if (textW(it) > w0 + 1) it.remove(); });
    }); };
    prune();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(prune);
    if (!calm){
      var cycles = 0, idx = 0, MAX = 2;
      var tick = function(){
        if (!visible()) return;
        rots.forEach(function(rot){
          if (!rot.offsetParent) return;
          var items = rot.children, n = items.length; if (n < 2) return;
          var cur = idx % n, nxt = (idx + 1) % n;
          items[cur].classList.remove("on"); items[cur].classList.add("out");
          items[nxt].classList.remove("out"); items[nxt].classList.add("on");
          setTimeout(function(){ items[cur].classList.remove("out"); }, 600);
        });
        idx++;
        var n0 = rots[0] ? rots[0].children.length : 1;
        if (idx % Math.max(1, n0) === 0 && ++cycles >= MAX) clearInterval(timer);
      };
      var timer;
      setTimeout(function(){ timer = setInterval(tick, 2600); }, 2400);
    }
  }

  /* --- 2. interactive diya particles (canvas) --- */
  if (calm || conn.saveData || !window.requestAnimationFrame) return;
  var cv = document.createElement("canvas"), ctx = cv.getContext && cv.getContext("2d");
  if (!ctx) return;
  cv.className = "diya-fx"; cv.setAttribute("aria-hidden", "true");
  var stars = hero.querySelector(".stars");
  hero.insertBefore(cv, stars ? stars.nextSibling : hero.firstChild);
  hero.classList.add("fx-on");
  var small = window.innerWidth < 600;
  var DPR = Math.min(window.devicePixelRatio || 1, small ? 1 : 1.5), W = 0, H = 0, N = lite ? 18 : (small ? 24 : 38), P = [];
  /* while the page is being scrolled, hold the particles still: scrolling stays smooth */
  var scrolling = false, sTimer;
  window.addEventListener("scroll", function(){
    if (!scrolling){ scrolling = true; cv.style.visibility = "hidden"; }
    clearTimeout(sTimer); sTimer = setTimeout(function(){ scrolling = false; cv.style.visibility = ""; }, 160);
  }, {passive:true});
  var sprite = document.createElement("canvas"); sprite.width = sprite.height = 64;
  var sg = sprite.getContext("2d"), g = sg.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,243,196,1)"); g.addColorStop(.25, "rgba(244,199,102,.85)"); g.addColorStop(.6, "rgba(232,163,23,.25)"); g.addColorStop(1, "rgba(232,163,23,0)");
  sg.fillStyle = g; sg.fillRect(0, 0, 64, 64);
  function size(){ var r = hero.getBoundingClientRect(); W = r.width; H = r.height; cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR); ctx.setTransform(DPR, 0, 0, DPR, 0, 0); }
  function spawn(p, anywhere){
    p.x = Math.random() * W; p.y = anywhere ? Math.random() * H : H + 10 + Math.random() * 40;
    p.vx = (Math.random() - .5) * .25; p.vy = -(.18 + Math.random() * .42);
    p.r = 5 + Math.random() * 9; p.ph = Math.random() * 6.28; p.glow = 0; return p;
  }
  size(); for (var i = 0; i < N; i++) P.push(spawn({}, true));
  if (window.ResizeObserver) new ResizeObserver(size).observe(hero); else window.addEventListener("resize", size);
  var ptr = {x:-999, y:-999, on:false};
  hero.addEventListener("pointermove", function(e){ var r = hero.getBoundingClientRect(); ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.on = true; }, {passive:true});
  hero.addEventListener("pointerdown", function(e){ var r = hero.getBoundingClientRect(); ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.on = true; }, {passive:true});
  hero.addEventListener("pointerleave", function(){ ptr.on = false; });
  hero.addEventListener("pointerup", function(e){ if (e.pointerType !== "mouse") setTimeout(function(){ ptr.on = false; }, 900); });
  var last = 0, step = (lite || small) ? 1000 / 30 : 1000 / 60;
  function loop(t){
    requestAnimationFrame(loop);
    if (!visible() || scrolling || t - last < step - 1) return;
    var dt = Math.min(3, (t - last) / 16.7); last = t;
    var sky = hero.getAttribute("data-sky"), base = sky === "night" ? 1 : sky === "day" ? .5 : .8;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0; i < P.length; i++){
      var p = P[i];
      if (ptr.on){
        var dx = ptr.x - p.x, dy = ptr.y - p.y, d2 = dx * dx + dy * dy;
        if (d2 < 160 * 160){ var f = .018 * (1 - Math.sqrt(d2) / 160); p.vx += dx * f * .05 * dt; p.vy += dy * f * .05 * dt; p.glow = Math.min(1, p.glow + .08 * dt); }
      }
      p.vx *= .985; p.vy = p.vy * .985 - .004 * dt;
      p.x += (p.vx + Math.sin(t / 1400 + p.ph) * .12) * dt; p.y += p.vy * dt;
      p.glow = Math.max(0, p.glow - .01 * dt);
      if (p.y < -20 || p.x < -30 || p.x > W + 30) spawn(p, false);
      var fade = Math.min(1, (H - p.y) / 80) * Math.min(1, (p.y + 20) / (H * .35));
      var a = base * (.45 + .35 * Math.sin(t / 380 + p.ph * 3) + .5 * p.glow) * Math.max(0, fade);
      if (a <= .02) continue;
      var s = p.r * (1 + p.glow * .8);
      ctx.globalAlpha = Math.min(1, a);
      ctx.drawImage(sprite, p.x - s, p.y - s, s * 2, s * 2);
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
  }
  requestAnimationFrame(loop);
})();
} catch (e) { if (window.console) console.error('nkt part 6', e); }
});

/* ===== part 7 ===== */
NKT_PARTS.push(function () {
try {
/* ================================================================
   MICRO-INTERACTIONS: tap ripple + "Opening …" toast for outside links
   ================================================================ */
(function(){
  var calm = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* Tap ripple: a soft circle spreads from the exact point you tap. */
  var HOSTS = ".btn, .stepper button, .ask-chips button, .chips a, .chips-all, .menu-list a, .lang button, footer ul.social a, .consent button, .seg label > span";
  document.addEventListener("pointerdown", function(e){
    if (calm || (e.pointerType === "mouse" && e.button !== 0)) return;
    var t = e.target;
    if (t.matches && t.matches(".seg input")) t = t.nextElementSibling;
    var host = t && t.closest ? t.closest(HOSTS) : null;
    if (!host) return;
    host.classList.add("rp-host");
    var r = host.getBoundingClientRect(), size = Math.max(r.width, r.height) * 2.2;
    var dot = document.createElement("span");
    dot.className = "ripple";
    dot.style.width = dot.style.height = size + "px";
    dot.style.left = (e.clientX - r.left - size / 2) + "px";
    dot.style.top = (e.clientY - r.top - size / 2) + "px";
    host.appendChild(dot);
    setTimeout(function(){ dot.remove(); }, 650);
  }, {passive:true});

  /* "Opening Booking.com…" toast when a link opens in a new tab. */
  var NAMES = {"booking.com":"Booking.com","agoda.com":"Agoda","irctc.co.in":"IRCTC","redbus.in":"redBus","makemytrip.com":"MakeMyTrip",
               "calendar.google.com":"Google Calendar", "wa.me":"WhatsApp","whatsapp.com":"WhatsApp","instagram.com":"Instagram","youtube.com":"YouTube","facebook.com":"Facebook"};
  var box = document.getElementById("toast"), txt = document.getElementById("toastText"), timer;
  function siteName(host){
    host = host.replace(/^www\./, "");
    for (var k in NAMES) if (host === k || host.slice(-k.length - 1) === "." + k) return NAMES[k];
    return host;
  }
  document.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest('a[target="_blank"][href^="http"]');
    if (!a || !box) return;
    var name = siteName(a.hostname);
    var hi = document.documentElement.getAttribute("data-lang") === "hi";
    txt.textContent = hi ? name + " नए टैब में खुल रहा है…" : "Opening " + name + " in a new tab…";
    box.classList.add("show");
    clearTimeout(timer);
    timer = setTimeout(function(){ box.classList.remove("show"); }, 2600);
  });
  document.addEventListener("visibilitychange", function(){ if (!document.hidden && box) { clearTimeout(timer); timer = setTimeout(function(){ box.classList.remove("show"); }, 600); } });
})();
} catch (e) { if (window.console) console.error('nkt part 7', e); }
});

/* ===== part 8 ===== */
NKT_PARTS.push(function () {
try {
/* ================================================================
   GOOGLE ANALYTICS 4 — loads ONLY after the visitor taps Accept.
   Paste your Measurement ID between the quotes, e.g. "G-AB12CD34EF".
   While it is empty, no banner shows and nothing is loaded.
   ================================================================ */
(function(){
  var GA_ID = "G-2941KYJBNX";
  var KEY = "nkt-consent";
  var box = document.getElementById("consent");
  var loaded = false;
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("consent", "default", {analytics_storage:"denied", ad_storage:"denied", ad_user_data:"denied", ad_personalization:"denied"});

  function load(){
    if (loaded || !GA_ID) return;
    loaded = true;
    gtag("consent", "update", {analytics_storage:"granted"});
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", GA_ID, {allow_google_signals:false, allow_ad_personalization_signals:false});
  }
  function choose(v){
    try { localStorage.setItem(KEY, v); } catch(e){}
    box.hidden = true;
    if (v === "granted") load();
  }
  function ask(){ if (GA_ID) box.hidden = false; }

  if (GA_ID) {
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch(e){}
    if (saved === "granted") load();
    else if (saved !== "denied" || location.hash === "#consent") setTimeout(ask, 1200);
  }
  document.querySelectorAll("[data-consent]").forEach(function(b){
    b.addEventListener("click", function(){ choose(b.getAttribute("data-consent")); });
  });
  document.querySelectorAll("[data-consent-open]").forEach(function(b){
    b.addEventListener("click", function(){ if (GA_ID) ask(); else location.href = "/privacy.html"; });
  });

  /* Conversion events: taps on hotel, train, bus and cab links, and Ask-box questions. */
  document.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || !loaded) return;
    var k = a.getAttribute("data-link");
    if (k) gtag("event", "booking_click", {link_type:k, link_url:a.href});
    else if (/whatsapp|instagram|youtube|facebook/.test(a.hostname)) gtag("event", "social_click", {network:a.hostname.replace("www.","")});
  });
  var askForm = document.getElementById("askForm");
  if (askForm) askForm.addEventListener("submit", function(){ if (loaded) gtag("event", "ask_question"); });
})();
} catch (e) { if (window.console) console.error('nkt part 8', e); }
});

/* ===== part 9 ===== */
NKT_PARTS.push(function () {
try {
(function(){
  "use strict";
  var btn = document.getElementById("menuBtn"), sheet = document.getElementById("menuSheet");
  var nav = document.querySelector(".chips nav");
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* fade on the right edge of the tabs, until the visitor has scrolled to the end */
  if (nav){
    var edge = function(){ nav.classList.toggle("at-end", nav.scrollLeft + nav.clientWidth >= nav.scrollWidth - 4); };
    nav.addEventListener("scroll", edge, {passive:true}); window.addEventListener("resize", edge); edge();
  }
  if (!btn || !sheet) return;
  var links = Array.prototype.slice.call(sheet.querySelectorAll(".menu-list a"));
  var closeBtn = sheet.querySelector(".menu-x");
  var timer = 0;
  function markCurrent(){
    var cur = document.querySelector('.chips nav a[aria-current="true"]');
    var href = cur ? cur.getAttribute("href") : "";
    links.forEach(function(a){ if (a.getAttribute("href") === href) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
  }
  function open(){
    clearTimeout(timer); markCurrent();
    sheet.hidden = false; document.body.classList.add("menu-open"); btn.setAttribute("aria-expanded", "true");
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ sheet.classList.add("open"); }); });
    (links.filter(function(a){ return a.getAttribute("aria-current") === "true"; })[0] || links[0] || closeBtn).focus({preventScroll:true});
  }
  function close(back){
    if (sheet.hidden) return;
    sheet.classList.remove("open"); document.body.classList.remove("menu-open"); btn.setAttribute("aria-expanded", "false");
    timer = setTimeout(function(){ sheet.hidden = true; }, reduce ? 0 : 260);
    if (back !== false) btn.focus({preventScroll:true});
  }
  btn.addEventListener("click", open);
  sheet.addEventListener("click", function(e){
    var t = e.target;
    if (t.closest && t.closest("[data-menu-close]")) { close(); return; }
    var a = t.closest && t.closest(".menu-list a");
    if (a) close(false);   /* the link itself then scrolls to the section */
  });
  document.addEventListener("keydown", function(e){
    if (sheet.hidden) return;
    if (e.key === "Escape"){ e.preventDefault(); close(); return; }
    if (e.key === "Tab"){
      var f = [closeBtn].concat(links); var i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0){ e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1){ e.preventDefault(); f[0].focus(); }
    }
  });
  /* turning the phone sideways or resizing to a wide screen closes the list */
  window.addEventListener("resize", function(){ if (!sheet.hidden && window.innerWidth >= 960) close(false); });
})();
} catch (e) { if (window.console) console.error('nkt part 9', e); }
});

/* ===== part 10 ===== */
NKT_PARTS.push(function () {
try {
/* ================================================================
   LIGHT EFFECTS (WebGL): loads fx.js only for visitors whose phone can handle it.
   ON for everyone by default (FX_DEFAULT). Turn it off on one phone with  neemkarolitrip.com/?fx=off ;
   set FX_DEFAULT = false to disable for all. Never loads with reduced motion, Data Saver, 2G, or a very low-end phone.
   ================================================================ */
(function(){
  var FX_DEFAULT = true;
  var q = location.search, v = null;
  try {
    if (/[?&]fx=1\b/.test(q)) localStorage.setItem("nkt-fx", "on");
    if (/[?&]fx=force\b/.test(q)) localStorage.setItem("nkt-fx", "force");
    if (/[?&]fx=off\b/.test(q)) localStorage.setItem("nkt-fx", "off");
    v = localStorage.getItem("nkt-fx");
  } catch (e) { v = /[?&]fx=1\b/.test(q) ? "on" : null; }
  if (v === "off" || !(v === "on" || v === "force" || (FX_DEFAULT && v === null))) return;
  var conn = navigator.connection || {}, force = v === "force";
  if (!force){
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || "")) return;
    if ((navigator.deviceMemory && navigator.deviceMemory <= 2) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2)) return;
  }
  if (!window.requestAnimationFrame) return;
  function go(){
    var s = document.createElement("script");
    s.async = true; s.src = "/fx.js?v=20261031";
    document.head.appendChild(s);
  }
  function later(){ if (window.requestIdleCallback) requestIdleCallback(go, {timeout: 3000}); else setTimeout(go, 1500); }
  if (document.readyState === "complete") later(); else window.addEventListener("load", later);
})();
} catch (e) { if (window.console) console.error('nkt part 10', e); }
});

/* ===== part 11: tap haptics, opt-in bell sound, WhatsApp enquiry ===== */
NKT_PARTS.push(function () {
try {
(function(){
  /* Put your WhatsApp number here with country code and no + or spaces, e.g. "919876543210".
     While it is empty the enquiry form stays hidden. */
  var WA_NUMBER = "";
  /* Used while WA_NUMBER is empty: the form opens the visitor's email app. Brand address, safe to show. */
  var ENQ_EMAIL = "neemkarolitrip@gmail.com";

  var rm = false;
  try { rm = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
  var vib = navigator.vibrate ? navigator.vibrate.bind(navigator) : null;
  var sound = false;
  try { sound = localStorage.getItem("nkt-sound") === "on"; } catch (e) {}
  var ctx = null, last = 0;

  function bell(){
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!ctx) ctx = new AC();
      if (ctx.state === "suspended") ctx.resume();
      var t = ctx.currentTime, out = ctx.createGain();
      out.gain.value = 0.05; out.connect(ctx.destination);
      [[1,.5],[2.01,.26],[3.02,.12],[4.2,.06]].forEach(function(p){
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = "sine"; o.frequency.value = 523.25 * p[0];
        g.gain.setValueAtTime(p[1], t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
        o.connect(g); g.connect(out); o.start(t); o.stop(t + 1.6);
      });
    } catch (e) {}
  }

  document.addEventListener("click", function(e){
    var t = e.target.closest && e.target.closest(".btn,.chips-all,.menu-list a,.stepper button,.ask-chips button,[data-link],.seg label,.sound-toggle");
    if (!t) return;
    var n = Date.now(); if (n - last < 150) return; last = n;
    if (vib && !rm) { try { vib(10); } catch (e) {} }
    if (sound && !t.classList.contains("sound-toggle")) bell();
  }, true);

  var sb = document.getElementById("soundBtn");
  if (sb) {
    sb.setAttribute("aria-pressed", sound ? "true" : "false");
    sb.addEventListener("click", function(){
      sound = !sound;
      sb.setAttribute("aria-pressed", sound ? "true" : "false");
      try { localStorage.setItem("nkt-sound", sound ? "on" : "off"); } catch (e) {}
      if (sound) bell();
    });
  }

  /* WhatsApp enquiry: builds a ready message, nothing is stored or sent to our server. */
  var sec = document.getElementById("enquiry"), f = document.getElementById("enqForm");
  var viaWa = /^\d{10,15}$/.test(WA_NUMBER);
  if (sec && f && (viaWa || ENQ_EMAIL)) {
    sec.setAttribute("data-via", viaWa ? "wa" : "mail");
    sec.hidden = false;
    var d = document.getElementById("enqDate");
    if (d) { var x = new Date(); d.min = x.getFullYear() + "-" + ("0"+(x.getMonth()+1)).slice(-2) + "-" + ("0"+x.getDate()).slice(-2); }
    f.addEventListener("submit", function(e){
      e.preventDefault();
      var nm = document.getElementById("enqName").value.trim();
      if (!nm) { document.getElementById("enqName").focus(); return; }
      var dt = d.value ? (function(v){var z=v.split("-"),M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return +z[2]+" "+M[+z[1]-1]+" "+z[0];})(d.value) : "", ppl = document.getElementById("enqPeople").value || "2",
          fr = document.getElementById("enqFrom").value, q = document.getElementById("enqMsg").value.trim();
      var hi = document.documentElement.getAttribute("data-lang") === "hi";
      var m = hi
        ? "नमस्ते नीम करोली ट्रिप, मैं " + nm + " हूँ। " + (dt ? dt + " को " : "") + fr + " से " + ppl + " लोग कैंची धाम जाने की योजना बना रहे हैं।" + (q ? " " + q : "") + " (neemkarolitrip.com से)"
        : "Hello Neem Karoli Trip, I am " + nm + ". We are " + ppl + " people planning to visit Kainchi Dham" + (dt ? " on " + dt : "") + ", starting from " + fr + "." + (q ? " " + q : "") + " (from neemkarolitrip.com)";
      var c = null; try { c = localStorage.getItem("nkt-consent"); } catch (er) {}
      if (c === "granted" && window.gtag) window.gtag("event", "enquiry_submit");
      if (viaWa) window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(m), "_blank", "noopener");
      else location.href = "mailto:" + ENQ_EMAIL + "?subject=" + encodeURIComponent(hi ? "कैंची धाम यात्रा पूछताछ" : "Kainchi Dham trip enquiry") + "&body=" + encodeURIComponent(m);
    });
  }
})();
} catch (e) { if (window.console) console.error('nkt part 11', e); }
});

/* ===== part 12: live weather (only when the visitor taps the button) ===== */
NKT_PARTS.push(function () {
try {
(function(){
  var btn = document.getElementById("wxBtn"), out = document.getElementById("wxOut");
  if (!btn || !out) return;
  var WX = {0:["☀️","Clear","साफ़"],1:["🌤️","Mostly clear","ज़्यादातर साफ़"],2:["⛅","Partly cloudy","आंशिक बादल"],3:["☁️","Cloudy","बादल"],
    45:["🌫️","Fog","कोहरा"],48:["🌫️","Fog","कोहरा"],51:["🌦️","Drizzle","बूँदाबाँदी"],53:["🌦️","Drizzle","बूँदाबाँदी"],55:["🌦️","Drizzle","बूँदाबाँदी"],
    61:["🌧️","Rain","बारिश"],63:["🌧️","Rain","बारिश"],65:["🌧️","Heavy rain","तेज़ बारिश"],71:["🌨️","Snow","बर्फ़"],73:["🌨️","Snow","बर्फ़"],75:["🌨️","Snow","बर्फ़"],
    80:["🌦️","Showers","बौछारें"],81:["🌧️","Showers","बौछारें"],82:["⛈️","Heavy showers","तेज़ बौछारें"],95:["⛈️","Thunderstorm","आँधी-तूफ़ान"],96:["⛈️","Thunderstorm","आँधी-तूफ़ान"],99:["⛈️","Thunderstorm","आँधी-तूफ़ान"]};
  function wx(c){ return WX[c] || WX[c - (c % 10)] || ["🌡️","Weather","मौसम"]; }
  function two(en, hi){ return '<span lang="en">' + en + '</span><span lang="hi">' + hi + '</span>'; }
  var DAY = {en:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"], hi:["रवि","सोम","मंगल","बुध","गुरु","शुक्र","शनि"]};
  btn.addEventListener("click", function(){
    btn.disabled = true;
    out.innerHTML = two("Loading…", "लोड हो रहा है…");
    var url = "https://api.open-meteo.com/v1/forecast?latitude=29.34&longitude=79.51&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FKolkata&forecast_days=3";
    fetch(url).then(function(r){ if (!r.ok) throw 0; return r.json(); }).then(function(d){
      var c = wx(d.current.weather_code), h = '<div class="wx-now"><span class="ic" aria-hidden="true">' + c[0] + '</span><div><b>' + Math.round(d.current.temperature_2m) + '°C</b> · ' + two(c[1], c[2]) + '</div></div><div class="wx-days">';
      d.daily.time.forEach(function(t, i){
        var dt = new Date(t + "T12:00:00"), w = wx(d.daily.weather_code[i]), p = d.daily.precipitation_probability_max[i];
        h += '<div><b>' + (i === 0 ? two("Today", "आज") : two(DAY.en[dt.getDay()], DAY.hi[dt.getDay()])) + '</b><span class="ic" aria-hidden="true">' + w[0] + '</span>' + Math.round(d.daily.temperature_2m_min[i]) + '–' + Math.round(d.daily.temperature_2m_max[i]) + '°C' + (p != null ? '<br>' + two("Rain ", "बारिश ") + p + '%' : '') + '</div>';
      });
      out.innerHTML = h + '</div>';
      btn.disabled = false;
      var t = btn.querySelector('[lang="en"]'), u = btn.querySelector('[lang="hi"]');
      if (t) t.textContent = "Refresh"; if (u) u.textContent = "रीफ़्रेश करें";
    }).catch(function(){
      out.innerHTML = two("Could not load the forecast. Please check the India Meteorological Department or a weather app.", "पूर्वानुमान लोड नहीं हो सका। कृपया भारतीय मौसम विज्ञान विभाग या कोई मौसम ऐप देखें।");
      btn.disabled = false;
    });
  });
})();
} catch (e) { if (window.console) console.error('nkt part 12', e); }
});

/* Each part runs as its own task, one after another, so the phone can paint and respond to taps in between. */
function nktBoot() {
  var i = 0;
  (function next() {
    if (i >= NKT_PARTS.length) return;
    NKT_PARTS[i++]();
    setTimeout(next, 0);
  })();
}


/* Start once the full style.css has arrived (the first screen is already painted from the small block inside index.html). */
(function () {
  var l = document.getElementById('fullCss'), done = false;
  function run() { if (done) return; done = true; nktBoot(); }
  if (!l || (l.sheet && l.media !== 'print')) run();
  else { l.addEventListener('load', run); setTimeout(run, 3000); /* never wait forever */ }
})();
