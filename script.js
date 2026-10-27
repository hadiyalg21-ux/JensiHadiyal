"use strict";

/* =====================================================================
   A VERY SPECIAL DAY — script.js

   PART 1 (this block): CONFIG — everything personal lives here.
          Change names, dates, password, quiz, photos, music, text, letter.
   PART 2: helpers, navigation, reveal engine, confetti, music
   PART 3: the levels (reel quiz, heart game, gifts, night, quiz, password…)
   PART 4: final page (gallery, letter, last surprise) + start-up

   Placeholders you can use inside any text:
     {jay} {JAY}  -> his name / UPPERCASE      {me} {ME} -> your name / UPPERCASE
     {date} {time} -> proposal date and time   {bday} -> your birthday date
     {target} {seconds} {score} -> used by the heart game
   ===================================================================== */

/* =====================================================================
   ★★★  1. CONFIG — EDIT HERE  ★★★
   ===================================================================== */
const CONFIG = {

  /* ---- Names ---- */
  jayName: "Jay",
  myName: "Jensi",

  /* ---- Special dates (written exactly how you want them shown) ---- */
  proposal: { date: "29 August", time: "10:40 PM" },
  birthdayDate: "22 September",   // YOUR birthday (first meeting alone)

  /* ---- Secret password (case-insensitive, spaces are ignored) ---- */
  password: "29august",
  passwordHint: "Think of a date: the day and the month, written together. 😉",

  /* ---- Music (put the file in the audio/ folder) ---- */
  music: "./birthday-song.mp3",

  /* ---- Heart-catching game ---- */
  game: {
    targetScore: 15,        // hearts to catch to win (golden heart = 3 points)
    durationSeconds: 30,    // time limit
    spawnEveryMs: 650       // smaller number = more hearts
  },

  /* ---- Photos (put your pictures in the images/ folder) ----
     Add or remove lines. Leave caption "" for no caption.
     If a file is missing, a pretty placeholder is shown instead. */
  photos: [
    { src: "photo1.jpg", caption: "" },
    { src: "photo2.jpg", caption: "" },
    { src: "photo3.jpg", caption: "" },
    { src: "photo4.jpg", caption: "" },
    { src: "photo5.jpg", caption: "" },
    { src: "photo6.jpg", caption: "" }
    // , { src: "images/photo7.jpg", caption: "" }
    // , { src: "images/photo8.jpg", caption: "" }
  ],

  /* ---- Level 2: the reel question ----
     "correct: true" marks the right answer. Order is shuffled on screen. */
  reelQuiz: [
    { text: "We ignored each other.", correct: false,
      reply: "Ignored each other?! 😭 Babyyy, we were literally best friends. Try again!" },
    { text: "We shared funny reels and roasted each other.", correct: true,
      reply: "YESSS! 😂 Reels, roasting, repeat. That was our whole reel era! ❤️" },
    { text: "We stopped talking.", correct: false,
      reply: "Stopped talking?! Jay, we never shut up! 😂 Try again." },
    { text: "We only talked about studies.", correct: false,
      reply: "Studies?! 😭 Pookie, who are you even talking about? Try again!" }
  ],

  /* ---- Level 8: the big quiz (answer = index of the right option, starting from 0) ---- */
  quiz: [
    { q: "What did you ask me after I posted a song on Instagram?",
      options: ["Kai kbr padi aama?", "Where are you?", "What are you doing?", "Send me a photo."], answer: 0 },
    { q: "What did you ask me before sending reels?",
      options: ["Hu tne reels mokli sku?", "Let's play BGMI.", "Where are you going?", "Will you call me?"], answer: 0 },
    { q: "Which games did we play together?",
      options: ["Cricket league and BGMI.", "Chess only.", "Racing games only.", "None."], answer: 0 },
    { q: "What did you give me at my brother's wedding?",
      options: ["A bracelet.", "A watch.", "A ring.", "A book."], answer: 0 },
    { q: "What did I give you?",
      options: ["A keychain.", "A bracelet.", "A hoodie.", "A wallet."], answer: 0 },
    { q: "When did you propose to me?",
      options: ["22 September.", "29 August.", "15 August.", "10 October."], answer: 1 },
    { q: "What time did you propose?",
      options: ["9:30 PM.", "10:40 PM.", "11:00 PM.", "8:20 PM."], answer: 1 },
    { q: "What do I love about you?",
      options: ["Your curly hair.", "Your gaming skills only.", "Your shoes.", "Your phone."], answer: 0 }
  ],
  quizCorrect: [
    "That's my boy! You remember! ❤️",
    "Yesss babyyy! 😍 Full marks for my pookie!",
    "Correct! I knew you wouldn't forget 🥹"
  ],
  quizWrong: [
    "Jay, seriously? You forgot this already? 😂",
    "Babyyy noooo 😭 How could you forget?!",
    "Haha okay, wrong one! Don't worry, I still love you 😏❤️"
  ],
  // The first rule that matches (score / total >= min) is used
  quizResults: [
    { min: 1,    title: "Perfect score! 🥹", msg: "You remember everything, babyyy. That's my boy! ❤️" },
    { min: 0.75, title: "So close! 😍",      msg: "You know our story really well, pookie." },
    { min: 0.5,  title: "Not bad! 😂",       msg: "A little revision needed, Mr. Sigma Boy 😏" },
    { min: 0,    title: "Jay… 😭😂",         msg: "It's okay babyyy, I'll tell you our story again. Forever. ❤️" }
  ],

  /* ---- Level 9: tap-to-peek tags ---- */
  traits: {
    jay: [
      { label: "Tall", remark: "Yes, I have to look up at you. Every single time. 😂" },
      { label: "Chilled", remark: "Nothing stresses you out… meanwhile I'm overthinking for both of us. 🙈" },
      { label: "Foodie", remark: "Homemade food? Hmm… not really your thing 😏" },
      { label: "Sigma boy in front of everyone", remark: "Public mode: sigma 😎" },
      { label: "Secretly my pookie", remark: "Private mode: pookieeeee. I've seen it, don't deny it! 🥺❤️" },
      { label: "Curly hair that I love", remark: "Those curls. That's the whole remark. ❤️" }
    ],
    me: [
      { label: "Short", remark: "Tall boy, short girl. We make it work 😂" },
      { label: "Overthinker", remark: "One little thing, a hundred times in my head. 🙈" },
      { label: "Emotional", remark: "Yup… guilty. 🥹" },
      { label: "Sometimes thinks too much", remark: "My thoughts are often different from yours, and that's okay. ❤️" },
      { label: "Loves teasing Jay when he gets angry", remark: "Because you look so cute when you're angry. Sorry, not sorry 😏" }
    ]
  },

  /* ---- Final page: little things I love ---- */
  loveList: [
    "Your curly hair. I love it, and you know it. 😌",
    "You're tall, I'm short. I'll always have to look up at you. 😂",
    "How chilled you are, even when I'm overthinking everything.",
    "Your pookie side, which I know so well. Don't deny it, Mr. Sigma Boy 😏",
    "How possessive you are about me. 🙈",
    "The way you say “sorry babyyy” when we fight.",
    "All your little names for me: babyyyy, bachuuuu, babuu, dikkuuuu, jenu babyyy, darlingggg.",
    "That you were my best friend before you were my boyfriend.",
    "Your foodie side… even though I'm still waiting for that cooking promise 😂"
  ],

  /* ---- Final page: our special days (only things you told me) ---- */
  days: [
    { when: "How it started", title: "The Instagram request",
      text: "You sent me that request, and everything started from there. 😂" },
    { when: "A wedding", title: "My brother's wedding",
      text: "A bracelet from you, a keychain from me. ❤️" },
    { when: "{date} · {time}", title: "The night everything changed",
      text: "You proposed through a reel. TU TO ACCEPTED HI HAI! ❤️" },
    { when: "{bday}", title: "My birthday",
      text: "Our first time meeting alone. The movie, the bike, and me sitting behind you. 🥹" }
  ],

  /* ---- The letter. Separate paragraphs with a blank line. ----
     The first paragraph is shown in handwriting style, the last
     two as the sign-off. */
  letter: `Babyyyyyyyy, ❤️

Do you remember how we started? It was just one Instagram request, one song on my note, your "Kai kbr padi aama?" and then your "Hu tne reels mokli sku?" 😂

And I said ha. Bas, pachi toh reels, roasting, fun, games and our everyday talks started. At that time, we were just friends, but slowly you became my best friend, and then someone I could share my feelings with.

Babyyy, I don't think you even realize how special that is to me.

I still remember when you came to my brother's wedding and gave me that bracelet. I gave you a keychain, and even though they were little gifts, that memory means something special to me. ❤️

And then comes 29 August, raat na 10:40. 🥹 You proposed to me through a reel, and look at me now! Obviously, my answer was TU TO ACCEPTED HI HAI! 😂❤️

My best friend became my boyfriend. Sometimes I still think about how unexpectedly beautiful that is.

And 22 September… my birthday, our first time meeting alone. You were riding the bike, and I was sitting behind you. We went to watch a movie, but that whole day became so much more than just a movie for me. It's one of those memories I want to keep close to my heart.

Also, Mr. Sigma Boy, let's talk about you. 😏

You're tall, I'm short. You're chilled, and I can overthink one little thing a hundred times. Our thoughts aren't always the same, but you're still so special to me.

You act like a sigma boy in front of everyone, but I know my pookie side of you. 😂❤️ And don't think I've forgotten your cooking statement. You won't cook when everyone is around, but when nobody is there, you'll cook with me? Okay babyyy, I'm remembering this!

I love the way you call me babyyyyy, bachuuuu, babuu, dikkuuuu, jenu babyyy and darlingggg, madam. I love our silly moments, our roasting, and even those moments when we fight and you say "sorry babyyy."

And when you get angry, you look so cute that sometimes I just want to khai jav tne. 😂

I know I'm an overthinker, and I know we can be different in many ways. But I'm happy that I get to share all these little moments with you.

I don't know how to explain everything perfectly, but one thing I know is that day by day, I love you more and more.

I don't want to lose you, babyyy. I want us to keep making memories, laughing at stupid things, roasting each other, playing games, going on rides, watching movies, cooking together, and having all those little conversations that somehow become the best parts of my day.

I want to keep choosing you, and I hope we keep choosing each other as we grow.

Thank you for being my best friend before being my boyfriend. Thank you for being someone I can open up to. And thank you for becoming such a special part of my life.

Happy Birthday, bachaaaaaaaaaaaa! ❤️

I hope this new year of your life brings you happiness, peace, success, and everything you've been wishing for.

And selfishly, I hope I get to be beside you for lots of your birthdays to come. 🥹❤️

My best friend.
My pookieeeeeee.
My favorite person.
My loveeeeee.

I love you more than I can explain, babyyyyyyyy.

— Your Jenuuu ❤️`,

  /* ---- The last surprise: shown one by one, then the ending ---- */
  finalMessages: [
    "Whatever happens, I hope our story keeps going…",
    "Chapter after chapter.",
    "One memory at a time.",
    "One laugh at a time.",
    "And hopefully, many more birthdays together. ❤️"
  ],
  finalEnd: [
    "Happy Birthday, bachaaaaaa!",
    "Hu tane khub khub prem karu chhu. ❤️",
    "— From your Jenuuu babbyyyyyy❤️"
  ],

  /* ---- Every sentence on every screen ---- */
  text: {
    "who.you": "You",
    "who.me": "Me",

    /* Opening */
    "open.hey": "Hey Babyyy… ❤️",
    "open.made": "I made something special for you.",
    "open.back": "Come, let's go back to where we started…",
    "open.start": "START OUR STORY →",
    "open.musicHint": "Psst… tap the ♪ button anytime for some music 🎧",

    /* Level 1 */
    "l1.title": "Babyyy, yaad hai how it all started? 📱",
    "l1.s1": "You sent me that Instagram request, and initially, we were just friends.",
    "l1.s2": "Then I put a song up on Instagram, and you came in with this…",
    "l1.b1": "Kai kbr padi aama?",
    "l1.later": "…and a little later 😏",
    "l1.b2": "Hu tne reels mokli sku?",
    "l1.b3": "Ha.",
    "l1.s3": "And then started our endless reels, roasting and so much fun. 😂❤️ Honestly, neither of us knew where all this would lead.",
    "l1.next": "NEXT MEMORY →",

    /* Level 2 */
    "l2.title": "Okay Jay, let's see how well you remember our reel era! 😏",
    "l2.q": "What usually happened when we started sharing reels?",
    "l2.done1": "See? 😂 Our reel era was something else.",
    "l2.done2": "Best-friend mode: UNLOCKED ❤️",
    "l2.next": "LET'S GO →",

    /* Level 3 */
    "l3.s1": "First, we played that online cricket league game together…",
    "l3.s2": "Then you introduced me to BGMI. 😭😂",
    "l3.you": "You: Pro player 😎",
    "l3.me": "Me: Trying my best, okay? Don't judge my gaming skills. 😭😂❤️",
    "l3.inst": "Catch {target} points of hearts in {seconds} seconds. Move your mouse or drag your finger to move the basket. Golden hearts are worth 3! ✨",
    "l3.ready": "Ready, pro player? 😎",
    "l3.start": "START ▶",
    "l3.retry": "TRY AGAIN ↻",
    "l3.again": "PLAY AGAIN ↻",
    "l3.lose": "So close, pro player! 😭\nYou got {score}. Try again, I believe in you ❤️",
    "l3.winMsg": "You did it! {score} points! 🎉",
    "l3.win": "Gaming duo unlocked! 🎮❤️",
    "l3.winSub": "Pro player status confirmed 😎",
    "l3.next": "NEXT MEMORY →",

    /* Level 4 */
    "l4.s1": "Babyyy, somewhere between our silly reels, games and everyday conversations…",
    "l4.s2": "I started sharing things with you that weren't always easy for me to talk about.",
    "l4.s3": "You became someone I felt comfortable opening up to, even about my anxiety.",
    "l4.s4": "And that means more to me than I can explain.",
    "l4.next": "THERE'S MORE I WANT TO TELL YOU →",

    /* Level 5 */
    "l5.title": "Do you remember our brother's wedding? ❤️",
    "l5.s1": "You came to our brother's wedding, and you gave me my first gift from you…",
    "l5.tap": "Tap the gifts 🎁",
    "l5.from1": "From you",
    "l5.from2": "From me",
    "l5.g1": "A bracelet. ❤️",
    "l5.g1b": "I still remember that gift, babyyy.",
    "l5.g2": "A keychain. ❤️",
    "l5.g2b": "And yes, you have to remember the gift I gave you too! 😂",
    "l5.both": "Two little gifts, but such a special memory for me.",
    "l5.next": "REMEMBER WHAT HAPPENED NEXT? →",

    /* Level 6 */
    "l6.date": "{date}",
    "l6.time": "{time}",
    "l6.s1": "Babyyyy, this was the night our story changed. ❤️",
    "l6.open": "OPEN THE REEL ❤️",
    "l6.reelcap": "The reel ❤️",
    "l6.watch": "Watch it on Instagram ↗",
    "l6.r1": "You proposed to me through a reel…",
    "l6.r2": "AND I SAID YESSSSSSS! ❤️",
    "l6.r3": "TU TO ACCEPTED HI HAI ❤️",
    "l6.r4": "Can you believe my best friend became my love?",
    "l6.next": "NEXT MEMORY →",

    /* Level 7 */
    "l7.title": "{bday} — MY BIRTHDAY ❤️",
    "l7.s1": "Babyyy, do you remember our first meeting alone?",
    "l7.s2": "We went to watch a movie.",
    "l7.s3": "You were riding the bike.",
    "l7.s4": "I was sitting behind you.",
    "l7.s5": "And somehow, that simple day became one of my most memorable days.",
    "l7.card": "One of my favorite days with you. ❤️",
    "l7.s6": "If I could relive one day with you, this day would always be special to me.",
    "l7.next": "LET'S SEE IF YOU REMEMBER EVERYTHING →",

    /* Level 8 */
    "l8.title": "How well do you know our story? 🧠",
    "l8.intro": "Eight questions, babyyy. No pressure… okay, a little pressure 😏",
    "l8.nextQ": "NEXT QUESTION →",
    "l8.finish": "SEE MY SCORE →",
    "l8.retry": "TRY AGAIN FOR A BETTER SCORE ↻",
    "l8.right": "It was:",
    "l8.next": "ONE LAST CHALLENGE →",

    /* Level 9 */
    "l9.title": "Different, but ours ❤️",
    "l9.hint": "Tap the little tags to peek inside 👇",
    "l9.jayTitle": "{JAY} 😎",
    "l9.meTitle": "{ME} ❤️",
    "l9.cook1": "Jay says he won't cook when everyone is around…",
    "l9.cookBtn": "WHAT ABOUT WHEN WE'RE ALONE? 😂",
    "l9.cook2": "Apparently, that's when we're allowed to cook together! Babyyy, I'm remembering this promise. 😏❤️",
    "l9.real": "We don't always think the same, babyyy. I overthink, you stay chilled, and sometimes we fight… and then I get my “sorry babyyy.” 🥹",
    "l9.end1": "We don't have to be the same to mean something special to each other.",
    "l9.end2": "And honestly, I love our little differences too. ❤️",
    "l9.next": "ALMOST THERE →",

    /* Level 10 */
    "l10.s1": "Babyyy, one last challenge before your surprise.",
    "l10.clue": "The password is connected to the night everything changed.",
    "l10.placeholder": "Type the password…",
    "l10.unlock": "UNLOCK 🔐",
    "l10.hintBtn": "Need a hint? 🙈",
    "l10.wrong": "Hmmm, think about our special night again. 😏",
    "l10.empty": "Type something first, babyyy 😂",
    "l10.ok1": "ACCESS GRANTED ❤️",
    "l10.ok2": "Okay babyyy, you're ready for the final surprise.",
    "l10.next": "OPEN YOUR SURPRISE 🎁",

    /* Final page */
    "fin.mission": "MISSION COMPLETED!",
    "fin.hb": "HAPPY BIRTHDAY, BACHAAAAAAAAAAAA ❤️",
    "fin.sub": "Babyyy, this whole little world is something I made just for you.",
    "fin.nav1": "Memories 📸",
    "fin.nav2": "Little things ❤️",
    "fin.nav3": "My letter 💌",
    "fin.nav4": "Special days ✨",
    "fin.nav5": "Last surprise 🎁",
    "fin.h1": "OUR MEMORIES 📸",
    "fin.galleryIntro": "Tap a photo to see it bigger, babyyy.",
    "fin.h2": "LITTLE THINGS I LOVE ABOUT YOU ❤️",
    "fin.h3": "MY LETTER TO YOU 💌",
    "fin.letterIntro": "Some things are easier to write than to say…",
    "fin.letterBtn": "Babyyy, open my letter ❤️",
    "fin.letterAgain": "Read my letter again 💌",
    "fin.letterClose": "Close letter ✕",
    "fin.h4": "OUR SPECIAL DAYS ✨",
    "fin.h5": "ONE LAST SURPRISE 🎁",
    "fin.last": "Babyyy, ek last vaat kahu? ❤️",
    "fin.lastBtn": "CLICK KAR NE, BACHHAAAAA🥹",
    "fin.replay": "↻ Replay our story",
    "fin.close": "Back to our page",
    "fin.again": "Watch it again 🎁",

    /* Little messages */
    "msg.noMusic": "Add your song as audio/birthday-song.mp3 to hear music 🎧"
  }
};

