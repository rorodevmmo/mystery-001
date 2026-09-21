const ROLES=[
 {id:"jafar",name:"JAFAR",symbol:"☽"},
 {id:"scar",name:"SCAR",symbol:"✦"},
 {id:"ursula",name:"URSULA",symbol:"◈"}
];

const ROOMS=[
{
 title:"LE CADENAS DES TROIS CHIFFRES",
 intro:"",
 clues:[
  "Mon chiffre et celui de Scar font 9",
  "Mon chiffre est le triple de celui d'Ursula.",
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
 title:"LE PASSAGE SECRET",
 intro:"Une porte secrète possède 4 symboles dans un ordre précis. Chaque symbole correspond à un chiffre différent de 1 à 4. Croisez les indices des trois téléphones pour trouver le code.",
 clues:[
  "☽ est placé avant ✦.<br><br>◈ n'est pas le 4.",

  "★ est placé immédiatement après ◈.<br><br>✦ n'est pas le 1.",

  "☽ n'est ni le 1 ni le 4.<br><br>◈ est placé avant ☽."
 ],
 code:"3412",
 next:"Les indices imposent l'ordre ◈ → ★ → ☽ → ✦. Donc ◈=1, ★=2, ☽=3 et ✦=4. Dans l'ordre demandé ☽ ✦ ◈ ★, le code est 3412."
},

{
 title:"LE CODE DU COFFRE",
 intro:"",
 clues:[
  "<br>6 – 9 – 8 → aucun chiffre correct.<br>",

  "<br>1 – 4 – 9 → deux chiffres corrects.<br>",

  "<br>7 – 8 – 1 → deux chiffres corrects.<br>"
 ],
 code:"417",
 next:"Le code contient 1, 4 et 7. Le 1 ne peut être ni en 1re ni en 3e position : il est au milieu. Le 7 est alors en 3e, et le 4 en 1re. Code : 417."
},

{
 title:"LE MESSAGE EN RELAIS",
 intro:"",
 clues:[
  "<br>N est le nombre de caribous à Disneyland Paris aujourd'hui<br>",

  "<br>Chaque lettre a été avancée de N crans dans l'alphabet (Z devient A)<br>",

  "<br>YVZLYA.<br>"
 ],
 code:"TRESOR",
 next:"N = 7. En reculant de 7 crans, YVZLYA devient ROSERT. À l'envers : TRESOR. Vous avez terminé le parcours."
}
];

const p=new URLSearchParams(location.search);

const player=(p.get("player")||"jafar").toLowerCase();

const roomNum=Math.max(
  1,
  Math.min(
    ROOMS.length,
    Number(p.get("room")||1)
  )
);

const room=ROOMS[roomNum-1];

const roleIndex=Math.max(
  0,
  ROLES.findIndex(r=>r.id===player)
);

const role=ROLES[roleIndex];

function $(s){
  return document.querySelector(s);
}


if(location.pathname.endsWith("room.html")){

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

        $("#final").classList.remove("hidden");

      }

    }else{

      $("#doorStatus").textContent=
        "Code incorrect.";

    }
  };


  // SALLE SUIVANTE
  $("#nextBtn").onclick=()=>{

    location.href=
      `room.html?player=${encodeURIComponent(player)}&room=${roomNum+1}`;

  };

}