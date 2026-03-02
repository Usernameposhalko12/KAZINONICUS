const MUSIC_KEY = "bgMusicTime";

let bgMusic = new Audio("music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.4;

let musicStarted = false;

// перевірка чи музика увімкнена
function isMusicEnabled() {
    return localStorage.getItem("musicEnabled") !== "false";
}

// старт музики
function startGameMusic() {
    if (musicStarted) return;

    const savedTime = localStorage.getItem(MUSIC_KEY);
    if (savedTime) {
        bgMusic.currentTime = parseFloat(savedTime);
    }

    if (isMusicEnabled()) {
        bgMusic.play().then(() => {
            musicStarted = true;
        }).catch(()=>{ musicStarted = true; });
    } else {
        musicStarted = true;
    }
}

// оновлюємо стан музики (вмикаємо/вимикаємо)
function updateMusicState() {
    if (!musicStarted) return;

    if (isMusicEnabled()) {
        bgMusic.play().catch(()=>{});
    } else {
        bgMusic.pause();
    }
}

// зберігаємо позицію музики постійно
setInterval(() => {
    if (!bgMusic.paused) {
        localStorage.setItem(MUSIC_KEY, bgMusic.currentTime);
    }
}, 500);

// Chrome ставить pause при alert → ловимо повернення фокусу
window.addEventListener("focus", resumeMusic);
document.addEventListener("visibilitychange", resumeMusic);

function resumeMusic() {
    if (!musicStarted) return;

    const savedTime = localStorage.getItem(MUSIC_KEY);
    if (savedTime) {
        bgMusic.currentTime = parseFloat(savedTime);
    }

    if (isMusicEnabled() && bgMusic.paused) {
        bgMusic.play().catch(()=>{});
    }
}

// ================== ПЕРЕМІКАЧ МУЗИКИ ==================
function toggleMusic() {
    const enabled = isMusicEnabled();
    localStorage.setItem("musicEnabled", !enabled);
    updateMusicState();
    accountMenu(); // оновлюємо кнопку в акаунт-меню
}

// ================== СТАРТ МУЗИКИ ПРИ ЗАПУСКУ ГРИ ==================
startGameMusic();

const accounts = {
  "ARSEN123": "ARSENPDIDDY123",
  "MatviyVes": "TON618",
  "Timasueta": "SUETOLOG",
  "Tematiks": "Fdnfanatik",
  "Koyakolo": "GIGACHAD",
  "Aloharbitrahnik123": "ARBITRAJ3",
  "TESTAC": "TESTAC",
  "NAZARK": "Geometrydash1488",
  "Egoroblox": "undertale52",
  "SIGMA228": "KOT1488",
  "BABULKA777": "KOT52",
  "OBSHAK123": "OBSHAK123"
};

let currentUser = null;
let balance = 0;
let nikus = 0;
let xcoin = 0;
let OPEX = 0;

let missedTimerInterval = null;

   
let lastLevelCheck = 0; 

let level = 0;
let levelPrice = 10;
let missedDays = 0;
let levelFreeze = false;

let rihic = 0;

let kit123 = 0;

let capibara = 0;

let kithlib = 0;

let respect = 0;

let goldapple = 0;
let garbuz = 0;
let corn = 0;
let sunflower = 0;
let inventory = [];
let usedPromos = [];
let blockedItems = new Set();
let water = 0;
let dosvid = 0;

const qualities = [
  {name:"Прямо з цеху", chance:0.125},
  {name:"Після консервації", chance:0.25},
  {name:"Після уроку", chance:0.40},
  {name:"Зношена", chance:0.225}
];

function saveData() {
  if (!currentUser) return;
  localStorage.setItem(currentUser + "_balance", balance);
  localStorage.setItem(currentUser + "_nikus", nikus);
  localStorage.setItem(currentUser + "_xcoin", xcoin);  
  localStorage.setItem(currentUser + "_OPEX", OPEX);
  localStorage.setItem(currentUser + "_lastPromoTimes", JSON.stringify(lastPromoTimes));
  localStorage.setItem(currentUser + "_dosvid", dosvid);

  localStorage.setItem("levelFreeze", levelFreeze ? "1" : "0");

localStorage.setItem(currentUser + "_pgd", pgd);

localStorage.setItem(currentUser + "_level", level);
localStorage.setItem(currentUser + "_levelPrice", levelPrice);
localStorage.setItem(currentUser + "_missedDays", missedDays);
localStorage.setItem(currentUser + "_levelFreeze", levelFreeze ? 1 : 0);

localStorage.setItem(currentUser + "_rihic", rihic);
localStorage.setItem(currentUser + "_kit123", kit123);
localStorage.setItem(currentUser + "_capibara", capibara);
localStorage.setItem(currentUser + "_kithlib", kithlib);
  localStorage.setItem(currentUser + "_water",water);
  localStorage.setItem(currentUser + "_goldapple", goldapple);
  localStorage.setItem(currentUser + "_corn", corn);
  localStorage.setItem(currentUser + "_garbuz", garbuz);
  localStorage.setItem(currentUser + "_sunflower", sunflower);

localStorage.setItem(currentUser + "_j1", j1);
localStorage.setItem(currentUser + "_j2", j2);
localStorage.setItem(currentUser + "_j3", j3);
localStorage.setItem(currentUser + "_j4", j4);

localStorage.setItem(currentUser + "_missedDays", missedDays);
localStorage.setItem(currentUser + "_lastLevelCheck", lastLevelCheck);

localStorage.setItem(currentUser + "_respect", respect);

localStorage.setItem(currentUser + "_inventory", JSON.stringify(inventory));
  localStorage.setItem(currentUser + "_usedPromos", JSON.stringify(usedPromos));
  localStorage.setItem(currentUser + "_blockedItems", JSON.stringify(Array.from(blockedItems)));
  localStorage.setItem(currentUser + "_bpcdPoints", currentBPCD);
}

  let currentBPCD = 0;

  function loadData() {
  if (!currentUser) return;
 balance = Math.round(parseFloat(localStorage.getItem(currentUser + "_balance") || "0"));
 nikus = parseFloat(parseFloat(localStorage.getItem(currentUser + "_nikus") || "0").toFixed(2));
  OPEX = parseInt(localStorage.getItem(currentUser + "_OPEX")) || 0;
  lastPromoTimes = JSON.parse(localStorage.getItem(currentUser + "_lastPromoTimes")) || [];
dosvid = parseInt(localStorage.getItem(currentUser + "_dosvid")) || 0;
pgd = parseInt(localStorage.getItem(currentUser + "_pgd")) || 0;
level = parseInt(localStorage.getItem(currentUser + "_level")) || 0;
levelPrice = parseInt(localStorage.getItem(currentUser + "_levelPrice")) || 10;
missedDays = parseInt(localStorage.getItem(currentUser + "_missedDays")) || 0;
levelFreeze = localStorage.getItem(currentUser + "_levelFreeze") === "1";

respect = parseInt(localStorage.getItem(currentUser + "_respect") || "0");

  kithlib = parseInt(localStorage.getItem(currentUser + "_kithlib")) || 0;

 capibara = parseInt(localStorage.getItem(currentUser + "_capibara")) || 0;

 kit123 = parseInt(localStorage.getItem(currentUser + "_kit123")) || 0;

 rihic = parseInt(localStorage.getItem(currentUser + "_rihic")) || 0;

 j1 = parseInt(localStorage.getItem(currentUser + "_j1")) || 0;

 j2 = parseInt(localStorage.getItem(currentUser + "_j2")) || 0;

 j3 = parseInt(localStorage.getItem(currentUser + "_j3")) || 0;

 j4 = parseInt(localStorage.getItem(currentUser + "_j4")) || 0;

water = parseInt(localStorage.getItem(currentUser + "_water")) || 0;
sunflower = parseInt(localStorage.getItem(currentUser + "_sunflower")) || 0;
garbuz = parseInt(localStorage.getItem(currentUser + "_garbuz")) || 0;
corn = parseInt(localStorage.getItem(currentUser + "_corn")) || 0;
goldapple = parseInt(localStorage.getItem(currentUser + "_goldapple")) || 0;

missedDays = parseInt(localStorage.getItem(currentUser + "_missedDays")) || 0;
lastLevelCheck = parseInt(localStorage.getItem(currentUser + "_lastLevelCheck")) || Date.now();

inventory = JSON.parse(localStorage.getItem(currentUser + "_inventory")) || [];
  xcoin = parseInt(localStorage.getItem(currentUser + "_xcoin")) || 0;
  usedPromos = JSON.parse(localStorage.getItem(currentUser + "_usedPromos")) || [];
  blockedItems = new Set(JSON.parse(localStorage.getItem(currentUser + "_blockedItems")) || []);
  currentBPCD = parseInt(localStorage.getItem(currentUser + "_bpcdPoints")) || 0;

}

function addBalance(amount) {
    if (typeof balance === "undefined") window.balance = 0;
    balance = Number(balance) || 0;
    balance += Number(amount);
    localStorage.setItem("balance", balance);
    const el = document.getElementById("balanceDisplay");
    if (el) el.textContent = balance;
    return balance;
}

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function strToB64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function b64ToStr(b64) {
  return decodeURIComponent(escape(window.atob(b64)));
}

function loginScreen() {
  document.getElementById("app").innerHTML = `
    <h2>Вхід у акаунт</h2>
    <input id="login" placeholder="Логін" /><br />
    <input id="password" placeholder="Пароль" type="password" /><br />
    <button onclick="login()">Увійти</button>
  `;
}

function login() {
  const loginVal = document.getElementById("login").value.trim();
  const passVal = document.getElementById("password").value;

  if (accounts[loginVal] && accounts[loginVal] === passVal) {
    currentUser = loginVal;
    loadData();
    startGameMusic();

    // 🖼️ Показуємо preloader і завантажуємо всі PNG
    showPreloader(() => {
      mainMenu();
    });

  } else {
    alert("Невірний логін або пароль");
  }
}

function logout() {
  saveData();

  currentUser = null;
  balance = 0;
  nikus = 0;
  dosvid = 0;
  xcoin = 0;
  pgd = 0;
  OPEX = 0;
  goldapple = 0;
  garbuz = 0;
  missedDays = 0;
  lastLevelCheck = 0;
  corn = 0;
  sunflower = 0;
  currentBPCD = 0;
  j1 = 0;
  j2 = 0;
  j3 = 0;
  j4 = 0;
  water = 0;
  inventory = [];
  usedPromos = [];
  blockedItems.clear();

  loginScreen();
}

function buildProfileCard() {
  const profile = loadProfile();
  const av     = profile.avatar || null;
  const medals = (profile.medals || []).slice(0, 3);
  const title  = profile.title  || "";

  const avHTML = av && av.img
    ? '<img src="img/' + av.img + '" alt="' + (av.name || '') + '"' +
      ' style="width:100%;height:100%;object-fit:cover;">'
    : '<span style="font-size:22px;line-height:1;">🌿</span>';

  const medalsHTML = medals.length
    ? medals.map(function(m) {
        return '<img src="img/' + m.img + '" alt="' + m.name + '" title="' + m.name + '"' +
          ' style="width:32px;height:32px;object-fit:contain;' +
          'filter:drop-shadow(0 1px 3px rgba(0,0,0,0.4));">';
      }).join("")
    : '<span style="font-size:9px;opacity:0.5;color:#aaa;">немає медалей</span>';

  return '<button onclick="openProfile()" class="menuButton"' +
    ' style="grid-column:1/3;padding:0;overflow:hidden;height:auto;min-height:60px;' +
    'background:linear-gradient(135deg,#1e1e1e,#2a2a2a);border:1px solid #3a3a3a;' +
    'text-align:left;display:block;">' +
    '<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;">' +
      '<div style="width:46px;height:46px;border-radius:50%;border:2px solid #7cb342;' +
        'box-shadow:0 0 10px rgba(124,179,66,0.5);overflow:hidden;background:#1a2a10;' +
        'display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
        avHTML +
      '</div>' +
      '<div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px;">' +
        '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
          '<span style="font-size:14px;font-weight:700;color:#fff;white-space:nowrap;' +
            'overflow:hidden;text-overflow:ellipsis;max-width:120px;">' +
            currentUser +
          '</span>' +
          (title
            ? '<span style="font-size:9px;background:rgba(124,179,66,0.2);' +
              'border:1px solid #7cb342;color:#aed581;' +
              'padding:1px 7px;border-radius:20px;white-space:nowrap;">' +
              title + '</span>'
            : "") +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
          medalsHTML +
        '</div>' +
      '</div>' +
      '<div style="color:#7cb342;font-size:16px;opacity:0.7;flex-shrink:0;">›</div>' +
    '</div>' +
    '<div style="height:2px;' +
      'background:linear-gradient(90deg,transparent,#7cb342,#dce775,#7cb342,transparent);' +
      'opacity:0.6;"></div>' +
  '</button>';
}

function mainMenu() {
  saveData();
  const DAY = 24 * 60 * 60 * 1000;
  const rewardKey = currentUser + "_dailyReward";
  const lastClaim = Number(localStorage.getItem(rewardKey) || 0);
  const now = Date.now();
  const canClaim = now - lastClaim >= DAY;
  let timeLeft = DAY - (now - lastClaim);
  if (timeLeft < 0) timeLeft = 0;

  function formatTime(ms) {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return h + "г " + m + "хв " + s + "с";
  }

  const profileCard = buildProfileCard();

  const html = `
<div style="text-align:center;position:relative;top:-83px;animation:slideDown 0.6s ease-out;">
  <img src="img/top-banner.png"
    style="width:80%;max-width:480px;transform:scale(1.3);
    filter:drop-shadow(0 4px 8px rgba(0,0,0,0.35));">
</div>

<div style="position:relative;top:-150px;padding:20px;border-radius:18px;
  max-width:420px;margin:0 auto;background:rgba(255,255,255,0.15);
  backdrop-filter:blur(8px);box-shadow:0 0 18px rgba(0,0,0,0.25);
  animation:fadeIn 0.8s ease-out;">

  <h2 style="text-align:center;margin:0;font-size:26px;font-weight:700;">
    Вітаю, ${currentUser}
  </h2>
  <p style="text-align:center;margin:4px 0 20px;font-size:17px;font-weight:500;">
    Баланс: <span style="font-weight:700;color:#ffe14d;">${balance}</span> ігрових нікусів
  </p>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
    <button onclick="shopMenu()" class="menuButton">🛒 Магазин</button>
    <button onclick="showInventory()" class="menuButton">🎒 Інвентар (${inventory.length})</button>
    <button onclick="MenuBank()" class="menuButton">🏦 Банк</button>
    <button onclick="promoMenu()" class="menuButton">🎁 Промокод</button>
    <button onclick="openEventsMenu()" class="menuButton">🎟️ Івенти</button>
    <button onclick="MenuGarden()" class="menuButton">🌿 Сад</button>
    <button onclick="Price1488_openComputer()" class="menuButton">🖥️ Комп'ютер</button>
    <button onclick="accountMenu()" class="menuButton">⚙️ Акаунт</button>
    ${profileCard}

    <button onclick="openMarket()" class="menuButton"
      style="grid-column:1/3;background:#ffcc77;">
      🛒 Ринок
    </button>
    <button onclick="openLevelMenu()" class="menuButton"
      style="grid-column:1/3;background:#77ccff;">
      🎖 Прокачка рівня
    </button>
    <button onclick="logout()" class="menuButton"
      style="grid-column:1/3;background:#ff4c4c;">
      🚪 Вийти
    </button>
  </div>
</div>

<div style="position:fixed;right:14px;bottom:14px;width:160px;
  text-align:center;z-index:999;animation:bounceIn 1s ease-out;">
  <img src="img/daily-reward.png" style="width:100%;pointer-events:none;">
  <button onclick="claimDailyReward()"
    style="width:100%;margin-top:-10px;padding:10px 0;border:none;border-radius:10px;
      font-weight:700;cursor:pointer;
      background:${canClaim ? "#4cff77" : "#666"};color:black;
      box-shadow:0 0 10px rgba(0,0,0,0.4);transition:all 0.3s ease;"
    ${canClaim ? "" : "disabled"}
    onmouseover="if(!this.disabled) this.style.transform='scale(1.05)'"
    onmouseout="this.style.transform='scale(1)'">
    🎁 Забрати
  </button>
  <div id="dailyTimer"
    style="margin-top:6px;font-size:13px;font-weight:600;color:white;opacity:0.85;">
    ${canClaim ? "Доступно зараз!" : formatTime(timeLeft)}
  </div>
</div>

<style>
  @keyframes fadeIn {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes slideDown {
    from { transform:translateY(-30px) scale(1.3); opacity:0; }
    to   { transform:translateY(0) scale(1.3); opacity:1; }
  }
  @keyframes bounceIn {
    0%   { transform:scale(0.3); opacity:0; }
    50%  { transform:scale(1.05); }
    70%  { transform:scale(0.9); }
    100% { transform:scale(1); opacity:1; }
  }
  .menuButton {
    padding:12px 0; font-size:16px; font-weight:600;
    border:none; border-radius:10px; cursor:pointer;
    background:#2a2a2a; color:white;
    transition:all 0.25s ease;
    box-shadow:0 0 6px rgba(0,0,0,0.3);
    position:relative; overflow:hidden;
  }
  .menuButton::before {
    content:''; position:absolute; top:50%; left:50%;
    width:0; height:0; border-radius:50%;
    background:rgba(255,255,255,0.2);
    transform:translate(-50%,-50%);
    transition:width 0.6s, height 0.6s;
  }
  .menuButton:hover::before { width:300px; height:300px; }
  .menuButton:hover { transform:scale(1.05); box-shadow:0 0 15px rgba(255,255,255,0.5); }
  .menuButton:active { transform:scale(0.98); }
</style>
`;

  document.getElementById("app").innerHTML = html;

  if (!canClaim) {
    setInterval(function() {
      const now = Date.now();
      const left = DAY - (now - lastClaim);
      const el = document.getElementById("dailyTimer");
      if (el) el.innerText = left > 0 ? formatTime(left) : "Доступно зараз!";
    }, 1000);
  }
}

// ===== ФУНКЦІЯ ЗАБОРУ НАГОРОДИ =====
function claimDailyReward() {
  const DAY = 24 * 60 * 60 * 1000;
  const key = currentUser + "_dailyReward";
  const last = Number(localStorage.getItem(key) || 0);
  const now = Date.now();

  if (now - last < DAY) {
    alert("⏳ Ще рано!");
    return;
  }

  // ДОДАЄМО ABSOLUTE (Міжсезонний) КЕЙС
  addCase("absolute");

  localStorage.setItem(key, now);
  alert("🎉 Ви отримали Міжсезонний кейс!");
  mainMenu();
}

function shopMenu() {
  const shopItems = [
    { name: "Весна26", price: 90, img: "case_vesna26.png", type: "vesna26" }, 
    { name: "Весна26 Бокс", price: 50, img: "case_vesna26box.png", type: "vesna26box" }, 
    { name: "Весняний Подарунок", price: 120, img: "case_vesna26gift.png", type: "vesna26gift" },   
    { name: "Весняний Колекційний Кейс 2026", price: 65, img: "case_kolek3.png", type: "kolek3" },    
    { name: "FlowerPower26", price: 115, img: "case_flow.png", type: "flow" },  
    { name: "Аватарний Весняний Кейс 2026", price: 150, img: "case_avatar1.png", type: "avatar1" },   
    { name: "Кейс з насінням 3", price: 200, img: "case_NN3.png", type: "NN3" },   
    { name: "Міжсезонний Кейс", price: 80, img: "case_absolute.png", type: "absolute" }, 
    { name: "Аркадний кейс", price: 40, img: "case_arcase.png", type: "arcase" },
    { name: "Ключ від Аркадного кейсу", price: 50, img: "key_arcase.png", type: "arcaseKey", isKey: true }
  ];

  let html = `
    <div style="
      background: linear-gradient(135deg, #1b1b1b, #2b2b2b);
      padding: 20px;
      color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 25px rgba(0,0,0,0.6);
      text-align:center;
      animation: fadeIn 0.5s ease-out;
    ">
      <h2 style="color:#ffd966; text-shadow:0 0 10px #ffcc00;">🛒 Магазин</h2>
      <div style="
        background:rgba(255,255,255,0.05);
        padding:8px 20px;
        border-radius:8px;
        display:inline-block;
        margin-bottom:20px;
        font-weight:bold;
      ">💰 Баланс: <span style="color:#00ff88;">${balance}</span> ігрових нікусів</div>

      <div style="display:flex; flex-wrap:wrap; gap:25px; justify-content:center;">
  `;

  shopItems.forEach((item, index) => {
    html += `
      <div class="shop-item" style="
        width:200px;
        background:rgba(255,255,255,0.05);
        border:1px solid rgba(255,255,255,0.1);
        border-radius:12px;
        box-shadow:0 0 10px rgba(0,0,0,0.4);
        padding:12px;
        text-align:center;
        transition:all 0.3s ease;
        animation: slideUp 0.5s ease-out ${index * 0.1}s both;
      " 
      onmouseover="this.style.transform='translateY(-10px) scale(1.05)'; this.style.boxShadow='0 8px 25px rgba(255,255,255,0.3)';"
      onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 0 10px rgba(0,0,0,0.4)';"
      >
        <img src="img/${item.img}" width="150" style="border-radius:6px; margin-bottom:8px;"><br/>
        <b style="color:#ffd966;">${item.name}</b><br/>
        <button onclick="buyItem('${item.type}', ${item.price}, ${Boolean(item.isKey)})" style="
          margin-top:8px;
          background:linear-gradient(90deg, #ff9900, #ffcc00);
          border:none;
          padding:8px 15px;
          color:#222;
          border-radius:6px;
          font-weight:bold;
          cursor:pointer;
          transition:all 0.2s;
        " 
        onmouseover="this.style.background='linear-gradient(90deg,#ffaa00,#ffee66)';"
        onmouseout="this.style.background='linear-gradient(90deg,#ff9900,#ffcc00)';"
        >Купити за ${item.price} 💰</button>
      </div>
    `;
  });

  html += `
      </div>
      <br/>
      <button onclick="mainMenu()" style="
        margin-top:15px;
        background:linear-gradient(90deg, #888, #bbb);
        border:none;
        padding:8px 15px;
        border-radius:8px;
        font-weight:bold;
        cursor:pointer;
        transition:all 0.3s ease;
      "
      onmouseover="this.style.background='linear-gradient(90deg, #999, #ccc)'; this.style.transform='scale(1.05)';"
      onmouseout="this.style.background='linear-gradient(90deg, #888, #bbb)'; this.style.transform='scale(1)';"
      >⬅️ Назад</button>
    </div>

    <style>
      @keyframes slideUp {
        from { 
          opacity: 0;
          transform: translateY(30px);
        }
        to { 
          opacity: 1;
          transform: translateY(0);
        }
      }
    </style>
  `;

  document.getElementById("app").innerHTML = html;
}

function incrementCaseOpen(caseType) {
  if (!currentUser) return;
  const key = currentUser + "_caseOpen_" + caseType;
  const val = parseInt(localStorage.getItem(key) || "0") + 1;
  localStorage.setItem(key, val);
  const totalKey = currentUser + "_caseOpenTotal";
  const total = parseInt(localStorage.getItem(totalKey) || "0") + 1;
  localStorage.setItem(totalKey, total);
}

function buyItem(type, cost, isKey = false) {
  if (balance < cost) {
    alert("Недостатньо нікусів!");
    return;
  }
  balance -= cost;

  if (isKey) {
    addKey(type.replace("Key", ""));
  } else {
    addCase(type);
  }

  incrementCaseOpen(type);
  saveData();
  alert(`Купівля успішна!`);
  shopMenu();
}

   

function addCase(caseType, count=1){
  if(!inventory) inventory = JSON.parse(localStorage.getItem(currentUser+"_inventory"))||[];
  for(let i=0;i<count;i++){
    inventory.push({
      id: `${caseType}_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
      type: "case",
      caseType: caseType
    });
  }
  localStorage.setItem(currentUser+"_inventory", JSON.stringify(inventory)); // ✅
}

function addKey(caseType, count=1){
  if(!inventory) inventory = JSON.parse(localStorage.getItem(currentUser+"_inventory"))||[];
  for(let i=0;i<count;i++){
    inventory.push({
      id: `${caseType}Key_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
      type: "key",
      keyType: caseType,
      name: `${getCaseName(caseType)} Key`,
      img: `key_${caseType}.png`
    });
  }
  localStorage.setItem(currentUser+"_inventory", JSON.stringify(inventory)); // ✅
}

/* ── стан ── */
let invFolders = JSON.parse(localStorage.getItem("invFolders") || "[]");
let _invSearch = "";
let _invFolder = null;
let _invSearchWasActive = false;
let _invScrollY = 0;

function saveFolders() {
  localStorage.setItem("invFolders", JSON.stringify(invFolders));
}
function getFolderOf(itemId) {
  return invFolders.find(f => f.itemIds.includes(itemId)) || null;
}
function genFolderId() {
  return "f" + Date.now() + Math.random().toString(36).slice(2, 6);
}
function saveInvScroll() {
  _invScrollY = window.scrollY || document.documentElement.scrollTop;
}
function restoreInvScroll() {
  requestAnimationFrame(() => window.scrollTo({ top: _invScrollY, behavior: "instant" }));
}

const FOLDER_COLORS = ["#e4b84d","#4db8e4","#e44d6b","#4de494","#b44de4","#e4774d","#4d7be4"];

/* ══════════════════════════════════════════════════════════
   CSS
══════════════════════════════════════════════════════════ */
function injectInvCSS() {
  if (document.getElementById("inv-style")) return;
  const s = document.createElement("style");
  s.id = "inv-style";
  s.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Share+Tech+Mono&display=swap');
:root {
  --cs-bg:#1a1a1f; --cs-panel:#23232b; --cs-border:#3a3a4a;
  --cs-accent:#e4b84d; --cs-accent2:#4db8e4;
  --cs-text:#d0d0e0; --cs-muted:#7070a0;
  --cs-red:#e44d6b; --cs-green:#4de494;
  --cs-hover:#2e2e38; --cs-card-bg:#1e1e28; --cs-card-bdr:#35354a;
  --cs-radius:6px; --cs-font:'Rajdhani',sans-serif; --cs-mono:'Share Tech Mono',monospace;
}
#inv-root{font-family:var(--cs-font);background:var(--cs-bg);color:var(--cs-text);min-height:100%;padding:16px;box-sizing:border-box;}
.inv-topbar{display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;}
.inv-title{font-size:22px;font-weight:700;color:var(--cs-accent);letter-spacing:2px;text-transform:uppercase;flex:1;}
.inv-count{font-family:var(--cs-mono);font-size:12px;color:var(--cs-muted);background:var(--cs-panel);padding:4px 10px;border-radius:20px;border:1px solid var(--cs-border);}
.inv-search-wrap{display:flex;align-items:center;background:var(--cs-panel);border:1px solid var(--cs-border);border-radius:var(--cs-radius);padding:6px 12px;gap:8px;flex:1;min-width:200px;max-width:340px;}
.inv-search-wrap svg{flex-shrink:0;color:var(--cs-muted);}
.inv-search-wrap input{background:none;border:none;outline:none;color:var(--cs-text);font-family:var(--cs-font);font-size:15px;width:100%;}
.inv-search-wrap input::placeholder{color:var(--cs-muted);}
.inv-filterbar{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;align-items:center;}
.inv-btn{background:var(--cs-panel);border:1px solid var(--cs-border);color:var(--cs-text);font-family:var(--cs-font);font-size:13px;font-weight:600;padding:5px 14px;border-radius:var(--cs-radius);cursor:pointer;letter-spacing:.5px;transition:all .15s;}
.inv-btn:hover{background:var(--cs-hover);border-color:var(--cs-accent);color:var(--cs-accent);}
.inv-btn.danger{border-color:var(--cs-red);color:var(--cs-red);}
.inv-btn.danger:hover{background:var(--cs-red);color:#fff;}
.inv-btn.primary{border-color:var(--cs-accent2);color:var(--cs-accent2);}
.inv-btn.primary:hover{background:var(--cs-accent2);color:#111;}
.inv-btn.back{background:#2a2a35;border-color:#555;color:#aaa;}
.inv-btn.back:hover{background:#35354a;color:#fff;}
.inv-folders-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;align-items:center;}
.inv-folder-chip{display:flex;align-items:center;gap:6px;background:var(--cs-panel);border:1px solid var(--cs-border);border-radius:20px;padding:4px 12px 4px 8px;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;user-select:none;}
.inv-folder-chip:hover{border-color:var(--cs-accent);}
.inv-folder-chip.active{background:var(--cs-hover);border-color:var(--cs-accent);color:var(--cs-accent);}
.inv-folder-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}
.inv-folder-x{background:none;border:none;color:var(--cs-muted);cursor:pointer;font-size:14px;padding:0 0 0 2px;line-height:1;}
.inv-folder-x:hover{color:var(--cs-red);}
.inv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;}
.inv-card{background:var(--cs-card-bg);border:1px solid var(--cs-card-bdr);border-radius:var(--cs-radius);padding:12px 10px 10px;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;transition:border-color .15s,transform .12s,box-shadow .15s;position:relative;overflow:hidden;user-select:none;}
.inv-card::before{content:'';position:absolute;inset:0;background:linear-gradient(160deg,rgba(255,255,255,.03) 0%,transparent 60%);pointer-events:none;}
.inv-card:hover{border-color:var(--cs-accent);transform:translateY(-2px);box-shadow:0 6px 24px rgba(228,184,77,.18);}
.inv-card.locked{opacity:.55;}
.inv-card-rarity-stripe{position:absolute;top:0;left:0;right:0;height:3px;}
.inv-card-folder-dot{position:absolute;top:6px;right:6px;width:8px;height:8px;border-radius:50%;}
.inv-card-img{width:130px;height:96px;object-fit:contain;image-rendering:auto;filter:drop-shadow(0 2px 8px rgba(0,0,0,.6));}
.inv-card-name{font-size:12px;font-weight:700;text-align:center;color:#e0e0f0;line-height:1.2;word-break:break-word;letter-spacing:.3px;}
.inv-card-rarity{font-size:10px;font-weight:600;padding:2px 7px;border-radius:3px;text-transform:uppercase;letter-spacing:.5px;}
.inv-card-quality{font-size:10px;padding:1px 7px;border-radius:3px;font-family:var(--cs-mono);}
.inv-card-premium{font-size:10px;color:#f5d300;font-weight:700;letter-spacing:.5px;}
.inv-card-locked-badge{font-size:10px;color:var(--cs-red);font-weight:700;}
.inv-card-menu-btn{position:absolute;bottom:6px;right:6px;background:rgba(35,35,43,.85);border:1px solid var(--cs-border);color:var(--cs-muted);border-radius:4px;width:24px;height:22px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;line-height:1;transition:all .12s;opacity:0;}
.inv-card:hover .inv-card-menu-btn{opacity:1;}
.inv-card-menu-btn:hover{background:var(--cs-accent);color:#111;border-color:var(--cs-accent);}
.inv-item-popup-overlay{position:fixed;inset:0;z-index:8888;background:transparent;}
.inv-item-popup{position:fixed;z-index:8889;background:var(--cs-panel);border:1px solid var(--cs-border);border-radius:10px;padding:14px;min-width:180px;max-width:220px;box-shadow:0 12px 40px rgba(0,0,0,.75);animation:popupIn .15s ease;}
@keyframes popupIn{from{transform:scale(.88) translateY(6px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
.inv-item-popup-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
.inv-item-popup-name{font-size:13px;font-weight:700;color:var(--cs-accent);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.inv-item-popup-close{background:none;border:none;color:var(--cs-muted);cursor:pointer;font-size:16px;line-height:1;padding:0 0 0 8px;flex-shrink:0;}
.inv-item-popup-close:hover{color:var(--cs-red);}
.inv-item-popup-btns{display:flex;flex-direction:column;gap:5px;}
.inv-popup-act{font-family:var(--cs-font);font-size:12px;font-weight:600;border:1px solid;border-radius:4px;padding:5px 8px;cursor:pointer;width:100%;text-align:left;letter-spacing:.3px;transition:all .12s;display:flex;align-items:center;gap:6px;box-sizing:border-box;}
.inv-popup-act-view{background:transparent;border-color:var(--cs-accent2);color:var(--cs-accent2);}
.inv-popup-act-view:hover{background:var(--cs-accent2);color:#111;}
.inv-popup-act-open{background:transparent;border-color:var(--cs-green);color:var(--cs-green);}
.inv-popup-act-open:hover{background:var(--cs-green);color:#111;}
.inv-popup-act-folder{background:transparent;border-color:var(--cs-accent);color:var(--cs-accent);}
.inv-popup-act-folder:hover{background:var(--cs-accent);color:#111;}
.inv-popup-act-lock{background:transparent;border-color:var(--cs-muted);color:var(--cs-muted);}
.inv-popup-act-lock:hover{background:var(--cs-muted);color:#111;}
.inv-popup-act-delete{background:transparent;border-color:var(--cs-red);color:var(--cs-red);}
.inv-popup-act-delete:hover{background:var(--cs-red);color:#fff;}
.inv-popup-act:disabled{opacity:.4;cursor:default;pointer-events:none;}
.inv-empty{text-align:center;padding:60px 20px;color:var(--cs-muted);font-size:15px;letter-spacing:.5px;}
.inv-empty .inv-empty-icon{font-size:48px;margin-bottom:12px;}
/* Модалки інвентарю — окремі від садка */
.inv-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;z-index:9999;backdrop-filter:blur(3px);}
.inv-modal{background:var(--cs-panel);border:1px solid var(--cs-border);border-radius:10px;padding:24px;min-width:280px;max-width:420px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,.7);animation:modalIn .18s ease;}
@keyframes modalIn{from{transform:scale(.92) translateY(10px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
.inv-modal h3{font-size:18px;font-weight:700;color:var(--cs-accent);margin:0 0 16px;letter-spacing:1px;text-transform:uppercase;}
.inv-modal input[type=text]{width:100%;background:var(--cs-bg);border:1px solid var(--cs-border);border-radius:var(--cs-radius);color:var(--cs-text);font-family:var(--cs-font);font-size:15px;padding:8px 12px;box-sizing:border-box;outline:none;margin-bottom:12px;}
.inv-modal input[type=text]:focus{border-color:var(--cs-accent);}
.inv-modal-btns{display:flex;gap:8px;justify-content:flex-end;margin-top:8px;}
.inv-color-row{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;}
.inv-color-swatch{width:24px;height:24px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:transform .12s,border-color .12s;}
.inv-color-swatch:hover{transform:scale(1.2);}
.inv-color-swatch.selected{border-color:#fff;transform:scale(1.2);}
.inv-detail-card{background:var(--cs-card-bg);border:1px solid var(--cs-card-bdr);border-radius:10px;padding:20px;max-width:300px;margin:16px auto;text-align:center;position:relative;overflow:hidden;}
.inv-detail-card .rarity-stripe-big{position:absolute;top:0;left:0;right:0;height:4px;}
.inv-detail-card img{width:180px;height:130px;object-fit:contain;margin:12px 0;filter:drop-shadow(0 4px 16px rgba(0,0,0,.8));}
.inv-detail-name{font-size:17px;font-weight:700;color:#e8e8f8;margin-bottom:10px;}
.inv-detail-badge{display:inline-block;font-size:11px;font-weight:700;padding:3px 10px;border-radius:4px;margin:3px;text-transform:uppercase;letter-spacing:.4px;}
.inv-detail-row{font-size:13px;color:var(--cs-muted);margin:6px 0;}
.inv-detail-row span{color:var(--cs-text);font-weight:600;}
.inv-detail-id{font-family:var(--cs-mono);font-size:10px;color:#50506a;margin-top:8px;}
.inv-folder-list{display:flex;flex-direction:column;gap:6px;max-height:200px;overflow-y:auto;}
.inv-folder-list-item{display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:var(--cs-radius);background:var(--cs-bg);border:1px solid var(--cs-border);cursor:pointer;transition:border-color .12s;}
.inv-folder-list-item:hover{border-color:var(--cs-accent);}
.inv-folder-list-item.current{border-color:var(--cs-accent2);}
`;
  document.head.appendChild(s);
}

/* ══════════════════════════════════════════════════════════
   showInventory
══════════════════════════════════════════════════════════ */
function showInventory(searchVal, folderFilter) {
  injectInvCSS();

  const searchInputActive = document.activeElement &&
    document.activeElement.id === "inv-search-input";

  if (searchVal !== undefined) { _invSearch = searchVal; _invSearchWasActive = true; }
  if (folderFilter !== undefined) _invFolder = folderFilter;

  saveInvScroll();

 // ── Гарантуємо id у кожного предмета — з ЗБЕРЕЖЕННЯМ ──
let _idsFixed = false;
inventory.forEach((item, i) => {
  if (!item.id) {
    item.id = (item.type || "item") + "_legacy_" + i;
    _idsFixed = true;
  }
});
if (_idsFixed) saveData(); // зберігаємо щоб id більше не змінювався


  const app = document.getElementById("app");

  // ── Фільтруємо зберігаючи РЕАЛЬНИЙ індекс ──
  let items = inventory.map((item, realIdx) => ({ item, realIdx }));

  if (_invSearch.trim()) {
    const q = _invSearch.toLowerCase();
    items = items.filter(({ item }) => {
      const name = (item.type === "case" ? getCaseName(item.caseType) : item.name) || "";
      return name.toLowerCase().includes(q) || (item.rarity || "").toLowerCase().includes(q);
    });
  }

  if (_invFolder !== null) {
    const folder = invFolders.find(f => f.id === _invFolder);
    if (folder) items = items.filter(({ item }) => folder.itemIds.includes(item.id));
  }

  let html = `<div id="inv-root">`;

  html += `
    <div class="inv-topbar">
      <div class="inv-title">🎒 Інвентар</div>
      <div class="inv-count">${inventory.length} предметів</div>
      <div class="inv-search-wrap">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input type="text" id="inv-search-input"
          placeholder="Пошук предметів..."
          value="${_invSearch.replace(/"/g,'&quot;')}"
          oninput="showInventory(this.value)" autocomplete="off">
      </div>
    </div>
    <div class="inv-filterbar">
      <button class="inv-btn primary" onclick="openCreateFolderModal()">+ Нова папка</button>
      ${_invFolder !== null ? `<button class="inv-btn" onclick="_invFolder=null;showInventory()">✕ Всі предмети</button>` : ""}
      <button class="inv-btn back" onclick="mainMenu()">← Назад</button>
    </div>
  `;

  if (invFolders.length) {
    html += `<div class="inv-folders-row">`;
    invFolders.forEach(f => {
      const active = _invFolder === f.id ? " active" : "";
      html += `
        <div class="inv-folder-chip${active}" onclick="_invFolder='${f.id}';showInventory()">
          <div class="inv-folder-dot" style="background:${f.color}"></div>
          <span>${f.name}</span>
          <small style="color:var(--cs-muted);margin-left:2px;">(${f.itemIds.length})</small>
          <button class="inv-folder-x" onclick="event.stopPropagation();deleteFolder('${f.id}')">✕</button>
        </div>`;
    });
    html += `</div>`;
  }

  if (!items.length) {
    html += `<div class="inv-empty"><div class="inv-empty-icon">📦</div>${_invSearch ? "Нічого не знайдено" : "Інвентар порожній"}</div>`;
  } else {
    html += `<div class="inv-grid">`;
    items.forEach(({ item, realIdx }) => {
      const locked = blockedItems.has(item.id);
      const name = item.type === "case" ? "Кейс: " + getCaseName(item.caseType) : (item.name || "");
      const imgSrc = `img/${item.type === "case" ? "case_" + item.caseType + ".png" : item.img}`;
      const rarityColor = item.rarity ? getRarityColor(item.rarity) : "transparent";
      const folder = getFolderOf(item.id);

      html += `
        <div class="inv-card${locked ? " locked" : ""}">
          <div class="inv-card-rarity-stripe" style="background:${rarityColor}"></div>
          ${folder ? `<div class="inv-card-folder-dot" style="background:${folder.color}" title="${folder.name}"></div>` : ""}
          <img class="inv-card-img" src="${imgSrc}" alt="${name}">
          <div class="inv-card-name">${name}</div>
          ${item.rarity ? `<div class="inv-card-rarity" style="background:${rarityColor}22;color:${rarityColor};border:1px solid ${rarityColor}55">${item.rarity}</div>` : ""}
          ${item.quality ? `<div class="inv-card-quality" style="background:${getQualityColor(item.quality)}22;color:${getQualityColor(item.quality)}">${item.quality}</div>` : ""}
          ${item.premium ? `<div class="inv-card-premium">⭐ Преміум</div>` : ""}
          ${locked ? `<div class="inv-card-locked-badge">🔒 Заблоковано</div>` : ""}
          <button class="inv-card-menu-btn" onclick="event.stopPropagation();openItemPopup(${realIdx},this)">⋯</button>
        </div>`;
    });
    html += `</div>`;
  }

  html += `</div>`;
  app.innerHTML = html;
  restoreInvScroll();

  if (_invSearchWasActive || searchInputActive) {
    const input = document.getElementById("inv-search-input");
    if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
  }
}


function openItemPopup(realIdx, btn) {
  closeItemPopup();
  const item = inventory[realIdx];
  if (!item) return;
  const locked = blockedItems.has(item.id);
  const name = item.type === "case" ? "Кейс: " + getCaseName(item.caseType) : (item.name || "");

  const ov = document.createElement("div");
  ov.className = "inv-item-popup-overlay"; ov.id = "inv-item-popup-overlay";
  ov.addEventListener("click", closeItemPopup);
  document.body.appendChild(ov);

  const pop = document.createElement("div");
  pop.className = "inv-item-popup"; pop.id = "inv-item-popup";
  pop.addEventListener("click", e => e.stopPropagation());
  pop.innerHTML = `
    <div class="inv-item-popup-header">
      <div class="inv-item-popup-name" title="${name}">${name}</div>
      <button class="inv-item-popup-close" onclick="closeItemPopup()">✕</button>
    </div>
    <div class="inv-item-popup-btns">
      ${item.type === "case"
        ? `<button class="inv-popup-act inv-popup-act-open" ${locked ? "disabled" : ""} onclick="closeItemPopup();openCase(${realIdx})">▶ Відкрити кейс</button>`
        : `<button class="inv-popup-act inv-popup-act-view" onclick="closeItemPopup();viewItemCS(${realIdx})">🔍 Деталі</button>`
      }
      <button class="inv-popup-act inv-popup-act-folder" onclick="closeItemPopup();openAssignFolderModal(${realIdx})">📁 Папка</button>
      <button class="inv-popup-act inv-popup-act-lock" onclick="closeItemPopup();toggleBlock(${realIdx});showInventory()">
        ${locked ? "🔓 Розблокувати" : "🔒 Заблокувати"}
      </button>
      <button class="inv-popup-act inv-popup-act-delete" ${locked ? "disabled" : ""} onclick="closeItemPopup();deleteItem(${realIdx});showInventory()">🗑 Видалити</button>
    </div>`;
  document.body.appendChild(pop);

  // Розміри попапу
  const POP_W = 220;
  const POP_H = 200;
  const GAP   = 8;
  const EDGE  = 8; // мінімальний відступ від краю екрану

  // Картка предмета (батько кнопки ⋯)
  const card = btn.closest(".inv-card") || btn.parentElement;
  const cardR = card.getBoundingClientRect();
  const btnR  = btn.getBoundingClientRect();

  // Центр картки (для лінії) і центр кнопки (для прив'язки попапу)
  const cardCX = cardR.left + cardR.width / 2;
  const cardCY = cardR.top  + cardR.height / 2;
  const btnCX  = btnR.left  + btnR.width  / 2;
  const btnCY  = btnR.top   + btnR.height / 2;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Визначаємо найкращий бік для попапу відносно КАРТКИ
  let left, top, side;

  const spaceRight  = vw - cardR.right;
  const spaceLeft   = cardR.left;
  const spaceBottom = vh - cardR.bottom;
  const spaceTop    = cardR.top;

  if (spaceRight >= POP_W + GAP) {
    side = "right";
    left = cardR.right + GAP;
    top  = cardCY - POP_H / 2;
  } else if (spaceLeft >= POP_W + GAP) {
    side = "left";
    left = cardR.left - GAP - POP_W;
    top  = cardCY - POP_H / 2;
  } else if (spaceBottom >= POP_H + GAP) {
    side = "bottom";
    left = cardCX - POP_W / 2;
    top  = cardR.bottom + GAP;
  } else {
    side = "top";
    left = cardCX - POP_W / 2;
    top  = cardR.top - GAP - POP_H;
  }

  // Жорстке затискання в межах екрану
  left = Math.max(EDGE, Math.min(left, vw - POP_W - EDGE));
  top  = Math.max(EDGE, Math.min(top,  vh - POP_H - EDGE));

  pop.style.cssText += `
    left:${left}px !important;
    top:${top}px !important;
    width:${POP_W}px;
    max-width:${POP_W}px;
    position:fixed;
  `;

  // --- SVG лінія: від центру КАРТКИ до краю попапу ---
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.id = "inv-popup-connector";
  svg.style.cssText = `
    position:fixed; pointer-events:none; z-index:8887;
    left:0; top:0; width:100vw; height:100vh; overflow:visible;
  `;

  // Точка старту — центр картки предмета
  const x1 = cardCX;
  const y1 = cardCY;

  // Точка кінця — найближча точка на попапі
  let x2, y2;
  const popMidY = top + POP_H / 2;
  const popMidX = left + POP_W / 2;

  if (side === "right") {
    x2 = left;
    y2 = Math.max(top + 16, Math.min(top + POP_H - 16, y1));
  } else if (side === "left") {
    x2 = left + POP_W;
    y2 = Math.max(top + 16, Math.min(top + POP_H - 16, y1));
  } else if (side === "bottom") {
    x2 = Math.max(left + 16, Math.min(left + POP_W - 16, x1));
    y2 = top;
  } else {
    x2 = Math.max(left + 16, Math.min(left + POP_W - 16, x1));
    y2 = top + POP_H;
  }

  // Крива Безьє
  const cx1 = x1 + (x2 - x1) * 0.5;
  const cy1 = y1;
  const cx2 = x1 + (x2 - x1) * 0.5;
  const cy2 = y2;

  svg.innerHTML = `
    <defs>
      <marker id="conn-dot" markerWidth="8" markerHeight="8" refX="4" refY="4" markerUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="4" fill="#e4b84d" opacity="0.95"/>
      </marker>
      <marker id="conn-tip" markerWidth="10" markerHeight="10" refX="8" refY="4" markerUnits="userSpaceOnUse">
        <path d="M0,0 L8,4 L0,8 Z" fill="#e4b84d" opacity="0.95"/>
      </marker>
    </defs>
    <!-- Тінь лінії -->
    <path
      d="M${x1},${y1} C${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}"
      fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="4"
      stroke-linecap="round"
    />
    <!-- Основна лінія -->
    <path
      d="M${x1},${y1} C${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}"
      fill="none"
      stroke="#e4b84d"
      stroke-width="2.5"
      stroke-dasharray="6,4"
      stroke-linecap="round"
      opacity="0.9"
      marker-start="url(#conn-dot)"
      marker-end="url(#conn-tip)"
    />
  `;
  document.body.appendChild(svg);
}

function closeItemPopup() {
  document.getElementById("inv-item-popup-overlay")?.remove();
  document.getElementById("inv-item-popup")?.remove();
  document.getElementById("inv-popup-connector")?.remove();
}


/* ══════════════════════════════════════════════════════════
   МОДАЛКИ ІНВЕНТАРЮ — invOpenModal / invCloseModal
   НЕ конфліктують з openModal/closeModal садка!
══════════════════════════════════════════════════════════ */
function invOpenModal(html) {
  document.getElementById("inv-modal-overlay")?.remove();
  const ov = document.createElement("div");
  ov.className = "inv-modal-overlay"; ov.id = "inv-modal-overlay";
  ov.innerHTML = `<div class="inv-modal">${html}</div>`;
  ov.addEventListener("click", e => { if (e.target === ov) invCloseModal(); });
  document.body.appendChild(ov);
}
function invCloseModal() {
  document.getElementById("inv-modal-overlay")?.remove();
}

function openCreateFolderModal() {
  const sw = FOLDER_COLORS.map((c, i) =>
    `<div class="inv-color-swatch${i===0?" selected":""}" style="background:${c}" data-color="${c}" onclick="selectFolderColor(this,'${c}')"></div>`
  ).join("");
  invOpenModal(`
    <h3>📁 Нова папка</h3>
    <input type="text" id="folder-name-input" placeholder="Назва папки..." maxlength="24">
    <div class="inv-color-row">${sw}</div>
    <div class="inv-modal-btns">
      <button class="inv-btn back" onclick="invCloseModal()">Скасувати</button>
      <button class="inv-btn primary" onclick="createFolder()">Створити</button>
    </div>`);
}

function selectFolderColor(el) {
  document.querySelectorAll(".inv-color-swatch").forEach(s => s.classList.remove("selected"));
  el.classList.add("selected");
}

function createFolder() {
  const input = document.getElementById("folder-name-input");
  const name = (input?.value || "").trim();
  if (!name) { if (input) input.style.borderColor = "var(--cs-red)"; return; }
  const sel = document.querySelector(".inv-color-swatch.selected");
  const color = sel ? (sel.dataset.color || FOLDER_COLORS[0]) : FOLDER_COLORS[0];
  invFolders.push({ id: genFolderId(), name, color, itemIds: [] });
  saveFolders(); invCloseModal(); showInventory();
}

function deleteFolder(id) {
  invFolders = invFolders.filter(f => f.id !== id);
  saveFolders();
  if (_invFolder === id) _invFolder = null;
  showInventory();
}

function openAssignFolderModal(realIdx) {
  const item = inventory[realIdx];
  if (!item) return;
  const cur = getFolderOf(item.id);
  let list = `<div class="inv-folder-list">
    <div class="inv-folder-list-item${!cur?" current":""}" onclick="assignFolder(${realIdx},null)">
      <div class="inv-folder-dot" style="background:var(--cs-muted)"></div>
      <span>Без папки</span>
      ${!cur?`<span style="margin-left:auto;color:var(--cs-accent2);font-size:11px;">● поточна</span>`:""}
    </div>`;
  invFolders.forEach(f => {
    const isCur = cur && cur.id === f.id;
    list += `<div class="inv-folder-list-item${isCur?" current":""}" onclick="assignFolder(${realIdx},'${f.id}')">
      <div class="inv-folder-dot" style="background:${f.color}"></div>
      <span>${f.name}</span>
      ${isCur?`<span style="margin-left:auto;color:var(--cs-accent2);font-size:11px;">● поточна</span>`:""}
    </div>`;
  });
  list += `</div>`;
  if (!invFolders.length) list = `<div style="color:var(--cs-muted);font-size:13px;text-align:center;padding:12px;">Папок ще немає.</div>`;
  invOpenModal(`<h3>📁 Папка</h3>${list}<div class="inv-modal-btns" style="margin-top:12px;"><button class="inv-btn back" onclick="invCloseModal()">Закрити</button></div>`);
}

function assignFolder(realIdx, folderId) {
  const item = inventory[realIdx];
  if (!item) return;
  invFolders.forEach(f => { f.itemIds = f.itemIds.filter(id => id !== item.id); });
  if (folderId) {
    const f = invFolders.find(f => f.id === folderId);
    if (f) f.itemIds.push(item.id);
  }
  saveFolders(); invCloseModal(); showInventory();
}

/* ══════════════════════════════════════════════════════════
   ДЕТАЛІ ПРЕДМЕТА
══════════════════════════════════════════════════════════ */
function viewItemCS(realIdx) {
  injectInvCSS();
  _invSearchWasActive = false;
  const i = inventory[realIdx];
  if (!i) return;
  const date = i.createdAt ? new Date(i.createdAt).toLocaleString("uk-UA",{hour12:false}) : "Невідомо";
  const name = i.name || getCaseName(i.caseType) || "Предмет";
  const imgSrc = `img/${i.img || "case_" + i.caseType + ".png"}`;
  const rc = i.rarity ? getRarityColor(i.rarity) : "var(--cs-border)";
  const folder = getFolderOf(i.id);

  document.getElementById("app").innerHTML = `
    <div id="inv-root">
      <div class="inv-topbar">
        <div class="inv-title">📜 Деталі предмета</div>
        <button class="inv-btn back" onclick="_invSearchWasActive=false;showInventory()">← Назад</button>
      </div>
      <div class="inv-detail-card">
        <div class="rarity-stripe-big" style="background:${rc}"></div>
        <div class="inv-detail-name">${name}</div>
        <img src="${imgSrc}" alt="${name}">
        <div>
          ${i.rarity?`<span class="inv-detail-badge" style="background:${rc}22;color:${rc};border:1px solid ${rc}55">${i.rarity}</span>`:""}
          ${i.quality?`<span class="inv-detail-badge" style="background:${getQualityColor(i.quality)}22;color:${getQualityColor(i.quality)};border:1px solid ${getQualityColor(i.quality)}55">${i.quality}</span>`:""}
          ${i.premium?`<span class="inv-detail-badge" style="background:#f5d30022;color:#f5d300;border:1px solid #f5d30055">⭐ Преміум</span>`:""}
        </div>
        <div class="inv-detail-row">🎁 З чого отриманно: <span>${i.fromCase?getCaseName(i.fromCase):"Невідомо"}</span></div>
        <div class="inv-detail-row">🕒 Дата: <span>${date}</span></div>
        ${folder?`<div class="inv-detail-row">📁 Папка: <span style="color:${folder.color}">${folder.name}</span></div>`:""}
        <div class="inv-detail-id">ID: ${i.id}</div>
      </div>
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:8px;">
        <button class="inv-btn primary" onclick="openAssignFolderModal(${realIdx})">📁 Папка</button>
        <button class="inv-btn" onclick="toggleBlock(${realIdx});_invSearchWasActive=false;showInventory()">
          ${blockedItems.has(i.id)?"🔓 Розблокувати":"🔒 Заблокувати"}
        </button>
        <button class="inv-btn danger" ${blockedItems.has(i.id)?"disabled":""} onclick="deleteItem(${realIdx});_invSearchWasActive=false;showInventory()">🗑 Видалити</button>
      </div>
    </div>`;
}
function viewItem(idx) { viewItemCS(idx); }

/* ══════════════════════════════════════════════════════════
   БЛОК / ВИДАЛЕННЯ
══════════════════════════════════════════════════════════ */
function toggleBlock(realIdx) {
  const i = inventory[realIdx]; if (!i) return;
  blockedItems.has(i.id) ? blockedItems.delete(i.id) : blockedItems.add(i.id);
  saveData();
}
function deleteItem(realIdx) {
  const i = inventory[realIdx]; if (!i) return;
  if (blockedItems.has(i.id)) { alert("Предмет заблокований!"); return; }
  inventory.splice(realIdx, 1); saveData();
}

/* ================== ADD ITEM FROM CASE ================== */

function addItemFromCase(item, caseType){
  const newItem = {
    ...item,
    id: crypto.randomUUID(),        // унікальний ID
    createdAt: Date.now(),          // час отримання
    fromCase: caseType              // з якого кейсу
  };
  inventory.push(newItem);
  saveData();
  return newItem; // повертаємо новий об'єкт на всяк випадок
}

function getCaseName(type){
   if(type === "market") return "🛒 Куплено з ринку";   
  if(type === "autumn") return "Осінь25";
  if(type === "absolute") return "Міжсезонний Кейс";
  if(type === "box") return "Бокс Осінь25";
  if(type === "gift") return "Подарунковий кейс";
  if(type === "fallalt") return "FallAlternative25";
  if(type === "autumnus") return "Autumnus25";
  if(type === "harvest") return "Harvest25"; 
  if(type === "arcase") return "ArcadeCase";
  if(type === "special") return "Спеціальний";
  if(type === "halloween") return "Halloween25";
  if(type === "halloween_elite") return "Halloween25 Elite";
  if(type === "box_halloween") return "BoxHalloween25"; 
  if(type === "wint25") return "Зима25"; 
  if(type === "wint25box") return "Бокс Зима25"; 
  if(type === "NN") return "Кейс з насінням 1"; 
if(type === "WDGASTER") return "Winter Dreams"; 
if(type === "NN2") return "Кейс з насінням 2"; 
if(type === "NN3") return "Кейс з насінням 3"; 
if(type === "WDGASTERbox") return "Winter Dreams box"; 
if(type === "wint25gift") return "Різдвяний Подарунок"; 
if(type === "catcollection") return "CatCollection"; 
if(type === "dogcollection") return "DogCollection"; 
if(type === "flow") return "FlowerPower26"; 
if(type === "vesna26") return "Весна26"; 
if(type === "vesna26box") return "Весна26 Бокс"; 
if(type === "vesna26gift") return "Весняний Подарунок";
if(type === "kolek3") return "Весняний Колекційний Кейс 2026";
if(type === "kolek1") return "Осінній Колекційний Кейс 2025"; 
if(type === "kolek2") return "Зимовий Колекційний Кейс 2025"; 
if(type === "avatar1") return "Аватарний Весняний Кейс 2026"; 
if(type === "medal2") return "Медальний Кейс «Півріччя Нікус Кейс Ультра»"; 
if(type === "medal1") return "Медальний Кейс «День Нікус Кейс Ультра 2026»"; 

return "Невідомий кейс";
}

// ===================== ANIMATION CONFIG =====================
const ANIM = {
  itemsCount: 41,
  itemWidth: 150,
  itemGap: 15,
  duration: 6300,
  containerWidth: 700
};

// ===================== UI PREVIEW POOL (FIX) =====================
const _previewPoolCache = new WeakMap();

function buildPreviewPool(dropFunc, tries = 3000){
  if(_previewPoolCache.has(dropFunc)){
    return _previewPoolCache.get(dropFunc);
  }

  const map = {};
  for(let i = 0; i < tries; i++){
    const d = dropFunc();
    map[d.name] = d; // унікальність
  }

  const pool = Object.values(map);
  _previewPoolCache.set(dropFunc, pool);
  return pool;
}

// ===================== OPEN CASE =====================

function openCase(idx){
  if(!inventory[idx]) return;
  const item = inventory[idx];
  if(item.type !== "case") return;

  let dropFunc = null;
  switch(item.caseType){
    case "autumn": dropFunc = dropAutumnCase; break;
    case "absolute": dropFunc = dropAbsoluteCase; break;
    case "box": dropFunc = dropBoxCase; break;
    case "gift": dropFunc = dropGiftCase; break;
    case "fallalt": dropFunc = dropFallAlternative25Case; break;
    case "autumnus": dropFunc = dropAutumnus25Case; break;
    case "harvest": dropFunc = dropHarvest25Case; break;
    case "arcase": dropFunc = dropArcadeCase; break;
   case "special": dropFunc = dropSpecialCase; break; 
    case "halloween": dropFunc = dropHalloween25Case; break;
    case "halloween_elite": dropFunc = dropHalloween25EliteCase; break;
    case "box_halloween": dropFunc = dropBoxHalloween25Case; break;
    case "wint25": dropFunc = dropwint25Case; break;
    case "WDGASTERbox": dropFunc = dropWDGASTERboxCase; break;
    case "WDGASTER": dropFunc = dropWDGASTERCase; break;
    case "wint25box": dropFunc = dropwint25boxCase; break;
    case "wint25gift": dropFunc = dropWint25GiftCase; break;
    case "kolek1": dropFunc = dropkolek1case; break;
    case "NN": dropFunc = dropNNcase; break;
    case "NN2": dropFunc = dropNN2case; break;
    case "NN3": dropFunc = dropNN3case; break; 
    case "catcollection": dropFunc = dropcatcollectionCase; break;
    case "dogcollection": dropFunc = dropdogcollectionCase; break; 
    case "flow": dropFunc = dropflowCase; break; 
    case "vesna26": dropFunc = dropvesna26Case; break; 
    case "vesna26gift": dropFunc = dropvesna26giftCase; break;   
    case "avatar1": dropFunc = dropavatar1case; break; 
    case "vesna26box": dropFunc = dropvesna26boxCase; break;   
    case "kolek3": dropFunc = dropkolek3case; break;
    case "kolek2": dropFunc = dropkolek2case; break; 
    case "medal1": dropFunc = dropmedal1case; break;
    case "medal2": dropFunc = dropmedal2case; break;

    default: alert("Невідомий тип кейсу"); return;
  }

 if(item.caseType === "arcase"){
    const keyIdx = inventory.findIndex(i => i.type === "key" && i.keyType === "arcase");
    if(keyIdx === -1){
      alert("Потрібен ключ!");
      return;
    }
  }

  const finalDrop = dropFunc();

  showCasePreview(dropFunc, item.caseType, () => {
    if(item.caseType === "arcase"){
      const keyIdx = inventory.findIndex(i => i.type === "key" && i.keyType === "arcase");
      if(keyIdx > idx){
        inventory.splice(keyIdx,1);
        inventory.splice(idx,1);
      } else {
        inventory.splice(idx,1);
        inventory.splice(keyIdx,1);
      }
    } else {
      inventory.splice(idx,1);
    }

    animateCaseOpening(finalDrop, dropFunc, item.caseType);
  });
}


// ===================== PREVIEW (FIXED) =====================
function showCasePreview(dropFunc, caseType, onOpen){
  const app = document.getElementById("app");

  // 🔒 Флаг: блокує повторне натискання кнопок
  let _actionDone = false;

  const items = buildPreviewPool(dropFunc);

  const rarityTabs = {
    "Спеціальні": [],
    "Секретні": [],
    "Епічні": [],
    "Виняткові": [],
    "Звичайні": []
  };

  items.forEach(item=>{
    if(item.rarity==="Спеціальна") rarityTabs["Спеціальні"].push(item);
    else if(item.rarity==="Секретна") rarityTabs["Секретні"].push(item);
    else if(item.rarity==="Епічна") rarityTabs["Епічні"].push(item);
    else if(item.rarity==="Виняткова") rarityTabs["Виняткові"].push(item);
    else rarityTabs["Звичайні"].push(item);
  });

  const tabsButtons = Object.keys(rarityTabs).map(r=>
    `<button class="rarity-tab" data-tab="${r}" style="margin:5px;padding:5px 12px;cursor:pointer;">${r}</button>`
  ).join("");

  app.innerHTML = `
    <h2>${getCaseName(caseType)} — можливі предмети</h2>

    <div id="roulette" style="overflow:hidden;width:${ANIM.containerWidth}px;margin:20px auto;position:relative;background:#111;padding:12px;border:4px solid gold;border-radius:8px;">
      <div id="roulette-strip" style="display:flex;align-items:center;"></div>
      <div id="roulette-arrow" style="position:absolute;top:0;bottom:0;left:50%;width:4px;background:red;transform:translateX(-50%);"></div>
    </div>

    <div id="rarity-buttons" style="text-align:center;">${tabsButtons}</div>

    <div id="rarity-panels" style="margin-top:15px;">
      ${Object.keys(rarityTabs).map(r=>{
        const panelItems = rarityTabs[r].map(p=>{
          const c = getRarityColor(p.rarity);
          return `
            <div style="width:100px;background:#111;border:2px solid ${c};border-radius:6px;padding:6px;text-align:center;margin:5px;display:inline-block;">
              <img src="img/${p.img}" width="80">
              <div style="font-size:12px;color:${c};font-weight:bold;">${p.name}</div>
            </div>
          `;
        }).join("");
        return `<div class="rarity-panel" data-panel="${r}" style="display:none;background:#222;padding:10px;border-radius:6px;">${panelItems}</div>`;
      }).join("")}
    </div>

    <div style="text-align:center;margin-top:20px;">
      <button id="open-case-btn" style="font-size:18px;padding:10px 30px;background:gold;color:#111;border-radius:6px;cursor:pointer;font-weight:bold;">🎰 ВІДКРИТИ</button>
      <button id="cancel-case-btn" style="font-size:18px;padding:10px 30px;background:#888;color:#fff;border-radius:6px;cursor:pointer;font-weight:bold;margin-left:10px;">❌ ВІДМІНИТИ</button>
    </div>
  `;

  const panels = document.querySelectorAll(".rarity-panel");
  if(panels.length) panels[0].style.display="block";

  document.querySelectorAll(".rarity-tab").forEach(btn=>{
    btn.onclick = ()=>{
      panels.forEach(p=>p.style.display="none");
      document.querySelector(`.rarity-panel[data-panel="${btn.dataset.tab}"]`).style.display="block";
    };
  });

  // ✅ ВИПРАВЛЕНА кнопка ВІДКРИТИ
  document.getElementById("open-case-btn").onclick = () => {
    if (_actionDone) return;
    _actionDone = true;
    const openBtn = document.getElementById("open-case-btn");
    const cancelBtn = document.getElementById("cancel-case-btn");
    if (openBtn) openBtn.disabled = true;
    if (cancelBtn) cancelBtn.disabled = true;
    onOpen(); // <- виконується відкриття (видалення з інвентарю + анімація)
  };

  // ✅ ВИПРАВЛЕНА кнопка ВІДМІНИТИ
  document.getElementById("cancel-case-btn").onclick = () => {
    if (_actionDone) return;
    _actionDone = true;
    const openBtn = document.getElementById("open-case-btn");
    const cancelBtn = document.getElementById("cancel-case-btn");
    if (openBtn) openBtn.disabled = true;
    if (cancelBtn) cancelBtn.disabled = true;
    // Кейс НЕ видаляється, просто повертаємось до інвентарю
    showInventory();
  };

  // ---------- РУЛЕТКА ПРЕВ'Ю ----------
  const strip = document.getElementById("roulette-strip");
  for(let i=0;i<ANIM.itemsCount;i++){
    const p = items[Math.floor(Math.random()*items.length)];
    const el = document.createElement("div");
    el.style.width = ANIM.itemWidth+"px";
    el.style.flex = `0 0 ${ANIM.itemWidth}px`;
    el.style.margin = `0 ${ANIM.itemGap/2}px`;
    const color = getRarityColor(p.rarity);
    el.style.boxShadow = `0 0 12px ${color}`;
    el.innerHTML = `
      <img src="img/${p.img}" width="${ANIM.itemWidth-20}" style="display:block;margin:0 auto;">
      <div style="color:${color};font-weight:bold;text-align:center;">${p.name}</div>
    `;
    strip.appendChild(el);
  }
}

// ===================== OPENING ANIMATION (UNCHANGED) =====================
function animateCaseOpening(finalDrop, dropFunc, caseType){
  const cfg = ANIM;
  const app = document.getElementById("app");

  app.innerHTML = `
    <h2>Відкриття ${getCaseName(caseType)}...</h2>
    <div id="roulette" style="overflow:hidden;width:${cfg.containerWidth}px;margin:20px auto;position:relative;background:#111;padding:12px;border:4px solid gold;border-radius:8px;">
      <div id="roulette-strip" style="display:flex;align-items:center;"></div>
      <div id="roulette-arrow" style="position:absolute;top:0;bottom:0;width:4px;background:red;"></div>
    </div>
  `;

  const strip = document.getElementById("roulette-strip");
  const centerIndex = Math.floor(cfg.itemsCount / 2);
  const pool = [];

  for(let i=0;i<cfg.itemsCount;i++) pool.push(dropFunc());
  pool[centerIndex] = finalDrop;

  pool.forEach(p=>{
    const el = document.createElement("div");
    el.style.width = cfg.itemWidth+"px";
    el.style.flex = `0 0 ${cfg.itemWidth}px`;
    el.style.margin = `0 ${cfg.itemGap/2}px`;
    const color = getRarityColor(p.rarity);
    el.style.boxShadow = `0 0 12px ${color}`;
    

el.innerHTML = `
  <img src="img/${p.img}" width="${cfg.itemWidth-20}" style="display:block;margin:0 auto;">
  <div style="color:${color};font-weight:bold;text-align:center;">${p.name}</div>
`;

    strip.appendChild(el);
  });

const arrow = document.getElementById("roulette-arrow");
arrow.style.left = `calc(50% + ${Math.floor(Math.random()*11-5)}px)`;

const step = cfg.itemWidth + cfg.itemGap;
const targetX = -(centerIndex*step - (cfg.containerWidth/2 - cfg.itemWidth/2));

requestAnimationFrame(()=>{
  strip.style.transition = `transform ${cfg.duration}ms cubic-bezier(.15,.85,.25,1)`;
  strip.style.transform = `translateX(${targetX}px)`;
});

strip.addEventListener("transitionend", () => {
  const winEl = strip.children[centerIndex];
  winEl.style.transform = "scale(1.3)";
  winEl.style.boxShadow = "0 0 50px gold";

  // Додаємо предмет через глобальну функцію
  addItemFromCase(finalDrop, caseType);
fpAwardBPForCase(caseType);

// 🔥 +2 досвіду за відкриття кейсу
dosvid = (dosvid || 0) + 2;
localStorage.setItem(currentUser + "_dosvid", dosvid);

  setTimeout(() => {
    alert(`Ви отримали: ${finalDrop.name}`);
    showInventory();
  }, 600);
}, { once: true });
}

function createKeyForCase(caseType, name, img){
  return {
    name: name || "АркадКлюч",
    type: "key",
    keyType: caseType || "arcase",
    rarity: "Секретна",
    img: img || "Key1.png"
};
}

const arcadeKey = {
    name: "Arcade Case Key",
    type: "key",
    keyType: "arcase", // стара назва кейсу
    img: "key_arcase.png",
    rarity: "Секретна"
};

function dropArcadeCase(){
  const pool = [
    {name:"Скелет", img:"skeleton.png", rarity:"Секретна", chance:0.01},
    {name:"Мужик", img:"man.png", rarity:"Секретна", chance:0.01},
    {name:"Арбітражнік", img:"arbitrajnik.png", rarity:"Епічна", chance:0.105},
    {name:"Такблін", img:"takblin.png", rarity:"Епічна", chance:0.105},
    {name:"ЧомуКіт", img:"chomukit.png", rarity:"Виняткова", chance:0.15},
    {name:"Картофель", img:"kartofel.png", rarity:"Виняткова", chance:0.15},
    {name:"Щотинакоїв", img:"shotinakoiv.png", rarity:"Звичайна", chance:0.23},
    {name:"Услезах", img:"uslezah.png", rarity:"Звичайна", chance:0.23}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropSpecialCase(){
  const pool = [
    {name:"Еля", img:"ela.png", rarity:"Спеціальна", chance:0.34},
    {name:"Кукі", img:"kuki.png", rarity:"Спеціальна", chance:0.33},
    {name:"Панда", img:"panda.png", rarity:"Спеціальна", chance:0.33}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length - 1]);
}

function dropNNcase(){
  const pool = [
    {name:"Золоте-Дерево", img:"G4.png", rarity:"Секретна", chance:0.05},
    {name:"Соняшник", img:"G3.png", rarity:"Епічна", chance:0.20},
    {name:"Буде-ПопКорн", img:"G2.png", rarity:"Виняткова", chance:0.28},
    {name:"Гарбуз", img:"G1.png", rarity:"Звичайна", chance:0.47}
]; 

 let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropNN3case(){
  const pool = [
    {name:"Гусь", img:"j1.png", rarity:"Секретна", chance:0.05},
    {name:"Гарфілд", img:"j2.png", rarity:"Епічна", chance:0.20},
    {name:"Кітікет", img:"j3.png", rarity:"Виняткова", chance:0.28},
    {name:"Полуниця", img:"j4.png", rarity:"Звичайна", chance:0.47}
]; 

 let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropmedal1case(){
  const pool = [
    {name:"Діамантова медаль «День Нікус Кейс Ультра 2026»", img:"medaldiamont1.png", rarity:"Спеціальна", chance:0.10},
    {name:"Золота медаль «День Нікус Кейс Ультра 2026»", img:"medalgold1.png", rarity:"Секретна", chance:0.20},
    {name:"Срібна медаль «День Нікус Кейс Ультра 2026»", img:"medalsilver1.png", rarity:"Епічна", chance:0.35},
    {name:"Бронзова медаль «День Нікус Кейс Ультра 2026»", img:"medalbronze1.png", rarity:"Виняткова", chance:0.35}
  
]; 

 let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropmedal2case(){
  const pool = [
    {name:"PRO Медаль «Півріччя Нікус Кейс Ультра»", img:"medapro1.png", rarity:"Спеціальна", chance:0.35},
    {name:"Медаль «Півріччя Нікус Кейс Ультра»", img:"medaldefault.png", rarity:"Секретна", chance:0.65}
  
]; 

 let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropNN2case(){
  const pool = [
    {name:"Річік", img:"rihic2.png", rarity:"Секретна", chance:0.05},
    {name:"Кіт—криптовалютчик", img:"kitk.png", rarity:"Епічна", chance:0.20},
    {name:"Капібара", img:"kapabara1.png", rarity:"Виняткова", chance:0.28},
    {name:"Кіт у хлібі", img:"kitu.png", rarity:"Звичайна", chance:0.47}
]; 

 let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

// Halloween25
function dropHalloween25Case(){
  const pool = [
    {name:"Пепе", img:"pepe.png", rarity:"Секретна", chance:0.01},
    {name:"Крутий", img:"krutyi.png", rarity:"Секретна", chance:0.01},
    {name:"Санс", img:"sans.png", rarity:"Епічна", chance:0.07},
    {name:"РозумнаЛюдина", img:"rozumna.png", rarity:"Епічна", chance:0.07},
    {name:"ДикийОгірок", img:"cucumber.png", rarity:"Виняткова", chance:0.175},
    {name:"МастурБіст", img:"masturbist.png", rarity:"Виняткова", chance:0.175},
    {name:"Ждун", img:"zhdun.png", rarity:"Звичайна", chance:0.25},
    {name:"Троль", img:"troll.png", rarity:"Звичайна", chance:0.25}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropAbsoluteCase(){
  const pool = [
    {name:"Еля", img:"ela.png", rarity:"Спеціальна", chance:0.01},
    {name:"Дід Казіно", img:"didkazino.png", rarity:"Секретна", chance:0.02},
    {name:"67", img:"67.png", rarity:"Секретна", chance:0.02},
    {name:"ЧасПокаже", img:"rabbit.png", rarity:"Епічна", chance:0.095},
    {name:"АбсолютСінема", img:"cinema.png", rarity:"Епічна", chance:0.095},
    {name:"Проблематично", img:"ptax1.png", rarity:"Виняткова", chance:0.165},
    {name:"Малоймовірно", img:"ptax2.png", rarity:"Виняткова", chance:0.165},
    {name:"50 на 50", img:"ptax3.png", rarity:"Звичайна", chance:0.215},
    {name:"Навряд чи", img:"ptax4.png", rarity:"Звичайна", chance:0.215}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropWDGASTERCase(){
  const pool = [
    {name:"Стонкс", img:"51.png", rarity:"Секретна", chance:0.02},
    {name:"Містер Пропер", img:"52.png", rarity:"Секретна", chance:0.02},
    {name:"Надрозум", img:"53.png", rarity:"Епічна", chance:0.11},
    {name:"Попугай-а", img:"54.png", rarity:"Епічна", chance:0.11},
    {name:"Том", img:"55.png", rarity:"Виняткова", chance:0.15},
    {name:"Белуга", img:"56.png", rarity:"Виняткова", chance:0.15},
    {name:"нот-стонкс", img:"57.png", rarity:"Звичайна", chance:0.22},
    {name:"І що?", img:"58.png", rarity:"Звичайна", chance:0.22}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropcatcollectionCase(){
  const pool = [
    {name:"Кукі", img:"kuki.png", rarity:"Спеціальна", chance:0.01},
    {name:"Панда", img:"panda.png", rarity:"Спеціальна", chance:0.01},
    {name:"Уііа—Кіт", img:"oia.png", rarity:"Секретна", chance:0.02},
    {name:"Шльопа", img:"Floppa.png", rarity:"Секретна", chance:0.02},
    {name:"Перехожий", img:"X.png", rarity:"Епічна", chance:0.11},
    {name:"Максвел", img:"MAX.png", rarity:"Епічна", chance:0.11},
    {name:"ОКАК v2", img:"OKAK2.png", rarity:"Виняткова", chance:0.15},
    {name:"(CT)Cat", img:"ct.png", rarity:"Виняткова", chance:0.15},
    {name:"Ригачело", img:"ROGALO.png", rarity:"Звичайна", chance:0.21},
    {name:"ШІ—КІТ", img:"AIKIT.png", rarity:"Звичайна", chance:0.21}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropavatar1case(){
  const pool = [
    {name:"ДикаКишечка", img:"avatar1.png", rarity:"Спеціальна", chance:0.01},
    {name:"Кулдудка", img:"avatar2.png", rarity:"Спеціальна", chance:0.01},
    {name:"Ксенатор", img:"avatar3.png", rarity:"Секретна", chance:0.02},
    {name:"ДобрийДядя", img:"avatar4.png", rarity:"Секретна", chance:0.02},
    {name:"ЄнотГанстер", img:"avatar5.png", rarity:"Епічна", chance:0.11},
    {name:"Ліс", img:"avatar6.png", rarity:"Епічна", chance:0.11},
    {name:"АйТигр", img:"avatar7.png", rarity:"Виняткова", chance:0.15},
    {name:"ПінгвінДруже", img:"avatar8.png", rarity:"Виняткова", chance:0.15},
    {name:"Кимчик", img:"avatar9.png", rarity:"Звичайна", chance:0.21},
    {name:"ДідКазіно (Аватарка)", img:"avatar10.png", rarity:"Звичайна", chance:0.21}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropvesna26Case(){
  const pool = [
    {name:"Епштейн", img:"epstein.png", rarity:"Спеціальна", chance:0.01},
    {name:"Халяльний Кріпер", img:"halal.png", rarity:"Спеціальна", chance:0.01},
    {name:"Потужно", img:"potuhno.png", rarity:"Секретна", chance:0.02},
    {name:"Морські Котики", img:"sealcore.png", rarity:"Секретна", chance:0.02},
    {name:"Дуолінго", img:"duolingo.png", rarity:"Епічна", chance:0.11},
    {name:"ВІВІІ(67)", img:"VIVII.png", rarity:"Епічна", chance:0.11},
    {name:"ЯкВінСебеПочуває", img:"110.png", rarity:"Виняткова", chance:0.15},
    {name:"5X30", img:"5x30.png", rarity:"Виняткова", chance:0.15},
    {name:"Тіймейтище", img:"qwirt.png", rarity:"Звичайна", chance:0.21},
    {name:"ДругПетух", img:"drugpetuh.png", rarity:"Звичайна", chance:0.21}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropflowCase(){
  const pool = [
    {name:"NyanCat", img:"flow1.png", rarity:"Спеціальна", chance:0.01},
    {name:"Кишечка", img:"flow2.png", rarity:"Спеціальна", chance:0.01},
    {name:"Містер Секретний", img:"flow3.png", rarity:"Секретна", chance:0.02},
    {name:"ДжонПорк", img:"flow4.png", rarity:"Секретна", chance:0.02},
    {name:"СпінінгКет", img:"flow5.png", rarity:"Епічна", chance:0.11},
    {name:"ЕплДог", img:"flow6.png", rarity:"Епічна", chance:0.11},
    {name:"Параліпіпід", img:"flow7.png", rarity:"Виняткова", chance:0.15},
    {name:"Пінапласт", img:"flow8.png", rarity:"Виняткова", chance:0.15},
    {name:"Піпетка", img:"flow9.png", rarity:"Звичайна", chance:0.21},
    {name:"Піпідастр", img:"flow10.png", rarity:"Звичайна", chance:0.21}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropvesna26giftCase(){
  const pool = [
    {name:"Епштейн", img:"epstein.png", rarity:"Спеціальна", chance:0.01},
    {name:"Халяльний Кріпер", img:"halal.png", rarity:"Спеціальна", chance:0.01},
    {name:"Потужно", img:"potuhno.png", rarity:"Секретна", chance:0.03},
    {name:"Морські Котики", img:"sealcore.png", rarity:"Секретна", chance:0.03},
    {name:"Дуолінго", img:"duolingo.png", rarity:"Епічна", chance:0.175},
    {name:"ВІВІІ(67)", img:"VIVII.png", rarity:"Епічна", chance:0.175},
    {name:"ЯкВінСебеПочуває", img:"110.png", rarity:"Виняткова", chance:0.285},
    {name:"5X30", img:"5x30.png", rarity:"Виняткова", chance:0.285}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropvesna26boxCase(){
  const pool = [
    {name:"Потужно", img:"potuhno.png", rarity:"Секретна", chance:0.005},
    {name:"Морські Котики", img:"sealcore.png", rarity:"Секретна", chance:0.005},
    {name:"Дуолінго", img:"duolingo.png", rarity:"Епічна", chance:0.11},
    {name:"ВІВІІ(67)", img:"VIVII.png", rarity:"Епічна", chance:0.11},
    {name:"ЯкВінСебеПочуває", img:"110.png", rarity:"Виняткова", chance:0.155},
    {name:"5X30", img:"5x30.png", rarity:"Виняткова", chance:0.155},
    {name:"Тіймейтище", img:"qwirt.png", rarity:"Звичайна", chance:0.23},
    {name:"ДругПетух", img:"drugpetuh.png", rarity:"Звичайна", chance:0.23}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropkolek3case(){
  const pool = [
    {name:"Кулдудка", img:"kolek31.png", rarity:"Секретна", chance:0.02},
    {name:"Ксенатор", img:"kolek32.png", rarity:"Секретна", chance:0.02},
    {name:"ТвійКіт", img:"kolek33.png", rarity:"Епічна", chance:0.07},
    {name:"Масони", img:"kolek34.png", rarity:"Епічна", chance:0.07},
    {name:"НіхєраСобі…", img:"kolek35.png", rarity:"Виняткова", chance:0.175},
    {name:"РусняЗнайдена", img:"kolek36.png", rarity:"Виняткова", chance:0.175},
    {name:"ТвійНайкращийДруг", img:"kolek37.png", rarity:"Звичайна", chance:0.22},
    {name:"ОстаннійДеньЛіта…", img:"kolek38.png", rarity:"Звичайна", chance:0.25}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropdogcollectionCase(){
  const pool = [
    {name:"Річік—Казіно", img:"rihik.png", rarity:"Секретна", chance:0.02},
    {name:"Пес Патрон", img:"patron.png", rarity:"Секретна", chance:0.02},
    {name:"Бен", img:"ben.png", rarity:"Епічна", chance:0.11},
    {name:"Доге Качок", img:"kahok.png", rarity:"Епічна", chance:0.11},
    {name:"Собака?", img:"iu.png", rarity:"Виняткова", chance:0.15},
    {name:"Собалдо", img:"sobaldo.png", rarity:"Виняткова", chance:0.15},
    {name:"Мопс", img:"mops.png", rarity:"Звичайна", chance:0.22},
    {name:"Броне—Собака", img:"kepka.png", rarity:"Звичайна", chance:0.22}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropWDGASTERboxCase(){
  const pool = [

    {name:"Надрозум", img:"53.png", rarity:"Епічна", chance:0.05},
    {name:"Попугай-а", img:"54.png", rarity:"Епічна", chance:0.05},
    {name:"Том", img:"55.png", rarity:"Виняткова", chance:0.15},
    {name:"Белуга", img:"56.png", rarity:"Виняткова", chance:0.15},
    {name:"нот-стонкс", img:"57.png", rarity:"Звичайна", chance:0.30},
    {name:"І що?", img:"58.png", rarity:"Звичайна", chance:0.30}

  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropWint25GiftCase() {
  const pool = [
    // Секретні (разом 5%)
    {name:"Втікай", img:"V.png", rarity:"Секретна", chance:0.0167},
    {name:"Хомʼяк", img:"H.png", rarity:"Секретна", chance:0.0167},
    {name:"Котик", img:"K.png", rarity:"Секретна", chance:0.0166},

    // Епічні (разом 35%)
    {name:"КимЧенДрин", img:"KD.png", rarity:"Епічна", chance:0.1167},
    {name:"Окак", img:"OKAK.png", rarity:"Епічна", chance:0.1167},
    {name:"Кіт-Борщ", img:"B.png", rarity:"Епічна", chance:0.1166},

    // Виняткові (разом 60%)
    {name:"Людина", img:"L.png", rarity:"Виняткова", chance:0.2},
    {name:"ОБЛЯТЬ", img:"OBL.png", rarity:"Виняткова", chance:0.2},
    {name:"Привіт,Друже", img:"PR.png", rarity:"Виняткова", chance:0.2}
  ];

  let r = Math.random(), sum = 0;
  for (const p of pool) {
    sum += p.chance;
    if (r < sum) return createItem(p);
  }
  return createItem(pool[pool.length - 1]);
}

function dropwint25Case(){
  const pool = [

// ===== Секретна (3%) =====
  {name:"Втікай", img:"V.png", rarity:"Секретна", chance:0.01},
  {name:"Хомʼяк", img:"H.png", rarity:"Секретна", chance:0.01},
  {name:"Котик", img:"K.png", rarity:"Секретна", chance:0.01},

  // ===== Епічна (13.5%) =====
  {name:"КимЧенДрин", img:"KD.png", rarity:"Епічна", chance:0.045},
  {name:"Окак", img:"OKAK.png", rarity:"Епічна", chance:0.045},
  {name:"Кіт-Борщ", img:"B.png", rarity:"Епічна", chance:0.045},

  // ===== Виняткова (33.5%) =====
  {name:"Людина", img:"L.png", rarity:"Виняткова", chance:0.111667},
  {name:"ОБЛЯТЬ", img:"OBL.png", rarity:"Виняткова", chance:0.111667},
  {name:"Привіт,Друже", img:"PR.png", rarity:"Виняткова", chance:0.111667},

  // ===== Звичайна (50%) =====
  {name:"Попугайчик", img:"PP.png", rarity:"Звичайна", chance:0.166667},
  {name:"Сумно", img:"S.png", rarity:"Звичайна", chance:0.166667},
  {name:"1487", img:"1487.png", rarity:"Звичайна", chance:0.166667}

];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropwint25boxCase(){
  const pool = [

{name:"КимЧенДрин", img:"KD.png", rarity:"Епічна", chance:0.04},
{name:"Окак", img:"OKAK.png", rarity:"Епічна", chance:0.04},
{name:"Кіт-Борщ", img:"B.png", rarity:"Епічна", chance:0.04},

{name:"Людина", img:"L.png", rarity:"Виняткова", chance:0.13},
{name:"ОБЛЯТЬ", img:"OBL.png", rarity:"Виняткова", chance:0.13},
{name:"Привіт,Друже", img:"PR.png", rarity:"Виняткова", chance:0.13},

{name:"Попугайчик", img:"PP.png", rarity:"Звичайна", chance:0.16},
{name:"Сумно", img:"S.png", rarity:"Звичайна", chance:0.17},
{name:"1487", img:"1487.png", rarity:"Звичайна", chance:0.16}

];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropkolek1case(){
  const pool = [
    {name:"Лавочка", img:"lav.png", rarity:"Секретна", chance:0.02},
    {name:"Йогурт", img:"yog.png", rarity:"Секретна", chance:0.02},
    {name:"Живчик", img:"jiv.png", rarity:"Епічна", chance:0.07},
    {name:"Пістолетік", img:"pistol.png", rarity:"Епічна", chance:0.07},
    {name:"ГДЗ", img:"gdz.png", rarity:"Виняткова", chance:0.175},
    {name:"Чат Гпт", img:"gpt.png", rarity:"Виняткова", chance:0.175},
    {name:"Мʼяч", img:"mi.png", rarity:"Звичайна", chance:0.22},
    {name:"ніщета", img:"ni.png", rarity:"Звичайна", chance:0.25}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropkolek2case(){
  const pool = [
    {name:"Вищета", img:"21.png", rarity:"Секретна", chance:0.02},
    {name:"Пірнівський Двіж", img:"22.png", rarity:"Секретна", chance:0.02},
    {name:"ППО", img:"23.png", rarity:"Епічна", chance:0.07},
    {name:"Крейда", img:"24.png", rarity:"Епічна", chance:0.07},
    {name:"Зошит", img:"25.png", rarity:"Виняткова", chance:0.175},
    {name:"Мʼята", img:"26.png", rarity:"Виняткова", chance:0.175},
    {name:"Хліб", img:"27.png", rarity:"Звичайна", chance:0.22},
    {name:"Динозавр", img:"dino.png", rarity:"Звичайна", chance:0.25}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

// Halloween25 Elite
function dropHalloween25EliteCase(){
  const pool = [
    {name:"Пепе", img:"pepe.png", rarity:"Секретна", chance:0.015},
    {name:"Крутий", img:"krutyi.png", rarity:"Секретна", chance:0.015},
    {name:"Санс", img:"sans.png", rarity:"Епічна", chance:0.185},
    {name:"РозумнаЛюдина", img:"rozumna.png", rarity:"Епічна", chance:0.185},
    {name:"ДикийОгірок", img:"cucumber.png", rarity:"Виняткова", chance:0.3},
    {name:"МастурБіст", img:"masturbist.png", rarity:"Виняткова", chance:0.3}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

// BoxHalloween25
function dropBoxHalloween25Case(){
  const pool = [
    {name:"Санс", img:"sans.png", rarity:"Епічна", chance:0.05},
    {name:"РозумнаЛюдина", img:"rozumna.png", rarity:"Епічна", chance:0.05},
    {name:"ДикийОгірок", img:"cucumber.png", rarity:"Виняткова", chance:0.15},
    {name:"МастурБіст", img:"masturbist.png", rarity:"Виняткова", chance:0.15},
    {name:"Ждун", img:"zhdun.png", rarity:"Звичайна", chance:0.3},
    {name:"Троль", img:"troll.png", rarity:"Звичайна", chance:0.3}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropHarvest25Case(){
  const pool = [
    {name:"Бобер", img:"beaver.png", rarity:"Епічна", chance:0.15},
    {name:"Квадробер", img:"quadbeaver.png", rarity:"Виняткова", chance:0.35},
    {name:"Веном", img:"venom.png", rarity:"Звичайна", chance:0.49},
    {name:"Ліларіла", img:"lalirala.png", rarity:"Секретна", chance:0.01}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}
// FallAlternative25
function dropFallAlternative25Case(){
  const pool = [
    {name:"Супермен", img:"superman.png", rarity:"Секретна", chance:0.01},
    {name:"Нагетс", img:"nugget.png", rarity:"Епічна", chance:0.075},
    {name:"Доге", img:"doge.png", rarity:"Епічна", chance:0.075},
    {name:"Ракета-кіт", img:"rocketcat.png", rarity:"Виняткова", chance:0.17},
    {name:"Хорор-кіт", img:"horrorcat.png", rarity:"Виняткова", chance:0.17},
    {name:"Дракон", img:"dragon.png", rarity:"Звичайна", chance:0.25},
    {name:"Булінг-кіт", img:"bullycat.png", rarity:"Звичайна", chance:0.25}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropAutumnus25Case(){
  const pool = [
    {name:"Ліларіла", img:"lalirala.png", rarity:"Секретна", chance:0.04},
    {name:"Супермен", img:"superman.png", rarity:"Секретна", chance:0.04},
    {name:"Бомбордіро", img:"red1.png", rarity:"Секретна", chance:0.04},
    {name:"Тралалеро", img:"red2.png", rarity:"Секретна", chance:0.04},
    {name:"Тунг-Сахур", img:"red3.png", rarity:"Секретна", chance:0.04},
    {name:"Булінг-кіт", img:"bullycat.png", rarity:"Звичайна", chance:0.80}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropByRates(rates){
  const r = Math.random();
  let sum = 0;
  for(const key in rates){
    sum += rates[key];
    if(r < sum) return key;
  }
  return Object.keys(rates)[Object.keys(rates).length - 1];
}

function chooseQuality(){
  let r = Math.random();
  let cumulative = 0;
  for (const q of qualities){
    cumulative += q.chance;
    if (r < cumulative) return q.name;
  }
  return qualities[qualities.length - 1].name; // на всяк випадок
}

function isPremiumApplicable(quality){
  return quality !== "Зношена";
}

function maybePremium(quality){
  if(!isPremiumApplicable(quality)) return false;
  return Math.random() < 0.05; 
}

function createItem(base){
  const quality = chooseQuality();
  const premium = maybePremium(quality);
  return {
    id: generateId(),
    type: "item",
    name: base.name,
    img: base.img,
    rarity: base.rarity,
    quality,
    premium
  };
}

// Предмети по рідкості
const itemsPool = {
  secret: [
    {name:"Бомбордіро", img:"red1.png", rarity:"Секретна"},
    {name:"Тралалеро", img:"red2.png", rarity:"Секретна"},
    {name:"Тунг-Сахур", img:"red3.png", rarity:"Секретна"}
  ],
  epic: [
    {name:"Волтер Вайт", img:"purple1.png", rarity:"Епічна"},
    {name:"Сігма", img:"purple2.png", rarity:"Епічна"}
  ],
  exceptional: [
    {name:"Сатана", img:"blue2.png", rarity:"Виняткова"},
    {name:"Хамстер", img:"blue1.png", rarity:"Виняткова"}
  ],
  common: [
    {name:"Пасхалочник", img:"green1.png", rarity:"Звичайна"},
    {name:"Єнот", img:"green2.png", rarity:"Звичайна"}
  ]
};

function dropAutumnCase(){

  const rates = {secret:0.04, epic:0.14, exceptional:0.27, common:0.55};
  let rarity = dropByRates(rates);
  if(rarity === "secret"){
    return createItem(itemsPool.secret[0]);
  }
  if(rarity === "epic"){
    const choice = itemsPool.epic[Math.floor(Math.random() * itemsPool.epic.length)];
    return createItem(choice);
  }
  if(rarity === "exceptional"){
    const choice = itemsPool.exceptional[Math.floor(Math.random() * itemsPool.exceptional.length)];
    return createItem(choice);
  }
  // common
  const commonChoices = [itemsPool.common[0], itemsPool.common[1]];
  const choice = commonChoices[Math.floor(Math.random() * commonChoices.length)];
  return createItem(choice);
}

function dropBoxCase(){
  const rates = {secret:0, epic:0.05, exceptional:0.20, common:0.75};
  let rarity = dropByRates(rates);

  if(rarity === "epic"){
    const choice = itemsPool.epic[Math.floor(Math.random() * itemsPool.epic.length)];
    return createItem(choice);
  }
  if(rarity === "exceptional"){
    const choice = itemsPool.exceptional[Math.floor(Math.random() * itemsPool.exceptional.length)];
    return createItem(choice);
  }
  // common
  const commonChoices = [itemsPool.common[0], itemsPool.common[1]];
  const choice = commonChoices[Math.floor(Math.random() * commonChoices.length)];
  return createItem(choice);
}

function dropGiftCase(){
  const rates = {secret:0.005, epic:0.205, exceptional:0.79};
  let rarity = dropByRates(rates);

  if(rarity === "secret"){
    const secretChoices = [itemsPool.secret[1], itemsPool.secret[2]];
    const choice = secretChoices[Math.floor(Math.random() * secretChoices.length)];
    return createItem(choice);
  }
  if(rarity === "epic"){
    const choice = itemsPool.epic[Math.floor(Math.random() * itemsPool.epic.length)];
    return createItem(choice);
  }
  // exceptional only, без common
  const choice = itemsPool.exceptional[Math.floor(Math.random() * itemsPool.exceptional.length)];
  return createItem(choice);
}

function getRarityColor(rarity){
  switch(rarity){
    case "Спеціальна": return "#FFD700";
    case "Секретна": return "#cc0033";
    case "Епічна": return "#9933ff";
    case "Виняткова": return "#3399ff";
    case "Звичайна": return "#33cc33";
    default: return "#888";
  }
}

function getQualityColor(quality){
  switch(quality){
    case "Прямо з цеху": return "#e6d31f";
    case "Після консервації": return "#e67e22";
    case "Після уроку": return "#2980b9";
    case "Зношена": return "#555";
    default: return "#888";
  }
}

function addDosvid(amount) {
    if (!currentUser) return;          // обов'язкова перевірка користувача
    if (typeof dosvid !== "number") dosvid = 0;
    dosvid += amount;
    localStorage.setItem(currentUser + "_dosvid", dosvid);
}

function promoMenu() {
  const recentTimes = lastPromoTimes
    .slice()
    .reverse() // показуємо від найновішого до найстарішого
    .map(t => {
      const d = new Date(t);
      return `<li>${d.toLocaleString("uk-UA", {hour12:false})}</li>`;
    })
    .join("");

  let html = `
    <h2>Введіть промокод</h2>
    <input id="promoInput" placeholder="Промокод" /><br/>
    <button onclick="applyPromo()">Активувати</button><br/><br/>

    <h3>Останні використання:</h3>
    <ul style="max-height:200px; overflow-y:auto; padding-left:20px;">
      ${recentTimes || "<li>Поки немає записів</li>"}
    </ul>

    <button onclick="mainMenu()">Назад</button>
  `;
  document.getElementById("app").innerHTML = html;
}

function applyPromo() {
  let code = document.getElementById("promoInput").value.trim();
  if (!code) {
    alert("Введіть промокод");
    return;
  }

  const codeB64 = strToB64(code);

  if (!promoCodesBase64[codeB64]) {
    alert("Промокод не знайдено");
    return;
  }

  if (promoCodesBase64[codeB64].type === "once" && usedPromos.includes(codeB64)) {
    alert("Цей промокод вже використаний");
    return;
  }

  // Виконуємо нагороду
  promoCodesBase64[codeB64].reward();

  if (promoCodesBase64[codeB64].type === "once") {
    usedPromos.push(codeB64);
  }

  // Додаємо час використання
  const now = new Date().toISOString();
  lastPromoTimes.push(now);
  if (lastPromoTimes.length > 10) lastPromoTimes.shift(); // залишаємо останні 10
  saveData();

  alert(`Промокод активовано!`);
  promoMenu(); // оновлюємо меню, щоб показати новий час
}

function arcadeMenu() {
  // Перевірка мінімального ПК
  const s = Price1488_state;
  if (!s.mb || !s.pic || !s.gpu || !s.ram || !s.storage || !s.pagemet) {
    Price1488_toast("❌ Спочатку зберіть повний ПК!");
    return;
  }
  
  const html = `
    <div style="
      max-width:480px;
      margin:20px auto;
      padding:20px;
      background: rgba(20,20,20,0.85);
      border-radius:18px;
      box-shadow: 0 0 25px rgba(0,0,0,0.6);
      color: #fff;
      text-align:center;
    ">
      <h2 style="font-size:28px; color:#ffd966; margin-bottom:10px;">🎮 Міні-ігри</h2>
      <div style="
        background: rgba(255,255,255,0.05);
        padding:10px 15px;
        border-radius:10px;
        margin-bottom:20px;
        font-weight:bold;
        font-size:16px;
        color:#00ff88;
      ">
        💰 Баланс: ${balance} ігрових нікусів
      </div>

      <div style="display:flex; flex-direction:column; gap:15px;">
        <button onclick="startSaperPaid()" ${balance < 20 ? "disabled" : ""}
          style="
            padding:15px;
            font-size:18px;
            border:none;
            border-radius:12px;
            background: linear-gradient(90deg,#ff9900,#ffcc00);
            color:#222;
            font-weight:bold;
            cursor:pointer;
            box-shadow:0 0 12px rgba(255,204,0,0.5);
            transition: transform 0.2s, box-shadow 0.2s;
          "
          onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 0 18px rgba(255,204,0,0.8)';"
          onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 0 12px rgba(255,204,0,0.5)';"
        >
          Сапер (20 ігрових нікусів)
        </button>

        <button onclick="startDinoPaid()" ${balance < 50 ? "disabled" : ""}
          style="
            padding:15px;
            font-size:18px;
            border:none;
            border-radius:12px;
            background: linear-gradient(90deg,#00ccff,#66eeff);
            color:#222;
            font-weight:bold;
            cursor:pointer;
            box-shadow:0 0 12px rgba(102,238,255,0.5);
            transition: transform 0.2s, box-shadow 0.2s;
          "
          onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 0 18px rgba(102,238,255,0.8)';"
          onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 0 12px rgba(102,238,255,0.5)';"
        >
          Динозаврик (50 ігрових нікусів)
        </button>

        <button onclick="unoSelectMode()" ${balance < 70 ? "disabled" : ""}
          style="
            padding:15px;
            font-size:18px;
            border:none;
            border-radius:12px;
            background: linear-gradient(90deg,#ff3366,#ff6699);
            color:#fff;
            font-weight:bold;
            cursor:pointer;
            box-shadow:0 0 12px rgba(255,51,102,0.5);
            transition: transform 0.2s, box-shadow 0.2s;
          "
          onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 0 18px rgba(255,51,102,0.8)';"
          onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 0 12px rgba(255,51,102,0.5)';"
        >
          🃏 УНО (70 ігрових нікусів)
        </button>
      </div>

      <button onclick="Price1488_openComputer()" style="
        margin-top:25px;
        padding:12px 25px;
        font-size:16px;
        border:none;
        border-radius:12px;
        background:#888;
        color:#fff;
        font-weight:bold;
        cursor:pointer;
        transition:0.15s;
      "
      onmouseover="this.style.background='#aaa';"
      onmouseout="this.style.background='#888';"
      >⬅ Назад</button>
    </div>
  `;

  document.getElementById("app").innerHTML = html;
}

function giveArcadeRewards(score) {
    // 🎁 Кейси / ключі
    let milestones = Math.floor(score / 30);
    for (let i = 0; i < milestones; i++) {
        if (Math.random() < 0.5) {
            addCase("arcase");
            alert("🎁 Вам випав Arcade Case!");
        } else {
            addKey("arcase");
            alert("🔑 Вам випав Arcade Case Key!");
        }
}

    // 🧠 Досвід — +4 за кожні 20 очок
    let gainedExp = Math.floor(score / 20) * 4;
    if (gainedExp > 0) addDosvid(gainedExp);
}
 
// ═══ ГЕНЕРАЦІЯ PNG КАРТОЧОК ЧЕРЕЗ CANVAS ═════════════════════

const UNO_CARD_CACHE = {};

const UNO_COLOR_GRAD = {
  red:    ["#ff1744","#b71c1c"],
  yellow: ["#ffd600","#f57f17"],
  green:  ["#00e676","#1b5e20"],
  blue:   ["#2979ff","#0d47a1"],
  wild:   ["#9c27b0","#1a237e"],
};

function unoDrawCardCanvas(color, val) {
  const cacheKey = color + "_" + val;
  if (UNO_CARD_CACHE[cacheKey]) return UNO_CARD_CACHE[cacheKey];

  const W = 100, H = 145;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d");

  const isWild = (color === "wild");
  const [c1, c2] = isWild ? UNO_COLOR_GRAD.wild : UNO_COLOR_GRAD[color];

  // Фон — заокруглений прямокутник
  const r = 12;
  ctx.beginPath();
  ctx.moveTo(r, 0); ctx.lineTo(W - r, 0);
  ctx.quadraticCurveTo(W, 0, W, r);
  ctx.lineTo(W, H - r); ctx.quadraticCurveTo(W, H, W - r, H);
  ctx.lineTo(r, H); ctx.quadraticCurveTo(0, H, 0, H - r);
  ctx.lineTo(0, r); ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();

  if (isWild) {
    // Wild — чотири кольорові чверті
    const sectors = [
      {color:"#ff1744", startAngle:-Math.PI/2, endAngle:0},
      {color:"#ffd600", startAngle:0, endAngle:Math.PI/2},
      {color:"#00e676", startAngle:Math.PI/2, endAngle:Math.PI},
      {color:"#2979ff", startAngle:Math.PI, endAngle:Math.PI*1.5},
    ];
    ctx.save();
    ctx.clip();
    sectors.forEach(s => {
      ctx.beginPath();
      ctx.moveTo(W/2, H/2);
      ctx.arc(W/2, H/2, Math.max(W,H), s.startAngle, s.endAngle);
      ctx.closePath();
      ctx.fillStyle = s.color;
      ctx.fill();
    });
    ctx.restore();
  } else {
    // Звичайний градієнт
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, c1);
    grad.addColorStop(1, c2);
    ctx.save(); ctx.clip();
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  // Внутрішній овал (білий з кольором)
  ctx.save();
  const r2 = 10;
  ctx.beginPath();
  ctx.moveTo(r2, 0); ctx.lineTo(W-r2, 0);
  ctx.quadraticCurveTo(W, 0, W, r2);
  ctx.lineTo(W, H-r2); ctx.quadraticCurveTo(W, H, W-r2, H);
  ctx.lineTo(r2, H); ctx.quadraticCurveTo(0, H, 0, H-r2);
  ctx.lineTo(0, r2); ctx.quadraticCurveTo(0, 0, r2, 0);
  ctx.closePath();
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.restore();

  // Центральний символ
  const centerLabel = unoGetCenterLabel(val);
  ctx.save();
  ctx.translate(W/2, H/2);

  // Тінь тексту
  ctx.shadowColor = "rgba(0,0,0,0.6)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 2;

  if (val === "wild" || val === "wild4") {
    // Велике коло
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI*2);
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fill();
    ctx.font = "bold 22px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(val === "wild4" ? "+4" : "W", 0, 0);
  } else if (val === "skip") {
    ctx.font = "bold 38px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("⊘", 0, 2);
  } else if (val === "reverse") {
    ctx.font = "bold 32px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("⟲", 0, 2);
  } else if (val === "draw2") {
    ctx.font = "bold 26px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("+2", 0, 2);
  } else {
    // Число
    ctx.font = "bold 54px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(val, 0, 3);
  }
  ctx.restore();

  // Кути — маленький текст
  const cornerLabel = unoGetCornerLabel(val);
  ctx.shadowColor = "rgba(0,0,0,0.7)";
  ctx.shadowBlur = 3;

  // Верхній лівий
  ctx.font = "bold 13px Arial";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(cornerLabel, 6, 5);

  // Нижній правий (перевернутий)
  ctx.save();
  ctx.translate(W - 6, H - 5);
  ctx.rotate(Math.PI);
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(cornerLabel, 0, 0);
  ctx.restore();

  // Колірна крапка у кутку (для кольорових карт)
  if (!isWild) {
    ctx.beginPath();
    ctx.arc(W - 10, 10, 5, 0, Math.PI*2);
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fill();
  }

  const dataURL = cv.toDataURL("image/png");
  UNO_CARD_CACHE[cacheKey] = dataURL;
  return dataURL;
}

function unoDrawCardBack() {
  if (UNO_CARD_CACHE["back"]) return UNO_CARD_CACHE["back"];

  const W = 100, H = 145;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d");

  // Фон
  const r = 12;
  ctx.beginPath();
  ctx.moveTo(r,0); ctx.lineTo(W-r,0); ctx.quadraticCurveTo(W,0,W,r);
  ctx.lineTo(W,H-r); ctx.quadraticCurveTo(W,H,W-r,H);
  ctx.lineTo(r,H); ctx.quadraticCurveTo(0,H,0,H-r);
  ctx.lineTo(0,r); ctx.quadraticCurveTo(0,0,r,0);
  ctx.closePath();

  const grad = ctx.createLinearGradient(0,0,W,H);
  grad.addColorStop(0,"#1a1a2e");
  grad.addColorStop(0.5,"#16213e");
  grad.addColorStop(1,"#0f3460");
  ctx.save(); ctx.clip();
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,W,H);

  // Візерунок — ромби
  ctx.globalAlpha = 0.15;
  for(let y=-H;y<H*2;y+=18){
    for(let x=-W;x<W*2;x+=18){
      ctx.beginPath();
      ctx.moveTo(x+9,y); ctx.lineTo(x+18,y+9);
      ctx.lineTo(x+9,y+18); ctx.lineTo(x,y+9);
      ctx.closePath();
      ctx.strokeStyle="#fff";
      ctx.lineWidth=1;
      ctx.stroke();
    }
  }
  ctx.globalAlpha=1;
  ctx.restore();

  // Центральний логотип
  ctx.save();
  ctx.translate(W/2, H/2);
  ctx.beginPath();
  ctx.ellipse(0,0,30,22,Math.PI/6,0,Math.PI*2);
  ctx.fillStyle="#ff1744";
  ctx.fill();
  ctx.font="bold 18px Arial";
  ctx.fillStyle="#fff";
  ctx.textAlign="center";
  ctx.textBaseline="middle";
  ctx.shadowColor="rgba(0,0,0,0.8)";
  ctx.shadowBlur=4;
  ctx.fillText("UNO",0,1);
  ctx.restore();

  // Рамка
  ctx.beginPath();
  ctx.moveTo(r,0); ctx.lineTo(W-r,0); ctx.quadraticCurveTo(W,0,W,r);
  ctx.lineTo(W,H-r); ctx.quadraticCurveTo(W,H,W-r,H);
  ctx.lineTo(r,H); ctx.quadraticCurveTo(0,H,0,H-r);
  ctx.lineTo(0,r); ctx.quadraticCurveTo(0,0,r,0);
  ctx.closePath();
  ctx.strokeStyle="rgba(255,255,255,0.25)";
  ctx.lineWidth=2;
  ctx.stroke();

  const dataURL = cv.toDataURL("image/png");
  UNO_CARD_CACHE["back"] = dataURL;
  return dataURL;
}

function unoGetCenterLabel(val) {
  if(val==="skip") return "⊘";
  if(val==="reverse") return "⟲";
  if(val==="draw2") return "+2";
  if(val==="wild") return "W";
  if(val==="wild4") return "+4";
  return val;
}
function unoGetCornerLabel(val) {
  if(val==="skip") return "⊘";
  if(val==="reverse") return "↺";
  if(val==="draw2") return "+2";
  if(val==="wild") return "W";
  if(val==="wild4") return "+4";
  return val;
}

// ═══ УНО: КОНСТАНТИ ══════════════════════════════════════════

const UNO_COLORS = ["red","yellow","green","blue"];
const UNO_NUMS   = ["0","1","2","3","4","5","6","7","8","9","skip","reverse","draw2"];
const UNO_COLOR_HEX = {red:"#e74c3c",yellow:"#f1c40f",green:"#27ae60",blue:"#2980b9"};
const UNO_COLOR_UA  = {red:"🔴 Червоний",yellow:"🟡 Жовтий",green:"🟢 Зелений",blue:"🔵 Синій"};

let unoState = null;

// ═══ УНО: ВИБІР РЕЖИМУ ════════════════════════════════════════

function unoSelectMode() {
  if (balance < 70) { alert("Недостатньо нікусів! Потрібно 70."); return; }

  document.getElementById("app").innerHTML = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@700;900&display=swap');
      #uno-mode-root {
        font-family:'Nunito',sans-serif;
        min-height:100vh;
        background:radial-gradient(ellipse at top,#1a0a2e 0%,#0d0d1a 60%);
        display:flex;flex-direction:column;
        align-items:center;justify-content:center;
        padding:30px;box-sizing:border-box;color:#fff;
      }
      .uno-title {
        font-family:'Bebas Neue',sans-serif;font-size:64px;letter-spacing:8px;
        background:linear-gradient(135deg,#ff3366,#ff9900,#ffcc00);
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;
        margin-bottom:6px;
      }
      .uno-mode-card {
        width:200px;padding:28px 20px;
        background:rgba(255,255,255,.05);
        border:2px solid rgba(255,255,255,.1);
        border-radius:20px;text-align:center;cursor:pointer;
        transition:all .25s;
      }
      .uno-mode-card.duel { --cc:#ff3366; }
      .uno-mode-card.trio { --cc:#ff9900; }
      .uno-mode-card:hover {
        transform:translateY(-8px) scale(1.04);
        border-color:var(--cc);
        box-shadow:0 12px 30px rgba(0,0,0,.5),0 0 25px color-mix(in srgb, var(--cc) 40%, transparent);
      }
      .uno-mode-icon {font-size:52px;margin-bottom:12px;}
      .uno-mode-name {font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:3px;color:var(--cc);margin-bottom:6px;}
      .uno-mode-desc {font-size:12px;color:rgba(255,255,255,.45);line-height:1.6;}
    </style>
    <div id="uno-mode-root">
      <div class="uno-title">🃏 УНО</div>
      <div style="font-size:13px;letter-spacing:3px;color:rgba(255,255,255,.35);text-transform:uppercase;margin-bottom:12px;">Обери режим</div>
      <div style="background:rgba(255,255,255,.06);border-radius:30px;padding:8px 22px;font-size:13px;font-weight:700;color:rgba(255,255,255,.5);letter-spacing:1px;margin-bottom:36px;">
        Вхід: <span style="color:#ff3366">70 💰</span> &nbsp;·&nbsp; Виграш: <span style="color:#00ff88">100 💰</span>
      </div>
      <div style="display:flex;gap:20px;flex-wrap:wrap;justify-content:center;margin-bottom:32px;">
        <div class="uno-mode-card duel" onclick="startUnoGame(1)">
          <div class="uno-mode-icon">⚔️</div>
          <div class="uno-mode-name">1 на 1</div>
          <div class="uno-mode-desc">Ти проти одного бота<br>Швидка дуель</div>
        </div>
        <div class="uno-mode-card trio" onclick="startUnoGame(2)">
          <div class="uno-mode-icon">🔺</div>
          <div class="uno-mode-name">1 на 1 на 1</div>
          <div class="uno-mode-desc">Ти проти двох ботів<br>Хаотична трійка</div>
        </div>
      </div>
      <button onclick="arcadeMenu()" style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.5);border-radius:12px;padding:12px 28px;font-family:'Nunito',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:.2s;"
        onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.5)'">← Назад</button>
    </div>`;
}

// ═══ УНО: ІГРОВА ЛОГІКА ══════════════════════════════════════

function unoBuildDeck() {
  const deck = [];
  UNO_COLORS.forEach(c => {
    UNO_NUMS.forEach(n => {
      deck.push({color:c,val:n});
      if(n!=="0") deck.push({color:c,val:n});
    });
  });
  for(let i=0;i<4;i++){
    deck.push({color:"wild",val:"wild"});
    deck.push({color:"wild",val:"wild4"});
  }
  return unoShuffle(deck);
}
function unoShuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}
function unoDeal(deck,count){ return deck.splice(0,count); }

function unoCanPlay(card,topCard,currentColor){
  if(card.color==="wild") return true;
  if(card.color===currentColor) return true;
  if(card.val===topCard.val) return true;
  return false;
}

function unoBotPlay(hand,topCard,currentColor){
  const playable=hand.filter(c=>unoCanPlay(c,topCard,currentColor));
  if(!playable.length) return null;
  const specials=playable.filter(c=>["skip","reverse","draw2","wild4"].includes(c.val));
  const normals=playable.filter(c=>!["skip","reverse","draw2","wild4","wild"].includes(c.val));
  const wilds=playable.filter(c=>c.color==="wild");
  if(hand.length<=3&&specials.length) return specials[Math.floor(Math.random()*specials.length)];
  if(normals.length) return normals[Math.floor(Math.random()*normals.length)];
  if(specials.length) return specials[Math.floor(Math.random()*specials.length)];
  return wilds[0];
}
function unoBotChooseColor(hand){
  const counts={red:0,yellow:0,green:0,blue:0};
  hand.forEach(c=>{if(counts[c.color]!==undefined) counts[c.color]++;});
  return Object.keys(counts).reduce((a,b)=>counts[a]>counts[b]?a:b);
}

function startUnoGame(botCount){
  if(balance<70){alert("Недостатньо нікусів!");return;}
  balance-=70; saveData();

  // Прогрів кешу карточок у фоні
  setTimeout(()=>{
    UNO_COLORS.forEach(c=>UNO_NUMS.forEach(v=>unoDrawCardCanvas(c,v)));
    unoDrawCardCanvas("wild","wild");
    unoDrawCardCanvas("wild","wild4");
    unoDrawCardBack();
  },100);

  const deck=unoBuildDeck();
  const player=unoDeal(deck,7);
  const bot1=unoDeal(deck,7);
  const bot2=botCount>=2?unoDeal(deck,7):null;

  let topCard=deck.shift();
  while(topCard.color==="wild"){deck.push(topCard);topCard=deck.shift();}

  unoState={
    deck,discard:[topCard],
    player,bots:botCount===1?[bot1]:[bot1,bot2],
    botCount,currentColor:topCard.color,topCard,
    turn:0,direction:1,gameOver:false,waitingWild:false,
    log:[],lastPlayedCard:null,
  };
  unoRender();
}

function unoLog(msg){
  if(!unoState) return;
  unoState.log.unshift(msg);
  if(unoState.log.length>5) unoState.log.pop();
}

function unoNextTurn(skipExtra=0){
  const s=unoState;
  const total=1+s.botCount;
  for(let i=0;i<=skipExtra;i++) s.turn=(s.turn+s.direction+total)%total;
}
function unoNextPlayer(from){
  const total=1+unoState.botCount;
  return (from+unoState.direction+total)%total;
}
function unoPlayerName(idx){
  if(idx===0) return "Тебе";
  return `Бота ${idx}`;
}
function unoDrawCards(playerIdx,count){
  const s=unoState;
  for(let i=0;i<count;i++){
    if(!s.deck.length){
      const top=s.discard.shift();
      s.deck=unoShuffle(s.discard);
      s.discard=[top];
    }
    const card=s.deck.shift();
    if(!card) break;
    if(playerIdx===0) s.player.push(card);
    else s.bots[playerIdx-1].push(card);
  }
}

function unoPlayCard(idx){
  const s=unoState;
  if(s.gameOver||s.turn!==0||s.waitingWild) return;
  const card=s.player[idx];
  if(!unoCanPlay(card,s.topCard,s.currentColor)){
    const hand=document.getElementById("uno-hand");
    if(hand){hand.style.animation="none";requestAnimationFrame(()=>{hand.style.animation="unoShake .4s ease";});}
    return;
  }
  s.player.splice(idx,1);
  s.discard.unshift(card);
  s.topCard=card;
  s.lastPlayedCard=card;
  if(card.color==="wild"){
    s.waitingWild=true;
    if(card.val==="wild4") s.drawPending=4;
    unoRender(); return;
  }
  s.currentColor=card.color;
  unoLog(`Ти зіграв ${unoValLabel(card.val)} (${unoColorName(card.color)})`);
  unoApplyCardEffect(card,0);
}

function unoChooseWildColor(color){
  const s=unoState;
  s.currentColor=color; s.waitingWild=false;
  unoLog(`Ти обрав ${unoColorName(color)}`);
  unoApplyCardEffect(s.topCard,0,color);
}

function unoApplyCardEffect(card,fromTurn,forcedColor){
  const s=unoState;
  if(card.val==="reverse"){
    s.direction*=-1;
    if(s.botCount===1){unoLog("⟲ Реверс — пропуск бота!");unoNextTurn();}
    else{unoLog("⟲ Реверс!");unoNextTurn();}
  } else if(card.val==="skip"){
    unoLog("⏭ Пропуск ходу!");
    unoNextTurn(1);
  } else if(card.val==="draw2"){
    const next=unoNextPlayer(fromTurn);
    unoDrawCards(next,2);
    unoLog(`+2 картки для ${unoPlayerName(next)}!`);
    unoNextTurn(1);
  } else if(card.val==="wild4"){
    const next=unoNextPlayer(fromTurn);
    unoDrawCards(next,4);
    unoLog(`+4 картки для ${unoPlayerName(next)}!`);
    unoNextTurn(1);
  } else {
    unoNextTurn();
  }

  if(s.player.length===0){unoWin();return;}
  for(let i=0;i<s.bots.length;i++){
    if(s.bots[i].length===0){unoLose(`Бот ${i+1} переміг!`);return;}
  }
  unoRender();
  if(s.turn!==0&&!s.gameOver) setTimeout(unoBotTurn,1100);
}

function unoPlayerDraw(){
  const s=unoState;
  if(s.gameOver||s.turn!==0||s.waitingWild) return;
  unoDrawCards(0,1);
  unoLog("Ти взяв карту з колоди");
  const newCard=s.player[s.player.length-1];
  if(!unoCanPlay(newCard,s.topCard,s.currentColor)){
    unoNextTurn();
    unoRender();
    if(s.turn!==0&&!s.gameOver) setTimeout(unoBotTurn,1100);
  } else {
    unoRender();
  }
}

function unoBotTurn(){
  const s=unoState;
  if(s.gameOver||s.turn===0) return;
  const botIdx=s.turn-1;
  const botHand=s.bots[botIdx];
  const card=unoBotPlay(botHand,s.topCard,s.currentColor);

  if(!card){
    unoDrawCards(s.turn,1);
    unoLog(`Бот ${s.turn} бере карту`);
    unoNextTurn();
    unoRender();
    if(s.turn!==0&&!s.gameOver) setTimeout(unoBotTurn,1100);
    return;
  }

  const cardIdx=botHand.indexOf(card);
  botHand.splice(cardIdx,1);
  s.discard.unshift(card);
  s.topCard=card;
  s.lastPlayedCard=card;

  if(card.color==="wild"){
    const chosen=unoBotChooseColor(botHand);
    s.currentColor=chosen;
    unoLog(`Бот ${s.turn}: Wild → ${unoColorName(chosen)}`);
    unoApplyCardEffect(card,s.turn,chosen);
  } else {
    s.currentColor=card.color;
    unoLog(`Бот ${s.turn} зіграв ${unoValLabel(card.val)} (${unoColorName(card.color)})`);
    unoApplyCardEffect(card,s.turn);
  }

  if(botHand.length===1) unoLog(`⚠️ Бот ${s.turn} каже УНО!`);
  if(botHand.length===0){unoLose(`Бот ${botIdx+1} переміг!`);return;}
  if(s.player.length===0){unoWin();return;}
}

function unoWin(){
  const s=unoState; s.gameOver=true;
  balance+=100; saveData(); unoRender();
}
function unoLose(reason){
  const s=unoState; s.gameOver=true; s.loseReason=reason; unoRender();
}

function unoValLabel(val){
  const m={skip:"Пропуск",reverse:"Реверс",draw2:"+2",wild:"Wild",wild4:"Wild+4"};
  return m[val]||val;
}
function unoColorName(color){
  const m={red:"🔴",yellow:"🟡",green:"🟢",blue:"🔵",wild:"🌈"};
  return m[color]||color;
}

// ═══ УНО: РЕНДЕР З PNG КАРТОЧКАМИ ════════════════════════════

function unoCardImg(card, size=90) {
  const src = unoDrawCardCanvas(card.color, card.val);
  const h = Math.round(size * 1.45);
  return `<img src="${src}" width="${size}" height="${h}" style="border-radius:${size*0.12}px;display:block;" draggable="false">`;
}
function unoCardBackImg(size=70) {
  const src = unoDrawCardBack();
  const h = Math.round(size * 1.45);
  return `<img src="${src}" width="${size}" height="${h}" style="border-radius:${size*0.12}px;display:block;" draggable="false">`;
}

function unoRender(){
  const s=unoState;
  if(!s) return;
  const app=document.getElementById("app");
  const isMyTurn=s.turn===0&&!s.gameOver;

  const playableIdxs=new Set();
  if(isMyTurn&&!s.waitingWild){
    s.player.forEach((c,i)=>{if(unoCanPlay(c,s.topCard,s.currentColor)) playableIdxs.add(i);});
  }

  // Боти
  let botsHTML="";
  s.bots.forEach((bot,i)=>{
    const isActive=s.turn===i+1;
    const uno=bot.length===1;
    botsHTML+=`
      <div style="margin-bottom:10px;text-align:center;">
        <div style="
          font-size:12px;font-weight:800;letter-spacing:1px;
          color:${isActive?"#ffd700":"rgba(255,255,255,.35)"};
          margin-bottom:6px;
          ${isActive?"text-shadow:0 0 12px rgba(255,215,0,.6);":""}
        ">
          ${isActive?"▶ ":""}🤖 БОТ ${i+1}
          <span style="color:${uno?"#ff3366":"rgba(255,255,255,.4)"};margin-left:6px;">
            ${uno?"🔴 УНО! (1 карта)":"("+bot.length+" карт)"}
          </span>
        </div>
        <div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap;max-width:360px;margin:0 auto;">
          ${bot.map(()=>unoCardBackImg(48)).join("")}
        </div>
      </div>`;
  });

  // Лог
  const logHTML=s.log.map((l,i)=>`
    <div style="font-size:11px;padding:2px 0;color:rgba(255,255,255,${0.85-i*0.15});">${l}</div>
  `).join("");

  // Верхня карта + анімована карта яку зіграли
  const topSrc=unoDrawCardCanvas(s.topCard.color,s.topCard.val);
  const colorDot=s.currentColor!=="wild"
    ?`<div style="width:22px;height:22px;border-radius:50%;background:${UNO_COLOR_HEX[s.currentColor]||"#888"};border:2px solid rgba(255,255,255,.6);box-shadow:0 0 10px ${UNO_COLOR_HEX[s.currentColor]||"#888"};"></div>`
    :"";

  // Дія
  let actionHTML="";
  if(s.gameOver){
    const won=s.player.length===0;
    actionHTML=`
      <div style="text-align:center;padding:14px;background:${won?"rgba(39,174,96,.15)":"rgba(231,76,60,.15)"};border-radius:14px;border:1px solid ${won?"rgba(39,174,96,.4)":"rgba(231,76,60,.4)"};margin-bottom:10px;">
        <div style="font-size:36px;margin-bottom:4px;">${won?"🏆":"💀"}</div>
        <div style="font-size:20px;font-weight:900;color:${won?"#27ae60":"#e74c3c"};">${won?"ПЕРЕМОГА! +100 💰":`ПРОГРАШ — ${s.loseReason||""}`}</div>
      </div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
        <button onclick="unoSelectMode()" style="padding:12px 22px;border:none;border-radius:12px;background:linear-gradient(90deg,#ff3366,#ff6699);color:#fff;font-size:15px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;">🔄 Знову (70 💰)</button>
        <button onclick="arcadeMenu()" style="padding:12px 22px;border:none;border-radius:12px;background:rgba(255,255,255,.1);color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;">← Меню</button>
      </div>`;
  } else if(s.waitingWild){
    actionHTML=`
      <div style="text-align:center;margin-bottom:8px;font-size:13px;font-weight:800;color:#ffd700;letter-spacing:1px;">🌈 Обери колір:</div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
        ${UNO_COLORS.map(c=>`
          <button onclick="unoChooseWildColor('${c}')" style="
            display:flex;flex-direction:column;align-items:center;gap:4px;
            background:${UNO_COLOR_HEX[c]};border:3px solid rgba(255,255,255,.5);
            border-radius:12px;padding:10px 16px;cursor:pointer;
            font-size:11px;font-weight:800;color:#fff;
            font-family:'Nunito',sans-serif;letter-spacing:.5px;
            transition:.2s;box-shadow:0 0 15px ${UNO_COLOR_HEX[c]};
          " onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
            <span style="font-size:22px;">${unoColorName(c)}</span>
          </button>
        `).join("")}
      </div>`;
  } else if(isMyTurn){
    actionHTML=`
      <div style="text-align:center;">
        <div style="font-size:12px;font-weight:700;color:#ffd700;margin-bottom:8px;letter-spacing:1px;">▶ ТВІЙ ХІД — натисни на карту або візьми з колоди</div>
        <button onclick="unoPlayerDraw()" style="
          padding:9px 20px;border:none;border-radius:10px;
          background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);
          color:#fff;font-size:13px;font-weight:700;cursor:pointer;
          font-family:'Nunito',sans-serif;transition:.2s;
        " onmouseover="this.style.background='rgba(255,255,255,.15)'" onmouseout="this.style.background='rgba(255,255,255,.08)'">
          📤 Взяти карту з колоди
        </button>
      </div>`;
  } else {
    actionHTML=`<div style="text-align:center;color:rgba(255,255,255,.4);font-size:13px;font-weight:600;padding:8px;">⏳ Хід Бота ${s.turn}...</div>`;
  }

  // Рука гравця
  const handHTML=s.player.map((c,i)=>{
    const playable=playableIdxs.has(i);
    return `
      <div onclick="${isMyTurn?"unoPlayCard("+i+")":""}"
        style="
          cursor:${isMyTurn?"pointer":"default"};
          display:inline-flex;flex-direction:column;align-items:center;
          position:relative;flex-shrink:0;
          transition:transform .15s,filter .15s;
          ${playable?"filter:drop-shadow(0 0 10px rgba(255,255,255,.5));":"filter:brightness(0.65) saturate(0.5);"}
        "
        onmouseover="${playable?"this.style.transform='translateY(-14px) scale(1.1)'":""}"
        onmouseout="${playable?"this.style.transform='translateY(0) scale(1)'":""}"
      >
        ${unoCardImg(c, 72)}
        ${playable?`<div style="position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);width:6px;height:6px;background:#ffd700;border-radius:50%;box-shadow:0 0 6px #ffd700;"></div>`:""}
      </div>`;
  }).join("");

  app.innerHTML=`
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@700;900&display=swap');
      #uno-root {
        font-family:'Nunito',sans-serif;
        min-height:100vh;
        background:radial-gradient(ellipse at top left,#1a0a2e 0%,#0d0d1a 70%);
        padding:10px;box-sizing:border-box;color:#fff;
        max-width:540px;margin:0 auto;
      }
      @keyframes unoShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
      @keyframes unoSlideIn{from{transform:translateY(-20px) scale(.8);opacity:0}to{transform:translateY(0) scale(1);opacity:1}}
    </style>
    <div id="uno-root">

      <!-- HEADER -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:4px;background:linear-gradient(90deg,#ff3366,#ffcc00);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">🃏 УНО</div>
        <div style="font-size:12px;font-weight:700;background:rgba(255,255,255,.07);border-radius:20px;padding:5px 14px;color:rgba(255,255,255,.6);">💰 ${balance}</div>
        <button onclick="arcadeMenu()" style="background:none;border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.5);border-radius:8px;padding:6px 12px;cursor:pointer;font-size:12px;font-family:'Nunito',sans-serif;">← Вийти</button>
      </div>

      <!-- БОТИ -->
      <div style="background:rgba(0,0,0,.3);border-radius:14px;padding:10px;margin-bottom:8px;border:1px solid rgba(255,255,255,.07);">
        ${botsHTML}
      </div>

      <!-- СТІЛ -->
      <div style="display:flex;align-items:center;justify-content:center;gap:16px;background:rgba(0,0,0,.3);border-radius:16px;padding:14px;margin-bottom:8px;border:1px solid rgba(255,255,255,.08);">

        <!-- Колода -->
        <div style="text-align:center;">
          <div onclick="unoPlayerDraw()" style="cursor:${isMyTurn?"pointer":"default"};transition:.15s;" onmouseover="${isMyTurn?"this.style.transform='scale(1.07)'":""}" onmouseout="this.style.transform='scale(1)'">
            ${unoCardBackImg(68)}
          </div>
          <div style="font-size:10px;color:rgba(255,255,255,.35);margin-top:4px;">${s.deck.length} карт</div>
        </div>

        <!-- Стрілка -->
        <div style="text-align:center;">
          <div style="font-size:24px;color:rgba(255,255,255,.4);">${s.direction===1?"↻":"↺"}</div>
          <div style="font-size:9px;font-weight:700;color:${isMyTurn?"#ffd700":"rgba(255,255,255,.3)"};letter-spacing:1px;margin-top:2px;">${isMyTurn?"ТВІЙхід":s.turn===0?"ТИ":`БОТ ${s.turn}`}</div>
          <div style="margin-top:6px;display:flex;justify-content:center;">${colorDot}</div>
        </div>

        <!-- Стопка -->
        <div style="text-align:center;">
          <div style="animation:unoSlideIn .35s ease;">
            ${unoCardImg(s.topCard, 68)}
          </div>
          <div style="font-size:10px;color:rgba(255,255,255,.35);margin-top:4px;">Стопка</div>
        </div>

      </div>

      <!-- ДІЯ -->
      <div style="background:rgba(0,0,0,.25);border-radius:14px;padding:12px;margin-bottom:8px;border:1px solid rgba(255,255,255,.06);min-height:64px;">
        ${actionHTML}
      </div>

      <!-- РУКА ГРАВЦЯ -->
      <div style="background:rgba(0,0,0,.3);border-radius:14px;padding:12px;margin-bottom:8px;border:1px solid ${isMyTurn?"rgba(255,215,0,.25)":"rgba(255,255,255,.07)"};${isMyTurn?"box-shadow:0 0 20px rgba(255,215,0,.08);":""}">
        <div style="font-size:11px;font-weight:800;letter-spacing:1px;color:${isMyTurn?"#ffd700":"rgba(255,255,255,.35)"};text-align:center;margin-bottom:8px;">
          👤 ТВОЯ РУКА (${s.player.length} карт${s.player.length===1?" — УНО! 🔴":""})
        </div>
        <div id="uno-hand" style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;align-items:flex-end;padding:4px;">
          ${handHTML}
        </div>
      </div>

      <!-- ЛОГ -->
      <div style="background:rgba(0,0,0,.25);border-radius:12px;padding:10px 14px;border:1px solid rgba(255,255,255,.06);min-height:44px;">
        <div style="font-size:9px;font-weight:800;color:rgba(255,255,255,.25);letter-spacing:1px;margin-bottom:4px;">📋 ПОДІЇ</div>
        ${logHTML||'<div style="font-size:11px;color:rgba(255,255,255,.2);">Гра починається...</div>'}
      </div>

    </div>`;
}   
// ===== Сапер =====
function startSaperPaid() {
    if (balance < 20) {
        alert("Недостатньо нікусів для гри в Сапер!");
        return;
    }
    addBalance(-20);
    startSaper();
}

function startSaper() {
    let rows = 8, cols = 8, minesCount = 10;
    let board = [], revealed = [], exploded = false, saperScore = 0;

    for (let r = 0; r < rows; r++) {
        board[r] = []; revealed[r] = [];
        for (let c = 0; c < cols; c++) { board[r][c] = 0; revealed[r][c] = false; }
    }

    let placed = 0;
    while (placed < minesCount) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);
        if (board[r][c] === 0) { board[r][c] = "M"; placed++; }
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c] === "M") continue;
            let count = 0;
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    let nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === "M") count++;
                }
            }
            board[r][c] = count;
        }
    }

    window.reveal = function (r, c) {
        if (revealed[r][c] || exploded) return;
        revealed[r][c] = true;

        if (board[r][c] === "M") {
            exploded = true;
            saperScore = 0;
        } else {
            let oldScore = saperScore;
            saperScore += 4;

            let oldMilestone = Math.floor(oldScore / 30);
            let newMilestone = Math.floor(saperScore / 30);
            if (newMilestone > oldMilestone) giveArcadeRewards(saperScore);
        }

        renderBoard();
    };

    function renderBoard() {
        let html = `
        <div style="
            margin:auto;
            padding:20px;
            width:fit-content;
            background:rgba(0,0,0,0.45);
            border-radius:12px;
            box-shadow:0 0 18px rgba(0,0,0,0.6);
            text-align:center;
            color:white;
        ">
            <h2 style="margin-top:0;font-size:28px;letter-spacing:1px;">💣 САПЕР</h2>
            <p style="font-size:18px;margin-bottom:18px;">Очки:
                <span style="font-weight:bold;color:#ffd64a;">${saperScore}</span>
            </p>

            <div style="
                display:grid;
                grid-template-columns: repeat(${cols}, 42px);
                gap:6px;
                margin:auto;
            ">
        `;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let isOpen = revealed[r][c];
                let isMine = board[r][c] === "M";

                let bg = isOpen ? "#2d2d2d" : "#4e4e4e";
                let cellContent = "";

                if (isOpen && isMine) {
                    cellContent = "💣";
                    bg = "#8b1e1e";
                }

                html += `
                <div onclick="reveal(${r},${c})"
                    style="
                        width:42px;
                        height:42px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-size:22px;
                        border-radius:6px;
                        cursor:pointer;
                        user-select:none;
                        background:${bg};
                        color:white;
                        box-shadow: inset 0 0 4px rgba(0,0,0,0.6);
                        transition:0.15s;
                    "
                    onmouseover="this.style.filter='brightness(1.18)'"
                    onmouseout="this.style.filter='brightness(1)'"
                >${cellContent}</div>`;
            }
        }

        html += `</div>`;

        if (!exploded) {
            html += `
            <button onclick="stopSaper()" style="
                margin-top:18px;
                padding:10px 20px;
                background:#ffaa2b;
                border:0;
                border-radius:8px;
                font-size:18px;
                cursor:pointer;
                color:black;
            ">Зупинитися</button>`;
        } else {
            html += `
            <p style="color:#ff6b6b;margin-top:18px;font-size:18px;">
                💥 Ви вибухнули!
            </p>
            <button onclick='startSaperPaid()' style="
                padding:10px 18px;
                background:#ff3b3b;
                border:0;
                border-radius:8px;
                font-size:18px;
                cursor:pointer;
                color:white;
            ">Нова гра (20 нікусів)</button>`;
        }

        html += `
            <br><br>
            <button onclick='arcadeMenu()' style="
                padding:8px 16px;
                background:#444;
                border:0;
                border-radius:6px;
                font-size:16px;
                cursor:pointer;
                color:white;
            ">⬅ Назад</button>
        </div>`;

        document.getElementById("app").innerHTML = html;
    }

    window.stopSaper = function () {
        addBalance(saperScore);
        alert(`Гра завершена! Отримано ${saperScore} нікусів.`);
        arcadeMenu();
    };

    renderBoard();
}


function startDinoPaid(){
    if (typeof balance === "undefined") balance = 0;
    if (balance < 50) {
        alert("Недостатньо нікусів для гри в Динозаврик!");
        return;
    }
    addBalance(-50);
    startDino();
}

function startDino() {
    document.getElementById("app").innerHTML = `
        <h2>Динозаврик</h2>
        <p>Натискайте ПРОБІЛ або кнопку "Стрибок" для стрибка. Мета: уникати кактусів.</p>
        <div style="text-align:center">
          <canvas id="dinoCanvas" width="600" height="150" style="border:1px solid #555; display:block; margin:auto; background:#f4e1b0"></canvas>
          <div style="margin-top:10px;">
            <button id="startBtn" style="font-size:18px; padding:10px 24px;" disabled>▶ Старт гри</button>
            <button id="reloadBtn" style="font-size:18px; padding:10px 18px; margin-left:8px;">🔄 Перезавантажити PNG</button>
            <span id="imgStatus" style="margin-left:12px; font-weight:600;">Завантаження PNG...</span>
          </div>
          <div style="margin-top:12px;">
            <button id="jumpBtn" style="font-size:24px; padding:18px 48px;" disabled>Стрибок</button>
            <button id="retryBtn" style="font-size:16px; padding:8px 18px; margin-left:8px; display:none;">Заново</button>
            <button id="backBtn" style="font-size:16px; padding:8px 18px; margin-left:8px;">⬅ Назад</button>
          </div>
        </div>
    `;

    const canvas = document.getElementById("dinoCanvas");
    const ctx = canvas.getContext("2d");
    const startBtn = document.getElementById("startBtn");
    const reloadBtn = document.getElementById("reloadBtn");
    const imgStatus = document.getElementById("imgStatus");
    const jumpBtn = document.getElementById("jumpBtn");
    const retryBtn = document.getElementById("retryBtn");
    const backBtn = document.getElementById("backBtn");

    let dinoImg = new Image();
    let cactusImg = new Image();
    let imgsLoaded = { dino: false, cactus: false };
    let imgLoadToken = Date.now();

    let dino = { x: 50, y: 120, w: 30, h: 30, vy: 0 };
    const gravity = 0.6;
    const jumpVelocity = -12;
    const groundY = 120;

    let obstacles = [];
    let obstacleSpeed = 5; 
    let cactusCount = 0;

    let gameRunning = false;
    let spawnIntervalId = null;
    let rafId = null;
    let startTime = 0;
    let score = 0;

    function rectsOverlap(a, b){
        return !(a.x + a.w < b.x || a.x > b.x + b.w || a.y + a.h < b.y || a.y > b.y + b.h);
    }

    function cleanupGameLoop() {
        if (spawnIntervalId) { clearInterval(spawnIntervalId); spawnIntervalId = null; }
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    }

    function setImgSrcs() {
        imgLoadToken = Date.now();
        imgsLoaded.dino = imgsLoaded.cactus = false;
        imgStatus.textContent = "Завантаження PNG...";
        startBtn.disabled = true;
        jumpBtn.disabled = true;
        retryBtn.style.display = "none";

        dinoImg = new Image();
        cactusImg = new Image();

        dinoImg.onload = () => { imgsLoaded.dino = true; updateImgStatus(); drawPreStart(); };
        cactusImg.onload = () => { imgsLoaded.cactus = true; updateImgStatus(); };

        dinoImg.src = "img/dino.png?ts=" + imgLoadToken;
        cactusImg.src = "img/cactus.png?ts=" + imgLoadToken;
    }

    function updateImgStatus(){
        if (imgsLoaded.dino && imgsLoaded.cactus) {
            imgStatus.textContent = "PNG завантажені ✅";
            startBtn.disabled = false;
        } else {
            imgStatus.textContent = "Завантаження PNG...";
            startBtn.disabled = true;
        }
    }

    function drawPreStart(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#f4e1b0";
        ctx.fillRect(0, groundY + dino.h, canvas.width, canvas.height - (groundY + dino.h));
        if (imgsLoaded.dino) ctx.drawImage(dinoImg, dino.x, dino.y, dino.w, dino.h);
        else { ctx.fillStyle = "#333"; ctx.fillRect(dino.x, dino.y, dino.w, dino.h); }
        ctx.font = "14px Arial";
        ctx.fillStyle = "#333";
        ctx.fillText("Натисни ▶ Старт", 260, 30);
    }

    function spawnCactus(){
        cactusCount++;
        let count = 1;

        if(score < 35){
            if(cactusCount <= 10) count = 1;
            else if(cactusCount <= 30) count = Math.random() < 0.5 ? 2 : 1;
            else count = Math.random() < 0.3 ? 3 : 2;
        } else {
            if(Math.random() < 0.6) count = 3;
            else if(Math.random() < 0.8) count = 2;
            else count = 1;
        }

        for (let i = 0; i < count; i++) {
            let xOffset = i*25 + (cactusCount === 1 ? 200 : 0);
            obstacles.push({ x: canvas.width + xOffset, y: groundY, w: 20, h: 30 });
        }
    }

    function jumpDino(){
        if (!gameRunning) return;
        if (dino.y >= groundY - 0.1) {
            dino.vy = jumpVelocity;
        }
    }

    function keyHandler(e){
        if (e.code === "Space") {
            e.preventDefault();
            jumpDino();
        }
    }

    function loop() {
        dino.vy += gravity;
        dino.y += dino.vy;
        if (dino.y > groundY) { dino.y = groundY; dino.vy = 0; }

        for (let o of obstacles) { o.x -= obstacleSpeed; }
        obstacles = obstacles.filter(o => o.x + o.w > 0);

        const dinoRect = { x: dino.x, y: dino.y, w: dino.w, h: dino.h };
        for (let o of obstacles) {
            const oRect = { x: o.x, y: o.y, w: o.w, h: o.h };
            if (rectsOverlap(dinoRect, oRect)) { finishGame(); return; }
        }

        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#f4e1b0";
        ctx.fillRect(0, groundY + dino.h, canvas.width, canvas.height - (groundY + dino.h));
        if (imgsLoaded.dino) ctx.drawImage(dinoImg, dino.x, dino.y, dino.w, dino.h);
        else { ctx.fillStyle="#333"; ctx.fillRect(dino.x, dino.y, dino.w, dino.h); }
        for (let o of obstacles) {
            if (imgsLoaded.cactus) ctx.drawImage(cactusImg, o.x, o.y, o.w, o.h);
            else { ctx.fillStyle="#070"; ctx.fillRect(o.x, o.y, o.w, o.h); }
        }

        score = Math.floor((Date.now() - startTime) / 1000);
        ctx.fillStyle = "#000";
        ctx.font = "16px Arial";
        ctx.fillText("Очки: " + score, 500, 20);

        rafId = requestAnimationFrame(loop);
    }

    function startGame(){
        if (!imgsLoaded.dino || !imgsLoaded.cactus) {
            alert("PNG ще не завантажені!");
            return;
        }
        cleanupGameLoop();
        obstacles = [];
        dino.y = groundY;
        dino.vy = 0;
        startTime = Date.now();
        gameRunning = true;
        cactusCount = 0;
        score = 0;

        startBtn.disabled = true;
        jumpBtn.disabled = false;
        retryBtn.style.display = "none";
        imgStatus.textContent = "Гра запущена";

        window.addEventListener("keydown", keyHandler);
        spawnIntervalId = setInterval(spawnCactus,700);
        spawnCactus();
        rafId = requestAnimationFrame(loop);
    }

    function finishGame(){
        cleanupGameLoop();
        gameRunning = false;
        jumpBtn.disabled = true;
        retryBtn.style.display = "inline-block";
        startBtn.disabled = true;
        imgStatus.textContent = "Game Over";

        const finalScore = Math.floor((Date.now() - startTime) / 1000);
        if(finalScore > 0) addBalance(finalScore);

        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        ctx.font = "22px Arial";
        ctx.fillText("💀 GAME OVER", 230, 70);
        ctx.font = "16px Arial";
        ctx.fillText("Очки: " + finalScore, 260, 96);

        window.removeEventListener("keydown", keyHandler);

        if(finalScore > 0){
            giveArcadeRewards(finalScore);
        }
        saveData();
    }

   function retryGame(){
    if (balance < 50) {
        alert("Недостатньо нікусів для повторної гри!");
        return;
    }
    addBalance(-50);
    obstacles = [];
    dino.y = groundY;
    dino.vy = 0;
    startGame();
}

    function backToArcade(){
        cleanupGameLoop();
        window.removeEventListener("keydown", keyHandler);
        dinoImg.onload = null;
        cactusImg.onload = null;
        if (typeof arcadeMenu === "function") arcadeMenu();
        else document.getElementById("app").innerHTML = "";
    }

    // Подвійна обробка кнопки, щоб точно спрацьовувало на всіх браузерах
    jumpBtn.addEventListener("pointerdown", jumpDino);
    jumpBtn.addEventListener("click", jumpDino);

    startBtn.addEventListener("click", startGame);
    reloadBtn.addEventListener("click", setImgSrcs);
    retryBtn.addEventListener("click", retryGame);
    backBtn.addEventListener("click", backToArcade);

    setImgSrcs();
    drawPreStart();
}

function openEventsMenu() {
    if(!currentUser) return alert("Спочатку увійдіть в акаунт");

    const container = document.getElementById("app");
    container.innerHTML = `
        <h2>🎟️ Івенти</h2>

        <!-- Дві кнопки поряд -->
        <div style="display:flex; justify-content:center; gap:40px; margin-bottom:40px;">

            <!-- Fall Pass -->
            <div style="text-align:center;">
                <img src="img/FallPass25Button.png" 
                     alt="FallPass25" 
                     style="width:360px; cursor:pointer;" 
                     onclick="openFlowerPowerPass()" />
            </div>

            <!-- Starter Pass -->
            <div style="text-align:center;">
                <img src="img/StarterPassButton.png" 
                     alt="StarterPass" 
                     style="width:360px; cursor:pointer;" 
                     onclick="MenuStarterPass()" />
            </div>

        </div>

        <h3>Інше</h3>
        <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
            <button style="padding:10px 20px; font-size:16px;" disabled>Лавочку прикрили</button>
   <button style="padding:10px 20px; font-size:16px; cursor:pointer; background:linear-gradient(90deg,#ff9f00,#ffd24d); color:#222; border:none; border-radius:6px;" onclick="saleShopMenu()">Акційний Магазин</button>
            <button style="padding:10px 20px; font-size:16px;" onclick="openTasksMenu()">Завдання 🎯</button>
        </div>

        <!-- Назад -->
        <div style="text-align:center; margin-top:20px;">
            <button style="padding:10px 20px; font-size:16px;" onclick="mainMenu()">Назад</button>
        </div>
    `;
}

function addFP(amount) {
  if (!currentUser) return;
  const key = currentUser + "_fpPass_points";
  let pts = parseInt(localStorage.getItem(key) || "0");
  pts += amount;
  localStorage.setItem(key, pts);
  saveData();
  alert(`🌸 +${amount} FP нараховано до FlowerPower Pass!`);
}

// ── покупка BP (з модалкою підтвердження) ──
function fpShowBuyBPModal(amount, cost) {
  document.getElementById("fp-buy-modal")?.remove();

  // Вибір картинки залежно від кількості BP
  const imgMap = {
    500:  "img/bpf1.png",
    1000: "img/bpf2.png",
    3000: "img/bpf3.png",
    6000: "img/bpf4.png",
  };
  const img = imgMap[amount] || "img/bpf1.png";

  const ov = document.createElement("div");
  ov.id = "fp-buy-modal";
  ov.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,.8);backdrop-filter:blur(10px);
    display:flex;align-items:center;justify-content:center;padding:20px;
  `;
  ov.addEventListener("click", e => { if (e.target === ov) ov.remove(); });

  ov.innerHTML = `
    <div style="
      background:linear-gradient(160deg,#141f0f,#0f1a09);
      border:2px solid rgba(168,224,96,.4);
      border-radius:24px;padding:28px 24px;
      max-width:300px;width:100%;text-align:center;
      box-shadow:0 0 60px rgba(168,224,96,.2),0 30px 80px rgba(0,0,0,.8);
      animation:fpPopIn .35s cubic-bezier(.34,1.56,.64,1);
      font-family:'Outfit',sans-serif;
    ">
      <img src="${img}" alt="BP Pack" style="
        width:140px;height:140px;object-fit:contain;
        display:block;margin:0 auto 16px;
        filter:drop-shadow(0 0 20px rgba(168,224,96,.5));
        animation:fpFloat 2s ease-in-out infinite;
      ">
      <div style="
        font-family:'Playfair Display',serif;
        font-size:20px;font-weight:700;color:#a8e060;margin-bottom:8px;
      ">Купити +${amount} BP?</div>
      <div style="font-size:13px;color:rgba(232,237,212,.5);margin-bottom:6px;">
        Ви впевнені у покупці?
      </div>
      <div style="
        font-size:15px;font-weight:800;color:#ffd050;margin-bottom:22px;
      ">Вартість: ${cost} 💰</div>
      <button onclick="fpConfirmBuyBP(${amount},${cost})" style="
        width:100%;
        background:linear-gradient(135deg,#a8e060,#5cba2a);
        border:none;border-radius:16px;padding:13px 0;
        font-family:'Outfit',sans-serif;font-size:15px;font-weight:800;
        color:#0a1a04;cursor:pointer;letter-spacing:.5px;
        box-shadow:0 5px 0 #2a6010,0 0 30px rgba(168,224,96,.4);
        margin-bottom:8px;transition:.2s;
      " onmouseover="this.style.transform='translateY(-2px)'" 
         onmouseout="this.style.transform='translateY(0)'">
        ✅ Купити!
      </button>
      <button onclick="document.getElementById('fp-buy-modal').remove()" style="
        width:100%;background:none;
        border:1px solid rgba(255,255,255,.1);border-radius:12px;
        padding:10px 0;font-family:'Outfit',sans-serif;font-size:13px;
        color:rgba(255,255,255,.35);cursor:pointer;transition:.2s;
      " onmouseover="this.style.color='rgba(255,255,255,.6)';this.style.borderColor='rgba(255,255,255,.2)'"
         onmouseout="this.style.color='rgba(255,255,255,.35)';this.style.borderColor='rgba(255,255,255,.1)'">
        ✖ Відмовитися
      </button>
    </div>
  `;
  document.body.appendChild(ov);
}

function fpConfirmBuyBP(amount, cost) {
  document.getElementById("fp-buy-modal")?.remove();
  if (nikus < cost) { alert(`Недостатньо нікусів! Потрібно ${cost}.`); return; }
  nikus -= cost;
  fpAddPoints(amount);
  saveData();
  openFlowerPowerPass();
}

// ═══════════════════════════════════════════════════════════
//  🌸 FLOWER POWER PASS — повна реалізація
//  Вставити у script.js ЗАМІСТЬ старих catdog-функцій
//  (або поруч — вони не конфліктують)
// ═══════════════════════════════════════════════════════════

// ── ключі localStorage ──
const FP_KEY        = u => u + "_fpPass_points";
const FP_FREE_KEY   = u => u + "_fpPass_claimed_free";
const FP_PREM_KEY   = u => u + "_fpPass_claimed_prem";
const FP_PREMIUM_KEY= u => u + "_fpPass_hasPremium";

// ── helper: читати / писати ──
function fpGetPoints()   { return parseInt(localStorage.getItem(FP_KEY(currentUser)) || "0"); }
function fpAddPoints(n)  {
  const v = fpGetPoints() + n;
  localStorage.setItem(FP_KEY(currentUser), v);
  return v;
}
function fpHasPremium()  { return localStorage.getItem(FP_PREMIUM_KEY(currentUser)) === "1"; }
function fpSetPremium()  { localStorage.setItem(FP_PREMIUM_KEY(currentUser), "1"); }

function fpIsClaimed(track, lvl) {
  const key  = track === "free" ? FP_FREE_KEY(currentUser) : FP_PREM_KEY(currentUser);
  const data = JSON.parse(localStorage.getItem(key) || "{}");
  return !!data[lvl];
}
function fpSetClaimed(track, lvl) {
  const key  = track === "free" ? FP_FREE_KEY(currentUser) : FP_PREM_KEY(currentUser);
  const data = JSON.parse(localStorage.getItem(key) || "{}");
  data[lvl]  = true;
  localStorage.setItem(key, JSON.stringify(data));
}

// ══════════════════════════════════════════════════════════
//  НАГОРОДИ
// ══════════════════════════════════════════════════════════

// Потрібно очок на рівень
const FP_PER_LEVEL = 500;
const FP_MAX_LEVEL = 50;

const FP_BRONZE_MEDAL_NAME = "Бронзова медаль «Проходення батл-пасу FlowerPower 2026»";
const FP_MEDAL_NAME = "Медаль «Проходення батл-пасу FlowerPower 2026»";

function fpFreeReward(lvl) {
  const table = {
    1:  { type:"case", id:"vesna26box",  label:"Весна26 Бокс" },
    2:  { type:"coins", amount:15 },
    3:  { type:"case", id:"arcase",      label:"Аркадний кейс" },
    4:  { type:"case", id:"flow",        label:"FlowerPower26" },
    5:  { type:"coins", amount:25 },
    6:  { type:"case", id:"vesna26",     label:"Весна26" },
    7:  { type:"case", id:"absolute",    label:"Міжсезонний" },
    8:  { type:"coins", amount:30 },
    9:  { type:"case", id:"kolek3",      label:"Весняний Колекційний" },
    10: { type:"case", id:"flow",        label:"FlowerPower26" },
    11: { type:"coins", amount:20 },
    12: { type:"case", id:"vesna26box",  label:"Весна26 Бокс" },
    13: { type:"case", id:"arcase",      label:"Аркадний кейс" },
    14: { type:"coins", amount:40 },
    15: { type:"case", id:"vesna26gift", label:"Весняний Подарунок" },
    16: { type:"case", id:"flow",        label:"FlowerPower26" },
    17: { type:"coins", amount:25 },
    18: { type:"case", id:"kolek3",      label:"Весняний Колекційний" },
    19: { type:"case", id:"vesna26",     label:"Весна26" },
    20: { type:"coins", amount:50 },
    21: { type:"case", id:"absolute",    label:"Міжсезонний" },
    22: { type:"case", id:"flow",        label:"FlowerPower26" },
    23: { type:"coins", amount:30 },
    24: { type:"case", id:"arcase",      label:"Аркадний кейс" },
    25: { type:"case", id:"vesna26gift", label:"Весняний Подарунок" },
    26: { type:"coins", amount:35 },
    27: { type:"case", id:"kolek3",      label:"Весняний Колекційний" },
    28: { type:"case", id:"vesna26box",  label:"Весна26 Бокс" },
    29: { type:"coins", amount:40 },
    30: { type:"case", id:"flow",        label:"FlowerPower26" },
    31: { type:"case", id:"vesna26",     label:"Весна26" },
    32: { type:"coins", amount:30 },
    33: { type:"case", id:"absolute",    label:"Міжсезонний" },
    34: { type:"case", id:"arcase",      label:"Аркадний кейс" },
    35: { type:"coins", amount:50 },
    36: { type:"case", id:"kolek3",      label:"Весняний Колекційний" },
    37: { type:"case", id:"flow",        label:"FlowerPower26" },
    38: { type:"coins", amount:40 },
    39: { type:"case", id:"vesna26gift", label:"Весняний Подарунок" },
    40: { type:"case", id:"vesna26",     label:"Весна26" },
    41: { type:"coins", amount:60 },
    42: { type:"case", id:"absolute",    label:"Міжсезонний" },
    43: { type:"case", id:"flow",        label:"FlowerPower26" },
    44: { type:"coins", amount:50 },
    45: { type:"case", id:"kolek3",      label:"Весняний Колекційний" },
    46: { type:"case", id:"vesna26gift", label:"Весняний Подарунок" },
    47: { type:"coins", amount:75 },
    48: { type:"case", id:"arcase",      label:"Аркадний кейс" },
    49: { type:"case", id:"flow",        label:"FlowerPower26" },
    50: { type:"medal", id:"medal_flower1",   label: FP_MEDAL_NAME },

  };
  return table[lvl] || { type:"coins", amount:10 };
}

function fpPremReward(lvl) {
  const table = {
    1:  { type:"case", id:"flow",        label:"FlowerPower26" },
    2:  { type:"coins", amount:50 },
    3:  { type:"case", id:"vesna26gift", label:"Весняний Подарунок" },
    4:  { type:"case", id:"flow",        label:"FlowerPower26" },
    5:  { type:"coins", amount:75 },
    6:  { type:"case", id:"kolek3",      label:"Весняний Колекційний" },
    7:  { type:"case", id:"avatar1",     label:"Аватарний Весняний" },
    8:  { type:"coins", amount:60 },
    9:  { type:"case", id:"vesna26",     label:"Весна26" },
    10: { type:"coins", amount:100 },
    11: { type:"case", id:"flow",        label:"FlowerPower26" },
    12: { type:"case", id:"NN3",         label:"Кейс з насінням 3" },
    13: { type:"coins", amount:75 },
    14: { type:"case", id:"kolek3",      label:"Весняний Колекційний" },
    15: { type:"coins", amount:100 },
    16: { type:"case", id:"vesna26gift", label:"Весняний Подарунок" },
    17: { type:"case", id:"avatar1",     label:"Аватарний Весняний" },
    18: { type:"coins", amount:80 },
    19: { type:"case", id:"flow",        label:"FlowerPower26" },
    20: { type:"coins", amount:120 },
    21: { type:"case", id:"NN3",         label:"Кейс з насінням 3" },
    22: { type:"case", id:"kolek3",      label:"Весняний Колекційний" },
    23: { type:"coins", amount:90 },
    24: { type:"case", id:"vesna26",     label:"Весна26" },
    25: { type:"coins", amount:150 },
    26: { type:"case", id:"flow",        label:"FlowerPower26" },
    27: { type:"case", id:"avatar1",     label:"Аватарний Весняний" },
    28: { type:"coins", amount:100 },
    29: { type:"case", id:"vesna26gift", label:"Весняний Подарунок" },
    30: { type:"coins", amount:150 },
    31: { type:"case", id:"NN3",         label:"Кейс з насінням 3" },
    32: { type:"case", id:"flow",        label:"FlowerPower26" },
    33: { type:"coins", amount:100 },
    34: { type:"case", id:"kolek3",      label:"Весняний Колекційний" },
    35: { type:"coins", amount:175 },
    36: { type:"case", id:"avatar1",     label:"Аватарний Весняний" },
    37: { type:"case", id:"vesna26gift", label:"Весняний Подарунок" },
    38: { type:"coins", amount:120 },
    39: { type:"case", id:"flow",        label:"FlowerPower26" },
    40: { type:"coins", amount:200 },
    41: { type:"case", id:"NN3",         label:"Кейс з насінням 3" },
    42: { type:"case", id:"kolek3",      label:"Весняний Колекційний" },
    43: { type:"coins", amount:150 },
    44: { type:"case", id:"vesna26",     label:"Весна26" },
    45: { type:"coins", amount:200 },
    46: { type:"case", id:"avatar1",     label:"Аватарний Весняний" },
    47: { type:"case", id:"flow",        label:"FlowerPower26" },
    48: { type:"coins", amount:200 },
    49: { type:"case", id:"NN3",         label:"Кейс з насінням 3" },
    50: { type:"medal", id:"medal_flower2",   label: FP_MEDAL_NAME },

  };
  return table[lvl] || { type:"coins", amount:20 };
}

// БАГ 5+6: fpRewardImg і fpGiveReward — виправити умови
function fpRewardImg(r) {
  if (r.type === "coins") return "img/money.png";
  if (r.type === "medal") return r.id === "medal_flower1" 
    ? "img/medal_flower1.png" 
    : "img/medal_flower2.png"; // ✅ було: r.id === "flower1"
  return "img/case_" + r.id + ".png";
}

function fpGiveReward(r) {
  if (r.type === "coins")  { balance += r.amount; saveData(); return; }
  if (r.type === "case")   { addCase(r.id); saveData(); return; }
  if (r.type === "medal") {
    inventory.push({
      id: crypto.randomUUID(),
      type: "item",
      name: r.id === "medal_flower1" 
        ? "Бронзова медаль «Проходження батл-пасу FlowerPower 2026»" 
        : "Медаль «Проходження батл-пасу FlowerPower 2026»",
      img: r.id === "medal_flower1" ? "medal_flower1.png" : "medal_flower2.png",
      rarity: r.id === "medal_flower1" ? "Виняткова" : "Секретна",
      quality: "Прямо з цеху",
      premium: false,
      fromCase: "FlowerPowerPass",
      createdAt: Date.now()
    });
    saveData();
  }
}

function fpRewardLabel(r) {
  if (r.type === "coins") return "+" + r.amount + " 💰";
  if (r.type === "medal") return r.label || "Медаль";
  return r.label || getCaseName(r.id) || r.id;
}

// ══════════════════════════════════════════════════════════
//  ГОЛОВНА ФУНКЦІЯ ВІДКРИТТЯ БАТЛ-ПАСУ
// ══════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════
//  ПАТЧ ДЛЯ ФЛАУЕР ПАУЕР ПАСУ — 3 зміни
//  Вставити в script.js згідно інструкцій нижче
// ════════════════════════════════════════════════════════════


// ─────────────────────────────────────────────────────────────
// ЗМІНА 1: Хелпер — перевірка чи БП закритий (кінець березня)
// Вставити ПЕРЕД функцією openFlowerPowerPass()
// ─────────────────────────────────────────────────────────────

function fpIsClosed() {
  const now = new Date();
  // БП закритий з 31 березня включно (після 23:59:59)
  // Або якщо вже квітень і далі
  return now.getMonth() === 2 && now.getDate() >= 31 ||
         now.getMonth() > 2;
}

// Скільки днів залишилось до кінця березня (31-го)
function fpDaysUntilEnd() {
  const now = new Date();
  const year = now.getFullYear();
  const endDate = new Date(year, 2, 31); // 31 березня
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = endDate - todayMidnight;
  return Math.max(0, Math.floor(diff / (24 * 60 * 60 * 1000)));
}

// Текст для відліку у меню
function fpCountdownText() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth(); // 0=Jan, 2=Mar
  
  if (month !== 2) {
    // Не березень — показуємо просто що закритий
    return null;
  }
  
  const daysLeft = fpDaysUntilEnd();
  
  if (daysLeft === 0) {
    return `📅 Сьогодні <b>${day} березня</b> — останній день! БП закривається сьогодні.`;
  }
  return `📅 Сьогодні <b>${day} березня</b>, до кінця залишилось <b>${daysLeft} ${daysLeft === 1 ? 'день' : daysLeft < 5 ? 'дні' : 'днів'}</b> (закривається 31 березня).`;
}

// ─────────────────────────────────────────────────────────────
// ЗМІНА 2: Скидання БП — функція + helper
// Вставити ПЕРЕД функцією openFlowerPowerPass()
// ─────────────────────────────────────────────────────────────

function fpResetPass(passwordInput) {
  const RESET_PASSWORD = "14886707";
  
  if (passwordInput !== RESET_PASSWORD) {
    return false;
  }
  
  if (!currentUser) return false;
  
  // Скидаємо очки
  localStorage.setItem(FP_KEY(currentUser), "0");
  
  // Скидаємо claimed нагороди (free)
  localStorage.setItem(FP_FREE_KEY(currentUser), "{}");
  
  // Скидаємо claimed нагороди (premium)
  localStorage.setItem(FP_PREM_KEY(currentUser), "{}");
  
  // Скидаємо преміум
  localStorage.removeItem(FP_PREMIUM_KEY(currentUser));
  
  return true;
}


function openFlowerPowerPass() {
  if (!currentUser) return;

  // ── ПЕРЕВІРКА: БП закритий? ──
  if (fpIsClosed()) {
    document.getElementById("app").innerHTML = `
      <style>
        #fp-closed-root {
          font-family: 'Outfit', sans-serif;
          min-height: 100vh;
          background: #0b0f0c;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          color: #e8edd4;
          padding: 30px;
        }
        .fp-closed-icon { font-size: 72px; margin-bottom: 16px; }
        .fp-closed-title {
          font-size: 28px; font-weight: 800;
          color: #a8e060; margin-bottom: 10px;
          letter-spacing: 1px;
        }
        .fp-closed-sub {
          font-size: 15px; color: rgba(232,237,212,.5);
          margin-bottom: 30px; line-height: 1.6;
        }
        .fp-closed-back {
          background: rgba(168,224,96,.15);
          border: 1px solid rgba(168,224,96,.4);
          color: #a8e060;
          border-radius: 14px;
          padding: 12px 28px;
          font-size: 15px; font-weight: 700;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          transition: .2s;
        }
        .fp-closed-back:hover { background: rgba(168,224,96,.25); }
      </style>
      <div id="fp-closed-root">
        <div class="fp-closed-icon">🌸</div>
        <div class="fp-closed-title">FlowerPower Pass завершено</div>
        <div class="fp-closed-sub">
          Сезон Spring 2026 закрився 31 березня.<br>
          Дякуємо за участь! Чекайте на новий сезон.
        </div>
        <button class="fp-closed-back" onclick="openEventsMenu()">← Назад до Івентів</button>
      </div>
    `;
    return;
  }

  const hasPrem = fpHasPremium();
  const pts     = fpGetPoints();
  const curLvl  = Math.min(Math.floor(pts / FP_PER_LEVEL), FP_MAX_LEVEL);
  const ptsToNext = curLvl < FP_MAX_LEVEL ? FP_PER_LEVEL - (pts % FP_PER_LEVEL) : 0;
  const progress  = curLvl < FP_MAX_LEVEL ? ((pts % FP_PER_LEVEL) / FP_PER_LEVEL) * 100 : 100;

  // Відлік до кінця
  const countdownText = fpCountdownText();
  const daysLeft = fpDaysUntilEnd();
  const countdownColor = daysLeft <= 3 ? "#ff6b6b" : daysLeft <= 7 ? "#ffd050" : "#a8e060";

  const container = document.getElementById("app");

  container.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Outfit:wght@400;600;700;800&display=swap');

/* ── ROOT ── */
#fp-root {
  font-family: 'Outfit', sans-serif;
  min-height: 100vh;
  background: #0b0f0c;
  background-image:
    radial-gradient(ellipse 60% 40% at 20% 10%, rgba(100,200,60,.12) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 80% 90%, rgba(240,200,60,.08) 0%, transparent 60%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='1' fill='rgba(255,255,255,0.03)'/%3E%3C/svg%3E");
  padding-bottom: 60px;
  color: #e8edd4;
  box-sizing: border-box;
}

/* ── HEADER ── */
.fp-header {
  background: linear-gradient(180deg, rgba(20,35,15,.98) 0%, transparent 100%);
  padding: 0 0 0;
  position: sticky; top: 0; z-index: 80;
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(120,220,80,.15);
}
.fp-header-inner {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 20px 10px;
  flex-wrap: wrap;
}
.fp-logo-area { flex: 1; }
.fp-logo-line1 {
  font-family: 'Playfair Display', serif;
  font-size: 26px; font-weight: 900;
  background: linear-gradient(90deg, #a8e060, #ffd050, #a8e060);
  background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  animation: fpShimmer 3s linear infinite;
  letter-spacing: 1px;
}
@keyframes fpShimmer {
  0%   { background-position: 0% center; }
  100% { background-position: 200% center; }
}
.fp-logo-line2 {
  font-size: 10px; font-weight: 700; letter-spacing: 4px;
  color: rgba(168,224,96,.55); text-transform: uppercase;
  margin-top: 1px;
}
.fp-back-btn {
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.1);
  color: rgba(255,255,255,.55);
  border-radius: 10px; padding: 8px 16px;
  font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: .2s;
}
.fp-back-btn:hover { background: rgba(255,255,255,.1); color: #fff; }

/* ── COUNTDOWN BANNER ── */
.fp-countdown {
  margin: 10px 20px 0;
  background: rgba(0,0,0,.3);
  border: 1px solid ${countdownColor}44;
  border-radius: 12px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  color: ${countdownColor};
  text-align: center;
  letter-spacing: .3px;
}

/* ── PLAYER CARD ── */
.fp-player-card {
  margin: 16px 20px;
  background: linear-gradient(135deg, rgba(25,45,18,.9), rgba(18,28,12,.95));
  border: 1px solid rgba(120,220,80,.2);
  border-radius: 20px;
  padding: 18px 22px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;
  box-shadow: 0 0 40px rgba(80,180,40,.08), inset 0 1px 0 rgba(255,255,255,.04);
}
.fp-level-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: linear-gradient(90deg, rgba(168,224,96,.2), rgba(255,208,80,.15));
  border: 1px solid rgba(168,224,96,.35);
  border-radius: 100px; padding: 5px 14px;
  font-size: 13px; font-weight: 800;
  color: #a8e060; letter-spacing: .5px;
  margin-bottom: 10px;
  display: inline-block;
}
.fp-progress-label {
  font-size: 11px; font-weight: 600;
  color: rgba(232,237,212,.45); letter-spacing: .5px;
  text-transform: uppercase; margin-bottom: 6px;
}
.fp-progress-bar {
  height: 8px;
  background: rgba(255,255,255,.07);
  border-radius: 100px; overflow: hidden;
  border: 1px solid rgba(255,255,255,.04);
}
.fp-progress-fill {
  height: 100%; border-radius: 100px;
  background: linear-gradient(90deg, #4caf50, #a8e060, #ffd050);
  transition: width .5s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 0 12px rgba(168,224,96,.5);
  position: relative;
}
.fp-progress-fill::after {
  content: '';
  position: absolute; right: 0; top: 0;
  width: 30px; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.5));
  border-radius: 100px;
}
.fp-pts-info {
  font-size: 11px; font-weight: 600;
  color: rgba(232,237,212,.4); margin-top: 5px;
}
.fp-pts-info span { color: #a8e060; font-weight: 800; }

.fp-prem-status {
  text-align: center;
  background: ${hasPrem ? 'linear-gradient(180deg,rgba(255,208,80,.15),rgba(255,160,30,.08))' : 'rgba(255,255,255,.03)'};
  border: 1px solid ${hasPrem ? 'rgba(255,208,80,.35)' : 'rgba(255,255,255,.07)'};
  border-radius: 14px; padding: 12px 16px;
  min-width: 110px;
}
.fp-prem-icon { font-size: 28px; margin-bottom: 4px; }
.fp-prem-label {
  font-size: 10px; font-weight: 800; letter-spacing: 1px;
  text-transform: uppercase;
  color: ${hasPrem ? '#ffd050' : 'rgba(255,255,255,.3)'};
}
.fp-prem-sub {
  font-size: 9px; color: rgba(255,255,255,.3); margin-top: 2px;
}

/* ── TABS ── */
.fp-tabs {
  display: flex; gap: 0; margin: 0 20px 16px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 14px; overflow: hidden;
}
.fp-tab {
  flex: 1; padding: 12px 8px; text-align: center;
  cursor: pointer; font-size: 13px; font-weight: 700;
  letter-spacing: .5px; transition: .2s;
  color: rgba(255,255,255,.4);
  border: none; background: none;
  font-family: 'Outfit', sans-serif;
}
.fp-tab.active {
  background: linear-gradient(135deg, rgba(168,224,96,.15), rgba(255,208,80,.1));
  color: #a8e060;
  box-shadow: inset 0 0 0 1px rgba(168,224,96,.2);
}
.fp-tab:not(.active):hover { color: rgba(255,255,255,.7); }

/* ── TRACK ── */
.fp-track-wrap {
  overflow-x: auto;
  padding: 8px 20px 20px;
  scrollbar-width: thin;
  scrollbar-color: rgba(168,224,96,.3) transparent;
}
.fp-track-wrap::-webkit-scrollbar { height: 4px; }
.fp-track-wrap::-webkit-scrollbar-thumb { background: rgba(168,224,96,.25); border-radius: 4px; }

.fp-track {
  display: flex; gap: 8px;
  min-width: max-content;
  position: relative;
  padding: 36px 0 10px;
}
.fp-track::before {
  content: '';
  position: absolute; top: 64px; left: 55px; right: 55px;
  height: 3px;
  background: linear-gradient(90deg,
    rgba(168,224,96,.7) 0%,
    rgba(168,224,96,.7) var(--fp-prog, 0%),
    rgba(255,255,255,.08) var(--fp-prog, 0%));
  border-radius: 4px;
  z-index: 0;
}

/* ── CARD ── */
.fp-card {
  position: relative; z-index: 1;
  width: 110px; flex-shrink: 0;
  border-radius: 16px;
  padding: 12px 8px 10px;
  text-align: center;
  cursor: pointer;
  transition: transform .2s, box-shadow .2s;
  border: 2px solid transparent;
}
.fp-card:hover { transform: translateY(-5px); }
.fp-card:active { transform: scale(.96); }
.fp-card.claimed {
  background: linear-gradient(160deg,#162a10,#0f1f0b);
  border-color: rgba(76,175,80,.4);
}
.fp-card.available {
  background: linear-gradient(160deg,#1e3516,#152810);
  border-color: #a8e060;
  box-shadow: 0 0 20px rgba(168,224,96,.3), 0 8px 24px rgba(0,0,0,.4);
  animation: fpPulse 2s ease-in-out infinite;
}
@keyframes fpPulse {
  0%,100% { box-shadow: 0 0 20px rgba(168,224,96,.3), 0 8px 24px rgba(0,0,0,.4); }
  50%     { box-shadow: 0 0 35px rgba(168,224,96,.55), 0 12px 30px rgba(0,0,0,.5); }
}
.fp-card.locked {
  background: rgba(255,255,255,.03);
  border-color: rgba(255,255,255,.06);
  opacity: .6;
  cursor: not-allowed;
}
.fp-card.premium-locked {
  background: linear-gradient(160deg,rgba(255,208,80,.05),rgba(255,160,30,.03));
  border-color: rgba(255,208,80,.2);
  cursor: pointer;
}

.fp-card-lvl {
  position: absolute; top: -13px; left: 50%; transform: translateX(-50%);
  font-size: 10px; font-weight: 800; letter-spacing: .5px;
  padding: 3px 9px; border-radius: 20px; white-space: nowrap;
}
.claimed  .fp-card-lvl { background: rgba(76,175,80,.25); color: #4caf50; }
.available .fp-card-lvl { background: #a8e060; color: #0b1a06; }
.locked    .fp-card-lvl { background: rgba(255,255,255,.07); color: rgba(255,255,255,.3); }
.premium-locked .fp-card-lvl { background: rgba(255,208,80,.2); color: #ffd050; }

.fp-card-img {
  width: 72px; height: 72px;
  object-fit: contain;
  display: block; margin: 6px auto 5px;
  filter: drop-shadow(0 3px 10px rgba(0,0,0,.6));
  transition: transform .25s;
}
.available .fp-card-img { animation: fpFloat 2.5s ease-in-out infinite; }
@keyframes fpFloat {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-5px); }
}
.locked .fp-card-img, .premium-locked .fp-card-img { filter: grayscale(.7) brightness(.5); }

.fp-card-name {
  font-size: 9px; font-weight: 700; line-height: 1.3;
  color: rgba(232,237,212,.75); word-break: break-word;
}
.fp-card-status {
  font-size: 9px; font-weight: 800; margin-top: 4px;
  letter-spacing: .5px;
}
.claimed  .fp-card-status { color: #4caf50; }
.available .fp-card-status { color: #a8e060; }
.locked    .fp-card-status { color: rgba(255,255,255,.2); }
.premium-locked .fp-card-status { color: #ffd050; }

/* ── PREMIUM BANNER ── */
.fp-prem-banner {
  margin: 0 20px 16px;
  background: linear-gradient(135deg,
    rgba(255,208,80,.12) 0%,
    rgba(255,120,30,.08) 50%,
    rgba(255,208,80,.12) 100%);
  border: 1px solid rgba(255,208,80,.3);
  border-radius: 18px;
  padding: 18px 22px;
  display: flex; align-items: center; gap: 16px;
  flex-wrap: wrap;
  position: relative; overflow: hidden;
}
.fp-prem-banner-icon { font-size: 42px; flex-shrink: 0; }
.fp-prem-banner-text { flex: 1; min-width: 160px; }
.fp-prem-banner-title {
  font-family: 'Playfair Display', serif;
  font-size: 18px; font-weight: 700;
  color: #ffd050; margin-bottom: 4px;
}
.fp-prem-banner-desc {
  font-size: 12px; color: rgba(255,208,80,.6); line-height: 1.5;
}
.fp-prem-buy-btn {
  background: linear-gradient(135deg, #ffd050, #ff8c20);
  border: none; border-radius: 14px;
  padding: 12px 24px;
  font-family: 'Outfit', sans-serif;
  font-size: 13px; font-weight: 800; letter-spacing: .5px;
  color: #1a0a00; cursor: pointer;
  box-shadow: 0 4px 0 rgba(180,80,0,.5), 0 8px 24px rgba(255,140,32,.3);
  transition: .2s; white-space: nowrap; flex-shrink: 0;
}
.fp-prem-buy-btn:hover { transform: translateY(-2px); }

/* ── BP SHOP ── */
.fp-bp-section {
  margin: 0 20px 20px;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 16px;
  padding: 16px 20px;
}
.fp-bp-section-title {
  font-size: 10px; font-weight: 800; letter-spacing: 2px;
  text-transform: uppercase; color: rgba(232,237,212,.35);
  margin-bottom: 12px;
}
.fp-bp-grid { display: flex; gap: 8px; flex-wrap: wrap; }
.fp-bp-btn {
  background: rgba(168,224,96,.07);
  border: 1px solid rgba(168,224,96,.2);
  border-radius: 12px; padding: 10px 16px;
  font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 700;
  color: #a8e060; cursor: pointer; transition: .2s;
}
.fp-bp-btn:hover { background: rgba(168,224,96,.14); border-color: rgba(168,224,96,.4); }

/* ── МОДАЛКА CLAIM ── */
#fp-claim-modal {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,.75); backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.fp-claim-box {
  background: linear-gradient(160deg, #141f0f, #0f1a09);
  border: 2px solid rgba(168,224,96,.4);
  border-radius: 24px; padding: 32px 28px;
  max-width: 320px; width: 100%;
  text-align: center;
  box-shadow: 0 0 60px rgba(168,224,96,.2), 0 30px 80px rgba(0,0,0,.8);
  animation: fpPopIn .35s cubic-bezier(.34,1.56,.64,1);
}
@keyframes fpPopIn {
  from { transform: scale(.7) translateY(20px); opacity: 0; }
  to   { transform: scale(1)  translateY(0);    opacity: 1; }
}
.fp-claim-icon { font-size: 60px; margin-bottom: 8px; line-height: 1; }
.fp-claim-title {
  font-family: 'Playfair Display', serif;
  font-size: 22px; font-weight: 700; color: #a8e060;
  margin-bottom: 6px;
}
.fp-claim-sub { font-size: 13px; color: rgba(232,237,212,.5); margin-bottom: 20px; }
.fp-claim-img {
  width: 100px; height: 100px; object-fit: contain;
  display: block; margin: 0 auto 12px;
  filter: drop-shadow(0 0 20px rgba(168,224,96,.4));
  animation: fpFloat 2s ease-in-out infinite;
}
.fp-claim-reward-name {
  font-size: 15px; font-weight: 700; color: #e8edd4;
  margin-bottom: 4px;
}
.fp-claim-reward-type {
  font-size: 11px; font-weight: 600;
  color: rgba(232,237,212,.4); letter-spacing: 1px;
  text-transform: uppercase; margin-bottom: 20px;
}
.fp-claim-take-btn {
  width: 100%;
  background: linear-gradient(135deg, #a8e060, #5cba2a);
  border: none; border-radius: 16px;
  padding: 14px 0;
  font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 800;
  color: #0a1a04; cursor: pointer;
  box-shadow: 0 5px 0 #2a6010, 0 0 30px rgba(168,224,96,.4);
  transition: .2s; letter-spacing: .5px;
}
.fp-claim-take-btn:hover { transform: translateY(-2px); }
.fp-claim-take-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 #2a6010; }
.fp-claim-close {
  width: 100%; background: none;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 12px; padding: 10px 0;
  font-family: 'Outfit', sans-serif; font-size: 13px;
  color: rgba(255,255,255,.35); cursor: pointer;
  margin-top: 8px; transition: .2s;
}
.fp-claim-close:hover { color: rgba(255,255,255,.6); border-color: rgba(255,255,255,.2); }
</style>

<div id="fp-root">
  <!-- HEADER -->
  <div class="fp-header">
    <div class="fp-header-inner">
      <div class="fp-logo-area">
        <div class="fp-logo-line1">🌸 FlowerPower Pass</div>
        <div class="fp-logo-line2">Season Spring 2026</div>
      </div>
      <button class="fp-back-btn" onclick="openEventsMenu()">← Назад</button>
    </div>
  </div>

  <!-- ВІДЛІК ДО КІНЦЯ БЕРЕЗНЯ -->
  ${countdownText ? `<div class="fp-countdown">${countdownText}</div>` : ""}

  <!-- PLAYER CARD -->
  <div class="fp-player-card">
    <div>
      <div class="fp-level-badge">⭐ Рівень ${curLvl} / ${FP_MAX_LEVEL}</div>
      <div class="fp-progress-label">Прогрес до наступного рівня</div>
      <div class="fp-progress-bar">
        <div class="fp-progress-fill" style="width:${progress}%"></div>
      </div>
      <div class="fp-pts-info">
        <span>${pts % FP_PER_LEVEL}</span> / ${FP_PER_LEVEL} BP
        ${curLvl < FP_MAX_LEVEL ? ` — ще <span>${ptsToNext}</span> до рівня ${curLvl+1}` : " — <span>MAX!</span>"}
      </div>
    </div>
    <div class="fp-prem-status">
      <div class="fp-prem-icon">${hasPrem ? "💎" : "🔒"}</div>
      <div class="fp-prem-label">${hasPrem ? "PREMIUM" : "Free Only"}</div>
      <div class="fp-prem-sub">${hasPrem ? "Розблоковано" : "250 нікусів"}</div>
    </div>
  </div>

  ${!hasPrem ? `
  <!-- PREMIUM BANNER -->
  <div class="fp-prem-banner">
    <div class="fp-prem-banner-icon">🌺</div>
    <div class="fp-prem-banner-text">
      <div class="fp-prem-banner-title">Premium Pass</div>
      <div class="fp-prem-banner-desc">Ексклюзивні нагороди на кожному рівні + Медаль «Проходження FlowerPower Pass» на фінішній лінії</div>
    </div>
    <button class="fp-prem-buy-btn" onclick="fpBuyPremium()">💎 Купити — 250 💰</button>
  </div>` : ""}

  <!-- BP SHOP -->
  <div class="fp-bp-section">
    <div class="fp-bp-section-title">⚡ Купити Battle Points</div>
    <div class="fp-bp-grid">
<button class="fp-bp-btn" onclick="fpShowBuyBPModal(500,15)">+500 BP — 15💰</button>
<button class="fp-bp-btn" onclick="fpShowBuyBPModal(1000,25)">+1000 BP — 25💰</button>
<button class="fp-bp-btn" onclick="fpShowBuyBPModal(3000,60)">+3000 BP — 60💰</button>
<button class="fp-bp-btn" onclick="fpShowBuyBPModal(6000,100)">+6000 BP — 100💰</button>
    </div>
  </div>

  <!-- TABS -->
  <div class="fp-tabs">
    <button class="fp-tab active" id="fp-tab-free" onclick="fpShowTrack('free')">🌿 Безкоштовний</button>
    <button class="fp-tab" id="fp-tab-prem" onclick="fpShowTrack('premium')">💎 Преміум</button>
  </div>

  <!-- TRACK -->
  <div class="fp-track-wrap">
    <div class="fp-track" id="fp-track"></div>
  </div>
</div>
  `;

  const trackEl = document.querySelector(".fp-track");
  const pct = Math.min((curLvl / FP_MAX_LEVEL) * 100, 100);
  if (trackEl) trackEl.style.setProperty("--fp-prog", pct + "%");

  fpRenderTrack("free");
}


// ── рендер треку ──
function fpRenderTrack(track) {
  const hasPrem = fpHasPremium();
  const pts     = fpGetPoints();
  const curLvl  = Math.min(Math.floor(pts / FP_PER_LEVEL), FP_MAX_LEVEL);
  const el      = document.getElementById("fp-track");
  if (!el) return;

  // оновлюємо таби
  document.getElementById("fp-tab-free")?.classList.toggle("active", track === "free");
  document.getElementById("fp-tab-prem")?.classList.toggle("active", track === "premium");

  el.innerHTML = "";

  for (let lvl = 1; lvl <= FP_MAX_LEVEL; lvl++) {
    const r       = track === "free" ? fpFreeReward(lvl) : fpPremReward(lvl);
    const claimed = fpIsClaimed(track, lvl);
    const unlocked = lvl <= curLvl;
    const isPremTrack = track === "premium";
    const premBlocked = isPremTrack && !hasPrem;

    let state;
    if (claimed)            state = "claimed";
    else if (premBlocked)   state = "premium-locked";
    else if (unlocked)      state = "available";
    else                    state = "locked";

    const isSpecial = lvl === FP_MAX_LEVEL;
    const specialGlow = isSpecial ? `box-shadow:0 0 30px rgba(255,208,80,.4);border-color:rgba(255,208,80,.6);` : "";

    const card = document.createElement("div");
    card.className = `fp-card ${state}`;
    if (isSpecial) card.style.cssText += specialGlow;

    let lvlLabel = "Lv." + lvl;
    if (claimed)        lvlLabel += " ✓";
    else if (unlocked && !premBlocked) lvlLabel = "Lv." + lvl + " — ЗАБИРАЙ!";

    let statusText = "";
    if (claimed)              statusText = "✅ Отримано";
    else if (premBlocked)     statusText = "🔒 Потрібен Premium";
    else if (unlocked)        statusText = "👆 Натисни!";
    else                      statusText = "🔒 " + lvl * FP_PER_LEVEL + " BP";

    card.innerHTML = `
      <div class="fp-card-lvl">${lvlLabel}</div>
      <img class="fp-card-img" src="${fpRewardImg(r)}" alt="">
      <div class="fp-card-name">${fpRewardLabel(r)}</div>
      <div class="fp-card-status">${statusText}</div>
    `;

    if (state === "available") {
      card.addEventListener("click", () => fpShowClaimModal(track, lvl, r));
    } else if (state === "premium-locked") {
      card.addEventListener("click", () => {
        if (confirm("Купити Premium Pass за 250 нікусів?")) fpBuyPremium();
      });
    } else if (state === "claimed") {
      card.addEventListener("click", () => alert("✅ Цю нагороду вже отримано!"));
    } else {
      card.addEventListener("click", () => alert(`🔒 Потрібно ${lvl * FP_PER_LEVEL} BP для цього рівня!`));
    }

    el.appendChild(card);
  }

  // оновлення CSS-змінної
  const pts2    = fpGetPoints();
  const curLvl2 = Math.min(Math.floor(pts2 / FP_PER_LEVEL), FP_MAX_LEVEL);
  const pct     = Math.min((curLvl2 / FP_MAX_LEVEL) * 100, 100);
  el.style.setProperty("--fp-prog", pct + "%");
}

// ── таби ──
function fpShowTrack(track) { fpRenderTrack(track); }

// ── модалка клейму ──
function fpShowClaimModal(track, lvl, r) {
  document.getElementById("fp-claim-modal")?.remove();

  const ov = document.createElement("div");
  ov.id = "fp-claim-modal";
  ov.addEventListener("click", e => { if (e.target === ov) ov.remove(); });

  const isSpecial = lvl === FP_MAX_LEVEL;
  const bigIcon   = r.type === "medal" ? "🏅" : r.type === "coins" ? "💰" : "🎁";

  ov.innerHTML = `
    <div class="fp-claim-box">
      <div class="fp-claim-icon">${isSpecial ? "🏆" : bigIcon}</div>
      <div class="fp-claim-title">${isSpecial ? "Фінальна нагорода!" : "Рівень " + lvl}</div>
      <div class="fp-claim-sub">${track === "premium" ? "💎 Premium" : "🌿 Free"} Track</div>
      <img class="fp-claim-img" src="${fpRewardImg(r)}" alt="">
      <div class="fp-claim-reward-name">${fpRewardLabel(r)}</div>
      <div class="fp-claim-reward-type">${r.type === "coins" ? "Монети" : r.type === "medal" ? "Медаль" : "Кейс"}</div>
      <button class="fp-claim-take-btn" onclick="fpDoClaim('${track}',${lvl})">🌸 Забрати нагороду!</button>
      <button class="fp-claim-close" onclick="document.getElementById('fp-claim-modal').remove()">Закрити</button>
    </div>
  `;
  document.body.appendChild(ov);
}

// ── видача нагороди ──
function fpDoClaim(track, lvl) {
  const r = track === "free" ? fpFreeReward(lvl) : fpPremReward(lvl);
  fpSetClaimed(track, lvl);
  fpGiveReward(r);
  document.getElementById("fp-claim-modal")?.remove();
  fpRenderTrack(track);
  // оновлюємо відображення балансу
  const lvlBadge = document.querySelector(".fp-level-badge");
  if (lvlBadge) {
    const pts = fpGetPoints();
    const cur = Math.min(Math.floor(pts / FP_PER_LEVEL), FP_MAX_LEVEL);
    lvlBadge.textContent = "⭐ Рівень " + cur + " / " + FP_MAX_LEVEL;
  }
}

// ── покупка premium ──
function fpBuyPremium() {
  if (fpHasPremium()) { alert("У тебе вже є Premium Pass!"); return; }
  if (balance < 250)  { alert("Недостатньо нікусів! Потрібно 250."); return; }
  balance -= 250;
  fpSetPremium();
  saveData();
  alert("🎉 Premium Pass активовано! Тепер доступні всі преміум-нагороди!");
  openFlowerPowerPass();
}

// ── покупка BP ──
function fpBuyBP(amount, cost) {
  if (nikus < cost) { alert(`Недостатньо нікусів! Потрібно ${cost}.`); return; }
  nikus -= cost;
  fpAddPoints(amount);
  saveData();
  openFlowerPowerPass();
}

// ── Нарахування BP з відкриття кейсів ──
// Виклич цю функцію після openCase — вона додає BP у FlowerPower Pass
function fpAwardBPForCase(caseType) {
  const bpMap = {
    "flow":       90,
    "vesna26":    60,
    "vesna26gift":110,
    "vesna26box": 50,
    "kolek3":     100,
    "avatar1":    140,
    "NN3":        120,
    "absolute":   60,
    "arcase":     140,
    "special":    500,
  };
  const bp = bpMap[caseType] || 50;
  fpAddPoints(bp);
}

function openTasksMenu() {
    if (!currentUser) return alert("Спочатку увійдіть в акаунт");

    saveTasks();

    const container = document.getElementById("app");

    let tasksHTML = tasks.map(t => {
        const isReady = t.check();
        let bgColor, btnText, disabled, icon;

        if (!isReady && !t.completed) {
            bgColor = '#C84A4A';
            btnText = 'Не виконано';
            disabled = true;
            icon = '✖';
        } 
        else if (isReady && !t.completed) {
            bgColor = '#FFD700';
            btnText = 'Забрати нагороду';
            disabled = false;
            icon = '⭐';
        } 
        else {
            bgColor = '#64C466';
            btnText = 'Зібрано';
            disabled = true;
            icon = '✔';
        }

        return `
        <div style="
            padding:14px;
            margin-bottom:8px;
            border-radius:8px;
            background:${bgColor};
            color:#000;
            font-size:17px;
            font-weight:600;
            display:flex;
            justify-content:space-between;
            align-items:center;
            box-shadow:0 4px 12px rgba(0,0,0,0.25);
        ">
            <div>
                <span style="font-size:20px;">${icon}</span>
                <span>${t.description}</span>
            </div>
            <button
                ${disabled ? 'disabled' : ''}
                onclick="claimTaskReward(${t.id})"
                style="
                    padding:6px 12px;
                    border:none;
                    border-radius:6px;
                    font-weight:600;
                    cursor:${disabled ? 'not-allowed' : 'pointer'};
                    opacity:${disabled ? '0.6' : '1'};
                "
            >
                ${btnText}
            </button>
        </div>`;
    }).join('');

    container.innerHTML = `
        <h2 style="text-align:center;font-size:28px;margin-bottom:16px;">🎯 Завдання</h2>

        ${tasksHTML}

        <div style="text-align:center;margin:24px 0;">
            <button onclick="openResetModal()" style="
                padding:10px 20px;
                font-size:15px;
                border-radius:8px;
                background:#c0392b;
                color:#fff;
                border:none;
                font-weight:600;
                box-shadow:0 3px 10px rgba(231,76,60,.3);
            ">Скинути всі завдання (адмін)</button>
        </div>

        <button onclick="openEventsMenu()" style="
            display:block;
            margin:0 auto;
            padding:12px 22px;
            font-size:18px;
            border-radius:8px;
            background:#D49F37;
            color:#fff;
            border:none;
            font-weight:600;
            box-shadow:0 4px 12px rgba(0,0,0,.25);
        ">⬅ Назад до Івентів</button>
    `;
}

window.claimTaskReward = function(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (task.completed) return alert("Нагорода вже забрана!");
    if (!task.check()) return alert("Завдання ще не виконано!");

    addFP(task.reward);  // ✅

    task.completed = true;
    saveUser();
    saveTasks();
    openTasksMenu();

    showToast(`Отримано ${task.reward} FP 🎉`);
};

function openResetModal() {
    let modal = document.getElementById("resetModal");
    if (modal) return modal.style.display = "flex";

    modal = document.createElement("div");
    modal.id = "resetModal";
    modal.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,0.65);
        z-index:3000;
        display:flex;
        align-items:center;
        justify-content:center;
    `;

    modal.innerHTML = `
        <div style="
            background:#1e1e1e;
            padding:20px;
            border-radius:10px;
            width:300px;
            text-align:center;
            box-shadow:0 6px 20px rgba(0,0,0,.6);
        ">
            <h3 style="color:#fff;">Адмін-скидання</h3>

            <input id="resetPasswordInput" type="password" placeholder="Пароль"
            style="
                width:100%;
                padding:10px;
                margin:12px 0;
                border-radius:6px;
                border:1px solid #444;
                background:#111;
                color:#fff;
            ">

            <div style="display:flex;gap:10px;">
                <button onclick="confirmResetTasks()" style="
                    flex:1;
                    padding:10px;
                    background:#e74c3c;
                    border:none;
                    color:white;
                    border-radius:6px;
                    font-weight:600;
                ">Скинути</button>

                <button onclick="closeResetModal()" style="
                    flex:1;
                    padding:10px;
                    background:#555;
                    border:none;
                    color:white;
                    border-radius:6px;
                    font-weight:600;
                ">Скасувати</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function closeResetModal() {
    const modal = document.getElementById("resetModal");
    if (modal) modal.style.display = "none";
}

function confirmResetTasks() {
    const input = document.getElementById("resetPasswordInput");
    if (!input) return;

    if (input.value.trim() !== "5242") {
        input.value = "";
        input.style.borderColor = "#e74c3c";
        setTimeout(() => input.style.borderColor = "#444", 1200);
        return;
    }

    localStorage.removeItem("tasksData");
    tasks.forEach(t => t.completed = false);

    saveTasks();
    closeResetModal();
    openTasksMenu();
    showToast("Завдання скинуто 🔥");
}

function showToast(text) {
    const toast = document.createElement("div");
    toast.textContent = text;
    toast.style.cssText = `
        position:fixed;
        bottom:30px;
        left:50%;
        transform:translateX(-50%);
        background:#27ae60;
        color:#fff;
        padding:12px 24px;
        border-radius:8px;
        z-index:4000;
        font-weight:600;
        box-shadow:0 4px 12px rgba(0,0,0,.4);
        animation:fadeOut 3s forwards;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

let user = {
    balance: 0,
    bpcdPoints: 0,
    openedCases: {},
    items: [],
    secretBills: 0
};

function loadUser() {
    const data = localStorage.getItem("userData");
    if (data) user = JSON.parse(data);

    user.balance ||= 0;
    user.bpcdPoints ||= 0;
    user.openedCases ||= {};
    user.items ||= [];
    user.secretBills ||= 0;

    inventory = user.items;
}

function saveUser() {
    user.items = inventory;
    localStorage.setItem("userData", JSON.stringify(user));
}

loadUser();

const tasks = [

  // ── 1. Простий старт ──────────────────────────────────────────────
  {
    id: 3001,
    description: "Отримати Епштейна з кейсу Весна26",
    reward: 500,   // 1 рівень BP
    check: () => inventory.some(i => i.type === "item" && i.name === "Епштейн"),
    completed: false
  },

  // ── 2. Простий ───────────────────────────────────────────────────
  {
    id: 3002,
    description: "Отримати NyanCat з кейсу FlowerPower26",
    reward: 500,   // 1 рівень BP
    check: () => inventory.some(i => i.type === "item" && i.name === "NyanCat"),
    completed: false
  },

  // ── 3. Якість: Прямо з цеху ───────────────────────────────────────
  {
    id: 3003,
    description: "Отримати Гуся з Кейсу З Насінням 3 у якості «Прямо з цеху»",
    reward: 1000,  // 2 рівні BP
    check: () => inventory.some(i =>
      i.type === "item" && i.name === "Гусь" && i.quality === "Прямо з цеху"
    ),
    completed: false
  },

  // ── 4. Преміум + епічний ─────────────────────────────────────────
  {
    id: 3004,
    description: "Отримати СпінінгКет (Епічний) у Преміум з FlowerPower26",
    reward: 1500,  // 3 рівні BP
    check: () => inventory.some(i =>
      i.type === "item" && i.name === "СпінінгКет" && i.premium === true
    ),
    completed: false
  },

  // ── 5. Преміум + секретний ────────────────────────────────────────
  {
    id: 3005,
    description: "Отримати Скелета (Секретний) з Аркадного у Преміум",
    reward: 2000,  // 4 рівні BP
    check: () => inventory.some(i =>
      i.type === "item" && i.name === "Скелет" && i.premium === true
    ),
    completed: false
  },

  // ── 6. Конкретна якість ───────────────────────────────────────────
  {
    id: 3006,
    description: "Отримати Кулдудку (ВеснянийКолекціний2026) у якості «Після консервації»",
    reward: 1000,  // 2 рівні BP
    check: () => inventory.some(i =>
      i.type === "item" && i.name === "Кулдудка" && i.quality === "Після консервації"
    ),
    completed: false
  },

  // ── 7. Спеціальна + Прямо з цеху ─────────────────────────────────
  {
    id: 3007,
    description: "Отримати Епштейна або Халяльного Кріпера (Спеціальна) у якості «Прямо з цеху»",
    reward: 2000,  // 4 рівні BP
    check: () => inventory.some(i =>
      i.type === "item" &&
      (i.name === "Епштейн" || i.name === "Халяльний Кріпер") &&
      i.quality === "Прямо з цеху"
    ),
    completed: false
  },

  // ── 8. Спеціальна + Преміум ───────────────────────────────────────
  {
    id: 3008,
    description: "Отримати Кишечку або NyanCat (Спеціальна) у Преміум — топ комбо!",
    reward: 3500,  // 7 рівнів BP
    check: () => inventory.some(i =>
      i.type === "item" &&
      (i.name === "Кишечка" || i.name === "NyanCat") &&
      i.premium === true
    ),
    completed: false
  },

  // ── 9. Зношена + секретна ─────────────────────────────────────────
  {
    id: 3009,
    description: "Отримати Потужно або Морські Котики (Секретна) у якості «Зношена»",
    reward: 500,   // 1 рівень BP
    check: () => inventory.some(i =>
      i.type === "item" &&
      (i.name === "Потужно" || i.name === "Морські Котики") &&
      i.quality === "Зношена"
    ),
    completed: false
  },

  // ── 10. Два в хорошій якості ──────────────────────────────────────
  {
    id: 3010,
    description: "Зібрати Діда Казіно та Елю — обидва у «Після консервації» або «Прямо з цеху»",
    reward: 1500,  // 3 рівні BP
    check: () => {
      const good = ["Прямо з цеху", "Після консервації"];
      return (
        inventory.some(i => i.type === "item" && i.name === "Дід Казіно" && good.includes(i.quality)) &&
        inventory.some(i => i.type === "item" && i.name === "Еля"        && good.includes(i.quality))
      );
    },
    completed: false
  },

  // ── 11. Преміум + Прямо з цеху + секретний ───────────────────────
  {
    id: 3011,
    description: "Отримати Мужика (Секретний) з Аркадного у Преміум та «Прямо з цеху»",
    reward: 3000,  // 6 рівнів BP
    check: () => inventory.some(i =>
      i.type === "item" && i.name === "Мужик" &&
      i.premium === true && i.quality === "Прямо з цеху"
    ),
    completed: false
  },

  // ── 12. Колекційне ───────────────────────────────────────────────
  {
    id: 3012,
    description: "Зібрати всіх 4 секретних: Потужно, Морські Котики, Кулдудку та Ксенатора",
    reward: 2500,  // 5 рівнів BP
    check: () =>
      inventory.some(i => i.type === "item" && i.name === "Потужно") &&
      inventory.some(i => i.type === "item" && i.name === "Морські Котики") &&
      inventory.some(i => i.type === "item" && i.name === "Кулдудка") &&
      inventory.some(i => i.type === "item" && i.name === "Ксенатор"),
    completed: false
  },


  // ── 15. Легендарне — Спеціальна + Преміум + Прямо з цеху ─────────
  {
    id: 3015,
    description: "Отримати будь-який Спеціальний предмет у Преміум та «Прямо з цеху» — абсолютний дроп!",
    reward: 4000,  // 8 рівнів BP
    check: () => inventory.some(i =>
      i.type === "item" &&
      i.rarity  === "Спеціальна" &&
      i.premium === true         &&
      i.quality === "Прямо з цеху"
    ),
    completed: false
  },

];

/* =================== TASK STORAGE =================== */

function saveTasks() {
    localStorage.setItem("tasksData", JSON.stringify(tasks.map(t=>({id:t.id, completed:t.completed}))));
}

function loadTasks() {
    const data = localStorage.getItem("tasksData");
    if (!data) return;
    const saved = JSON.parse(data);
    saved.forEach(s=>{
        const task = tasks.find(t=>t.id===s.id);
        if(task) task.completed = s.completed;
    });
}

loadTasks();

/* =================== TASK LOGIC =================== */

function completeTask(taskId) {
    const task = tasks.find(t=>t.id === taskId);
    if(!task) return;

    if(task.completed) return alert("Це завдання вже виконано!");

    if(task.check()) {
        AddFP(task.reward);   // ✅ замість task.reward()
        task.completed = true;

        saveUser();
        saveTasks();
        renderTasks?.();
    } else {
        alert("Завдання ще не виконано!");
    }
}

function checkTasks() {
    tasks.forEach(t=>{
        if(!t.completed && t.check()) completeTask(t.id);
    });
}

/* =================== ACTIONS =================== */

function performAction(actionType, payload) {
    switch(actionType) {
        case "openCase":
            user.openedCases[payload] = (user.openedCases[payload] || 0) + 1;
            break;
        case "addBalance":
            user.balance += payload;
            break;
        case "receiveItem":
            if(payload && typeof payload === "object") inventory.push(payload);
            break;
        default:
            console.warn("Невідома дія:", actionType);
            return;
    }
    inventory = user.items;
    saveUser();
    checkTasks();
}

loadUser();
loadTasks();

// ─────────────────────────────────────────────────────────────
// ЗМІНА 4: accountMenu — ЗАМІНИТИ поточну функцію
// Додано кнопку скидання БП з паролем
// ─────────────────────────────────────────────────────────────

// ЗНАЙДИ в script.js:
//   function accountMenu() {
// і ЗАМІНИТИ всю функцію на цю:

function accountMenu() {
    const musicEnabled = localStorage.getItem("musicEnabled") !== "false";

    document.getElementById("app").innerHTML = `
        <h2>Акаунт ⚙️</h2>

        <button onclick="toggleMusic()">
            ${musicEnabled ? "🔊 Музика: Увімкнено" : "🔇 Музика: Вимкнено"}
        </button><br/><br/>

        <input type="password" id="deletePass" placeholder="Введіть пароль" oninput="checkDeletePass()"/><br/><br/>

        <button id="deleteBtn" onclick="deleteProgress()" disabled>🗑 Видалити прогрес</button><br/><br/>

        <hr style="border-color:rgba(255,255,255,.15); margin:15px 0;">

        <h3 style="color:#a8e060; margin-bottom:10px;">🌸 Скидання FlowerPower Pass</h3>
        <p style="font-size:13px; color:rgba(255,255,255,.5); margin-bottom:10px;">Скидає прогрес, очки та преміум БП. Потрібен спеціальний пароль.</p>
        <input type="password" id="fpResetPassInput" placeholder="Пароль скидання БП"
               style="padding:8px 12px; border-radius:8px; border:1px solid rgba(255,255,255,.2); background:rgba(0,0,0,.3); color:#fff; width:200px; margin-bottom:8px; display:block;"/>
        <button onclick="fpResetFromMenu()" style="
            background:linear-gradient(90deg,#a8e060,#5cba2a);
            border:none; border-radius:8px;
            padding:10px 20px;
            color:#0a1a04; font-weight:700; font-size:14px;
            cursor:pointer; margin-bottom:16px;
        ">🔄 Скинути БП</button>

        <hr style="border-color:rgba(255,255,255,.15); margin:15px 0;">

        <button onclick="showInfo()">ℹ️ Інфо</button><br/><br/>
        <button onclick="showUserRights()">📜 Користувацьке право</button><br/><br/>

        <button onclick="mainMenu()">⬅ Назад</button>

        <div id="rightsModal" style="
            display:none;
            position:fixed;
            top:0; left:0; width:100%; height:100%;
            background: rgba(0,0,0,0.7);
            justify-content:center;
            align-items:center;
            z-index:1000;
        ">
            <div style="
                background:#fff;
                color:#000;
                width:80%;
                max-width:600px;
                max-height:80%;
                overflow-y:auto;
                padding:20px;
                border-radius:10px;
                position:relative;
            ">
                <h2>Користувацьке право Нікус Кейс Ультра</h2>
                <p>
                    1. Нікуси не мають грошової цінності та не можуть бути повернені.<br>
                    2. Придбані нікуси не підлягають поверненню.<br>
                    3. Забороняється чітити, взламувати код та красти інформацію.<br>
                    4. Не можна напряму купувати донат за реальні гроші всередині гри.<br>
                    5. Автор не несе відповідальності за втрату нікусів або внутрішньоігрових предметів.<br>
                    6. Донат є виключно добровільним.<br>
                    7. Використання гри означає погодження з цими правилами.<br>
                    8. Нікус Кейс Ультра не є азартною грою або казино.<br>
                    9. Гра базується на популярних ігрових механіках.<br>
                    10. Гра не пропагує азартні ігри.
                </p>
                <button onclick="closeUserRights()" style="
                    position:absolute;
                    top:10px; right:10px;
                    background:red;
                    color:white;
                    border:none;
                    padding:5px 10px;
                    border-radius:5px;
                    cursor:pointer;
                ">✖</button>
            </div>
        </div>

        <div id="infoModal" style="
            display:none;
            position:fixed;
            top:0; left:0; width:100%; height:100%;
            background: rgba(0,0,0,0.7);
            justify-content:center;
            align-items:center;
            z-index:1000;
        ">
            <div style="
                background:#fff;
                color:#000;
                width:80%;
                max-width:400px;
                padding:20px;
                border-radius:10px;
                position:relative;
                text-align:center;
            ">
                <h2>ℹ️ Інформація акаунта</h2>
                <p style="font-size:18px;">
                    🧠 Досвід: <b id="infoDosvid">0</b>
                </p>
                <button onclick="closeInfo()" style="
                    position:absolute;
                    top:10px; right:10px;
                    background:red;
                    color:white;
                    border:none;
                    padding:5px 10px;
                    border-radius:5px;
                    cursor:pointer;
                ">✖</button>
            </div>
        </div>
    `;
}

// Обробник кнопки скидання БП в меню акаунту
function fpResetFromMenu() {
    const input = document.getElementById("fpResetPassInput");
    if (!input) return;
    
    const pass = input.value.trim();
    
    if (!pass) {
        alert("Введіть пароль!");
        input.style.borderColor = "#ff6b6b";
        setTimeout(() => input.style.borderColor = "rgba(255,255,255,.2)", 1500);
        return;
    }
    
    const success = fpResetPass(pass);
    
    if (!success) {
        alert("❌ Невірний пароль!");
        input.value = "";
        input.style.borderColor = "#ff6b6b";
        setTimeout(() => input.style.borderColor = "rgba(255,255,255,.2)", 1500);
        return;
    }
    
    input.value = "";
    alert("✅ FlowerPower Pass успішно скинуто!\n\nСкинуто:\n• Очки BP → 0\n• Всі отримані нагороди\n• Преміум статус");
    accountMenu();
}

/* ================== ВИДАЛЕННЯ ПРОГРЕСУ ================== */
function checkDeletePass() {
    const pass = document.getElementById("deletePass").value;
    document.getElementById("deleteBtn").disabled = (pass !== "5242");
}

function deleteProgress() {
    const pass = document.getElementById("deletePass").value;

    if (pass !== "5242") {
        alert("Неправильний пароль!");
        return;
    }

    if (confirm("Ви впевнені, що хочете видалити весь прогрес? Цю дію не можна скасувати.")) {
        localStorage.clear();
        alert("Прогрес видалено! Сторінка буде перезавантажена.");
        location.reload();
    }
}

/* ================== ПРАВИЛА ================== */
function showUserRights() {
    document.getElementById("rightsModal").style.display = "flex";
}

function closeUserRights() {
    document.getElementById("rightsModal").style.display = "none";
}

/* ================== ІНФО / ДОСВІД ================== */
function showInfo() {
    const dosvid = localStorage.getItem(currentUser + "_dosvid") || 0;
    document.getElementById("infoDosvid").textContent = dosvid;
    document.getElementById("infoModal").style.display = "flex";
}

function closeInfo() {
    document.getElementById("infoModal").style.display = "none";
}

const promoCodesBase64 = {
  "TklDVVMxMjM=": {type:"once", reward:()=>{addBalance(250); alert("Отримано 250 нікусів!");}},
  "SURJT0tBSzE0ODg=": {type:"unlimited", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
  "S0FWSUsxNTk=": {type:"once", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
  "RlVOMTAw": {type:"once", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
  "VE5UMTkzOQ==": {type:"once", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
  "UVdFUlRZMTIzNDU=": {type:"once", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
  "QVNERkcx": {type:"once", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
  "Tk9QUkVNSVVN": {type:"once", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
  "U1RBUlRFUg==": {type:"once", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
  "TklDVVMwMDc=": {type:"once", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
  "Q0FTRTc4OQ==": {type:"once", reward:()=>{addCase("box"); alert("Отримано кейс Бокс!");}},
  "R0lGVDY1NA==": {type:"once", reward:()=>{addCase("gift"); alert("Отримано подарунковий кейс!");}},
  "Qk9YMzIx": {type:"unlimited", reward:()=>{addCase("box"); alert("Отримано кейс Бокс!");}},
  "TU9ORVkxNDg4": {type:"unlimited", reward:()=>{addBalance(1000); alert("Отримано 1000 нікусів!");}},
  "UkVBTElUWUdJRlQx": {type:"unlimited", reward:()=>{addCase("gift"); alert("Отримано подарунковий кейс!");}},
  "TklMSU1JVEFVVDI1": {type:"unlimited", reward:()=>{addCase("autumn"); alert("Отримано кейс Осінь25!");}},
  "WVNFTExBVVRVU1QyNQ==": {type:"once", reward:()=>{addCase("autumn"); alert("Отримано кейс Осінь25!");}},
  "RE9ESUsxMjNTT0JBS0E=": {type:"unlimited", reward:()=>{addBalance(250); alert("Отримано 250 нікусів!");}},
  "RkFMTE5BVDE0":{type:"unlimited",reward:()=>{addCase("fallalt");alert("Отримано кейс FallAlternative25!");}},
  "QVVUSFVNMTIzMTQ4OA==":{type:"unlimited",reward:()=>{addCase("autumnus");alert("Отримано кейс Autumnus25!");}},
  "R0lGVDEyMw==": {type:"once", reward:()=>{addCase("wint25gift"); alert("Отримано Різдвяний Подарунок!");}},
  "T0tBSw==": {type:"once", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
"VU4xMDAwQlA=": {
    type: "unlimited", 
    reward: () => {
        addBPCD(1000); // це оновить і змінну currentBPS, і лічильник
        alert("Отримано 1000 BP!");
    }
},

"TEVWRUxVUDI1": {
    type: "once", 
    reward: () => {
        addBPS(1000);
        alert("Отримано 1000 BPS!");
    }
},

"TVlTVEVSWUNPREU=": {
    type: "once", 
    reward: () => {
        addBPS(1000);
        alert("Отримано 1000 BPS!");
    }
},

"VEFTS0NPTVBMRVRF": {
    type: "once", 
    reward: () => {
        addBPS(1000);
        alert("Отримано 1000 BPS!");
    }
},

"Q0FUQ0hUSElTQ09ERQ==": {
    type: "once", 
    reward: () => {
        addBPS(1000);
        alert("Отримано 1000 BPS!");
    }
},

"TEVWRUxCT05VUw==": {type:"once", reward:()=>{addCase("box"); alert("Отримано кейс Бокс!");}},  
"Qk9PU1RNT0RF": {type:"once", reward:()=>{addCase("box"); alert("Отримано кейс Бокс!");}},  
"UkFORE9NRFJPUA==": {type:"once", reward:()=>{addCase("box"); alert("Отримано кейс Бокс!");}},  
"R0lWRU1FTklLVVM=": {type:"once", reward:()=>{addCase("autumn"); alert("Отримано кейс Осінь25!");}},  
"R0hPU1RDT0RF": {type:"once", reward:()=>{addCase("autumn"); alert("Отримано кейс Осінь25!");}},  
"TUFHSUNCT09TVA==": {type:"once", reward:()=>{addCase("autumn"); alert("Отримано кейс Осінь25!");}},  

"V0RHQVNURVI=": {type:"once", reward:()=>{addCase("WDGASTER"); alert("Отримано кейс WinterDreams!");}},  

"TklLVVNNQU5JQQ==": {type:"once", reward:()=>{addCase("arcase"); alert("Отримано Аркад кейс!");}},  
"UFJPTU9NT01FTlQ=": {type:"once", reward:()=>{addCase("arcase"); alert("Отримано Аркад кейс!");}},  
"SU5JS1VT": {type:"once", reward:()=>{addBalance(50); alert("Отримано 50 нікусів!");}},  
"Qk9PTklLVVM=": {type:"once", reward:()=>{addBalance(50); alert("Отримано 50 нікусів!");}},  
"QkxPT0RCT05VUw==": {type:"once", reward:()=>{addBalance(50); alert("Отримано 50 нікусів!");}},  
"U0NBUllHSUZU": {type:"once", reward:()=>{addBalance(50); alert("Отримано 50 нікусів!");}},  

"VGhhbmtNYXR2aXk=": {type:"once", reward:()=>{addBalance(1000); alert("Отримано 1000 нікусів!");}},  

"VGhhbmtHYXJ3ZXM=": {type:"once", reward:()=>{addBalance(1000); alert("Отримано 1000 нікусів!");}},  

"Qk9OVVNNTUFY": {
    type:"once",
    reward:()=> {
      inventory.push(createKeyForCase("arcase", "img/key_arcase.png"));
      alert("Отримано ключ!");
    }
  },

"R0VUUkVXQVJE": {
    type:"once",
    reward:()=> {
      inventory.push(createKeyForCase("arcase", "img/key_arcase.png"));
      alert("Отримано ключ!");
    }
  },

"U0VDUkVUS0VZ": {
    type:"once",
    reward:()=> {
      inventory.push(createKeyForCase("arcase", "img/key_arcase.png"));
      alert("Отримано ключ!");
    }
  },

  "RkROR09PTA==": {  
    type: "unlimited",
    reward: () => {
      dosvid += 50; // додаємо 50 досвіду
      alert("Отримано 50 досвіду!");
      openLevelMenu(); // оновлюємо меню рівня, якщо воно відкрито
    }
  },

"TUVEQUw=": {
  type: "unlimited",
  reward: () => {
    addCase("medal1");
    alert("Отримано медальний кейс «День Нікус Кейс Ультра 2026»!");
  }
},

"TUVEQUxET1NUQVRPSw==": {
  type: "once",
  reward: () => {
    addCase("medal1");
    alert("Отримано медальний кейс «День Нікус Кейс Ультра 2026»!");
  }
},

"RElES0FaSUs=": {
  type: "once",
  reward: () => {
    addCase("catcollection", 3);
    addCase("dogcollection", 3);
  }
},

"MDVSSUs=": {type:"unlimited", reward:()=>{addCase("medal2"); alert("Нагороду отримано");}},  
"Nk1JU0lD": {type:"once", reward:()=>{addCase("medal2"); alert("Нагороду отримано");}},  
"R0RFWlBPV0VS": {type:"once", reward:()=>{addCase("kolek1"); alert("Осінній Колекціоний Кейс");}},  
"TkVXU1RBUlQ=": {type:"once", reward:()=>{addCase("kolek1"); alert("Осінній Колекціоний Кейс");}},  
"RUxJVEVBQ0NFU1M=": {type:"once", reward:()=>{addCase("kolek1"); alert("Осінній Колекціоний Кейс");}},  
"VUxUUkFQUk9NTw==": {type:"once", reward:()=>{addCase("kolek1"); alert("Осінній Колекціоний Кейс");}},  
"VE9QU0VDUkVU": {type:"unlimited", reward:()=>{addCase("kolek1"); alert("Осінній Колекціоний Кейс");}},  

"Qk9YRlVO": {type:"once", reward:()=>{addCase("box"); alert("Отримано кейс Бокс!");}},  
"Qk9YTE9M": {type:"once", reward:()=>{addCase("box"); alert("Отримано кейс Бокс!");}},  
"Qk9YVk9WQQ==": {type:"once", reward:()=>{addCase("box"); alert("Отримано кейс Бокс!");}},  
"QVVURkZVTg==": {type:"once", reward:()=>{addCase("autumn"); alert("Отримано кейс Осінь25!");}},  
"QVVUTExPTA==": {type:"once", reward:()=>{addCase("autumn"); alert("Отримано кейс Осінь25!");}},  
"QVVUVk9WQQ==": {type:"once", reward:()=>{addCase("autumn"); alert("Отримано кейс Осінь25!");}},  
"SEFSVkVTVEJPTFg=": {type:"once", reward:()=>{addCase("harvest"); alert("Отримано кейс Harvest25!");}},  
"SEFSVkVTVEZVTg==": {type:"once", reward:()=>{addCase("harvest"); alert("Отримано кейс Harvest25!");}},  
"SEFSVkVTVE5BVFVSQUw=": {type:"unlimited", reward:()=>{addCase("harvest"); alert("Отримано кейс Harvest25!");}},
  "QUlSQ0FTRUNBU0U=": {type:"once", reward:()=>{addCase("arcase"); alert("Отримано Аркад кейс!");}},
  "QUJPQkE=": {type:"once", reward:()=>{addCase("arcase"); alert("Отримано Аркад кейс!");}},
  "SEVMUE1PTkVZ": {type:"once", reward:()=>{addBalance(50); alert("Отримано 50 нікусів!");}},
  "UVdFUlRZT0tBSw==": {type:"once", reward:()=>{addBalance(50); alert("Отримано 50 нікусів!");}},
  "T0tBS0FCQ0Q=": {type:"once", reward:()=>{addBalance(50); alert("Отримано 50 нікусів!");}},
  "Tk9UQVJCSVQ=": {type:"once", reward:()=>{addBalance(50); alert("Отримано 50 нікусів!");}},
"VEVTVEJPWE9LQUs=": { 
    type: "unlimited",
    reward: () => {
        addCase("box_halloween");
        alert("Отримано Бокс Halloween25!");
    }
},
"SEFMTE9XRUVOQVJCSVRB": { 
    type: "unlimited",
    reward: () => {
        addCase("halloween");
        alert("Отримано кейс Halloween25!");
    }
},
"RUVFRU9LQUs=": {  
    type: "unlimited",
    reward: () => {
        addCase("halloween_elite");
        alert("Отримано кейс Halloween25 Elite!");
    }
},

"UEVSTU9LRVk=": {type:"once", reward:()=>{
    inventory.push(createKeyForCase("arcase", "ключ Аркад", "img/key_arcase.png"));
    alert("Отримано ключ Аркад!");
}},

  "S0VZS0VZS0VZ": {
    type:"once",
    reward:()=> {
      inventory.push(createKeyForCase("arcase", "img/key_arcase.png"));
      alert("Отримано ключ!");
    }
  },

  "QVJJQlRSQVRJT04=": {
    type:"once",
    reward:()=> {
      inventory.push(createKeyForCase("arcase", "img/key_arcase.png"));
      alert("Отримано ключ!");
    }},

"UFJFTUlVTTEyMw==": {
    type: "unlimited",
    reward: () => {
        const btn = document.getElementById("premiumBtn1catdog");
        if(btn){
            btn.disabled = false;
            btn.title = "";
        }
        // зберігаємо стан нового преміуму у localStorage
        localStorage.setItem("premiumBtn1catdog", "1");
        alert("🎉 Кнопка Premium Pass розблокована!");
    }
}

};

// =====================================================
// ВИПРАВЛЕННЯ: MenuStarterPass
// Проблема: нагорода перевіряє toDateString() (прив'язка до дня),
// але таймер рахує до 10:10 — невідповідність.
// Рішення: зберігати timestamp останнього клейму і перевіряти
// що пройшло >= 20 годин (щоб не було надто строго).
// =====================================================

function MenuStarterPass() {
  if (!currentUser) return;

  const container = document.getElementById("app");

  const COOLDOWN_MS = 20 * 60 * 60 * 1000; // 20 годин (замість жорсткої прив'язки до дати)

  // Читаємо збережені дані
  let lastClaimTime = parseInt(localStorage.getItem(currentUser + "_starter3_lastClaimTime") || "0");
  let dayIndex = parseInt(localStorage.getItem(currentUser + "_starter3_index") || "0");
  let modalShown = localStorage.getItem(currentUser + "_starter3_modalShown") === "true";

  const starterRewards = [
    { day: 1, reward: "vesna26",    type: "item" },
    { day: 2, reward: "vesna26gift",type: "item" },
    { day: 3, reward: "kolek3",     type: "item" },
    { day: 4, reward: "avatar1",    type: "item" },
    { day: 5, reward: "flow",       type: "item" },
    { day: 6, reward: "NN3",        type: "item" },
    { day: 7, reward: "flow",       type: "item" }
  ];

  const now = Date.now();
  const timeSinceLast = now - lastClaimTime;
  const canClaimNext = lastClaimTime === 0 || timeSinceLast >= COOLDOWN_MS;
  const timeUntilNext = lastClaimTime === 0 ? 0 : Math.max(0, COOLDOWN_MS - timeSinceLast);

  function format(ms) {
    let h = Math.floor(ms / 3600000),
        m = Math.floor((ms % 3600000) / 60000),
        s = Math.floor((ms % 60000) / 1000);
    return `${h}год ${m}хв ${s}с`;
  }

  const caseLabels = {
    "vesna26":     "🌸 Весна26",
    "vesna26gift": "🎁 Весняний Подарунок",
    "kolek3":      "🌼 Весняний Колекційний 2026",
    "avatar1":     "🧑 Аватарний Весняний 2026",
    "flow":        "🌺 FlowerPower26",
    "NN3":         "🌱 Кейс з насінням 3"
  };

  container.innerHTML = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap');

      #sp-root {
        font-family: 'Nunito', sans-serif;
        min-height: 100vh;
        background: linear-gradient(135deg, #e8f5e9 0%, #f3e5f5 50%, #fff8e1 100%);
        padding: 0 0 40px;
        box-sizing: border-box;
      }

      .sp-header {
        background: linear-gradient(90deg, #66bb6a, #ab47bc, #ffa726);
        padding: 18px 20px 14px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      }
      .sp-header-title {
        flex: 1;
        font-size: 24px;
        font-weight: 900;
        color: #fff;
        letter-spacing: 1px;
        text-shadow: 0 2px 8px rgba(0,0,0,0.25);
      }
      .sp-back-btn {
        background: rgba(255,255,255,0.2);
        border: 2px solid rgba(255,255,255,0.5);
        color: #fff;
        border-radius: 12px;
        padding: 7px 16px;
        font-family: 'Nunito', sans-serif;
        font-size: 14px;
        font-weight: 800;
        cursor: pointer;
        transition: .2s;
      }
      .sp-back-btn:hover { background: rgba(255,255,255,0.35); }

      .sp-info-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 20px;
        background: rgba(255,255,255,0.7);
        backdrop-filter: blur(8px);
        border-bottom: 1px solid rgba(0,0,0,0.06);
        flex-wrap: wrap;
        gap: 8px;
      }
      .sp-timer-chip {
        background: linear-gradient(90deg, #ab47bc, #7b1fa2);
        color: #fff;
        border-radius: 20px;
        padding: 6px 16px;
        font-size: 13px;
        font-weight: 800;
        box-shadow: 0 3px 10px rgba(171,71,188,0.4);
      }
      .sp-progress-chip {
        background: linear-gradient(90deg, #66bb6a, #388e3c);
        color: #fff;
        border-radius: 20px;
        padding: 6px 16px;
        font-size: 13px;
        font-weight: 800;
        box-shadow: 0 3px 10px rgba(102,187,106,0.4);
      }

      .sp-scroll-wrap {
        overflow-x: auto;
        padding: 24px 20px 10px;
        scrollbar-width: thin;
        scrollbar-color: #ab47bc #f3e5f5;
        -webkit-overflow-scrolling: touch;
      }
      .sp-scroll-wrap::-webkit-scrollbar { height: 5px; }
      .sp-scroll-wrap::-webkit-scrollbar-thumb { background: #ab47bc; border-radius: 10px; }

      .sp-track {
        display: flex;
        gap: 14px;
        align-items: flex-end;
        min-width: max-content;
        padding-bottom: 10px;
        position: relative;
      }
      .sp-track::before {
        content: '';
        position: absolute;
        top: 50px;
        left: 80px;
        right: 80px;
        height: 4px;
        background: linear-gradient(90deg, #66bb6a, #ab47bc, #ffa726);
        border-radius: 4px;
        z-index: 0;
      }

      .sp-card {
        position: relative;
        z-index: 1;
        width: 140px;
        border-radius: 20px;
        padding: 14px 10px 12px;
        text-align: center;
        cursor: pointer;
        transition: transform .2s, box-shadow .2s;
        box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        flex-shrink: 0;
        border: 3px solid transparent;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
      .sp-card:hover { transform: translateY(-6px); }
      .sp-card:active { transform: scale(0.96); }

      .sp-card.claimed {
        background: linear-gradient(160deg, #c8e6c9, #a5d6a7);
        border-color: #66bb6a;
      }
      .sp-card.available {
        background: linear-gradient(160deg, #fff9c4, #fff176);
        border-color: #ffd600;
        box-shadow: 0 8px 28px rgba(255,214,0,0.45), 0 0 0 3px rgba(255,214,0,0.2);
        animation: spPulse 1.8s ease-in-out infinite;
      }
      @keyframes spPulse {
        0%,100% { box-shadow: 0 8px 28px rgba(255,214,0,0.45), 0 0 0 3px rgba(255,214,0,0.2); }
        50%      { box-shadow: 0 12px 36px rgba(255,214,0,0.7), 0 0 0 6px rgba(255,214,0,0.25); }
      }
      .sp-card.locked {
        background: linear-gradient(160deg, #f3e5f5, #e1bee7);
        border-color: #ce93d8;
        opacity: 0.75;
        cursor: not-allowed;
      }

      .sp-day-badge {
        position: absolute;
        top: -11px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 11px;
        font-weight: 900;
        padding: 3px 10px;
        border-radius: 20px;
        white-space: nowrap;
        letter-spacing: .5px;
      }
      .claimed .sp-day-badge  { background: #388e3c; color: #fff; }
      .available .sp-day-badge { background: #f57f17; color: #fff; }
      .locked .sp-day-badge   { background: #7b1fa2; color: #fff; }

      .sp-card-img {
        width: 90px;
        height: 90px;
        object-fit: contain;
        image-rendering: auto;
        display: block;
        margin: 8px auto 6px;
        filter: drop-shadow(0 3px 8px rgba(0,0,0,0.2));
        transition: transform .2s;
      }
      .available .sp-card-img { animation: spFloat 2.5s ease-in-out infinite; }
      @keyframes spFloat {
        0%,100% { transform: translateY(0); }
        50%      { transform: translateY(-5px); }
      }

      .sp-card-name {
        font-size: 11px;
        font-weight: 800;
        color: #333;
        line-height: 1.3;
        word-wrap: break-word;
        white-space: normal;
        margin-bottom: 6px;
      }

      .sp-card-action {
        font-size: 11px;
        font-weight: 900;
        padding: 4px 0;
        border-radius: 10px;
        letter-spacing: .5px;
      }
      .claimed .sp-card-action  { color: #2e7d32; }
      .available .sp-card-action { color: #e65100; }
      .locked .sp-card-action   { color: #6a1b9a; }

      #sp-modal {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        backdrop-filter: blur(6px);
        padding: 20px;
      }
      .sp-modal-box {
        background: linear-gradient(160deg, #fff8e1, #f3e5f5);
        border-radius: 24px;
        padding: 28px 24px 24px;
        max-width: 340px;
        width: 100%;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0,0,0,0.35);
        border: 3px solid #ffd600;
        animation: spModalIn .3s cubic-bezier(.34,1.56,.64,1);
      }
      @keyframes spModalIn {
        from { transform: scale(.7) translateY(20px); opacity: 0; }
        to   { transform: scale(1)  translateY(0);    opacity: 1; }
      }
      .sp-modal-box h3 { font-size: 22px; font-weight: 900; color: #4a148c; margin: 0 0 8px; }
      .sp-modal-box p  { font-size: 14px; color: #555; line-height: 1.6; margin: 0 0 20px; }
      .sp-modal-btn {
        background: linear-gradient(90deg, #ab47bc, #7b1fa2);
        color: #fff;
        border: none;
        border-radius: 16px;
        padding: 12px 32px;
        font-family: 'Nunito', sans-serif;
        font-size: 16px;
        font-weight: 900;
        cursor: pointer;
        box-shadow: 0 5px 0 #4a148c, 0 8px 20px rgba(123,31,162,0.4);
        transition: .2s;
      }
      .sp-modal-btn:hover { transform: translateY(-2px); }
      .sp-modal-btn:active { transform: translateY(2px); }
    </style>

    <div id="sp-root">
      <div class="sp-header">
        <button class="sp-back-btn" onclick="openEventsMenu()">← Назад</button>
        <div class="sp-header-title">🌸 Весняний Стартер Пас</div>
      </div>

      <div class="sp-info-bar">
        <div class="sp-timer-chip">⏱ До нагороди: <span id="sp-timer-val">${canClaimNext ? "Доступно!" : format(timeUntilNext)}</span></div>
        <div class="sp-progress-chip">✅ Зібрано: ${dayIndex} / 7 днів</div>
      </div>

      <div class="sp-scroll-wrap">
        <div class="sp-track" id="sp-track"></div>
      </div>
    </div>
  `;

  // Рендер карточок
  const track = document.getElementById("sp-track");

  starterRewards.forEach(r => {
    const claimed   = r.day <= dayIndex;
    // Наступна нагорода доступна якщо: це наступний день І cooldown пройшов
    const available = r.day === dayIndex + 1 && canClaimNext;
    const locked    = !claimed && !available;

    const stateClass = claimed ? "claimed" : available ? "available" : "locked";
    const dayText    = claimed ? `День ${r.day} ✓` : available ? `День ${r.day} — ЗАРАЗ!` : `День ${r.day} 🔒`;
    const action     = claimed ? "✅ Отримано" : available ? "👆 Натисни!" : "🔒 Заблоковано";

    const card = document.createElement("div");
    card.className = `sp-card ${stateClass}`;
    card.innerHTML = `
      <div class="sp-day-badge">${dayText}</div>
      <img class="sp-card-img" src="img/case_${r.reward}.png" alt="">
      <div class="sp-card-name">${caseLabels[r.reward] || r.reward}</div>
      <div class="sp-card-action">${action}</div>
    `;

    if (available) {
      card.addEventListener("click", () => {
        // Зберігаємо timestamp і індекс
        localStorage.setItem(currentUser + "_starter3_lastClaimTime", Date.now().toString());
        localStorage.setItem(currentUser + "_starter3_index", r.day.toString());
        addCase(r.reward);
        saveData();
        MenuStarterPass();
      });
    } else if (locked) {
      card.addEventListener("click", () => {
        if (r.day <= dayIndex + 1) {
          const left = COOLDOWN_MS - timeSinceLast;
          alert(`⏳ Почекай ще ${format(left)} до наступної нагороди!`);
        } else {
          alert("🔒 Спочатку забери попередні нагороди!");
        }
      });
    } else {
      card.addEventListener("click", () => alert("✅ Ця нагорода вже отримана!"));
    }

    track.appendChild(card);
  });

  // Таймер — оновлюється кожну секунду
  if (!canClaimNext) {
    function tick() {
      const el = document.getElementById("sp-timer-val");
      if (!el) return;
      const remaining = Math.max(0, COOLDOWN_MS - (Date.now() - lastClaimTime));
      if (remaining <= 0) {
        el.textContent = "Доступно!";
        // Оновлюємо картки щоб розблокувалась наступна
        MenuStarterPass();
        return;
      }
      el.textContent = format(remaining);
      requestAnimationFrame(tick);
    }
    tick();
  }

  // Вітальна модалка (тільки перший раз)
  if (!modalShown) {
    const modalDiv = document.createElement("div");
    modalDiv.id = "sp-modal";
    modalDiv.innerHTML = `
      <div class="sp-modal-box">
        <div style="font-size:48px;margin-bottom:8px;">🌸</div>
        <h3>Весняний Стартер Пас!</h3>
        <p>7 днів — 7 подарунків!<br>Заходь кожні <b>20 годин</b> і забирай весняні кейси 🎁</p>
        <button class="sp-modal-btn" id="sp-modal-close-btn">Погнали! 🚀</button>
      </div>
    `;
    document.body.appendChild(modalDiv);
    document.getElementById("sp-modal-close-btn").onclick = () => {
      modalDiv.remove();
      localStorage.setItem(currentUser + "_starter3_modalShown", "true");
    };
  }
}

function startSnowfall() {
  const snowflakeCount = 30;
  const symbols = ["🍃", "🍀", "🌿"]; // весняні символи

  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("leaf"); // можна лишити snowflake якщо треба
    snowflake.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    // Випадкові параметри
    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.fontSize = 14 + Math.random() * 20 + "px";
    snowflake.style.opacity = (0.5 + Math.random() * 0.5).toFixed(2);
    snowflake.style.animationDuration = 6 + Math.random() * 8 + "s";
    snowflake.style.animationDelay = Math.random() * 2 + "s";

    // Легке бокове хитання
    snowflake.style.transform = `translateX(${Math.random() * 40 - 20}px)`;

    document.body.appendChild(snowflake);

    // Видаляємо після падіння
    setTimeout(() => snowflake.remove(), 14000);
  }

  // Початковий спавн
  for (let i = 0; i < snowflakeCount; i++) {
    createSnowflake();
  }

  // Постійне додавання
  setInterval(() => {
    createSnowflake();
  }, 900);
}

window.addEventListener("load", startSnowfall);

//окак
function MenuGarden() {
  saveData?.();
  const container = document.getElementById("app");
  if (!container) return;

  inventory = JSON.parse(localStorage.getItem(currentUser+"_inventory") || "[]");
  inventory2 = JSON.parse(localStorage.getItem("inventory2") || "{}");

  let garden = JSON.parse(localStorage.getItem(currentUser+"_garden") || "[]");
  if (garden.length !== 16) {
    garden = Array(16).fill(null);
    localStorage.setItem(currentUser+"_garden", JSON.stringify(garden));
  }

  container.innerHTML = `
    <h2>🌿 Сад ${currentUser}</h2>

    <h3>🛒 Магазин</h3>
    <div style="display:flex;overflow-x:auto;gap:10px">
      <div style="display:grid;grid-template-columns:repeat(4,180px);gap:10px">
        ${renderSeedBox("Гарбуз","G1")}
        ${renderSeedBox("Буде-ПопКорн","G2")}
        ${renderSeedBox("Соняшник","G3")}
        ${renderSeedBox("Золоте-Дерево","G4")}
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,180px);gap:10px">
        ${renderSeedBox("Річік","G5")}
        ${renderSeedBox("Кіт—криптовалютчик","G6")}
        ${renderSeedBox("Капібара","G7")}
        ${renderSeedBox("Кіт у хлібі","G8")}
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,180px);gap:10px">
        ${renderSeedBox("Гусь","j1")}
        ${renderSeedBox("Гарфілд","j2")}
        ${renderSeedBox("Кітікет","j3")}
        ${renderSeedBox("Полуниця","j4")}
      </div>
    </div>

    <h3>🌾 Грядка</h3>
    <div style="display:grid;grid-template-columns:repeat(4,80px);gap:5px;justify-content:center">
      ${garden.map((p,i)=>renderPlot(p,i)).join("")}
    </div>

    <button onclick="mainMenu()">⬅️ Назад</button>
  `;
}

// ==================== 🪴 ПОЛЕ ====================
function renderPlot(p,i){
  if(!p) return `<div onclick="showSeedSelector(${i})"
  style="width:80px;height:80px;border:2px dashed #555"></div>`;

return `<div onclick="showPlantActions(${i})"
  style="width:80px;height:80px;border:2px solid gold;overflow:hidden;">
  <img src="img/${p.stage===1 ? p.smallImg : p.fullImg}"
       style="width:100%;height:100%;object-fit:contain;">
</div>`;
}

// ==================== 🌰 НАСІННЯ ====================
function renderSeedBox(name,img){
  inventory2 = JSON.parse(localStorage.getItem("inventory2")||"{}");
  const c = inventory2[name]||0;
  return `<div style="border:2px solid gold;padding:6px;background:#222;color:#fff">
    <img src="img/${img}.png" width="80"><br>
    <b>${name}</b><br>🌱 ${c}
  </div>`;
}

// ==================== 🌱 ПОСАДКА ====================

function showSeedSelector(index) {
  const seeds = JSON.parse(localStorage.getItem("inventory2") || "{}");
  const keys = Object.keys(seeds).filter(k => seeds[k] > 0);

  if (!keys.length) {
    alert("У тебе немає насіння!");
    return;
  }

  const selector = document.getElementById("seedSelector");
  const options = document.getElementById("seedOptions");

  options.innerHTML = "";

  keys.forEach(k => {
    const btn = document.createElement("button");
    btn.textContent = `🌱 ${k} (${seeds[k]} шт)`;
    btn.onclick = () => plantSeed(index, k);
    options.appendChild(btn);
  });

  selector.style.display = "block";
}

function closeSeedSelector() {
  document.getElementById("seedSelector").style.display = "none";


  const img={
    "Гарбуз":["D21.png","D11.png"],
    "Буде-ПопКорн":["D22.png","D12.png"],
    "Соняшник":["D23.png","D13.png"],
    "Золоте-Дерево":["D24.png","D14.png"],
    "Гусь":["D61.png","D51.png"],
    "Гарфілд":["D52.png","D62.png"],
    "Кітікет":["D53.png","D63.png"],
    "Полуниця":["D54.png","D64.png"],
    "Річік":["D31.png","D41.png"],
    "Кіт—криптовалютчик":["D32.png","D42.png"],
    "Капібара":["D33.png","D43.png"],
    "Кіт у хлібі":["D34.png","D44.png"]
  };

  inv[name]--;
  localStorage.setItem("inventory2",JSON.stringify(inv));

  g[i]={name,stage:1,smallImg:img[name][0],fullImg:img[name][1],
        nextStageTime:Date.now()+3600000};

  localStorage.setItem(currentUser+"_garden",JSON.stringify(g));
  closeSeedSelector(); MenuGarden();
}
//шовплантактіонс

function showPlantActions(index) {
  let garden = JSON.parse(localStorage.getItem(currentUser + "_garden") || "[]");
  const plant = garden[index];
  if (!plant) return;

  const windowEl = document.getElementById("plantActions");
  const now = Date.now();

  // Оновлення стадії рослини
  if (plant.stage === 1 && plant.nextStageTime && plant.nextStageTime <= now) {
    plant.stage = 2;
    delete plant.nextStageTime;
    garden[index] = plant;
    localStorage.setItem(currentUser + "_garden", JSON.stringify(garden));
  }

  // Динамічний HTML
  let html = `<h3>${plant.stage === 1 ? '🌱' : '🌾'} ${plant.name}</h3>`;

  if (plant.stage === 1) {
    let growthText = "";
    if (plant.nextStageTime) {
      const msLeft = Math.max(0, plant.nextStageTime - now);
      const mins = Math.floor(msLeft / 60000);
      const secs = Math.floor((msLeft % 60000) / 1000);
      growthText = `<p style="color:orange;">🌱 Виросте через ${mins}хв ${secs}с</p>`;
    }
    html += `
      <button onclick="waterPlant(${index})" style="display:block;margin:5px auto;padding:8px 12px;background:gold;border:none;border-radius:5px;cursor:pointer;width:90%;text-align:left;">💧 Полити</button>
      <button onclick="removePlant(${index})" style="display:block;margin:5px auto;padding:8px 12px;background:crimson;border:none;border-radius:5px;cursor:pointer;width:90%;text-align:left;">❌ Видалити</button>
      ${growthText}
      <br><button onclick="closePlantActions()" style="display:block;margin:5px auto;padding:8px 12px;background:#aaa;border:none;border-radius:5px;cursor:pointer;width:90%;">Закрити</button>
    `;
  } else {
    const next = plant.nextHarvest || 0;
    const rechargeLeft = Math.max(0, next - now);
    const canHarvest = rechargeLeft <= 0;

    let timerText = "";
    if (!canHarvest) {
      const hrs = Math.floor(rechargeLeft / 3600000);
      const mins = Math.floor((rechargeLeft % 3600000) / 60000);
      timerText = `<p style="color:#aaa;">⏳ Збір буде через ${hrs}г ${mins}хв</p>`;
    }

    html += `
      <button onclick="harvest(${index})" ${canHarvest ? "" : "disabled"} style="display:block;margin:5px auto;padding:8px 12px;background:${canHarvest?'limegreen':'gray'};border:none;border-radius:5px;color:#fff;cursor:${canHarvest?'pointer':'default'};width:90%;text-align:left;">💰 Зібрати кеш</button>
      ${timerText}
      <button onclick="removePlant(${index})" style="display:block;margin:5px auto;padding:8px 12px;background:crimson;border:none;border-radius:5px;cursor:pointer;width:90%;text-align:left;">❌ Видалити</button>
      <br><button onclick="closePlantActions()" style="display:block;margin:5px auto;padding:8px 12px;background:#aaa;border:none;border-radius:5px;cursor:pointer;width:90%;">Закрити</button>
    `;
  }

  // Встановлюємо HTML та стилі для “модалки” інлайново
  windowEl.innerHTML = html;
  windowEl.style.display = "block";
  windowEl.style.position = "fixed";
  windowEl.style.top = "50%";
  windowEl.style.left = "50%";
  windowEl.style.transform = "translate(-50%, -50%)";
  windowEl.style.background = "#222";
  windowEl.style.border = "3px solid gold";
  windowEl.style.padding = "15px";
  windowEl.style.color = "#fff";
  windowEl.style.zIndex = "9999";
  windowEl.style.width = "300px";
  windowEl.style.maxHeight = "70vh";
  windowEl.style.overflowY = "auto";
  windowEl.style.boxSizing = "border-box";
}

// Закриття
function closePlantActions() {
  const windowEl = document.getElementById("plantActions");
  windowEl.style.display = "none";
}

//water
function waterPlant(index) {
  if (water <= 0) { alert("У тебе немає доступних поливів!"); return; }
  let garden = JSON.parse(localStorage.getItem(currentUser + "_garden") || "[]");
  if (!garden[index]) return;

  if (garden[index].stage === 1) {
    garden[index].stage = 2;
    delete garden[index].nextStageTime;
    water--;
    alert(`🌿 ${garden[index].name} виросла! Поливи залишилось: ${water}`);
  }

  localStorage.setItem(currentUser + "_garden", JSON.stringify(garden));
  closePlantActions();
  MenuGarden();
}

function openModal(modalId, html="") {
  const modal = document.getElementById(modalId);
  const box = modal.querySelector(".box");
  if (box) box.innerHTML = html;
  modal.style.display = "flex";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
}

function harvest(i){
  let g = JSON.parse(localStorage.getItem(currentUser+"_garden") || "[]");
  let p = g[i];
  if(!p) return;

  const now = Date.now();
  if(p.nextHarvest && p.nextHarvest > now){
    alert("⏳ Рано");
    return;
  }

  let r = 0, t = 0;
  switch(p.name){
    case "Гарбуз": r = 10; t = 86400000; break;
    case "Буде-ПопКорн": r = 10; t = 43200000; break;
    case "Соняшник": r = 25; t = 86400000; break;
    case "Золоте-Дерево": r = 50; t = 86400000; break;
    case "Річік": r = 75; t = 86400000; break;
    case "Кіт—криптовалютчик": r = 25; t = 43200000; break;
    case "Капібара": r = 10; t = 43200000; break;
    case "Кіт у хлібі": r = 10; t = 86400000; break;
    case "Гусь": r = 75; t = 86400000; break;
    case "Гарфілд": r = 25; t = 43200000; break;
    case "Кітікет": r = 10; t = 43200000; break;
    case "Полуниця": r = 10; t = 86400000; break;
 }

  // 💰 баланс
  balance = +localStorage.getItem(currentUser+"_balance") || 0;
  balance += r;
  localStorage.setItem(currentUser+"_balance", balance);

  // ⭐ ДОСВІД ЗА ВРОЖАЙ
  dosvid += 3;

  // ⏱ наступний збір
  p.nextHarvest = now + t;
  g[i] = p;
  localStorage.setItem(currentUser+"_garden", JSON.stringify(g));

  closePlantActions();
  MenuGarden();
}

// ==================== ❌ ВИДАЛЕННЯ ====================
function removePlant(i){
  let g=JSON.parse(localStorage.getItem(currentUser+"_garden")||"[]");
  g[i]=null;
  localStorage.setItem(currentUser+"_garden",JSON.stringify(g));
  closePlantActions();
  MenuGarden();
}

// ==================== 🌰 ВІКНО НАСІННЯ ====================
function renderSeedBox(seedName, imgName) {
  inventory = JSON.parse(localStorage.getItem(currentUser + "_inventory") || "[]");
  inventory2 = JSON.parse(localStorage.getItem("inventory2") || "{}");
  const hasPlant = inventory.some(i => i.name === seedName);
  const count = inventory2[seedName] || 0;

  return `<div style="border:2px solid gold;padding:8px;border-radius:6px;background:#222;color:#fff;">
      <img src="img/${imgName}.png" alt="${seedName}" style="width:80px;height:80px;object-fit:contain;"><br>
      <b>${seedName}</b><br>🌾 ${count} шт.<br>
      ${hasPlant
        ? `<button onclick="exchangeForSeed('${seedName}')">🔄 Обміняти (1 рослина → 1 насіння)</button>`
        : `<span style='color:#999;'>Немає рослин для обміну</span>`}
    </div>`;
}

// ==================== 🌿 ВІКНО ВИБОРУ НАСІННЯ ====================

function showSeedSelector(index) {
  const seeds = JSON.parse(localStorage.getItem("inventory2") || "{}");
  const keys = Object.keys(seeds).filter(k => seeds[k] > 0);
  if (!keys.length) { 
    alert("У тебе немає насіння!"); 
    return; 
  }

  const selector = document.getElementById("seedSelector");
  const options = document.getElementById("seedOptions");

  // модалка
  selector.style.display = "block";  // показуємо
  selector.style.position = "fixed";
  selector.style.top = "50%";
  selector.style.left = "50%";
  selector.style.transform = "translate(-50%, -50%)";
  selector.style.background = "#222";
  selector.style.padding = "15px";
  selector.style.border = "3px solid gold";
  selector.style.color = "#fff";
  selector.style.zIndex = "9999";
  selector.style.width = "300px";
  selector.style.maxHeight = "70vh"; 
  // ❌ не треба overflow: hidden на модалці

  // список насіння
  options.style.display = "block";           // блочний
  options.style.width = "100%";
  options.style.maxHeight = "60vh";          // висота для скролу
  options.style.overflowY = "auto";          // скрол
  options.style.paddingRight = "5px";        // щоб не обрізало
  options.style.boxSizing = "border-box";

  // кнопки
  options.innerHTML = keys.map(k => `
    <button onclick="plantSeed(${index}, '${k}')" style="
      display:block;
      margin:5px auto;
      padding:8px 12px;
      background:gold;
      border:none;
      border-radius:5px;
      cursor:pointer;
      width:90%;
      text-align:left;
    ">
      🌱 Посадити ${k} (${seeds[k]} шт)
    </button>
  `).join("");
}

function closeSeedSelector() {
  document.getElementById("seedSelector").style.display = "none";
  seedPage = 0; // скидаємо сторінку при закритті
}

// ==================== 🌱 ПОСАДКА НАСІННЯ ====================
function plantSeed(index, choice) {
  let inventory2 = JSON.parse(localStorage.getItem("inventory2") || "{}");
  let garden = JSON.parse(localStorage.getItem(currentUser + "_garden") || "[]");

  if (!inventory2[choice] || inventory2[choice]<=0) { alert("Немає насіння цього типу!"); return; }

  let smallImg="", fullImg="";
  if(choice==="Гарбуз"){smallImg="D21.png"; fullImg="D11.png";}
  if(choice==="Буде-ПопКорн"){smallImg="D22.png"; fullImg="D12.png";}
  if(choice==="Соняшник"){smallImg="D23.png"; fullImg="D13.png";}
  if(choice==="Золоте-Дерево"){smallImg="D24.png"; fullImg="D14.png";}
  if(choice==="Річік"){smallImg="D31.png"; fullImg="D41.png";}
  if(choice==="Кіт—криптовалютчик"){smallImg="D32.png"; fullImg="D42.png";}
  if(choice==="Капібара"){smallImg="D33.png"; fullImg="D43.png";}
  if(choice==="Кіт у хлібі"){smallImg="D34.png"; fullImg="D44.png";}
  if(choice==="Гусь"){smallImg="D51.png"; fullImg="D61.png";}
  if(choice==="Гарфілд"){smallImg="D62.png"; fullImg="D52.png";}
  if(choice==="Кітікет"){smallImg="D63.png"; fullImg="D53.png";}
  if(choice==="Полуниця"){smallImg="D64.png"; fullImg="D54.png";}

  inventory2[choice]--;
  localStorage.setItem("inventory2", JSON.stringify(inventory2));

  garden[index] = { name:choice, stage:1, smallImg, fullImg, nextStageTime:Date.now()+60*60*1000 };
  localStorage.setItem(currentUser + "_garden", JSON.stringify(garden));

  closeSeedSelector();
  MenuGarden();
}

// ==================== 🔄 ОБМІН РОСЛИН НА НАСІННЯ ====================
function exchangeForSeed(seedName) {
  inventory = JSON.parse(localStorage.getItem(currentUser + "_inventory") || "[]");
  inventory2 = JSON.parse(localStorage.getItem("inventory2") || "{}");

  const idx = inventory.findIndex(i => i.name === seedName);
  if(idx===-1){ alert(`У тебе немає "${seedName}" для обміну!`); return; }

  inventory.splice(idx,1);
  inventory2[seedName] = (inventory2[seedName]||0)+1;

  saveInventory();
  saveInventory2();
  alert(`🌱 Отримано 1 насіння "${seedName}"!`);
  MenuGarden();
}

// ==================== 💾 ЗБЕРЕЖЕННЯ ====================
function saveInventory() { if(!currentUser) return; localStorage.setItem(currentUser+"_inventory", JSON.stringify(inventory)); }
function saveInventory2() { localStorage.setItem("inventory2", JSON.stringify(inventory2)); }

// ============================================================
//  🏦  БАНК — ПОКРАЩЕНА ВЕРСІЯ  (bank_menu.js)
//  Підключіть Chart.js перед цим файлом:
//  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
// ============================================================

// === QR-КОДИ ===
const qrCodes = {
  qr2_5: 2.5, qr5: 5, qr10: 10, qr20: 20,
  qr35: 35,   qr50: 50, qr100: 100,
  qrM5: -5,   qrM10: -10, qrM20: -20
};

// === ФІКСОВАНИЙ КУРС НА СЬОГОДНІ ===
// pgd: Долар Пірнівської Гімназії — курс встановлюється щоденно
const dailyRates = {
  // Вересень 2025 (pgd ще не існував, ставимо 0 або просто немає)
  "2025-09-01":{xcoin:60,oreh:15,pgd:0},"2025-09-02":{xcoin:61,oreh:16,pgd:0},"2025-09-03":{xcoin:62,oreh:13,pgd:0},"2025-09-04":{xcoin:63,oreh:17,pgd:0},"2025-09-05":{xcoin:50,oreh:17,pgd:0},"2025-09-06":{xcoin:40,oreh:18,pgd:0},"2025-09-07":{xcoin:55,oreh:17,pgd:0},"2025-09-08":{xcoin:61,oreh:19,pgd:0},"2025-09-09":{xcoin:60,oreh:19,pgd:0},"2025-09-10":{xcoin:69,oreh:20,pgd:0},"2025-09-11":{xcoin:70,oreh:9,pgd:0},"2025-09-12":{xcoin:71,oreh:8,pgd:0},"2025-09-13":{xcoin:60,oreh:11,pgd:0},"2025-09-14":{xcoin:75,oreh:15,pgd:0},"2025-09-15":{xcoin:74,oreh:22,pgd:0},"2025-09-16":{xcoin:59,oreh:23,pgd:0},"2025-09-17":{xcoin:76,oreh:23,pgd:0},"2025-09-18":{xcoin:77,oreh:24,pgd:0},"2025-09-19":{xcoin:68,oreh:16,pgd:0},"2025-09-20":{xcoin:73,oreh:20,pgd:0},"2025-09-21":{xcoin:63,oreh:25,pgd:0},"2025-09-22":{xcoin:65,oreh:25,pgd:0},"2025-09-23":{xcoin:67,oreh:26,pgd:0},"2025-09-24":{xcoin:63,oreh:27,pgd:0},"2025-09-25":{xcoin:62,oreh:9,pgd:0},"2025-09-26":{xcoin:77,oreh:10,pgd:0},"2025-09-27":{xcoin:86,oreh:11,pgd:0},"2025-09-28":{xcoin:81,oreh:9,pgd:0},"2025-09-29":{xcoin:74,oreh:29,pgd:0},"2025-09-30":{xcoin:69,oreh:20,pgd:0},
  // Жовтень 2025
  "2025-10-01":{xcoin:67,oreh:17,pgd:0},"2025-10-02":{xcoin:63,oreh:16,pgd:0},"2025-10-03":{xcoin:60,oreh:13,pgd:0},"2025-10-04":{xcoin:55,oreh:17,pgd:0},"2025-10-05":{xcoin:50,oreh:19,pgd:0},"2025-10-06":{xcoin:40,oreh:22,pgd:0},"2025-10-07":{xcoin:41,oreh:23,pgd:0},"2025-10-08":{xcoin:61,oreh:19,pgd:0},"2025-10-09":{xcoin:65,oreh:19,pgd:0},"2025-10-10":{xcoin:70,oreh:20,pgd:0},"2025-10-11":{xcoin:68,oreh:9,pgd:0},"2025-10-12":{xcoin:71,oreh:10,pgd:0},"2025-10-13":{xcoin:60,oreh:11,pgd:0},"2025-10-14":{xcoin:61,oreh:15,pgd:0},"2025-10-15":{xcoin:63,oreh:17,pgd:0},"2025-10-16":{xcoin:59,oreh:23,pgd:0},"2025-10-17":{xcoin:62,oreh:25,pgd:0},"2025-10-18":{xcoin:61,oreh:24,pgd:0},"2025-10-19":{xcoin:90,oreh:30,pgd:0},"2025-10-20":{xcoin:55,oreh:12,pgd:0},"2025-10-21":{xcoin:63,oreh:20,pgd:0},"2025-10-22":{xcoin:65,oreh:22,pgd:0},"2025-10-23":{xcoin:67,oreh:15,pgd:0},"2025-10-24":{xcoin:63,oreh:15,pgd:0},"2025-10-25":{xcoin:55,oreh:9,pgd:0},"2025-10-26":{xcoin:60,oreh:10,pgd:0},"2025-10-27":{xcoin:59,oreh:14,pgd:0},"2025-10-28":{xcoin:60,oreh:13,pgd:0},"2025-10-29":{xcoin:58,oreh:15,pgd:0},"2025-10-30":{xcoin:69,oreh:20,pgd:0},"2025-10-31":{xcoin:70,oreh:22,pgd:0},
  // Листопад 2025
  "2025-11-01":{xcoin:72,oreh:18,pgd:0},"2025-11-02":{xcoin:68,oreh:17,pgd:0},"2025-11-03":{xcoin:65,oreh:15,pgd:0},"2025-11-04":{xcoin:64,oreh:19,pgd:0},"2025-11-05":{xcoin:60,oreh:18,pgd:0},"2025-11-06":{xcoin:62,oreh:21,pgd:0},"2025-11-07":{xcoin:59,oreh:22,pgd:0},"2025-11-08":{xcoin:61,oreh:20,pgd:0},"2025-11-09":{xcoin:63,oreh:19,pgd:0},"2025-11-10":{xcoin:65,oreh:23,pgd:0},"2025-11-11":{xcoin:67,oreh:24,pgd:0},"2025-11-12":{xcoin:66,oreh:22,pgd:0},"2025-11-13":{xcoin:64,oreh:21,pgd:0},"2025-11-14":{xcoin:63,oreh:20,pgd:0},"2025-11-15":{xcoin:62,oreh:19,pgd:0},"2025-11-16":{xcoin:61,oreh:18,pgd:0},"2025-11-17":{xcoin:63,oreh:20,pgd:0},"2025-11-18":{xcoin:65,oreh:21,pgd:0},"2025-11-19":{xcoin:67,oreh:23,pgd:0},"2025-11-20":{xcoin:66,oreh:22,pgd:0},"2025-11-21":{xcoin:68,oreh:24,pgd:0},"2025-11-22":{xcoin:70,oreh:25,pgd:0},"2025-11-23":{xcoin:69,oreh:23,pgd:0},"2025-11-24":{xcoin:67,oreh:22,pgd:0},"2025-11-25":{xcoin:65,oreh:21,pgd:0},"2025-11-26":{xcoin:64,oreh:20,pgd:0},"2025-11-27":{xcoin:62,oreh:19,pgd:0},"2025-11-28":{xcoin:63,oreh:21,pgd:0},"2025-11-29":{xcoin:65,oreh:23,pgd:0},"2025-11-30":{xcoin:67,oreh:25,pgd:0},
  // Грудень 2025
  "2025-12-01":{xcoin:70,oreh:18,pgd:0},"2025-12-02":{xcoin:68,oreh:17,pgd:0},"2025-12-03":{xcoin:66,oreh:19,pgd:0},"2025-12-04":{xcoin:64,oreh:20,pgd:0},"2025-12-05":{xcoin:63,oreh:22,pgd:0},"2025-12-06":{xcoin:61,oreh:21,pgd:0},"2025-12-07":{xcoin:60,oreh:19,pgd:0},"2025-12-08":{xcoin:62,oreh:18,pgd:0},"2025-12-09":{xcoin:64,oreh:20,pgd:0},"2025-12-10":{xcoin:66,oreh:22,pgd:0},"2025-12-11":{xcoin:67,oreh:24,pgd:0},"2025-12-12":{xcoin:65,oreh:23,pgd:0},"2025-12-13":{xcoin:63,oreh:22,pgd:0},"2025-12-14":{xcoin:61,oreh:20,pgd:0},"2025-12-15":{xcoin:60,oreh:19,pgd:0},"2025-12-16":{xcoin:62,oreh:21,pgd:0},"2025-12-17":{xcoin:64,oreh:22,pgd:0},"2025-12-18":{xcoin:66,oreh:24,pgd:0},"2025-12-19":{xcoin:68,oreh:25,pgd:0},"2025-12-20":{xcoin:67,oreh:23,pgd:0},"2025-12-21":{xcoin:65,oreh:22,pgd:0},"2025-12-22":{xcoin:63,oreh:20,pgd:0},"2025-12-23":{xcoin:62,oreh:19,pgd:0},"2025-12-24":{xcoin:61,oreh:18,pgd:0},"2025-12-25":{xcoin:63,oreh:20,pgd:0},"2025-12-26":{xcoin:65,oreh:21,pgd:0},"2025-12-27":{xcoin:67,oreh:23,pgd:0},"2025-12-28":{xcoin:66,oreh:22,pgd:0},"2025-12-29":{xcoin:64,oreh:21,pgd:0},"2025-12-30":{xcoin:63,oreh:20,pgd:0},"2025-12-31":{xcoin:65,oreh:22,pgd:0},
  // Січень 2026
  "2026-01-01":{xcoin:66,oreh:23,pgd:0},"2026-01-02":{xcoin:67,oreh:22,pgd:0},"2026-01-03":{xcoin:65,oreh:21,pgd:0},"2026-01-04":{xcoin:63,oreh:20,pgd:0},"2026-01-05":{xcoin:61,oreh:19,pgd:0},"2026-01-06":{xcoin:62,oreh:21,pgd:0},"2026-01-07":{xcoin:64,oreh:22,pgd:0},"2026-01-08":{xcoin:66,oreh:24,pgd:0},"2026-01-09":{xcoin:68,oreh:25,pgd:0},"2026-01-10":{xcoin:67,oreh:23,pgd:0},"2026-01-11":{xcoin:65,oreh:22,pgd:0},"2026-01-12":{xcoin:63,oreh:20,pgd:0},"2026-01-13":{xcoin:62,oreh:19,pgd:0},"2026-01-14":{xcoin:61,oreh:18,pgd:0},"2026-01-15":{xcoin:63,oreh:20,pgd:0},"2026-01-16":{xcoin:65,oreh:21,pgd:0},"2026-01-17":{xcoin:67,oreh:23,pgd:0},"2026-01-18":{xcoin:66,oreh:22,pgd:0},"2026-01-19":{xcoin:64,oreh:21,pgd:0},"2026-01-20":{xcoin:63,oreh:20,pgd:0},"2026-01-21":{xcoin:61,oreh:19,pgd:0},"2026-01-22":{xcoin:62,oreh:21,pgd:0},"2026-01-23":{xcoin:64,oreh:22,pgd:0},"2026-01-24":{xcoin:66,oreh:24,pgd:0},"2026-01-25":{xcoin:68,oreh:25,pgd:0},"2026-01-26":{xcoin:67,oreh:23,pgd:0},"2026-01-27":{xcoin:65,oreh:22,pgd:0},"2026-01-28":{xcoin:63,oreh:20,pgd:0},"2026-01-29":{xcoin:62,oreh:19,pgd:0},"2026-01-30":{xcoin:61,oreh:18,pgd:0},"2026-01-31":{xcoin:63,oreh:20,pgd:0},
  // Лютий 2026
  "2026-02-01":{xcoin:64,oreh:21,pgd:0},"2026-02-02":{xcoin:65,oreh:22,pgd:0},"2026-02-03":{xcoin:66,oreh:23,pgd:0},"2026-02-04":{xcoin:67,oreh:24,pgd:0},"2026-02-05":{xcoin:68,oreh:25,pgd:0},"2026-02-06":{xcoin:67,oreh:23,pgd:0},"2026-02-07":{xcoin:66,oreh:22,pgd:0},"2026-02-08":{xcoin:65,oreh:21,pgd:0},"2026-02-09":{xcoin:64,oreh:20,pgd:0},"2026-02-10":{xcoin:63,oreh:19,pgd:0},"2026-02-11":{xcoin:62,oreh:18,pgd:0},"2026-02-12":{xcoin:64,oreh:20,pgd:0},"2026-02-13":{xcoin:65,oreh:21,pgd:0},"2026-02-14":{xcoin:66,oreh:22,pgd:0},"2026-02-15":{xcoin:67,oreh:23,pgd:0},"2026-02-16":{xcoin:68,oreh:24,pgd:0},"2026-02-17":{xcoin:67,oreh:23,pgd:0},"2026-02-18":{xcoin:66,oreh:22,pgd:0},"2026-02-19":{xcoin:65,oreh:21,pgd:0},"2026-02-20":{xcoin:64,oreh:20,pgd:0},"2026-02-21":{xcoin:63,oreh:19,pgd:0},"2026-02-22":{xcoin:64,oreh:21,pgd:0},"2026-02-23":{xcoin:65,oreh:22,pgd:0},"2026-02-24":{xcoin:66,oreh:23,pgd:0},"2026-02-25":{xcoin:67,oreh:24,pgd:0},"2026-02-26":{xcoin:68,oreh:25,pgd:0},"2026-02-27":{xcoin:67,oreh:23,pgd:0},
  // PGD запускається 28 лютого 2026
  "2026-02-28":{xcoin:66,oreh:22,pgd:8},
  // Березень 2026
  "2026-03-01":{xcoin:65,oreh:21,pgd:8},"2026-03-02":{xcoin:64,oreh:20,pgd:9},"2026-03-03":{xcoin:63,oreh:19,pgd:8},"2026-03-04":{xcoin:64,oreh:21,pgd:9},"2026-03-05":{xcoin:65,oreh:22,pgd:10},"2026-03-06":{xcoin:66,oreh:23,pgd:11},"2026-03-07":{xcoin:67,oreh:24,pgd:10},"2026-03-08":{xcoin:68,oreh:25,pgd:11},"2026-03-09":{xcoin:67,oreh:23,pgd:12},"2026-03-10":{xcoin:66,oreh:22,pgd:11},"2026-03-11":{xcoin:65,oreh:21,pgd:12},"2026-03-12":{xcoin:64,oreh:20,pgd:13},"2026-03-13":{xcoin:63,oreh:19,pgd:12},"2026-03-14":{xcoin:64,oreh:21,pgd:13},"2026-03-15":{xcoin:65,oreh:22,pgd:14},"2026-03-16":{xcoin:66,oreh:23,pgd:15},"2026-03-17":{xcoin:67,oreh:24,pgd:14},"2026-03-18":{xcoin:68,oreh:25,pgd:15},"2026-03-19":{xcoin:67,oreh:23,pgd:16},"2026-03-20":{xcoin:66,oreh:22,pgd:17},"2026-03-21":{xcoin:65,oreh:21,pgd:16},"2026-03-22":{xcoin:64,oreh:20,pgd:17},"2026-03-23":{xcoin:63,oreh:19,pgd:18},"2026-03-24":{xcoin:64,oreh:21,pgd:17},"2026-03-25":{xcoin:65,oreh:22,pgd:18},"2026-03-26":{xcoin:66,oreh:23,pgd:19},"2026-03-27":{xcoin:67,oreh:24,pgd:20},"2026-03-28":{xcoin:68,oreh:25,pgd:19},"2026-03-29":{xcoin:67,oreh:23,pgd:20},"2026-03-30":{xcoin:66,oreh:22,pgd:21},"2026-03-31":{xcoin:65,oreh:21,pgd:22},
  // Квітень 2026
  "2026-04-01":{xcoin:64,oreh:20,pgd:21},"2026-04-02":{xcoin:63,oreh:19,pgd:22},"2026-04-03":{xcoin:64,oreh:21,pgd:23},"2026-04-04":{xcoin:65,oreh:22,pgd:24},"2026-04-05":{xcoin:66,oreh:23,pgd:23},"2026-04-06":{xcoin:67,oreh:24,pgd:24},"2026-04-07":{xcoin:68,oreh:25,pgd:25},"2026-04-08":{xcoin:67,oreh:23,pgd:26},"2026-04-09":{xcoin:66,oreh:22,pgd:25},"2026-04-10":{xcoin:65,oreh:21,pgd:26},"2026-04-11":{xcoin:64,oreh:20,pgd:27},"2026-04-12":{xcoin:63,oreh:19,pgd:28},"2026-04-13":{xcoin:64,oreh:21,pgd:27},"2026-04-14":{xcoin:65,oreh:22,pgd:28},"2026-04-15":{xcoin:66,oreh:23,pgd:29},"2026-04-16":{xcoin:67,oreh:24,pgd:30},"2026-04-17":{xcoin:68,oreh:25,pgd:29},"2026-04-18":{xcoin:67,oreh:23,pgd:30},"2026-04-19":{xcoin:66,oreh:22,pgd:31},"2026-04-20":{xcoin:65,oreh:21,pgd:32},"2026-04-21":{xcoin:64,oreh:20,pgd:31},"2026-04-22":{xcoin:63,oreh:19,pgd:32},"2026-04-23":{xcoin:64,oreh:21,pgd:33},"2026-04-24":{xcoin:65,oreh:22,pgd:34},"2026-04-25":{xcoin:66,oreh:23,pgd:33},"2026-04-26":{xcoin:67,oreh:24,pgd:34},"2026-04-27":{xcoin:68,oreh:25,pgd:35},"2026-04-28":{xcoin:67,oreh:23,pgd:36},"2026-04-29":{xcoin:66,oreh:22,pgd:35},"2026-04-30":{xcoin:65,oreh:21,pgd:36},
  // Травень 2026
  "2026-05-01":{xcoin:64,oreh:20,pgd:37},"2026-05-02":{xcoin:63,oreh:19,pgd:36},"2026-05-03":{xcoin:64,oreh:21,pgd:37},"2026-05-04":{xcoin:65,oreh:22,pgd:38},"2026-05-05":{xcoin:66,oreh:23,pgd:39},"2026-05-06":{xcoin:67,oreh:24,pgd:38},"2026-05-07":{xcoin:68,oreh:25,pgd:39},"2026-05-08":{xcoin:67,oreh:23,pgd:40},"2026-05-09":{xcoin:66,oreh:22,pgd:41},"2026-05-10":{xcoin:65,oreh:21,pgd:40},"2026-05-11":{xcoin:64,oreh:20,pgd:41},"2026-05-12":{xcoin:63,oreh:19,pgd:42},"2026-05-13":{xcoin:64,oreh:21,pgd:41},"2026-05-14":{xcoin:65,oreh:22,pgd:42},"2026-05-15":{xcoin:66,oreh:23,pgd:43},"2026-05-16":{xcoin:67,oreh:24,pgd:42},"2026-05-17":{xcoin:68,oreh:25,pgd:43},"2026-05-18":{xcoin:67,oreh:23,pgd:44},"2026-05-19":{xcoin:66,oreh:22,pgd:43},"2026-05-20":{xcoin:65,oreh:21,pgd:44},"2026-05-21":{xcoin:64,oreh:20,pgd:43},"2026-05-22":{xcoin:63,oreh:19,pgd:44},"2026-05-23":{xcoin:64,oreh:21,pgd:43},"2026-05-24":{xcoin:65,oreh:22,pgd:44},"2026-05-25":{xcoin:66,oreh:23,pgd:43},"2026-05-26":{xcoin:67,oreh:24,pgd:44},"2026-05-27":{xcoin:68,oreh:25,pgd:44},"2026-05-28":{xcoin:67,oreh:23,pgd:45},"2026-05-29":{xcoin:66,oreh:22,pgd:44},"2026-05-30":{xcoin:65,oreh:21,pgd:45},"2026-05-31":{xcoin:64,oreh:20,pgd:45}
};

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function getTodayPrice() {
  const key = getTodayKey();
  return dailyRates[key] || { xcoin: 0, oreh: 0, pgd: 0 };
}

let prices = getTodayPrice();

// ============================================================
//  QR Scanner
// ============================================================
let videoOverlay = null, scanInterval = null;

function startBankQRScanner() {
  stopBankQRScanner();
  videoOverlay = document.createElement("div");
  Object.assign(videoOverlay.style, {
    position:"fixed",top:"0",left:"0",width:"100%",height:"100%",
    background:"rgba(0,0,0,0.92)",display:"flex",justifyContent:"center",
    alignItems:"center",zIndex:"9999",flexDirection:"column",gap:"16px"
  });
  document.body.appendChild(videoOverlay);

  const video = document.createElement("video");
  video.setAttribute("playsinline","true");
  Object.assign(video.style,{maxWidth:"90%",maxHeight:"65%",borderRadius:"16px",border:"2px solid #f0c040"});
  videoOverlay.appendChild(video);

  const info = document.createElement("p");
  info.textContent = "📷 Наведи камеру на QR-код";
  Object.assign(info.style,{color:"#f0c040",fontSize:"16px",fontFamily:"sans-serif"});
  videoOverlay.appendChild(info);

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✖ Закрити";
  Object.assign(closeBtn.style,{
    position:"absolute",top:"20px",right:"20px",padding:"10px 20px",
    fontSize:"15px",cursor:"pointer",background:"#e53935",color:"#fff",
    border:"none",borderRadius:"8px",fontWeight:"bold"
  });
  closeBtn.onclick = stopBankQRScanner;
  videoOverlay.appendChild(closeBtn);

  navigator.mediaDevices.getUserMedia({ video: { facingMode:"environment" } })
    .then(stream => {
      video.srcObject = stream; video.play();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      scanInterval = setInterval(() => {
        if (video.readyState !== video.HAVE_ENOUGH_DATA) return;
        canvas.width = video.videoWidth; canvas.height = video.videoHeight;
        ctx.drawImage(video,0,0,canvas.width,canvas.height);
        const imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
        const code = typeof jsQR !== "undefined" && jsQR(imgData.data,imgData.width,imgData.height);
        if (code?.data) { stopBankQRScanner(); processScannedPayload(code.data); }
      }, 300);
    }).catch(stopBankQRScanner);
}

function stopBankQRScanner() {
  if (scanInterval) { clearInterval(scanInterval); scanInterval = null; }
  if (videoOverlay) {
    const v = videoOverlay.querySelector("video");
    if (v?.srcObject) v.srcObject.getTracks().forEach(t => t.stop());
    videoOverlay.remove(); videoOverlay = null;
  }
}

function processScannedPayload(data) {
  const amount = qrCodes[data];
  if (amount !== undefined) {
    nikus = (nikus||0) + amount;
    localStorage.setItem((currentUser||"guest")+"_nikus", nikus);
    MenuBank();
  }
}

// ============================================================
//  CHART
// ============================================================
let priceChart = null;

function buildPGDHistoryData() {
  const todayKey = getTodayKey();
  const labels = [], pgdData = [];
  const keys = Object.keys(dailyRates)
    .filter(k => dailyRates[k].pgd > 0 && k <= todayKey)
    .sort();
  keys.forEach((k, i) => {
    if (i % 3 === 0 || i === keys.length - 1) {
      const [, m, d] = k.split("-");
      labels.push(`${d}.${m}`);
      pgdData.push(dailyRates[k].pgd);
    }
  });
  return { labels, pgdData };
}

function initChart() {
  const canvas = document.getElementById("bankChart");
  if (!canvas) return;
  if (priceChart) { priceChart.destroy(); priceChart = null; }

  const activeTab = document.querySelector(".chart-tab.active")?.dataset?.tab || "history";
  const isHistory = activeTab === "history";

  // Будуємо історію XCoin/OPEX з dailyRates (як PGD)
  function buildXCoinOrehHistory() {
    const todayKey = getTodayKey();
    const labels = [], xcoinData = [], orehData = [];
    const keys = Object.keys(dailyRates)
      .filter(k => k <= todayKey)
      .sort();
    keys.forEach((k, i) => {
      if (i % 3 === 0 || i === keys.length - 1) {
        const [, m, d] = k.split("-");
        labels.push(`${d}.${m}`);
        xcoinData.push(dailyRates[k].xcoin);
        orehData.push(dailyRates[k].oreh);
      }
    });
    return { labels, xcoinData, orehData };
  }

  const { labels: histLabels, xcoinData, orehData } = buildXCoinOrehHistory();
  const { labels: pgdLabels, pgdData } = buildPGDHistoryData();

  priceChart = new Chart(canvas, {
    type: "line",
    data: {
      labels: isHistory ? histLabels : pgdLabels,
      datasets: isHistory ? [
        {
          label:"XCoin", data: xcoinData, borderColor:"#f0c040",
          backgroundColor:"rgba(240,192,64,0.12)", tension:0.4,
          pointRadius:3, pointBackgroundColor:"#f0c040", borderWidth:2
        },
        {
          label:"OPEX", data: orehData, borderColor:"#4caf7d",
          backgroundColor:"rgba(76,175,125,0.12)", tension:0.4,
          pointRadius:3, pointBackgroundColor:"#4caf7d", borderWidth:2
        }
      ] : [
        {
          label:"PGD (Долар Гімназії)", data: pgdData, borderColor:"#42a5f5",
          backgroundColor:"rgba(66,165,245,0.15)", tension:0.4,
          pointRadius:3, pointBackgroundColor:"#42a5f5", borderWidth:2.5,
          fill:true
        }
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{
        legend:{ labels:{ color:"#e8dcc8", font:{ size:12 } } },
        tooltip:{ backgroundColor:"rgba(20,15,8,0.9)", titleColor:"#f0c040", bodyColor:"#e8dcc8" }
      },
      scales:{
        x:{ ticks:{ color:"#a09070", maxRotation:45, maxTicksLimit:10 }, grid:{ color:"rgba(255,255,255,0.05)" } },
        y:{ ticks:{ color:"#a09070" }, grid:{ color:"rgba(255,255,255,0.08)" } }
      }
    }
  });
}

function saveChartData() {
  if (!priceChart) return;
  const d = priceChart.data;
  localStorage.setItem((currentUser||"guest")+"_chartData", JSON.stringify({
    labels: d.labels.slice(-14),
    datasets: d.datasets.map(ds => ({ label:ds.label, data:ds.data.slice(-14) }))
  }));
}

// Очищає збережену історію XCoin/OPEX і скидає графік до сьогоднішнього дня
function clearChartHistory() {
  localStorage.removeItem((currentUser||"guest")+"_chartData");
  if (priceChart) { priceChart.destroy(); priceChart = null; }
  const fresh = {
    labels: [new Date().toLocaleDateString()],
    datasets: [
      { label:"XCoin", data:[prices.xcoin] },
      { label:"OPEX",  data:[prices.oreh]  }
    ]
  };
  localStorage.setItem((currentUser||"guest")+"_chartData", JSON.stringify(fresh));
  initChart();
}

function updatePrice() {
  prices = getTodayPrice();
  if (!priceChart) return;
  const activeTab = document.querySelector(".chart-tab.active")?.dataset?.tab;
  if (activeTab !== "history") return;
  const label = new Date().toLocaleDateString();
  if (priceChart.data.labels.at(-1) !== label) {
    priceChart.data.labels.push(label);
    priceChart.data.datasets[0]?.data.push(prices.xcoin);
    priceChart.data.datasets[1]?.data.push(prices.oreh);
    priceChart.data.labels = priceChart.data.labels.slice(-14);
    priceChart.data.datasets.forEach(ds => ds.data = ds.data.slice(-14));
    priceChart.update();
    saveChartData();
  }
}

// ============================================================
//  TRADE FUNCTIONS
// ============================================================
function tradeXCoin() {
  const input = document.getElementById("xcoinAmount");
  const amount = parseFloat(input?.value);
  const action = document.getElementById("xcoinAction")?.value;
  if (!amount || amount <= 0) return;
  if (action === "buy") {
    const cost = amount * prices.xcoin;
    if ((nikus||0) < cost) return showTradeError("xcoin");
    nikus -= cost; xcoin = (xcoin||0) + amount;
  } else {
    if ((xcoin||0) < amount) return showTradeError("xcoin");
    xcoin -= amount; nikus = (nikus||0) + amount * prices.xcoin;
  }
  localStorage.setItem((currentUser||"guest")+"_nikus", nikus);
  localStorage.setItem((currentUser||"guest")+"_xcoin", xcoin);
  if (input) input.value = "";
  MenuBank();
}

function tradeOreh() {
  const input = document.getElementById("orehAmount");
  const amount = parseFloat(input?.value);
  const action = document.getElementById("orehAction")?.value;
  if (!amount || amount <= 0) return;
  if (action === "buy") {
    const cost = amount * prices.oreh;
    if ((nikus||0) < cost) return showTradeError("oreh");
    nikus -= cost; OPEX = (OPEX||0) + amount;
  } else {
    if ((OPEX||0) < amount) return showTradeError("oreh");
    OPEX -= amount; nikus = (nikus||0) + amount * prices.oreh;
  }
  localStorage.setItem((currentUser||"guest")+"_nikus", nikus);
  localStorage.setItem((currentUser||"guest")+"_OPEX", OPEX);
  if (input) input.value = "";
  MenuBank();
}

function tradePGD() {
  const input = document.getElementById("pgdAmount");
  const amount = parseFloat(input?.value);
  const action = document.getElementById("pgdAction")?.value;
  if (!amount || amount <= 0) return;
  if (action === "buy") {
    const cost = amount * prices.pgd;
    if ((nikus||0) < cost) return showTradeError("pgd");
    nikus -= cost; pgd = (pgd||0) + amount;
  } else {
    if ((pgd||0) < amount) return showTradeError("pgd");
    pgd -= amount; nikus = (nikus||0) + amount * prices.pgd;
  }
  localStorage.setItem((currentUser||"guest")+"_nikus", nikus);
  localStorage.setItem((currentUser||"guest")+"_pgd", pgd);
  if (input) input.value = "";
  MenuBank();
}

function showTradeError(id) {
  const el = document.getElementById(id+"Error");
  if (!el) return;
  el.style.opacity = "1";
  setTimeout(() => { el.style.opacity = "0"; }, 2000);
}

function buyBalance(amount, cost) {
  if ((nikus||0) >= cost) {
    nikus -= cost; balance = Math.round((balance||0) + amount);
    saveData?.();
  } else {
    const el = document.getElementById("shopError");
    if (el) { el.style.opacity = "1"; setTimeout(() => el.style.opacity = "0", 2000); }
  }
}

// ============================================================
//  STYLES (injected once)
// ============================================================
function injectBankStyles() {
  if (document.getElementById("bank-styles")) return;
  const s = document.createElement("style");
  s.id = "bank-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Lato:wght@300;400;700&display=swap');

    :root {
      --gold: #f0c040; --gold2: #d4a520; --green: #4caf7d;
      --blue: #42a5f5; --bg: #0f0c06; --card: rgba(28,22,10,0.88);
      --border: rgba(240,192,64,0.25); --text: #e8dcc8;
      --muted: #a09070; --red: #e53935; --radius: 14px;
    }
    #bank-root * { box-sizing: border-box; }
    #bank-root {
      font-family: 'Lato', sans-serif; color: var(--text);
      background: var(--bg); min-height: 100vh;
      padding: 24px 16px 40px; position: relative;
    }
    #bank-root::before {
      content:''; position:fixed; inset:0;
      background: radial-gradient(ellipse at 20% 20%, rgba(240,192,64,0.06) 0%, transparent 60%),
                  radial-gradient(ellipse at 80% 80%, rgba(76,175,125,0.05) 0%, transparent 60%);
      pointer-events:none; z-index:0;
    }
    .bank-inner { position:relative; z-index:1; max-width:960px; margin:0 auto; }
    .bank-header { text-align:center; margin-bottom:28px; padding-bottom:20px; border-bottom:1px solid var(--border); }
    .bank-header h1 {
      font-family:'Cinzel',serif; font-size:clamp(22px,5vw,36px);
      color:var(--gold); letter-spacing:2px; margin:0 0 4px;
      text-shadow:0 0 20px rgba(240,192,64,0.4);
    }
    .bank-header .subtitle { color:var(--muted); font-size:13px; letter-spacing:1px; }
    .bank-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; margin-bottom:16px; }
    .bank-card {
      background:var(--card); border:1px solid var(--border);
      border-radius:var(--radius); padding:20px; backdrop-filter:blur(8px);
      transition:border-color 0.2s, box-shadow 0.2s;
    }
    .bank-card:hover { border-color:rgba(240,192,64,0.5); box-shadow:0 4px 24px rgba(240,192,64,0.1); }
    .card-title {
      font-family:'Cinzel',serif; font-size:13px; letter-spacing:1px;
      color:var(--gold); text-transform:uppercase; margin:0 0 14px;
      display:flex; align-items:center; gap:8px;
    }
    .card-title .icon { font-size:16px; }
    .balance-row { display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.04); }
    .balance-row:last-child { border-bottom:none; }
    .balance-label { color:var(--muted); font-size:13px; }
    .balance-value { font-weight:700; font-size:16px; }
    .balance-value.gold { color:var(--gold); }
    .balance-value.green { color:var(--green); }
    .balance-value.blue  { color:var(--blue); }
    .balance-value.white { color:#fff; }
    .rate-row { display:flex; justify-content:space-between; align-items:center; padding:9px 0; border-bottom:1px solid rgba(255,255,255,0.04); }
    .rate-row:last-child { border-bottom:none; }
    .rate-name { font-size:14px; font-weight:600; }
    .rate-value { font-size:15px; font-weight:700; }
    .rate-badge { font-size:11px; padding:2px 7px; border-radius:20px; font-weight:700; margin-left:8px; }
    .badge-flat { background:rgba(160,144,112,0.2); color:var(--muted); }
    .pgd-card { border-color:rgba(66,165,245,0.35); }
    .pgd-card .card-title { color:var(--blue); }
    .pgd-highlight {
      background:linear-gradient(135deg,rgba(66,165,245,0.12),rgba(66,165,245,0.04));
      border-radius:10px; padding:12px 16px; margin:12px 0;
      display:flex; justify-content:space-between; align-items:center;
    }
    .pgd-rate-big { font-size:28px; font-weight:700; color:var(--blue); }

    /* CHART */
    .chart-tabs { display:flex; gap:8px; margin-bottom:12px; align-items:center; flex-wrap:wrap; }
    .chart-tab {
      padding:6px 14px; border-radius:20px; font-size:12px; font-weight:700;
      cursor:pointer; border:1px solid var(--border);
      background:transparent; color:var(--muted); letter-spacing:0.5px; transition:all 0.2s;
    }
    .chart-tab.active { background:var(--gold); color:#0f0c06; border-color:var(--gold); }

    /* Кнопка очистити історію — тільки для вкладки XCoin/OPEX */
    .btn-clear-history {
      margin-left:auto; padding:5px 12px; border-radius:20px;
      font-size:11px; font-weight:700; cursor:pointer;
      border:1px solid rgba(229,57,53,0.4);
      background:rgba(229,57,53,0.1); color:#e57373;
      letter-spacing:0.5px; transition:all 0.2s;
      display:none; align-items:center; gap:5px;
    }
    .btn-clear-history:hover { background:rgba(229,57,53,0.25); border-color:#e53935; color:#fff; }
    .btn-clear-history.visible { display:inline-flex; }

    .chart-wrapper { height:200px; position:relative; }
    .trade-row { display:flex; gap:8px; align-items:center; margin-bottom:10px; flex-wrap:wrap; }
    .trade-row input {
      flex:1; min-width:80px; padding:9px 12px; border-radius:8px;
      background:rgba(255,255,255,0.06); border:1px solid var(--border);
      color:var(--text); font-size:14px; outline:none; transition:border-color 0.2s;
    }
    .trade-row input:focus { border-color:var(--gold); }
    .trade-row select {
      padding:9px 10px; border-radius:8px;
      background:rgba(255,255,255,0.08); border:1px solid var(--border);
      color:var(--text); font-size:13px; outline:none; cursor:pointer;
    }
    .btn-trade { padding:9px 16px; border-radius:8px; border:none; cursor:pointer; font-weight:700; font-size:13px; letter-spacing:0.5px; transition:transform 0.1s; }
    .btn-trade:active { transform:scale(0.96); }
    .btn-gold  { background:var(--gold);  color:#0f0c06; }
    .btn-green { background:var(--green); color:#fff; }
    .btn-blue  { background:var(--blue);  color:#fff; }
    .trade-error { color:var(--red); font-size:12px; opacity:0; transition:opacity 0.3s; margin-top:-6px; margin-bottom:4px; }
    .shop-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-top:12px; }
    .shop-item {
      border-radius:10px; overflow:hidden; cursor:pointer;
      border:1px solid var(--border); transition:transform 0.2s, border-color 0.2s, box-shadow 0.2s;
      background:rgba(255,255,255,0.04);
    }
    .shop-item:hover { transform:translateY(-3px); border-color:var(--gold); box-shadow:0 6px 20px rgba(240,192,64,0.2); }
    .shop-item img { width:100%; display:block; border-radius:10px; }
    .shop-label { text-align:center; font-size:11px; color:var(--muted); padding:4px 0; }
    .btn-qr {
      display:inline-flex; align-items:center; gap:8px; padding:12px 24px; border-radius:10px;
      background:linear-gradient(135deg,rgba(240,192,64,0.15),rgba(240,192,64,0.05));
      border:1px solid var(--gold); color:var(--gold); font-size:14px; font-weight:700;
      cursor:pointer; letter-spacing:1px; transition:all 0.2s;
    }
    .btn-qr:hover { background:rgba(240,192,64,0.25); box-shadow:0 4px 16px rgba(240,192,64,0.2); }
    .btn-back {
      display:inline-flex; align-items:center; gap:6px; padding:10px 22px; border-radius:10px;
      background:rgba(255,255,255,0.05); border:1px solid var(--border);
      color:var(--text); font-size:14px; cursor:pointer; transition:all 0.2s;
    }
    .btn-back:hover { background:rgba(255,255,255,0.1); border-color:var(--gold); color:var(--gold); }
    .bank-date { font-size:12px; color:var(--muted); }
    .full-width { grid-column:1/-1; }
  `;
  document.head.appendChild(s);
}

// ============================================================
//  MAIN RENDER
// ============================================================
function getBalanceHTML() {
  return `
    <div class="balance-row">
      <span class="balance-label">💎 Нікуси</span>
      <span class="balance-value gold">${(nikus||0).toFixed(2)}</span>
    </div>
    <div class="balance-row">
      <span class="balance-label">⚡ XCoin</span>
      <span class="balance-value white">${(xcoin||0).toFixed(2)}</span>
    </div>
    <div class="balance-row">
      <span class="balance-label">🌰 OPEX</span>
      <span class="balance-value green">${(OPEX||0).toFixed(2)}</span>
    </div>
    <div class="balance-row">
      <span class="balance-label">💵 Долар Гімназії (PGD)</span>
      <span class="balance-value blue">${((typeof pgd!=="undefined"?pgd:0)||0).toFixed(2)}</span>
    </div>
    <div class="balance-row">
      <span class="balance-label">🎮 Ігрові Нікуси</span>
      <span class="balance-value gold">${(balance||0).toFixed(2)}</span>
    </div>
  `;
}

function MenuBank() {
  injectBankStyles();
  const container = document.getElementById("app");
  if (!container) return;

  prices = getTodayPrice();
  const priceX = prices.xcoin, priceO = prices.oreh, priceP = prices.pgd;
  const todayStr = new Date().toLocaleDateString("uk-UA", {day:"numeric",month:"long",year:"numeric"});

  container.innerHTML = `
    <div id="bank-root">
      <div class="bank-inner">

        <div class="bank-header">
          <h1>🏦 Банк Нікус Кейс Ультра</h1>
          <div class="subtitle">Фінансова система • ${currentUser || "Гість"}</div>
        </div>

        <div class="bank-grid">
          <div class="bank-card">
            <div class="card-title"><span class="icon">💰</span>Ваші Баланси</div>
            <div id="balancesBox">${getBalanceHTML()}</div>
          </div>
          <div class="bank-card">
            <div class="card-title"><span class="icon">📊</span>Курси Сьогодні</div>
            <div class="rate-row">
              <span class="rate-name" style="color:#f0c040">⚡ XCoin</span>
              <span><span class="rate-value" style="color:#f0c040">${priceX}</span><span class="rate-badge badge-flat">нікусів</span></span>
            </div>
            <div class="rate-row">
              <span class="rate-name" style="color:var(--green)">🌰 OPEX</span>
              <span><span class="rate-value" style="color:var(--green)">${priceO}</span><span class="rate-badge badge-flat">нікусів</span></span>
            </div>
            <div class="rate-row">
              <span class="rate-name" style="color:var(--blue)">💵 PGD</span>
              <span><span class="rate-value" style="color:var(--blue)">${priceP}</span><span class="rate-badge badge-flat">нікусів</span></span>
            </div>
            <div style="margin-top:12px;" class="bank-date">🗓 ${todayStr}</div>
          </div>
          <div class="bank-card pgd-card">
            <div class="card-title"><span class="icon">💵</span>Долар Пірнівської Гімназії</div>
            <div class="pgd-highlight">
              <div>
                <div style="font-size:11px;color:var(--muted);margin-bottom:2px">Поточний курс</div>
                <div class="pgd-rate-big">${priceP} <span style="font-size:14px;color:var(--muted)">нікусів</span></div>
              </div>
              <div style="font-size:28px">💵</div>
            </div>
            <div style="font-size:11px;color:var(--muted);line-height:1.7">
              Криптовалюта Пірнівської Гімназії<br>
              Курс встановлюється щоденно
            </div>
          </div>
        </div>

        <!-- CHART -->
        <div class="bank-grid">
          <div class="bank-card full-width">
            <div class="card-title"><span class="icon">📈</span>Графік Курсів</div>
            <div class="chart-tabs">
              <button class="chart-tab active" data-tab="history" onclick="switchChartTab('history')">Історія (XCoin / OPEX)</button>
              <button class="chart-tab" data-tab="pgd" onclick="switchChartTab('pgd')">💵 Графік PGD</button>
              <button class="btn-clear-history visible" id="btnClearHistory" onclick="clearChartHistory()">🗑 Очистити</button>
            </div>
            <div class="chart-wrapper">
              <canvas id="bankChart"></canvas>
            </div>
          </div>
        </div>

        <!-- TRADE -->
        <div class="bank-grid">
          <div class="bank-card">
            <div class="card-title"><span class="icon">💱</span>Торгівля XCoin</div>
            <div class="trade-row">
              <input id="xcoinAmount" type="number" min="0" placeholder="Кількість" />
              <select id="xcoinAction"><option value="buy">Купити</option><option value="sell">Продати</option></select>
              <button class="btn-trade btn-gold" onclick="tradeXCoin()">OK</button>
            </div>
            <div class="trade-error" id="xcoinError">❌ Недостатньо коштів</div>
            <div style="font-size:11px;color:var(--muted)">1 XCoin = ${priceX} нікусів</div>
          </div>
          <div class="bank-card">
            <div class="card-title"><span class="icon">💱</span>Торгівля OPEX</div>
            <div class="trade-row">
              <input id="orehAmount" type="number" min="0" placeholder="Кількість" />
              <select id="orehAction"><option value="buy">Купити</option><option value="sell">Продати</option></select>
              <button class="btn-trade btn-green" onclick="tradeOreh()">OK</button>
            </div>
            <div class="trade-error" id="orehError">❌ Недостатньо коштів</div>
            <div style="font-size:11px;color:var(--muted)">1 OPEX = ${priceO} нікусів</div>
          </div>
          <div class="bank-card pgd-card">
            <div class="card-title"><span class="icon">💵</span>Торгівля PGD</div>
            <div class="trade-row">
              <input id="pgdAmount" type="number" min="0" placeholder="Кількість" />
              <select id="pgdAction"><option value="buy">Купити</option><option value="sell">Продати</option></select>
              <button class="btn-trade btn-blue" onclick="tradePGD()">OK</button>
            </div>
            <div class="trade-error" id="pgdError">❌ Недостатньо коштів</div>
            <div style="font-size:11px;color:var(--muted)">1 PGD = ${priceP} нікусів</div>
          </div>
        </div>

        <!-- QR + SHOP -->
        <div class="bank-grid">
          <div class="bank-card" style="text-align:center;">
            <div class="card-title" style="justify-content:center;"><span class="icon">📲</span>QR-Операції</div>
            <button class="btn-qr" onclick="startBankQRScanner()">📷 Сканувати QR-код</button>
          </div>
          <div class="bank-card full-width">
            <div class="card-title"><span class="icon">🛒</span>Купити Ігрові Нікуси</div>
            <div class="trade-error" id="shopError" style="text-align:center">❌ Недостатньо нікусів</div>
            <div class="shop-grid">
              <div class="shop-item" onclick="buyBalanceAndUpdate(50,12.5)">
                <img src="img/Buy50Balance.png" onerror="this.style.display='none'" />
                <div class="shop-label">+50 за 12.5 нікусів</div>
              </div>
              <div class="shop-item" onclick="buyBalanceAndUpdate(100,25)">
                <img src="img/Buy100Balance.png" onerror="this.style.display='none'" />
                <div class="shop-label">+100 за 25 нікусів</div>
              </div>
              <div class="shop-item" onclick="buyBalanceAndUpdate(250,50)">
                <img src="img/Buy250Balance.png" onerror="this.style.display='none'" />
                <div class="shop-label">+250 за 50 нікусів</div>
              </div>
              <div class="shop-item" onclick="buyBalanceAndUpdate(500,100)">
                <img src="img/Buy500Balance.png" onerror="this.style.display='none'" />
                <div class="shop-label">+500 за 100 нікусів</div>
              </div>
            </div>
          </div>
        </div>

        <div style="text-align:center;margin-top:24px;">
          <button class="btn-back" onclick="mainMenu()">⬅ Головне Меню</button>
        </div>

      </div>
    </div>
  `;

  setTimeout(() => {
    initChart();
    updateClearBtnVisibility();
  }, 50);

  window.buyBalanceAndUpdate = function(amount, cost) {
    const before = nikus;
    buyBalance(amount, cost);
    if (nikus !== before) {
      const box = document.getElementById("balancesBox");
      if (box) box.innerHTML = getBalanceHTML();
    }
  };
}

// Кнопка "Очистити" видима тільки на вкладці XCoin/OPEX (не PGD — там дані з dailyRates)
function updateClearBtnVisibility() {
  const btn = document.getElementById("btnClearHistory");
  if (!btn) return;
  const activeTab = document.querySelector(".chart-tab.active")?.dataset?.tab || "history";
  btn.classList.toggle("visible", activeTab === "history");
}

window.switchChartTab = function(tab) {
  document.querySelectorAll(".chart-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
  updateClearBtnVisibility();
  initChart();
};

const salePacks = [
  { id: "pack_arcade",  name: "Пакет Аркадний",         price: 252, low: 112 },
  { id: "pack_sping",  name: "Пакет Весняний 1",           price: 340, low: 132 },
  { id: "pack_sping2", name: "Пакет Весняний 2",         price: 450, low: 200 },
  { id: "pack_sping3", name: "Пакет Весняний 3",         price: 550, low: 270 },
  { id: "pack_flow",      name: "Пакет «FlowerPower»",         price: 600, low: 275 },
  { id: "pack_flowprem",  name: "Пакет «FlowerPower» Преміум", price: 800, low: 360 },
  { id: "pack_donate",  name: "Донатний пакет",          price: 20,  low: 10  }
];

const SALE_KEY = "saleShopNikus";
const RESET_PASSWORD = "admin1234"; // ← змін пароль тут

function loadSale() {
  try { return JSON.parse(localStorage.getItem(SALE_KEY)); }
  catch { return null; }
}
function saveSale(obj) { localStorage.setItem(SALE_KEY, JSON.stringify(obj)); }

function generateSaleShop() {
  const shuffled = [...salePacks].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 2).map(p => {
    const useNormal = Math.random() < 0.75;
    const price    = (p.id === "pack_donate") ? 20 : Math.floor((useNormal ? p.price : p.low) / 4);
    const wasPrice = (p.id === "pack_donate") ? 25 : Math.floor(p.price / 4);
    const lowPrice = (p.id === "pack_donate") ? 10 : Math.floor(p.low   / 4);
    return { id: p.id, name: p.name, price, wasPrice, lowPrice,
             discountType: useNormal ? "recommended" : "big",
             img: `img/sales/${p.id}.png` };
  });
  const nextUpdate = Date.now() + 48 * 60 * 60 * 1000;
  const payload = { items: selected, nextUpdate };
  saveSale(payload);
  return payload;
}

function getOrCreateSale() {
  const saved = loadSale();
  if (!saved || !saved.nextUpdate || Date.now() >= saved.nextUpdate) return generateSaleShop();
  return saved;
}

function formatRemaining(ms) {
  if (!ms || ms <= 0) return "00:00:00";
  let s = Math.floor(ms / 1000), h = Math.floor(s / 3600);
  s %= 3600; let m = Math.floor(s / 60); s %= 60;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

/* ══════════════════════════════════════════════
   INJECT GLOBAL STYLES (once)
══════════════════════════════════════════════ */
function injectSaleStyles() {
  if (document.getElementById("sale-shop-style")) return;
  const s = document.createElement("style");
  s.id = "sale-shop-style";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Nunito:wght@400;700;800;900&display=swap');

    .sale-wrap {
      font-family: 'Nunito', sans-serif;
      padding: 28px 20px 28px;
      max-width: 960px;
      margin: 0 auto;
      color: #000;
    }

    /* ── header ── */
    .sale-header {
      text-align: center;
      margin-bottom: 30px;
      position: relative;
    }
    .sale-header h2 {
      font-family: 'Orbitron', sans-serif;
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 2px;
      margin: 0 0 6px;
      background: linear-gradient(90deg, #ffe066, #ff9f43, #ff6b6b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 0 14px rgba(255,180,50,.55));
      animation: pulse-glow 3s ease-in-out infinite;
    }
    @keyframes pulse-glow {
      0%,100% { filter: drop-shadow(0 0 10px rgba(255,180,50,.4)); }
      50%      { filter: drop-shadow(0 0 22px rgba(255,180,50,.85)); }
    }
    .sale-subtitle {
      font-size: 13px;
      opacity: .6;
      letter-spacing: .5px;
    }
    .sale-divider {
      width: 80px; height: 3px;
      background: linear-gradient(90deg, transparent, #ffdd57, transparent);
      margin: 10px auto 0;
      border-radius: 2px;
    }

    /* ── section label ── */
    .sale-section-label {
      font-family: 'Orbitron', sans-serif;
      font-size: 11px;
      letter-spacing: 3px;
      opacity: .45;
      text-transform: uppercase;
      text-align: center;
      margin: 0 0 14px;
    }

    /* ── grid ── */
    .sale-grid {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    /* ── card ── */
    .sale-card {
      position: relative;
      width: 250px;
      border-radius: 20px;
      padding: 0;
      overflow: hidden;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 12px 40px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.09);
      transform: translateY(0);
      transition: transform .25s ease, box-shadow .25s ease;
      animation: card-in .45s cubic-bezier(.22,.85,.45,1) both;
    }
    .sale-card:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 20px 55px rgba(0,0,0,.75), inset 0 1px 0 rgba(255,255,255,.12);
    }
    @keyframes card-in {
      from { opacity:0; transform: translateY(28px) scale(.95); }
      to   { opacity:1; transform: translateY(0)    scale(1); }
    }
    .sale-card:nth-child(1) { animation-delay: .05s; }
    .sale-card:nth-child(2) { animation-delay: .15s; }
    .sale-card:nth-child(3) { animation-delay: .25s; }

    .sale-card-strip {
      height: 4px;
      width: 100%;
    }

    .sale-card-body {
      padding: 14px 14px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

   .sale-badge {
      position: absolute;
      top: 14px;
      right: 14px;
      padding: 4px 10px;
      border-radius: 30px;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: .6px;
      text-transform: uppercase;
      backdrop-filter: blur(6px);
      z-index: 5;
    }

    .sale-img-wrap {
      width: 210px;
      height: 115px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;
    }

    .sale-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      position: relative;
      z-index: 1;
      filter: drop-shadow(0 6px 12px rgba(0,0,0,.5));
      transition: transform .3s ease;
    }
    .sale-card:hover .sale-img-wrap img {
      transform: scale(1.06) translateY(-3px);
    }

    .sale-card-name {
      font-size: 14px;
      font-weight: 900;
      text-align: center;
      line-height: 1.2;
      text-shadow:
        -1px -1px 0 #000,
         1px -1px 0 #000,
        -1px  1px 0 #000,
         1px  1px 0 #000;
    }

    .sale-card-price {
      font-family: 'Orbitron', sans-serif;
      font-size: 26px;
      font-weight: 900;
      line-height: 1;
    }

    .sale-card-was {
      font-size: 11px;
      opacity: .55;
      text-decoration: line-through;
    }
    .sale-card-discount-label {
      font-size: 11px;
      opacity: .7;
    }

    .sale-btn {
      width: 100%;
      padding: 12px 0;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      font-family: 'Nunito', sans-serif;
      font-size: 13px;
      font-weight: 900;
      letter-spacing: .3px;
      position: relative;
      overflow: hidden;
      transition: filter .2s, transform .15s;
    }
    .sale-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(255,255,255,.18) 0%, transparent 60%);
      border-radius: inherit;
      pointer-events: none;
    }
    .sale-btn:hover  { filter: brightness(1.15); transform: scale(1.02); }
    .sale-btn:active { filter: brightness(.92);  transform: scale(.98); }

    .sale-card.water-card {
      background: linear-gradient(160deg, rgba(41,182,246,.1) 0%, rgba(0,0,0,.04) 100%);
      border-color: rgba(41,182,246,.25);
    }

    /* ── footer ── */
    .sale-footer {
      margin-top: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }
    .sale-timer-box {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 12px;
      font-size: 13px;
    }
    .sale-timer-label { opacity: .55; }
    .sale-timer-val {
      font-family: 'Orbitron', sans-serif;
      font-size: 15px;
      font-weight: 700;
      color: #ffdd57;
      letter-spacing: 2px;
    }

    .sale-back-btn {
      padding: 10px 18px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,.15);
      cursor: pointer;
      background: rgba(255,255,255,.07);
      color: #000;
      font-family: 'Nunito', sans-serif;
      font-weight: 800;
      font-size: 13px;
      transition: background .2s, transform .15s;
    }
    .sale-back-btn:hover  { background: rgba(255,255,255,.16); transform: scale(1.03); }
    .sale-back-btn:active { transform: scale(.97); }

    /* ── reset button ── */
    .sale-reset-btn {
      padding: 10px 18px;
      border-radius: 12px;
      border: 1px solid rgba(255,80,80,.35);
      cursor: pointer;
      background: rgba(255,60,60,.1);
      color: #ff6b6b;
      font-family: 'Nunito', sans-serif;
      font-weight: 800;
      font-size: 13px;
      transition: background .2s, transform .15s;
    }
    .sale-reset-btn:hover  { background: rgba(255,60,60,.22); transform: scale(1.03); }
    .sale-reset-btn:active { transform: scale(.97); }

    /* ══════════════════════════════════════
       MODAL
    ══════════════════════════════════════ */
    .sale-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.72);
      backdrop-filter: blur(6px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: modal-fade-in .2s ease;
    }
    @keyframes modal-fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    .sale-modal {
      background: #1a1a2e;
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 20px;
      padding: 32px 28px 28px;
      width: 320px;
      max-width: 90vw;
      box-shadow: 0 24px 80px rgba(0,0,0,.8);
      animation: modal-slide-in .25s cubic-bezier(.22,.85,.45,1);
      font-family: 'Nunito', sans-serif;
      color: #fff;
      position: relative;
    }
    @keyframes modal-slide-in {
      from { transform: translateY(30px) scale(.95); opacity: 0; }
      to   { transform: translateY(0)    scale(1);   opacity: 1; }
    }
    .sale-modal-title {
      font-family: 'Orbitron', sans-serif;
      font-size: 16px;
      font-weight: 900;
      margin: 0 0 6px;
      color: #ff6b6b;
    }
    .sale-modal-desc {
      font-size: 13px;
      opacity: .6;
      margin: 0 0 20px;
      line-height: 1.5;
    }
    .sale-modal-input-wrap {
      position: relative;
      margin-bottom: 8px;
    }
    .sale-modal-input {
      width: 100%;
      padding: 12px 44px 12px 14px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,.18);
      background: rgba(255,255,255,.07);
      color: #fff;
      font-family: 'Nunito', sans-serif;
      font-size: 15px;
      font-weight: 700;
      outline: none;
      box-sizing: border-box;
      transition: border-color .2s;
      letter-spacing: 2px;
    }
    .sale-modal-input:focus {
      border-color: rgba(255,107,107,.6);
    }
    .sale-modal-input.error {
      border-color: #ff4444;
      animation: shake .3s ease;
    }
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%,60% { transform: translateX(-6px); }
      40%,80% { transform: translateX(6px); }
    }
    .sale-modal-eye {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      font-size: 18px;
      opacity: .5;
      transition: opacity .15s;
      background: none;
      border: none;
      color: #fff;
      padding: 0;
      line-height: 1;
    }
    .sale-modal-eye:hover { opacity: .9; }
    .sale-modal-error {
      font-size: 12px;
      color: #ff6b6b;
      margin: 0 0 14px;
      min-height: 16px;
    }
    .sale-modal-actions {
      display: flex;
      gap: 10px;
    }
    .sale-modal-confirm {
      flex: 1;
      padding: 12px 0;
      border-radius: 12px;
      border: none;
      background: linear-gradient(90deg, #ff4444, #ff8c42);
      color: #fff;
      font-family: 'Nunito', sans-serif;
      font-weight: 900;
      font-size: 14px;
      cursor: pointer;
      transition: filter .2s, transform .15s;
    }
    .sale-modal-confirm:hover  { filter: brightness(1.15); transform: scale(1.02); }
    .sale-modal-confirm:active { filter: brightness(.9);  transform: scale(.97); }
    .sale-modal-cancel {
      padding: 12px 16px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,.15);
      background: rgba(255,255,255,.07);
      color: #fff;
      font-family: 'Nunito', sans-serif;
      font-weight: 800;
      font-size: 14px;
      cursor: pointer;
      transition: background .2s, transform .15s;
    }
    .sale-modal-cancel:hover  { background: rgba(255,255,255,.15); transform: scale(1.02); }
    .sale-modal-cancel:active { transform: scale(.97); }
    .sale-modal-close {
      position: absolute;
      top: 14px;
      right: 16px;
      background: none;
      border: none;
      color: rgba(255,255,255,.35);
      font-size: 20px;
      cursor: pointer;
      line-height: 1;
      padding: 0;
      transition: color .15s;
    }
    .sale-modal-close:hover { color: rgba(255,255,255,.8); }
  `;
  document.head.appendChild(s);
}

/* ══════════════════════════════════════════════
   RESET MODAL
══════════════════════════════════════════════ */
function openResetModal() {
  // Видаляємо попередню модалку якщо є
  const old = document.getElementById("sale-reset-modal-overlay");
  if (old) old.remove();

  const overlay = document.createElement("div");
  overlay.className = "sale-modal-overlay";
  overlay.id = "sale-reset-modal-overlay";

  overlay.innerHTML = `
    <div class="sale-modal" role="dialog" aria-modal="true">
      <button class="sale-modal-close" onclick="closeResetModal()" title="Закрити">✕</button>
      <div class="sale-modal-title">🔐 Скинути пакети</div>
      <div class="sale-modal-desc">Введіть пароль адміністратора, щоб примусово оновити асортимент магазину.</div>
      <div class="sale-modal-input-wrap">
        <input
          class="sale-modal-input"
          id="sale-reset-password-input"
          type="password"
          placeholder="Пароль"
          autocomplete="off"
          onkeydown="if(event.key==='Enter')confirmResetSale()"
        />
        <button class="sale-modal-eye" id="sale-reset-eye-btn" onclick="toggleResetPasswordVisibility()" title="Показати/приховати">👁</button>
      </div>
      <div class="sale-modal-error" id="sale-reset-error"></div>
      <div class="sale-modal-actions">
        <button class="sale-modal-confirm" onclick="confirmResetSale()">🔄 Скинути</button>
        <button class="sale-modal-cancel" onclick="closeResetModal()">Скасувати</button>
      </div>
    </div>
  `;

  // Закрити при кліку на оверлей (поза модалкою)
  overlay.addEventListener("click", function(e) {
    if (e.target === overlay) closeResetModal();
  });

  document.body.appendChild(overlay);

  // Фокус на поле вводу
  setTimeout(() => {
    const inp = document.getElementById("sale-reset-password-input");
    if (inp) inp.focus();
  }, 50);
}

function closeResetModal() {
  const overlay = document.getElementById("sale-reset-modal-overlay");
  if (!overlay) return;
  overlay.style.opacity = "0";
  overlay.style.transition = "opacity .2s";
  setTimeout(() => overlay.remove(), 200);
}

function toggleResetPasswordVisibility() {
  const inp = document.getElementById("sale-reset-password-input");
  const btn = document.getElementById("sale-reset-eye-btn");
  if (!inp) return;
  if (inp.type === "password") {
    inp.type = "text";
    btn.textContent = "🙈";
  } else {
    inp.type = "password";
    btn.textContent = "👁";
  }
}

function confirmResetSale() {
  const inp = document.getElementById("sale-reset-password-input");
  const errEl = document.getElementById("sale-reset-error");
  if (!inp) return;

  const val = inp.value;

  if (val !== RESET_PASSWORD) {
    errEl.textContent = "❌ Невірний пароль. Спробуйте ще раз.";
    inp.classList.add("error");
    inp.value = "";
    setTimeout(() => inp.classList.remove("error"), 400);
    setTimeout(() => inp.focus(), 50);
    return;
  }

  // Пароль вірний — скидаємо пакети
  errEl.textContent = "";
  closeResetModal();
  generateSaleShop(); // примусово генеруємо нові пакети
  saleShopMenu();     // перемальовуємо магазин
}

/* ══════════════════════════════════════════════
   BUILD CARDS
══════════════════════════════════════════════ */
function buildPackCard(it) {
  const isBig = it.discountType === "big";

  const stripColor = isBig
    ? "linear-gradient(90deg,#ff4444,#ff8c42)"
    : "linear-gradient(90deg,#f7971e,#ffd200)";
  const nameColor  = isBig ? "#ffb3b3" : "#ffeaa7";
  const priceColor = isBig ? "#ff6b6b" : "#ffdd57";
  const btnGrad    = isBig
    ? "linear-gradient(90deg,#ff4444,#ff9a3c)"
    : "linear-gradient(90deg,#f7971e,#ffd200)";
  const btnColor   = isBig ? "#fff" : "#221";
  const badgeBg    = isBig ? "rgba(255,68,68,.85)" : "rgba(247,151,30,.85)";
  const badgeColor = isBig ? "#fff" : "#221";
  const badgeText  = isBig ? "SALE −55%" : "−15%";
  const discLabel  = isBig ? "Велика знижка" : "Рекомендована ціна";

  return `
    <div class="sale-card">
      <div class="sale-card-strip" style="background:${stripColor}"></div>
      <div class="sale-badge" style="background:${badgeBg};color:${badgeColor};">${badgeText}</div>
      <div class="sale-card-body">
        <div class="sale-img-wrap">
          <img src="${it.img}" alt="${it.name}">
        </div>
        <div class="sale-card-name" style="color:${nameColor}">${it.name}</div>
        <div class="sale-card-price" style="color:${priceColor}">${it.price} 💰</div>
        <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center;">
          <span class="sale-card-was">${it.wasPrice} 💰</span>
          <span class="sale-card-discount-label">· ${discLabel}</span>
        </div>
        <button class="sale-btn" style="background:${btnGrad};color:${btnColor};"
          onclick="buySalePack('${it.id}', ${it.price})">
          Купити за ${it.price} 💰
        </button>
      </div>
    </div>
  `;
}

function buildWaterCard() {
  return `
    <div class="sale-card water-card">
      <div class="sale-card-strip" style="background:linear-gradient(90deg,#00b4d8,#90e0ef)"></div>
      <div class="sale-badge" style="background:rgba(41,182,246,.8);color:#000;">Ресурс</div>
      <div class="sale-card-body">
        <div class="sale-img-wrap">
          <img src="img/sales/water.png" alt="Вода">
        </div>
        <div class="sale-card-name" style="color:#90e0ef">Вода (WATER)</div>
        <div class="sale-card-price" style="color:#29b6f6">5 💰</div>
        <div class="sale-card-discount-label" style="opacity:.6;">за 1 одиницю</div>
        <button class="sale-btn"
          style="background:linear-gradient(90deg,#0096c7,#90e0ef);color:#000;"
          onclick="buySalePack('buy_water', 5)">
          Купити 1 WATER
        </button>
      </div>
    </div>
  `;
}

/* ══════════════════════════════════════════════
   MAIN RENDER
══════════════════════════════════════════════ */
function saleShopMenu() {
  injectSaleStyles();
  const sale = getOrCreateSale();
  const timerVal = sale.nextUpdate ? formatRemaining(sale.nextUpdate - Date.now()) : "00:00:00";
  const cardsHtml = sale.items.map(buildPackCard).join("") + buildWaterCard();

  document.getElementById("app").innerHTML = `
    <div class="sale-wrap">
      <div class="sale-header">
        <h2>🔥 АКЦІЙНИЙ МАГАЗИН</h2>
        <div class="sale-subtitle">Асортимент оновлюється кожні 48 годин</div>
        <div class="sale-divider"></div>
      </div>
      <div class="sale-section-label">Доступні пропозиції</div>
      <div class="sale-grid">${cardsHtml}</div>
      <div class="sale-footer">
        <div class="sale-timer-box">
          <span class="sale-timer-label">⏱ Оновлення через</span>
          <span class="sale-timer-val" id="sale-timer">${timerVal}</span>
        </div>
        <button class="sale-reset-btn" onclick="openResetModal()">🔄 Скинути пакети</button>
        <button class="sale-back-btn" onclick="openEventsMenu()">⬅ Назад</button>
      </div>
    </div>
  `;

  startSaleTimer();
}

/* ══════════════════════════════════════════════
   TIMER
══════════════════════════════════════════════ */
let _saleTimerHandle = null;
function startSaleTimer() {
  if (_saleTimerHandle) clearInterval(_saleTimerHandle);
  let sale = loadSale();
  if (!sale || !sale.nextUpdate) sale = generateSaleShop();

  function tick() {
    const left = sale.nextUpdate - Date.now();
    const el   = document.getElementById("sale-timer");
    if (!el) { clearInterval(_saleTimerHandle); _saleTimerHandle = null; return; }
    if (left <= 0) { sale = generateSaleShop(); saleShopMenu(); return; }
    el.innerText = formatRemaining(left);
  }
  tick();
  _saleTimerHandle = setInterval(tick, 1000);
}

/* ══════════════════════════════════════════════
   BUY HANDLER
══════════════════════════════════════════════ */
function buySalePack(id, price) {
  if (typeof nikus === "undefined") { alert("Помилка: змінна nikus не знайдена."); return; }
  if (nikus < price)                { alert("Недостатньо Нікусів!"); return; }

  nikus -= price;

  switch (id) {
    case "pack_arcade":  addCase("arcase",       5); addKey("arcase", 5); break;
    case "pack_sping":  addCase("vesna26box",     5); addCase("vesna26", 4); addCase("vesna26gift", 1); break;
    case "pack_sping2": addCase("vesna26",        5); addCase("vesna26gift", 4); addCase("kolek3", 1); break;
    case "pack_sping3": addCase("vesna26gift",    5); addCase("kolek3", 5); break;
    case "pack_flow":   addCase("flow", 5); break;
    case "pack_flowprem":  addCase("flow", 10); break;
    case "pack_donate":  balance += 100; break;
    case "buy_water":
      if (typeof water !== "number") water = 0;
      water += 1;
      break;
  }

  if (typeof saveData === "function") saveData();
  alert("✅ Покупка успішна!");
  saleShopMenu();
}

/* ══════════════════════════════════════════════
   UTIL
══════════════════════════════════════════════ */
function addItemBulk(type, count) {
  if (typeof inventory === "undefined") inventory = [];
  for (let i = 0; i < count; i++)
    inventory.push({ type, id: `${type}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}` });
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

function updateMissedDays() {
  if (!currentUser) return;

  // Якщо рівень заморожено, штраф не нараховується
  if (levelFreeze) return 0;

  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;

  // скільки цілих днів пройшло з останньої перевірки
  const daysPassed = Math.floor((now - lastLevelCheck) / DAY);

  if (daysPassed > 0) {
    missedDays += daysPassed;       // нараховуємо штрафні дні
    lastLevelCheck += daysPassed * DAY; // зсуваємо таймер
    saveData();                     // зберігаємо оновлені значення
  }

  // повертаємо час до наступного дня у мс
  const timeLeft = DAY - (now - lastLevelCheck);
  return timeLeft > 0 ? timeLeft : 0;
}

// ==================== 🎖 Підвищення рівня ====================
function levelUp() {

updateMissedDays(); // враховуємо пропущені дні

  const price = levelPrice + missedDays * 2;
  if (dosvid < price) {
    alert(`Недостатньо досвіду! Потрібно ${price}, а у тебе ${dosvid}`);
    return;
  }

  // знімаємо досвід
  dosvid -= price;

  // даємо нагороду за tier
  const tier = getTier(level + 1);
  balance += tier.reward.balance;

  // даємо absolute кейси через твою функцію addCase
  addCase("absolute", tier.reward.absolute);

// підвищуємо рівень
level++;

// обчислюємо ціну наступного рівня
levelPrice += tier.add;

// ✅ скидання штрафів і таймера
missedDays = 0;
lastLevelCheck = Date.now();

saveData();

alert(`Рівень підвищено! Тепер у тебе рівень ${level}`);
openLevelMenu();
}
// ==================== 🎖 Отримати tier ====================
function getTier(lvl) {
  if (lvl <= 10) return { add: 4, reward: { absolute: 1, balance: 20 } };
  if (lvl <= 20) return { add: 6, reward: { absolute: 2, balance: 50 } };
  if (lvl <= 30) return { add: 8, reward: { absolute: 3, balance: 75 } };
  return { add: 25, reward: { absolute: 4, balance: 100 } };
}

function openLevelMenu() {
  updateMissedDays(); // враховуємо пропущені дні перед відображенням
  const totalExp = levelPrice + missedDays * 2;
  const progress = Math.min((dosvid / totalExp) * 100, 100);

const nextLevel = level + 1;

let rewardText = "";
if (nextLevel < 11) {
  rewardText = `🎁 +1 Міжсезонний Кейс, 💰 +20 нікусів`;
} else if (nextLevel < 21) {
  rewardText = `🎁 +2 Міжсезонні Кейси, 💰 +50 нікусів`;
} else if (nextLevel < 31) {
  rewardText = `🎁 +3 Міжсезонні Кейси, 💰 +75 нікусів`;
} else {
  rewardText = `🎁 +4 Міжсезонні Кейси, 💰 +100 нікусів`;
}

  let html = `
    <div style="
      max-width:420px;
      margin:20px auto;
      padding:25px;
      background:rgba(30,30,50,0.6);
      backdrop-filter:blur(12px);
      border-radius:20px;
      box-shadow:0 0 25px rgba(0,0,0,0.6);
      text-align:center;
      color:#fff;
      font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    ">
      <h2 style="margin-bottom:15px; color:#ffd966; text-shadow:0 0 12px #ffcc00;">🎖 Прокачка рівня</h2>

      <p style="margin:6px 0; font-size:16px;">Поточний рівень: <b>${level}</b></p>
      <p style="margin:6px 0; font-size:16px;">Пропущено днів: <b>${missedDays}</b></p>

<p style="margin:6px 0; font-size:14px;">
 штраф за пропуск через: <span id="missedTimer">завантаження...</span>
</p>

      <!-- Прогресбар -->
      <div style="margin:15px 0; position:relative;">
        <div style="
          background:rgba(255,255,255,0.2);
          border-radius:14px;
          overflow:hidden;
          height:28px;
        ">
          <div style="
            width:${progress}%;
            height:100%;
            background:linear-gradient(90deg,#77ccff,#00aaff);
            transition:width 0.3s ease;
          "></div>
        </div>
        <span style="
          position:absolute;
          top:2px;
          left:50%;
          transform:translateX(-50%);
          font-weight:bold;
          font-size:14px;
          color:#fff;
          text-shadow:0 0 4px #000;
        ">
          ${dosvid} / ${totalExp} досвіду
        </span>
      </div>

      <!-- Нагорода за цей рівень -->
      <p style="margin:10px 0; font-size:14px; color:#ffd966; font-weight:bold;">Нагорода за наступний рівень: ${rewardText}</p>

      <!-- Кнопка заморозки -->
      <button onclick="toggleLevelFreeze()" style="
        padding:10px 20px;
        font-size:14px;
        font-weight:bold;
        border-radius:12px;
        background:${levelFreeze ? '#ff5555' : '#55ff55'};
        color:#000;
        border:none;
        cursor:pointer;
        margin-bottom:15px;
        box-shadow:0 3px 0 rgba(0,0,0,0.2);
        transition:0.2s;
      " onmouseover="this.style.transform='scale(1.05)';" onmouseout="this.style.transform='scale(1)';">
        ${levelFreeze ? 'Заморожено ✅ Щоб не отримати штраф підвищить рівень до зняття ефекту!' : 'Заморозити ⏸ (коштує 50 нікусів)'}
      </button>

      <div style="margin:10px 0;">
        <button onclick="levelUp()" style="
          padding:12px 25px;
          font-size:16px;
          font-weight:bold;
          border-radius:12px;
          background:linear-gradient(90deg,#00c3ff,#0077ff);
          color:#fff;
          border:none;
          cursor:pointer;
          box-shadow:0 4px 0 rgba(0,0,0,0.3);
          transition:0.2s;
        " onmouseover="this.style.transform='scale(1.05)';" onmouseout="this.style.transform='scale(1)';">
          Підвищити рівень
        </button>
      </div>

      <button onclick="mainMenu()" style="
        margin-top:10px;
        padding:10px 25px;
        font-weight:bold;
        border-radius:12px;
        background:#555;
        color:#fff;
        border:none;
        cursor:pointer;
        transition:0.2s;
      " onmouseover="this.style.background='#777';" onmouseout="this.style.background='#555';">
        Назад
      </button>
    </div>
  `;

  document.getElementById("app").innerHTML = html;


// ===== таймер до наступного штрафу =====
  

// ===== таймер до наступного штрафу =====
const timerEl = document.getElementById("missedTimer");

if (timerEl) {
  function formatTime(ms){
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${h}г ${m}хв ${s}с`;
  }

  // ❌ прибираємо старий інтервал
  if (missedTimerInterval !== null) {
    clearInterval(missedTimerInterval);
  }

  // ✅ створюємо новий
  missedTimerInterval = setInterval(() => {
    const left = updateMissedDays();
    timerEl.innerText = formatTime(left);
  }, 1000);
}
}
// ==================== 🎖 Перемикач заморозки ====================

function toggleLevelFreeze() {
  const freezeCost = 50;

  if (!levelFreeze) {
    if (nikus < freezeCost) {
      alert(`Недостатньо нікусів! Потрібно ${freezeCost}`);
      return;
    }
    nikus -= freezeCost;
  }

  levelFreeze = !levelFreeze;
  saveData();        // ← тепер зберігається і стан кнопки
  openLevelMenu();
}

const allItems = [
  // Arcade
  {name:"Скелет", img:"skeleton.png", rarity:"Секретна", collection:"Arcade"},
  {name:"Мужик", img:"man.png", rarity:"Секретна", collection:"Arcade"},
  {name:"Арбітражнік", img:"arbitrajnik.png", rarity:"Епічна", collection:"Arcade"},
  {name:"Такблін", img:"takblin.png", rarity:"Епічна", collection:"Arcade"},
  {name:"ЧомуКіт", img:"chomukit.png", rarity:"Виняткова", collection:"Arcade"},
  {name:"Картофель", img:"kartofel.png", rarity:"Виняткова", collection:"Arcade"},
  {name:"Щотинакоїв", img:"shotinakoiv.png", rarity:"Звичайна", collection:"Arcade"},
  {name:"Услезах", img:"uslezah.png", rarity:"Звичайна", collection:"Arcade"},

// Harvest25
  {name:"Бобер", img:"beaver.png", rarity:"Епічна", collection:"Harvest25"},
  {name:"Квадробер", img:"quadbeaver.png", rarity:"Виняткова", collection:"Harvest25"},
  {name:"Веном", img:"venom.png", rarity:"Звичайна", collection:"Harvest25"},
  {name:"Ліларіла", img:"lalirala.png", rarity:"Секретна", collection:"Harvest25"},

  // FallAlternative25
  {name:"Супермен", img:"superman.png", rarity:"Секретна", collection:"FallAlternative25"},
  {name:"Нагетс", img:"nugget.png", rarity:"Епічна", collection:"FallAlternative25"},
  {name:"Доге", img:"doge.png", rarity:"Епічна", collection:"FallAlternative25"},
  {name:"Ракета-кіт", img:"rocketcat.png", rarity:"Виняткова", collection:"FallAlternative25"},
  {name:"Хорор-кіт", img:"horrorcat.png", rarity:"Виняткова", collection:"FallAlternative25"},
  {name:"Дракон", img:"dragon.png", rarity:"Звичайна", collection:"FallAlternative25"},
  {name:"Булінг-кіт", img:"bullycat.png", rarity:"Звичайна", collection:"FallAlternative25"},

  //osin25
  {name:"Бомбордіро", img:"red1.png", rarity:"Секретна", collection:"Autumn25"},
  {name:"Тунг-Сахур", img:"red3.png", rarity:"Секретна", collection:"Autumn25"},
  {name:"Тралалеро", img:"red2.png", rarity:"Секретна", collection:"Autumn25"}, 
  {name:"Волтер Вайт", img:"purple1.png", rarity:"Епічна", collection:"Autumn25"},  
  {name:"Сігма", img:"purple2.png", rarity:"Епічна", collection:"Autumn25"},
  {name:"Сатана", img:"blue2.png", rarity:"Виняткова", collection:"Autumn25"},
  {name:"Хамстер", img:"blue1.png", rarity:"Виняткова", collection:"Autumn25"},
  {name:"Пасхалочник", img:"green1.png", rarity:"Звичайна", collection:"Autumn25"},
  {name:"Єнот", img:"green2.png", rarity:"Звичайна", collection:"Autumn25"},
 

// Halloween25
  {name:"Пепе", img:"pepe.png", rarity:"Секретна", collection:"Halloween25"},
  {name:"Крутий", img:"krutyi.png", rarity:"Секретна", collection:"Halloween25"},
  {name:"Санс", img:"sans.png", rarity:"Епічна", collection:"Halloween25"},
  {name:"РозумнаЛюдина", img:"rozumna.png", rarity:"Епічна", collection:"Halloween25"},
  {name:"ДикийОгірок", img:"cucumber.png", rarity:"Виняткова", collection:"Halloween25"},
  {name:"МастурБіст", img:"masturbist.png", rarity:"Виняткова", collection:"Halloween25"},
  {name:"Ждун", img:"zhdun.png", rarity:"Звичайна", collection:"Halloween25"},
  {name:"Троль", img:"troll.png", rarity:"Звичайна", collection:"Halloween25"},
  {name:"Лавочка", img:"lav.png", rarity:"Секретна", collection:"Halloween25"},
  {name:"Йогурт", img:"yog.png", rarity:"Секретна", collection:"Halloween25"},
  {name:"Живчик", img:"jiv.png", rarity:"Епічна", collection:"Halloween25"},
  {name:"Пістолетік", img:"pistol.png", rarity:"Епічна", collection:"Halloween25"},
  {name:"ГДЗ", img:"gdz.png", rarity:"Виняткова", collection:"Halloween25"},
  {name:"Чат Гпт", img:"gpt.png", rarity:"Виняткова", collection:"Halloween25"},
  {name:"Мʼяч", img:"mi.png", rarity:"Звичайна", collection:"Halloween25"},
  {name:"ніщета", img:"ni.png", rarity:"Звичайна", collection:"Halloween25"},

   // Wint25 / WinterDreams
  {name:"Втікай", img:"V.png", rarity:"Секретна", collection:"Winter25"},
  {name:"Хомʼяк", img:"H.png", rarity:"Секретна", collection:"Winter25"},
  {name:"Котик", img:"K.png", rarity:"Секретна", collection:"Winter25"},
  {name:"КимЧенДрин", img:"KD.png", rarity:"Епічна", collection:"Winter25"},
  {name:"Окак", img:"OKAK.png", rarity:"Епічна", collection:"Winter25"},
  {name:"Кіт-Борщ", img:"B.png", rarity:"Епічна", collection:"Winter25"},
  {name:"Людина", img:"L.png", rarity:"Виняткова", collection:"Winter25"},
  {name:"ОБЛЯТЬ", img:"OBL.png", rarity:"Виняткова", collection:"Winter25"},
  {name:"Привіт,Друже", img:"PR.png", rarity:"Виняткова", collection:"Winter25"},
  {name:"Попугайчик", img:"PP.png", rarity:"Звичайна", collection:"Winter25"},
  {name:"Сумно", img:"S.png", rarity:"Звичайна", collection:"Winter25"},
  {name:"1487", img:"1487.png", rarity:"Звичайна", collection:"Winter25"},

  {name:"Вищета", img:"21.png", rarity:"Секретна", collection:"Winter25"},
  {name:"Пірнівський Двіж", img:"22.png", rarity:"Секретна", collection:"Winter25"},
  {name:"ППО", img:"23.png", rarity:"Епічна", collection:"Winter25"},
  {name:"Крейда", img:"24.png", rarity:"Епічна", collection:"Winter25"},
  {name:"Зошит", img:"25.png", rarity:"Виняткова", collection:"Winter25"},
  {name:"Мʼята", img:"26.png", rarity:"Виняткова", collection:"Winter25"},
  {name:"Хліб", img:"27.png", rarity:"Звичайна", collection:"Winter25"},
  {name:"Динозавр", img:"dino.png", rarity:"Звичайна", collection:"Winter25"},

 // WDGASTER
  {name:"Стонкс", img:"51.png", rarity:"Секретна", collection:"WINTERDREAMS"},
  {name:"Містер Пропер", img:"52.png", rarity:"Секретна", collection:"WINTERDREAMS"},
  {name:"Надрозум", img:"53.png", rarity:"Епічна", collection:"WINTERDREAMS"},
  {name:"Попугай-а", img:"54.png", rarity:"Епічна", collection:"WINTERDREAMS"},
  {name:"Том", img:"55.png", rarity:"Виняткова", collection:"WINTERDREAMS"},
  {name:"Белуга", img:"56.png", rarity:"Виняткова", collection:"WINTERDREAMS"},
  {name:"нот-стонкс", img:"57.png", rarity:"Звичайна", collection:"WINTERDREAMS"},
  {name:"І що?", img:"58.png", rarity:"Звичайна", collection:"WINTERDREAMS"},

// NN
  {name:"Золоте-Дерево", img:"G4.png", rarity:"Секретна", collection:"NASINNA1"},
  {name:"Соняшник", img:"G3.png", rarity:"Епічна", collection:"NASINNA1"},
  {name:"Буде-ПопКорн", img:"G2.png", rarity:"Виняткова", collection:"NASINNA1"},
  {name:"Гарбуз", img:"G1.png", rarity:"Звичайна", collection:"NASINNA1"},

  // NN2
  {name:"Річік", img:"rihic2.png", rarity:"Секретна", collection:"NASINNA2"},
  {name:"Кіт—криптовалютчик", img:"kitk.png", rarity:"Епічна", collection:"NASINNA2"},
  {name:"Капібара", img:"kapabara1.png", rarity:"Виняткова", collection:"NASINNA2"},
  {name:"Кіт у хлібі", img:"kitu.png", rarity:"Звичайна", collection:"NASINNA2"},

  // CatCollection
  {name:"Кукі", img:"kuki.png", rarity:"Спеціальна", collection:"CatCollection"},
  {name:"Панда", img:"panda.png", rarity:"Спеціальна", collection:"CatCollection"},
  {name:"Уііа—Кіт", img:"oia.png", rarity:"Секретна", collection:"CatCollection"},
  {name:"Шльопа", img:"Floppa.png", rarity:"Секретна", collection:"CatCollection"},
  {name:"Перехожий", img:"X.png", rarity:"Епічна", collection:"CatCollection"},
  {name:"Максвел", img:"MAX.png", rarity:"Епічна", collection:"CatCollection"},
  {name:"ОКАК v2", img:"OKAK2.png", rarity:"Виняткова", collection:"CatCollection"},
  {name:"(CT)Cat", img:"ct.png", rarity:"Виняткова", collection:"CatCollection"},
  {name:"Ригачело", img:"ROGALO.png", rarity:"Звичайна", collection:"CatCollection"},
  {name:"ШІ—КІТ", img:"AIKIT.png", rarity:"Звичайна", collection:"CatCollection"},

  // DogCollection
  {name:"Річік—Казіно", img:"rihik.png", rarity:"Секретна", collection:"DogCollection"},
  {name:"Пес Патрон", img:"patron.png", rarity:"Секретна", collection:"DogCollection"},
  {name:"Бен", img:"ben.png", rarity:"Епічна", collection:"DogCollection"},
  {name:"Доге Качок", img:"kahok.png", rarity:"Епічна", collection:"DogCollection"},
  {name:"Собака?", img:"iu.png", rarity:"Виняткова", collection:"DogCollection"},
  {name:"Собалдо", img:"sobaldo.png", rarity:"Виняткова", collection:"DogCollection"},
  {name:"Мопс", img:"mops.png", rarity:"Звичайна", collection:"DogCollection"},
  {name:"Броне—Собака", img:"kepka.png", rarity:"Звичайна", collection:"DogCollection"},

  // Absolute
  {name:"Еля", img:"ela.png", rarity:"Спеціальна", collection:"Mid-season"},
  {name:"Дід Казіно", img:"didkazino.png", rarity:"Секретна", collection:"Mid-season"},
  {name:"67", img:"67.png", rarity:"Секретна", collection:"Mid-season"},
  {name:"ЧасПокаже", img:"rabbit.png", rarity:"Епічна", collection:"Mid-season"},
  {name:"АбсолютСінема", img:"cinema.png", rarity:"Епічна", collection:"Mid-season"},
  {name:"Проблематично", img:"ptax1.png", rarity:"Виняткова", collection:"Mid-season"},
  {name:"Малоймовірно", img:"ptax2.png", rarity:"Виняткова", collection:"Mid-season"},
  {name:"50 на 50", img:"ptax3.png", rarity:"Звичайна", collection:"Mid-season"},
  {name:"Навряд чи", img:"ptax4.png", rarity:"Звичайна", collection:"Mid-season"},

// NN2
  {name:"Гусь", img:"j1.png", rarity:"Секретна", collection:"NASINNA3"},
  {name:"Гарфілд", img:"j2.png", rarity:"Епічна", collection:"NASINNA3"},
  {name:"Кітікет", img:"j3.png", rarity:"Виняткова", collection:"NASINNA3"},
  {name:"Полуниця", img:"j4.png", rarity:"Звичайна", collection:"NASINNA3"},

  //Весна26
  {name:"Епштейн", img:"epstein.png", rarity:"Спеціальна", collection:"Весна26"},
  {name:"Халяльний Кріпер", img:"halal.png", rarity:"Спеціальна", collection:"Весна26"},
  {name:"Потужно", img:"potuhno.png", rarity:"Секретна", collection:"Весна26"},
  {name:"Морські Котики", img:"sealcore.png", rarity:"Секретна", collection:"Весна26"},
  {name:"Дуолінго", img:"duolingo.png", rarity:"Епічна", collection:"Весна26"},
  {name:"ВІВІІ(67)", img:"VIVII.png", rarity:"Епічна", collection:"Весна26"},
  {name:"ЯкВінСебеПочуває", img:"110.png", rarity:"Виняткова", collection:"Весна26"},
  {name:"5X30", img:"5x30.png", rarity:"Виняткова", collection:"Весна26"},
  {name:"Тіймейтище", img:"qwirt.png", rarity:"Звичайна", collection:"Весна26"},
  {name:"ДругПетух", img:"drugpetuh.png", rarity:"Звичайна", collection:"Весна26"},

  {name:"Кулдудка", img:"kolek31.png", rarity:"Секретна", collection:"Весна26"},
  {name:"Ксенатор", img:"kolek32.png", rarity:"Секретна", collection:"Весна26"},
  {name:"ТвійКіт", img:"kolek33.png", rarity:"Епічна", collection:"Весна26"},
  {name:"Масони", img:"kolek34.png", rarity:"Епічна", collection:"Весна26"},
  {name:"НіхєраСобі…", img:"kolek35.png", rarity:"Виняткова", collection:"Весна26"},
  {name:"РусняЗнайдена", img:"kolek36.png", rarity:"Виняткова", collection:"Весна26"},
  {name:"ТвійНайкращийДруг", img:"kolek37.png", rarity:"Звичайна", collection:"Весна26"},
  {name:"ОстаннійДеньЛіта…", img:"kolek38.png", rarity:"Звичайна", collection:"Весна26"},

  // Фловерповер26
  {name:"NyanCat", img:"flow1.png", rarity:"Спеціальна", collection:"FlowerPower26"},
  {name:"Кишечка", img:"flow2.png", rarity:"Спеціальна", collection:"FlowerPower26"},
  {name:"Містер Секретний", img:"flow3.png", rarity:"Секретна", collection:"FlowerPower26"},
  {name:"ДжонПорк", img:"flow4.png", rarity:"Секретна", collection:"FlowerPower26"},
  {name:"СпінінгКет", img:"flow5.png", rarity:"Епічна", collection:"FlowerPower26"},
  {name:"ЕплДог", img:"flow6.png", rarity:"Епічна", collection:"FlowerPower26"},
  {name:"Параліпіпід", img:"flow7.png", rarity:"Виняткова", collection:"FlowerPower26"},
  {name:"Пінапласт", img:"flow8.png", rarity:"Виняткова", collection:"FlowerPower26"},
  {name:"Піпетка", img:"flow9.png", rarity:"Звичайна", collection:"FlowerPower26"},
  {name:"Піпідастр", img:"flow10.png", rarity:"Звичайна", collection:"FlowerPower26"}

];

//  НОВИЙ РИНОК
// ═══════════════════════════════════════════════════════════════════

// ─── Динаміка цін ───────────────────────────────────────────────────
const MARKET_PRICE_KEY   = "marketPriceHistory";
const MARKET_REGEN_KEY   = "marketPriceNextRegen";
const REGEN_INTERVAL_MS  = 60 * 60 * 1000; // 1 година

// Базові ціни рідкості (нікусів)
const RARITY_BASE = {
  "Звичайна":   5,
  "Виняткова": 10,
  "Епічна":    22,
  "Секретна": 120,
  "Спеціальна":600
};

// Respect-множник колекції
const collectionRespect = {
  "Harvest":          1.5,
  "Harvest25":        0.9,
  "NASINNA1":         2.5,
  "NASINNA2":         2.5,
  "NASINNA2":         2.0,
  "Autumn25":         0.9,
  "FallAlternative25":1.25,
  "Halloween25":      1.0,
  "Winter25":         0.55,
  "WINTERDREAMS":     0.9,
  "CatCollection":    0.6,
  "DogCollection":    0.6,
  "Mid-season":       0.5,
  "FlowerPower26":    0.55,
  "Весна26":          0.45
};

// ─── Генерація / кешування коефіцієнтів ────────────────────────────

function _getMarketMultipliers() {
  let data = null;
  try { data = JSON.parse(localStorage.getItem(MARKET_PRICE_KEY)); } catch {}
  const now = Date.now();

  // Захист: якщо nextRegen більше ніж 2 години від зараз — скидаємо (баг зі старим значенням)
  if (data && data.nextRegen && (data.nextRegen - now) > 2 * 60 * 60 * 1000) {
    data = null;
    localStorage.removeItem(MARKET_PRICE_KEY);
  }

  if (!data || !data.mults || now >= (data.nextRegen || 0)) {

    const mults = {};
    allItems.forEach(item => {
      const trend = 0.7 + Math.random() * 0.8;
      mults[item.name] = +trend.toFixed(3);
    });
    data = { mults, nextRegen: now + REGEN_INTERVAL_MS, lastUpdated: now };
    localStorage.setItem(MARKET_PRICE_KEY, JSON.stringify(data));
  }
  return data;
}

function _getHistory() {
  let h = null;
  try { h = JSON.parse(localStorage.getItem("marketPriceHistory2")); } catch {}
  if (!h) h = {};
  return h;
}

function _recordPrice(name, price) {
  const h = _getHistory();
  if (!h[name]) h[name] = [];
  h[name].push({ t: Date.now(), p: price });
  if (h[name].length > 12) h[name] = h[name].slice(-12);
  localStorage.setItem("marketPriceHistory2", JSON.stringify(h));
}

// ─── Розрахунок ціни ────────────────────────────────────────────────
function getItemPrice(item) {
  const baseItem = allItems.find(i => i.name === item.name) || {};
  const rarity     = baseItem.rarity  || item.rarity  || "Звичайна";
  const collection = baseItem.collection || item.collection || "";

  let price = RARITY_BASE[rarity] || 5;

  const qMult = {
    "Прямо з цеху":      1.35,
    "Після консервації": 1.15,
    "Після уроку":       1.0,
    "Зношена":           0.65
  }[item.quality] || 1.0;

  const pMult = item.premium ? 2.5 : 1;

  const rMult = (collectionRespect[collection] || 0.5) / 0.5;

  const data  = _getMarketMultipliers();
  const trend = data.mults[item.name] || 1.0;

  price = Math.ceil(price * qMult * pMult * rMult * trend);
  return price;
}

function getQualityMultiplier(quality) {
  return {
    "Прямо з цеху":      1.35,
    "Після консервації": 1.15,
    "Після уроку":       1.0,
    "Зношена":           0.65
  }[quality] || 1;
}

// ─── CSS теми ───────────────────────────────────────────────────────
function _injectMarketCSS() {
  if (document.getElementById("mkt-css")) return;
  const s = document.createElement("style");
  s.id = "mkt-css";
  s.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');

:root {
  --mkt-bg:      #0d0f15;
  --mkt-panel:   #13161e;
  --mkt-card:    #191d28;
  --mkt-border:  rgba(255,255,255,.07);
  --mkt-accent:  #f0c050;
  --mkt-green:   #4ade80;
  --mkt-red:     #f87171;
  --mkt-blue:    #60a5fa;
  --mkt-purple:  #c084fc;
  --mkt-text:    #e2e8f0;
  --mkt-muted:   #64748b;
}

#mkt-root {
  font-family: 'DM Sans', sans-serif;
  background: var(--mkt-bg);
  color: var(--mkt-text);
  min-height: 100vh;
  padding: 0 0 60px;
  box-sizing: border-box;
}

.mkt-header {
  background: linear-gradient(180deg,#191d28 0%,transparent 100%);
  padding: 16px 20px 0;
  position: sticky; top: 0; z-index: 90;
  backdrop-filter: blur(12px);
}
.mkt-header-row {
  display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--mkt-border);
}
.mkt-title {
  font-family: 'Bebas Neue', cursive;
  font-size: 30px; letter-spacing: 3px;
  color: var(--mkt-accent);
  text-shadow: 0 0 25px rgba(240,192,80,.45);
  flex: 1;
}
.mkt-balance-chip {
  background: rgba(240,192,80,.12);
  border: 1px solid rgba(240,192,80,.3);
  border-radius: 30px;
  padding: 6px 16px;
  font-weight: 700; font-size: 14px;
  color: var(--mkt-accent);
}
.mkt-back-btn {
  background: rgba(255,255,255,.06);
  border: 1px solid var(--mkt-border);
  color: var(--mkt-muted);
  border-radius: 10px;
  padding: 7px 14px;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px; font-weight: 600;
  transition: .2s;
}
.mkt-back-btn:hover { background: rgba(255,255,255,.1); color: #fff; }

.mkt-tabs {
  display: flex; gap: 6px; padding: 12px 20px;
  overflow-x: auto; scrollbar-width: none;
}
.mkt-tabs::-webkit-scrollbar { display: none; }
.mkt-tab {
  flex-shrink: 0;
  background: var(--mkt-panel);
  border: 1px solid var(--mkt-border);
  color: var(--mkt-muted);
  border-radius: 8px;
  padding: 6px 16px;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px; font-weight: 700;
  letter-spacing: .5px;
  transition: .2s;
}
.mkt-tab:hover { border-color: var(--mkt-accent); color: var(--mkt-text); }
.mkt-tab.active {
  background: rgba(240,192,80,.15);
  border-color: var(--mkt-accent);
  color: var(--mkt-accent);
}

.mkt-toolbar {
  display: flex; gap: 10px; padding: 0 20px 14px; flex-wrap: wrap; align-items: center;
}
.mkt-search {
  flex: 1; min-width: 160px;
  background: var(--mkt-panel);
  border: 1px solid var(--mkt-border);
  color: var(--mkt-text);
  padding: 9px 14px;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  outline: none;
  transition: border-color .2s;
}
.mkt-search:focus { border-color: var(--mkt-accent); }
.mkt-search::placeholder { color: var(--mkt-muted); }
.mkt-sort {
  background: var(--mkt-panel);
  border: 1px solid var(--mkt-border);
  color: var(--mkt-text);
  padding: 9px 12px;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px; font-weight: 600;
  cursor: pointer; outline: none;
}
.mkt-mode-btn {
  background: var(--mkt-panel);
  border: 1px solid var(--mkt-border);
  color: var(--mkt-muted);
  border-radius: 10px;
  padding: 9px 14px;
  cursor: pointer; font-size: 16px;
  transition: .2s;
}
.mkt-mode-btn.active { border-color: var(--mkt-accent); color: var(--mkt-accent); }

.mkt-ticker-wrap {
  overflow: hidden; background: rgba(240,192,80,.05);
  border-top: 1px solid rgba(240,192,80,.12);
  border-bottom: 1px solid rgba(240,192,80,.12);
  padding: 5px 0;
}
.mkt-ticker-track {
  display: flex; gap: 40px; width: max-content;
  animation: mktTicker 30s linear infinite;
}
@keyframes mktTicker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.mkt-ticker-item {
  flex-shrink: 0;
  font-size: 11px; font-weight: 700; letter-spacing: .5px;
  display: flex; align-items: center; gap: 6px;
}
.mkt-ticker-name { color: var(--mkt-muted); }
.mkt-ticker-price { color: var(--mkt-text); }
.mkt-ticker-up   { color: var(--mkt-green); }
.mkt-ticker-down { color: var(--mkt-red); }

.mkt-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 14px;
  padding: 16px 20px;
}
.mkt-list-mode .mkt-grid { grid-template-columns: 1fr; }

.mkt-card {
  background: var(--mkt-card);
  border: 1px solid var(--mkt-border);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: transform .2s, box-shadow .2s, border-color .2s;
  position: relative;
}
.mkt-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 35px rgba(0,0,0,.5);
  border-color: rgba(255,255,255,.18);
}
.mkt-card-top { height: 3px; width: 100%; }
.mkt-card-img-wrap {
  display: flex; align-items: center; justify-content: center;
  padding: 16px 10px 8px;
  background: radial-gradient(ellipse at 50% 50%, rgba(255,255,255,.03) 0%, transparent 70%);
  position: relative;
}
.mkt-card-img {
  width: 100px; height: 76px;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,.6));
  transition: transform .25s;
}
.mkt-card:hover .mkt-card-img { transform: scale(1.08) translateY(-3px); }
.mkt-card-owned-badge {
  position: absolute; top: 8px; right: 8px;
  background: rgba(74,222,128,.18);
  border: 1px solid rgba(74,222,128,.4);
  color: #4ade80;
  font-size: 9px; font-weight: 800;
  padding: 2px 7px; border-radius: 20px;
  letter-spacing: .5px;
}
.mkt-card-info { padding: 0 12px 14px; }
.mkt-card-name {
  font-size: 12px; font-weight: 700;
  color: #e2e8f0; margin-bottom: 5px;
  line-height: 1.2;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.mkt-card-row {
  display: flex; align-items: center; justify-content: space-between; gap: 4px;
}
.mkt-card-rarity {
  font-size: 9px; font-weight: 800;
  padding: 2px 7px; border-radius: 3px;
  text-transform: uppercase; letter-spacing: .5px;
}
.mkt-card-price { font-size: 13px; font-weight: 700; color: var(--mkt-accent); }
.mkt-card-trend { font-size: 10px; font-weight: 700; letter-spacing: .3px; }

.mkt-list-mode .mkt-card { border-radius: 12px; }
.mkt-list-mode .mkt-card-img-wrap { display: none; }
.mkt-list-mode .mkt-card-top { display: none; }
.mkt-list-row { display: none; align-items: center; gap: 14px; padding: 12px 16px; }
.mkt-list-mode .mkt-card-info { display: none; }
.mkt-list-mode .mkt-list-row { display: flex; }
.mkt-list-mode .mkt-card:hover { transform: none; box-shadow: 0 0 0 1px rgba(240,192,80,.4); }
.mkt-list-img { width: 44px; height: 36px; object-fit: contain; filter: drop-shadow(0 2px 6px rgba(0,0,0,.5)); flex-shrink: 0; }
.mkt-list-name { flex: 1; font-size: 13px; font-weight: 700; }
.mkt-list-collection { font-size: 10px; color: var(--mkt-muted); font-weight: 600; letter-spacing: .5px; }
.mkt-list-price { font-size: 14px; font-weight: 700; color: var(--mkt-accent); white-space: nowrap; }

.mkt-empty { grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--mkt-muted); font-size: 14px; }
.mkt-empty-icon { font-size: 48px; margin-bottom: 10px; }

.mkt-regen-timer { text-align: center; padding: 8px; font-size: 11px; font-weight: 700; color: var(--mkt-muted); letter-spacing: .5px; }
.mkt-regen-timer span { color: var(--mkt-accent); }

#mkt-root ::-webkit-scrollbar { width: 4px; }
#mkt-root ::-webkit-scrollbar-track { background: transparent; }
#mkt-root ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 4px; }

#mkt-toast {
  position: fixed; bottom: 24px; left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: linear-gradient(90deg,#191d28,#232836);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 50px; padding: 12px 28px;
  font-weight: 700; font-size: 14px;
  color: var(--mkt-text);
  z-index: 99999; opacity: 0; pointer-events: none;
  transition: all .35s cubic-bezier(.34,1.56,.64,1);
  white-space: nowrap;
  box-shadow: 0 8px 30px rgba(0,0,0,.6);
}
#mkt-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
#mkt-toast.success { border-color: rgba(74,222,128,.4); color: #4ade80; }
#mkt-toast.error   { border-color: rgba(248,113,113,.4); color: #f87171; }
  `;
  document.head.appendChild(s);
}

// ─── Statestore ─────────────────────────────────────────────────────
let _mktState = {
  collection: null,
  search: "",
  sort: "price_desc",
  listMode: false,
  selectedForSell: [],
  buyQty: 1,
  buyQuality: "Після уроку",
  buyPremium: false,
  openItem: null
};
let _mktRegenTimer = null;

// ─── Helpers ────────────────────────────────────────────────────────
function _rarityColor(r) {
  return { "Спеціальна":"#ffd700","Секретна":"#cc0033","Епічна":"#9933ff",
           "Виняткова":"#3399ff","Звичайна":"#33cc33" }[r] || "#888";
}
function _rarityBg(r) {
  return { "Спеціальна":"rgba(255,215,0,.18)","Секретна":"rgba(204,0,51,.18)",
           "Епічна":"rgba(153,51,255,.18)","Виняткова":"rgba(51,153,255,.18)",
           "Звичайна":"rgba(51,204,51,.18)" }[r] || "rgba(136,136,136,.18)";
}
function _trendInfo(name) {
  const data  = _getMarketMultipliers();
  const mult  = data.mults[name] || 1.0;
  const pct   = Math.round((mult - 1) * 100);
  const up    = mult >= 1;
  return { pct, up, arrow: up ? "▲" : "▼", cls: up ? "mkt-ticker-up" : "mkt-ticker-down",
           color: up ? "#4ade80" : "#f87171" };
}
function _sparkData(name, currentPrice) {
  const h = _getHistory()[name] || [];
  const prices = h.map(e => e.p);
  prices.push(currentPrice);
  while (prices.length < 8) prices.unshift(Math.max(1, currentPrice + Math.floor((Math.random() - .5) * currentPrice * .3)));
  return prices.slice(-8);
}
function _mktToast(msg, type = "") {
  let t = document.getElementById("mkt-toast");
  if (!t) { t = document.createElement("div"); t.id = "mkt-toast"; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = type ? `show ${type}` : "show";
  clearTimeout(window._mktToastT);
  window._mktToastT = setTimeout(() => {
    const el = document.getElementById("mkt-toast");
    if (el) el.className = "";
  }, 2800);
}
function _buildTicker() {
  const sample = [...allItems].sort(() => Math.random() - .5).slice(0, 16);
  const half = sample.map(item => {
    const price = getItemPrice({ name: item.name, quality: "Після уроку", premium: false, rarity: item.rarity, collection: item.collection });
    const t = _trendInfo(item.name);
    return `<div class="mkt-ticker-item">
      <span class="mkt-ticker-name">${item.name.slice(0,14)}</span>
      <span class="mkt-ticker-price">${price}💎</span>
      <span class="${t.cls}">${t.arrow}${Math.abs(t.pct)}%</span>
    </div>`;
  }).join("");
  return `<div class="mkt-ticker-track">${half}${half}</div>`;
}

function _startRegenTimer() {
  if (_mktRegenTimer) { clearInterval(_mktRegenTimer); _mktRegenTimer = null; }
  _mktRegenTimer = setInterval(() => {
    const el = document.getElementById("mkt-regen-val");
    if (!el) {
      // Елемент зник — ринок закрито, зупиняємо таймер
      clearInterval(_mktRegenTimer);
      _mktRegenTimer = null;
      return;
    }
    let data = null;
    try { data = JSON.parse(localStorage.getItem(MARKET_PRICE_KEY)); } catch {}
    if (!data) return;

    const now  = Date.now();
    const left = data.nextRegen - now;

    if (left <= 0) {
      // Час вийшов — генеруємо нові ціни і перемальовуємо ринок
      _getMarketMultipliers(); // скидає і генерує нові
      clearInterval(_mktRegenTimer);
      _mktRegenTimer = null;
      _mktRender(); // повний перерендер з новими цінами
      return;
    }

    const m = Math.floor(left / 60000);
    const s = Math.floor((left % 60000) / 1000);
    el.textContent = `${m}хв ${s}с`;
  }, 1000);
}

// ─── Item Card ──────────────────────────────────────────────────────
function _itemCard(item, listMode) {
  const inv = JSON.parse(localStorage.getItem(currentUser + "_inventory") || "[]");
  const ownedCount = inv.filter(i => i.type === "item" && i.name === item.name).length;
  const price = getItemPrice({ name: item.name, quality: "Після уроку", premium: false, rarity: item.rarity, collection: item.collection });
  const t = _trendInfo(item.name);
  const rc = _rarityColor(item.rarity);
  const rb = _rarityBg(item.rarity);
  const escapedName = item.name.replace(/&/g,"&amp;").replace(/"/g,"&quot;");

  const listRow = `
    <div class="mkt-list-row">
      <img class="mkt-list-img" src="img/${item.img}" alt="">
      <div style="flex:1;min-width:0;">
        <div class="mkt-list-name">${item.name}</div>
        <div class="mkt-list-collection">${item.collection}</div>
      </div>
      <div style="text-align:right;flex-shrink:0;">
        <div class="mkt-list-price">${price}💎</div>
        <div class="mkt-card-trend" style="color:${t.color};font-size:11px;">${t.arrow}${Math.abs(t.pct)}%</div>
      </div>
    </div>`;

  const gridCard = `
    <div class="mkt-card-top" style="background:${rc}"></div>
    <div class="mkt-card-img-wrap">
      <img class="mkt-card-img" src="img/${item.img}" alt="">
      ${ownedCount > 0 ? `<div class="mkt-card-owned-badge">У тебе: ${ownedCount}</div>` : ""}
    </div>
    <div class="mkt-card-info">
      <div class="mkt-card-name">${item.name}</div>
      <div class="mkt-card-row">
        <div class="mkt-card-rarity" style="background:${rb};color:${rc}">${item.rarity}</div>
        <div class="mkt-card-price">${price}💎</div>
      </div>
      <div class="mkt-card-trend" style="color:${t.color};margin-top:4px;font-size:10px;">
        ${t.arrow} ${Math.abs(t.pct)}% ${t.up ? "зростання" : "спад"}
      </div>
    </div>`;

  return `<div class="mkt-card" data-item-name="${escapedName}">${listRow}${gridCard}</div>`;
}

// ─── Main render ────────────────────────────────────────────────────
function openMarket() {
  _injectMarketCSS();
  const collections = [...new Set(allItems.map(i => i.collection))];
  if (!_mktState.collection) _mktState.collection = collections[0];
  _mktRender();
}

function _mktRender() {
  _injectMarketCSS();
  const collections = [...new Set(allItems.map(i => i.collection))];
  const app = document.getElementById("app");

  const tabsHTML = collections.map(c =>
    `<div class="mkt-tab${_mktState.collection === c ? " active" : ""}"
          onclick="_mktState.collection='${c}';_mktRenderItems()">${c}</div>`
  ).join("");

  app.innerHTML = `
    <div id="mkt-root" class="${_mktState.listMode ? "mkt-list-mode" : ""}">
      <div class="mkt-header">
        <div class="mkt-header-row">
          <div class="mkt-title">🏪 РИНОК</div>
          <div class="mkt-balance-chip">💎 ${nikus || 0} нікусів</div>
 <button class="mkt-back-btn" onclick="openPartsShop()">🖥 Магазин ПК</button>
          <button class="mkt-back-btn" onclick="if(_mktRegenTimer)clearInterval(_mktRegenTimer);mainMenu()">← Назад</button>
        </div>
        <div class="mkt-tabs">${tabsHTML}</div>
        <div class="mkt-toolbar">
          <input class="mkt-search" id="mkt-search-inp" placeholder="🔍 Пошук..."
            value="${_mktState.search}"
            oninput="_mktState.search=this.value;_mktRenderItems()">
          <select class="mkt-sort" id="mkt-sort-sel" onchange="_mktState.sort=this.value;_mktRenderItems()">
            <option value="price_desc" ${_mktState.sort==="price_desc"?"selected":""}>Ціна ↓</option>
            <option value="price_asc"  ${_mktState.sort==="price_asc"?"selected":""}>Ціна ↑</option>
            <option value="name_asc"   ${_mktState.sort==="name_asc"?"selected":""}>Назва A–Z</option>
            <option value="rarity"     ${_mktState.sort==="rarity"?"selected":""}>Рідкість</option>
            <option value="trend"      ${_mktState.sort==="trend"?"selected":""}>Тренд ↑</option>
          </select>
          <button class="mkt-mode-btn${_mktState.listMode?" active":""}"
            onclick="_mktState.listMode=!_mktState.listMode;_mktRender()">
            ${_mktState.listMode ? "⊞" : "☰"}
          </button>
        </div>
      </div>
      <div class="mkt-ticker-wrap">${_buildTicker()}</div>
      <div class="mkt-regen-timer">Оновлення цін через: <span id="mkt-regen-val">…</span></div>
      <div id="mkt-items-wrap" class="mkt-grid"></div>
    </div>
  `;

  _mktRenderItems();
  _startRegenTimer();
  const sinp = document.getElementById("mkt-search-inp");
  if (sinp && _mktState.search) sinp.focus();
}

function _mktRenderItems() {
  const wrap = document.getElementById("mkt-items-wrap");
  if (!wrap) return;

  const root = document.getElementById("mkt-root");
  if (root) root.className = _mktState.listMode ? "mkt-list-mode" : "";

  let items = allItems.filter(i => i.collection === _mktState.collection);

  if (_mktState.search.trim()) {
    const q = _mktState.search.toLowerCase();
    items = items.filter(i => i.name.toLowerCase().includes(q) || i.rarity.toLowerCase().includes(q));
  }

  const rarityOrder = ["Спеціальна","Секретна","Епічна","Виняткова","Звичайна"];
  items.sort((a, b) => {
    const pa = getItemPrice({ ...a, quality:"Після уроку", premium:false });
    const pb = getItemPrice({ ...b, quality:"Після уроку", premium:false });
    const ta = _trendInfo(a.name).pct;
    const tb = _trendInfo(b.name).pct;
    if (_mktState.sort === "price_desc") return pb - pa;
    if (_mktState.sort === "price_asc")  return pa - pb;
    if (_mktState.sort === "name_asc")   return a.name.localeCompare(b.name);
    if (_mktState.sort === "rarity")     return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
    if (_mktState.sort === "trend")      return tb - ta;
    return 0;
  });

  if (!items.length) {
    wrap.innerHTML = `<div class="mkt-empty"><div class="mkt-empty-icon">🔍</div>Нічого не знайдено</div>`;
    return;
  }

  wrap.innerHTML = items.map(item => _itemCard(item, _mktState.listMode)).join("");

  if (wrap._mktClickHandler) wrap.removeEventListener("click", wrap._mktClickHandler);
  wrap._mktClickHandler = function(e) {
    const card = e.target.closest(".mkt-card[data-item-name]");
    if (!card) return;
    const name = card.getAttribute("data-item-name");
    if (name) _mktOpenItem(name);
  };
  wrap.addEventListener("click", wrap._mktClickHandler);
}

// ═══════════════════════════════════════════════════════════════════
//  МОДАЛКА ТОВАРУ
// ═══════════════════════════════════════════════════════════════════

function _injectMktPopupCSS() {
  if (document.getElementById("mkt-popup-css")) return;
  const s = document.createElement("style");
  s.id = "mkt-popup-css";
  s.textContent = `
@keyframes mktPopIn {
  from { transform: scale(.88) translateY(16px); opacity: 0; }
  to   { transform: scale(1)   translateY(0);    opacity: 1; }
}
.mp-inv-row {
  display: flex; align-items: center; gap: 10px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 10px; padding: 8px 12px;
  cursor: pointer; transition: .13s; user-select: none;
}
.mp-inv-row:hover:not(.mp-locked-row) { border-color: rgba(240,192,80,.35); }
.mp-inv-row.mp-sel { background: rgba(240,192,80,.1); border-color: #f0c050; }
.mp-locked-row { opacity: .55; cursor: not-allowed; }
.mp-inv-img { width: 36px; height: 30px; object-fit: contain; flex-shrink: 0; }
.mp-inv-info { flex: 1; min-width: 0; }
.mp-inv-name { font-size: 11px; font-weight: 700; color: #e2e8f0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mp-inv-meta { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 2px; }
.mp-inv-q { font-size: 9px; font-weight: 700; color: #94a3b8; }
.mp-inv-premium { font-size: 9px; color: #f5d300; font-weight: 700; }
.mp-inv-price { font-size: 12px; font-weight: 700; color: #f0c050; flex-shrink: 0; }
.mp-locked-badge {
  display: inline-flex; align-items: center; gap: 3px;
  background: rgba(248,113,113,.15); border: 1px solid rgba(248,113,113,.3);
  color: #f87171; font-size: 8px; font-weight: 800;
  padding: 1px 6px; border-radius: 3px; text-transform: uppercase; letter-spacing: .5px;
}
.mp-folder-badge {
  display: inline-flex; align-items: center; gap: 3px;
  font-size: 8px; font-weight: 800;
  padding: 1px 6px; border-radius: 3px; text-transform: uppercase; letter-spacing: .5px; border: 1px solid;
}
.mp-check {
  width: 18px; height: 18px; border-radius: 5px;
  border: 1.5px solid rgba(255,255,255,.18);
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 900; flex-shrink: 0; transition: .13s;
}
.mp-inv-row.mp-sel .mp-check { background: #f0c050; border-color: #f0c050; color: #111; }
.mp-btn {
  flex: 1; min-width: 100px; padding: 12px 0;
  border: none; border-radius: 12px;
  font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700;
  cursor: pointer; transition: .2s; letter-spacing: .3px;
}
.mp-btn-buy {
  background: linear-gradient(135deg,#4ade80,#16a34a); color: #111;
  box-shadow: 0 4px 0 #166534, 0 0 20px rgba(74,222,128,.3);
}
.mp-btn-buy:hover { transform: translateY(-2px); box-shadow: 0 6px 0 #166534, 0 0 30px rgba(74,222,128,.5); }
.mp-btn-buy:active { transform: translateY(1px); box-shadow: 0 2px 0 #166534; }
.mp-btn-buy:disabled { background: rgba(255,255,255,.08); color: #64748b; box-shadow: none; cursor: not-allowed; transform: none; }
.mp-btn-sell {
  background: linear-gradient(135deg,#f0c050,#e08020); color: #111;
  box-shadow: 0 4px 0 #b06010, 0 0 20px rgba(240,192,80,.3);
}
.mp-btn-sell:hover { transform: translateY(-2px); box-shadow: 0 6px 0 #b06010, 0 0 30px rgba(240,192,80,.5); }
.mp-btn-sell:active { transform: translateY(1px); box-shadow: 0 2px 0 #b06010; }
.mp-btn-sell:disabled { background: rgba(255,255,255,.08); color: #64748b; box-shadow: none; cursor: not-allowed; transform: none; }
.mp-no-items {
  text-align: center; padding: 16px; color: #475569; font-size: 12px; font-style: italic;
  background: rgba(255,255,255,.02); border: 1px dashed rgba(255,255,255,.07);
  border-radius: 10px; margin-bottom: 12px;
}
  `;
  document.head.appendChild(s);
}

// ── Закрити ─────────────────────────────────────────────────────────
function _closeMktPopup() {
  document.getElementById("mkt-pop-overlay")?.remove();
  _mktState.openItem        = null;
  _mktState.selectedForSell = [];
  _mktState.buyQty          = 1;
  _mktState.buyQuality      = "Після уроку";
  _mktState.buyPremium      = false;
}

// ── Відкрити ─────────────────────────────────────────────────────────
function _mktOpenItem(name) {
  const item = allItems.find(i => i.name === name);
  if (!item) return;
  _mktState.openItem        = item;
  _mktState.selectedForSell = [];
  _mktState.buyQty          = 1;
  _mktState.buyQuality      = "Після уроку";
  _mktState.buyPremium      = false;
  _renderMktPopup(item);
}

// ── Предмети зі складу ───────────────────────────────────────────────
function _getOwnedItemsForSell(itemName) {
  const inv = JSON.parse(localStorage.getItem(currentUser + "_inventory") || "[]");
  return inv
    .map((it, idx) => ({ it, idx }))
    .filter(({ it }) => it.type === "item" && it.name === itemName);
}

// ── Рендер модалки ───────────────────────────────────────────────────
function _renderMktPopup(item) {
  _injectMktPopupCSS();
  document.getElementById("mkt-pop-overlay")?.remove();

  const ownedAll  = _getOwnedItemsForSell(item.name);

  function calcBuyPrice() {
    return getItemPrice({
      name: item.name, quality: _mktState.buyQuality,
      premium: _mktState.buyPremium, rarity: item.rarity, collection: item.collection
    });
  }

  const basePrice = calcBuyPrice();
  const buyCost   = basePrice * _mktState.buyQty;
  const canBuy    = (nikus || 0) >= buyCost;

  const spark = _sparkData(item.name, getItemPrice({ name:item.name, quality:"Після уроку", premium:false, rarity:item.rarity, collection:item.collection }));
  const maxS  = Math.max(...spark);
  const t     = _trendInfo(item.name);
  const rc    = _rarityColor(item.rarity);
  const rb    = _rarityBg(item.rarity);

  const sparkHTML = spark.map((v, i) => {
    const h   = Math.max(3, Math.round((v / maxS) * 36));
    const clr = i === spark.length - 1 ? rc : "rgba(255,255,255,.15)";
    return `<div style="flex:1;border-radius:3px 3px 0 0;min-height:3px;height:${h}px;background:${clr}"></div>`;
  }).join("");

  function buildSellRows() {
    if (!ownedAll.length) {
      return `<div class="mp-no-items">У тебе немає цього предмету в інвентарі</div>`;
    }
    return ownedAll.map(({ it, idx }) => {
      const locked = blockedItems.has(it.id);
      const ip     = getItemPrice({ ...it, rarity: item.rarity, collection: item.collection });
      const sel    = _mktState.selectedForSell.some(s => s.invIdx === idx);
      const folder = getFolderOf(it.id);
      const qColor = { "Прямо з цеху":"#f5d300","Після консервації":"#e67e22","Після уроку":"#60a5fa","Зношена":"#64748b" }[it.quality] || "#94a3b8";
      let badgesHTML = "";
      if (locked) badgesHTML += `<span class="mp-locked-badge">🔒 Заблок.</span>`;
      if (folder)  badgesHTML += `<span class="mp-folder-badge" style="color:${folder.color};border-color:${folder.color}40;background:${folder.color}15">📁 ${folder.name}</span>`;
      return `
        <div class="mp-inv-row${sel?" mp-sel":""}${locked?" mp-locked-row":""}"
          data-inv-idx="${idx}" data-inv-price="${ip}"
          style="cursor:${locked?"not-allowed":"pointer"}">
          <img class="mp-inv-img" src="img/${it.img||item.img}">
          <div class="mp-inv-info">
            <div class="mp-inv-name">${it.name||item.name}</div>
            <div class="mp-inv-meta">
              <span class="mp-inv-q" style="color:${qColor}">${it.quality||"—"}</span>
              ${it.premium?`<span class="mp-inv-premium">⭐ Преміум</span>`:""}
              ${badgesHTML}
            </div>
          </div>
          <span class="mp-inv-price">${ip}💎</span>
          <div class="mp-check">${sel?"✓":""}</div>
        </div>`;
    }).join("");
  }

  const selCount  = _mktState.selectedForSell.length;
  const totalSell = _mktState.selectedForSell.reduce((s, x) => s + x.price, 0);

  // Якісні опції
  const qualOpts = ["Прямо з цеху","Після консервації","Після уроку","Зношена"].map(q => {
    const p = getItemPrice({ name:item.name, quality:q, premium:false, rarity:item.rarity, collection:item.collection });
    return `<option value="${q}"${q===_mktState.buyQuality?" selected":""}>${q} — ${p}💎</option>`;
  }).join("");

  const premiumPrice = getItemPrice({ name:item.name, quality:_mktState.buyQuality, premium:true, rarity:item.rarity, collection:item.collection });

  const ov = document.createElement("div");
  ov.id = "mkt-pop-overlay";
  ov.style.cssText = `
    position:fixed;inset:0;z-index:8800;
    background:rgba(0,0,0,.75);backdrop-filter:blur(6px);
    display:flex;align-items:center;justify-content:center;
    padding:16px;box-sizing:border-box;
  `;
  ov.addEventListener("click", e => { if (e.target===ov) _closeMktPopup(); });

  ov.innerHTML = `
    <div id="mkt-pop-box" style="
      position:relative;z-index:8900;
      width:100%;max-width:520px;max-height:90vh;
      background:#13161e;border:1px solid rgba(240,192,80,.35);
      border-radius:20px;box-shadow:0 30px 80px rgba(0,0,0,.85);
      animation:mktPopIn .22s cubic-bezier(.34,1.56,.64,1);
      box-sizing:border-box;overflow:hidden;display:flex;flex-direction:column;
    ">
      <div style="height:4px;background:${rc};flex-shrink:0;border-radius:20px 20px 0 0;"></div>
      <div style="overflow-y:auto;padding:18px 20px 20px;flex:1;min-height:0;">

        <!-- ХЕДЕР -->
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
          <div style="font-family:'Bebas Neue',cursive;font-size:22px;letter-spacing:2px;color:#f0c050;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${item.name}</div>
          <button onclick="_closeMktPopup()" style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);color:#64748b;width:30px;height:30px;border-radius:8px;cursor:pointer;font-size:14px;">✕</button>
        </div>

        <!-- IMG + ЦІНА -->
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:14px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:12px 14px;">
          <img src="img/${item.img}" style="width:80px;height:64px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,.7));flex-shrink:0;">
          <div style="flex:1;">
            <div id="mp-price-big" style="font-family:'Bebas Neue',cursive;font-size:36px;color:#f0c050;line-height:1;">${basePrice}</div>
            <div style="font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase;margin-top:1px;">нікусів за 1 шт</div>
            <div style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;display:inline-block;margin-top:6px;background:${rb};color:${rc};">${t.arrow} ${Math.abs(t.pct)}%</div>
          </div>
        </div>

        <!-- ТЕГИ -->
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">
          <div style="font-size:9px;font-weight:800;padding:3px 9px;border-radius:4px;text-transform:uppercase;background:${rb};color:${rc}">${item.rarity}</div>
          <div style="font-size:9px;font-weight:800;padding:3px 9px;border-radius:4px;text-transform:uppercase;background:rgba(96,165,250,.14);color:#60a5fa">${item.collection}</div>
          <div style="font-size:9px;font-weight:800;padding:3px 9px;border-radius:4px;text-transform:uppercase;background:rgba(255,255,255,.05);color:#64748b">У тебе: ${ownedAll.length}</div>
          <div style="font-size:9px;font-weight:800;padding:3px 9px;border-radius:4px;text-transform:uppercase;background:rgba(255,185,50,.12);color:#f0c050">💎 ${nikus||0} нікусів</div>
        </div>

        <!-- SPARKLINE -->
        <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:10px 12px 6px;margin-bottom:16px;">
          <div style="font-size:9px;font-weight:700;color:#64748b;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">📈 Динаміка цін</div>
          <div style="display:flex;align-items:flex-end;gap:4px;height:38px;">${sparkHTML}</div>
        </div>

        <div style="height:1px;background:rgba(255,255,255,.07);margin:16px 0;"></div>

        <!-- КУПИТИ -->
        <div style="font-size:10px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#64748b;margin-bottom:12px;">🛍 Купити</div>

        <div style="margin-bottom:10px;">
          <label style="display:block;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#64748b;margin-bottom:6px;">Якість</label>
          <select id="mp-quality-sel" onchange="_mktUpdateBuyPrice()" style="width:100%;background:#1e2230;border:1px solid rgba(255,255,255,.12);color:#e2e8f0;padding:9px 12px;border-radius:10px;font-size:13px;font-weight:600;outline:none;cursor:pointer;">
            ${qualOpts}
          </select>
        </div>

        <div onclick="_mktTogglePremium()" style="display:flex;align-items:center;gap:10px;background:rgba(255,213,0,.06);border:1px solid rgba(255,213,0,.15);border-radius:10px;padding:10px 14px;margin-bottom:12px;cursor:pointer;">
          <div id="mp-premium-check" style="width:20px;height:20px;border-radius:5px;border:2px solid ${_mktState.buyPremium?"#f5d300":"rgba(255,255,255,.2)"};background:${_mktState.buyPremium?"#f5d300":"transparent"};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;color:#111;flex-shrink:0;">${_mktState.buyPremium?"✓":""}</div>
          <div style="flex:1;">
            <div style="font-size:13px;font-weight:700;color:#f5d300;">⭐ Преміум</div>
            <div id="mp-premium-hint" style="font-size:10px;color:#64748b;">×2.5 до ціни — ${premiumPrice}💎 за шт.</div>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:10px 14px;margin-bottom:10px;">
          <span style="font-size:12px;font-weight:700;color:#94a3b8;flex:1;">Кількість:</span>
          <button onclick="_mktPopBuyQty(-1)" style="width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);color:#e2e8f0;font-size:16px;font-weight:700;cursor:pointer;">−</button>
          <span id="mp-qty" style="font-size:17px;font-weight:700;min-width:28px;text-align:center;">${_mktState.buyQty}</span>
          <button onclick="_mktPopBuyQty(1)" style="width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);color:#e2e8f0;font-size:16px;font-weight:700;cursor:pointer;">+</button>
          <span id="mp-buy-total" style="font-size:14px;font-weight:700;color:#f0c050;white-space:nowrap;">${buyCost}💎</span>
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:0;">
          <button class="mp-btn mp-btn-buy" id="mp-buy-btn" ${canBuy?"":"disabled"}
            onclick="_mktPopDoBuy('${item.name.replace(/'/g,"\\'")}')">
            ${canBuy?`✅ Купити ${_mktState.buyQty} шт. — ${buyCost}💎`:"❌ Недостатньо нікусів"}
          </button>
          <button onclick="_closeMktPopup()" style="flex:0;padding:12px 20px;border:1px solid rgba(255,255,255,.1);border-radius:12px;background:rgba(255,255,255,.06);color:#64748b;cursor:pointer;font-weight:700;">Закрити</button>
        </div>

        <div style="height:1px;background:rgba(255,255,255,.07);margin:16px 0;"></div>

        <!-- ПРОДАТИ -->
        <div style="font-size:10px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#64748b;margin-bottom:10px;">💰 Продати з інвентарю</div>
        <div id="mp-sell-list" style="display:flex;flex-direction:column;gap:5px;max-height:220px;overflow-y:auto;margin-bottom:10px;">${buildSellRows()}</div>

        ${ownedAll.length ? `
        <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(240,192,80,.07);border:1px solid rgba(240,192,80,.18);border-radius:10px;padding:10px 14px;margin-bottom:12px;">
          <span style="font-size:11px;font-weight:700;color:#64748b;">Обрано <span id="mp-sel-count">${selCount}</span> шт. — отримаєш:</span>
          <span id="mp-sell-total-val" style="font-size:16px;font-weight:700;color:#f0c050;">${totalSell}💎</span>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="mp-btn mp-btn-sell" id="mp-sell-btn" ${selCount>0?"":"disabled"}
            onclick="_mktPopDoSell('${item.name.replace(/'/g,"\\'")}')">
            💰 Продати (${selCount} шт.)
          </button>
        </div>` : ""}

      </div>
    </div>
  `;

  document.body.appendChild(ov);

  // Делегований обробник для продажу
  const sellList = ov.querySelector("#mp-sell-list");
  if (sellList) {
    sellList.addEventListener("click", function(e) {
      const row = e.target.closest(".mp-inv-row[data-inv-idx]");
      if (!row || row.classList.contains("mp-locked-row")) return;

      const invIdx = parseInt(row.getAttribute("data-inv-idx"));
      const price  = parseInt(row.getAttribute("data-inv-price"));

      const existIdx = _mktState.selectedForSell.findIndex(s => s.invIdx === invIdx);
      if (existIdx !== -1) {
        _mktState.selectedForSell.splice(existIdx, 1);
        row.classList.remove("mp-sel");
        row.querySelector(".mp-check").textContent = "";
      } else {
        _mktState.selectedForSell.push({ invIdx, price });
        row.classList.add("mp-sel");
        row.querySelector(".mp-check").textContent = "✓";
      }

      const sc  = _mktState.selectedForSell.length;
      const tot = _mktState.selectedForSell.reduce((s, x) => s + x.price, 0);
      const scEl  = document.getElementById("mp-sel-count");
      const totEl = document.getElementById("mp-sell-total-val");
      const sbEl  = document.getElementById("mp-sell-btn");
      if (scEl)  scEl.textContent  = sc;
      if (totEl) totEl.textContent = tot + "💎";
      if (sbEl) { sbEl.disabled = sc===0; sbEl.textContent = `💰 Продати (${sc} шт.)`; }
    });
  }
}

function _mktUpdateBuyPrice() {
  const item = _mktState.openItem;
  if (!item) return;
  const selEl = document.getElementById("mp-quality-sel");
  if (selEl) _mktState.buyQuality = selEl.value;

  // ★ НОВЕ: якщо якість "Зношена" — преміум неможливий
  const isWorn = _mktState.buyQuality === "Зношена";
  if (isWorn && _mktState.buyPremium) {
    _mktState.buyPremium = false; // скидаємо преміум автоматично
  }

  const basePrice = getItemPrice({ name:item.name, quality:_mktState.buyQuality, premium:_mktState.buyPremium, rarity:item.rarity, collection:item.collection });
  const total  = basePrice * _mktState.buyQty;
  const canBuy = (nikus || 0) >= total;

  const bigEl  = document.getElementById("mp-price-big");
  const totEl  = document.getElementById("mp-buy-total");
  const buyBtn = document.getElementById("mp-buy-btn");
  const qtyEl  = document.getElementById("mp-qty");
  if (bigEl)  bigEl.textContent  = basePrice;
  if (totEl)  totEl.textContent  = total + "💎";
  if (qtyEl)  qtyEl.textContent  = _mktState.buyQty;
  if (buyBtn) {
    buyBtn.disabled    = !canBuy;
    buyBtn.textContent = canBuy ? `✅ Купити ${_mktState.buyQty} шт. — ${total}💎` : "❌ Недостатньо нікусів";
  }

  // ★ НОВЕ: оновлюємо стан чекбоксу преміум
  const ch = document.getElementById("mp-premium-check");
  if (ch) {
    ch.style.borderColor = _mktState.buyPremium ? "#f5d300" : "rgba(255,255,255,.2)";
    ch.style.background  = _mktState.buyPremium ? "#f5d300" : "transparent";
    ch.textContent       = _mktState.buyPremium ? "✓" : "";
  }

  // ★ НОВЕ: блокуємо рядок преміуму якщо якість "Зношена"
  const premiumRow = document.getElementById("mp-premium-row");
  if (premiumRow) {
    premiumRow.style.opacity       = isWorn ? "0.35" : "1";
    premiumRow.style.pointerEvents = isWorn ? "none"  : "auto";
    premiumRow.title               = isWorn ? "Преміум несумісний зі Зношеною якістю" : "";
  }

  const premiumPrice = getItemPrice({ name:item.name, quality:_mktState.buyQuality, premium:true, rarity:item.rarity, collection:item.collection });
  const hintEl = document.getElementById("mp-premium-hint");
  if (hintEl) {
    if (isWorn) {
      hintEl.textContent = "⛔ Преміум несумісний зі Зношеною якістю";
      hintEl.style.color = "#f87171";
    } else {
      hintEl.textContent = `×2.5 до ціни — ${premiumPrice}💎 за шт.`;
      hintEl.style.color = "#64748b";
    }
  }
}

function _mktTogglePremium() {
  // ★ НОВЕ: блокуємо вмикання преміуму якщо якість "Зношена"
  if (!_mktState.buyPremium && _mktState.buyQuality === "Зношена") {
    _mktToast("❌ Преміум несумісний зі Зношеною якістю!", "error");
    return;
  }
  _mktState.buyPremium = !_mktState.buyPremium;
  const ch = document.getElementById("mp-premium-check");
  if (ch) {
    ch.style.borderColor = _mktState.buyPremium ? "#f5d300" : "rgba(255,255,255,.2)";
    ch.style.background  = _mktState.buyPremium ? "#f5d300" : "transparent";
    ch.textContent       = _mktState.buyPremium ? "✓" : "";
  }
  _mktUpdateBuyPrice();
}

// ── Кількість ────────────────────────────────────────────────────────
function _mktPopBuyQty(delta) {
  _mktState.buyQty = Math.max(1, Math.min(99, _mktState.buyQty + delta));
  _mktUpdateBuyPrice();
}

// ── КУПИТИ (нікуси) ──────────────────────────────────────────────────
function _mktPopDoBuy(name) {
  const item = allItems.find(i => i.name === name);
  if (!item) return;

  const price = getItemPrice({ name:item.name, quality:_mktState.buyQuality, premium:_mktState.buyPremium, rarity:item.rarity, collection:item.collection });
  const total = price * _mktState.buyQty;

  if ((nikus || 0) < total) { _mktToast("❌ Недостатньо нікусів!", "error"); return; }

  nikus -= total;
  localStorage.setItem(currentUser + "_nikus", nikus);

  for (let k = 0; k < _mktState.buyQty; k++) {
    inventory.push({
      id: crypto.randomUUID(), type: "item",
      name: item.name, img: item.img,
      rarity: item.rarity, quality: _mktState.buyQuality,
      premium: _mktState.buyPremium, fromCase: "market", createdAt: Date.now()
    });
  }

  saveData();
  _mktToast(`✅ Куплено ${_mktState.buyQty}× ${item.name}!`, "success");
  _closeMktPopup();
  _mktRenderItems();
  const chip = document.querySelector(".mkt-balance-chip");
  if (chip) chip.textContent = `💎 ${nikus} нікусів`;
}

function _mktPopDoSell(name) {
  if (!_mktState.selectedForSell.length) return;

  let total = 0;
  const sorted = [..._mktState.selectedForSell].sort((a, b) => b.invIdx - a.invIdx);
  sorted.forEach(({ invIdx, price }) => {
    const it = inventory[invIdx];
    if (!it || blockedItems.has(it.id)) return;
    invFolders.forEach(f => { f.itemIds = f.itemIds.filter(id => id !== it.id); });
    inventory.splice(invIdx, 1);
    total += price;
  });

  // ★ НОВЕ: 10% комісія ринку
  const commission = Math.ceil(total * 0.1);  // завжди округлюємо вверх
  const received   = total - commission;

  nikus = (nikus || 0) + received;
  localStorage.setItem(currentUser + "_nikus", nikus);
  dosvid = (dosvid || 0) + 4 * sorted.length;
  saveFolders();
  saveData();

  // ★ НОВЕ: повідомлення показує і суму і комісію
  _mktToast(`💰 Продано ${sorted.length} шт. +${received}💎 (комісія ринку 10%: -${commission})`, "success");
  _mktState.selectedForSell = [];
  _closeMktPopup();
  _mktRenderItems();
  const chip = document.querySelector(".mkt-balance-chip");
  if (chip) chip.textContent = `💎 ${nikus} нікусів`;
}

// ── Сумісність зі старими викликами ──────────────────────────────────
function _renderItemModal(item) { _renderMktPopup(item); }
function _closeMktModal()       { _closeMktPopup(); }
function openSellModal(name)    { _mktOpenItem(name); }
function closeSellModal()       { _closeMktPopup(); }

//╔══════════════════════════════════════════════════════════════════╗
// ║      МАГАЗИН КОМПЛЕКТУЮЧИХ — вкладка ринку                     ║
// ║      Вставити у той самий файл що і openMarket()               ║
// ╚══════════════════════════════════════════════════════════════════╝

// ═══ КАТАЛОГ ТОВАРІВ ══════════════════════════════════════════════

const PARTS_SHOP_CATALOG = [

  // ── МАТЕРИНСЬКІ ПЛАТИ ───────────────────────────────────────────
  {
    id: "MFNP_1_0", name: "MFNP 1.0", category: "mb",
    categoryLabel: "Материнська плата",
    price: 700,
    img: "img/parts/mb_mfnp10.png",
    specs: ["Базова плата GEN 1", "Підтримує всі слоти"],
    rarity: "Спеціальна",
  },
  {
    id: "MFNP_1_0P", name: "MFNP 1.0+", category: "mb",
    categoryLabel: "Материнська плата",
    price: 1000,
    img: "img/parts/mb_mfnp10p.png",
    specs: ["Розширена плата GEN 1", "Покращена стабільність"],
    rarity: "Спеціальна",
  },
  {
    id: "MFNP_1_1", name: "MFNP 1.1", category: "mb",
    categoryLabel: "Материнська плата",
    price: 1600,
    img: "img/parts/mb_mfnp11.png",
    specs: ["Топова плата GEN 1", "Максимальна пропускна здатність"],
    rarity: "Спеціальна",
  },

  // ── ПРОЦЕСОРИ ───────────────────────────────────────────────────
  {
    id: "PIC_1100W", name: "1100W", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 500,
    img: "img/parts/pic_1100w.png",
    specs: ["Потужність: 1.0", "Ресурс: W (4 тижні)", "Ліміт: 3.5 NICUS/год"],
    rarity: "Спеціальна", power: 1.0, resType: "W",
  },

  {
    id: "PIC_1100P", name: "1100P", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 450,
    img: "img/parts/pic_1100p.png",
    specs: ["Потужність: 1.0", "Ресурс: P (2 тижні)", "Ліміт: 3.5 NICUS/год"],
    rarity: "Спеціальна", power: 1.0, resType: "P",
  },

  {
    id: "PIC_1100F", name: "1100F", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 400,
    img: "img/parts/pic_1100f.png",
    specs: ["Потужність: 1.0", "Ресурс: F (1 тиждень)", "Ліміт: 3.5 NICUS/год"],
    rarity: "Спеціальна", power: 1.0, resType: "F",
  },

 {
    id: "PIC_1125W", name: "1125W", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 600,
    img: "img/parts/pic_1125w.png",
    specs: ["Потужність: 1.25", "Ресурс: W (4 тижні)", "Ліміт: 4.375 NICUS/год"],
    rarity: "Спеціальна", power: 1.25, resType: "W",
  },

 {
    id: "PIC_1125P", name: "1125P", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 550,
    img: "img/parts/pic_1125p.png",
    specs: ["Потужність: 1.25", "Ресурс: P (2 тижні)", "Ліміт: 4.375 NICUS/год"],
    rarity: "Спеціальна", power: 1.25, resType: "P",
  },

  {
    id: "PIC_1125F", name: "1125F", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 525,
    img: "img/parts/pic_1125f.png",
    specs: ["Потужність: 1.25", "Ресурс: F (1 тиждень)", "Ліміт: 4.375 NICUS/год"],
    rarity: "Спеціальна", power: 1.25, resType: "F",
  },
   {
    id: "PIC_1150W", name: "1150W", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 900,
    img: "img/parts/pic_1150w.png",
    specs: ["Потужність: 1.5", "Ресурс: W (4 тижні)", "Ліміт: 5.25 NICUS/год"],
    rarity: "Спеціальна", power: 1.5, resType: "W",
  },
{
    id: "PIC_1150P", name: "1150P", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 850,
    img: "img/parts/pic_1150p.png",
    specs: ["Потужність: 1.5", "Ресурс: P (2 тижні)", "Ліміт: 5.25 NICUS/год"],
    rarity: "Спеціальна", power: 1.5, resType: "P",
  },

{
    id: "PIC_1150F", name: "1150F", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 800,
    img: "img/parts/pic_1150f.png",
    specs: ["Потужність: 1.5", "Ресурс: F (1 тиждень)", "Ліміт: 5.25 NICUS/год"],
    rarity: "Спеціальна", power: 1.5, resType: "F",
  },

  {
    id: "PIC_1175W", name: "1175W", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 1200,
    img: "img/parts/pic_1175w.png",
    specs: ["Потужність: 1.75", "Ресурс: W (4 тижні)", "Ліміт: 6.125 NICUS/год"],
    rarity: "Спеціальна", power: 1.75, resType: "W",
  },

  {
    id: "PIC_1175P", name: "1175P", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 1100,
    img: "img/parts/pic_1175p.png",
    specs: ["Потужність: 1.75", "Ресурс: P (2 тижні)", "Ліміт: 6.125 NICUS/год"],
    rarity: "Спеціальна", power: 1.75, resType: "P",
  },

  {
    id: "PIC_1175F", name: "1175F", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 900,
    img: "img/parts/pic_1175f.png",
    specs: ["Потужність: 1.75", "Ресурс: F (1 тиждень)", "Ліміт: 6.125 NICUS/год"],
    rarity: "Спеціальна", power: 1.75, resType: "F",
  },
  {
    id: "PIC_1200W", name: "1200W", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 1400,
    img: "img/parts/pic_1200w.png",
    specs: ["Потужність: 2.0", "Ресурс: W (4 тижні)", "Ліміт: 7.0 NICUS/год"],
    rarity: "Спеціальна", power: 2.0, resType: "W",
  },
{
    id: "PIC_1200P", name: "1200P", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 1300,
    img: "img/parts/pic_1200p.png",
    specs: ["Потужність: 2.0", "Ресурс: P (2 тижні)", "Ліміт: 7.0 NICUS/год"],
    rarity: "Спеціальна", power: 2.0, resType: "P",
  },
{
    id: "PIC_1200F", name: "1200F", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 1200,
    img: "img/parts/pic_1200f.png",
    specs: ["Потужність: 2.0", "Ресурс: F (1 тиждень)", "Ліміт: 7.0 NICUS/год"],
    rarity: "Спеціальна", power: 2.0, resType: "F",
  },  
  {
    id: "PIC_1300W", name: "1300W", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 2000,
    img: "img/parts/pic_1300w.png",
    specs: ["Потужність: 3.0", "Ресурс: W (4 тижні)", "Ліміт: 10.5 NICUS/год"],
    rarity: "Спеціальна", power: 3.0, resType: "W",
  },

{
    id: "PIC_1300P", name: "1300P", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 1700,
    img: "img/parts/pic_1300p.png",
    specs: ["Потужність: 3.0", "Ресурс: P (2 тижні)", "Ліміт: 10.5 NICUS/год"],
    rarity: "Спеціальна", power: 3.0, resType: "P",
  },

{
    id: "PIC_1300F", name: "1300F", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 1500,
    img: "img/parts/pic_1300f.png",
    specs: ["Потужність: 3.0", "Ресурс: F (1 тиждень)", "Ліміт: 10.5 NICUS/год"],
    rarity: "Спеціальна", power: 3.0, resType: "F",
  },

  {
    id: "PIC_1400W", name: "1400W", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 2700,
    img: "img/parts/pic_1400w.png",
    specs: ["Потужність: 4.0", "Ресурс: W (4 тижні)", "Ліміт: 14.0 NICUS/год"],
    rarity: "Спеціальна", power: 4.0, resType: "W",
  },

{
    id: "PIC_1400P", name: "1400P", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 2500,
    img: "img/parts/pic_1400p.png",
    specs: ["Потужність: 4.0", "Ресурс: P (2 тижні)", "Ліміт: 14.0 NICUS/год"],
    rarity: "Спеціальна", power: 4.0, resType: "P",
  },

{
    id: "PIC_1400F", name: "1400F", category: "pic",
    categoryLabel: "Процесор (PIC)",
    price: 2300,
    img: "img/parts/pic_1400f.png",
    specs: ["Потужність: 4.0", "Ресурс: F (1 тиждень)", "Ліміт: 14.0 NICUS/год"],
    rarity: "Спеціальна", power: 4.0, resType: "F",
  },

  // ── ВІДЕОКАРТИ ──────────────────────────────────────────────────
  {
    id: "GCN1000", name: "GCN 1000", category: "gpu",
    categoryLabel: "Відеокарта (GPU)",
    price: 600,
    img: "img/parts/gpu_gcn1000.png",
    specs: ["2.0 NICUS/год", "Бюджетна GPU"],
    rarity: "Спеціальна", rate: 2.0,
  },
  {
    id: "GCN1060", name: "GCN 1060", category: "gpu",
    categoryLabel: "Відеокарта (GPU)",
    price: 900,
    img: "img/parts/gpu_gcn1060.png",
    specs: ["2.5 NICUS/год", "Середній сегмент"],
    rarity: "Спеціальна", rate: 2.5,
  },
  {
    id: "GCN1080", name: "GCN 1080", category: "gpu",
    categoryLabel: "Відеокарта (GPU)",
    price: 1400,
    img: "img/parts/gpu_gcn1080.png",
    specs: ["3.0 NICUS/год", "Хороша продуктивність"],
    rarity: "Спеціальна", rate: 3.0,
  },
  {
    id: "GCN1090", name: "GCN 1090", category: "gpu",
    categoryLabel: "Відеокарта (GPU)",
    price: 2200,
    img: "img/parts/gpu_gcn1090.png",
    specs: ["4.0 NICUS/год", "Топ сегмент"],
    rarity: "Спеціальна", rate: 4.0,
  },
  {
    id: "GCN1090SUPER", name: "GCN 1090 SUPER", category: "gpu",
    categoryLabel: "Відеокарта (GPU)",
    price: 3200,
    img: "img/parts/gpu_gcn1090s.png",
    specs: ["5.0 NICUS/год", "Флагман GEN 1"],
    rarity: "Спеціальна", rate: 5.0,
  },

  // ── RAM ─────────────────────────────────────────────────────────
  {
    id: "RAM_1x1NB", name: "RAM 1×1 NB", category: "ram",
    categoryLabel: "Оперативна пам'ять",
    price: 120,
    img: "img/parts/ram_1x1.png",
    specs: ["1 NB (Нікус Біт)", "1 слот"],
    rarity: "Спеціальна", nb: 1,
  },
  {
    id: "RAM_2x1NB", name: "RAM 2×1 NB", category: "ram",
    categoryLabel: "Оперативна пам'ять",
    price: 220,
    img: "img/parts/ram_2x1.png",
    specs: ["2 NB (Нікус Біт)", "2 слоти, по 1 NB"],
    rarity: "Спеціальна", nb: 2,
  },
  {
    id: "RAM_1x2NB", name: "RAM 1×2 NB", category: "ram",
    categoryLabel: "Оперативна пам'ять",
    price: 220,
    img: "img/parts/ram_1x2.png",
    specs: ["2 NB (Нікус Біт)", "1 слот, 2 NB"],
    rarity: "Спеціальна", nb: 2,
  },
  {
    id: "RAM_2x2NB", name: "RAM 2×2 NB", category: "ram",
    categoryLabel: "Оперативна пам'ять",
    price: 400,
    img: "img/parts/ram_2x2.png",
    specs: ["4 NB (Нікус Біт)", "2 слоти, по 2 NB"],
    rarity: "Спеціальна", nb: 4,
  },
  {
    id: "RAM_1x4NB", name: "RAM 1×4 NB", category: "ram",
    categoryLabel: "Оперативна пам'ять",
    price: 400,
    img: "img/parts/ram_1x4.png",
    specs: ["4 NB (Нікус Біт)", "1 слот, 4 NB"],
    rarity: "Спеціальна", nb: 4,
  },
  {
    id: "RAM_2x4NB", name: "RAM 2×4 NB", category: "ram",
    categoryLabel: "Оперативна пам'ять",
    price: 700,
    img: "img/parts/ram_2x4.png",
    specs: ["8 NB (Нікус Біт)", "2 слоти, по 4 NB"],
    rarity: "Спеціальна", nb: 8,
  },

  // ── FAST SSD ────────────────────────────────────────────────────
  {
    id: "QNA128", name: "QNA 128 NB", category: "ssd_fast",
    categoryLabel: "Fast SSD",
    price: 350,
    img: "img/parts/ssd_qna128.png",
    specs: ["128 NB ємність", "⚡ Миттєвий доступ до NICUS", "⚠️ Є шанс поломки"],
    rarity: "Спеціальна",
  },
  {
    id: "QNA256", name: "QNA 256 NB", category: "ssd_fast",
    categoryLabel: "Fast SSD",
    price: 550,
    img: "img/parts/ssd_qna256.png",
    specs: ["256 NB ємність", "⚡ Миттєвий доступ до NICUS", "⚠️ Є шанс поломки"],
    rarity: "Спеціальна",
  },
  {
    id: "QNA512", name: "QNA 512 NB", category: "ssd_fast",
    categoryLabel: "Fast SSD",
    price: 850,
    img: "img/parts/ssd_qna512.png",
    specs: ["512 NB ємність", "⚡ Миттєвий доступ до NICUS", "⚠️ Є шанс поломки"],
    rarity: "Спеціальна",
  },

  // ── NORMAL SSD ──────────────────────────────────────────────────
  {
    id: "NA256", name: "NA 256 NB", category: "ssd_normal",
    categoryLabel: "Normal SSD",
    price: 300,
    img: "img/parts/hdd_na256.png",
    specs: ["256 NB ємність", "🔒 Безпечний (без поломок)", "⏳ NICUS через 1 год"],
    rarity: "Спеціальна",
  },
  {
    id: "NA512", name: "NA 512 NB", category: "ssd_normal",
    categoryLabel: "Normal SSD",
    price: 500,
    img: "img/parts/hdd_na512.png",
    specs: ["512 NB ємність", "🔒 Безпечний (без поломок)", "⏳ NICUS через 1 год"],
    rarity: "Спеціальна",
  },
  {
    id: "NA1024", name: "NA 1024 NB", category: "ssd_normal",
    categoryLabel: "Normal SSD",
    price: 900,
    img: "img/parts/hdd_na1024.png",
    specs: ["1024 NB ємність (1 MNB)", "🔒 Безпечний (без поломок)", "⏳ NICUS через 1 год"],
    rarity: "Спеціальна",
  },

  // ── ПЕЙДЖМЕНТ ───────────────────────────────────────────────────
  {
    id: "PAGEMET", name: "Пейджмент", category: "pagemet",
    categoryLabel: "Пейджмент",
    price: 200,
    img: "img/parts/pagemet.png",
    specs: ["Необхідний для роботи ПК", "Не впливає на продуктивність", "Без нього ПК не запуститься"],
    rarity: "Спеціальна",
  },
];

// ── Категорії для фільтрів ──────────────────────────────────────────
const PARTS_CATEGORIES = [
  { id: "all",        label: "🗂 Всі"           },
  { id: "mb",         label: "🔧 Мат. плати"    },
  { id: "pic",        label: "🔲 Процесори"     },
  { id: "gpu",        label: "🎮 Відеокарти"    },
  { id: "ram",        label: "🧠 RAM"           },
  { id: "ssd_fast",   label: "⚡ Fast SSD"      },
  { id: "ssd_normal", label: "💾 Normal SSD"    },
  { id: "pagemet",    label: "📟 Пейджмент"     },
];

// ── Стан вкладки ────────────────────────────────────────────────────
let _partsShopState = {
  category: "all",
  search: "",
  sort: "price_asc",
  openItem: null,
};

// ═══ СТИЛІ (ін'єкція один раз) ════════════════════════════════════

function _injectPartsShopCSS() {
  if (document.getElementById("parts-shop-css")) return;
  const s = document.createElement("style");
  s.id = "parts-shop-css";
  s.textContent = `
  .ps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
    gap: 12px;
    padding: 14px 20px;
  }
  .ps-card {
    background: #191d28;
    border: 1px solid rgba(255,255,255,.07);
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    transition: transform .2s, box-shadow .2s, border-color .2s;
    position: relative;
  }
  .ps-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 35px rgba(0,0,0,.55);
    border-color: rgba(240,192,80,.35);
  }
  .ps-card-accent { height: 3px; background: linear-gradient(90deg,#f0c050,#e08020); }
  .ps-card-img-wrap {
    display: flex; align-items: center; justify-content: center;
    padding: 14px 10px 6px;
    background: radial-gradient(ellipse at 50% 50%, rgba(240,192,80,.05) 0%, transparent 70%);
  }
  .ps-card-img {
    width: 88px; height: 68px; object-fit: contain;
    filter: drop-shadow(0 4px 10px rgba(0,0,0,.65));
    transition: transform .25s;
  }
  .ps-card:hover .ps-card-img { transform: scale(1.1) translateY(-3px); }
  .ps-card-body { padding: 0 10px 12px; }
  .ps-card-cat {
    font-size: 8px; font-weight: 800; letter-spacing: 1px;
    text-transform: uppercase; color: #64748b; margin-bottom: 3px;
  }
  .ps-card-name {
    font-size: 12px; font-weight: 700; color: #e2e8f0;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    margin-bottom: 6px;
  }
  .ps-card-price {
    font-family: 'Bebas Neue', cursive;
    font-size: 20px; color: #f0c050; line-height: 1;
  }
  .ps-card-price-sub { font-size: 9px; color: #64748b; font-weight: 600; font-family: 'DM Sans', sans-serif; }
  .ps-owned-badge {
    position: absolute; top: 8px; right: 8px;
    background: rgba(74,222,128,.18); border: 1px solid rgba(74,222,128,.35);
    color: #4ade80; font-size: 8px; font-weight: 800;
    padding: 2px 6px; border-radius: 20px; letter-spacing: .4px;
  }

  /* ── Фільтри ── */
  .ps-filters {
    display: flex; gap: 6px; padding: 10px 20px 0;
    overflow-x: auto; scrollbar-width: none; flex-wrap: nowrap;
  }
  .ps-filters::-webkit-scrollbar { display: none; }
  .ps-filter-btn {
    flex-shrink: 0;
    background: #13161e; border: 1px solid rgba(255,255,255,.07);
    color: #64748b; border-radius: 8px;
    padding: 6px 12px; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px; font-weight: 700;
    transition: .18s; white-space: nowrap;
  }
  .ps-filter-btn:hover { border-color: rgba(240,192,80,.3); color: #e2e8f0; }
  .ps-filter-btn.active {
    background: rgba(240,192,80,.14);
    border-color: #f0c050; color: #f0c050;
  }
  .ps-toolbar {
    display: flex; gap: 8px; padding: 10px 20px; align-items: center;
  }
  .ps-search {
    flex: 1; background: #13161e; border: 1px solid rgba(255,255,255,.08);
    color: #e2e8f0; padding: 8px 12px; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: 13px; outline: none;
    transition: border-color .2s;
  }
  .ps-search:focus { border-color: rgba(240,192,80,.5); }
  .ps-search::placeholder { color: #475569; }
  .ps-sort {
    background: #13161e; border: 1px solid rgba(255,255,255,.08);
    color: #e2e8f0; padding: 8px 10px; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
    cursor: pointer; outline: none;
  }
  .ps-empty {
    grid-column: 1/-1; text-align: center;
    padding: 50px 20px; color: #475569; font-size: 14px;
  }
  .ps-empty-icon { font-size: 44px; margin-bottom: 10px; }

  /* ── Модалка товару ── */
  @keyframes psPopIn {
    from { transform: scale(.88) translateY(18px); opacity: 0; }
    to   { transform: scale(1) translateY(0); opacity: 1; }
  }
  .ps-pop-overlay {
    position: fixed; inset: 0; z-index: 9200;
    background: rgba(0,0,0,.78); backdrop-filter: blur(7px);
    display: flex; align-items: center; justify-content: center;
    padding: 16px; box-sizing: border-box;
  }
  .ps-pop-box {
    width: 100%; max-width: 480px; max-height: 88vh;
    background: #13161e; border: 1px solid rgba(240,192,80,.35);
    border-radius: 20px;
    box-shadow: 0 30px 80px rgba(0,0,0,.85);
    animation: psPopIn .22s cubic-bezier(.34,1.56,.64,1);
    overflow: hidden; display: flex; flex-direction: column;
  }
  .ps-pop-scroll { overflow-y: auto; padding: 18px 20px 22px; flex: 1; min-height: 0; }
  .ps-spec-item {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 10px;
    background: rgba(255,255,255,.03);
    border: 1px solid rgba(255,255,255,.06);
    border-radius: 8px; font-size: 12px; color: #94a3b8;
    font-weight: 600;
  }
  .ps-buy-btn {
    width: 100%; padding: 15px;
    border: none; border-radius: 12px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 800;
    cursor: pointer; transition: .2s; letter-spacing: .3px;
    background: linear-gradient(135deg, #f0c050, #e08020);
    color: #111;
    box-shadow: 0 4px 0 #a05010, 0 0 20px rgba(240,192,80,.3);
  }
  .ps-buy-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 0 #a05010, 0 0 30px rgba(240,192,80,.5);
  }
  .ps-buy-btn:active:not(:disabled) { transform: translateY(1px); box-shadow: 0 2px 0 #a05010; }
  .ps-buy-btn:disabled {
    background: rgba(255,255,255,.08); color: #475569;
    box-shadow: none; cursor: not-allowed;
  }
  .ps-qty-row {
    display: flex; align-items: center; gap: 12px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 12px; padding: 10px 14px;
    margin-bottom: 12px;
  }
  .ps-qty-btn {
    width: 32px; height: 32px; border-radius: 8px;
    background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12);
    color: #e2e8f0; font-size: 18px; font-weight: 700;
    cursor: pointer; transition: .15s; line-height: 1;
  }
  .ps-qty-btn:hover { background: rgba(240,192,80,.15); border-color: rgba(240,192,80,.4); }
  .ps-res-badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: 800;
    letter-spacing: .5px; text-transform: uppercase;
  }
  `;
  document.head.appendChild(s);
}

// ═══ ГОЛОВНИЙ РЕНДЕР ВКЛАДКИ ══════════════════════════════════════

function openPartsShop() {
  _injectPartsShopCSS();
  _injectMarketCSS();  // беремо стилі ринку

  const app = document.getElementById("app");
  app.innerHTML = `
    <div id="mkt-root">
      <!-- HEADER у стилі ринку -->
      <div class="mkt-header">
        <div class="mkt-header-row">
          <div class="mkt-title">🖥 МАГАЗИН ПК</div>
     <div class="mkt-balance-chip" id="ps-balance-chip">💎 ${nikus || 0} нікусів</div>
          <button class="mkt-back-btn" onclick="openMarket()">← Ринок</button>
        </div>

        <!-- Категорії -->
        <div class="ps-filters" id="ps-filter-wrap">
          ${PARTS_CATEGORIES.map(c => `
            <button class="ps-filter-btn${_partsShopState.category === c.id ? ' active' : ''}"
              onclick="_psSetCategory('${c.id}')">${c.label}</button>
          `).join('')}
        </div>

        <!-- Тулбар -->
        <div class="ps-toolbar">
          <input class="ps-search" placeholder="🔍 Пошук компонентів..."
            value="${_partsShopState.search}"
            oninput="_partsShopState.search=this.value;_psRenderGrid()">
          <select class="ps-sort" onchange="_partsShopState.sort=this.value;_psRenderGrid()">
            <option value="price_asc"  ${_partsShopState.sort==='price_asc'?'selected':''}>Ціна ↑</option>
            <option value="price_desc" ${_partsShopState.sort==='price_desc'?'selected':''}>Ціна ↓</option>
            <option value="name_asc"   ${_partsShopState.sort==='name_asc'?'selected':''}>A–Z</option>
          </select>
        </div>
      </div>

      <!-- Тікер балансу -->
      <div style="background:rgba(240,192,80,.06);border-top:1px solid rgba(240,192,80,.1);border-bottom:1px solid rgba(240,192,80,.1);padding:7px 20px;font-size:11px;font-weight:700;color:#64748b;letter-spacing:.5px;">
        💡 Купуєш предмет — він з'являється в інвентарі. Встанови у <strong style="color:#f0c050">🖥 Комп'ютері</strong>.
        &nbsp;·&nbsp; Топ збірка ≈ 9 000–12 000 💎 &nbsp;·&nbsp; Бюджетна ≈ 1 500–2 500 💎
      </div>

      <!-- Сітка карток -->
      <div class="ps-grid" id="ps-grid-wrap"></div>
    </div>
  `;

  _psRenderGrid();
}

// ═══ РЕНДЕР КАРТОК ════════════════════════════════════════════════

function _psSetCategory(cat) {
  _partsShopState.category = cat;
  // Оновити активну кнопку
  document.getElementById("ps-filter-wrap").querySelectorAll(".ps-filter-btn").forEach((btn, i) => {
    btn.classList.toggle("active", PARTS_CATEGORIES[i].id === cat);
  });
  _psRenderGrid();
}

function _psRenderGrid() {
  const wrap = document.getElementById("ps-grid-wrap");
  if (!wrap) return;

  let items = [...PARTS_SHOP_CATALOG];

  // Фільтр категорії
  if (_partsShopState.category !== "all") {
    items = items.filter(x => x.category === _partsShopState.category);
  }

  // Пошук
  if (_partsShopState.search.trim()) {
    const q = _partsShopState.search.toLowerCase();
    items = items.filter(x =>
      x.name.toLowerCase().includes(q) ||
      x.categoryLabel.toLowerCase().includes(q) ||
      (x.specs || []).some(s => s.toLowerCase().includes(q))
    );
  }

  // Сортування
  items.sort((a, b) => {
    if (_partsShopState.sort === "price_asc")  return a.price - b.price;
    if (_partsShopState.sort === "price_desc") return b.price - a.price;
    if (_partsShopState.sort === "name_asc")   return a.name.localeCompare(b.name);
    return 0;
  });

  if (!items.length) {
    wrap.innerHTML = `<div class="ps-empty"><div class="ps-empty-icon">🔍</div>Нічого не знайдено</div>`;
    return;
  }

  // Підрахунок у інвентарі
  let inv = [];
  try { inv = JSON.parse(localStorage.getItem(currentUser + "_inventory") || "[]"); } catch {}

  wrap.innerHTML = items.map(part => {
    const owned = inv.filter(i => i.type === "item" && i.name === part.name).length;
    return `
      <div class="ps-card" onclick="_psOpenItem('${part.id}')">
        <div class="ps-card-accent"></div>
        ${owned > 0 ? `<div class="ps-owned-badge">У тебе: ${owned}</div>` : ''}
        <div class="ps-card-img-wrap">
          <img class="ps-card-img" src="${part.img}" onerror="this.style.opacity='0.3';this.src=''" alt="${part.name}">
        </div>
        <div class="ps-card-body">
          <div class="ps-card-cat">${part.categoryLabel}</div>
          <div class="ps-card-name">${part.name}</div>
          <div class="ps-card-price">${part.price.toLocaleString()}</div>
          <div class="ps-card-price-sub">нікусів</div>
        </div>
      </div>
    `;
  }).join('');
}

// ═══ МОДАЛКА ТОВАРУ ══════════════════════════════════════════════

function _psOpenItem(id) {
  const part = PARTS_SHOP_CATALOG.find(x => x.id === id);
  if (!part) return;
  _partsShopState.openItem = part;
  _partsShopState.buyQty   = 1;
  _psRenderPopup(part);
}

function _psRenderPopup(part) {
  _injectPartsShopCSS();
  document.getElementById("ps-pop-overlay")?.remove();

  const total   = part.price * (_partsShopState.buyQty || 1);
  const canBuy  = (nikus || 0) >= total;

  // Значок типу ресурсу для PIC
  const resInfo = {
    F: { label: "F — 1 тиждень", color: "#4ade80", bg: "rgba(74,222,128,.12)" },
    P: { label: "P — 2 тижні",   color: "#60a5fa", bg: "rgba(96,165,250,.12)" },
    W: { label: "W — 4 тижні",   color: "#c084fc", bg: "rgba(192,132,252,.12)" },
  };
  const resBadge = part.resType
    ? `<div class="ps-res-badge" style="background:${resInfo[part.resType].bg};color:${resInfo[part.resType].color};border:1px solid ${resInfo[part.resType].color}40;">
         ⏱ ${resInfo[part.resType].label}
       </div>` : '';

  // GPU rate badge
  const rateBadge = part.rate
    ? `<div class="ps-res-badge" style="background:rgba(240,192,80,.1);color:#f0c050;border:1px solid rgba(240,192,80,.25);">
         ⚡ ${part.rate} NICUS/год
       </div>` : '';

  // Power badge для PIC
  const powerBadge = part.power !== undefined
    ? `<div class="ps-res-badge" style="background:rgba(240,192,80,.08);color:#fbbf24;border:1px solid rgba(240,192,80,.2);">
         🔲 Потужність: ${part.power}
       </div>` : '';

  // NB badge для RAM
  const nbBadge = part.nb
    ? `<div class="ps-res-badge" style="background:rgba(96,165,250,.1);color:#60a5fa;border:1px solid rgba(96,165,250,.25);">
         🧠 ${part.nb} NB
       </div>` : '';

  const ov = document.createElement("div");
  ov.id = "ps-pop-overlay";
  ov.className = "ps-pop-overlay";
  ov.addEventListener("click", e => { if (e.target === ov) _psClosePopup(); });

  ov.innerHTML = `
    <div class="ps-pop-box">
      <div style="height:4px;background:linear-gradient(90deg,#f0c050,#e08020);flex-shrink:0;border-radius:20px 20px 0 0;"></div>
      <div class="ps-pop-scroll">

        <!-- ХЕДЕР -->
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
          <div style="font-family:'Bebas Neue',cursive;font-size:24px;letter-spacing:2px;color:#f0c050;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${part.name}</div>
          <button onclick="_psClosePopup()" style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);color:#64748b;width:30px;height:30px;border-radius:8px;cursor:pointer;font-size:14px;">✕</button>
        </div>

        <!-- ЗОБРАЖЕННЯ + ЦІНА -->
        <div style="display:flex;align-items:center;gap:16px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:14px;margin-bottom:14px;">
          <img src="${part.img}" onerror="this.style.opacity='.25'" style="width:90px;height:72px;object-fit:contain;filter:drop-shadow(0 4px 14px rgba(0,0,0,.7));flex-shrink:0;">
          <div style="flex:1;">
            <div style="font-family:'Bebas Neue',cursive;font-size:40px;color:#f0c050;line-height:1;" id="ps-price-big">${part.price.toLocaleString()}</div>
            <div style="font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase;margin-top:1px;">нікусів за 1 шт.</div>
            <div style="font-size:11px;font-weight:700;color:#94a3b8;margin-top:4px;">${part.categoryLabel}</div>
          </div>
        </div>

        <!-- ХАРАКТЕРИСТИКИ -->
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
          ${resBadge}${rateBadge}${powerBadge}${nbBadge}
        </div>

        <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:16px;">
          ${(part.specs || []).map(s => `<div class="ps-spec-item">▸ ${s}</div>`).join('')}
        </div>

        <div style="height:1px;background:rgba(255,255,255,.07);margin-bottom:14px;"></div>

        <!-- КІЛЬКІСТЬ -->
        <div class="ps-qty-row">
          <span style="font-size:12px;font-weight:700;color:#94a3b8;flex:1;">Кількість:</span>
          <button class="ps-qty-btn" onclick="_psQty(-1)">−</button>
          <span id="ps-qty-val" style="font-size:18px;font-weight:700;min-width:30px;text-align:center;">${_partsShopState.buyQty}</span>
          <button class="ps-qty-btn" onclick="_psQty(1)">+</button>
          <span id="ps-total-val" style="font-size:15px;font-weight:700;color:#f0c050;white-space:nowrap;">${total.toLocaleString()}💎</span>
        </div>

        <!-- БАЛАНС -->
        <div style="text-align:right;font-size:11px;font-weight:700;color:${canBuy?'#4ade80':'#f87171'};margin-bottom:12px;">
          ${canBuy ? `✅ Вистачає (у тебе ${(nikus||0).toLocaleString()}💎)` : `❌ Не вистачає ${(total-(nikus||0)).toLocaleString()}💎`}
        </div>

        <!-- КНОПКА -->
        <button class="ps-buy-btn" id="ps-buy-confirm-btn" ${canBuy?'':'disabled'}
          onclick="_psDoBuy('${part.id}')">
          ${canBuy ? `🛒 Купити ${_partsShopState.buyQty} шт. — ${total.toLocaleString()}💎` : '❌ Недостатньо нікусів'}
        </button>

        <button onclick="_psClosePopup()" style="width:100%;margin-top:8px;padding:11px;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:rgba(255,255,255,.04);color:#64748b;cursor:pointer;font-weight:700;font-family:'DM Sans',sans-serif;font-size:13px;">Закрити</button>

      </div>
    </div>
  `;

  document.body.appendChild(ov);
}

function _psClosePopup() {
  document.getElementById("ps-pop-overlay")?.remove();
  _partsShopState.openItem = null;
  _partsShopState.buyQty   = 1;
}

function _psQty(delta) {
  _partsShopState.buyQty = Math.max(1, Math.min(99, (_partsShopState.buyQty || 1) + delta));
  const part  = _partsShopState.openItem;
  if (!part) return;
  const total   = part.price * _partsShopState.buyQty;
  const canBuy  = (nikus || 0) >= total;

  const qEl = document.getElementById("ps-qty-val");
  const tEl = document.getElementById("ps-total-val");
  const bEl = document.getElementById("ps-buy-confirm-btn");

  if (qEl) qEl.textContent = _partsShopState.buyQty;
  if (tEl) tEl.textContent = total.toLocaleString() + "💎";
  if (bEl) {
    bEl.disabled    = !canBuy;
    bEl.textContent = canBuy
      ? `🛒 Купити ${_partsShopState.buyQty} шт. — ${total.toLocaleString()}💎`
      : "❌ Недостатньо нікусів";
  }
}

// ═══ ПОКУПКА ══════════════════════════════════════════════════════

function _psDoBuy(id) {
  const part = PARTS_SHOP_CATALOG.find(x => x.id === id);
  if (!part) return;

  const qty   = _partsShopState.buyQty || 1;
  const total = part.price * qty;

  if ((nikus || 0) < total) {
    _mktToast("❌ Недостатньо нікусів!", "error");
    return;
  }

  nikus -= total;
  localStorage.setItem(currentUser + "_nikus", nikus);

  // Додаємо у інвентар як предмет (назва = назва комплектуючого)
  for (let i = 0; i < qty; i++) {
    inventory.push({
      id:        crypto.randomUUID(),
      type:      "item",
      name:      part.name,
      img:       part.img.replace("img/", ""),   // відносний шлях до папки img/
      rarity:    "Спеціальна",
      quality:   null,         // комплектуючі не мають якості
      premium:   false,
      fromCase:  "parts_shop",
      createdAt: Date.now(),
    });
  }

  if (typeof saveData === "function") saveData();

  _mktToast(`✅ Куплено ${qty}× ${part.name}!`, "success");
_psClosePopup();
  _psRenderGrid();
  const chip = document.getElementById("ps-balance-chip");
  if (chip) chip.textContent = `💎 ${nikus} нікусів`;
}

// ==================== АВАТАРКИ ЯК ПРЕДМЕТИ ====================
// Аватарки — це окремий тип предметів ("avatar") в інвентарі
// Щоб видати аватарку: addAvatarItem("avatar1")
// Картинки: img/avatar1.png, img/avatar2.png ... img/avatar10.png

const avatarItemsList = [
  { name: "ДикаКишечка",  img: "avatar1.png",  id_key: "ДикаКишечка" },
  { name: "Кулдудка",  img: "avatar2.png",  id_key: "Кулдудка"  },
  { name: "Ксенатор",  img: "avatar3.png",  id_key: "Ксенатор"  },
  { name: "ДобрийДядя",  img: "avatar4.png",  id_key: "ДобрийДядя"  },
  { name: "ЄнотГанстер",  img: "avatar5.png",  id_key: "ЄнотГанстер"  },
  { name: "Ліс",  img: "avatar6.png",  id_key: "Ліс"  },
  { name: "АйТигр",  img: "avatar7.png",  id_key: "АйТигр"  },
  { name: "ПінгвінДруже",  img: "avatar8.png",  id_key: "ПінгвінДруже"  },
  { name: "Кимчик",  img: "avatar9.png",  id_key: "Кимчик"  },
  { name: "ДідКазіно (Аватарка)", img: "avatar10.png", id_key: "ДідКазіно (Аватарка)" },
];

function addAvatarItem(id_key, count = 1) {
  const def = avatarItemsList.find(a => a.id_key === id_key);
  if (!def) { console.warn("Аватарка не знайдена:", id_key); return; }
  if (!inventory) inventory = [];
  for (let i = 0; i < count; i++) {
    inventory.push({
      id: `${def.id_key}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      type: "avatar",
      id_key: def.id_key,
      name: def.name,
      img: def.img,
      rarity: "Спеціальна"
    });
  }
  saveData();
}

// ==================== ПРОФІЛЬ ====================

const availableMedals = [
  { id: "medal_diam",    name: "Діамантова медаль «День Нікус Кейс Ультра 2026»", img: "medaldiamont1.png" },
  { id: "medal_gold",    name: "Золота медаль «День Нікус Кейс Ультра 2026»",     img: "medalgold1.png"   },
  { id: "medal_silver",  name: "Срібна медаль «День Нікус Кейс Ультра 2026»",     img: "medalsilver1.png" },
  { id: "medal_bronze",  name: "Бронзова медаль «День Нікус Кейс Ультра 2026»",   img: "medalbronze1.png" },
  { id: "medal_pro",     name: "PRO Медаль «Півріччя Нікус Кейс Ультра»",          img: "medapro1.png"     },
  { id: "medal_flower1",  name: "Бронзова медаль «Проходження батл-пасу FlowerPower 2026»",   img: "medal_flower1.png" },
  { id: "medal_flower2", name: "Медаль «Проходження батл-пасу FlowerPower 2026»",   img: "medal_flower2.png"     },
  { id: "medal_default", name: "Медаль «Півріччя Нікус Кейс Ультра»",             img: "medaldefault.png" },
];

const _titleOptions = [
  "", "Новачок", "Дослідник", "Колекціонер", "Аркадний гравець",
  "Садівник", "Криптомагнат", "Легенда", "Містер Кейс", "Король Нікусів"
];

function saveProfile(data) {
  if (!currentUser) return;
  localStorage.setItem(currentUser + "_profile", JSON.stringify(data));
}

function loadProfile() {
  if (!currentUser) return {};
  try {
    return JSON.parse(localStorage.getItem(currentUser + "_profile") || "{}");
  } catch(e) { return {}; }
}

function _prToast(msg) {
  const t = document.getElementById("pr-toast");
  if (!t) return;
  t.textContent = msg;
  t.className = "pr-toast-show";
  clearTimeout(window._prToastT);
  window._prToastT = setTimeout(function() {
    const el = document.getElementById("pr-toast");
    if (el) el.className = "";
  }, 2500);
}

// ── Пікер медалей: показує тільки ті, що є у інвентарі гравця ──
function _renderMedalPicker() {
  const wrap = document.getElementById("pr-medal-picker");
  if (!wrap) return;
  wrap.innerHTML = "";

  const freshInv = JSON.parse(localStorage.getItem(currentUser + "_inventory") || "[]");

  availableMedals.forEach(function(dm) {
    // Медаль вважається "наявною" тільки якщо є в інвентарі як item з точно такою назвою
    const owned = freshInv.some(function(it) {
      return it.type === "item" && it.name === dm.name;
    });
    const sel = (window._prMedals || []).some(function(m) { return m.id === dm.id; });

    const d = document.createElement("div");
    d.className = "pr-medal-card" +
      (sel ? " pr-medal-sel" : "") +
      (owned ? "" : " pr-medal-locked");

    d.innerHTML =
      '<img src="img/' + dm.img + '" alt="' + dm.name + '">' +
      '<div class="pr-medal-name">' + dm.name + '</div>' +
      (owned
        ? '<small style="color:#7cb342;font-size:10px;">✓ Є в інвентарі</small>'
        : '<small style="color:#c00;font-size:10px;">🔒 Немає</small>');

    if (owned) {
      d.onclick = function() {
        if (!window._prMedals) window._prMedals = [];
        const idx = window._prMedals.findIndex(function(m) { return m.id === dm.id; });
        if (idx !== -1) {
          window._prMedals.splice(idx, 1);
        } else if (window._prMedals.length < 3) {
          window._prMedals.push(dm);
        } else {
          _prToast("Максимум 3 медалі!");
          return;
        }
        _renderMedalPicker();
        _renderMedalsDisplay();
      };
    }
    wrap.appendChild(d);
  });
}

function _renderMedalsDisplay() {
  const d = document.getElementById("pr-medals-display");
  if (!d) return;
  const medals = window._prMedals || [];
  if (medals.length === 0) {
    d.innerHTML = '<span class="pr-medals-empty">Медалі не обрані</span>';
    return;
  }
  d.innerHTML = medals.map(function(m) {
    return '<div class="pr-medal-chip">' +
      '<img src="img/' + m.img + '" alt="' + m.name + '">' +
      '<span>' + m.name + '</span>' +
      '</div>';
  }).join("");
}

window.openAvatarModal = function() {
  const m = document.getElementById("pr-av-modal");
  if (m) m.style.display = "flex";
};

window.closeAvatarModal = function() {
  const m = document.getElementById("pr-av-modal");
  if (m) m.style.display = "none";
};

window.pickAvatar = function(name, img) {
  window._prAvatar = { name: name, img: img };
  const d = document.getElementById("pr-avatar-img");
  if (d) d.innerHTML = '<img src="img/' + img + '" alt="' + name + '">';
  document.querySelectorAll(".pr-av-card").forEach(function(el) {
    el.classList.toggle("pr-av-sel", el.dataset.name === name);
    if (el.dataset.name === name) {
      if (!el.querySelector(".pr-av-check")) {
        const chk = document.createElement("div");
        chk.className = "pr-av-check";
        chk.textContent = "✓";
        el.prepend(chk);
      }
    } else {
      const chk = el.querySelector(".pr-av-check");
      if (chk) chk.remove();
    }
  });
  window.closeAvatarModal();
  _prToast("Аватарку встановлено! Не забудь зберегти.");
};

window.saveProfileData = function() {
  const titleEl = document.getElementById("pr-title-sel");
  const bioEl   = document.getElementById("pr-bio-inp");
  saveProfile({
    avatar: window._prAvatar || null,
    medals: window._prMedals || [],
    bio:    bioEl   ? bioEl.value.trim() : "",
    title:  titleEl ? titleEl.value      : ""
  });
  _prToast("✅ Профіль збережено!");
};

function openProfile() {
  const freshInv = JSON.parse(localStorage.getItem(currentUser + "_inventory") || "[]");

  const profile  = loadProfile();
  window._prAvatar = profile.avatar || null;
  window._prMedals = (profile.medals || []).slice();

  const bio   = profile.bio   || "";
  const title = profile.title || "";
  const av    = profile.avatar;

  // ── Аватарки: тільки тип "avatar" з інвентарю, унікальні за name ──
  const seenAv = {};
 
const AVATAR1_NAMES = [
  "ДикаКишечка","Кулдудка","Ксенатор","ДобрийДядя",
  "ЄнотГанстер","Ліс","АйТигр","ПінгвінДруже",
  "Кимчик","ДідКазіно (Аватарка)"
];

const avatars = freshInv.filter(function(it) {
    const isAvatar = it.type === "avatar";
    const isAvatar1Item = it.type === "item" && AVATAR1_NAMES.includes(it.name);
    if ((isAvatar || isAvatar1Item) && it.img && !seenAv[it.name]) {
      seenAv[it.name] = true;
      return true;
    }
    return false;
  });


  function buildAvCards() {
    if (!avatars.length) {
      return '<div class="pr-empty">🎨 Аватарок ще немає.<br>Отримуй їх через промокоди та івенти!</div>';
    }
    return '<div class="pr-av-grid">' +
      avatars.map(function(item) {
        const sel = window._prAvatar && window._prAvatar.name === item.name;
        const safeN = item.name.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
        const safeI = item.img.replace(/'/g, "\\'");
        return '<div class="pr-av-card' + (sel ? " pr-av-sel" : "") + '"' +
          ' data-name="' + item.name + '"' +
          ' onclick="window.pickAvatar(\'' + safeN + '\',\'' + safeI + '\')">' +
          (sel ? '<div class="pr-av-check">✓</div>' : '') +
          '<img src="img/' + item.img + '" alt="' + item.name + '">' +
          '<div class="pr-av-card-name">' + item.name + '</div>' +
          '</div>';
      }).join("") +
      '</div>';
  }

  const titleOptions = _titleOptions.map(function(t) {
    const sel = t === title ? " selected" : "";
    const label = t || "— Без титулу —";
    return '<option value="' + t + '"' + sel + '>' + label + '</option>';
  }).join("");

  document.getElementById("app").innerHTML = `
    <style>
      #pr-root {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #2d4a1f;
        max-width: 900px;
        margin: 0 auto;
      }
      .pr-nav {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
        padding-bottom: 14px;
        border-bottom: 2px solid #9ccc65;
      }
      .pr-nav-title {
        font-size: 22px;
        font-weight: 700;
        color: #33691e;
        text-shadow: 0 0 10px rgba(197,225,165,.7);
        flex: 1;
      }
      /* HERO */
      .pr-hero {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 20px;
        align-items: start;
        background: linear-gradient(180deg, rgba(255,255,224,.95), rgba(240,255,200,.9));
        border: 2px solid #9ccc65;
        border-radius: 20px;
        padding: 20px;
        margin-bottom: 16px;
        box-shadow: 0 0 25px rgba(124,179,66,.5);
        position: relative;
      }
      .pr-hero::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        border-radius: 20px 20px 0 0;
        background: linear-gradient(90deg, #7cb342, #dce775, #7cb342);
      }
      /* AVATAR */
      .pr-av-wrap {
        cursor: pointer;
        width: 110px;
        text-align: center;
      }
      .pr-av-ring {
        width: 106px; height: 106px;
        border-radius: 50%;
        padding: 3px;
        background: conic-gradient(#7cb342, #dce775, #aed581, #7cb342);
        animation: prSpin 5s linear infinite;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 20px rgba(124,179,66,.6);
        margin: 0 auto;
      }
      @keyframes prSpin { to { transform: rotate(360deg); } }
      #pr-avatar-img {
        width: 100%; height: 100%;
        border-radius: 50%;
        background: #fffef0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        overflow: hidden;
      }
      #pr-avatar-img img {
        width: 100%; height: 100%;
        object-fit: contain;
        border-radius: 50%;
      }
      .pr-av-hint {
        margin-top: 8px;
        font-size: 10px;
        font-weight: 700;
        color: #7cb342;
        letter-spacing: .5px;
        text-transform: uppercase;
      }
      .pr-name {
        font-size: 22px;
        font-weight: 700;
        color: #33691e;
        margin-bottom: 6px;
        text-shadow: 0 0 10px rgba(124,179,66,.4);
      }
      .pr-badge {
        display: inline-block;
        background: linear-gradient(90deg, #c5e1a5, #dce775);
        border: 1px solid #9ccc65;
        color: #33691e;
        font-size: 11px;
        font-weight: 700;
        padding: 3px 12px;
        border-radius: 20px;
        margin-bottom: 12px;
        letter-spacing: .5px;
        box-shadow: 0 2px 8px rgba(124,179,66,.3);
      }
      .pr-stats {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 10px;
      }
      .pr-stat {
        background: rgba(124,179,66,.1);
        border: 1px solid #9ccc65;
        border-radius: 10px;
        padding: 6px 12px;
        text-align: center;
        min-width: 58px;
      }
      .pr-stat-v { font-size: 16px; font-weight: 700; line-height: 1; margin-bottom: 2px; color: #33691e; }
      .pr-stat-l { font-size: 9px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; color: #7cb342; }
      .pr-bio { font-size: 13px; color: #5a7a3a; font-style: italic; line-height: 1.6; max-width: 400px; }
      /* SECTION */
      .pr-section {
        background: linear-gradient(180deg, rgba(255,255,224,.92), rgba(240,255,200,.9));
        border: 2px solid #9ccc65;
        border-radius: 18px;
        padding: 18px;
        margin-bottom: 16px;
        box-shadow: 0 0 18px rgba(124,179,66,.4);
      }
      .pr-section-title {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: #7cb342;
        margin-bottom: 14px;
        padding-bottom: 8px;
        border-bottom: 1px solid #c5e1a5;
      }
      /* FORM */
      .pr-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
      .pr-label { display: block; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #7cb342; margin-bottom: 6px; }
      #pr-title-sel {
        width: 100%;
        background: #fffef0;
        border: 2px solid #9ccc65;
        color: #2d4a1f;
        padding: 9px 12px;
        border-radius: 12px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        outline: none;
        box-sizing: border-box;
        transition: border-color .2s, box-shadow .2s;
        -webkit-appearance: none;
      }
      #pr-title-sel:focus { border-color: #7cb342; box-shadow: 0 0 10px rgba(124,179,66,.5); }
      #pr-bio-inp {
        width: 100%;
        background: #fffef0;
        border: 2px solid #9ccc65;
        color: #2d4a1f;
        padding: 9px 12px;
        border-radius: 12px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 13px;
        font-weight: 600;
        resize: vertical;
        min-height: 72px;
        outline: none;
        box-sizing: border-box;
        transition: border-color .2s, box-shadow .2s;
      }
      #pr-bio-inp:focus { border-color: #7cb342; box-shadow: 0 0 10px rgba(124,179,66,.5); }
      .pr-save-btn {
        background: linear-gradient(45deg, #aed581, #dce775);
        border: none;
        color: #2d4a1f;
        padding: 11px 40px;
        border-radius: 18px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 4px 0 #7cb342, 0 0 18px rgba(156,204,101,.6);
        transition: .25s ease;
        display: block;
        margin: 0 auto;
        position: relative;
      }
      .pr-save-btn:hover { transform: translateY(-2px) scale(1.05); box-shadow: 0 7px 0 #689f38, 0 0 26px rgba(197,225,165,.9); }
      /* MEDALS DISPLAY */
      #pr-medals-display { display: flex; flex-direction: column; gap: 6px; min-height: 28px; }
      .pr-medals-empty { font-size: 12px; color: #9ccc65; font-style: italic; }
      .pr-medal-chip {
        display: flex;
        align-items: center;
        gap: 8px;
        background: linear-gradient(90deg, rgba(220,231,117,.2), rgba(174,213,129,.2));
        border: 1px solid #9ccc65;
        border-radius: 10px;
        padding: 5px 10px;
      }
      .pr-medal-chip img { width: 24px; height: 24px; object-fit: contain; }
      .pr-medal-chip span { font-size: 11px; font-weight: 600; color: #33691e; }
      /* MEDAL PICKER */
      #pr-medal-picker { display: flex; flex-wrap: wrap; gap: 10px; }
      .pr-medal-card {
        width: 130px;
        border-radius: 14px;
        padding: 10px 6px;
        text-align: center;
        background: rgba(255,255,224,.8);
        border: 2px solid #9ccc65;
        cursor: pointer;
        transition: all .2s;
        box-shadow: 0 2px 8px rgba(124,179,66,.2);
        position: relative;
      }
      .pr-medal-card img { width: 50px; height: 50px; object-fit: contain; display: block; margin: 0 auto 6px; }
      .pr-medal-name { font-size: 9px; font-weight: 700; color: #2d4a1f; line-height: 1.3; }
      .pr-medal-card small { display: block; margin-top: 3px; }
      .pr-medal-card.pr-medal-sel {
        background: linear-gradient(180deg, #fffde7, #dce775);
        border-color: #7cb342;
        box-shadow: 0 0 14px rgba(220,231,117,.6);
        transform: scale(1.04);
      }
      .pr-medal-card.pr-medal-sel::after {
        content: "✓";
        position: absolute;
        top: 4px; right: 6px;
        font-size: 14px;
        color: #33691e;
        font-weight: 900;
      }
      .pr-medal-locked { opacity: .45; cursor: not-allowed !important; }
      .pr-medal-card:not(.pr-medal-locked):hover { transform: translateY(-3px); box-shadow: 0 6px 16px rgba(124,179,66,.35); border-color: #7cb342; }
      /* AVATAR GRID */
      .pr-av-grid { display: flex; flex-wrap: wrap; gap: 9px; }
      .pr-av-card {
        width: 100px;
        border-radius: 14px;
        background: rgba(255,255,224,.8);
        border: 2px solid #9ccc65;
        padding: 8px 6px;
        text-align: center;
        cursor: pointer;
        transition: all .2s;
        position: relative;
        box-shadow: 0 2px 8px rgba(124,179,66,.2);
        user-select: none;
      }
      .pr-av-card img {
        width: 68px; height: 68px;
        object-fit: contain;
        display: block;
        margin: 0 auto 5px;
        border-radius: 8px;
      }
      .pr-av-card-name { font-size: 9px; font-weight: 700; word-break: break-word; line-height: 1.2; color: #2d4a1f; }
      .pr-av-card:hover { transform: translateY(-3px); box-shadow: 0 6px 18px rgba(124,179,66,.4); border-color: #7cb342; }
      .pr-av-card.pr-av-sel {
        background: linear-gradient(180deg, #fffde7, #dce775);
        box-shadow: 0 0 16px rgba(124,179,66,.5);
        border-color: #7cb342;
      }
      .pr-av-check {
        position: absolute;
        top: 4px; right: 4px;
        width: 18px; height: 18px;
        border-radius: 50%;
        background: #7cb342;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: #fff;
        font-weight: bold;
      }
      .pr-empty {
        text-align: center;
        padding: 20px;
        color: #9ccc65;
        font-style: italic;
        font-size: 13px;
        line-height: 1.6;
      }
      /* MODAL */
      #pr-av-modal {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(45,74,31,.6);
        backdrop-filter: blur(6px);
        z-index: 10000;
        align-items: center;
        justify-content: center;
      }
      #pr-av-modal-box {
        background: linear-gradient(180deg, #fffef5, #f0ffc8);
        border: 2px solid #9ccc65;
        border-radius: 20px;
        padding: 22px;
        max-width: 680px;
        width: 92%;
        max-height: 84vh;
        overflow-y: auto;
        box-shadow: 0 0 40px rgba(124,179,66,.6);
      }
      #pr-av-modal-box h3 { font-size: 16px; color: #33691e; margin: 0 0 16px; text-align: center; }
      .pr-modal-close {
        background: linear-gradient(45deg, #aed581, #dce775);
        border: none; color: #2d4a1f;
        width: 34px; height: 34px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 15px;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 3px 0 #7cb342;
        transition: .2s;
        padding: 0;
      }
      .pr-modal-close:hover { transform: scale(1.1); }
      /* TOAST */
      #pr-toast {
        position: fixed;
        bottom: 28px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: linear-gradient(90deg, #7cb342, #dce775);
        color: #2d4a1f;
        padding: 10px 26px;
        border-radius: 50px;
        font-weight: 700;
        font-size: 13px;
        z-index: 99999;
        opacity: 0;
        pointer-events: none;
        transition: all .3s cubic-bezier(.34,1.56,.64,1);
        box-shadow: 0 4px 20px rgba(124,179,66,.5);
        white-space: nowrap;
      }
      #pr-toast.pr-toast-show { opacity: 1; transform: translateX(-50%) translateY(0); }
      @media (max-width: 600px) {
        .pr-hero { grid-template-columns: 1fr; }
        .pr-form-row { grid-template-columns: 1fr; }
      }
    </style>

    <div id="pr-root">
      <!-- NAV -->
      <div class="pr-nav">
        <button onclick="mainMenu()">← Назад</button>
        <span class="pr-nav-title">👤 Профіль</span>
      </div>

      <!-- HERO -->
      <div class="pr-hero">
        <div class="pr-av-wrap" onclick="openAvatarModal()">
          <div class="pr-av-ring">
            <div id="pr-avatar-img">
              ${av && av.img
                ? '<img src="img/' + av.img + '" alt="' + (av.name || '') + '">'
                : '🌿'}
            </div>
          </div>
          <div class="pr-av-hint">Натисни щоб змінити</div>
        </div>

        <div>
          <div class="pr-name">${currentUser}</div>
          <div class="pr-badge">${title || "Без титулу"}</div>
          <div class="pr-stats">
            <div class="pr-stat">
              <div class="pr-stat-v">${balance}</div>
              <div class="pr-stat-l">нікусів</div>
            </div>
            <div class="pr-stat">
              <div class="pr-stat-v">${freshInv.length}</div>
              <div class="pr-stat-l">предметів</div>
            </div>
            <div class="pr-stat">
              <div class="pr-stat-v">${level}</div>
              <div class="pr-stat-l">рівень</div>
            </div>
            <div class="pr-stat">
              <div class="pr-stat-v">${dosvid}</div>
              <div class="pr-stat-l">досвід</div>
            </div>
            <div class="pr-stat">
              <div class="pr-stat-v">${avatars.length}</div>
              <div class="pr-stat-l">аватарок</div>
            </div>
          </div>
          <div class="pr-bio">${bio || "Біо не встановлено..."}</div>
        </div>
      </div>

      <!-- МОЇ МЕДАЛІ (відображення) -->
      <div class="pr-section">
        <div class="pr-section-title">🏅 Мої медалі</div>
        <div id="pr-medals-display"></div>
      </div>

      <!-- РЕДАГУВАННЯ -->
      <div class="pr-section">
        <div class="pr-section-title">⚙ Редагування профілю</div>
        <div class="pr-form-row">
          <div>
            <label class="pr-label">Титул</label>
            <select id="pr-title-sel">${titleOptions}</select>
          </div>
          <div>
            <label class="pr-label">Біографія</label>
            <textarea id="pr-bio-inp" placeholder="Напиши щось про себе...">${bio}</textarea>
          </div>
        </div>
        <button class="pr-save-btn" onclick="saveProfileData()">💾 Зберегти</button>
      </div>

      <!-- ВИБІР МЕДАЛЕЙ -->
      <div class="pr-section">
        <div class="pr-section-title">🏅 Обрати медалі для показу (до 3) — тільки з інвентарю</div>
        <div id="pr-medal-picker"></div>
      </div>

      <!-- АВАТАРКИ -->
      <div class="pr-section">
        <div class="pr-section-title">🎨 Мої аватарки</div>
        ${buildAvCards()}
      </div>
    </div>

    <!-- MODAL АВАТАРОК -->
    <div id="pr-av-modal" onclick="if(event.target===this) closeAvatarModal()">
      <div id="pr-av-modal-box">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h3>🎨 Вибрати аватарку</h3>
          <button class="pr-modal-close" onclick="closeAvatarModal()">✕</button>
        </div>
        ${buildAvCards()}
      </div>
    </div>

    <!-- TOAST -->
    <div id="pr-toast"></div>
  `;

  _renderMedalPicker();
  _renderMedalsDisplay();
}

// ==================== 🖼️ PNG PRELOADER ====================
// Додай цей файл до свого HTML: <script src="preloader.js"></script>
// ПЕРЕД script.js
// АБО вставь цей код на початок script.js (до кінця файлу)

const ALL_GAME_IMAGES = [
  // Items - Arcade
  "img/skeleton.png","img/man.png","img/arbitrajnik.png","img/takblin.png",
  "img/chomukit.png","img/kartofel.png","img/shotinakoiv.png","img/uslezah.png",
  // Items - Absolute / Mid-season
  "img/ela.png","img/didkazino.png","img/67.png","img/rabbit.png","img/cinema.png",
  "img/ptax1.png","img/ptax2.png","img/ptax3.png","img/ptax4.png",
  // Items - Halloween25
  "img/pepe.png","img/krutyi.png","img/sans.png","img/rozumna.png",
  "img/cucumber.png","img/masturbist.png","img/zhdun.png","img/troll.png",
  // Items - Harvest25
  "img/beaver.png","img/quadbeaver.png","img/venom.png","img/lalirala.png",
  // Items - FallAlternative25
  "img/superman.png","img/nugget.png","img/doge.png","img/rocketcat.png",
  "img/horrorcat.png","img/dragon.png","img/bullycat.png",
 // Garden - NN3 sprites (відсутні)
"img/D51.png","img/D52.png","img/D53.png","img/D54.png",
"img/D61.png","img/D62.png","img/D63.png","img/D64.png",

// NN3 case items
"img/j1.png","img/j2.png","img/j3.png","img/j4.png",

// Відсутні кейси
"img/case_NN3.png",
"img/case_flow.png",

"img/parts/mb_mfnp10.png","img/parts/mb_mfnp10p.png","img/parts/mb_mfnp11.png",
"img/parts/pic_1100f.png","img/parts/pic_1100p.png","img/parts/pic_1100w.png",
"img/parts/pic_1125f.png","img/parts/pic_1125p.png","img/parts/pic_1125w.png",
"img/parts/pic_1150f.png","img/parts/pic_1150p.png","img/parts/pic_1150w.png",
"img/parts/pic_1175f.png","img/parts/pic_1175p.png","img/parts/pic_1175w.png",
"img/parts/pic_1200f.png","img/parts/pic_1200p.png","img/parts/pic_1200w.png",
"img/parts/pic_1300f.png","img/parts/pic_1300p.png","img/parts/pic_1300w.png",
"img/parts/pic_1400f.png","img/parts/pic_1400p.png","img/parts/pic_1400w.png",
"img/parts/gpu_gcn1000.png","img/parts/gpu_gcn1060.png","img/parts/gpu_gcn1080.png",
"img/parts/gpu_gcn1090.png","img/parts/gpu_gcn1090s.png",
"img/parts/ram_1x1.png","img/parts/ram_2x1.png","img/parts/ram_1x2.png",
"img/parts/ram_2x2.png","img/parts/ram_1x4.png","img/parts/ram_2x4.png",
"img/parts/ssd_qna128.png","img/parts/ssd_qna256.png","img/parts/ssd_qna512.png",
"img/parts/hdd_na256.png","img/parts/hdd_na512.png","img/parts/hdd_na1024.png",
"img/parts/pagemet.png",

// Kolek3 items
"img/kolek31.png","img/kolek32.png","img/kolek33.png","img/kolek34.png",
"img/kolek35.png","img/kolek36.png","img/kolek37.png","img/kolek38.png", 
   // Items - Autumn25
  "img/red1.png","img/red2.png","img/red3.png",
  "img/purple1.png","img/purple2.png","img/blue1.png","img/blue2.png",
  "img/green1.png","img/green2.png",
  // Items - Winter25
  "img/V.png","img/H.png","img/K.png","img/KD.png","img/OKAK.png","img/B.png",
  "img/L.png","img/OBL.png","img/PR.png","img/PP.png","img/S.png","img/1487.png",
  // Items - Kolek1
  "img/lav.png","img/yog.png","img/jiv.png","img/pistol.png",
  "img/gdz.png","img/gpt.png","img/mi.png","img/ni.png",
  // Items - Kolek2
  "img/21.png","img/22.png","img/23.png","img/24.png","img/25.png",
  "img/26.png","img/27.png","img/dino.png",
  // Items - WinterDreams
  "img/51.png","img/52.png","img/53.png","img/54.png",
  "img/55.png","img/56.png","img/57.png","img/58.png",
  // Items - Насіння 1
  "img/G1.png","img/G2.png","img/G3.png","img/G4.png",
  // Items - Насіння 2
  "img/rihic2.png","img/kitk.png","img/kapabara1.png","img/kitu.png",
  // Items - CatCollection
  "img/kuki.png","img/panda.png","img/oia.png","img/Floppa.png",
  "img/X.png","img/MAX.png","img/OKAK2.png","img/ct.png",
  "img/ROGALO.png","img/AIKIT.png",
// Items - CatCollection
  "img/flow1.png","img/flow2.png","img/flow3.png","img/flow4.png",
  "img/flow5.png","img/flow6.png","img/flow7.png","img/flow8.png",
  "img/flow9.png","img/flow10.png",  
  // Items - DogCollection
  "img/rihik.png","img/patron.png","img/ben.png","img/kahok.png",
  "img/iu.png","img/sobaldo.png","img/mops.png","img/kepka.png",
  // Items - Весна26
  "img/epstein.png","img/halal.png","img/potuhno.png","img/sealcore.png",
  "img/duolingo.png","img/VIVII.png","img/110.png","img/5x30.png",
  "img/qwirt.png","img/drugpetuh.png",
  // Items - Kolek3
  "img/kolek31.png","img/kolek32.png","img/kolek33.png","img/kolek34.png",
  "img/kolek35.png","img/kolek36.png","img/kolek37.png","img/kolek38.png",
  // Avatars
  "img/avatar1.png","img/avatar2.png","img/avatar3.png","img/avatar4.png",
  "img/avatar5.png","img/avatar6.png","img/avatar7.png","img/avatar8.png",
  "img/avatar9.png","img/avatar10.png",
  // Medals
  "img/medaldiamont1.png","img/medalgold1.png","img/medalsilver1.png",
  "img/medalbronze1.png","img/medapro1.png","img/medaldefault.png", "img/medal_flower1.png","img/medal_flower2.png",
  // Cases
  "img/case_vesna26.png","img/case_vesna26box.png","img/case_vesna26gift.png",
  "img/case_kolek3.png","img/case_avatar1.png","img/case_absolute.png",
  "img/case_special.png","img/case_NN2.png","img/case_arcase.png",
  "img/case_dogcollection.png","img/case_wint25gift.png","img/case_catcollection.png",
  "img/case_kolek2.png","img/case_wint25.png","img/case_WDGASTER.png",
  "img/case_kolek1.png","img/case_NN.png","img/case_WDGASTERbox.png",
  "img/case_wint25box.png","img/case_autumn.png","img/case_box.png",
  "img/case_gift.png","img/case_fallalt.png","img/case_autumnus.png",
  "img/case_harvest.png","img/case_halloween.png","img/case_halloween_elite.png",
  "img/case_box_halloween.png","img/case_medal1.png","img/case_medal2.png",
  // Keys
  "img/key_arcase.png","img/Key1.png",
  // Garden sprites
  "img/D11.png","img/D12.png","img/D13.png","img/D14.png",
  "img/D21.png","img/D22.png","img/D23.png","img/D24.png",
  "img/D31.png","img/D32.png","img/D33.png","img/D34.png",
  "img/D41.png","img/D42.png","img/D43.png","img/D44.png",
  // UI elements
  "img/top-banner.png","img/daily-reward.png",
  "img/FallPass25Button.png","img/StarterPassButton.png",
  "img/Buy50Balance.png","img/Buy100Balance.png",
  "img/Buy250Balance.png","img/Buy500Balance.png",
  // Game assets
  "img/cactus.png",
  // Sale packs
  "img/sales/pack_arcade.png","img/sales/pack_sping.png","img/sales/pack_sping2.png",
  "img/sales/pack_sping3.png","img/sales/pack_flow.png","img/sales/pack_flowprem.png",
  "img/sales/pack_donate.png","img/sales/water.png","img/sales/bpf1.png", "img/sales/bpf2.png", "img/sales/bpf3.png", "img/sales/bpf4.png"
];

function showPreloader(onComplete) {
  const total = ALL_GAME_IMAGES.length;
  let loaded = 0;
  let failed = 0;

  // Inject preloader CSS
  const style = document.createElement("style");
  style.id = "pl-style";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&display=swap');

    #preloader-overlay {
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, #0a0a14 0%, #111120 50%, #0c160c 100%);
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Rajdhani', 'Segoe UI', sans-serif;
      overflow: hidden;
      user-select: none;
    }

    #preloader-overlay::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse at 30% 20%, rgba(80,180,60,.08) 0%, transparent 50%),
        radial-gradient(ellipse at 70% 80%, rgba(255,217,102,.06) 0%, transparent 50%);
      pointer-events: none;
    }

    /* Floating particles */
    .pl-particle {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      animation: plFloat linear infinite;
      opacity: 0;
    }
    @keyframes plFloat {
      0%   { transform: translateY(100vh) rotate(0deg);   opacity: 0; }
      10%  { opacity: .6; }
      90%  { opacity: .4; }
      100% { transform: translateY(-80px) rotate(720deg); opacity: 0; }
    }

    .pl-logo {
      font-size: 30px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #ffd966;
      text-shadow: 0 0 20px rgba(255,217,102,.7), 0 0 50px rgba(255,217,102,.25);
      margin-bottom: 4px;
      animation: plLogoPulse 2.5s ease-in-out infinite;
    }
    @keyframes plLogoPulse {
      0%,100% { text-shadow: 0 0 20px rgba(255,217,102,.7), 0 0 50px rgba(255,217,102,.25); }
      50%     { text-shadow: 0 0 35px rgba(255,217,102,1),  0 0 70px rgba(255,217,102,.45); }
    }

    .pl-subtitle {
      font-size: 12px;
      font-weight: 600;
      color: rgba(255,255,255,.3);
      letter-spacing: 5px;
      text-transform: uppercase;
      margin-bottom: 40px;
    }

    .pl-percent {
      font-size: 72px;
      font-weight: 700;
      color: #ffffff;
      line-height: 1;
      letter-spacing: -2px;
      margin-bottom: 16px;
      font-variant-numeric: tabular-nums;
      text-shadow: 0 0 40px rgba(165,214,60,.35);
      transition: color .3s;
    }

    .pl-bar-wrap {
      width: min(460px, 82vw);
      height: 10px;
      background: rgba(255,255,255,.06);
      border-radius: 100px;
      border: 1px solid rgba(255,255,255,.08);
      overflow: hidden;
      margin-bottom: 16px;
      box-shadow: 0 0 25px rgba(0,0,0,.6), inset 0 1px 3px rgba(0,0,0,.4);
    }

    .pl-bar-fill {
      height: 100%;
      border-radius: 100px;
      background: linear-gradient(90deg, #4caf50 0%, #8bc34a 40%, #fdd835 80%, #ffd966 100%);
      width: 0%;
      transition: width .22s cubic-bezier(.4,0,.2,1);
      position: relative;
      box-shadow: 0 0 18px rgba(139,195,74,.65);
    }
    .pl-bar-fill::after {
      content: '';
      position: absolute;
      right: 0; top: 0;
      width: 50px; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.55));
      border-radius: 100px;
    }

    .pl-count {
      font-size: 14px;
      font-weight: 600;
      color: rgba(255,255,255,.5);
      letter-spacing: .5px;
      margin-bottom: 8px;
    }
    .pl-count .pl-num {
      color: #a5d63c;
      font-size: 16px;
      font-weight: 700;
    }

    .pl-current-file {
      font-size: 10px;
      font-weight: 600;
      color: rgba(255,255,255,.22);
      letter-spacing: 1.5px;
      max-width: 380px;
      text-align: center;
      min-height: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-transform: uppercase;
      margin-bottom: 36px;
    }

    .pl-dots {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .pl-dot {
      width: 9px; height: 9px;
      border-radius: 50%;
      background: rgba(255,255,255,.14);
      animation: plDot 1.5s ease-in-out infinite;
    }
    .pl-dot:nth-child(1) { animation-delay: 0s; }
    .pl-dot:nth-child(2) { animation-delay: .22s; }
    .pl-dot:nth-child(3) { animation-delay: .44s; }
    @keyframes plDot {
      0%,80%,100% { background: rgba(255,255,255,.14); transform: scale(1); }
      40%          { background: #a5d63c; transform: scale(1.5); box-shadow: 0 0 10px rgba(165,214,60,.6); }
    }

    .pl-done-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(90deg, rgba(76,175,80,.2), rgba(139,195,74,.2));
      border: 1px solid rgba(139,195,74,.4);
      border-radius: 100px;
      padding: 8px 22px;
      animation: plFadeIn .4s cubic-bezier(.34,1.56,.64,1);
    }
    .pl-done-badge .pl-done-icon { font-size: 20px; }
    .pl-done-badge .pl-done-text {
      font-size: 16px;
      font-weight: 700;
      color: #a5d63c;
      letter-spacing: 2px;
      text-transform: uppercase;
      text-shadow: 0 0 15px rgba(165,214,60,.7);
    }

    @keyframes plFadeIn {
      from { opacity: 0; transform: scale(.7) translateY(8px); }
      to   { opacity: 1; transform: scale(1)  translateY(0); }
    }

    #preloader-overlay.pl-exit {
      animation: plExit .7s cubic-bezier(.4,0,.6,1) forwards;
    }
    @keyframes plExit {
      0%   { opacity: 1; transform: scale(1); }
      100% { opacity: 0; transform: scale(1.06); }
    }
  `;
  document.head.appendChild(style);

  // Overlay
  const overlay = document.createElement("div");
  overlay.id = "preloader-overlay";

  // Floating particles
  const particleColors = ["#4caf50","#a5d63c","#ffd966","#66bb6a","#8bc34a"];
  let particlesHTML = "";
  for (let i = 0; i < 18; i++) {
    const size = 3 + Math.random() * 6;
    const left = Math.random() * 100;
    const dur  = 8 + Math.random() * 12;
    const delay = Math.random() * 10;
    const color = particleColors[Math.floor(Math.random() * particleColors.length)];
    particlesHTML += `<div class="pl-particle" style="
      width:${size}px; height:${size}px;
      left:${left}vw;
      background:${color};
      animation-duration:${dur}s;
      animation-delay:${delay}s;
      box-shadow: 0 0 ${size*2}px ${color};
    "></div>`;
  }

  overlay.innerHTML = `
    ${particlesHTML}
    <div class="pl-logo">🎮 Нікус Кейс Ультра</div>
    <div class="pl-subtitle">Завантаження ресурсів</div>
    <div class="pl-percent" id="pl-pct">0%</div>
    <div class="pl-bar-wrap">
      <div class="pl-bar-fill" id="pl-bar"></div>
    </div>
    <div class="pl-count">
      Завантажено <span class="pl-num" id="pl-loaded">0</span>
      &nbsp;/&nbsp;
      <span class="pl-num" id="pl-total">${total}</span> файлів
    </div>
    <div class="pl-current-file" id="pl-file">Ініціалізація...</div>
    <div id="pl-bottom" class="pl-dots">
      <div class="pl-dot"></div>
      <div class="pl-dot"></div>
      <div class="pl-dot"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const barEl    = document.getElementById("pl-bar");
  const pctEl    = document.getElementById("pl-pct");
  const loadedEl = document.getElementById("pl-loaded");
  const fileEl   = document.getElementById("pl-file");
  const bottomEl = document.getElementById("pl-bottom");

  function updateProgress(src) {
    const done = loaded + failed;
    const pct  = Math.round((done / total) * 100);
    barEl.style.width    = pct + "%";
    pctEl.textContent    = pct + "%";
    loadedEl.textContent = done;
    // Show just filename
    const parts = src.split("/");
    fileEl.textContent  = parts[parts.length - 1];
  }

  function finish() {
    barEl.style.width    = "100%";
    pctEl.textContent    = "100%";
    loadedEl.textContent = total;
    fileEl.textContent   = "";
    pctEl.style.color    = "#a5d63c";

    bottomEl.innerHTML = `
      <div class="pl-done-badge">
        <span class="pl-done-icon">✓</span>
        <span class="pl-done-text">Готово! Запускаємо...</span>
      </div>
    `;

    setTimeout(() => {
      overlay.classList.add("pl-exit");
      setTimeout(() => {
        overlay.remove();
        document.getElementById("pl-style")?.remove();
        onComplete();
      }, 720);
    }, 600);
  }

  // Load all images in parallel
  ALL_GAME_IMAGES.forEach(src => {
    const img = new Image();
    const done = () => {
      loaded++;
      updateProgress(src);
      if (loaded + failed >= total) finish();
    };
    img.onload  = done;
    img.onerror = () => { failed++; done(); };
    img.src = src;
  });
}

// ╔══════════════════════════════════════════════════════════════════╗
// ║          МОДУЛЬ: КОМП'ЮТЕР ТА МАЙНІНГ — GEN 1                  ║
// ║          Префікс функцій: Price1488_*                           ║
// ╚══════════════════════════════════════════════════════════════════╝

// ═══ КОНСТАНТИ ════════════════════════════════════════════════════

const Price1488_MOTHERBOARDS = [
  { id: "MFNP_1_0",  name: "MFNP 1.0",  img: "img/parts/mb_mfnp10.png"  },
  { id: "MFNP_1_0P", name: "MFNP 1.0+", img: "img/parts/mb_mfnp10p.png" },
  { id: "MFNP_1_1",  name: "MFNP 1.1",  img: "img/parts/mb_mfnp11.png"  },
];

const Price1488_RAM_MODULES = [
  { id: "RAM_1x1NB",  name: "RAM 1×1 NB",  nb: 1, slots: 1, img: "img/parts/ram_1x1.png"  },
  { id: "RAM_2x1NB",  name: "RAM 2×1 NB",  nb: 2, slots: 2, img: "img/parts/ram_2x1.png"  },
  { id: "RAM_1x2NB",  name: "RAM 1×2 NB",  nb: 2, slots: 1, img: "img/parts/ram_1x2.png"  },
  { id: "RAM_2x2NB",  name: "RAM 2×2 NB",  nb: 4, slots: 2, img: "img/parts/ram_2x2.png"  },
  { id: "RAM_1x4NB",  name: "RAM 1×4 NB",  nb: 4, slots: 1, img: "img/parts/ram_1x4.png"  },
  { id: "RAM_2x4NB",  name: "RAM 2×4 NB",  nb: 8, slots: 2, img: "img/parts/ram_2x4.png"  },
];

const Price1488_GPU_LIST = [
  { id: "GCN1000",       name: "GCN 1000",       rate: 2.0, img: "img/parts/gpu_gcn1000.png"       },
  { id: "GCN1060",       name: "GCN 1060",       rate: 2.5, img: "img/parts/gpu_gcn1060.png"       },
  { id: "GCN1080",       name: "GCN 1080",       rate: 3.0, img: "img/parts/gpu_gcn1080.png"       },
  { id: "GCN1090",       name: "GCN 1090",       rate: 4.0, img: "img/parts/gpu_gcn1090.png"       },
  { id: "GCN1090SUPER",  name: "GCN 1090 SUPER", rate: 5.0, img: "img/parts/gpu_gcn1090s.png"      },
];

// Процесори: моделі × типи ресурсу
const Price1488_PIC_MODELS = [1100,1125,1150,1175,1200,1300,1400];
const Price1488_PIC_TYPES  = [
  { type: "F", label: "F", weeks: 1 },
  { type: "P", label: "P", weeks: 2 },
  { type: "W", label: "W", weeks: 4 },
];
// Потужність залежить від моделі (лінійно 1.00 → 4.00)
function Price1488_picPower(model) {
  const min = 1100, max = 1400;
  return +(1 + ((model - min) / (max - min)) * 3).toFixed(2);
}
const Price1488_PIC_LIST = [];
Price1488_PIC_MODELS.forEach(m => {
  Price1488_PIC_TYPES.forEach(t => {
    const id = `PIC_${m}${t.type}`;
    Price1488_PIC_LIST.push({
      id,
      name: `${m}${t.type}`,
      model: m,
      type: t.type,
      power: Price1488_picPower(m),
      weeks: t.weeks,
      img: `img/parts/pic_${m}${t.type.toLowerCase()}.png`,
    });
  });
});

const Price1488_SSD_LIST = [
  { id: "QNA128",  name: "QNA 128 NB",  capacity: 128,  fast: true,  img: "img/parts/ssd_qna128.png"  },
  { id: "QNA256",  name: "QNA 256 NB",  capacity: 256,  fast: true,  img: "img/parts/ssd_qna256.png"  },
  { id: "QNA512",  name: "QNA 512 NB",  capacity: 512,  fast: true,  img: "img/parts/ssd_qna512.png"  },
  { id: "NA256",   name: "NA 256 NB",   capacity: 256,  fast: false, img: "img/parts/hdd_na256.png"   },
  { id: "NA512",   name: "NA 512 NB",   capacity: 512,  fast: false, img: "img/parts/hdd_na512.png"   },
  { id: "NA1024",  name: "NA 1024 NB",  capacity: 1024, fast: false, img: "img/parts/hdd_na1024.png"  },
];

const Price1488_PAGEMET = {
  id: "PAGEMET", name: "Пейджмент", img: "img/parts/pagemet.png",
};

const Price1488_MB_COMPAT = {
  "MFNP_1_0": {
    ram:     ["RAM_1x1NB", "RAM_2x1NB", "RAM_1x2NB"],
    ssd:     ["QNA128"],
    hdd:     ["NA256", "NA512"],
    pic:     ["PIC_1100F","PIC_1100P","PIC_1100W",
              "PIC_1125F","PIC_1125P","PIC_1125W",
              "PIC_1150F","PIC_1150P","PIC_1150W"],
    gpu:     ["GCN1000","GCN1060"],
    pagemet: ["PAGEMET"],
  },
  "MFNP_1_0P": {
    ram:     ["RAM_1x1NB","RAM_2x1NB","RAM_1x2NB",
              "RAM_2x2NB","RAM_1x4NB"],
    ssd:     ["QNA128","QNA256"],
    hdd:     ["NA256","NA512"],
    pic:     ["PIC_1100F","PIC_1100P","PIC_1100W",
              "PIC_1125F","PIC_1125P","PIC_1125W",
              "PIC_1150F","PIC_1150P","PIC_1150W",
              "PIC_1175F","PIC_1175P","PIC_1175W",
              "PIC_1200F","PIC_1200P","PIC_1200W"],
    gpu:     ["GCN1000","GCN1060","GCN1080","GCN1090"],
    pagemet: ["PAGEMET"],
  },
  "MFNP_1_1": {
    ram:     ["RAM_1x1NB","RAM_2x1NB","RAM_1x2NB",
              "RAM_2x2NB","RAM_1x4NB","RAM_2x4NB"],
    ssd:     ["QNA128","QNA256","QNA512"],
    hdd:     ["NA256","NA512","NA1024"],
    pic:     ["PIC_1100F","PIC_1100P","PIC_1100W",
              "PIC_1125F","PIC_1125P","PIC_1125W",
              "PIC_1150F","PIC_1150P","PIC_1150W",
              "PIC_1175F","PIC_1175P","PIC_1175W",
              "PIC_1200F","PIC_1200P","PIC_1200W",
              "PIC_1300F","PIC_1300P","PIC_1300W",
              "PIC_1400F","PIC_1400P","PIC_1400W"],
    gpu:     ["GCN1000","GCN1060","GCN1080","GCN1090","GCN1090SUPER"],
    pagemet: ["PAGEMET"],
  },
};

function Price1488_getCompatible(slot) {
  const mbId = Price1488_state.mb;
  if (!mbId) return [];
  const compat = Price1488_MB_COMPAT[mbId];
  if (!compat) return [];
  // storage = ssd + hdd разом
  if (slot === "storage") return [...(compat.ssd || []), ...(compat.hdd || [])];
  return compat[slot] || [];
}

function Price1488_isCompatible(slot, id) {
  if (slot === "mb") return true; // плата завжди сумісна сама з собою
  return Price1488_getCompatible(slot).includes(id);
}

// Шанс поломки Fast SSD за тік (можна тюнити)
const Price1488_SSD_BREAK_CHANCE = 0.0005;

// Інтервал майнінгу в мс (1 хв реального часу = 1/60 год)
const Price1488_MINE_INTERVAL_MS = 60000;

// ═══ СТАН МОДУЛЯ ══════════════════════════════════════════════════

// Структура за замовчуванням
function Price1488_defaultState() {
  return {
    mb:       null,   // id материнської плати
    pic:      null,   // id процесора
    gpu:      null,   // id відеокарти
    ram:      null,   // id модуля RAM
    storage:  null,   // id накопичувача
    pagemet:  false,  // встановлено пейджмент

    picStartTime:   null,   // timestamp встановлення процесора
    storageUsed:    0,      // накопичено нікусів у SSD
    storagePending: 0,      // для Normal SSD: очікують 1 годину
    pendingTime:    null,   // коли почалося накопичення pending
    ssdBroken:      false,  // Fast SSD зламався
    mining:         false,  // чи йде майнінг
    lastTickTime:   null,   // час останнього тіку майнінгу
  };
}

let Price1488_state = Price1488_loadState();
let Price1488_mineTimer = null;
let Price1488_activeTab = "gen"; // gen | mypc | games

// ═══ ЗБЕРЕЖЕННЯ / ЗАВАНТАЖЕННЯ ════════════════════════════════════

function Price1488_loadState() {
  try {
    const raw = localStorage.getItem("Price1488_compState");
    if (raw) return Object.assign(Price1488_defaultState(), JSON.parse(raw));
  } catch(e) {}
  return Price1488_defaultState();
}

function Price1488_saveState() {
  localStorage.setItem("Price1488_compState", JSON.stringify(Price1488_state));
}

function Price1488_savePicWear(picId, remainingMs) {
  const key = (currentUser || "guest") + "_picWear";
  let wear = {};
  try { wear = JSON.parse(localStorage.getItem(key) || "{}"); } catch {}
  wear[picId] = remainingMs;
  localStorage.setItem(key, JSON.stringify(wear));
}

function Price1488_loadPicWear(picId) {
  const key = (currentUser || "guest") + "_picWear";
  try {
    const wear = JSON.parse(localStorage.getItem(key) || "{}");
    return wear[picId] !== undefined ? wear[picId] : null;
  } catch { return null; }
}

function Price1488_clearPicWear(picId) {
  const key = (currentUser || "guest") + "_picWear";
  let wear = {};
  try { wear = JSON.parse(localStorage.getItem(key) || "{}"); } catch {}
  delete wear[picId];
  localStorage.setItem(key, JSON.stringify(wear));
}

// ═══ ДОПОМІЖНІ ФУНКЦІЇ ════════════════════════════════════════════

function Price1488_getPic()     { return Price1488_PIC_LIST.find(p => p.id === Price1488_state.pic)     || null; }
function Price1488_getGpu()     { return Price1488_GPU_LIST.find(g => g.id === Price1488_state.gpu)     || null; }
function Price1488_getRam()     { return Price1488_RAM_MODULES.find(r => r.id === Price1488_state.ram)  || null; }
function Price1488_getStorage() { return Price1488_SSD_LIST.find(s => s.id === Price1488_state.storage) || null; }
function Price1488_getMb()      { return Price1488_MOTHERBOARDS.find(m => m.id === Price1488_state.mb)  || null; }

function Price1488_calcGeneration() {
  const ram = Price1488_getRam();
  const gpu = Price1488_getGpu();
  const nb  = ram ? ram.nb : 0;
  const gr  = gpu ? gpu.rate : 0;
  return nb + gr;
}

function Price1488_calcLimit() {
  const pic = Price1488_getPic();
  if (!pic) return 0;
  return +(3.5 * pic.power).toFixed(3);
}

function Price1488_calcIncome() {
  return Math.min(Price1488_calcGeneration(), Price1488_calcLimit());
}

// Час ресурсу PIC у мс
function Price1488_picTotalMs(pic) {
  return pic.weeks * 7 * 24 * 60 * 60 * 1000;
}

function Price1488_picRemainingMs() {
  const pic   = Price1488_getPic();
  const start = Price1488_state.picStartTime;
  if (!pic || !start) return 0;
  const elapsed = Date.now() - start;
  return Math.max(0, Price1488_picTotalMs(pic) - elapsed);
}

function Price1488_formatDuration(ms) {
  if (ms <= 0) return "вичерпано";
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600)  / 60);
  if (d > 0) return `${d}д ${h}г`;
  if (h > 0) return `${h}г ${m}хв`;
  return `${m}хв`;
}

// Перевірка: чи предмет є в інвентарі гравця
function Price1488_hasItem(name) {
  if (typeof inventory === "undefined") return false;
  // inventory — масив об'єктів { name, ... } або рядків
  return inventory.some(item =>
    (typeof item === "string" ? item : item.name) === name
  );
}

function Price1488_removeItem(name) {
  if (typeof inventory === "undefined") return;
  const idx = inventory.findIndex(item =>
    (typeof item === "string" ? item : item.name) === name
  );
  if (idx !== -1) inventory.splice(idx, 1);
  if (typeof saveData === "function") saveData();
}

function Price1488_addItem(name) {
  if (typeof inventory === "undefined") return;
  const part = [
    ...Price1488_MOTHERBOARDS,
    ...Price1488_PIC_LIST,
    ...Price1488_GPU_LIST,
    ...Price1488_RAM_MODULES,
    ...Price1488_SSD_LIST,
    Price1488_PAGEMET,
  ].find(x => x.name === name);

  inventory.push({
    id: crypto.randomUUID(),
    type: "item",
    name: name,
    img: part ? part.img.replace("img/", "") : "",
    rarity: "Спеціальна",
    quality: null,
    premium: false,
    fromCase: "parts_shop",
    createdAt: Date.now(),
  });
  if (typeof saveData === "function") saveData();
}

// ═══ ВСТАНОВЛЕННЯ / ЗНЯТТЯ КОМПЛЕКТУЮЧИХ ═════════════════════════

function Price1488_installPart(slot, id, itemName) {
  if (!Price1488_hasItem(itemName)) {
    Price1488_toast(`❌ У інвентарі немає предмета «${itemName}»`);
    return false;
  }
  if (slot !== "mb" && !Price1488_state.mb) {
    Price1488_toast("❌ Спочатку встанови материнську плату!");
    return false;
  }
  if (!Price1488_isCompatible(slot, id)) {
    Price1488_toast(`❌ Цей компонент не сумісний з ${Price1488_getMb()?.name || "цією платою"}!`);
    return false;
  }

  // Якщо вже щось є — знімаємо
  if (Price1488_state[slot]) Price1488_uninstallPart(slot);
  Price1488_removeItem(itemName);
  Price1488_state[slot] = id;
  if (slot === "pic") {
    const savedWear = Price1488_loadPicWear(id);
    if (savedWear !== null && savedWear > 0) {
      // Відновлюємо: startTime = зараз мінус вже витрачений час
      const pic = Price1488_PIC_LIST.find(p => p.id === id);
      const totalMs = pic ? Price1488_picTotalMs(pic) : 0;
      Price1488_state.picStartTime = Date.now() - (totalMs - savedWear);
      Price1488_toast(`⚠️ Процесор зношений — залишок: ${Price1488_formatDuration(savedWear)}`);
    } else {
      Price1488_state.picStartTime = Date.now();
    }
  }
  Price1488_saveState();
  return true;
}

function Price1488_uninstallPart(slot) {
  const id = Price1488_state[slot];
  if (!id) return;
  // Знайти назву предмета
  let name = id;
  const all = [
    ...Price1488_MOTHERBOARDS.map(x => ({id: x.id, name: x.name})),
    ...Price1488_RAM_MODULES.map(x  => ({id: x.id, name: x.name})),
    ...Price1488_GPU_LIST.map(x     => ({id: x.id, name: x.name})),
    ...Price1488_PIC_LIST.map(x     => ({id: x.id, name: x.name})),
    ...Price1488_SSD_LIST.map(x     => ({id: x.id, name: x.name})),
    {id: Price1488_PAGEMET.id, name: Price1488_PAGEMET.name},
  ];
  const found = all.find(x => x.id === id);
  if (found) name = found.name;

  // Зупинити майнінг якщо потрібно

  Price1488_stopMining(false);

  if (slot === "pic") {
    // Зберігаємо залишок ресурсу перед зняттям
    const remainingMs = Price1488_picRemainingMs();
    Price1488_savePicWear(id, remainingMs);
    Price1488_state.picStartTime = null;
    Price1488_state.ssdBroken = false;
  }

  Price1488_addItem(name);

   Price1488_state[slot] = null;
  Price1488_saveState();
  if (Price1488_activeTab === "mypc") Price1488_renderMyPC();
}

// ═══ ЛОГІКА МАЙНІНГУ ══════════════════════════════════════════════

function Price1488_checkMineConditions() {
  const s = Price1488_state;
  if (!s.mb)                             return "❌ Немає материнської плати";
  if (!s.pagemet)                        return "❌ Немає пейджменту";
  if (!s.pic)                            return "❌ Немає процесора";
  if (!s.gpu)                            return "❌ Немає відеокарти";
  if (!s.ram)                            return "❌ Немає RAM";
  if (!s.storage)                        return "❌ Немає накопичувача";
  if (Price1488_picRemainingMs() <= 0)   return "❌ Ресурс процесора вичерпано";
  const stor = Price1488_getStorage();
  if (s.storageUsed >= stor.capacity)    return "❌ Накопичувач переповнений";
  if (s.ssdBroken)                       return "❌ Fast SSD зламався";
  return null;
}

function Price1488_startMining() {
  const err = Price1488_checkMineConditions();
  if (err) { Price1488_toast(err); return; }
  Price1488_state.mining = true;
  Price1488_state.lastTickTime = Date.now();
  Price1488_saveState();
  Price1488_scheduleTick();
  Price1488_renderGen();
  Price1488_toast("⛏ Майнінг розпочато!");
}

function Price1488_stopMining(notify = true) {
  Price1488_state.mining = false;
  Price1488_saveState();
  if (Price1488_mineTimer) { clearTimeout(Price1488_mineTimer); Price1488_mineTimer = null; }
  if (notify) { Price1488_renderGen(); Price1488_toast("⏹ Майнінг зупинено"); }
}

              // ↓ ВСТАВИТИ ПІСЛЯ Price1488_stopMining()

function Price1488_cashOut() {
  const amount = Math.floor(Price1488_state.storageUsed * 100) / 100;
  if (amount <= 0) return;
  nikus = (nikus || 0) + amount;
  localStorage.setItem(currentUser + "_nikus", nikus);
  // Залишаємо дробовий залишок (менше 0.01) на накопичувачі
  Price1488_state.storageUsed = +(Price1488_state.storageUsed - amount).toFixed(4);
  Price1488_saveState();
  if (typeof saveData === "function") saveData();
  Price1488_toast(`✅ Обналічено ${amount.toFixed(2)} нікусів!`);
  Price1488_renderGen();
}

function Price1488_scheduleTick() {
  if (Price1488_mineTimer) clearTimeout(Price1488_mineTimer);
  Price1488_mineTimer = setTimeout(Price1488_doMineTick, Price1488_MINE_INTERVAL_MS);
}

function Price1488_doMineTick() {
  if (!Price1488_state.mining) return;

  // Перевірка умов
  const err = Price1488_checkMineConditions();
  if (err) {
         Price1488_state.mining = false;
    if (Price1488_state.pic && err.includes("процесора")) {
      Price1488_clearPicWear(Price1488_state.pic);
      // Видаляємо зламаний процесор — не повертаємо в інвентар
      Price1488_state.pic = null;
      Price1488_state.picStartTime = null;
      Price1488_saveState();
      Price1488_renderGen();
      Price1488_toast("💀 Процесор згорів і був знищений!");
      alert("💀 Ваш процесор вичерпав ресурс і згорів!\nВін був видалений. Придбайте новий у магазині ПК.");
      return;
    }
    Price1488_saveState();
    Price1488_renderGen();
    Price1488_toast(err + " — майнінг зупинено");
    return;
  }

  const stor    = Price1488_getStorage();
  const income  = Price1488_calcIncome() / 60; // дохід за 1 хвилину (NICUS/год → /60)
  const space   = stor.capacity - Price1488_state.storageUsed;
  const actual  = Math.min(income, space);

  if (stor.fast) {
    // Fast SSD: миттєво, з шансом поломки
Price1488_state.storageUsed += actual;
    // Шанс поломки
    if (Math.random() < Price1488_SSD_BREAK_CHANCE) {
      Price1488_state.ssdBroken = true;
      Price1488_state.mining    = false;
      Price1488_saveState();
      Price1488_renderGen();
      Price1488_toast("💥 Fast SSD зламався! Майнінг зупинено.");
      return;
    }
  } else {
    // Normal SSD: відкладаємо на 1 годину
   Price1488_state.storageUsed    += Price1488_state.storagePending;
      Price1488_state.storagePending  = 0;

    // Перевіряємо чи минула година для pending
    if (Price1488_state.pendingTime && Date.now() - Price1488_state.pendingTime >= 3600000) {
      Price1488_state.storageUsed    += Price1488_state.storagePending;
      if (typeof addBalance === "function") addBalance(Price1488_state.storagePending);
      Price1488_state.storagePending  = 0;
      Price1488_state.pendingTime     = null;
    }
  }

  Price1488_state.lastTickTime = Date.now();
  Price1488_saveState();
  Price1488_renderGen();
  Price1488_scheduleTick();
}

// ═══ ВІДНОВЛЕННЯ МАЙНІНГУ ПІСЛЯ ПЕРЕЗАВАНТАЖЕННЯ ════════════════

function Price1488_resumeMining() {
  if (!Price1488_state.mining) return;
  const err = Price1488_checkMineConditions();
  if (err) { Price1488_state.mining = false; Price1488_saveState(); return; }

  // Офлайн-тіки (кожні 60с)
  const now   = Date.now();
  const last  = Price1488_state.lastTickTime || now;
  const ticks = Math.floor((now - last) / Price1488_MINE_INTERVAL_MS);

  for (let i = 0; i < ticks; i++) {
    const err2 = Price1488_checkMineConditions();
    if (err2) { Price1488_state.mining = false; break; }
    const stor   = Price1488_getStorage();
    const income = Price1488_calcIncome() / 60;
    const space  = stor.capacity - Price1488_state.storageUsed;
    const actual = Math.min(income, space);
       if (stor.fast) {
      Price1488_state.storageUsed += actual;
      if (Math.random() < Price1488_SSD_BREAK_CHANCE) {
        Price1488_state.ssdBroken = true;
        Price1488_state.mining    = false;
        break;
      }
    } else {
      Price1488_state.storagePending += actual;
      if (!Price1488_state.pendingTime) Price1488_state.pendingTime = Date.now();
    }
  }
  Price1488_state.lastTickTime = now;
  Price1488_saveState();
  if (Price1488_state.mining) Price1488_scheduleTick();
}

// ═══ ТОСТ-ПОВІДОМЛЕННЯ ════════════════════════════════════════════

function Price1488_toast(msg) {
  let el = document.getElementById("p1488-toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "p1488-toast";
    el.style.cssText = `
      position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);
      background:rgba(15,15,25,0.97);color:#fff;padding:12px 24px;border-radius:40px;
      font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;
      box-shadow:0 8px 32px rgba(0,0,0,0.7),0 0 0 1px rgba(0,255,153,0.15);
      z-index:9999;pointer-events:none;opacity:0;
      transition:all 0.35s cubic-bezier(.34,1.56,.64,1);white-space:nowrap;
    `;
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = "1";
  el.style.transform = "translateX(-50%) translateY(0)";
  clearTimeout(el._t);
  el._t = setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateX(-50%) translateY(20px)";
  }, 3000);
}

// ═══ РЕНДЕР ГОЛОВНОГО ВІКНА ═══════════════════════════════════════

function Price1488_openComputer() {
  Price1488_resumeMining();
  Price1488_activeTab = "gen";

  const app = document.getElementById("app");
  app.innerHTML = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
      #p1488-wrap {
        font-family:'Share Tech Mono',monospace;
        min-height:100vh;
        background: radial-gradient(ellipse at 20% 0%,#0a1628 0%,#050b14 55%,#020408 100%);
        color:#c8e6ff;
        padding:0 0 80px 0;
        box-sizing:border-box;
        max-width:560px;
        margin:0 auto;
        position:relative;
        overflow-x:hidden;
      }
      /* Scanline overlay */
      #p1488-wrap::before {
        content:'';position:fixed;top:0;left:0;right:0;bottom:0;
        background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,153,0.012) 2px,rgba(0,255,153,0.012) 4px);
        pointer-events:none;z-index:0;
      }
      .p1488-header {
        padding:20px 20px 0;
        display:flex;align-items:center;justify-content:space-between;
        position:relative;z-index:1;
      }
      .p1488-logo {
        font-family:'Orbitron',sans-serif;
        font-size:20px;font-weight:900;letter-spacing:4px;
        background:linear-gradient(135deg,#00ff99,#00cfff);
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;
      }
      .p1488-back {
        background:none;border:1px solid rgba(0,255,153,0.2);
        color:rgba(0,255,153,0.5);border-radius:8px;padding:7px 14px;
        font-family:'Share Tech Mono',monospace;font-size:12px;
        cursor:pointer;transition:.2s;
      }
      .p1488-back:hover { color:#00ff99;border-color:#00ff99;box-shadow:0 0 12px rgba(0,255,153,0.2); }
      .p1488-tabs {
        display:flex;margin:16px 20px 0;
        background:rgba(0,255,153,0.04);
        border:1px solid rgba(0,255,153,0.1);
        border-radius:12px;overflow:hidden;
        position:relative;z-index:1;
      }
      .p1488-tab {
        flex:1;padding:12px 4px;text-align:center;cursor:pointer;
        font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;
        letter-spacing:1.5px;color:rgba(200,230,255,0.35);
        border:none;background:none;
        transition:all .25s;text-transform:uppercase;
      }
      .p1488-tab.active {
        color:#00ff99;background:rgba(0,255,153,0.08);
        box-shadow:inset 0 -2px 0 #00ff99;
      }
      .p1488-tab:hover:not(.active) { color:rgba(200,230,255,0.65); }
      .p1488-content { padding:16px 20px;position:relative;z-index:1; }
    </style>
    <div id="p1488-wrap">
      <div class="p1488-header">
        <div class="p1488-logo">⬡ NICUS PC</div>
        <button class="p1488-back" onclick="mainMenu()">← Вихід</button>
      </div>
      <div class="p1488-tabs">
        <button class="p1488-tab active" id="p1488-tab-gen"   onclick="Price1488_switchTab('gen')">⛏ Генерація</button>
        <button class="p1488-tab"        id="p1488-tab-mypc"  onclick="Price1488_switchTab('mypc')">🖥 Мій ПК</button>
        <button class="p1488-tab"        id="p1488-tab-games" onclick="Price1488_switchTab('games')">🎮 Ігри</button>
      </div>
      <div class="p1488-content" id="p1488-content"></div>
    </div>`;

  Price1488_renderGen();
}

function Price1488_switchTab(tab) {
  Price1488_activeTab = tab;
  ["gen","mypc","games"].forEach(t => {
    document.getElementById(`p1488-tab-${t}`).classList.toggle("active", t === tab);
  });
  if      (tab === "gen")   Price1488_renderGen();
  else if (tab === "mypc")  Price1488_renderMyPC();
   else if (tab === "games") {
    if (!Price1488_state.pic) {
      Price1488_toast("❌ Немає процесора — ігри недоступні!");
      return;
    }
    if (Price1488_picRemainingMs() <= 0) {
      Price1488_toast("❌ Процесор згорів — ігри недоступні!");
      return;
    }
    arcadeMenu();
  }

}

// ═══ ВКЛАДКА ГЕНЕРАЦІЯ ════════════════════════════════════════════

function Price1488_renderGen() {
  const s    = Price1488_state;
  const pic  = Price1488_getPic();
  const stor = Price1488_getStorage();
  const gen  = Price1488_calcGeneration();
  const lim  = Price1488_calcLimit();
  const inc  = Price1488_calcIncome();

  const picRemMs  = Price1488_picRemainingMs();
  const picTotal  = pic ? Price1488_picTotalMs(pic) : 1;
  const picPct    = pic ? Math.max(0, Math.min(100, (picRemMs / picTotal) * 100)) : 0;

  const storPct   = stor ? Math.min(100, (s.storageUsed / stor.capacity) * 100) : 0;

  const err       = Price1488_checkMineConditions();
  const canMine   = !err;

  const mineBtn   = s.mining
    ? `<button onclick="Price1488_stopMining(true)" class="p1488-mine-btn stop">⏹ ЗУПИНИТИ МАЙНІНГ</button>`
    : `<button onclick="Price1488_startMining()" class="p1488-mine-btn ${canMine?'start':'start disabled'}" ${canMine?'':'disabled'}>${canMine?'⛏ ЗАПУСТИТИ МАЙНІНГ':'⛏ ЗАПУСТИТИ МАЙНІНГ'}</button>`;

  const statusBlock = err
    ? `<div class="p1488-warn">${err}</div>`
    : s.mining
      ? `<div class="p1488-ok">🟢 Майнінг активний</div>`
      : `<div class="p1488-idle">⏸ Готовий до запуску</div>`;

  const el = document.getElementById("p1488-content");
  el.innerHTML = `
    <style>
      .p1488-card {
        background:linear-gradient(135deg,rgba(0,255,153,0.04),rgba(0,207,255,0.03));
        border:1px solid rgba(0,255,153,0.12);
        border-radius:14px;padding:16px;margin-bottom:12px;
      }
      .p1488-row {
        display:flex;justify-content:space-between;align-items:center;
        margin-bottom:8px;font-size:13px;
      }
      .p1488-label { color:rgba(200,230,255,0.45);letter-spacing:1px;font-size:11px; }
      .p1488-val   { color:#00ff99;font-family:'Orbitron',sans-serif;font-weight:700;font-size:14px; }
      .p1488-val.dim { color:rgba(200,230,255,0.6); }
      .p1488-bar-bg {
        height:6px;background:rgba(255,255,255,0.06);border-radius:99px;overflow:hidden;margin-top:4px;
      }
      .p1488-bar-fill {
        height:100%;border-radius:99px;
        background:linear-gradient(90deg,#00ff99,#00cfff);
        transition:width .6s ease;
      }
      .p1488-bar-fill.danger { background:linear-gradient(90deg,#ff4466,#ff9900); }
      .p1488-mine-btn {
        width:100%;padding:16px;border:none;border-radius:12px;
        font-family:'Orbitron',sans-serif;font-size:14px;font-weight:900;
        letter-spacing:2px;cursor:pointer;transition:all .25s;margin-top:4px;
      }
      .p1488-mine-btn.start {
        background:linear-gradient(135deg,#00ff99,#00cfff);color:#000;
        box-shadow:0 8px 24px rgba(0,255,153,0.3);
      }
      .p1488-mine-btn.start:hover { transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,255,153,0.45); }
      .p1488-mine-btn.start.disabled { opacity:0.35;cursor:not-allowed;transform:none; }
      .p1488-mine-btn.stop {
        background:linear-gradient(135deg,#ff4466,#ff9900);color:#fff;
        box-shadow:0 8px 24px rgba(255,68,102,0.3);
      }
      .p1488-mine-btn.stop:hover { transform:translateY(-2px); }
      .p1488-warn  { background:rgba(255,68,102,0.08);border:1px solid rgba(255,68,102,0.25);border-radius:10px;padding:10px 14px;font-size:12px;color:#ff8899;margin-bottom:12px; }
      .p1488-ok    { background:rgba(0,255,153,0.07);border:1px solid rgba(0,255,153,0.2);border-radius:10px;padding:10px 14px;font-size:12px;color:#00ff99;margin-bottom:12px; }
      .p1488-idle  { background:rgba(200,230,255,0.04);border:1px solid rgba(200,230,255,0.1);border-radius:10px;padding:10px 14px;font-size:12px;color:rgba(200,230,255,0.4);margin-bottom:12px; }
      .p1488-sec-title { font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;color:rgba(0,255,153,0.5);letter-spacing:3px;text-transform:uppercase;margin-bottom:10px; }
    </style>

    ${statusBlock}

    <!-- ДОХОДИ -->
    <div class="p1488-card">
      <div class="p1488-sec-title">📊 Продуктивність</div>
      <div class="p1488-row">
        <span class="p1488-label">RAM + GPU (генерація)</span>
        <span class="p1488-val">${gen.toFixed(2)} NICUS/год</span>
      </div>
      <div class="p1488-row">
        <span class="p1488-label">Ліміт PIC</span>
        <span class="p1488-val dim">${lim.toFixed(2)} NICUS/год</span>
      </div>
      <div style="height:1px;background:rgba(255,255,255,0.05);margin:10px 0;"></div>
      <div class="p1488-row" style="margin-bottom:0;">
        <span class="p1488-label">Фінальний дохід</span>
        <span class="p1488-val" style="font-size:18px;">${inc.toFixed(2)} <span style="font-size:11px;color:rgba(0,255,153,0.55)">NICUS/год</span></span>
      </div>
    </div>

    <!-- ПРОЦЕСОР -->
    <div class="p1488-card">
      <div class="p1488-sec-title">🔲 Процесор</div>
      <div class="p1488-row">
        <span class="p1488-label">${pic ? pic.name : '— не встановлено —'}</span>
        <span class="p1488-val dim">${pic ? `⚡ ${pic.power.toFixed(2)}` : ''}</span>
      </div>
      ${pic ? `
        <div style="display:flex;justify-content:space-between;font-size:11px;color:rgba(200,230,255,0.35);margin-bottom:4px;">
          <span>Залишок ресурсу</span>
          <span style="color:${picPct < 15 ? '#ff4466' : '#00ff99'}">${Price1488_formatDuration(picRemMs)}</span>
        </div>
        <div class="p1488-bar-bg">
          <div class="p1488-bar-fill ${picPct < 15 ? 'danger' : ''}" style="width:${picPct.toFixed(1)}%"></div>
        </div>` : ''}
    </div>

    <!-- НАКОПИЧУВАЧ -->
    <div class="p1488-card">
      <div class="p1488-sec-title">💾 Накопичувач</div>
      ${stor ? `
        <div class="p1488-row">
          <span class="p1488-label">${stor.name}</span>
          <span class="p1488-val dim">${stor.fast ? '⚡ Fast SSD' : '🔒 Normal SSD'}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:11px;color:rgba(200,230,255,0.35);margin-bottom:4px;">
          <span>Заповнення</span>
          <span style="color:${storPct > 85 ? '#ff4466' : '#00cfff'}">${s.storageUsed.toFixed(1)} / ${stor.capacity} NB</span>
        </div>
        <div class="p1488-bar-bg">
          <div class="p1488-bar-fill ${storPct > 85 ? 'danger' : ''}" style="width:${storPct.toFixed(1)}%;background:linear-gradient(90deg,#00cfff,#00ff99);"></div>
        </div>
        ${!stor.fast && s.storagePending > 0 ? `<div style="margin-top:8px;font-size:11px;color:rgba(255,200,80,0.7);">⏳ В очікуванні: ${s.storagePending.toFixed(2)} NB (через 1 год)</div>` : ''}
        ${s.ssdBroken ? '<div style="margin-top:8px;font-size:12px;color:#ff4466;font-weight:700;">💥 SSD зламано! Замініть накопичувач.</div>' : ''}
      ` : '<div style="color:rgba(200,230,255,0.3);font-size:13px;">— не встановлено —</div>'}
    </div>
    ${mineBtn}
 ${stor && s.storageUsed > 0 ? `
    <button onclick="Price1488_cashOut()" style="
      width:100%;padding:14px;border:none;border-radius:12px;margin-top:8px;
      background:linear-gradient(135deg,#ffd966,#f0a020);color:#000;
      font-family:'Orbitron',sans-serif;font-size:13px;font-weight:900;
      letter-spacing:2px;cursor:pointer;
    ">💰 ОБНАЛІЧИТИ ${s.storageUsed.toFixed(2)} NICUS → НІКУСИ</button>
  ` : ''}
  `;   // ← ОЦЕ ЗАКРИВАЄ el.innerHTML = `...`
} 

// ═══ ВКЛАДКА МІЙ ПК ══════════════════════════════════════════════

function Price1488_renderMyPC() {
  const s    = Price1488_state;
  const mb   = Price1488_getMb();
  const pic  = Price1488_getPic();
  const gpu  = Price1488_getGpu();
  const ram  = Price1488_getRam();
  const stor = Price1488_getStorage();

  function Price1488_partCard(icon, label, part, slot, allList) {
    const img = part ? `<img src="${part.img}" onerror="this.style.display='none'" style="width:52px;height:52px;object-fit:contain;border-radius:8px;background:rgba(0,0,0,0.3);padding:4px;" />` : `<div style="width:52px;height:52px;border-radius:8px;border:1px dashed rgba(0,255,153,0.15);display:flex;align-items:center;justify-content:center;font-size:22px;color:rgba(200,230,255,0.15);">${icon}</div>`;

    const installDropdown = !part ? `
      <select onchange="Price1488_handleInstall('${slot}', this.value)" style="
        font-family:'Share Tech Mono',monospace;font-size:11px;
        background:rgba(0,255,153,0.05);border:1px solid rgba(0,255,153,0.2);
        color:#00ff99;border-radius:6px;padding:4px 6px;cursor:pointer;margin-top:4px;
      ">
        <option value="">— встановити —</option>
        ${allList.map(x => {
          const compat = Price1488_isCompatible(slot, x.id);
          return `<option value="${x.id}" ${compat ? '' : 'disabled style="color:#555"'}>${x.name}${compat ? '' : ' ✗'}</option>`;
        }).join('')}
      </select>` : '';

    const removeBtn = part ? `
      <button onclick="Price1488_uninstallPart('${slot}')" style="
        margin-top:4px;background:rgba(255,68,102,0.1);border:1px solid rgba(255,68,102,0.2);
        color:#ff8899;border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer;
        font-family:'Share Tech Mono',monospace;transition:.2s;
      " onmouseover="this.style.background='rgba(255,68,102,0.2)'" onmouseout="this.style.background='rgba(255,68,102,0.1)'">
        ✕ Зняти
      </button>` : '';

    let detail = '';
    if (part) {
      if (slot === 'gpu')     detail = `<span class="p1488-label">${gpu.rate} NICUS/год</span>`;
      if (slot === 'ram')     detail = `<span class="p1488-label">${ram.nb} NB · ${ram.slots} слот(и)</span>`;
      if (slot === 'pic')     detail = `<span class="p1488-label">Потужн. ${pic.power} · ${Price1488_formatDuration(Price1488_picRemainingMs())}</span>`;
      if (slot === 'storage') detail = `<span class="p1488-label">${stor.capacity} NB · ${stor.fast ? 'Fast' : 'Normal'}</span>`;
    }

    return `
      <div style="
        background:linear-gradient(135deg,rgba(0,255,153,0.03),rgba(0,207,255,0.02));
        border:1px solid rgba(0,255,153,0.1);border-radius:14px;
        padding:14px;margin-bottom:10px;
        display:flex;align-items:center;gap:14px;
      ">
        ${img}
        <div style="flex:1;min-width:0;">
          <div style="font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;color:rgba(0,255,153,0.4);letter-spacing:2px;text-transform:uppercase;margin-bottom:3px;">${label}</div>
          <div style="font-size:14px;font-weight:700;color:${part ? '#c8e6ff' : 'rgba(200,230,255,0.2)'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            ${part ? part.name : '— слот порожній —'}
          </div>
          ${detail}
          ${installDropdown}
          ${removeBtn}
        </div>
      </div>`;
  }

  // Pagemet окремо
  const pagemetCard = `
    <div style="
      background:linear-gradient(135deg,rgba(0,255,153,0.03),rgba(0,207,255,0.02));
      border:1px solid rgba(0,255,153,0.1);border-radius:14px;
      padding:14px;margin-bottom:10px;
      display:flex;align-items:center;gap:14px;
    ">
      <div style="width:52px;height:52px;border-radius:8px;background:rgba(0,0,0,0.3);overflow:hidden;display:flex;align-items:center;justify-content:center;">
        <img src="${Price1488_PAGEMET.img}" onerror="this.style.display='none'" style="width:48px;height:48px;object-fit:contain;" />
        <span style="font-size:22px;${s.pagemet ? '' : 'display:none'}">📟</span>
      </div>
      <div style="flex:1;">
        <div style="font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;color:rgba(0,255,153,0.4);letter-spacing:2px;text-transform:uppercase;margin-bottom:3px;">Пейджмент</div>
        <div style="font-size:14px;font-weight:700;color:${s.pagemet ? '#c8e6ff' : 'rgba(200,230,255,0.2)'};">
          ${s.pagemet ? Price1488_PAGEMET.name : '— слот порожній —'}
        </div>
        ${s.pagemet
          ? `<button onclick="Price1488_uninstallPagemet()" style="margin-top:4px;background:rgba(255,68,102,0.1);border:1px solid rgba(255,68,102,0.2);color:#ff8899;border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer;font-family:'Share Tech Mono',monospace;">✕ Зняти</button>`
          : `<button onclick="Price1488_installPagemet()" style="margin-top:4px;background:rgba(0,255,153,0.07);border:1px solid rgba(0,255,153,0.2);color:#00ff99;border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer;font-family:'Share Tech Mono',monospace;">+ Встановити</button>`
        }
      </div>
    </div>`;

  document.getElementById("p1488-content").innerHTML = `
    <style>
      .p1488-label { color:rgba(200,230,255,0.4);font-size:11px;display:block;margin-top:2px; }
    </style>
    <div style="font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;color:rgba(0,255,153,0.4);letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;">🖥 Встановлені компоненти</div>

    ${Price1488_partCard('🔧','Материнська плата', mb, 'mb', Price1488_MOTHERBOARDS)}
    ${pagemetCard}
    ${Price1488_partCard('🔲','Процесор (PIC)', pic, 'pic', Price1488_PIC_LIST)}
    ${Price1488_partCard('🎮','Відеокарта (GPU)', gpu, 'gpu', Price1488_GPU_LIST)}
    ${Price1488_partCard('🧠','Оперативна пам\'ять', ram, 'ram', Price1488_RAM_MODULES)}
    ${Price1488_partCard('💾','Накопичувач', stor, 'storage', Price1488_SSD_LIST)}
  `;
}

// Обробник вибору з dropdown
function Price1488_handleInstall(slot, id) {
  if (!id) return;
  const all = [
    ...Price1488_MOTHERBOARDS,
    ...Price1488_PIC_LIST,
    ...Price1488_GPU_LIST,
    ...Price1488_RAM_MODULES,
    ...Price1488_SSD_LIST,
  ];
  const part = all.find(x => x.id === id);
  if (!part) return;
  const ok = Price1488_installPart(slot, id, part.name);
  if (ok) { Price1488_renderMyPC(); }
}

function Price1488_installPagemet() {
  if (!Price1488_hasItem(Price1488_PAGEMET.name)) {
    Price1488_toast(`❌ У інвентарі немає «${Price1488_PAGEMET.name}»`);
    return;
  }
  Price1488_removeItem(Price1488_PAGEMET.name);
  Price1488_state.pagemet = true;
  Price1488_saveState();
  Price1488_renderMyPC();
  Price1488_toast("✅ Пейджмент встановлено");
}

function Price1488_uninstallPagemet() {
  if (!Price1488_state.pagemet) return;
  Price1488_stopMining(false);
  Price1488_addItem(Price1488_PAGEMET.name);
  Price1488_state.pagemet = false;
  Price1488_saveState();
  if (Price1488_activeTab === "mypc") Price1488_renderMyPC();
  Price1488_toast("📦 Пейджмент знято в інвентар");
}

// ═══ ІНІЦІАЛІЗАЦІЯ ════════════════════════════════════════════════

Price1488_resumeMining();

window.onload = () => {
  loginScreen();
};