/* =====================================================================
   2. HELPERS, NAVIGATION, REVEAL ENGINE, CONFETTI, MUSIC
   (You don't need to edit anything below to personalise the site.)
   ===================================================================== */

/* ---------- small helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const rand = (a, b) => a + Math.random() * (b - a);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Fisher-Yates shuffle (returns a new array)
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Replace {placeholders} inside a sentence
function fill(str, extra = {}) {
  const vars = Object.assign({
    jay: CONFIG.jayName, JAY: CONFIG.jayName.toUpperCase(),
    me: CONFIG.myName, ME: CONFIG.myName.toUpperCase(),
    date: CONFIG.proposal.date, time: CONFIG.proposal.time,
    bday: CONFIG.birthdayDate,
    target: CONFIG.game.targetScore, seconds: CONFIG.game.durationSeconds
  }, extra);
  return String(str).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
}
const T = (key, extra) => fill(CONFIG.text[key] ?? "", extra);

// Fill every element that has data-t="key" (text) or data-ph="key" (placeholder)
function bindText() {
  $$("[data-t]").forEach(el => {
    if (!(el.dataset.t in CONFIG.text)) console.warn("Missing text key:", el.dataset.t);
    el.textContent = T(el.dataset.t);
  });
  $$("[data-ph]").forEach(el => { el.placeholder = T(el.dataset.ph); });
}

/* ---------- toast ---------- */
let toastTimer = 0;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
}

