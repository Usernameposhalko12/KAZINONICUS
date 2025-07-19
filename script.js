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
let cart = [];

function b64ToStr(b64) {
  return decodeURIComponent(escape(window.atob(b64)));
}

function strToB64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function saveData() {
  if (!currentUser) return;
  localStorage.setItem(currentUser + "_balance", balance.toString());
  localStorage.setItem(currentUser + "_inventory", JSON.stringify(inventory));
  localStorage.setItem(currentUser + "_usedPromos", JSON.stringify(usedPromos));
  localStorage.setItem(currentUser + "_blockedItems", JSON.stringify(Array.from(blockedItems)));
  localStorage.setItem(currentUser + "_cart", JSON.stringify(cart));
}

function loadData() {
  if (!currentUser) return;
  balance = parseInt(localStorage.getItem(currentUser + "_balance")) || 0;
  inventory = JSON.parse(localStorage.getItem(currentUser + "_inventory")) || [];
  usedPromos = JSON.parse(localStorage.getItem(currentUser + "_usedPromos")) || [];
  blockedItems = new Set(JSON.parse(localStorage.getItem(currentUser + "_blockedItems")) || []);
  cart = JSON.parse(localStorage.getItem(currentUser + "_cart")) || [];
}

function loginScreen() {
  document.getElementById("app").innerHTML = `
    <h2>Вхід у акаунт</h2>
    <input id='login' placeholder='Логін' autocomplete='username'><br>
    <input id='password' placeholder='Пароль' type='password' autocomplete='current-password'><br>
    <button onclick='login()'>Увійти</button>
  `;
}

function login() {
  const loginInput = document.getElementById("login").value.trim();
  const passInput = document.getElementById("password").value;
  if (accounts[loginInput] && accounts[loginInput] === passInput) {
    currentUser = loginInput;
    loadData();
    mainMenu();
  } else {
    alert("Невірний логін або пароль");
  }
}

function logout() {
  saveData();
  currentUser = null;
  balance = 0;
  inventory = [];
  usedPromos = [];
  blockedItems.clear();
  cart = [];
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
      <button onclick='buyCase("autumn")'>Кейс Осінь25 (40 нікусів)</button>
    </div>
    <div style="margin: 10px;">
      <img src="img/case_box.png" width="150"><br>
      <button onclick='buyCase("box")'>Бокс Осінь25 (20 нікусів)</button>
    </div>
    <div style="margin: 10px;">
      <img src="img/case_gift.png" width="150"><br>
      <button disabled>Подарунковий кейс (тільки через промо-код)</button><br>
      <small>Одноразовий промо-код: GIFT654</small><br>
      <small style="user-select:none; color:#331f00;">Нескінченний промо-код: UNGIFT1488</small>
    </div>
  `;
  html += `</div><br>`;
  html += `<button onclick='goToPromoMenu()'>🎁 Відкрити меню промо-кодів</button><br>`;
  html += `<button onclick='showInventory()'>🎒 Інвентар (${inventory.length})</button><br>`;
  html += `<button onclick='showCart()'>🛒 Кошик (${cart.length})</button><br>`;
  html += `<button onclick='logout()'>🚪 Вийти</button>`;
  document.getElementById("app").innerHTML = html;
}

function addBalance(amount) {
  balance += amount;
  saveData();
}

function addCase(type) {
  if (inventory.length >= 100) {
    alert("Інвентар заповнений!");
    return false;
  }
  inventory.push({ type: "case", caseType: type, id: generateId() });
  saveData();
  return true;
}

function buyCase(type) {
  const price = type === "autumn" ? 40 : type === "box" ? 20 : 0;
  if (balance < price) {
    alert("Недостатньо нікусів!");
    return;
  }
  balance -= price;
  if(addCase(type)) {
    saveData();
    mainMenu();
  }
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
            <button onclick="addToCart(${idx}); event.stopPropagation();" ${isBlocked ? "disabled" : ""}>Додати в кошик</button><br />
            <button onclick="deleteItem(${idx}); event.stopPropagation();" style="margin-top:5px;">Видалити</button>
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
            <button onclick="addToCart(${idx}); event.stopPropagation();" ${isBlocked ? "disabled" : ""}>Додати в кошик</button><br />
            <button onclick="deleteItem(${idx}); event.stopPropagation();" style="margin-top:5px;">Видалити</button>
          </div>
        `;
      }
    });
    html += `</div>`;
  }
  html += `<button onclick="mainMenu()">⬅ Назад</button>`;
  document.getElementById("app").innerHTML = html;
}

function getCaseName(type) {
  if (type === "autumn") return "Осінь25";
  if (type === "box") return "Бокс";
  if (type === "gift") return "Подарунковий";
  return "Кейс";
}

function openCase(index) {
  if (!inventory[index]) return;
  if (blockedItems.has(inventory[index].id)) {
    alert("Цей предмет заблоковано.");
    return;
  }
  if (inventory[index].type !== "case") {
    alert("Це не кейс.");
    return;
  }
  const caseType = inventory[index].caseType;
  const droppedItem = generateDrop(caseType);
  inventory.splice(index, 1);
  inventory.push(droppedItem);
  saveData();
  alert(`Ви отримали: ${droppedItem.name}`);
  showInventory();
}

