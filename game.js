/*
  MYSTERY 001 — V1
  Mode démo : localStorage.
  Pour 3 téléphones réels, voir README.md : brancher Firebase Realtime Database
  en remplaçant les fonctions saveState/loadState par un backend partagé.
*/

const ROLES = [
  {id:"jafar", name:"JAFAR", symbol:"☽", color:"violet"},
  {id:"scar", name:"SCAR", symbol:"✦", color:"red"},
  {id:"ursula", name:"URSULA", symbol:"◈", color:"blue"}
];

const ROOMS = [
  {
    title:"L'ACCUEIL", intro:"Trois dossiers ont été déposés. Chacune de vous possède une pièce d'information différente.",
    clue:[
      "Le premier indice est le nombre de lettres du mot OMBRE.",
      "Le symbole sur votre dossier est une étoile à quatre branches. Comptez ses pointes.",
      "Le mot OMEGA termine l'inscription. Prenez sa première lettre."
    ],
    answers:["5","4","o"], code:"504", next:"La première porte cède. Mais le couloir derrière elle n'est pas vide."
  },
  {
    title:"LA GALERIE", intro:"Trois images sont affichées sur les trois téléphones. Une seule chose est commune aux trois dossiers : un symbole.",
    clue:[
      "Cherchez dans votre dossier le symbole qui apparaît aussi sur les deux autres. Votre réponse : le nom du symbole.",
      "Le symbole commun est lié à la nuit. Votre réponse doit être le mot : LUNE.",
      "Regardez la bordure de votre écran. Le symbole commun est un losange. Répondez : LOSANGE."
    ],
    answers:["lune","lune","losange"], code:"LUNE", next:"La galerie s'assombrit. Une nouvelle porte apparaît."
  },
  {
    title:"LA SALLE DES ÉCHOS", intro:"Le son est divisé en trois morceaux. Chaque joueuse possède un fragment différent.",
    clue:[
      "Votre fragment donne le premier chiffre : TROIS.",
      "Votre fragment donne le deuxième chiffre : SEPT.",
      "Votre fragment donne le troisième chiffre : NEUF."
    ],
    answers:["3","7","9"], code:"379", next:"Le verrou numérique affiche trois chiffres : 3 — 7 — 9."
  },
  {
    title:"LE MIROIR", intro:"Les mots ne veulent pas dire ce qu'ils semblent dire. Regardez derrière le message.",
    clue:[
      "Votre mot est écrit à l'envers : AGEMO. Réponse : OMEGA.",
      "Votre mot est le reflet de : RAE. Réponse : AER.",
      "Votre mot indique la direction opposée à ENTRÉE : SORTIE."
    ],
    answers:["omega","aer","sortie"], code:"OMEGA", next:"Le miroir se brise. Il ne reste qu'une seule porte."
  },
  {
    title:"LA PORTE FINALE", intro:"Vous avez récupéré quatre fragments. Assemblez-les avec ce que vous avez appris.",
    clue:[
      "Votre dossier contient le mot FINAL.",
      "Votre dossier contient le nombre 001.",
      "Votre dossier contient la lettre A."
    ],
    answers:["final","001","a"], code:"OMEGA", next:""
  }
];

const params = new URLSearchParams(location.search);
const isRoom = location.pathname.endsWith("room.html");

function getState(){
  const raw = localStorage.getItem("mystery001");
  if(raw) return JSON.parse(raw);
  return {
    team: "", room: 0, players: {
      jafar:{joined:false,done:false}, scar:{joined:false,done:false}, ursula:{joined:false,done:false}
    }
  };
}
function saveState(s){ localStorage.setItem("mystery001", JSON.stringify(s)); }
function makeCode(){
  return Math.random().toString(36).slice(2,8).toUpperCase();
}

