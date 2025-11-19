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
let goldapple = 0;
let garbuz = 0;
let corn = 0;
let sunflower = 0;
let inventory = [];
let usedPromos = [];
let blockedItems = new Set();
let water = 0;
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
    
  localStorage.setItem(currentUser + "_water",water);
  localStorage.setItem(currentUser + "_goldapple", goldapple);
  localStorage.setItem(currentUser + "_corn", corn);
  localStorage.setItem(currentUser + "_garbuz", garbuz);
  localStorage.setItem(currentUser + "_sunflower", sunflower);

localStorage.setItem(currentUser + "_inventory", JSON.stringify(inventory));
  localStorage.setItem(currentUser + "_usedPromos", JSON.stringify(usedPromos));
  localStorage.setItem(currentUser + "_blockedItems", JSON.stringify(Array.from(blockedItems)));
  localStorage.setItem(currentUser + "_bpwPoints", currentBPW);
}

  let currentBPW = 0;

  function loadData() {
  if (!currentUser) return;
  balance = parseInt(localStorage.getItem(currentUser + "_balance")) || 0;
  nikus = parseInt(localStorage.getItem(currentUser + "_nikus")) || 0;
  OPEX = parseInt(localStorage.getItem(currentUser + "_OPEX")) || 0;
  

water = parseInt(localStorage.getItem(currentUser + "_water")) || 0;
sunflower = parseInt(localStorage.getItem(currentUser + "_sunflower")) || 0;
garbuz = parseInt(localStorage.getItem(currentUser + "_garbuz")) || 0;
corn = parseInt(localStorage.getItem(currentUser + "_corn")) || 0;
goldapple = parseInt(localStorage.getItem(currentUser + "_goldapple")) || 0;

inventory = JSON.parse(localStorage.getItem(currentUser + "_inventory")) || [];
  xcoin = parseInt(localStorage.getItem(currentUser + "_xcoin")) || 0;
  usedPromos = JSON.parse(localStorage.getItem(currentUser + "_usedPromos")) || [];
  blockedItems = new Set(JSON.parse(localStorage.getItem(currentUser + "_blockedItems")) || []);
  currentBPW = parseInt(localStorage.getItem(currentUser + "_bpwPoints")) || 0;

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
  nikus = 0;
  xcoin = 0;
  OPEX = 0;
  goldapple = 0;
  garbuz = 0;
  corn = 0;
  sunflower = 0;
  currentBPW = 0;
  water = 0;
  inventory = [];
  usedPromos = [];
  blockedItems.clear();

  loginScreen();
}


