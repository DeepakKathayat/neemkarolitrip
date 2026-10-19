# -*- coding: utf-8 -*-
"""Content for the guide pages. Run tools/build-guides.py to turn this into HTML.
Every block has an English and a Hindi version. Keep facts in step with index.html."""

UPDATED = ("18 October 2026", "18 अक्टूबर 2026")
UPDATED_ISO = "2026-10-18"

# slug -> short names used in the "More guides" list
NAMES = {
    "delhi-to-kainchi-dham": ("Delhi to Kainchi Dham", "दिल्ली से कैंची धाम"),
    "kainchi-dham-parking-shuttle": ("Parking and shuttle rules", "पार्किंग और शटल के नियम"),
    "kainchi-dham-timings": ("Temple timings and etiquette", "मंदिर का समय और नियम"),
    "nainital-kathgodam-to-kainchi-dham": ("Nainital and Kathgodam to Kainchi Dham", "नैनीताल और काठगोदाम से कैंची धाम"),
    "kainchi-dham-for-elderly-and-families": ("Kainchi Dham with elderly parents and family", "बुज़ुर्ग माता-पिता और परिवार के साथ कैंची धाम"),
}

PAGES = []

# ---------------------------------------------------------------- DELHI
PAGES.append(dict(
    slug="delhi-to-kainchi-dham",
    title="Delhi to Kainchi Dham: Train, Car, Bus & Cost (2026) | Neem Karoli Trip",
    desc="How to reach Kainchi Dham from Delhi: trains to Kathgodam with timings, the 6–8 hour drive via Moradabad and Haldwani, buses, a one-day plan and tips. In Hindi and English.",
    h1=("Delhi to Kainchi Dham: how to go", "दिल्ली से कैंची धाम कैसे जाएँ"),
    intro=("Kainchi Dham has no railway station of its own. From Delhi, most people take a train to Kathgodam and a taxi for the last 40 km, or drive the whole way. Here are the options, with times, so you can choose.",
           "कैंची धाम का अपना रेलवे स्टेशन नहीं है। दिल्ली से ज़्यादातर लोग काठगोदाम तक ट्रेन लेते हैं और आख़िरी 40 किमी टैक्सी से जाते हैं, या पूरा रास्ता खुद गाड़ी चलाकर जाते हैं। नीचे समय के साथ सभी विकल्प दिए हैं।"),
    quick=[
        ("<b>By road:</b> about 310 km (some maps show up to about 335 km). Plan 6–8 hours, more on weekends.",
         "<b>सड़क से:</b> लगभग 310 किमी (कुछ नक्शों में करीब 335 किमी तक)। 6–8 घंटे रखें, वीकेंड पर और ज़्यादा।"),
        ("<b>By train:</b> the overnight Ranikhet Express (15013) reaches Kathgodam at 05:05. Then a taxi of about 40 km.",
         "<b>ट्रेन से:</b> रात की रानीखेत एक्सप्रेस (15013) सुबह 05:05 पर काठगोदाम पहुँचती है। फिर लगभग 40 किमी टैक्सी।"),
        ("<b>One day from Delhi</b> is possible on a weekday, but it is tiring. One night in Bhowali, Bhimtal or Nainital is easier.",
         "<b>दिल्ली से एक दिन में</b> वर्किंग डे पर संभव है, पर थकाने वाला है। भवाली, भीमताल या नैनीताल में एक रात रुकना आसान रहता है।"),
    ],
    sections=[
        ("By train", "ट्रेन से",
         """<p>The nearest station is <b>Kathgodam</b>, about 40–43 km from the temple. A taxi takes roughly 1 to 1.5 hours. Trains from Delhi:</p>
<div class="tbl"><table>
<thead><tr><th>Train</th><th>From</th><th>Leaves</th><th>Reaches Kathgodam</th></tr></thead>
<tbody>
<tr><td>12040 Shatabdi</td><td>New Delhi</td><td>06:20</td><td>11:55</td></tr>
<tr><td>15035 Sampark Kranti</td><td>Old Delhi</td><td>16:00</td><td>22:45</td></tr>
<tr><td>15013 Ranikhet Express</td><td>Old Delhi</td><td>22:05</td><td>05:05</td></tr>
</tbody></table></div>
<p><b>Coming back:</b> 12039 Shatabdi leaves Kathgodam at 15:15, and 15014 Ranikhet Express at 20:35. Times can change, so check on <a href="https://www.irctc.co.in/" target="_blank" rel="noopener">IRCTC</a> before you book.</p>""",
         """<p>सबसे नज़दीकी स्टेशन <b>काठगोदाम</b> है, जो मंदिर से करीब 40–43 किमी दूर है। टैक्सी से लगभग 1 से 1.5 घंटे लगते हैं। दिल्ली से ट्रेनें:</p>
<div class="tbl"><table>
<thead><tr><th>ट्रेन</th><th>कहाँ से</th><th>छूटती है</th><th>काठगोदाम पहुँचती है</th></tr></thead>
<tbody>
<tr><td>12040 शताब्दी</td><td>नई दिल्ली</td><td>06:20</td><td>11:55</td></tr>
<tr><td>15035 संपर्क क्रांति</td><td>पुरानी दिल्ली</td><td>16:00</td><td>22:45</td></tr>
<tr><td>15013 रानीखेत एक्सप्रेस</td><td>पुरानी दिल्ली</td><td>22:05</td><td>05:05</td></tr>
</tbody></table></div>
<p><b>वापसी:</b> 12039 शताब्दी काठगोदाम से 15:15 पर और 15014 रानीखेत एक्सप्रेस 20:35 पर चलती है। समय बदल सकता है, इसलिए बुकिंग से पहले <a href="https://www.irctc.co.in/" target="_blank" rel="noopener">IRCTC</a> पर देख लें।</p>"""),
        ("By road (car or taxi)", "सड़क से (कार या टैक्सी)",
         """<p>The usual route is Delhi, Moradabad, Rampur, Haldwani, then Bhimtal or Bhowali, and on to Kainchi Dham on the Nainital–Almora road. Plan <b>6–8 hours</b>.</p>
<ul>
<li>Leave Delhi very early. A start before 4 AM helps you reach the hills in daylight and before the weekend jam.</li>
<li>Hill roads are narrow. Avoid driving after dark.</li>
<li>On busy weekends, holidays and fair days, police may stop private cars at Bhimtal or Bhowali and send you on by shuttle. See <a href="/kainchi-dham-parking-shuttle.html">parking and shuttle rules</a>.</li>
</ul>""",
         """<p>आम रास्ता दिल्ली, मुरादाबाद, रामपुर, हल्द्वानी, फिर भीमताल या भवाली होते हुए नैनीताल–अल्मोड़ा रोड पर कैंची धाम तक जाता है। <b>6–8 घंटे</b> रखें।</p>
<ul>
<li>दिल्ली से बहुत जल्दी निकलें। सुबह 4 बजे से पहले चलने पर पहाड़ में दिन की रोशनी में पहुँचते हैं और वीकेंड के जाम से भी बचते हैं।</li>
<li>पहाड़ी सड़कें संकरी हैं। अंधेरे में गाड़ी न चलाएँ।</li>
<li>भीड़ वाले वीकेंड, छुट्टियों और मेले के दिनों में पुलिस निजी गाड़ियों को भीमताल या भवाली में रोककर आगे शटल से भेज सकती है। देखें <a href="/kainchi-dham-parking-shuttle.html">पार्किंग और शटल के नियम</a>।</li>
</ul>"""),
        ("By bus", "बस से",
         """<p>Overnight buses run from Delhi to Haldwani and Kathgodam. Some operators drop you at Kainchi Dham. From Kathgodam, the bus ride is a little over an hour. Ask the operator for the exact drop point before you book.</p>""",
         """<p>दिल्ली से हल्द्वानी और काठगोदाम के लिए रात की बसें चलती हैं। कुछ ऑपरेटर कैंची धाम पर ही उतार देते हैं। काठगोदाम से बस का सफ़र एक घंटे से थोड़ा ज़्यादा है। बुकिंग से पहले ऑपरेटर से उतरने की सही जगह पूछ लें।</p>"""),
        ("By air", "हवाई जहाज़ से",
         """<p>The nearest airport is <b>Pantnagar</b>, about 79 km away. A sedan taxi to Kainchi Dham costs roughly ₹1,800 one way. Check current flights, as schedules change.</p>""",
         """<p>सबसे नज़दीकी हवाई अड्डा <b>पंतनगर</b> है, जो लगभग 79 किमी दूर है। कैंची धाम तक सेडान टैक्सी का किराया करीब ₹1,800 एक तरफ़ का है। उड़ानों का शेड्यूल बदलता रहता है, इसलिए ताज़ा उड़ानें देख लें।</p>"""),
        ("A one-day plan from Delhi (weekday)", "दिल्ली से एक दिन की योजना (वर्किंग डे)",
         """<ol>
<li>Take the overnight Ranikhet Express (15013). It reaches Kathgodam at 05:05.</li>
<li>Take a taxi straight to Kainchi Dham (1–1.5 hours) and reach the temple soon after it opens at about 6 AM.</li>
<li>Do darshan. On a weekday morning it takes about 1–2 hours including the queue.</li>
<li>Return to Kathgodam in time for the 15:15 Shatabdi, or the 20:35 Ranikhet Express.</li>
</ol>
<p>Do not try this on a busy weekend. Queues can take hours and shuttle waits add more, so the timings above will not hold.</p>""",
         """<ol>
<li>रात की रानीखेत एक्सप्रेस (15013) लें। यह सुबह 05:05 पर काठगोदाम पहुँचती है।</li>
<li>सीधे टैक्सी से कैंची धाम जाएँ (1–1.5 घंटे) और करीब 6 बजे मंदिर खुलने के तुरंत बाद पहुँचें।</li>
<li>दर्शन करें। वर्किंग डे की सुबह कतार समेत लगभग 1–2 घंटे लगते हैं।</li>
<li>15:15 की शताब्दी या 20:35 की रानीखेत एक्सप्रेस के लिए समय पर काठगोदाम लौटें।</li>
</ol>
<p>भीड़ वाले वीकेंड पर यह योजना न बनाएँ। कतार में घंटों लग सकते हैं और शटल का इंतज़ार अलग, इसलिए ऊपर का समय नहीं चलेगा।</p>"""),
        ("Cost and where to stay", "खर्च और कहाँ रुकें",
         """<p>Darshan is free. Your costs are travel, parking, the shuttle, food and a room if you stay. Use our free <a href="/#planner">trip cost planner</a> to add them up for your group. For a night near the temple, see <a href="/#stay">where to stay</a>. Authorities have asked visitors to book rooms in advance, because people hunting for rooms add to the jams.</p>""",
         """<p>दर्शन निःशुल्क हैं। आपका खर्च यात्रा, पार्किंग, शटल, खाना और रुकने पर कमरे का होगा। अपने ग्रुप के लिए जोड़ने के लिए हमारा मुफ़्त <a href="/#planner">ट्रिप कॉस्ट प्लानर</a> इस्तेमाल करें। मंदिर के पास रात रुकने के लिए <a href="/#stay">कहाँ रुकें</a> देखें। प्रशासन ने कहा है कि कमरे पहले से बुक करें, क्योंकि कमरे ढूँढने वाले लोग जाम बढ़ाते हैं।</p>"""),
    ],
    faq=[
        ("How far is Kainchi Dham from Delhi?",
         "About 310 km by road (some maps show up to about 335 km). Plan 6–8 hours, and more on weekends.",
         "दिल्ली से कैंची धाम कितना दूर है?",
         "सड़क से लगभग 310 किमी (कुछ नक्शों में करीब 335 किमी तक)। 6–8 घंटे रखें, वीकेंड पर और ज़्यादा।"),
        ("Is there a direct train from Delhi to Kainchi Dham?",
         "No. The nearest station is Kathgodam, about 40–43 km away. Take a train there, then a taxi or bus.",
         "क्या दिल्ली से कैंची धाम की सीधी ट्रेन है?",
         "नहीं। सबसे नज़दीकी स्टेशन काठगोदाम है, जो करीब 40–43 किमी दूर है। वहाँ तक ट्रेन लें, फिर टैक्सी या बस।"),
        ("Which train is best for a day trip from Delhi?",
         "The overnight Ranikhet Express (15013) reaches Kathgodam at 05:05, which lets you reach the temple in the morning. Return by the 15:15 Shatabdi or the 20:35 Ranikhet Express. Check IRCTC for current timings.",
         "दिल्ली से एक दिन की यात्रा के लिए कौन-सी ट्रेन ठीक है?",
         "रात की रानीखेत एक्सप्रेस (15013) सुबह 05:05 पर काठगोदाम पहुँचती है, जिससे आप सुबह मंदिर पहुँच सकते हैं। वापसी 15:15 की शताब्दी या 20:35 की रानीखेत एक्सप्रेस से करें। ताज़ा समय IRCTC पर देखें।"),
        ("Can I drive from Delhi to Kainchi Dham?",
         "Yes. On quiet days you can park near the temple. On busy weekends, holidays and fair days, police send private vehicles to set parking lots such as Bhimtal and Bhowali, and you continue by shuttle.",
         "क्या मैं दिल्ली से कैंची धाम तक गाड़ी चलाकर जा सकता हूँ?",
         "हाँ। शांत दिनों में आप मंदिर के पास पार्क कर सकते हैं। भीड़ वाले वीकेंड, छुट्टियों और मेले के दिनों में पुलिस निजी गाड़ियों को भीमताल और भवाली जैसी तय पार्किंग में भेजती है और आप शटल से आगे जाते हैं।"),
    ],
    related=["kainchi-dham-parking-shuttle", "nainital-kathgodam-to-kainchi-dham", "kainchi-dham-timings"],
    sources=[("District Nainital – Kainchi Dham", "https://nainital.nic.in/?p=22596"),
             ("Incredible India – Kainchi Dham Ashram", "https://www.incredibleindia.gov.in/en/uttarakhand/nainital/kainchi-dham-ashram"),
             ("IRCTC (check train times)", "https://www.irctc.co.in/")],
))

