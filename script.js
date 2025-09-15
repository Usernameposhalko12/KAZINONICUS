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
let inventory = [];
let usedPromos = [];
let blockedItems = new Set();

const qualities = [
  {name:"Прямо з цеху", chance:0.125},
  {name:"Після консервації", chance:0.25},
  {name:"Після уроку", chance:0.40},
  {name:"Зношена", chance:0.225}
];

function saveData() {
  if (!currentUser) return;
  localStorage.setItem(currentUser + "_balance", balance);
  localStorage.setItem(currentUser + "_inventory", JSON.stringify(inventory));
  localStorage.setItem(currentUser + "_usedPromos", JSON.stringify(usedPromos));
  localStorage.setItem(currentUser + "_blockedItems", JSON.stringify(Array.from(blockedItems)));
  localStorage.setItem(currentUser + "_bpPoints", currentBP);
}

  let currentBP = 0;

  function loadData() {
  if (!currentUser) return;
  balance = parseInt(localStorage.getItem(currentUser + "_balance")) || 0;
  inventory = JSON.parse(localStorage.getItem(currentUser + "_inventory")) || [];
  usedPromos = JSON.parse(localStorage.getItem(currentUser + "_usedPromos")) || [];
  blockedItems = new Set(JSON.parse(localStorage.getItem(currentUser + "_blockedItems")) || []);
  currentBP = parseInt(localStorage.getItem(currentUser + "_bpPoints")) || 0;
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
  let promoCodeToShow = "GIFT654"; 
  let html = `<h2>Вітаю, ${currentUser}</h2>`;
  html += `<p>Баланс: ${balance} нікусів</p>`;
  html += `
    <div style="display:flex; gap:20px; justify-content:center; flex-wrap:wrap;">
      <div style="text-align:center;">
        <img src="img/case_autumn.png" width="180" /><br/>
        <button onclick="buyCase('autumn')">Кейс Осінь25 (40 нікусів)</button>
      </div>
      <div style="text-align:center;">
        <img src="img/case_box.png" width="180" /><br/>
        <button onclick="buyCase('box')">Бокс Осінь25 (30 нікусів)</button>
      </div>
      <div style="text-align:center;">
        <img src="img/case_gift.png" width="150" /><br/>
        <button disabled>Подарунковий кейс (Тільки через промо-код)</button><br/>
        <small>Промокод для подарункового кейса: ${promoCodeToShow}</small>
      </div>
    </div>
    <br />
    <button onclick="promoMenu()">🎁 Ввести промокод</button><br/>
    <button onclick="openEventsMenu()">🎟️ Івенти</button><br/>
    <button onclick="showInventory()">🎒 Інвентар (${inventory.length})</button><br/>
    <button onclick="arcadeMenu()">🎮 Міні-ігри</button><br/>  
    <button onclick="accountMenu()">Акаунт ⚙️</button>
    <button onclick="logout()">🚪 Вийти</button>
  `;
  document.getElementById("app").innerHTML = html;
}

function buyCase(type){
  const cost = type === "autumn" ? 40 : (type === "box" ? 30 : 0);
  if(balance < cost){
    alert("Недостатньо нікусів!");
    return;
  }
  balance -= cost;
  addCase(type);
  saveData();
  mainMenu();
}

function addKey(caseId){
    inventory.push({
        type: "key",
        keyType: caseId,
        name: caseId + " Key",
        img: "key_" + caseId + ".png"
    });
}

function addCase(caseType){
  if(!currentUser) return;
  if(inventory.length >= 100){
    alert("Інвентар заповнений!");
    return;
  }

  const item = {
    id: generateId(),
    type: "case",
    caseType: caseType
  };

  inventory.push(item);
  saveData();
  alert(`Отримано: ${getCaseName(caseType)}`);
}


