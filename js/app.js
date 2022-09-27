const headerLogo = document.getElementById("headerLogo");
const learn = document.querySelector("#learn");
const stockImages = document.querySelector("#stockImages>div");
const iconsPacks = document.querySelector("#iconsPacks>div");
const stockFont = document.querySelector("#stockFont>div");
const illustrations = document.querySelector("#illustrations>div");
const threeDPacks = document.querySelector("#threeDPacks>div");

const xhttp = new XMLHttpRequest();
xhttp.open("GET", "./js/db.json", true);
xhttp.send();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var bdJson = JSON.parse(this.responseText);
    paintLearn(bdJson.documentacion);
    paintImages(bdJson.stockImages);
    paintIcons(bdJson.iconsPacks);
    paintFonts(bdJson.font);
    paintIllustrations(bdJson.illustrations);
    paintThreeD(bdJson.threeDPacks);
    paintTools(bdJson.tools);
  }
};

// async function dbJson() {
//   const url = "./js/db.json";
//   const response = await fetch(url);
//   const result = await response.json();
//   console.log(result);
// }
// dbJson();

//Titulo en el header
const escribir = (texto = "", tiempo = 200, elemento = "") => {
  let arrayCaracteres = texto.split("");
  elemento.innerHTML = "";
  let cont = 0;
  let imprimir = setInterval(function () {
    elemento.innerHTML += arrayCaracteres[cont];
    cont++;
    if (cont === arrayCaracteres.length) {
      clearInterval(imprimir);
    }
  }, tiempo);
};
escribir("Bookmark", 200, headerLogo);

function createSquareSection(item) {
  return `
      <div class="stockImage--card__item">
        <div class="stockImage--card__capa">
          <div>
            <h3>${item.name}</h3>
            <a target="_blank" rel="noopener noreferrer" href="${item.link}">Visitar</a>
          </div>
        </div>
        <img
          src="${item.icon}"
          alt="Image ${item.name}"
        />
      </div>
  `;
}
function createSection(item, firstClass) {
  return `
      <div class="${firstClass}">
        <div>
          <img
            src="${item.icon}"
            alt="Image ${item.name}"
          />
        </div>
        <div>
          <h3>${item.name}</h3>
          <a target="_blank" rel="noopener noreferrer" href="${item.link}">Visitar</a>
        </div>
      </div>
  `;
}

//---

function paintLearn(datos) {
  learn.innerHTML = "";
  let cardDescription = "";
  let cardImage = "";
  for (let item of datos) {
    cardDescription += `
    <div class="learn--card container__center">
      <div class="learn--card__description">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <a target="_blank" rel="noopener noreferrer" href="${item.link}">Visitar</a>
      </div>
    </div>
    `;
    cardImage += `
    <div class="learn--card container__center">
      <img src="${item.img}" alt="Image ${item.name}" />
    </div>
    `;
    learn.innerHTML = `
    <div class="learn--description">${cardDescription}</div>    
    <div class="learn--image">${cardImage}</div>
    `;
  }
  learn;
}
function paintImages(datos) {
  stockImages.innerHTML = "";
  for (let item of datos) {
    stockImages.innerHTML += createSquareSection(item);
  }
}
function paintIcons(datos) {
  iconsPacks.innerHTML = "";
  for (let item of datos) {
    iconsPacks.innerHTML += createSection(item, "stockIcon--card__item");
  }
}
function paintFonts(datos) {
  stockFont.innerHTML = "";
  for (let item of datos) {
    stockFont.innerHTML += createSection(item, "stockFont--card__item");
  }
}
function paintIllustrations(datos) {
  illustrations.innerHTML = "";
  for (let item of datos) {
    illustrations.innerHTML += createSquareSection(item);
  }
}
function paintThreeD(datos) {
  threeDPacks.innerHTML = "";
  for (let item of datos) {
    threeDPacks.innerHTML += createSquareSection(item);
  }
}
function paintTools(datos) {
  //en esta parte se llamará a una funcion con EventListener para mostrar un modal con la imformacion
  datos;
}

/*Lo que aun falta por implemtar
  -menu de navegacion
  -ajustar los estilos css para que sea responsive
  -colocar animaciones

*/

//MENU
const navbar = document.getElementById("navbar");
const menuIcon = document.getElementById("menuIcon");
const arrowRight = document.getElementById("arrowRight");
const arrowLeft = document.getElementById("arrowLeft");
const desbloqueado = document.getElementById("unlock");
const bloqueado = document.getElementById("lock");

function openMenu() {
  navbar.classList.remove("navbar--animation__close");
  navbar.classList.add("navbar--animation__open");
  arrowLeft.classList.remove("hidden");
  arrowRight.classList.add("hidden");
}
function closeMenu() {
  navbar.classList.remove("navbar--animation__open");
  navbar.classList.add("navbar--animation__close");
  arrowRight.classList.remove("hidden");
  arrowLeft.classList.add("hidden");
}
function unlock() {
  desbloqueado.classList.remove("hidden");
  bloqueado.classList.add("hidden");
  bloqueado.removeAttribute("name");
}
function lock() {
  desbloqueado.classList.add("hidden");
  bloqueado.classList.remove("hidden");
  bloqueado.setAttribute("name", "lock");
}

navbar.querySelector("ul").addEventListener("click", (e) => {
  // e.preventDefault();
  if (e.target && e.target.tagName === "A") {
    if (bloqueado.name !== "lock") {
      closeMenu();
    }
  }
});
menuIcon.addEventListener("click", (e) => {
  // e.preventDefault();
  if (e.target && e.target.tagName === "svg") {
    switch (e.target.id) {
      case "targetArrowRight":
        openMenu();
        break;
      case "targetArrowLeft":
        closeMenu();
        unlock();
        break;
      case "targetUnlock":
        lock();
        break;
      case "targetLock":
        unlock();
        break;
      default:
        break;
    }
  }
});