# ---------------------------------------------------------------- PARKING
PAGES.append(dict(
    slug="kainchi-dham-parking-shuttle",
    title="Kainchi Dham Parking & Shuttle Rules for Weekends (Oct 2026) | Neem Karoli Trip",
    desc="Where to park for Kainchi Dham on busy weekends, how the shuttle works, what police banned, and an example traffic plan from 17–18 October 2026. In Hindi and English.",
    h1=("Kainchi Dham parking and shuttle rules", "कैंची धाम पार्किंग और शटल के नियम"),
    intro=("Parking and shuttle rules change almost every busy weekend. This page explains how the system usually works and shows a real example, so you know what to expect. For the newest plan, always check <a href=\"/#status\">Latest rules</a> on our home page.",
           "भीड़ वाले लगभग हर वीकेंड पर पार्किंग और शटल के नियम बदलते हैं। यह पेज बताता है कि व्यवस्था आम तौर पर कैसे चलती है और एक असली उदाहरण देता है, ताकि आपको अंदाज़ा रहे। सबसे नया प्लान हमेशा हमारे होम पेज पर <a href=\"/#status\">ताज़ा नियम</a> में देखें।"),
    quick=[
        ("<b>Quiet weekdays:</b> you can usually drive to the parking near the temple.",
         "<b>शांत वर्किंग डे:</b> आप आम तौर पर मंदिर के पास की पार्किंग तक गाड़ी ले जा सकते हैं।"),
        ("<b>Busy weekends, holidays and fair days:</b> police send private vehicles to set parking lots at Bhimtal or Bhowali, and you continue by shuttle.",
         "<b>भीड़ वाले वीकेंड, छुट्टियाँ और मेले के दिन:</b> पुलिस निजी गाड़ियों को भीमताल या भवाली की तय पार्किंग में भेजती है और आप शटल से आगे जाते हैं।"),
        ("<b>Shuttle fares and timings</b> were not published in the plans we saw. Ask at the parking lot.",
         "<b>शटल का किराया और समय</b> हमारे देखे प्लान में नहीं बताया गया था। पार्किंग पर पूछ लें।"),
    ],
    sections=[
        ("How it works", "व्यवस्था कैसे चलती है",
         """<p>When crowds are expected, Nainital Police and the district administration announce a traffic plan. Vehicles stop at designated parking lots, and shuttle buses and cabs carry visitors to the temple. The shuttle already ran during the June fair, and the administration said it would run on weekends and festive days. From the parking spots, visitors continue by taxi, roadways bus or Kumaon Mandal Vikas Nigam (KMVN) bus.</p>""",
         """<p>जब भीड़ की उम्मीद होती है, तब नैनीताल पुलिस और ज़िला प्रशासन ट्रैफिक प्लान जारी करते हैं। गाड़ियाँ तय पार्किंग में रुकती हैं और शटल बसें व कैब यात्रियों को मंदिर तक ले जाती हैं। शटल जून के मेले में पहले से चलती थी, और प्रशासन ने कहा कि अब यह वीकेंड और त्योहारों के दिनों में चलेगी। पार्किंग से आगे यात्री टैक्सी, रोडवेज़ बस या कुमाऊँ मंडल विकास निगम (KMVN) की बस से जाते हैं।</p>"""),
        ("Example: the 17–18 October 2026 weekend", "उदाहरण: 17–18 अक्टूबर 2026 का वीकेंड",
         """<p>Nainital Police announced this plan for Saturday 17 and Sunday 18 October (as reported by Amar Ujala on 16 October). It is only an <b>example</b> and has now passed.</p>
<ul>
<li><b>Hours:</b> 5 AM to 8 PM, for KMU buses, private buses and four-wheelers.</li>
<li><b>Coming via Bhimtal</b> (from outside the district and state): park at the Vikas Bhawan parking in Bhimtal, then take the shuttle to Bhowali and Kainchi Dham.</li>
<li><b>Coming via Gethia or Nainital:</b> park at the Sanatorium parking in Bhowali, then take the shuttle to the temple.</li>
<li><b>Taxis and two-wheelers</b> were not allowed in the Kainchi Dham area and Nainital that weekend.</li>
<li><b>Through traffic</b> to Almora, Jageshwar, Bageshwar and Pithoragarh was diverted via Bhimtal, Dhari and Dhanachuli.</li>
</ul>""",
         """<p>नैनीताल पुलिस ने शनिवार 17 और रविवार 18 अक्टूबर के लिए यह प्लान जारी किया (अमर उजाला, 16 अक्टूबर की रिपोर्ट के अनुसार)। यह सिर्फ़ एक <b>उदाहरण</b> है और अब बीत चुका है।</p>
<ul>
<li><b>समय:</b> सुबह 5 से रात 8 बजे तक, KMU बसों, निजी बसों और चार पहिया वाहनों के लिए।</li>
<li><b>भीमताल होकर आने वाले</b> (दूसरे ज़िले और राज्य से): भीमताल के विकास भवन पार्किंग में गाड़ी खड़ी करें, फिर शटल से भवाली और कैंची धाम जाएँ।</li>
<li><b>गेठिया या नैनीताल होकर आने वाले:</b> भवाली के सेनिटोरियम पार्किंग में गाड़ी खड़ी करें, फिर शटल से मंदिर जाएँ।</li>
<li><b>टैक्सी और दोपहिया वाहनों</b> को उस वीकेंड कैंची धाम क्षेत्र और नैनीताल में आने की अनुमति नहीं थी।</li>
<li><b>आगे जाने वाले वाहनों</b> (अल्मोड़ा, जागेश्वर, बागेश्वर, पिथौरागढ़) को भीमताल, धारी और धनाचुली के रास्ते भेजा गया।</li>
</ul>"""),
        ("Earlier plans (for comparison)", "पहले के प्लान (तुलना के लिए)",
         """<ul>
<li><b>10–11 October:</b> cars via Bhimtal parked at Vikas Bhawan in Bhimtal, and cars via Gethia or Nainital at the Sanatorium in Bhowali, with shuttles to the temple. Heavy vehicles were banned from 3 AM to 11 PM, and taxis and two-wheelers were not allowed into the Kainchi Dham area.</li>
<li><b>Foundation Day fair (June 2026):</b> visitors from Haldwani and Kathgodam parked at Bhimtal and Vikas Bhawan. Visitors from Nainital and Ramnagar parked at Metropole and DSA Flats. Shuttle buses and cabs ran from there.</li>
</ul>
<p>The pattern is the same each time: park at the edge, then take the shuttle. Only the exact lots and dates change.</p>""",
         """<ul>
<li><b>10–11 अक्टूबर:</b> भीमताल होकर आने वाली कारें भीमताल के विकास भवन में और गेठिया या नैनीताल होकर आने वाली कारें भवाली के सेनिटोरियम में खड़ी हुईं, वहाँ से शटल मंदिर तक गई। भारी वाहनों पर रात 3 से रात 11 बजे तक रोक थी, और टैक्सी व दोपहिया वाहनों को कैंची धाम क्षेत्र में आने नहीं दिया गया।</li>
<li><b>स्थापना दिवस मेला (जून 2026):</b> हल्द्वानी और काठगोदाम से आने वाले भीमताल और विकास भवन में रुके। नैनीताल और रामनगर से आने वाले मेट्रोपोल और DSA फ्लैट्स में रुके। वहाँ से शटल बस और कैब चलीं।</li>
</ul>
<p>हर बार तरीका यही रहता है: किनारे पर पार्क करें, फिर शटल लें। बस सटीक पार्किंग और तारीखें बदलती हैं।</p>"""),
        ("How to plan around it", "इसके हिसाब से योजना कैसे बनाएँ",
         """<ul>
<li><b>Choose a weekday</b> if you can. On busy days since the film <i>Hanuman Ansh</i>, visitors reached 35,000–40,000 a day, and on 4 October the queue began at 4 AM.</li>
<li><b>Check Latest rules</b> the day before. The plan is usually announced a day or two ahead.</li>
<li><b>Book your room in advance.</b> The administration asked this, because people searching for rooms after arriving add to the jams.</li>
<li><b>Allow extra time</b> for the shuttle wait and the queue.</li>
<li><b>Ask for the rate list</b> at hotels, homestays and shops. They must now display rates, and overcharging can be reported.</li>
<li><b>No picnics</b> on the Shipra riverbank. Officials have said they will act against it.</li>
<li><b>Registration:</b> none was required at our last check. The Nainital DM and SSP plan to recommend weekend registration with a daily limit, but no start date has been announced. If it starts, register only on the official government portal.</li>
</ul>""",
         """<ul>
<li><b>हो सके तो वर्किंग डे चुनें।</b> फ़िल्म <i>हनुमान अंश</i> के बाद भीड़ वाले दिनों में रोज़ 35,000–40,000 लोग पहुँचे, और 4 अक्टूबर को कतार सुबह 4 बजे से शुरू हो गई थी।</li>
<li><b>एक दिन पहले ताज़ा नियम देखें।</b> प्लान आम तौर पर एक-दो दिन पहले घोषित होता है।</li>
<li><b>कमरा पहले से बुक करें।</b> प्रशासन ने यह कहा है, क्योंकि पहुँचकर कमरे ढूँढने वाले लोग जाम बढ़ाते हैं।</li>
<li><b>शटल के इंतज़ार और कतार के लिए अतिरिक्त समय रखें।</b></li>
<li><b>होटल, होमस्टे और दुकानों पर रेट लिस्ट माँगें।</b> अब उन्हें रेट दिखाने होंगे, और ज़्यादा पैसे लेने की शिकायत की जा सकती है।</li>
<li><b>शिप्रा नदी के किनारे पिकनिक न करें।</b> अधिकारियों ने इस पर कार्रवाई की बात कही है।</li>
<li><b>रजिस्ट्रेशन:</b> हमारी पिछली जाँच में ज़रूरी नहीं था। नैनीताल के DM और SSP वीकेंड पर रोज़ाना सीमा के साथ रजिस्ट्रेशन की सिफ़ारिश करने वाले हैं, पर शुरू होने की तारीख़ घोषित नहीं हुई है। शुरू होने पर सिर्फ़ आधिकारिक सरकारी पोर्टल पर ही रजिस्टर करें।</li>
</ul>"""),
    ],
    faq=[
        ("Can I take my car to Kainchi Dham?",
         "On quiet weekdays you can drive to the parking near the temple. On busy weekends, holidays and fair days, police send private vehicles to set parking lots, and you continue by shuttle.",
         "क्या मैं अपनी कार कैंची धाम तक ले जा सकता हूँ?",
         "शांत वर्किंग डे पर आप मंदिर के पास की पार्किंग तक जा सकते हैं। भीड़ वाले वीकेंड, छुट्टियों और मेले के दिनों में पुलिस निजी वाहनों को तय पार्किंग में भेजती है और आप शटल से आगे जाते हैं।"),
        ("Where do I park for Kainchi Dham on a busy weekend?",
         "In the plan for 17–18 October 2026, vehicles coming via Bhimtal parked at Vikas Bhawan in Bhimtal, and vehicles coming via Gethia or Nainital parked at the Sanatorium in Bhowali. Lots can change, so check Latest rules before you leave.",
         "भीड़ वाले वीकेंड पर कैंची धाम के लिए कहाँ पार्क करें?",
         "17–18 अक्टूबर 2026 के प्लान में भीमताल होकर आने वाले वाहन भीमताल के विकास भवन में और गेठिया या नैनीताल होकर आने वाले वाहन भवाली के सेनिटोरियम में खड़े हुए। पार्किंग बदल सकती है, इसलिए निकलने से पहले ताज़ा नियम देख लें।"),
        ("Are taxis and bikes allowed near Kainchi Dham on weekends?",
         "In recent weekend plans, taxis and two-wheelers were not allowed into the Kainchi Dham area. Check the latest plan, because it can change.",
         "क्या वीकेंड पर कैंची धाम के पास टैक्सी और बाइक की अनुमति है?",
         "हाल के वीकेंड प्लान में टैक्सी और दोपहिया वाहनों को कैंची धाम क्षेत्र में आने की अनुमति नहीं थी। ताज़ा प्लान देखें, क्योंकि यह बदल सकता है।"),
        ("What does the shuttle cost?",
         "The traffic plans we saw did not publish a fare or timings. Ask at the parking lot when you arrive.",
         "शटल का किराया कितना है?",
         "हमारे देखे ट्रैफिक प्लान में किराया या समय नहीं बताया गया था। पहुँचने पर पार्किंग पर पूछ लें।"),
    ],
    related=["delhi-to-kainchi-dham", "kainchi-dham-timings", "kainchi-dham-for-elderly-and-families", "nainital-kathgodam-to-kainchi-dham"],
    sources=[("Amar Ujala – weekend traffic plan, 16 Oct 2026", "https://www.amarujala.com/uttarakhand/nainital/police-plan-for-weekend-crowds-at-kainchi-dham-2026-10-16"),
             ("Daily Excelsior – shuttle service for weekends", "https://www.dailyexcelsior.com/to-ease-traffic-congestion-nainital-to-start-shuttle-service-for-kainchi-dham-on-weekends"),
             ("ThePrint – Kainchi Dham visitor numbers", "https://theprint.in/ground-reports/hanuman-ansh-kainchi-dham-pilgrimage-rush/3064018/")],
))

