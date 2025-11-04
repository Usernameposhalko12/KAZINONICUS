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
  localStorage.setItem(currentUser + "_bpsPoints", currentBPS);
}

  let currentBPS = 0;

  function loadData() {
  if (!currentUser) return;
  balance = parseInt(localStorage.getItem(currentUser + "_balance")) || 0;
  inventory = JSON.parse(localStorage.getItem(currentUser + "_inventory")) || [];
  usedPromos = JSON.parse(localStorage.getItem(currentUser + "_usedPromos")) || [];
  blockedItems = new Set(JSON.parse(localStorage.getItem(currentUser + "_blockedItems")) || []);
  currentBPS = parseInt(localStorage.getItem(currentUser + "_bpsPoints")) || 0;
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
if(type === "kolek1") return "Осінній Колекційний Кейс"; 
return "Невідомий кейс";
}


const ANIM = {
  itemsCount: 41,
  itemWidth: 120,      // ширина одного елементу (px)
  itemGap: 10,         // сумарний відступ між елементами (px)
  duration: 4800,      // тривалість анімації (ms)
  containerWidth: 600
};

function openCase(idx){
  if(!inventory[idx]) return;
  const item = inventory[idx];
  if(item.type !== "case") return;

  let dropFunc = null;
  switch(item.caseType){
    case "autumn": dropFunc = dropAutumnCase; break;
    case "box": dropFunc = dropBoxCase; break;
    case "gift": dropFunc = dropGiftCase; break;
    case "fallalt": dropFunc = dropFallAlternative25Case; break;
    case "autumnus": dropFunc = dropAutumnus25Case; break;
    case "harvest": dropFunc = dropHarvest25Case; break;
    case "arcase": dropFunc = dropArcadeCase; break;
    case "halloween": dropFunc = dropHalloween25Case; break;
    case "halloween_elite": dropFunc = dropHalloween25EliteCase; break;
    case "box_halloween": dropFunc = dropBoxHalloween25Case; break;
    case "kolek1": dropFunc = dropkolek1case; break;
default: alert("Невідомий тип кейсу"); return;
  }

  // Якщо аркадний кейс — перевіряємо ключ
  if(item.caseType === "arcase"){
    const keyIdx = inventory.findIndex(i => i.type === "key" && i.keyType === "arcase");
    if(keyIdx === -1){
      alert("Потрібен ключ для відкриття цього кейсу!");
      return;
    }
    // Видаляємо спочатку більший індекс
    if(keyIdx > idx){
      inventory.splice(keyIdx, 1);
      inventory.splice(idx, 1);
    } else if(keyIdx < idx){
      inventory.splice(idx, 1);
      inventory.splice(keyIdx, 1);
    } else {
      inventory.splice(idx, 1);
    }
  } else {
    // Звичайний кейс — видаляємо тільки кейс
    inventory.splice(idx, 1);
  }

  saveData();

  const finalDrop = dropFunc();
  animateCaseOpening(finalDrop, dropFunc, item.caseType);
}

