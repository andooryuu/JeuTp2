"use strict"




let tabImageFond = ["url('images/debutant.jpg')", "url('images/intermediaire.jpg')", "url('images/avance.jpg')"];
let tabClassName = ["debutant", "intermediaire", "avance"];
let tabColorFond = ["black", "red", "blue"];
let tabColor = ["white", "yellow", "grey"];
let tabPoints = [0, 100, 250];
let tabTemps = [20, 15, 10];
let tabDimensions = [4, 5, 6];
let tabPointsClic = [10, 15, 20];

let pointsTotal = 0;
let pointsClic = tabPointsClic[0];
let points = tabPoints[0];
let temps = tabTemps[0];
setNiveau(4)

function changerDifficulte() {
  let choix = document.getElementById("difficulte").value;
  let rectangle = document.getElementById("divImage");
  setNiveau(tabDimensions[choix]);
  let grille = document.querySelector('.table');
  grille.style.backgroundImage = tabImageFond[choix];
  let points = document.getElementById("points");
  let secondes = document.getElementById("temps");
  pointsClic = tabPointsClic[choix]
  document.getElementsByTagName("body")[0].className = tabClassName[choix];
  points.innerHTML = tabPoints[choix];
  secondes.innerHTML = tabTemps[choix];
}

function creerTab(dimensions) {
  let table = document.createElement("table");
  table.classList.add("table");

  // pour chaque ligne
  for (let i = 0; i < dimensions; i++) {
    let tr = document.createElement("tr");

    // pour chaque colonne
    for (let j = 0; j < dimensions; j++) {
      let td = document.createElement("td");
      td.classList.add("td");

      // ajoute la cellule à la rangée
      tr.appendChild(td);
    }

    // ajoute la rangée au tableau
    table.appendChild(tr);
  }

  // ajoute le tableau au document
  document.querySelector("#divImage").appendChild(table);
}
function setNiveau(dimensions) {
  let parent = document.querySelector("#divImage")
  if (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  creerTab(dimensions)
}
function jouer() {
  desactiver();
  progresser();
  demarrerCompteÀRebours();
  let n = 0;
  let p = 0;
  document.querySelector("button")
  let postionsDispo = document.querySelectorAll("td");
  console.log(postionsDispo)
  n = getNombreAleatoire(0, postionsDispo.length - 1, p);
  let button = document.createElement("button")
  postionsDispo[n].appendChild(button);
  button.className = "perso";
  let choix = document.getElementById("difficulte").value;
  pointsClic = tabPointsClic[choix];
  pointsTotal = tabPoints[choix];
  button.setAttribute("onclick", "gererClic()")
}
function getNombreAleatoire(min, max, precedent) {
  let nombre = min - 1; // hors intervalle

  do {
    nombre = Math.floor(Math.random() * (max - min + 1) + min);
  } while (nombre == precedent);

  return nombre;
}
function deplacer() {
  let precedent = 0;
  let button = 0;
  let nombre = 0;
  let parent = document.querySelectorAll("td");
  for (let j = 0; j < 100; j++) {
    for (let i = 0; i < parent.length; i++) {
      if (parent[i].firstChild) {
        parent[i].removeChild(parent[i].firstChild);
      }
    }
    nombre = getNombreAleatoire(0, parent.length - 1, precedent)
    precedent = nombre;
    button = document.createElement("button");
    parent[nombre].appendChild(button);
    button.className = "perso";
    button.setAttribute("onclick", "gererClic()")
  }
}
  function deplacerLevelUp1() {
    let precedent = 0;
    let button = 0;
    let nombre = 0;
    let parent = document.querySelectorAll("td");
    for (let j = 0; j < 100; j++) {
      for (let i = 0; i < parent.length; i++) {
        if (parent[i].firstChild) {
          parent[i].removeChild(parent[i].firstChild);
        }
      }
      nombre = getNombreAleatoire(0, parent.length - 1, precedent)
      precedent = nombre;
      button = document.createElement("button");
      parent[nombre].appendChild(button);
      button.className = "perso";
      button.setAttribute("onclick", "gererClicLevelUp1()")
    }
  }
  function deplacerLevelUp2() {
    let precedent = 0;
    let button = 0;
    let nombre = 0;
    let parent = document.querySelectorAll("td");
    for (let j = 0; j < 100; j++) {
      for (let i = 0; i < parent.length; i++) {
        if (parent[i].firstChild) {
          parent[i].removeChild(parent[i].firstChild);
        }
      }
      nombre = getNombreAleatoire(0, parent.length - 1, precedent)
      precedent = nombre;
      button = document.createElement("button");
      parent[nombre].appendChild(button);
      button.className = "perso";
      button.setAttribute("onclick", "gererClicLevelUp2()")
    }
  }
    function gererClic() {
      deplacer();
      let points = accumulerPoints();
      AfficherPoint(points);
      VérifierPoints(points);
    }
    function gererClicLevelUp1() {
      deplacerLevelUp1()
      let points = accumulerPointsLevelUp1();
      AfficherPoint(points);
      VérifierPoints(points);
    }
    function gererClicLevelUp2()
    {
      deplacerLevelUp2()
      let points=accumulerPointsLevelUp2();
      AfficherPoint(points);
      VérifierPoints(points);
    }
    function accumulerPoints() {
      let choix = document.getElementById("difficulte").value;
      let points = document.getElementById("points")
      let pointsInitial = parseFloat(points.innerHTML);
      pointsTotal = pointsInitial;


      pointsClic = tabPointsClic[choix];
      pointsTotal += pointsClic
      return pointsTotal;
    }
    function accumulerPointsLevelUp1() {
      let choix = document.getElementById("difficulte").value;
      let points = document.getElementById("points")
      let pointsInitial = parseFloat(points.innerHTML);
      pointsTotal = pointsInitial;
      pointsClic = 15;
      pointsTotal += pointsClic;
      return pointsTotal;
    }
    function accumulerPointsLevelUp2() {
      let choix = document.getElementById("difficulte").value;
      let points = document.getElementById("points")
      let pointsInitial = parseFloat(points.innerHTML);
      pointsTotal = pointsInitial;
      pointsClic = 20;
      pointsTotal += pointsClic;
      return pointsTotal;
    }
    function AfficherPoint(pointsAccmulés) {
      let points = document.getElementById("points")

      points.innerHTML = pointsAccmulés;
    }
    function desactiver() {
      document.querySelector("button").setAttribute("disabled", "true");
      document.querySelector("select").setAttribute("disabled", "true");
    }
    let chrono;
    let décompte = document.getElementById("temps");


    function progresser() {
      let secondes = parseFloat(décompte.innerHTML)
      secondes--;
      décompte.innerHTML = secondes;
      if (secondes <= 0) {
        window.clearTimeout(chrono);
        alert("GAME OVER");
        //window.location.reload();
      }
    }

    function demarrerCompteÀRebours() {
      chrono = window.setInterval(progresser, 1000);
    }

    function VérifierPoints(point) {
      if (point == 100) {
        let secondes = document.getElementById("temps");
        secondes.innerHTML = 15
        let points = document.getElementById("points");
        let n = 0;
        let p = 0;
        setNiveau(tabDimensions[1]);
        let grille = document.querySelector('.table');
        grille.style.backgroundImage = tabImageFond[1];

        document.getElementsByTagName("body")[0].className = tabClassName[1];
        document.querySelector("button")
        let postionsDispo = document.querySelectorAll("td");
        console.log(postionsDispo)
        n = getNombreAleatoire(0, postionsDispo.length - 1, p);
        let button = document.createElement("button")
        postionsDispo[n].appendChild(button);
        button.className = "perso";
        button.setAttribute("onclick", "gererClicLevelUp1()")
      }
      if (point == 250) {
        let n = 0;
        let p = 0;
        let secondes = document.getElementById("temps");
        secondes.innerHTML = 10;
        let points = document.getElementById("points");
        pointsClic = 15;
        setNiveau(tabDimensions[2]);
        let grille = document.querySelector('.table');
        grille.style.backgroundImage = tabImageFond[2];

        document.getElementsByTagName("body")[0].className = tabClassName[2];
        document.querySelector("button")
        let postionsDispo = document.querySelectorAll("td");
        console.log(postionsDispo)
        n = getNombreAleatoire(0, postionsDispo.length - 1, p);
        let button = document.createElement("button")
        postionsDispo[n].appendChild(button);
        button.className = "perso";
        button.setAttribute("onclick", "gererClicLevelUp2()")
      }
      if (point == 450){
        alert("Bravo! Vous avez gagné! :) ")
        window.location.reload();
      }
    }