# ---------------------------------------------------------------- TIMINGS
PAGES.append(dict(
    slug="kainchi-dham-timings",
    title="Kainchi Dham Timings, Darshan Time & Etiquette (2026) | Neem Karoli Trip",
    desc="Kainchi Dham opens about 6 AM to 7 PM. Best time for darshan, how long it takes, photography and dress rules, and the best months to visit. In Hindi and English.",
    h1=("Kainchi Dham timings and etiquette", "कैंची धाम का समय और नियम"),
    intro=("What time to go, how long darshan takes, and the simple rules to follow inside the temple.",
           "कब जाएँ, दर्शन में कितना समय लगता है, और मंदिर में किन सरल नियमों का पालन करें।"),
    quick=[
        ("<b>Opening hours:</b> generally about 6 AM to 7 PM. Hours and aarti times change with the season and on festival days.",
         "<b>खुलने का समय:</b> आम तौर पर सुबह करीब 6 से शाम 7 बजे तक। मौसम और त्योहारों के हिसाब से समय और आरती का समय बदलता है।"),
        ("<b>Best time:</b> a weekday morning between 6 and 8 AM, when it is calmest.",
         "<b>सबसे अच्छा समय:</b> वर्किंग डे की सुबह 6 से 8 बजे के बीच, जब सबसे शांति रहती है।"),
        ("<b>No photos inside</b> the temple, and no entry fee.",
         "मंदिर के <b>अंदर फ़ोटो नहीं</b> खींच सकते, और कोई प्रवेश शुल्क नहीं है।"),
    ],
    sections=[
        ("Opening hours and aarti", "खुलने का समय और आरती",
         """<p>Government tourism listings give the opening time as <b>6:00 AM</b> and the closing time as <b>7:00 PM</b>. Hours and aarti times change with the season and on festival days, so check the notices of the <a href="https://shreekainchimandirtrust.org" target="_blank" rel="noopener">Shri Kainchi Hanuman Mandir &amp; Ashram Trust</a> before a special day. We are an independent guide and cannot confirm exact aarti times.</p>""",
         """<p>सरकारी पर्यटन सूचियों में खुलने का समय <b>सुबह 6:00</b> और बंद होने का समय <b>शाम 7:00</b> बताया गया है। मौसम और त्योहारों के हिसाब से समय और आरती का समय बदलता है, इसलिए किसी विशेष दिन से पहले <a href="https://shreekainchimandirtrust.org" target="_blank" rel="noopener">श्री कैंची हनुमान मंदिर एवं आश्रम ट्रस्ट</a> की सूचनाएँ देख लें। हम एक स्वतंत्र गाइड हैं और आरती का सटीक समय पक्का नहीं बता सकते।</p>"""),
        ("Best time of day and week", "दिन और हफ़्ते का सबसे अच्छा समय",
         """<ul>
<li><b>Weekday mornings, 6 to 8 AM,</b> are the calmest. Darshan takes about 1–2 hours including the queue.</li>
<li><b>Weekends</b> can take several hours, plus shuttle time. On 4 October the queue began at 4 AM and darshan opened at 7 AM.</li>
<li>On busy days, plan for parking at Bhimtal or Bhowali and a shuttle. See <a href="/kainchi-dham-parking-shuttle.html">parking and shuttle rules</a>.</li>
</ul>""",
         """<ul>
<li><b>वर्किंग डे की सुबह, 6 से 8 बजे,</b> सबसे शांत रहती है। कतार समेत दर्शन में लगभग 1–2 घंटे लगते हैं।</li>
<li><b>वीकेंड</b> पर कई घंटे लग सकते हैं, साथ में शटल का समय। 4 अक्टूबर को कतार सुबह 4 बजे शुरू हो गई थी और दर्शन 7 बजे खुले।</li>
<li>भीड़ वाले दिनों में भीमताल या भवाली में पार्किंग और शटल के लिए तैयार रहें। देखें <a href="/kainchi-dham-parking-shuttle.html">पार्किंग और शटल के नियम</a>।</li>
</ul>"""),
        ("Etiquette: what to do and not do", "शिष्टाचार: क्या करें, क्या न करें",
         """<ul>
<li><b>No photography inside the temple.</b> Keep your phone away during darshan.</li>
<li><b>Dress simply and modestly.</b> You will leave footwear outside.</li>
<li><b>Carry a warm layer.</b> The valley is cool even on summer evenings.</li>
<li><b>No overnight stay inside the ashram.</b> It generally does not host the public overnight. Book a room in Bhowali, Bhimtal or Nainital.</li>
<li><b>Darshan is free.</b> Small costs are the shuttle, parking and any prasad you buy. We never sell darshan, puja or prasad.</li>
<li><b>No picnics</b> on the Shipra riverbank.</li>
</ul>""",
         """<ul>
<li><b>मंदिर के अंदर फ़ोटो न खींचें।</b> दर्शन के दौरान फ़ोन दूर रखें।</li>
<li><b>सादे और शालीन कपड़े पहनें।</b> जूते-चप्पल बाहर उतारने होंगे।</li>
<li><b>गर्म कपड़ा साथ रखें।</b> गर्मी की शामों में भी घाटी में ठंडक रहती है।</li>
<li><b>आश्रम के अंदर रात नहीं रुक सकते।</b> आम तौर पर आश्रम में जनता के लिए रात्रि-ठहराव नहीं होता। भवाली, भीमताल या नैनीताल में कमरा बुक करें।</li>
<li><b>दर्शन निःशुल्क हैं।</b> छोटे खर्च शटल, पार्किंग और आपके खरीदे प्रसाद के हैं। हम दर्शन, पूजा या प्रसाद नहीं बेचते।</li>
<li><b>शिप्रा नदी के किनारे पिकनिक न करें।</b></li>
</ul>"""),
        ("Best months to visit", "घूमने के सबसे अच्छे महीने",
         """<ul>
<li><b>March to June and September to November</b> have the best weather.</li>
<li><b>15 June</b> is the Foundation Day fair. Avoid it unless you want the fair, because crowds are very large.</li>
<li><b>July to September</b> can bring landslides and road closures. Check the weather and road status before driving up.</li>
</ul>
<p>Check <a href="/#events">events and busy days</a> on our home page for dates.</p>""",
         """<ul>
<li><b>मार्च से जून और सितंबर से नवंबर</b> में मौसम सबसे अच्छा रहता है।</li>
<li><b>15 जून</b> को स्थापना दिवस का मेला लगता है। मेला देखना न हो तो इस दिन से बचें, क्योंकि भीड़ बहुत ज़्यादा होती है।</li>
<li><b>जुलाई से सितंबर</b> में भूस्खलन और सड़क बंद होने की स्थिति बन सकती है। गाड़ी से जाने से पहले मौसम और सड़क की स्थिति देख लें।</li>
</ul>
<p>तारीख़ों के लिए हमारे होम पेज पर <a href="/#events">कार्यक्रम और भीड़ के दिन</a> देखें।</p>"""),
    ],
    faq=[
        ("What time does Kainchi Dham open?",
         "Generally about 6 AM, and it closes at about 7 PM. Hours and aarti times change with the season and on festival days, so check the trust's notices.",
         "कैंची धाम कितने बजे खुलता है?",
         "आम तौर पर सुबह करीब 6 बजे, और शाम करीब 7 बजे बंद होता है। मौसम और त्योहारों के हिसाब से समय और आरती का समय बदलता है, इसलिए ट्रस्ट की सूचनाएँ देख लें।"),
        ("How long does darshan take?",
         "About 1–2 hours on a weekday morning, including the queue. On weekends it can take several hours, plus shuttle time.",
         "दर्शन में कितना समय लगता है?",
         "वर्किंग डे की सुबह कतार समेत लगभग 1–2 घंटे। वीकेंड पर कई घंटे लग सकते हैं, साथ में शटल का समय।"),
        ("Is photography allowed inside Kainchi Dham?",
         "No. Photography is not allowed inside the temple. Keep your phone away during darshan.",
         "क्या कैंची धाम के अंदर फ़ोटो खींच सकते हैं?",
         "नहीं। मंदिर के अंदर फ़ोटो खींचना मना है। दर्शन के दौरान फ़ोन दूर रखें।"),
        ("Is there an entry fee?",
         "No. Darshan is free. Small costs are the shuttle, parking and any prasad you buy.",
         "क्या प्रवेश शुल्क है?",
         "नहीं। दर्शन निःशुल्क हैं। छोटे खर्च शटल, पार्किंग और आपके खरीदे प्रसाद के हैं।"),
        ("What is the best time to visit Kainchi Dham?",
         "March to June and September to November for weather, and weekday mornings for the shortest queues. Avoid 15 June unless you want the fair.",
         "कैंची धाम जाने का सबसे अच्छा समय कौन-सा है?",
         "मौसम के लिए मार्च से जून और सितंबर से नवंबर, और सबसे छोटी कतार के लिए वर्किंग डे की सुबह। मेला न देखना हो तो 15 जून से बचें।"),
    ],
    related=["kainchi-dham-for-elderly-and-families", "kainchi-dham-parking-shuttle", "delhi-to-kainchi-dham", "nainital-kathgodam-to-kainchi-dham"],
    sources=[("Incredible India – Kainchi Dham Ashram (timings)", "https://www.incredibleindia.gov.in/en/uttarakhand/nainital/kainchi-dham-ashram"),
             ("Shri Kainchi Hanuman Mandir & Ashram Trust", "https://shreekainchimandirtrust.org"),
             ("ThePrint – Kainchi Dham visitor numbers", "https://theprint.in/ground-reports/hanuman-ansh-kainchi-dham-pilgrimage-rush/3064018/")],
))

