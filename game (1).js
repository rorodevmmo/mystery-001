const ROLES=[
{id:"jafar",name:"JAFAR",symbol:"☽"},
{id:"scar",name:"SCAR",symbol:"✦"},
{id:"ursula",name:"URSULA",symbol:"◈"}
];

const ROOMS=[
{
title:"L'ACCUEIL",
intro:"Trois dossiers ont été déposés. Chacune possède une information différente. Mettez-les en commun pour ouvrir la première porte.",
clues:[
"Votre dossier dit : « Le mot OMBRE possède cinq lettres. » Répondez avec le nombre.",
"Votre dossier montre une étoile à quatre branches. Combien de pointes voyez-vous ?",
"Votre dossier dit : « OMEGA commence par la lettre... » Répondez avec cette lettre."
],
answers:["5","4","o"],code:"504",
next:"La première porte cède. Le couloir derrière elle vous conduit dans une galerie."
},
{
title:"LA GALERIE",
intro:"Trois dossiers présentent des informations différentes. Une notion commune permet de trouver le code.",
clues:[
"Votre indice dit : « Je suis visible dans le ciel la nuit et je change de forme. » Répondez : LUNE.",
"Votre indice dit : « Le symbole commun ressemble à un croissant dans le ciel. » Répondez : LUNE.",
"Votre indice dit : « Le mot final est le nom de ce que vous observez la nuit : LUNE. » Répondez : LUNE."
],
answers:["lune","lune","lune"],code:"LUNE",
next:"La galerie s'assombrit. Une nouvelle porte apparaît au fond."
},
{
title:"LA SALLE DES ÉCHOS",
intro:"Chaque téléphone révèle un nombre. Assemblez-les dans l'ordre Jafar → Scar → Ursula.",
clues:[
"Votre fragment donne le premier chiffre : TROIS. Répondez 3.",
"Votre fragment donne le deuxième chiffre : SEPT. Répondez 7.",
"Votre fragment donne le troisième chiffre : NEUF. Répondez 9."
],
answers:["3","7","9"],code:"379",
next:"Le verrou numérique affiche trois chiffres : 3 — 7 — 9."
},
{
title:"LE MIROIR",
intro:"Les messages sont volontairement déformés. Chaque dossier contient une partie du mot de passage.",
clues:[
"Votre message est écrit à l'envers : AGEMO. Remettez-le à l'endroit.",
"Votre message indique : « La dernière lettre de OMEGA est votre réponse. » Répondez A.",
"Votre message indique : « Le mot entier est OMEGA. » Répondez OMEGA."
],
answers:["omega","a","omega"],code:"OMEGA",
next:"Le miroir se fissure. Derrière lui se trouve la dernière porte."
},
{
title:"LA PORTE FINALE",
intro:"Vous avez récupéré plusieurs fragments. Le dernier verrou demande le mot qui vous a accompagné pendant tout le parcours.",
clues:[
"Votre dossier contient : OMEGA. Répondez OMEGA.",
"Votre dossier contient : OMEGA. Répondez OMEGA.",
"Votre dossier contient : OMEGA. Répondez OMEGA."
],
answers:["omega","omega","omega"],code:"OMEGA",
next:""
}
];

const p=new URLSearchParams(location.search);
const player=(p.get("player")||"jafar").toLowerCase();
const roomNum=Math.max(1,Math.min(ROOMS.length,Number(p.get("room")||1)));
const room=ROOMS[roomNum-1];
const roleIndex=Math.max(0,ROLES.findIndex(r=>r.id===player));
const role=ROLES[roleIndex];

function $(s){return document.querySelector(s)}
function key(){return `m001_room_${roomNum}_${player}`}
function isDone(){return sessionStorage.getItem(key())==="done"}
function setDone(){sessionStorage.setItem(key(),"done")}

if(location.pathname.endsWith("room.html")){
  $("#roomCounter").textContent=`SALLE ${String(roomNum).padStart(2,"0")} / ${ROOMS.length}`;
  $("#roomEyebrow").textContent=`SALLE ${String(roomNum).padStart(2,"0")}`;
  $("#roomTitle").textContent=room.title;
  $("#roomIntro").textContent=room.intro;
  $("#doorNumber").textContent=String(roomNum).padStart(2,"0");
  $("#roleSymbol").textContent=role.symbol;
  $("#roleName").textContent=role.name;
  $("#clue").innerHTML=`<div class="clue-box">${room.clues[roleIndex]}</div>`;
  $("#doorHint").textContent="Chaque téléphone a son propre indice. Discutez entre vous puis entrez le code commun ici.";

  $("#players").innerHTML=ROLES.map(r=>`
    <div class="player-card ${r.id===role.id?"active":""}">
      <div class="player-symbol">${r.symbol}</div>
      <div class="player-name">${r.name}</div>
      <div class="player-state">${r.id===role.id?"VOTRE DOSSIER":"AUTRE TÉLÉPHONE"}</div>
    </div>`).join("");

  if(isDone()){
    $("#answer").value=room.answers[roleIndex];
    $("#answer").disabled=true;
    $("#answerBtn").disabled=true;
    $("#answerStatus").textContent="✓ Votre indice est déjà validé sur ce téléphone.";
  }

  $("#answerBtn").onclick=()=>{
    const value=$("#answer").value.trim().toLowerCase();
    if(value===room.answers[roleIndex].toLowerCase()){
      setDone();
      $("#answer").disabled=true;
      $("#answerBtn").disabled=true;
      $("#answerStatus").textContent="✓ INDICE VALIDÉ. Donnez votre information aux deux autres joueuses.";
    }else{
      $("#answerStatus").textContent="Réponse incorrecte. Relisez attentivement votre indice.";
    }
  };

  $("#doorBtn").onclick=()=>{
    const value=$("#doorCode").value.trim().toLowerCase();
    if(value===room.code.toLowerCase()){
      $("#doorStatus").textContent="✓ VERROU DÉSACTIVÉ.";
      $("#lock").textContent="🔓";
      $("#doorFrame").classList.add("open");
      if(roomNum<ROOMS.length){
        $("#nextText").textContent=room.next;
        $("#nextRoom").classList.remove("hidden");
      }else{
        $("#final").classList.remove("hidden");
      }
    }else{
      $("#doorStatus").textContent="Code incorrect.";
    }
  };

  $("#nextBtn").onclick=()=>{
    location.href=`room.html?player=${encodeURIComponent(player)}&room=${roomNum+1}`;
  };
}