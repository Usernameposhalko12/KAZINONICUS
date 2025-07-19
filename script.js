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
      } else if (item.type === "bill") {
        const premium = item.premium ? "🌟Преміум" : "";
        html += `
          <div style="border:1px solid #999; margin:10px; padding:10px; width:150px; text-align:center; cursor:pointer;">
            <img src="img/${item.img}" width="120" /><br />
            <b>${item.name}</b><br />
            <i>${item.rarity}</i><br />
            Якість: ${item.quality} ${premium}<br />
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
  html += `<button onclick="mainMenu()">Назад</button>`;
  document.getElementById("app").innerHTML = html;
}

function toggleBlockItem(idx) {
  const id = inventory[idx].id;
  if (blockedItems.has(id)) {
    blockedItems.delete(id);
  } else {
    blockedItems.add(id);
  }
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
  if (item.caseType === "autumn") {
    droppedItem = dropAutumnCase();
  } else if (item.caseType === "box") {
    droppedItem = dropBoxCase();
  } else if (item.caseType === "gift") {
    droppedItem = dropGiftCase();
  }
  if (droppedItem) {
    inventory.splice(idx, 1);
    inventory.push(droppedItem);
    saveData();
    alert(`Вам випало: ${droppedItem.name}`);
    showInventory();
  }
}

function dropAutumnCase() {
  const rand = Math.random() * 100;
  if (rand < 40) return getRandomFromArray(normalBillsAutumn);
  else if (rand < 75) return getRandomFromArray(rareBills);
  else if (rand < 89) return getRandomFromArray(epicBills);
  else return getRandomFromArray(secretBillsAutumn);
}

function dropBoxCase() {
  const rand = Math.random() * 100;
  if (rand < 51) return getRandomFromArray(normalBillsBox);
  else if (rand < 86) return getRandomFromArray(rareBills);
  else return getRandomFromArray(epicBills);
}

function dropGiftCase() {
  const rand = Math.random() * 100;
  if (rand < 1) return getRandomFromArray(secretBillsGift);
  else if (rand < 21) return getRandomFromArray(epicBills);
  else return getRandomFromArray(rareBillsGift);
}

function getRandomFromArray(arr) {
  const i = Math.floor(Math.random() * arr.length);
  const item = arr[i];
  return {
    type: "bill",
    name: item.name,
    img: item.img,
    rarity: item.rarity,
    quality: randomQuality(item.canBePremium),
    premium: false,
    id: generateId()
  };
}

function randomQuality(canBePremium) {
  const qualityRand = Math.random() * 100;
  if (qualityRand < 2 && canBePremium) return "Преміум";
  else if (qualityRand < 14) return "Прямо з цеху";
  else if (qualityRand < 39) return "Після консервації";
  else if (qualityRand < 79) return "Після уроку";
  else return "Зношена";
}

function addPromoCode(code) {
  if (!currentUser) {
    alert("Спочатку увійдіть в акаунт");
    return;
  }
  const b64code = strToB64(code.trim().toUpperCase());
  if (!promoCodesBase64[b64code]) {
    alert("Невірний промокод");
    return;
  }
  if (promoCodesBase64[b64code].type === "once" && usedPromos.includes(b64code)) {
    alert("Цей промокод ви вже використали");
    return;
  }
  promoCodesBase64[b64code].reward();
  if (promoCodesBase64[b64code].type === "once") {
    usedPromos.push(b64code);
    saveData();
  }
  mainMenu();
}

function goToPromoMenu() {
  let html = `<h2>Введіть промо-код</h2>
    <input id="promoInput" style="width: 200px;" placeholder="Промо-код" />
    <button onclick="applyPromo()">Активувати</button><br>
    <button onclick="mainMenu()">Назад</button>`;
  document.getElementById("app").innerHTML = html;
}

function applyPromo() {
  const code = document.getElementById("promoInput").value;
  addPromoCode(code);
}

loginScreen();
