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
  if (!currentUser) return;
  localStorage.setItem(currentUser + "_balance", balance);
  localStorage.setItem(currentUser + "_inventory", JSON.stringify(inventory));
  localStorage.setItem(currentUser + "_usedPromos", JSON.stringify(usedPromos));
  localStorage.setItem(currentUser + "_blockedItems", JSON.stringify(Array.from(blockedItems)));
}

function loadData() {
  if (!currentUser) return;
  balance = parseInt(localStorage.getItem(currentUser + "_balance")) || 0;
  inventory = JSON.parse(localStorage.getItem(currentUser + "_inventory")) || [];
  usedPromos = JSON.parse(localStorage.getItem(currentUser + "_usedPromos")) || [];
  blockedItems = new Set(JSON.parse(localStorage.getItem(currentUser + "_blockedItems")) || []);
}

function loginScreen() {
  document.getElementById("app").innerHTML = `
    <h2>Вхід у акаунт</h2>
    <input id='login' placeholder='Логін' /><br/>
    <input id='password' placeholder='Пароль' type='password' /><br/>
    <button onclick='login()'>Увійти</button>
  `;
}

function login() {
  const login = document.getElementById("login").value.trim();
  const pass = document.getElementById("password").value;
  if (accounts[login] === pass) {
    currentUser = login;
    loadData();
    mainMenu();
  } else {
    alert("Невірний логін або пароль");
  }
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
  html += `
    <div style="display:flex; justify-content:center; flex-wrap:wrap;">
      <div style="margin:10px; text-align:center;">
        <img src="img/case_autumn.png" width="150" /><br/>
        <button onclick="buyCase('autumn25')">Кейс Осінь25 (40)</button>
      </div>
      <div style="margin:10px; text-align:center;">
        <img src="img/case_box.png" width="150" /><br/>
        <button onclick="buyCase('box')">Бокс Осінь25 (20)</button>
      </div>
      <div style="margin:10px; text-align:center;">
        <img src="img/case_gift.png" width="150" /><br/>
        <button disabled>Подарунковий кейс (Тільки через промо-код)</button><br/>
        <small>Одноразовий промо-код: GIFT654</small><br/>
        <small style="user-select:none; color:#331f00;">Багаторазовий промо-код (секретний): UNGIFT1488</small>
      </div>
    </div>
    <br/>
    <button onclick="goToPromoMenu()">🎁 Відкрити меню промо-кодів</button><br/>
    <button onclick="showInventory()">🎒 Інвентар (${inventory.length})</button><br/>
    <button onclick="logout()">🚪 Вийти</button>
  `;
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
  const price = type === "autumn25" ? 40 : type === "box" ? 20 : 0;
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
      } else if (item.type === "bill") {
        const premium = item.premium ? "🌟Преміум" : "";
        html += `
          <div style="border:1px solid #999; margin:10px; padding:10px; width:150px; text-align:center;">
            <img src="img/${item.img}" width="120" /><br />
            <b>${item.name}</b><br />
            <small>${item.rarity} ${premium}</small><br />
            <button onclick="toggleBlockItem(${idx}); event.stopPropagation();">
              ${isBlocked ? "Розблокувати" : "Заблокувати"}
            </button><br />
            <button onclick="deleteItem(${idx}); event.stopPropagation();" ${isBlocked ? "disabled" : ""} style="margin-top:5px;">Видалити</button>
          </div>
        `;
      }
    });
    html += `</div>`;
  }
  html += `<button onclick="mainMenu()">⬅ Назад</button>`;
  document.getElementById("app").innerHTML = html;
}

function toggleBlockItem(idx) {
  const item = inventory[idx];
  if (!item) return;
  if (blockedItems.has(item.id)) {
    blockedItems.delete(item.id);
  } else {
    blockedItems.add(item.id);
  }
  saveData();
  showInventory();
}

function deleteItem(idx) {
  const item = inventory[idx];
  if (!item) return;
  if (blockedItems.has(item.id)) {
    alert("Цей предмет заблоковано і його не можна видалити.");
    return;
  }
  inventory.splice(idx, 1);
  saveData();
  showInventory();
}

function openCase(idx) {
  const item = inventory[idx];
  if (!item || item.type !== "case") return;
  if (blockedItems.has(item.id)) {
    alert("Цей кейс заблоковано і його не можна відкрити.");
    return;
  }
  let reward = null;
  if (item.caseType === "autumn25") {
    reward = getRewardFromAutumnCase();
  } else if (item.caseType === "box") {
    reward = getRewardFromBoxCase();
  } else if (item.caseType === "gift") {
    reward = getRewardFromGiftCase();
  } else {
    alert("Невідомий тип кейсу");
    return;
  }
  if (!reward) {
    alert("Відкриття кейсу не вдалося.");
    return;
  }
  inventory.splice(idx,1);
  inventory.push(reward);
  saveData();
  alert(`Ви отримали: ${reward.name} (${reward.rarity})`);
  showInventory();
}

