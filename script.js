const accounts = {
  "ARSEN123": "ARSENPDIDDY123",
  "MatviyVes": "TON618",
  "Timasueta": "SUETOLOG",
  "Tematiks": "Fdnfanatik",
  "Koyakolo": "GIGACHAD",
  "Aloharbitrahnik123": "ARBITRAJ3",
  "TESTAC": "TESTAC",
  "NAZARK": "NAZARKPASS",
  "usernameposhalko": "password123" // додавай сюди свої акаунти
};

let currentUser = null;
let balance = 0;
let inventory = [];
let blockedItems = new Set();

const cases = {
  box: {
    name: "Кейс Бокс",
    dropRates: { secret: 0, epic: 0.14, exceptional: 0.35, common: 0.51 },
    items: {
      secret: [],
      epic: [
        { name: "Волтер Вайт", img: "purple1.png" },
        { name: "Сігма", img: "purple2.png" }
      ],
      exceptional: [
        { name: "Сатана", img: "blue2.png" },
        { name: "Хамстер", img: "blue1.png" }
      ],
      common: [
        { name: "Пасхалочник", img: "green1.png" },
        { name: "Єнот", img: "green2.png" }
      ]
    }
  },
  osin25: {
    name: "Кейс Осінь25",
    dropRates: { secret: 0.01, epic: 0.14, exceptional: 0.35, common: 0.50 },
    items: {
      secret: [{ name: "Бомбордіро", img: "red1.png" }],
      epic: [
        { name: "Волтер Вайт", img: "purple1.png" },
        { name: "Сігма", img: "purple2.png" }
      ],
      exceptional: [
        { name: "Сатана", img: "blue2.png" },
        { name: "Хамстер", img: "blue1.png" }
      ],
      common: [
        { name: "Пасхалочник", img: "green1.png" },
        { name: "Єнот", img: "green2.png" }
      ]
    }
  },
  gift: {
    name: "Подарунковий кейс",
    dropRates: { secret: 0.01, epic: 0.20, exceptional: 0.79 },
    items: {
      secret: [
        { name: "Тралалеро", img: "red2.png" },
        { name: "Тунг-Сахур", img: "red3.png" }
      ],
      epic: [
        { name: "Волтер Вайт", img: "purple1.png" },
        { name: "Сігма", img: "purple2.png" }
      ],
      exceptional: [
        { name: "Сатана", img: "blue2.png" },
        { name: "Хамстер", img: "blue1.png" }
      ]
    }
  }
};

const promoCodes = {
  "UNGIFT1488": { type: "unlimited", reward: () => { addCase("gift"); alert("Отримано подарунковий кейс!"); } },
  "TklDVVMxMjM=": { type: "once", used: false, reward: () => { addBalance(250); alert("Отримано 250 нікусів!"); } },
  "TklLVVM0NTY=": { type: "once", used: false, reward: () => { addBalance(100); alert("Отримано 100 нікусів!"); } },
  "S0FWSUsxNTk=": { type: "once", used: false, reward: () => { addBalance(100); alert("Отримано 100 нікусів!"); } },
  "TklDVVMwMDE=": { type: "once", used: false, reward: () => { addBalance(100); alert("Отримано 100 нікусів!"); } },
  "TklDVVMwMDI=": { type: "once", used: false, reward: () => { addBalance(100); alert("Отримано 100 нікусів!"); } }
};

function login(username, password) {
  if (accounts[username] && accounts[username] === password) {
    currentUser = username;
    loadUserData();
    alert("Вхід успішний");
    renderAll();
  } else alert("Невірний логін або пароль");
}

function loadUserData() {
  const saved = localStorage.getItem("userData_" + currentUser);
  if (saved) {
    const data = JSON.parse(saved);
    balance = data.balance || 0;
    inventory = data.inventory || [];
    blockedItems = new Set(data.blockedItems || []);
  } else {
    balance = 0;
    inventory = [];
    blockedItems = new Set();
  }
}