function animateCaseOpening(finalDrop, dropFunc, caseType){
  const cfg = ANIM;
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2 style="font-weight:bold;">Відкриття ${getCaseName(caseType)}...</h2>
    <div id="roulette" style="overflow:hidden; width:${cfg.containerWidth}px; margin:20px auto; position:relative; background:#111; padding:12px; box-sizing:border-box; border:4px solid gold; border-radius:8px;">
      <div id="roulette-strip" style="display:flex; align-items:center; will-change:transform;"></div>
      <div style="position:absolute; top:0; bottom:0; left:50%; width:4px; background:rgba(255,0,0,0.9); transform:translateX(-50%);"></div>
    </div>
  `;

  const strip = document.getElementById("roulette-strip");
  const count = cfg.itemsCount;
  const centerIndex = Math.floor(count / 2);

  const pool = [];
  for(let i = 0; i < count; i++){
    pool.push(dropFunc());
  }
  pool[centerIndex] = finalDrop;

  pool.forEach(p => {
    const el = document.createElement("div");
    el.style.width = cfg.itemWidth + "px";
    el.style.flex = `0 0 ${cfg.itemWidth}px`;
    el.style.margin = `0 ${cfg.itemGap/2}px`;
    el.style.textAlign = "center";
    
    // Кольори за рідкістю
    let color;
    switch(p.rarity){
      case "Секретна": color = "red"; break;
      case "Епічна": color = "purple"; break;
      case "Виняткова": color = "deepskyblue"; break;
      default: color = "green"; // Звичайна
    }

    el.innerHTML = `<img src="img/${p.img}" width="${cfg.itemWidth-20}"><div style="font-weight:bold; color:${color}; margin-top:6px;">${p.name}</div>`;
    strip.appendChild(el);
  });

  strip.style.transform = `translateX(0px)`;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const step = cfg.itemWidth + cfg.itemGap;
      const targetX = -(centerIndex * step - (cfg.containerWidth/2 - cfg.itemWidth/2));
      strip.style.transition = `transform ${cfg.duration}ms ease-out`;
      strip.style.transform = `translateX(${targetX}px)`;
    });
  });

  strip.addEventListener('transitionend', function handler(){
    strip.removeEventListener('transitionend', handler);
    inventory.push(finalDrop);
    saveData();
    alert(`Ви отримали: ${finalDrop.name}`);
    showInventory();
  });

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
        <button onclick="startDinoPaid()" ${balance < 50 ? "disabled" : ""}>Динозаврик (50 нікусів)</button><br/><br/>
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
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:40px;">
            <div style="text-align:center;">
                <img src="img/FallPass25Button.png" alt="ScaryPass25" style="width:360px; cursor:pointer;" onclick="openScaryPass()" />
            </div>
            <div style="text-align:center; margin-top:50px;">
                <button style="padding:10px 20px; font-size:16px;" onclick="mainMenu()">Назад</button>
            </div>
        </div>
        <h3>Інше</h3>
        <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
            <button style="padding:10px 20px; font-size:16px;" onclick="showBlackMarket()">Чорний Ринок</button>
            <button style="padding:10px 20px; font-size:16px;" disabled>Fallpass25 </button>
            <button style="padding:10px 20px; font-size:16px;" onclick="openTasksMenu()">Завдання 🎯</button>
        </div>
    `;
}

function addBPS(amount){
    if(!currentUser) return;
    currentBPS += amount;
    localStorage.setItem(currentUser + "_bpPoints_scary", currentBPS);
    const el = document.getElementById("bpsCounter");
    if(el) el.textContent = currentBPS;
    return currentBPS;
}

const ScaryImages = {
  free: {
    1: "case_box_halloween.png",
    2: "money.png",
    3: "case_box_halloween.png",
    4: "case_halloween.png",
    5: "money.png",
    6: "case_autumn.png",
    7: "case_gift.png",
    8: "case_box_halloween.png",
    9: "case_box.png",
    10: "case_arcase.png",
    11: "money.png",
    12: "case_box.png",
    13: "case_halloween.png",
    14: "case_arcase.png",
    15: "case_gift.png",
    16: "case_kolek1.png",
    17: "case_box_halloween.png",
    18: "case_halloween.png",
    19: "case_gift.png",
    20: "case_halloween.png",
    21: "case_box_halloween.png",
    22: "case_kolek1.png",
    23: "case_halloween.png",
    24: "case_gift.png",
    25: "case_halloween_elite.png",
  },
  premium: {
    1: "case_halloween_elite.png",
    2: "money.png",
    3: "case_kolek1.png",
    4: "case_halloween.png",
    5: "money.png",
    6: "case_autumn.png",
    7: "case_gift.png",
    8: "case_halloween.png",
    9: "case_halloween.png",
    10: "money.png",
    11: "case_halloween.png",
    12: "case_halloween_elite.png",
    13: "money.png",
    14: "case_gift.png",
    15: "case_halloween.png",
    16: "case_halloween_elite.png",
    17: "case_kolek1.png",
    18: "money.png",
    19: "case_gift.png",
    20: "case_halloween.png",
    21: "case_kolek1.png",
    22: "case_arcase.png",
    23: "case_halloween.png",
    24: "case_gift.png",
    25: "case_halloween_elite.png",
  }
};