if(!isRoom){
  const team = document.querySelector("#team");
  const joinCode = document.querySelector("#joinCode");
  const status = document.querySelector("#status");

  document.querySelector("#createBtn").onclick = ()=>{
    const name = team.value.trim() || "Les Ombres";
    const s = getState();
    s.team = name;
    s.room = 0;
    s.code = makeCode();
    saveState(s);
    location.href = `room.html?player=jafar&team=${s.code}`;
  };
  document.querySelector("#joinBtn").onclick = ()=>{
    const code = joinCode.value.trim().toUpperCase();
    const s = getState();
    if(!code){status.textContent="Entrez un code d'équipe.";return}
    // V1 démo : le code est simplement mémorisé sur cet appareil.
    s.code = code; s.team = s.team || "Équipe mystère"; saveState(s);
    status.textContent="Choisissez votre rôle sur la page suivante.";
    setTimeout(()=>location.href=`room.html?player=scar&team=${code}`,500);
  };
} else {
  const state = getState();
  const playerId = (params.get("player") || "jafar").toLowerCase();
  const roleIndex = Math.max(0, ROLES.findIndex(r=>r.id===playerId));
  const role = ROLES[roleIndex] || ROLES[0];
  const roomIndex = Math.min(state.room || 0, ROOMS.length-1);
  const room = ROOMS[roomIndex];

  const $ = s=>document.querySelector(s);
  $("#teamName").textContent = state.team || "ÉQUIPE MYSTÈRE";
  $("#roomCounter").textContent = `SALLE ${String(roomIndex+1).padStart(2,"0")}/${ROOMS.length}`;
  $("#roomEyebrow").textContent = `SALLE ${String(roomIndex+1).padStart(2,"0")}`;
  $("#roomTitle").textContent = room.title;
  $("#roomIntro").textContent = room.intro;
  $("#doorNumber").textContent = String(roomIndex+1).padStart(2,"0");
  $("#doorHint").textContent = roomIndex === ROOMS.length-1 ? "Dernier verrou. Cette fois, le mot final est commun." : "Trois indices. Un seul code. La porte ne s'ouvre que lorsque les trois dossiers sont validés.";

  $("#roleSymbol").textContent = role.symbol;
  $("#roleName").textContent = role.name;
  $("#clue").innerHTML = `<div class="clue-box">${room.clue[roleIndex]}</div>`;

  function render(){
    const st = getState();
    ROLES.forEach(r=>{
      const card = document.querySelector(`[data-player="${r.id}"]`);
      if(card){
        card.classList.toggle("done", !!st.players[r.id].done);
        card.querySelector(".player-state").textContent = st.players[r.id].done ? "INDICE VALIDÉ" : "EN ATTENTE";
      }
    });
    const done = ROLES.filter(r=>st.players[r.id].done).length;
    $("#teamProgress").textContent = `${done} / 3`;
    $("#tokens").innerHTML = ROLES.map(r=>`<div class="token ${st.players[r.id].done?"on":""}">${r.symbol}<br><small>${r.name}</small></div>`).join("");
  }

  $("#players").innerHTML = ROLES.map(r=>`
    <div class="player-card ${r.id===role.id?"active":""}" data-player="${r.id}">
      <div class="player-symbol">${r.symbol}</div>
      <div class="player-name">${r.name}</div>
      <div class="player-state">EN ATTENTE</div>
    </div>`).join("");

  $("#answerBtn").onclick = ()=>{
    const answer = $("#answer").value.trim().toLowerCase();
    const expected = room.answers[roleIndex].toLowerCase();
    if(answer === expected){
      const st = getState();
      st.players[role.id].joined = true;
      st.players[role.id].done = true;
      saveState(st);
      $("#answerStatus").textContent = "✓ INDICE VALIDÉ. Prévenez les deux autres.";
      $("#answer").disabled = true;
      $("#answerBtn").disabled = true;
      render();
    }else{
      $("#answerStatus").textContent = "Ce n'est pas la bonne réponse. Relisez votre dossier.";
    }
  };

  $("#doorBtn").onclick = ()=>{
    const st = getState();
    const done = ROLES.every(r=>st.players[r.id].done);
    if(!done){
      $("#doorStatus").textContent = "Les trois indices doivent être validés.";
      return;
    }
    const code = $("#doorCode").value.trim().toLowerCase();
    if(code === room.code.toLowerCase()){
      $("#doorStatus").textContent = "✓ VERROU DÉSACTIVÉ.";
      $("#lock").textContent = "🔓";
      document.querySelector(".door-frame").classList.add("open");
      if(roomIndex < ROOMS.length-1){
        $("#nextText").textContent = room.next;
        $("#nextRoom").classList.remove("hidden");
      }else{
        $("#final").classList.remove("hidden");
      }
    }else{
      $("#doorStatus").textContent = "Code incorrect.";
    }
  };

  $("#nextBtn").onclick = ()=>{
    const st = getState();
    st.room = roomIndex + 1;
    ROLES.forEach(r=>st.players[r.id].done=false);
    saveState(st);
    location.reload();
  };

  render();
}