function saveUserData() {
  if (!currentUser) return;
  const data = {
    balance,
    inventory,
    blockedItems: Array.from(blockedItems)
  };
  localStorage.setItem("userData_" + currentUser, JSON.stringify(data));
}

function addBalance(amount) {
  balance += amount;
  updateBalanceUI();
  saveUserData();
}

function updateBalanceUI() {
  const el = document.getElementById("balance");
  if (el) el.textContent = `Баланс: ${balance} нікусів`;
}

function addCase(type) {
  if (!cases[type]) return;
  inventory.push({ type: "case", caseType: type, locked: false });
  renderInventory();
  saveUserData();
}

function addItem(item) {
  inventory.push({ type: "item", ...item, locked: false });
  renderInventory();
  saveUserData();
}

function removeItem(index) {
  if (blockedItems.has(index)) return;
  inventory.splice(index, 1);
  renderInventory();
  saveUserData();
}

function toggleLock(index) {
  if (blockedItems.has(index)) blockedItems.delete(index);
  else blockedItems.add(index);
  renderInventory();
  saveUserData();
}

function openCase(index) {
  if (!inventory[index] || inventory[index].type !== "case") return;

  const c = cases[inventory[index].caseType];
  if (!c) return;

  const rand = Math.random();
  let cumulative = 0;
  let rarity = null;

  for (const r of ["secret", "epic", "exceptional", "common"]) {
    cumulative += c.dropRates[r] || 0;
    if (rand < cumulative) {
      rarity = r;
      break;
    }
  }
  if (!rarity) rarity = "common";

  const pool = c.items[rarity];
  if (!pool || pool.length === 0) {
    alert("Немає предметів для цієї рідкості");
    return;
  }
  const item = pool[Math.floor(Math.random() * pool.length)];

  removeItem(index);
  addItem({ name: item.name, img: item.img, rarity });
  alert(`Ви отримали: ${item.name}`);

  saveUserData();
}