/* ---------- state ---------- */
const ORDER = ["s0", "l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9", "l10", "final"];
const state = {
  current: 0,       // index in ORDER
  unlocked: 0,      // highest index Jay may open
  done: new Set(),  // ids of completed levels
  token: 0          // changes on every screen change (cancels old animations)
};

/* ---------- waiting (tap anywhere to skip the wait) ---------- */
let nudge = null;
function wait(ms) {
  return new Promise(resolve => {
    const t = setTimeout(finish, reduceMotion ? Math.min(ms, 250) : ms);
    function finish() { clearTimeout(t); if (nudge === finish) nudge = null; resolve(); }
    nudge = finish;
  });
}
document.addEventListener("click", e => {
  if (nudge && !e.target.closest("button, a, input, .gift, .trait, .frame")) nudge();
});

/* ---------- show / hide pieces ---------- */
const show = el => { (typeof el === "string" ? $(el) : el).classList.add("show"); };
function resetScreen(el) {
  $$(".step, .after-intro, .gated, .next-wrap", el).forEach(n => n.classList.remove("show"));
}
function showAll(el) {
  $$(".step, .after-intro, .next-wrap", el).forEach(n => n.classList.add("show"));
}

// Reveals every ".step" one after another. Returns false if the screen changed meanwhile.
async function revealSequence(el, token, defaultDelay = 1400) {
  const hint = $("#tapHint");
  hint.classList.add("show");
  const steps = $$(".step", el);
  for (const s of steps) {
    if (token !== state.token) { hint.classList.remove("show"); return false; }
    s.classList.add("show");
    await wait(Number(s.dataset.delay) || defaultDelay);
  }
  hint.classList.remove("show");
  return token === state.token;
}

