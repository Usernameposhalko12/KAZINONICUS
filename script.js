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
          <div style="border:1px solid #999; padding:10px; width:150px; text-align:center; margin-bottom:10px;">
            <b>Кейс: ${getCaseName(item.caseType)}</b><br/>
            <img src="img/case_${item.caseType}.png" width="120" /><br/>
            <button onclick="openCase(${idx})" ${isBlocked ? "disabled" : ""}>Відкрити</button><br/>
            <button onclick="toggleBlock(${idx}); event.stopPropagation();">${isBlocked ? "Розблокувати" : "Заблокувати"}</button><br/>
            <button onclick="deleteItem(${idx}); event.stopPropagation();" ${isBlocked ? "disabled" : ""} style="margin-top:5px;">Видалити</button>
          </div>
        `;
      } else if(item.type === "item"){
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
  else if(item.caseType === "fallalt") drop = dropFallAlternative25Case();
  else if(item.caseType === "autumnus") drop = dropAutumnus25Case();

  if(drop){
    inventory.splice(idx, 1);
    inventory.push(drop);
    saveData();
    alert(`Вам випало: ${drop.name} (${drop.rarity}${drop.premium ? ", Преміум" : ""})`);
    showInventory();
  }
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
    {name:"Супермен", img:"superman.png", rarity:"Секретна", chance:0.05},
    {name:"Бомбордіро", img:"red1.png", rarity:"Секретна", chance:0.05},
    {name:"Тралалеро", img:"red2.png", rarity:"Секретна", chance:0.05},
    {name:"Тунг-Сахур", img:"red3.png", rarity:"Секретна", chance:0.05},
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
  const rates = {secret:0, epic:0.10, exceptional:0.30, common:0.60};
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

function startSaperPaid() {
    if(balance < 20){
        alert("Недостатньо нікусів для гри в Сапер!");
        return;
    }
    addBalance(-20);
    startSaper();
}

function startSaper() {
    let rows = 8, cols = 8, minesCount = 10;
    let board = [], revealed = [], exploded = false, saperScore = 0;

    for(let r=0;r<rows;r++){
        board[r]=[]; revealed[r]=[];
        for(let c=0;c<cols;c++){ board[r][c]=0; revealed[r][c]=false; }
    }

    let placed=0;
    while(placed<minesCount){
        let r=Math.floor(Math.random()*rows);
        let c=Math.floor(Math.random()*cols);
        if(board[r][c]===0){ board[r][c]="M"; placed++; }
    }

    for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
            if(board[r][c]==="M") continue;
            let count=0;
            for(let dr=-1;dr<=1;dr++){
                for(let dc=-1;dc<=1;dc++){
                    let nr=r+dr,nc=c+dc;
                    if(nr>=0&&nr<rows&&nc>=0&&nc<cols&&board[nr][nc]==="M") count++;
                }
            }
            board[r][c]=count;
        }
    }

    function renderBoard(){
        let html="<h2>Сапер</h2>";
        html+=`<p>Очки: ${saperScore}</p>`;
        html+="<table style='border-collapse:collapse; margin:auto;'>";
        for(let r=0;r<rows;r++){
            html+="<tr>";
            for(let c=0;c<cols;c++){
                let cellContent=revealed[r][c]?"✅":"❌";
                if(revealed[r][c] && board[r][c]==="M") cellContent="💣";
                html+=`<td style='width:30px;height:30px;border:1px solid #555;text-align:center;cursor:pointer;'
                    onclick='reveal(${r},${c})'>${cellContent}</td>`;
            }
            html+="</tr>";
        }
        html+="</table>";
        if(!exploded) html+=`<button onclick="stopSaper()">Зупинитися</button>`;
        if(exploded) html+="<p style='color:red; text-align:center;'>💥 Ви вибухнули! <button onclick='startSaperPaid()'>Нова гра (20 нікусів)</button></p>";
        html+=`<br/><button onclick='arcadeMenu()'>⬅ Назад</button>`;
        document.getElementById("app").innerHTML=html;
    }

    window.reveal=function(r,c){
        if(revealed[r][c] || exploded) return;
        revealed[r][c]=true;
        if(board[r][c]==="M"){
            exploded=true;
            saperScore=0;
        } else {
            saperScore += 4;
        }
        renderBoard();
    }

    window.stopSaper=function(){
        addBalance(saperScore);
        alert(`Гра завершена! Отримано ${saperScore} нікусів.`);
        arcadeMenu();
    }

    renderBoard();
}

function startDinoPaid(){
    if(balance<35){
        alert("Недостатньо нікусів для гри в Динозаврик!");
        return;
    }
    addBalance(-35);
    startDino();
}

function startDino() {
    document.getElementById("app").innerHTML=`
        <h2>Динозаврик</h2>
        <p>Натискайте ПРОБІЛ або кнопку "Стрибок" для стрибка. Мета: уникати кактусів.</p>
        <canvas id="dinoCanvas" width="600" height="150" style="border:1px solid #555; display:block; margin:auto;"></canvas>
        <br/><button id="jumpBtn" style='font-size:22px; padding:15px 40px;'>Стрибок</button>
        <br/><button onclick='arcadeMenu()'>⬅ Назад</button>
    `;

    const jumpBtn = document.getElementById("jumpBtn");
    jumpBtn.addEventListener("pointerdown", jumpDino);

    const canvas=document.getElementById("dinoCanvas");
    const ctx=canvas.getContext("2d");
    const dinoImg=new Image(); dinoImg.src="img/dino.png";
    const cactusImg=new Image(); cactusImg.src="img/cactus.png";

    let dinoY=120, dinoV=0, gravity=0.6, jumping=false;
    let obstacles=[], frame=0, score=0, gameOver=false, cactusCount=0;

    function jumpDino(){
        if(!jumping){ 
            dinoV=-12;
            jumping=true; 
        } 
    }

    window.addEventListener("keydown", e => { if(e.code==="Space") jumpDino(); });

    function spawnCactus(){
        cactusCount++;
        let count=1;
        if(cactusCount<=10) count=1;
        else if(cactusCount<=30) count=Math.random()<0.5?2:1;
        else count=Math.random()<0.3?3:2;
        for(let i=0;i<count;i++){
            obstacles.push({x:600+i*25, w:20, h:30});
        }
    }

    function gameLoop(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        dinoV+=gravity; dinoY+=dinoV;
        if(dinoY>120){ dinoY=120; dinoV=0; jumping=false; }
        ctx.drawImage(dinoImg,50,dinoY,30,30);

        if(frame % 45 === 0) spawnCactus();

        obstacles.forEach(o=>{ o.x-=4; ctx.drawImage(cactusImg,o.x,120,o.w,o.h); });
        obstacles = obstacles.filter(o => o.x+o.w>0);

        for(let o of obstacles){
            if(50<o.x+o.w && 80>o.x && dinoY<150 && dinoY+30>120){ gameOver=true; }
        }

        if(!gameOver){
            if(frame % 90 === 0) score++;
            ctx.fillStyle="black"; ctx.fillText("Очки: "+score,500,20);
            frame++;
            requestAnimationFrame(gameLoop);
        } else {
            ctx.fillStyle="red";
            ctx.fillText("💀 Game Over! Очки: "+score,200,80);
            if(score>0){
                addBalance(score);
                alert("Гра завершена! Отримано "+score+" нікусів за ваш рахунок.");
            }
        }
    }

    gameLoop();
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
        <h3>Майбутні івенти</h3>
        <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
            <button style="padding:10px 20px; font-size:16px;" disabled>Майбутній івент 1</button>
            <button style="padding:10px 20px; font-size:16px;" disabled>Майбутній івент 2</button>
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
    10: "case_fallalt.png",
    11: "money.png",
    12: "case_box.png",
    13: "case_fallalt.png",
    14: "case_fallalt.png",
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
    3: "case_box.png",
    4: "case_fallalt.png",
    5: "money.png",
    6: "case_autumn.png",
    7: "case_gift.png",
    8: "case_fallalt.png",
    9: "case_box.png",
    10: "money.png",
    11: "case_fallalt.png",
    12: "case_box.png",
    13: "money.png",
    14: "case_gift.png",
    15: "case_autumnus.png",
    16: "case_box.png",
    17: "case_fallalt.png",
    18: "money.png",
    19: "case_gift.png",
    20: "case_fallalt.png",
    21: "case_box.png",
    22: "case_fallalt.png",
    23: "case_fallalt.png",
    24: "case_gift.png",
    25: "case_box.png",
    26: "money.png",
    27: "case_autumn.png",
    28: "case_fallalt.png",
    29: "case_fallalt.png",
    30: "case_fallalt.png",
    31: "money.png",
    32: "case_box.png",
    33: "case_gift.png",
    34: "case_autumnus.png",
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
  { level: 10, reward: "fallalt", type: "item" },
  { level: 11, reward: 50, type: "coins" },
  { level: 12, reward: "box", type: "item" },
  { level: 13, reward: "fallalt", type: "item" },
  { level: 14, reward: "fallalt", type: "item" },
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
  { level: 3, reward: "box", type: "item" },
  { level: 4, reward: "fallalt", type: "item" },
  { level: 5, reward: 50, type: "coins" },
  { level: 6, reward: "autumn", type: "item" },
  { level: 7, reward: "gift", type: "item" },
  { level: 8, reward: "fallalt", type: "item" },
  { level: 9, reward: "box", type: "item" },
  { level: 10, reward: 100, type: "coins" },
  { level: 11, reward: "fallalt", type: "item" },
  { level: 12, reward: "box", type: "item" },
  { level: 13, reward: 150, type: "coins" },
  { level: 14, reward: "gift", type: "item" },
  { level: 15, reward: "autumnus", type: "item" },
  { level: 16, reward: "box", type: "item" },
  { level: 17, reward: "fallalt", type: "item" },
  { level: 18, reward: 200, type: "coins" },
  { level: 19, reward: "gift", type: "item" },
  { level: 20, reward: "fallalt", type: "item" },
  { level: 21, reward: "box", type: "item" },
  { level: 22, reward: "fallalt", type: "item" },
  { level: 23, reward: "fallalt", type: "item" },
  { level: 24, reward: "gift", type: "item" },
  { level: 25, reward: "box", type: "item" },
  { level: 26, reward: 250, type: "coins" },
  { level: 27, reward: "autumn", type: "item" },
  { level: 28, reward: "fallalt", type: "item" },
  { level: 29, reward: "fallalt", type: "item" },
  { level: 30, reward: "fallalt", type: "item" },
  { level: 31, reward: 300, type: "coins" },
  { level: 32, reward: "box", type: "item" },
  { level: 33, reward: "gift", type: "item" },
  { level: 34, reward: "autumnus", type: "item" },
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
            <div style="padding:10px; margin-bottom:5px; border-radius:5px; background-color:${t.completed ? '#d4edda' : '#D49F37'};">
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
  { id: 8, description: "Отримати будь-який секретний предмет ('Супермен', 'Бомбордіро', 'Тунг-Сахур', 'Тралалеро')", reward: () => addBP(4000), check: () => inventory.some(i => ["Супермен", "Бомбордіро", "Тунг-Сахур", "Тралалеро"].includes(i.name)), completed: false },
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
        <button onclick="mainMenu()">⬅ Назад</button>
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

const promoCodesBase64 = {
  "TklDVVMxMjM=": {type:"once", reward:()=>{addBalance(250); alert("Отримано 250 нікусів!");}},
  "TklLVVM0NTY=": {type:"unlimited", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
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
  "R0lGVDY1NQ==": {type:"unlimited", reward:()=>{addCase("gift"); alert("Отримано подарунковий кейс!");}},
  "TklMSU1JVEFVVDI1": {type:"unlimited", reward:()=>{addCase("autumn"); alert("Отримано кейс Осінь25!");}},
  "WVNFTExBVVRVU1QyNQ==": {type:"once", reward:()=>{addCase("autumn"); alert("Отримано кейс Осінь25!");}},
  "RE9ESUsyNTBPS0FL": {type:"unlimited", reward:()=>{addBalance(250); alert("Отримано 250 нікусів!");}},
  "TkFUVVJBTA==":{type:"unlimited",reward:()=>{addCase("fallalt");alert("Отримано кейс FallAlternative25!");}},
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
window.onload = () => {
  loginScreen();
};