# ---------------------------------------------------------------- NAINITAL / KATHGODAM
PAGES.append(dict(
    slug="nainital-kathgodam-to-kainchi-dham",
    title="Nainital & Kathgodam to Kainchi Dham: Distance, Taxi & Route | Neem Karoli Trip",
    desc="Distance from Kathgodam, Nainital, Bhowali, Haldwani and Pantnagar to Kainchi Dham, travel time, taxi and bus tips, and weekend traffic rules. In Hindi and English.",
    h1=("Nainital and Kathgodam to Kainchi Dham", "नैनीताल और काठगोदाम से कैंची धाम"),
    intro=("Kainchi Dham is on the Nainital–Almora road, 9 km past Bhowali. Here is how far it is from each nearby town, and what to know about the last stretch.",
           "कैंची धाम नैनीताल–अल्मोड़ा रोड पर भवाली से 9 किमी आगे है। नीचे हर पास के शहर से दूरी है और आख़िरी हिस्से के बारे में ज़रूरी बातें।"),
    quick=[
        ("<b>From Kathgodam station:</b> about 40–43 km, roughly 1–1.5 hours by taxi.",
         "<b>काठगोदाम स्टेशन से:</b> लगभग 40–43 किमी, टैक्सी से करीब 1–1.5 घंटे।"),
        ("<b>From Nainital:</b> 17 km, about 40 minutes.",
         "<b>नैनीताल से:</b> 17 किमी, लगभग 40 मिनट।"),
        ("<b>On busy weekends</b> you may have to park at Bhimtal or Bhowali and take the shuttle.",
         "<b>भीड़ वाले वीकेंड पर</b> आपको भीमताल या भवाली में पार्क करके शटल लेनी पड़ सकती है।"),
    ],
    sections=[
        ("Distances at a glance", "एक नज़र में दूरी",
         """<div class="tbl"><table>
<thead><tr><th>From</th><th>Distance to Kainchi Dham</th></tr></thead>
<tbody>
<tr><td>Bhowali</td><td>9 km</td></tr>
<tr><td>Nainital</td><td>17 km</td></tr>
<tr><td>Kathgodam railway station</td><td>about 40–43 km</td></tr>
<tr><td>Haldwani</td><td>about 40–45 km</td></tr>
<tr><td>Pantnagar airport</td><td>about 79 km</td></tr>
</tbody></table></div>
<p>Bhowali, Nainital, Kathgodam and Pantnagar distances come from the District Nainital website. The Haldwani figure is an approximate road distance.</p>""",
         """<div class="tbl"><table>
<thead><tr><th>कहाँ से</th><th>कैंची धाम तक दूरी</th></tr></thead>
<tbody>
<tr><td>भवाली</td><td>9 किमी</td></tr>
<tr><td>नैनीताल</td><td>17 किमी</td></tr>
<tr><td>काठगोदाम रेलवे स्टेशन</td><td>लगभग 40–43 किमी</td></tr>
<tr><td>हल्द्वानी</td><td>लगभग 40–45 किमी</td></tr>
<tr><td>पंतनगर हवाई अड्डा</td><td>लगभग 79 किमी</td></tr>
</tbody></table></div>
<p>भवाली, नैनीताल, काठगोदाम और पंतनगर की दूरी नैनीताल ज़िले की वेबसाइट से है। हल्द्वानी की दूरी सड़क से अनुमानित है।</p>"""),
        ("From Kathgodam", "काठगोदाम से",
         """<ul>
<li>Kathgodam is the nearest railway station. Taxis are available outside the station, and the ride takes roughly 1–1.5 hours. A bus ride is a little over an hour.</li>
<li>The road goes through Bhimtal or Bhowali, then onto the Nainital–Almora road.</li>
<li>Agree the fare before you start, and ask the driver whether the current traffic plan lets taxis go all the way. On recent busy weekends, taxis were not allowed into the Kainchi Dham area.</li>
<li>Train timings from Delhi are on our <a href="/delhi-to-kainchi-dham.html">Delhi to Kainchi Dham</a> page.</li>
</ul>""",
         """<ul>
<li>काठगोदाम सबसे नज़दीकी रेलवे स्टेशन है। स्टेशन के बाहर टैक्सियाँ मिल जाती हैं, और सफ़र में लगभग 1–1.5 घंटे लगते हैं। बस से थोड़ा ज़्यादा एक घंटा लगता है।</li>
<li>रास्ता भीमताल या भवाली से होकर नैनीताल–अल्मोड़ा रोड पर पहुँचता है।</li>
<li>चलने से पहले किराया तय कर लें और ड्राइवर से पूछें कि मौजूदा ट्रैफिक प्लान में टैक्सी आख़िर तक जा सकती है या नहीं। हाल के भीड़ वाले वीकेंड पर टैक्सी को कैंची धाम क्षेत्र में आने नहीं दिया गया।</li>
<li>दिल्ली से ट्रेन का समय हमारे <a href="/delhi-to-kainchi-dham.html">दिल्ली से कैंची धाम</a> पेज पर है।</li>
</ul>"""),
        ("From Nainital", "नैनीताल से",
         """<ul>
<li>It is 17 km, about 40 minutes by road, via Bhowali.</li>
<li>On busy weekends, vehicles coming via Gethia or Nainital have been parked at the Sanatorium in Bhowali, with a shuttle onward. Start early.</li>
<li>Nainital also works as a base. You can visit Kainchi Dham in the morning and see the lake in the afternoon. See <a href="/#nearby">places nearby</a>.</li>
</ul>""",
         """<ul>
<li>भवाली होकर सड़क से 17 किमी, लगभग 40 मिनट।</li>
<li>भीड़ वाले वीकेंड पर गेठिया या नैनीताल होकर आने वाली गाड़ियाँ भवाली के सेनिटोरियम में रोकी गई हैं, वहाँ से आगे शटल चलती है। जल्दी निकलें।</li>
<li>नैनीताल ठहरने के लिए भी ठीक है। सुबह कैंची धाम और दोपहर में झील देखी जा सकती है। देखें <a href="/#nearby">आस-पास की जगहें</a>।</li>
</ul>"""),
        ("From Haldwani and Pantnagar", "हल्द्वानी और पंतनगर से",
         """<ul>
<li><b>Haldwani</b> is a gateway town, about 40–45 km away. Buses and taxis run from here.</li>
<li><b>Pantnagar airport</b> is about 79 km away. A sedan taxi costs roughly ₹1,800 one way.</li>
<li>Visitors from Haldwani and Kathgodam were sent to park at Bhimtal and Vikas Bhawan during the June fair.</li>
</ul>""",
         """<ul>
<li><b>हल्द्वानी</b> पहाड़ का प्रवेश द्वार माना जाने वाला शहर है, लगभग 40–45 किमी दूर। यहाँ से बसें और टैक्सियाँ चलती हैं।</li>
<li><b>पंतनगर हवाई अड्डा</b> करीब 79 किमी दूर है। सेडान टैक्सी का किराया लगभग ₹1,800 एक तरफ़ का है।</li>
<li>जून के मेले में हल्द्वानी और काठगोदाम से आने वालों को भीमताल और विकास भवन में पार्क कराया गया।</li>
</ul>"""),
        ("Where to stay nearby", "पास में कहाँ रुकें",
         """<p>The ashram does not generally host the public overnight. Most visitors stay in Bhowali, Bhimtal or Nainital. Book ahead on busy weekends. See <a href="/#stay">where to stay</a>, and the <a href="/kainchi-dham-timings.html">timings and etiquette</a> guide before you go.</p>""",
         """<p>आश्रम में आम तौर पर जनता के लिए रात्रि-ठहराव नहीं होता। ज़्यादातर यात्री भवाली, भीमताल या नैनीताल में रुकते हैं। भीड़ वाले वीकेंड पर पहले से बुक करें। देखें <a href="/#stay">कहाँ रुकें</a>, और जाने से पहले <a href="/kainchi-dham-timings.html">समय और नियम</a> गाइड पढ़ें।</p>"""),
    ],
    faq=[
        ("How far is Kainchi Dham from Kathgodam?",
         "About 40–43 km. A taxi takes roughly 1–1.5 hours.",
         "काठगोदाम से कैंची धाम कितनी दूर है?",
         "लगभग 40–43 किमी। टैक्सी से करीब 1–1.5 घंटे लगते हैं।"),
        ("How far is Kainchi Dham from Nainital?",
         "17 km, about 40 minutes by road.",
         "नैनीताल से कैंची धाम कितनी दूर है?",
         "17 किमी, सड़क से लगभग 40 मिनट।"),
        ("What is the nearest railway station to Kainchi Dham?",
         "Kathgodam, about 40–43 km away.",
         "कैंची धाम का सबसे नज़दीकी रेलवे स्टेशन कौन-सा है?",
         "काठगोदाम, लगभग 40–43 किमी दूर।"),
        ("Can I take a taxi from Kathgodam to the temple on a weekend?",
         "It depends on that weekend's traffic plan. In recent plans, taxis and two-wheelers were not allowed into the Kainchi Dham area, and visitors parked at Bhimtal or Bhowali and took the shuttle. Ask your driver and check Latest rules.",
         "क्या वीकेंड पर काठगोदाम से मंदिर तक टैक्सी ले सकते हैं?",
         "यह उस वीकेंड के ट्रैफिक प्लान पर निर्भर है। हाल के प्लान में टैक्सी और दोपहिया वाहनों को कैंची धाम क्षेत्र में आने नहीं दिया गया, और यात्रियों को भीमताल या भवाली में पार्क करके शटल लेनी पड़ी। अपने ड्राइवर से पूछें और ताज़ा नियम देखें।"),
        ("What is the nearest airport to Kainchi Dham?",
         "Pantnagar, about 79 km away. Bareilly is also listed as a nearby airport.",
         "कैंची धाम का सबसे नज़दीकी हवाई अड्डा कौन-सा है?",
         "पंतनगर, लगभग 79 किमी दूर। बरेली भी पास के हवाई अड्डे के रूप में सूचीबद्ध है।"),
    ],
    related=["delhi-to-kainchi-dham", "kainchi-dham-parking-shuttle", "kainchi-dham-timings"],
    sources=[("District Nainital – Kainchi Dham", "https://nainital.nic.in/?p=22596"),
             ("Incredible India – Kainchi Dham Ashram", "https://www.incredibleindia.gov.in/en/uttarakhand/nainital/kainchi-dham-ashram"),
             ("Amar Ujala – weekend traffic plan, 16 Oct 2026", "https://www.amarujala.com/uttarakhand/nainital/police-plan-for-weekend-crowds-at-kainchi-dham-2026-10-16")],
))