// Standard level flow: intro steps -> (interactive part) -> next button
async function runLevel(el, token, opts = {}) {
  const { delay = 1400, setup, restore, afterIntro, autoComplete = false } = opts;
  if (state.done.has(el.id)) {
    if (setup) setup(true);
    showAll(el);
    if (restore) restore();
    return;
  }
  if (setup) setup(false);
  const ok = await revealSequence(el, token, delay);
  if (!ok) return;
  $$(".after-intro", el).forEach(show);
  if (afterIntro) afterIntro();
  if (autoComplete) complete(el.id);
}

// A level is finished: unlock the next one and show the Next button
function complete(id) {
  state.done.add(id);
  const idx = ORDER.indexOf(id);
  state.unlocked = Math.max(state.unlocked, idx + 1);
  show($(".next-wrap", $("#" + id)));
}

/* ---------- navigation ---------- */
function updateChrome(i) {
  const bar = $("#topbar");
  const inLevels = i >= 1 && i <= 10;
  bar.classList.toggle("is-hidden", !inLevels);
  $("#progressFill").style.width = (i / 10 * 100) + "%";
  $("#progressLabel").textContent = i + " / 10";
  $("#progress").setAttribute("aria-valuenow", String(i));
}

function go(i) {
  i = clamp(i, 0, ORDER.length - 1);
  if (i > state.unlocked) return;          // levels unlock one by one
  Game.stop();
  Reel.unload();                           // stop the reel's sound when leaving Level 6
  closeOverlays();
  state.token++;
  const token = state.token;
  state.current = i;
  const id = ORDER[i];
  const el = $("#" + id);
  $$(".screen").forEach(s => s.classList.toggle("active", s === el));
  document.body.dataset.theme = el.dataset.theme;
  updateChrome(i);
  window.scrollTo(0, 0);
  if (!state.done.has(id)) resetScreen(el);
  (ENTER[id] || (() => runLevel(el, token, { autoComplete: true })))(el, token);
}

document.addEventListener("click", e => {
  if (e.target.closest("[data-next]")) go(state.current + 1);
});
$("#backBtn").addEventListener("click", () => go(state.current - 1));