// ----------------- рівні Free Pass -----------------
const freePassLevels = [
  { level: 1, reward: "box_halloween", type: "item" },
  { level: 2, reward: 10, type: "coins" },
  { level: 3, reward: "box_halloween", type: "item" },
  { level: 4, reward: "halloween", type: "item" },
  { level: 5, reward: 20, type: "coins" },
  { level: 6, reward: "autumn", type: "item" },
  { level: 7, reward: "gift", type: "item" },
  { level: 8, reward: "box_halloween", type: "item" },
  { level: 9, reward: "box", type: "item" },
  { level: 10, reward: "arcase", type: "item"},
  { level: 11, reward: 50, type: "coins" },
  { level: 12, reward: "box", type: "item" },
  { level: 13, reward: "halloween", type: "item" },
  { level: 14, reward: "arcase", type: "item" },
  { level: 15, reward: "gift", type: "item" },
  { level: 16, reward: "kolek1", type: "item" },
  { level: 17, reward: "box_halloween", type: "item" },
  { level: 18, reward: "halloween", type: "item" },
  { level: 19, reward: "gift", type: "item" },
  { level: 20, reward: "halloween", type: "item" },
  { level: 21, reward: "box_halloween", type: "item" },
  { level: 22, reward: "kolek1", type: "item" },
  { level: 23, reward: "halloween", type: "item" },
  { level: 24, reward: "gift", type: "item" },
  { level: 25, reward: "halloween_elite", type: "item" }
];