function mainMenu() {
  saveData();
  let promoCodeToShow = "GIFT123";

  let html = `
    <!-- Верхня PNG-шапка -->
    <div style="text-align:center; position:relative; top:-105px;">
      <img src="img/top-banner.png" alt="Шапка меню"
           style="width:80%; max-width:480px; filter:drop-shadow(0 4px 8px rgba(0,0,0,0.35));">
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

      <h2 style="text-align:center; margin:0; 
          font-size:26px; font-weight:700;">Вітаю, ${currentUser}</h2>

      <p style="text-align:center; margin:4px 0 20px 0;
         font-size:17px; font-weight:500;">
         Баланс: <span style="font-weight:700; color:#ffe14d;">${balance}</span> нікусів
      </p>

      <div style="
        display:grid;
        grid-template-columns: 1fr 1fr;
        gap:12px;
      ">
        <button onclick="shopMenu()" class="menuButton">🛒 Магазин</button>
        <button onclick="promoMenu()" class="menuButton">🎁 Промокод</button>

        <button onclick="openEventsMenu()" class="menuButton">🎟️ Івенти</button>
        <button onclick="MenuGarden()" class="menuButton">🌿 Сад</button>

        <button onclick="showInventory()" class="menuButton">
          🎒 Інвентар (${inventory.length})
        </button>
        <button onclick="arcadeMenu()" class="menuButton">🎮 Міні-ігри</button>

        <button onclick="accountMenu()" class="menuButton">⚙️ Акаунт</button>
        <button onclick="MenuBank()" class="menuButton">🏦 Банк</button>

        <button onclick="logout()" class="menuButton" 
          style="grid-column:1/3; background:#ff4c4c;">
          🚪 Вийти
        </button>
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
}

function shopMenu() {
  const shopItems = [
    { name: "Кейс Зима25", price: 40, img: "case_wint25.png", type: "wint25" },
    { name: "Бокс Зима25", price: 30, img: "case_wint25box.png", type: "wint25box" },
    { name: "Різдвяний Кейс", price: 60, img: "case_wint25gift.png", type: "wint25gift" },   
    { name: "Winter Dreams", price: 100, img: "case_WDGASTER.png", type: "WDGASTER" },
    { name: "Winter Dreams box", price: 55, img: "case_WDGASTERbox.png", type: "WDGASTERbox" },   
    { name: "Зимовий Колекційний Кейс", price: 80, img: "case_kolek2.png", type: "kolek2" },
    { name: "Кейс з насінням 1", price: 200, img: "case_NN.png", type: "NN" },
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
      keyType: caseType
    });
  }
  localStorage.setItem("inventory",JSON.stringify(inventory));
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
  if(type === "box") return "Бокс Осінь25";
  if(type === "gift") return "Подарунковий кейс";
  if(type === "fallalt") return "FallAlternative25";
  if(type === "autumnus") return "Autumnus25";
  if(type === "harvest") return "Harvest25"; 
  if(type === "arcase") return "ArcadeCase";
  if(type === "halloween") return "Halloween25";
  if(type === "halloween_elite") return "Halloween25 Elite";
  if(type === "box_halloween") return "BoxHalloween25"; 
  if(type === "wint25") return "Зима25"; 
  if(type === "wint25box") return "Бокс Зима25"; 
  if(type === "NN") return "Кейс з насінням 1"; 
if(type === "WDGASTER") return "Winter Dreams"; 
if(type === "WDGASTERbox") return "Winter Dreams box"; 
if(type === "wint25gift") return "Різдвяний Подарунок"; 
if(type === "kolek1") return "Осінній Колекційний Кейс"; 
if(type === "kolek2") return "Зимовий Колекційний Кейс"; 

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
    case "wint25": dropFunc = dropwint25Case; break;
    case "WDGASTERbox": dropFunc = dropWDGASTERboxCase; break;   
    case "WDGASTER": dropFunc = dropWDGASTERCase; break;
    case "wint25box": dropFunc = dropwint25boxCase; break;
    case "wint25gift": dropFunc = dropWint25GiftCase; break;
    case "kolek1": dropFunc = dropkolek1case; break;
    case "NN": dropFunc = dropNNcase; break;
   case "kolek2": dropFunc = dropkolek2case; break;
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
      case "Спеціальна": color = "yellow"; break;  
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

{name:"Втікай", img:"V.png", rarity:"Секретна", chance:0.01},
{name:"Хомʼяк", img:"H.png", rarity:"Секретна", chance:0.01},
{name:"Котик", img:"K.png", rarity:"Секретна", chance:0.01},

{name:"КимЧенДрин", img:"KD.png", rarity:"Епічна", chance:0.0567},
{name:"Окак", img:"OKAK.png", rarity:"Епічна", chance:0.0567},
{name:"Кіт-Борщ", img:"B.png", rarity:"Епічна", chance:0.0567},

{name:"Людина", img:"L.png", rarity:"Виняткова", chance:0.1167},
{name:"ОБЛЯТЬ", img:"OBL.png", rarity:"Виняткова", chance:0.1167},
{name:"Привіт,Друже", img:"PR.png", rarity:"Виняткова", chance:0.1167},

{name:"Попугайчик", img:"PP.png", rarity:"Звичайна", chance:0.15},
{name:"Сумно", img:"S.png", rarity:"Звичайна", chance:0.15},
{name:"1487", img:"1487.png", rarity:"Звичайна", chance:0.15}

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
                     onclick="openWinterPass()" />
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

function addBPW(amount){
    if(!currentUser) return;
    currentBPW += amount;
    localStorage.setItem(currentUser + "_bpPoints_winter", currentBPW);
    const el = document.getElementById("bpwCounter");
    if(el) el.textContent = currentBPW;
    return currentBPW;
}

const WinterImages = {
  free: {
    1: "case_WDGASTERbox.png",   
    2: "money.png",              
    3: "case_wint25gift.png",     // wint25gift
    4: "case_wint25.png",         // wint25
    5: "money.png",               // 20 coins
    6: "case_arcase.png",         // arcase
    7: "case_wint25gift.png",     // wint25gift
    8: "case_NN.png",      // wint25box
    9: "case_kolek2.png",         // kolek2
    10: "case_wint25.png",        // wint25
    11: "money.png",              // 50 coins
    12: "case_WDGASTERbox.png",      // WDGASTER
    13: "case_WDGASTERbox.png",        // wint25
    14: "case_wint25box.png",     // wint25box
    15: "case_WDGASTER.png",    // wint25gift
    16: "case_arcase.png",        // arcase
    17: "case_wint25box.png",     // wint25box
    18: "case_WDGASTER.png",      // WDGASTER
    19: "case_wint25gift.png",    // wint25gift
    20: "case_arcase.png",        // arcase
    21: "case_wint25box.png",     // wint25box
    22: "case_kolek2.png",        // kolek2
    23: "case_wint25gift.png",    // wint25gift
    24: "case_WDGASTERbox.png",        // wint25
    25: "case_WDGASTER.png"       // WDGASTER
  },
  premium: {
    1: "case_WDGASTER.png",       // WDGASTER
    2: "money.png",               // 20 coins
    3: "case_kolek2.png",         // kolek2
    4: "case_wint25.png",         // wint25
    5: "money.png",               // 50 coins
    6: "case_WDGASTER.png",      // wint25box
    7: "case_wint25gift.png",     // wint25gift
    8: "case_wint25.png",         // wint25
    9: "case_kolek2.png",         // kolek2
    10: "money.png",              // 100 coins
    11: "case_arcase.png",        // arcase
    12: "case_WDGASTER.png",   // WDGASTER
    13: "money.png",              // 150 coins
    14: "case_wint25gift.png",    // wint25gift
    15: "case_kolek2.png",        // kolek2
    16: "case_WDGASTER.png",      // WDGASTER
    17: "case_arcase.png",        // arcase
    18: "money.png",              // 200 coins
    19: "case_wint25gift.png",    // wint25gift
    20: "case_wint25.png",        // wint25
    21: "case_WDGASTER.png",   // WDGASTER
    22: "case_kolek2.png",        // kolek2
    23: "case_arcase.png",        // arcase
    24: "case_NN.png",    // wint25gift
    25: "case_WDGASTER.png"       // WDGASTER
  }
};

// ----------------- 🎄 Winter Pass 2025 (Free) -----------------
const freePassLevels = [
  { level: 1, reward: "WDGASTERbox", type: "item" },
  { level: 2, reward: 10, type: "coins" },
  { level: 3, reward: "wint25gift", type: "item" },
  { level: 4, reward: "wint25", type: "item" },
  { level: 5, reward: 20, type: "coins" },
  { level: 6, reward: "arcase", type: "item" },
  { level: 7, reward: "wint25gift", type: "item" },
  { level: 8, reward: "NN", type: "item" },
  { level: 9, reward: "kolek2", type: "item" },
  { level: 10, reward: "wint25", type: "item"},
  { level: 11, reward: 50, type: "coins" },
  { level: 12, reward: "WDGASTERbox", type: "item" },
  { level: 13, reward: "WDGASTERbox", type: "item" },
  { level: 14, reward: "wint25box", type: "item" },
  { level: 15, reward: "WDGASTER", type: "item" },
  { level: 16, reward: "arcase", type: "item" },
  { level: 17, reward: "wint25box", type: "item" },
  { level: 18, reward: "WDGASTER", type: "item" },
  { level: 19, reward: "wint25gift", type: "item" },
  { level: 20, reward: "arcase", type: "item" },
  { level: 21, reward: "wint25box", type: "item" },
  { level: 22, reward: "kolek2", type: "item" },
  { level: 23, reward: "wint25gift", type: "item" },
  { level: 24, reward: "WDGASTERbox", type: "item" },
  { level: 25, reward: "WDGASTER", type: "item" }
];


// ----------------- ❄️ Winter Pass 2025 (Premium) -----------------
const premiumPassLevels = [
  { level: 1, reward: "WDGASTER", type: "item" },
  { level: 2, reward: 20, type: "coins" },
  { level: 3, reward: "kolek2", type: "item" },
  { level: 4, reward: "wint25", type: "item" },
  { level: 5, reward: 50, type: "coins" },
  { level: 6, reward: "WDGASTER", type: "item" },
  { level: 7, reward: "wint25gift", type: "item" },
  { level: 8, reward: "wint25", type: "item" },
  { level: 9, reward: "kolek2", type: "item" },
  { level: 10, reward: 100, type: "coins" },
  { level: 11, reward: "arcase", type: "item" },
  { level: 12, reward: "WDGASTER", type: "item" },
  { level: 13, reward: 150, type: "coins" },
  { level: 14, reward: "wint25gift", type: "item" },
  { level: 15, reward: "kolek2", type: "item" },
  { level: 16, reward: "WDGASTER", type: "item" },
  { level: 17, reward: "arcase", type: "item" },
  { level: 18, reward: 200, type: "coins" },
  { level: 19, reward: "wint25gift", type: "item" },
  { level: 20, reward: "wint25", type: "item" },
  { level: 21, reward: "WDGASTER", type: "item" },
  { level: 22, reward: "kolek2", type: "item" },
  { level: 23, reward: "arcase", type: "item" },
  { level: 24, reward: "NN", type: "item" },
  { level: 25, reward: "WDGASTER", type: "item" },
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
const bpwPerLevel = 1000;

// ----------------- зберігання прогресу -----------------

// claimed нагороди 
function saveClaimed(passType, level){
    if(!currentUser) return;
    const key = currentUser + "_bpw_claimed_winter_" + passType;
    const claimed = JSON.parse(localStorage.getItem(key) || "{}");
    claimed[level] = true;
    localStorage.setItem(key, JSON.stringify(claimed));
}

function isClaimed(passType, level){
    if(!currentUser) return false;
    const key = currentUser + "_bpw_claimed_winter_" + passType;
    const claimed = JSON.parse(localStorage.getItem(key) || "{}");
    return !!claimed[level];
}

// ----------------- відображення Pass -----------------
function openWinterPass () {
const endDate = new Date("2026-01-14"); // Кінець батл-пасу
    const now = new Date(); // Поточна дата

    if(now >= endDate) {
        alert("Батл-пас завершено! Ви більше не можете отримувати нагороди.");
        return;
    }

function loadWinterBPW(){
    if(!currentUser) return 0;
    currentBPW = parseInt(localStorage.getItem(currentUser + "_bpPoints_winter") || "0");
    const el = document.getElementById("bpwCounter");
    if(el) el.textContent = currentBPW;
    return currentBPW;
}

const container = document.getElementById("app");
    container.innerHTML = `
        <h2>🎟️ Winter Dreams </h2>
        <div style="display:flex; justify-content:space-around; margin-bottom:10px;">
            <button onclick="showPass('free')">Free Pass</button>
    <button id="premiumBtn1Winter" onclick="showPass('premium')" disabled title="Необхідно активувати Premium">Premium Pass</button>
           <button onclick="openEventsMenu()">Назад</button>
        </div>
        <div id="fallPassContainer" style="overflow-x:auto; white-space:nowrap; padding:10px; border:1px solid #ccc; border-radius:10px;"></div>
        <div style="margin-top:10px;">Ваші BP: <span id="bpwCounter">${currentBPW}</span></div>
    `;

      const btn = document.getElementById("premiumBtn1Winter");
if (localStorage.getItem("premiumBtn1Winter") === "1" && btn){
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

       const locked = currentBPW < level.level * bpwPerLevel;
        const claimed = isClaimed(passType, level.level);
       lvlDiv.style.backgroundColor = claimed ? "#7FE1FF" : "#2E8BC0"; 
    const imgFile = WinterImages[passType][level.level];
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
        alert("Потрібно більше BPW для цього рівня!");
    } else if (nowClaimed){
        alert("Ви вже забрали цю нагороду!");
    }
};
        container.appendChild(lvlDiv);
    });
}

function openTasksMenu() {
    if (!currentUser) return alert("Спочатку увійдіть в акаунт");

    checkTasks();

    const container = document.getElementById("app");

    let tasksHTML = tasks.map(t => {
        return `
            <div style="
                padding:14px;
                margin-bottom:8px;
                border-radius:8px;
                background: ${t.completed ? '#64C466' : '#C84A4A'};
                color:#fff;
                font-size:17px;
                font-weight:600;
                box-shadow:0 4px 12px rgba(0,0,0,0.25);
                display:flex;
                align-items:center;
                gap:10px;
            ">
                <span style="font-size:20px;">${t.completed ? '✔' : '✖'}</span>
                <span>${t.description}</span>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <h2 style="text-align:center; margin-bottom:20px; font-size:28px;">🎯 Завдання</h2>
        <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
            ${tasksHTML}
        </div>
        <button 
            style="
                padding:12px 22px;
                font-size:18px;
                border-radius:8px;
                background:#D49F37;
                color:#fff;
                border:none;
                cursor:pointer;
                font-weight:600;
                box-shadow:0 4px 12px rgba(0,0,0,0.25);
            "
            onclick="openEventsMenu()"
        >⬅ Назад до Івентів</button>
    `;
}

let user = {
    balance: 0,
    bpwPoints: 0,
    openedCases: {},
    items: [],
    secretBills: 0
};

function loadUser() {
    const data = localStorage.getItem("userData");
    if (data) {
        user = JSON.parse(data);
        user.balance = user.balance || 0;
        user.bpwPoints = user.bpwPoints || 0;
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
  {id:101, description:"Отримати секретний предмет", reward:()=>addBPW(5000), check:()=> inventory.some(i=>["Ліларіла","Супермен","Мужик","Бомбордіро","Скелет","Тунг-Сахур","Тралалеро","Пепе","Крутий","Лавочка","Йогурт","Котик","Втікай","Хомʼяк","Стонкс","Містер Пропер"].includes(i.name)), completed:false},
  {id:102, description:"Отримати предмет прямо з цеху", reward:()=>addBPW(1500), check:()=> inventory.some(i=>i.quality==="Прямо з цеху"), completed:false},
  {id:103, description:"Накопичити 200 нікусів", reward:()=>addBPW(1200), check:()=> balance>=200, completed:false},
  {id:104, description:"Накопичити 100 нікусів", reward:()=>addBPW(1000), check:()=> balance>=100, completed:false},
  {id:105, description:"Отримати предмет преміум", reward:()=>addBPW(1800), check:()=> inventory.some(i=>i.premium===true), completed:false},
  {id:106, description:"Отримати І що або Нон-стонкс", reward:()=>addBPW(1200), check:()=>inventory.some(i=>["І що?","нот-стонкс"].includes(i.name)), completed:false},
  {id:107, description:"Отримати Белуга або Том", reward:()=>addBPW(1500), check:()=>inventory.some(i=>["Белуга","Том"].includes(i.name)), completed:false},
  {id:108, description:"Отримати Попугай-а або Надрозум", reward:()=>addBPW(2200), check:()=>inventory.some(i=>["Попугай-а","Надрозум"].includes(i.name)), completed:false},
  {id:109, description:"Отримати 1487 або Сумно або Попугайчик", reward:()=>addBPW(1200), check:()=>inventory.some(i=>["1487","Сумно","Попугайчик"].includes(i.name)), completed:false},
  {id:110, description:"Отримати Облять або Привіт,Друже або Людина", reward:()=>addBPW(1800), check:()=>inventory.some(i=>["Облять","Привіт,Друже","Людина"].includes(i.name)), completed:false},
  {id:111, description:"Отримати Кіт-борщ або КимЧенДрин або Окак", reward:()=>addBPW(2200), check:()=>inventory.some(i=>["Кіт-борщ","КимЧенДрин","Окак"].includes(i.name)), completed:false},
  {id:112, description:"*Наркобарон* — вибити Крейду", reward:()=>addBPW(1500), check:()=>inventory.some(i=>["Крейда"].includes(i.name)), completed:false},
  {id:113, description:"*Біолог* — вибити Мʼяту", reward:()=>addBPW(2000), check:()=>inventory.some(i=>["Мʼята"].includes(i.name)), completed:false},
  {id:114, description:"*Архіваріус* — вибити Зошит", reward:()=>addBPW(1800), check:()=>inventory.some(i=>["Зошит"].includes(i.name)), completed:false},
  {id:115, description:"*Пекар* — вибити Хліб", reward:()=>addBPW(1200), check:()=>inventory.some(i=>["Хліб"].includes(i.name)), completed:false}
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
  "RE9ESUsxMjNTT0JBS0E=": {type:"unlimited", reward:()=>{addBalance(250); alert("Отримано 250 нікусів!");}},
  "RkFMTE5BVDE0":{type:"unlimited",reward:()=>{addCase("fallalt");alert("Отримано кейс FallAlternative25!");}},
  "QVVUSFVNMTIzMTQ4OA==":{type:"unlimited",reward:()=>{addCase("autumnus");alert("Отримано кейс Autumnus25!");}},
  "R0lGVDEyMw==": {type:"once", reward:()=>{addCase("wint25gift"); alert("Отримано Різдвяний Подарунок!");}},

"VU4xMDAwQlA=": {
    type: "unlimited", 
    reward: () => {
        addBPW(1000); // це оновить і змінну currentBPS, і лічильник
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

"UFJFTUlVTTEyMw==": {
    type: "unlimited",
    reward: () => {
        const btn = document.getElementById("premiumBtn1Winter");
        if(btn){
            btn.disabled = false;
            btn.title = "";
        }
        // зберігаємо стан нового преміуму у localStorage
        localStorage.setItem("premiumBtn1Winter", "1");
        alert("🎉 Кнопка Premium Pass розблокована!");
    }
}

};

// ==================== 🎁 Starter Pass ====================
const starterRewards = [
  { day: 1, reward: "wint25box", type: "item" },
  { day: 2, reward: "wint25", type: "item" },
  { day: 3, reward: "wint25gift", type: "item" },
  { day: 4, reward: "kolek2", type: "item" },
  { day: 5, reward: "WDGASTERbox", type: "item" },
  { day: 6, reward: "WDGASTER", type: "item" },
  { day: 7, reward: "wint25gift", type: "item" }
];

function MenuStarterPass() {
  if (!currentUser) return;

  const container = document.getElementById("app");

  let lastClaim = localStorage.getItem(currentUser + "_starter_lastClaim") || "";
  let dayIndex = parseInt(localStorage.getItem(currentUser + "_starter_index") || "0");
  let modalShown = localStorage.getItem(currentUser + "_starter_modalShown") === "true";

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
    <div class="headerBar" style="display:flex; align-items:center; padding:8px 12px; background:#b7e9ff; border-radius:8px;">
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
      border:2px solid #8fd3ff;
      padding:6px;
      border-radius:10px;
      background:${claimed ? "#C9F6FF" : "#2E8BC0"};
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
      lastClaim = today;
      localStorage.setItem(currentUser + "_starter_lastClaim", today);
      localStorage.setItem(currentUser + "_starter_index", r.day);
      addCase(r.reward);
      MenuStarterPass();
    });

    row.appendChild(box);
  });

  // Таймер
  function tick() {
    document.getElementById("starterTimer").textContent =
      "⏱ До наступної нагороди: " + format(next - new Date());
    requestAnimationFrame(tick);
  }
  tick();

  // Модалка, тільки 1 раз
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
          <p>Це Starter Pass — він для всіх нових гравців. Забирай нагороди щодня!</p>
          <button id="closeStarterModal" style="margin-top:12px;">Гаразд!</button>
        </div>
      </div>
    `;
    document.getElementById("closeStarterModal").onclick = () => {
      document.getElementById("starterModal").remove();
      localStorage.setItem(currentUser + "_starter_modalShown", "true");
    };
  }
}
function startSnowfall() {
  const snowflakeCount = 30; // ❄️ кількість сніжинок за "покоління"
  const symbols = ["❄️", "✻", "❅", "❆"]; // різні форми сніжинок

  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    // Випадкові позиції та параметри
    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.fontSize = 10 + Math.random() * 16 + "px";
    snowflake.style.opacity = (0.6 + Math.random() * 0.4).toFixed(2);
    snowflake.style.animationDuration = 4 + Math.random() * 6 + "s";
    snowflake.style.animationDelay = Math.random() * 3 + "s";

    document.body.appendChild(snowflake);

    // Видаляємо після завершення падіння
    setTimeout(() => snowflake.remove(), 10000);
  }

  // Перший запуск — створюємо одразу кілька сніжинок
  for (let i = 0; i < snowflakeCount; i++) {
    createSnowflake();
  }

  // Додаємо нові сніжинки періодично
  setInterval(() => {
    createSnowflake();
  }, 500);
}