function getRewardFromAutumnCase() {
  const rand = Math.random() * 100;
  if (rand < 40) {
    return getRandomItemByRarity("common", ["autumn25", "box"]);
  } else if (rand < 75) {
    return getRandomItemByRarity("rare", ["autumn25", "box"]);
  } else if (rand < 95) {
    return getRandomItemByRarity("epic", ["autumn25", "box"]);
  } else {
    return getRandomSecretItem(["autumn25"]);
  }
}

function getRewardFromBoxCase() {
  const rand = Math.random() * 100;
  if (rand < 51) {
    return getRandomItemByRarity("common", ["box", "autumn25"]);
  } else if (rand < 86) {
    return getRandomItemByRarity("rare", ["box", "autumn25"]);
  } else {
    return getRandomItemByRarity("epic", ["box", "autumn25"]);
  }
}

function getRewardFromGiftCase() {
  const rand = Math.random() * 100;
  if (rand < 1) {
    return getRandomSecretItem(["gift"]);
  } else if (rand < 21) {
    return getRandomItemByRarity("epic", ["gift"]);
  } else {
    return getRandomItemByRarity("rare", ["gift"]);
  }
}

function getRandomItemByRarity(rarity, allowedCases) {
  const candidates = Object.entries(itemsData)
    .filter(([key, item]) => item.rarity === rarity && allowedCases.some(c => item.cases.includes(c)))
    .map(([key, item]) => ({
      name: item.name,
      rarity: rarity,
      img: item.img,
      premium: Math.random() < 0.02,
      id: generateId(),
      type: "bill"
    }));
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function getRandomSecretItem(allowedCases) {
  const candidates = Object.entries(itemsData)
    .filter(([key, item]) => item.rarity === "secret" && allowedCases.some(c => item.cases.includes(c)))
    .map(([key, item]) => ({
      name: item.name,
      rarity: "secret",
      img: item.img,
      premium: false,
      id: generateId(),
      type: "bill"
    }));
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function generateId() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

function goToPromoMenu() {
  let html = `<h2>Промо-коди</h2>
    <input id="promoInput" placeholder="Введіть промо-код" />
    <button onclick="applyPromo()">Активувати</button>
    <br/><button onclick="mainMenu()">⬅ Назад</button>
    <p>Використано промо-кодів: ${usedPromos.length}</p>
  `;
  document.getElementById("app").innerHTML = html;
}

function applyPromo() {
  const input = document.getElementById("promoInput");
  if (!input) return;
  let codeRaw = input.value.trim();
  if (!codeRaw) return alert("Введіть промо-код");

  const codeBase64 = btoa(codeRaw);
  if (!(codeBase64 in promoCodesBase64)) return alert("Промо-код не знайдено");

  const promo = promoCodesBase64[codeBase64];
  if (promo.type === "once" && usedPromos.includes(codeBase64)) {
    return alert("Цей промо-код вже використано");
  }
  promo.reward();
  if (promo.type === "once") {
    usedPromos.push(codeBase64);
    saveData();
  }
  mainMenu();
}

const itemsData = {
  green1: { name: "Пасхалочнік", rarity: "common", img: "green1.png", cases: ["autumn25", "box"] },
  green2: { name: "Єнот", rarity: "common", img: "green2.png", cases: ["autumn25", "box"] },
  blue1: { name: "Хамстер", rarity: "rare", img: "blue1.png", cases: ["autumn25", "box"] },
  blue2: { name: "Сатана", rarity: "rare", img: "blue2.png", cases: ["autumn25", "box"] },
  purple1: { name: "Волтер Вайт", rarity: "epic", img: "purple1.png", cases: ["autumn25", "box", "gift"] },
  purple2: { name: "Сігма", rarity: "epic", img: "purple2.png", cases: ["autumn25", "box", "gift"] },
  red1: { name: "Бомбордіро", rarity: "secret", img: "red1.png", cases: ["autumn25"] },
  red2: { name: "Тралалеро", rarity: "secret", img: "red2.png", cases: ["gift"] },
  red3: { name: "Тунг-Сахур", rarity: "secret", img: "red3.png", cases: ["gift"] }
};

function getCaseName(type) {
  switch(type) {
    case "autumn25": return "Осінь25";
    case "box": return "Бокс Осінь25";
    case "gift": return "Подарунковий кейс";
    default: return "Невідомий кейс";
  }
}

window.onload = function() {
  loginScreen();
};
