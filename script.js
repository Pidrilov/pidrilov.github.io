/* ===== THEME ===== */
function setTheme(t){
    document.body.className = t;
    localStorage.setItem("theme", t);
}
document.body.className = localStorage.getItem("theme") || "dark";

/* ===== VISITS (1 PER SESSION AFTER ACTION) ===== */
let visits = Number(localStorage.getItem("visits") || 0);
let actionDone = sessionStorage.getItem("actionDone");

const visitsEl = document.getElementById("visits");
updateVisits();

function action(){
    if(!actionDone){
        visits++;
        localStorage.setItem("visits", visits);
        sessionStorage.setItem("actionDone", "1");
        actionDone = true;
        updateVisits();
    }
}

function updateVisits(){
    visitsEl.textContent = "Visits: " + visits;
}

/* ===== AUTH ===== */
function showRegister(){
    register.style.display="block";
    login.style.display="none";
    tabReg.classList.add("active");
    tabLog.classList.remove("active");
}

function showLogin(){
    register.style.display="none";
    login.style.display="block";
    tabLog.classList.add("active");
    tabReg.classList.remove("active");
}

function register(){
    if(/[а-яА-Я\s]/.test(regLogin.value)){
        regError.textContent="Русские буквы и пробелы запрещены";
        return;
    }
    localStorage.setItem("user", JSON.stringify({
        l:regLogin.value,p:regPass.value
    }));
    auth.style.display="none";
    app.style.display="block";
    action();
}

function login(){
    const u=JSON.parse(localStorage.getItem("user"));
    if(!u)return;
    if(logLogin.value===u.l && logPass.value===u.p){
        auth.style.display="none";
        app.style.display="block";
        action();
    }
}

function logout(){
    app.style.display="none";
    auth.style.display="block";
}

/* ===== NICK + HISTORY ===== */
let historyArr = JSON.parse(localStorage.getItem("history")||"[]");

function generateNick(){
    const chars="abcdefghijklmnopqrstuvwxyz0123456789";
    let r="";
    for(let i=0;i<6;i++)r+=chars[Math.random()*chars.length|0];
    const nick=(baseNick.value||"")+r;
    nickResult.textContent=nick;

    historyArr.unshift(nick);
    if(historyArr.length>5)historyArr.pop();
    localStorage.setItem("history",JSON.stringify(historyArr));
    renderHistory();
    action();
}

function renderHistory(){
    history.innerHTML=historyArr.join("<br>");
}

function toggleHistory(){
    history.style.display=history.style.display==="block"?"none":"block";
}

renderHistory();

/* ===== PASSWORD ===== */
function generatePassword(){
    const c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let p="";
    for(let i=0;i<12;i++)p+=c[Math.random()*c.length|0];
    passResult.textContent=p;
    action();
}