// ⛄ Запускаємо після завантаження сторінки
window.addEventListener("load", startSnowfall);

// ==================== 🌾 ПОЛЕ ДЛЯ ВИРОЩУВАННЯ ====================
function MenuGarden() {
  saveData?.();

  const container = document.getElementById("app");
  if (!container) return;

  inventory = JSON.parse(localStorage.getItem(currentUser + "_inventory") || "[]");
  inventory2 = JSON.parse(localStorage.getItem("inventory2") || "{}");

  let garden = JSON.parse(localStorage.getItem(currentUser + "_garden") || "[]");
  if (!garden || garden.length !== 16) {
    garden = Array(16).fill(null);
    localStorage.setItem(currentUser + "_garden", JSON.stringify(garden));
  }

  let html = `
    <h2>🌿 Сад ${currentUser}</h2>
    <p>Вирощуй, поливай, збирай кеш або видаляй рослини 🌱</p>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;text-align:center;">
      ${renderSeedBox("Гарбуз", "G1")}
      ${renderSeedBox("Буде-ПопКорн", "G2")}
      ${renderSeedBox("Соняшник", "G3")}
      ${renderSeedBox("Золоте-Дерево", "G4")}
    </div>

    <h3 style="margin-top:20px;">🌾 Твоя грядка</h3>
    <div id="gardenField" 
      style="display:grid;grid-template-columns:repeat(4,80px);gap:5px;justify-content:center;">
      ${garden.map((plant, i) => renderPlot(plant, i)).join("")}
    </div>

    <br><button onclick="mainMenu()">⬅️ Назад</button>

    <div id="seedSelector" 
         style="display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
         background:#222;border:3px solid gold;padding:15px;border-radius:10px;color:#fff;z-index:999;">
      <h3>🌱 Вибери насіння</h3>
      <div id="seedOptions"></div>
      <br><button onclick="closeSeedSelector()">❌ Закрити</button>
    </div>

    <div id="plantActions"
         style="display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
         background:#222;border:3px solid gold;padding:15px;border-radius:10px;color:#fff;z-index:1000;">
    </div>
  `;

  container.innerHTML = html;
}

