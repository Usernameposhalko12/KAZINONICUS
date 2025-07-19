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

function addBalance(amount) {
  balance += amount;
  saveData();
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
  if(accounts[loginVal] && accounts[loginVal] === passVal){
    currentUser = loginVal;
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
  loginScreen();
}

function mainMenu() {
  saveData();
  let html = `<h2>Вітаю, ${currentUser}</h2>`;
  html += `<p>Баланс: ${balance} нікусів</p>`;
  html += `
    <div style="display:flex; gap:20px; justify-content:center; flex-wrap:wrap;">
      <div style="text-align:center;">
        <img src="img/case_autumn.png" width="150" /><br/>
        <button onclick="buyCase('autumn')">Кейс Осінь25 (40 нікусів)</button>
      </div>
      <div style="text-align:center;">
        <img src="img/case_box.png" width="150" /><br/>
        <button onclick="buyCase('box')">Бокс Осінь25 (20 нікусів)</button>
      </div>
      <div style="text-align:center;">
        <img src="img/case_gift.png" width="150" /><br/>
        <button disabled>Подарунковий кейс (Тільки через промо-код)</button><br/>
        <small>Промокод для подарункового кейса: UNGIFT1488</small>
      </div>
    </div>
    <br />
    <button onclick="promoMenu()">🎁 Ввести промокод</button><br/>
    <button onclick="showInventory()">🎒 Інвентар (${inventory.length})</button><br/>
    <button onclick="logout()">🚪 Вийти</button>
  `;
  document.getElementById("app").innerHTML = html;
}

function buyCase(type){
  const cost = type === "autumn" ? 40 : (type === "box" ? 20 : 0);
  if(balance < cost){
    alert("Недостатньо нікусів!");
    return;
  }
  balance -= cost;
  addCase(type);
  saveData();
  mainMenu();
}

function addCase(type){
  if(inventory.length >= 100){
    alert("Інвентар заповнений!");
    return;
  }
  inventory.push({id: generateId(), type: "case", caseType: type});
  saveData();
}

function showInventory(){
  let html = `<h2>Інвентар</h2>`;
  if(inventory.length === 0){
    html += `<p>Інвентар порожній.</p>`;
  } else {
    html += `<div style="display:flex; flex-wrap:wrap; gap:15px; justify-content:center;">`;
    inventory.forEach((item, idx) => {
      const isBlocked = blockedItems.has(item.id);
      if(item.type === "case"){
        html += `
          <div style="border:1px solid #999; padding:10px; width:150px; text-align:center;">
            <b>Кейс: ${getCaseName(item.caseType)}</b><br/>
            <img src="img/case_${item.caseType}.png" width="120" /><br/>
            <button onclick="openCase(${idx})" ${isBlocked ? "disabled" : ""}>Відкрити</button><br/>
            <button onclick="toggleBlock(${idx}); event.stopPropagation();">${isBlocked ? "Розблокувати" : "Заблокувати"}</button><br/>
            <button onclick="deleteItem(${idx}); event.stopPropagation();" ${isBlocked ? "disabled" : ""} style="margin-top:5px;">Видалити</button>
          </div>
        `;
      } else if(item.type === "item"){
        html += `
          <div style="border:1px solid #666; padding:10px; width:140px; text-align:center; background:#222; color:#fff;">
            <b>${item.name}</b><br/>
            <img src="img/${item.img}" width="120" /><br/>
            <small>${item.rarity}</small><br/>
            <button onclick="toggleBlock(${idx}); event.stopPropagation();">${isBlocked ? "Розблокувати" : "Заблокувати"}</button><br/>
            <button onclick="deleteItem(${idx}); event.stopPropagation();" ${isBlocked ? "disabled" : ""} style="margin-top:5px;">Видалити</button>
          </div>
        `;
      }
    });
    html += "</div>";
  }
  html += `<br/><button onclick="mainMenu()">Назад</button>`;
  document.getElementById("app").innerHTML = html;
}

function toggleBlock(idx){
  if(!inventory[idx]) return;
  const id = inventory[idx].id;
  if(blockedItems.has(id)) blockedItems.delete(id);
  else blockedItems.add(id);
  saveData();
  showInventory();
}

function deleteItem(idx){
  if(!inventory[idx]) return;
  const id = inventory[idx].id;
  if(blockedItems.has(id)){
    alert("Неможливо видалити заблокований предмет!");
    return;
  }
  inventory.splice(idx, 1);
  saveData();
  showInventory();
}

function getCaseName(type){
  if(type === "autumn") return "Осінь25";
  if(type === "box") return "Бокс";
  if(type === "gift") return "Подарунковий кейс";
  return "Невідомий кейс";
}

function openCase(idx){
  if(!inventory[idx]) return;
  const item = inventory[idx];
  if(item.type !== "case") return;

  let drop = null;
  if(item.caseType === "autumn") drop = dropAutumnCase();
  else if(item.caseType === "box") drop = dropBoxCase();
  else if(item.caseType === "gift") drop = dropGiftCase();

  if(drop){
    inventory.splice(idx, 1);
    inventory.push(drop);
    saveData();
    alert(`Вам випало: ${drop.name} (${drop.rarity})`);
    showInventory();
  }
}

function dropByRates(rates){
  const r = Math.random();
  let sum = 0;
  for(const key in rates){
    sum += rates[key];
    if(r < sum) return key;
  }
  return "common";
}

function dropAutumnCase(){
  const rates = { secret:0.01, epic:0.14, exceptional:0.35, common:0.50 };
  const rarity = dropByRates(rates);
  if(rarity === "secret") return {name:"Бомбордіро", img:"red1.png", rarity:"Секретна", type:"item", id:generateId()};
  if(rarity === "epic") return [{name:"Волтер Вайт", img:"purple1.png", rarity:"Епічна", type:"item", id:generateId()}, {name:"Сігма", img:"purple2.png", rarity:"Епічна", type:"item", id:generateId()}][Math.floor(Math.random()*2)];
  if(rarity === "exceptional") return [{name:"Сатана", img:"blue2.png", rarity:"Виняткова", type:"item", id:generateId()}, {name:"Хамстер", img:"blue1.png", rarity:"Виняткова", type:"item", id:generateId()}][Math.floor(Math.random()*2)];
  return [{name:"Пасхалочник", img:"green1.png", rarity:"Звичайна", type:"item", id:generateId()}, {name:"Єнот", img:"green2.png", rarity:"Звичайна", type:"item", id:generateId()}][Math.floor(Math.random()*2)];
}

function dropBoxCase(){
  const rates = { secret:0, epic:0.14, exceptional:0.35, common:0.51 };
  const rarity = dropByRates(rates);
  if(rarity === "epic") return [{name:"Волтер Вайт", img:"purple1.png", rarity:"Епічна", type:"item", id:generateId()}, {name:"Сігма", img:"purple2.png", rarity:"Епічна", type:"item", id:generateId()}][Math.floor(Math.random()*2)];
  if(rarity === "exceptional") return [{name:"Сатана", img:"blue2.png", rarity:"Виняткова", type:"item", id:generateId()}, {name:"Хамстер", img:"blue1.png", rarity:"Виняткова", type:"item", id:generateId()}][Math.floor(Math.random()*2)];
  return [{name:"Пасхалочник", img:"green1.png", rarity:"Звичайна", type:"item", id:generateId()}, {name:"Єнот", img:"green2.png", rarity:"Звичайна", type:"item", id:generateId()}][Math.floor(Math.random()*2)];
}

function dropGiftCase(){
  const rates = { secret:0.01, epic:0.20, exceptional:0.79 };
  const rarity = dropByRates(rates);
  if(rarity === "secret") return [{name:"Тралалеро", img:"red2.png", rarity:"Секретна", type:"item", id:generateId()}, {name:"Тунг-Сахур", img:"red3.png", rarity:"Секретна", type:"item", id:generateId()}][Math.floor(Math.random()*2)];
  if(rarity === "epic") return [{name:"Волтер Вайт", img:"purple1.png", rarity:"Епічна", type:"item", id:generateId()}, {name:"Сігма", img:"purple2.png", rarity:"Епічна", type:"item", id:generateId()}][Math.floor(Math.random()*2)];
  return [{name:"Сатана", img:"blue2.png", rarity:"Виняткова", type:"item", id:generateId()}, {name:"Хамстер", img:"blue1.png", rarity:"Виняткова", type:"item", id:generateId()}][Math.floor(Math.random()*2)];
}

function promoMenu(){
  let html = `
    <h2>Введіть промокод</h2>
    <input id="promoInput" placeholder="Промокод" style="width:200px;" />
    <button onclick="applyPromo()">Активувати</button><br/>
    <button onclick="mainMenu()">Назад</button>
  `;
  document.getElementById("app").innerHTML = html;
}

function applyPromo(){
  const codeRaw = document.getElementById("promoInput").value.trim();
  if(!codeRaw) return alert("Введіть промокод!");
  const code = strToB64(codeRaw);
  if(!promoCodesBase64[code]) return alert("Невірний промокод!");
  const promo = promoCodesBase64[code];
  if(promo.type === "once" && usedPromos.includes(code)) return alert("Цей промокод уже використано");
  promo.reward();
  if(promo.type === "once") usedPromos.push(code);
  saveData();
  mainMenu();
}

loginScreen();