function renderInventory() {
  const container = document.getElementById("inventory");
  if (!container) return;
  container.innerHTML = "";
  inventory.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "inventory-item";
    div.style.border = blockedItems.has(i) ? "3px solid gold" : "1px solid #555";
    div.style.padding = "10px";
    div.style.margin = "10px";
    div.style.display = "inline-block";
    div.style.textAlign = "center";
    div.style.width = "120px";

    if (item.type === "case") {
      div.innerHTML = `<strong>${cases[item.caseType].name}</strong><br>
        <button onclick="openCase(${i})">Відкрити</button><br>
        <button onclick="removeItem(${i})" ${blockedItems.has(i) ? 'disabled' : ''}>Видалити</button><br>
        <button onclick="toggleLock(${i})">${blockedItems.has(i) ? 'Розблокувати' : 'Блокувати'}</button>`;
    } else {
      div.innerHTML =Ось повний робочий скрипт із усіма акаунтами, логікою балансу, кейсів, предметів, промокодів, інвентарем, блокуванням і UI-меню. Просто встав його в `script.js` і він працюватиме (за умови що у HTML є контейнер з id="app" і потрібні картинки в папці img):

```js
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
  "BABULKA777": "KOT52"
};

function b64ToStr(b64) {
  return decodeURIComponent(escape(window.atob(b64)));
}
function strToB64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

const promoCodesBase64 = {
  "TklDVVMxMjM=": {type:"once", reward:()=>{addBalance(250); alert("Отримано 250 нікусів!");}},
  "TklLVVM0NTY=": {type:"once", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
  "S0FWSUsxNTk=": {type:"once", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
  "TklDVVMwMDE=": {type:"once", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
  "TklDVVMwMDI=": {type:"once", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
  "TklDVVMwMDM=": {type:"once", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
  "TklDVVMwMDQ=": {type:"once", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
  "TklDVVMwMDU=": {type:"once", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
  "TklDVVMwMDY=": {type:"once", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
  "TklDVVMwMDc=": {type:"once", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
  "Q0FTRTc4OQ==": {type:"once", reward:()=>{addCase("box"); alert("Отримано кейс Бокс!");}},
  "R0lGVDY1NA==": {type:"once", reward:()=>{addCase("gift"); alert("Отримано подарунковий кейс!");}},
  "Qk9YMzIx": {type:"unlimited", reward:()=>{addCase("box"); alert("Отримано кейс Бокс!");}},
  "TU9ORVk5ODc=": {type:"unlimited", reward:()=>{addBalance(1000); alert("Отримано 1000 нікусів!");}},
  "VU5HSUZUMTQ4OA==": {type:"unlimited", reward:()=>{addCase("gift"); alert("Отримано подарунковий кейс!");}}
};

let currentUser = null;
let balance = 0;
let inventory = [];
let usedPromos = [];
let blockedItems = new Set();

function addBalance(amount) {
  balance += amount;
  saveData();
}
function saveData() {
  if (currentUser) {
    localStorage.setItem(currentUser + "_balance", balance);
    localStorage.setItem(currentUser + "_inventory", JSON.stringify(inventory));
    localStorage.setItem(currentUser + "_usedPromos", JSON.stringify(usedPromos));
    localStorage.setItem(currentUser + "_blockedItems", JSON.stringify(Array.from(blockedItems)));
  }
}
function loadData() {
  if (currentUser) {
    balance = parseInt(localStorage.getItem(currentUser + "_balance")) || 0;
    inventory = JSON.parse(localStorage.getItem(currentUser + "_inventory")) || [];
    usedPromos = JSON.parse(localStorage.getItem(currentUser + "_usedPromos")) || [];
    blockedItems = new Set(JSON.parse(localStorage.getItem(currentUser + "_blockedItems")) || []);
  }
}

function loginScreen() {
  document.getElementById("app").innerHTML =
    `<h2>Вхід у акаунт</h2>
     <input id='login' placeholder='Логін'><br>
     <input id='password' placeholder='Пароль' type='password'><br>
     <button onclick='login()'>Увійти</button>`;
}
function login() {
  const loginVal = document.getElementById("login").value.trim();
  const passVal = document.getElementById("password").value;
  if (accounts[loginVal] === passVal) {
    currentUser = loginVal;
    loadData();
    mainMenu();
  } else alert("Невірний логін або пароль");
}
function logout() {
  saveData();
  currentUser = null;
  loginScreen();
}

function mainMenu() {
  saveData();
  let html = `<h2>Вітаю, ${currentUser}</h2>`;
  html += `<p>Баланс: ${balance} нікусів</p>`;
  html += `<div style="display:flex; flex-wrap:wrap; justify-content:center;">`;
  html += `
    <div style="margin: 10px;">
      <img src="img/case_autumn.png" width="150"><br>
      <button onclick='buyCase("autumn")'>Кейс Осінь25 (40)</button>
    </div>
    <div style="margin: 10px;">
      <img src="img/case_box.png" width="150"><br>
      <button onclick='buyCase("box")'>Бокс Осінь25 (20)</button>
    </div>
    <div style="margin: 10px;">
      <img src="img/case_gift.png" width="150"><br>
      <button disabled>Подарунковий кейс (Тільки через промо-код)</button><br>
      <small>Одноразовий промо-код: GIFT654</small><br>
      <small style="user-select:none; color:#331f00;">Багаторазовий промо-код (секретний): UNGIFT1488</small>
    </div>
  `;
  html += `</div><br>`;
  html += `<button onclick='goToPromoMenu()'>🎁 Відкрити меню промо-кодів</button><br>`;
  html += `<button onclick='showInventory()'>🎒 Інвентар (${inventory.length})</button><br>`;
  html += `<button onclick='logout()'>🚪 Вийти</button>`;
  document.getElementById("app").innerHTML = html;
}

function addCase(type) {
  if (inventory.length >= 100) {
    alert("Інвентар заповнений!");
    return;
  }
  inventory.push({ type: "case", caseType: type, id: generateId() });
  saveData();
}
function buyCase(type) {
  const price = type === "autumn" ? 40 : type === "box" ? 20 : 0;
  if (balance < price) {
    alert("Недостатньо нікусів!");
    return;
  }
  balance -= price;
  addCase(type);
  saveData();
  mainMenu();
}
function showInventory() {
  let html = `<h2>Інвентар</h2>`;
  if (inventory.length === 0) {
    html += `<p>Інвентар порожній.</p>`;
  } else {
    html += `<div style="display:flex; flex-wrap:wrap; justify-content:center;">`;
    inventory.forEach((item, idx) => {
      const isBlocked = blockedItems.has(item.id);
      if (item.type === "case") {
        html += `
          <div style="border:1px solid #999; margin:10px; padding:10px; width:150px; text-align:center;">
            <b>Кейс: ${getCaseName(item.caseType)}</b><br />
            <img src="img/case_${item.caseType}.png" width="120" /><br />
            <button onclick="openCase(${idx})" ${isBlocked ? "disabled" : ""}>Відкрити</button><br />
            <button onclick="toggleBlockItem(${idx}); event.stopPropagation();">
              ${isBlocked ? "Розблокувати" : "Заблокувати"}
            </button><br />
            <button onclick="deleteItem(${idx}); event.stopPropagation();" ${isBlocked ? "disabled" : ""} style="margin-top:5px;">Видалити</button>
          </div>
        `;
      } else {
        // Якщо інші типи предметів — тут можна додати
        html += `<div>Предмет: ${item.name || "???"} (Тип: ${item.type})</div>`;
      }
    });
    html += `</div>`;
  }
  html += `<button onclick="mainMenu()">Назад</button>`;
  document.getElementById("app").innerHTML = html;
}
function toggleBlockItem(idx) {
  const id = inventory[idx].id;
  if (blockedItems.has(id)) blockedItems.delete(id);
  else blockedItems.add(id);
  saveData();
  showInventory();
}
function deleteItem(idx) {
  if (!inventory[idx]) return;
  const id = inventory[idx].id;
  if (blockedItems.has(id)) {
    alert("Неможливо видалити заблокований предмет");
    return;
  }
  inventory.splice(idx, 1);
  saveData();
  showInventory();
}
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
function getCaseName(type) {
  if(type === "autumn") return "Осінь25";
  if(type === "box") return "Бокс";
  if(type === "gift") return "Подарунковий кейс";
  return "Невідомий кейс";
}
function openCase(idx) {
  if (!inventory[idx]) return;
  const item = inventory[idx];
  if (item.type !== "case") return;
  let droppedItem = null;
  if (item.caseType === "autumn") droppedItem = dropAutumnCase();
  else if (item.caseType === "box") droppedItem = dropBoxCase();
  else if (item.caseType === "gift") droppedItem = dropGiftCase();
  if (droppedItem) {
    inventory.splice(idx, 1);
    inventory.push(droppedItem);
    saveData();
    alert(`Вам випало: ${droppedItem.name}`);
    showInventory();
  }
}

const normalBillsAutumn = [
  {name:"Зелена купюра", img:"green1.png", rarity:"Звичайна", canBePremium:true},
  {name:"Голуба купюра", img:"blue1.png", rarity:"Виняткова", canBePremium:true},
  {name:"Фіолетова купюра", img:"purple1.png", rarity:"Епічна", canBePremium:true},
  {name:"Червона (секретна) купюра", img:"red1.png", rarity:"Секретна", canBePremium:false}
];

function dropByRates(rates) {
  const r = Math.random();
  let cumulative = 0;
  for (const [key, val] of Object.entries(rates)) {
    cumulative += val;
    if (r < cumulative) return key;
  }
  return "common";
}
function dropAutumnCase() {
  // Шанси
  const rates = { secret:0.01, epic:0.14, exceptional:0.35, common:0.50 };
  const rarity = dropByRates(rates);
  let pool = [];
  if(rarity === "secret") pool = [{name:"Бомбордіро",img:"red1.png",rarity:"Секретна"}];
  else if(rarity === "epic") pool = [
    {name:"Волтер Вайт",img:"purple1.png",rarity:"Епічна"},
    {name:"Сігма",img:"purple2.png",rarity:"Епічна"}
  ];
  else if(rarity === "exceptional") pool = [
    {name:"Сатана",img:"blue2.png",rarity:"Виняткова"},
    {name:"Хамстер",img:"blue1.png",rarity:"Виняткова"}
  ];
  else pool = [
    {name:"Пасхалочник",img:"green1.png",rarity:"Звичайна"},
    {name:"Єнот",img:"green2.png",rarity:"Звичайна"}
  ];
  return {...pool[Math.floor(Math.random()*pool.length)], type:"item", id:generateId()};
}
function dropBoxCase() {
  const rates = { secret:0, epic:0.14, exceptional:0.35, common:0.51 };
  const rarity = dropByRates(rates);
  let pool = [];
  if(rarity === "epic") pool = [
    {name:"Волтер Вайт",img:"purple1.png",rarity:"Епічна"},
    {name:"Сігма",img:"purple2.png",rarity:"Епічна"}
  ];
  else if(rarity === "exceptional") pool = [
    {name:"Сатана",img:"blue2.png",rarity:"Виняткова"},
    {name:"Хамстер",img:"blue1.png",rarity:"Виняткова"}
  ];
  else pool = [
    {name:"Пасхалочник",img:"green1.png",rarity:"Звичайна"},
    {name:"Єнот",img:"green2.png",rarity:"Звичайна"}
  ];
  return {...pool[Math.floor(Math.random()*pool.length)], type:"item", id:generateId()};
}
function dropGiftCase() {
  const rates = { secret:0.01, epic:0.20, exceptional:0.79 };
  const rarity = dropByRates(rates);
  let pool = [];
  if(rarity === "secret") pool = [
    {name:"Тралалеро",img:"red2.png",rarity:"Секретна"},
    {name:"Тунг-Сахур",img:"red3.png",rarity:"Секретна"}
  ];
  else if(rarity === "epic") pool = [
    {name:"Волтер Вайт",img:"purple1.png",rarity:"Епічна"},
    {name:"Сігма",img:"purple2.png",rarity:"Епічна"}
  ];
  else pool = [
    {name:"Сатана",img:"blue2.png",rarity:"Виняткова"},
    {name:"Хамстер",img:"blue1.png",rarity:"Виняткова"}
  ];
  return {...pool[Math.floor(Math.random()*pool.length)], type:"item", id:generateId()};
}

function goToPromoMenu() {
  let html = `<h2>Введіть промокод</h2><input id="promoInput" placeholder="Промокод" style="width:200px;" />
  <button onclick="applyPromo()">Активувати</button><br><button onclick="mainMenu()">Назад</button>`;
  document.getElementById("app").innerHTML = html;
}
function applyPromo() {
  const codeRaw = document.getElementById("promoInput").value.trim();
  if (!codeRaw) return alert("Введіть промокод!");
  const code = strToB64(codeRaw);
  if (!promoCodesBase64[code]) return alert("Невірний промокод!");
  const promo = promoCodesBase64[code];
  if (promo.type === "once" && usedPromos.includes(code)) {
    return alert("Цей промокод уже використано");
  }
  promo.reward();
  if (promo.type === "once") usedPromos.push(code);
  saveData();
  mainMenu();
}

loginScreen();
