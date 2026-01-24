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
  balance = parseInt(localStorage.getItem(currentUser + "_balance")) || 0;
  nikus = parseInt(localStorage.getItem(currentUser + "_nikus")) || 0;
  OPEX = parseInt(localStorage.getItem(currentUser + "_OPEX")) || 0;
  lastPromoTimes = JSON.parse(localStorage.getItem(currentUser + "_lastPromoTimes")) || [];
dosvid = parseInt(localStorage.getItem(currentUser + "_dosvid")) || 0;

level = parseInt(localStorage.getItem(currentUser + "_level")) || 0;
levelPrice = parseInt(localStorage.getItem(currentUser + "_levelPrice")) || 10;
missedDays = parseInt(localStorage.getItem(currentUser + "_missedDays")) || 0;
levelFreeze = localStorage.getItem(currentUser + "_levelFreeze") === "1";

respect = parseInt(localStorage.getItem(currentUser + "_respect") || "0");

  kithlib = parseInt(localStorage.getItem(currentUser + "_kithlib")) || 0;

 capibara = parseInt(localStorage.getItem(currentUser + "_capibara")) || 0;

 kit123 = parseInt(localStorage.getItem(currentUser + "_kit123")) || 0;

 rihic = parseInt(localStorage.getItem(currentUser + "_rihic")) || 0;

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
    startGameMusic(); // 🔊 стартує один раз на всю гру
    mainMenu();
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
  OPEX = 0;
  goldapple = 0;
  garbuz = 0;
  missedDays = 0;
  lastLevelCheck = 0;
  corn = 0;
  sunflower = 0;
  currentBPCD = 0;
  water = 0;
  inventory = [];
  usedPromos = [];
  blockedItems.clear();

  loginScreen();
}