// ==================== 🪴 РЕНДЕР ПОЛЯ ====================
function renderPlot(plant, index) {
  if (!plant) {
    return `<div onclick="showSeedSelector(${index})" 
              style="width:80px;height:80px;border:2px dashed #555;background:#111;cursor:pointer;">
              <img src="img/soil.png" style="width:100%;height:100%;opacity:0.2;">
            </div>`;
  }

  const img = plant.stage === 1 ? plant.smallImg : plant.fullImg;
  return `<div onclick="showPlantActions(${index})" 
            style="width:80px;height:80px;border:2px solid gold;background:#000;cursor:pointer;position:relative;">
            <img src="img/${img}" style="width:100%;height:100%;object-fit:contain;">
          </div>`;
}

// ==================== 🌾 ДІЇ З РОСЛИНОЮ ====================
function showPlantActions(index) {
  let garden = JSON.parse(localStorage.getItem(currentUser + "_garden") || "[]");
  const plant = garden[index];
  if (!plant) return;

  const windowEl = document.getElementById("plantActions");
  const now = Date.now();

  if (plant.stage === 1 && plant.nextStageTime && plant.nextStageTime <= now) {
    plant.stage = 2;
    delete plant.nextStageTime;
    garden[index] = plant;
    localStorage.setItem(currentUser + "_garden", JSON.stringify(garden));
  }

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
      <button onclick="waterPlant(${index})" style="padding:8px 12px;margin:5px;background:deepskyblue;border:none;border-radius:5px;cursor:pointer;">💧 Полити</button>
      <button onclick="removePlant(${index})" style="padding:8px 12px;margin:5px;background:crimson;border:none;border-radius:5px;cursor:pointer;">❌ Видалити</button>
      ${growthText}
      <br><button onclick="closePlantActions()">Закрити</button>
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
      <button onclick="harvest(${index})" ${canHarvest ? "" : "disabled"} style="padding:8px 12px;margin:5px;background:${canHarvest ? 'limegreen' : 'gray'};border:none;border-radius:5px;color:#fff;cursor:${canHarvest ? 'pointer' : 'default'};">💰 Зібрати кеш</button>
      ${timerText}
      <button onclick="removePlant(${index})" style="padding:8px 12px;margin:5px;background:crimson;border:none;border-radius:5px;cursor:pointer;">❌ Видалити</button>
      <br><button onclick="closePlantActions()">Закрити</button>
    `;
  }

  windowEl.innerHTML = html;
  windowEl.style.display = "block";
}

function closePlantActions() {
  document.getElementById("plantActions").style.display = "none";
}

// ==================== 💧 ПОЛИВ ====================
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

// ==================== 💰 ЗБІР КЕШУ ====================
function harvest(index) {
  let garden = JSON.parse(localStorage.getItem(currentUser + "_garden") || "[]");
  if (!garden[index]) return;
  const plant = garden[index];

  let reward = 0, recharge = 0;
  switch (plant.name) {
    case "Гарбуз": reward=5; recharge=24*60*60*1000; break;
    case "Буде-ПопКорн": reward=5; recharge=12*60*60*1000; break;
    case "Соняшник": reward=12.5; recharge=24*60*60*1000; break;
    case "Золоте-Дерево": reward=25; recharge=24*60*60*1000; break;
  }

  const now = Date.now();
  if (plant.nextHarvest && plant.nextHarvest > now) {
    alert("⏳ Рослина ще відпочиває після збору!");
    return;
  }

  balance = parseFloat(localStorage.getItem(currentUser + "_balance") || "0");
  balance += reward;
  localStorage.setItem(currentUser + "_balance", balance.toFixed(2));

  plant.nextHarvest = now + recharge;
  garden[index] = plant;
  localStorage.setItem(currentUser + "_garden", JSON.stringify(garden));

  alert(`💰 Ти зібрав ${reward} нікусів з ${plant.name}!`);
  closePlantActions();
  MenuGarden();
}

// ==================== ❌ ВИДАЛЕННЯ РОСЛИНИ ====================
function removePlant(index) {
  let garden = JSON.parse(localStorage.getItem(currentUser + "_garden") || "[]");
  if (!garden[index]) { closePlantActions(); return; }
  garden[index] = null;
  localStorage.setItem(currentUser + "_garden", JSON.stringify(garden));
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
  if (!keys.length) { alert("У тебе немає насіння для посадки!"); return; }

  const selector = document.getElementById("seedSelector");
  const options = document.getElementById("seedOptions");

  options.innerHTML = keys.map(k => `
    <button onclick="plantSeed(${index}, '${k}')" style="display:block;margin:5px auto;padding:8px 12px;background:gold;border:none;border-radius:5px;cursor:pointer;">
      🌱 Посадити ${k} (${seeds[k]} шт)
    </button>
  `).join("");

  selector.style.display = "block";
}

function closeSeedSelector() { document.getElementById("seedSelector").style.display = "none"; }

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
  saveData?.();
  const container = document.getElementById("app");
  if (!container) return;

  const priceX = prices?.xcoin || 0;
  const priceO = prices?.oreh || 0;

  container.innerHTML = `
    <h2>🏦 Банк ${currentUser || ""}</h2>

    <div style="display:flex; flex-wrap:wrap; gap:20px; justify-content:center;">
      <div id="balancesBox"
           style="flex:1; min-width:250px; padding:15px; border-radius:12px;
                  background:rgba(190,220,255,0.55); box-shadow:0 0 15px rgba(120,200,255,0.3);">
        ${getBalanceHTML()}
      </div>

      <div style="flex:1; min-width:250px; padding:15px; border-radius:12px;
                  background:rgba(190,220,255,0.55); box-shadow:0 0 15px rgba(120,200,255,0.3);">
        <h3>📈 Курси сьогодні</h3>
        <p>1 XCoin = <b>${priceX}</b> нік</p>
        <p>1 OPEX = <b>${priceO}</b> нік</p>
        <p>Дата оновлення: ${new Date().toLocaleDateString()}</p>
      </div>
    </div>

    <div style="flex:1; min-width:250px; padding:15px; margin-top:20px; border-radius:12px;
                background:rgba(190,220,255,0.55); box-shadow:0 0 15px rgba(120,200,255,0.3); text-align:center;">
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

    <div style="margin-top:20px; text-align:center;">
      <h3>📲 QR-операції</h3>
      <button onclick="startBankQRScanner()">Сканувати QR</button>
    </div>

    <div style="margin-top:25px; text-align:center;">
      <button onclick="mainMenu()">⬅️ Назад</button>
    </div>

  <!-- === Донат кнопки === -->

<div style="flex:1; min-width:250px; padding:15px; margin-top:20px; border-radius:12px;
            background: rgba(220,235,255,0.8); box-shadow:0 0 15px rgba(120,200,255,0.3); text-align:center;">
  <h3>💎 Купити ігрові нікуси</h3>
  <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; margin-top:10px;">
    <img src="img/Buy50Balance.png" style="width:100%; cursor:pointer; border-radius:8px;" onclick='buyBalanceAndUpdate(50, 12.5)' />
    <img src="img/Buy100Balance.png" style="width:100%; cursor:pointer; border-radius:8px;" onclick='buyBalanceAndUpdate(100, 25)' />
    <img src="img/Buy250Balance.png" style="width:100%; cursor:pointer; border-radius:8px;" onclick='buyBalanceAndUpdate(250, 50)' />
    <img src="img/Buy500Balance.png" style="width:100%; cursor:pointer; border-radius:8px;" onclick='buyBalanceAndUpdate(500, 100)' />
  </div>
</div>

`;

// ✅ Оновлення після покупки
  window.buyBalanceAndUpdate = function(amount, cost) {
    const beforeNikus = nikus;
    const beforeBalance = balance;

    buyBalance(amount, cost); // робимо покупку

    // якщо покупка відбулась — оновлюємо лише блок балансів
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
  { id: "pack_wd1", name: "Winter Dreams 1", price: 600, low: 275 },        // 600/4=150, 275/4=69
  { id: "pack_wd2", name: "Winter Dreams 2", price: 800, low: 360 },        // 800/4=200, 360/4=90
  { id: "pack_donate", name: "Донатний пакет", price: 12, low: 6 }         // 16/4=4
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
    const price = (p.id === "pack_donate") ? 15 : Math.floor((useNormal ? p.price : p.low)/4);
    return {
      id: p.id,
      name: p.name,
      price: price,
      wasPrice: (p.id === "pack_donate") ? 12 : Math.floor(p.price/4),
      lowPrice: (p.id === "pack_donate") ? 6 : Math.floor(p.low/4),
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
      <div style="margin-top:6px; font-size:20px; font-weight:900; color:#a6ff6a;">20 💰</div>
      <button onclick="buySalePack('buy_bpw', 20)" style="
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
    case "pack_wd1": 
      addCase("WDGASTERbox", 5); 
      addCase("WDGASTER", 5); 
      break;
    case "pack_wd2": 
      addCase("WDGASTER", 10); 
      break;
    case "pack_donate": 
      balance += 100; 
      break;
    case "buy_water":
      if (typeof water !== "number") water = 0;
      water += 1;
      break;
    case "buy_bpw":
      if (typeof BPW !== "number") BPW = 0;
      addBPW(1000);
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

window.onload = () => {
  loginScreen();
};
