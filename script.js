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

let streakDays = 0;
let lastStreakDate = 0;

   
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

localStorage.setItem(currentUser + "_streakDays", streakDays);
localStorage.setItem(currentUser + "_lastStreakDate", lastStreakDate);

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

streakDays = parseInt(localStorage.getItem(currentUser + "_streakDays")) || 0;
lastStreakDate = parseInt(localStorage.getItem(currentUser + "_lastStreakDate")) || 0;

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
  const medals = (profile.medals || []).slice(0, 6);
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

let arbtr_shopQty  = 1;
let arbtr_shopItem = null;

function arbtr_injectCSS() {
  if (document.getElementById("arbtr-shop-css")) return;
  const s = document.createElement("style");
  s.id = "arbtr-shop-css";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Nunito:wght@700;800;900&display=swap');
    #arbtr-shop-root {
      font-family: 'Nunito', sans-serif;
      min-height: 100vh;
      background: linear-gradient(160deg, #0d0f18 0%, #111420 60%, #0a0d16 100%);
      padding: 0 0 60px;
      box-sizing: border-box;
      color: #e2e8f0;
    }
    .arbtr-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 18px 20px 14px;
      background: linear-gradient(180deg, rgba(18,20,33,0.98), transparent);
      position: sticky; top: 0; z-index: 80;
      backdrop-filter: blur(14px);
      border-bottom: 1px solid rgba(255,255,255,.06);
      flex-wrap: wrap; gap: 10px;
    }
    .arbtr-title {
      font-family: 'Orbitron', sans-serif;
      font-size: 22px; font-weight: 900; letter-spacing: 3px;
      background: linear-gradient(90deg, #f0c050, #e08030);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 0 12px rgba(240,192,80,.4));
    }
    .arbtr-balance-chip {
      background: rgba(240,192,80,.12);
      border: 1px solid rgba(240,192,80,.35);
      border-radius: 30px; padding: 7px 18px;
      font-size: 14px; font-weight: 800; color: #f0c050; letter-spacing: .5px;
    }
    .arbtr-back-btn {
      background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
      color: rgba(255,255,255,.5); border-radius: 10px; padding: 8px 16px;
      font-family: 'Nunito', sans-serif; font-size: 13px; font-weight: 700;
      cursor: pointer; transition: .2s;
    }
    .arbtr-back-btn:hover { background: rgba(255,255,255,.12); color: #fff; }
    .arbtr-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
      gap: 14px; padding: 18px 16px;
    }
    .arbtr-card {
      background: #191d28; border: 1px solid rgba(255,255,255,.07);
      border-radius: 16px; overflow: hidden; cursor: pointer;
      transition: transform .2s, box-shadow .2s, border-color .2s;
      position: relative;
    }
    .arbtr-card:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 14px 40px rgba(0,0,0,.55);
      border-color: rgba(240,192,80,.4);
    }
    .arbtr-card:active { transform: scale(.97); }
    .arbtr-card-accent { height: 3px; background: linear-gradient(90deg,#f0c050,#e08030); }
    .arbtr-card-img-wrap {
      display: flex; align-items: center; justify-content: center;
      padding: 16px 10px 8px;
      background: radial-gradient(ellipse at 50% 50%, rgba(240,192,80,.06) 0%, transparent 70%);
    }
    .arbtr-card-img {
      width: 100px; height: 80px; object-fit: contain;
      filter: drop-shadow(0 4px 12px rgba(0,0,0,.7));
      transition: transform .25s;
    }
    .arbtr-card:hover .arbtr-card-img { transform: scale(1.1) translateY(-4px); }
    .arbtr-card-body { padding: 0 12px 14px; }
    .arbtr-card-name {
      font-size: 12px; font-weight: 800; color: #e2e8f0;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px;
    }
    .arbtr-card-price {
      font-family: 'Orbitron', sans-serif;
      font-size: 18px; font-weight: 700; color: #f0c050; line-height: 1;
    }
    .arbtr-card-price-sub { font-size: 9px; color: #64748b; font-weight: 600; }
    .arbtr-key-badge {
      position: absolute; top: 8px; right: 8px;
      background: rgba(240,192,80,.18); border: 1px solid rgba(240,192,80,.35);
      color: #f0c050; font-size: 9px; font-weight: 800;
      padding: 2px 7px; border-radius: 20px; letter-spacing: .4px;
    }
    @keyframes arbtrPopIn {
      from { transform: scale(.85) translateY(24px); opacity: 0; }
      to   { transform: scale(1) translateY(0); opacity: 1; }
    }
    .arbtr-overlay {
      position: fixed; inset: 0; z-index: 9500;
      background: rgba(0,0,0,.78); backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      padding: 20px; box-sizing: border-box;
    }
    .arbtr-modal {
      width: 100%; max-width: 390px;
      background: #13161e; border: 1px solid rgba(240,192,80,.35);
      border-radius: 22px; overflow: hidden;
      box-shadow: 0 30px 80px rgba(0,0,0,.85);
      animation: arbtrPopIn .25s cubic-bezier(.34,1.56,.64,1);
    }
    .arbtr-modal-stripe { height: 4px; background: linear-gradient(90deg,#f0c050,#e08030); }
    .arbtr-modal-body { padding: 22px 22px 24px; }
    .arbtr-modal-top {
      display: flex; align-items: center; gap: 14px; margin-bottom: 16px;
    }
    .arbtr-modal-img {
      width: 88px; height: 72px; object-fit: contain;
      filter: drop-shadow(0 4px 14px rgba(0,0,0,.7));
      flex-shrink: 0; border-radius: 10px; padding: 6px;
      background: radial-gradient(ellipse at 50% 50%, rgba(240,192,80,.08) 0%, transparent 70%);
    }
    .arbtr-modal-name {
      font-family: 'Orbitron', sans-serif;
      font-size: 15px; font-weight: 700; color: #f0c050; line-height: 1.25; margin-bottom: 4px;
    }
    .arbtr-modal-type { font-size: 10px; font-weight: 700; color: #64748b; letter-spacing: 1px; text-transform: uppercase; }
    .arbtr-modal-balance {
      display: flex; justify-content: space-between; align-items: center;
      background: rgba(240,192,80,.07); border: 1px solid rgba(240,192,80,.18);
      border-radius: 12px; padding: 10px 14px; margin-bottom: 14px;
      font-size: 13px; font-weight: 700;
    }
    .arbtr-modal-balance .arbtr-lbl { color: #64748b; }
    .arbtr-modal-balance .arbtr-bal-val { color: #f0c050; font-size: 16px; }
    .arbtr-sec-lbl {
      font-size: 10px; font-weight: 800; letter-spacing: 1.5px;
      text-transform: uppercase; color: #64748b; margin-bottom: 8px;
    }
    .arbtr-presets { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
    .arbtr-preset {
      padding: 6px 14px; border-radius: 8px;
      background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08);
      color: #94a3b8; font-size: 12px; font-weight: 800;
      cursor: pointer; transition: .15s;
    }
    .arbtr-preset:hover, .arbtr-preset.arbtr-active {
      background: rgba(240,192,80,.12); border-color: rgba(240,192,80,.35); color: #f0c050;
    }
    .arbtr-qty-row {
      display: flex; align-items: center; gap: 10px;
      background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
      border-radius: 12px; padding: 10px 14px; margin-bottom: 14px;
    }
    .arbtr-qty-btn {
      width: 36px; height: 36px; border-radius: 9px;
      background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12);
      color: #e2e8f0; font-size: 20px; font-weight: 700;
      cursor: pointer; transition: .15s; line-height: 1;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .arbtr-qty-btn:hover { background: rgba(240,192,80,.15); border-color: rgba(240,192,80,.4); }
    .arbtr-qty-val {
      font-family: 'Orbitron', sans-serif; font-size: 24px; font-weight: 700;
      min-width: 40px; text-align: center; color: #fff; flex: 1;
    }
    .arbtr-summary {
      display: flex; justify-content: space-between; align-items: center;
      background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07);
      border-radius: 12px; padding: 12px 14px; margin-bottom: 16px;
    }
    .arbtr-summary-left .arbtr-sum-lbl { color: #64748b; font-size: 12px; font-weight: 700; }
    .arbtr-summary-left .arbtr-sum-ok  { color: #4ade80; font-size: 10px; font-weight: 700; margin-top: 3px; }
    .arbtr-summary-left .arbtr-sum-no  { color: #f87171; font-size: 10px; font-weight: 700; margin-top: 3px; }
    .arbtr-sum-total {
      font-family: 'Orbitron', sans-serif; font-size: 22px; font-weight: 700; color: #f0c050;
    }
    .arbtr-modal-btns { display: flex; gap: 8px; }
    .arbtr-buy-btn {
      flex: 1; padding: 14px; border: none; border-radius: 13px;
      font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 900;
      cursor: pointer; transition: .2s; letter-spacing: .3px;
      background: linear-gradient(135deg, #f0c050, #e08020); color: #111;
      box-shadow: 0 4px 0 #a05010, 0 0 20px rgba(240,192,80,.25);
    }
    .arbtr-buy-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 0 #a05010, 0 0 30px rgba(240,192,80,.4);
    }
    .arbtr-buy-btn:active:not(:disabled) { transform: translateY(1px); }
    .arbtr-buy-btn:disabled {
      background: rgba(255,255,255,.08); color: #475569; box-shadow: none; cursor: not-allowed;
    }
    .arbtr-cancel-btn {
      padding: 14px 18px; border: 1px solid rgba(255,255,255,.1);
      border-radius: 13px; background: rgba(255,255,255,.05);
      color: #64748b; font-size: 13px; font-weight: 700; cursor: pointer; transition: .2s;
      font-family: 'Nunito', sans-serif;
    }
    .arbtr-cancel-btn:hover { background: rgba(255,255,255,.1); color: #fff; }
    @keyframes arbtrToastIn {
      from { opacity: 0; transform: translateX(-50%) translateY(14px); }
      to   { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    #arbtr-toast {
      position: fixed; bottom: 26px; left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(90deg, #1a1d28, #23273a);
      border: 1px solid rgba(240,192,80,.3); border-radius: 50px;
      padding: 11px 26px; font-family: 'Nunito', sans-serif;
      font-size: 14px; font-weight: 800; color: #f0c050; z-index: 99999;
      pointer-events: none; animation: arbtrToastIn .3s cubic-bezier(.34,1.56,.64,1);
      white-space: nowrap; box-shadow: 0 8px 30px rgba(0,0,0,.6);
    }
  `;
  document.head.appendChild(s);
}

function arbtr_toast(msg) {
  const old = document.getElementById("arbtr-toast");
  if (old) old.remove();
  const t = document.createElement("div");
  t.id = "arbtr-toast";
  t.textContent = msg;
  document.body.appendChild(t);
  clearTimeout(window._arbtrToastTimer);
  window._arbtrToastTimer = setTimeout(function() {
    const el = document.getElementById("arbtr-toast");
    if (el) el.remove();
  }, 2500);
}

function arbtr_closeModal() {
  const ov = document.getElementById("arbtr-overlay");
  if (ov) ov.remove();
  arbtr_shopQty  = 1;
  arbtr_shopItem = null;
}

function arbtr_updateModal() {
  if (!arbtr_shopItem) return;
  const total  = arbtr_shopItem.price * arbtr_shopQty;
  const canBuy = balance >= total;
  const maxCan = arbtr_shopItem.price > 0 ? Math.floor(balance / arbtr_shopItem.price) : 0;

  const qEl   = document.getElementById("arbtr-qty-val");
  const tEl   = document.getElementById("arbtr-total-val");
  const okEl  = document.getElementById("arbtr-sum-status");
  const btnEl = document.getElementById("arbtr-buy-btn");
  const balEl = document.getElementById("arbtr-balance-val");

  if (qEl)   qEl.textContent  = arbtr_shopQty;
  if (tEl)   tEl.textContent  = total + " 💰";
  if (balEl) balEl.textContent = balance + " нікусів";

  if (okEl) {
    if (canBuy) {
      okEl.className   = "arbtr-sum-ok";
      okEl.textContent = "✅ Вистачає (максимум: " + maxCan + " шт.)";
    } else {
      okEl.className   = "arbtr-sum-no";
      okEl.textContent = "❌ Не вистачає " + (total - balance) + " 💰";
    }
  }

  if (btnEl) {
    btnEl.disabled = !canBuy;
    btnEl.textContent = canBuy
      ? "🛒 Купити " + arbtr_shopQty + " шт. — " + total + " 💰"
      : "❌ Недостатньо нікусів";
  }

  const presets = document.querySelectorAll(".arbtr-preset");
  for (let i = 0; i < presets.length; i++) {
    const n = parseInt(presets[i].getAttribute("data-qty"));
    presets[i].classList.toggle("arbtr-active", n === arbtr_shopQty);
  }
}

function arbtr_changeQty(delta) {
  arbtr_shopQty = Math.max(1, Math.min(99, arbtr_shopQty + delta));
  arbtr_updateModal();
}

function arbtr_setPreset(n) {
  arbtr_shopQty = n;
  arbtr_updateModal();
}

function arbtr_confirmBuy() {
  if (!arbtr_shopItem) return;
  const total = arbtr_shopItem.price * arbtr_shopQty;
  if (balance < total) {
    arbtr_toast("❌ Недостатньо нікусів!");
    return;
  }
  balance -= total;
  for (let i = 0; i < arbtr_shopQty; i++) {
    if (arbtr_shopItem.isKey) {
      addKey(arbtr_shopItem.type.replace("Key", ""));
    } else {
      addCase(arbtr_shopItem.type);
    }
  }
  if (typeof incrementCaseOpen === "function") {
    incrementCaseOpen(arbtr_shopItem.type);
  }
  saveData();

  const bought = arbtr_shopQty;
  const name   = arbtr_shopItem.name;
  arbtr_closeModal();
  arbtr_toast("✅ Куплено " + bought + "× " + name + "!");

  // Оновлюємо баланс у шапці магазину без перезавантаження
  const hb = document.getElementById("arbtr-header-balance");
  if (hb) hb.textContent = "💰 " + balance + " нікусів";

  // Перемальовуємо картки — оновлюємо ціни/доступність
  const grid = document.querySelector(".arbtr-grid");
  if (!grid) return;
  const cards = grid.querySelectorAll(".arbtr-card");
  const items = arbtr_getShopItems();
  for (let i = 0; i < cards.length; i++) {
    const item = items[i];
    if (!item) continue;
    const canAfford = balance >= item.price;
    cards[i].style.opacity = canAfford ? "1" : "0.45";
    cards[i].style.pointerEvents = canAfford ? "" : "auto"; // дозволяємо клік щоб показати модалку
    const priceEl = cards[i].querySelector(".arbtr-card-price");
    if (priceEl) {
      priceEl.style.color = canAfford ? "#f0c050" : "#f87171";
    }
  }
}

function arbtr_openModal(idx) {
  const shopItems = arbtr_getShopItems();
  const item = shopItems[idx];
  if (!item) return;
  arbtr_shopItem = item;
  arbtr_shopQty  = 1;
  const old = document.getElementById("arbtr-overlay");
  if (old) old.remove();
  const total   = item.price;
  const canBuy  = balance >= total;
  const maxCan  = item.price > 0 ? Math.floor(balance / item.price) : 0;
  const typeLabel = item.isKey ? "🔑 Ключ" : "📦 Кейс";
  const statusClass = canBuy ? "arbtr-sum-ok" : "arbtr-sum-no";
  const statusText  = canBuy
    ? "✅ Вистачає (максимум: " + maxCan + " шт.)"
    : "❌ Не вистачає " + (total - balance) + " 💰";
  const btnText = canBuy
    ? "🛒 Купити 1 шт. — " + item.price + " 💰"
    : "❌ Недостатньо нікусів";

  const ov = document.createElement("div");
  ov.id = "arbtr-overlay";
  ov.className = "arbtr-overlay";
  ov.addEventListener("click", function(e) {
    if (e.target === ov) arbtr_closeModal();
  });

  ov.innerHTML =
    '<div class="arbtr-modal">' +
      '<div class="arbtr-modal-stripe"></div>' +
      '<div class="arbtr-modal-body">' +
        '<div class="arbtr-modal-top">' +
          '<img class="arbtr-modal-img" src="img/' + item.img + '" alt="' + item.name + '">' +
          '<div>' +
            '<div class="arbtr-modal-name">' + item.name + '</div>' +
            '<div class="arbtr-modal-type">' + typeLabel + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="arbtr-modal-balance">' +
          '<span class="arbtr-lbl">💰 Твій баланс</span>' +
          '<span class="arbtr-bal-val" id="arbtr-balance-val">' + balance + ' ігрових нікусів</span>' +
        '</div>' +
        '<div class="arbtr-sec-lbl">Вибери кількість</div>' +
        '<div class="arbtr-presets">' +
          '<div class="arbtr-preset arbtr-active" data-qty="1"  onclick="arbtr_setPreset(1)">×1</div>' +
          '<div class="arbtr-preset"              data-qty="5"  onclick="arbtr_setPreset(5)">×5</div>' +
          '<div class="arbtr-preset"              data-qty="10" onclick="arbtr_setPreset(10)">×10</div>' +
          '<div class="arbtr-preset"              data-qty="25" onclick="arbtr_setPreset(25)">×25</div>' +
          '<div class="arbtr-preset"              data-qty="50" onclick="arbtr_setPreset(50)">×50</div>' +
        '</div>' +
        '<div class="arbtr-qty-row">' +
          '<button class="arbtr-qty-btn" onclick="arbtr_changeQty(-10)">−−</button>' +
          '<button class="arbtr-qty-btn" onclick="arbtr_changeQty(-1)">−</button>' +
          '<div class="arbtr-qty-val" id="arbtr-qty-val">1</div>' +
          '<button class="arbtr-qty-btn" onclick="arbtr_changeQty(1)">+</button>' +
          '<button class="arbtr-qty-btn" onclick="arbtr_changeQty(10)">++</button>' +
        '</div>' +
        '<div class="arbtr-summary">' +
          '<div class="arbtr-summary-left">' +
            '<div class="arbtr-sum-lbl">Разом до оплати</div>' +
            '<div id="arbtr-sum-status" class="' + statusClass + '">' + statusText + '</div>' +
          '</div>' +
          '<div class="arbtr-sum-total" id="arbtr-total-val">' + total + ' 💰</div>' +
        '</div>' +
        '<div class="arbtr-modal-btns">' +
          '<button class="arbtr-buy-btn" id="arbtr-buy-btn"' +
            (canBuy ? '' : ' disabled') + ' onclick="arbtr_confirmBuy()">' +
            btnText +
          '</button>' +
          '<button class="arbtr-cancel-btn" onclick="arbtr_closeModal()">✕</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  document.body.appendChild(ov);
}

function arbtr_getShopItems() {
  return [
    { name: "Весна26",                        price: 90,  img: "case_vesna26.png",     type: "vesna26",       isKey: false },
    { name: "Весна26 Бокс",                   price: 50,  img: "case_vesna26box.png",  type: "vesna26box",    isKey: false },
    { name: "Весняний Подарунок",             price: 120, img: "case_vesna26gift.png", type: "vesna26gift",   isKey: false },
    { name: "Весняний Колекційний Кейс 2026", price: 65,  img: "case_kolek3.png",      type: "kolek3",        isKey: false },
    { name: "Аватарний Весняний Кейс 2026",   price: 150, img: "case_avatar1.png",     type: "avatar1",       isKey: false },
    { name: "Пак з насінням 3",              price: 200, img: "case_NN3.png",         type: "NN3",           isKey: false },
    { name: "Міжсезонний Кейс",               price: 80,  img: "case_absolute.png",    type: "absolute",      isKey: false },
    { name: "GameFlame26",                    price: 115, img: "case_gameflam.png",    type: "gameflam",      isKey: false },
    { name: "GameFlame26 ELITE",              price: 250, img: "case_gameflamE.png",   type: "gameflamE",     isKey: false },
    { name: "ArbitrationCase",                price: 300, img: "case_arbitr.png",      type: "arbitr",        isKey: false },
    { name: "ArcadeOverdrive",                price: 50,  img: "case_arcadeover.png",  type: "arcadeover",    isKey: false },
    { name: "Ключ від ArcadeOverdrive",       price: 60,  img: "key_arcadeover.png",   type: "arcadeoverKey", isKey: true  }
  ];
}

function shopMenu() {
  arbtr_injectCSS();
  const items = arbtr_getShopItems();

  let cardsHTML = "";
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    cardsHTML +=
      '<div class="arbtr-card" data-idx="' + i + '">' +
        '<div class="arbtr-card-accent"></div>' +
        (item.isKey ? '<div class="arbtr-key-badge">🔑 Ключ</div>' : '') +
        '<div class="arbtr-card-img-wrap">' +
          '<img class="arbtr-card-img" src="img/' + item.img + '" alt="' + item.name + '">' +
        '</div>' +
        '<div class="arbtr-card-body">' +
          '<div class="arbtr-card-name">' + item.name + '</div>' +
          '<div class="arbtr-card-price">' + item.price + '</div>' +
          '<div class="arbtr-card-price-sub">ігрових нікусів / шт.</div>' +
        '</div>' +
      '</div>';
  }

  document.getElementById("app").innerHTML =
    '<div id="arbtr-shop-root">' +
      '<div class="arbtr-header">' +
        '<div class="arbtr-title">🛒 МАГАЗИН</div>' +
        '<div class="arbtr-balance-chip" id="arbtr-header-balance">💰 ' + balance + ' ігрових нікусів</div>' +
        '<button class="arbtr-back-btn" onclick="arbtr_closeModal();mainMenu()">← Назад</button>' +
      '</div>' +
      '<div class="arbtr-grid">' + cardsHTML + '</div>' +
    '</div>';

  const grid = document.querySelector(".arbtr-grid");
  if (grid) {
    grid.addEventListener("click", function(e) {
      const card = e.target.closest(".arbtr-card[data-idx]");
      if (!card) return;
      const idx = parseInt(card.getAttribute("data-idx"));
      arbtr_openModal(idx);
    });
  }
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
          ${item.desc ? `<div style="font-size:10px;color:#94a3b8;margin-top:2px;text-align:center;">${item.desc}</div>` : ""}
          ${locked ? `<div class="inv-card-locked-badge">🔒 Заблоковано</div>` : ""}
          <button class="inv-card-menu-btn" onclick="event.stopPropagation();openItemPopup(${realIdx},this)">⋯</button>
        </div>`;
    });
    html += `</div>`;
  }

  html += `</div>`;
  app.innerHTML = html;
  _fastInitPanel();
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
  if(type === "NN") return "Пак з насінням 1"; 
if(type === "WDGASTER") return "Winter Dreams"; 
if(type === "NN2") return "Пак з насінням 2"; 
if(type === "NN3") return "Пак з насінням 3"; 
if(type === "WDGASTERbox") return "Winter Dreams box"; 
if(type === "wint25gift") return "Різдвяний Подарунок"; 
if(type === "catcollection") return "CatCollection"; 
if(type === "dogcollection") return "DogCollection"; 
if(type === "flow") return "FlowerPower26"; 
if(type === "gameflam") return "GameFlame26"; 
if(type === "arbitr") return "ArbitrationCase"; 
if(type === "arcadeover") return "ArcadeOverdrive"; 
if(type === "gameflamE") return "GameFlame26 ELITE"; 
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
  containerWidth: 700,
};

// ===================== UI PREVIEW POOL =====================
const _previewPoolCache = new WeakMap();

function buildPreviewPool(dropFunc, tries = 3000){
  if(_previewPoolCache.has(dropFunc)) return _previewPoolCache.get(dropFunc);
  const map = {};
  for(let i = 0; i < tries; i++){
    const d = dropFunc();
    map[d.name] = d;
  }
  const pool = Object.values(map);
  _previewPoolCache.set(dropFunc, pool);
  return pool;
}

// ===================== RENDER ARROWS =====================
function renderArrows(containerId, positionsPx){
  const container = document.getElementById(containerId);
  if(!container) return;
  container.querySelectorAll(".roulette-arrow").forEach(a => a.remove());
  positionsPx.forEach(leftPx => {
    const arrowTop = document.createElement("div");
    arrowTop.className = "roulette-arrow";
    arrowTop.style.cssText = `
      position:absolute;top:0;left:${leftPx}px;
      transform:translateX(-50%);z-index:10;pointer-events:none;height:100%;
    `;
    arrowTop.innerHTML = `
      <div style="width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;border-top:18px solid #00eaff;filter:drop-shadow(0 0 8px #00eaff) drop-shadow(0 0 16px #00eaff);margin:0 auto;"></div>
      <div style="width:3px;height:calc(100% - 18px);background:linear-gradient(180deg,#00eaff,rgba(0,234,255,0.1));margin:0 auto;box-shadow:0 0 8px #00eaff;"></div>
    `;
    const arrowBot = document.createElement("div");
    arrowBot.className = "roulette-arrow";
    arrowBot.style.cssText = `
      position:absolute;bottom:0;left:${leftPx}px;
      transform:translateX(-50%);z-index:10;pointer-events:none;
    `;
    arrowBot.innerHTML = `
      <div style="width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;border-bottom:18px solid #00eaff;filter:drop-shadow(0 0 8px #00eaff) drop-shadow(0 0 16px #00eaff);margin:0 auto;"></div>
    `;
    container.appendChild(arrowTop);
    container.appendChild(arrowBot);
  });
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
    case "gameflamE": dropFunc = dropgameflamECase; break;
    case "arcadeover": dropFunc = droparcadeoverCase; break;
    case "arbitr": dropFunc = droparbitrCase; break;
    case "gameflam": dropFunc = dropgameflamCase; break;
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
    if(keyIdx === -1){ alert("Потрібен ключ від ArcadeCase!"); return; }
  }

if(item.caseType === "arcadeover"){
    const keyIdx = inventory.findIndex(i => i.type === "key" && i.keyType === "arcadeover");
    if(keyIdx === -1){ alert("Потрібен ключ від ArcadeOverdrive!"); return; }
}

  const finalDrop = dropFunc();

  showCasePreview(dropFunc, item.caseType, () => {
if(item.caseType === "arcase" || item.caseType === "arcadeover"){
    const keyType = item.caseType === "arcase" ? "arcase" : "arcadeover";
    const keyIdx = inventory.findIndex(i => i.type === "key" && i.keyType === keyType);
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

// ===================== PREVIEW =====================
function showCasePreview(dropFunc, caseType, onOpen){
  const app = document.getElementById("app");
  let _actionDone = false;
  const items = buildPreviewPool(dropFunc);

  const rarityTabs = {
    "Спеціальні": [],
    "Секретні": [],
    "Епічні": [],
    "Виняткові": [],
    "Звичайні": []
  };

  items.forEach(item => {
    if(item.rarity==="Спеціальна")      rarityTabs["Спеціальні"].push(item);
    else if(item.rarity==="Секретна")   rarityTabs["Секретні"].push(item);
    else if(item.rarity==="Епічна")     rarityTabs["Епічні"].push(item);
    else if(item.rarity==="Виняткова")  rarityTabs["Виняткові"].push(item);
    else                                rarityTabs["Звичайні"].push(item);
  });

  const tabsButtons = Object.keys(rarityTabs).map(r =>
    `<button class="rarity-tab" data-tab="${r}">${r}</button>`
  ).join("");

  app.innerHTML = `
    <h2>${getCaseName(caseType)} — можливі предмети</h2>
    <div id="roulette" style="
      overflow:hidden;width:${ANIM.containerWidth}px;margin:20px auto;position:relative;
      background:linear-gradient(180deg,#001428,#001e3a);padding:14px 0;
      border:2px solid #00eaff;border-radius:4px;
      box-shadow:0 0 30px rgba(0,234,255,0.4),inset 0 0 20px rgba(0,234,255,0.05);
    ">
      <div id="roulette-strip" style="display:flex;align-items:center;"></div>
    </div>
    <div id="rarity-buttons" style="text-align:center;margin:14px 0;">${tabsButtons}</div>
    <div id="rarity-panels" style="margin-top:12px;">
      ${Object.keys(rarityTabs).map(r => {
        const panelItems = rarityTabs[r].map(p => {
          const c = getRarityColor(p.rarity);
          return `
            <div style="
              width:108px;background:linear-gradient(180deg,rgba(0,234,255,0.07),rgba(0,20,50,0.9));
              border:2px solid ${c};border-radius:4px;padding:8px 6px;text-align:center;
              margin:5px;display:inline-block;box-shadow:0 0 12px ${c}55;
              transition:transform 0.15s;cursor:default;
            " onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
              <img src="img/${p.img}" width="80" style="image-rendering:pixelated;">
              <div style="font-size:9px;color:${c};font-weight:bold;margin-top:4px;font-family:'Press Start 2P',monospace;line-height:1.4;">${p.name}</div>
            </div>`;
        }).join("");
        return `<div class="rarity-panel" data-panel="${r}" style="
          display:none;background:rgba(0,20,50,0.7);padding:10px;
          border-radius:4px;border:1px solid rgba(0,234,255,0.2);
        ">${panelItems}</div>`;
      }).join("")}
    </div>
    <div style="text-align:center;margin-top:22px;display:flex;gap:12px;justify-content:center;">
      <button id="open-case-btn" style="font-size:12px;padding:13px 32px;background:linear-gradient(45deg,#00c8e8,#55ffaa);color:#001a2a;border-radius:4px;cursor:pointer;font-weight:bold;font-family:'Press Start 2P',monospace;box-shadow:0 4px 0 #006688,0 0 20px rgba(0,234,255,0.6);letter-spacing:1px;">▶ ВІДКРИТИ</button>
      <button id="cancel-case-btn" style="font-size:12px;padding:13px 32px;background:linear-gradient(45deg,#444,#666);color:#c8f0ff;border-radius:4px;cursor:pointer;font-weight:bold;font-family:'Press Start 2P',monospace;box-shadow:0 4px 0 #222;letter-spacing:1px;">✕ НАЗАД</button>
    </div>
  `;

  const panels = document.querySelectorAll(".rarity-panel");
  if(panels.length) panels[0].style.display = "block";

  document.querySelectorAll(".rarity-tab").forEach(btn => {
    btn.onclick = () => {
      panels.forEach(p => p.style.display = "none");
      document.querySelector(`.rarity-panel[data-panel="${btn.dataset.tab}"]`).style.display = "block";
    };
  });

  renderArrows("roulette", [
    Math.round(ANIM.containerWidth * 0.2),
    Math.round(ANIM.containerWidth * 0.5),
    Math.round(ANIM.containerWidth * 0.8)
  ]);

  const strip = document.getElementById("roulette-strip");
  for(let i = 0; i < ANIM.itemsCount; i++){
    const p = items[Math.floor(Math.random() * items.length)];
    const el = document.createElement("div");
    const color = getRarityColor(p.rarity);
    el.style.cssText = `
      width:${ANIM.itemWidth}px;flex:0 0 ${ANIM.itemWidth}px;
      margin:0 ${ANIM.itemGap/2}px;
      background:linear-gradient(180deg,rgba(0,234,255,0.07),rgba(0,20,50,0.85));
      border:2px solid ${color};border-radius:4px;padding:6px 0;
      text-align:center;box-shadow:0 0 10px ${color}55;
    `;
    el.innerHTML = `
      <img src="img/${p.img}" width="${ANIM.itemWidth-24}" style="display:block;margin:0 auto;image-rendering:pixelated;">
      <div style="color:${color};font-weight:bold;font-size:8px;font-family:'Press Start 2P',monospace;margin-top:4px;padding:0 4px;line-height:1.4;">${p.name}</div>
    `;
    strip.appendChild(el);
  }

  let previewDir = 1, previewOffset = 0, previewAnim;
  function animatePreview(){
    previewOffset += previewDir * 0.6;
    const maxScroll = (ANIM.itemsCount * (ANIM.itemWidth + ANIM.itemGap)) - ANIM.containerWidth;
    if(previewOffset >= maxScroll) previewDir = -1;
    if(previewOffset <= 0) previewDir = 1;
    strip.style.transform = `translateX(${-previewOffset}px)`;
    previewAnim = requestAnimationFrame(animatePreview);
  }
  previewAnim = requestAnimationFrame(animatePreview);

  document.getElementById("open-case-btn").onclick = () => {
    if(_actionDone) return;
    _actionDone = true;
    cancelAnimationFrame(previewAnim);
    document.getElementById("open-case-btn").disabled = true;
    document.getElementById("cancel-case-btn").disabled = true;
    onOpen();
  };

  document.getElementById("cancel-case-btn").onclick = () => {
    if(_actionDone) return;
    _actionDone = true;
    cancelAnimationFrame(previewAnim);
    document.getElementById("open-case-btn").disabled = true;
    document.getElementById("cancel-case-btn").disabled = true;
    showInventory();
  };
}

function animateCaseOpening(finalDrop, dropFunc, caseType){
  const cfg = ANIM;
  const app = document.getElementById("app");

  app.innerHTML = `
    <h2>Відкриття ${getCaseName(caseType)}...</h2>
    <div id="roulette" style="
      overflow:hidden;width:${cfg.containerWidth}px;margin:24px auto;position:relative;
      background:linear-gradient(180deg,#001428,#001e3a);
      border:2px solid #00eaff;border-radius:4px;
      box-shadow:0 0 40px rgba(0,234,255,0.5),inset 0 0 30px rgba(0,234,255,0.06);
    ">
      <div id="roulette-strip" style="
        display:flex;align-items:center;will-change:transform;padding:14px 0;
        transform:translateX(0);
      "></div>
      <div id="arrow-top" style="
        position:absolute;top:0;left:50%;
        transform:translateX(-50%);z-index:10;pointer-events:none;
        width:0;height:0;
        border-left:10px solid transparent;border-right:10px solid transparent;
        border-top:18px solid #00eaff;
        filter:drop-shadow(0 0 8px #00eaff) drop-shadow(0 0 16px #00eaff);
        transition:left 0.15s ease;
      "></div>
      <div id="arrow-bot" style="
        position:absolute;bottom:0;left:50%;
        transform:translateX(-50%);z-index:10;pointer-events:none;
        width:0;height:0;
        border-left:10px solid transparent;border-right:10px solid transparent;
        border-bottom:18px solid #00eaff;
        filter:drop-shadow(0 0 8px #00eaff) drop-shadow(0 0 16px #00eaff);
        transition:left 0.15s ease;
      "></div>
    </div>
    <div id="win-display" style="text-align:center;margin-top:10px;min-height:60px;"></div>
  `;

  const strip = document.getElementById("roulette-strip");
  const arrowTop = document.getElementById("arrow-top");
  const arrowBot = document.getElementById("arrow-bot");
  const roulette = document.getElementById("roulette");
  const centerIndex = Math.floor(cfg.itemsCount / 2);
  const pool = [];

  for(let i = 0; i < cfg.itemsCount; i++) pool.push(dropFunc());
  pool[centerIndex] = finalDrop;

  pool.forEach(p => {
    const el = document.createElement("div");
    const color = getRarityColor(p.rarity);
    el.style.cssText = `
      width:${cfg.itemWidth}px;flex:0 0 ${cfg.itemWidth}px;
      margin:0 ${cfg.itemGap/2}px;
      background:linear-gradient(180deg,rgba(0,234,255,0.07),rgba(0,20,50,0.85));
      border:2px solid ${color};border-radius:4px;padding:6px 0;
      text-align:center;box-shadow:0 0 10px ${color}55;
      transition:transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
    `;
    el.innerHTML = `
      <img src="img/${p.img}" width="${cfg.itemWidth-24}" style="display:block;margin:0 auto;image-rendering:pixelated;">
      <div style="color:${color};font-weight:bold;font-size:8px;font-family:'Press Start 2P',monospace;margin-top:4px;padding:0 4px;line-height:1.4;">${p.name}</div>
    `;
    strip.appendChild(el);
  });

 requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // Беремо реальну позицію центру картки через offsetLeft
      const winEl = strip.children[centerIndex];
      const cardCenter = winEl.offsetLeft + winEl.offsetWidth / 2;
      
      const margin = cfg.itemWidth * 0.4;
      const randomOffset = (Math.random() * 2 - 1) * margin;
      
      const targetX = cfg.containerWidth / 2 - cardCenter + randomOffset;

      strip.style.transition = `transform ${cfg.duration}ms cubic-bezier(.15,.85,.25,1)`;
      strip.style.transform = `translateX(${targetX}px)`;
    });
  });

  strip.addEventListener("transitionend", (e) => {
    // Ігноруємо події від дочірніх елементів та інших властивостей
    if(e.target !== strip || e.propertyName !== "transform") return;

    const winEl = strip.children[centerIndex];
    const winColor = getRarityColor(finalDrop.rarity);

    const rouletteRect = roulette.getBoundingClientRect();
    const cardRect = winEl.getBoundingClientRect();

    const cardLeft = cardRect.left - rouletteRect.left;
    const cardWidth = cardRect.width;

    // Рандомна позиція стрілки всередині картки з відступом 10px
    const margin = 10;
    const arrowLeft = Math.round(
      cardLeft + margin + Math.random() * (cardWidth - margin * 2)
    );

    arrowTop.style.left = arrowLeft + "px";
    arrowBot.style.left = arrowLeft + "px";

    winEl.style.transform = "scale(1.25)";
    winEl.style.boxShadow = `0 0 60px ${winColor}, 0 0 120px ${winColor}55`;
    winEl.style.border = `3px solid ${winColor}`;
    winEl.style.zIndex = "5";

    addItemFromCase(finalDrop, caseType);
    gfAwardBPForCase(caseType);

    dosvid = (dosvid || 0) + 2;
    localStorage.setItem(currentUser + "_dosvid", dosvid);

    document.getElementById("win-display").innerHTML = `
      <div style="
        display:inline-block;
        background:linear-gradient(180deg,rgba(0,234,255,0.12),rgba(0,20,50,0.9));
        border:2px solid ${winColor};border-radius:4px;padding:14px 24px;
        box-shadow:0 0 30px ${winColor}88;font-family:'Press Start 2P',monospace;
      ">
        <div style="color:${winColor};font-size:11px;text-shadow:0 0 12px ${winColor};">▶ ВИ ОТРИМАЛИ</div>
        <div style="color:#fff;font-size:13px;margin-top:8px;text-shadow:0 0 8px #fff;">${finalDrop.name}</div>
      </div>
    `;

    setTimeout(() => { showInventory(); }, 2400);
  });
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

function dropgameflamCase(){
  const pool = [
    {name:"АнтонЧигур", img:"gameflam1.png", rarity:"Спеціальна", chance:0.01},
    {name:"СоулРешала", img:"gameflam2.png", rarity:"Спеціальна", chance:0.01},
    {name:"Чорний", img:"gameflam3.png", rarity:"Секретна", chance:0.02},
    {name:"СобачийКайф", img:"gameflam4.png", rarity:"Секретна", chance:0.02},
    {name:"Токсис", img:"gameflam5.png", rarity:"Епічна", chance:0.11},
    {name:"ГраАрбітраж", img:"gameflam6.png", rarity:"Епічна", chance:0.11},
    {name:"Тємщик", img:"gameflam7.png", rarity:"Виняткова", chance:0.15},
    {name:"Підозріло", img:"gameflam8.png", rarity:"Виняткова", chance:0.15},
    {name:"Джарвіс?", img:"gameflam9.png", rarity:"Звичайна", chance:0.21},
    {name:"Бик", img:"gameflam10.png", rarity:"Звичайна", chance:0.21}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function droparbitrCase(){
  const pool = [
    {name:"Габен", img:"arbitr1.png", rarity:"Спеціальна", chance:0.01},
    {name:"ПесДюк", img:"arbitr2.png", rarity:"Спеціальна", chance:0.01},
    {name:"СкелетЗЩитом", img:"arbitr3.png", rarity:"Секретна", chance:0.02},
    {name:"ТобіКапець", img:"arbitr4.png", rarity:"Секретна", chance:0.02},
    {name:"Анонімуси", img:"arbitr5.png", rarity:"Епічна", chance:0.11},
    {name:"Гробовщики", img:"arbitr6.png", rarity:"Епічна", chance:0.11},
    {name:"ТвояКонтрольна", img:"arbitr7.png", rarity:"Виняткова", chance:0.15},
    {name:"Чорнобаївка", img:"arbitr8.png", rarity:"Виняткова", chance:0.15},
    {name:"Шайлушай", img:"arbitr9.png", rarity:"Звичайна", chance:0.21},
    {name:"!Арбітраж", img:"arbitr10.png", rarity:"Звичайна", chance:0.21}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function droparcadeoverCase(){
  const pool = [
    {name:"Сократ", img:"arcadeover1.png", rarity:"Спеціальна", chance:0.01},
    {name:"ДревнійСкелет", img:"arcadeover2.png", rarity:"Спеціальна", chance:0.01},
    {name:"Іоіоіо", img:"arcadeover3.png", rarity:"Секретна", chance:0.02},
    {name:"Сільвер", img:"arcadeover4.png", rarity:"Секретна", chance:0.02},
    {name:"АвстрійськийХудожник", img:"arcadeover5.png", rarity:"Епічна", chance:0.11},
    {name:"ДідГеймер", img:"arcadeover6.png", rarity:"Епічна", chance:0.11},
    {name:"Зʼйобуєм", img:"arcadeover7.png", rarity:"Виняткова", chance:0.15},
    {name:"О,ні", img:"arcadeover8.png", rarity:"Виняткова", chance:0.15},
    {name:"ДедІнсайд", img:"arcadeover9.png", rarity:"Звичайна", chance:0.21},
    {name:"Шакал", img:"arcadeover10.png", rarity:"Звичайна", chance:0.21}
  ];

  let r = Math.random(), sum = 0;
  for(const p of pool){
    sum += p.chance;
    if(r < sum) return createItem(p);
  }
  return createItem(pool[pool.length-1]);
}

function dropgameflamECase(){
  const pool = [
    {name:"АнтонЧигур", img:"gameflam1.png", rarity:"Спеціальна", chance:0.03},
    {name:"СоулРешала", img:"gameflam2.png", rarity:"Спеціальна", chance:0.03},
    {name:"Чорний", img:"gameflam3.png", rarity:"Секретна", chance:0.07},
    {name:"СобачийКайф", img:"gameflam4.png", rarity:"Секретна", chance:0.07},
    {name:"Токсис", img:"gameflam5.png", rarity:"Епічна", chance:0.13},
    {name:"ГраАрбітраж", img:"gameflam6.png", rarity:"Епічна", chance:0.13},
    {name:"Тємщик", img:"gameflam7.png", rarity:"Виняткова", chance:0.27},
    {name:"Підозріло", img:"gameflam8.png", rarity:"Виняткова", chance:0.27}
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

// ╔══════════════════════════════════════════════════════════════════╗
// ║         ARCADE OVERDRIVE — ПОВНА СИСТЕМА МІНІ-ІГОР             ║
// ║  Вставити у script.js ЗАМІСТЬ функції arcadeMenu()             ║
// ╚══════════════════════════════════════════════════════════════════╝

// ═══ КОНСТАНТИ АРКАДИ ════════════════════════════════════════════

const ARC_RANKS = ["D","C","B","A","S","SS","SSS"];

// Яка материнська плата зараз встановлена
function arc_getMBTier() {
  const mb = Price1488_state && Price1488_state.mb;
  if (!mb) return 0;
  if (mb === "MFNP_1_0")  return 1;
  if (mb === "MFNP_1_0P") return 2;
  if (mb === "MFNP_1_1")  return 3;
  if (mb === "MFNP_1_2")  return 4;
  return 0;
}

function arc_hasPCReady() {
  const s = Price1488_state;
  return s && s.mb && s.pagemet && s.pic && Price1488_picRemainingMs() > 0;
}

function arc_getMBName() {
  const mb = Price1488_state && Price1488_state.mb;
  if (!mb) return "Немає";
  const found = Price1488_MOTHERBOARDS.find(x => x.id === mb);
  return found ? found.name : mb;
}

function arc_giveReward(scorePoints, difficulty) {
  // Зменшено у ~3 рази порівняно з оригіналом
  const earned = Math.floor(scorePoints * (difficulty || 1) * 0.17);
  if (earned > 0) { balance += earned; saveData(); }

  const roll = Math.random();
  const threshold = Math.min(0.05 + scorePoints * 0.001, 0.45);
  let dropped = null;
  if (roll < threshold * 0.1) {
    addCase("gameflamE"); dropped = "GameFlame26 ELITE кейс";
  } else if (roll < threshold * 0.3) {
    addCase("arcadeover"); dropped = "ArcadeOverdrive кейс";
    if (Math.random() < 0.4) { addKey("arcadeover"); dropped += " + Ключ"; }
  } else if (roll < threshold) {
    addCase("absolute"); dropped = "Міжсезонний кейс";
  }

  const expGain = Math.max(2, Math.floor(scorePoints * 0.2));
  dosvid = (dosvid || 0) + expGain;
  localStorage.setItem(currentUser + "_dosvid", dosvid);

  if (typeof gfAddPoints === "function") gfAddPoints(Math.floor(scorePoints * 2));

  return { earned, dropped, expGain };
}

function arc_getRank(score, thresholds) {
  // thresholds = [D,C,B,A,S,SS,SSS] min scores
  let rank = "D";
  const levels = ["D","C","B","A","S","SS","SSS"];
  for (let i = 0; i < thresholds.length; i++) {
    if (score >= thresholds[i]) rank = levels[i];
  }
  return rank;
}

// Загальний екран результатів
function arc_showResult(gameName, score, rank, reward) {
  const rankColors = {D:"#888",C:"#4af",B:"#7f4",A:"#fa0",S:"#f80",SS:"#f44",SSS:"#f0c"};
  const rc = rankColors[rank] || "#fff";
  document.getElementById("app").innerHTML = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Share+Tech+Mono&display=swap');
      #arc-result {
        font-family:'Orbitron',sans-serif;
        min-height:100vh;
        background:radial-gradient(ellipse at 50% 0%,#1a0830 0%,#050010 70%);
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        text-align:center;padding:30px;box-sizing:border-box;color:#e0d8ff;
      }
      .arc-rank-big {
        font-size:clamp(80px,20vw,120px);
        font-weight:900;
        color:${rc};
        text-shadow:0 0 30px ${rc},0 0 80px ${rc}88;
        line-height:1;
        animation:arcRankIn .5s cubic-bezier(.34,1.56,.64,1);
      }
      @keyframes arcRankIn{from{transform:scale(0) rotate(-30deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}
      .arc-score-val {
        font-family:'Share Tech Mono',monospace;
        font-size:clamp(28px,6vw,44px);
        color:#fff;margin:10px 0 20px;
      }
      .arc-reward-box {
        background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);
        border-radius:16px;padding:16px 24px;margin:16px 0;font-size:14px;
        font-family:'Share Tech Mono',monospace;
      }
      .arc-btns{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:20px;}
      .arc-btn {
        padding:13px 28px;border:none;border-radius:12px;cursor:pointer;
        font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;
        letter-spacing:1px;transition:.2s;
      }
      .arc-btn-play{background:linear-gradient(135deg,#00ff99,#00cfff);color:#000;}
      .arc-btn-play:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,255,153,.5);}
      .arc-btn-menu{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:#aaa;}
      .arc-btn-menu:hover{color:#fff;border-color:#fff;}
    </style>
    <div id="arc-result">
      <div style="font-size:13px;letter-spacing:4px;color:rgba(255,255,255,.4);margin-bottom:8px;text-transform:uppercase;">${gameName}</div>
      <div class="arc-rank-big">${rank}</div>
      <div style="font-size:11px;letter-spacing:2px;color:rgba(255,255,255,.4);margin-bottom:4px;">ОЧКИ</div>
      <div class="arc-score-val">${score.toLocaleString()}</div>
      <div class="arc-reward-box">
        ${reward.earned > 0 ? `💰 +${reward.earned} нікусів<br>` : ""}
        ${reward.expGain > 0 ? `🧠 +${reward.expGain} досвіду<br>` : ""}
        ${reward.dropped ? `🎁 Дроп: <b style="color:#ffd700">${reward.dropped}</b>` : "Немає дропу"}
      </div>
      <div class="arc-btns">
        <button class="arc-btn arc-btn-play" onclick="arcadeMenu()">🎮 Ще раз</button>
        <button class="arc-btn arc-btn-menu" onclick="mainMenu()">🏠 Меню</button>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════════
// ОНОВЛЕНЕ МЕНЮ АРКАДИ
// ═══════════════════════════════════════════════════════════════════

function arcadeMenu() {
  const tier = arc_getMBTier();
  const hasPc = arc_hasPCReady();
  const mbName = arc_getMBName();

  // Визначення ігор та їх вимог
  const GAMES = [
    // Tier 0 — без плати взагалі (базові)
    {
      id: "saper", name: "💣 Сапер", desc: "Класичний сапер. Відкривай клітинки, уникай бомб.",
      cost: 20, tier: 0, difficulty: "easy", color: "#4ade80",
      action: "startSaperPaid()",
    },
    {
      id: "dino", name: "🦕 Динозаврик", desc: "Стрибай через перешкоди. Чим довше — тим важче.",
      cost: 50, tier: 0, difficulty: "medium", color: "#60a5fa",
      action: "startDinoPaid()",
    },
    // Tier 1 — MFNP 1.0+
    {
      id: "stack", name: "🧱 Stack Tower", desc: "Склади найвищу вежу. PERFECT комбо дає золотий режим.",
      cost: 30, tier: 1, difficulty: "easy", color: "#fbbf24",
      action: "arc_startStack()",
    },
    {
      id: "reaction", name: "⚡ Reaction Test", desc: "Натискай у правильний момент. Реакція вирішує все.",
      cost: 40, tier: 1, difficulty: "medium", color: "#a78bfa",
      action: "arc_startReaction()",
    },
    // Tier 2 — MFNP 1.0P+
    {
      id: "memory", name: "🧠 Memory Cards", desc: "Знайди всі пари карт. Менше помилок — більше очок.",
      cost: 50, tier: 2, difficulty: "easy", color: "#34d399",
      action: "arc_startMemory()",
    },
    {
      id: "flappy", name: "🐦 Flappy Void", desc: "Літай крізь портали зі зміною гравітації.",
      cost: 70, tier: 2, difficulty: "hard", color: "#f472b6",
      action: "arc_startFlappy()",
    },
    // Tier 3 — MFNP 1.1+
    {
      id: "runner", name: "🏃 Zone Escape", desc: "Тікай від небезпек по процедурній карті.",
      cost: 60, tier: 3, difficulty: "easy", color: "#fb923c",
      action: "arc_startRunner()",
    },
    {
      id: "brick", name: "🧱 Brick Blaster", desc: "Арканоїд з бос-блоками, луто та OVERDRIVE режимом.",
      cost: 80, tier: 3, difficulty: "hard", color: "#e879f9",
      action: "arc_startBrick()",
    },
    // Tier 4 — MFNP 1.2
    {
      id: "uno", name: "🃏 УНО", desc: "Карткова битва проти ботів. 70 нікусів — виграш 100.",
      cost: 70, tier: 4, difficulty: "easy", color: "#f87171",
      action: "unoSelectMode()",
    },
  ];

  // Щоденний челендж
  const todayChallenge = arc_getDailyChallenge();

  let html = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Share+Tech+Mono&family=DM+Sans:wght@400;700&display=swap');
      #arc-root {
        font-family:'DM Sans',sans-serif;
        min-height:100vh;
        background:
          radial-gradient(ellipse at 20% 10%,rgba(204,68,255,.12) 0%,transparent 50%),
          radial-gradient(ellipse at 80% 90%,rgba(0,207,255,.08) 0%,transparent 50%),
          linear-gradient(160deg,#0d0820 0%,#070413 60%,#0a0628 100%);
        color:#e0d8ff;padding:0 0 60px;box-sizing:border-box;
      }
      .arc-header {
        background:linear-gradient(180deg,rgba(13,8,32,.98),transparent);
        padding:16px 20px 0;
        position:sticky;top:0;z-index:80;
        backdrop-filter:blur(14px);
        border-bottom:2px solid rgba(204,68,255,.3);
      }
      .arc-header-row {display:flex;align-items:center;gap:12px;padding-bottom:12px;flex-wrap:wrap;}
      .arc-logo {
        font-family:'Orbitron',sans-serif;font-size:18px;font-weight:900;letter-spacing:3px;
        flex:1;
        background:linear-gradient(90deg,#cc44ff,#00d4ff,#ff00cc);
        background-size:200% auto;
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;
        animation:arcShimmer 3s linear infinite;
        filter:drop-shadow(0 0 12px rgba(204,68,255,.6));
      }
      @keyframes arcShimmer{from{background-position:0% center}to{background-position:200% center}}
      .arc-balance {
        background:rgba(255,215,0,.1);border:1px solid rgba(255,215,0,.3);
        border-radius:20px;padding:6px 14px;font-size:13px;font-weight:700;color:#ffd966;
      }
      .arc-back {
        background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
        color:rgba(255,255,255,.5);border-radius:8px;padding:7px 14px;
        font-size:12px;font-weight:700;cursor:pointer;transition:.2s;
        font-family:'DM Sans',sans-serif;
      }
      .arc-back:hover{background:rgba(255,255,255,.12);color:#fff;}

      /* PC STATUS */
      .arc-pc-bar {
        margin:10px 20px 0;
        background:${hasPc ? "rgba(0,255,153,.06)" : "rgba(255,68,68,.06)"};
        border:1px solid ${hasPc ? "rgba(0,255,153,.25)" : "rgba(255,68,68,.25)"};
        border-radius:10px;padding:10px 16px;
        display:flex;align-items:center;gap:10px;
        font-size:12px;font-weight:700;flex-wrap:wrap;
      }
      .arc-pc-dot {
        width:10px;height:10px;border-radius:50%;
        background:${hasPc ? "#00ff99" : "#ff4466"};
        box-shadow:0 0 8px ${hasPc ? "#00ff99" : "#ff4466"};
        flex-shrink:0;
        animation:${hasPc ? "arcDotPulse 1.5s ease-in-out infinite" : "none"};
      }
      @keyframes arcDotPulse{0%,100%{opacity:1}50%{opacity:.4}}
      .arc-pc-name{color:${hasPc ? "#00ff99" : "#ff8899"};flex:1;}
      .arc-pc-hint{font-size:10px;color:rgba(255,255,255,.3);}

      /* DAILY CHALLENGE */
      .arc-daily {
        margin:12px 20px 0;
        background:linear-gradient(135deg,rgba(255,200,0,.08),rgba(255,100,0,.05));
        border:1px solid rgba(255,200,0,.25);
        border-radius:14px;padding:14px 16px;
      }
      .arc-daily-title {
        font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;
        letter-spacing:2px;text-transform:uppercase;color:rgba(255,200,0,.6);
        margin-bottom:6px;
      }
      .arc-daily-desc{font-size:13px;font-weight:700;color:#ffd966;margin-bottom:4px;}
      .arc-daily-reward{font-size:11px;color:rgba(255,200,0,.5);}

      /* SECTION */
      .arc-section {padding:16px 20px 0;}
      .arc-section-title {
        font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;
        letter-spacing:3px;text-transform:uppercase;
        color:rgba(204,68,255,.5);
        margin-bottom:12px;padding-bottom:8px;
        border-bottom:1px solid rgba(204,68,255,.12);
      }

      /* GAME CARDS */
      .arc-grid {display:flex;flex-direction:column;gap:10px;}
      .arc-card {
        background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);
        border-radius:14px;padding:14px 16px;
        display:flex;align-items:center;gap:14px;
        cursor:pointer;transition:all .2s;position:relative;overflow:hidden;
      }
      .arc-card::before{
        content:'';position:absolute;top:0;left:0;right:0;height:3px;
        background:var(--gc);opacity:.7;
      }
      .arc-card:hover:not(.arc-card-locked){
        transform:translateY(-2px);
        border-color:rgba(255,255,255,.18);
        box-shadow:0 8px 24px rgba(0,0,0,.4);
      }
      .arc-card:active:not(.arc-card-locked){transform:scale(.98);}
      .arc-card-locked{opacity:.45;cursor:not-allowed;}

      .arc-card-icon{font-size:30px;flex-shrink:0;width:44px;text-align:center;}
      .arc-card-info{flex:1;min-width:0;}
      .arc-card-name{font-size:15px;font-weight:700;color:#e2e8f0;margin-bottom:3px;}
      .arc-card-desc{font-size:11px;color:rgba(200,200,255,.45);line-height:1.4;}
      .arc-card-right{text-align:right;flex-shrink:0;}
      .arc-card-cost{
        font-family:'Share Tech Mono',monospace;
        font-size:13px;font-weight:700;color:#ffd966;
      }
      .arc-card-diff {
        font-size:9px;font-weight:800;padding:2px 8px;border-radius:4px;
        text-transform:uppercase;letter-spacing:.5px;
        margin-top:4px;display:inline-block;
      }
      .diff-easy{background:rgba(74,222,128,.15);color:#4ade80;}
      .diff-medium{background:rgba(251,191,36,.15);color:#fbbf24;}
      .diff-hard{background:rgba(248,113,113,.15);color:#f87171;}

      .arc-lock-reason{
        font-size:10px;color:rgba(255,68,68,.7);margin-top:3px;
        font-weight:700;
      }

      .arc-mb-section {
        margin:12px 20px 0;font-size:10px;
        color:rgba(200,200,255,.25);letter-spacing:.5px;text-align:center;
      }
    </style>

    <div id="arc-root">
      <div class="arc-header">
        <div class="arc-header-row">
          <div class="arc-logo">🎮 ARCADE OVERDRIVE</div>
          <div class="arc-balance">💰 ${balance} нікусів</div>
          <button class="arc-back" onclick="mainMenu()">← Назад</button>
        </div>
        
        <!-- PC статус -->
        <div class="arc-pc-bar">
          <div class="arc-pc-dot"></div>
          <div class="arc-pc-name">
            ${hasPc ? `ПК активний: ${mbName} (Tier ${tier})` : "ПК не готовий або немає процесора"}
          </div>
          <div class="arc-pc-hint">
            ${hasPc ? "Всі ігри рівня ≤ Tier "+tier+" доступні" : "Базові ігри доступні без ПК"}
          </div>
          <button onclick="Price1488_openComputer()" style="
            background:rgba(0,255,153,.08);border:1px solid rgba(0,255,153,.2);
            color:#00ff99;border-radius:6px;padding:5px 12px;font-size:11px;
            font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;
          ">🖥 ПК</button>
        </div>
      </div>

      <!-- ЩОДЕННИЙ ЧЕЛЕНДЖ -->
      <div class="arc-section">
        <div class="arc-daily" id="arc-daily-block">
          <div class="arc-daily-title">🔥 Щоденний Челендж</div>
          <div class="arc-daily-desc">${todayChallenge.desc}</div>
          <div class="arc-daily-reward">🎁 Нагорода: ${todayChallenge.reward}</div>
          ${todayChallenge.done
            ? `<div style="margin-top:6px;font-size:10px;font-weight:700;color:#4ade80;">✅ Виконано сьогодні!</div>`
            : `<button onclick="arc_startDailyChallenge()" style="
                margin-top:8px;padding:8px 18px;
                background:linear-gradient(90deg,#ff9900,#ffd200);
                border:none;border-radius:8px;color:#111;
                font-family:'DM Sans',sans-serif;font-size:12px;font-weight:800;
                cursor:pointer;transition:.2s;
              " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">
                ▶ Почати
              </button>`
          }
        </div>
      </div>

      <!-- ІГРИ -->
      <div class="arc-section" style="margin-top:8px;">
        <div class="arc-section-title">🕹 Ігри</div>
        <div class="arc-grid">`;

  GAMES.forEach(g => {
    const reqTier = g.tier;
    const effectiveTier = hasPc ? tier : 0; // без ПК — тільки tier 0
    const locked = reqTier > effectiveTier;
    const canAfford = balance >= g.cost;
    const isLocked = locked || (!canAfford && !locked);
    const lockedReason = locked
      ? (g.tier === 0 ? "" : `Потрібна плата Tier ${g.tier}+`)
      : (!canAfford ? `Недостатньо нікусів (потрібно ${g.cost})` : "");

    const icon = g.name.split(" ")[0];
    const nameNoIcon = g.name.replace(icon, "").trim();

    const clickHandler = (locked || !canAfford)
      ? `onclick="arc_lockedClick('${locked ? "mb" : "money"}', '${g.tier}', ${g.cost})"`
      : `onclick="${g.action}"`;

    html += `
      <div class="arc-card ${locked || !canAfford ? "arc-card-locked" : ""}"
        style="--gc:${g.color};" ${clickHandler}>
        <div class="arc-card-icon">${icon}</div>
        <div class="arc-card-info">
          <div class="arc-card-name">${nameNoIcon}</div>
          <div class="arc-card-desc">${g.desc}</div>
          ${lockedReason ? `<div class="arc-lock-reason">🔒 ${lockedReason}</div>` : ""}
        </div>
        <div class="arc-card-right">
          <div class="arc-card-cost">${g.cost} 💰</div>
          <div class="arc-card-diff diff-${g.difficulty}">
            ${g.difficulty === "easy" ? "Легка" : g.difficulty === "medium" ? "Середня" : "Складна"}
          </div>
          ${reqTier > 0 ? `<div style="font-size:9px;color:rgba(200,200,255,.3);margin-top:4px;">Tier ${reqTier}+</div>` : ""}
        </div>
      </div>`;
  });

  html += `
        </div>
      </div>

      <div class="arc-mb-section">
        💡 Tier 1 = MFNP 1.0 · Tier 2 = MFNP 1.0+ · Tier 3 = MFNP 1.1 · Tier 4 = MFNP 1.2
      </div>
    </div>`;

  document.getElementById("app").innerHTML = html;
}

function arc_lockedClick(reason, tier, cost) {
  if (reason === "mb") {
    arc_toast(`🔒 Потрібна материнська плата Tier ${tier}+ та повний ПК!`);
  } else {
    arc_toast(`💰 Недостатньо нікусів! Потрібно ${cost}.`);
  }
}

function arc_toast(msg) {
  let t = document.getElementById("arc-toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "arc-toast";
    t.style.cssText = `
      position:fixed;bottom:24px;left:50%;
      transform:translateX(-50%) translateY(20px);
      background:rgba(13,8,32,.97);color:#e0d8ff;
      border:1px solid rgba(204,68,255,.4);border-radius:40px;
      padding:11px 26px;font-family:'DM Sans',sans-serif;
      font-size:14px;font-weight:700;z-index:99999;
      opacity:0;pointer-events:none;
      transition:all .3s cubic-bezier(.34,1.56,.64,1);
      white-space:nowrap;box-shadow:0 8px 30px rgba(0,0,0,.7);
    `;
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = "1";
  t.style.transform = "translateX(-50%) translateY(0)";
  clearTimeout(t._t);
  t._t = setTimeout(() => {
    t.style.opacity = "0";
    t.style.transform = "translateX(-50%) translateY(20px)";
  }, 3000);
}

// ═══════════════════════════════════════════════════════════════════
// ЩОДЕННИЙ ЧЕЛЕНДЖ
// ═══════════════════════════════════════════════════════════════════

const ARC_DAILY_CHALLENGES = [
  { desc: "Зіграй у Сапера та відкрий хоча б 5 клітинок", reward: "20 нікусів", game: "saper", target: 5 },
  { desc: "Набери 30+ очок у Динозаврику", reward: "Міжсезонний кейс", game: "dino", target: 30 },
  { desc: "Склади вежу 5+ поверхів у Stack Tower", reward: "30 нікусів", game: "stack", target: 5 },
  { desc: "Зроби реакцію < 400ms у Reaction Test (1 раз)", reward: "25 нікусів", game: "reaction", target: 1 },
  { desc: "Знайди 6 пар у Memory Cards (будь-яка кількість помилок)", reward: "ArcadeOverdrive кейс", game: "memory", target: 6 },
  { desc: "Пролети 8+ секцій у Flappy Void", reward: "30 нікусів", game: "flappy", target: 8 },
  { desc: "Пройди 1 зону у Zone Escape", reward: "25 нікусів", game: "runner", target: 1 },
];

function arc_getDailyChallenge() {
  const day = Math.floor(Date.now() / 86400000);
  const idx = day % ARC_DAILY_CHALLENGES.length;
  const ch = ARC_DAILY_CHALLENGES[idx];
  const doneKey = (currentUser || "guest") + "_arcDaily_" + day;
  const done = localStorage.getItem(doneKey) === "1";
  return { ...ch, done, doneKey };
}

function arc_completeDailyChallenge() {
  const ch = arc_getDailyChallenge();
  if (ch.done) return;
  localStorage.setItem(ch.doneKey, "1");
  balance += 80;
  addCase("arcadeover");
  saveData();
  arc_toast("🎉 Щоденний челендж виконано! +80 нікусів + кейс!");
}

function arc_startDailyChallenge() {
  const ch = arc_getDailyChallenge();
  arc_toast(`▶ Стартуємо: ${ch.desc}`);
  setTimeout(() => {
    const gameMap = {
      saper: "startSaperPaid",
      dino: "startDinoPaid",
      stack: "arc_startStack",
      reaction: "arc_startReaction",
      memory: "arc_startMemory",
      flappy: "arc_startFlappy",
      runner: "arc_startRunner",
    };
    const fn = gameMap[ch.game];
    if (fn && typeof window[fn] === "function") window[fn]();
    else arcadeMenu();
  }, 800);
}

// ═══════════════════════════════════════════════════════════════════
// [1] STACK TOWER: PRECISION CORE
// ═══════════════════════════════════════════════════════════════════

function arc_startStack() {
  if (balance < 30) { arc_toast("❌ Потрібно 30 нікусів!"); return; }
  balance -= 30; saveData();

  let level = 0;
  let floors = 0;
  let baseW = 280;
  let blockW = baseW;
  let blockX = 0;
  let dir = 1;
  let speed = 2.5;
  let stackedBlocks = []; // { x, w }
  let goldMode = false;
  let goldTimer = 0;
  let perfectCombo = 0;
  let running = true;
  let animId;
  const BLOCK_H = 22;
  const CANVAS_H = 500;
  const CANVAS_W = 340;
  const GOLD_THRESHOLD = 5;

  document.getElementById("app").innerHTML = `
    <style>
      #stack-wrap {
        font-family:'Orbitron',sans-serif;
        background:linear-gradient(160deg,#0d0820,#050010);
        min-height:100vh;display:flex;flex-direction:column;align-items:center;
        padding:16px;box-sizing:border-box;color:#e0d8ff;
      }
      #stack-canvas{border-radius:12px;display:block;cursor:pointer;}
      .stack-hud{display:flex;gap:20px;margin:10px 0;flex-wrap:wrap;justify-content:center;}
      .stack-hud-item{text-align:center;}
      .stack-hud-val{font-size:22px;font-weight:700;color:#ffd966;}
      .stack-hud-lbl{font-size:9px;color:rgba(255,255,255,.35);letter-spacing:1px;text-transform:uppercase;}
      #stack-msg{font-size:13px;font-weight:700;min-height:20px;margin:4px 0;color:#4ade80;letter-spacing:1px;}
    </style>
    <div id="stack-wrap">
      <div style="font-family:'Orbitron',sans-serif;font-size:14px;font-weight:700;color:rgba(204,68,255,.7);letter-spacing:3px;margin-bottom:8px;">STACK TOWER</div>
      <div class="stack-hud">
        <div class="stack-hud-item"><div class="stack-hud-val" id="st-floors">0</div><div class="stack-hud-lbl">Поверхи</div></div>
        <div class="stack-hud-item"><div class="stack-hud-val" id="st-combo">0</div><div class="stack-hud-lbl">Combo</div></div>
        <div class="stack-hud-item"><div class="stack-hud-val" id="st-gold">-</div><div class="stack-hud-lbl">Gold Mode</div></div>
      </div>
      <div id="stack-msg">Натисни щоб зупинити блок</div>
      <canvas id="stack-canvas" width="${CANVAS_W}" height="${CANVAS_H}"></canvas>
      <button onclick="if(running){running=false;cancelAnimationFrame(animId);}arcadeMenu()" style="
        margin-top:14px;padding:10px 22px;background:rgba(255,255,255,.07);
        border:1px solid rgba(255,255,255,.15);color:#aaa;border-radius:10px;
        font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;
      ">← Вийти</button>
    </div>
  `;

  const canvas = document.getElementById("stack-canvas");
  const ctx = canvas.getContext("2d");

  // Base block
  stackedBlocks.push({ x: (CANVAS_W - baseW) / 2, w: baseW });

  function getBlockY(floorIdx) {
    return CANVAS_H - BLOCK_H * (floorIdx + 1) - 10;
  }

  function drawScene() {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // BG gradient
    const bg = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
    bg.addColorStop(0, goldMode ? "#1a1000" : "#0d0820");
    bg.addColorStop(1, goldMode ? "#050500" : "#050010");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Grid lines
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;
    for (let i = 0; i < CANVAS_W; i += 40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, CANVAS_H); ctx.stroke();
    }

    // Stacked blocks
    stackedBlocks.forEach((b, i) => {
      const y = getBlockY(i);
      const prog = i / stackedBlocks.length;
      const clr = goldMode
        ? `hsl(${40 + i * 5},100%,${50 + i * 2}%)`
        : `hsl(${200 + i * 8},70%,${45 + prog * 20}%)`;
      ctx.fillStyle = clr;
      ctx.shadowColor = goldMode ? "#ffd700" : clr;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.roundRect(b.x, y, b.w, BLOCK_H - 2, 4);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Moving block
    if (running) {
      const movY = getBlockY(stackedBlocks.length);
      const movClr = goldMode ? "#ffd700" : "#00d4ff";
      ctx.fillStyle = movClr;
      ctx.shadowColor = movClr;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.roundRect(blockX, movY, blockW, BLOCK_H - 2, 4);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Gold mode glow overlay
    if (goldMode) {
      ctx.fillStyle = "rgba(255,200,0,0.04)";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    }
  }

  function gameLoop() {
    if (!running) return;
    blockX += dir * speed;
    const maxX = CANVAS_W - blockW;
    if (blockX >= maxX) { blockX = maxX; dir = -1; }
    if (blockX <= 0)    { blockX = 0;    dir = 1;  }
    drawScene();
    animId = requestAnimationFrame(gameLoop);
  }

  function dropBlock() {
    if (!running) return;
    const prev = stackedBlocks[stackedBlocks.length - 1];
    // Calculate overlap
    const overlapLeft  = Math.max(blockX, prev.x);
    const overlapRight = Math.min(blockX + blockW, prev.x + prev.w);
    const overlap = overlapRight - overlapLeft;

    if (overlap <= 0) {
      // Missed!
      running = false;
      cancelAnimationFrame(animId);
      const msg = document.getElementById("stack-msg");
      if (msg) msg.style.color = "#f87171";
      if (msg) msg.textContent = "💥 Промахнувся!";
      setTimeout(() => endStack(), 1200);
      return;
    }

    const perfect = Math.abs(overlap - prev.w) < 5;

    if (goldMode) {
      // Gold mode: no trimming
      goldTimer--;
      stackedBlocks.push({ x: prev.x, w: prev.w });
      if (goldTimer <= 0) goldMode = false;
    } else if (perfect) {
      perfectCombo++;
      stackedBlocks.push({ x: prev.x, w: prev.w });
      if (perfectCombo >= GOLD_THRESHOLD) {
        goldMode = true;
        goldTimer = 8;
        perfectCombo = 0;
        const msg = document.getElementById("stack-msg");
        if (msg) msg.style.color = "#ffd700";
        if (msg) msg.textContent = "✨ GOLD MODE! x2 очки";
      } else {
        const msg = document.getElementById("stack-msg");
        if (msg) msg.style.color = "#4ade80";
        if (msg) msg.textContent = `PERFECT! Combo ×${perfectCombo}`;
      }
    } else {
      perfectCombo = 0;
      blockX = overlapLeft;
      blockW = overlap;
      stackedBlocks.push({ x: overlapLeft, w: overlap });
      const msg = document.getElementById("stack-msg");
      if (msg) msg.style.color = "#60a5fa";
      if (msg) msg.textContent = `+${Math.round(overlap)}px залишилось`;
    }

    floors++;
    speed = Math.min(2.5 + floors * 0.12, 9);
    blockX = -blockW;

    const flEl = document.getElementById("st-floors");
    const coEl = document.getElementById("st-combo");
    const glEl = document.getElementById("st-gold");
    if (flEl) flEl.textContent = floors;
    if (coEl) coEl.textContent = perfectCombo;
    if (glEl) glEl.textContent = goldMode ? `${goldTimer}🔥` : "-";

    // Auto scroll view (shift canvas content down)
    if (floors > 18) {
      stackedBlocks = stackedBlocks.slice(-18);
    }
  }

  canvas.addEventListener("click", dropBlock);
  document.addEventListener("keydown", function onKey(e) {
    if (e.code === "Space") { e.preventDefault(); dropBlock(); }
    if (!running) document.removeEventListener("keydown", onKey);
  });

  function endStack() {
    const score = floors * 10 * (goldMode ? 2 : 1);
    const rank = arc_getRank(floors, [1, 5, 10, 15, 20, 30, 50]);
    const reward = arc_giveReward(score, 1);
    const ch = arc_getDailyChallenge();
    if (!ch.done && ch.game === "stack" && floors >= ch.target) {
        arc_completeDailyChallenge();
}
    arc_showResult("🧱 STACK TOWER", score, rank, reward);
  }

  gameLoop();
}

// ═══════════════════════════════════════════════════════════════════
// [2] REACTION TEST: NEURAL MODE
// ═══════════════════════════════════════════════════════════════════

function arc_startReaction() {
  if (balance < 40) { arc_toast("❌ Потрібно 40 нікусів!"); return; }
  balance -= 40; saveData();

  const ROUNDS = 10;
  let round = 0;
  let score = 0;
  let waiting = false;
  let expectClick = false;
  let fakeSignal = false;
  let startMs = 0;
  let misses = 0;
  let running = true;
  let timerH;

  const SIGNAL_TYPES = [
    { type: "green",  label: "🟢 КЛІКАЙ!",  action: "click",  color: "#4ade80" },
    { type: "red",    label: "🔴 СТОП!",    action: "stop",   color: "#f87171" },
    { type: "blue",   label: "🔵 ДВІЧІ!",   action: "double", color: "#60a5fa" },
    { type: "yellow", label: "🟡 ЧЕКАЙ...", action: "wait",   color: "#fbbf24" },
  ];

  document.getElementById("app").innerHTML = `
    <style>
      #react-wrap {
        font-family:'Orbitron',sans-serif;
        background:radial-gradient(ellipse at 50% 50%,#0d0820,#030008);
        min-height:100vh;display:flex;flex-direction:column;
        align-items:center;justify-content:center;
        padding:20px;box-sizing:border-box;color:#e0d8ff;text-align:center;
      }
      #react-signal {
        width:200px;height:200px;border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        font-size:60px;cursor:pointer;
        transition:all .1s;
        box-shadow:0 0 60px rgba(255,255,255,.1);
        margin:24px auto;
        user-select:none;
      }
      #react-signal:active{transform:scale(.92);}
      #react-status{font-size:16px;font-weight:700;letter-spacing:1px;min-height:24px;margin:8px 0;}
      #react-ms{font-size:40px;font-weight:900;color:#ffd966;font-family:'Share Tech Mono',monospace;min-height:50px;}
      .react-bar{
        width:260px;height:8px;background:rgba(255,255,255,.07);
        border-radius:99px;overflow:hidden;margin:8px auto;
      }
      .react-bar-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,#cc44ff,#00d4ff);transition:width .3s;}
    </style>
    <div id="react-wrap">
      <div style="font-size:10px;letter-spacing:4px;color:rgba(255,255,255,.3);text-transform:uppercase;">Neural Mode</div>
      <div style="font-size:22px;font-weight:700;color:#cc44ff;margin:4px 0;">⚡ Reaction Test</div>
      <div class="react-bar"><div class="react-bar-fill" id="react-prog" style="width:0%"></div></div>
      <div style="font-size:11px;color:rgba(255,255,255,.3);">Раунд <span id="react-round">0</span> / ${ROUNDS}</div>
      <div id="react-ms">--</div>
      <div id="react-signal" style="background:rgba(255,255,255,.05);border:3px solid rgba(255,255,255,.1);">⏳</div>
      <div id="react-status">Готуйся...</div>
      <div style="font-size:12px;color:rgba(255,255,255,.25);margin-top:16px;">
        🟢 Клікай | 🔴 Стоп | 🔵 Два кліки | 🟡 Затримка 1с
      </div>
      <div style="margin-top:10px;font-size:13px;font-weight:700;color:#ffd966;">
        Очки: <span id="react-score">0</span>
      </div>
      <button onclick="running=false;clearTimeout(timerH);arcadeMenu()" style="
        margin-top:16px;padding:9px 20px;background:rgba(255,255,255,.06);
        border:1px solid rgba(255,255,255,.12);color:#888;border-radius:8px;
        font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;
      ">← Вийти</button>
    </div>
  `;

  let clickCount = 0;
  let currentSignal = null;

  const sigEl    = document.getElementById("react-signal");
  const statusEl = document.getElementById("react-status");
  const msEl     = document.getElementById("react-ms");
  const scoreEl  = document.getElementById("react-score");
  const roundEl  = document.getElementById("react-round");
  const progEl   = document.getElementById("react-prog");

  sigEl.addEventListener("click", handleClick);

  function handleClick() {
    if (!running || !expectClick) {
      if (currentSignal && currentSignal.action === "stop") {
        // Clicked on red — wrong!
        misses++;
        score = Math.max(0, score - 30);
        statusEl.textContent = "❌ СТОП означає не клікати!";
        statusEl.style.color = "#f87171";
        if (scoreEl) scoreEl.textContent = score;
        expectClick = false;
        setTimeout(nextRound, 800);
      }
      return;
    }

    const elapsed = Date.now() - startMs;

    if (currentSignal.action === "double") {
      clickCount++;
      if (clickCount < 2) {
        statusEl.textContent = "🔵 Ще раз!";
        return;
      }
    }

    expectClick = false;
    clickCount  = 0;
    clearTimeout(timerH);

    const pts = Math.max(10, Math.round(500 - elapsed * 0.5));
    score += pts;
    if (scoreEl) scoreEl.textContent = score;

    msEl.textContent = elapsed + " ms";
    msEl.style.color = elapsed < 200 ? "#4ade80" : elapsed < 350 ? "#fbbf24" : "#f87171";
    statusEl.style.color = "#4ade80";
    statusEl.textContent = elapsed < 200 ? "⚡ ШВИДКО!" : elapsed < 350 ? "✅ Добре" : "⏱ Повільно";

    setTimeout(nextRound, 700);
  }

  function nextRound() {
    if (!running) return;
    round++;
    if (round > ROUNDS) { endReaction(); return; }
    if (roundEl) roundEl.textContent = round;
    if (progEl)  progEl.style.width  = (round / ROUNDS * 100) + "%";

    msEl.textContent    = "--";
    statusEl.textContent = "...";
    sigEl.style.background = "rgba(255,255,255,.05)";
    sigEl.style.borderColor = "rgba(255,255,255,.1)";
    sigEl.style.boxShadow   = "0 0 60px rgba(255,255,255,.1)";
    sigEl.textContent = "⏳";
    expectClick = false;
    clickCount  = 0;

    // Random delay
    const delay = 800 + Math.random() * 2000;
    timerH = setTimeout(showSignal, delay);
  }

  function showSignal() {
    if (!running) return;
    const sig = SIGNAL_TYPES[Math.floor(Math.random() * SIGNAL_TYPES.length)];
    currentSignal = sig;

    sigEl.style.background  = sig.color + "22";
    sigEl.style.borderColor = sig.color;
    sigEl.style.boxShadow   = `0 0 40px ${sig.color}88`;
    sigEl.textContent = sig.label.split(" ")[0];
    statusEl.style.color    = sig.color;
    statusEl.textContent    = sig.label;
    startMs = Date.now();

    if (sig.action === "stop") {
      // Don't expect click; wait to advance
      expectClick = false;
      timerH = setTimeout(() => {
        // Success — didn't click on red
        const pts = 80;
        score += pts;
        if (scoreEl) scoreEl.textContent = score;
        statusEl.textContent = "✅ Стримався!";
        statusEl.style.color = "#4ade80";
        setTimeout(nextRound, 600);
      }, 1200);
    } else if (sig.action === "wait") {
      // Yellow — must wait 1s then click
      expectClick = false;
      timerH = setTimeout(() => {
        expectClick = true;
        statusEl.textContent = "🟡 ТЕПЕР КЛІКАЙ!";
        statusEl.style.color = "#fbbf24";
        startMs = Date.now();
        timerH = setTimeout(() => {
          if (expectClick) {
            misses++;
            statusEl.textContent = "❌ Пропустив!";
            statusEl.style.color = "#f87171";
            expectClick = false;
            setTimeout(nextRound, 600);
          }
        }, 1500);
      }, 1000);
    } else {
      expectClick = true;
      timerH = setTimeout(() => {
        if (expectClick) {
          misses++;
          statusEl.textContent = "❌ Пропустив!";
          statusEl.style.color = "#f87171";
          expectClick = false;
          setTimeout(nextRound, 600);
        }
      }, 1500);
    }
  }

  function endReaction() {
    running = false;
    const rank = arc_getRank(score, [0, 200, 400, 600, 800, 1000, 1200]);
    const reward = arc_giveReward(score, 1.2);
    const ch = arc_getDailyChallenge();
    if (!ch.done && ch.game === "stack" && floors >= ch.target) {
        arc_completeDailyChallenge();
}
    arc_showResult("⚡ REACTION TEST", score, rank, reward);
  }

  // Start
  setTimeout(nextRound, 500);
}

// ═══════════════════════════════════════════════════════════════════
// [3] MEMORY CARDS: MIND HACK
// ═══════════════════════════════════════════════════════════════════

function arc_startMemory() {
  if (balance < 50) { arc_toast("❌ Потрібно 50 нікусів!"); return; }
  balance -= 50; saveData();

  const GRID = 4; // 4x4 = 8 пар
  const EMOJIS = ["🔥","⚡","🎮","💎","🌿","🚀","🎯","🏆","🎪","🌊","🎸","💫"];
  const pairs = EMOJIS.slice(0, (GRID * GRID) / 2);
  let cards = [...pairs, ...pairs].sort(() => Math.random() - .5);
  let revealed   = new Array(cards.length).fill(false);
  let matched    = new Array(cards.length).fill(false);
  let flipped    = [];
  let moves      = 0;
  let comboPairs = 0;
  let lastPairTime = 0;
  let score      = 0;
  let locked     = false;
  let startTime  = Date.now();

  function render() {
    document.getElementById("app").innerHTML = `
      <style>
        #mem-wrap {
          font-family:'Orbitron',sans-serif;
          background:radial-gradient(ellipse at 50% 0%,#0a0820,#030010);
          min-height:100vh;padding:16px;box-sizing:border-box;
          display:flex;flex-direction:column;align-items:center;
          color:#e0d8ff;
        }
        .mem-grid {
          display:grid;
          grid-template-columns:repeat(${GRID},1fr);
          gap:10px;
          max-width:360px;width:100%;margin:16px 0;
        }
        .mem-card {
          aspect-ratio:1;border-radius:12px;
          display:flex;align-items:center;justify-content:center;
          font-size:30px;cursor:pointer;
          border:2px solid rgba(255,255,255,.1);
          transition:transform .2s,box-shadow .2s;
          user-select:none;
          background:rgba(255,255,255,.04);
        }
        .mem-card:hover:not(.mem-matched):not(.mem-locked){transform:scale(1.05);}
        .mem-card.mem-flip{
          background:linear-gradient(135deg,rgba(204,68,255,.15),rgba(0,212,255,.1));
          border-color:#cc44ff;
          box-shadow:0 0 18px rgba(204,68,255,.4);
        }
        .mem-card.mem-matched{
          background:linear-gradient(135deg,rgba(74,222,128,.15),rgba(0,212,255,.08));
          border-color:#4ade80;
          box-shadow:0 0 16px rgba(74,222,128,.3);
          animation:memMatch .4s ease;
        }
        @keyframes memMatch{0%{transform:scale(1.15)}50%{transform:scale(.95)}100%{transform:scale(1)}}
        .mem-hud{display:flex;gap:20px;margin-bottom:8px;flex-wrap:wrap;justify-content:center;}
        .mem-hud-v{font-size:20px;font-weight:700;color:#ffd966;text-align:center;}
        .mem-hud-l{font-size:9px;color:rgba(255,255,255,.3);letter-spacing:1px;text-transform:uppercase;}
        #mem-combo{font-size:13px;font-weight:700;min-height:18px;color:#cc44ff;letter-spacing:1px;}
      </style>
      <div id="mem-wrap">
        <div style="font-size:9px;letter-spacing:4px;color:rgba(204,68,255,.5);margin-bottom:4px;">MIND HACK</div>
        <div style="font-size:18px;font-weight:700;color:#cc44ff;">🧠 Memory Cards</div>
        <div class="mem-hud">
          <div><div class="mem-hud-v" id="mem-score">${score}</div><div class="mem-hud-l">Очки</div></div>
          <div><div class="mem-hud-v" id="mem-moves">${moves}</div><div class="mem-hud-l">Ходи</div></div>
          <div><div class="mem-hud-v" id="mem-found">${matched.filter(Boolean).length/2}</div><div class="mem-hud-l">Пари</div></div>
        </div>
        <div id="mem-combo"></div>
        <div class="mem-grid">
          ${cards.map((c, i) => {
            const isRevealed = revealed[i] || matched[i];
            return `<div class="mem-card ${isRevealed ? (matched[i] ? "mem-matched" : "mem-flip") : ""}"
              data-idx="${i}" onclick="arc_memFlip(${i})">
              ${isRevealed ? c : ""}
            </div>`;
          }).join("")}
        </div>
        <button onclick="arcadeMenu()" style="
          padding:9px 20px;background:rgba(255,255,255,.06);
          border:1px solid rgba(255,255,255,.12);color:#888;border-radius:8px;
          font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;
        ">← Вийти</button>
      </div>
    `;
  }

  window.arc_memFlip = function(idx) {
    if (locked || revealed[idx] || matched[idx]) return;
    revealed[idx] = true;
    flipped.push(idx);
    render();
    if (flipped.length === 2) {
      moves++;
      locked = true;
      const [a, b] = flipped;
      if (cards[a] === cards[b]) {
        // Match!
        const now = Date.now();
        const timeDiff = now - lastPairTime;
        if (lastPairTime && timeDiff < 3000) {
          comboPairs++;
          const bonus = comboPairs * 50;
          score += bonus;
          const comboEl = document.getElementById("mem-combo");
          if (comboEl) { comboEl.textContent = `⚡ Combo ×${comboPairs} +${bonus}!`; }
        } else {
          comboPairs = 0;
        }
        lastPairTime = now;
        matched[a] = matched[b] = true;
        score += 100;
        revealed[a] = revealed[b] = false;
        flipped = [];
        locked = false;
        render();
        // Check win
        if (matched.every(Boolean)) {
          setTimeout(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const bonus = Math.max(0, 300 - elapsed * 2);
            score += bonus;
            const rank = arc_getRank(score, [200, 400, 600, 800, 1000, 1200, 1500]);
            const reward = arc_giveReward(score, 1.1);
            
     const ch = arc_getDailyChallenge();
    if (!ch.done && ch.game === "stack" && floors >= ch.target) {
        arc_completeDailyChallenge();
}
            arc_showResult("🧠 MEMORY CARDS", score, rank, reward);
          }, 400);
        }
      } else {
        // No match
        comboPairs = 0;
        setTimeout(() => {
          revealed[a] = revealed[b] = false;
          flipped = [];
          locked = false;
          render();
        }, 900);
      }
    }
  };

  render();
}

// ═══════════════════════════════════════════════════════════════════
// [4] FLAPPY VOID SHIFT
// ═══════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════
// ПАТЧ 1: Flappy Void — відлік 3-2-1 перед стартом
// ЗАМІНИТИ функцію arc_startFlappy() повністю
// ═══════════════════════════════════════════════════════════════════

function arc_startFlappy() {
  if (balance < 70) { arc_toast("❌ Потрібно 70 нікусів!"); return; }
  balance -= 70; saveData();

  document.getElementById("app").innerHTML = `
    <style>
      #flap-wrap{font-family:'Orbitron',sans-serif;background:#050010;min-height:100vh;
        display:flex;flex-direction:column;align-items:center;padding:16px;box-sizing:border-box;}
      #flap-canvas{border-radius:12px;border:2px solid rgba(204,68,255,.3);cursor:pointer;display:block;}
      #flap-hud{display:flex;gap:20px;margin:8px 0;color:#e0d8ff;font-size:13px;font-weight:700;}
      #flap-countdown {
        position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
        font-size:clamp(80px,20vw,120px);font-weight:900;
        font-family:'Orbitron',sans-serif;
        color:#fff;text-shadow:0 0 40px #cc44ff,0 0 80px #cc44ff88;
        animation:flapPop .5s cubic-bezier(.34,1.56,.64,1);
        pointer-events:none;z-index:10;
      }
      @keyframes flapPop{
        from{transform:translate(-50%,-50%) scale(2);opacity:0;}
        to{transform:translate(-50%,-50%) scale(1);opacity:1;}
      }
    </style>
    <div id="flap-wrap">
      <div style="font-size:9px;letter-spacing:4px;color:rgba(204,68,255,.5);margin-bottom:4px;">VOID SHIFT</div>
      <div style="font-size:16px;font-weight:700;color:#f472b6;margin-bottom:8px;">🐦 Flappy Void</div>
      <div id="flap-hud">
        <span>Секції: <span id="flap-score">0</span></span>
        <span>Рекорд: <span id="flap-best">${parseInt(localStorage.getItem((currentUser||"g")+"_flapBest")||"0")}</span></span>
      </div>
      <div style="position:relative;display:inline-block;">
        <canvas id="flap-canvas" width="340" height="480"></canvas>
        <div id="flap-countdown" style="display:none;"></div>
      </div>
      <button onclick="flapStop();arcadeMenu()" style="
        margin-top:12px;padding:9px 20px;background:rgba(255,255,255,.06);
        border:1px solid rgba(255,255,255,.12);color:#888;border-radius:8px;
        font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;
      ">← Вийти</button>
    </div>
  `;

  const canvas = document.getElementById("flap-canvas");
  const ctx = canvas.getContext("2d");
  const W = 340, H = 480;
  const PIPE_W = 48, GAP = 140, PIPE_SPEED = 3;
  let bird = { x: 80, y: H/2, vy: 0, r: 14 };
  let gravity = 0.32;
  let flipGravity = false;
  let pipes = [];
  let portals = [];
  let sections = 0;
  let frame = 0;
  let alive = true;
  let rafId;
  let framesSincePipe = 0;
  const PIPE_INTERVAL = 80;
  let gameStarted = false; // ← прапор: чи пройшов відлік

  // ── Малюємо статичну заставку поки відлік ──
  function drawStatic() {
    ctx.clearRect(0,0,W,H);
    const bg = ctx.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,"#050010"); bg.addColorStop(1,"#1a0010");
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
    // Зірки
    ctx.fillStyle="rgba(255,255,255,.4)";
    for(let s=0;s<40;s++){
      const sx=(s*73)%W, sy=(s*137)%H;
      ctx.fillRect(sx,sy,1.5,1.5);
    }
    // Пташка
    const pc = "#cc44ff";
    ctx.beginPath(); ctx.arc(bird.x,bird.y,bird.r,0,Math.PI*2);
    ctx.fillStyle=pc+"44"; ctx.fill();
    ctx.strokeStyle=pc; ctx.lineWidth=2.5;
    ctx.shadowColor=pc; ctx.shadowBlur=20; ctx.stroke(); ctx.shadowBlur=0;
    ctx.fillStyle=pc; ctx.font="bold 14px Arial";
    ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText("🐦",bird.x,bird.y);
  }

  // ── Відлік 3-2-1-Старт ──
  function startCountdown() {
    drawStatic();
    const countEl = document.getElementById("flap-countdown");
    if (!countEl) { startActualGame(); return; }
    countEl.style.display = "block";

    const steps = ["3","2","1","GO!"];
    let i = 0;

    function tick() {
      if (i >= steps.length) {
        countEl.style.display = "none";
        startActualGame();
        return;
      }
      countEl.textContent = steps[i];
      // Перезапускаємо анімацію
      countEl.style.animation = "none";
      countEl.offsetHeight; // reflow
      countEl.style.animation = "flapPop .5s cubic-bezier(.34,1.56,.64,1)";
      i++;
      setTimeout(tick, 800);
    }
    tick();
  }

  // ── Справжній запуск гри ──
  function startActualGame() {
    gameStarted = true;
    alive = true;
    sections = 0;
    frame = 0;
    framesSincePipe = 0;
    bird = { x: 80, y: H/2, vy: 0, r: 14 };

    // Обробники
    canvas.addEventListener("click", jump);
    canvas.addEventListener("touchstart", e => { e.preventDefault(); jump(); }, { passive: false });
    document.addEventListener("keydown", function flapKey(e) {
      if (e.code === "Space") { e.preventDefault(); jump(); }
      if (!alive) document.removeEventListener("keydown", flapKey);
    });

    loop();
  }

  function jump() {
    if (!gameStarted || !alive) { if (!alive) { restart(); } return; }
    bird.vy = flipGravity ? 5 : -5.5;
  }

  function restart() {
    if (rafId) cancelAnimationFrame(rafId);
    bird = { x: 80, y: H/2, vy: 0, r: 14 };
    pipes = []; portals = [];
    sections = 0; frame = 0; alive = true; framesSincePipe = 0;
    flipGravity = false; gravity = 0.32;
    gameStarted = false;
    startCountdown(); // знову відлік при рестарті
  }

  canvas.addEventListener("touchstart", e => { e.preventDefault(); jump(); }, { passive: false });

  window.flapStop = () => { alive = false; gameStarted = false; cancelAnimationFrame(rafId); };

  function spawnPipe() {
    const minY = 60, maxY = H - 60 - GAP;
    const topH = minY + Math.random() * (maxY - minY);
    pipes.push({ x: W + 10, topH });
    if (Math.random() < 0.35) {
      portals.push({ x: W + 10, y: 40 + Math.random() * (H - 80), type: Math.random() < 0.5 ? "flip" : "slow", r: 18 });
    }
  }

  function collidesWithPipe(p) {
    const birdTop = flipGravity ? bird.y : bird.y - bird.r;
    const birdBot = flipGravity ? bird.y + bird.r : bird.y;
    if (bird.x + bird.r < p.x || bird.x - bird.r > p.x + PIPE_W) return false;
    return (birdTop < p.topH || birdBot > p.topH + GAP);
  }

  function loop() {
    if (!alive) { drawDead(); return; }
    frame++;
    framesSincePipe++;

    bird.vy += gravity * (flipGravity ? -1 : 1);
    bird.vy = Math.max(-8, Math.min(8, bird.vy));
    bird.y += bird.vy;

    if (bird.y - bird.r < 0 || bird.y + bird.r > H) { alive = false; endFlappy(); return; }

    if (framesSincePipe >= PIPE_INTERVAL) { spawnPipe(); framesSincePipe = 0; }
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].x -= PIPE_SPEED;
      if (pipes[i].x + PIPE_W < 0) { pipes.splice(i, 1); sections++; continue; }
      if (collidesWithPipe(pipes[i])) { alive = false; endFlappy(); return; }
    }

    for (let i = portals.length - 1; i >= 0; i--) {
      portals[i].x -= PIPE_SPEED;
      if (portals[i].x < -30) { portals.splice(i, 1); continue; }
      const dx = bird.x - portals[i].x, dy = bird.y - portals[i].y;
      if (Math.sqrt(dx*dx+dy*dy) < bird.r + portals[i].r) {
        if (portals[i].type === "flip") flipGravity = !flipGravity;
        portals.splice(i, 1);
      }
    }

    ctx.clearRect(0,0,W,H);
    const bg = ctx.createLinearGradient(0,0,0,H);
    bg.addColorStop(0, flipGravity ? "#1a0010" : "#050010");
    bg.addColorStop(1, flipGravity ? "#050010" : "#1a0010");
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

    ctx.fillStyle="rgba(255,255,255,.4)";
    for(let s=0;s<40;s++){
      const sx=(s*73+frame*.3)%W, sy=(s*137)%H;
      ctx.fillRect(sx,sy,1.5,1.5);
    }

    portals.forEach(p => {
      const clr=p.type==="flip"?"#f472b6":"#60a5fa";
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=clr+"33"; ctx.fill();
      ctx.strokeStyle=clr; ctx.lineWidth=2; ctx.stroke();
      ctx.fillStyle=clr; ctx.font="bold 14px Arial";
      ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText(p.type==="flip"?"↕":"⏱",p.x,p.y);
    });

    pipes.forEach(p => {
      const grad=ctx.createLinearGradient(p.x,0,p.x+PIPE_W,0);
      grad.addColorStop(0,"#7c3aed"); grad.addColorStop(1,"#a855f7");
      ctx.fillStyle=grad;
      ctx.beginPath(); ctx.roundRect(p.x,0,PIPE_W,p.topH,[0,0,6,6]); ctx.fill();
      ctx.beginPath(); ctx.roundRect(p.x,p.topH+GAP,PIPE_W,H-p.topH-GAP,[6,6,0,0]); ctx.fill();
    });

    const birdClr=flipGravity?"#f472b6":"#00d4ff";
    ctx.beginPath(); ctx.arc(bird.x,bird.y,bird.r,0,Math.PI*2);
    ctx.fillStyle=birdClr+"cc"; ctx.fill();
    ctx.strokeStyle=birdClr; ctx.lineWidth=2.5;
    ctx.shadowColor=birdClr; ctx.shadowBlur=20; ctx.stroke(); ctx.shadowBlur=0;
    ctx.beginPath(); ctx.arc(bird.x+5,bird.y-3,4,0,Math.PI*2);
    ctx.fillStyle="#fff"; ctx.fill();
    ctx.beginPath(); ctx.arc(bird.x+6,bird.y-3,2,0,Math.PI*2);
    ctx.fillStyle="#000"; ctx.fill();

    const sc=document.getElementById("flap-score");
    if(sc) sc.textContent=sections;

    rafId=requestAnimationFrame(loop);
  }

  function drawDead() {
    ctx.fillStyle="rgba(0,0,0,.6)"; ctx.fillRect(0,0,W,H);
    ctx.fillStyle="#fff"; ctx.font="bold 20px Orbitron";
    ctx.textAlign="center"; ctx.fillText("💀 GAME OVER",W/2,H/2-20);
    ctx.font="14px Orbitron"; ctx.fillStyle="#ffd966";
    ctx.fillText("Секції: "+sections,W/2,H/2+14);
    ctx.fillStyle="rgba(255,255,255,.5)"; ctx.font="11px Arial";
    ctx.fillText("Натисни щоб ще раз",W/2,H/2+40);
  }

  function endFlappy() {
    cancelAnimationFrame(rafId);
    const best=Math.max(sections,parseInt(localStorage.getItem((currentUser||"g")+"_flapBest")||"0"));
    localStorage.setItem((currentUser||"g")+"_flapBest",best);
    drawDead();
    setTimeout(()=>{
      const score=sections*15;
      const rank=arc_getRank(sections,[1,5,10,20,35,50,80]);
      const reward=arc_giveReward(score,1.3);
      const ch=arc_getDailyChallenge();
      if(!ch.done&&ch.game==="flappy"&&sections>=ch.target) arc_completeDailyChallenge();
      arc_showResult("🐦 FLAPPY VOID",score,rank,reward);
    },1800);
  }

  // Запуск відліку
  startCountdown();
}

// ═══════════════════════════════════════════════════════════════════
// [5] ZONE ESCAPE (Top-Down Runner)
// ═══════════════════════════════════════════════════════════════════

function arc_startRunner() {
  if (balance < 60) { arc_toast("❌ Потрібно 60 нікусів!"); return; }
  balance -= 60; saveData();

  // Визначаємо мобільний пристрій
  const isMobile = /Android|iPhone|iPad|iPod|Touch/i.test(navigator.userAgent) || ('ontouchstart' in window);

  document.getElementById("app").innerHTML = `
    <style>
      #run-wrap{font-family:'Orbitron',sans-serif;background:#030010;min-height:100vh;
        display:flex;flex-direction:column;align-items:center;padding:16px;box-sizing:border-box;}
      #run-canvas{border-radius:12px;border:2px solid rgba(251,146,60,.3);cursor:none;display:block;}

      /* ── ДЖОЙСТИК ── */
      #joystick-zone {
        position:relative;width:130px;height:130px;margin-top:14px;flex-shrink:0;
        touch-action:none;user-select:none;
      }
      #joystick-base {
        position:absolute;inset:0;border-radius:50%;
        background:rgba(251,146,60,.08);
        border:2px solid rgba(251,146,60,.25);
        box-shadow:0 0 20px rgba(251,146,60,.1);
      }
      #joystick-knob {
        position:absolute;
        width:50px;height:50px;border-radius:50%;
        background:radial-gradient(circle at 35% 35%,rgba(251,200,100,.9),rgba(251,146,60,.7));
        border:2px solid rgba(251,146,60,.6);
        box-shadow:0 0 14px rgba(251,146,60,.5);
        top:50%;left:50%;
        transform:translate(-50%,-50%);
        transition:none;
        pointer-events:none;
      }
    </style>
    <div id="run-wrap">
      <div style="font-size:9px;letter-spacing:4px;color:rgba(251,146,60,.5);margin-bottom:4px;">ZONE ESCAPE</div>
      <div style="font-size:16px;font-weight:700;color:#fb923c;margin-bottom:8px;">🏃 Zone Escape</div>
      <div style="font-size:13px;font-weight:700;color:#e0d8ff;margin-bottom:6px;">
        Зона: <span id="run-zone">1</span> &nbsp; Час: <span id="run-time">0</span>с &nbsp; HP: <span id="run-hp">3</span>❤️
      </div>
      <canvas id="run-canvas" width="340" height="440"></canvas>

      ${isMobile ? `
      <!-- Мобільний джойстик -->
      <div id="joystick-zone">
        <div id="joystick-base"></div>
        <div id="joystick-knob"></div>
      </div>
      ` : `
      <!-- Підказка для ПК -->
      <div style="margin-top:10px;font-size:11px;color:rgba(251,146,60,.5);letter-spacing:1px;text-align:center;">
        WASD або стрілки для руху · ПКМ слідкує за курсором
      </div>
      `}

      <button onclick="runStop();arcadeMenu()" style="
        margin-top:10px;padding:9px 20px;background:rgba(255,255,255,.06);
        border:1px solid rgba(255,255,255,.12);color:#888;border-radius:8px;
        font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;
      ">← Вийти</button>
    </div>
  `;

  const canvas = document.getElementById("run-canvas");
  const ctx = canvas.getContext("2d");
  const W = 340, H = 440;
  const SPEED = 3.2;
  const CELL = 28;

  // ── Введення ──
  window.runKeys = { up:false, down:false, left:false, right:false };
  let mouseTarget = null; // для ПК: ціль курсора
  let joyVec = { x: 0, y: 0 }; // для мобільного: вектор джойстика

  // ── ПК: клавіатура ──
  const keyMap = {
    ArrowUp:"up", ArrowDown:"down", ArrowLeft:"left", ArrowRight:"right",
    KeyW:"up", KeyS:"down", KeyA:"left", KeyD:"right"
  };
  function onKey(e, v) { if(keyMap[e.code]) { e.preventDefault(); runKeys[keyMap[e.code]]=v; } }
  document.addEventListener("keydown", e => onKey(e, true));
  document.addEventListener("keyup",   e => onKey(e, false));

  // ── ПК: мишка — персонаж тягнеться до курсора ──
  if (!isMobile) {
    canvas.addEventListener("mousemove", e => {
      const r = canvas.getBoundingClientRect();
      mouseTarget = { x: e.clientX - r.left, y: e.clientY - r.top };
    });
    canvas.addEventListener("mouseleave", () => { mouseTarget = null; });
  }

  // ── Мобільний джойстик ──
  if (isMobile) {
    const zone = document.getElementById("joystick-zone");
    const knob = document.getElementById("joystick-knob");
    if (zone && knob) {
      const RADIUS = 40; // макс відхилення (px)
      let joyActive = false;
      let joyOrigin = { x: 0, y: 0 };

      function getCenter() {
        const r = zone.getBoundingClientRect();
        return { x: r.left + r.width/2, y: r.top + r.height/2 };
      }

      zone.addEventListener("touchstart", e => {
        e.preventDefault();
        joyActive = true;
        const t = e.touches[0];
        joyOrigin = { x: t.clientX, y: t.clientY };
        joyVec = { x: 0, y: 0 };
      }, { passive: false });

      zone.addEventListener("touchmove", e => {
        e.preventDefault();
        if (!joyActive) return;
        const t = e.touches[0];
        let dx = t.clientX - joyOrigin.x;
        let dy = t.clientY - joyOrigin.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > RADIUS) {
          dx = dx / dist * RADIUS;
          dy = dy / dist * RADIUS;
        }
        // Нормалізований вектор (-1..1)
        joyVec = { x: dx / RADIUS, y: dy / RADIUS };
        // Переміщаємо кнопку
        knob.style.left = (50 + dx / 1.3 * 100 / 130) + "%";
        knob.style.top  = (50 + dy / 1.3 * 100 / 130) + "%";
      }, { passive: false });

      function endJoy() {
        joyActive = false;
        joyVec = { x: 0, y: 0 };
        knob.style.left = "50%";
        knob.style.top  = "50%";
      }
      zone.addEventListener("touchend",    endJoy, { passive: true });
      zone.addEventListener("touchcancel", endJoy, { passive: true });
    }
  }

  let player = { x: W/2, y: H/2, r: 12, hp: 3, invincible: 0 };
  let enemies = [];
  let lasers  = [];
  let boosts  = [];
  let zone    = 1;
  let alive   = true;
  let elapsed = 0;
  let lastTime = Date.now();
  let rafId;
  let frame = 0;
  let shield = false;
  let shieldTimer = 0;

  function spawnEnemy() {
    const side = Math.floor(Math.random() * 4);
    let ex, ey;
    if (side===0){ex=Math.random()*W;ey=-20;}
    else if(side===1){ex=Math.random()*W;ey=H+20;}
    else if(side===2){ex=-20;ey=Math.random()*H;}
    else{ex=W+20;ey=Math.random()*H;}
    enemies.push({x:ex,y:ey,r:10,speed:0.8+zone*0.3,hp:1+Math.floor(zone/2)});
  }

  function spawnLaser() {
    const horiz=Math.random()<0.5;
    if(horiz){const y=40+Math.random()*(H-80);lasers.push({x1:0,y1:y,x2:W,y2:y,life:60,horiz:true});}
    else{const x=40+Math.random()*(W-80);lasers.push({x1:x,y1:0,x2:x,y2:H,life:60,horiz:false});}
  }

  function spawnBoost() {
    boosts.push({x:30+Math.random()*(W-60),y:30+Math.random()*(H-60),r:10,type:Math.random()<0.5?"shield":"speed"});
  }

  for(let i=0;i<3;i++) spawnEnemy();
  spawnBoost();

  window.runStop = () => { alive=false; cancelAnimationFrame(rafId); };

  function loop() {
    const now = Date.now();
    const dt = now - lastTime;
    lastTime = now;
    elapsed += dt;
    frame++;

    if (!alive) return;

    // ── Рух персонажа ──
    const spd = shield ? SPEED * 1.5 : SPEED;

    if (isMobile) {
      // Джойстик: вектор joyVec (-1..1)
      const deadzone = 0.1;
      if (Math.abs(joyVec.x) > deadzone) player.x += joyVec.x * spd;
      if (Math.abs(joyVec.y) > deadzone) player.y += joyVec.y * spd;
    } else {
      // ПК: WASD/стрілки
      if (runKeys.up)    player.y -= spd;
      if (runKeys.down)  player.y += spd;
      if (runKeys.left)  player.x -= spd;
      if (runKeys.right) player.x += spd;

      // Додатково: рух до курсора (плавно, якщо немає WASD)
      const anyKey = runKeys.up || runKeys.down || runKeys.left || runKeys.right;
      if (!anyKey && mouseTarget) {
        const dx = mouseTarget.x - player.x;
        const dy = mouseTarget.y - player.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > 8) {
          player.x += (dx/dist) * spd * 0.7;
          player.y += (dy/dist) * spd * 0.7;
        }
      }
    }

    player.x = Math.max(player.r, Math.min(W-player.r, player.x));
    player.y = Math.max(player.r, Math.min(H-player.r, player.y));

    if(player.invincible>0) player.invincible--;
    if(shieldTimer>0){shieldTimer--;if(!shieldTimer)shield=false;}

    if(frame%Math.max(20,80-zone*8)===0) spawnEnemy();
    if(frame%200===0&&zone>=2) spawnLaser();
    if(frame%300===0) spawnBoost();

    enemies.forEach((e,i)=>{
      const dx=player.x-e.x,dy=player.y-e.y,dist=Math.sqrt(dx*dx+dy*dy);
      if(dist>0){e.x+=dx/dist*e.speed;e.y+=dy/dist*e.speed;}
      if(dist<player.r+e.r&&player.invincible===0){
        if(shield){enemies.splice(i,1);return;}
        player.hp--;player.invincible=90;
        const el=document.getElementById("run-hp");if(el)el.textContent=player.hp;
        if(player.hp<=0){alive=false;endRunner();return;}
      }
    });

    lasers.forEach((l,i)=>{
      l.life--;
      if(l.life<=0){lasers.splice(i,1);return;}
      if(l.life>20&&player.invincible===0){
        const hit=l.horiz?Math.abs(player.y-l.y1)<player.r+4:Math.abs(player.x-l.x1)<player.r+4;
        if(hit&&(l.horiz?player.x>l.x1&&player.x<l.x2:player.y>l.y1&&player.y<l.y2)){
          if(!shield){player.hp--;player.invincible=90;
            const el=document.getElementById("run-hp");if(el)el.textContent=player.hp;
            if(player.hp<=0){alive=false;endRunner();return;}
          }
        }
      }
    });

    boosts.forEach((b,i)=>{
      const dx=player.x-b.x,dy=player.y-b.y;
      if(Math.sqrt(dx*dx+dy*dy)<player.r+b.r){
        if(b.type==="shield"){shield=true;shieldTimer=180;}
        boosts.splice(i,1);
      }
    });

    if(Math.floor(elapsed/15000)+1>zone){
      zone++;const el=document.getElementById("run-zone");if(el)el.textContent=zone;
    }
    const el=document.getElementById("run-time");if(el)el.textContent=Math.floor(elapsed/1000);

    // ── Малювання ──
    ctx.clearRect(0,0,W,H);
    const bg=ctx.createLinearGradient(0,0,W,H);
    const zoneColors=[["#030010","#0a0020"],["#0a0818","#180010"],["#080018","#001018"],["#140010","#100010"]];
    const zc=zoneColors[Math.min(zone-1,3)];
    bg.addColorStop(0,zc[0]);bg.addColorStop(1,zc[1]);
    ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

    ctx.strokeStyle="rgba(255,255,255,.03)";ctx.lineWidth=1;
    for(let gx=0;gx<W;gx+=CELL){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();}
    for(let gy=0;gy<H;gy+=CELL){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}

    boosts.forEach(b=>{
      const clr=b.type==="shield"?"#00cfff":"#f472b6";
      ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
      ctx.fillStyle=clr+"44";ctx.fill();ctx.strokeStyle=clr;ctx.lineWidth=2;ctx.stroke();
      ctx.fillStyle=clr;ctx.font="bold 12px Arial";
      ctx.textAlign="center";ctx.textBaseline="middle";
      ctx.fillText(b.type==="shield"?"🛡":"⚡",b.x,b.y);
    });

    lasers.forEach(l=>{
      const alpha=l.life>20?0.85:l.life/20;
      ctx.strokeStyle=`rgba(255,50,50,${alpha})`;ctx.lineWidth=l.life>20?4:2;
      ctx.shadowColor="#ff3232";ctx.shadowBlur=12;
      ctx.beginPath();ctx.moveTo(l.x1,l.y1);ctx.lineTo(l.x2,l.y2);ctx.stroke();ctx.shadowBlur=0;
    });

    enemies.forEach(e=>{
      ctx.beginPath();ctx.arc(e.x,e.y,e.r,0,Math.PI*2);
      ctx.fillStyle="#f8717188";ctx.fill();ctx.strokeStyle="#f87171";ctx.lineWidth=2;ctx.stroke();
      ctx.fillStyle="#f87171";ctx.font="bold 10px Arial";
      ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText("👾",e.x,e.y);
    });

    const pc=shield?"#00cfff":player.invincible>0?"#fbbf24":"#cc44ff";
    if(player.invincible===0||frame%6<3){
      ctx.beginPath();ctx.arc(player.x,player.y,player.r,0,Math.PI*2);
      ctx.fillStyle=pc+"44";ctx.fill();ctx.strokeStyle=pc;ctx.lineWidth=2.5;
      ctx.shadowColor=pc;ctx.shadowBlur=20;ctx.stroke();ctx.shadowBlur=0;
      ctx.fillStyle=pc;ctx.font="bold 14px Arial";
      ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText("🧍",player.x,player.y);
    }
    if(shield){
      ctx.beginPath();ctx.arc(player.x,player.y,player.r+6,0,Math.PI*2);
      ctx.strokeStyle="#00cfff55";ctx.lineWidth=4;ctx.stroke();
    }

    // Курсор-прицел на ПК
    if (!isMobile && mouseTarget) {
      ctx.beginPath();
      ctx.arc(mouseTarget.x, mouseTarget.y, 8, 0, Math.PI*2);
      ctx.strokeStyle="rgba(251,146,60,.5)";ctx.lineWidth=1.5;ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mouseTarget.x-12,mouseTarget.y);ctx.lineTo(mouseTarget.x+12,mouseTarget.y);
      ctx.moveTo(mouseTarget.x,mouseTarget.y-12);ctx.lineTo(mouseTarget.x,mouseTarget.y+12);
      ctx.strokeStyle="rgba(251,146,60,.3)";ctx.lineWidth=1;ctx.stroke();
    }

    rafId=requestAnimationFrame(loop);
  }

  function endRunner() {
    cancelAnimationFrame(rafId);
    const score=Math.floor(elapsed/100)*zone;
    const rank=arc_getRank(zone,[1,2,3,4,5,7,10]);
    const reward=arc_giveReward(score,zone*0.4);
    const ch=arc_getDailyChallenge();
    if(!ch.done&&ch.game==="runner"&&zone>=ch.target) arc_completeDailyChallenge();
    setTimeout(()=>arc_showResult("🏃 ZONE ESCAPE",score,rank,reward),400);
  }

  loop();
}

// ═══════════════════════════════════════════════════════════════════
// [6] BRICK BLASTER: OVERDRIVE
// ═══════════════════════════════════════════════════════════════════

function arc_startBrick() {
  if (balance < 80) { arc_toast("❌ Потрібно 80 нікусів!"); return; }
  balance -= 80; saveData();

  const W = 340, H = 500;
  const PADDLE_W = 72, PADDLE_H = 12;
  const BALL_R = 8;
  const ROWS = 5, COLS = 7;
  const BRICK_W = Math.floor((W - 20) / COLS);
  const BRICK_H = 20;

  let paddle = { x: W/2 - PADDLE_W/2, y: H - 30, w: PADDLE_W };
  let ball = { x: W/2, y: H - 50, vx: 3.5, vy: -4 };
  let bricks = [];
  let particles = [];
  let score = 0;
  let lives = 3;
  let level = 1;
  let overdrive = false;
  let overdriveTimer = 0;
  let combo = 0;
  let alive = true;
  let running = true;
  let rafId;
  let mouseX = W/2;
  let touchX = null;

  function buildBricks() {
    bricks = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const roll = Math.random();
        let type = "normal";
        if (roll < 0.06) type = "case";
        else if (roll < 0.12) type = "explosive";
        else if (roll < 0.18) type = "reflector";
        else if (roll < 0.24 && level >= 3) type = "boss";
        const hp = type === "boss" ? 3 : type === "reflector" ? 2 : 1;
        bricks.push({
          x: 10 + c * BRICK_W,
          y: 40 + r * (BRICK_H + 4),
          w: BRICK_W - 4,
          h: BRICK_H,
          hp, maxHp: hp, type,
          vx: type === "boss" ? (Math.random() < 0.5 ? 1.5 : -1.5) : 0,
        });
      }
    }
  }

  document.getElementById("app").innerHTML = `
    <style>
      #brick-wrap{font-family:'Orbitron',sans-serif;background:#050010;min-height:100vh;
        display:flex;flex-direction:column;align-items:center;padding:16px;box-sizing:border-box;}
      #brick-canvas{border-radius:12px;border:2px solid rgba(233,121,249,.3);display:block;touch-action:none;}
      .brick-hud{display:flex;gap:20px;margin:6px 0;color:#e0d8ff;font-size:12px;font-weight:700;flex-wrap:wrap;justify-content:center;}
    </style>
    <div id="brick-wrap">
      <div style="font-size:9px;letter-spacing:4px;color:rgba(233,121,249,.5);margin-bottom:4px;">OVERDRIVE</div>
      <div style="font-size:16px;font-weight:700;color:#e879f9;margin-bottom:6px;">🧱 Brick Blaster</div>
      <div class="brick-hud">
        <span>Очки: <span id="br-score">0</span></span>
        <span>❤️ <span id="br-lives">3</span></span>
        <span>Рівень: <span id="br-level">1</span></span>
        <span id="br-overdrive" style="color:#ffd700;display:none;">⚡ OVERDRIVE!</span>
      </div>
      <canvas id="brick-canvas" width="${W}" height="${H}"></canvas>
      <button onclick="running=false;cancelAnimationFrame(rafId);arcadeMenu()" style="
        margin-top:10px;padding:9px 20px;background:rgba(255,255,255,.06);
        border:1px solid rgba(255,255,255,.12);color:#888;border-radius:8px;
        font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;
      ">← Вийти</button>
    </div>
  `;

  const canvas = document.getElementById("brick-canvas");
  const ctx = canvas.getContext("2d");

  canvas.addEventListener("mousemove", e => {
    const r = canvas.getBoundingClientRect();
    mouseX = e.clientX - r.left;
  });
  canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    const r = canvas.getBoundingClientRect();
    touchX = e.touches[0].clientX - r.left;
  }, { passive: false });

  buildBricks();

  function brickColor(b) {
    if (b.type === "case")      return ["#ffd700","#ffaa00"];
    if (b.type === "explosive") return ["#ff4444","#cc0000"];
    if (b.type === "reflector") return ["#00cfff","#0088cc"];
    if (b.type === "boss")      return ["#cc44ff","#7700cc"];
    const t = 1 - b.hp / b.maxHp;
    return [`hsl(${200 + level*15},70%,${55-t*20}%)`, `hsl(${200+level*15},60%,${40-t*15}%)`];
  }

  function addParticle(x, y, clr) {
    for (let i = 0; i < 8; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = 2 + Math.random() * 4;
      particles.push({ x, y, vx: Math.cos(ang)*spd, vy: Math.sin(ang)*spd, life: 30+Math.random()*20, clr });
    }
  }

  function loop() {
    if (!running) return;

    // Paddle
    const tx = touchX !== null ? touchX : mouseX;
    paddle.x += (tx - paddle.w/2 - paddle.x) * 0.2;
    paddle.x = Math.max(0, Math.min(W - paddle.w, paddle.x));

    // Ball
    const spd = overdrive ? 1.5 : 1;
    ball.x += ball.vx * spd;
    ball.y += ball.vy * spd;

    // Wall bounces
    if (ball.x - BALL_R < 0) { ball.x = BALL_R; ball.vx = Math.abs(ball.vx); }
    if (ball.x + BALL_R > W) { ball.x = W-BALL_R; ball.vx = -Math.abs(ball.vx); }
    if (ball.y - BALL_R < 0) { ball.y = BALL_R; ball.vy = Math.abs(ball.vy); }

    // Paddle
    if (ball.y + BALL_R >= paddle.y && ball.y - BALL_R <= paddle.y + PADDLE_H
        && ball.x >= paddle.x && ball.x <= paddle.x + paddle.w) {
      ball.vy = -Math.abs(ball.vy);
      const hitPos = (ball.x - paddle.x) / paddle.w - 0.5;
      ball.vx = hitPos * 8;
      combo = 0;
    }

    // Ball lost
    if (ball.y > H + 20) {
      lives--;
      combo = 0;
      const el = document.getElementById("br-lives");
      if (el) el.textContent = lives;
      if (lives <= 0) { running = false; endBrick(); return; }
      ball = { x: W/2, y: H-60, vx: 3.5*(Math.random()<0.5?1:-1), vy: -4 };
    }

    // Bricks
    for (let i = bricks.length - 1; i >= 0; i--) {
      const b = bricks[i];
      if (b.vx) {
        b.x += b.vx;
        if (b.x < 10 || b.x + b.w > W-10) b.vx *= -1;
      }

      // Collision
      if (ball.x + BALL_R > b.x && ball.x - BALL_R < b.x + b.w
          && ball.y + BALL_R > b.y && ball.y - BALL_R < b.y + b.h) {

        if (b.type === "reflector") {
          ball.vx *= -1;
        } else {
          ball.vy *= -1;
        }
        b.hp--;
        combo++;
        const pts = 10 * level * (overdrive ? 2 : 1) * Math.min(combo, 5);
        score += pts;

        const [clr] = brickColor(b);
        addParticle(b.x + b.w/2, b.y + b.h/2, clr);

        if (b.hp <= 0) {
          if (b.type === "explosive") {
            // AoE
            const cx = b.x + b.w/2, cy = b.y + b.h/2;
            for (let j = bricks.length-1; j >= 0; j--) {
              if (j === i) continue;
              const dx = bricks[j].x+bricks[j].w/2-cx, dy = bricks[j].y+bricks[j].h/2-cy;
              if (Math.sqrt(dx*dx+dy*dy) < 70) {
                addParticle(bricks[j].x+bricks[j].w/2, bricks[j].y+bricks[j].h/2, "#ff4444");
                score += 5 * level;
                bricks.splice(j, 1);
                if (j < i) i--;
              }
            }
          }
          if (b.type === "case") {
            // Drop!
            addCase("arcadeover");
            arc_toast("🎁 Дроп: ArcadeOverdrive кейс!");
          }
          bricks.splice(i, 1);

          // Overdrive trigger
          if (combo >= 5 && !overdrive) {
            overdrive = true;
            overdriveTimer = 300;
            const od = document.getElementById("br-overdrive");
            if (od) od.style.display = "inline";
          }
        }

        const sc = document.getElementById("br-score");
        if (sc) sc.textContent = score;
        break;
      }
    }

    // Overdrive timer
    if (overdrive) {
      overdriveTimer--;
      if (overdriveTimer <= 0) {
        overdrive = false;
        const od = document.getElementById("br-overdrive");
        if (od) od.style.display = "none";
      }
    }

    // Level up
    if (bricks.length === 0) {
      level++;
      const el = document.getElementById("br-level");
      if (el) el.textContent = level;
      buildBricks();
      ball = { x: W/2, y: H-60, vx: (3.5+level*0.3)*(Math.random()<.5?1:-1), vy: -(4+level*0.2) };
    }

    // Draw
    ctx.clearRect(0,0,W,H);
    const bg = ctx.createLinearGradient(0,0,0,H);
    bg.addColorStop(0, overdrive ? "#1a0010" : "#050010");
    bg.addColorStop(1, overdrive ? "#0a0020" : "#020008");
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

    // Particles
    particles.forEach((p,i) => {
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.15; p.life--;
      if (p.life<=0){particles.splice(i,1);return;}
      ctx.beginPath(); ctx.arc(p.x,p.y,2,0,Math.PI*2);
      ctx.fillStyle=p.clr+(Math.floor(p.life/30*255).toString(16).padStart(2,"0"));
      ctx.fill();
    });

    // Bricks
    bricks.forEach(b => {
      const [c1,c2] = brickColor(b);
      const grad = ctx.createLinearGradient(b.x,b.y,b.x,b.y+b.h);
      grad.addColorStop(0,c1); grad.addColorStop(1,c2);
      ctx.fillStyle=grad;
      ctx.shadowColor=c1; ctx.shadowBlur=10;
      ctx.beginPath(); ctx.roundRect(b.x,b.y,b.w,b.h,4); ctx.fill();
      ctx.shadowBlur=0;
      // HP indicator
      if (b.hp > 1) {
        ctx.fillStyle="rgba(255,255,255,.6)";
        ctx.font="bold 9px Arial";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.fillText("♦".repeat(b.hp), b.x+b.w/2, b.y+b.h/2);
      }
      if (b.type === "case") {
        ctx.font="10px Arial";
        ctx.fillText("📦",b.x+b.w/2,b.y+b.h/2);
      }
    });

    // Paddle
    const pg = ctx.createLinearGradient(paddle.x,0,paddle.x+paddle.w,0);
    pg.addColorStop(0, overdrive ? "#ffd700" : "#cc44ff");
    pg.addColorStop(1, overdrive ? "#ff9900" : "#00d4ff");
    ctx.fillStyle=pg;
    ctx.shadowColor=overdrive?"#ffd700":"#cc44ff"; ctx.shadowBlur=16;
    ctx.beginPath(); ctx.roundRect(paddle.x,paddle.y,paddle.w,PADDLE_H,6); ctx.fill();
    ctx.shadowBlur=0;

    // Ball
    const bc = overdrive ? "#ffd700" : "#fff";
    ctx.beginPath(); ctx.arc(ball.x,ball.y,BALL_R,0,Math.PI*2);
    ctx.fillStyle=bc;
    ctx.shadowColor=bc; ctx.shadowBlur=18; ctx.fill(); ctx.shadowBlur=0;

    // Combo
    if (combo > 1) {
      ctx.fillStyle="#ffd966";
      ctx.font=`bold ${Math.min(14+combo*2,26)}px Orbitron`;
      ctx.textAlign="center";
      ctx.fillText(`×${combo} COMBO`, W/2, H-12);
    }

    rafId = requestAnimationFrame(loop);
  }

  function endBrick() {
    const rank = arc_getRank(score, [50,200,500,1000,2000,3500,5000]);
    const reward = arc_giveReward(score, 1.5);
    const ch = arc_getDailyChallenge();
    if (!ch.done && ch.game === "stack" && floors >= ch.target) {
        arc_completeDailyChallenge();
}
   setTimeout(() => arc_showResult("🧱 BRICK BLASTER", score, rank, reward), 300);
  }

  loop();
}

function giveArcadeRewards(score) {
    // 🎁 Кейси / ключі
    let milestones = Math.floor(score / 30);
    for (let i = 0; i < milestones; i++) {
        if (Math.random() < 0.5) {
            addCase("arcadeover");
            alert("🎁 Вам випав Arcade Case!");
        } else {
            addKey("arcadeover");
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
    // ↓ ДОДАТИ
    const ch = arc_getDailyChallenge();
    if (!ch.done && ch.game === "saper" && saperScore >= ch.target * 4) {
        arc_completeDailyChallenge();
    }
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

const ch = arc_getDailyChallenge();
if (!ch.done && ch.game === "dino" && finalScore >= ch.target) {
    arc_completeDailyChallenge();
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
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;600;700;800&display=swap');

            .events-wrapper {
                font-family: 'Nunito', sans-serif;
                max-width: 860px;
                margin: 0 auto;
                padding: 24px 16px;
                color: #f0e6ff;
            }

            .events-title {
                font-family: 'Bebas Neue', sans-serif;
                font-size: 3rem;
                letter-spacing: 4px;
                text-align: center;
                margin: 0 0 6px;
                background: linear-gradient(135deg, #ffe066 0%, #ffb347 50%, #ff6fb7 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-shadow: none;
                filter: drop-shadow(0 2px 12px rgba(255,179,71,0.35));
            }

            .events-subtitle {
                text-align: center;
                color: #c9a8ff;
                font-size: 0.85rem;
                letter-spacing: 3px;
                text-transform: uppercase;
                margin-bottom: 32px;
                opacity: 0.75;
            }

            /* Pass cards */
            .pass-grid {
                display: flex;
                justify-content: center;
                gap: 24px;
                flex-wrap: wrap;
                margin-bottom: 36px;
            }

            .pass-card {
                position: relative;
                border-radius: 18px;
                overflow: hidden;
                cursor: pointer;
                transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s ease;
                box-shadow: 0 4px 28px rgba(0,0,0,0.45);
                flex: 0 0 auto;
            }

            .pass-card::before {
                content: '';
                position: absolute;
                inset: 0;
                border-radius: 18px;
                border: 2px solid rgba(255,255,255,0.12);
                pointer-events: none;
                z-index: 2;
                transition: border-color 0.2s;
            }

            .pass-card:hover {
                transform: translateY(-8px) scale(1.03);
                box-shadow: 0 16px 48px rgba(0,0,0,0.55);
            }

            .pass-card:hover::before {
                border-color: rgba(255,220,100,0.45);
            }

            .pass-card img {
                display: block;
                width: 320px;
                max-width: 90vw;
                border-radius: 18px;
            }

            .pass-card .card-glow {
                position: absolute;
                inset: 0;
                border-radius: 18px;
                background: radial-gradient(ellipse at 50% 0%, rgba(255,200,80,0.18) 0%, transparent 70%);
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.25s;
                z-index: 1;
            }

            .pass-card:hover .card-glow { opacity: 1; }

            /* Section: Інше */
            .other-section-title {
                font-family: 'Bebas Neue', sans-serif;
                font-size: 1.4rem;
                letter-spacing: 3px;
                color: #c9a8ff;
                text-align: center;
                margin-bottom: 14px;
                opacity: 0.85;
            }

            .other-grid {
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 400px;
                margin: 0 auto 28px;
            }

            .ev-btn {
                padding: 13px 24px;
                font-family: 'Nunito', sans-serif;
                font-size: 1rem;
                font-weight: 700;
                border: none;
                border-radius: 12px;
                cursor: pointer;
                transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
                letter-spacing: 0.5px;
            }

            .ev-btn:not(:disabled):hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0,0,0,0.35);
            }

            .ev-btn:not(:disabled):active {
                transform: translateY(0);
            }

            .ev-btn-disabled {
                background: rgba(255,255,255,0.07);
                color: rgba(255,255,255,0.3);
                cursor: not-allowed;
                border: 1.5px dashed rgba(255,255,255,0.12);
            }

            .ev-btn-sale {
                background: linear-gradient(90deg, #ff9f00 0%, #ffd24d 100%);
                color: #1a1000;
                box-shadow: 0 4px 18px rgba(255,170,0,0.35);
            }

            .ev-btn-tasks {
                background: linear-gradient(90deg, #7c3aed 0%, #a78bfa 100%);
                color: #fff;
                box-shadow: 0 4px 18px rgba(124,58,237,0.3);
            }

            /* Back button */
            .back-wrap {
                text-align: center;
                margin-top: 8px;
            }

            .ev-btn-back {
                background: rgba(255,255,255,0.08);
                color: #c9a8ff;
                border: 1.5px solid rgba(201,168,255,0.3);
                padding: 10px 36px;
                font-size: 0.95rem;
                font-weight: 700;
                letter-spacing: 1px;
                border-radius: 50px;
                cursor: pointer;
                transition: background 0.2s, color 0.2s, transform 0.15s;
            }

            .ev-btn-back:hover {
                background: rgba(201,168,255,0.15);
                color: #fff;
                transform: translateY(-2px);
            }

            /* Entrance animation */
            @keyframes fadeUp {
                from { opacity: 0; transform: translateY(20px); }
                to   { opacity: 1; transform: translateY(0); }
            }

            .events-wrapper > * {
                animation: fadeUp 0.4s ease both;
            }
            .events-wrapper > *:nth-child(1) { animation-delay: 0.03s; }
            .events-wrapper > *:nth-child(2) { animation-delay: 0.07s; }
            .events-wrapper > *:nth-child(3) { animation-delay: 0.12s; }
            .events-wrapper > *:nth-child(4) { animation-delay: 0.17s; }
            .events-wrapper > *:nth-child(5) { animation-delay: 0.21s; }
            .events-wrapper > *:nth-child(6) { animation-delay: 0.25s; }
        </style>

        <div class="events-wrapper">

            <h2 class="events-title">🎟 Івенти</h2>
            <p class="events-subtitle">Сезонні події та нагороди</p>

            <!-- Pass Cards -->
            <div class="pass-grid">

                <div class="pass-card" onclick="openGameFlamePass()">
                    <div class="card-glow"></div>
                    <img src="img/FallPass25Button.png" alt="FallPass25" />
                </div>

                <div class="pass-card" onclick="MenuStarterPass()">
                    <div class="card-glow"></div>
                    <img src="img/StarterPassButton.png" alt="StarterPass" />
                </div>

            </div>

            <!-- Інше -->
            <p class="other-section-title">◆ Інше ◆</p>
            <div class="other-grid">

                <button class="ev-btn ev-btn-disabled" disabled>
                    🔒 Лавочку прикрили
                </button>

                <button class="ev-btn ev-btn-sale" onclick="saleShopMenu()">
                    🔥 Акційний Магазин
                </button>

                <button class="ev-btn ev-btn-tasks" onclick="openTasksMenu()">
                    🎯 Завдання
                </button>

            </div>

            <!-- Назад -->
            <div class="back-wrap">
                <button class="ev-btn-back" onclick="mainMenu()">← Назад</button>
            </div>

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

// ═══════════════════════════════════════════════════════════════════
//  🔥 GAME FLAME PASS — повна реалізація
// ═══════════════════════════════════════════════════════════════════

// ── ключі localStorage (НОВІ, окремі від FlowerPower) ──
const GF_KEY        = u => u + "_gfPass_points";
const GF_FREE_KEY   = u => u + "_gfPass_claimed_free";
const GF_PREM_KEY   = u => u + "_gfPass_claimed_prem";
const GF_PREMIUM_KEY= u => u + "_gfPass_hasPremium";

function gfGetPoints()   { return parseInt(localStorage.getItem(GF_KEY(currentUser)) || "0"); }
function gfAddPoints(n)  {
  const v = gfGetPoints() + n;
  localStorage.setItem(GF_KEY(currentUser), v);
  return v;
}
function gfHasPremium()  { return localStorage.getItem(GF_PREMIUM_KEY(currentUser)) === "1"; }
function gfSetPremium()  { localStorage.setItem(GF_PREMIUM_KEY(currentUser), "1"); }

function gfIsClaimed(track, lvl) {
  const key  = track === "free" ? GF_FREE_KEY(currentUser) : GF_PREM_KEY(currentUser);
  const data = JSON.parse(localStorage.getItem(key) || "{}");
  return !!data[lvl];
}
function gfSetClaimed(track, lvl) {
  const key  = track === "free" ? GF_FREE_KEY(currentUser) : GF_PREM_KEY(currentUser);
  const data = JSON.parse(localStorage.getItem(key) || "{}");
  data[lvl]  = true;
  localStorage.setItem(key, JSON.stringify(data));
}

const GF_PER_LEVEL = 500;
const GF_MAX_LEVEL = 50;

function gfFreeReward(lvl) {
  const table = {
    1:  { type:"case", id:"arcadeover",  label:"ArcadeOverdrive" },
    2:  { type:"coins", amount:15 },
    3:  { type:"case", id:"gameflam",    label:"GameFlame26" },
    4:  { type:"case", id:"arbitr",      label:"ArbitrationCase" },
    5:  { type:"coins", amount:25 },
    6:  { type:"case", id:"arcadeover",  label:"ArcadeOverdrive" },
    7:  { type:"case", id:"absolute",    label:"Міжсезонний" },
    8:  { type:"coins", amount:30 },
    9:  { type:"case", id:"gameflam",    label:"GameFlame26" },
    10: { type:"case", id:"arcadeover",  label:"ArcadeOverdrive" },
    11: { type:"coins", amount:20 },
    12: { type:"case", id:"arbitr",      label:"ArbitrationCase" },
    13: { type:"case", id:"gameflam",    label:"GameFlame26" },
    14: { type:"coins", amount:40 },
    15: { type:"case", id:"gameflamE",   label:"GameFlame26 ELITE" },
    16: { type:"case", id:"arcadeover",  label:"ArcadeOverdrive" },
    17: { type:"coins", amount:25 },
    18: { type:"case", id:"gameflam",    label:"GameFlame26" },
    19: { type:"case", id:"arbitr",      label:"ArbitrationCase" },
    20: { type:"coins", amount:50 },
    21: { type:"case", id:"absolute",    label:"Міжсезонний" },
    22: { type:"case", id:"arcadeover",  label:"ArcadeOverdrive" },
    23: { type:"coins", amount:30 },
    24: { type:"case", id:"gameflam",    label:"GameFlame26" },
    25: { type:"case", id:"gameflamE",   label:"GameFlame26 ELITE" },
    26: { type:"coins", amount:35 },
    27: { type:"case", id:"arbitr",      label:"ArbitrationCase" },
    28: { type:"case", id:"arcadeover",  label:"ArcadeOverdrive" },
    29: { type:"coins", amount:40 },
    30: { type:"case", id:"gameflam",    label:"GameFlame26" },
    31: { type:"case", id:"arcadeover",  label:"ArcadeOverdrive" },
    32: { type:"coins", amount:30 },
    33: { type:"case", id:"absolute",    label:"Міжсезонний" },
    34: { type:"case", id:"gameflam",    label:"GameFlame26" },
    35: { type:"coins", amount:50 },
    36: { type:"case", id:"arbitr",      label:"ArbitrationCase" },
    37: { type:"case", id:"arcadeover",  label:"ArcadeOverdrive" },
    38: { type:"coins", amount:40 },
    39: { type:"case", id:"gameflamE",   label:"GameFlame26 ELITE" },
    40: { type:"case", id:"gameflam",    label:"GameFlame26" },
    41: { type:"coins", amount:60 },
    42: { type:"case", id:"absolute",    label:"Міжсезонний" },
    43: { type:"case", id:"arcadeover",  label:"ArcadeOverdrive" },
    44: { type:"coins", amount:50 },
    45: { type:"case", id:"arbitr",      label:"ArbitrationCase" },
    46: { type:"case", id:"gameflamE",   label:"GameFlame26 ELITE" },
    47: { type:"coins", amount:75 },
    48: { type:"case", id:"gameflam",    label:"GameFlame26" },
    49: { type:"case", id:"arcadeover",  label:"ArcadeOverdrive" },
    50: { type:"medal", id:"medal_gf_bronze", label:"Бронзова медаль «Проходження GameFlame Pass»" },
  };
  return table[lvl] || { type:"coins", amount:10 };
}

function gfPremReward(lvl) {
  const table = {
    1:  { type:"case", id:"gameflam",    label:"GameFlame26" },
    2:  { type:"coins", amount:50 },
    3:  { type:"case", id:"gameflamE",   label:"GameFlame26 ELITE" },
    4:  { type:"case", id:"arcadeover",  label:"ArcadeOverdrive" },
    5:  { type:"coins", amount:75 },
    6:  { type:"case", id:"arbitr",      label:"ArbitrationCase" },
    7:  { type:"case", id:"gameflamE",   label:"GameFlame26 ELITE" },
    8:  { type:"coins", amount:60 },
    9:  { type:"case", id:"gameflam",    label:"GameFlame26" },
    10: { type:"coins", amount:100 },
    11: { type:"case", id:"arcadeover",  label:"ArcadeOverdrive" },
    12: { type:"case", id:"gameflamE",   label:"GameFlame26 ELITE" },
    13: { type:"coins", amount:75 },
    14: { type:"case", id:"arbitr",      label:"ArbitrationCase" },
    15: { type:"coins", amount:100 },
    16: { type:"case", id:"gameflamE",   label:"GameFlame26 ELITE" },
    17: { type:"case", id:"arcadeover",  label:"ArcadeOverdrive" },
    18: { type:"coins", amount:80 },
    19: { type:"case", id:"gameflam",    label:"GameFlame26" },
    20: { type:"coins", amount:120 },
    21: { type:"case", id:"gameflamE",   label:"GameFlame26 ELITE" },
    22: { type:"case", id:"arbitr",      label:"ArbitrationCase" },
    23: { type:"coins", amount:90 },
    24: { type:"case", id:"arcadeover",  label:"ArcadeOverdrive" },
    25: { type:"coins", amount:150 },
    26: { type:"case", id:"gameflam",    label:"GameFlame26" },
    27: { type:"case", id:"gameflamE",   label:"GameFlame26 ELITE" },
    28: { type:"coins", amount:100 },
    29: { type:"case", id:"arbitr",      label:"ArbitrationCase" },
    30: { type:"coins", amount:150 },
    31: { type:"case", id:"gameflamE",   label:"GameFlame26 ELITE" },
    32: { type:"case", id:"arcadeover",  label:"ArcadeOverdrive" },
    33: { type:"coins", amount:100 },
    34: { type:"case", id:"gameflam",    label:"GameFlame26" },
    35: { type:"coins", amount:175 },
    36: { type:"case", id:"gameflamE",   label:"GameFlame26 ELITE" },
    37: { type:"case", id:"arbitr",      label:"ArbitrationCase" },
    38: { type:"coins", amount:120 },
    39: { type:"case", id:"arcadeover",  label:"ArcadeOverdrive" },
    40: { type:"coins", amount:200 },
    41: { type:"case", id:"gameflamE",   label:"GameFlame26 ELITE" },
    42: { type:"case", id:"arbitr",      label:"ArbitrationCase" },
    43: { type:"coins", amount:150 },
    44: { type:"case", id:"gameflam",    label:"GameFlame26" },
    45: { type:"coins", amount:200 },
    46: { type:"case", id:"gameflamE",   label:"GameFlame26 ELITE" },
    47: { type:"case", id:"arcadeover",  label:"ArcadeOverdrive" },
    48: { type:"coins", amount:200 },
    49: { type:"case", id:"gameflamE",   label:"GameFlame26 ELITE" },
    50: { type:"medal", id:"medal_gf_regular", label:"Медаль «Проходження GameFlame Pass»" },
  };
  return table[lvl] || { type:"coins", amount:20 };
}

function gfRewardImg(r) {
  if (r.type === "coins") return "img/money.png";
  if (r.type === "medal") return r.id === "medal_gf_bronze"
    ? "img/medal_gf_bronze.png"
    : "img/medal_gf_regular.png";
  return "img/case_" + r.id + ".png";
}

function gfGiveReward(r) {
  if (r.type === "coins")  { balance += r.amount; saveData(); return; }
  if (r.type === "case")   { addCase(r.id); saveData(); return; }
  if (r.type === "medal") {
    inventory.push({
      id: crypto.randomUUID(),
      type: "item",
      name: r.id === "medal_gf_bronze"
        ? "Бронзова медаль «Проходження GameFlame Pass»"
        : "Медаль «Проходження GameFlame Pass»",
      img: r.id === "medal_gf_bronze" ? "medal_gf_bronze.png" : "medal_gf_regular.png",
      rarity: r.id === "medal_gf_bronze" ? "Виняткова" : "Секретна",
      quality: "Прямо з цеху",
      premium: false,
      fromCase: "GameFlamePass",
      createdAt: Date.now()
    });
    saveData();
  }
}
function gfRewardLabel(r) {
  if (r.type === "coins") return "+" + r.amount + " 💰";
  if (r.type === "medal") return r.label || "Медаль";
  return r.label || getCaseName(r.id) || r.id;
}

// Знайди функцію gfIsClosed() і заміни на:
function gfIsClosed() {
  const now = new Date();
  // Закривається 1 травня (місяць 4 = травень, 0-indexed)
  return now.getMonth() > 3;
}

// Знайди функцію gfDaysUntilEnd() і заміни на:
function gfDaysUntilEnd() {
  const now = new Date();
  const year = now.getFullYear();
  const endDate = new Date(year, 4, 1); // 1 травня
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = endDate - todayMidnight;
  return Math.max(0, Math.floor(diff / (24 * 60 * 60 * 1000)));
}

// Знайди функцію gfCountdownText() і заміни на:
function gfCountdownText() {
  const now = new Date();
  const month = now.getMonth();
  // Показуємо відлік у березні та квітні
  if (month !== 2 && month !== 3) return null;
  const day = now.getDate();
  const monthName = month === 2 ? "березня" : "квітня";
  const daysLeft = gfDaysUntilEnd();
  if (daysLeft === 0) {
    return `📅 Сьогодні <b>${day} ${monthName}</b> — останній день! GameFlame Pass закривається сьогодні.`;
  }
  return `📅 Сьогодні <b>${day} ${monthName}</b>, до кінця залишилось <b>${daysLeft} ${daysLeft === 1 ? 'день' : daysLeft < 5 ? 'дні' : 'днів'}</b> (закривається 1 травня).`;
}

// ── Скидання ──
function gfResetPass(passwordInput) {
  const RESET_PASSWORD = "14886707";
  if (passwordInput !== RESET_PASSWORD) return false;
  if (!currentUser) return false;
  localStorage.setItem(GF_KEY(currentUser), "0");
  localStorage.setItem(GF_FREE_KEY(currentUser), "{}");
  localStorage.setItem(GF_PREM_KEY(currentUser), "{}");
  localStorage.removeItem(GF_PREMIUM_KEY(currentUser));
  return true;
}

// ── Нарахування BP з відкриття кейсів ──
function gfAwardBPForCase(caseType) {
  const bpMap = {
    "gameflam":  90,
    "gameflamE": 140,
    "arcadeover":80,
    "arbitr":    100,
    "absolute":  60,
    "arcase":    120,
    "special":   500,
  };
  const bp = bpMap[caseType] || 50;
  gfAddPoints(bp);
}

// ── Покупка BP ──
function gfShowBuyBPModal(amount, cost) {
  document.getElementById("gf-buy-modal")?.remove();

  const imgMap = {
    500:  "img/bpf1.png",
    1000: "img/bpf2.png",
    3000: "img/bpf3.png",
    6000: "img/bpf4.png",
  };
  const img = imgMap[amount] || "img/bpf1.png";

  const ov = document.createElement("div");
  ov.id = "gf-buy-modal";
  ov.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,.85);backdrop-filter:blur(10px);
    display:flex;align-items:center;justify-content:center;padding:20px;
  `;
  ov.addEventListener("click", e => { if (e.target === ov) ov.remove(); });

  ov.innerHTML = `
    <div style="
      background:linear-gradient(160deg,#1a0820,#0d0414);
      border:2px solid rgba(204,68,255,.4);
      border-radius:24px;padding:28px 24px;
      max-width:300px;width:100%;text-align:center;
      box-shadow:0 0 60px rgba(204,68,255,.2),0 30px 80px rgba(0,0,0,.8);
      animation:gfPopIn .35s cubic-bezier(.34,1.56,.64,1);
      font-family:'Press Start 2P',monospace;
    ">
      <style>@keyframes gfPopIn{from{transform:scale(.7) translateY(20px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}</style>
      <img src="${img}" alt="BP Pack" style="
        width:140px;height:140px;object-fit:contain;
        display:block;margin:0 auto 16px;
        filter:drop-shadow(0 0 20px rgba(204,68,255,.5));
      ">
      <div style="font-size:14px;font-weight:700;color:#cc44ff;margin-bottom:8px;">Купити +${amount} BP?</div>
      <div style="font-size:10px;color:rgba(224,216,255,.5);margin-bottom:6px;">Ви впевнені у покупці?</div>
      <div style="font-size:13px;font-weight:800;color:#ffd966;margin-bottom:22px;">Вартість: ${cost} 💰</div>
      <button onclick="gfConfirmBuyBP(${amount},${cost})" style="
        width:100%;
        background:linear-gradient(135deg,#cc44ff,#7700cc);
        border:none;border-radius:16px;padding:13px 0;
        font-family:'Press Start 2P',monospace;font-size:10px;font-weight:800;
        color:#fff;cursor:pointer;letter-spacing:.5px;
        box-shadow:0 5px 0 #44006688;
        margin-bottom:8px;
      ">✅ Купити!</button>
      <button onclick="document.getElementById('gf-buy-modal').remove()" style="
        width:100%;background:none;
        border:1px solid rgba(255,255,255,.1);border-radius:12px;
        padding:10px 0;font-family:'Press Start 2P',monospace;font-size:10px;
        color:rgba(255,255,255,.35);cursor:pointer;
      ">✖ Відмовитися</button>
    </div>
  `;
  document.body.appendChild(ov);
}

function gfConfirmBuyBP(amount, cost) {
  document.getElementById("gf-buy-modal")?.remove();
  if (nikus < cost) { alert(`Недостатньо нікусів! Потрібно ${cost}.`); return; }
  nikus -= cost;
  gfAddPoints(amount);
  saveData();
  openGameFlamePass();
}

// ══════════════════════════════════════════════════════════════════
//  ГОЛОВНА ФУНКЦІЯ
// ══════════════════════════════════════════════════════════════════

function openGameFlamePass() {
  if (!currentUser) return;

  if (gfIsClosed()) {
    document.getElementById("app").innerHTML = `
      <style>
        #gf-closed-root {
          font-family:'Press Start 2P',monospace;
          min-height:100vh;
          background:linear-gradient(160deg,#0d0820,#1a0414);
          display:flex;align-items:center;justify-content:center;
          flex-direction:column;text-align:center;
          color:#e0d8ff;padding:30px;
        }
      </style>
      <div id="gf-closed-root">
        <div style="font-size:56px;margin-bottom:16px;">🔥</div>
        <div style="font-size:16px;font-weight:800;color:#cc44ff;margin-bottom:10px;letter-spacing:2px;">GameFlame Pass завершено</div>
        <div style="font-size:10px;color:rgba(224,216,255,.5);margin-bottom:30px;line-height:2;">
          Сезон закрився 1 квітня.<br>
          Дякуємо за участь! Чекайте на новий сезон.
        </div>
        <button onclick="openEventsMenu()" style="
          background:rgba(204,68,255,.15);
          border:1px solid rgba(204,68,255,.4);
          color:#cc44ff;border-radius:14px;
          padding:12px 28px;font-size:10px;font-weight:700;
          cursor:pointer;font-family:'Press Start 2P',monospace;
        ">← Назад до Івентів</button>
      </div>
    `;
    return;
  }

  const hasPrem = gfHasPremium();
  const pts     = gfGetPoints();
  const curLvl  = Math.min(Math.floor(pts / GF_PER_LEVEL), GF_MAX_LEVEL);
  const ptsToNext = curLvl < GF_MAX_LEVEL ? GF_PER_LEVEL - (pts % GF_PER_LEVEL) : 0;
  const progress  = curLvl < GF_MAX_LEVEL ? ((pts % GF_PER_LEVEL) / GF_PER_LEVEL) * 100 : 100;

  const countdownText = gfCountdownText();
  const daysLeft = gfDaysUntilEnd();
  const countdownColor = daysLeft <= 3 ? "#ff4466" : daysLeft <= 7 ? "#ffd966" : "#cc44ff";

  document.getElementById("app").innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Press+Start+2P&display=swap');

#gf-root {
  font-family:'Press Start 2P',monospace;
  min-height:100vh;
  background:
    radial-gradient(ellipse 60% 40% at 20% 10%, rgba(204,68,255,.12) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 80% 90%, rgba(255,0,204,.08) 0%, transparent 60%),
    linear-gradient(160deg,#0d0820,#1a0414,#0d0820);
  padding-bottom:60px;
  color:#e0d8ff;
  box-sizing:border-box;
}

/* HEADER */
.gf-header {
  background:linear-gradient(180deg,rgba(13,8,32,.98),transparent);
  padding:0;
  position:sticky;top:0;z-index:80;
  backdrop-filter:blur(16px);
  border-bottom:1px solid rgba(204,68,255,.2);
}
.gf-header-inner {
  display:flex;align-items:center;gap:14px;
  padding:14px 20px 10px;flex-wrap:wrap;
}
.gf-logo-line1 {
  font-family:'Orbitron',sans-serif;
  font-size:22px;font-weight:900;
  background:linear-gradient(90deg,#ff4466,#cc44ff,#ff9900);
  background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  animation:gfShimmer 3s linear infinite;
  letter-spacing:2px;
  flex:1;
}
@keyframes gfShimmer{
  0%{background-position:0% center}
  100%{background-position:200% center}
}
.gf-logo-line2 {
  font-size:8px;font-weight:700;letter-spacing:3px;
  color:rgba(204,68,255,.55);text-transform:uppercase;
  margin-top:2px;
}
.gf-back-btn {
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.1);
  color:rgba(255,255,255,.55);
  border-radius:10px;padding:8px 16px;
  font-family:'Press Start 2P',monospace;font-size:9px;font-weight:600;
  cursor:pointer;transition:.2s;
}
.gf-back-btn:hover{background:rgba(255,255,255,.1);color:#fff;}

/* COUNTDOWN */
.gf-countdown {
  margin:10px 20px 0;
  background:rgba(0,0,0,.3);
  border:1px solid ${countdownColor}44;
  border-radius:12px;padding:10px 16px;
  font-size:9px;font-weight:600;
  color:${countdownColor};text-align:center;letter-spacing:.3px;
}

/* PLAYER CARD */
.gf-player-card {
  margin:16px 20px;
  background:linear-gradient(135deg,rgba(50,10,60,.9),rgba(30,5,40,.95));
  border:1px solid rgba(204,68,255,.2);
  border-radius:20px;padding:18px 22px;
  display:grid;grid-template-columns:1fr auto;
  gap:12px;align-items:center;
  box-shadow:0 0 40px rgba(204,68,255,.08),inset 0 1px 0 rgba(255,255,255,.04);
}
.gf-level-badge {
  display:inline-block;
  background:linear-gradient(90deg,rgba(204,68,255,.2),rgba(255,68,102,.15));
  border:1px solid rgba(204,68,255,.35);
  border-radius:100px;padding:5px 14px;
  font-size:10px;font-weight:800;
  color:#cc44ff;letter-spacing:.5px;
  margin-bottom:10px;
}
.gf-progress-label {
  font-size:8px;font-weight:600;
  color:rgba(224,216,255,.45);letter-spacing:.5px;
  text-transform:uppercase;margin-bottom:6px;
}
.gf-progress-bar {
  height:8px;background:rgba(255,255,255,.07);
  border-radius:100px;overflow:hidden;
  border:1px solid rgba(255,255,255,.04);
}
.gf-progress-fill {
  height:100%;border-radius:100px;
  background:linear-gradient(90deg,#ff4466,#cc44ff,#ff9900);
  transition:width .5s cubic-bezier(.4,0,.2,1);
  box-shadow:0 0 12px rgba(204,68,255,.5);
  position:relative;
}
.gf-progress-fill::after {
  content:'';position:absolute;right:0;top:0;
  width:30px;height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.5));
  border-radius:100px;
}
.gf-pts-info {
  font-size:9px;font-weight:600;
  color:rgba(224,216,255,.4);margin-top:5px;
}
.gf-pts-info span{color:#cc44ff;font-weight:800;}

.gf-prem-status {
  text-align:center;
  background:${hasPrem?'linear-gradient(180deg,rgba(255,68,102,.15),rgba(204,68,255,.08))':'rgba(255,255,255,.03)'};
  border:1px solid ${hasPrem?'rgba(255,68,102,.35)':'rgba(255,255,255,.07)'};
  border-radius:14px;padding:12px 16px;min-width:110px;
}
.gf-prem-icon{font-size:28px;margin-bottom:4px;}
.gf-prem-label{
  font-size:8px;font-weight:800;letter-spacing:1px;
  text-transform:uppercase;
  color:${hasPrem?'#ff4466':'rgba(255,255,255,.3)'};
}
.gf-prem-sub{font-size:8px;color:rgba(255,255,255,.3);margin-top:2px;}

/* TABS */
.gf-tabs {
  display:flex;gap:0;margin:0 20px 16px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  border-radius:14px;overflow:hidden;
}
.gf-tab {
  flex:1;padding:12px 8px;text-align:center;
  cursor:pointer;font-size:10px;font-weight:700;
  letter-spacing:.5px;transition:.2s;
  color:rgba(255,255,255,.4);
  border:none;background:none;
  font-family:'Press Start 2P',monospace;
}
.gf-tab.active {
  background:linear-gradient(135deg,rgba(204,68,255,.15),rgba(255,68,102,.1));
  color:#cc44ff;
  box-shadow:inset 0 0 0 1px rgba(204,68,255,.2);
}
.gf-tab:not(.active):hover{color:rgba(255,255,255,.7);}

/* TRACK */
.gf-track-wrap {
  overflow-x:auto;padding:8px 20px 20px;
  scrollbar-width:thin;
  scrollbar-color:rgba(204,68,255,.3) transparent;
}
.gf-track-wrap::-webkit-scrollbar{height:4px;}
.gf-track-wrap::-webkit-scrollbar-thumb{background:rgba(204,68,255,.25);border-radius:4px;}

.gf-track {
  display:flex;gap:8px;min-width:max-content;
  position:relative;padding:36px 0 10px;
}
.gf-track::before {
  content:'';position:absolute;top:64px;left:55px;right:55px;
  height:3px;
  background:linear-gradient(90deg,
    rgba(204,68,255,.7) 0%,
    rgba(204,68,255,.7) var(--gf-prog,0%),
    rgba(255,255,255,.08) var(--gf-prog,0%));
  border-radius:4px;z-index:0;
}

/* CARD */
.gf-card {
  position:relative;z-index:1;
  width:110px;flex-shrink:0;
  border-radius:16px;padding:12px 8px 10px;
  text-align:center;cursor:pointer;
  transition:transform .2s,box-shadow .2s;
  border:2px solid transparent;
}
.gf-card:hover{transform:translateY(-5px);}
.gf-card:active{transform:scale(.96);}
.gf-card.claimed {
  background:linear-gradient(160deg,#2a0a3a,#1a041e);
  border-color:rgba(204,68,255,.4);
}
.gf-card.available {
  background:linear-gradient(160deg,#3a0a2a,#220510);
  border-color:#cc44ff;
  box-shadow:0 0 20px rgba(204,68,255,.3),0 8px 24px rgba(0,0,0,.4);
  animation:gfPulse 2s ease-in-out infinite;
}
@keyframes gfPulse{
  0%,100%{box-shadow:0 0 20px rgba(204,68,255,.3),0 8px 24px rgba(0,0,0,.4);}
  50%{box-shadow:0 0 35px rgba(204,68,255,.55),0 12px 30px rgba(0,0,0,.5);}
}
.gf-card.locked {
  background:rgba(255,255,255,.03);
  border-color:rgba(255,255,255,.06);
  opacity:.6;cursor:not-allowed;
}
.gf-card.premium-locked {
  background:linear-gradient(160deg,rgba(255,68,102,.05),rgba(204,68,255,.03));
  border-color:rgba(255,68,102,.2);cursor:pointer;
}

.gf-card-lvl {
  position:absolute;top:-13px;left:50%;transform:translateX(-50%);
  font-size:8px;font-weight:800;letter-spacing:.5px;
  padding:3px 9px;border-radius:20px;white-space:nowrap;
}
.claimed .gf-card-lvl{background:rgba(204,68,255,.25);color:#cc44ff;}
.available .gf-card-lvl{background:#cc44ff;color:#fff;}
.locked .gf-card-lvl{background:rgba(255,255,255,.07);color:rgba(255,255,255,.3);}
.premium-locked .gf-card-lvl{background:rgba(255,68,102,.2);color:#ff4466;}

.gf-card-img {
  width:72px;height:72px;object-fit:contain;
  display:block;margin:6px auto 5px;
  filter:drop-shadow(0 3px 10px rgba(0,0,0,.6));
  transition:transform .25s;
}
.available .gf-card-img{animation:gfFloat 2.5s ease-in-out infinite;}
@keyframes gfFloat{
  0%,100%{transform:translateY(0);}
  50%{transform:translateY(-5px);}
}
.locked .gf-card-img,.premium-locked .gf-card-img{filter:grayscale(.7) brightness(.5);}

.gf-card-name{
  font-size:7px;font-weight:700;line-height:1.3;
  color:rgba(224,216,255,.75);word-break:break-word;
}
.gf-card-status{
  font-size:8px;font-weight:800;margin-top:4px;letter-spacing:.5px;
}
.claimed .gf-card-status{color:#cc44ff;}
.available .gf-card-status{color:#ff9900;}
.locked .gf-card-status{color:rgba(255,255,255,.2);}
.premium-locked .gf-card-status{color:#ff4466;}

/* PREMIUM BANNER */
.gf-prem-banner {
  margin:0 20px 16px;
  background:linear-gradient(135deg,rgba(255,68,102,.12),rgba(204,68,255,.08),rgba(255,68,102,.12));
  border:1px solid rgba(255,68,102,.3);
  border-radius:18px;padding:18px 22px;
  display:flex;align-items:center;gap:16px;flex-wrap:wrap;
  position:relative;overflow:hidden;
}
.gf-prem-banner-title{
  font-family:'Orbitron',sans-serif;
  font-size:16px;font-weight:700;
  color:#ff4466;margin-bottom:4px;
}
.gf-prem-banner-desc{
  font-size:9px;color:rgba(255,68,102,.6);line-height:1.7;
}
.gf-prem-buy-btn {
  background:linear-gradient(135deg,#ff4466,#cc44ff);
  border:none;border-radius:14px;
  padding:12px 24px;
  font-family:'Press Start 2P',monospace;
  font-size:9px;font-weight:800;letter-spacing:.5px;
  color:#fff;cursor:pointer;
  box-shadow:0 4px 0 rgba(100,0,80,.5),0 8px 24px rgba(204,68,255,.3);
  transition:.2s;white-space:nowrap;flex-shrink:0;
}
.gf-prem-buy-btn:hover{transform:translateY(-2px);}

/* BP SHOP */
.gf-bp-section {
  margin:0 20px 20px;
  background:rgba(255,255,255,.03);
  border:1px solid rgba(255,255,255,.06);
  border-radius:16px;padding:16px 20px;
}
.gf-bp-section-title{
  font-size:8px;font-weight:800;letter-spacing:2px;
  text-transform:uppercase;color:rgba(224,216,255,.35);margin-bottom:12px;
}
.gf-bp-grid{display:flex;gap:8px;flex-wrap:wrap;}
.gf-bp-btn {
  background:rgba(204,68,255,.07);
  border:1px solid rgba(204,68,255,.2);
  border-radius:12px;padding:10px 16px;
  font-family:'Press Start 2P',monospace;font-size:9px;font-weight:700;
  color:#cc44ff;cursor:pointer;transition:.2s;
}
.gf-bp-btn:hover{background:rgba(204,68,255,.14);border-color:rgba(204,68,255,.4);}

/* CLAIM MODAL */
#gf-claim-modal {
  position:fixed;inset:0;z-index:9999;
  background:rgba(0,0,0,.78);backdrop-filter:blur(10px);
  display:flex;align-items:center;justify-content:center;padding:20px;
}
.gf-claim-box {
  background:linear-gradient(160deg,#1a0820,#0d0414);
  border:2px solid rgba(204,68,255,.4);
  border-radius:24px;padding:32px 28px;
  max-width:320px;width:100%;text-align:center;
  box-shadow:0 0 60px rgba(204,68,255,.2),0 30px 80px rgba(0,0,0,.8);
  animation:gfPopIn .35s cubic-bezier(.34,1.56,.64,1);
}
.gf-claim-title{
  font-family:'Orbitron',sans-serif;
  font-size:18px;font-weight:700;color:#cc44ff;margin-bottom:6px;
}
.gf-claim-sub{font-size:9px;color:rgba(224,216,255,.5);margin-bottom:20px;}
.gf-claim-img{
  width:100px;height:100px;object-fit:contain;
  display:block;margin:0 auto 12px;
  filter:drop-shadow(0 0 20px rgba(204,68,255,.4));
  animation:gfFloat 2s ease-in-out infinite;
}
.gf-claim-reward-name{font-size:11px;font-weight:700;color:#e0d8ff;margin-bottom:4px;}
.gf-claim-reward-type{
  font-size:9px;font-weight:600;
  color:rgba(224,216,255,.4);letter-spacing:1px;
  text-transform:uppercase;margin-bottom:20px;
}
.gf-claim-take-btn {
  width:100%;
  background:linear-gradient(135deg,#cc44ff,#ff4466);
  border:none;border-radius:16px;padding:14px 0;
  font-family:'Press Start 2P',monospace;font-size:11px;font-weight:800;
  color:#fff;cursor:pointer;
  box-shadow:0 5px 0 #440066,0 0 30px rgba(204,68,255,.4);
  transition:.2s;letter-spacing:.5px;
}
.gf-claim-take-btn:hover{transform:translateY(-2px);}
.gf-claim-take-btn:active{transform:translateY(2px);box-shadow:0 2px 0 #440066;}
.gf-claim-close{
  width:100%;background:none;
  border:1px solid rgba(255,255,255,.1);
  border-radius:12px;padding:10px 0;
  font-family:'Press Start 2P',monospace;font-size:9px;
  color:rgba(255,255,255,.35);cursor:pointer;margin-top:8px;transition:.2s;
}
.gf-claim-close:hover{color:rgba(255,255,255,.6);border-color:rgba(255,255,255,.2);}

/* REGEN TIMER */
.gf-regen-timer{text-align:center;padding:8px;font-size:9px;font-weight:700;color:rgba(224,216,255,.35);letter-spacing:.5px;}
.gf-regen-timer span{color:#cc44ff;}
</style>

<div id="gf-root">
  <!-- HEADER -->
  <div class="gf-header">
    <div class="gf-header-inner">
      <div class="gf-logo-area">
        <div class="gf-logo-line1">🔥 GameFlame Pass</div>
        <div class="gf-logo-line2">Season April 2026</div>
      </div>
      <button class="gf-back-btn" onclick="openEventsMenu()">← Назад</button>
    </div>
  </div>

  ${countdownText ? `<div class="gf-countdown">${countdownText}</div>` : ""}

  <!-- PLAYER CARD -->
  <div class="gf-player-card">
    <div>
      <div class="gf-level-badge">🔥 Рівень ${curLvl} / ${GF_MAX_LEVEL}</div>
      <div class="gf-progress-label">Прогрес до наступного рівня</div>
      <div class="gf-progress-bar">
        <div class="gf-progress-fill" style="width:${progress}%"></div>
      </div>
      <div class="gf-pts-info">
        <span>${pts % GF_PER_LEVEL}</span> / ${GF_PER_LEVEL} BP
        ${curLvl < GF_MAX_LEVEL ? ` — ще <span>${ptsToNext}</span> до рівня ${curLvl+1}` : " — <span>MAX!</span>"}
      </div>
    </div>
    <div class="gf-prem-status">
      <div class="gf-prem-icon">${hasPrem ? "💎" : "🔒"}</div>
      <div class="gf-prem-label">${hasPrem ? "PREMIUM" : "Free Only"}</div>
      <div class="gf-prem-sub">${hasPrem ? "Розблоковано" : "250 нікусів"}</div>
    </div>
  </div>

  ${!hasPrem ? `
  <div class="gf-prem-banner">
    <div style="font-size:42px;flex-shrink:0;">🔥</div>
    <div style="flex:1;">
      <div class="gf-prem-banner-title">Premium Pass</div>
      <div class="gf-prem-banner-desc">Ексклюзивні кейси GameFlame ELITE на кожному рівні + Медаль «Проходження GameFlame Pass» на фінішній лінії</div>
    </div>
    <button class="gf-prem-buy-btn" onclick="gfBuyPremium()">💎 Купити — 250 💰</button>
  </div>` : ""}

  <!-- BP SHOP -->
  <div class="gf-bp-section">
    <div class="gf-bp-section-title">⚡ Купити Battle Points</div>
    <div class="gf-bp-grid">
      <button class="gf-bp-btn" onclick="gfShowBuyBPModal(500,15)">+500 BP — 15💰</button>
      <button class="gf-bp-btn" onclick="gfShowBuyBPModal(1000,25)">+1000 BP — 25💰</button>
      <button class="gf-bp-btn" onclick="gfShowBuyBPModal(3000,60)">+3000 BP — 60💰</button>
      <button class="gf-bp-btn" onclick="gfShowBuyBPModal(6000,100)">+6000 BP — 100💰</button>
    </div>
  </div>

  <!-- TABS -->
  <div class="gf-tabs">
    <button class="gf-tab active" id="gf-tab-free" onclick="gfShowTrack('free')">🎮 Безкоштовний</button>
    <button class="gf-tab" id="gf-tab-prem" onclick="gfShowTrack('premium')">💎 Преміум</button>
  </div>

  <!-- TRACK -->
  <div class="gf-track-wrap">
    <div class="gf-track" id="gf-track"></div>
  </div>
</div>
  `;

  const trackEl = document.querySelector(".gf-track");
  const pct = Math.min((curLvl / GF_MAX_LEVEL) * 100, 100);
if (trackEl) { const pct2 = Math.min((curLvl / GF_MAX_LEVEL) * 100, 100); trackEl.style.setProperty("--gf-prog", pct2 + "%"); }


  gfRenderTrack("free");
}

// ══════════════════════════════════════════════════════════════════
//  ПАТЧ: Кнопка “Зібрати все” для GameFlame Pass
//  Замінити функцію gfRenderTrack() та додати gfClaimAll()
// ══════════════════════════════════════════════════════════════════

// ── Нова функція: зібрати всі доступні нагороди треку ──

function gfClaimAll(track) {
  const hasPrem = gfHasPremium();
  const pts     = gfGetPoints();
  const curLvl  = Math.min(Math.floor(pts / GF_PER_LEVEL), GF_MAX_LEVEL);

  let claimed = 0;
  for (let lvl = 1; lvl <= GF_MAX_LEVEL; lvl++) {
    if (gfIsClaimed(track, lvl)) continue;
    if (track === "premium" && !hasPrem) continue;
    if (lvl > curLvl) continue;

    const r = track === "free" ? gfFreeReward(lvl) : gfPremReward(lvl);
    gfSetClaimed(track, lvl);
    gfGiveReward(r);
    claimed++;
  }

  if (claimed === 0) {
    alert("✅ Немає нових нагород для збору!");
  } else {
    alert(`🎉 Зібрано ${claimed} нагород!`);
  }

  gfRenderTrack(track);
}

function gfRenderTrack(track) {
  const trackEl = document.getElementById("gf-track");
  if (!trackEl) return;

  document.querySelectorAll(".gf-tab").forEach(btn => {
    btn.classList.toggle("active", btn.id === "gf-tab-" + (track === "free" ? "free" : "prem"));
  });

  const hasPrem = gfHasPremium();
  const pts     = gfGetPoints();
  const curLvl  = Math.min(Math.floor(pts / GF_PER_LEVEL), GF_MAX_LEVEL);
  const pct     = Math.min((curLvl / GF_MAX_LEVEL) * 100, 100);
  trackEl.style.setProperty("--gf-prog", pct + "%");

  trackEl.innerHTML = "";

  for (let lvl = 1; lvl <= GF_MAX_LEVEL; lvl++) {
    const r = track === "free" ? gfFreeReward(lvl) : gfPremReward(lvl);
    const claimed   = gfIsClaimed(track, lvl);
    const available = !claimed && lvl <= curLvl && (track === "free" || hasPrem);
    const premLocked = track === "premium" && !hasPrem;
    const locked    = !claimed && !available && !premLocked;

    let stateClass, lvlText, statusText;
    if (claimed) {
      stateClass = "claimed";
      lvlText    = "Lvl " + lvl + " ✓";
      statusText = "✅ Отримано";
    } else if (available) {
      stateClass = "available";
      lvlText    = "Lvl " + lvl;
      statusText = "👆 Забрати!";
    } else if (premLocked) {
      stateClass = "premium-locked";
      lvlText    = "Lvl " + lvl;
      statusText = "💎 Premium";
    } else {
      stateClass = "locked";
      lvlText    = "Lvl " + lvl;
      statusText = "🔒 " + lvl + " рівень";
    }

    const card = document.createElement("div");
    card.className = "gf-card " + stateClass;
    card.innerHTML =
      '<div class="gf-card-lvl">' + lvlText + '</div>' +
      '<img class="gf-card-img" src="' + gfRewardImg(r) + '" alt="">' +
      '<div class="gf-card-name">' + gfRewardLabel(r) + '</div>' +
      '<div class="gf-card-status">' + statusText + '</div>';

    if (available) {
      card.addEventListener("click", function() {
        gfShowClaimModal(track, lvl, r);
      });
    } else if (premLocked) {
      card.addEventListener("click", gfBuyPremium);
    }

    trackEl.appendChild(card);
  }

  let claimAllBtn = document.getElementById("gf-claim-all-btn");
  if (!claimAllBtn) {
    claimAllBtn = document.createElement("div");
    claimAllBtn.id = "gf-claim-all-btn";
    claimAllBtn.style.cssText = "padding:0 20px 16px;";
    trackEl.parentElement.insertBefore(claimAllBtn, trackEl);
  }
  claimAllBtn.innerHTML =
    '<button onclick="gfClaimAll(\'' + track + '\')" style="' +
    'width:100%;background:linear-gradient(135deg,#cc44ff,#ff4466);' +
    'border:none;border-radius:14px;padding:14px 0;' +
    'font-family:\'Press Start 2P\',monospace;font-size:10px;' +
    'font-weight:800;color:#fff;cursor:pointer;letter-spacing:.5px;' +
    'box-shadow:0 4px 0 #440066,0 0 24px rgba(204,68,255,.35);' +
    '">⚡ Зібрати всі доступні</button>';
}

function gfShowTrack(track) {
  document.querySelectorAll(".gf-tab").forEach(btn => {
    btn.classList.toggle("active", btn.id === "gf-tab-" + (track === "free" ? "free" : "prem"));
  });
  gfRenderTrack(track);
}

function gfShowClaimModal(track, lvl, r) {
  document.getElementById("gf-claim-modal")?.remove();

  const ov = document.createElement("div");
  ov.id = "gf-claim-modal";
  ov.addEventListener("click", e => { if (e.target === ov) ov.remove(); });

  const isSpecial = lvl === GF_MAX_LEVEL;
  const bigIcon   = r.type === "medal" ? "🏅" : r.type === "coins" ? "💰" : "🔥";

  ov.innerHTML = `
    <div class="gf-claim-box">
      <div style="font-size:52px;margin-bottom:8px;line-height:1;">${isSpecial ? "🏆" : bigIcon}</div>
      <div class="gf-claim-title">${isSpecial ? "Фінальна нагорода!" : "Рівень " + lvl}</div>
      <div class="gf-claim-sub">${track === "premium" ? "💎 Premium" : "🔥 Free"} Track</div>
      <img class="gf-claim-img" src="${gfRewardImg(r)}" alt="">
      <div class="gf-claim-reward-name">${gfRewardLabel(r)}</div>
      <div class="gf-claim-reward-type">${r.type === "coins" ? "Монети" : r.type === "medal" ? "Медаль" : "Кейс"}</div>
      <button class="gf-claim-take-btn" onclick="gfDoClaim('${track}',${lvl})">🔥 Забрати нагороду!</button>
      <button class="gf-claim-close" onclick="document.getElementById('gf-claim-modal').remove()">Закрити</button>
    </div>
  `;
  document.body.appendChild(ov);
}

// ── видача нагороди ──
function gfDoClaim(track, lvl) {
  const r = track === "free" ? gfFreeReward(lvl) : gfPremReward(lvl);
  gfSetClaimed(track, lvl);
  gfGiveReward(r);
  document.getElementById("gf-claim-modal")?.remove();
  gfRenderTrack(track);
}

// ── покупка premium ──

function gfBuyPremium() {
  if (gfHasPremium()) { alert("У тебе вже є Premium Pass!"); return; }
  if (nikus < 250)  { alert("Недостатньо нікусів! Потрібно 250."); return; }
  nikus -= 250;
  localStorage.setItem(currentUser + "_nikus", nikus);
  gfSetPremium();
  saveData();
  alert("🎉 Premium Pass активовано! Тепер доступні всі преміум-нагороди!");
  openGameFlamePass();
}

// ══════════════════════════════════════════════════════
//  ЗАВДАННЯ — повністю переписано
// ══════════════════════════════════════════════════════

function openTasksMenu() {
  if (!currentUser) return alert("Спочатку увійдіть в акаунт");
  saveTasks();

  const container = document.getElementById("app");

  const diffConfig = {
    easy:   { label: "ЛЕГКЕ",   color: "#4ade80", bg: "rgba(74,222,128,0.08)",  border: "rgba(74,222,128,0.3)",  icon: "🟢" },
    medium: { label: "СЕРЕДНЄ", color: "#f0c050", bg: "rgba(240,192,80,0.08)",  border: "rgba(240,192,80,0.3)",  icon: "🟡" },
    hard:   { label: "СКЛАДНЕ", color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.3)", icon: "🔴" },
  };

  const byDiff = { easy: [], medium: [], hard: [] };
  tasks.forEach(t => {
    const d = t.difficulty || "medium";
    if (byDiff[d]) byDiff[d].push(t);
  });

  function buildCard(t) {
    const d    = diffConfig[t.difficulty || "medium"];
    const rdy  = t.check();
    const done = t.completed;

    let state, stateColor, btnHTML;
    if (done) {
      state = "✅ ВИКОНАНО";
      stateColor = "#4ade80";
      btnHTML = `<div style="padding:8px 16px;background:rgba(74,222,128,0.12);
        border:1px solid rgba(74,222,128,0.3);border-radius:8px;
        color:#4ade80;font-size:10px;font-weight:800;letter-spacing:1px;">✓ BP ЗІБРАНО</div>`;
    } else if (rdy) {
      state = "⚡ ГОТОВО ДО ЗБОРУ";
      stateColor = "#f0c050";
      btnHTML = `<button onclick="tasksClaimReward(${t.id})" style="
        padding:10px 20px;background:linear-gradient(135deg,#f0c050,#e08020);
        border:none;border-radius:8px;color:#111;font-size:11px;font-weight:900;
        cursor:pointer;letter-spacing:.5px;font-family:'Press Start 2P',monospace;
        box-shadow:0 3px 0 #a05010,0 0 16px rgba(240,192,80,0.4);
        transition:.2s;" onmouseover="this.style.transform='translateY(-2px)'"
        onmouseout="this.style.transform='translateY(0)'">
        🎁 ЗАБРАТИ +${t.reward} BP
      </button>`;
    } else {
      state = "⏳ НЕ ВИКОНАНО";
      stateColor = "rgba(200,200,200,0.35)";
      btnHTML = `<div style="padding:8px 16px;background:rgba(255,255,255,0.04);
        border:1px dashed rgba(255,255,255,0.1);border-radius:8px;
        color:rgba(200,200,200,0.3);font-size:10px;letter-spacing:1px;">🔒 НЕДОСТУПНО</div>`;
    }

    return `
      <div style="
        background:${done ? "rgba(74,222,128,0.04)" : d.bg};
        border:1px solid ${done ? "rgba(74,222,128,0.2)" : d.border};
        border-radius:14px;padding:16px;margin-bottom:10px;
        position:relative;overflow:hidden;
        box-shadow:${rdy && !done ? `0 0 20px ${d.color}22` : "none"};
      ">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;
          background:${done ? "#4ade80" : rdy ? "#f0c050" : d.color};
          opacity:${done ? 1 : rdy ? 1 : 0.4};"></div>
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <div style="flex:1;min-width:0;">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
              <div style="background:${d.bg};border:1px solid ${d.border};
                border-radius:20px;padding:3px 10px;color:${d.color};
                font-size:8px;font-weight:800;letter-spacing:1px;
                font-family:'Press Start 2P',monospace;">
                ${d.icon} ${d.label}
              </div>
              <div style="background:rgba(240,192,80,0.1);border:1px solid rgba(240,192,80,0.25);
                border-radius:20px;padding:3px 10px;color:#f0c050;
                font-size:8px;font-weight:800;font-family:'Press Start 2P',monospace;">
                +${t.reward} BP
              </div>
            </div>
            <div style="font-family:'Press Start 2P',monospace;font-size:9px;
              line-height:1.8;color:${done ? "rgba(200,230,200,0.6)" : "#e2e8f0"};
              margin-bottom:12px;">${t.description}</div>
            <div style="font-size:9px;font-weight:700;color:${stateColor};
              margin-bottom:12px;letter-spacing:.5px;">${state}</div>
            ${btnHTML}
          </div>
        </div>
      </div>`;
  }

  const total    = tasks.length;
  const done     = tasks.filter(t => t.completed).length;
  const pct      = Math.round((done / total) * 100);
  const totalBP  = tasks.reduce((s, t) => s + t.reward, 0);
  const earnedBP = tasks.filter(t => t.completed).reduce((s, t) => s + t.reward, 0);

  const easyCards   = byDiff.easy.map(buildCard).join("");
  const mediumCards = byDiff.medium.map(buildCard).join("");
  const hardCards   = byDiff.hard.map(buildCard).join("");

  container.innerHTML = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Press+Start+2P&display=swap');

      #tasks-root {
        font-family: 'Press Start 2P', monospace;
        max-width: 560px;
        margin: 0 auto;
        padding: 0 0 40px;
        color: #e2e8f0;
      }
      .tasks-header {
        background: linear-gradient(180deg, rgba(13,8,32,0.98), transparent);
        padding: 16px 20px 0;
        position: sticky; top: 0; z-index: 80;
        backdrop-filter: blur(14px);
        border-bottom: 2px solid rgba(204,68,255,0.3);
        margin-bottom: 16px;
      }
      .tasks-title {
        font-family: 'Orbitron', sans-serif;
        font-size: 20px; font-weight: 900; letter-spacing: 3px;
        background: linear-gradient(90deg, #cc44ff, #00d4ff, #f0c050);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        filter: drop-shadow(0 0 12px rgba(204,68,255,0.5));
        margin-bottom: 12px;
      }
      .tasks-section-title {
        font-family: 'Orbitron', sans-serif;
        font-size: 9px; font-weight: 700;
        letter-spacing: 3px; text-transform: uppercase;
        margin: 20px 20px 10px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255,255,255,0.07);
      }

      /* ── МОДАЛКА СКИДАННЯ ── */
      #tasks-reset-overlay {
        display: none;
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.75);
        backdrop-filter: blur(8px);
        z-index: 9999;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
      }
      #tasks-reset-overlay.show {
        display: flex;
      }
      .tasks-reset-box {
        background: #1a1a2e;
        border: 1px solid rgba(248,113,113,0.35);
        border-radius: 18px;
        padding: 28px 24px;
        max-width: 340px;
        width: 100%;
        box-shadow: 0 0 50px rgba(248,113,113,0.2), 0 24px 60px rgba(0,0,0,0.8);
        animation: tasksResetIn .25s cubic-bezier(.34,1.56,.64,1);
      }
      @keyframes tasksResetIn {
        from { transform: scale(.85) translateY(20px); opacity: 0; }
        to   { transform: scale(1) translateY(0); opacity: 1; }
      }
      .tasks-reset-title {
        font-family: 'Orbitron', sans-serif;
        font-size: 16px; font-weight: 900;
        color: #f87171; margin: 0 0 8px;
      }
      .tasks-reset-desc {
        font-size: 10px; color: #94a3b8;
        line-height: 1.8; margin: 0 0 18px;
      }
      .tasks-reset-input {
        width: 100%;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 10px;
        color: #fff;
        font-family: 'Press Start 2P', monospace;
        font-size: 13px;
        padding: 12px 14px;
        box-sizing: border-box;
        outline: none;
        margin-bottom: 8px;
        letter-spacing: 2px;
        transition: border-color .2s;
      }
      .tasks-reset-input:focus { border-color: rgba(248,113,113,0.6); }
      .tasks-reset-input.error { border-color: #f87171; animation: trShake .3s ease; }
      @keyframes trShake {
        0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)}
      }
      .tasks-reset-err {
        font-size: 10px; color: #f87171;
        min-height: 16px; margin-bottom: 14px;
      }
      .tasks-reset-btns { display: flex; gap: 10px; }
      .tasks-reset-confirm {
        flex: 1; padding: 12px;
        background: linear-gradient(135deg,#f87171,#e53935);
        border: none; border-radius: 10px;
        color: #fff; font-family: 'Press Start 2P', monospace;
        font-size: 9px; font-weight: 700;
        cursor: pointer; transition: .2s;
      }
      .tasks-reset-confirm:hover { filter: brightness(1.15); }
      .tasks-reset-cancel {
        padding: 12px 16px;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 10px;
        color: #94a3b8; font-family: 'Press Start 2P', monospace;
        font-size: 9px; cursor: pointer; transition: .2s;
      }
      .tasks-reset-cancel:hover { background: rgba(255,255,255,0.12); color: #fff; }
    </style>

    <!-- МОДАЛКА СКИДАННЯ (вбудована в DOM) -->
    <div id="tasks-reset-overlay" onclick="if(event.target===this) tasksCloseReset()">
      <div class="tasks-reset-box">
        <div class="tasks-reset-title">🔐 Скинути завдання</div>
        <div class="tasks-reset-desc">
          Введіть адмін-пароль щоб скинути прогрес усіх завдань.
        </div>
        <input
          type="password"
          id="tasks-reset-inp"
          class="tasks-reset-input"
          placeholder="Пароль"
          autocomplete="off"
          onkeydown="if(event.key==='Enter') tasksConfirmReset()">
        <div class="tasks-reset-err" id="tasks-reset-err"></div>
        <div class="tasks-reset-btns">
          <button class="tasks-reset-confirm" onclick="tasksConfirmReset()">🔄 Скинути</button>
          <button class="tasks-reset-cancel" onclick="tasksCloseReset()">Скасувати</button>
        </div>
      </div>
    </div>

    <div id="tasks-root">
      <div class="tasks-header">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <div class="tasks-title">🎯 ЗАВДАННЯ</div>
          <button onclick="openEventsMenu()" style="
            margin-left:auto;background:rgba(204,68,255,0.1);
            border:1px solid rgba(204,68,255,0.3);color:#cc44ff;
            border-radius:8px;padding:8px 14px;
            font-family:'Press Start 2P',monospace;font-size:9px;
            cursor:pointer;transition:.2s;white-space:nowrap;
          " onmouseover="this.style.background='rgba(204,68,255,0.2)'"
             onmouseout="this.style.background='rgba(204,68,255,0.1)'">← НАЗАД</button>
        </div>

        <!-- Прогрес -->
        <div style="margin-bottom:14px;">
          <div style="display:flex;justify-content:space-between;
            font-size:9px;color:rgba(200,200,255,0.45);margin-bottom:6px;">
            <span>Виконано: <span style="color:#cc44ff">${done}</span> / ${total}</span>
            <span>BP: <span style="color:#f0c050">${earnedBP}</span> / ${totalBP}</span>
          </div>
          <div style="height:8px;background:rgba(255,255,255,0.06);
            border-radius:99px;overflow:hidden;border:1px solid rgba(255,255,255,0.04);">
            <div style="
              height:100%;width:${pct}%;border-radius:99px;
              background:linear-gradient(90deg,#cc44ff,#00d4ff,#f0c050);
              box-shadow:0 0 12px rgba(204,68,255,0.5);
              transition:width .5s ease;
            "></div>
          </div>
        </div>
      </div>

      <!-- Адмін скидання -->
      <div style="padding:0 20px;margin-bottom:12px;">
        <button onclick="tasksOpenReset()" style="
          width:100%;padding:10px;
          background:rgba(248,113,113,0.07);
          border:1px solid rgba(248,113,113,0.2);
          border-radius:8px;color:#f87171;
          font-family:'Press Start 2P',monospace;font-size:8px;
          cursor:pointer;transition:.2s;letter-spacing:.5px;
        " onmouseover="this.style.background='rgba(248,113,113,0.15)'"
           onmouseout="this.style.background='rgba(248,113,113,0.07)'">
          🔐 АДМІН: СКИНУТИ ЗАВДАННЯ
        </button>
      </div>

      <!-- ЛЕГКІ -->
      <div class="tasks-section-title" style="color:#4ade80;">
        🟢 ЛЕГКІ — ${byDiff.easy.filter(t=>t.completed).length}/${byDiff.easy.length}
      </div>
      <div style="padding:0 20px;">${easyCards}</div>

      <!-- СЕРЕДНІ -->
      <div class="tasks-section-title" style="color:#f0c050;">
        🟡 СЕРЕДНІ — ${byDiff.medium.filter(t=>t.completed).length}/${byDiff.medium.length}
      </div>
      <div style="padding:0 20px;">${mediumCards}</div>

      <!-- СКЛАДНІ -->
      <div class="tasks-section-title" style="color:#f87171;">
        🔴 СКЛАДНІ — ${byDiff.hard.filter(t=>t.completed).length}/${byDiff.hard.length}
      </div>
      <div style="padding:0 20px;">${hardCards}</div>
    </div>
  `;
}

// ── Видача нагороди за завдання → GameFlame BP ──────────────────
function tasksClaimReward(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;
  if (task.completed) {
    alert("✅ Нагорода вже забрана!");
    return;
  }
  if (!task.check()) {
    alert("⏳ Завдання ще не виконано!");
    return;
  }
  // Нараховуємо BP до GameFlame Pass
  gfAddPoints(task.reward);
  task.completed = true;
  saveTasks();
  saveData();
  // Показуємо підтвердження і перемальовуємо
  const toast = document.createElement("div");
  toast.textContent = `+${task.reward} BP нараховано до GameFlame Pass! 🔥`;
  toast.style.cssText = `
    position:fixed;bottom:28px;left:50%;
    transform:translateX(-50%) translateY(20px);
    background:linear-gradient(90deg,#1a0820,#cc44ff33);
    border:1px solid rgba(240,192,80,0.4);border-radius:50px;
    padding:12px 26px;color:#f0c050;
    font-family:'Press Start 2P',monospace;font-size:10px;font-weight:700;
    z-index:99999;pointer-events:none;opacity:0;
    transition:all .35s cubic-bezier(.34,1.56,.64,1);white-space:nowrap;
    box-shadow:0 8px 30px rgba(0,0,0,.6);
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });
  setTimeout(() => { toast.remove(); }, 3000);
  openTasksMenu();
}

// ── Модалка скидання ────────────────────────────────────────────
function tasksOpenReset() {
  const ov = document.getElementById("tasks-reset-overlay");
  if (!ov) return;
  const inp = document.getElementById("tasks-reset-inp");
  const err = document.getElementById("tasks-reset-err");
  if (inp) inp.value = "";
  if (err) err.textContent = "";
  ov.classList.add("show");
  setTimeout(() => { if (inp) inp.focus(); }, 80);
}

function tasksCloseReset() {
  const ov = document.getElementById("tasks-reset-overlay");
  if (ov) ov.classList.remove("show");
}

function tasksConfirmReset() {
  const inp = document.getElementById("tasks-reset-inp");
  const err = document.getElementById("tasks-reset-err");
  if (!inp) return;

  const ADMIN_PASS = "5242";
  if (inp.value.trim() !== ADMIN_PASS) {
    err.textContent = "❌ Невірний пароль!";
    inp.classList.add("error");
    inp.value = "";
    setTimeout(() => {
      inp.classList.remove("error");
      err.textContent = "";
      inp.focus();
    }, 900);
    return;
  }

  // Скидаємо всі завдання
  tasks.forEach(t => { t.completed = false; });
  localStorage.removeItem("tasksData");
  saveTasks();

  tasksCloseReset();
  openTasksMenu();

  // Тост про успіх
  const toast = document.createElement("div");
  toast.textContent = "✅ Завдання скинуто!";
  toast.style.cssText = `
    position:fixed;bottom:28px;left:50%;
    transform:translateX(-50%);
    background:linear-gradient(90deg,#1a2a0a,#4ade8033);
    border:1px solid rgba(74,222,128,0.4);border-radius:50px;
    padding:12px 26px;color:#4ade80;
    font-family:'Press Start 2P',monospace;font-size:10px;font-weight:700;
    z-index:99999;pointer-events:none;
    box-shadow:0 8px 30px rgba(0,0,0,.6);
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

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

// ═══════════════════════════════════════════════════════════════════
// ЗАВДАННЯ — оновлений блок
// ═══════════════════════════════════════════════════════════════════

const tasks = [

  // ── ЛЕГКІ (3) ────────────────────────────────────────────────────
  {
    id: 4001,
    description: "Отримати будь-який Звичайний предмет з GameFlame26",
    reward: 500,
    difficulty: "easy",
    check: () => inventory.some(i =>
      i.type === "item" && i.rarity === "Звичайна" &&
      ["Джарвіс?","Бик"].includes(i.name)
    ),
    completed: false
  },
  {
    id: 4002,
    description: "Отримати будь-який Звичайний предмет з ArcadeOverdrive",
    reward: 500,
    difficulty: "easy",
    check: () => inventory.some(i =>
      i.type === "item" && i.rarity === "Звичайна" &&
      ["ДедІнсайд","Шакал"].includes(i.name)
    ),
    completed: false
  },
  {
    id: 4003,
    description: "Отримати будь-який Звичайний предмет з ArbitrationCase",
    reward: 500,
    difficulty: "easy",
    check: () => inventory.some(i =>
      i.type === "item" && i.rarity === "Звичайна" &&
      ["Шайлушай","!Арбітраж"].includes(i.name)
    ),
    completed: false
  },

  // ── СЕРЕДНІ (6) ──────────────────────────────────────────────────
  {
    id: 4004,
    description: "Отримати Виняткового з GameFlame26 у якості «Після уроку» або кращій",
    reward: 1000,
    difficulty: "medium",
    check: () => inventory.some(i =>
      i.type === "item" &&
      ["Тємщик","Підозріло"].includes(i.name) &&
      ["Після уроку","Після консервації","Прямо з цеху"].includes(i.quality)
    ),
    completed: false
  },
  {
    id: 4005,
    description: "Отримати Виняткового з ArcadeOverdrive у якості «Після уроку» або кращій",
    reward: 1000,
    difficulty: "medium",
    check: () => inventory.some(i =>
      i.type === "item" &&
      ["Зʼйобуєм","О,ні"].includes(i.name) &&
      ["Після уроку","Після консервації","Прямо з цеху"].includes(i.quality)
    ),
    completed: false
  },
  {
    id: 4006,
    description: "Отримати Епічного з ArbitrationCase",
    reward: 1000,
    difficulty: "medium",
    check: () => inventory.some(i =>
      i.type === "item" && i.rarity === "Епічна" &&
      ["Анонімуси","Гробовщики"].includes(i.name)
    ),
    completed: false
  },
  {
    id: 4007,
    description: "Зібрати по одному Виняткову з усіх трьох: GameFlame26, ArcadeOverdrive та ArbitrationCase",
    reward: 1500,
    difficulty: "medium",
    check: () =>
      inventory.some(i => i.type === "item" && ["Тємщик","Підозріло"].includes(i.name)) &&
      inventory.some(i => i.type === "item" && ["Зʼйобуєм","О,ні"].includes(i.name)) &&
      inventory.some(i => i.type === "item" && ["ТвояКонтрольна","Чорнобаївка"].includes(i.name)),
    completed: false
  },
  {
    id: 4008,
    description: "Отримати Секретного з Весна26 у якості «Після консервації» або «Прямо з цеху»",
    reward: 1500,
    difficulty: "medium",
    check: () => inventory.some(i =>
      i.type === "item" &&
      ["Потужно","Морські Котики"].includes(i.name) &&
      ["Після консервації","Прямо з цеху"].includes(i.quality)
    ),
    completed: false
  },
  {
    id: 4009,
    description: "Зібрати всі 4 Виняткові з GameFlame26: Тємщик, Підозріло та Епічні Токсис, ГраАрбітраж",
    reward: 2000,
    difficulty: "medium",
    check: () =>
      inventory.some(i => i.type === "item" && i.name === "Тємщик") &&
      inventory.some(i => i.type === "item" && i.name === "Підозріло") &&
      inventory.some(i => i.type === "item" && i.name === "Токсис") &&
      inventory.some(i => i.type === "item" && i.name === "ГраАрбітраж"),
    completed: false
  },

  // ── СКЛАДНІ (2) ──────────────────────────────────────────────────
  {
    id: 4010,
    description: "Отримати Спеціального з GameFlame26 або ArcadeOverdrive (Спеціальна рідкість)",
    reward: 3500,
    difficulty: "hard",
    check: () => inventory.some(i =>
      i.type === "item" && i.rarity === "Спеціальна" &&
      ["АнтонЧигур","СоулРешала","Сократ","ДревнійСкелет"].includes(i.name)
    ),
    completed: false
  },
  {
    id: 4011,
    description: "Отримати Спеціального з ArbitrationCase або GameFlame26 у Преміум та «Прямо з цеху» — ультра комбо!",
    reward: 5000,
    difficulty: "hard",
    check: () => inventory.some(i =>
      i.type === "item" && i.rarity === "Спеціальна" &&
      i.premium === true && i.quality === "Прямо з цеху" &&
      ["АнтонЧигур","СоулРешала","Габен","ПесДюк","Сократ","ДревнійСкелет"].includes(i.name)
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

<h3 style="color:#cc44ff; margin-bottom:10px;">🔥 Скидання GameFlame Pass</h3>
<p style="font-size:13px; color:rgba(255,255,255,.5); margin-bottom:10px;">Скидає прогрес GameFlame Pass. Потрібен спеціальний пароль.</p>
<input type="password" id="gfResetPassInput" placeholder="Пароль скидання"
       style="padding:8px 12px; border-radius:8px; border:1px solid rgba(255,255,255,.2); background:rgba(0,0,0,.3); color:#fff; width:200px; margin-bottom:8px; display:block;"/>
<button onclick="gfResetFromMenu()" style="
    background:linear-gradient(90deg,#cc44ff,#7700cc);
    border:none; border-radius:8px;
    padding:10px 20px;
    color:#fff; font-weight:700; font-size:14px;
    cursor:pointer; margin-bottom:16px;
">🔄 Скинути GameFlame BP</button>

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

// ── Скидання через меню акаунту ──
function gfResetFromMenu() {
  const input = document.getElementById("gfResetPassInput");
  if (!input) return;
  const pass = input.value.trim();
  if (!pass) {
    alert("Введіть пароль!");
    input.style.borderColor = "#ff4466";
    setTimeout(() => input.style.borderColor = "rgba(255,255,255,.2)", 1500);
    return;
  }
  const success = gfResetPass(pass);
  if (!success) {
    alert("❌ Невірний пароль!");
    input.value = "";
    input.style.borderColor = "#ff4466";
    setTimeout(() => input.style.borderColor = "rgba(255,255,255,.2)", 1500);
    return;
  }
  input.value = "";
  alert("✅ GameFlame Pass успішно скинуто!\n\nСкинуто:\n• Очки BP → 0\n• Всі отримані нагороди\n• Преміум статус");
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

"RE9HQ0FTRTE0ODg=": {type:"unlimited", reward:()=>{addCase("dogcollection"); alert("Отримано кейс DogCollection!");}},  

"Q0FUQ0FTRTE0ODg=": {type:"unlimited", reward:()=>{addCase("catcollection"); alert("Отримано кейс CatCollection!");}},  

"V0lOVEVSRFJFQU1TT0tBSw==": {type:"unlimited", reward:()=>{addCase("WDGASTER"); alert("Отримано кейс WinterDreams!");}},  

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
// ЗАМІНИТИ функцію MenuStarterPass у script.js
// Нові ключі збереження: _starter4_* (щоб скинути прогрес)
// Дизайн: темний аркадний (як у style.css)
// =====================================================

function MenuStarterPass() {
  if (!currentUser) return;

  const container = document.getElementById("app");

  const COOLDOWN_MS = 20 * 60 * 60 * 1000; // 20 годин

  // ★ НОВІ ключі — люди з попереднім пасом починають знову
  let lastClaimTime = parseInt(localStorage.getItem(currentUser + "_starter4_lastClaimTime") || "0");
  let dayIndex = parseInt(localStorage.getItem(currentUser + "_starter4_index") || "0");
  let modalShown = localStorage.getItem(currentUser + "_starter4_modalShown") === "true";

  const starterRewards = [
    { day: 1, reward: "gameflam",   type: "case" },
    { day: 2, reward: "arcadeover", type: "case" },
    { day: 3, reward: "arbitr",     type: "case" },
    { day: 4, reward: "arcadeover", type: "case" },
    { day: 5, reward: "gameflam",   type: "case" },
    { day: 6, reward: "arbitr",     type: "case" },
    { day: 7, reward: "gameflamE",  type: "case" },
  ];

  const now = Date.now();
  const timeSinceLast = now - lastClaimTime;
  const canClaimNext = lastClaimTime === 0 || timeSinceLast >= COOLDOWN_MS;
  const timeUntilNext = lastClaimTime === 0 ? 0 : Math.max(0, COOLDOWN_MS - timeSinceLast);

  function format(ms) {
    let h = Math.floor(ms / 3600000),
        m = Math.floor((ms % 3600000) / 60000),
        s = Math.floor((ms % 60000) / 1000);
    return `${h}г ${m}хв ${s}с`;
  }

  const caseLabels = {
    "gameflam":  "🔥 GameFlame26",
    "arcadeover":"🕹 ArcadeOverdrive",
    "arbitr":    "⚖️ ArbitrationCase",
    "gameflamE": "💎 GameFlame26 ELITE",
  };

  container.innerHTML = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Orbitron:wght@700;900&display=swap');

      #sp4-root {
        font-family: 'Press Start 2P', monospace;
        min-height: 100vh;
        background:
          radial-gradient(ellipse at 50% 0%, #cc44ff22 0%, transparent 60%),
          radial-gradient(ellipse at 80% 100%, #ff00cc22 0%, transparent 55%),
          linear-gradient(160deg, #0d0820 0%, #1a0a3a 40%, #0a0628 100%);
        color: #e0d8ff;
        padding: 0 0 50px;
        box-sizing: border-box;
        position: relative;
      }

      /* Scanline */
      #sp4-root::before {
        content: "";
        position: fixed; inset: 0;
        background-image: repeating-linear-gradient(
          0deg, transparent, transparent 2px,
          rgba(204,68,255,0.03) 2px, rgba(204,68,255,0.03) 4px
        );
        pointer-events: none; z-index: 0;
        animation: sp4Scan 8s linear infinite;
      }
      @keyframes sp4Scan {
        from { background-position: 0 0; }
        to   { background-position: 0 40px; }
      }

      /* HEADER */
      .sp4-header {
        background: linear-gradient(90deg,
          #0d0820, #cc44ff33, #ff00cc33, #00d4ff33, #cc44ff33, #0d0820
        );
        border-bottom: 2px solid #cc44ff;
        box-shadow: 0 6px 20px rgba(204,68,255,0.45);
        padding: 14px 20px;
        display: flex; align-items: center; gap: 12px;
        position: sticky; top: 0; z-index: 80;
        backdrop-filter: blur(12px);
      }
      .sp4-header-title {
        font-family: 'Orbitron', sans-serif;
        font-size: 16px; font-weight: 900; letter-spacing: 3px;
        flex: 1;
        background: linear-gradient(90deg, #cc44ff, #00d4ff, #ff00cc);
        background-size: 200% auto;
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        animation: sp4Shimmer 3s linear infinite;
        filter: drop-shadow(0 0 12px rgba(204,68,255,0.6));
      }
      @keyframes sp4Shimmer {
        from { background-position: 0% center; }
        to   { background-position: 200% center; }
      }
      .sp4-back-btn {
        background: rgba(204,68,255,0.1);
        border: 1px solid rgba(204,68,255,0.4);
        color: #cc44ff;
        border-radius: 4px; padding: 7px 14px;
        font-family: 'Press Start 2P', monospace; font-size: 9px;
        cursor: pointer; transition: .2s; letter-spacing: .5px;
      }
      .sp4-back-btn:hover {
        background: rgba(204,68,255,0.25);
        box-shadow: 0 0 16px rgba(204,68,255,0.5);
      }

      /* INFO BAR */
      .sp4-info-bar {
        display: flex; justify-content: space-between; align-items: center;
        padding: 10px 20px;
        background: rgba(13,8,32,0.9);
        border-bottom: 1px solid rgba(204,68,255,0.15);
        flex-wrap: wrap; gap: 8px;
        position: relative; z-index: 1;
      }
      .sp4-timer-chip {
        background: linear-gradient(90deg, rgba(204,68,255,0.15), rgba(255,0,204,0.1));
        border: 1px solid rgba(204,68,255,0.4);
        color: #cc44ff;
        border-radius: 4px; padding: 6px 14px;
        font-size: 9px; font-weight: 700;
        box-shadow: 0 0 12px rgba(204,68,255,0.3);
      }
      .sp4-progress-chip {
        background: linear-gradient(90deg, rgba(0,212,255,0.15), rgba(0,212,255,0.08));
        border: 1px solid rgba(0,212,255,0.4);
        color: #00d4ff;
        border-radius: 4px; padding: 6px 14px;
        font-size: 9px; font-weight: 700;
        box-shadow: 0 0 12px rgba(0,212,255,0.3);
      }

      /* SCROLL TRACK */
      .sp4-scroll-wrap {
        overflow-x: auto; padding: 32px 20px 16px;
        scrollbar-width: thin;
        scrollbar-color: #cc44ff #0d0820;
        position: relative; z-index: 1;
      }
      .sp4-scroll-wrap::-webkit-scrollbar { height: 4px; }
      .sp4-scroll-wrap::-webkit-scrollbar-thumb {
        background: #cc44ff; border-radius: 4px;
      }

      .sp4-track {
        display: flex; gap: 12px;
        align-items: flex-end;
        min-width: max-content;
        padding-bottom: 10px;
        position: relative;
      }
      .sp4-track::before {
        content: '';
        position: absolute; top: 58px;
        left: 70px; right: 70px; height: 3px;
        background: linear-gradient(90deg,
          #7700cc, #cc44ff, #ff00cc, #00d4ff, #cc44ff, #7700cc);
        border-radius: 4px; z-index: 0;
        box-shadow: 0 0 10px rgba(204,68,255,0.5);
      }

      /* CARD */
      .sp4-card {
        position: relative; z-index: 1;
        width: 140px; border-radius: 4px;
        padding: 14px 10px 12px;
        text-align: center; cursor: pointer;
        transition: transform .2s, box-shadow .2s;
        flex-shrink: 0;
        border: 2px solid transparent;
        image-rendering: pixelated;
      }
      .sp4-card:hover { transform: translateY(-6px); }
      .sp4-card:active { transform: scale(0.96); }

      .sp4-card.claimed {
        background: linear-gradient(160deg, rgba(204,68,255,0.08), rgba(13,8,40,0.95));
        border-color: rgba(204,68,255,0.4);
        box-shadow: 0 0 18px rgba(204,68,255,0.2);
      }
      .sp4-card.available {
        background: linear-gradient(160deg, rgba(204,68,255,0.15), rgba(255,0,204,0.08));
        border-color: #cc44ff;
        box-shadow:
          0 0 25px rgba(204,68,255,0.6),
          0 0 50px rgba(204,68,255,0.2),
          inset 0 0 20px rgba(204,68,255,0.05);
        animation: sp4Pulse 2s ease-in-out infinite;
      }
      @keyframes sp4Pulse {
        0%,100% { box-shadow: 0 0 25px rgba(204,68,255,0.6), 0 0 50px rgba(204,68,255,0.2); }
        50%      { box-shadow: 0 0 40px rgba(204,68,255,0.9), 0 0 70px rgba(0,212,255,0.3); }
      }
      .sp4-card.locked {
        background: rgba(13,8,40,0.7);
        border-color: rgba(204,68,255,0.15);
        opacity: 0.65; cursor: not-allowed;
      }

      .sp4-day-badge {
        position: absolute; top: -13px; left: 50%;
        transform: translateX(-50%);
        font-size: 8px; font-weight: 700;
        padding: 3px 10px; border-radius: 3px;
        white-space: nowrap; letter-spacing: .5px;
      }
      .claimed .sp4-day-badge {
        background: rgba(204,68,255,0.3);
        color: #cc44ff;
        box-shadow: 0 0 8px rgba(204,68,255,0.4);
      }
      .available .sp4-day-badge {
        background: linear-gradient(90deg,#7700cc,#cc44ff);
        color: #fff;
        box-shadow: 0 0 12px rgba(204,68,255,0.6);
      }
      .locked .sp4-day-badge {
        background: rgba(204,68,255,0.1);
        color: rgba(224,216,255,0.35);
      }

      .sp4-card-img {
        width: 90px; height: 90px; object-fit: contain;
        display: block; margin: 8px auto 6px;
        filter: drop-shadow(0 0 12px rgba(204,68,255,0.4));
        transition: transform .2s;
        image-rendering: pixelated;
      }
      .available .sp4-card-img {
        animation: sp4Float 2.5s ease-in-out infinite;
        filter: drop-shadow(0 0 18px rgba(204,68,255,0.7));
      }
      @keyframes sp4Float {
        0%,100% { transform: translateY(0); }
        50%      { transform: translateY(-5px); }
      }
      .locked .sp4-card-img { filter: grayscale(0.7) brightness(0.4); }

      .sp4-card-name {
        font-size: 8px; font-weight: 700;
        color: #d8c8ff; line-height: 1.4;
        word-wrap: break-word; white-space: normal;
        margin-bottom: 6px;
        text-shadow: 0 0 6px rgba(204,68,255,0.3);
      }
      .sp4-card-action {
        font-size: 8px; font-weight: 700;
        letter-spacing: .5px;
      }
      .claimed .sp4-card-action  { color: #cc44ff; text-shadow: 0 0 8px rgba(204,68,255,0.5); }
      .available .sp4-card-action { color: #00d4ff; text-shadow: 0 0 8px rgba(0,212,255,0.6); }
      .locked .sp4-card-action   { color: rgba(204,68,255,0.3); }

      /* MODAL */
      #sp4-modal {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.85);
        backdrop-filter: blur(8px);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000; padding: 20px;
      }
      .sp4-modal-box {
        background: linear-gradient(160deg, #0d0820, #08041a);
        border: 2px solid #cc44ff;
        border-radius: 4px; padding: 28px 24px 24px;
        max-width: 320px; width: 100%;
        text-align: center;
        box-shadow:
          0 0 50px rgba(204,68,255,0.6),
          inset 0 0 30px rgba(204,68,255,0.04);
        animation: sp4ModalIn .3s cubic-bezier(.34,1.56,.64,1);
        font-family: 'Press Start 2P', monospace;
        color: #e0d8ff;
      }
      @keyframes sp4ModalIn {
        from { transform: scale(.7) translateY(20px); opacity: 0; }
        to   { transform: scale(1)  translateY(0);    opacity: 1; }
      }
      .sp4-modal-box h3 {
        font-family: 'Orbitron', sans-serif;
        font-size: 15px; color: #cc44ff; margin: 0 0 8px;
        text-shadow: 0 0 14px rgba(204,68,255,0.7);
      }
      .sp4-modal-box p { font-size: 9px; color: #a090cc; line-height: 2; margin: 0 0 20px; }
      .sp4-modal-btn {
        background: linear-gradient(45deg, #7700cc, #cc44ff, #ff00cc);
        color: #f0d0ff; border: none; border-radius: 4px;
        padding: 12px 32px;
        font-family: 'Press Start 2P', monospace; font-size: 9px; font-weight: 700;
        cursor: pointer;
        box-shadow: 0 4px 0 #44006688, 0 0 20px rgba(204,68,255,0.5);
        transition: .2s; letter-spacing: .5px;
      }
      .sp4-modal-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 0 #44006688, 0 0 30px rgba(204,68,255,0.8);
      }
    </style>

    <div id="sp4-root">
      <div class="sp4-header">
        <button class="sp4-back-btn" onclick="openEventsMenu()">← Назад</button>
        <div class="sp4-header-title">🔥 Аркадний Стартер Пас</div>
      </div>

      <div class="sp4-info-bar">
        <div class="sp4-timer-chip">
          ⏱ До нагороди:
          <span id="sp4-timer-val">${canClaimNext ? "Доступно!" : format(timeUntilNext)}</span>
        </div>
        <div class="sp4-progress-chip">✅ Зібрано: ${dayIndex} / 7 днів</div>
      </div>

      <div class="sp4-scroll-wrap">
        <div class="sp4-track" id="sp4-track"></div>
      </div>
    </div>
  `;

  // Рендер карточок
  const track = document.getElementById("sp4-track");

  starterRewards.forEach(r => {
    const claimed   = r.day <= dayIndex;
    const available = r.day === dayIndex + 1 && canClaimNext;
    const locked    = !claimed && !available;

    const stateClass = claimed ? "claimed" : available ? "available" : "locked";
    const dayText    = claimed ? `День ${r.day} ✓` : available ? `День ${r.day} — ЗАРАЗ!` : `День ${r.day} 🔒`;
    const action     = claimed ? "✅ Отримано" : available ? "▶ Натисни!" : "🔒 Заблок.";

    const card = document.createElement("div");
    card.className = `sp4-card ${stateClass}`;
    card.innerHTML = `
      <div class="sp4-day-badge">${dayText}</div>
      <img class="sp4-card-img" src="img/case_${r.reward}.png" alt="">
      <div class="sp4-card-name">${caseLabels[r.reward] || r.reward}</div>
      <div class="sp4-card-action">${action}</div>
    `;

    if (available) {
      card.addEventListener("click", () => {
        localStorage.setItem(currentUser + "_starter4_lastClaimTime", Date.now().toString());
        localStorage.setItem(currentUser + "_starter4_index", r.day.toString());
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

  // Таймер
  if (!canClaimNext) {
    function tick() {
      const el = document.getElementById("sp4-timer-val");
      if (!el) return;
      const remaining = Math.max(0, COOLDOWN_MS - (Date.now() - lastClaimTime));
      if (remaining <= 0) {
        el.textContent = "Доступно!";
        MenuStarterPass();
        return;
      }
      el.textContent = format(remaining);
      requestAnimationFrame(tick);
    }
    tick();
  }

  // Вітальна модалка
  if (!modalShown) {
    const modalDiv = document.createElement("div");
    modalDiv.id = "sp4-modal";
    modalDiv.innerHTML = `
      <div class="sp4-modal-box">
        <div style="font-size:48px;margin-bottom:10px;line-height:1;">🔥</div>
        <h3>Аркадний Стартер Пас!</h3>
        <p>7 днів — 7 нагород!<br>Заходь кожні <b style="color:#cc44ff">20 годин</b><br>і забирай аркадні кейси 🎮</p>
        <button class="sp4-modal-btn" id="sp4-modal-close-btn">▶ Погнали!</button>
      </div>
    `;
    document.body.appendChild(modalDiv);
    document.getElementById("sp4-modal-close-btn").onclick = () => {
      modalDiv.remove();
      localStorage.setItem(currentUser + "_starter4_modalShown", "true");
    };
  }
}

function startSnowfall() {
  const snowflakeCount = 30;
  const symbols = ["🎮", "👾", "🎮"]; //ігрові символи

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

// ==================== 🌿 САД — НОВИЙ ДИЗАЙН ====================

function _injectGardenCSS() {
  if (document.getElementById("garden-style")) return;
  const s = document.createElement("style");
  s.id = "garden-style";
  s.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Orbitron:wght@700;900&display=swap');

#garden-root {
  font-family: 'Press Start 2P', monospace;
  min-height: 100vh;
  background:
    radial-gradient(ellipse at 30% 10%, rgba(0,200,80,.10) 0%, transparent 55%),
    radial-gradient(ellipse at 75% 90%, rgba(204,68,255,.08) 0%, transparent 50%),
    linear-gradient(160deg, #040d06 0%, #0a1a0c 45%, #060d15 100%);
  color: #c8f0d0;
  padding: 0 0 60px;
  box-sizing: border-box;
}

/* SCANLINE */
#garden-root::before {
  content:'';position:fixed;inset:0;
  background-image: repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,200,80,.02) 2px,rgba(0,200,80,.02) 4px);
  pointer-events:none;z-index:0;
}

/* ── HEADER ── */
.gd-header {
  background: linear-gradient(180deg,rgba(4,13,6,.98),transparent);
  padding: 16px 20px 0;
  position: sticky; top: 0; z-index: 80;
  backdrop-filter: blur(14px);
  border-bottom: 2px solid rgba(0,200,80,.3);
  box-shadow: 0 6px 20px rgba(0,200,80,.12);
}
.gd-header-row {
  display: flex; align-items: center; gap: 14px;
  padding-bottom: 12px; flex-wrap: wrap;
}
.gd-logo {
  font-family: 'Orbitron', sans-serif;
  font-size: 20px; font-weight: 900; letter-spacing: 3px;
  flex: 1;
  background: linear-gradient(90deg, #00ff88, #7fff44, #ccff00);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 12px rgba(0,255,136,.5));
  animation: gdShimmer 4s linear infinite;
  background-size: 200% auto;
}
@keyframes gdShimmer {
  from { background-position: 0% center; }
  to   { background-position: 200% center; }
}
.gd-back-btn {
  background: rgba(0,200,80,.08);
  border: 1px solid rgba(0,200,80,.3);
  color: rgba(0,255,136,.6);
  border-radius: 6px; padding: 8px 16px;
  font-family: 'Press Start 2P', monospace; font-size: 9px;
  cursor: pointer; transition: .2s;
}
.gd-back-btn:hover { background: rgba(0,200,80,.18); color: #00ff88; }
.gd-balance-chip {
  background: rgba(255,215,0,.1);
  border: 1px solid rgba(255,215,0,.3);
  border-radius: 20px; padding: 6px 14px;
  font-size: 10px; font-weight: 700; color: #ffd966;
  box-shadow: 0 0 10px rgba(255,215,0,.15);
}
.gd-water-chip {
  background: rgba(0,200,255,.1);
  border: 1px solid rgba(0,200,255,.3);
  border-radius: 20px; padding: 6px 14px;
  font-size: 10px; font-weight: 700; color: #44ddff;
  box-shadow: 0 0 10px rgba(0,200,255,.15);
}

/* ── TABS ── */
.gd-tabs {
  display: flex; gap: 0; margin: 12px 20px 0;
  background: rgba(0,200,80,.04);
  border: 1px solid rgba(0,200,80,.12);
  border-radius: 8px; overflow: hidden;
}
.gd-tab {
  flex: 1; padding: 10px 6px;
  text-align: center; cursor: pointer;
  font-size: 8px; font-weight: 700; letter-spacing: .5px;
  color: rgba(200,240,210,.35);
  border: none; background: none;
  font-family: 'Press Start 2P', monospace;
  transition: .2s; text-transform: uppercase;
}
.gd-tab.active {
  background: rgba(0,200,80,.12);
  color: #00ff88;
  box-shadow: inset 0 -2px 0 #00ff88;
}
.gd-tab:hover:not(.active) { color: rgba(200,240,210,.6); }

/* ── MAIN CONTENT ── */
.gd-content { padding: 16px 20px; position: relative; z-index: 1; }

/* ════════════════════════════════════
   ГРЯДКИ (FIELD)
════════════════════════════════════ */
.gd-field-wrap {
  background:
    repeating-linear-gradient(
      0deg,
      rgba(0,100,30,.15) 0px, rgba(0,100,30,.15) 1px,
      transparent 1px, transparent 18px
    ),
    linear-gradient(160deg, #030f05, #051408);
  border: 2px solid rgba(0,200,80,.2);
  border-radius: 16px;
  padding: 24px 16px 20px;
  position: relative;
  box-shadow:
    0 0 40px rgba(0,100,30,.3),
    inset 0 0 60px rgba(0,50,15,.5);
  margin-bottom: 20px;
}

/* Декор: огорожа зверху */
.gd-field-wrap::before {
  content: '';
  position: absolute;
  top: -14px; left: 50%; transform: translateX(-50%);
  background: linear-gradient(90deg, transparent, rgba(4,13,6,.95), transparent);
  font-size: 11px;
  white-space: nowrap; letter-spacing: 2px;
  padding: 0 10px;
}

.gd-field-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 9px; font-weight: 700;
  letter-spacing: 3px; text-transform: uppercase;
  color: rgba(0,255,136,.4);
  text-align: center; margin-bottom: 18px;
}

/* Сітка грядок */
.gd-plots-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

/* Одна клітинка грядки */
.gd-plot {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  cursor: pointer;
  border-radius: 10px;
  transition: transform .2s, box-shadow .2s;
}
.gd-plot:hover { transform: translateY(-3px); }
.gd-plot:active { transform: scale(.95); }

/* Порожня грядка — намальована землею */
.gd-plot-empty {
  background:
    repeating-linear-gradient(
      45deg,
      rgba(80,50,20,.4) 0px, rgba(80,50,20,.4) 2px,
      rgba(50,30,10,.3) 2px, rgba(50,30,10,.3) 8px
    ),
    linear-gradient(180deg, #1a0f05, #120a03);
  border: 2px dashed rgba(100,70,30,.4);
  box-shadow: inset 0 0 20px rgba(0,0,0,.5);
}
.gd-plot-empty::after {
  content: '+';
  position: absolute;
  inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; font-weight: 900;
  color: rgba(0,200,80,.25);
  font-family: 'Orbitron', sans-serif;
}
.gd-plot-empty .gd-plot-inner { display: flex; align-items: center; justify-content: center; }

/* Зайнята грядка */
.gd-plot-plant {
  background: linear-gradient(180deg, rgba(0,60,20,.6), rgba(0,40,10,.8));
  border: 2px solid rgba(0,200,80,.35);
  box-shadow:
    0 0 14px rgba(0,200,80,.2),
    inset 0 0 16px rgba(0,100,30,.3);
}
.gd-plot-plant:hover {
  border-color: rgba(0,255,136,.6);
  box-shadow: 0 0 22px rgba(0,255,136,.35), inset 0 0 20px rgba(0,150,50,.3);
}

/* Стадія паросток */
.gd-plot-seedling {
  border-color: rgba(255,200,0,.4) !important;
  background: linear-gradient(180deg, rgba(60,50,0,.6), rgba(40,30,0,.8)) !important;
}
.gd-plot-seedling:hover {
  border-color: rgba(255,200,0,.7) !important;
  box-shadow: 0 0 20px rgba(255,200,0,.3) !important;
}

/* Повна рослина — готова до збору */
.gd-plot-ready {
  border-color: rgba(255,215,0,.6) !important;
  animation: gdPlotPulse 2s ease-in-out infinite;
  box-shadow:
    0 0 24px rgba(255,215,0,.4),
    inset 0 0 20px rgba(255,215,0,.08) !important;
}
@keyframes gdPlotPulse {
  0%,100% { box-shadow: 0 0 20px rgba(255,215,0,.3), inset 0 0 20px rgba(255,215,0,.08); }
  50%      { box-shadow: 0 0 38px rgba(255,215,0,.6), inset 0 0 30px rgba(255,215,0,.14); }
}

.gd-plot-inner {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 2px;
  padding: 4px;
}
.gd-plot-img {
  width: 68%; height: 68%;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,.7));
  transition: transform .2s;
}
.gd-plot:hover .gd-plot-img { transform: scale(1.08) translateY(-2px); }
.gd-plot-name {
  font-size: 5px; font-weight: 700;
  color: rgba(200,240,210,.65);
  text-align: center; line-height: 1.3;
  max-width: 100%; overflow: hidden;
  text-overflow: ellipsis; white-space: nowrap;
  padding: 0 3px;
}
.gd-plot-timer {
  font-size: 5px; color: rgba(255,200,0,.8);
  font-family: 'Share Tech Mono', monospace;
  font-weight: 700;
}
.gd-plot-timer.ready { color: #ffd700; text-shadow: 0 0 6px rgba(255,215,0,.8); }

/* Бейдж готовності */
.gd-ready-badge {
  position: absolute; top: 4px; right: 4px;
  background: rgba(255,215,0,.9);
  color: #000; font-size: 7px; font-weight: 900;
  width: 16px; height: 16px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 8px rgba(255,215,0,.8);
  animation: gdBadgeSpin .8s linear infinite;
  z-index: 5;
}
@keyframes gdBadgeSpin {
  0%,100% { transform: scale(1); }
  50%      { transform: scale(1.2); }
}

/* ════════════════════════════════════
   МАГАЗИН НАСІННЯ
════════════════════════════════════ */
.gd-shop-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 9px; font-weight: 700;
  letter-spacing: 3px; text-transform: uppercase;
  color: rgba(0,255,136,.4);
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0,200,80,.12);
}

.gd-shop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 10px;
  margin-bottom: 16px;
}

.gd-seed-card {
  background: linear-gradient(160deg, rgba(0,50,15,.7), rgba(4,13,6,.9));
  border: 1px solid rgba(0,200,80,.2);
  border-radius: 12px; padding: 12px 8px 10px;
  text-align: center; cursor: pointer;
  transition: transform .2s, box-shadow .2s, border-color .2s;
  position: relative;
}
.gd-seed-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0,255,136,.5);
  box-shadow: 0 8px 24px rgba(0,200,80,.25);
}
.gd-seed-card:active { transform: scale(.96); }

.gd-seed-card.no-seeds {
  opacity: .4; cursor: not-allowed;
}
.gd-seed-card.no-seeds:hover { transform: none; box-shadow: none; }

.gd-seed-accent { height: 3px; background: linear-gradient(90deg,#00ff88,#7fff44); border-radius: 3px; margin-bottom: 10px; }
.gd-seed-img {
  width: 60px; height: 60px; object-fit: contain;
  image-rendering: pixelated;
  display: block; margin: 0 auto 6px;
  filter: drop-shadow(0 3px 8px rgba(0,0,0,.6));
  transition: transform .2s;
}
.gd-seed-card:hover .gd-seed-img { transform: scale(1.1) translateY(-2px); }
.gd-seed-name {
  font-size: 7px; font-weight: 700;
  color: #c8f0d0; line-height: 1.3;
  margin-bottom: 4px;
}
.gd-seed-count {
  font-size: 9px; font-weight: 700;
  color: #00ff88;
}
.gd-seed-count.empty { color: rgba(200,240,210,.25); }
.gd-seed-exchange-btn {
  margin-top: 8px; width: 100%;
  background: linear-gradient(90deg, rgba(0,255,136,.15), rgba(0,200,80,.1));
  border: 1px solid rgba(0,255,136,.3) !important;
  color: #00ff88 !important;
  border-radius: 6px !important;
  padding: 5px 0 !important; font-size: 7px !important;
  cursor: pointer; transition: .15s;
  font-family: 'Press Start 2P', monospace;
  box-shadow: none !important;
}
.gd-seed-exchange-btn::after { display: none !important; }
.gd-seed-exchange-btn:hover {
  background: linear-gradient(90deg, rgba(0,255,136,.25), rgba(0,200,80,.2)) !important;
  transform: none !important;
}

/* ════════════════════════════════════
   МОДАЛКА ДІЙ РОСЛИНИ
════════════════════════════════════ */
.gd-action-overlay {
  position: fixed; inset: 0; z-index: 9800;
  background: rgba(0,0,0,.75); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
}
.gd-action-box {
  background: linear-gradient(160deg, #040d06, #030a05);
  border: 2px solid rgba(0,200,80,.4);
  border-radius: 18px; padding: 22px;
  max-width: 320px; width: 100%;
  box-shadow: 0 0 50px rgba(0,200,80,.25), 0 30px 80px rgba(0,0,0,.8);
  animation: gdActionIn .22s cubic-bezier(.34,1.56,.64,1);
  position: relative;
}
@keyframes gdActionIn {
  from { transform: scale(.8) translateY(20px); opacity: 0; }
  to   { transform: scale(1) translateY(0); opacity: 1; }
}
.gd-action-header {
  display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
}
.gd-action-img {
  width: 52px; height: 52px; object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 2px 10px rgba(0,200,80,.4));
  flex-shrink: 0;
}
.gd-action-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 13px; color: #00ff88; flex: 1;
  text-shadow: 0 0 10px rgba(0,255,136,.6);
}
.gd-action-stage {
  font-size: 8px; color: rgba(200,240,210,.4); margin-top: 2px;
}

.gd-action-info {
  background: rgba(0,100,30,.15);
  border: 1px solid rgba(0,200,80,.15);
  border-radius: 10px; padding: 10px 12px;
  margin-bottom: 14px; font-size: 9px;
  color: rgba(200,240,210,.55); line-height: 1.8;
}
.gd-action-info .hi { color: #7fff44; font-weight: 700; }
.gd-action-info .warn { color: #ffd700; font-weight: 700; }

.gd-action-btns { display: flex; flex-direction: column; gap: 7px; }

.gd-abtn {
  width: 100%; padding: 11px;
  border: none; border-radius: 10px;
  font-family: 'Press Start 2P', monospace; font-size: 9px;
  cursor: pointer; transition: .18s; letter-spacing: .3px;
  position: relative; overflow: hidden;
}
.gd-abtn::after { display: none !important; }
.gd-abtn:hover { transform: translateY(-2px); }
.gd-abtn:active { transform: scale(.97); }
.gd-abtn:disabled { opacity: .35; cursor: not-allowed; transform: none; }

.gd-abtn-water {
  background: linear-gradient(135deg, #0088cc, #00cfff);
  color: #fff;
  box-shadow: 0 4px 0 #004488, 0 0 18px rgba(0,207,255,.3);
}
.gd-abtn-harvest {
  background: linear-gradient(135deg, #ffd700, #ff9900);
  color: #111;
  box-shadow: 0 4px 0 #884400, 0 0 18px rgba(255,215,0,.35);
}
.gd-abtn-remove {
  background: rgba(200,30,50,.12);
  border: 1px solid rgba(200,30,50,.3) !important;
  color: #ff8899;
  box-shadow: none !important;
}
.gd-abtn-remove:hover { background: rgba(200,30,50,.22) !important; }
.gd-abtn-close {
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08) !important;
  color: rgba(200,240,210,.35);
  box-shadow: none !important;
}
.gd-abtn-close:hover { color: rgba(200,240,210,.7) !important; }

/* ════════════════════════════════════
   ВИБІР НАСІННЯ (seed selector)
════════════════════════════════════ */
.gd-seed-sel-overlay {
  position: fixed; inset: 0; z-index: 9900;
  background: rgba(0,0,0,.75); backdrop-filter: blur(8px);
  display: flex; align-items: flex-end; justify-content: center;
  padding: 16px;
}
.gd-seed-sel-box {
  background: linear-gradient(160deg, #040d06, #030a05);
  border: 2px solid rgba(0,200,80,.4); border-radius: 20px 20px 16px 16px;
  padding: 20px; width: 100%; max-width: 420px;
  max-height: 75vh; overflow-y: auto;
  box-shadow: 0 -20px 60px rgba(0,200,80,.2), 0 0 100px rgba(0,0,0,.8);
  animation: gdSelUp .25s cubic-bezier(.22,.85,.45,1);
}
@keyframes gdSelUp {
  from { transform: translateY(40px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
.gd-seed-sel-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 10px; color: #00ff88; margin-bottom: 14px;
  text-align: center; letter-spacing: 2px;
}
.gd-seed-sel-grid {
  display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;
}
.gd-seed-sel-item {
  background: linear-gradient(160deg, rgba(0,50,15,.7), rgba(4,13,6,.9));
  border: 1px solid rgba(0,200,80,.2);
  border-radius: 10px; padding: 10px 8px;
  text-align: center; cursor: pointer;
  width: 100px; transition: .18s;
}
.gd-seed-sel-item:hover {
  border-color: rgba(0,255,136,.5);
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0,200,80,.25);
}
.gd-seed-sel-item img {
  width: 52px; height: 52px; object-fit: contain;
  image-rendering: pixelated; display: block; margin: 0 auto 5px;
}
.gd-seed-sel-item .name { font-size: 7px; color: #c8f0d0; line-height: 1.3; }
.gd-seed-sel-item .cnt  { font-size: 9px; color: #00ff88; margin-top: 3px; }
.gd-seed-sel-cancel {
  margin-top: 14px; width: 100%;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08) !important;
  color: rgba(200,240,210,.4); font-size: 9px;
  border-radius: 10px; padding: 10px;
  cursor: pointer; font-family: 'Press Start 2P', monospace;
  box-shadow: none !important;
}
.gd-seed-sel-cancel::after { display: none !important; }
.gd-seed-sel-cancel:hover { color: rgba(200,240,210,.7) !important; }

/* ── TOAST ── */
#gd-toast {
  position: fixed; bottom: 22px; left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: linear-gradient(90deg,#030d05,#051a09);
  border: 1px solid rgba(0,200,80,.4); border-radius: 40px;
  padding: 10px 24px; color: #00ff88;
  font-family: 'Press Start 2P', monospace; font-size: 10px;
  z-index: 99999; opacity: 0; pointer-events: none;
  transition: all .3s cubic-bezier(.34,1.56,.64,1);
  box-shadow: 0 6px 24px rgba(0,200,80,.3);
  white-space: nowrap;
}
#gd-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
#gd-toast.warn { border-color: rgba(255,215,0,.4); color: #ffd700; box-shadow: 0 6px 24px rgba(255,215,0,.25); }
#gd-toast.error { border-color: rgba(255,68,68,.4); color: #ff8899; box-shadow: 0 6px 24px rgba(255,68,68,.2); }

/* PATCH ── скасувати стиль кнопки у садку */
#garden-root button { font-family: 'Press Start 2P', monospace; }
`;
  document.head.appendChild(s);
}

// ── Toast ───────────────────────────────────────────────
function _gdToast(msg, type) {
  let t = document.getElementById("gd-toast");
  if (!t) { t = document.createElement("div"); t.id = "gd-toast"; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = "show" + (type ? " " + type : "");
  clearTimeout(window._gdToastT);
  window._gdToastT = setTimeout(() => { const el = document.getElementById("gd-toast"); if (el) el.className = ""; }, 2800);
}

// ── Дані рослин ─────────────────────────────────────────
const _PLANT_DATA = {
  "Гарбуз":             { smallImg:"D21.png", fullImg:"D11.png", income:10,  cooldown:86400000, seed:"G1" },
  "Буде-ПопКорн":       { smallImg:"D22.png", fullImg:"D12.png", income:10,  cooldown:43200000, seed:"G2" },
  "Соняшник":           { smallImg:"D23.png", fullImg:"D13.png", income:25,  cooldown:86400000, seed:"G3" },
  "Золоте-Дерево":      { smallImg:"D24.png", fullImg:"D14.png", income:50,  cooldown:86400000, seed:"G4" },
  "Річік":              { smallImg:"D31.png", fullImg:"D41.png", income:75,  cooldown:86400000, seed:"G5" },
  "Кіт—криптовалютчик": { smallImg:"D32.png", fullImg:"D42.png", income:25,  cooldown:43200000, seed:"G6" },
  "Капібара":           { smallImg:"D33.png", fullImg:"D43.png", income:10,  cooldown:43200000, seed:"G7" },
  "Кіт у хлібі":       { smallImg:"D34.png", fullImg:"D44.png", income:10,  cooldown:86400000, seed:"G8" },
  "Гусь":               { smallImg:"D51.png", fullImg:"D61.png", income:75,  cooldown:86400000, seed:"j1" },
  "Гарфілд":            { smallImg:"D62.png", fullImg:"D52.png", income:25,  cooldown:43200000, seed:"j2" },
  "Кітікет":            { smallImg:"D63.png", fullImg:"D53.png", income:10,  cooldown:43200000, seed:"j3" },
  "Полуниця":           { smallImg:"D64.png", fullImg:"D54.png", income:10,  cooldown:86400000, seed:"j4" },
};

function _gdFormatTime(ms) {
  if (ms <= 0) return "Готово!";
  const h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000), s = Math.floor((ms % 60000) / 1000);
  if (h > 0) return h + "г " + m + "хв";
  if (m > 0) return m + "хв " + s + "с";
  return s + "с";
}

// ── Рендер грядки ───────────────────────────────────────
function _gdRenderPlot(p, i) {
  if (!p) {
    return `<div class="gd-plot gd-plot-empty" onclick="gdShowSeedSelector(${i})">
      <div class="gd-plot-inner"></div>
    </div>`;
  }
  const pd = _PLANT_DATA[p.name] || {};
  const now = Date.now();
  const isGrown = p.stage === 2;
  const isReady = isGrown && (!p.nextHarvest || p.nextHarvest <= now);
  const isSeedling = p.stage === 1;

  let timerText = "";
  if (isSeedling && p.nextStageTime) {
    const left = Math.max(0, p.nextStageTime - now);
    timerText = `<div class="gd-plot-timer">${_gdFormatTime(left)}</div>`;
  } else if (isGrown && p.nextHarvest && p.nextHarvest > now) {
    const left = p.nextHarvest - now;
    timerText = `<div class="gd-plot-timer">${_gdFormatTime(left)}</div>`;
  }

  const imgSrc = isSeedling ? `img/${pd.smallImg || "G1.png"}` : `img/${pd.fullImg || "G1.png"}`;
  const stateClass = isSeedling ? "gd-plot-seedling" : isReady ? "gd-plot-ready" : "gd-plot-plant";
  const readyBadge = isReady ? `<div class="gd-ready-badge">!</div>` : "";

  return `<div class="gd-plot ${stateClass}" onclick="gdShowPlantActions(${i})">
    ${readyBadge}
    <div class="gd-plot-inner">
      <img class="gd-plot-img" src="${imgSrc}" alt="${p.name}">
      <div class="gd-plot-name">${p.name}</div>
      ${timerText}
    </div>
  </div>`;
}

// ── Рендер картки насіння у магазині ────────────────────
function _gdRenderSeedCard(seedName, imgName) {
  const inv2 = JSON.parse(localStorage.getItem("inventory2") || "{}");
  const invItems = JSON.parse(localStorage.getItem(currentUser + "_inventory") || "[]");
  const cnt = inv2[seedName] || 0;
  const hasPlant = invItems.some(i => i.name === seedName);
  return `
    <div class="gd-seed-card${cnt === 0 ? " no-seeds" : ""}">
      <div class="gd-seed-accent"></div>
      <img class="gd-seed-img" src="img/${imgName}.png" alt="${seedName}">
      <div class="gd-seed-name">${seedName}</div>
      <div class="gd-seed-count${cnt === 0 ? " empty" : ""}">🌱 ${cnt}</div>
      ${hasPlant
        ? `<button class="gd-seed-exchange-btn" onclick="gdExchangeForSeed('${seedName}')">🔄 Обміняти</button>`
        : `<div style="font-size:6px;color:rgba(200,240,210,.2);margin-top:7px;">немає рослин</div>`}
    </div>`;
}

// ═══════════════════════════════════════════════════════
// ГОЛОВНА ФУНКЦІЯ САДУ
// ═══════════════════════════════════════════════════════

function MenuGarden() {
  saveData?.();
  _injectGardenCSS();

  inventory = JSON.parse(localStorage.getItem(currentUser + "_inventory") || "[]");
  inventory2 = JSON.parse(localStorage.getItem("inventory2") || "{}");
  let garden = JSON.parse(localStorage.getItem(currentUser + "_garden") || "[]");
  if (garden.length !== 16) {
    garden = Array(16).fill(null);
    localStorage.setItem(currentUser + "_garden", JSON.stringify(garden));
  }

  const app = document.getElementById("app");
  if (!app) return;

  const readyCount = garden.filter(p => p && p.stage === 2 && (!p.nextHarvest || p.nextHarvest <= Date.now())).length;

  const seedSections = [
    { section: "Пак Насіння 1", seeds: [
      {n:"Гарбуз",i:"G1"}, {n:"Буде-ПопКорн",i:"G2"}, {n:"Соняшник",i:"G3"}, {n:"Золоте-Дерево",i:"G4"}
    ]},

{ section: "Пак Насіння 2", seeds: [
  {n:"Річік",i:"G5"}, {n:"Кіт—криптовалютчик",i:"G6"}, {n:"Капібара",i:"G7"}, {n:"Кіт у хлібі",i:"G8"}
]},
{ section: "Пак Насіння 3", seeds: [
  {n:"Гусь",i:"j1"}, {n:"Гарфілд",i:"j2"}, {n:"Кітікет",i:"j3"}, {n:"Полуниця",i:"j4"}
]},
  ];

  const seedHTML = seedSections.map(sec => `
    <div style="margin-bottom:18px;">
      <div style="font-size:7px;font-weight:700;letter-spacing:2px;color:rgba(0,255,136,.3);
        text-transform:uppercase;margin-bottom:10px;padding-bottom:6px;
        border-bottom:1px solid rgba(0,200,80,.1);">${sec.section}</div>
      <div class="gd-shop-grid">
        ${sec.seeds.map(s => _gdRenderSeedCard(s.n, s.i)).join("")}
      </div>
    </div>`).join("");

  app.innerHTML = `
    <div id="garden-root">
      <!-- HEADER -->
      <div class="gd-header">
        <div class="gd-header-row">
          <div class="gd-logo">🌿 САД</div>
          <div class="gd-balance-chip">💰 ${balance}</div>
          <div class="gd-water-chip">💧 ${water || 0} поливів</div>
          <button class="gd-back-btn" onclick="mainMenu()">← Назад</button>
        </div>

        <!-- TABS -->
        <div class="gd-tabs">
          <button class="gd-tab active" id="gd-tab-field" onclick="gdSwitchTab('field')">🌾 Грядки</button>
          <button class="gd-tab" id="gd-tab-shop" onclick="gdSwitchTab('shop')">🛒 Насіння</button>
        </div>
      </div>

      <!-- CONTENT -->
      <div class="gd-content">
        <!-- FIELD TAB -->
        <div id="gd-field-tab">
          <div class="gd-field-wrap">
            <div class="gd-field-title">
              ${readyCount > 0 ? `⚡ ${readyCount} ГОТОВО ДО ЗБОРУ` : "🌿 ВАШІ ГРЯДКИ"}
            </div>
            <div class="gd-plots-grid">
              ${garden.map((p, i) => _gdRenderPlot(p, i)).join("")}
            </div>
          </div>

          <!-- Легенда -->
          <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:4px;margin-bottom:8px;">
            <div style="font-size:7px;color:rgba(200,240,210,.35);display:flex;align-items:center;gap:5px;">
              <div style="width:10px;height:10px;border-radius:2px;background:rgba(80,50,20,.4);border:1px dashed rgba(100,70,30,.4);"></div>Порожня
            </div>
            <div style="font-size:7px;color:rgba(200,240,210,.35);display:flex;align-items:center;gap:5px;">
              <div style="width:10px;height:10px;border-radius:2px;background:rgba(60,50,0,.6);border:1px solid rgba(255,200,0,.4);"></div>Паросток
            </div>
            <div style="font-size:7px;color:rgba(200,240,210,.35);display:flex;align-items:center;gap:5px;">
              <div style="width:10px;height:10px;border-radius:2px;background:rgba(0,60,20,.6);border:1px solid rgba(0,200,80,.35);"></div>Росте
            </div>
            <div style="font-size:7px;color:rgba(255,215,0,.6);display:flex;align-items:center;gap:5px;">
              <div style="width:10px;height:10px;border-radius:2px;background:rgba(0,60,20,.6);border:1px solid rgba(255,215,0,.6);"></div>Готово!
            </div>
          </div>
        </div>

        <!-- SHOP TAB -->
        <div id="gd-shop-tab" style="display:none;">
          <div class="gd-shop-title">🌱 МАГАЗИН НАСІННЯ</div>
          ${seedHTML}
        </div>
      </div>
    </div>

    <!-- Popup для дій -->
    <div id="gd-action-overlay" class="gd-action-overlay" style="display:none;" onclick="if(event.target===this) gdCloseActions()">
      <div id="gd-action-box" class="gd-action-box"></div>
    </div>

    <!-- Вибір насіння -->
    <div id="gd-seed-sel-overlay" class="gd-seed-sel-overlay" style="display:none;" onclick="if(event.target===this) gdCloseSeedSel()">
      <div id="gd-seed-sel-box" class="gd-seed-sel-box"></div>
    </div>
  `;

  // Таймер оновлення грядок
  clearInterval(window._gdRefreshTimer);
  window._gdRefreshTimer = setInterval(() => {
    const plots = document.querySelectorAll(".gd-plot");
    if (!plots.length) { clearInterval(window._gdRefreshTimer); return; }
    const garden2 = JSON.parse(localStorage.getItem(currentUser + "_garden") || "[]");
    const grid = document.querySelector(".gd-plots-grid");
    if (grid) grid.innerHTML = garden2.map((p, i) => _gdRenderPlot(p, i)).join("");
    // Оновити заголовок
    const rc2 = garden2.filter(p => p && p.stage === 2 && (!p.nextHarvest || p.nextHarvest <= Date.now())).length;
    const ft = document.querySelector(".gd-field-title");
    if (ft) ft.textContent = rc2 > 0 ? `⚡ ${rc2} ГОТОВО ДО ЗБОРУ` : "🌿 ВАШІ ГРЯДКИ";
  }, 5000);
}

function gdSwitchTab(tab) {
  document.getElementById("gd-tab-field").classList.toggle("active", tab === "field");
  document.getElementById("gd-tab-shop").classList.toggle("active", tab === "shop");
  document.getElementById("gd-field-tab").style.display = tab === "field" ? "" : "none";
  document.getElementById("gd-shop-tab").style.display = tab === "shop" ? "" : "none";
}

// ── Вибір насіння ────────────────────────────────────────
function gdShowSeedSelector(index) {
  const inv2 = JSON.parse(localStorage.getItem("inventory2") || "{}");
  const keys = Object.keys(inv2).filter(k => inv2[k] > 0);
  if (!keys.length) { _gdToast("Немає насіння! Обміняй рослини у магазині.", "warn"); return; }

  const pd = _PLANT_DATA;
  const imgMap = { "Гарбуз":"G1","Буде-ПопКорн":"G2","Соняшник":"G3","Золоте-Дерево":"G4",
    "Річік":"G5","Кіт—криптовалютчик":"G6","Капібара":"G7","Кіт у хлібі":"G8",
    "Гусь":"j1","Гарфілд":"j2","Кітікет":"j3","Полуниця":"j4" };

  const items = keys.map(k => `
    <div class="gd-seed-sel-item" onclick="gdPlantSeedNew(${index},'${k}')">
      <img src="img/${imgMap[k] || 'G1'}.png" alt="${k}">
      <div class="name">${k}</div>
      <div class="cnt">🌱 ${inv2[k]}</div>
    </div>`).join("");

  const box = document.getElementById("gd-seed-sel-box");
  box.innerHTML = `
    <div class="gd-seed-sel-title">🌱 Посади насіння</div>
    <div class="gd-seed-sel-grid">${items}</div>
    <button class="gd-seed-sel-cancel" onclick="gdCloseSeedSel()">Скасувати</button>
  `;
  document.getElementById("gd-seed-sel-overlay").style.display = "flex";
}

function gdCloseSeedSel() {
  document.getElementById("gd-seed-sel-overlay").style.display = "none";
}

function gdPlantSeedNew(index, choice) {
  let inv2 = JSON.parse(localStorage.getItem("inventory2") || "{}");
  if (!inv2[choice] || inv2[choice] <= 0) { _gdToast("Немає насіння!", "error"); return; }
  let garden = JSON.parse(localStorage.getItem(currentUser + "_garden") || "[]");
  if (garden[index]) { _gdToast("Грядка вже зайнята!", "warn"); return; }
  const pd = _PLANT_DATA[choice];
  if (!pd) return;
  inv2[choice]--;
  localStorage.setItem("inventory2", JSON.stringify(inv2));
  garden[index] = { name: choice, stage: 1, smallImg: pd.smallImg, fullImg: pd.fullImg, nextStageTime: Date.now() + 3600000 };
  localStorage.setItem(currentUser + "_garden", JSON.stringify(garden));
  gdCloseSeedSel();
  MenuGarden();
  _gdToast("🌱 " + choice + " посаджено!");
}

// ── Дії рослини ──────────────────────────────────────────
function gdShowPlantActions(index) {
  let garden = JSON.parse(localStorage.getItem(currentUser + "_garden") || "[]");
  let p = garden[index];
  if (!p) return;
  const now = Date.now();
  // Автооновлення стадії
  if (p.stage === 1 && p.nextStageTime && p.nextStageTime <= now) {
    p.stage = 2;
    delete p.nextStageTime;
    garden[index] = p;
    localStorage.setItem(currentUser + "_garden", JSON.stringify(garden));
  }
  const pd = _PLANT_DATA[p.name] || { income: 10, smallImg: p.smallImg, fullImg: p.fullImg };
  const isReady = p.stage === 2 && (!p.nextHarvest || p.nextHarvest <= now);
  const isGrown = p.stage === 2;
  const isSeedling = p.stage === 1;
  let stageLabel = isSeedling ? "🌱 Паросток" : "🌾 Рослина";
  let infoHTML = "";
  if (isSeedling && p.nextStageTime) {
    const left = Math.max(0, p.nextStageTime - now);
    infoHTML = `<div>Виросте через: <span class="warn">${_gdFormatTime(left)}</span></div>
      <div>Поливи: <span class="hi">${water || 0}</span> (пришвидшує ріст)</div>`;
  } else if (isReady) {
    infoHTML = `<div>🌟 Готово до збору!</div><div>Дохід: <span class="hi">+${pd.income} нікусів</span></div>`;
  } else if (isGrown && p.nextHarvest) {
    const left = Math.max(0, p.nextHarvest - now);
    infoHTML = `<div>Збір через: <span class="warn">${_gdFormatTime(left)}</span></div>
      <div>Дохід: <span class="hi">+${pd.income} нікусів</span></div>`;
  }
  const imgSrc = isSeedling ? `img/${pd.smallImg}` : `img/${pd.fullImg}`;
  const box = document.getElementById("gd-action-box");
  box.innerHTML = `
    <div class="gd-action-header">
      <img class="gd-action-img" src="${imgSrc}" alt="${p.name}">
      <div>
        <div class="gd-action-title">${p.name}</div>
        <div class="gd-action-stage">${stageLabel}</div>
      </div>
    </div>
    <div class="gd-action-info">${infoHTML || "<div>Рослина росте...</div>"}</div>
    <div class="gd-action-btns">
      ${isSeedling ? `<button class="gd-abtn gd-abtn-water" onclick="gdWaterPlantNew(${index})">💧 Полити (прискорити)</button>` : ""}
      ${isReady ? `<button class="gd-abtn gd-abtn-harvest" onclick="gdHarvestNew(${index})">🌾 Зібрати (+${pd.income} нікусів)</button>` : ""}
      ${isGrown && !isReady ? `<button class="gd-abtn gd-abtn-harvest" disabled>⏳ Ще не готово</button>` : ""}
      <button class="gd-abtn gd-abtn-remove" onclick="gdRemovePlantNew(${index})">🗑 Видалити рослину</button>
      <button class="gd-abtn gd-abtn-close" onclick="gdCloseActions()">Закрити</button>
    </div>`;
  document.getElementById("gd-action-overlay").style.display = "flex";
}

function gdCloseActions() {
  document.getElementById("gd-action-overlay").style.display = "none";
}

function gdWaterPlantNew(index) {
  if (!water || water <= 0) { _gdToast("Немає поливів! Купи в акційному магазині.", "warn"); return; }
  let garden = JSON.parse(localStorage.getItem(currentUser + "_garden") || "[]");
  if (!garden[index]) return;
  if (garden[index].stage === 1) {
    garden[index].stage = 2;
    delete garden[index].nextStageTime;
    water--;
    localStorage.setItem(currentUser + "_garden", JSON.stringify(garden));
    saveData();
    gdCloseActions();
    MenuGarden();
    _gdToast("💧 Полили! Рослина виросла. Поливів: " + water);
  } else {
    _gdToast("Рослина вже дорослішала.", "warn");
  }
}

function gdHarvestNew(index) {
  let garden = JSON.parse(localStorage.getItem(currentUser + "_garden") || "[]");
  const p = garden[index];
  if (!p || p.stage !== 2) return;
  const now = Date.now();
  if (p.nextHarvest && p.nextHarvest > now) { _gdToast("Ще не готово!", "warn"); return; }
  const pd = _PLANT_DATA[p.name] || { income: 10 };
  balance = (parseInt(localStorage.getItem(currentUser + "_balance")) || 0) + pd.income;
  localStorage.setItem(currentUser + "_balance", balance);
  dosvid = (dosvid || 0) + 3;
  p.nextHarvest = now + pd.cooldown;
  garden[index] = p;
  localStorage.setItem(currentUser + "_garden", JSON.stringify(garden));
  saveData();
  gdCloseActions();
  MenuGarden();
  _gdToast("🌾 Зібрано! +" + pd.income + " нікусів");
}

function gdRemovePlantNew(index) {
  let garden = JSON.parse(localStorage.getItem(currentUser + "_garden") || "[]");
  garden[index] = null;
  localStorage.setItem(currentUser + "_garden", JSON.stringify(garden));
  gdCloseActions();
  MenuGarden();
  _gdToast("🗑 Рослину видалено");
}

// ── Обмін рослин на насіння ──────────────────────────────
function gdExchangeForSeed(seedName) {
  inventory = JSON.parse(localStorage.getItem(currentUser + "_inventory") || "[]");
  inventory2 = JSON.parse(localStorage.getItem("inventory2") || "{}");
  const idx = inventory.findIndex(i => i.name === seedName);
  if (idx === -1) { _gdToast("Немає рослини для обміну!", "error"); return; }
  inventory.splice(idx, 1);
  inventory2[seedName] = (inventory2[seedName] || 0) + 1;
  localStorage.setItem(currentUser + "_inventory", JSON.stringify(inventory));
  localStorage.setItem("inventory2", JSON.stringify(inventory2));
  MenuGarden();
  gdSwitchTab("shop");
  _gdToast("🌱 Отримано 1 насіння «" + seedName + "»!");
}

// Зворотна сумісність зі старими назвами
function showSeedSelectorGarden(index) { gdShowSeedSelector(index); }

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

const SALE_KEY = "saleShopNikus";

const salePacks = [
  { id: "pack_arcade",     name: "Arcade Overdrive Pack",           price: 252, low: 112 },
  { id: "pack_sping",      name: "Пакет Весняний 1",                price: 340, low: 132 },
  { id: "pack_sping2",     name: "Пакет Весняний 2",                price: 450, low: 200 },
  { id: "pack_sping3",     name: "Пакет Весняний 3",                price: 550, low: 270 },
  { id: "pack_gameflame",  name: "Акційний Пакет GameFlame",        price: 600, low: 275 },
  { id: "pack_gameflamep", name: "Акційний Пакет GameFlame Premium",price: 800, low: 360 },
  { id: "pack_donate",     name: "Донатний пакет",                  price: 20,  low: 10  }
];

const PACK_CONTENTS = {
  pack_arcade:     ["5× ArcadeOverdrive кейс", "5× Ключ до ArcadeOverdrive"],
  pack_sping:      ["5× Весна26 Бокс", "4× Весна26", "1× Весняний Подарунок"],
  pack_sping2:     ["5× Весна26", "4× Весняний Подарунок", "1× Весняний Колекційний Кейс 2026"],
  pack_sping3:     ["5× Весняний Подарунок", "5× Весняний Колекційний Кейс 2026"],
  pack_gameflame:  ["7× GameFlame26", "3× ArbitrationCase"],
  pack_gameflamep: ["5× GameFlame26 ELITE", "5× ArbitrationCase"],
  pack_donate:     ["+100 ігрових нікусів"],
  buy_water:       ["1× Вода (WATER) для саду"],
};

const RESET_PASSWORD = "admin1234";

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
    return {
      id: p.id, name: p.name, price, wasPrice, lowPrice,
      discountType: useNormal ? "recommended" : "big",
      img: `img/sales/${p.id}.png`
    };
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
      color: #f0f0f0;
    }

    .sale-header {
      text-align: center;
      margin-bottom: 30px;
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
      color: #ccc;
    }
    .sale-divider {
      width: 80px; height: 3px;
      background: linear-gradient(90deg, transparent, #ffdd57, transparent);
      margin: 10px auto 0;
      border-radius: 2px;
    }

    .sale-section-label {
      font-family: 'Orbitron', sans-serif;
      font-size: 11px;
      letter-spacing: 3px;
      color: #bbb;
      text-transform: uppercase;
      text-align: center;
      margin: 0 0 14px;
    }

    .sale-grid {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .sale-card {
      position: relative;
      width: 250px;
      border-radius: 20px;
      overflow: hidden;
      background: rgba(18,18,28,0.97);
      border: 1px solid rgba(255,255,255,0.13);
      box-shadow: 0 12px 40px rgba(0,0,0,.75), inset 0 1px 0 rgba(255,255,255,.07);
      transform: translateY(0);
      transition: transform .25s ease, box-shadow .25s ease;
      animation: card-in .45s cubic-bezier(.22,.85,.45,1) both;
      color: #f0f0f0;
    }
    .sale-card:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 20px 55px rgba(0,0,0,.85), inset 0 1px 0 rgba(255,255,255,.12);
    }
    @keyframes card-in {
      from { opacity:0; transform: translateY(28px) scale(.95); }
      to   { opacity:1; transform: translateY(0) scale(1); }
    }
    .sale-card:nth-child(1) { animation-delay: .05s; }
    .sale-card:nth-child(2) { animation-delay: .15s; }
    .sale-card:nth-child(3) { animation-delay: .25s; }

    .sale-card-strip { height: 4px; width: 100%; }

    .sale-card-body {
      padding: 14px 14px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .sale-badge {
      position: absolute;
      top: 14px; right: 14px;
      padding: 4px 10px;
      border-radius: 30px;
      font-size: 11px; font-weight: 900;
      letter-spacing: .6px; text-transform: uppercase;
      backdrop-filter: blur(6px);
      z-index: 5;
      color: #fff;
    }

    .sale-img-wrap {
      width: 210px; height: 115px;
      display: flex; align-items: center; justify-content: center;
      position: relative; z-index: 1;
    }
    .sale-img-wrap img {
      width: 100%; height: 100%; object-fit: contain;
      filter: drop-shadow(0 6px 12px rgba(0,0,0,.5));
      transition: transform .3s ease;
    }
    .sale-card:hover .sale-img-wrap img { transform: scale(1.06) translateY(-3px); }

    .sale-card-name {
      font-size: 14px; font-weight: 900;
      text-align: center; line-height: 1.2;
      color: #fff;
      text-shadow: 0 1px 4px rgba(0,0,0,0.9);
    }
    .sale-card-price {
      font-family: 'Orbitron', sans-serif;
      font-size: 26px; font-weight: 900; line-height: 1;
      text-shadow: 0 0 12px currentColor;
    }
    .sale-card-was {
      font-size: 11px; color: #999; text-decoration: line-through;
    }
    .sale-card-discount-label { font-size: 11px; color: #bbb; }

    .sale-card-contents {
      width: 100%;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 10px;
      padding: 8px 10px;
      text-align: left;
    }
    .sale-card-contents-title {
      font-size: 9px; font-weight: 800;
      letter-spacing: 1px; text-transform: uppercase;
      color: #999; margin-bottom: 6px;
    }
    .sale-card-contents ul {
      margin: 0; padding: 0; list-style: none;
    }
    .sale-card-contents ul li {
      font-size: 11px; color: #e0e0e0;
      padding: 2px 0; line-height: 1.5;
      display: flex; align-items: flex-start; gap: 5px;
    }
    .sale-card-contents ul li::before {
      content: "▸"; color: #ffb347; font-weight: 900; flex-shrink: 0; margin-top: 1px;
    }

    .sale-btn {
      width: 100%; padding: 12px 0;
      border-radius: 12px; border: none;
      cursor: pointer;
      font-family: 'Nunito', sans-serif;
      font-size: 13px; font-weight: 900;
      letter-spacing: .3px;
      position: relative; overflow: hidden;
      transition: filter .2s, transform .15s;
    }
    .sale-btn::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(255,255,255,.18) 0%, transparent 60%);
      border-radius: inherit; pointer-events: none;
    }
    .sale-btn:hover  { filter: brightness(1.15); transform: scale(1.02); }
    .sale-btn:active { filter: brightness(.92);  transform: scale(.98); }

    .sale-card.water-card {
      background: rgba(10,20,35,0.97);
      border-color: rgba(41,182,246,.25);
    }

    .sale-footer {
      margin-top: 28px;
      display: flex; justify-content: center;
      align-items: center; gap: 14px; flex-wrap: wrap;
    }
    .sale-timer-box {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 16px;
      background: rgba(255,255,255,.07);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 12px; font-size: 13px; color: #ddd;
    }
    .sale-timer-label { color: #999; }
    .sale-timer-val {
      font-family: 'Orbitron', sans-serif;
      font-size: 15px; font-weight: 700;
      color: #ffdd57; letter-spacing: 2px;
    }

    .sale-back-btn {
      padding: 10px 18px; border-radius: 12px;
      border: 1px solid rgba(255,255,255,.18);
      cursor: pointer; background: rgba(255,255,255,.07);
      color: #ddd; font-family: 'Nunito', sans-serif;
      font-weight: 800; font-size: 13px;
      transition: background .2s, transform .15s;
    }
    .sale-back-btn:hover  { background: rgba(255,255,255,.16); transform: scale(1.03); }
    .sale-back-btn:active { transform: scale(.97); }

    .sale-reset-btn {
      padding: 10px 18px; border-radius: 12px;
      border: 1px solid rgba(255,80,80,.35);
      cursor: pointer; background: rgba(255,60,60,.12);
      color: #ff9999; font-family: 'Nunito', sans-serif;
      font-weight: 800; font-size: 13px;
      transition: background .2s, transform .15s;
    }
    .sale-reset-btn:hover  { background: rgba(255,60,60,.25); transform: scale(1.03); }
    .sale-reset-btn:active { transform: scale(.97); }

    /* ── CONFIRM MODAL ── */
    .sale-confirm-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.80);
      backdrop-filter: blur(8px);
      z-index: 9999;
      display: flex; align-items: center; justify-content: center;
      animation: sc-fade .2s ease;
    }
    @keyframes sc-fade { from { opacity:0; } to { opacity:1; } }
    .sale-confirm-box {
      background: #15151f;
      border: 1px solid rgba(255,255,255,.13);
      border-radius: 22px;
      padding: 30px 24px 24px;
      width: 350px; max-width: 93vw;
      box-shadow: 0 28px 80px rgba(0,0,0,.9);
      animation: sc-slide .25s cubic-bezier(.22,.85,.45,1);
      font-family: 'Nunito', sans-serif;
      color: #f0f0f0; position: relative;
    }
    @keyframes sc-slide {
      from { transform: translateY(28px) scale(.94); opacity:0; }
      to   { transform: translateY(0)    scale(1);   opacity:1; }
    }
    .sale-confirm-strip {
      position: absolute; top: 0; left: 0; right: 0;
      height: 4px; border-radius: 22px 22px 0 0;
    }
    .sale-confirm-close {
      position: absolute; top: 14px; right: 16px;
      background: none; border: none;
      color: rgba(255,255,255,.3); font-size: 20px;
      cursor: pointer; line-height: 1; padding: 0;
      transition: color .15s;
    }
    .sale-confirm-close:hover { color: rgba(255,255,255,.8); }
    .sale-confirm-icon { font-size: 44px; text-align: center; margin-bottom: 8px; line-height: 1; }
    .sale-confirm-title {
      font-family: 'Orbitron', sans-serif;
      font-size: 17px; font-weight: 900;
      margin: 0 0 4px; color: #ffe066; text-align: center;
    }
    .sale-confirm-subtitle {
      font-size: 12px; color: #999;
      margin-bottom: 16px; text-align: center;
    }
    .sale-confirm-contents {
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(255,255,255,.09);
      border-radius: 12px; padding: 12px 14px; margin-bottom: 14px;
    }
    .sale-confirm-contents-title {
      font-size: 10px; font-weight: 800;
      letter-spacing: 1px; text-transform: uppercase;
      color: #999; margin-bottom: 8px;
    }
    .sale-confirm-contents ul {
      margin: 0; padding: 0; list-style: none;
    }
    .sale-confirm-contents ul li {
      font-size: 13px; color: #e8e8e8;
      padding: 3px 0; display: flex;
      align-items: flex-start; gap: 7px; line-height: 1.4;
    }
    .sale-confirm-contents ul li::before {
      content: "▸"; color: #ffb347;
      font-weight: 900; flex-shrink: 0; margin-top: 1px;
    }
    .sale-confirm-price-row {
      display: flex; justify-content: space-between; align-items: center;
      background: rgba(255,224,102,.08);
      border: 1px solid rgba(255,224,102,.2);
      border-radius: 10px; padding: 10px 14px; margin-bottom: 16px;
    }
    .sale-confirm-price-label { font-size: 13px; color: #ccc; font-weight: 700; }
    .sale-confirm-price-val {
      font-family: 'Orbitron', sans-serif;
      font-size: 22px; font-weight: 900; color: #ffe066;
    }
    .sale-confirm-balance {
      font-size: 11px; color: #888; text-align: right; margin-top: 2px;
    }
    .sale-confirm-no-money {
      text-align: center; color: #ff8888;
      font-size: 12px; font-weight: 700; margin-bottom: 12px;
    }
    .sale-confirm-actions { display: flex; gap: 10px; }
    .sale-confirm-ok {
      flex: 1; padding: 13px 0;
      border-radius: 12px; border: none;
      background: linear-gradient(90deg, #ff9f43, #ffd200);
      color: #111; font-family: 'Nunito', sans-serif;
      font-weight: 900; font-size: 14px; cursor: pointer;
      transition: filter .2s, transform .15s;
      box-shadow: 0 4px 16px rgba(255,180,50,.35);
    }
    .sale-confirm-ok:hover:not(:disabled)  { filter: brightness(1.12); transform: scale(1.02); }
    .sale-confirm-ok:active:not(:disabled) { transform: scale(.97); }
    .sale-confirm-ok:disabled {
      opacity: .4; cursor: not-allowed;
      background: rgba(255,255,255,.1); color: #666;
      box-shadow: none;
    }
    .sale-confirm-cancel {
      padding: 13px 18px; border-radius: 12px;
      border: 1px solid rgba(255,255,255,.14);
      background: rgba(255,255,255,.06); color: #bbb;
      font-family: 'Nunito', sans-serif;
      font-weight: 800; font-size: 14px; cursor: pointer;
      transition: background .2s, transform .15s;
    }
    .sale-confirm-cancel:hover { background: rgba(255,255,255,.14); color: #fff; transform: scale(1.02); }
    .sale-confirm-cancel:active { transform: scale(.97); }

    /* ── RESET MODAL ── */
    .sale-modal-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.72); backdrop-filter: blur(6px);
      z-index: 9999; display: flex;
      align-items: center; justify-content: center;
      animation: sc-fade .2s ease;
    }
    .sale-modal {
      background: #1a1a2e;
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 20px; padding: 32px 28px 28px;
      width: 320px; max-width: 90vw;
      box-shadow: 0 24px 80px rgba(0,0,0,.8);
      animation: sc-slide .25s cubic-bezier(.22,.85,.45,1);
      font-family: 'Nunito', sans-serif;
      color: #f0f0f0; position: relative;
    }
    .sale-modal-title {
      font-family: 'Orbitron', sans-serif;
      font-size: 16px; font-weight: 900;
      margin: 0 0 6px; color: #ff6b6b;
    }
    .sale-modal-desc { font-size: 13px; color: #aaa; margin: 0 0 20px; line-height: 1.5; }
    .sale-modal-input-wrap { position: relative; margin-bottom: 8px; }
    .sale-modal-input {
      width: 100%; padding: 12px 44px 12px 14px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,.18);
      background: rgba(255,255,255,.07); color: #fff;
      font-family: 'Nunito', sans-serif; font-size: 15px; font-weight: 700;
      outline: none; box-sizing: border-box;
      transition: border-color .2s; letter-spacing: 2px;
    }
    .sale-modal-input:focus { border-color: rgba(255,107,107,.6); }
    .sale-modal-input.error { border-color: #ff4444; animation: sale-shake .3s ease; }
    @keyframes sale-shake {
      0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)}
    }
    .sale-modal-eye {
      position: absolute; right: 12px; top: 50%;
      transform: translateY(-50%); cursor: pointer;
      font-size: 18px; opacity: .5; transition: opacity .15s;
      background: none; border: none; color: #fff; padding: 0; line-height: 1;
    }
    .sale-modal-eye:hover { opacity: .9; }
    .sale-modal-error { font-size: 12px; color: #ff6b6b; margin: 0 0 14px; min-height: 16px; }
    .sale-modal-actions { display: flex; gap: 10px; }
    .sale-modal-confirm {
      flex: 1; padding: 12px 0; border-radius: 12px; border: none;
      background: linear-gradient(90deg, #ff4444, #ff8c42); color: #fff;
      font-family: 'Nunito', sans-serif; font-weight: 900; font-size: 14px;
      cursor: pointer; transition: filter .2s, transform .15s;
    }
    .sale-modal-confirm:hover  { filter: brightness(1.15); transform: scale(1.02); }
    .sale-modal-cancel {
      padding: 12px 16px; border-radius: 12px;
      border: 1px solid rgba(255,255,255,.15);
      background: rgba(255,255,255,.07); color: #bbb;
      font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 14px;
      cursor: pointer; transition: background .2s, transform .15s;
    }
    .sale-modal-cancel:hover { background: rgba(255,255,255,.15); color: #fff; transform: scale(1.02); }
    .sale-modal-close {
      position: absolute; top: 14px; right: 16px;
      background: none; border: none;
      color: rgba(255,255,255,.35); font-size: 20px;
      cursor: pointer; line-height: 1; padding: 0; transition: color .15s;
    }
    .sale-modal-close:hover { color: rgba(255,255,255,.8); }
  `;
  document.head.appendChild(s);
}

function openResetModal() {
  const old = document.getElementById("sale-reset-modal-overlay");
  if (old) old.style.display = "flex";
  else {
    const modal = document.createElement("div");
    modal.id = "sale-reset-modal-overlay";
    modal.className = "sale-modal-overlay";
    modal.innerHTML = `
      <div class="sale-modal">
        <button class="sale-modal-close" onclick="closeResetModal()">✕</button>
        <div class="sale-modal-title">🔐 Скинути пакети</div>
        <div class="sale-modal-desc">Введіть пароль адміністратора, щоб примусово оновити асортимент.</div>
        <div class="sale-modal-input-wrap">
          <input id="sale-reset-password-input" class="sale-modal-input" type="password"
            placeholder="Пароль" autocomplete="off"
            onkeydown="if(event.key==='Enter')confirmResetSale()"/>
          <button class="sale-modal-eye" id="sale-reset-eye-btn"
            onclick="toggleResetPasswordVisibility()">👁</button>
        </div>
        <div class="sale-modal-error" id="sale-reset-error"></div>
        <div class="sale-modal-actions">
          <button class="sale-modal-confirm" onclick="confirmResetSale()">🔄 Скинути</button>
          <button class="sale-modal-cancel" onclick="closeResetModal()">Скасувати</button>
        </div>
      </div>`;
    modal.addEventListener("click", e => { if (e.target === modal) closeResetModal(); });
    document.body.appendChild(modal);
  }
  setTimeout(() => {
    const inp = document.getElementById("sale-reset-password-input");
    if (inp) inp.focus();
  }, 50);
}

function closeResetModal() {
  const modal = document.getElementById("sale-reset-modal-overlay");
  if (modal) { modal.style.opacity = "0"; modal.style.transition = "opacity .2s"; setTimeout(() => modal.remove(), 200); }
}

function toggleResetPasswordVisibility() {
  const inp = document.getElementById("sale-reset-password-input");
  const btn = document.getElementById("sale-reset-eye-btn");
  if (!inp) return;
  inp.type = inp.type === "password" ? "text" : "password";
  btn.textContent = inp.type === "password" ? "👁" : "🙈";
}

function confirmResetSale() {
  const inp = document.getElementById("sale-reset-password-input");
  const errEl = document.getElementById("sale-reset-error");
  if (!inp) return;
  if (inp.value.trim() !== RESET_PASSWORD) {
    errEl.textContent = "❌ Невірний пароль.";
    inp.classList.add("error");
    inp.value = "";
    setTimeout(() => { inp.classList.remove("error"); errEl.textContent = ""; inp.focus(); }, 900);
    return;
  }
  errEl.textContent = "";
  closeResetModal();
  generateSaleShop();
  saleShopMenu();
}

function buildPackCard(it) {
  const isBig = it.discountType === "big";

  const stripColor = isBig
    ? "linear-gradient(90deg,#ff4444,#ff8c42)"
    : "linear-gradient(90deg,#f7971e,#ffd200)";
  const priceColor = isBig ? "#ff9999" : "#ffe066";
  const btnGrad    = isBig
    ? "linear-gradient(90deg,#ff4444,#ff9a3c)"
    : "linear-gradient(90deg,#f7971e,#ffd200)";
  const badgeBg   = isBig ? "rgba(255,68,68,.92)" : "rgba(247,151,30,.92)";
  const badgeText = isBig ? "SALE −55%" : "−15%";
  const discLabel = isBig ? "Велика знижка" : "Рекомендована ціна";

  const contents = PACK_CONTENTS[it.id] || [];
  const contentsHTML = contents.map(c => `<li>${c}</li>`).join("");

  return `
    <div class="sale-card">
      <div class="sale-card-strip" style="background:${stripColor}"></div>
      <div class="sale-badge" style="background:${badgeBg};">${badgeText}</div>
      <div class="sale-card-body">
        <div class="sale-img-wrap">
          <img src="img/sales/${it.id}.png" alt="${it.name}"
            onerror="this.style.display='none'">
        </div>
        <div class="sale-card-name">${it.name}</div>
        <div class="sale-card-price" style="color:${priceColor}">${it.price} 💰</div>
        <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center;">
          <span class="sale-card-was">${it.wasPrice} 💰</span>
          <span class="sale-card-discount-label">· ${discLabel}</span>
        </div>
        <div class="sale-card-contents">
          <div class="sale-card-contents-title">📦 У пакеті:</div>
          <ul>${contentsHTML}</ul>
        </div>
        <button class="sale-btn" style="background:${btnGrad};color:#fff;"
          onclick="showBuyConfirm('${it.id}', ${it.price})">
          🛒 Купити за ${it.price} 💰
        </button>
      </div>
    </div>
  `;
}

function buildWaterCard() {
  const contents = PACK_CONTENTS["buy_water"] || [];
  return `
    <div class="sale-card water-card">
      <div class="sale-card-strip" style="background:linear-gradient(90deg,#00b4d8,#90e0ef)"></div>
      <div class="sale-badge" style="background:rgba(41,182,246,.9);">Ресурс</div>
      <div class="sale-card-body">
        <div class="sale-img-wrap">
          <img src="img/sales/water.png" alt="Вода" onerror="this.style.display='none'">
        </div>
        <div class="sale-card-name" style="color:#90e0ef">Вода (WATER)</div>
        <div class="sale-card-price" style="color:#29b6f6">5 💰</div>
        <div class="sale-card-discount-label">за 1 одиницю</div>
        <div class="sale-card-contents">
          <div class="sale-card-contents-title">📦 У пакеті:</div>
          <ul>${contents.map(c => `<li>${c}</li>`).join("")}</ul>
        </div>
        <button class="sale-btn"
          style="background:linear-gradient(90deg,#0096c7,#90e0ef);color:#fff;"
          onclick="showBuyConfirm('buy_water', 5)">
          🛒 Купити 1 WATER
        </button>
      </div>
    </div>
  `;
}

function showBuyConfirm(id, price) {
  document.getElementById("sale-confirm-overlay")?.remove();

  const isWater  = id === "buy_water";
  const packDef  = salePacks.find(p => p.id === id);
  const name     = isWater ? "Вода (WATER)" : (packDef?.name || id);
  const contents = PACK_CONTENTS[id] || [];
  const canBuy   = (nikus || 0) >= price;
  const stripCol = canBuy
    ? "linear-gradient(90deg,#f7971e,#ffd200)"
    : "linear-gradient(90deg,#555,#333)";
  const icon     = isWater ? "💧" : "🛒";

  const ov = document.createElement("div");
  ov.id = "sale-confirm-overlay";
  ov.className = "sale-confirm-overlay";
  ov.addEventListener("click", e => { if (e.target === ov) ov.remove(); });

  ov.innerHTML = `
    <div class="sale-confirm-box">
      <div class="sale-confirm-strip" style="background:${stripCol}"></div>
      <button class="sale-confirm-close"
        onclick="document.getElementById('sale-confirm-overlay').remove()">✕</button>
      <div class="sale-confirm-icon">${icon}</div>
      <div class="sale-confirm-title">Підтвердження</div>
      <div class="sale-confirm-subtitle">${name}</div>
      <div class="sale-confirm-contents">
        <div class="sale-confirm-contents-title">📦 Що ви отримаєте:</div>
        <ul>${contents.map(c => `<li>${c}</li>`).join("")}</ul>
      </div>
      <div class="sale-confirm-price-row">
        <div>
          <div class="sale-confirm-price-label">💰 Вартість</div>
          <div class="sale-confirm-balance">У тебе: ${(nikus || 0)} нікусів</div>
        </div>
        <div class="sale-confirm-price-val">${price} 💰</div>
      </div>
      ${!canBuy
        ? `<div class="sale-confirm-no-money">❌ Не вистачає ${price - (nikus || 0)} нікусів!</div>`
        : ""
      }
      <div class="sale-confirm-actions">
        <button class="sale-confirm-ok" ${canBuy ? "" : "disabled"}
          onclick="buySalePack('${id}', ${price}); document.getElementById('sale-confirm-overlay')?.remove()">
          ✅ Підтвердити купівлю
        </button>
        <button class="sale-confirm-cancel"
          onclick="document.getElementById('sale-confirm-overlay').remove()">
          Скасувати
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(ov);
}

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

function buySalePack(id, price) {
  if (typeof nikus === "undefined") { alert("Помилка: змінна nikus не знайдена."); return; }
  if (nikus < price) { alert("Недостатньо Нікусів!"); return; }

  nikus -= price;

  switch (id) {
    case "pack_arcade":
      addCase("arcadeover", 5);
      addKey("arcadeover",  5);
      break;
    case "pack_sping":
      addCase("vesna26box",  5);
      addCase("vesna26",     4);
      addCase("vesna26gift", 1);
      break;
    case "pack_sping2":
      addCase("vesna26",     5);
      addCase("vesna26gift", 4);
      addCase("kolek3",      1);
      break;
    case "pack_sping3":
      addCase("vesna26gift", 5);
      addCase("kolek3",      5);
      break;
    case "pack_gameflame":
      addCase("gameflam", 7);
      addCase("arbitr",   3);
      break;
    case "pack_gameflamep":
      addCase("gameflamE", 5);
      addCase("arbitr",    5);
      break;
    case "pack_donate":
      balance += 100;
      break;
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

// ==================== 🔥 Стрік без пропусків ====================

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function getYesterdayStr() {
  const d = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function updateStreak() {
  if (!currentUser) return;
  const today = getTodayStr();

  if (!lastStreakDate) {
    streakDays = 1;
  } else if (lastStreakDate === today) {
    return; // вже підвищував сьогодні — нічого не робити
  } else if (lastStreakDate === getYesterdayStr()) {
    streakDays++; // вчора підвищував — стрік росте
  } else {
    streakDays = 1; // пропустив — скидання
  }

  lastStreakDate = today;
  saveData();
}

function getStreakBonus() {
  if (streakDays >= 30) return { bonus: 50, label: '🏆 Легенда', color: '#ff4444' };
  if (streakDays >= 14) return { bonus: 25, label: '💎 Майстер', color: '#00ccff' };
  if (streakDays >= 7)  return { bonus: 10, label: '🔥 Активний', color: '#ff9900' };
  if (streakDays >= 3)  return { bonus: 5,  label: '⚡ Початок', color: '#ffdd00' };
  return { bonus: 0, label: '—', color: '#888' };
}

// ==================== ⏱ updateMissedDays ====================
function updateMissedDays() {
  if (!currentUser) return 0;
  if (levelFreeze) return 0;
  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;
  const daysPassed = Math.floor((now - lastLevelCheck) / DAY);
  if (daysPassed > 0) {
    missedDays += daysPassed;
    lastLevelCheck += daysPassed * DAY;
    saveData();
  }
  const timeLeft = DAY - (now - lastLevelCheck);
  return timeLeft > 0 ? timeLeft : 0;
}

// ==================== 🎖 Підвищення рівня ====================
function levelUp() {
  updateMissedDays();
  const price = levelPrice + missedDays * 2;
  if (dosvid < price) {
    alert(`Недостатньо досвіду! Потрібно ${price}, а у тебе ${dosvid}`);
    return;
  }
  dosvid -= price;
  const tier = getTier(level + 1);
  balance += tier.reward.balance;
  addCase("absolute", tier.reward.absolute);
  level++;
  levelPrice += tier.add;
  missedDays = 0;
  lastLevelCheck = Date.now();

  // Бонус за стрік
  updateStreak();
  const streak = getStreakBonus();
  let streakMsg = '';
  if (streak.bonus > 0) {
    nikus += streak.bonus;
    streakMsg = `\n🔥 Стрік-бонус: +${streak.bonus} нікусів!`;
    saveData();
  }

  saveData();
  alert(`🎖 Рівень підвищено! Тепер у тебе рівень ${level}${streakMsg}`);
  openLevelMenu();
}

// ==================== 🎖 Tier ====================
function getTier(lvl) {
  if (lvl <= 10) return { add: 4,  reward: { absolute: 1, balance: 20 } };
  if (lvl <= 20) return { add: 6,  reward: { absolute: 2, balance: 50 } };
  if (lvl <= 30) return { add: 8,  reward: { absolute: 3, balance: 75 } };
  return            { add: 25, reward: { absolute: 4, balance: 100 } };
}

// ==================== 🎖 Меню рівня ====================
function openLevelMenu() {
  updateMissedDays();
  updateStreak();

  const totalExp  = levelPrice + missedDays * 2;
  const progress  = Math.min((dosvid / totalExp) * 100, 100);
  const nextLevel = level + 1;
  const streak    = getStreakBonus();

  const tierRewards = [
    { max: 10, text: '🎁 +1 Absolute Кейс &nbsp;·&nbsp; 💰 +20 нікусів' },
    { max: 20, text: '🎁 +2 Absolute Кейси &nbsp;·&nbsp; 💰 +50 нікусів' },
    { max: 30, text: '🎁 +3 Absolute Кейси &nbsp;·&nbsp; 💰 +75 нікусів' },
    { max: Infinity, text: '🎁 +4 Absolute Кейси &nbsp;·&nbsp; 💰 +100 нікусів' },
  ];
  const rewardText = tierRewards.find(t => nextLevel <= t.max).text;

  const freezeBtnStyle = levelFreeze
    ? 'background:linear-gradient(135deg,#ff3333,#cc0000);color:#fff;'
    : 'background:linear-gradient(135deg,#00cc88,#007755);color:#fff;';
  const freezeLabel = levelFreeze
    ? '✅ Заморожено — підвищи рівень щоб зняти штраф'
    : '⏸ Заморозити стрік (50 нікусів)';

  document.getElementById('app').innerHTML = `
    <style>
      @keyframes fadeSlideUp {
        from { opacity:0; transform:translateY(24px); }
        to   { opacity:1; transform:translateY(0); }
      }
      @keyframes pulseBar {
        0%,100% { box-shadow:0 0 8px #00aaff88; }
        50%      { box-shadow:0 0 22px #00ccffcc; }
      }
      @keyframes flamePulse {
        0%,100% { text-shadow:0 0 8px #ff9900, 0 0 20px #ff5500; }
        50%      { text-shadow:0 0 18px #ffcc00, 0 0 35px #ff9900; }
      }
      @keyframes starSpin {
        from { transform:rotate(0deg) scale(1); }
        50%  { transform:rotate(180deg) scale(1.15); }
        to   { transform:rotate(360deg) scale(1); }
      }
      .lvl-card {
        animation: fadeSlideUp 0.45s cubic-bezier(.22,1,.36,1) both;
        max-width: 460px;
        margin: 16px auto;
        padding: clamp(18px,4vw,32px);
        background: linear-gradient(160deg, rgba(10,14,35,0.97) 0%, rgba(16,24,56,0.97) 100%);
        border: 1px solid rgba(0,180,255,0.18);
        border-radius: 24px;
        box-shadow: 0 0 60px rgba(0,100,255,0.15), 0 0 0 1px rgba(255,255,255,0.04) inset;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #e8eeff;
        text-align: center;
      }
      .lvl-title {
        font-size: clamp(20px,5vw,26px);
        font-weight: 800;
        letter-spacing: .5px;
        color: #ffd966;
        text-shadow: 0 0 18px #ffcc0088;
        margin-bottom: 18px;
      }
      .lvl-stats {
        display: flex;
        justify-content: center;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 16px;
      }
      .lvl-stat-box {
        flex: 1;
        min-width: 90px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 14px;
        padding: 10px 8px;
      }
      .lvl-stat-box .val {
        font-size: clamp(18px,4vw,24px);
        font-weight: 700;
        line-height: 1.1;
      }
      .lvl-stat-box .lbl {
        font-size: 11px;
        color: #8899bb;
        margin-top: 2px;
        text-transform: uppercase;
        letter-spacing: .5px;
      }
      .progress-wrap {
        position: relative;
        height: 30px;
        background: rgba(255,255,255,0.08);
        border-radius: 15px;
        overflow: hidden;
        margin: 16px 0 8px;
      }
      .progress-fill {
        height: 100%;
        border-radius: 15px;
        background: linear-gradient(90deg,#0077ff,#00ccff,#77eeff);
        animation: pulseBar 2.5s ease-in-out infinite;
        transition: width .4s ease;
      }
      .progress-label {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 700;
        color: #fff;
        text-shadow: 0 1px 4px #000;
      }
      .streak-block {
        background: rgba(255,200,0,0.06);
        border: 1px solid rgba(255,200,0,0.15);
        border-radius: 14px;
        padding: 10px 14px;
        margin: 12px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 6px;
      }
      .streak-fire {
        font-size: clamp(22px,5vw,28px);
        animation: flamePulse 1.8s ease-in-out infinite;
      }
      .streak-info { text-align: left; flex: 1; padding: 0 10px; }
      .streak-info .s-days { font-size: 17px; font-weight: 700; color: #ffd966; }
      .streak-info .s-label { font-size: 12px; color: #aaa; }
      .streak-badge {
        font-size: 12px;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: 20px;
        background: rgba(255,255,255,0.08);
        border: 1px solid currentColor;
      }
      .reward-line {
        font-size: 13px;
        color: #ffd966;
        font-weight: 600;
        margin: 8px 0 16px;
        background: rgba(255,215,0,0.07);
        border-radius: 10px;
        padding: 8px 12px;
        border: 1px solid rgba(255,215,0,0.12);
      }
      .lvl-btn {
        display: block;
        width: 100%;
        padding: clamp(11px,2.5vw,14px) 20px;
        font-size: clamp(14px,3.5vw,16px);
        font-weight: 700;
        border-radius: 14px;
        border: none;
        cursor: pointer;
        margin-bottom: 10px;
        transition: transform .15s, box-shadow .15s;
        letter-spacing: .3px;
      }
      .lvl-btn:active { transform: scale(.97) !important; }
      .lvl-btn:hover  { transform: scale(1.03); }
      .btn-up {
        background: linear-gradient(135deg,#0055ff,#00aaff);
        color: #fff;
        box-shadow: 0 5px 20px rgba(0,120,255,0.35);
      }
      .btn-freeze { ${freezeBtnStyle}; box-shadow:0 4px 14px rgba(0,0,0,0.3); }
      .btn-back {
        background: rgba(255,255,255,0.07);
        color: #aabbcc;
        border: 1px solid rgba(255,255,255,0.1);
        margin-top: 4px;
      }
      .penalty-row {
        font-size: 12px;
        color: ${missedDays > 0 ? '#ff7777' : '#66bb88'};
        margin-bottom: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }
    </style>

    <div class="lvl-card">
      <div class="lvl-title">🎖 Прокачка рівня</div>

      <!-- Стат-блоки -->
      <div class="lvl-stats">
        <div class="lvl-stat-box">
          <div class="val" style="color:#00ccff">${level}</div>
          <div class="lbl">Рівень</div>
        </div>
        <div class="lvl-stat-box">
          <div class="val" style="color:${missedDays > 0 ? '#ff6666' : '#66ee99'}">${missedDays}</div>
          <div class="lbl">Пропущено</div>
        </div>
        <div class="lvl-stat-box">
          <div class="val" style="color:#ffd966">${dosvid}</div>
          <div class="lbl">Досвід</div>
        </div>
      </div>

      <!-- Прогресбар -->
      <div class="progress-wrap">
        <div class="progress-fill" style="width:${progress}%"></div>
        <div class="progress-label">${dosvid} / ${totalExp} XP</div>
      </div>

      <!-- Штраф таймер -->
      <div class="penalty-row">
        ${missedDays > 0 ? '⚠️' : '✅'}
        <span>Наступний штраф через: <b id="missedTimer">—</b></span>
      </div>

      <!-- Стрік -->
      <div class="streak-block">
        <div class="streak-fire">🔥</div>
        <div class="streak-info">
          <div class="s-days">${streakDays} ${streakDays === 1 ? 'день' : streakDays < 5 ? 'дні' : 'днів'} поспіль</div>
          <div class="s-label">Бонус за стрік при підвищенні рівня</div>
        </div>
        <div class="streak-badge" style="color:${streak.color}">
          ${streak.label}${streak.bonus > 0 ? ` +${streak.bonus}💎` : ''}
        </div>
      </div>

      <!-- Нагорода -->
      <div class="reward-line">🏅 Нагорода за рівень ${nextLevel}: ${rewardText}</div>

      <!-- Кнопки -->
      <button class="lvl-btn btn-up" onclick="levelUp()">⬆️ Підвищити рівень</button>
      <button class="lvl-btn btn-freeze" onclick="toggleLevelFreeze()">${freezeLabel}</button>
      <button class="lvl-btn btn-back" onclick="mainMenu()">← Назад</button>
    </div>
  `;

  // Таймер
  const timerEl = document.getElementById('missedTimer');
  if (timerEl) {
    function formatTime(ms) {
      const h = Math.floor(ms / 3600000);
      const m = Math.floor((ms % 3600000) / 60000);
      const s = Math.floor((ms % 60000) / 1000);
      return `${h}г ${m}хв ${s}с`;
    }
    if (missedTimerInterval !== null) clearInterval(missedTimerInterval);
    missedTimerInterval = setInterval(() => {
      const left = updateMissedDays();
      timerEl.innerText = formatTime(left);
    }, 1000);
    timerEl.innerText = formatTime(updateMissedDays());
  }
}

// ==================== 🎖 Заморозка ====================
function toggleLevelFreeze() {
  const freezeCost = 50;
  if (!levelFreeze) {
    if (nikus < freezeCost) { alert(`Недостатньо нікусів! Потрібно ${freezeCost}`); return; }
    nikus -= freezeCost;
  }
  levelFreeze = !levelFreeze;
  saveData();
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
  {name:"Піпідастр", img:"flow10.png", rarity:"Звичайна", collection:"FlowerPower26"},

  // GameFlame26
  {name:"АнтонЧигур", img:"gameflam1.png", rarity:"Спеціальна", collection:"GameFlame26"},
  {name:"СоулРешала", img:"gameflam2.png", rarity:"Спеціальна", collection:"GameFlame26"},
  {name:"Чорний", img:"gameflam3.png", rarity:"Секретна", collection:"GameFlame26"},
  {name:"СобачийКайф", img:"gameflam4.png", rarity:"Секретна", collection:"GameFlame26"},
  {name:"Токсис", img:"gameflam5.png", rarity:"Епічна", collection:"GameFlame26"},
  {name:"ГраАрбітраж", img:"gameflam6.png", rarity:"Епічна", collection:"GameFlame26"},
  {name:"Тємщик", img:"gameflam7.png", rarity:"Виняткова", collection:"GameFlame26"},
  {name:"Підозріло", img:"gameflam8.png", rarity:"Виняткова", collection:"GameFlame26"},
  {name:"Джарвіс?", img:"gameflam9.png", rarity:"Звичайна", collection:"GameFlame26"},
  {name:"Бик", img:"gameflam10.png", rarity:"Звичайна", collection:"GameFlame26"},

// ArcadeOverdrive
  {name:"Сократ", img:"arcadeover1.png", rarity:"Спеціальна", collection:"ArcadeOverdrive"},
  {name:"ДревнійСкелет", img:"arcadeover2.png", rarity:"Спеціальна", collection:"ArcadeOverdrive"},
  {name:"Іоіоіо", img:"arcadeover3.png", rarity:"Секретна", collection:"ArcadeOverdrive"},
  {name:"Сільвер", img:"arcadeover4.png", rarity:"Секретна", collection:"ArcadeOverdrive"},
  {name:"АвстрійськийХудожник", img:"arcadeover5.png", rarity:"Епічна", collection:"ArcadeOverdrive"},
  {name:"ДідГеймер", img:"arcadeover6.png", rarity:"Епічна", collection:"ArcadeOverdrive"},
  {name:"Зʼйобуєм", img:"arcadeover7.png", rarity:"Виняткова", collection:"ArcadeOverdrive"},
  {name:"О,ні", img:"arcadeover8.png", rarity:"Виняткова", collection:"ArcadeOverdrive"},
  {name:"ДедІнсайд", img:"arcadeover9.png", rarity:"Звичайна", collection:"ArcadeOverdrive"},
  {name:"Шакал", img:"arcadeover10.png", rarity:"Звичайна", collection:"ArcadeOverdrive"},

// ArbitrationCollection
  {name:"Габен", img:"arbitr1.png", rarity:"Спеціальна", collection:"ArbitrationCollection"},
  {name:"ПесДюк", img:"arbitr2.png", rarity:"Спеціальна", collection:"ArbitrationCollection"},
  {name:"СкелетЗЩитом", img:"arbitr3.png", rarity:"Секретна", collection:"ArbitrationCollection"},
  {name:"ТобіКапець", img:"arbitr4.png", rarity:"Секретна", collection:"ArbitrationCollection"},
  {name:"Анонімуси", img:"arbitr5.png", rarity:"Епічна", collection:"ArbitrationCollection"},
  {name:"Гробовщики", img:"arbitr6.png", rarity:"Епічна", collection:"ArbitrationCollection"},
  {name:"ТвояКонтрольна", img:"arbitr7.png", rarity:"Виняткова", collection:"ArbitrationCollection"},
  {name:"Чорнобаївка", img:"arbitr8.png", rarity:"Виняткова", collection:"ArbitrationCollection"},
  {name:"Шайлушай", img:"arbitr9.png", rarity:"Звичайна", collection:"ArbitrationCollection"},
  {name:"!Арбітраж", img:"arbitr10.png", rarity:"Звичайна", collection:"ArbitrationCollection"}

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


  "Arcade":           1.0,
  "Harvest25":        10.0,
  "NASINNA1":         2.5,
  "NASINNA2":         2.5,
  "Autumn25":         7.0,
  "FallAlternative25": 8.0,
  "Halloween25":      5.0,
  "Winter25":         1.1,
  "WINTERDREAMS":     1.4,
  "CatCollection":    0.7,
  "DogCollection":    0.7,
  "Mid-season":       0.5,
  "FlowerPower26":    0.6,
  "Весна26":          0.45,
  "GameFlame26":      0.5,
  "ArcadeOverdrive":      0.5,
  "ArbitrationCollection":      1.0

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
    specs: ["Базова плата GEN 1", "Підтримує бюджетні компоненти"],
    rarity: "Спеціальна",
  },
  {
    id: "MFNP_1_0P", name: "MFNP 1.0+", category: "mb",
    categoryLabel: "Материнська плата",
    price: 1000,
    img: "img/parts/mb_mfnp10p.png",
    specs: ["Розширена плата GEN 1", "Підтримує  середно-бюджетні компоненти"],
    rarity: "Спеціальна",
  },
  {
    id: "MFNP_1_1", name: "MFNP 1.1", category: "mb",
    categoryLabel: "Материнська плата",
    price: 1600,
    img: "img/parts/mb_mfnp11.png",
    specs: ["Топова плата GEN 1", "Підтримує всі компоненти GEN 1"],
    rarity: "Спеціальна",
  },

  {
    id: "MFNP_1_2", name: "MFNP 1.2", category: "mb",
    categoryLabel: "Материнська плата",
    price: 2000,
    img: "img/parts/mb_mfnp12.png",
    specs: ["Флагман GEN 2", "Підтримує всі GEN 1 і GEN 2 компоненти", "Максимальна сумісність"],
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

  { id: "PIC_2100W", name: "2100W", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 2800, img: "img/parts/pic_2100w.png", specs: ["Потужність: 5.0", "Ресурс: W (4 тижні)", "Ліміт: 17.5 NICUS/год"], rarity: "Спеціальна", power: 5.0, resType: "W" },
  { id: "PIC_2100P", name: "2100P", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 2500, img: "img/parts/pic_2100p.png", specs: ["Потужність: 5.0", "Ресурс: P (2 тижні)", "Ліміт: 17.5 NICUS/год"], rarity: "Спеціальна", power: 5.0, resType: "P" },
  { id: "PIC_2100F", name: "2100F", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 2200, img: "img/parts/pic_2100f.png", specs: ["Потужність: 5.0", "Ресурс: F (1 тиждень)", "Ліміт: 17.5 NICUS/год"], rarity: "Спеціальна", power: 5.0, resType: "F" },
  { id: "PIC_2150W", name: "2150W", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 3200, img: "img/parts/pic_2150w.png", specs: ["Потужність: 6.17", "Ресурс: W (4 тижні)", "Ліміт: 21.6 NICUS/год"], rarity: "Спеціальна", power: 6.17, resType: "W" },
  { id: "PIC_2150P", name: "2150P", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 2900, img: "img/parts/pic_2150p.png", specs: ["Потужність: 6.17", "Ресурс: P (2 тижні)", "Ліміт: 21.6 NICUS/год"], rarity: "Спеціальна", power: 6.17, resType: "P" },
  { id: "PIC_2150F", name: "2150F", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 2600, img: "img/parts/pic_2150f.png", specs: ["Потужність: 6.17", "Ресурс: F (1 тиждень)", "Ліміт: 21.6 NICUS/год"], rarity: "Спеціальна", power: 6.17, resType: "F" },
  { id: "PIC_2175W", name: "2175W", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 3600, img: "img/parts/pic_2175w.png", specs: ["Потужність: 7.33", "Ресурс: W (4 тижні)", "Ліміт: 25.67 NICUS/год"], rarity: "Спеціальна", power: 7.33, resType: "W" },
  { id: "PIC_2175P", name: "2175P", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 3300, img: "img/parts/pic_2175p.png", specs: ["Потужність: 7.33", "Ресурс: P (2 тижні)", "Ліміт: 25.67 NICUS/год"], rarity: "Спеціальна", power: 7.33, resType: "P" },
  { id: "PIC_2175F", name: "2175F", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 3000, img: "img/parts/pic_2175f.png", specs: ["Потужність: 7.33", "Ресурс: F (1 тиждень)", "Ліміт: 25.67 NICUS/год"], rarity: "Спеціальна", power: 7.33, resType: "F" },
  { id: "PIC_2200W", name: "2200W", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 4200, img: "img/parts/pic_2200w.png", specs: ["Потужність: 8.5", "Ресурс: W (4 тижні)", "Ліміт: 29.75 NICUS/год"], rarity: "Спеціальна", power: 8.5, resType: "W" },
  { id: "PIC_2200P", name: "2200P", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 3900, img: "img/parts/pic_2200p.png", specs: ["Потужність: 8.5", "Ресурс: P (2 тижні)", "Ліміт: 29.75 NICUS/год"], rarity: "Спеціальна", power: 8.5, resType: "P" },
  { id: "PIC_2200F", name: "2200F", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 3600, img: "img/parts/pic_2200f.png", specs: ["Потужність: 8.5", "Ресурс: F (1 тиждень)", "Ліміт: 29.75 NICUS/год"], rarity: "Спеціальна", power: 8.5, resType: "F" },
  { id: "PIC_2250W", name: "2250W", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 4800, img: "img/parts/pic_2250w.png", specs: ["Потужність: 9.67", "Ресурс: W (4 тижні)", "Ліміт: 33.83 NICUS/год"], rarity: "Спеціальна", power: 9.67, resType: "W" },
  { id: "PIC_2250P", name: "2250P", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 4400, img: "img/parts/pic_2250p.png", specs: ["Потужність: 9.67", "Ресурс: P (2 тижні)", "Ліміт: 33.83 NICUS/год"], rarity: "Спеціальна", power: 9.67, resType: "P" },
  { id: "PIC_2250F", name: "2250F", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 4000, img: "img/parts/pic_2250f.png", specs: ["Потужність: 9.67", "Ресурс: F (1 тиждень)", "Ліміт: 33.83 NICUS/год"], rarity: "Спеціальна", power: 9.67, resType: "F" },
  { id: "PIC_2300W", name: "2300W", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 5400, img: "img/parts/pic_2300w.png", specs: ["Потужність: 10.83", "Ресурс: W (4 тижні)", "Ліміт: 37.92 NICUS/год"], rarity: "Спеціальна", power: 10.83, resType: "W" },
  { id: "PIC_2300P", name: "2300P", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 5000, img: "img/parts/pic_2300p.png", specs: ["Потужність: 10.83", "Ресурс: P (2 тижні)", "Ліміт: 37.92 NICUS/год"], rarity: "Спеціальна", power: 10.83, resType: "P" },
  { id: "PIC_2300F", name: "2300F", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 4600, img: "img/parts/pic_2300f.png", specs: ["Потужність: 10.83", "Ресурс: F (1 тиждень)", "Ліміт: 37.92 NICUS/год"], rarity: "Спеціальна", power: 10.83, resType: "F" },
  { id: "PIC_2400W", name: "2400W", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 6000, img: "img/parts/pic_2400w.png", specs: ["Потужність: 12.0", "Ресурс: W (4 тижні)", "Ліміт: 42.0 NICUS/год"], rarity: "Спеціальна", power: 12.0, resType: "W" },
  { id: "PIC_2400P", name: "2400P", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 5600, img: "img/parts/pic_2400p.png", specs: ["Потужність: 12.0", "Ресурс: P (2 тижні)", "Ліміт: 42.0 NICUS/год"], rarity: "Спеціальна", power: 12.0, resType: "P" },
  { id: "PIC_2400F", name: "2400F", category: "pic", categoryLabel: "Процесор GEN 2 (PIC)", price: 5200, img: "img/parts/pic_2400f.png", specs: ["Потужність: 12.0", "Ресурс: F (1 тиждень)", "Ліміт: 42.0 NICUS/год"], rarity: "Спеціальна", power: 12.0, resType: "F" },

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

{ id: "GCN2000",      name: "GCN 2000",       category: "gpu", categoryLabel: "Відеокарта GEN 2 (GPU)", price: 3500, img: "img/parts/gpu_gcn2000.png",  specs: ["6.0 NICUS/год",  "Базова GEN 2 GPU"],          rarity: "Спеціальна", rate: 6.0  },
  { id: "GCN2060",      name: "GCN 2060",       category: "gpu", categoryLabel: "Відеокарта GEN 2 (GPU)", price: 4000, img: "img/parts/gpu_gcn2060.png",  specs: ["7.5 NICUS/год",  "Середній сегмент GEN 2"],    rarity: "Спеціальна", rate: 7.5  },
  { id: "GCN2080",      name: "GCN 2080",       category: "gpu", categoryLabel: "Відеокарта GEN 2 (GPU)", price: 4500, img: "img/parts/gpu_gcn2080.png",  specs: ["9.0 NICUS/год",  "Висока продуктивність GEN 2"], rarity: "Спеціальна", rate: 9.0 },
  { id: "GCN2090",      name: "GCN 2090",       category: "gpu", categoryLabel: "Відеокарта GEN 2 (GPU)", price: 5000, img: "img/parts/gpu_gcn2090.png",  specs: ["11.0 NICUS/год", "Топ GEN 2"],                 rarity: "Спеціальна", rate: 11.0 },
  { id: "GCN2090SUPER", name: "GCN 2090 SUPER", category: "gpu", categoryLabel: "Відеокарта GEN 2 (GPU)", price: 5500, img: "img/parts/gpu_gcn2090s.png", specs: ["13.0 NICUS/год", "Флагман GEN 2"],              rarity: "Спеціальна", rate: 13.0 },

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

{
    id: "RAM_1x8NB", name: "RAM 1×8 NB", category: "ram",
    categoryLabel: "Оперативна пам'ять GEN 2",
    price: 900,
    img: "img/parts/ram_1x8.png",
    specs: ["8 NB (Нікус Біт)", "1 слот — одноканальний", "⚠️ -10% до фінального доходу"],
    rarity: "Спеціальна", nb: 8,
  },
  {
    id: "RAM_2x8NB", name: "RAM 2×8 NB", category: "ram",
    categoryLabel: "Оперативна пам'ять GEN 2",
    price: 1000,
    img: "img/parts/ram_2x8.png",
    specs: ["16 NB (Нікус Біт)", "2 слоти — двоканальний", "✅ Без штрафу"],
    rarity: "Спеціальна", nb: 16,
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
  { id: "medal_gf_bronze",  name: "Бронзова медаль «Проходження GameFlame Pass»", img: "medal_gf_bronze.png"  },
  { id: "medal_gf_regular", name: "Медаль «Проходження GameFlame Pass»",           img: "medal_gf_regular.png" },

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
        } else if (window._prMedals.length < 6) {
          window._prMedals.push(dm);
        } else {
          _prToast("Максимум 6 медалі!");
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

// ==================== ПРОФІЛЬ (ОНОВЛЕНИЙ СТИЛЬ) ====================
// Замінити функцію openProfile() у script.js на цю версію

function openProfile() {
const freshInv = JSON.parse(localStorage.getItem(currentUser + "_inventory") || "[]");

const profile  = loadProfile();
window._prAvatar = profile.avatar || null;
window._prMedals = (profile.medals || []).slice();

const bio   = profile.bio   || "";
const title = profile.title || "";
const av    = profile.avatar;

const AVATAR1_NAMES = [
"ДикаКишечка","Кулдудка","Ксенатор","ДобрийДядя",
"ЄнотГанстер","Ліс","АйТигр","ПінгвінДруже",
"Кимчик","ДідКазіно (Аватарка)"
];

const seenAv = {};
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
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Orbitron:wght@700;900&display=swap');

  /* ── ROOT ── */
  #pr-root {
    font-family: 'Press Start 2P', monospace;
    color: #d8c8ff;
    max-width: 900px;
    margin: 0 auto;
  }

  /* ── NAV ── */
  .pr-nav {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    padding-bottom: 14px;
    border-bottom: 2px solid #cc44ff;
  }
  .pr-nav-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 18px;
    font-weight: 900;
    letter-spacing: 3px;
    flex: 1;
    background: linear-gradient(90deg, #cc44ff, #00d4ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 10px rgba(204,68,255,0.5));
  }
  .pr-nav button {
    background: linear-gradient(45deg, #7700cc, #cc44ff);
    border: none;
    padding: 9px 18px;
    border-radius: 4px;
    cursor: pointer;
    color: #f0d0ff;
    font-family: 'Press Start 2P', monospace;
    font-size: 9px;
    box-shadow: 0 4px 0 #44006688, 0 0 14px rgba(204,68,255,0.5);
    transition: .15s;
  }
  .pr-nav button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 0 #44006688, 0 0 22px rgba(204,68,255,0.8);
  }

  /* ── HERO CARD ── */
  .pr-hero {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 20px;
    align-items: start;
    background: linear-gradient(160deg, rgba(204,68,255,0.07), rgba(0,212,255,0.04));
    border: 2px solid rgba(204,68,255,0.35);
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 0 30px rgba(204,68,255,0.2), inset 0 0 40px rgba(204,68,255,0.03);
    position: relative;
    overflow: hidden;
  }
  .pr-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #7700cc, #cc44ff, #00d4ff, #cc44ff, #7700cc);
    animation: prScan 4s linear infinite;
    background-size: 200% auto;
  }
  @keyframes prScan {
    from { background-position: 0% center; }
    to   { background-position: 200% center; }
  }

  /* ── AVATAR ── */
  .pr-av-wrap {
    cursor: pointer;
    width: 110px;
    text-align: center;
  }
  .pr-av-ring {
    width: 106px; height: 106px;
    border-radius: 50%;
    padding: 3px;
    background: conic-gradient(#7700cc, #cc44ff, #00d4ff, #ff00cc, #7700cc);
    animation: prSpin 5s linear infinite;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 25px rgba(204,68,255,0.7), 0 0 50px rgba(0,212,255,0.3);
    margin: 0 auto;
  }
  @keyframes prSpin { to { transform: rotate(360deg); } }
  #pr-avatar-img {
    width: 100%; height: 100%;
    border-radius: 50%;
    background: #0d0820;
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
    font-size: 7px;
    font-weight: 700;
    color: #cc44ff;
    letter-spacing: .5px;
    text-shadow: 0 0 8px rgba(204,68,255,0.6);
  }

  /* ── HERO TEXT ── */
  .pr-name {
    font-family: 'Orbitron', sans-serif;
    font-size: 18px;
    font-weight: 900;
    color: #00d4ff;
    margin-bottom: 8px;
    text-shadow: 0 0 14px rgba(0,212,255,0.7);
    letter-spacing: 2px;
  }
  .pr-badge {
    display: inline-block;
    background: linear-gradient(90deg, rgba(204,68,255,0.2), rgba(0,212,255,0.15));
    border: 1px solid rgba(204,68,255,0.5);
    color: #cc44ff;
    font-size: 8px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 20px;
    margin-bottom: 12px;
    letter-spacing: .5px;
    box-shadow: 0 0 10px rgba(204,68,255,0.3);
  }
  .pr-stats {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  .pr-stat {
    background: rgba(204,68,255,0.08);
    border: 1px solid rgba(204,68,255,0.25);
    border-radius: 4px;
    padding: 6px 10px;
    text-align: center;
    min-width: 54px;
    box-shadow: 0 0 8px rgba(204,68,255,0.1);
  }
  .pr-stat-v {
    font-size: 14px; font-weight: 700; line-height: 1;
    margin-bottom: 3px; color: #00d4ff;
    text-shadow: 0 0 8px rgba(0,212,255,0.6);
  }
  .pr-stat-l {
    font-size: 7px; font-weight: 700; letter-spacing: .5px;
    text-transform: uppercase; color: rgba(204,68,255,0.6);
  }
  .pr-bio {
    font-size: 9px; color: rgba(200,180,255,0.55);
    font-style: italic; line-height: 1.8; max-width: 400px;
  }

  /* ── SECTIONS ── */
  .pr-section {
    background: linear-gradient(160deg, rgba(204,68,255,0.05), rgba(0,212,255,0.03));
    border: 1px solid rgba(204,68,255,0.2);
    border-radius: 4px;
    padding: 18px;
    margin-bottom: 14px;
    box-shadow: 0 0 20px rgba(204,68,255,0.1);
  }
  .pr-section-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #cc44ff;
    margin-bottom: 14px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(204,68,255,0.2);
    text-shadow: 0 0 10px rgba(204,68,255,0.5);
  }

  /* ── FORM ELEMENTS ── */
  .pr-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 16px;
  }
  .pr-label {
    display: block;
    font-size: 8px; font-weight: 700;
    letter-spacing: 1px; text-transform: uppercase;
    color: rgba(204,68,255,0.6); margin-bottom: 6px;
  }
  #pr-title-sel {
    width: 100%;
    background: rgba(13,8,40,0.85);
    border: 2px solid rgba(204,68,255,0.4);
    color: #cc44ff;
    padding: 9px 12px;
    border-radius: 4px;
    font-family: 'Press Start 2P', monospace;
    font-size: 8px; font-weight: 600;
    cursor: pointer; outline: none;
    box-sizing: border-box;
    transition: border-color .2s, box-shadow .2s;
    -webkit-appearance: none;
  }
  #pr-title-sel:focus {
    border-color: #00d4ff;
    box-shadow: 0 0 12px rgba(0,212,255,0.5);
    color: #00d4ff;
  }
  #pr-bio-inp {
    width: 100%;
    background: rgba(13,8,40,0.85);
    border: 2px solid rgba(204,68,255,0.4);
    color: #cc44ff;
    padding: 9px 12px;
    border-radius: 4px;
    font-family: 'Press Start 2P', monospace;
    font-size: 8px; font-weight: 600;
    resize: vertical; min-height: 72px;
    outline: none; box-sizing: border-box;
    transition: border-color .2s, box-shadow .2s;
  }
  #pr-bio-inp:focus {
    border-color: #00d4ff;
    box-shadow: 0 0 12px rgba(0,212,255,0.5);
    color: #00d4ff;
  }
  .pr-save-btn {
    background: linear-gradient(45deg, #7700cc, #cc44ff, #ff00cc);
    border: none;
    color: #f0d0ff;
    padding: 12px 40px;
    border-radius: 4px;
    font-family: 'Press Start 2P', monospace;
    font-size: 10px; font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 0 #44006688, 0 0 20px rgba(204,68,255,0.6);
    transition: .2s ease;
    display: block; margin: 0 auto;
    text-transform: uppercase; letter-spacing: 1px;
  }
  .pr-save-btn:hover {
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 7px 0 #44006688, 0 0 35px rgba(204,68,255,0.9), 0 0 60px rgba(0,212,255,0.4);
  }

  /* ── MEDALS DISPLAY ── */
  #pr-medals-display {
    display: flex; flex-direction: column;
    gap: 6px; min-height: 28px;
  }
  .pr-medals-empty {
    font-size: 9px; color: rgba(204,68,255,0.4); font-style: italic;
  }
  .pr-medal-chip {
    display: flex; align-items: center; gap: 8px;
    background: linear-gradient(90deg, rgba(204,68,255,0.1), rgba(0,212,255,0.07));
    border: 1px solid rgba(204,68,255,0.3);
    border-radius: 4px; padding: 6px 10px;
  }
  .pr-medal-chip img { width: 24px; height: 24px; object-fit: contain; }
  .pr-medal-chip span {
    font-size: 8px; font-weight: 600;
    color: #d8c8ff; line-height: 1.4;
  }

  /* ── MEDAL PICKER ── */
  #pr-medal-picker { display: flex; flex-wrap: wrap; gap: 10px; }
  .pr-medal-card {
    width: 130px;
    border-radius: 4px; padding: 10px 6px;
    text-align: center;
    background: rgba(13,8,40,0.8);
    border: 2px solid rgba(204,68,255,0.25);
    cursor: pointer; transition: all .2s;
    box-shadow: 0 0 10px rgba(204,68,255,0.1);
    position: relative;
  }
  .pr-medal-card img {
    width: 50px; height: 50px; object-fit: contain;
    display: block; margin: 0 auto 6px;
  }
  .pr-medal-name {
    font-size: 7px; font-weight: 700;
    color: #d8c8ff; line-height: 1.4;
  }
  .pr-medal-card small { display: block; margin-top: 3px; }
  .pr-medal-card.pr-medal-sel {
    background: linear-gradient(180deg, rgba(204,68,255,0.15), rgba(0,212,255,0.1));
    border-color: #cc44ff;
    box-shadow: 0 0 18px rgba(204,68,255,0.5);
    transform: scale(1.04);
  }
  .pr-medal-card.pr-medal-sel::after {
    content: "✓";
    position: absolute; top: 4px; right: 6px;
    font-size: 14px; color: #cc44ff; font-weight: 900;
    text-shadow: 0 0 8px rgba(204,68,255,0.8);
  }
  .pr-medal-locked { opacity: .4; cursor: not-allowed !important; }
  .pr-medal-card:not(.pr-medal-locked):hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(204,68,255,0.4);
    border-color: #cc44ff;
  }

  /* ── AVATAR GRID ── */
  .pr-av-grid { display: flex; flex-wrap: wrap; gap: 9px; }
  .pr-av-card {
    width: 100px;
    border-radius: 4px;
    background: rgba(13,8,40,0.85);
    border: 2px solid rgba(204,68,255,0.25);
    padding: 8px 6px;
    text-align: center; cursor: pointer;
    transition: all .2s; position: relative;
    box-shadow: 0 0 10px rgba(204,68,255,0.1);
    user-select: none;
  }
  .pr-av-card img {
    width: 68px; height: 68px; object-fit: contain;
    display: block; margin: 0 auto 5px;
    border-radius: 4px;
    image-rendering: pixelated;
  }
  .pr-av-card-name {
    font-size: 7px; font-weight: 700;
    word-break: break-word; line-height: 1.3;
    color: #d8c8ff;
  }
  .pr-av-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(204,68,255,0.5);
    border-color: #cc44ff;
  }
  .pr-av-card.pr-av-sel {
    background: linear-gradient(180deg, rgba(204,68,255,0.12), rgba(0,212,255,0.08));
    box-shadow: 0 0 20px rgba(204,68,255,0.6);
    border-color: #cc44ff;
  }
  .pr-av-check {
    position: absolute; top: 4px; right: 4px;
    width: 18px; height: 18px; border-radius: 50%;
    background: #cc44ff;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; color: #fff; font-weight: bold;
    box-shadow: 0 0 8px rgba(204,68,255,0.8);
  }
  .pr-empty {
    text-align: center; padding: 20px;
    color: rgba(204,68,255,0.4); font-style: italic;
    font-size: 9px; line-height: 2;
  }

  /* ── MODAL ── */
  #pr-av-modal {
    display: none;
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.82);
    backdrop-filter: blur(8px);
    z-index: 10000;
    align-items: center; justify-content: center;
  }
  #pr-av-modal-box {
    background: linear-gradient(160deg, #0d0820, #08041a);
    border: 2px solid #cc44ff;
    border-radius: 4px;
    padding: 22px;
    max-width: 680px; width: 92%; max-height: 84vh;
    overflow-y: auto;
    box-shadow: 0 0 50px rgba(204,68,255,0.6), inset 0 0 30px rgba(204,68,255,0.04);
  }
  #pr-av-modal-box h3 {
    font-family: 'Orbitron', sans-serif;
    font-size: 13px; color: #cc44ff; margin: 0 0 16px;
    text-align: center;
    text-shadow: 0 0 12px rgba(204,68,255,0.7);
    letter-spacing: 2px;
  }
  .pr-modal-close {
    background: linear-gradient(45deg, #7700cc, #cc44ff);
    border: none; color: #f0d0ff;
    width: 34px; height: 34px;
    border-radius: 50%; cursor: pointer;
    font-size: 15px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 3px 0 #44006688, 0 0 10px rgba(204,68,255,0.5);
    transition: .2s; padding: 0;
    font-family: 'Press Start 2P', monospace;
  }
  .pr-modal-close:hover { transform: scale(1.1); }

  /* ── TOAST ── */
  #pr-toast {
    position: fixed;
    bottom: 28px; left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: linear-gradient(90deg, #7700cc, #cc44ff);
    color: #f0d0ff;
    padding: 10px 26px; border-radius: 40px;
    font-family: 'Press Start 2P', monospace;
    font-weight: 700; font-size: 9px;
    z-index: 99999; opacity: 0; pointer-events: none;
    transition: all .3s cubic-bezier(.34,1.56,.64,1);
    box-shadow: 0 4px 20px rgba(204,68,255,0.6);
    white-space: nowrap;
  }
  #pr-toast.pr-toast-show {
    opacity: 1; transform: translateX(-50%) translateY(0);
  }

  @media (max-width: 600px) {
    .pr-hero { grid-template-columns: 1fr; }
    .pr-form-row { grid-template-columns: 1fr; }
  }
</style>

<div id="pr-root">
  <!-- NAV -->
  <div class="pr-nav">
    <button onclick="mainMenu()">← НАЗАД</button>
    <span class="pr-nav-title">👤 ПРОФІЛЬ</span>
  </div>

  <!-- HERO -->
  <div class="pr-hero">
    <div class="pr-av-wrap" onclick="openAvatarModal()">
      <div class="pr-av-ring">
        <div id="pr-avatar-img">
          ${av && av.img
            ? '<img src="img/' + av.img + '" alt="' + (av.name || '') + '">'
            : '🌌'}
        </div>
      </div>
      <div class="pr-av-hint">▶ ЗМІНИТИ</div>
    </div>

    <div>
      <div class="pr-name">${currentUser}</div>
      <div class="pr-badge">${title || "БЕЗ ТИТУЛУ"}</div>
      <div class="pr-stats">
        <div class="pr-stat">
          <div class="pr-stat-v">${balance}</div>
          <div class="pr-stat-l">Нікусів</div>
        </div>
        <div class="pr-stat">
          <div class="pr-stat-v">${freshInv.length}</div>
          <div class="pr-stat-l">Предметів</div>
        </div>
        <div class="pr-stat">
          <div class="pr-stat-v">${level}</div>
          <div class="pr-stat-l">Рівень</div>
        </div>
        <div class="pr-stat">
          <div class="pr-stat-v">${dosvid}</div>
          <div class="pr-stat-l">Досвід</div>
        </div>
        <div class="pr-stat">
          <div class="pr-stat-v">${avatars.length}</div>
          <div class="pr-stat-l">Аватарок</div>
        </div>
      </div>
      <div class="pr-bio">${bio || "// Біо не встановлено..."}</div>
    </div>
  </div>

  <!-- МОЇ МЕДАЛІ -->
  <div class="pr-section">
    <div class="pr-section-title">🏅 МОЇ МЕДАЛІ</div>
    <div id="pr-medals-display"></div>
  </div>

  <!-- РЕДАГУВАННЯ -->
  <div class="pr-section">
    <div class="pr-section-title">⚙ РЕДАГУВАННЯ ПРОФІЛЮ</div>
    <div class="pr-form-row">
      <div>
        <label class="pr-label">Титул</label>
        <select id="pr-title-sel">${titleOptions}</select>
      </div>
      <div>
        <label class="pr-label">Біографія</label>
        <textarea id="pr-bio-inp" placeholder="// Напиши щось...">${bio}</textarea>
      </div>
    </div>
    <button class="pr-save-btn" onclick="saveProfileData()">💾 ЗБЕРЕГТИ</button>
  </div>

  <!-- ВИБІР МЕДАЛЕЙ -->
  <div class="pr-section">
    <div class="pr-section-title">🏅 ОБРАТИ МЕДАЛІ (до 6) — лише з інвентарю</div>
    <div id="pr-medal-picker"></div>
  </div>

  <!-- АВАТАРКИ -->
  <div class="pr-section">
    <div class="pr-section-title">🎨 МОЇ АВАТАРКИ</div>
    ${buildAvCards()}
  </div>
</div>

<!-- MODAL АВАТАРОК -->
<div id="pr-av-modal" onclick="if(event.target===this) closeAvatarModal()">
  <div id="pr-av-modal-box">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <h3>🎨 ВИБРАТИ АВАТАРКУ</h3>
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

  "img/sales/pack_donate.png","img/sales/water.png",
  "img/sales/bpf1.png","img/sales/bpf2.png","img/sales/bpf3.png","img/sales/bpf4.png",
  "img/sales/pack_gameflame.png","img/sales/pack_gameflamep.png",

  // ── GameFlame26 items ──
  "img/gameflam1.png","img/gameflam2.png","img/gameflam3.png","img/gameflam4.png",
  "img/gameflam5.png","img/gameflam6.png","img/gameflam7.png","img/gameflam8.png",
  "img/gameflam9.png","img/gameflam10.png",

  // ── ArcadeOverdrive items ──
  "img/arcadeover1.png","img/arcadeover2.png","img/arcadeover3.png","img/arcadeover4.png",
  "img/arcadeover5.png","img/arcadeover6.png","img/arcadeover7.png","img/arcadeover8.png",
  "img/arcadeover9.png","img/arcadeover10.png",

  // ── ArbitrationCase items ──
  "img/arbitr1.png","img/arbitr2.png","img/arbitr3.png","img/arbitr4.png",
  "img/arbitr5.png","img/arbitr6.png","img/arbitr7.png","img/arbitr8.png",
  "img/arbitr9.png","img/arbitr10.png",

  // ── Autumnus25 items (були відсутні як окрема група) ──
  "img/red1.png","img/red2.png","img/red3.png",

  // ── Medal items GF Pass ──
  "img/medal_gf_bronze.png","img/medal_gf_regular.png",

  // ── Cases (відсутні) ──
  "img/case_gameflam.png","img/case_gameflamE.png",
  "img/case_arcadeover.png","img/case_arbitr.png",
  "img/case_NN3.png","img/case_flow.png",

  // ── Keys ──
  "img/key_arcadeover.png",

  // ── Garden NN2 sprites ──
  "img/D31.png","img/D32.png","img/D33.png","img/D34.png",
  "img/D41.png","img/D42.png","img/D43.png","img/D44.png",

  // ── Garden NN3 sprites ──
  "img/D51.png","img/D52.png","img/D53.png","img/D54.png",
  "img/D61.png","img/D62.png","img/D63.png","img/D64.png",

  // ── Дино гра ──
  "img/dino.png",

  // ── Bank UI ──
  "img/money.png",

  // ── PC Parts GEN2 (материнська плата) ──
  "img/parts/mb_mfnp12.png",

  // ── PC Parts GEN2 процесори ──
  "img/parts/pic_2100f.png","img/parts/pic_2100p.png","img/parts/pic_2100w.png",
  "img/parts/pic_2150f.png","img/parts/pic_2150p.png","img/parts/pic_2150w.png",
  "img/parts/pic_2175f.png","img/parts/pic_2175p.png","img/parts/pic_2175w.png",
  "img/parts/pic_2200f.png","img/parts/pic_2200p.png","img/parts/pic_2200w.png",
  "img/parts/pic_2250f.png","img/parts/pic_2250p.png","img/parts/pic_2250w.png",
  "img/parts/pic_2300f.png","img/parts/pic_2300p.png","img/parts/pic_2300w.png",
  "img/parts/pic_2400f.png","img/parts/pic_2400p.png","img/parts/pic_2400w.png",

  // ── PC Parts GEN2 відеокарти ──
  "img/parts/gpu_gcn2000.png","img/parts/gpu_gcn2060.png","img/parts/gpu_gcn2080.png",
  "img/parts/gpu_gcn2090.png","img/parts/gpu_gcn2090s.png",

  // ── PC Parts RAM GEN2 ──
  "img/parts/ram_1x8.png","img/parts/ram_2x8.png"
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
  { id: "MFNP_1_2",  name: "MFNP 1.2",  img: "img/parts/mb_mfnp12.png"  },
];

const Price1488_RAM_MODULES = [
  { id: "RAM_1x1NB", name: "RAM 1×1 NB", nb: 1,  slots: 1, img: "img/parts/ram_1x1.png", dual: false },
  { id: "RAM_2x1NB", name: "RAM 2×1 NB", nb: 2,  slots: 2, img: "img/parts/ram_2x1.png", dual: true  },
  { id: "RAM_1x2NB", name: "RAM 1×2 NB", nb: 2,  slots: 1, img: "img/parts/ram_1x2.png", dual: false },
  { id: "RAM_2x2NB", name: "RAM 2×2 NB", nb: 4,  slots: 2, img: "img/parts/ram_2x2.png", dual: true  },
  { id: "RAM_1x4NB", name: "RAM 1×4 NB", nb: 4,  slots: 1, img: "img/parts/ram_1x4.png", dual: false },
  { id: "RAM_2x4NB", name: "RAM 2×4 NB", nb: 8,  slots: 2, img: "img/parts/ram_2x4.png", dual: true  },
  { id: "RAM_1x8NB", name: "RAM 1×8 NB", nb: 8,  slots: 1, img: "img/parts/ram_1x8.png", dual: false },
  { id: "RAM_2x8NB", name: "RAM 2×8 NB", nb: 16, slots: 2, img: "img/parts/ram_2x8.png", dual: true  },
];

const Price1488_GPU_LIST = [
  { id: "GCN1000",      name: "GCN 1000",       rate: 2.0,  img: "img/parts/gpu_gcn1000.png"  },
  { id: "GCN1060",      name: "GCN 1060",       rate: 2.5,  img: "img/parts/gpu_gcn1060.png"  },
  { id: "GCN1080",      name: "GCN 1080",       rate: 3.0,  img: "img/parts/gpu_gcn1080.png"  },
  { id: "GCN1090",      name: "GCN 1090",       rate: 4.0,  img: "img/parts/gpu_gcn1090.png"  },
  { id: "GCN1090SUPER", name: "GCN 1090 SUPER", rate: 5.0,  img: "img/parts/gpu_gcn1090s.png" },
  { id: "GCN2000",      name: "GCN 2000",       rate: 6.0,  img: "img/parts/gpu_gcn2000.png"  },
  { id: "GCN2060",      name: "GCN 2060",       rate: 7.5,  img: "img/parts/gpu_gcn2060.png"  },
  { id: "GCN2080",      name: "GCN 2080",       rate: 9.0,  img: "img/parts/gpu_gcn2080.png"  },
  { id: "GCN2090",      name: "GCN 2090",       rate: 11.0, img: "img/parts/gpu_gcn2090.png"  },
  { id: "GCN2090SUPER", name: "GCN 2090 SUPER", rate: 13.0, img: "img/parts/gpu_gcn2090s.png" },
];

// Процесори: моделі × типи ресурсу
const Price1488_PIC_MODELS = [1100,1125,1150,1175,1200,1300,1400, 2100,2150,2175,2200,2250,2300,2400];
const Price1488_PIC_TYPES  = [
  { type: "F", label: "F", weeks: 1 },
  { type: "P", label: "P", weeks: 2 },
  { type: "W", label: "W", weeks: 4 },
];

function Price1488_picPower(model) {
  if (model <= 1400) {
    const min = 1100, max = 1400;
    return +(1 + ((model - min) / (max - min)) * 3).toFixed(2);
  } else {
    const min = 2100, max = 2400;
    return +(5 + ((model - min) / (max - min)) * 7).toFixed(2);
  }
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
    ram:     ["RAM_1x1NB","RAM_2x1NB","RAM_1x2NB"],
    ssd:     ["QNA128"],
    hdd:     ["NA256","NA512"],
    pic:     ["PIC_1100F","PIC_1100P","PIC_1100W","PIC_1125F","PIC_1125P","PIC_1125W","PIC_1150F","PIC_1150P","PIC_1150W"],
    gpu:     ["GCN1000","GCN1060"],
    pagemet: ["PAGEMET"],
  },
  "MFNP_1_0P": {
    ram:     ["RAM_1x1NB","RAM_2x1NB","RAM_1x2NB","RAM_2x2NB","RAM_1x4NB"],
    ssd:     ["QNA128","QNA256"],
    hdd:     ["NA256","NA512"],
    pic:     ["PIC_1100F","PIC_1100P","PIC_1100W","PIC_1125F","PIC_1125P","PIC_1125W","PIC_1150F","PIC_1150P","PIC_1150W","PIC_1175F","PIC_1175P","PIC_1175W","PIC_1200F","PIC_1200P","PIC_1200W"],
    gpu:     ["GCN1000","GCN1060","GCN1080","GCN1090"],
    pagemet: ["PAGEMET"],
  },
  "MFNP_1_1": {
    ram:     ["RAM_1x1NB","RAM_2x1NB","RAM_1x2NB","RAM_2x2NB","RAM_1x4NB","RAM_2x4NB"],
    ssd:     ["QNA128","QNA256","QNA512"],
    hdd:     ["NA256","NA512","NA1024"],
    pic:     ["PIC_1100F","PIC_1100P","PIC_1100W","PIC_1125F","PIC_1125P","PIC_1125W","PIC_1150F","PIC_1150P","PIC_1150W","PIC_1175F","PIC_1175P","PIC_1175W","PIC_1200F","PIC_1200P","PIC_1200W","PIC_1300F","PIC_1300P","PIC_1300W","PIC_1400F","PIC_1400P","PIC_1400W"],
    gpu:     ["GCN1000","GCN1060","GCN1080","GCN1090","GCN1090SUPER"],
    pagemet: ["PAGEMET"],
  },
  "MFNP_1_2": {
    ram:     ["RAM_1x1NB","RAM_2x1NB","RAM_1x2NB","RAM_2x2NB","RAM_1x4NB","RAM_2x4NB","RAM_1x8NB","RAM_2x8NB"],
    ssd:     ["QNA128","QNA256","QNA512"],
    hdd:     ["NA256","NA512","NA1024"],
    pic:     [
      "PIC_1100F","PIC_1100P","PIC_1100W","PIC_1125F","PIC_1125P","PIC_1125W",
      "PIC_1150F","PIC_1150P","PIC_1150W","PIC_1175F","PIC_1175P","PIC_1175W",
      "PIC_1200F","PIC_1200P","PIC_1200W","PIC_1300F","PIC_1300P","PIC_1300W",
      "PIC_1400F","PIC_1400P","PIC_1400W",
      "PIC_2100F","PIC_2100P","PIC_2100W","PIC_2150F","PIC_2150P","PIC_2150W",
      "PIC_2175F","PIC_2175P","PIC_2175W","PIC_2200F","PIC_2200P","PIC_2200W",
      "PIC_2250F","PIC_2250P","PIC_2250W","PIC_2300F","PIC_2300P","PIC_2300W",
      "PIC_2400F","PIC_2400P","PIC_2400W",
    ],
    gpu:     ["GCN1000","GCN1060","GCN1080","GCN1090","GCN1090SUPER","GCN2000","GCN2060","GCN2080","GCN2090","GCN2090SUPER"],
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

// ═══ КОНСТАНТИ (ЗАМІНИТИ) ════════════════════════════
const Price1488_SSD_BREAK_CHANCE    = 0.0005; // Fast SSD (QNA)
const Price1488_GPU_GEN1_BREAK_CHANCE = 0.0003; // GEN1 GPU
const Price1488_MB_GEN1_BREAK_CHANCE  = 0.0002; // GEN1 MB

const Price1488_GPU_GEN1_IDS = ["GCN1000","GCN1060","GCN1080","GCN1090","GCN1090SUPER"];
const Price1488_MB_GEN1_IDS  = ["MFNP_1_0","MFNP_1_0P","MFNP_1_1"];

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
  // Штраф -10% при одноканальному режимі (1 плашка, dual: false)
  const dualMult = (ram && !ram.dual) ? 0.9 : 1.0;
  return +((nb + gr) * dualMult).toFixed(3);
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

  // Додаткова інфо для предмета
  let extraDesc = "";
  const partId = part ? part.id : null;

  // Для процесора — залишок ресурсу
  if (partId && partId.startsWith("PIC_")) {
    const wear = Price1488_loadPicWear(partId);
    if (wear !== null && wear > 0) {
      extraDesc = `⏱ Залишок: ${Price1488_formatDuration(wear)}`;
    } else {
      extraDesc = `⏱ Новий`;
    }
  }

  // Для Fast SSD — чи зламаний
  if (partId && (partId.startsWith("QNA"))) {
    const wasBroken = Price1488_state.ssdBroken && Price1488_state.storage === partId;
    extraDesc = wasBroken ? "💥 Зламано" : "✅ Робочий";
  }

  // Для Normal SSD
  if (partId && (partId.startsWith("NA"))) {
    extraDesc = "✅ Робочий";
  }

  inventory.push({
    id: crypto.randomUUID(),
    type: "item",
    name: name,
    img: part ? part.img.replace("img/", "") : "",
    rarity: "Спеціальна",
    quality: null,
    premium: false,
    fromCase: "parts_shop",
    desc: extraDesc,
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

  // Блокуємо встановлення зламаного SSD
  if (slot === "storage") {
    const invItem = inventory.find(i => i.name === itemName);
    if (invItem && invItem.desc === "💥 Зламано") {
      Price1488_toast("❌ Цей накопичувач зламаний — спочатку замініть його!");
      return false;
    }
  }

   // Якщо вже щось є — знімаємо
  if (Price1488_state[slot]) Price1488_uninstallPart(slot);

  // Якщо міняємо материнську плату — знімаємо несумісні компоненти
  if (slot === "mb") {
    const newCompat = Price1488_MB_COMPAT[id] || {};
    const slotsToCheck = ["pic","gpu","ram","storage"];
    slotsToCheck.forEach(function(s) {
      const installedId = Price1488_state[s];
      if (!installedId) return;
      const allowed = s === "storage"
        ? [...(newCompat.ssd || []), ...(newCompat.hdd || [])]
        : (newCompat[s] || []);
      if (!allowed.includes(installedId)) {
        Price1488_toast("⚠️ " + installedId + " несумісний з новою платою — знято!");
        Price1488_uninstallPart(s);
      }
    });
    if (Price1488_state.pagemet) {
      // pagemet сумісний з будь-якою платою, залишаємо
    }
  }

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
    const remainingMs = Price1488_picRemainingMs();
    Price1488_savePicWear(id, remainingMs);
    Price1488_state.picStartTime = null;
  }
   if (slot === "storage") {
    // Спочатку додаємо предмет (з правильним станом ssdBroken), потім скидаємо
    Price1488_addItem(name);
    Price1488_state.ssdBroken = false;
    Price1488_state.storageUsed = 0;
    Price1488_state.storagePending = 0;
    Price1488_state.pendingTime = null;
    Price1488_state[slot] = null;
    Price1488_saveState();
    if (Price1488_activeTab === "mypc") Price1488_renderMyPC();
    return; // виходимо бо addItem вже викликали вище
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
  // ★ Скидаємо pending таймер при ручній зупинці
  Price1488_state.storagePending = 0;
  Price1488_state.pendingTime    = null;
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

  const err = Price1488_checkMineConditions();
  if (err) {
    Price1488_state.mining = false;
    if (Price1488_state.pic && err.includes("процесора")) {
      Price1488_clearPicWear(Price1488_state.pic);
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

  const stor   = Price1488_getStorage();
  const income = Price1488_calcIncome() / 60;
  const space  = stor.capacity - Price1488_state.storageUsed;

  // ★ ФІЧ 1: якщо місця немає — зупиняємо
  if (space <= 0) {
    Price1488_state.mining = false;
    Price1488_saveState();
    Price1488_renderGen();
    Price1488_toast("❌ Накопичувач переповнений — майнінг зупинено!");
    return;
  }

  const actual = Math.min(income, space);

  if (stor.fast) {
    // Fast SSD (QNA): миттєво + шанс поломки SSD
    Price1488_state.storageUsed = +(Price1488_state.storageUsed + actual).toFixed(4);

    if (Math.random() < Price1488_SSD_BREAK_CHANCE) {
      Price1488_state.ssdBroken = true;
      Price1488_state.mining    = false;
      Price1488_saveState();
      Price1488_renderGen();
      Price1488_toast("💥 Fast SSD зламався! Майнінг зупинено.");
      return;
    }
  } else {
    // Normal SSD (NA): накопичуємо pending, через 1 год переносимо
    Price1488_state.storagePending = +(Price1488_state.storagePending + actual).toFixed(4);
    if (!Price1488_state.pendingTime) {
      Price1488_state.pendingTime = Date.now();
    }
    if (Date.now() - Price1488_state.pendingTime >= 3600000) {
      const transfer = Math.min(
        Price1488_state.storagePending,
        stor.capacity - Price1488_state.storageUsed
      );
      Price1488_state.storageUsed    = +(Price1488_state.storageUsed + transfer).toFixed(4);
      Price1488_state.storagePending = +(Price1488_state.storagePending - transfer).toFixed(4);
      Price1488_state.pendingTime    = null;
    }
  }

  // ★ ФІЧ 2: шанс поломки GEN1 GPU
  const gpuId = Price1488_state.gpu;
  if (gpuId && Price1488_GPU_GEN1_IDS.includes(gpuId)) {
    if (Math.random() < Price1488_GPU_GEN1_BREAK_CHANCE) {
      // Знімаємо GPU, не повертаємо в інвентар (зламано)
      Price1488_state.gpu    = null;
      Price1488_state.mining = false;
      Price1488_saveState();
      Price1488_renderGen();
      Price1488_toast("💥 Відеокарта GEN1 згоріла! Майнінг зупинено.");
      alert("💥 Ваша відеокарта GEN1 перегрілась і згоріла!\nВона була знищена. Придбайте нову у магазині ПК.");
      return;
    }
  }

  // ★ ФІЧ 3: шанс поломки GEN1 Motherboard
  const mbId = Price1488_state.mb;
  if (mbId && Price1488_MB_GEN1_IDS.includes(mbId)) {
    if (Math.random() < Price1488_MB_GEN1_BREAK_CHANCE) {
      // Зупиняємо все — MB зламана
      Price1488_state.mb     = null;
      Price1488_state.mining = false;
      Price1488_saveState();
      Price1488_renderGen();
      Price1488_toast("💥 Материнська плата GEN1 згоріла!");
      alert("💥 Ваша материнська плата GEN1 вийшла з ладу!\nВона була знищена. Придбайте нову у магазині ПК.");
      return;
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
  ${stor && s.storageUsed > 0 ? 
    '<button onclick="Price1488_cashOut()" style="' +
    'width:100%;padding:14px;border:none;border-radius:12px;margin-top:8px;' +
    'background:linear-gradient(135deg,#ffd966,#f0a020);color:#000;' +
    'font-family:\'Orbitron\',sans-serif;font-size:13px;font-weight:900;' +
    'letter-spacing:2px;cursor:pointer;' +
    '">💰 ОБНАЛІЧИТИ ' + s.storageUsed.toFixed(2) + ' NICUS → НІКУСИ</button>' 
    : ''}
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
      if (slot === 'ram')     detail = `<span class="p1488-label">${ram.nb} NB · ${ram.slots} слот(и) · ${ram.dual ? '✅ Dual-channel' : '⚠️ Single-channel (-10%)'}</span>`;
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

// ==================== FAST OPEN ====================

let fastOpenMode = false;
let fastOpenSelected = new Set();

function _fastInitPanel() {
  const filterbar = document.querySelector(".inv-filterbar");
  if (!filterbar) return;
  if (document.getElementById("fast-panel")) return;

  const fastBtn = document.createElement("button");
  fastBtn.className = "inv-btn" + (fastOpenMode ? " primary" : "");
  fastBtn.textContent = fastOpenMode ? "✕ Вийти з Fast" : "⚡ Fast";
  fastBtn.type = "button";
  fastBtn.onclick = function(e) {
    e.stopPropagation();
    fastOpenMode = !fastOpenMode;
    fastOpenSelected.clear();
    showInventory();
  };
  filterbar.insertBefore(fastBtn, filterbar.lastChild);

  if (!fastOpenMode) return;

  const panel = document.createElement("div");
  panel.id = "fast-panel";
  panel.style.cssText = `
    background:rgba(0,234,255,0.08);border:1px solid rgba(0,234,255,0.3);
    border-radius:8px;padding:10px 14px;margin-bottom:12px;
    display:flex;align-items:center;gap:10px;flex-wrap:wrap;
  `;
  panel.innerHTML = `
    <span style="color:#00eaff;font-size:12px;font-weight:700;">⚡ Fast-режим</span>
    <span style="color:#aaa;font-size:11px;">Вибрано: <b style="color:#fff" id="fast-count">${fastOpenSelected.size}</b></span>
    <button type="button" id="fast-sel-all" style="background:rgba(0,234,255,0.15);border:1px solid #00eaff;color:#00eaff;border-radius:6px;padding:4px 8px;font-size:10px;cursor:pointer;">✅ Всі</button>
    <button type="button" id="fast-desel" style="background:rgba(255,255,255,0.05);border:1px solid #555;color:#aaa;border-radius:6px;padding:4px 8px;font-size:10px;cursor:pointer;">☐ Зняти</button>
    <button type="button" id="fast-open-btn" style="background:linear-gradient(45deg,#00c8e8,#55ffaa);color:#001a2a;border:none;border-radius:6px;padding:8px 16px;font-size:11px;font-weight:bold;cursor:pointer;margin-left:auto;font-family:'Press Start 2P',monospace;">⚡ ВІДКРИТИ (${fastOpenSelected.size})</button>
  `;

  filterbar.after(panel);

  document.getElementById("fast-sel-all").onclick = function(e) {
    e.stopPropagation();
    inventory.forEach(function(item) {
      if (item.type === "case" && !blockedItems.has(item.id)) {
        fastOpenSelected.add(item.id);
      }
    });
    _fastUpdateCount();
    _fastUpdateCards();
  };

  document.getElementById("fast-desel").onclick = function(e) {
    e.stopPropagation();
    fastOpenSelected.clear();
    _fastUpdateCount();
    _fastUpdateCards();
  };

  document.getElementById("fast-open-btn").onclick = function(e) {
    e.stopPropagation();
    _fastExecute();
  };

  _fastAddCheckboxes();
}

function _fastAddCheckboxes() {
  document.querySelectorAll(".inv-card").forEach(function(card) {
    const menuBtn = card.querySelector(".inv-card-menu-btn");
    if (!menuBtn) return;
    const match = (menuBtn.getAttribute("onclick") || "").match(/openItemPopup\((\d+)/);
    if (!match) return;
    const realIdx = parseInt(match[1]);
    const item = inventory[realIdx];
    if (!item || item.type !== "case" || blockedItems.has(item.id)) return;

    const itemId = item.id;
    const cb = document.createElement("div");
    cb.dataset.fastid = itemId;
    cb.style.cssText = `
      position:absolute;top:5px;left:5px;width:20px;height:20px;
      border-radius:4px;border:2px solid ${fastOpenSelected.has(itemId) ? "#00eaff" : "rgba(255,255,255,0.3)"};
      background:${fastOpenSelected.has(itemId) ? "#00eaff" : "transparent"};
      display:flex;align-items:center;justify-content:center;
      font-size:12px;font-weight:bold;color:#001a2a;
      cursor:pointer;z-index:10;
    `;
    cb.textContent = fastOpenSelected.has(itemId) ? "✓" : "";
    card.style.position = "relative";
    if (fastOpenSelected.has(itemId)) card.style.outline = "2px solid #00eaff";

    cb.onclick = function(e) {
      e.stopPropagation();
      if (fastOpenSelected.has(itemId)) {
        fastOpenSelected.delete(itemId);
        cb.style.border = "2px solid rgba(255,255,255,0.3)";
        cb.style.background = "transparent";
        cb.textContent = "";
        card.style.outline = "none";
      } else {
        fastOpenSelected.add(itemId);
        cb.style.border = "2px solid #00eaff";
        cb.style.background = "#00eaff";
        cb.textContent = "✓";
        card.style.outline = "2px solid #00eaff";
      }
      _fastUpdateCount();
    };
    card.appendChild(cb);
  });
}

function _fastUpdateCount() {
  const c = fastOpenSelected.size;
  const el = document.getElementById("fast-count");
  if (el) el.textContent = c;
  const btn = document.getElementById("fast-open-btn");
  if (btn) btn.textContent = "⚡ ВІДКРИТИ (" + c + ")";
}

function _fastUpdateCards() {
  document.querySelectorAll("[data-fastid]").forEach(function(cb) {
    const id = cb.dataset.fastid;
    const sel = fastOpenSelected.has(id);
    cb.style.border = sel ? "2px solid #00eaff" : "2px solid rgba(255,255,255,0.3)";
    cb.style.background = sel ? "#00eaff" : "transparent";
    cb.textContent = sel ? "✓" : "";
    const card = cb.closest(".inv-card");
    if (card) card.style.outline = sel ? "2px solid #00eaff" : "none";
  });
}

function _fastGetDropFunc(caseType) {
  const map = {
    autumn: dropAutumnCase,
    absolute: dropAbsoluteCase,
    box: dropBoxCase,
    gift: dropGiftCase,
    fallalt: dropFallAlternative25Case,
    autumnus: dropAutumnus25Case,
    harvest: dropHarvest25Case,
    arcase: dropArcadeCase,
    special: dropSpecialCase,
    halloween: dropHalloween25Case,
    halloween_elite: dropHalloween25EliteCase,
    box_halloween: dropBoxHalloween25Case,
    wint25: dropwint25Case,
    WDGASTERbox: dropWDGASTERboxCase,
    WDGASTER: dropWDGASTERCase,
    wint25box: dropwint25boxCase,
    wint25gift: dropWint25GiftCase,
    kolek1: dropkolek1case,
    kolek2: dropkolek2case,
    kolek3: dropkolek3case,
    NN: dropNNcase,
    NN2: dropNN2case,
    NN3: dropNN3case,
    catcollection: dropcatcollectionCase,
    dogcollection: dropdogcollectionCase,
    flow: dropflowCase,
    gameflamE: dropgameflamECase,
    arcadeover: droparcadeoverCase,
    arbitr: droparbitrCase,
    gameflam: dropgameflamCase,
    vesna26: dropvesna26Case,
    vesna26gift: dropvesna26giftCase,
    avatar1: dropavatar1case,
    vesna26box: dropvesna26boxCase,
    medal1: dropmedal1case,
    medal2: dropmedal2case,
  };
  return map[caseType] || null;
}

function _fastExecute() {
  if (fastOpenSelected.size === 0) return;

  const results = [];
  const ids = [...fastOpenSelected];

  for (let k = 0; k < ids.length; k++) {
    const id = ids[k];
    const idx = inventory.findIndex(function(i) {
      return i.id === id && i.type === "case";
    });
    if (idx === -1) continue;

    const caseItem = inventory[idx];
    const dropFunc = _fastGetDropFunc(caseItem.caseType);
    if (!dropFunc) continue;

    if (caseItem.caseType === "arcase" || caseItem.caseType === "arcadeover") {
      const keyIdx = inventory.findIndex(function(i) {
        return i.type === "key" && i.keyType === caseItem.caseType;
      });
      if (keyIdx === -1) continue;
      if (keyIdx > idx) {
        inventory.splice(keyIdx, 1);
        inventory.splice(idx, 1);
      } else {
        inventory.splice(idx, 1);
        inventory.splice(keyIdx, 1);
      }
    } else {
      inventory.splice(idx, 1);
    }

    const drop = dropFunc();
    inventory.push({
      ...drop,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      fromCase: caseItem.caseType
    });

   if (typeof gfAwardBPForCase === "function") gfAwardBPForCase(caseItem.caseType);
    dosvid = (dosvid || 0) + 2;
    results.push({ caseName: getCaseName(caseItem.caseType), drop: drop });
  }

  localStorage.setItem(currentUser + "_inventory", JSON.stringify(inventory));
  localStorage.setItem(currentUser + "_dosvid", dosvid);
  saveData();

  fastOpenSelected.clear();
  fastOpenMode = false;

  _fastShowResults(results);
}

function _fastShowResults(results) {
  if (!results || results.length === 0) {
    showInventory();
    return;
  }

  results.sort(function(a, b) {
    const o = { "Спеціальна": 0, "Секретна": 1, "Епічна": 2, "Виняткова": 3, "Звичайна": 4 };
    return (o[a.drop.rarity] ?? 5) - (o[b.drop.rarity] ?? 5);
  });

  const stats = {};
  results.forEach(function(r) {
    stats[r.drop.rarity] = (stats[r.drop.rarity] || 0) + 1;
  });

  const statsHTML = Object.entries(stats).map(function(entry) {
    const c = getRarityColor(entry[0]);
    return `<span style="background:${c}22;border:1px solid ${c};color:${c};
      padding:3px 10px;border-radius:12px;font-size:10px;font-weight:700;">
      ${entry[0]}: ${entry[1]}</span>`;
  }).join(" ");

  const itemsHTML = results.map(function(r) {
    const c = getRarityColor(r.drop.rarity);
    return `
      <div style="
        background:linear-gradient(180deg,rgba(0,234,255,0.07),rgba(0,20,50,0.85));
        border:2px solid ${c};border-radius:6px;padding:8px;text-align:center;
        width:120px;flex:0 0 120px;
        box-shadow:0 0 10px ${c}44;position:relative;">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;
          background:${c};border-radius:6px 6px 0 0;"></div>
        <img src="img/${r.drop.img}" width="80"
          style="display:block;margin:6px auto;image-rendering:pixelated;">
        <div style="color:${c};font-size:8px;font-weight:700;
          font-family:'Press Start 2P',monospace;line-height:1.3;margin-top:4px;">
          ${r.drop.name}
        </div>
        <div style="color:#555;font-size:7px;margin-top:3px;">${r.caseName}</div>
        ${r.drop.premium ? `<div style="color:#f5d300;font-size:8px;margin-top:2px;">⭐ Преміум</div>` : ""}
        ${r.drop.quality ? `<div style="color:#888;font-size:7px;margin-top:2px;">${r.drop.quality}</div>` : ""}
      </div>`;
  }).join("");

  document.getElementById("app").innerHTML = `
    <div style="
      background:linear-gradient(135deg,#001428,#001e3a);
      min-height:100vh;padding:20px;color:#fff;
      font-family:'Press Start 2P',monospace;
      box-sizing:border-box;">

      <h2 style="text-align:center;color:#00eaff;font-size:13px;
        letter-spacing:2px;margin-bottom:6px;
        text-shadow:0 0 20px rgba(0,234,255,0.8);">
        ⚡ FAST ВІДКРИТТЯ
      </h2>

      <div style="text-align:center;color:#aaa;font-size:10px;margin-bottom:16px;">
        Відкрито: <span style="color:#00eaff;">${results.length}</span> кейсів
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:8px;
        justify-content:center;margin-bottom:20px;">
        ${statsHTML}
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;
        max-height:55vh;overflow-y:auto;padding:10px;
        background:rgba(0,0,0,0.3);border-radius:8px;
        border:1px solid rgba(0,234,255,0.2);">
        ${itemsHTML}
      </div>

      <div style="text-align:center;margin-top:20px;
        display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <button type="button" onclick="showInventory()" style="
          background:linear-gradient(45deg,#00c8e8,#55ffaa);
          color:#001a2a;border:none;border-radius:6px;
          padding:12px 24px;font-family:'Press Start 2P',monospace;
          font-size:10px;cursor:pointer;font-weight:bold;
          box-shadow:0 0 20px rgba(0,234,255,0.4);">
          🎒 ІНВЕНТАР
        </button>
        <button type="button" onclick="mainMenu()" style="
          background:linear-gradient(45deg,#444,#666);
          color:#c8f0ff;border:none;border-radius:6px;
          padding:12px 24px;font-family:'Press Start 2P',monospace;
          font-size:10px;cursor:pointer;">
          🏠 МЕНЮ
        </button>
      </div>
    </div>
  `;
}

window.onload = () => {
  loginScreen();
};