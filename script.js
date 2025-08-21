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

const promoCodesBase64 = {
  "TklDVVMxMjM=": {type:"once", reward:()=>{addBalance(250); alert("Отримано 250 нікусів!");}},
  "TklLVVM0NTY=": {type:"unlimited", reward:()=>{addBalance(100); alert("Отримано 100 нікусів!");}},
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
  "R0lGVDY1NQ==": {type:"unlimited", reward:()=>{addCase("gift"); alert("Отримано подарунковий кейс!");}},
  "TklMSU1JVEFVVDI1": {type:"unlimited", reward:()=>{addCase("autumn"); alert("Отримано кейс Осінь25!");}},
  "WVNFTExBVVRVU1QyNQ==": {type:"once", reward:()=>{addCase("autumn"); alert("Отримано кейс Осінь25!");}},
  "RE9ESUsyNTBPS0FL": {type:"unlimited", reward:()=>{addBalance(250); alert("Отримано 250 нікусів!");}}
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
    <button onclick="showInventory()">🎒 Інвентар (${inventory.length})</button><br/>
    <button onclick="arcadeMenu()">🎮 Міні-ігри</button><br/>  
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
    alert(`Вам випало: ${drop.name} (${drop.rarity}${drop.premium ? ", Преміум" : ""})`);
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
  return Math.random() < 0.02; 
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
// Ініціалізація логіна при завантаженні

window.onload = () => {
  loginScreen();
};