/* ---------- confetti (own tiny engine, no library) ---------- */
const Confetti = (() => {
  const canvas = $("#confetti");
  const ctx = canvas.getContext("2d");
  const colors = ["#ff5c9a", "#ff9fc8", "#8e5cf0", "#ffe08a", "#ffffff", "#7ad7ff"];
  let parts = [], raf = 0, w = 0, h = 0;

  function size() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  function loop() {
    ctx.clearRect(0, 0, w, h);
    parts = parts.filter(p => p.y < h + 20 && p.life > 0);
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.rot += p.vr; p.life--;
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.min(1, p.life / 40);
      if (p.heart) { ctx.font = p.size * 2 + "px serif"; ctx.fillText("❤", -p.size, p.size); }
      else ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.6);
      ctx.restore();
    }
    if (parts.length) raf = requestAnimationFrame(loop);
    else { ctx.clearRect(0, 0, w, h); raf = 0; }
  }
  // origin: "top" (falls from the top) or "center" (pops from the middle)
  function burst(count = 120, origin = "top") {
    if (reduceMotion) return;
    size();
    for (let i = 0; i < count; i++) {
      const fromTop = origin === "top";
      parts.push({
        x: fromTop ? rand(0, w) : w / 2, y: fromTop ? rand(-40, -5) : h * 0.45,
        vx: fromTop ? rand(-1, 1) : rand(-6, 6), vy: fromTop ? rand(2, 5) : rand(-9, -2),
        size: rand(6, 12), rot: rand(0, 6), vr: rand(-0.2, 0.2),
        color: pick(colors), life: rand(110, 220), heart: Math.random() < 0.18
      });
    }
    if (!raf) raf = requestAnimationFrame(loop);
  }
  return { burst };
})();

/* ---------- ambient hearts + stars ---------- */
function buildAmbient() {
  const amb = $("#ambient");
  for (let i = 0; i < 12; i++) {
    const s = document.createElement("span");
    s.className = "float-heart";
    s.textContent = "❤";
    s.style.left = rand(2, 96) + "%";
    s.style.fontSize = rand(12, 26) + "px";
    s.style.animationDuration = rand(12, 22) + "s";
    s.style.animationDelay = rand(0, 14) + "s";
    s.style.setProperty("--sway", rand(-40, 40) + "px");
    amb.appendChild(s);
  }
  const stars = $("#stars");
  for (let i = 0; i < 70; i++) {
    const s = document.createElement("span");
    s.className = "star";
    const d = rand(1, 3);
    s.style.cssText = `left:${rand(0, 100)}%;top:${rand(0, 100)}%;width:${d}px;height:${d}px;` +
      `animation-duration:${rand(2, 6)}s;animation-delay:${rand(0, 5)}s`;
    stars.appendChild(s);
  }
}

/* ---------- music (never autoplays; page works without the file) ---------- */
const Music = (() => {
  const audio = $("#bgm");
  const btn = $("#musicBtn");
  const icon = $("#musicIcon");
  audio.src = CONFIG.music;
  function setUi(on) {
    btn.classList.toggle("playing", on);
    btn.setAttribute("aria-pressed", String(on));
    btn.setAttribute("aria-label", on ? "Pause music" : "Play music");
    icon.textContent = on ? "❚❚" : "♪";
  }
  btn.addEventListener("click", () => {
    if (audio.paused) {
      const p = audio.play();
      if (p && p.then) p.then(() => setUi(true)).catch(() => { setUi(false); toast(T("msg.noMusic")); });
      else setUi(true);
    } else { audio.pause(); setUi(false); }
  });
  audio.addEventListener("error", () => setUi(false));
  return { audio };
})();

/* =====================================================================
   3. THE LEVELS
   ENTER[id] runs every time a screen opens.
   ===================================================================== */
const ENTER = {};

/* ---------- Opening, Level 1, 4, 7 are simple story screens ---------- */
ENTER.s0 = (el, t) => runLevel(el, t, { delay: 1500, autoComplete: true });
ENTER.l1 = (el, t) => runLevel(el, t, { delay: 1600, autoComplete: true });
ENTER.l4 = (el, t) => runLevel(el, t, { delay: 2700, autoComplete: true });   // calmer, slower
ENTER.l7 = (el, t) => runLevel(el, t, { delay: 1600, autoComplete: true });

/* ---------- Level 2: the reel question ---------- */
function renderReel(done) {
  const box = $("#reelOptions");
  box.innerHTML = "";
  $("#reelFeedback").textContent = "";
  shuffle(CONFIG.reelQuiz).forEach(opt => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "opt";
    b.textContent = opt.text;
    if (done) { b.disabled = true; if (opt.correct) b.classList.add("correct"); }
    b.addEventListener("click", () => {
      $("#reelFeedback").textContent = opt.reply;
      if (opt.correct) {
        $$(".opt", box).forEach(x => { x.disabled = true; });
        b.classList.add("correct");
        Confetti.burst(60, "center");
        show("#reelDone");
        complete("l2");
      } else {
        b.classList.add("wrong");   // wrong answers just fade out, Jay tries again
        b.disabled = true;
      }
    });
    box.appendChild(b);
  });
}
ENTER.l2 = (el, t) => runLevel(el, t, {
  setup: isDone => renderReel(isDone),
  restore: () => show("#reelDone")
});