function mainMenu() {
  saveData();

  // ===== ЩОДЕННА НАГОРОДА =====
  const DAY = 24 * 60 * 60 * 1000;
  const rewardKey = currentUser + "_dailyReward";
  const lastClaim = Number(localStorage.getItem(rewardKey) || 0);
  const now = Date.now();
  const canClaim = now - lastClaim >= DAY;

  let timeLeft = DAY - (now - lastClaim);
  if (timeLeft < 0) timeLeft = 0;

  function formatTime(ms){
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${h}г ${m}хв ${s}с`;
  }

  let html = `
    <!-- Верхня PNG-шапка -->
    <div style="text-align:center; position:relative; top:-83px;">
      <img src="img/top-banner.png"
           style="width:80%; max-width:480px; transform:scale(1.3);
                  filter:drop-shadow(0 4px 8px rgba(0,0,0,0.35));">
    </div>

    <!-- Контейнер меню -->
    <div style="
      position:relative;
      top:-150px;
      padding:20px;
      border-radius:18px;
      max-width:420px;
      margin:0 auto;
      background:rgba(255,255,255,0.15);
      backdrop-filter:blur(8px);
      box-shadow:0 0 18px rgba(0,0,0,0.25);
    ">
      <h2 style="text-align:center;margin:0;font-size:26px;font-weight:700;">
        Вітаю, ${currentUser}
      </h2>

      <p style="text-align:center;margin:4px 0 20px;font-size:17px;font-weight:500;">
        Баланс: <span style="font-weight:700; color:#ffe14d;">${balance}</span> нікусів
      </p>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <button onclick="shopMenu()" class="menuButton">🛒 Магазин</button>
        <button onclick="promoMenu()" class="menuButton">🎁 Промокод</button>
        <button onclick="openEventsMenu()" class="menuButton">🎟️ Івенти</button>
        <button onclick="MenuGarden()" class="menuButton">🌿 Сад</button>
        <button onclick="showInventory()" class="menuButton">🎒 Інвентар (${inventory.length})</button>
        <button onclick="arcadeMenu()" class="menuButton">🎮 Міні-ігри</button>
        <button onclick="accountMenu()" class="menuButton">⚙️ Акаунт</button>
        <button onclick="MenuBank()" class="menuButton">🏦 Банк</button>

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

    <!-- 🎁 ЩОДЕННА НАГОРОДА -->
    <div style="
      position:fixed;
      right:14px;
      bottom:14px;
      width:160px;
      text-align:center;
      z-index:999;
    ">
      <img src="img/daily-reward.png" style="width:100%;pointer-events:none;">

      <button onclick="claimDailyReward()"
        style="
          width:100%;
          margin-top:-10px;
          padding:10px 0;
          border:none;
          border-radius:10px;
          font-weight:700;
          cursor:pointer;
          background:${canClaim ? '#4cff77' : '#666'};
          color:black;
          box-shadow:0 0 10px rgba(0,0,0,0.4);
        "
        ${canClaim ? "" : "disabled"}>
        🎁 Забрати
      </button>

      <div id="dailyTimer"
        style="
          margin-top:6px;
          font-size:13px;
          font-weight:600;
          color:white;
          opacity:0.85;
        ">
        ${canClaim ? "Доступно зараз!" : formatTime(timeLeft)}
      </div>
    </div>

    <style>
      .menuButton {
        padding:12px 0;
        font-size:16px;
        font-weight:600;
        border:none;
        border-radius:10px;
        cursor:pointer;
        background:#2a2a2a;
        color:white;
        transition:0.15s;
        box-shadow:0 0 6px rgba(0,0,0,0.3);
      }
      .menuButton:hover {
        transform:scale(1.05);
        box-shadow:0 0 10px rgba(255,255,255,0.4);
      }
      .menuButton:active {
        transform:scale(0.96);
      }
    </style>
  `;

  document.getElementById("app").innerHTML = html;

  // оновлення таймера
  if (!canClaim) {
    setInterval(() => {
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
    { name: "Кейс Зима25", price: 45, img: "case_wint25.png", type: "wint25" },
    { name: "Бокс Зима25", price: 30, img: "case_wint25box.png", type: "wint25box" },
    { name: "Різдвяний Кейс", price: 55, img: "case_wint25gift.png", type: "wint25gift" },   
    { name: "Зимовий Колекційний Кейс", price: 50, img: "case_kolek2.png", type: "kolek2" },    
    { name: "Міжсезонний Кейс", price: 65, img: "case_absolute.png", type: "absolute" }, 
    { name: "Спеціальний Кейс", price: 2000, img: "case_special.png", type: "special" },    
    { name: "Кейс з насінням 2", price: 200, img: "case_NN2.png", type: "NN2" },  
    { name: "CatCollection", price: 80, img: "case_catcollection.png", type: "catcollection" },
    { name: "DogCollection", price: 80, img: "case_dogcollection.png", type: "dogcollection" },   
    { name: "Аркадний кейс", price: 15, img: "case_arcase.png", type: "arcase" },
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
    ">
      <h2 style="color:#ffd966; text-shadow:0 0 10px #ffcc00;">🛒 Магазин</h2>
      <div style="
        background:rgba(255,255,255,0.05);
        padding:8px 20px;
        border-radius:8px;
        display:inline-block;
        margin-bottom:20px;
        font-weight:bold;
      ">💰 Баланс: <span style="color:#00ff88;">${balance}</span> нікусів</div>

      <div style="display:flex; flex-wrap:wrap; gap:25px; justify-content:center;">
  `;

  shopItems.forEach(item => {
    html += `
      <div style="
        width:200px;
        background:rgba(255,255,255,0.05);
        border:1px solid rgba(255,255,255,0.1);
        border-radius:12px;
        box-shadow:0 0 10px rgba(0,0,0,0.4);
        padding:12px;
        text-align:center;
        transition:transform 0.2s ease, box-shadow 0.3s ease;
      " 
      onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 0 18px rgba(255,255,255,0.2)';"
      onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 0 10px rgba(0,0,0,0.4)';"
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
      ">⬅️ Назад</button>
    </div>
  `;

  document.getElementById("app").innerHTML = html;
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

  saveData();
  alert(`Купівля успішна!`);
  shopMenu();
}

function addCase(caseType, count=1){
  if(!inventory) inventory = JSON.parse(localStorage.getItem("inventory"))||[];
  for(let i=0;i<count;i++){
    inventory.push({
      id: `${caseType}_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
      type: "case",
      caseType: caseType
    });
  }
  localStorage.setItem("inventory",JSON.stringify(inventory));
}

function addKey(caseType, count=1){
  if(!inventory) inventory = JSON.parse(localStorage.getItem("inventory"))||[];
  for(let i=0;i<count;i++){
    inventory.push({
      id: `${caseType}Key_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
      type: "key",
      keyType: caseType,
      name: `${getCaseName(caseType)} Key`, // Додаємо ім'я
      img: `key_${caseType}.png`             // Додаємо картинку ключа
    });
  }
  localStorage.setItem("inventory",JSON.stringify(inventory));
}

function showInventory() {
  let html = `<h2>🎒 Інвентар</h2>`;

  if (!inventory.length) {
    html += `<div class="alert">Інвентар порожній</div>`;
  } else {
    html += `<div class="inventory-grid">`;

    inventory.forEach((item, idx) => {
      const locked = blockedItems.has(item.id);

      html += `
        <div class="inv-card ${locked ? "inv-locked" : ""}">
          <!-- ІМʼЯ ПРЕДМЕТА ЗАВЖДИ НАД ЗОБРАЖЕННЯМ -->
          <div class="item-name" style="
            font-weight:bold;
            margin-bottom:6px;
            word-wrap: break-word;
            word-break: break-word;
            hyphens: auto;
            text-align:center;
          ">
            ${item.type === "case"
              ? "Кейс: " + getCaseName(item.caseType)
              : item.name
            }
          </div>

          <img src="img/${item.type === "case"
            ? "case_" + item.caseType + ".png"
            : item.img
          }" width="120">

          ${item.rarity ? `
            <div class="rarity-badge" style="background:${getRarityColor(item.rarity)}">
              Рідкість: ${item.rarity}
            </div>` : ""}

          ${item.quality ? `
            <div class="quality-badge" style="background:${getQualityColor(item.quality)}">
              Якість: ${item.quality}
            </div>` : ""}

          ${item.premium ? `
            <div class="quality-badge" style="background:#f5d300;color:#000">
              ⭐ Преміум
            </div>` : ""}

          ${item.type === "case"
            ? `<button onclick="openCase(${idx})" ${locked ? "disabled" : ""}>Відкрити</button>`
            : `<button onclick="viewItem(${idx})">Деталі</button>`
          }

          <button onclick="toggleBlock(${idx})">
            ${locked ? "Розблокувати" : "Заблокувати"}
          </button>

          <button onclick="deleteItem(${idx})" ${locked ? "disabled" : ""}>
            Видалити
          </button>
        </div>
      `;
    });

    html += `</div>`;
  }

  html += `<br><button onclick="mainMenu()">Назад</button>`;
  document.getElementById("app").innerHTML = html;
}

function viewItem(idx){
  const i = inventory[idx];
  if(!i) return;

  const date = i.createdAt
    ? new Date(i.createdAt).toLocaleString("uk-UA", {hour12:false})
    : "Невідомо";

  document.getElementById("app").innerHTML = `
    <h2>📜 Історія предмета</h2>

    <div style="
      max-width:240px;
      margin:20px auto;
      background: rgba(210, 190, 150, 0.75);
      padding:15px;
      border-radius:18px;
      border:2px solid #a88963;
      box-shadow:0 0 25px rgba(120,90,50,0.6);
      color:#2b1d0e;
      text-align:center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    ">
      <b>${i.name || getCaseName(i.caseType)}</b><br>
      <img src="img/${i.img || `case_${i.caseType}.png`}" width="140" style="border-radius:12px;margin:10px 0;"><br>
      
      ${i.rarity ? `<div style="background:${getRarityColor(i.rarity)};padding:4px 6px;border-radius:8px;margin-top:5px;color:#fff;font-weight:bold;">
        Рідкість: ${i.rarity}
      </div>` : ""}

      ${i.quality ? `<div style="background:${getQualityColor(i.quality)};padding:3px 6px;border-radius:8px;margin-top:4px;color:#fff;font-weight:bold;">
        Якість: ${i.quality}
      </div>` : ""}

      ${i.premium ? `<div style="background:#f5d300;color:#000;padding:3px 6px;border-radius:8px;margin-top:4px;font-weight:bold;">
        ⭐ Преміум
      </div>` : ""}

 <p style="margin-top:8px;">🎁 Кейс: <b>${
  i.fromCase ? getCaseName(i.fromCase) : "Невідомо"
}</b></p>
      <p>🕒 Дата вибиття: <b>${date}</b></p>
      <small>ID: ${i.id}</small>
    </div>

    <button onclick="showInventory()" style="
      background: linear-gradient(45deg, #b89b72, #e0c49a);
      border:none;
      padding:10px 20px;
      border-radius:16px;
      cursor:pointer;
      color:#2b1d0e;
      font-weight:bold;
      margin:auto;
      display:block;
      box-shadow:0 4px 0 #8b6b45, 0 0 12px rgba(120,90,50,0.6);
      ">Назад</button>
  `;
}

/* ================== BLOCK / DELETE ================== */
function toggleBlock(idx){
  const i = inventory[idx];
  if(!i) return;

  blockedItems.has(i.id)
    ? blockedItems.delete(i.id)
    : blockedItems.add(i.id);

  saveData();
  showInventory();
}

function deleteItem(idx){
  const i = inventory[idx];
  if(!i) return;

  if(blockedItems.has(i.id)){
    alert("Предмет заблокований!");
    return;
  }

  inventory.splice(idx,1);
  saveData();
  showInventory();
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
if(type === "WDGASTERbox") return "Winter Dreams box"; 
if(type === "wint25gift") return "Різдвяний Подарунок"; 
if(type === "catcollection") return "CatCollection"; 
if(type === "dogcollection") return "DogCollection"; 
if(type === "kolek1") return "Осінній Колекційний Кейс"; 
if(type === "kolek2") return "Зимовий Колекційний Кейс"; 

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
    case "catcollection": dropFunc = dropcatcollectionCase; break;
    case "dogcollection": dropFunc = dropdogcollectionCase; break; 
    case "kolek2": dropFunc = dropkolek2case; break;
    case "medal1": dropFunc = dropmedal1case; break;

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

  // 🔥 FIX: ПОВНИЙ ПУЛ, НЕ RNG
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
        const html = rarityTabs[r].map(p=>{
          const c = getRarityColor(p.rarity);
          return `
            <div style="width:100px;background:#111;border:2px solid ${c};border-radius:6px;padding:6px;text-align:center;margin:5px;display:inline-block;">
              <img src="img/${p.img}" width="80">
              <div style="font-size:12px;color:${c};font-weight:bold;">${p.name}</div>
            </div>
          `;
        }).join("");
        return `<div class="rarity-panel" data-panel="${r}" style="display:none;background:#222;padding:10px;border-radius:6px;">${html}</div>`;
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

  document.getElementById("open-case-btn").onclick = onOpen;
  document.getElementById("cancel-case-btn").onclick = showInventory;

// ---------- РУЛЕТКА ПРЕВ’Ю (НЕ RNG) ----------
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
    {name:"Скелет", img:"skeleton.png", rarity:"Секретна", chance:0.005},
    {name:"Мужик", img:"man.png", rarity:"Секретна", chance:0.005},
    {name:"Арбітражнік", img:"arbitrajnik.png", rarity:"Епічна", chance:0.10},
    {name:"Такблін", img:"takblin.png", rarity:"Епічна", chance:0.10},
    {name:"ЧомуКіт", img:"chomukit.png", rarity:"Виняткова", chance:0.15},
    {name:"Картофель", img:"kartofel.png", rarity:"Виняткова", chance:0.15},
    {name:"Щотинакоїв", img:"shotinakoiv.png", rarity:"Звичайна", chance:0.245},
    {name:"Услезах", img:"uslezah.png", rarity:"Звичайна", chance:0.245}
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
        💰 Баланс: ${balance} нікусів
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
          Сапер (20 нікусів)
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
          Динозаврик (50 нікусів)
        </button>
      </div>

      <button onclick="mainMenu()" style="
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
                     onclick="opencatdogPass()" />
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

function addBPCD(amount){
    if(!currentUser) return;
    currentBPCD += amount;
    localStorage.setItem(currentUser + "_bpPoints_catdog", currentBPCD);
    const el = document.getElementById("bpcdCounter");
    if(el) el.textContent = currentBPCD;
    return currentBPCD;
}

const catdogImages = {
  free: {
    1: "case_dogcollection.png",
    2: "money.png",
    3: "case_wint25gift.png",
    4: "case_catcollection.png",
    5: "money.png",
    6: "case_arcase.png",
    7: "case_wint25gift.png",
    8: "case_NN2.png",
    9: "case_kolek2.png",
    10: "case_dogcollection.png",
    11: "money.png",
    12: "case_catcollection.png",
    13: "case_catcollection.png",
    14: "case_absolute.png",
    15: "case_dogcollection.png",
    16: "case_arcase.png",
    17: "case_wint25.png",
    18: "case_catcollection.png",
    19: "case_wint25gift.png",
    20: "case_arcase.png",
    21: "case_dogcollection.png",
    22: "case_kolek2.png",
    23: "case_wint25gift.png",
    24: "case_dogcollection.png",
    25: "case_catcollection.png",

    26: "case_dogcollection.png",
    27: "money.png",
    28: "case_wint25gift.png",
    29: "case_catcollection.png",
    30: "money.png",
    31: "case_arcase.png",
    32: "case_wint25gift.png",
    33: "case_NN2.png",
    34: "case_kolek2.png",
    35: "case_dogcollection.png",
    36: "money.png",
    37: "case_catcollection.png",
    38: "case_catcollection.png",
    39: "case_absolute.png",
    40: "case_dogcollection.png",
    41: "case_arcase.png",
    42: "case_wint25.png",
    43: "case_catcollection.png",
    44: "case_wint25gift.png",
    45: "case_arcase.png",
    46: "case_dogcollection.png",
    47: "case_kolek2.png",
    48: "case_wint25gift.png",
    49: "case_dogcollection.png",
    50: "case_catcollection.png"
  },

  premium: {
    1: "case_catcollection.png",
    2: "money.png",
    3: "case_dogcollection.png",
    4: "case_catcollection.png",
    5: "money.png",
    6: "case_dogcollection.png",
    7: "case_wint25gift.png",
    8: "case_wint25gift.png",
    9: "case_kolek2.png",
    10: "money.png",
    11: "case_arcase.png",
    12: "case_catcollection.png",
    13: "money.png",
    14: "case_catcollection.png",
    15: "case_kolek2.png",
    16: "case_dogcollection.png",
    17: "case_arcase.png",
    18: "money.png",
    19: "case_wint25gift.png",
    20: "case_catcollection.png",
    21: "case_catcollection.png",
    22: "case_kolek2.png",
    23: "case_arcase.png",
    24: "case_NN2.png",
    25: "case_dogcollection.png",

    26: "case_catcollection.png",
    27: "money.png",
    28: "case_dogcollection.png",
    29: "case_catcollection.png",
    30: "money.png",
    31: "case_dogcollection.png",
    32: "case_wint25gift.png",
    33: "case_wint25gift.png",
    34: "case_kolek2.png",
    35: "money.png",
    36: "case_arcase.png",
    37: "case_catcollection.png",
    38: "money.png",
    39: "case_catcollection.png",
    40: "case_kolek2.png",
    41: "case_dogcollection.png",
    42: "case_arcase.png",
    43: "money.png",
    44: "case_wint25gift.png",
    45: "case_catcollection.png",
    46: "case_catcollection.png",
    47: "case_kolek2.png",
    48: "case_arcase.png",
    49: "case_NN2.png",
    50: "case_dogcollection.png"
  }
};

// ----------------- 🎄 Winter Pass 2025 (Free) -----------------

const freePassLevels = [
  { level: 1, reward: "dogcollection", type: "item" },
  { level: 2, reward: 10, type: "coins" },
  { level: 3, reward: "wint25gift", type: "item" },
  { level: 4, reward: "catcollection", type: "item" },
  { level: 5, reward: 20, type: "coins" },
  { level: 6, reward: "arcase", type: "item" },
  { level: 7, reward: "wint25gift", type: "item" },
  { level: 8, reward: "NN2", type: "item" },
  { level: 9, reward: "kolek2", type: "item" },
  { level: 10, reward: "dogcollection", type: "item" },
  { level: 11, reward: 50, type: "coins" },
  { level: 12, reward: "catcollection", type: "item" },
  { level: 13, reward: "catcollection", type: "item" },
  { level: 14, reward: "absolute", type: "item" },
  { level: 15, reward: "dogcollection", type: "item" },
  { level: 16, reward: "arcase", type: "item" },
  { level: 17, reward: "wint25", type: "item" },
  { level: 18, reward: "catcollection", type: "item" },
  { level: 19, reward: "wint25gift", type: "item" },
  { level: 20, reward: "arcase", type: "item" },
  { level: 21, reward: "dogcollection", type: "item" },
  { level: 22, reward: "kolek2", type: "item" },
  { level: 23, reward: "wint25gift", type: "item" },
  { level: 24, reward: "dogcollection", type: "item" },
  { level: 25, reward: "catcollection", type: "item" },

  { level: 26, reward: "dogcollection", type: "item" },
  { level: 27, reward: 10, type: "coins" },
  { level: 28, reward: "wint25gift", type: "item" },
  { level: 29, reward: "catcollection", type: "item" },
  { level: 30, reward: 20, type: "coins" },
  { level: 31, reward: "arcase", type: "item" },
  { level: 32, reward: "wint25gift", type: "item" },
  { level: 33, reward: "NN2", type: "item" },
  { level: 34, reward: "kolek2", type: "item" },
  { level: 35, reward: "dogcollection", type: "item" },
  { level: 36, reward: 50, type: "coins" },
  { level: 37, reward: "catcollection", type: "item" },
  { level: 38, reward: "catcollection", type: "item" },
  { level: 39, reward: "absolute", type: "item" },
  { level: 40, reward: "dogcollection", type: "item" },
  { level: 41, reward: "arcase", type: "item" },
  { level: 42, reward: "wint25", type: "item" },
  { level: 43, reward: "catcollection", type: "item" },
  { level: 44, reward: "wint25gift", type: "item" },
  { level: 45, reward: "arcase", type: "item" },
  { level: 46, reward: "dogcollection", type: "item" },
  { level: 47, reward: "kolek2", type: "item" },
  { level: 48, reward: "wint25gift", type: "item" },
  { level: 49, reward: "dogcollection", type: "item" },
  { level: 50, reward: "catcollection", type: "item" }
];

const premiumPassLevels = [
  { level: 1, reward: "catcollection", type: "item" },
  { level: 2, reward: 50, type: "coins" },
  { level: 3, reward: "dogcollection", type: "item" },
  { level: 4, reward: "catcollection", type: "item" },
  { level: 5, reward: 50, type: "coins" },
  { level: 6, reward: "dogcollection", type: "item" },
  { level: 7, reward: "wint25gift", type: "item" },
  { level: 8, reward: "wint25gift", type: "item" },
  { level: 9, reward: "kolek2", type: "item" },
  { level: 10, reward: 100, type: "coins" },
  { level: 11, reward: "arcase", type: "item" },
  { level: 12, reward: "catcollection", type: "item" },
  { level: 13, reward: 150, type: "coins" },
  { level: 14, reward: "catcollection", type: "item" },
  { level: 15, reward: "kolek2", type: "item" },
  { level: 16, reward: "dogcollection", type: "item" },
  { level: 17, reward: "arcase", type: "item" },
  { level: 18, reward: 200, type: "coins" },
  { level: 19, reward: "wint25gift", type: "item" },
  { level: 20, reward: "catcollection", type: "item" },
  { level: 21, reward: "catcollection", type: "item" },
  { level: 22, reward: "kolek2", type: "item" },
  { level: 23, reward: "arcase", type: "item" },
  { level: 24, reward: "NN2", type: "item" },
  { level: 25, reward: "dogcollection", type: "item" },

  { level: 26, reward: "catcollection", type: "item" },
  { level: 27, reward: 50, type: "coins" },
  { level: 28, reward: "dogcollection", type: "item" },
  { level: 29, reward: "catcollection", type: "item" },
  { level: 30, reward: 50, type: "coins" },
  { level: 31, reward: "dogcollection", type: "item" },
  { level: 32, reward: "wint25gift", type: "item" },
  { level: 33, reward: "wint25gift", type: "item" },
  { level: 34, reward: "kolek2", type: "item" },
  { level: 35, reward: 100, type: "coins" },
  { level: 36, reward: "arcase", type: "item" },
  { level: 37, reward: "catcollection", type: "item" },
  { level: 38, reward: 150, type: "coins" },
  { level: 39, reward: "catcollection", type: "item" },
  { level: 40, reward: "kolek2", type: "item" },
  { level: 41, reward: "dogcollection", type: "item" },
  { level: 42, reward: "arcase", type: "item" },
  { level: 43, reward: 200, type: "coins" },
  { level: 44, reward: "wint25gift", type: "item" },
  { level: 45, reward: "catcollection", type: "item" },
  { level: 46, reward: "catcollection", type: "item" },
  { level: 47, reward: "kolek2", type: "item" },
  { level: 48, reward: "arcase", type: "item" },
  { level: 49, reward: "NN2", type: "item" },
  { level: 50, reward: "dogcollection", type: "item" }
];

const totalLevels = 50 ;
const bpcdPerLevel = 1000;

// ----------------- зберігання прогресу -----------------

// claimed нагороди 
function saveClaimed(passType, level){
    if(!currentUser) return;
    const key = currentUser + "_bpcd_claimed_catdog_" + passType;
    const claimed = JSON.parse(localStorage.getItem(key) || "{}");
    claimed[level] = true;
    localStorage.setItem(key, JSON.stringify(claimed));
}

function isClaimed(passType, level){
    if(!currentUser) return false;
    const key = currentUser + "_bpcd_claimed_catdog_" + passType;
    const claimed = JSON.parse(localStorage.getItem(key) || "{}");
    return !!claimed[level];
}

// ----------------- відображення Pass -----------------
function opencatdogPass () {
const endDate = new Date("2026-02-20"); // Кінець батл-пасу
    const now = new Date(); // Поточна дата

    if(now >= endDate) {
        alert("Батл-пас завершено! Ви більше не можете отримувати нагороди.");
        return;
    }

function loadcatdogBPCD(){
    if(!currentUser) return 0;
    currentBPCD = parseInt(localStorage.getItem(currentUser + "_bpPoints_catdog") || "0");
    const el = document.getElementById("bpcdCounter");
    if(el) el.textContent = currentBPCD;
    return currentBPCD;
}

const container = document.getElementById("app");
    container.innerHTML = `
        <h2>🎟️ Cat&Dog Pass </h2>
        <div style="display:flex; justify-content:space-around; margin-bottom:10px;">
            <button onclick="showPass('free')">Free Pass</button>
    <button id="premiumBtn1catdog" onclick="showPass('premium')" disabled title="Необхідно активувати Premium">Premium Pass</button>
           <button onclick="openEventsMenu()">Назад</button>
        </div>
        <div id="fallPassContainer" style="overflow-x:auto; white-space:nowrap; padding:10px; border:1px solid #ccc; border-radius:10px;"></div>
        <div style="margin-top:10px;">Ваші BP: <span id="bpcdCounter">${currentBPCD}</span></div>
    `;

      const btn = document.getElementById("premiumBtn1catdog");
if (localStorage.getItem("premiumBtn1catdog") === "1" && btn){
    btn.disabled = false;
    btn.title = "";
}

    showPass('free');
} 

function showPass(passType) {
    const container = document.getElementById("fallPassContainer");
    container.innerHTML = ""; 
    const levels = passType === 'free' ? freePassLevels : premiumPassLevels;

    levels.forEach(level => {
        const lvlDiv = document.createElement("div");
        lvlDiv.style.display = "inline-block";
        lvlDiv.style.width = "120px";
        lvlDiv.style.margin = "5px";
        lvlDiv.style.textAlign = "center";
        lvlDiv.style.cursor = "pointer";
        lvlDiv.style.border = "2px solid #ccc";
        lvlDiv.style.borderRadius = "10px";
        lvlDiv.style.padding = "5px";

       const locked = currentBPCD < level.level * bpcdPerLevel;
        const claimed = isClaimed(passType, level.level);
       lvlDiv.style.backgroundColor = claimed ? "#FFDFA0" : "#8b6b45"; 
   const imgFile = catdogImages[passType][level.level];
        lvlDiv.innerHTML = `
            <img src="img/${imgFile}" alt="Level ${level.level}" style="width:100px; height:100px;" /> 
            <div style="color:black;">Level ${level.level}</div>
            <div style="color:black;">${locked ? "🔒" : (level.type === "coins" ? level.reward + " нікусів" : getCaseName(level.reward))}</div>
        `;

lvlDiv.onclick = () => {
    const nowClaimed = isClaimed(passType, level.level); // перевірка актуального стану
    if(!locked && !nowClaimed){
        saveClaimed(passType, level.level);
       lvlDiv.style.backgroundColor = "#C9F6FF"; 
        if(level.type === "coins") {
            addBalance(level.reward);
        } else {
            addCase(level.reward);
        }
    } else if (locked){
        alert("Потрібно більше BP для цього рівня!");
    } else if (nowClaimed){
        alert("Ви вже забрали цю нагороду!");
    }
};
        container.appendChild(lvlDiv);
    });
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

function claimTaskReward(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (task.completed) return alert("Нагорода вже забрана!");
    if (!task.check()) return alert("Завдання ще не виконано!");

    task.reward();
    task.completed = true;

    saveUser();
    saveTasks();
    openTasksMenu();

    showToast("Нагороду отримано 🎉");
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

/* =================== BPCD MECHANIC =================== */

function giveTaskBPCD(amount) {
    if (typeof BPCD !== "number") BPCD = 0;
    addBPCD(amount);

    if (typeof saveData === "function") saveData();
    alert(`Нагорода отримана! Ви отримали ${amount} BPCD 🎉`);
}

/* =================== TASKS =================== */

const tasks = [
  { id:2001, description:"*Власник Річіка* Вибити Річік—Казіно або Річік (8000БП)", reward:()=>giveTaskBPCD(8000), check:()=>inventory.some(i=>["Річік—Казіно","Річік"].includes(i.name)), completed:false },
  { id:2002, description:"*Собачий магнат* Отримати всі предмети з Dogecollection (10000БП)", reward:()=>giveTaskBPCD(10000), check:()=>["Річік—Казіно","Пес Патрон","Бен","Доге Качок","Собака?","Собалдо","Мопс","Броне—Собака"].every(n=>inventory.some(i=>i.name===n)), completed:false },
  { id:2003, description:"*Кошара* Отримати Уііа-кіт (5000БП)", reward:()=>giveTaskBPCD(5000), check:()=>inventory.some(i=>i.name==="Уііа—Кіт"), completed:false },
  { id:2004, description:"*О, новенький Кейс* Відкрити будь-який новий кейс (2000 БП)", reward:()=>giveTaskBPCD(2000), check:()=>[
      "Річік","Кіт—криптовалютчик","Капібара","Кіт у хлібі",
      "Кукі","Панда","Уііа—Кіт","Шльопа","Перехожий","Максвел","ОКАК v2","(CT)Cat",
      "Ригачело","ШІ—КІТ",
      "Річік—Казіно","Пес Патрон","Бен","Доге Качок","Собака?","Собалдо","Мопс","Броне—Собака"
    ].some(n=>inventory.some(i=>i.name===n)), completed:false },
  { id:2005, description:"*Окак Головного мозку* Отримати любий ОКАК (Окак або Окак v2) (1000БП)", reward:()=>giveTaskBPCD(1000), check:()=>inventory.some(i=>["Окак","ОКАК v2"].includes(i.name)), completed:false },
  { id:2006, description:"*Тримай цей Район* Отримати Пес Патрон (5000 БП)", reward:()=>giveTaskBPCD(5000), check:()=>inventory.some(i=>i.name==="Пес Патрон"), completed:false },
  { id:2007, description:"*Власник Панди* Отримати Панду (8000БП)", reward:()=>giveTaskBPCD(8000), check:()=>inventory.some(i=>i.name==="Панда"), completed:false },
  { id:2008, description:"*Слівкі без шоу* Отримати Кукі (7000БП)", reward:()=>giveTaskBPCD(7000), check:()=>inventory.some(i=>i.name==="Кукі"), completed:false },
  { id:2009, description:"*Сино, за яку ти зайшов команду?* Отримати (CT) Cat (2000БП)", reward:()=>giveTaskBPCD(2000), check:()=>inventory.some(i=>i.name==="(CT)Cat"), completed:false },
  { id:2010, description:"*Взяти участь у матчі* Вибити Собалду. (1000БП)", reward:()=>giveTaskBPCD(1000), check:()=>inventory.some(i=>i.name==="Собалдо"), completed:false },
  { id:2011, description:"*Колекціонер* Отримати Вищета або Пірнівський Двіж. (4000БП)", reward:()=>giveTaskBPCD(4000), check:()=>inventory.some(i=>["Вищета","Пірнівський Двіж"].includes(i.name)), completed:false }
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
        task.reward(); // тут BPCD нараховується через механіку магазину
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

function accountMenu() {
    const musicEnabled = localStorage.getItem("musicEnabled") !== "false";

    document.getElementById("app").innerHTML = `
        <h2>Акаунт ⚙️</h2>

        <button onclick="toggleMusic()">
            ${musicEnabled ? "🔊 Музика: Увімкнено" : "🔇 Музика: Вимкнено"}
        </button><br/><br/>

        <input type="password" id="deletePass" placeholder="Введіть пароль" oninput="checkDeletePass()"/><br/><br/>

        <button id="deleteBtn" onclick="deleteProgress()" disabled>🗑 Видалити прогрес</button><br/><br/>

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

/* ================== ПЕРЕМІКАЧ МУЗИКИ ================== */
function toggleMusic() {
    const enabled = localStorage.getItem("musicEnabled") !== "false";
    localStorage.setItem("musicEnabled", !enabled);
    updateMusicState();
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
  "U1BBU0lCTw==": {  
    type: "once",
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

// ==================== 🎁 Starter Pass ====================
const starterRewards = [
  { day: 1, reward: "absolute", type: "item" },
  { day: 2, reward: "wint25", type: "item" },
  { day: 3, reward: "wint25gift", type: "item" },
  { day: 4, reward: "kolek2", type: "item" },
  { day: 5, reward: "catcollection", type: "item" },
  { day: 6, reward: "dogcollection", type: "item" },
  { day: 7, reward: "NN2", type: "item" }
];

function MenuStarterPass() {
  if (!currentUser) return;

  const container = document.getElementById("app");

  let lastClaim = localStorage.getItem(currentUser + "_starter2_lastClaim") || "";
  let dayIndex = parseInt(localStorage.getItem(currentUser + "_starter2_index") || "0");
  let modalShown = localStorage.getItem(currentUser + "_starter2_modalShown") === "true";

  const now = new Date();
  let next = new Date();
  next.setHours(10, 10, 0, 0);
  if (now > next) next.setDate(next.getDate() + 1);

  function format(ms) {
    let h = Math.floor(ms / 3600000),
        m = Math.floor((ms % 3600000) / 60000),
        s = Math.floor((ms % 60000) / 1000);
    return `${h}год ${m}хв ${s}с`;
  }

  container.innerHTML = `
    <div class="headerBar" style="display:flex; align-items:center; padding:8px 12px; background:#FFB137; border-radius:8px;">
      <button class="backBtn" onclick="openEventsMenu()" style="margin-right:10px;">← Назад</button>
      <span class="headerTitle" style="font-size:20px; font-weight:bold;">🎁 Starter Pass</span>
    </div>

    <p id="starterTimer" style="font-size:18px; font-weight:bold; margin-top:12px;"></p>

    <div id="starterRow" style="
      white-space:nowrap; 
      overflow-x:auto; 
      padding:10px; 
      border:1px solid #ccc; 
      border-radius:10px; 
      margin-top:10px;
      -webkit-overflow-scrolling: touch;
      touch-action: pan-x;">
    </div>
  `;

  const row = document.getElementById("starterRow");

  starterRewards.forEach(r => {
    const claimed = r.day <= dayIndex;
    const today = new Date().toDateString();
    const isTodayClaim = today === lastClaim;
    let locked = r.day > dayIndex + 1 || (r.day === dayIndex + 1 && isTodayClaim);

    const box = document.createElement("div");
    box.style.cssText = `
      display:inline-block;
      width:130px;
      margin:6px;
      text-align:center;
      border:2px solid #EF8C00;
      padding:6px;
      border-radius:10px;
      background:${claimed ? "#FFFF00" : "#FFD037"};
      cursor:${locked || claimed ? "not-allowed" : "pointer"};
      -webkit-tap-highlight-color: transparent;
    `;
    box.style.touchAction = "manipulation";

    box.innerHTML = `
      <img src="img/case_${r.reward}.png" style="
        width:100px;
        height:100px;
        object-fit:contain;
        image-rendering:auto;
      ">
      <div style="color:black; margin-top:4px;">День ${r.day}</div>
      <div style="
        color:black;
        max-width:100px;
        margin:0 auto;
        white-space:normal;
        word-wrap:break-word;
        font-size:14px;
        line-height:1.1;
      ">
        ${getCaseName(r.reward)}
      </div>
      ${locked ? "🔒" : (claimed ? "✅ Отримано" : "➡ Натисни")}
    `;

    box.addEventListener("click", e => {
      e.preventDefault();
      if (locked || claimed) return;
      localStorage.setItem(currentUser + "_starter2_lastClaim", today);
      localStorage.setItem(currentUser + "_starter2_index", r.day);
      addCase(r.reward);
      MenuStarterPass();
    });

    row.appendChild(box);
  });

  function tick() {
    document.getElementById("starterTimer").textContent =
      "⏱ До наступної нагороди: " + format(next - new Date());
    requestAnimationFrame(tick);
  }
  tick();

  if (!modalShown) {
    container.innerHTML += `
      <div id="starterModal" style="
        position:fixed; inset:0;
        background:rgba(0,0,0,0.55);
        display:flex; justify-content:center; align-items:center;
        backdrop-filter:blur(6px);
        z-index:9999;">
        <div style="background:white; padding:20px; border-radius:12px; max-width:320px; text-align:center;">
          <h3>🎉 Вітаю!</h3>
          <p>Це Starter Pass — він для всіх гравців. Забирай нагороди щодня! (Щоб зібрати нагороди перезайди у меню) </p>
          <button id="closeStarterModal" style="margin-top:12px;">Гаразд!</button>
        </div>
      </div>
    `;
    document.getElementById("closeStarterModal").onclick = () => {
      document.getElementById("starterModal").remove();
      localStorage.setItem(currentUser + "_starter2_modalShown", "true");
    };
  }
}

function startSnowfall() {
  const snowflakeCount = 30; // кількість за "покоління"
  const symbols = ["🐾", "🐱", "😺", "😸", "😹"]; // лапки + морди

  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    // Випадкові позиції та параметри (як було)
    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.fontSize = 12 + Math.random() * 18 + "px";
    snowflake.style.opacity = (0.6 + Math.random() * 0.4).toFixed(2);
    snowflake.style.animationDuration = 4 + Math.random() * 6 + "s";
    snowflake.style.animationDelay = Math.random() * 3 + "s";

    document.body.appendChild(snowflake);

    // Видаляємо після завершення падіння
    setTimeout(() => snowflake.remove(), 10000);
  }

  // Перший запуск
  for (let i = 0; i < snowflakeCount; i++) {
    createSnowflake();
  }

  // Додаємо нові періодично
  setInterval(() => {
    createSnowflake();
  }, 1000);
}

// Запуск після завантаження
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

// === QR-КОДИ ===
const qrCodes = { 
  qr2_5: 2.5, 
  qr5: 5, 
  qr10: 10, 
  qr20: 20, 
  qr35: 35, 
  qr50: 50, 
  qr100: 100,
  qrM5: -5,
  qrM10: -10,
  qrM20: -20
};

// === ФІКСОВАНИЙ КУРС НА СЬОГОДНІ ===

const dailyRates = {
  // Вересень 2025
  "2025-09-01": { xcoin:60, oreh:15 }, "2025-09-02": { xcoin:61, oreh:16 },
  "2025-09-03": { xcoin:62, oreh:13 }, "2025-09-04": { xcoin:63, oreh:17 },
  "2025-09-05": { xcoin:50, oreh:17 }, "2025-09-06": { xcoin:40, oreh:18 },
  "2025-09-07": { xcoin:55, oreh:17 }, "2025-09-08": { xcoin:61, oreh:19 },
  "2025-09-09": { xcoin:60, oreh:19 }, "2025-09-10": { xcoin:69, oreh:20 },
  "2025-09-11": { xcoin:70, oreh:9 },  "2025-09-12": { xcoin:71, oreh:8 },
  "2025-09-13": { xcoin:60, oreh:11 }, "2025-09-14": { xcoin:75, oreh:15 },
  "2025-09-15": { xcoin:74, oreh:22 }, "2025-09-16": { xcoin:59, oreh:23 },
  "2025-09-17": { xcoin:76, oreh:23 }, "2025-09-18": { xcoin:77, oreh:24 },
  "2025-09-19": { xcoin:68, oreh:16 }, "2025-09-20": { xcoin:73, oreh:20 },
  "2025-09-21": { xcoin:63, oreh:25 }, "2025-09-22": { xcoin:65, oreh:25 },
  "2025-09-23": { xcoin:67, oreh:26 }, "2025-09-24": { xcoin:63, oreh:27 },
  "2025-09-25": { xcoin:62, oreh:9 },  "2025-09-26": { xcoin:77, oreh:10 },
  "2025-09-27": { xcoin:86, oreh:11 }, "2025-09-28": { xcoin:81, oreh:9 },
  "2025-09-29": { xcoin:74, oreh:29 }, "2025-09-30": { xcoin:69, oreh:20 },

  // Жовтень 2025
  "2025-10-01": { xcoin:67, oreh:17 }, "2025-10-02": { xcoin:63, oreh:16 },
  "2025-10-03": { xcoin:60, oreh:13 }, "2025-10-04": { xcoin:55, oreh:17 },
  "2025-10-05": { xcoin:50, oreh:19 }, "2025-10-06": { xcoin:40, oreh:22 },
  "2025-10-07": { xcoin:41, oreh:23 }, "2025-10-08": { xcoin:61, oreh:19 },
  "2025-10-09": { xcoin:65, oreh:19 }, "2025-10-10": { xcoin:70, oreh:20 },
  "2025-10-11": { xcoin:68, oreh:9 },  "2025-10-12": { xcoin:71, oreh:10 },
  "2025-10-13": { xcoin:60, oreh:11 }, "2025-10-14": { xcoin:61, oreh:15 },
  "2025-10-15": { xcoin:63, oreh:17 }, "2025-10-16": { xcoin:59, oreh:23 },
  "2025-10-17": { xcoin:62, oreh:25 }, "2025-10-18": { xcoin:61, oreh:24 },
  "2025-10-19": { xcoin:90, oreh:30 }, "2025-10-20": { xcoin:55, oreh:12 },
  "2025-10-21": { xcoin:63, oreh:20 }, "2025-10-22": { xcoin:65, oreh:22 },
  "2025-10-23": { xcoin:67, oreh:15 }, "2025-10-24": { xcoin:63, oreh:15 },
  "2025-10-25": { xcoin:55, oreh:9 },  "2025-10-26": { xcoin:60, oreh:10 },
  "2025-10-27": { xcoin:59, oreh:14 }, "2025-10-28": { xcoin:60, oreh:13 },
  "2025-10-29": { xcoin:58, oreh:15 }, "2025-10-30": { xcoin:69, oreh:20 },
  "2025-10-31": { xcoin:70, oreh:22 },

  // Листопад 2025
  "2025-11-01": { xcoin:72, oreh:18 }, "2025-11-02": { xcoin:68, oreh:17 },
  "2025-11-03": { xcoin:65, oreh:15 }, "2025-11-04": { xcoin:64, oreh:19 },
  "2025-11-05": { xcoin:60, oreh:18 }, "2025-11-06": { xcoin:62, oreh:21 },
  "2025-11-07": { xcoin:59, oreh:22 }, "2025-11-08": { xcoin:61, oreh:20 },
  "2025-11-09": { xcoin:63, oreh:19 }, "2025-11-10": { xcoin:65, oreh:23 },
  "2025-11-11": { xcoin:67, oreh:24 }, "2025-11-12": { xcoin:66, oreh:22 },
  "2025-11-13": { xcoin:64, oreh:21 }, "2025-11-14": { xcoin:63, oreh:20 },
  "2025-11-15": { xcoin:62, oreh:19 }, "2025-11-16": { xcoin:61, oreh:18 },
  "2025-11-17": { xcoin:63, oreh:20 }, "2025-11-18": { xcoin:65, oreh:21 },
  "2025-11-19": { xcoin:67, oreh:23 }, "2025-11-20": { xcoin:66, oreh:22 },
  "2025-11-21": { xcoin:68, oreh:24 }, "2025-11-22": { xcoin:70, oreh:25 },
  "2025-11-23": { xcoin:69, oreh:23 }, "2025-11-24": { xcoin:67, oreh:22 },
  "2025-11-25": { xcoin:65, oreh:21 }, "2025-11-26": { xcoin:64, oreh:20 },
  "2025-11-27": { xcoin:62, oreh:19 }, "2025-11-28": { xcoin:63, oreh:21 },
  "2025-11-29": { xcoin:65, oreh:23 }, "2025-11-30": { xcoin:67, oreh:25 },

  // Грудень 2025
  "2025-12-01": { xcoin:70, oreh:18 }, "2025-12-02": { xcoin:68, oreh:17 },
  "2025-12-03": { xcoin:66, oreh:19 }, "2025-12-04": { xcoin:64, oreh:20 },
  "2025-12-05": { xcoin:63, oreh:22 }, "2025-12-06": { xcoin:61, oreh:21 },
  "2025-12-07": { xcoin:60, oreh:19 }, "2025-12-08": { xcoin:62, oreh:18 },
  "2025-12-09": { xcoin:64, oreh:20 }, "2025-12-10": { xcoin:66, oreh:22 },
  "2025-12-11": { xcoin:67, oreh:24 }, "2025-12-12": { xcoin:65, oreh:23 },
  "2025-12-13": { xcoin:63, oreh:22 }, "2025-12-14": { xcoin:61, oreh:20 },
  "2025-12-15": { xcoin:60, oreh:19 }, "2025-12-16": { xcoin:62, oreh:21 },
  "2025-12-17": { xcoin:64, oreh:22 }, "2025-12-18": { xcoin:66, oreh:24 },
  "2025-12-19": { xcoin:68, oreh:25 }, "2025-12-20": { xcoin:67, oreh:23 },
  "2025-12-21": { xcoin:65, oreh:22 }, "2025-12-22": { xcoin:63, oreh:20 },
  "2025-12-23": { xcoin:62, oreh:19 }, "2025-12-24": { xcoin:61, oreh:18 },
  "2025-12-25": { xcoin:63, oreh:20 }, "2025-12-26": { xcoin:65, oreh:21 },
  "2025-12-27": { xcoin:67, oreh:23 }, "2025-12-28": { xcoin:66, oreh:22 },
  "2025-12-29": { xcoin:64, oreh:21 }, "2025-12-30": { xcoin:63, oreh:20 },
  "2025-12-31": { xcoin:65, oreh:22 },

  // Січень 2026
  "2026-01-01": { xcoin:66, oreh:23 }, "2026-01-02": { xcoin:67, oreh:22 },
  "2026-01-03": { xcoin:65, oreh:21 }, "2026-01-04": { xcoin:63, oreh:20 },
  "2026-01-05": { xcoin:61, oreh:19 }, "2026-01-06": { xcoin:62, oreh:21 },
  "2026-01-07": { xcoin:64, oreh:22 }, "2026-01-08": { xcoin:66, oreh:24 },
  "2026-01-09": { xcoin:68, oreh:25 }, "2026-01-10": { xcoin:67, oreh:23 },
  "2026-01-11": { xcoin:65, oreh:22 }, "2026-01-12": { xcoin:63, oreh:20 },
  "2026-01-13": { xcoin:62, oreh:19 }, "2026-01-14": { xcoin:61, oreh:18 },
  "2026-01-15": { xcoin:63, oreh:20 }, "2026-01-16": { xcoin:65, oreh:21 },
  "2026-01-17": { xcoin:67, oreh:23 }, "2026-01-18": { xcoin:66, oreh:22 },
  "2026-01-19": { xcoin:64, oreh:21 }, "2026-01-20": { xcoin:63, oreh:20 },
  "2026-01-21": { xcoin:61, oreh:19 }, "2026-01-22": { xcoin:62, oreh:21 },
  "2026-01-23": { xcoin:64, oreh:22 }, "2026-01-24": { xcoin:66, oreh:24 },
  "2026-01-25": { xcoin:68, oreh:25 }, "2026-01-26": { xcoin:67, oreh:23 },
  "2026-01-27": { xcoin:65, oreh:22 }, "2026-01-28": { xcoin:63, oreh:20 },
  "2026-01-29": { xcoin:62, oreh:19 }, "2026-01-30": { xcoin:61, oreh:18 },
  "2026-01-31": { xcoin:63, oreh:20 },

  // Лютий 2026
  "2026-02-01": { xcoin:64, oreh:21 }, "2026-02-02": { xcoin:65, oreh:22 },
  "2026-02-03": { xcoin:66, oreh:23 }, "2026-02-04": { xcoin:67, oreh:24 },
  "2026-02-05": { xcoin:68, oreh:25 }, "2026-02-06": { xcoin:67, oreh:23 },
  "2026-02-07": { xcoin:66, oreh:22 }, "2026-02-08": { xcoin:65, oreh:21 },
  "2026-02-09": { xcoin:64, oreh:20 }, "2026-02-10": { xcoin:63, oreh:19 },
  "2026-02-11": { xcoin:62, oreh:18 }, "2026-02-12": { xcoin:64, oreh:20 },
  "2026-02-13": { xcoin:65, oreh:21 }, "2026-02-14": { xcoin:66, oreh:22 },
  "2026-02-15": { xcoin:67, oreh:23 }, "2026-02-16": { xcoin:68, oreh:24 },
  "2026-02-17": { xcoin:67, oreh:23 }, "2026-02-18": { xcoin:66, oreh:22 },
  "2026-02-19": { xcoin:65, oreh:21 }, "2026-02-20": { xcoin:64, oreh:20 },
  "2026-02-21": { xcoin:63, oreh:19 }, "2026-02-22": { xcoin:64, oreh:21 },
  "2026-02-23": { xcoin:65, oreh:22 }, "2026-02-24": { xcoin:66, oreh:23 },
  "2026-02-25": { xcoin:67, oreh:24 }, "2026-02-26": { xcoin:68, oreh:25 },
  "2026-02-27": { xcoin:67, oreh:23 }, "2026-02-28": { xcoin:66, oreh:22 },

  // Березень 2026
  "2026-03-01": { xcoin:65, oreh:21 }, "2026-03-02": { xcoin:64, oreh:20 },
  "2026-03-03": { xcoin:63, oreh:19 }, "2026-03-04": { xcoin:64, oreh:21 },
  "2026-03-05": { xcoin:65, oreh:22 }, "2026-03-06": { xcoin:66, oreh:23 },
  "2026-03-07": { xcoin:67, oreh:24 }, "2026-03-08": { xcoin:68, oreh:25 },
  "2026-03-09": { xcoin:67, oreh:23 }, "2026-03-10": { xcoin:66, oreh:22 },
  "2026-03-11": { xcoin:65, oreh:21 }, "2026-03-12": { xcoin:64, oreh:20 },
  "2026-03-13": { xcoin:63, oreh:19 }, "2026-03-14": { xcoin:64, oreh:21 },
  "2026-03-15": { xcoin:65, oreh:22 }, "2026-03-16": { xcoin:66, oreh:23 },
  "2026-03-17": { xcoin:67, oreh:24 }, "2026-03-18": { xcoin:68, oreh:25 },
  "2026-03-19": { xcoin:67, oreh:23 }, "2026-03-20": { xcoin:66, oreh:22 },
  "2026-03-21": { xcoin:65, oreh:21 }, "2026-03-22": { xcoin:64, oreh:20 },
  "2026-03-23": { xcoin:63, oreh:19 }, "2026-03-24": { xcoin:64, oreh:21 },
  "2026-03-25": { xcoin:65, oreh:22 }, "2026-03-26": { xcoin:66, oreh:23 },
  "2026-03-27": { xcoin:67, oreh:24 }, "2026-03-28": { xcoin:68, oreh:25 },
  "2026-03-29": { xcoin:67, oreh:23 }, "2026-03-30": { xcoin:66, oreh:22 },
  "2026-03-31": { xcoin:65, oreh:21 },

  // Квітень 2026
  "2026-04-01": { xcoin:64, oreh:20 }, "2026-04-02": { xcoin:63, oreh:19 },
  "2026-04-03": { xcoin:64, oreh:21 }, "2026-04-04": { xcoin:65, oreh:22 },
  "2026-04-05": { xcoin:66, oreh:23 }, "2026-04-06": { xcoin:67, oreh:24 },
  "2026-04-07": { xcoin:68, oreh:25 }, "2026-04-08": { xcoin:67, oreh:23 },
  "2026-04-09": { xcoin:66, oreh:22 }, "2026-04-10": { xcoin:65, oreh:21 },
  "2026-04-11": { xcoin:64, oreh:20 }, "2026-04-12": { xcoin:63, oreh:19 },
  "2026-04-13": { xcoin:64, oreh:21 }, "2026-04-14": { xcoin:65, oreh:22 },
  "2026-04-15": { xcoin:66, oreh:23 }, "2026-04-16": { xcoin:67, oreh:24 },
  "2026-04-17": { xcoin:68, oreh:25 }, "2026-04-18": { xcoin:67, oreh:23 },
  "2026-04-19": { xcoin:66, oreh:22 }, "2026-04-20": { xcoin:65, oreh:21 },
  "2026-04-21": { xcoin:64, oreh:20 }, "2026-04-22": { xcoin:63, oreh:19 },
  "2026-04-23": { xcoin:64, oreh:21 }, "2026-04-24": { xcoin:65, oreh:22 },
  "2026-04-25": { xcoin:66, oreh:23 }, "2026-04-26": { xcoin:67, oreh:24 },
  "2026-04-27": { xcoin:68, oreh:25 }, "2026-04-28": { xcoin:67, oreh:23 },
  "2026-04-29": { xcoin:66, oreh:22 }, "2026-04-30": { xcoin:65, oreh:21 },

  // Травень 2026
  "2026-05-01": { xcoin:64, oreh:20 }, "2026-05-02": { xcoin:63, oreh:19 },
  "2026-05-03": { xcoin:64, oreh:21 }, "2026-05-04": { xcoin:65, oreh:22 },
  "2026-05-05": { xcoin:66, oreh:23 }, "2026-05-06": { xcoin:67, oreh:24 },
  "2026-05-07": { xcoin:68, oreh:25 }, "2026-05-08": { xcoin:67, oreh:23 },
  "2026-05-09": { xcoin:66, oreh:22 }, "2026-05-10": { xcoin:65, oreh:21 },
  "2026-05-11": { xcoin:64, oreh:20 }, "2026-05-12": { xcoin:63, oreh:19 },
  "2026-05-13": { xcoin:64, oreh:21 }, "2026-05-14": { xcoin:65, oreh:22 },
  "2026-05-15": { xcoin:66, oreh:23 }, "2026-05-16": { xcoin:67, oreh:24 },
  "2026-05-17": { xcoin:68, oreh:25 }, "2026-05-18": { xcoin:67, oreh:23 },
  "2026-05-19": { xcoin:66, oreh:22 }, "2026-05-20": { xcoin:65, oreh:21 },
  "2026-05-21": { xcoin:64, oreh:20 }, "2026-05-22": { xcoin:63, oreh:19 },
  "2026-05-23": { xcoin:64, oreh:21 }, "2026-05-24": { xcoin:65, oreh:22 },
  "2026-05-25": { xcoin:66, oreh:23 }, "2026-05-26": { xcoin:67, oreh:24 },
  "2026-05-27": { xcoin:68, oreh:25 }, "2026-05-28": { xcoin:67, oreh:23 },
  "2026-05-29": { xcoin:66, oreh:22 }, "2026-05-30": { xcoin:65, oreh:21 },
  "2026-05-31": { xcoin:64, oreh:20 }
};

function getTodayPrice() {
  const today = new Date();
  const key = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return dailyRates[key] || { xcoin: 0, oreh: 0 };
}

let prices = getTodayPrice();

// === QR-Сканер ===
let videoOverlay = null;
let scanInterval = null;

function startBankQRScanner() {
  stopBankQRScanner();

  videoOverlay = document.createElement("div");
  videoOverlay.style = `
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex; justify-content: center; align-items: center;
    z-index: 9999;
    flex-direction: column;
  `;
  document.body.appendChild(videoOverlay);

  const video = document.createElement("video");
  video.setAttribute("playsinline", true);
  video.style.maxWidth = "90%";
  video.style.maxHeight = "70%";
  videoOverlay.appendChild(video);

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✖ Закрити";
  closeBtn.style = `
    position: absolute; top: 20px; right: 20px;
    padding: 10px 15px; font-size: 16px; cursor: pointer;
  `;
  closeBtn.onclick = stopBankQRScanner;
  videoOverlay.appendChild(closeBtn);

  const info = document.createElement("p");
  info.textContent = "Наведи камеру на QR-код";
  info.style.color = "#fff";
  videoOverlay.appendChild(info);

  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then(stream => {
      video.srcObject = stream;
      video.play();

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      scanInterval = setInterval(() => {
        if (video.readyState !== video.HAVE_ENOUGH_DATA) return;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imgData.data, imgData.width, imgData.height);
        if (code?.data) {
          stopBankQRScanner();
          processScannedPayload(code.data);
        }
      }, 300);
    })
    .catch(stopBankQRScanner);
}

function stopBankQRScanner() {
  if (scanInterval) {
    clearInterval(scanInterval);
    scanInterval = null;
  }
  if (videoOverlay) {
    const video = videoOverlay.querySelector("video");
    if (video?.srcObject) {
      video.srcObject.getTracks().forEach(track => track.stop());
    }
    videoOverlay.remove();
    videoOverlay = null;
  }
}

// === Обробка QR ===

function processScannedPayload(data) {
  const amount = qrCodes[data];

  // Якщо QR валідний, додаємо до nikus і зберігаємо
  if (amount !== undefined) {
    nikus = (nikus || 0) + amount;
    localStorage.setItem((currentUser || "guest") + "_nikus", nikus);

    // Оновлюємо меню банку відразу
    MenuBank(); 
  }
}

// === ГРАФІК ===
let priceChart = null;

function updatePrice() {
  prices = getTodayPrice();
  updateChart("xcoin", prices.xcoin);
  updateChart("oreh", prices.oreh);
}

function updateChart(token, value) {
  if (!priceChart) return;
  const dataset = priceChart.data.datasets.find(d => d.label === (token === "xcoin" ? "Х-коін" : "Орех"));
  if (!dataset) return;

  const nowLabel = new Date().toLocaleDateString();
  const labels = priceChart.data.labels;

  if (labels[labels.length - 1] !== nowLabel) labels.push(nowLabel);
  dataset.data.push(value);

  priceChart.data.labels = labels.slice(-7);
  priceChart.data.datasets.forEach(ds => ds.data = ds.data.slice(-7));

  priceChart.update();
  saveChartData();
}

function saveChartData() {
  if (!priceChart) return;
  const chartData = {
    labels: priceChart.data.labels.slice(-7),
    datasets: priceChart.data.datasets.map(ds => ({
      label: ds.label,
      data: ds.data.slice(-7)
    }))
  };
  localStorage.setItem("chartData", JSON.stringify(chartData));
}

function loadChartData() {
  if (!priceChart) return;
  const stored = localStorage.getItem("chartData");
  if (!stored) return;

  try {
    const data = JSON.parse(stored);
    if (data?.labels && data?.datasets?.length) {
      priceChart.data.labels = data.labels;
      priceChart.data.datasets.forEach((ds, i) => {
        ds.data = data.datasets[i]?.data || [];
      });
      priceChart.update();
    }
  } catch {}
}

function tradeXCoin() {
  const input = document.getElementById("xcoinAmount");
  const amount = parseFloat(input.value);
  const action = document.getElementById("xcoinAction").value;

  if (!amount || amount <= 0) return;

  if (action === "buy") {
    const cost = amount * prices.xcoin;
    if ((nikus || 0) < cost) return;
    nikus -= cost;
    xcoin = (xcoin || 0) + amount;
  } else if (action === "sell") {
    if ((xcoin || 0) < amount) return;
    xcoin -= amount;
    nikus = (nikus || 0) + amount * prices.xcoin;
  }

  localStorage.setItem((currentUser || "guest") + "_nikus", nikus);
  localStorage.setItem((currentUser || "guest") + "_xcoin", xcoin);

  input.value = "";
  MenuBank(); // <-- тут перерисовуємо все меню з новими значеннями
  updatePrice?.(); 
}

function tradeOreh() {
  const input = document.getElementById("orehAmount");
  const amount = parseFloat(input.value);
  const action = document.getElementById("orehAction").value;

  if (!amount || amount <= 0) return;

  if (action === "buy") {
    const cost = amount * prices.oreh;
    if ((nikus || 0) < cost) return;
    nikus -= cost;
    OPEX = (OPEX || 0) + amount;
  } else if (action === "sell") {
    if ((OPEX || 0) < amount) return;
    OPEX -= amount;
    nikus = (nikus || 0) + amount * prices.oreh;
  }

  localStorage.setItem((currentUser || "guest") + "_nikus", nikus);
  localStorage.setItem((currentUser || "guest") + "_OPEX", OPEX);

  input.value = "";
  MenuBank(); // <-- перерисовуємо меню
  updatePrice?.();
}

function buyBalance(amount, cost) {
  if (nikus >= cost) {
    nikus -= cost;
    balance = (balance || 0) + amount;

    alert(`✅ Ви купили +${amount} balance за ${cost} нікусів!`);

    saveData?.(); // зберігаємо оновлені дані
  } else {
    alert("❌ Недостатньо нікусів для покупки!");
  }
}

function MenuBank() {
  const container = document.getElementById("app");
  if (!container) return;

  const priceX = prices?.xcoin || 0;
  const priceO = prices?.oreh || 0;

  container.innerHTML = `
    <h2>🏦 Банк ${currentUser || ""}</h2>

    <div style="display:flex; flex-wrap:wrap; gap:20px; justify-content:center;">

      <!-- Блок балансу -->
      <div id="balancesBox"
           style="flex:1; min-width:250px; padding:15px; border-radius:12px;
                  background:rgba(210,190,150,0.75);
                  box-shadow:0 0 15px rgba(120,90,50,0.6);">
        ${getBalanceHTML()}
      </div>

      <!-- Блок курсів -->
      <div style="flex:1; min-width:250px; padding:15px; border-radius:12px;
                  background:rgba(210,190,150,0.75);
                  box-shadow:0 0 15px rgba(120,90,50,0.6);">
        <h3>📈 Курси сьогодні</h3>
        <p>1 XCoin = <b>${priceX}</b> нікусів</p>
        <p>1 OPEX = <b>${priceO}</b> нікусів</p>
        <p>Дата оновлення: ${new Date().toLocaleDateString()}</p>
      </div>

    </div>

    <!-- Блок операцій з криптою -->
    <div style="flex:1; min-width:250px; padding:15px; margin-top:20px; border-radius:12px;
                background:rgba(210,190,150,0.75);
                box-shadow:0 0 15px rgba(120,90,50,0.6); text-align:center;">
      <h3>💱 Операції з криптою</h3>
      <div style="margin-bottom:10px;">
        <input id="xcoinAmount" type="number" placeholder="Кількість XCoin" style="width:60%;" />
        <select id="xcoinAction">
          <option value="buy">Купити</option>
          <option value="sell">Продати</option>
        </select>
        <button onclick="tradeXCoin()">OK</button>
      </div>

      <div>
        <input id="orehAmount" type="number" placeholder="Кількість OPEX" style="width:60%;" />
        <select id="orehAction">
          <option value="buy">Купити</option>
          <option value="sell">Продати</option>
        </select>
        <button onclick="tradeOreh()">OK</button>
      </div>
    </div>

    <!-- QR-операції -->
    <div style="margin-top:20px; text-align:center;">
      <h3>📲 QR-операції</h3>
      <button onclick="startBankQRScanner()">Сканувати QR</button>
    </div>

    <!-- Донат блок -->
    <div style="flex:1; min-width:250px; padding:15px; margin-top:20px; border-radius:12px;
                background: rgba(210,190,150,0.75);
                box-shadow:0 0 15px rgba(210,190,150,0.75); text-align:center;">
      <h3>💎 Купити ігрові нікуси</h3>
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; margin-top:10px;">
        <img src="img/Buy50Balance.png" style="width:100%; cursor:pointer; border-radius:8px;" onclick='buyBalanceAndUpdate(50, 12.5)' />
        <img src="img/Buy100Balance.png" style="width:100%; cursor:pointer; border-radius:8px;" onclick='buyBalanceAndUpdate(100, 25)' />
        <img src="img/Buy250Balance.png" style="width:100%; cursor:pointer; border-radius:8px;" onclick='buyBalanceAndUpdate(250, 50)' />
        <img src="img/Buy500Balance.png" style="width:100%; cursor:pointer; border-radius:8px;" onclick='buyBalanceAndUpdate(500, 100)' />
      </div>
    </div>

    <!-- Кнопка назад -->
    <div style="margin-top:25px; text-align:center;">
      <button onclick="mainMenu()">⬅️ Назад</button>
    </div>
  `;

  // Оновлення балансу після покупки
  window.buyBalanceAndUpdate = function(amount, cost) {
    const beforeNikus = nikus;
    const beforeBalance = balance;

    buyBalance(amount, cost);

    if (nikus !== beforeNikus || balance !== beforeBalance) {
      const box = document.getElementById("balancesBox");
      if (box) box.innerHTML = getBalanceHTML();
    }
  };
  function getBalanceHTML() {
    return `
      <h3>💰 Ваші баланси</h3>
      <p><b>Нікуси:</b> ${nikus?.toFixed(2) || 0}</p>
      <p><b>XCoin:</b> ${xcoin?.toFixed(2) || 0}</p>
      <p><b>OPEX:</b> ${OPEX?.toFixed(2) || 0}</p>
      <p><b>Ігрові Нікуси:</b> ${balance?.toFixed(2) || 0}</p>
    `;
  }

  updatePrice?.();
  loadChartData?.();
}

const salePacks = [
  { id: "pack_arcade", name: "Пакет Аркадний", price: 252, low: 112 },     // 252/4=63, 112/4=28
  { id: "pack_winter", name: "Пакет Зимовий", price: 292, low: 132 },       // 292/4=73, 132/4=33
  { id: "pack_winter2", name: "Пакет Зимовий 2", price: 400, low: 180 },    // 400/4=100, 180/4=45
  { id: "pack_winter3", name: "Пакет Зимовий 3", price: 500, low: 225 },    // 500/4=125, 225/4=56
  { id: "pack_cd", name: "Пакет «Cat&Dog»", price: 600, low: 275 },        // 600/4=150, 275/4=69
  { id: "pack_cdprem", name: "Пакет «Cat&Dog» Преміум", price: 800, low: 360 },        // 800/4=200, 360/4=90
  { id: "pack_donate", name: "Донатний пакет", price: 20, low: 10 }         // 16/4=4
];

const SALE_KEY = "saleShopNikus";

function loadSale() { 
  try { 
    return JSON.parse(localStorage.getItem(SALE_KEY)); 
  } catch { 
    return null; 
  } 
}
function saveSale(obj) { 
  localStorage.setItem(SALE_KEY, JSON.stringify(obj)); 
}

function generateSaleShop() {
  const shuffled = [...salePacks].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 2).map(p => {
    const useNormal = Math.random() < 0.75;
    const price = (p.id === "pack_donate") ? 20 : Math.floor((useNormal ? p.price : p.low)/4);
    return {
      id: p.id,
      name: p.name,
      price: price,
      wasPrice: (p.id === "pack_donate") ? 25 : Math.floor(p.price/4),
      lowPrice: (p.id === "pack_donate") ? 10 : Math.floor(p.low/4),
      discountType: useNormal ? "recommended" : "big",
      img: `img/sales/${p.id}.png`
    };
  });

  const nextUpdate = Date.now() + 48*60*60*1000;
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
  if (!ms || ms <= 0) return "0 год 0 хв 0 сек";
  let s = Math.floor(ms / 1000), h = Math.floor(s / 3600); 
  s %= 3600; 
  let m = Math.floor(s / 60); 
  s %= 60;
  return `${h} год ${m} хв ${s} сек`;
}

function saleShopMenu() {
  const sale = getOrCreateSale();
  let html = `
    <div style="
      margin-top:-5px;
      padding:18px;
      border-radius:12px;
      background:rgba(0,0,0,0.45);
      color:#fff;
      max-width:860px;
      margin-left:auto;
      margin-right:auto;
      box-shadow:0 8px 30px rgba(0,0,0,0.6);
      text-align:center;
    ">
      <h2 style="margin:6px 0 8px 0; text-shadow:0 0 8px #ffdd66;">🔥 Акційний магазин</h2>
      <div style="opacity:0.85; margin-bottom:12px;">Оновлюється кожні <b>2 дні</b></div>
      <div style="display:flex; justify-content:center; gap:18px; flex-wrap:wrap;">
  `;

  sale.items.forEach(it => {
    const badge = (it.discountType==="big") 
      ? `<div style="position:absolute; top:8px; left:8px; background:#ff4c4c; color:#fff; padding:6px 8px; border-radius:8px; font-weight:700; font-size:12px;">SALE -55%</div>`
      : `<div style="position:absolute; top:8px; left:8px; background:#ffd166; color:#111; padding:6px 8px; border-radius:8px; font-weight:700; font-size:12px;">-15%</div>`;
    
    html += `
      <div style="position:relative; width:260px; border-radius:12px; padding:12px; background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)); box-shadow:0 6px 18px rgba(0,0,0,0.6);">
        ${badge}
        <img src="${it.img}" alt="${it.name}" style="width:220px; height:120px; object-fit:contain; border-radius:8px; display:block; margin:0 auto 10px auto;">
        <div style="font-weight:800; color:#ffeaa7; font-size:16px;">${it.name}</div>
        <div style="margin-top:6px; font-size:20px; font-weight:900; color:#ffdd57;">${it.price} 💰</div>
        <div style="margin-top:6px; font-size:12px; color:rgba(255,255,255,0.75);">
          <span style="text-decoration:line-through; opacity:0.6;">${it.wasPrice} 💰</span>
          &nbsp; <span style="opacity:0.9;">(${it.discountType==='big'?'Велика знижка':'Рекомендована ціна'})</span>
        </div>
        <button onclick="buySalePack('${it.id}', ${it.price})" style="
          margin-top:10px;
          width:100%;
          padding:10px 0;
          border-radius:8px;
          border:none;
          cursor:pointer;
          font-weight:800;
          background:linear-gradient(90deg,#ff9f00,#ffd24d);
          color:#221;
        ">Купити за ${it.price} 💰</button>
      </div>
    `;
  });

  // WATER
  html += `
    <div style="position:relative; width:260px; border-radius:12px; padding:12px; background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)); box-shadow:0 6px 18px rgba(0,0,0,0.6);">
      <div style="position:absolute; top:8px; left:8px; background:#66c2ff; color:#111; padding:6px 8px; border-radius:8px; font-weight:700; font-size:12px;">Ресурс</div>
      <img src="img/sales/water.png" style="width:220px; height:120px; object-fit:contain; border-radius:8px; display:block; margin:0 auto 10px auto;">
      <div style="font-weight:800; color:#aeeaff; font-size:16px;">Вода (WATER)</div>
      <div style="margin-top:6px; font-size:20px; font-weight:900; color:#4db2ff;">5 💰</div>
      <button onclick="buySalePack('buy_water', 5)" style="
        margin-top:10px;
        width:100%;
        padding:10px 0;
        border-radius:8px;
        border:none;
        cursor:pointer;
        font-weight:800;
        background:linear-gradient(90deg,#4dabff,#7fd0ff);
        color:#000;
      ">Купити 1 WATER</button>
    </div>
  `;

  // BPW
  html += `
    <div style="position:relative; width:260px; border-radius:12px; padding:12px; background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)); box-shadow:0 6px 18px rgba(0,0,0,0.6);">
      <div style="position:absolute; top:8px; left:8px; background:#8aff66; color:#111; padding:6px 8px; border-radius:8px; font-weight:700; font-size:12px;">Ресурс</div>
      <img src="img/sales/bpw.png" style="width:220px; height:120px; object-fit:contain; border-radius:8px; display:block; margin:0 auto 10px auto;">
      <div style="font-weight:800; color:#c8ffae; font-size:16px;">1000 BP</div>
      <div style="margin-top:6px; font-size:20px; font-weight:900; color:#a6ff6a;">15 💰</div>
      <button onclick="buySalePack('buy_bpcd', 15)" style="
        margin-top:10px;
        width:100%;
        padding:10px 0;
        border-radius:8px;
        border:none;
        cursor:pointer;
        font-weight:800;
        background:linear-gradient(90deg,#8cff66,#c7ff9d);
        color:#000;
      ">Купити 1000 BP</button>
    </div>
  `;

// PREMIUM PASS
html += `
<div style="position:relative; width:260px; border-radius:12px; padding:12px; 
            background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)); 
            box-shadow:0 6px 18px rgba(0,0,0,0.6);">
  <div style="position:absolute; top:8px; left:8px; background:#ff66ff; color:#fff; 
              padding:6px 8px; border-radius:8px; font-weight:700; font-size:12px;">
    НОВИНКА
  </div>
  <img src="img/sales/premium_pass.png" 
       style="width:220px; height:120px; object-fit:contain; border-radius:8px; display:block; margin:0 auto 10px auto;">
  <div style="font-weight:800; color:#ff99ff; font-size:16px;">Premium Pass</div>
  <div style="margin-top:6px; font-size:20px; font-weight:900; color:#ff66ff;">250 💰</div>
  <button onclick="buySalePack('buy_premium', 250)" style="
    margin-top:10px;
    width:100%;
    padding:10px 0;
    border-radius:8px;
    border:none;
    cursor:pointer;
    font-weight:800;
    background:linear-gradient(90deg,#ff66ff,#ff99ff);
    color:#111;
  ">Купити Premium Pass</button>
</div>
`;

  html += `
      </div>
      <div style="margin-top:16px; display:flex; justify-content:center; gap:12px; align-items:center; flex-wrap:wrap;">
        <div style="padding:8px 12px; background:rgba(255,255,255,0.03); border-radius:8px;">
          Оновлення через: <span id="sale-timer" style="font-weight:800;">
            ${sale.nextUpdate ? formatRemaining(sale.nextUpdate - Date.now()) : "0 год 0 хв 0 сек"}
          </span>
        </div>
        <button onclick="mainMenu()" style="
          padding:8px 14px;
          border-radius:8px;
          border:none;
          cursor:pointer;
          background:rgba(200,200,200,0.12);
          color:#fff;
          font-weight:700;
        ">⬅️ Назад</button>
      </div>
    </div>
  `;

  document.getElementById("app").innerHTML = html;
  startSaleTimer();
}

// ===== Таймер =====
let _saleTimerHandle = null;
function startSaleTimer() {
  if (_saleTimerHandle) clearInterval(_saleTimerHandle);
  let sale = loadSale();
  if (!sale || !sale.nextUpdate) sale = generateSaleShop();

  function tick() {
    const left = sale.nextUpdate - Date.now();
    const el = document.getElementById("sale-timer");
    if (!el) { clearInterval(_saleTimerHandle); _saleTimerHandle = null; return; }
    if (left <= 0) { 
      sale = generateSaleShop(); 
      saleShopMenu(); 
      return; 
    }
    el.innerText = formatRemaining(left);
  }
  tick();
  _saleTimerHandle = setInterval(tick, 1000);
}

function buySalePack(id, price) {
  if (typeof nikus === "undefined") { 
    alert("Помилка: змінна nikus не знайдена."); 
    return; 
  }
  if (nikus < price) { 
    alert("Недостатньо Нікусів!"); 
    return; 
  }

  nikus -= price;

  switch(id){
    case "pack_arcade": 
      addCase("arcase", 5); 
      addKey("arcase", 5); 
      break;
    case "pack_winter": 
      addCase("wint25box", 5); 
      addCase("wint25", 4); 
      addCase("wint25gift", 1); 
      break;
    case "pack_winter2": 
      addCase("wint25", 5); 
      addCase("wint25gift", 4); 
      addCase("kolek2", 1); 
      break;
    case "pack_winter3": 
      addCase("wint25gift", 5); 
      addCase("kolek2", 5); 
      break;
    case "pack_cd": 
      addCase("catcollection", 3); 
      addCase("dogcollection", 2); 
      break;
    case "pack_cdprem": 

  addCase("catcollection", 5); 
  addCase("dogcollection", 5); 
      break;
    case "pack_donate": 
      balance += 100; 
      break;
     case "buy_premium":
      const btn = document.getElementById("premiumBtn1catdog");
      if(btn){
          btn.disabled = false;
          btn.title = "";
      }
      localStorage.setItem("premiumBtn1catdog", "1");
      alert("🎉 Кнопка Premium Pass розблокована!");
      break;   
    case "buy_water":
      if (typeof water !== "number") water = 0;
      water += 1;
      break;
    case "buy_bpcd":
      if (typeof BPCD !== "number") BPCD = 0;
      addBPCD(1000);
      break;
  }

  if (typeof saveData === "function") saveData();
  alert("Покупка успішна!");
  saleShopMenu();
}

// ===== Додати багато предметів =====
function addItemBulk(type,count){
  if(typeof inventory==="undefined") inventory=[];
  for(let i=0;i<count;i++) inventory.push({type:type,id:`${type}_${Date.now()}_${Math.random().toString(36).slice(2,7)}`});
  localStorage.setItem("inventory",JSON.stringify(inventory));
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
  {name:"Навряд чи", img:"ptax4.png", rarity:"Звичайна", collection:"Mid-season"}
];

const collectionRespect = {
  "Harvest": 0.8,
  "NASINNA1": 0.8,        // підколекція 1
  "NASINNA2": 0.8,         // підколекція 2
  "Autumn25": 0.8,
  "FallAlternative25": 0.75,
  "Halloween25": 0.7,
  "Winter Dreams": 0.6,
  "Winter25": 0.45,
  "Harvest25": 0.8,
  "CatCollection": 0.5,
  "DogCollection": 0.5,
  "Mid-season": 0.5,
  "WINTERDREAMS": 0.6
};

function getItemPrice(item) {
  const basePrice = {
    "Звичайна": 5,
    "Виняткова": 8,
    "Епічна": 15,
    "Секретна": 100,
    "Спеціальна": 500
  };

  let price = basePrice[item.rarity] || 5;

  // Множник якості
  const qualityMultiplier = {
    "Прямо з цеху": 1.2,
    "Після консервації": 1.1,
    "Після уроку": 1.0,
    "Зношена": 0.8
  }[item.quality] || 1.0;

  // Преміум множник
  const premiumMultiplier = item.premium ? 2 : 1;

  // Respect множник
  const respect = collectionRespect[item.collection] || 0.5;
  const respectMultiplier = respect / 0.5; // базова 0.5 = 1.0х

  price = Math.ceil(price * qualityMultiplier * premiumMultiplier * respectMultiplier);

  return price;
}

/* =========================
   МНОЖНИК ЯКОСТІ
========================= */
function getQualityMultiplier(quality){
  switch(quality){
    case "Прямо з цеху": return 1.2;
    case "Після консервації": return 1.1;
    case "Після уроку": return 1.0;
    case "Зношена": return 0.8;
    default: return 1;
  }
}

/* =========================
   МАРКЕТ
========================= */
function openMarket(){
  const app = document.getElementById("app");
  const collections = [...new Set(allItems.map(i=>i.collection))];

  app.innerHTML = `
    <h2 style="text-align:center;margin-bottom:15px;">Маркет</h2>
    <div id="market-tabs" style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-bottom:20px;"></div>
    <div id="market-items" style="display:flex; flex-wrap:wrap; gap:15px; justify-content:center;"></div>
    <div style="text-align:center;margin-top:20px;">
      <button onclick="mainMenu()">⬅ Назад</button>
    </div>
    ${sellModalHTML()}
  `;

  const tabs = document.getElementById("market-tabs");
  collections.forEach(col=>{
    const btn = document.createElement("button");
    btn.textContent = col;
    btn.style.padding = "6px 12px";
    btn.style.cursor = "pointer";
    btn.onclick = ()=>showMarketCollection(col);
    tabs.appendChild(btn);
  });

  if(collections.length) showMarketCollection(collections[0]);
}

/* =========================
   ПОКАЗ КОЛЕКЦІЇ
========================= */
function showMarketCollection(collection){
  const wrap = document.getElementById("market-items");
  wrap.innerHTML = "";

  const items = allItems.filter(i => i.collection === collection);

  items.forEach(item => {
    const card = document.createElement("div");
    card.style = `
      width:150px;
      background:#fff;
      border-radius:10px;
      padding:10px;
      text-align:center;
      box-shadow:0 2px 8px rgba(0,0,0,.25);
    `;
    card.innerHTML = `
      <img src="img/${item.img}" style="max-width:100%;height:auto;">
      <div style="font-weight:bold;margin-top:5px;">${item.name}</div>
      <div style="font-size:13px;">${item.rarity}</div>
      <div style="margin:5px 0;">${getItemPrice(item)} нікусів</div>
      <button onclick="openSellModal('${item.name}')">Продати</button>
    `;
    wrap.appendChild(card);
  });
}

/* =========================
   СЕЛЛІВЕНТАР (МОДАЛКА)
========================= */
let sellTargetName = null;

function sellModalHTML(){
  return `
  <div id="sellModal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,.6); justify-content:center; align-items:center; z-index:999;">
    <div style="background:#fff; padding:20px; border-radius:12px; max-width:600px; width:90%;">
      <h3 style="text-align:center;">Селлівентар</h3>
      <div id="sellList" style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin-top:15px;"></div>
      <div style="text-align:center;margin-top:15px;">
        <button onclick="confirmSell()">Продати вибране</button>
        <button onclick="closeSellModal()">Закрити</button>
      </div>
    </div>
  </div>`;
}

function openSellModal(name){
  sellTargetName = name;

  const modal = document.getElementById("sellModal");
  const list = document.getElementById("sellList");
  list.innerHTML = "";

  const inv = JSON.parse(localStorage.getItem(currentUser+"_inventory")||"[]");
  const items = inv.filter(i => i.name === name);

  if(items.length === 0){
    list.innerHTML = "<p>У тебе немає цього предмета</p>";
  }

  items.forEach((item, idx) => {
    // ✅ беремо тільки колекцію з allItems
    const baseItem = allItems.find(i => i.name === item.name) || {};
    const collection = baseItem.collection || "";
    const rarity = baseItem.rarity || item.rarity || "Звичайна";

    // Створюємо обʼєкт для getItemPrice
    const priceItem = {
      ...item,        // quality, premium
      collection,
      rarity
    };

    const price = getItemPrice(priceItem);

    const el = document.createElement("div");
    el.style = `width:130px; border:1px solid #ccc; border-radius:8px; padding:8px; text-align:center; margin-bottom:5px;`;

    el.innerHTML = `
      <input type="checkbox" data-idx="${idx}" style="margin-bottom:5px;">
      <img src="img/${item.img}" style="max-width:100%;height:auto;">
      <div style="font-size:13px;">${rarity}</div>
      <div style="font-size:12px;">Якість: ${item.quality || "Немає"}</div>
      <div style="font-size:12px;">${item.premium ? "⭐ Преміум" : ""}</div>
      <div>Ціна: ${price} нікусів</div>
    `;
    list.appendChild(el);
  });

  modal.style.display = "flex";
}



/* =========================
   ПРОДАЖ
========================= */
function confirmSell(){
  const checks = [...document.querySelectorAll("#sellList input:checked")];

  if(checks.length === 0){
    alert("Нічого не вибрано");
    return;
  }

  let total = 0;
  let sold = 0;

  let inv = JSON.parse(localStorage.getItem(currentUser+"_inventory")||"[]");

  const indexes = checks.map(c => +c.dataset.idx).sort((a,b) => b - a);

  indexes.forEach(idx => {
    const same = inv.filter(i => i.name === sellTargetName);
    const item = same[idx];
    if(!item) return;
    if(typeof blockedItems !== "undefined" && blockedItems.has(item.id)) return;

    // ✅ беремо колекцію та рідкість з allItems
    const baseItem = allItems.find(i => i.name === item.name) || {};
    const collection = baseItem.collection || "";
    const rarity = baseItem.rarity || item.rarity || "Звичайна";

    const priceItem = {
      ...item,
      collection,
      rarity
    };

    const price = getItemPrice(priceItem);
    total += price;

    const realIndex = inv.indexOf(item);
    if(realIndex !== -1){
      deleteItem(realIndex);
      sold++;
    }
  });

  if(typeof nikus !== "undefined") nikus += total;
  localStorage.setItem("nikus", nikus);

  let dosvid = parseInt(localStorage.getItem(currentUser+"_dosvid")||"0");
  dosvid += 4;
  localStorage.setItem(currentUser+"_dosvid", dosvid);

  alert(`Продано: ${sold} шт.\nОтримано: ${total} нікусів`);

  closeSellModal();
}

function closeSellModal(){
  document.getElementById("sellModal").style.display = "none";
}

window.onload = () => {
  loginScreen();
};