const premiumPassLevels = [
  { level: 1, reward: "halloween_elite", type: "item" },
  { level: 2, reward: 20, type: "coins" },
  { level: 3, reward: "kolek1", type: "item" },
  { level: 4, reward: "halloween", type: "item" },
  { level: 5, reward: 50, type: "coins" },
  { level: 6, reward: "autumn", type: "item" },
  { level: 7, reward: "gift", type: "item" },
  { level: 8, reward: "halloween", type: "item" },
  { level: 9, reward: "halloween", type: "item" },
  { level: 10, reward: 100, type: "coins" },
  { level: 11, reward: "halloween", type: "item" },
  { level: 12, reward: "halloween_elite", type: "item" },
  { level: 13, reward: 150, type: "coins" },
  { level: 14, reward: "gift", type: "item" },
  { level: 15, reward: "halloween", type: "item" },
  { level: 16, reward: "halloween_elite", type: "item" },
  { level: 17, reward: "kolek1", type: "item" },
  { level: 18, reward: 200, type: "coins" },
  { level: 19, reward: "gift", type: "item" },
  { level: 20, reward: "halloween", type: "item" },
  { level: 21, reward: "kolek1", type: "item" },
  { level: 22, reward: "arcase", type: "item" },
  { level: 23, reward: "halloween", type: "item" },
  { level: 24, reward: "gift", type: "item" },
  { level: 25, reward: "halloween_elite", type: "item" },
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

const totalLevels = 25 ;
const bpsPerLevel = 1000;

// ----------------- зберігання прогресу -----------------

// claimed нагороди для ScaryPass
function saveClaimed(passType, level){
    if(!currentUser) return;
    const key = currentUser + "_bps_claimed_scary_" + passType;
    const claimed = JSON.parse(localStorage.getItem(key) || "{}");
    claimed[level] = true;
    localStorage.setItem(key, JSON.stringify(claimed));
}

function isClaimed(passType, level){
    if(!currentUser) return false;
    const key = currentUser + "_bps_claimed_scary_" + passType;
    const claimed = JSON.parse(localStorage.getItem(key) || "{}");
    return !!claimed[level];
}

// ----------------- відображення Pass -----------------
function openScaryPass () {
const endDate = new Date("2025-11-14"); // Кінець батл-пасу
    const now = new Date(); // Поточна дата

    if(now >= endDate) {
        alert("Батл-пас завершено! Ви більше не можете отримувати нагороди.");
        return;
    }

function loadScaryBPS(){
    if(!currentUser) return 0;
    currentBPS = parseInt(localStorage.getItem(currentUser + "_bpPoints_scary") || "0");
    const el = document.getElementById("bpsCounter");
    if(el) el.textContent = currentBPS;
    return currentBPS;
}

const container = document.getElementById("app");
    container.innerHTML = `
        <h2>🎟️ ScaryPass 25</h2>
        <div style="display:flex; justify-content:space-around; margin-bottom:10px;">
            <button onclick="showPass('free')">Free Pass</button>
    <button id="premiumBtn1" onclick="showPass('premium')" disabled title="Необхідно активувати Premium">Premium Pass</button>
           <button onclick="openEventsMenu()">Назад</button>
        </div>
        <div id="fallPassContainer" style="overflow-x:auto; white-space:nowrap; padding:10px; border:1px solid #ccc; border-radius:10px;"></div>
        <div style="margin-top:10px;">Ваші BP: <span id="bpsCounter">${currentBPS}</span></div>
    `;

      const btn = document.getElementById("premiumBtn1");
if (localStorage.getItem("scaryPremiumUnlocked") === "1" && btn){
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

       const locked = currentBPS < level.level * bpsPerLevel;
        const claimed = isClaimed(passType, level.level);
lvlDiv.style.backgroundColor = claimed ? "#4caf50" : "#EF8C00";
    const imgFile = ScaryImages[passType][level.level];
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
        alert("Потрібно більше BPS для цього рівня!");
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
    bpsPoints: 0,
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
  {id:51, description:"Отримати секретний предмет", reward:()=>addBPS(5000), check:()=> inventory.some(i=>["Ліларіла","Супермен","Мужик","Бомбордіро","Скелет","Тунг-Сахур","Тралалеро","Пепе","Крутий","Лавочка","Йогурт"].includes(i.name)), completed:false},
  {id:52, description:"Отримати предмет прямо з цеху", reward:()=>addBPS(1000), check:()=> inventory.some(i=>i.quality==="Прямо з цеху"), completed:false},
  {id:53, description:"Отримати предмет преміум", reward:()=>addBPS(1500), check:()=> inventory.some(i=>i.premium===true), completed:false},
  {id:54, description:"Накопичити 200 нікусів", reward:()=>addBPS(1500), check:()=> balance>=200, completed:false},
  {id:55, description:"Накопичити 100 нікусів", reward:()=>addBPS(1000), check:()=> balance>=100, completed:false},
{id:56, description:"Отримати Ждун або Троль", reward:()=>addBPS(1000), check:()=>inventory.some(i=>["Ждун","Троль"].includes(i.name)), completed:false},
{id:57, description:"Отримати ДикийОгірок або МастурБіст", reward:()=>addBPS(1500), check:()=>inventory.some(i=>["ДикийОгірок","МастурБіст"].includes(i.name)), completed:false},
{id:58, description:"Отримати Санс або РозумнаЛюдина", reward:()=>addBPS(2500), check:()=>inventory.some(i=>["Санс","РозумнаЛюдина"].includes(i.name)), completed:false},
  {id:68, description:"*Випити Живчик* Отримати Живчик", reward:()=>addBPS(2000), check:()=> inventory.some(i=>["Живчик"].includes(i.name)), completed:false},
{id:69,description:"*Списати з ГДЗ*, Отримати предмет ГДЗ з якістю преміум",reward:()=>addBPS(3000),check:()=>inventory.some(i=>i.premium&&i.name.includes("ГДЗ")),completed:false}

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
let openedCases = user.openedCases || {autumn:0, fallalt:0, autumnus:0, box_halloween:0, box:0, gift:0};

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
                10. Гра висміює будь-яку форму азартних ігор і не пропагує її.
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
  "RE9ESUsyNTBPS0FL": {type:"unlimited", reward:()=>{addBalance(250); alert("Отримано 250 нікусів!");}},
  "RkFMTE5BVDE0":{type:"unlimited",reward:()=>{addCase("fallalt");alert("Отримано кейс FallAlternative25!");}},
  "QVVUSFVNMTIzMTQ4OA==":{type:"unlimited",reward:()=>{addCase("autumnus");alert("Отримано кейс Autumnus25!");}},

"VU4xMDAwQlA=": {
    type: "unlimited", 
    reward: () => {
        addBPS(1000); // це оновить і змінну currentBPS, і лічильник
        alert("Отримано 1000 BPS!");
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

"QlROMUhQUkVN": {
    type: "unlimited",
    reward: () => {
        const btn = document.getElementById("premiumBtn1");
        if(btn){
            btn.disabled = false;
            btn.title = "";
        }
        // зберігаємо стан нового преміуму у localStorage
        localStorage.setItem("scaryPremiumUnlocked", "1");
        alert("🎉 Кнопка Premium Pass розблокована!");
    }
}

};

const blackMarket = {
  gift: { name: "Подарунковий кейс", price: 60, caseType: "gift" },
  arcase: { name: "Аркадний кейс", price:15, caseType: "arcase" },
  arcaseKey: { name: "Ключ від Аркадного кейсу", price:50, caseType: "arcase", isKey: true },
  box_halloween: { name: "Бокс Halloween25", price:55, caseType: "box_halloween" },
  kolek1: { name: "Осінній Колекціоний Кейс", price:100, caseType: "kolek1" }
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

  html += `</div><br/><button onclick="mainMenu()">Назад в меню</button>`;

  document.getElementById("app").innerHTML = html;
}

window.onload = () => {
  loginScreen();
};