# ---------------------------------------------------------------- ELDERLY / FAMILY
PAGES.append(dict(
    slug="kainchi-dham-for-elderly-and-families",
    updated=(("19 October 2026", "19 अक्टूबर 2026"), "2026-10-19"),
    title="Kainchi Dham with Elderly Parents and Family: Practical Guide (2026) | Neem Karoli Trip",
    desc="Planning Kainchi Dham for elderly parents or a family? Best day and time, shuttle and parking waits, cold mornings, footwear, medical help and what we cannot confirm. In Hindi and English.",
    h1=("Kainchi Dham with elderly parents and family", "बुज़ुर्ग माता-पिता और परिवार के साथ कैंची धाम"),
    intro=("Many people visit Kainchi Dham with parents or grandparents. This page gathers what is reliably known, and says plainly what we could not confirm, so you can plan a calm visit. It is not medical advice.",
           "बहुत से लोग माता-पिता या दादा-दादी के साथ कैंची धाम जाते हैं। इस पेज में वही बातें हैं जो भरोसेमंद स्रोतों से पता चलीं, और साफ़ लिखा है कि किन बातों की पुष्टि हम नहीं कर पाए, ताकि आप शांति से यात्रा प्लान कर सकें। यह चिकित्सा सलाह नहीं है।"),
    quick=[
        ("<b>Best time:</b> a weekday morning, ideally between October and early December. Arrive early; before about 8 AM the queue is shortest.",
         "<b>सबसे अच्छा समय:</b> कोई कार्यदिवस की सुबह, अक्टूबर से दिसंबर की शुरुआत के बीच। जल्दी पहुँचें; सुबह करीब 8 बजे से पहले लाइन सबसे छोटी रहती है।"),
        ("<b>Busy days:</b> weekends, public holidays and 13–16 June. Expect a shuttle wait; one guide suggests adding 45–60 minutes.",
         "<b>भीड़ वाले दिन:</b> वीकेंड, सार्वजनिक छुट्टियाँ और 13–16 जून। शटल के लिए इंतज़ार रहेगा; एक गाइड 45–60 मिनट अतिरिक्त रखने को कहता है।"),
        ("<b>Cold:</b> winter dawn can drop close to 2 °C. Carry warm layers and easy-to-remove socks.",
         "<b>ठंड:</b> सर्दियों में भोर का तापमान करीब 2 °C तक जा सकता है। गर्म कपड़े और आसानी से उतरने वाले मोज़े साथ रखें।"),
        ("<b>Not confirmed:</b> stairs, wheelchair access, seating and the exact walk from the shuttle stop. We found no reliable source, so please ask the temple trust.",
         "<b>पुष्टि नहीं हो पाई:</b> सीढ़ियाँ, व्हीलचेयर की सुविधा, बैठने की जगह और शटल स्टॉप से मंदिर तक की पैदल दूरी। हमें कोई भरोसेमंद स्रोत नहीं मिला, इसलिए कृपया मंदिर ट्रस्ट से पूछें।"),
    ],
    sections=[
        ("What we know, and what we cannot confirm", "क्या पता है, और किसकी पुष्टि नहीं हो पाई",
         "<p><b>Known:</b> darshan is free; footwear is left outside; the weekend and festival-day queue can be long; a shuttle is used on busy days; the nearest railway station is Kathgodam, about 40 km away.</p><p><b>Not confirmed:</b> whether there are stairs on the way, whether a wheelchair can be used, whether there is seating, and how far the walk is from the shuttle stop. We looked for official or reliable information and found none, and we will not guess. Before travelling with someone who cannot walk far, contact the <a href=\"https://shreekainchimandirtrust.org\" target=\"_blank\" rel=\"noopener\">Shri Kainchi Hanuman Mandir &amp; Ashram Trust</a> or ask the police or volunteers at the parking area.</p>",
         "<p><b>पता है:</b> दर्शन निःशुल्क है; जूते-चप्पल बाहर उतारने होते हैं; वीकेंड और त्योहार के दिन लाइन लंबी हो सकती है; भीड़ वाले दिनों में शटल चलती है; सबसे नज़दीकी रेलवे स्टेशन काठगोदाम है, लगभग 40 किमी दूर।</p><p><b>पुष्टि नहीं हो पाई:</b> रास्ते में सीढ़ियाँ हैं या नहीं, व्हीलचेयर चल सकती है या नहीं, बैठने की जगह है या नहीं, और शटल स्टॉप से कितना पैदल चलना होगा। हमने आधिकारिक या भरोसेमंद जानकारी ढूँढी और नहीं मिली, और हम अंदाज़ा नहीं लगाएँगे। जो व्यक्ति ज़्यादा चल नहीं सकता उसके साथ जाने से पहले <a href=\"https://shreekainchimandirtrust.org\" target=\"_blank\" rel=\"noopener\">श्री कैंची हनुमान मंदिर एवं आश्रम ट्रस्ट</a> से संपर्क करें, या पार्किंग क्षेत्र में पुलिस या स्वयंसेवकों से पूछें।</p>"),
        ("Choose the day and the hour", "दिन और समय चुनें",
         "<p>A weekday morning between October and early December is the best single choice. Arriving by about 7:30 AM keeps the queue short and the road from Bhowali clear. Weekends, public holidays and the days around 15 June are the busiest. On 4 October the queue began at 4 AM.</p><p>Our <a href=\"/#planner\">trip planner</a> shows the expected crowd for the date you pick, and suggests a calmer day nearby.</p>",
         "<p>अक्टूबर से दिसंबर की शुरुआत के बीच कार्यदिवस की सुबह सबसे अच्छा विकल्प है। सुबह करीब 7:30 तक पहुँचने पर लाइन छोटी रहती है और भवाली से रास्ता खाली मिलता है। वीकेंड, सार्वजनिक छुट्टियाँ और 15 जून के आसपास के दिन सबसे व्यस्त होते हैं। 4 अक्टूबर को लाइन सुबह 4 बजे से लग गई थी।</p><p>हमारा <a href=\"/#planner\">ट्रिप प्लानर</a> चुनी हुई तारीख़ की अनुमानित भीड़ दिखाता है और पास का कोई शांत दिन सुझाता है।</p>"),
        ("Parking and the shuttle with elders", "बुज़ुर्गों के साथ पार्किंग और शटल",
         "<p>On busy days the police announce parking lots and shuttle buses, and in some plans taxis and two-wheelers were not allowed into the Kainchi Dham area. Read the <a href=\"/kainchi-dham-parking-shuttle.html\">parking and shuttle rules</a> the day before, and add extra time for the shuttle wait and the return. One local guide suggests 45–60 extra minutes.</p><p>Our suggestion: tell the staff at the parking area that you have an elderly traveller, and ask what help is available that day. Rules change every week.</p>",
         "<p>भीड़ वाले दिनों में पुलिस पार्किंग स्थल और शटल बसों की घोषणा करती है, और कुछ योजनाओं में टैक्सी और दोपहिया वाहनों को कैंची धाम क्षेत्र में जाने नहीं दिया गया। एक दिन पहले <a href=\"/kainchi-dham-parking-shuttle.html\">पार्किंग और शटल के नियम</a> पढ़ लें, और शटल के इंतज़ार व वापसी के लिए अतिरिक्त समय रखें। एक स्थानीय गाइड 45–60 मिनट अतिरिक्त रखने की सलाह देता है।</p><p>हमारा सुझाव: पार्किंग क्षेत्र के स्टाफ़ को बताएँ कि साथ में बुज़ुर्ग हैं, और पूछें कि उस दिन कौन-सी मदद उपलब्ध है। नियम हर हफ़्ते बदलते हैं।</p>"),
        ("Cold, footwear and clothing", "ठंड, जूते-चप्पल और कपड़े",
         "<p>You leave footwear outside, so the ground may be cold on winter mornings. At dawn the temperature can fall close to 2 °C in winter. Our suggestion: carry woollen socks that are easy to remove, a shawl or jacket, and a small bag for shoes. Dress simply and modestly.</p>",
         "<p>जूते-चप्पल बाहर उतारने होते हैं, इसलिए सर्दियों की सुबह ज़मीन ठंडी हो सकती है। सर्दियों में भोर में तापमान करीब 2 °C तक गिर सकता है। हमारा सुझाव: आसानी से उतरने वाले ऊनी मोज़े, शॉल या जैकेट, और जूतों के लिए एक छोटा थैला साथ रखें। सादे और शालीन कपड़े पहनें।</p>"),
        ("Health, water and medicines", "सेहत, पानी और दवाइयाँ",
         "<p>This is not medical advice. If a traveller has a health condition, ask their doctor before the trip. Carry their regular medicines, water and light snacks, because you may wait in the queue or the shuttle line for a long time. Plan rest breaks on the drive up from Kathgodam, which is about 40 km.</p><p>The nearest government health centre we found is the Community Health Centre (CHC) in Bhowali. Larger hospitals are in Nainital and Haldwani. For an emergency, call <b>112</b> or <b>108</b>. See our <a href=\"/#help\">emergency help</a> section.</p>",
         "<p>यह चिकित्सा सलाह नहीं है। अगर किसी यात्री को कोई बीमारी है तो यात्रा से पहले उनके डॉक्टर से पूछें। उनकी रोज़ की दवाइयाँ, पानी और हल्का नाश्ता साथ रखें, क्योंकि लाइन या शटल में देर तक इंतज़ार करना पड़ सकता है। काठगोदाम से ऊपर के लगभग 40 किमी के सफ़र में बीच-बीच में रुकने की योजना बनाएँ।</p><p>हमें सबसे नज़दीकी सरकारी स्वास्थ्य केंद्र भवाली का सामुदायिक स्वास्थ्य केंद्र (CHC) मिला। बड़े अस्पताल नैनीताल और हल्द्वानी में हैं। आपात स्थिति में <b>112</b> या <b>108</b> पर कॉल करें। हमारा <a href=\"/#help\">आपातकालीन मदद</a> सेक्शन देखें।</p>"),
        ("Where to stay so mornings are easier", "कहाँ ठहरें ताकि सुबह आसान रहे",
         "<p>The ashram does not generally host the public overnight. Staying in Bhowali, the closest town, makes the early morning shorter than driving up from Nainital or Kathgodam. Book in advance, as the administration has asked. See <a href=\"/#stay\">where to stay</a>.</p>",
         "<p>आश्रम में आम तौर पर जनता के रुकने की व्यवस्था नहीं होती। सबसे नज़दीकी कस्बे भवाली में रुकने से सुबह की दूरी नैनीताल या काठगोदाम से आने के मुक़ाबले कम रहती है। प्रशासन की अपील के अनुसार पहले से बुकिंग करें। <a href=\"/#stay\">कहाँ ठहरें</a> देखें।</p>"),
    ],
    faq=[
        ("Is Kainchi Dham suitable for elderly people?", "Many elderly visitors go, and a calm weekday morning makes it easier. We could not confirm stairs, seating or the exact walking distance, so check with the temple trust if the traveller cannot walk far. Carry warm clothes and medicines.",
         "क्या कैंची धाम बुज़ुर्गों के लिए ठीक है?", "बहुत से बुज़ुर्ग श्रद्धालु जाते हैं, और कार्यदिवस की शांत सुबह यात्रा आसान बनाती है। हम सीढ़ियों, बैठने की जगह या पैदल दूरी की पुष्टि नहीं कर पाए, इसलिए अगर यात्री ज़्यादा चल नहीं सकते तो मंदिर ट्रस्ट से पूछ लें। गर्म कपड़े और दवाइयाँ साथ रखें।"),
        ("Is a wheelchair allowed at Kainchi Dham?", "We found no reliable information on wheelchair access. Please contact the Shri Kainchi Hanuman Mandir & Ashram Trust before you travel.",
         "क्या कैंची धाम में व्हीलचेयर की अनुमति है?", "व्हीलचेयर की सुविधा पर हमें कोई भरोसेमंद जानकारी नहीं मिली। यात्रा से पहले कृपया श्री कैंची हनुमान मंदिर एवं आश्रम ट्रस्ट से संपर्क करें।"),
        ("Is there a paid fast-track or VIP darshan?", "Darshan is free, and we have found no official paid fast-track. If someone offers one for money, especially by message or in advance, confirm with the temple trust first. We never sell darshan.",
         "क्या पैसे देकर तेज़ या VIP दर्शन होता है?", "दर्शन निःशुल्क है, और हमें कोई आधिकारिक सशुल्क तेज़ दर्शन नहीं मिला। अगर कोई पैसे लेकर इसका वादा करे, ख़ासकर संदेश पर या पहले से, तो पहले मंदिर ट्रस्ट से पुष्टि करें। हम दर्शन नहीं बेचते।"),
        ("What is the best time to visit with children or parents?", "A weekday morning between October and early December, arriving by about 7:30 AM. Avoid weekends, public holidays and the days around 15 June.",
         "बच्चों या माता-पिता के साथ जाने का सबसे अच्छा समय क्या है?", "अक्टूबर से दिसंबर की शुरुआत के बीच कोई कार्यदिवस की सुबह, करीब 7:30 तक पहुँचकर। वीकेंड, सार्वजनिक छुट्टियों और 15 जून के आसपास के दिनों से बचें।"),
    ],
    related=["kainchi-dham-timings", "kainchi-dham-parking-shuttle", "nainital-kathgodam-to-kainchi-dham"],
    sources=[
        ("Shri Kainchi Hanuman Mandir & Ashram Trust", "https://shreekainchimandirtrust.org"),
        ("Saanjh Stays – Kainchi Dham visit guide (local guide, not official)", "https://saanjhstays.com/kainchi-dham-visit-guide/"),
        ("Amar Ujala – queue from 4 AM, 4 Oct 2026", "https://www.amarujala.com/uttarakhand/nainital/surge-of-faith-at-kainchi-dham-queues-for-darshan-since-morning-2026-10-04"),
        ("Public Services Map – CHC Bhowali", "https://www.publicservicesmap.in/hospitals/centre/chc-bhowali-nainital-uttarakhand-hosp5g07202"),
    ],
))