/* ---------- Level 3: heart-catching game ---------- */
const Game = (() => {
  const cfg = CONFIG.game;
  const canvas = $("#gameCanvas");
  const ctx = canvas.getContext("2d");
  const overlay = $("#gameOverlay"), msg = $("#gameMsg"), btn = $("#gameBtn");
  const elScore = $("#gScore"), elTime = $("#gTime"), elTarget = $("#gTarget");
  const basket = { x: 150, w: 90, h: 38 };
  let W = 300, H = 320;
  let running = false, raf = 0, last = 0, startAt = 0, spawnIn = 0;
  let hearts = [], pops = [], score = 0, targetX = null, onWin = () => {};

  // Make the canvas fit its container (sharp on phones too)
  function resize() {
    const w = canvas.parentElement.clientWidth || 300;
    const h = Math.round(Math.min(w * 1.05, 440));
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    W = w; H = h;
    basket.w = clamp(W * 0.26, 70, 110);
    basket.x = clamp(basket.x, basket.w / 2, W - basket.w / 2);
    if (!running) draw();
  }

  function heartPath(x, y, s) {
    ctx.beginPath();
    ctx.moveTo(x, y + s * 0.9);
    ctx.bezierCurveTo(x - s * 1.6, y - s * 0.1, x - s * 0.8, y - s * 1.2, x, y - s * 0.45);
    ctx.bezierCurveTo(x + s * 0.8, y - s * 1.2, x + s * 1.6, y - s * 0.1, x, y + s * 0.9);
    ctx.closePath();
  }

  function draw() {
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#3a1b7a");
    bg.addColorStop(1, "#240d52");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    for (const h of hearts) {
      ctx.fillStyle = h.gold ? "#ffd75e" : "#ff5c9a";
      ctx.shadowColor = h.gold ? "#ffd75e" : "#ff5c9a";
      ctx.shadowBlur = 12;
      heartPath(h.x, h.y, h.r * 0.8);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // basket
    const top = H - basket.h - 8;
    const grad = ctx.createLinearGradient(0, top, 0, top + basket.h);
    grad.addColorStop(0, "#ffb3d1");
    grad.addColorStop(1, "#8e5cf0");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(basket.x - basket.w / 2, top);
    ctx.lineTo(basket.x + basket.w / 2, top);
    ctx.lineTo(basket.x + basket.w * 0.38, top + basket.h);
    ctx.lineTo(basket.x - basket.w * 0.38, top + basket.h);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(CONFIG.jayName.toUpperCase().slice(0, 8), basket.x, top + basket.h / 2 + 4);

    // little "+1" pop-ups
    for (const p of pops) {
      ctx.globalAlpha = clamp(1 - p.t / 0.7, 0, 1);
      ctx.fillStyle = "#ffe08a";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText(p.text, p.x, p.y - p.t * 40);
    }
    ctx.globalAlpha = 1;
  }

  function updateHud(remaining) {
    elScore.textContent = String(score);
    elTarget.textContent = String(cfg.targetScore);
    elTime.textContent = String(Math.max(0, Math.ceil(remaining)));
  }

  function frame() {
    if (!running) return;
    const now = performance.now();
    const dt = clamp((now - last) / 1000, 0, 0.05);
    last = now;
    const elapsed = (now - startAt) / 1000;

    // basket glides towards the finger / mouse
    if (targetX !== null) basket.x += (targetX - basket.x) * Math.min(1, dt * 16);

    // spawn hearts (10% are golden = 3 points)
    spawnIn -= dt * 1000;
    if (spawnIn <= 0) {
      spawnIn = cfg.spawnEveryMs * rand(0.7, 1.3);
      const gold = Math.random() < 0.1;
      hearts.push({ x: rand(20, W - 20), y: -20, r: gold ? 15 : rand(11, 15), vy: rand(110, 170) + elapsed * 3, gold });
    }

    const top = H - basket.h - 8;
    for (const h of hearts) {
      h.y += h.vy * dt;
      const caught = h.y + h.r * 0.8 >= top && h.y - h.r <= top + 16 &&
                     Math.abs(h.x - basket.x) <= basket.w / 2 + h.r * 0.3;
      if (caught) {
        const pts = h.gold ? 3 : 1;
        score += pts;
        pops.push({ x: h.x, y: top - 6, t: 0, text: "+" + pts });
        h.dead = true;
      } else if (h.y - h.r > H) h.dead = true;
    }
    hearts = hearts.filter(h => !h.dead);
    pops.forEach(p => { p.t += dt; });
    pops = pops.filter(p => p.t < 0.7);

    const remaining = cfg.durationSeconds - elapsed;
    updateHud(remaining);
    draw();
    if (score >= cfg.targetScore) return finish(true);
    if (remaining <= 0) return finish(false);
    raf = requestAnimationFrame(frame);
  }

  function showOverlay(text, label) {
    msg.textContent = text;
    btn.textContent = label;
    overlay.classList.remove("is-off");
  }

  function start() {
    hearts = []; pops = []; score = 0; targetX = null;
    basket.x = W / 2;
    startAt = last = performance.now();
    spawnIn = 300;
    running = true;
    overlay.classList.add("is-off");
    updateHud(cfg.durationSeconds);
    raf = requestAnimationFrame(frame);
  }

  function finish(win) {
    running = false;
    cancelAnimationFrame(raf);
    draw();
    if (win) {
      showOverlay(T("l3.winMsg", { score }), T("l3.again"));
      onWin();
    } else {
      showOverlay(T("l3.lose", { score }), T("l3.retry"));
    }
  }

  function stop() { running = false; cancelAnimationFrame(raf); }

  // Called when the game card becomes visible
  function prepare(alreadyWon) {
    stop();
    score = 0; hearts = []; pops = [];
    resize();
    updateHud(cfg.durationSeconds);
    showOverlay(T("l3.ready"), alreadyWon ? T("l3.again") : T("l3.start"));
  }

  // controls: mouse, touch and keyboard
  function setTarget(e) {
    const r = canvas.getBoundingClientRect();
    targetX = clamp(e.clientX - r.left, basket.w / 2, W - basket.w / 2);
  }
  canvas.addEventListener("pointermove", setTarget);
  canvas.addEventListener("pointerdown", setTarget);
  document.addEventListener("keydown", e => {
    if (!running) return;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      targetX = clamp((targetX ?? basket.x) + (e.key === "ArrowLeft" ? -45 : 45), basket.w / 2, W - basket.w / 2);
    }
  });
  btn.addEventListener("click", start);
  window.addEventListener("resize", () => { if ($("#l3").classList.contains("active")) resize(); });

  return { prepare, stop, setOnWin: fn => { onWin = fn; } };
})();

Game.setOnWin(() => {
  Confetti.burst(150);
  show("#gameWin");
  complete("l3");
});
ENTER.l3 = (el, t) => runLevel(el, t, {
  setup: () => {
    $("#gameInst").textContent = T("l3.inst");
    $("#gameWinSub").textContent = T("l3.winSub");
  },
  afterIntro: () => Game.prepare(false),
  restore: () => { Game.prepare(true); show("#gameWin"); }
});

/* ---------- Level 5: two gift boxes ---------- */
$$(".gift").forEach(g => {
  g.addEventListener("click", () => {
    g.classList.add("open");
    g.setAttribute("aria-expanded", "true");
    if ($$(".gift.open").length === 2) {
      show("#giftsBoth");
      Confetti.burst(50, "center");
      complete("l5");
    }
  });
});
ENTER.l5 = (el, t) => runLevel(el, t, {
  setup: isDone => {
    $$(".gift").forEach(g => {
      g.classList.toggle("open", isDone);
      g.setAttribute("aria-expanded", String(isDone));
    });
  },
  restore: () => show("#giftsBoth")
});