function showInventory() {
  let html = `<h2>Інвентар</h2>`;
  if (inventory.length === 0) {
    html += `<p>Інвентар порожній.</p>`;
  } else {
    html += `<div style="display:flex; flex-wrap:wrap; gap:15px; justify-content:center;">`;

    inventory.forEach((item, idx) => {
      const isBlocked = blockedItems.has(item.id);

      if (item.type === "case") {
        html += `
          <div style="border:1px solid #999; padding:10px; width:150px; text-align:center; margin-bottom:10px;">
            <b>Кейс: ${getCaseName(item.caseType)}</b><br/>
            <img src="img/case_${item.caseType}.png" width="120" /><br/>
            <button onclick="openCase(${idx})" ${isBlocked ? "disabled" : ""}>Відкрити</button><br/>
            <button onclick="toggleBlock(${idx}); event.stopPropagation();">${isBlocked ? "Розблокувати" : "Заблокувати"}</button><br/>
            <button onclick="deleteItem(${idx}); event.stopPropagation();" ${isBlocked ? "disabled" : ""} style="margin-top:5px;">Видалити</button>
          </div>
        `;
      } else if (item.type === "item") {
        html += `
          <div style="border:1px solid #666; padding:10px; width:180px; text-align:center; background:#222; color:#fff; margin-bottom:10px; border-radius:8px;">
            <b>${item.name}</b><br/>
            <img src="img/${item.img}" width="120" /><br/>
            <div style="margin-top:5px; background:${getRarityColor(item.rarity)}; padding:3px 5px; border-radius:4px; font-weight:bold; color:#fff;">
              Рідкість: ${item.rarity}
            </div>
            <div style="margin-top:3px; background:${getQualityColor(item.quality)}; padding:2px 5px; border-radius:4px; font-weight:bold; color:#fff;">
              Якість: ${item.quality}
            </div>
            ${item.premium ? `<div style="margin-top:3px; background:#f5d300; padding:2px 5px; border-radius:4px; font-weight:bold; color:#000;">Преміум!</div>` : ""}
            <button onclick="toggleBlock(${idx}); event.stopPropagation();" style="margin-top:5px;">${isBlocked ? "Розблокувати" : "Заблокувати"}</button><br/>
            <button onclick="deleteItem(${idx}); event.stopPropagation();" ${isBlocked ? "disabled" : ""} style="margin-top:5px;">Видалити</button>
          </div>
        `;
      } else if (item.type === "key") {
        html += `
          <div style="border:1px solid #999; padding:10px; width:150px; text-align:center; margin-bottom:10px;">
            <b>Arcade Case Key</b><br/>
            <img src="img/key_arcase.png" width="120" /><br/>
            <div style="margin-top:3px; font-weight:bold;">Тип ключа: Arcade Case</div>
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
  if(type === "fallalt") return "FallAlternative25";
  if(type === "autumnus") return "Autumnus25";
  if(type === "harvest") return "Harvest25"; 
  if(type === "arcase") return "ArcadeCase";
  if(type === "halloween") return "Halloween25";
  if(type === "halloween_elite") return "Halloween25 Elite";
  if(type === "box_halloween") return "BoxHalloween25"; 
return "Невідомий кейс";
}

 function openCase(idx){
  if(!inventory[idx]) return;
  const item = inventory[idx];
  if(item.type !== "case") return;

  // Згенеруємо дроп за типом кейсу (робиться один раз)
  let drop = null;
  if(item.caseType === "autumn") drop = dropAutumnCase();
  else if(item.caseType === "box") drop = dropBoxCase();
  else if(item.caseType === "gift") drop = dropGiftCase();
  else if(item.caseType === "fallalt") drop = dropFallAlternative25Case();
  else if(item.caseType === "autumnus") drop = dropAutumnus25Case();
  else if(item.caseType === "harvest") drop = dropHarvest25Case();
  else if(item.caseType === "arcase") drop = dropArcadeCase();
  else if(item.caseType === "halloween") drop = dropHalloween25Case();
  else if(item.caseType === "halloween_elite") drop = dropHalloween25EliteCase();
  else if(item.caseType === "box_halloween") drop = dropBoxHalloween25Case();


  // Якщо кейс аркадний — перевіряємо наявність ключа
  if(item.caseType === "arcase"){
    const keyIdx = inventory.findIndex(i => i.type === "key" && i.keyType === "arcase");
    if(keyIdx === -1) return; // ключа немає — не відкривати

    // видаляємо обидва елементи в правильному порядку (спочатку більший індекс)
    if(keyIdx > idx){
      inventory.splice(keyIdx, 1);
      inventory.splice(idx, 1);
    } else if(keyIdx < idx){
      inventory.splice(idx, 1);
      inventory.splice(keyIdx, 1);
    } else { // кейс і ключ в одному індексі (нереально, але на всяк випадок)
      inventory.splice(idx, 1);
    }
  } else {
    // інші кейси: просто видаляємо цей кейс
    inventory.splice(idx, 1);
  }

  if(drop) inventory.push(drop);

  saveData();
  showInventory();
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

  const rates = {secret:0.01, epic:0.14, exceptional:0.30, common:0.55};
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

function promoMenu(){
  let html = `
    <h2>Введіть промокод</h2>
    <input id="promoInput" placeholder="Промокод" /><br/>
    <button onclick="applyPromo()">Активувати</button><br/><br/>
    <button onclick="mainMenu()">Назад</button>
  `;
  document.getElementById("app").innerHTML = html;
}

function applyPromo(){
  let code = document.getElementById("promoInput").value.trim();
  if(!code){
    alert("Введіть промокод");
    return;
  }
  const codeB64 = strToB64(code);
  if(!promoCodesBase64[codeB64]){
    alert("Промокод не знайдено");
    return;
  }
  if(promoCodesBase64[codeB64].type === "once" && usedPromos.includes(codeB64)){
    alert("Цей промокод вже використаний");
    return;
  }
  promoCodesBase64[codeB64].reward();
  if(promoCodesBase64[codeB64].type === "once"){
    usedPromos.push(codeB64);
  }
  saveData();
  mainMenu();
}

function arcadeMenu() {
    document.getElementById("app").innerHTML = `
        <h2>🎮 Міні-ігри</h2>
        <p>Баланс: ${balance} нікусів</p>
        <button onclick="startSaperPaid()" ${balance < 20 ? "disabled" : ""}>Сапер (20 нікусів)</button><br/><br/>
        <button onclick="startDinoPaid()" ${balance < 35 ? "disabled" : ""}>Динозаврик (35 нікусів)</button><br/><br/>
        <button onclick="mainMenu()">⬅ Назад</button>
    `;
}

function giveArcadeRewards(score) {
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

    function renderBoard() {
        let html = "<h2>Сапер</h2>";
        html += `<p>Очки: ${saperScore}</p>`;
        html += "<table style='border-collapse:collapse; margin:auto;'>";
        for (let r = 0; r < rows; r++) {
            html += "<tr>";
            for (let c = 0; c < cols; c++) {
                let cellContent = revealed[r][c] ? "✅" : "❌";
                if (revealed[r][c] && board[r][c] === "M") cellContent = "💣";
                html += `<td style='width:30px;height:30px;border:1px solid #555;text-align:center;cursor:pointer;'
                         onclick='reveal(${r},${c})'>${cellContent}</td>`;
            }
            html += "</tr>";
        }
        html += "</table>";
        if (!exploded) html += `<button onclick="stopSaper()">Зупинитися</button>`;
        if (exploded) html += `<p style='color:red; text-align:center;'>💥 Ви вибухнули! 
                                 <button onclick='startSaperPaid()'>Нова гра (20 нікусів)</button></p>`;
        html += `<br/><button onclick='arcadeMenu()'>⬅ Назад</button>`;
        document.getElementById("app").innerHTML = html;
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

    window.stopSaper = function () {
        addBalance(saperScore);
        alert(`Гра завершена! Отримано ${saperScore} нікусів.`);
        arcadeMenu();
    };

    renderBoard();
}

function startDinoPaid(){
    if (typeof balance === "undefined") balance = 0;
    if (balance < 35) {
        alert("Недостатньо нікусів для гри в Динозаврик!");
        return;
    }
    addBalance(-35);
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
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:40px;">
            <div style="text-align:center;">
                <img src="img/FallPass25Button.png" alt="FallPass 25" style="width:360px; cursor:pointer;" onclick="openFallPass()" />
            </div>
            <div style="text-align:center; margin-top:50px;">
                <button style="padding:10px 20px; font-size:16px;" onclick="mainMenu()">Назад</button>
            </div>
        </div>
        <h3>Інше</h3>
        <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
            <button style="padding:10px 20px; font-size:16px;" onclick="showBlackMarket()">Чорний Ринок</button>
            <button style="padding:10px 20px; font-size:16px;" disabled>Майбутній івент </button>
            <button style="padding:10px 20px; font-size:16px;" onclick="openTasksMenu()">Завдання 🎯</button>
        </div>
    `;
}

function addBP(amount){
    if(!currentUser) return;
    currentBP += amount;
    localStorage.setItem(currentUser + "_bpPoints", currentBP);
    const el = document.getElementById("bpCounter");
    if(el) el.textContent = currentBP;
    return currentBP;
}

const fallPassImages = {
  free: {
    1: "case_fallalt.png",
    2: "money.png",
    3: "case_box.png",
    4: "case_fallalt.png",
    5: "money.png",
    6: "case_autumn.png",
    7: "case_gift.png",
    8: "case_fallalt.png",
    9: "case_box.png",
    10: "case_arcase.png",
    11: "money.png",
    12: "case_box.png",
    13: "case_fallalt.png",
    14: "case_arcase.png",
    15: "case_fallalt.png",
    16: "case_box.png",
    17: "case_fallalt.png",
    18: "case_fallalt.png",
    19: "case_gift.png",
    20: "case_fallalt.png",
    21: "case_box.png",
    22: "case_fallalt.png",
    23: "case_fallalt.png",
    24: "case_gift.png",
    25: "case_box.png",
    26: "case_fallalt.png",
    27: "case_box.png",
    28: "case_fallalt.png",
    29: "case_fallalt.png",
    30: "case_fallalt.png",
    31: "money.png",
    32: "money.png",
    33: "case_box.png",
    34: "case_gift.png",
    35: "case_autumnus.png"
  },
  premium: {
    1: "case_autumnus.png",
    2: "money.png",
    3: "case_harvest.png",
    4: "case_fallalt.png",
    5: "money.png",
    6: "case_autumn.png",
    7: "case_gift.png",
    8: "case_fallalt.png",
    9: "case_harvest.png",
    10: "money.png",
    11: "case_fallalt.png",
    12: "case_harvest.png",
    13: "money.png",
    14: "case_gift.png",
    15: "case_autumnus.png",
    16: "case_harvest.png",
    17: "case_fallalt.png",
    18: "money.png",
    19: "case_gift.png",
    20: "case_fallalt.png",
    21: "case_harvest.png",
    22: "case_arcase.png",
    23: "case_fallalt.png",
    24: "case_gift.png",
    25: "case_harvest.png",
    26: "money.png",
    27: "case_autumn.png",
    28: "case_fallalt.png",
    29: "case_arcase.png",
    30: "case_fallalt.png",
    31: "money.png",
    32: "case_harvest.png",
    33: "case_arcase.png",
    34: "case_arcase.png",
    35: "case_autumnus.png"
  }
};


// ----------------- рівні Free Pass -----------------
const freePassLevels = [
  { level: 1, reward: "fallalt", type: "item" },
  { level: 2, reward: 10, type: "coins" },
  { level: 3, reward: "box", type: "item" },
  { level: 4, reward: "fallalt", type: "item" },
  { level: 5, reward: 20, type: "coins" },
  { level: 6, reward: "autumn", type: "item" },
  { level: 7, reward: "gift", type: "item" },
  { level: 8, reward: "fallalt", type: "item" },
  { level: 9, reward: "box", type: "item" },
  { level: 10, reward: "arcase", type: "item"},
  { level: 11, reward: 50, type: "coins" },
  { level: 12, reward: "box", type: "item" },
  { level: 13, reward: "fallalt", type: "item" },
  { level: 14, reward: "arcase", type: "item" },
  { level: 15, reward: "fallalt", type: "item" },
  { level: 16, reward: "box", type: "item" },
  { level: 17, reward: "fallalt", type: "item" },
  { level: 18, reward: "fallalt", type: "item" },
  { level: 19, reward: "gift", type: "item" },
  { level: 20, reward: "fallalt", type: "item" },
  { level: 21, reward: "box", type: "item" },
  { level: 22, reward: "fallalt", type: "item" },
  { level: 23, reward: "fallalt", type: "item" },
  { level: 24, reward: "gift", type: "item" },
  { level: 25, reward: "box", type: "item" },
  { level: 26, reward: "fallalt", type: "item" },
  { level: 27, reward: "autumn", type: "item" },
  { level: 28, reward: "fallalt", type: "item" },
  { level: 29, reward: "fallalt", type: "item" },
  { level: 30, reward: "fallalt", type: "item" },
  { level: 31, reward: 10, type: "coins" },
  { level: 32, reward: 20, type: "coins" },
  { level: 33, reward: "box", type: "item" },
  { level: 34, reward: "gift", type: "item" },
  { level: 35, reward: "autumnus", type: "item" }
];

// ----------------- рівні Premium Pass -----------------
const premiumPassLevels = [
  { level: 1, reward: "autumnus", type: "item" },
  { level: 2, reward: 20, type: "coins" },
  { level: 3, reward: "harvest", type: "item" },
  { level: 4, reward: "fallalt", type: "item" },
  { level: 5, reward: 50, type: "coins" },
  { level: 6, reward: "autumn", type: "item" },
  { level: 7, reward: "gift", type: "item" },
  { level: 8, reward: "fallalt", type: "item" },
  { level: 9, reward: "harvest", type: "item" },
  { level: 10, reward: 100, type: "coins" },
  { level: 11, reward: "fallalt", type: "item" },
  { level: 12, reward: "harvest", type: "item" },
  { level: 13, reward: 150, type: "coins" },
  { level: 14, reward: "gift", type: "item" },
  { level: 15, reward: "autumnus", type: "item" },
  { level: 16, reward: "harvest", type: "item" },
  { level: 17, reward: "fallalt", type: "item" },
  { level: 18, reward: 200, type: "coins" },
  { level: 19, reward: "gift", type: "item" },
  { level: 20, reward: "fallalt", type: "item" },
  { level: 21, reward: "harvest", type: "item" },
  { level: 22, reward: "arcase", type: "item"},
  { level: 23, reward: "fallalt", type: "item" },
  { level: 24, reward: "gift", type: "item" },
  { level: 25, reward: "harvest", type: "item" },
  { level: 26, reward: 250, type: "coins" },
  { level: 27, reward: "autumn", type: "item" },
  { level: 28, reward: "fallalt", type: "item" },
  { level: 29, reward: "arcase", type: "item" },
  { level: 30, reward: "fallalt", type: "item" },
  { level: 31, reward: 300, type: "coins" },
  { level: 32, reward: "harvest", type: "item" },
  { level: 33, reward: "arcase", type: "item"},
  { level: 34, reward: "arcase", type: "item" },
  { level: 35, reward: "autumnus", type: "item" }
];

function setPremium(active){
    if(!currentUser) return;
    localStorage.setItem(currentUser + "_premiumActive", active ? "1" : "0");
}

function loadPremium(){
    if(!currentUser) return false;
    return localStorage.getItem(currentUser + "_premiumActive") === "1";
}

if(loadPremium()){
    console.log(currentUser + " має преміум!");
}

const totalLevels = 35;
const bpPerLevel = 1000;

// ----------------- зберігання прогресу -----------------
function saveClaimed(passType, level){
    if(!currentUser) return;
    const key = currentUser + "_bp_claimed_" + passType;
    const claimed = JSON.parse(localStorage.getItem(key) || "{}");
    claimed[level] = true;
    localStorage.setItem(key, JSON.stringify(claimed));
}

function isClaimed(passType, level){
    if(!currentUser) return false;
    const key = currentUser + "_bp_claimed_" + passType;
    const claimed = JSON.parse(localStorage.getItem(key) || "{}");
    return !!claimed[level];
}

// ----------------- відображення Pass -----------------
function openFallPass() {
    const endDate = new Date("2025-10-01"); // Кінець батл-пасу
    const now = new Date(); // Поточна дата

    if(now >= endDate) {
        alert("Батл-пас завершено! Ви більше не можете отримувати нагороди.");
        return;
    }

const container = document.getElementById("app");
    container.innerHTML = `
        <h2>🎟️ FallPass 25</h2>
        <div style="display:flex; justify-content:space-around; margin-bottom:10px;">
            <button onclick="showPass('free')">Free Pass</button>
    <button id="premiumBtn" onclick="showPass('premium')" disabled title="Необхідно активувати Premium">Premium Pass</button>
           <button onclick="openEventsMenu()">Назад</button>
        </div>
        <div id="fallPassContainer" style="overflow-x:auto; white-space:nowrap; padding:10px; border:1px solid #ccc; border-radius:10px;"></div>
        <div style="margin-top:10px;">Ваші BP: <span id="bpCounter">${currentBP}</span></div>
    `;

       const btn = document.getElementById("premiumBtn");
if(localStorage.getItem("premiumUnlocked") === "1" && btn){
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

        const locked = currentBP < level.level * bpPerLevel;
        const claimed = isClaimed(passType, level.level);

        lvlDiv.style.backgroundColor = claimed ? "#d4f4dd" : "#ffe066";
    const imgFile = fallPassImages[passType][level.level];
        lvlDiv.innerHTML = `
            <img src="img/${imgFile}" alt="Level ${level.level}" style="width:100px; height:100px;" /> 
            <div style="color:black;">Level ${level.level}</div>
            <div style="color:black;">${locked ? "🔒" : (level.type === "coins" ? level.reward + " нікусів" : getCaseName(level.reward))}</div>
        `;

lvlDiv.onclick = () => {
    const nowClaimed = isClaimed(passType, level.level); // перевірка актуального стану
    if(!locked && !nowClaimed){
        saveClaimed(passType, level.level);
        lvlDiv.style.backgroundColor = "#d4f4dd";
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
    if(!currentUser) return alert("Спочатку увійдіть в акаунт");

    checkTasks(); // ← додали перевірку завдань перед рендером

    const container = document.getElementById("app");

    let tasksHTML = tasks.map(t => {
        return `
            <div style="padding:10px; margin-bottom:5px; border-radius:5px; background-color:${t.completed ? '#64C466' : '#D49F37'};">
                ${t.completed ? '✔' : '❌'} ${t.description}
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <h2>🎯 Завдання</h2>
        <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
            ${tasksHTML}
        </div>
        <button style="padding:10px 20px; font-size:16px;" onclick="openEventsMenu()">⬅ Назад до Івентів</button>
    `;
}

let user = {
    balance: 0,
    bpPoints: 0,
    openedCases: {},
    items: [],
    secretBills: 0
};

function loadUser() {
    const data = localStorage.getItem("userData");
    if (data) {
        user = JSON.parse(data);
        user.balance = user.balance || 0;
        user.bpPoints = user.bpPoints || 0;
        user.openedCases = user.openedCases || {};
        user.items = user.items || [];
        user.secretBills = user.secretBills || 0;
    }
}

function saveUser() {
    localStorage.setItem("userData", JSON.stringify(user));
}

loadUser();

const tasks = [
  {id:1, description:"Отримати 'Доге' або 'Нагетс'", reward:()=>addBP(2500), check:()=> inventory.some(i=>["Доге","Нагетс"].includes(i.name)), completed:false},
{id:2,description:"Зібрати всі звичайні предмети ('Пасхалочник','Єнот','Дракон','Булінг-кіт')",reward:()=>addBP(2000),check:()=>["Пасхалочник","Єнот","Дракон","Булінг-кіт"].every(n=> inventory.some(i=>i.name===n)),completed:false},
  {id:3, description:"Отримати всі виняткові предмети ('Сатана','Хамстер','Ракета-кіт','Хорор-кіт')", reward:()=>addBP(3000), check:()=>["Сатана","Хамстер","Ракета-кіт","Хорор-кіт"].every(n=> inventory.some(i=>i.name===n)), completed:false},
  {id:4, description:"Отримати звичайний предмет у якості 'Зношена' ('Єнот','Дракон','Булінг-кіт')", reward:()=>addBP(1000), check:()=> inventory.some(i=>["Єнот","Посхалочник","Дракон","Булінг-кіт"].includes(i.name)&&i.quality==="Зношена"), completed:false},
{ id: 5, description: "Накопичити на балансі 250 нікусів", reward: () => addBP(1000), check: () => balance >= 250, completed: false },
{ id: 6, description: "Накопичити на балансі 500 нікусів", reward: () => addBP(4000), check: () => balance >= 500, completed: false },
  { id: 7, description: "Зібрати 5 предметів будь-якої рідкості", reward: () => addBP(1000), check: () => inventory.length >= 5, completed: false },
  { id: 8, description: "Отримати будь-який секретний предмет ('Ліларіла', 'Супермен', 'Мужик', 'Бомбордіро', 'Скелет', 'Тунг-Сахур', 'Тралалеро')", reward: () => addBP(4000), check: () => inventory.some(i => ["Ліларіла", "Супермен", "Скелет", "Бомбордіро", "Тунг-Сахур", "Мужик", "Тралалеро"].includes(i.name)), completed: false },
  { id: 9, description: "Отримати предмет якості 'Прямо з цеху'", reward: () => addBP(1000), check: () => inventory.some(i => i.quality === "Прямо з цеху"), completed: false },
  { id: 10, description: "Отримати будь-який предмет преміум", reward: () => addBP(1500), check: () => inventory.some(i => i.premium === true), completed: false }
];

function checkTasks() {
  tasks.forEach(task => {
    if (!task.completed && task.check()) {
      completeTask(task.id);
    }
  });
}

function saveTasks() {
    localStorage.setItem("tasksData", JSON.stringify(tasks.map(t => ({id: t.id, completed: t.completed}))));
}

function loadTasks() {
    const data = localStorage.getItem("tasksData");
    if (data) {
        const saved = JSON.parse(data);
        saved.forEach(s => {
            const task = tasks.find(t => t.id === s.id);
            if (task) task.completed = s.completed;
        });
    }
}

function completeTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if(!task) return;
  if(task.completed) return alert("Це завдання вже виконано!");
  if(task.check()) {
    task.reward();
    task.completed = true;
    saveUser();
    saveTasks();
    alert(`Завдання виконано! Ви отримали BP!`);
    renderTasks();
  } else {
    alert("Завдання ще не виконано!");
  }
}

loadUser();
loadTasks(); // спочатку завантажуємо стан завдань
let openedCases = user.openedCases || {autumn:0, fallalt:0, autumnus:0, box:0, gift:0};

function performAction(actionType, payload) {
    switch(actionType) {
        case "openCase":
            user.openedCases[payload] = (user.openedCases[payload] || 0) + 1;
            break;
        case "addBalance":
            user.balance += payload;
            break;
        case "receiveItem":
            if(payload && typeof payload === "object") user.items.push(payload);
            break;
        case "collectSecretBill":
            user.secretBills += 1;
            break;
        default:
            console.warn("Невідома дія:", actionType);
            return;
    }
   inventory = user.items;
  saveUser();
    checkTasks();
}

function accountMenu() {
    document.getElementById("app").innerHTML = `
        <h2>Акаунт ⚙️</h2>
        <input type="password" id="deletePass" placeholder="Введіть пароль" oninput="checkDeletePass()"/><br/><br/>
        <button id="deleteBtn" onclick="deleteProgress()" disabled>Видалити прогрес</button><br/><br/>
        <button onclick="showUserRights()">ℹ️ Користувацьке право</button><br/><br/>
        <button onclick="mainMenu()">⬅ Назад</button>
        
        <!-- Модальне вікно для правил -->
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
                8. Нікус Кейс Ультра є частиною внутрішньої економіки та ПВО, і не є азартною грою або казино.<br>
                9. Гра заснована на популярних ігрових механіках (кейси, батл-паси) і не порушує правил школи.<br>
                10. Система висміює будь-яку форму азартних ігор і не пропагує її.
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
                ">✖ Закрити</button>
            </div>
        </div>
    `;
}

function checkDeletePass() {
    const pass = document.getElementById("deletePass").value;
    document.getElementById("deleteBtn").disabled = (pass !== "5242");
}

function deleteProgress() {
    const pass = document.getElementById("deletePass").value;
    if(pass !== "5242") {
        alert("Неправильний пароль!");
        return;
    }
    if(confirm("Ви впевнені, що хочете видалити весь прогрес? Цю дію не можна скасувати.")) {
        localStorage.clear();
        alert("Прогрес видалено! Сторінка буде перезавантажена.");
        location.reload();
    }
}

// Показати модальне вікно
function showUserRights() {
    document.getElementById("rightsModal").style.display = "flex";
}

// Закрити модальне вікно
function closeUserRights() {
    document.getElementById("rightsModal").style.display = "none";
}

const promoCodesBase64 = {
  "TklDVVMxMjM=": {type:"once", reward:()=>{addBalance(250); alert("Отримано 250 нікусів!");}},
  "SURJT0tBSw==": {type:"unlimited", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
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
  "TU9ORVk5ODc=": {type:"unlimited", reward:()=>{addBalance(1000); alert("Отримано 1000 нікусів!");}},
  "UkVBTElUWUdJRlQx": {type:"unlimited", reward:()=>{addCase("gift"); alert("Отримано подарунковий кейс!");}},
  "TklMSU1JVEFVVDI1": {type:"unlimited", reward:()=>{addCase("autumn"); alert("Отримано кейс Осінь25!");}},
  "WVNFTExBVVRVU1QyNQ==": {type:"once", reward:()=>{addCase("autumn"); alert("Отримано кейс Осінь25!");}},
  "RE9ESUsyNTBPS0FL": {type:"unlimited", reward:()=>{addBalance(250); alert("Отримано 250 нікусів!");}},
  "RkFMTE5BVDE0":{type:"unlimited",reward:()=>{addCase("fallalt");alert("Отримано кейс FallAlternative25!");}},
  "QVVUSFVNMTIzMTQ4OA==":{type:"unlimited",reward:()=>{addCase("autumnus");alert("Отримано кейс Autumnus25!");}},
  "T05DRTEwMDBCUA==": {type:"once", reward:()=>{addBP(1000); alert("Отримано 1000 BP!");}},
  "VU4xMDAwQlA=": {type:"unlimited", reward:()=>{addBP(1000); alert("Отримано 1000 BP!");}},
"Qk9YRlVO": {type:"once", reward:()=>{addCase("box"); alert("Отримано кейс Бокс!");}},  
"Qk9YTE9M": {type:"once", reward:()=>{addCase("box"); alert("Отримано кейс Бокс!");}},  
"Qk9YVk9WQQ==": {type:"once", reward:()=>{addCase("box"); alert("Отримано кейс Бокс!");}},  
"QVVURkZVTg==": {type:"once", reward:()=>{addCase("autumn"); alert("Отримано кейс Осінь25!");}},  
"QVVUTExPTA==": {type:"once", reward:()=>{addCase("autumn"); alert("Отримано кейс Осінь25!");}},  
"QVVUVk9WQQ==": {type:"once", reward:()=>{addCase("autumn"); alert("Отримано кейс Осінь25!");}},  
"QlAxMjM=": {type:"once", reward:()=>{addBP(1000); alert("Отримано 1000 BP!");}},  
"QlAxNDg3": {type:"once", reward:()=>{addBP(1000); alert("Отримано 1000 BP!");}},  
"QlA1Mg==": {type:"once", reward:()=>{addBP(1000); alert("Отримано 1000 BP!");}},
"SEFSVkVTVEJPTFg=": {type:"once", reward:()=>{addCase("harvest"); alert("Отримано кейс Harvest25!");}},  
"SEFSVkVTVEZVTg==": {type:"once", reward:()=>{addCase("harvest"); alert("Отримано кейс Harvest25!");}},  
"SEFSVkVTVE5BVFVSQUw=": {type:"unlimited", reward:()=>{addCase("harvest"); alert("Отримано кейс Harvest25!");}},
  "QUlSQ0FTRUNBU0U=": {type:"once", reward:()=>{addCase("arcase"); alert("Отримано Аркад кейс!");}},
  "QUJPQkE=": {type:"once", reward:()=>{addCase("arcase"); alert("Отримано Аркад кейс!");}},

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

  "VU5MT0NLUFJFTUlVTQ==": {
  type: "unlimited",
  reward: () => {
      const btn = document.getElementById("premiumBtn");
      if(btn){
          btn.disabled = false;
          btn.title = "";
      }
      localStorage.setItem("premiumUnlocked", "1");
alert("Кнопка Premium Pass розблокована!");
  }
}

};

const blackMarket = {
  gift: { name: "Подарунковий кейс", price: 60, caseType: "gift" },
  arcase: { name: "Аркадний кейс", price:15, caseType: "arcase" },
  arcaseKey: { name: "Ключ від Аркадного кейсу", price:50, caseType: "arcase", isKey: true }
};

function buyCaseFromBlackMarket(key){
  const marketItem = blackMarket[key];
  if(!marketItem) return alert("Цей предмет не продається на Чорному ринку!");

  if(balance < marketItem.price){
    return alert("У вас недостатньо нікусів для покупки!");
  }

  balance -= marketItem.price;

  if(marketItem.isKey){
    // Додаємо ключ
    inventory.push(createKeyForCase(marketItem.caseType, marketItem.name, `img/key_${marketItem.caseType}.png`));
  } else {
    // Додаємо кейс
    inventory.push({
      id: generateId(),
      name: marketItem.name,
      type: "case",
      caseType: marketItem.caseType,
      rarity: "Звичайна",
      img: `img/case_${marketItem.caseType}.png`
    });
  }

  saveData();
  showBlackMarket();
  alert(`Ви купили ${marketItem.name} за ${marketItem.price} нікусів!`);
}

function showBlackMarket(){
  let html = `<h2>Чорний Ринок</h2>`;
  html += `<p>Баланс: ${balance} нікусів</p>`;
  html += `<div style="display:flex; gap:20px; flex-wrap:wrap;">`;

  for(const key in blackMarket){
    const item = blackMarket[key];
    const imgPath = item.isKey ? `img/key_${item.caseType}.png` : `img/case_${item.caseType}.png`;

    html += `
      <div style="text-align:center; border:1px solid #333; padding:10px; border-radius:5px; width:150px;">
        <img src="${imgPath}" alt="${item.name}" style="width:100px; height:100px;"><br>
        <b>${item.name}</b><br>
        Ціна: ${item.price} нікусів<br>
        <button onclick="buyCaseFromBlackMarket('${key}')">Купити</button>
      </div>
    `;
  }

  html += `</div><br/><button onclick="mainMenu()">Назад в інвентар</button>`;

  document.getElementById("app").innerHTML = html;
}

window.onload = () => {
  loginScreen();
};
