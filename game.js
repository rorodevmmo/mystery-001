const ROLES=[
 {id:"jafar",name:"JAFAR",symbol:"🐍",theme:"jafar"},
 {id:"ursula",name:"URSULA",symbol:"🐙",theme:"ursula"},
 {id:"hades",name:"HADÈS",symbol:"😈",theme:"hades"}
];


const ROOMS=[
{
 title:"LE CADENAS DES TROIS CHIFFRES",
 intro:"",
 clues:[
  "Mon chiffre et celui d'Ursula font 9",
  "Mon chiffre est le triple de celui d'Hades.",
  "Mon chiffre est le plus petit nombre premier"
 ],
 code:"362",
 next:"C = 2, donc B = 6, puis A = 3. Le cadenas affiche 362. La première porte s'ouvre."
},
{
  title: "LE LANGAGE SECRET",
  intro: "",
  clues: [
    // Page A : le message
    `<div style="font-size:2.2rem;letter-spacing:.5rem;text-align:center">▼ _ ◀ ★ ▲ ▶ _ ■ ◆</div>`,

    // Page B : lettres de rang impair (A, C, E, G...)
    `
     <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.6rem;font-size:1.4rem;text-align:center">
       <span>A=★</span><span>C=✦</span><span>E=✧</span><span>G=✚</span>
       <span>I=▲</span><span>K=◔</span><span>M=◐</span><span>O=●</span>
       <span>Q=◑</span><span>S=◆</span><span>U=■</span><span>W=◒</span>
       <span>Y=◓</span>
     </div>`,

    // Page C : lettres de rang pair (B, D, F, H...)
    `
     <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.6rem;font-size:1.4rem;text-align:center">
       <span>B=◧</span><span>D=◨</span><span>F=◩</span><span>H=◪</span>
       <span>J=◢</span><span>L=◀</span><span>N=▶</span><span>P=◣</span>
       <span>R=◤</span><span>T=◥</span><span>V=▼</span><span>X=◖</span>
       <span>Z=◗</span>
     </div>`
  ],
  code: "VILAINOUS",
  next: "▼=V, _=I, ◀=L, ★=A, ▶=N, _=O, ■=U, ◆=S : le mot mystère est VILAINOUS. Une seule moitié de l'alphabet ne suffisait pas !"
},

{
 title:"TROUVE L'INTRUS",
 intro:"Qui est l'intrus parmi ces personnages Disney ?",
 clues:[
  "Mickey | Donald | Dingo | Pluto | Simba | Nala | Timon | Pumbaa | Bambi | Dumbo | Marie | Figaro | Baloo | Winnie | Tigrou | Nemo | Dory | Stitch | Aladdin | Sven | Pascal | Mushu | Abu | Meeko | Lady"
 ],
 code:"Aladdin",
 next:""
},

{
 title:"TROUVE L'INTRUS",
 intro:"Qui est l'intrus parmi ces personnages Disney ?",
 clues:[
  "Mickey | Donald | Simba | Aladdin | Ariel | Belle | Mulan | Pocahontas | Cendrillon | Blanche-Neige | Jasmine | Raiponce | Tiana | Vaiana | Elsa | Anna | Mérida | Woody | Hercule | Tarzan | Peter Pan | Robin des Bois | Kuzco | Stitch | Aurore"
 ],
 code:"Woody",
 next:""
},


{
 title:"LA REPONSE FINALE",
 intro:"",
 clues:[
  "Dans notre royaume, ils sont 7.",
  "Six sont déjà prêts pour l'aventure…",
  "Il n'est ni roi, ni prince, ni héros.",
  "Pourtant, il a déjà sa place parmi les grands.",
  "Il est souvent nommé comme connaissance du roi de la savane",
  "Qui est-ce ?"
 ],
 code:"Rafael",
  next:"",
  finalCode:"Rafael"
}
];


const ROOM_IDS = [
  "K7xP2",
  "mQ84Z",
  "T9vL3",
  "aX6R1",
  "P4nW8"
];

const p = new URLSearchParams(location.search);

const player = (p.get("player") || "jafar").toLowerCase();

const roomId = p.get("r");

let roomNum = ROOM_IDS.indexOf(roomId) + 1;

// Si aucune salle valide n'est donnée, on commence à la salle 1
if(roomNum < 1){
  roomNum = 1;
}

const room = ROOMS[roomNum - 1];

const roleIndex = Math.max(
  0,
  ROLES.findIndex(r => r.id === player)
);

const role = ROLES[roleIndex];

function $(s){
  return document.querySelector(s);
}


if(location.pathname.endsWith("room.html")){
  document.body.classList.add(`theme-${role.theme}`);

  $("#roomCounter").textContent=
    `SALLE ${String(roomNum).padStart(2,"0")} / ${ROOMS.length}`;

  $("#roomEyebrow").textContent=
    `SALLE ${String(roomNum).padStart(2,"0")}`;

  $("#roomTitle").textContent=room.title;

  $("#roomIntro").textContent=room.intro;

  $("#doorNumber").textContent=
    String(roomNum).padStart(2,"0");

  $("#roleSymbol").textContent=role.symbol;

  $("#roleName").textContent=role.name;


  // Affichage de l'indice uniquement
  $("#clue").innerHTML=`
    <div class="clue-box">
      ${room.clues[roleIndex]}
    </div>
  `;

  $("#doorHint").textContent="";


  // Affichage des trois joueurs
  $("#players").innerHTML=ROLES.map(r=>`
    <div class="player-card ${r.id===role.id?"active":""}">
      <div class="player-symbol">${r.symbol}</div>
      <div class="player-name">${r.name}</div>
      <div class="player-state">
        ${r.id===role.id?"VOTRE DOSSIER":"AUTRE TÉLÉPHONE"}
      </div>
    </div>
  `).join("");


  // =====================================================
  // SUPPRIMÉ :
  // - validation individuelle des indices
  // - answers
  // - sessionStorage
  // - bouton de validation de l'indice
  // =====================================================


  // CODE COMMUN DE LA PORTE
  $("#doorBtn").onclick=()=>{

    const value=
      $("#doorCode").value.trim().toLowerCase();

    if(value===room.code.toLowerCase()){

      $("#doorStatus").textContent=
        "✓ VERROU DÉSACTIVÉ.";

      $("#lock").textContent="🔓";

      $("#doorFrame").classList.add("open");


      if(roomNum<ROOMS.length){

        $("#nextText").textContent=room.next;

        $("#nextRoom").classList.remove("hidden");

      }else{

        $("#finalCode").textContent = room.finalCode || "731";
        $("#final").classList.remove("hidden");

      }

    }else{

      $("#doorStatus").textContent=
        "Code incorrect.";

    }
  };


  // SALLE SUIVANTE
$("#nextBtn").onclick=()=>{

  location.href =
    `room.html?player=${encodeURIComponent(player)}&r=${ROOM_IDS[roomNum]}`;

};

}