/* ---------- Level 6: 29 August, 10:40 PM ---------- */
// The real Instagram reel lives in <iframe id="reelFrame" data-src="...">.
// It is loaded only when the reel is opened and unloaded when leaving the screen.
const Reel = (() => {
  const frame = $("#reelFrame");
  return {
    load()   { if (frame && !frame.getAttribute("src")) frame.setAttribute("src", frame.dataset.src); },
    unload() { if (frame && frame.getAttribute("src")) frame.removeAttribute("src"); }
  };
})();
$("#openReel").addEventListener("click", async () => {
  const token = state.token;
  $("#openReel").disabled = true;
  $("#openReel").parentElement.classList.remove("show");
  Reel.load();
  show("#reelCard");
  await wait(1900);
  if (token !== state.token) return;
  show("#r1");
  await wait(2600);                 // the little pause before the big moment
  if (token !== state.token) return;
  show("#r2");
  show("#r3");
  Confetti.burst(170);
  await wait(2000);
  if (token !== state.token) return;
  show("#r4");
  complete("l6");
});
ENTER.l6 = (el, t) => runLevel(el, t, {
  delay: 1700,
  setup: isDone => {
    $("#openReel").disabled = isDone;
    ["#reelCard", "#r1", "#r2", "#r3", "#r4"].forEach(s => $(s).classList.toggle("show", isDone));
    if (isDone) Reel.load();
  },
  restore: () => $("#openReel").parentElement.classList.remove("show")
});

/* ---------- Level 8: the big quiz ---------- */
const Quiz = (() => {
  const qs = CONFIG.quiz;
  let idx = 0, score = 0, locked = false, finalScore = 0;

  function render() {
    const q = qs[idx];
    locked = false;
    $("#qCount").textContent = `Question ${idx + 1} of ${qs.length}`;
    $("#qScore").textContent = `Score: ${score}`;
    $("#qBar").style.width = (idx / qs.length * 100) + "%";
    $("#qText").textContent = q.q;
    $("#qFeedback").textContent = "";
    $("#qNext").hidden = true;
    const box = $("#qOptions");
    box.innerHTML = "";
    // shuffle the options so the right answer moves around
    shuffle(q.options.map((text, i) => ({ text, i }))).forEach(o => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "opt";
      b.textContent = o.text;
      b.dataset.i = String(o.i);
      b.addEventListener("click", () => answer(o.i, b));
      box.appendChild(b);
    });
  }

  function answer(i, button) {
    if (locked) return;
    locked = true;
    const q = qs[idx];
    const right = i === q.answer;
    $$("#qOptions .opt").forEach(b => {
      b.disabled = true;
      if (Number(b.dataset.i) === q.answer) b.classList.add("correct");
    });
    if (right) {
      score++;
      $("#qFeedback").textContent = pick(CONFIG.quizCorrect);
    } else {
      button.classList.add("wrong");
      $("#qFeedback").textContent = pick(CONFIG.quizWrong) + "\n" + T("l8.right") + " " + q.options[q.answer];
    }
    $("#qScore").textContent = `Score: ${score}`;
    $("#qNext").textContent = idx === qs.length - 1 ? T("l8.finish") : T("l8.nextQ");
    $("#qNext").hidden = false;
  }

  function showResult() {
    const ratio = finalScore / qs.length;
    const res = CONFIG.quizResults.find(r => ratio >= r.min) || CONFIG.quizResults[CONFIG.quizResults.length - 1];
    $("#qBar").style.width = "100%";
    $("#quizCard").classList.remove("show");
    $("#resTitle").textContent = res.title;
    $("#resScore").textContent = `${finalScore} / ${qs.length}`;
    $("#resMsg").textContent = res.msg;
    show("#quizResult");
  }

  function start() {
    idx = 0; score = 0;
    $("#quizResult").classList.remove("show");
    $("#quizCard").classList.add("show");
    render();
  }

  $("#qNext").addEventListener("click", () => {
    idx++;
    if (idx >= qs.length) {
      finalScore = score;
      showResult();
      if (finalScore === qs.length) Confetti.burst(140);
      complete("l8");
    } else render();
  });
  $("#quizRetry").addEventListener("click", start);

  return { start, showResult };
})();
ENTER.l8 = (el, t) => runLevel(el, t, {
  setup: isDone => { if (!isDone) Quiz.start(); },
  restore: () => Quiz.showResult()
});

/* ---------- Level 9: different but ours ---------- */
function buildTraits() {
  [["#jayList", CONFIG.traits.jay], ["#meList", CONFIG.traits.me]].forEach(([sel, list]) => {
    const ul = $(sel);
    list.forEach(t => {
      const li = document.createElement("li");
      const b = document.createElement("button");
      b.type = "button";
      b.className = "trait";
      const label = document.createElement("span");
      label.textContent = fill(t.label);
      const remark = document.createElement("span");
      remark.className = "remark";
      remark.textContent = fill(t.remark);
      b.append(label, remark);
      b.addEventListener("click", () => b.classList.toggle("open"));
      li.appendChild(b);
      ul.appendChild(li);
    });
  });
}
$("#cookBtn").addEventListener("click", async () => {
  const token = state.token;
  $("#cookBtn").disabled = true;
  show("#cookReveal");
  await wait(1800);
  if (token !== state.token) return;
  show("#diffEnd");
  complete("l9");
});
ENTER.l9 = (el, t) => runLevel(el, t, {
  setup: isDone => {
    $("#cookBtn").disabled = isDone;
    $$(".trait").forEach(b => b.classList.remove("open"));
  },
  restore: () => { show("#cookReveal"); show("#diffEnd"); }
});

/* ---------- Level 10: secret password ---------- */
const normalizePw = s => String(s).replace(/\s+/g, "").toLowerCase();
$("#pwForm").addEventListener("submit", e => {
  e.preventDefault();
  const form = $("#pwForm"), input = $("#pwInput"), fb = $("#pwFeedback");
  const typed = normalizePw(input.value);
  if (!typed) { fb.textContent = T("l10.empty"); return; }
  if (typed === normalizePw(CONFIG.password)) {
    fb.textContent = "";
    input.disabled = true;
    form.classList.remove("show");
    show("#pwOk");
    Confetti.burst(120, "center");
    complete("l10");
  } else {
    fb.textContent = T("l10.wrong");      // never locks him out, he can try forever
    form.classList.remove("shake");
    void form.offsetWidth;                // restart the shake animation
    form.classList.add("shake");
    input.select();
  }
});
$("#pwHint").addEventListener("click", () => {
  const p = $("#pwHintText");
  p.textContent = fill(CONFIG.passwordHint);
  p.hidden = !p.hidden;
});
ENTER.l10 = (el, t) => runLevel(el, t, {
  setup: isDone => {
    $("#pwInput").disabled = isDone;
    $("#pwInput").value = "";
    $("#pwFeedback").textContent = "";
    $("#pwHintText").hidden = true;
  },
  restore: () => { $("#pwForm").classList.remove("show"); show("#pwOk"); }
});

