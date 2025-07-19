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
  "VU5HSUZUMTQ4OA==": {type:"unlimited", reward:()=>{addCase("gift"); alert("Отримано подарунковий кейс!");}},
  "R0lGVDY1NA==": {type:"once", reward:()=>{addCase("gift"); alert("Отримано подарунковий кейс!");}} // GIFT654 одноразовий, заміна на REALGIFT
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
  let promoForGiftCase = "GIFT654";
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
        <small>Промокод для подарункового кейса: ${promoForGiftCase}</small>
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
            <button onclick="openCase(${idx})" ${isBlocked ? "disabled" : ""}>Відкрити</button>
            <button onclick="blockItem(${idx})">${isBlocked ? "Розблокувати" : "Заблокувати"}</button>
            <button onclick="removeItem(${idx})">Видалити</button>
          </div>`;
      } else {
        // Звичайний предмет
        html += renderItem(item, idx, isBlocked);
      }
    });
    html += `</div>`;
  }
  html += `<br/><button onclick="mainMenu()">Назад</button>`;
  document.getElementById("app").innerHTML = html;
}

function renderItem(item, idx, isBlocked){
  return `
    <div style="border:1px solid #999; padding:10px; width:150px; text-align:center; background-color:#222; color:#eee;">
      <b>${item.name}</b><br/>
      <img src="img/${item.img}" width="120" /><br/>
      <small>Рідкість: ${item.rarity}</small><br/>
      <small>Якість: ${item.quality}${item.isPremium ? " (Преміум!)" : ""}</small><br/>
      <button onclick="blockItem(${idx})">${isBlocked ? "Розблокувати" : "Заблокувати"}</button>
      <button onclick="removeItem(${idx})">Видалити</button>
    </div>
  `;
}

function blockItem(idx){
  const item = inventory[idx];
  if(blockedItems.has(item.id)){
    blockedItems.delete(item.id);
  } else {
    blockedItems.add(item.id);
  }
  saveData();
  showInventory();
}

function removeItem(idx){
  if(confirm("Видалити предмет?")){
    inventory.splice(idx,1);
    saveData();
    showInventory();
  }
}

function openCase(idx){
  const item = inventory[idx];
  if(!item || item.type !== "case") return;
  if(blockedItems.has(item.id)){
    alert("Цей кейс заблоковано і не може бути відкритий.");
    return;
  }
  let drop = null;
  if(item.caseType === "autumn"){
    drop = dropFromCaseAutumn();
  } else if(item.caseType === "box"){
    drop = dropFromCaseBox();
  } else if(item.caseType === "gift"){
    drop = dropFromCaseGift();
  } else {
    alert("Невідомий тип кейсу");
    return;
  }
  if(drop){
    inventory.splice(idx,1); // видаляємо кейс
    inventory.push(drop);
    saveData();
    alert(`Ви отримали: ${drop.name} (${drop.rarity}, ${drop.quality}${drop.isPremium ? ", Преміум!" : ""})`);
    showInventory();
  }
}

function dropFromCaseAutumn(){
  // Шанси: 50% звичайна, 35% виняткова, 14% епічна, 1% секретна
  let roll = Math.random() * 100;
  if(roll < 1){ // секретна
    return randomSecretAutumn();
  } else if(roll < 15){ // епічна (1+14)
    return randomEpic();
  } else if(roll < 50){ // виняткова (15+35)
    return randomExceptional();
  } else { // звичайна (50%)
    return randomCommonAutumn();
  }
}

function dropFromCaseBox(){
  // Без секретних, звичайна + виняткова + епічна (шар шанси пропорції 50,35,15)
  let roll = Math.random() * 100;
  if(roll < 15){ // епічна
    return randomEpic();
  } else if(roll < 50){ // виняткова
    return randomExceptional();
  } else {
    return randomCommonBox();
  }
}

function dropFromCaseGift(){
  // Шанси як у осінь, але секретні тільки ці два + тралалеро + тунг-сахур
  let roll = Math.random() * 100;
  if(roll < 1){ // секретна - трлалеро або тунг-сахур
    return randomSecretGift();
  } else if(roll < 15){
    return randomEpic();
  } else if(roll < 50){
    return randomExceptional();
  } else {
    return randomCommonGift();
  }
}

function randomSecretAutumn(){
  // Бомбордіро (red1.png) падає тільки з кейсу осінь25.
  return createItem("Бомбордіро", "red1.png", "Секретна", "Прямо з цеху", true);
}

function randomSecretGift(){
  // Тралалеро (red2.png) і Тунг-Сахур (red3.png) падають з подарункового кейса
  const arr = [
    ["Тралалеро", "red2.png"],
    ["Тунг-Сахур", "red3.png"]
  ];
  const chosen = arr[Math.floor(Math.random() * arr.length)];
  return createItem(chosen[0], chosen[1], "Секретна", "Прямо з цеху", true);
}

function randomEpic(){
  const arr = [
    ["Волтер Вайт", "purple1.png"],
    ["Сігма", "purple2.png"]
  ];
  const chosen = arr[Math.floor(Math.random() * arr.length)];
  return createItem(chosen[0], chosen[1], "Епічна", randomQuality(), randomPremium());
}

function randomExceptional(){
  const arr = [
    ["Сатана", "blue2.png"],
    ["Хамстер", "blue1.png"]
  ];
  const chosen = arr[Math.floor(Math.random() * arr.length)];
  return createItem(chosen[0], chosen[1], "Виняткова", randomQuality(), randomPremium());
}

function randomCommonAutumn(){
  const arr = [
    ["Пасхалочнік", "green1.png"],
    ["Єнот", "green2.png"]
  ];
  const chosen = arr[Math.floor(Math.random() * arr.length)];
  return createItem(chosen[0], chosen[1], "Звичайна", randomQuality(), randomPremium());
}

function randomCommonBox(){
  // Звичайні з боксу (ті ж що й з осінь25)
  return randomCommonAutumn();
}

function randomCommonGift(){
  // З подарункового кейса немає звичайних
  // Якщо випадково, то повертаємо null, але краще уникати.
  return null;
}

function randomQuality(){
  // Шанси якості:
  // 🔶 Преміум — 2% (накладається тільки на інші якості, окрім «Зношена»)
  // 🟡 Прямо з цеху — 12.5%
  // 🟠 Після консервації — 25%
  // 🔵 Після уроку — 40%
  // ⚫ Зношена — 22.5% (не може бути преміум)
  let roll = Math.random() * 100;
  if(roll < 2) return "Преміум";
  else if(roll < 14.5) return "Прямо з цеху";
  else if(roll < 39.5) return "Після консервації";
  else if(roll < 79.5) return "Після уроку";
  else return "Зношена";
}

function randomPremium(){
  // 2% преміум накладається, але не для "Зношена"
  // Цю логіку вже враховано вище, тому тут просто true/false преміум, якщо якість не "Зношена"
  return false; // Зараз у якості згенеровано окремо "Преміум"
}

function createItem(name, img, rarity, quality, isPremium = false){
  return {
    id: generateId(),
    type: "item",
    name,
    img,
    rarity,
    quality,
    isPremium
  };
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
  const code = window.btoa(unescape(encodeURIComponent(codeRaw)));
  if(!promoCodesBase64[code]) return alert("Невірний промокод!");
  const promo = promoCodesBase64[code];
  if(promo.type === "once" && usedPromos.includes(code)) return alert("Цей промокод уже використано");
  promo.reward();
  if(promo.type === "once") usedPromos.push(code);
  saveData();
  mainMenu();
}

window.onload = () => {
  loginScreen();
};