function generateDrop(caseType) {
  const rarities = ["звичайна", "виняткова", "епічна", "секретна"];
  const qualityChances = [
    { quality: "прямо з цеху", chance: 12.5 },
    { quality: "після консервації", chance: 25 },
    { quality: "після уроку", chance: 40 },
    { quality: "зношена", chance: 22.5 }
  ];
  let rarityRoll = Math.random() * 100;
  let rarity = "звичайна";

  if (caseType === "gift") {
    if (rarityRoll < 1) rarity = "секретна";
    else if (rarityRoll < 21) rarity = "епічна";
    else rarity = "виняткова";
  } else {
    if (rarityRoll < 50) rarity = "звичайна";
    else if (rarityRoll < 85) rarity = "виняткова";
    else if (rarityRoll < 99) rarity = "епічна";
    else rarity = "секретна";
  }

  let qualityRoll = Math.random() * 100;
  let quality = "після уроку";

  for (let i = 0; i < qualityChances.length; i++) {
    if (qualityRoll < qualityChances[i].chance) {
      quality = qualityChances[i].quality;
      break;
    }
    qualityRoll -= qualityChances[i].chance;
  }

  let premium = false;
  if (quality !== "зношена") {
    if (Math.random() < 0.02) {
      premium = true;
    }
  }

  const item = getRandomItemByRarityAndCase(rarity, caseType);

  return {
    type: "bill",
    rarity,
    quality,
    premium,
    img: item.img,
    name: item.name,
    id: generateId()
  };
}

function getRandomItemByRarityAndCase(rarity, caseType) {
  const items = {
    звичайна: [
      { name: "Голуба купюра", img: "blue1.png" },
      { name: "Голуба купюра", img: "blue2.png" }
    ],
    виняткова: [
      { name: "Фіолетова купюра", img: "purple1.png" },
      { name: "Фіолетова купюра", img: "purple2.png" }
    ],
    епічна: [
      { name: "Червона купюра", img: "red1.png" },
      { name: "Червона купюра", img: "red2.png" }
    ],
    секретна: []
  };

  if (caseType === "gift" && rarity === "секретна") {
    items["секретна"] = [
      { name: "Бомбордіро", img: "red1.png" },
      { name: "Тралалеро", img: "red2.png" },
      { name: "Тунг-Сахур", img: "red3.png" }
    ];
  } else if (rarity === "секретна") {
    // Звичайний кейс без секретних
    items["секретна"] = [
      { name: "Червона купюра", img: "red1.png" },
      { name: "Червона купюра", img: "red2.png" }
    ];
  }

  const pool = items[rarity] || items["звичайна"];
  return pool[Math.floor(Math.random() * pool.length)];
}

function toggleBlockItem(index) {
  if (!inventory[index]) return;
  const id = inventory[index].id;
  if (blockedItems.has(id)) {
    blockedItems.delete(id);
  } else {
    blockedItems.add(id);
  }
  saveData();
  showInventory();
}

function deleteItem(index) {
  if (!inventory[index]) return;
  const item = inventory.splice(index, 1)[0];
  cart.push(item);
  saveData();
  showInventory();
}

function showCart() {
  let html = `<h2>Кошик</h2>`;
  if (cart.length === 0) {
    html += `<p>Кошик порожній.</p>`;
  } else {
    html += `<div style="display:flex; flex-wrap:wrap; justify-content:center;">`;
    cart.forEach((item, idx) => {
      if (item.type === "case") {
        html += `
          <div style="border:1px solid #999; margin:10px; padding:10px; width:150px; text-align:center;">
            <b>Кейс: ${getCaseName(item.caseType)}</b><br />
            <img src="img/case_${item.caseType}.png" width="120" /><br />
          </div>
        `;
      } else if (item.type === "bill") {
        const premium = item.premium ? "🌟Преміум" : "";
        html += `
          <div style="border:1px solid #999; margin:10px; padding:10px; width:150px; text-align:center;">
            <img src="img/${item.img}" width="120" /><br />
            <b>${item.name}</b><br />
            <i>${item.rarity}</i><br />
            Якість: ${item.quality} ${premium}<br />
          </div>
        `;
      }
    });
    html += `</div>`;
  }
  html += `<button onclick="mainMenu()">⬅ Назад</button>`;
  document.getElementById("app").innerHTML = html;
}

function goToPromoMenu() {
  let html = `<h2>Промо-коди</h2>`;
  html += `
    <input id="promoInput" placeholder="Введіть промо-код" />
    <button onclick="applyPromo()">Активувати</button><br><br>
    <button onclick="mainMenu()">⬅ Назад</button>
  `;
  document.getElementById("app").innerHTML = html;
}

function applyPromo() {
  const input = document.getElementById("promoInput").value.trim();
  if (!input) {
    alert("Введіть промо-код");
    return;
  }
  const b64 = strToB64(input.toUpperCase());
  if (!(b64 in promoCodesBase64)) {
    alert("Промо-код не знайдено або невірний");
    return;
  }
  const promo = promoCodesBase64[b64];
  if (promo.type === "once" && usedPromos.includes(b64)) {
    alert("Промо-код уже використаний");
    return;
  }
  promo.reward();
  if (promo.type === "once") usedPromos.push(b64);
  saveData();
  goToPromoMenu();
}

window.onload = () => {
  loginScreen();
};