/* =====================================================================
   4. FINAL PAGE: gallery, letter, last surprise, replay + START-UP
   ===================================================================== */

/* ---------- overlays (letter, photo, finale) ---------- */
let lastFocus = null;
function openOverlay(id) {
  lastFocus = document.activeElement;
  $(id).classList.add("open");
  document.body.classList.add("no-scroll");
}
function closeOverlays() {
  finaleToken++;                                   // stops the finale loop
  $$(".overlay.open").forEach(o => o.classList.remove("open"));
  document.body.classList.remove("no-scroll");
  if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) { /* ignore */ } }
  lastFocus = null;
}
document.addEventListener("keydown", e => { if (e.key === "Escape") closeOverlays(); });

/* ---------- photo gallery ---------- */
function buildGallery() {
  const box = $("#gallery");
  if (box.dataset.built) return;
  box.dataset.built = "1";
  CONFIG.photos.forEach((p, i) => {
    const fig = document.createElement("figure");
    fig.className = "frame";
    fig.style.setProperty("--rot", ((i % 2 ? 1 : -1) * (1 + (i % 3) * 0.6)) + "deg");
    fig.tabIndex = 0;
    fig.setAttribute("role", "button");

    const img = new Image();
    img.alt = p.caption || `Photo ${i + 1}`;
    img.src = p.src;
    img.loading = "lazy";

    // pretty placeholder if the file is missing
    const ph = document.createElement("div");
    ph.className = "ph";
    ph.hidden = true;
    ph.innerHTML = '<span class="ph-heart">📷</span><span></span>';
    ph.lastChild.textContent = "Add your photo here: " + p.src;
    img.addEventListener("error", () => { fig.classList.add("missing"); img.remove(); ph.hidden = false; });

    const cap = document.createElement("figcaption");
    cap.textContent = p.caption || "";
    fig.append(img, ph, cap);

    const open = () => {
      if (fig.classList.contains("missing")) return;
      $("#lbImg").src = p.src;
      $("#lbImg").alt = img.alt;
      $("#lbCap").textContent = p.caption || "";
      openOverlay("#lightbox");
    };
    fig.addEventListener("click", open);
    fig.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    box.appendChild(fig);
  });
}
$("#lightbox").addEventListener("click", closeOverlays);

/* ---------- little things + special days ---------- */
function buildFinalLists() {
  const ul = $("#loveList");
  CONFIG.loveList.forEach(t => {
    const li = document.createElement("li");
    li.textContent = fill(t);
    ul.appendChild(li);
  });
  const tl = $("#timeline");
  CONFIG.days.forEach(d => {
    const item = document.createElement("div");
    item.className = "t-item card";
    const when = document.createElement("p"); when.className = "t-when"; when.textContent = fill(d.when);
    const title = document.createElement("h3"); title.className = "t-title"; title.textContent = fill(d.title);
    const text = document.createElement("p"); text.className = "t-text"; text.textContent = fill(d.text);
    item.append(when, title, text);
    tl.appendChild(item);
  });
}

/* ---------- the letter ---------- */
function renderLetter() {
  const body = $("#letterBody");
  body.innerHTML = "";
  const paras = CONFIG.letter.trim().split(/\n\s*\n/);
  paras.forEach((txt, i) => {
    const p = document.createElement("p");
    p.textContent = txt.trim();
    p.style.setProperty("--i", String(i));
    if (i === 0) p.className = "greet";
    else if (i === paras.length - 1) p.className = "last";
    else if (i === paras.length - 2) p.className = "sign";
    body.appendChild(p);
  });
  $("#letterPaper").scrollTop = 0;
}
$("#openLetter").addEventListener("click", () => {
  renderLetter();
  openOverlay("#letterOverlay");
  $("#letterClose").focus();
  $("#openLetter").textContent = T("fin.letterAgain");
});
$("#letterClose").addEventListener("click", closeOverlays);
$("#letterClose2").addEventListener("click", closeOverlays);
$("#letterOverlay").addEventListener("click", e => { if (e.target.id === "letterOverlay") closeOverlays(); });

/* ---------- ONE LAST SURPRISE ---------- */
let finaleToken = 0;
async function playFinale() {
  const stage = $("#finStage"), end = $("#finEnd"), tap = $("#finTap");
  openOverlay("#finale");
  const token = ++finaleToken;
  end.classList.remove("show");
  end.innerHTML = "";
  stage.textContent = "";
  tap.hidden = false;

  for (const line of CONFIG.finalMessages) {
    if (token !== finaleToken) return;
    stage.classList.remove("in");
    void stage.offsetWidth;
    stage.style.animationDuration = "3.2s";
    stage.textContent = fill(line);
    stage.classList.add("in");
    await wait(3200);
  }
  if (token !== finaleToken) return;
  stage.classList.remove("in");
  stage.textContent = "";
  tap.hidden = true;

  // the ending, line by line
  const classes = ["f-hb", "f-love", "f-from"];
  CONFIG.finalEnd.forEach((line, i) => {
    const p = document.createElement("p");
    p.className = classes[i] || "f-love";
    p.textContent = fill(line);
    end.appendChild(p);
  });
  const btns = document.createElement("div");
  btns.className = "fin-btns";
  const close = document.createElement("button");
  close.type = "button"; close.className = "btn ghost"; close.textContent = T("fin.close");
  close.addEventListener("click", closeOverlays);
  const again = document.createElement("button");
  again.type = "button"; again.className = "btn ghost"; again.textContent = T("fin.again");
  again.addEventListener("click", playFinale);
  btns.append(close, again);
  end.appendChild(btns);
  end.classList.add("show");
  Confetti.burst(220);
}
$("#lastBtn").addEventListener("click", playFinale);

/* ---------- scroll-in animation for final sections ---------- */
function observeSections() {
  const secs = $$(".reveal-on-scroll");
  if (!("IntersectionObserver" in window) || reduceMotion) { secs.forEach(s => s.classList.add("in")); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  secs.forEach(s => io.observe(s));
}

ENTER.final = () => {
  buildGallery();
  observeSections();
  Confetti.burst(220);
};

/* ---------- replay ---------- */
$("#replayBtn").addEventListener("click", () => {
  state.done.clear();
  state.unlocked = 0;
  go(0);
});

/* ---------- START ---------- */
function init() {
  document.title = fill("For {jay} ❤️ — A Very Special Day");
  bindText();
  buildAmbient();
  buildTraits();
  buildFinalLists();
  go(0);
}
init();

