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
  "UkVBTEdJUlQ=": {type:"unlimited", reward:()=>{addCase("gift"); alert("Отримано подарунковий кейс!");}}
};

function b64ToStr(b64) {
  return decodeURIComponent(escape(window.atob(b64)));
}

function strToB64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

let currentUser = null;
let balance = 0;
let inventory = [];
let usedPromos = [];
let blockedItems = new Set();
let cart = [];

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
    localStorage.setItem(currentUser + "_cart", JSON.stringify(cart));
  }
}

function loadData() {
  if (currentUser) {
    balance = parseInt(localStorage.getItem(currentUser + "_balance")) || 0;
    inventory = JSON.parse(localStorage.getItem(currentUser + "_inventory")) || [];
    usedPromos = JSON.parse(localStorage.getItem(currentUser + "_usedPromos")) || [];
    blockedItems = new Set(JSON.parse(localStorage.getItem(currentUser + "_blockedItems")) || []);
    cart = JSON.parse(localStorage.getItem(currentUser + "_cart")) || [];
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
      <small style="user-select:none; color:#331f00;">Багаторазовий промо-код (секретний): MONEY987</small>
    </div>
  `;
  html += `</div><br>`;
  html += `<button onclick='goToPromoMenu()'>🎁 Відкрити меню промо-кодів</button><br>`;
  html += `<button onclick='showInventory()'>🎒 Інвентар (${inventory.length})</button><br>`;
  html += `<button onclick='showCart()'>🛒 Кошик (${cart.length})</button><br>`;
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
  html += `<br /><button onclick="mainMenu()">← Назад</button>`;
  document.getElementById("app").innerHTML = html;
}

function toggleBlockItem(index) {
  if (index < 0 || index >= inventory.length) return;
  const item = inventory[index];
  if (blockedItems.has(item.id)) {
    blockedItems.delete(item.id);
  } else {
    blockedItems.add(item.id);
  }
  saveData();
  showInventory();
}

function addToCart(index) {
  if (index < 0 || index >= inventory.length) return;
  const item = inventory[index];
  if (blockedItems.has(item.id)) {
    alert("Цей предмет заблоковано і не може бути доданий до кошика.");
    return;
  }
  if (cart.length >= 50) {
    alert("Кошик заповнений!");
    return;
  }
  cart.push(item);
  inventory.splice(index, 1);
  saveData();
  showInventory();
  showCart();
}

function showCart() {
  let html = `<h2>Кошик</h2>`;
  if (cart.length === 0) {
    html += `<p>Кошик порожній.</p>`;
  } else {
    html += `<div style="display:flex; flex-wrap:wrap; justify-content:center;">`;
    cart.forEach((item, idx) => {
      const isBlocked = blockedItems.has(item.id);
      if (item.type === "case") {
        html += `
          <div style="border:1px solid #999; margin:10px; padding:10px; width:150px; text-align:center;">
            <b>Кейс: ${getCaseName(item.caseType)}</b><br />
            <img src="img/case_${item.caseType}.png" width="120" /><br />
            <button onclick="restoreFromCart(${idx})">Повернути</button><br />
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
            <button onclick="restoreFromCart(${idx})">Повернути</button><br />
          </div>
        `;
      }
    });
    html += `</div>`;
  }
  html += `<br /><button onclick="mainMenu()">← Назад</button>`;
  document.getElementById("app").innerHTML = html;
}

function restoreFromCart(index) {
  if (index < 0 || index >= cart.length) return;
  const item = cart[index];
  if (inventory.length >= 100) {
    alert("Інвентар заповнений!");
    return;
  }
  inventory.push(item);
  cart.splice(index, 1);
  saveData();
  showCart();
  showInventory();
}

function deleteItem(index) {
  if (index < 0 || index >= inventory.length) return;
  if (confirm("Видалити цей предмет?")) {
    inventory.splice(index, 1);
    saveData();
    showInventory();
  }
}

function getCaseName(type) {
  if (type === "autumn") return "Осінь25";
  if (type === "box") return "Бокс";
  if (type === "gift") return "Подарунок";
  return "Кейс";
}

function getDropPool(type) {
  if (type === "autumn") return [
    { name: "Пасхалочнік", rarity: "Звичайна", img: "green1.png", chance: 25 },
    { name: "Єнот", rarity: "Звичайна", img: "green2.png", chance: 25 },
    { name: "Хамстер", rarity: "Виняткова", img: "blue1.png", chance: 17.5 },
    { name: "Сатана", rarity: "Виняткова", img: "blue2.png", chance: 17.5 },
    { name: "Волтер Вайт", rarity: "Епічна", img: "purple1.png", chance: 7 },
    { name: "Сігма", rarity: "Епічна", img: "purple2.png", chance: 7 },
    { name: "Бомбордіро", rarity: "Секретна", img: "red1.png", chance: 1 }
  ];
  else if (type === "box")
    return getDropPool("autumn").filter(x => x.rarity !== "Секретна");
  else if (type === "gift") return [
    { name: "Тралалеро", rarity: "Секретна", img: "red2.png", chance: 50 },
    { name: "Тунг-Сахур", rarity: "Секретна", img: "red3.png", chance: 50 }
  ];
  else return [];
}

function weightedRandom(items) {
  let total = 0;
  items.forEach(i => total += i.chance);
  let rand = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    if (rand < items[i].chance) return items[i];
    rand -= items[i].chance;
  }
  return items[items.length - 1];
}

function getQuality() {
  const qualities = [
    { name: "Прямо з цеху", chance: 12.5 },
    { name: "Після консервації", chance: 25 },
    { name: "Після уроку", chance: 40 },
    { name: "Зношена", chance: 22.5 }
  ];
  let rand = Math.random() * 100;
  for (let q of qualities) {
    if (rand < q.chance) return q.name;
    rand -= q.chance;
  }
  return qualities[qualities.length - 1].name;
}

function openCase(index) {
  if (index < 0 || index >= inventory.length) return;
  const item = inventory[index];
  if (item.type !== "case") {
    alert("Це не кейс!");
    return;
  }
  if (blockedItems.has(item.id)) {
    alert("Цей кейс заблоковано!");
    return;
  }
  const caseType = item.caseType;
  const pool = getDropPool(caseType);
  const selected = weightedRandom(pool);
  const quality = getQuality();
  const premiumChance = 0.02;
  const premium = quality !== "Зношена" && Math.random() < premiumChance;

  inventory.splice(index, 1);

  inventory.push({
    type: "bill",
    name: selected.name,
    rarity: selected.rarity,
    img: selected.img,
    quality,
    premium,
    id: generateId()
  });
  saveData();
  showInventory();
  alert(`Випало: ${selected.name}\nРідкість: ${selected.rarity}\nЯкість: ${quality}${premium ? "\n🌟 Преміум!" : ""}`);
}

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

function goToPromoMenu() {
  document.getElementById("app").innerHTML = `
    <h2>Введіть промо-код</h2>
    <input id="promoInput" placeholder="Промо-код" /><br />
    <button onclick="applyPromo()">Активувати</button><br /><br />
    <button onclick="mainMenu()">← Назад</button>
  `;
}

function applyPromo() {
  const promo = document.getElementById("promoInput").value.trim();
  if (!promo) {
    alert("Введіть промо-код!");
    return;
  }
  const promoB64 = strToB64(promo.toUpperCase());
  const promoData = promoCodesBase64[promoB64];
  if (!promoData) {
    alert("Невірний промо-код.");
    return;
  }
  if (promoData.type === "once" && usedPromos.includes(promoB64)) {
    alert("Цей промо-код вже використано.");
    return;
  }
  promoData.reward();
  if (promoData.type === "once") {
    usedPromos.push(promoB64);
  }
  saveData();
  mainMenu();
}

// Початковий екран
loginScreen();
